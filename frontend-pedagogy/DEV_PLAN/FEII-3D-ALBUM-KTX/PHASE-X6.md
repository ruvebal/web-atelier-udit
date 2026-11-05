# PHASE-X6: Enrich Units 8–9 toward the cover

> **Track:** L1 · existing lessons, lesson-scribe, keep measured beacon.
> **Status:** BLOCKED until X5 DONE

## Goal

Unit 8’s lab still builds a scene; Unit 9 still replaces one material. Both now **aim at the cover** without deleting the beacon as the measured instructor demonstration. Live defect: if you overwrite the 2026-10-22 budget table with unmeasured cover numbers, the lesson lies.

## Deliverables

- Edits to `unit-8-r3f-fundamentals/` and `unit-9-shader-literacy/` (index, exercises, deck-outline)
- lesson-scribe records under `~/src/deviac/fine-tuning/thessia-tuning-memory/` for every new/replaced B1 paragraph
- Beacon numbers (calls 6 / tris 1368 / …) remain attributed to the beacon, dated
- `PHASE-X6-COLD-REVIEW.md`, `PHASE-X6-REPORT.md`

## Scope

**In:** prose + lab briefs that point at the assignment and satellites. Optional “your cover, not the beacon” lab step.
**Out:** New satellite pages (X7–X8). Changing three.js pins without re-measuring.

## Prompt (Implementation Agent)

```text
Implement PHASE-X6 per frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X6.md.

## Deliver
1. Read lesson-scribe SKILL.md. Check ollama ps. Use thessia-scholar-v3
   paragraph-by-paragraph for new B1 prose only. Do not one-shot the file.
2. Unit 8: keep beacon CodeSandbox-ready files; add a lab fork instruction
   — same Canvas/state/budget probe, mesh tree becomes sleeve/vinyl/stage
   of a named cover. Link assignment + KTX2 satellite (texture comes later).
3. Unit 9: keep bulb as demonstration; state that the hand-in shader must
   sample the cover (satellite X7) and must not be a paste of BulbMaterial.
4. Preserve platform pin table and the Bloom cost measurement as beacon
   facts. Do not invent cover renderer.info numbers.
5. Exercises.md: individual drills stay decontextualised (B3). Cover work
   stays in the lab (B2).
6. Run web-foundations build; grep Liquid Warning empty.
7. Hand off for cold review — do NOT mark DONE.

## Constraints
- CodeSandbox-ready | Excerpt | Template labels.
- Chicago cites only from X3 list.
- Autopilot may commit lesson files locally. Do not push web-atelier-udit.
```

## Acceptance

- [ ] Beacon budget table still present with 2026-10-22 (or a newly measured dated row)
- [ ] Assignment permalink appears in both unit labs
- [ ] At least one lesson-scribe tuning-memory directory dated this phase
- [ ] `cd web-foundations && npm run build` exit 0; no `Liquid Warning`
- [ ] Cold review filed; blocking Fn closed

## Risks

Thessia drifts into graphics-textbook tone. Still-success: reject the paragraph and keep the beacon lab intact rather than ship ungrounded prose.
