# PTag Admin Android App

A separate Android app for the PTag branch-admin login and dashboard. It uses the existing production backend and preserves the existing admin API calls.

## App identity
- App name: `PTag Admin`
- Android application ID: `com.ptag.admin`
- Backend: `https://anpr-api.gconnectt.com`

## Included admin features
- Admin username/password login (`POST /api/auth/login`)
- Branch dashboard and vehicle entry logs
- Live plate-log updates over the existing WebSocket connection
- Parking rate and special-rate controls
- Date filtering and logout

This package intentionally does not include User or Super Admin routes. It does not change the Spring Boot backend.

## Build APK with GitHub Actions
1. Create or open the GitHub repository for the separate PTag Admin app.
2. Upload the **contents of this `anpr` folder** to the repository root (so `package.json`, `src/`, `public/`, and `.github/` are at the root).
3. Push to `main` or `master`, or open **Actions** and run **Build PTag Admin Android APK** manually.
4. Open the completed workflow run and download the `PTag-Admin-APK` artifact.
5. Install `app-debug.apk` on your Android phone.

The workflow installs npm dependencies, builds React, creates the Android platform if it is not present, syncs Capacitor, and builds the debug APK. Android Studio is not required for the GitHub Actions build.

## Local Capacitor commands (optional)
```bash
npm install --legacy-peer-deps
npm run build
npx cap add android
npx cap sync android
```

## Important testing notes
- The source package is not a prebuilt APK; GitHub Actions creates the APK.
- Test with an actual Admin account, not a Super Admin account.
- The backend must permit the Capacitor Android WebView origin and the account must have the expected Admin role/permissions.
- Existing API endpoints, JWT token key (`token`), and dashboard logic are retained.
