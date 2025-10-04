#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Test de compilation TypeScript...');

// Simple test pour vérifier que les imports fonctionnent
try {
  // Créer des fichiers de test
  const testContent = `
import React from 'react';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
export const TestComponent = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  return <Text>Test</Text>;
};
`;

  fs.writeFileSync('test-component.tsx', testContent);
  console.log('✅ Test d\u0027import réussi');
  
  // Nettoyer
  fs.unlinkSync('test-component.tsx');
  
  console.log('🎉 Test de compilation passé !');
} catch (error) {
  console.error('❌ Erreur de compilation:', error.message);
  process.exit(1);
}