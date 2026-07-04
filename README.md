# Auto-Sweep Bot — marketing site

Static multi-page site for the Auto-Sweep Bot: what it does, how it's wired, and its
security model. Hand-built "Vault Ledger" design system — a light, editorial
engineering-dossier look (Fraunces + Archivo + Spline Sans Mono, international-orange
signal accent, interactive blueprint background). No build step, no framework, no CDN
beyond Google Fonts.

## Pages

Flat clean URLs at the site root:

- `index.html` — Home
- `security.html` — Security & threat model
- `architecture.html` — How it's wired (data flow + module map)
- `commands.html` — Command reference
- `changelog.html` — Build log
- `roadmap.html` — Status & roadmap
- `faq.html` — Skeptic's FAQ
- `setup.html` — Get started

## Assets

- `assets/site.css` — the full design system (tokens, components, motion).
- `assets/app.js` — vanilla interaction layer: cursor-tracked blueprint crosshair,
  scroll reveals, split-line headings, count-up stats, copy buttons, the self-playing
  Telegram transcript, and draw-on-scroll SVG. All motion respects
  `prefers-reduced-motion` and disables the crosshair on touch/coarse pointers.

Deploy is static — serve the folder as-is. `index.html` is the real home page.
