#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification de la structure SkillLoop...');

const requiredDirs = [
  'src/app',
  'src/screens',
  'src/screens/onboarding',
  'src/components',
  'src/store',
  'src/services',
  'src/utils',
  'src/constants',
  'src/assets/exercises',
  'functions',
  'tests',
];

const requiredFiles = [
  'package.json',
  'tsconfig.json',
  'babel.config.js',
  'app.json',
  'index.js',
  'README.md',
  'src/app/App.tsx',
  'src/navigation/AppNavigator.tsx',
  'src/services/i18n.ts',
  'src/services/firebase.ts',
  'src/context/AuthContext.tsx',
  'src/store/userStore.ts',
  'src/store/exerciseStore.ts',
  'src/constants/theme.ts',
  'src/constants/translations/en.json',
  'src/constants/translations/fr.json',
  'src/screens/onboarding/OnboardingWelcomeScreen.tsx',
  'src/screens/onboarding/OnboardingInterestsScreen.tsx',
  'src/screens/onboarding/OnboardingScheduleScreen.tsx',
  'src/screens/onboarding/OnboardingTrialScreen.tsx',
  'src/screens/HomeScreen.tsx',
  'src/screens/ExerciseScreen.tsx',
  'src/screens/ProgressScreen.tsx',
  'src/screens/PremiumScreen.tsx',
  'src/screens/SettingsScreen.tsx',
  'src/assets/exercises/exercises.json',
  'src/utils/helpers.ts',
  'src/utils/exerciseSelector.ts',
  'src/services/storage.ts',
  'src/services/revenuecat.ts',
];

let allGood = true;

// Vérifier les dossiers
requiredDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.log('❌ Dossier manquant:', dir);
    allGood = false;
  } else {
    console.log('✅ Dossier:', dir);
  }
});

// Vérifier les fichiers
requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log('❌ Fichier manquant:', file);
    allGood = false;
  } else {
    console.log('✅ Fichier:', file);
  }
});

// Vérifier le package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = [
  'expo',
  'react-native',
  'zustand',
  '@react-navigation/native',
  'react-native-paper',
  'i18next',
  'react-i18next',
  'firebase',
  '@react-native-async-storage/async-storage',
];

requiredDeps.forEach(dep => {
  if (!packageJson.dependencies[dep]) {
    console.log('❌ Dépendance manquante:', dep);
    allGood = false;
  } else {
    console.log('✅ Dépendance:', dep);
  }
});

if (allGood) {
  console.log('\n🎉 Structure SkillLoop complète et valide !');
  process.exit(0);
} else {
  console.log('\n❌ Certains éléments sont manquants dans la structure.');
  process.exit(1);
}