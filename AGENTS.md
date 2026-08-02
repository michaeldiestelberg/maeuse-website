# AGENTS.md

## Cursor Cloud specific instructions

### What this repo is

This repository is the **static marketing/legal website for "Mäuse"** (a local-first iPhone
expense-tracker app). It is plain HTML/CSS/vanilla JS with **no build system, no package
manager, no dependencies, and no backend**. The iOS app lives in a separate repo
(`michaeldiestelberg/maeuse-ios`).

### Running the site (only "service")

Serve the repo root with any static file server. The README uses Python 3 (preinstalled):

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173/index.html`. Pages: `index.html`, `privacy.html`,
`terms.html`, `support.html`, `changelog.html`, `openai-api-key.html`. Client behavior
(EN/DE i18n, light/dark theme toggle, interactive phone mockup) lives in `app.js`
(marketing pages) and `legal.js` (legal pages).

### Lint / test / build

There is **no lint, no test suite, and no build step** — the site is served as-is. Do not
look for `npm`/`pnpm` scripts, a Makefile, or CI build config; none exist.

### Non-obvious caveats

- `/_vercel/insights/script.js` returns **404 locally** and is expected/harmless — Vercel
  injects it only in deployed environments. Do not treat this as a broken build.
- There is nothing to install; the environment update script is effectively a no-op.
