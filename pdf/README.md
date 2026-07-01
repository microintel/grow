# Folio — a simple PDF reader PWA

A minimal, installable, offline-capable PDF reader. Open any PDF from your
device, flip through pages with swipes or buttons, pinch to zoom, and switch
between light and dark themes. Recently opened files are remembered locally
(via IndexedDB) so you can reopen them with one tap — nothing is uploaded
anywhere.

## Files

- `index.html` — the app
- `manifest.json` — PWA manifest (name, icons, colors)
- `service-worker.js` — caches the app shell so it works offline after first load
- `icons/` — app icons (192px, 512px)

## Run it locally

PWAs (specifically the service worker and "Add to Home Screen") require being
served over HTTP(S) — opening `index.html` directly via `file://` will still
let you read PDFs, but install/offline features won't activate.

Easiest option, from this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

Any static host works too — Netlify, Vercel, GitHub Pages, Cloudflare Pages,
or your own server. Just upload the whole folder as-is.

## Installing as an app

- **iOS (Safari):** open the site → Share → "Add to Home Screen"
- **Android (Chrome):** open the site → menu (⋮) → "Install app" / "Add to Home Screen"
- **Desktop (Chrome/Edge):** look for the install icon in the address bar

Once installed, it opens full-screen without browser chrome, and previously
loaded pages/assets work offline.

## How it works

- PDF rendering is done with [PDF.js](https://mozilla.github.io/pdf.js/) (loaded from a CDN, then cached by the service worker for offline use).
- Files you open are read locally in the browser — nothing is sent to a server.
- The five most recently opened PDFs are cached in IndexedDB so you can reopen them instantly from the home screen.

## Customizing

- Colors and theme tokens live at the top of the `<style>` block in `index.html` (`:root` and `[data-theme="dark"]`).
- To change the app name/icon, edit `manifest.json` and swap files in `icons/`.
