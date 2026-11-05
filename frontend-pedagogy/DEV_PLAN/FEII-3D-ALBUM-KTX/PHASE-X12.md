# PHASE-X12: Closing audit vs AUDIT-GROUNDED

> **Track:** pack-level · student/instructor split still holds.
> **Status:** BLOCKED until X11 DONE

## Goal

A cold pass over the whole Bloque 5 student path against `AUDIT-GROUNDED.md` (original + X3 addendum). If MCP shopping, corpus-to-boilerplate, or unexplained generated shaders leaked onto the student path, this phase fails.

## Deliverables

- `CLOSING-AUDIT.md` in this cascade dir: checklist against AUDIT recs 1–10 plus D1–D22
- `PHASE-X12-COLD-REVIEW.md`, `PHASE-X12-REPORT.md`

## Scope

**In:** read-only audit of shipped lessons + repo + private module. Tiny doc fixes if a leak is trivial. Otherwise BLOCKED with paths.
**Out:** New features. WebGPU curriculum. Spanish.

## Prompt (Implementation Agent)

```text
Implement PHASE-X12 per frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X12.md.

## Deliver
1. Grep student lessons for: MCP, Stitch, 21st.dev, corpus-to-boilerplate,
   Hygraph, Nano Banana. Hits must be “instructor demo / do not install”
   or removed.
2. Confirm assignment still grades: scene, understood shader, budget,
   merge log, KTX2 choice, IP line.
3. Confirm Unit 9 still exists as intro; cover-shaders does not replace it.
4. Confirm react-template beacon still builds independently.
5. Confirm feii-album-covers is an aggregator of **routes** (`/covers/:slug`,
   registry + `_template`), not a corpus-to-boilerplate dump, and App.jsx
   is instructor-owned.
6. Confirm CONTRIBUTING.md + PR template + lint-and-build workflow match
   D21 (TTOD ritual, cover slugs, no Astro seam names as student branches).
7. Write CLOSING-AUDIT.md with pass/fail per AUDIT rec and D1–D22.
   Label rows `Rec 1` … `Rec 10` (the gate greps those labels) and `D1` … `D22`.
   Confirm the KTX2 lesson defines texel before KTX2 (D22) and has no
   quote-database citations.
8. Hand off for cold review — do NOT mark DONE.

## Constraints
- Autopilot may commit CLOSING-AUDIT.md. Do not push web-atelier-udit.
```

## Acceptance

- [ ] `CLOSING-AUDIT.md` exists; every AUDIT rec 1–10 has pass/fail + path
- [ ] Student grep for MCP-as-required is empty (or quoted as forbidden)
- [ ] `react-template` `npm run build` still exit 0
- [ ] `feii-album-covers` `npm run build` still exit 0
- [ ] Aggregator CONTRIBUTING + PR template + `lint-and-build` match D21
- [ ] Cold review filed; blocking Fn closed

## Risks

Audit addendum and lessons drifted. Amend X3/X5 rather than paper over.
