# Greetings & Wishes App

A mobile-first web app to create personalized greeting cards. Pick a template, see your name and photo on it instantly, then share or download the merged image.

## Features

- Google and Email/Password login via Firebase Auth
- Profile setup — enter your name and upload a photo
- Browse templates by category: Birthday, Anniversary, Festival, Love
- Live preview — your name and photo overlaid on every card in real time
- Personalize before sharing — edit name and swap photo on the Preview screen
- Download the final card as a PNG (800×800)
- Share directly via WhatsApp, Instagram, Email using the native share sheet (on mobile)
- Premium template lock with upsell popup (Monthly / Yearly plans)

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Firebase Auth + Firestore
- Browser Canvas 2D API (image export — no third-party library)
- React Router v6
- react-hot-toast

## Prerequisites

- Node.js 18 or above
- A Firebase project (free Spark plan works)

## Setup

**1. Clone the repo**

```bash
git clone <your-repo-url>
cd greetings-app
```

**2. Install dependencies**

```bash
npm install
```

**3. Create a Firebase project**

- Go to [console.firebase.google.com](https://console.firebase.google.com) and create a new project
- Enable **Authentication** → Sign-in methods → turn on Google and Email/Password
- Enable **Firestore Database** → start in test mode

> Firebase Storage is not required — profile photos are stored as base64 in Firestore.

**4. Add your Firebase config**

Create a file called `.env.local` in the project root:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

You can find these values in Firebase Console → Project Settings → Your apps → Web app config.

**5. Add template images**

Place your template images inside `public/templates/`. They should be named to match the entries in `src/data/templates.ts`:

```
public/templates/
├── birthday-1.jpg
├── birthday-2.jpg
├── anniversary-1.jpg
├── anniversary-2.jpg
├── festival-1.jpg
├── festival-2.jpg
├── love-1.jpg
└── love-2.jpg
```

JPG and PNG both work. Recommended size: at least 800×800px.

**6. Run the dev server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**7. Build for production**

```bash
npm run build
```

Output goes to the `dist/` folder. Can be deployed to Vercel, Netlify, or Firebase Hosting.

## App Flow

```
Login → Profile Setup → Home (template grid) → Preview (personalize) → Share / Download
```

- First-time users are redirected to `/setup` to enter their name and photo
- Returning users go directly to `/home`
- Clicking a free template opens the Preview page
- Clicking a premium template shows the upsell popup

## Project Structure

```
src/
├── components/
│   ├── CardOverlay.tsx      # Template + avatar + name + quote overlay
│   ├── ShareButton.tsx      # Share and Download buttons
│   ├── TemplateCard.tsx     # Grid card with premium badge
│   ├── PremiumPopup.tsx     # Subscription upsell modal
│   └── LoadingScreen.tsx    # Auth loading state
├── context/
│   └── AuthContext.tsx      # Firebase user + Firestore profile state
├── data/
│   └── templates.ts         # Template list and categories
├── hooks/
│   ├── useAuth.ts           # Auth context hook
│   └── useProfile.ts        # Save profile to Firestore
├── pages/
│   ├── Login.tsx            # Sign in page
│   ├── Setup.tsx            # First-time profile setup
│   ├── Home.tsx             # Template grid with category tabs
│   └── Preview.tsx          # Personalize and share
├── routes/
│   └── ProtectedRoute.tsx   # Redirects unauthenticated users
├── services/
│   ├── firebase.ts          # Firebase app init
│   └── auth.ts              # signIn / signOut helpers
└── utils/
    ├── exportCard.ts        # Canvas 2D rendering (background + avatar + text)
    ├── shareCard.ts         # Web Share API with file sharing
    └── downloadCard.ts      # Direct PNG download fallback
```

## Adding New Templates

1. Drop the image into `public/templates/`
2. Add an entry to `src/data/templates.ts`:

```ts
{
  id: 'birthday-3',
  category: 'Birthday',
  imagePath: '/templates/birthday-3.jpg',
  isPremium: false,
  quote: 'Your quote here.',
}
```

No other changes needed.

## Notes

- The share sheet (WhatsApp, Instagram, Email) only works on mobile browsers that support the Web Share API with file sharing. On desktop, the Download button saves the card as a PNG.
- Profile photos are stored as base64 strings in Firestore. Keep photos reasonably sized (under 500KB before upload) to stay within Firestore's 1MB document limit.
