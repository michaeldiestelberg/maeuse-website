# Mäuse Website

This repository contains the website for Mäuse, a local-first expense tracker for couples with built-in voice mode.

Live website: [mäuse.app](https://xn--muse-loa.app)

App source code: [michaeldiestelberg/maeuse](https://github.com/michaeldiestelberg/maeuse-ios)

The static site includes bilingual English/German pages for the homepage, privacy policy, support, and terms. Vercel Web Analytics is intentionally enabled on every page through `/_vercel/insights/script.js`.

To preview the site locally, serve this folder with a static file server, for example:

```sh
python3 -m http.server 4173
```

The Vercel Insights script returns 404 in a plain local server; Vercel provides it in deployed environments.
