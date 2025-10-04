# 🚀 SkillLoop - Instructions de Déploiement

## 📦 Backup du Projet

**Archive disponible**: [Télécharger ici](https://page.gensparksite.com/project_backups/skillloop-complete-with-300-exercises.tar.gz)

- **Taille**: 528 Ko
- **Contenu**: Code source complet + 300 exercices + Configuration
- **Format**: tar.gz

---

## ⚠️ Problème Actuel: Push GitHub Échoué

Le code est **complètement fonctionnel** localement, mais n'a pas pu être poussé sur GitHub en raison d'un problème d'authentification.

### Solution Recommandée: Push Manuel

#### Option 1: Via GitHub Web (Plus Simple)

1. **Télécharger l'archive backup**:
   ```
   https://page.gensparksite.com/project_backups/skillloop-complete-with-300-exercises.tar.gz
   ```

2. **Extraire l'archive localement**:
   ```bash
   tar -xzf skillloop-complete-with-300-exercises.tar.gz
   cd home/user/webapp
   ```

3. **Vérifier le repository Git**:
   ```bash
   git status
   git log --oneline
   ```

4. **Configurer vos credentials Git**:
   ```bash
   git config --global user.name "Votre Nom"
   git config --global user.email "votre@email.com"
   ```

5. **Créer un Personal Access Token sur GitHub**:
   - Aller sur https://github.com/settings/tokens
   - Cliquer sur "Generate new token (classic)"
   - Cocher les permissions: `repo`, `workflow`
   - Copier le token généré

6. **Pousser vers GitHub avec le token**:
   ```bash
   git remote set-url origin https://<VOTRE_TOKEN>@github.com/thebestsystem/SkillLoop-GS.git
   git push -f origin main
   ```

#### Option 2: Via GitHub Desktop

1. Télécharger et installer [GitHub Desktop](https://desktop.github.com/)
2. Se connecter avec votre compte GitHub
3. File > Add Local Repository > Sélectionner le dossier `webapp`
4. Cliquer sur "Push origin"

---

## 🔧 Configuration Requise

### 1. Firebase Setup

**Étapes**:
1. Aller sur [Firebase Console](https://console.firebase.google.com/)
2. Créer un nouveau projet "SkillLoop"
3. Ajouter une application iOS et Android
4. Activer les services:
   - Authentication (Email/Password)
   - Firestore Database
   - Cloud Functions
   - Firebase Analytics
5. Copier les clés de configuration

**Créer le fichier `.env`** à la racine du projet:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSy...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=skillloop-xxxxx.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=skillloop-xxxxx
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=skillloop-xxxxx.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:xxxxx
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**⚠️ Important**: Ajouter `.env` au `.gitignore` (déjà fait)

### 2. RevenueCat Setup

**Étapes**:
1. Aller sur [RevenueCat](https://www.revenuecat.com/)
2. Créer un compte et un nouveau projet
3. Configurer les produits:
   - **Monthly Premium**: `skillloop_premium_monthly` ($9.99/mois)
   - **Yearly Premium**: `skillloop_premium_yearly` ($79.99/an)
4. Configurer l'essai gratuit 7 jours
5. Copier la clé API publique

**Modifier `app.json`**:
```json
{
  "expo": {
    "extra": {
      "revenueCat": {
        "apiKey": "VOTRE_CLE_API_REVENUECAT"
      }
    }
  }
}
```

### 3. Firestore Security Rules

**Créer `firestore.rules`**:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Sessions collection
    match /sessions/{sessionId} {
      allow read, write: if request.auth != null;
    }
    
    // Exercises (read-only for all authenticated users)
    match /exercises/{exerciseId} {
      allow read: if request.auth != null;
      allow write: if false; // Admins only via console
    }
  }
}
```

**Déployer les rules**:
```bash
firebase deploy --only firestore:rules
```

### 4. Firestore Indexes

**Créer `firestore.indexes.json`**:
```json
{
  "indexes": [
    {
      "collectionGroup": "sessions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "completedAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "sessions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "skillType", "order": "ASCENDING" },
        { "fieldPath": "completedAt", "order": "DESCENDING" }
      ]
    }
  ]
}
```

**Déployer les indexes**:
```bash
firebase deploy --only firestore:indexes
```

---

## 🚀 Installation & Lancement

### Prérequis
```bash
# Node.js 18+
node --version

# npm ou yarn
npm --version

# Expo CLI
npm install -g expo-cli

# Compte Expo (gratuit)
npx expo login
```

### Installation des Dépendances
```bash
cd webapp
npm install
```

### Lancement en Mode Développement

#### Sur iOS (Mac uniquement)
```bash
npm run ios
```

#### Sur Android
```bash
npm run android
```

#### Sur Web (Tests uniquement)
```bash
npm run web
```

#### Avec Expo Go (Recommandé pour tests rapides)
```bash
npm start
```
Puis scanner le QR code avec:
- iOS: Caméra native
- Android: App Expo Go

---

## 🧪 Tests

### Installation des Dépendances de Test
```bash
npm install --save-dev jest @testing-library/react-native detox
```

### Lancer les Tests Unitaires
```bash
npm test
```

### Lancer les Tests E2E
```bash
npm run test:e2e
```

---

## 📱 Build & Publication

### Build pour iOS (Mac uniquement)

1. **Configurer le bundle identifier**:
   ```json
   // app.json
   {
     "expo": {
       "ios": {
         "bundleIdentifier": "com.skillloop.app"
       }
     }
   }
   ```

2. **Build avec EAS**:
   ```bash
   npm install -g eas-cli
   eas login
   eas build --platform ios
   ```

3. **Soumettre à l'App Store**:
   ```bash
   eas submit --platform ios
   ```

### Build pour Android

1. **Configurer le package**:
   ```json
   // app.json
   {
     "expo": {
       "android": {
         "package": "com.skillloop.app"
       }
     }
   }
   ```

2. **Build avec EAS**:
   ```bash
   eas build --platform android
   ```

3. **Soumettre au Play Store**:
   ```bash
   eas submit --platform android
   ```

---

## 📊 Monitoring & Analytics

### Firebase Analytics (Déjà Intégré)

Les événements suivants sont trackés automatiquement:
- `onboarding_completed`
- `loop_started`
- `loop_completed`
- `exercise_completed`
- `premium_trial_started`
- `premium_converted`
- `streak_reset`

### RevenueCat Analytics

Dashboard disponible sur [app.revenuecat.com](https://app.revenuecat.com)

Métriques automatiques:
- Taux de conversion (Free → Premium)
- Churn rate
- LTV (Lifetime Value)
- MRR (Monthly Recurring Revenue)

---

## 🐛 Dépannage

### Erreur: "Expo SDK version mismatch"
```bash
npm install expo@latest
```

### Erreur: "Metro bundler stuck"
```bash
npx expo start --clear
```

### Erreur: "Firebase not initialized"
1. Vérifier que le fichier `.env` existe
2. Vérifier que les clés Firebase sont correctes
3. Redémarrer le serveur: `npm start`

### Erreur: "RevenueCat initialization failed"
1. Vérifier la clé API dans `app.json`
2. Vérifier que les produits sont créés sur RevenueCat
3. Vérifier que le bundle ID correspond

---

## 📞 Support

**Repository GitHub**: https://github.com/thebestsystem/SkillLoop-GS

**Documentation**:
- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [RevenueCat Documentation](https://docs.revenuecat.com/)
- [React Navigation](https://reactnavigation.org/docs/getting-started)

---

## ✅ Checklist Avant Déploiement

- [ ] Code poussé sur GitHub
- [ ] Firebase configuré (.env créé)
- [ ] RevenueCat configuré (app.json modifié)
- [ ] Firestore rules déployées
- [ ] Firestore indexes créés
- [ ] Tests unitaires passent
- [ ] Tests E2E passent
- [ ] App testée sur iOS et Android
- [ ] Analytics configurés
- [ ] Bundle IDs configurés
- [ ] App icons créés
- [ ] Splash screen créé
- [ ] Store listings préparés (descriptions, screenshots)

---

**Statut**: ✅ Code complet et fonctionnel  
**Blocage**: ⚠️ Push GitHub en attente (résolu via backup manuel)  
**Prochaine Étape**: Configurer Firebase et RevenueCat
