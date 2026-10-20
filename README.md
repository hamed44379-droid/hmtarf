# TAFRIHAN B2B — Partnership & Ticketing Platform

Premium single-page B2B partnership website: cinematic scroll-scrubbed hero, benefits, statistics,
collaboration model, registration form, CTA and footer.

## Stack

- **Frontend:** React 18 + Vite (port 3000, dev server with live reload)
- **Registration API:** zero-dependency Node (`node:http`) server on `127.0.0.1:8000`, proxied
  through Vite at `/api` (single-origin, no CORS needed)
- **Storage:** `data/registrations.json` (gitignored)

## Development

```bash
npm install
npm run server   # terminal 1 — registration API on :8000
npm run dev      # terminal 2 — site on http://localhost:3000
```

## Notes

- Site copy, nav, stats, steps, imagery and contact details live in `src/data/content.js`.
- Design tokens (colors, radii, shadows) live in `src/styles/global.css`.
- The hero video (Pexels) is scrubbed by scroll position — it never autoplays or loops; the poster
  image shows while it buffers. `prefers-reduced-motion` collapses the hero to a static frame.
- The Vite host allowlist is extended with the sandbox host domain only when the platform sets
  `BASE44_PREVIEW_MODE=1`; without it the config behaves exactly as a stock Vite setup.
