import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  uid: string;
  email: string;
  name?: string;
  interests: string[];
  preferredTime: '8am' | '12pm' | '7pm';
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserStats {
  totalXP: number;
  totalLoops: number;
  totalTime: number;
  accuracy: number;
  currentStreak: number;
  longestStreak: number;
  level: number;
  lastSessionAt?: Date;
}

export interface UserSubscription {
  status: 'free' | 'trial' | 'premium' | 'cancelled';
  trialEndDate?: Date;
  subscriptionId?: string;
  isActive: boolean;
}

interface UserState {
  profile: UserProfile | null;
  stats: UserStats | null;
  subscription: UserSubscription | null;
  isLoading: boolean;
  error: string | null;
  setProfile: (profile: UserProfile) => void;
  setStats: (stats: UserStats) => void;
  setSubscription: (subscription: UserSubscription) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
  updateXP: (xp: number) => void;
  updateStreak: (streak: number) => void;
}

export const useUserStore = create<UserState>(
  persist(
    (set, get) => ({
      profile: null,
      stats: null,
      subscription: null,
      isLoading: false,
      error: null,

      setProfile: (profile) => set({ profile }),
      setStats: (stats) => set({ stats }),
      setSubscription: (subscription) => set({ subscription }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearUser: () => set({ profile: null, stats: null, subscription: null }),

      updateXP: (xp) => {
        const { stats } = get();
        if (stats) {
          set({
            stats: {
              ...stats,
              totalXP: stats.totalXP + xp,
            },
          });
        }
      },

      updateStreak: (streak) => {
        const { stats } = get();
        if (stats) {
          set({
            stats: {
              ...stats,
              currentStreak: streak,
              longestStreak: Math.max(stats.longestStreak, streak),
            },
          });
        }
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        profile: state.profile,
        stats: state.stats,
        subscription: state.subscription,
      }),
    },
  ),
);