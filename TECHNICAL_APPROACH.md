# Technical Approach Document
## Custom Greetings & Wishes App

---

## 1. Problem-Solving Approach: Image Overlay Logic

The main challenge was showing the user's name and profile photo on top of a greeting card template — and then merging all of that into one downloadable image.

I broke this into two separate problems: **live preview** and **export**.

### Live Preview (CSS Layering)

For the preview on screen, I used CSS `position: absolute` inside a relatively-positioned container. The template image is the base. On top of it, I placed:
- A dark gradient at the top and bottom (so text is always readable regardless of the image background)
- The user's circular avatar (top-left) using `border-radius: 50%`
- The user's name next to the avatar with a `text-shadow` for contrast
- The quote text at the bottom center

This approach is simple and instant — no canvas needed for just showing the preview. React re-renders the overlay whenever the user edits their name or swaps their photo, so the live update feels real-time.

### Export (Canvas API)

This is where things got tricky. My first approach was to use a library called `html2canvas` that captures a DOM element and converts it to a canvas. It worked locally but broke when I mixed base64 images (the user's profile photo stored in Firestore) with regular URL images (the templates). The canvas would get "tainted" and the download would fail silently.

So I dropped `html2canvas` and rewrote the export logic using the **native browser Canvas 2D API** directly. The steps are:

1. Create an 800×800 `<canvas>` element in memory
2. Fetch and draw the template background image
3. Draw dark gradient overlays (top and bottom) using `createLinearGradient`
4. Clip a circular region using `ctx.arc` + `ctx.clip()`, then draw the avatar inside it
5. Draw the white border ring around the avatar
6. Draw the user's name with `fillText` and a shadow
7. Word-wrap and draw the quote at the bottom

This approach has no dependency on the DOM structure, no CORS issues, and produces a clean 800×800 PNG every time.

---

## 2. Tech Stack

| Layer | Tool | Reason |
|---|---|---|
| UI Framework | React 19 + TypeScript | Component-based, catches bugs at compile time |
| Build Tool | Vite | Faster than CRA, simpler config |
| Styling | Tailwind CSS | Speeds up layout work significantly |
| Authentication | Firebase Auth | Handles Google login and session management out of the box |
| Database | Firestore | Stores user profile (name, photo, isPremium flag) |
| Image Export | Browser Canvas 2D API | No library needed, full control, no CORS problems |
| Sharing | Web Share API + download fallback | Native share sheet on mobile, download on desktop |
| Routing | React Router v6 | Protected routes, navigation |
| Notifications | react-hot-toast | Lightweight, easy to use |

**Note on Firebase Storage:** Initially the plan was to use Firebase Storage for profile photos. It kept throwing errors (storage bucket CORS issues, rules not configured correctly). I changed the approach — profile photos are now converted to base64 using `FileReader` and stored directly in the Firestore user document. This removed the Storage dependency entirely and made the setup simpler.

---

## 3. Challenges & How I Solved Them

**Canvas taint with mixed image sources**

The biggest issue. When I tried using `html2canvas`, it failed because the user's profile photo is a base64 data URI while templates are regular URLs. Browsers block canvas reads on mixed sources to prevent fingerprinting. My fix was to stop using `html2canvas` and draw everything manually on a canvas — I load each image with `new Image()` and draw it directly using `ctx.drawImage()`. Since I control exactly what goes in, there's no taint issue.

**Text not readable on some templates**

Light-colored templates made white text invisible. I solved this by adding gradient overlays — a dark-to-transparent gradient at the top (where the name sits) and a transparent-to-dark gradient at the bottom (where the quote sits). This ensures text always has contrast regardless of the template image.

**Auth state flicker on page load**

Firebase `onAuthStateChanged` is async, so there's a short moment where the app doesn't know if the user is logged in or not. Without handling this, the app flashes the login page before redirecting. I added a `loading` state in `AuthContext` — the app shows a loading screen until Firebase resolves the auth state.

**Profile not set up yet after first login**

After a user signs in with Google or Email for the first time, Firebase creates their account but there's no Firestore document for them yet. I check for this in `AuthContext` — if `getDoc` returns nothing, the user is redirected to `/setup` to enter their name and photo. Once setup completes, `refreshProfile()` updates the context and redirects to `/home`.

**Firebase Storage errors**

As mentioned above, Firebase Storage kept throwing errors during photo upload. Rather than spending time debugging storage rules and CORS headers, I switched to storing photos as base64 in Firestore. It's a pragmatic decision — for a demo app it works fine. The tradeoff is slightly larger Firestore documents, but Firestore's 1MB limit per document is not a concern at this scale.

---

## 4. Future Improvements

I have taken reference from the documentation as in there some api's i have not used ever. So few things which can be implemented in future are listed below. Feel free to let us know more about Greetish.

**Dynamic Templates**

For now templates are hardcoded. A better approach would be storing template metadata in Firestore and images in Firebase Storage, so new templates can be added without redeploying the app. An admin  can manage this.

**Performance on Large Template Libraries**

With many templates, loading them all at once would slow the grid down. Virtual scrolling (only rendering visible items) and lazy image loading would fix this.

**Offline Support**

A service worker could cache template images so users can create cards without internet. The profile data is already local once fetched.

**Richer Personalization**

Currently users can edit their name and swap their photo. Future versions could let users change the quote text, pick a font, add stickers, or reposition the avatar — similar to how Instagram Stories works.
