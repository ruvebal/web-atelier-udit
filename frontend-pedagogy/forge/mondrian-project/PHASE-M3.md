# PHASE-M3: Product shell — start, gallery, About story, About Us, method

> **Track:** L3 site (public). Consumes L0–L2 unchanged.
> **Status:** BLOCKED (M2 DONE)

## Goal

Ship the public shell around the editor. `/` chooses a surface and measured
composition. `/gallery/` shows the sources as live CSS Grid miniatures.
`/about/` tells the seven-scene art→measurement→ratio→CSS→colour→transformation→print
story. `/about-us/` credits the professor's proposition, cohort roles and
research framing. `/method/` explains the analyzer, uncertainty and rights.

## Deliverables

- Layouts `Base.astro`, `Source.astro`; chrome components; source
  `Frame.astro` and `Caption.astro`; pages `/`, `/gallery/`,
  `/gallery/<slug>/`, `/about/`, `/about-us/`, `/method/`.
- Seven About scenes from `MVP-PRODUCT-SPEC.md` §6. CSS scroll-driven
  animation as enhancement; a small `IntersectionObserver` fallback; complete,
  visible and static without JS or under reduced motion.
- Styles: `src/styles/{tokens,chrome,study}.css` using `@scope` for the study block, `@container` on the frame, media features for `prefers-reduced-motion` and `prefers-color-scheme`.
- Client module `src/scripts/source.js` validates and renders CSS Grid. Source
  pages can preview θ but cannot mutate or save the measured work.
- Playwright suite `services/web/tests/`: frame fit (`scrollHeight === innerHeight`) at 1280×800 and 390×664 for every study; `?theta=banana` → θ 0; θ wrap case (`?theta=350`) → Δ unchanged in the caption; axe scan; base-path link check (every `href`/`src` in `dist` starts with the base or is external).
- Lighthouse CI config (performance ≥ 95, a11y 100, best practices ≥ 95 on a study page).
- `PHASE-M3-COLD-REVIEW.md`, `PHASE-M3-REPORT.md`.

## Scope

**In:** the above; the `/about/` and `/method/` prose drafted by the instructor (plain words; citations marked `[BIBLIO-GAP]` until resolved through the evidence harness).
**Out:** the editor (M6), kiosk (M7), Spanish mirror (M9), any API call.

## Prompt (Implementation Agent)

```text
Implement PHASE-M3 per docs/DEV_PLAN/MONDRIAN/PHASE-M3.md.

## Deliver
1. Base layout: <html lang> from frontmatter/site; skip link, landmarks,
   collection navigation and base-aware URLs.
   positioned; header, main, footer as landmarks; one h1 per page. Nav from getCollection('works'), current link
   aria-current="page".
2. Source layout: use the pitch §8 viewport/frame contract, but render M2's
   derived semantic plane/line items with CSS Grid. Emit the canonical work as
   <script type="application/json" id="work-data">{JSON.stringify(work)}</script> — escape "</" as "<\/".
   Set --swatch-* on the <figure> from the work's swatches.
3. Home: A4 is the first surface; expose physical/digital presets and work
   picker. Add a base-aware `/create/<slug>/` placeholder that preserves the
   selected recipe, identifies the editor as arriving in M6, and links back;
   M6 replaces this page rather than fixing a public 404.
4. Caption: derive() output → "N columns, M rows; white x%, black y%, red z%…"; the Δ sentence with the actual
   swatch hues; the disclaimer sentence; the credit "Geometric study after <title> (<year>). Measurements: <source>."
5. Pages: /, /gallery/ (live mini grids), /gallery/<slug>/, /about/,
   /about-us/, /method/. About's observer only toggles data attributes.
6. Tests include no-JS and reduced-motion About completeness; run Playwright
   headless against `astro preview` with BASE set; run Lighthouse CI once and
   record scores.
7. Full suite (pnpm -r test/build, uv run pytest) + imports. Hand off for cold review — do NOT mark DONE.

## Constraints
- Zero JS on `/method/` and `/about-us/`. `/about/` may ship only the small
  observer fallback; `/gallery/` only the mini-render module.
- No text on chromatic planes. No image files of paintings.
- Every URL through the base helper; Playwright's dist link check is the gate.
```

## Acceptance

- Playwright: every gallery source fits both viewports; `?theta=banana` yields
  θ 0; at θ 350 the caption Δ equals θ 0.
- With JavaScript disabled all seven About headings and prose are visible. With
  reduced motion, zero animations run.
- `package.json` contains neither `framer-motion` nor `motion`.
- axe: 0 critical, 0 serious on `/`, `/gallery/`, one source and `/about/`.
- Lighthouse a11y = 100 on a gallery source; scores recorded.
- `grep -rhoE '(href|src)="[^"]+"' services/web/dist | grep -vE '^(href|src)="(/mondrian-project/|https?://|#|mailto:)'` returns nothing.
- A crawl of every internal `href` in `dist/` returns no 404, including each
  M3 `/create/<slug>/` placeholder under the Pages base path.
- Removing the frame containment rule makes the vertical reference fit test
  fail—proving the test guards the pitch §8 regression; record and revert.
- Cold review filed; blocking findings closed.

## Risks

- Only one work exists when M3 starts (M8 parallel lane still measuring) → the fit test parametrises over the collection; it is re-run as works land, and M8's gate includes it.
- `/about/` and `/method/` cite art-historical facts (pitch §5) → publish with `[BIBLIO-GAP]` markers hidden from visitors? No: publish only sentences that are either sourced or clearly framed as the instructor's description; the harness governs what becomes a citation.
