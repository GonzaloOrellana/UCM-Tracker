import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { MCUItem, FilterState, UserSettings, NavView } from '../types/mcu';
import { PRODUCTIONS } from '../data/productions';
import { storageService, DEFAULT_AVATAR } from '../services/storageService';
import { mcuService } from '../services/mcuService';
import { User } from '@supabase/supabase-js';
import { useMCUAuth } from '../hooks/useMCUAuth';
import { useMCUFilters, defaultFilters } from '../hooks/useMCUFilters';
import { getAvatarById } from '../data/avatars';

interface MCUStats {
  total: number;
  watched: number;
  percentage: number;
  movies: { total: number; watched: number };
  series: { total: number; watched: number };
  specials: { total: number; watched: number };
  phases: Record<string, { total: number; watched: number; percentage: number }>;
}

interface MCUContextType {
  items: MCUItem[];
  availableItems: MCUItem[];
  upcomingItems: MCUItem[];
  filteredItems: MCUItem[];
  watchedIds: Set<string>;
  favoriteIds: Set<string>;
  ratings: Record<string, number>;
  filters: FilterState;
  stats: MCUStats;
  settings: UserSettings;
  currentView: NavView;
  activeDetailItem: MCUItem | null;
  activeDetailSource: 'grid' | 'fav';

  // Autenticación
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;

  // Cookie Consent
  cookieConsent: 'accepted' | 'rejected' | null;
  acceptCookies: () => void;
  rejectCookies: () => void;
  resetCookieConsent: () => void;

  // Acciones
  setCurrentView: (view: NavView) => void;
  openDetailModal: (item: MCUItem, source?: 'grid' | 'fav') => void;
  closeDetailModal: () => void;
  toggleWatched: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setRating: (id: string, rating: number | null) => void;
  markAllAsWatched: () => void;
  resetProgress: () => void;
  addCustomItem: (itemData: Omit<MCUItem, 'id' | 'isCustom'>, imageBase64?: string) => Promise<void>;
  updateItem: (id: string, updated: Partial<MCUItem>) => void;
  deleteItem: (id: string) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  updateSettings: (newSettings: UserSettings) => void;
  updateAvatar: (avatarId: string) => Promise<void>;
}

const MCUContext = createContext<MCUContextType | undefined>(undefined);

