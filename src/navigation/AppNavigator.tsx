import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '@/context/AuthContext';
import { initializeI18n } from '@/services/i18n';

import OnboardingWelcomeScreen from '@/screens/onboarding/OnboardingWelcomeScreen';
import OnboardingInterestsScreen from '@/screens/onboarding/OnboardingInterestsScreen';
import OnboardingScheduleScreen from '@/screens/onboarding/OnboardingScheduleScreen';
import OnboardingTrialScreen from '@/screens/onboarding/OnboardingTrialScreen';
import HomeScreen from '@/screens/HomeScreen';
import ExerciseScreen from '@/screens/ExerciseScreen';
import ProgressScreen from '@/screens/ProgressScreen';
import PremiumScreen from '@/screens/PremiumScreen';
import SettingsScreen from '@/screens/SettingsScreen';

export type RootStackParamList = {
  OnboardingWelcome: undefined;
  OnboardingInterests: undefined;
  OnboardingSchedule: undefined;
  OnboardingTrial: undefined;
  Home: undefined;
  Exercise: { exerciseId: string; loopNumber: number; totalLoops: number };
  Progress: undefined;
  Premium: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    initializeI18n();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      {!user ? (
        <>
          <Stack.Screen name="OnboardingWelcome" component={OnboardingWelcomeScreen} />
          <Stack.Screen name="OnboardingInterests" component={OnboardingInterestsScreen} />
          <Stack.Screen name="OnboardingSchedule" component={OnboardingScheduleScreen} />
          <Stack.Screen name="OnboardingTrial" component={OnboardingTrialScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Exercise" component={ExerciseScreen} />
          <Stack.Screen name="Progress" component={ProgressScreen} />
          <Stack.Screen name="Premium" component={PremiumScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};