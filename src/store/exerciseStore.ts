import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Exercise {
  id: string;
  skillType: 'logic' | 'memory' | 'vocabulary' | 'creativity';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTimeSec: number;
  question: {
    fr: string;
    en: string;
  };
  options: string[];
  correctAnswer: string;
  explanation: {
    fr: string;
    en: string;
  };
  xpReward: {
    correct: number;
    incorrect: number;
  };
}

export interface Session {
  id: string;
  exerciseId: string;
  userId: string;
  completedAt: Date;
  isCorrect: boolean;
  timeSpent: number;
  xpEarned: number;
}

interface ExerciseState {
  dailyExercises: Exercise[];
  completedToday: string[];
  pendingSessions: Session[];
  currentExercise: Exercise | null;
  isLoading: boolean;
  error: string | null;
  setDailyExercises: (exercises: Exercise[]) => void;
  setCompletedToday: (completed: string[]) => void;
  addPendingSession: (session: Session) => void;
  removePendingSession: (sessionId: string) => void;
  setCurrentExercise: (exercise: Exercise | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  markExerciseCompleted: (exerciseId: string) => void;
  resetDailyProgress: () => void;
}

export const useExerciseStore = create<ExerciseState>(
  persist(
    (set, get) => ({
      dailyExercises: [],
      completedToday: [],
      pendingSessions: [],
      currentExercise: null,
      isLoading: false,
      error: null,

      setDailyExercises: (dailyExercises) => set({ dailyExercises }),
      setCompletedToday: (completedToday) => set({ completedToday }),
      
      addPendingSession: (session) => {
        const { pendingSessions } = get();
        set({ pendingSessions: [...pendingSessions, session] });
      },
      
      removePendingSession: (sessionId) => {
        const { pendingSessions } = get();
        set({
          pendingSessions: pendingSessions.filter(s => s.id !== sessionId),
        });
      },

      setCurrentExercise: (currentExercise) => set({ currentExercise }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      markExerciseCompleted: (exerciseId) => {
        const { completedToday } = get();
        set({ completedToday: [...completedToday, exerciseId] });
      },

      resetDailyProgress: () => {
        set({
          dailyExercises: [],
          completedToday: [],
          currentExercise: null,
        });
      },
    }),
    {
      name: 'exercise-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        dailyExercises: state.dailyExercises,
        completedToday: state.completedToday,
        pendingSessions: state.pendingSessions,
      }),
    },
  ),
);