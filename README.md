# Greetings & Wishes App

A personalized greeting card web app built with React + Firebase.

## Features

- Google OAuth and Email/Password authentication
- Profile setup with name and photo upload
- Browse greeting templates by category (Birthday, Anniversary, Festival, Love)
- Live preview: your name and photo overlaid on every template
- Share or download the merged card image
- Premium template upsell popup

## Tech Stack

- React 18 + Vite + TypeScript
- Tailwind CSS
- Firebase (Auth, Firestore, Storage)
- html2canvas
- react-router-dom v6
- react-hot-toast

## Setup

1. Clone the repo:
   ```bash
   git clone <your-repo-url>
   cd greetings-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication: Google + Email/Password
   - Enable Firestore Database
   - Enable Storage

4. Copy `.env.local.example` to `.env.local` and fill in your Firebase config:
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

5. Add template images to `public/templates/` (JPG or PNG only).

6. Start dev server:
   ```bash
   npm run dev
   ```

7. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/   # Reusable UI components
├── context/      # AuthContext (Firebase user + profile)
├── data/         # Static template data
├── hooks/        # useAuth, useProfile
├── pages/        # Login, Setup, Home, Preview
├── routes/       # ProtectedRoute
├── services/     # Firebase init, auth functions
└── utils/        # exportCard, shareCard
```
