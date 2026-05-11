# Technical Approach Document

## Problem-Solving Approach: Image Overlay Logic

The core challenge is layering the user's name and circular profile photo over a background template image, then merging all layers into a single shareable image.

**Live Preview:** Implemented using CSS absolute positioning. The template image is the base layer; the user's name sits in a semi-transparent dark bar at the top (`position: absolute, top: 0`); the circular avatar is positioned top-left with Tailwind's `rounded-full` and a colored border. This approach is instant, responsive, and requires zero canvas manipulation for the preview.

**Export:** When the user taps Share, `html2canvas` captures the DOM node (the `CardOverlay` div) and renders it to an off-screen `<canvas>`. Settings used: `scale: 2` for high-DPI output, `useCORS: true` for local image access, `backgroundColor: null` for transparency safety. All template images are stored locally in `/public/templates/` — this is critical for `html2canvas` to work without canvas taint errors.

**Share:** The canvas is converted to a PNG blob. If the browser supports the Web Share API with file sharing (`navigator.canShare({ files })`), the native share sheet is triggered (works on Android Chrome and iOS Safari). On desktop browsers that don't support file sharing, a direct download is triggered as a fallback.

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React 18 + Vite + TypeScript | Fast dev, type safety |
| Styling | Tailwind CSS | Rapid UI, responsive by default |
| Auth | Firebase Authentication | Free, supports Google + Email |
| Database | Firestore | Real-time, serverless |
| File storage | Firebase Storage | Profile photo hosting |
| Image overlay | CSS absolute positioning | Zero-cost, instant preview |
| Image export | html2canvas | DOM-to-canvas, no server needed |
| Share | Web Share API + download fallback | Works on mobile and desktop |
| Routing | react-router-dom v6 | Industry standard |
| Toasts | react-hot-toast | Lightweight feedback |

## Challenges & Solutions

**1. html2canvas and image CORS**
External images cause canvas taint, making export fail silently. Solution: all template images are bundled locally in `/public/templates/` and served from the same origin. The `crossOrigin="anonymous"` attribute is set on all `<img>` tags in the overlay.

**2. Web Share API inconsistency**
`navigator.share` exists on most mobile browsers, but file sharing (`canShare({ files })`) is not universally supported. Solution: always check `navigator.canShare({ files })` before attempting file share; fall back to programmatic download.

**3. Firebase auth initialization flicker**
On page load, Firebase takes ~200ms to resolve the auth state. Without handling this, the app briefly shows the login page before redirecting authenticated users. Solution: `AuthContext` tracks a `loading` boolean; a full-screen spinner is shown until `onAuthStateChanged` fires.

**4. Profile setup redirect loop**
After Google sign-in, the user has a Firebase account but no Firestore profile document yet. The `AuthContext` checks for the profile document; if absent, the user is sent to `/setup`. After setup saves the document and calls `refreshProfile()`, the context updates and the user proceeds to `/home`.

## Future Improvements

- **Payment integration:** The `isPremium` flag in Firestore is already in place. Adding Razorpay or Stripe would only require a checkout flow that updates this field.
- **More template categories:** Templates are static data — adding new ones requires only dropping images into `/public/templates/` and adding entries to `src/data/templates.ts`.
- **Template upload by admin:** A simple Firestore-backed admin flow could replace the static data file, enabling dynamic template management without redeployment.
- **Offline support:** Service worker caching of template images would allow card creation without connectivity.
- **Custom text editing:** Future versions could let users edit the quote text or add stickers, using a canvas-based editor like Fabric.js.
