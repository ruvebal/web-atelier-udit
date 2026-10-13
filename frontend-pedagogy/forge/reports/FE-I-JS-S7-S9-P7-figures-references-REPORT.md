# FE-I-JS-S7-S9 — Phase 7 — figures + course references

**Date:** 2026-10-13
**Agent:** Claude Code (Opus 5.5)

## Done

### Key-point figures (visual-forger 1.2.0, imagine mode)

- Generator: `web-foundations/scripts/lesson-figures/generate-js-key-figures.mjs` (`npm run generate:lesson-figures`). Parameters + EN/ES labels at the top; studio palette (paper `#F7F2E8`, ink `#111111`, accent `#C44536`, one teal ramp for the safe path); weights 400/500 only.
- Assets: `docs/assets/images/lesson-figures/<id>-<lang>-<sha256:12>.svg|png`, never rewritten; append-only `index.json` (current release `lesson-figures-c45e341e`).
- Embedded as `<figure class="lesson-key-figure">` + `<img aria-describedby>` + `<figcaption>` (flush-left, `markdown="0"`), styles in `assets/css/site.css`.

| Lesson | Figure | Placement |
| --- | --- | --- |
| S7 | `fe-i-07-event-loop` — load lane + event → listener → **DOM change** → repaint → feedback loop | Replaces the ASCII loop in "The runtime model" |
| S8 | `fe-i-08-trust-boundary` — one untrusted string, `innerHTML` (runs) vs `textContent` (inert) | Opens "Security essentials" |
| S9 | `fe-i-09-import-graph` — lab graph; `projects.js` as the boundary; `utils.js` runs once | "Studio test: the import graph" |

Design review: rendered PNGs inspected (EN + ES); fixed one label/box collision (S7), one mono overflow (S8), two edge-label/arrow collisions (S9 ES) before the final release.

### Course references in every JS lesson (EN + ES)

New section "JavaScript references" / "Referencias de JavaScript" after the code convention note:

- Standard — current reference: <https://262.ecma-international.org/> (page title verified: "ECMAScript® 2026 Language Specification").
- Recommended docs: MDN JavaScript (`en-US` / `es`).
- Trademark: <https://www.oracle.com/developer/javascript/> with MDN's verbatim statement ("Both "Java" and "JavaScript" are trademarks or registered trademarks of Oracle in the U.S. and other countries.") — the Oracle page itself carries no trademark sentence, so the wording is attributed to MDN.
- Per-session canonical MDN reference pages (S7 DOM intro, `querySelector`, `textContent`, `classList`, `addEventListener`; S8 `createElement`, `textContent`, `DocumentFragment`, `replaceChildren`; S9 `import`, `export`, `import()`, `<script>`, ECMA-262 §Modules). ES uses `/es/` pages where they exist (HTTP 200), else `en-US` marked "(en inglés)".
- S9 spec link moved from the tc39.es living draft to the current edition `262.ecma-international.org/#sec-modules` (anchor verified).
- All 17 pre-existing external URLs re-checked: 200, no redirects (non-canonical forms: none).

## Acceptance

- [x] One figure per lesson, EN + ES, SVG + PNG, content-hashed, release index — evidence: 12 files + `index.json`.
- [x] Figures render as real elements — built HTML: `<figure class="lesson-key-figure">` ×6, asset exists ×6, caption id resolves ×6, no escaped `&lt;figure`.
- [x] Three references in all six JS lesson files; canonical URLs verified.
- [x] Build exit 0; publication + citation gates pass; checker: all fences labelled, no Liquid risk (S7 447 · S8 387 · S9 378 lines, each EN = ES).

## Blockers

- (none)

## Next

Grounding pass after the Ahmes → Athanor pipeline completes — see `FE-I-JS-S7-S9-GROUNDING-PASS-PLAN.md`.
