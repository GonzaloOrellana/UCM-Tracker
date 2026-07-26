import { MCUItem, UserSettings } from '../types/mcu';

const STORAGE_KEYS = {
  WATCHED_IDS: 'mcu_watched_ids_v1',
  FAVORITE_IDS: 'mcu_favorite_ids_v1',
  RATINGS: 'mcu_ratings_v1',
  CUSTOM_ITEMS: 'mcu_custom_items_v1',
  EDITED_ITEMS: 'mcu_edited_items_v1',
  SETTINGS: 'mcu_user_settings_v1',
};

export const DEFAULT_AVATAR = 'https://i.pinimg.com/1200x/0b/ed/a0/0beda02f28c48066e827ab6171922e4e.jpg';

const defaultSettings: UserSettings = {
  userName: 'Invitado',
  profilePicUrl: DEFAULT_AVATAR,
};

export const storageService = {
  getWatchedIds(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WATCHED_IDS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error loading watched IDs:', e);
      return [];
    }
  },

  saveWatchedIds(ids: string[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.WATCHED_IDS, JSON.stringify(ids));
    } catch (e) {
      console.error('Error saving watched IDs:', e);
    }
  },

  getFavoriteIds(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITE_IDS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error loading favorite IDs:', e);
      return [];
    }
  },

  saveFavoriteIds(ids: string[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITE_IDS, JSON.stringify(ids));
    } catch (e) {
      console.error('Error saving favorite IDs:', e);
    }
  },

  getRatings(): Record<string, number> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RATINGS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Error loading ratings:', e);
      return {};
    }
  },

  saveRatings(ratings: Record<string, number>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings));
    } catch (e) {
      console.error('Error saving ratings:', e);
    }
  },

  getCustomItems(): MCUItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_ITEMS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error loading custom items:', e);
      return [];
    }
  },

  saveCustomItems(items: MCUItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_ITEMS, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving custom items:', e);
    }
  },

  getEditedItems(): Record<string, Partial<MCUItem>> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EDITED_ITEMS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Error loading edited items:', e);
      return {};
    }
  },

  saveEditedItems(editedMap: Record<string, Partial<MCUItem>>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.EDITED_ITEMS, JSON.stringify(editedMap));
    } catch (e) {
      console.error('Error saving edited items:', e);
    }
  },

  getSettings(): UserSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
    } catch (e) {
      return defaultSettings;
    }
  },

  saveSettings(settings: UserSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  },
};
