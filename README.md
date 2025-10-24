# FAAQS - Plateforme de préparation au BTS

Une plateforme moderne et efficace pour préparer le BTS avec des fiches claires, des quiz interactifs et des exercices corrigés.

## Installation

1. Clonez le repository
   \`\`\`bash
   git clone <your-repo-url>
   cd faaqs
   \`\`\`

2. Installez les dépendances
   \`\`\`bash
   npm install

# ou

yarn install

# ou

pnpm install
\`\`\`

3. Copiez le fichier d'environnement
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. Lancez le serveur de développement
   \`\`\`bash
   npm run dev

# ou

yarn dev

# ou

pnpm dev
\`\`\`

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run start` - Lance l'application en mode production
- `npm run lint` - Vérifie le code avec ESLint
- `npm run type-check` - Vérifie les types TypeScript
- `npm run create-admin` - Crée le compte administrateur par défaut

## Technologies utilisées

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS v4** - Framework CSS
- **Radix UI** - Composants accessibles
- **Lucide React** - Icônes
- **Geist** - Police de caractères
- **Firebase** - Backend (Auth, Firestore, Storage)

# GESTION DE BASE DE DONNEES

1. Configurez Firebase

   - Créez un projet Firebase sur [console.firebase.google.com](https://console.firebase.google.com)
   - Activez Authentication (Email/Password et Google)
   - Créez une base de données Firestore
   - Créez un bucket Storage
   - Copiez vos clés de configuration dans `.env.local`

2. Créez le compte administrateur par défaut
   \`\`\`bash
   npm run create-admin
   \`\`\`

**Identifiants admin par défaut:**

- Email: `admin@faaqs.com`
- Mot de passe: `FAAQSAdmin2024!`

⚠️ **Important:** Changez ce mot de passe après votre première connexion!

## Structure du projet

\`\`\`
faaqs/

├── app/ # App Router de Next.js

│ ├── admin/ # Dashboard administrateur

│ ├── auth/ # Pages d'authentification

│ ├── community/ # Forum communautaire

│ ├── dashboard/ # Tableau de bord étudiant

│ ├── programmes/ # Pages des programmes BTS

│ ├── quizzes/ # Système de quiz

│ └── ressources/ # Ressources téléchargeables

├── components/ # Composants réutilisables

│ ├── admin/ # Composants admin

│ └── ui/ # Composants UI (shadcn)

├── lib/ # Utilitaires et configurations

│ ├── firebase.ts # Configuration Firebase

│ ├── auth-context.tsx # Contexte d'authentification

│ ├── firestore-helpers.ts # Helpers Firestore

│ └── firestore-types.ts # Types TypeScript

├── scripts/ # Scripts utilitaires

│ └── create-admin.ts # Script de création admin

├── public/ # Assets statiques

└── firestore.rules # Règles de sécurité Firestore
\`\`\`

## Fonctionnalités

### Pour les étudiants

- Consultation des programmes BTS disponibles
- Accès aux fiches de révision
- Quiz interactifs avec suivi de progression
- Forum communautaire pour poser des questions
- Téléchargement de ressources (PDF, annales)
- Tableau de bord personnel avec statistiques

### Pour les administrateurs

- Gestion des programmes et quiz
- Modération du forum communautaire
- Gestion des utilisateurs et abonnements
- Upload de fichiers (PDF, images)
- Création d'autres comptes administrateurs
- Statistiques et analytics

## Sécurité

L'application utilise Firebase Security Rules pour contrôler l'accès aux données:

- Les étudiants peuvent uniquement lire les contenus publics
- Les administrateurs ont accès complet
- Les données de progression sont privées par utilisateur
- Les uploads de fichiers sont restreints aux administrateurs

## Variables d'environnement

Créez un fichier `.env.local` avec les variables suivantes:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

## Déploiement

L'application peut être déployée sur Vercel:

\`\`\`bash
vercel deploy
\`\`\`

N'oubliez pas de configurer les variables d'environnement dans les paramètres de votre projet Vercel.

## Support

Pour toute question ou problème, contactez-nous à contact@faaqs.com
