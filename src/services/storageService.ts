import { MCUItem, UserSettings } from '../types/mcu';

const STORAGE_KEYS = {
  WATCHED_IDS: 'mcu_watched_ids_v1',
  RATINGS: 'mcu_ratings_v1',
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
