import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER_PROFILE: '@user_profile',
  DAILY_EXERCISES: '@daily_exercises',
  PENDING_SESSIONS: '@pending_sessions',
  APP_LANGUAGE: '@app_language',
};

export const storage = {
  // User Profile
  getUserProfile: async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  },

  setUserProfile: async (profile: any) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('Error setting user profile:', error);
    }
  },

  // Daily Exercises
  getDailyExercises: async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_EXERCISES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting daily exercises:', error);
      return [];
    }
  },

  setDailyExercises: async (exercises: any[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.DAILY_EXERCISES, JSON.stringify(exercises));
    } catch (error) {
      console.error('Error setting daily exercises:', error);
    }
  },

  // Pending Sessions
  getPendingSessions: async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PENDING_SESSIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting pending sessions:', error);
      return [];
    }
  },

  addPendingSession: async (session: any) => {
    try {
      const sessions = await storage.getPendingSessions();
      sessions.push(session);
      await AsyncStorage.setItem(STORAGE_KEYS.PENDING_SESSIONS, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error adding pending session:', error);
    }
  },

  clearPendingSessions: async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PENDING_SESSIONS, JSON.stringify([]));
    } catch (error) {
      console.error('Error clearing pending sessions:', error);
    }
  },

  // App Language
  getAppLanguage: async () => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.APP_LANGUAGE);
    } catch (error) {
      console.error('Error getting app language:', error);
      return null;
    }
  },

  setAppLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.APP_LANGUAGE, language);
    } catch (error) {
      console.error('Error setting app language:', error);
    }
  },

  // Clear all data
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};

export default storage;