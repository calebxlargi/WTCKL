# WTC KL — Tun Hussein Onn Venue Explorer

An interactive Three.js ballroom with conference, theatre, banquet and buffet arrangements. Includes orbit and zoom, four camera presets, atmosphere control, PNG export and fullscreen.

## Local development

Use Node.js 22 (see `.nvmrc`).

```sh
npm ci
npm run dev
```

Open the localhost URL printed by Vite. To check the production version:

```sh
npm run build
npm run preview
```

## Cloudflare Pages deployment

Connect this repository using **Workers & Pages → Create application → Pages → Import an existing Git repository**. Choose **Pages**, not a Workers application.

| Setting | Value |
| --- | --- |
| Repository | `calebxlargi/WTCKL` |
| Production branch | `main` |
| Framework preset | None |
| Root directory | Leave empty (repository root) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 22, pinned in `.nvmrc` |
| Environment variables / secrets | None required |

Cloudflare installs the dependencies and builds the static site. After the initial connection, pushes to `main` trigger production deployments. Cloudflare supplies the final `pages.dev` URL. No server, database, API key or Pages Functions are needed.

`wrangler.jsonc` declares the Pages output directory. `public/_headers` is copied to the build and supplies response headers and short-lived asset caching. The GitHub Actions workflow verifies the production build and retains the generated files; deployment itself is handled by the Cloudflare Git integration.

If using a Cloudflare account that already has a Pages project, connect this repository to that project and retain its existing project name. For optional direct deployment from an authenticated terminal, use `npx wrangler pages deploy dist --project-name YOUR_PAGES_PROJECT` after building. Use the actual Pages project name, not a guessed URL.

## Sources and modelling notes

- Room dimensions: **43.90 × 22.86 × 7.01 metres**, from the supplied 2026 fact sheet.
- Four LED positions follow the supplied annotated floor plan.
- WTC logo is cropped directly from the supplied PDF.
- Official reference photograph: https://worldtradecentrekl.com/wp-content/uploads/2026/02/WTCKL_THO_01-scaled.jpg
- Illustrative chair counts: conference **180**, theatre **624**, banquet **256**, buffet **192**. These are modelled chair counts, not certified venue capacities.
- Architecture and furniture are approximate reconstructions from photographs. This version is a real-time architectural visualisation, not a surveyed digital twin.
- Interface fonts load from Google Fonts, with local system fallbacks. Room geometry, materials, branding and reference imagery are served by the site itself.

Cloudflare documentation: https://developers.cloudflare.com/pages/configuration/build-configuration/
