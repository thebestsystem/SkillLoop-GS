# SkillLoop

Application mobile de micro-entraînements cognitifs développée avec React Native + Expo + Firebase + RevenueCat.

## 🚀 Stack Technique

- **Frontend**: React Native + Expo SDK 51+
- **Langage**: TypeScript
- **State Management**: Zustand
- **Navigation**: React Navigation v6
- **UI**: React Native Paper
- **Backend**: Firebase (Auth, Firestore, Functions, Analytics)
- **Paiement**: RevenueCat
- **Notifications**: Expo Notifications
- **Offline**: AsyncStorage + NetInfo

## 📁 Structure du Projet

```
/src
  /app              # Configuration principale de l'app
  /screens          # Écrans de l'application
  /components       # Composants réutilisables
  /store            # Zustand stores
  /services         # Services (Firebase, i18n, etc.)
  /utils            # Utilitaires
  /constants        # Constantes et thèmes
  /assets/exercises # Fichiers d'exercices
/functions          # Cloud Functions Firebase
/tests              # Tests unitaires et E2E
```

## 🎯 Fonctionnalités

### Parcours Utilisateur
1. **Onboarding** (4 étapes)
   - Bienvenue et présentation
   - Choix des centres d'intérêt (≥2 parmi Logique, Mémoire, Vocabulaire, Créativité)
   - Créneau horaire préféré (8h/12h/19h)
   - Essai Premium 7 jours

2. **Home**
   - Header avec streak, XP, badges
   - "Today's Loops" : 3 cartes (skill, difficulté, temps)
   - CTA "Start My Loop"
   - Bannière upgrade (Free: 3 loops/jour)

3. **Exercise**
   - Progress bar "Loop 1/3"
   - Timer et feedback modal
   - Système d'XP

4. **Progress**
   - Vue d'ensemble (niveau, XP, loops, temps, précision, streak)
   - Graphiques Premium
   - Système de badges

5. **Premium**
   - Comparaison Free vs Premium
   - Abonnements mensuel/annuel avec essai 7 jours

6. **Settings**
   - Profil, notifications, abonnement, à propos

## 🎮 Règles Métier

- **XP et Niveaux**: Seuil d'XP progressifs
- **Streak**: +1 si <48h, reset sinon, freeze Premium 1/semaine
- **Offline-first**: Queue des sessions + sync batch
- **Notifications**: Planifiées selon l'heure préférée

## 🧪 Tests

- Unit: XP, niveaux, streak, sélection sans répétition
- Intégration: sync offline/online, webhook RevenueCat
- E2E: onboarding → 1er loop

## 🚀 Lancement

```bash
# Installation
cd SkillLoop
npm install

# Lancement
npm start
# ou
npm run ios
# ou
npm run android
```

## 🔧 Configuration

### Variables d'environnement Firebase
Créer un fichier `.env` avec:
```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

### RevenueCat
Configurer la clé API dans `app.json`.

## 📊 Analytics

Événements trackés:
- `onboarding_completed`
- `loop_started`
- `loop_completed`
- `premium_trial_started`
- `premium_converted`
- `streak_reset`

## 📦 Livrables

- Code Expo (TypeScript)
- Cloud Functions (TypeScript)
- 300 exercices JSON
- Firestore rules/indexes
- Documentation complète

## 📈 Performance

- Crash-free: 100 sessions
- TTI: <2s (iPhone 12)
- i18n: FR/EN complet
- Accessibilité: AA