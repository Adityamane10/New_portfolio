# Aditya Mane — Portfolio

A dark, editorial portfolio for Aditya Mane, full-stack developer and AI-systems
builder. Built with React 19, TypeScript, Vite and Motion. Every visual is
bespoke CSS/SVG — there are no stock project screenshots.

## What's inside

- **Home** — a kinetic type hero, mouse-reactive signal orb, acid-lime ticker,
  selected work, an interactive about teaser, and a switchable stack panel.
- **Case studies** — `/work/crm-hcp`, `/work/soccer-solver`, and
  `/work/realtime-chat`, each with an animated interface schematic, the brief,
  the build notes, and system notes.
- **About** — `/about` for the longer story, experience, education and what
  Aditya is working on now.
- **Interactions** — custom cursor with contextual labels, magnetic buttons,
  tilt card, keyboard command palette (`Ctrl/⌘ + K`), mobile menu, copy-email,
  live Kolhapur time, and reduced-motion support.

Content is real and resume-backed: Altair Online Services internship, CRM HCP
module, Soccer Solver, RealTime Chat, MCA at KIT College, and the technical
stack.

## Run it

```sh
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build      # dist/client (assets) + dist/portfolio/index.js (Worker)
```

The Cloudflare Vite plugin keeps the Sites deploy target working. `deploy.json`
points at the build output; deployment is optional and is not performed by the
build.

## Structure

- `src/data/site.ts` — all content, project data and resume facts.
- `src/app/pages/` — Home, Work (case study) and About.
- `src/app/components/` — hero, orb, project schematics, command palette, nav,
  footer and motion primitives.
- `src/styles.css` — the full design system: type, colour, layout, schematics,
  responsive rules and reduced-motion handling.

## Notes

- Fonts are self-hosted via Fontsource: Syne, Instrument Sans, Instrument Serif,
  and JetBrains Mono.
- The contact section uses direct email/social links and clipboard copy; there
  is no fake contact form or placeholder submission endpoint.
- `scripts/postbuild.mjs` removes hidden files and source maps from the Sites
  upload output.