export const MCUProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<NavView>('dashboard');
  const [activeDetailItem, setActiveDetailItem] = useState<MCUItem | null>(null);
  const [activeDetailSource, setActiveDetailSource] = useState<'grid' | 'fav'>('grid');

  const [watchedIds, setWatchedIds] = useState<Set<string>>(new Set());
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [ratings, setRatingsState] = useState<Record<string, number>>({});
  const [customItems, setCustomItems] = useState<MCUItem[]>([]);
  const [editedMap, setEditedMap] = useState<Record<string, Partial<MCUItem>>>({});
  
  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'rejected' | null>(() => {
    const saved = localStorage.getItem('marvel_tracker_cookie_consent');
    if (saved === 'accepted' || saved === 'rejected') return saved;
    return null;
  });

  const acceptCookies = () => {
    localStorage.setItem('marvel_tracker_cookie_consent', 'accepted');
    setCookieConsent('accepted');
  };

  const rejectCookies = () => {
    localStorage.setItem('marvel_tracker_cookie_consent', 'rejected');
    setCookieConsent('rejected');
  };

  const resetCookieConsent = () => {
    localStorage.removeItem('marvel_tracker_cookie_consent');
    setCookieConsent(null);
  };

  const [settings, setSettings] = useState<UserSettings>({
    userName: 'Gonzalo',
  });

  const updateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    storageService.saveSettings(newSettings);
  };

  // Custom Auth Hook
  const { user, login, signup, logout, deleteAccount, requestPasswordReset, updatePassword, updateAvatarId } = useMCUAuth({
    settings,
    updateSettings,
    onAuthChange: () => {
      mcuService.fetchWatchedIds().then((watched) => {
        setWatchedIds(new Set(watched));
      });
    },
    onDeleteSuccess: () => {
      resetProgress();
    },
  });

  const updateAvatar = async (avatarId: string) => {
    const avatarObj = getAvatarById(avatarId);
    const url = avatarObj ? avatarObj.url : DEFAULT_AVATAR;
    const newSettings = { ...settings, avatarId, profilePicUrl: url };
    setSettings(newSettings);
    storageService.saveSettings(newSettings);
    await updateAvatarId(avatarId);
  };

  // Combine initial + custom + edits
  const items = useMemo(() => {
    const combined = [...PRODUCTIONS, ...customItems];
    return combined.map((item) => {
      const edit = editedMap[item.id];
      return edit ? { ...item, ...edit } : item;
    });
  }, [customItems, editedMap]);

  // Today's date ISO string YYYY-MM-DD for dynamic comparison against system date
  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  // Split into Available (already released) and Upcoming (future release)
  const availableItems = useMemo(() => {
    return items.filter((item) => item.fechaLanzamiento <= todayStr);
  }, [items, todayStr]);

  const upcomingItems = useMemo(() => {
    return items.filter((item) => item.fechaLanzamiento > todayStr);
  }, [items, todayStr]);

  // Custom Filters Hook operating on available items for library views
  const { filters, filteredItems, setFilters, resetFilters } = useMCUFilters(availableItems, watchedIds);

  // Initial load
  useEffect(() => {
    async function loadData() {
      const loadedSettings = storageService.getSettings();
      setSettings(loadedSettings);

      const watched = await mcuService.fetchWatchedIds();
      setWatchedIds(new Set(watched));

      const favs = storageService.getFavoriteIds();
      setFavoriteIds(new Set(favs));

      const loadedRatings = storageService.getRatings();
      setRatingsState(loadedRatings);

      const customs = await mcuService.fetchCustomItems();
      setCustomItems(customs);

      setEditedMap(storageService.getEditedItems());
    }
    loadData();
  }, []);

  // Compute Statistics based on released/available productions
  const stats: MCUStats = useMemo(() => {
    const total = availableItems.length;
    const watched = availableItems.filter((i) => watchedIds.has(i.id)).length;
    const percentage = total > 0 ? Math.round((watched / total) * 100) : 0;

    const movies = availableItems.filter((i) => i.tipo === 'movie');
    const movieWatched = movies.filter((i) => watchedIds.has(i.id)).length;

    const series = availableItems.filter((i) => i.tipo === 'series');
    const seriesWatched = series.filter((i) => watchedIds.has(i.id)).length;

    const specials = availableItems.filter((i) => i.tipo === 'special');
    const specialWatched = specials.filter((i) => watchedIds.has(i.id)).length;

    const phaseList = ['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4', 'Fase 5', 'Fase 6'];
    const phases: Record<string, { total: number; watched: number; percentage: number }> = {};

    phaseList.forEach((phaseName) => {
      const phaseItems = availableItems.filter((i) => i.fase === phaseName);
      const phaseWatched = phaseItems.filter((i) => watchedIds.has(i.id)).length;
      const pct = phaseItems.length > 0 ? Math.round((phaseWatched / phaseItems.length) * 100) : 0;
      phases[phaseName] = { total: phaseItems.length, watched: phaseWatched, percentage: pct };
    });

    return {
      total,
      watched,
      percentage,
      movies: { total: movies.length, watched: movieWatched },
      series: { total: series.length, watched: seriesWatched },
      specials: { total: specials.length, watched: specialWatched },
      phases,
    };
  }, [availableItems, watchedIds]);

  // Modal handlers
  const openDetailModal = (item: MCUItem, source: 'grid' | 'fav' = 'grid') => {
    setActiveDetailSource(source);
    setActiveDetailItem(item);
  };
  const closeDetailModal = () => setActiveDetailItem(null);

  // Actions
  const toggleWatched = async (id: string) => {
    const nextIsWatched = !watchedIds.has(id);
    setWatchedIds((prev) => {
      const next = new Set(prev);
      if (nextIsWatched) next.add(id);
      else next.delete(id);
      return next;
    });
    await mcuService.toggleWatchedState(id, nextIsWatched);
  };

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      storageService.saveFavoriteIds(Array.from(next));
      return next;
    });
  };

  const setRating = (id: string, rating: number | null) => {
    setRatingsState((prev) => {
      const next = { ...prev };
      if (rating === null || rating === undefined) {
        delete next[id];
      } else {
        next[id] = rating;
      }
      storageService.saveRatings(next);
      return next;
    });
  };

  const markAllAsWatched = async () => {
    const allIds = new Set(items.map((i) => i.id));
    setWatchedIds(allIds);
    items.forEach((item) => mcuService.toggleWatchedState(item.id, true));
  };

  const resetProgress = async () => {
    setWatchedIds(new Set());
    items.forEach((item) => mcuService.toggleWatchedState(item.id, false));
    setFavoriteIds(new Set());
    storageService.saveFavoriteIds([]);
    storageService.saveWatchedIds([]);
    storageService.saveRatings({});
  };

  const addCustomItem = async (
    itemData: Omit<MCUItem, 'id' | 'isCustom'>,
    imageBase64?: string
  ) => {
    const newId = `custom-${Date.now()}`;
    const baseItem: MCUItem = {
      ...itemData,
      id: newId,
      isCustom: true,
      ordenEstreno: items.length + 1,
      ordenCronologico: items.length + 1,
    };

    const saved = await mcuService.saveCustomItem(baseItem, imageBase64);
    setCustomItems((prev) => [...prev, saved]);
  };

  const updateItem = (id: string, updated: Partial<MCUItem>) => {
    setEditedMap((prev) => {
      const next = { ...prev, [id]: { ...(prev[id] || {}), ...updated } };
      storageService.saveEditedItems(next);
      return next;
    });
    setActiveDetailItem((prev) => {
      if (prev && prev.id === id) {
        return { ...prev, ...updated };
      }
      return prev;
    });
  };

  const deleteItem = (id: string) => {
    setCustomItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      storageService.saveCustomItems(next);
      return next;
    });
    setWatchedIds((prev) => {
      if (prev.has(id)) {
        const next = new Set(prev);
        next.delete(id);
        mcuService.toggleWatchedState(id, false);
        return next;
      }
      return prev;
    });
  };

  const effectiveSettings = useMemo<UserSettings>(() => {
    const activeAvatarId = user ? (user.user_metadata?.avatar_id || settings.avatarId) : settings.avatarId;
    const avatarObj = getAvatarById(activeAvatarId);
    const resolvedPicUrl = avatarObj ? avatarObj.url : (user ? DEFAULT_AVATAR : (settings.profilePicUrl || DEFAULT_AVATAR));

    return {
      ...settings,
      avatarId: activeAvatarId,
      userName: user ? (settings.userName && settings.userName !== 'Invitado' ? settings.userName : 'Usuario') : 'Invitado',
      profilePicUrl: resolvedPicUrl,
    };
  }, [settings, user]);

  return (
    <MCUContext.Provider
      value={{
        items,
        availableItems,
        upcomingItems,
        filteredItems,
        watchedIds,
        favoriteIds,
        ratings,
        filters,
        stats,
        settings: effectiveSettings,
        currentView,
        activeDetailItem,
        activeDetailSource,
        user,
        login,
        signup,
        logout,
        deleteAccount,
        requestPasswordReset,
        updatePassword,
        cookieConsent,
        acceptCookies,
        rejectCookies,
        resetCookieConsent,
        setCurrentView,
        openDetailModal,
        closeDetailModal,
        toggleWatched,
        toggleFavorite,
        setRating,
        markAllAsWatched,
        resetProgress,
        addCustomItem,
        updateItem,
        deleteItem,
        setFilters,
        resetFilters,
        updateSettings,
        updateAvatar,
      }}
    >
      {children}
    </MCUContext.Provider>
  );
};

export const useMCU = () => {
  const context = useContext(MCUContext);
  if (!context) throw new Error('useMCU debe ser usado dentro de un MCUProvider');
  return context;
};
