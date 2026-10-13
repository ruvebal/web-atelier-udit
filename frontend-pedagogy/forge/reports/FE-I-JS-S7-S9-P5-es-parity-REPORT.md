# FE-I-JS-S7-S9 — Phase 5 — es-parity

**Date:** 2026-10-13
**Agent:** Claude Code (Opus 5.5)

## Done

- Rewrote `web-foundations/docs/lessons/es/{js-intro,js-dom-manipulation,js-modules}/index.md` mirroring the EN structure, exercises, Verify lists, Common failures, Submit, AI moves.
- Spanish (Spain) teaching prose written, not machine-transliterated: e.g. "Control de IA (explica antes de pegar)", "Línea de IA", "Profundización opcional". Code labels stay `**CodeSandbox-ready**`/`**Excerpt**`/`**Template**` (they are the rule's vocabulary).
- TTOD ES twins: `js-002`, `cc-055`, `cc-056`.
- ES links: `/lessons/es/entorno-de-desarrollo/` (corrected to the ES lesson's own section 9 "Probar Node.js localmente" — ES numbering differs from EN section 8), `/lessons/es/linting-and-formatting/`, ES-locale MDN + `es.react.dev` (all HTTP 200, checked 2026-10-13).
- ES demos regenerated from EN with identical logic; visible strings, sample data and comments localised; `lang="es"`.
- ES lessons previously lacked the `lesson-outcome-graphic` include present in EN — added for parity.
- `title_alt`: titles unchanged → no edit needed.

## Defects

- D1 (ES): n/a for the broken link (ES never had it); ES Node pointer added with `relative_url`.
- D7: closed — ES demos localised, `lang="es"`, logic identical.
- D15 / D16 (ES): closed — all ES fences labelled; `status` + `tags` in all three.

## Acceptance

- [x] ES For/Not for / path / verify / failures / submit match EN substance — evidence: identical counts per lesson (H2, H3, fences, checkboxes, table rows, labels): `DIFF: {}` for all three.
- [x] No EN-only exercise left — same H3/fence/label counts; ES Ex3 portfolio lab present.
- [x] ES line counts within ±10 % of EN — 439/439, 368/368, 359/359 (±0.0 %).
- [x] Fences labelled in ES — checker `unlabelled=[]` ×3.
- [x] D7 closed — ES demos from `file://`: safe `banner_visible=0`, unsafe `banner_visible=1 img_nodes=1`; demo excerpts `IN-SYNC` ×4.
- [x] Build exit 0, no new warnings.

## Blockers

- (none)

## Next

Phase 6 may start: yes.
