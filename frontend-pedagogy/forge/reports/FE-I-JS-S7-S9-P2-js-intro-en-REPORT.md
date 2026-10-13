# FE-I-JS-S7-S9 — Phase 2 — js-intro-en

**Date:** 2026-10-13
**Agent:** Claude Code (Opus 5.5)

## Done

- Rewrote `web-foundations/docs/lessons/en/js-intro/index.md` to the P1 brief.
- New body order: spine → objectives → code convention note → runtime model → DevTools first → DOM → events → lab (3 commits) → summary + outcome graphic → optional deep dive (history, C++/JS/PHP table, Node.js pointer) → extra → ATELIER.
- Commit 2 now updates `#status` (`aria-live="polite"`) instead of `alert()`; Commit 3 toggles `.is-scrolled` via CSS class with a passive listener instead of inline styles.
- TTOD `js-001` epigraph after the studio test.
- AI moves at caps: 1 Common-failures row, 1 Verify box, 1 lab "AI check", 1 Submit line linking the oral-defence rubric.

## Defects

- D1: closed — `relative_url` link to the development-environment page, no fragile fragment; built `href="/web-atelier-udit/lessons/en/development-environment/"`.
- D2: closed — no `alert()` as feedback; one line explains why to avoid it.
- D3: closed — path starts with the loop sketch and DevTools; history moved to optional deep dive.
- D4: closed — "3 h in class (≈ 0.5 h framing · 0.5 h guided exercises · 1.5 h lab)".
- D15 (S7 EN): closed — 16/16 fences labelled.
- D16 (S7 EN): closed — `status: complete`, `tags` added.
- D18: closed — "Work inprogress" placeholder removed.

## Acceptance

- [x] Line count ≤ 450 — evidence: 806 → **439**.
- [x] All fences labelled; Liquid-safe — evidence: checker `fences=16 unlabelled=[] liquid_risk=[] emoji_h=0`.
- [x] D1–D4 closed — above.
- [x] Spine sections present; Submit evidence unchanged in spirit + AI line.
- [x] Local build: no new warnings vs P0 baseline — evidence: `npm run build` exit 0 (10 s); only grep match is `[mark-broken-links] No error files found` (baseline noise); built page contains epigraph and `is-scrolled` code.

## Blockers

- (none)

## Evidence

```text
en/js-intro/index.md: lines=439 fences=16 unlabelled=[] liquid_risk=[] emoji_h=0
href="/web-atelier-udit/evaluation/shared/ai-declaration-oral-defence-rubric/"
href="/web-atelier-udit/lessons/en/development-environment/"
```

## Next

Phase 3 may start: yes.
