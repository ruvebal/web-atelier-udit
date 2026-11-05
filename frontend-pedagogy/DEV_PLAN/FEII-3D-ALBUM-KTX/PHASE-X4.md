# PHASE-X4: Curriculum structure freeze

> **Track:** L1 structure · CV, tracks, lesson index — no prose yet.
> **Status:** BLOCKED until X3 DONE

## Goal

Make Bloque 5’s *shape* tell the truth: U8 R3F, U9 min-viable GLSL, two satellites, album-cover assignment, Unit 10 untouched. Hours remain 10/30/14.

## Deliverables

- CV Bloque 5 paragraph in `frontend-pedagogy/cv/udit-ruvebal-frontend-ii-cv.md` mentions cover assignment + KTX2 literacy as Bloque 5 technique, still “transfer not graphics degree”
- `docs/lessons/en/feii/index.md` Block 3 table links the two satellites and the retitled assignment (stubs allowed if pages land in X5–X8, but permalinks must be reserved)
- `tracks.yml` U8/U9 descriptions updated; **session count stays 12**
- `PHASE-X4-COLD-REVIEW.md`, `PHASE-X4-REPORT.md`

## Scope

**In:** CV, index, tracks descriptions, reserved slugs.
**Out:** Full lesson bodies (X5–X8). Spanish. Changing labHours numbers unless D5 was amended in X0.

## Prompt (Implementation Agent)

```text
Implement PHASE-X4 per frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X4.md.

## Deliver
1. Reserved slugs (unless X0 amended):
   - feii-cover-shaders
   - feii-ktx2-basis
   Assignment slug stays feii-units-8-9-assignment.
2. Update FE II index Block 3: U8, U9, assignment pitch line, two satellite
   links. Lab total line still equals 30.
3. tracks.yml: 12 sessions; U8/U9 description strings mention cover + KTX2
   without adding session rows.
4. CV Bloque 5: one honest paragraph; keep [UNVERIFIED-GAP] / pilot language.
5. Create stub pages now (the X4 gate requires them):
   docs/lessons/en/feii/cover-shaders/index.md and ktx2-basis/index.md,
   frontmatter + one line containing exactly "forged in X7" / "forged in X8"
   (X11 refuses if that text survives). Register both in lessons.yml as
   status draft. Follow lesson-publishing-integrity (permalink, baseurl).
6. Index/assignment stubs may name github.com/ruvebal/feii-album-covers.
7. Hand off for cold review — do NOT mark DONE.

## Constraints
- Do not steal hours from Unit 10 or capstone.
- Autopilot may commit CV/index/tracks locally. Do not push web-atelier-udit.
```

## Acceptance

- [ ] `rg "sessions: 12" docs/_data/tracks.yml` still true for feii
- [ ] Sum of FE II `labHours` is 30; `ejerciciosHours` is 14
- [ ] Index names the album-cover pitch and both satellite titles
- [ ] No new `slug: 'unit-13` / `unit-14` in tracks.yml
- [ ] Cold review filed; blocking Fn closed

## Risks

Index links 404 until X7/X8. Still-success: stub `index.md` files with frontmatter + “forged in X7/X8”, registered in lessons.yml as draft.
