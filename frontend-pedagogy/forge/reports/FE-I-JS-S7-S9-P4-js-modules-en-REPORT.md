# FE-I-JS-S7-S9 — Phase 4 — js-modules-en

**Date:** 2026-10-13
**Agent:** Claude Code (Opus 5.5)

## Done

- Rewrote `web-foundations/docs/lessons/en/js-modules/index.md` (hard cut).
- "Why modules" = one Excerpt + two paragraphs (IIFE → CommonJS → AMD → ES2015 in one sentence).
- New "What changes with `type="module"`" table (scope, auto-defer, strict, HTTP, import paths, run-once) — pin-checked against MDN.
- One named pair + one default pair; rule of thumb.
- Lab on the student's **own** Session 7–8 code: `utils.js` (named), `projects.js` (named, imports utils), `header.js` (default), `main.js` entry; switch to one `type="module"` tag; serve; Network check that `utils.js` loads once.
- Studio test section with a model boundary sentence.
- Barrels + `import()` → one optional deep dive. Removed: widget workshop, 5.x exercises, manifesto, JSDoc, real-world impact, books, Vite method, Next Steps, epigraph, "inspired" Kyle Simpson quote.
- TTOD `cc-004` epigraph; AI moves at caps; forward link to S10 via `relative_url`.

## Defects

- D10: closed — Vite method removed; Vite only appears in Not-for and the AI reject row.
- D11: closed — "homicidal maniac" epigraph removed (built HTML grep = 0); also removed a second unattributed "(inspired)" Kyle Simpson quote found in the old Evolution section (same §7 class).
- D12: closed — books list, mastery claims and "Beginner → Professional" commit message removed.
- D13: closed — Next Steps replaced with one line to S10 linting.
- D14: closed — "native ESM in the browser served over HTTP".
- **D19 (new, found in this phase):** old Common failures said module paths are "relative to page URL" — wrong for `import` specifiers (relative to the importing module). Closed: table + lab note now distinguish `<script src>` (page-relative) from `import` (module-relative).
- D15 / D16 (S9 EN): closed — 13/13 fences labelled; `status`, `tags` added.

## Acceptance

- [x] ≤ 400 lines; 2 h finishable — evidence: 1277 → **359**; lab = 4 small files moved from existing code + 1 tag change.
- [x] Studio test (import graph + explain one boundary) survives — dedicated section + Verify + Submit.
- [x] Fences labelled; no bundler lab creep — checker `fences=13 unlabelled=[] liquid_risk=[] emoji_h=0`.
- [x] D10–D14 closed (+ D19).
- [x] Lab code actually runs — evidence: the four `**Template**` files extracted from the lesson, served over HTTP to headless Chrome → `<ul id="projects">` filled with 2 items; same page over `file://` → empty list (the failure the lesson teaches).
- [x] Build exit 0, no new warnings; rubric + S10 links resolve on disk.

## Blockers

- (none)

## Next

Phase 5 may start: yes.
