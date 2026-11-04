# PHASE-X8: KTX2 satellite lesson (UASTC vs ETC1S)

> **Track:** L1 · new lesson `feii-ktx2-basis`.
> **Status:** BLOCKED until X7 DONE

## Goal

Teach a reader who has never heard **texel** and is not a WebGL expert. Binding spine: [KTX2-FIRST-PRINCIPLES.md](KTX2-FIRST-PRINCIPLES.md) (D22). Brand names (KTX2, ETC1S, UASTC, Basis) arrive **after** pixel / UV / texel / texture and the JPEG suitcase vs GPU room. The graded outcome is a **written choice** plus two labelled numbers, not “I used KTX2.”

## Deliverables

- `web-foundations/docs/lessons/en/feii/ktx2-basis/index.md` (+ exercises.md, deck-outline.md)
- `lessons.yml` entry `feii-ktx2-basis`
- Template `docs/ktx2-note.md` for the assignment (mode, why, licence, file bytes, textures row)
- lesson-scribe records whose B1 briefs are the spine sections, not a Khronos dump
- `PHASE-X8-COLD-REVIEW.md`, `PHASE-X8-REPORT.md`

## Scope

**In:** First-principles HOW. Recycle `40-asset-pipeline.mdc` *ideas* (prefer GPU-resident textures) in student voice. Compare table UASTC vs ETC1S after the suitcase story. Template encode script that X10 implements. One ASCII or semantic figure: file → decode → GPU memory.
**Out:** Assumed graphics vocabulary. Tao / quote-database citations on this page (D22). Claiming HE evidence for KTX2 pedagogy unless X3 vaulted it. Requiring every student to install KTX-Software (D9). Invented MB ratios.

## Prompt (Implementation Agent)

```text
Implement PHASE-X8 per frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X8.md
and KTX2-FIRST-PRINCIPLES.md. The published lesson must educate someone
who has never heard “texel.”

## Deliver
1. STEP A on the X3 KTX2 matrix row. If the row is platform-only, say so
   (vendor/standard vs HE). Angel & Shreiner remain the graphics-pedagogy
   precedent; they do not validate this KTX2 page.
2. lesson-scribe for B1. Check ollama ps. One BRIEF per spine section
   in KTX2-FIRST-PRINCIPLES.md §§0–5 (webpage you know → three words →
   suitcase → two “compressed” → container vs codec → the written choice).
   Do not skip to Khronos in paragraph one.
3. Master idea + studio test from the spine. Define pixel, UV, texel,
   texture in a table before any of: KTX2, ETC1S, UASTC, Basis, transcode.
   Discriminated fields: file packing ≠ GPU-resident packing.
4. Table: typical use (photo sleeve vs sharp type). No invented ratios.
   Missing measured pair → “measured in the reference repo (X10).”
5. Excerpt: KTX2Loader + transcoder path, after the why. Template:
   ktx2-note.md asking mode, why, source licence, file bytes,
   renderer.info.memory.textures (label those two numbers in prose).
6. IP: encode the student's own source PNG. Link cover-shaders +
   assignment. Unit 8 renderer.info and Unit 9 UV are prerequisites,
   restated in one sentence each — do not assume they are remembered.
7. No tao-development-quote / quote IDs on this lesson (D22).
8. Register, link from U8/U9/assignment. Build + Liquid + citation firewall.
9. Hand off for cold review — do NOT mark DONE.

## Constraints
- Do not cite pass1.edited.md footnote 29 (chatgpt UTM) as the student URL.
- Autopilot may commit the satellite locally. Do not push web-atelier-udit.
- Do not write as if the reader is a 3D specialist.
```

## Acceptance

- [ ] Page defines pixel, UV, texel, and texture **before** KTX2 / ETC1S / UASTC
- [ ] Page separates file packing (JPEG/PNG) from GPU-resident packing; no single “compressed”
- [ ] Page uses separate terms for ETC1S and UASTC; no “just use KTX2”
- [ ] Studio test / oral paragraph is present (spine §9)
- [ ] No `tao-development-quote` and no `` `arch-` `` / `` `qa-` `` / `` `dop-` `` IDs on the page
- [ ] `docs/ktx2-note.md` Template asks for mode, why, source licence, file bytes, `renderer.info.memory.textures`
- [ ] Normal build HTML has no coat/node/Ahmes strings
- [ ] lessons.yml row exists; index links resolve in `_site`
- [ ] Build exit 0; no Liquid Warning
- [ ] Cold review filed; blocking Fn closed

## Risks

Transcoder wasm path is version-brittle. Still-success: lesson names the three.js pin and says “copy the loader files the repo vendors”, rather than a CDN guess. Missing encoder: inflation demo still works with PNG.
