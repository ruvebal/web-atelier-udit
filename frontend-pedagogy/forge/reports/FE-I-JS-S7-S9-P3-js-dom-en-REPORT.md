# FE-I-JS-S7-S9 — Phase 3 — js-dom-en

**Date:** 2026-10-13
**Agent:** Claude Code (Opus 5.5)

## Done

- Rewrote `web-foundations/docs/lessons/en/js-dom-manipulation/index.md` to the P1 brief.
- Four approaches collapsed into one comparison table + one-line history; Security essentials updated with the MDN pin facts.
- Lab weighted to Ex1 (strings + payload) → Ex2 (native API) → **Ex3 new: portfolio transfer** (Template). `<template>` and hyperscript moved to "Optional deep dive".
- Demos (EN):
  - `01-strings`: **Unsafe mode** checkbox; payload now reveals a red banner instead of `alert` + wiping the page, so the toggle stays usable.
  - `01–04`: classic `<script … defer>` in `<head>` (was `type="module"`).
  - `02`, `03`, `04`: same payload as 01 (shown as text); `02` uses `append` + `replaceChildren`; `03` uses `document.importNode`.
  - Every lesson Excerpt fence for a demo is now a **literal substring** of the demo file (mechanically checked).
- TTOD `cc-010` epigraph. AI moves at caps (Common failures row, Verify box, lab AI check, Submit line).
- One false-positive in the citation gate fixed ("(Baseline since February 2026)" matched the author-date regex) by rephrasing.

## Defects

- D5: closed — no `type="module"` in S8 demos.
- D6: closed — unsafe/safe both observable (headless evidence below).
- D8: closed — JSX link → react.dev "Writing Markup with JSX" (fetched 2026-10-13); TypeScript handbook links removed.
- D9: closed — objectives re-weighted; React = bridge in deep dive.
- D15 (S8 EN): closed — 6/6 fences labelled (inline demo HTML/CSS no longer duplicated; linked instead).
- D16 (S8 EN): closed — `status: complete`.
- D17: closed — `importNode` in demo 03, lesson and Common failures.
- D7 (ES demos): deferred to Phase 5 by design.

## Acceptance

- [x] XSS verify checkbox remains mandatory; unsafe and safe modes both observable — evidence: headless Chrome from `file://`: `01-strings banner_visible=0 img_nodes=0`; `01-unsafe banner_visible=1 img_nodes=1`.
- [x] Demos open via double-click *and* Live Server — evidence: all five pages render 3 cards from `file://`; built `_site/lessons/en/js-dom-manipulation/demo/` holds 12 files; all four `./demo/*.html` links resolve on disk.
- [x] Lesson links resolve; claims match code — evidence: `01–04 IN-SYNC`.
- [x] Line count ≤ 450 — evidence: 708 → **368**; checker `fences=6 unlabelled=[] liquid_risk=[] emoji_h=0`.
- [x] Build exit 0, no new warnings.

## Blockers

- (none)

## Evidence

```text
01-strings      cards=3 banner_visible=0 img_nodes=0
01-unsafe       cards=3 banner_visible=1 img_nodes=1
02-dom-api      cards=3 banner_visible=0 img_nodes=0
03-template     cards=3 banner_visible=0 img_nodes=0
04-hyperscript  cards=3 banner_visible=0 img_nodes=0
npm run build → exit=0 (first run exit=1: verify:citations false positive, fixed)
```

## Next

Phase 4 may start: yes.
