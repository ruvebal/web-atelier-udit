# PHASE-X13: 3D terminology satellite (say-it-out-loud lesson)

> **Track:** L1 · new lesson `feii-3d-terminology`. Professor request 2026-11-05 (D25).
> **Status:** BLOCKED until X12 DONE

## Goal

A short student-facing reference that turns the vocabulary scattered across Unit 8, Unit 9, cover-shaders and ktx2-basis into one page a student can rehearse, organised around the professor-approved **oral paragraph** (spine §9), quoted verbatim:

> The sleeve is a picture on the GPU, not an `<img>`. A **pixel** is a screen dot; a **texel** is a colour in that GPU picture; **UV** is how the shader asks for a texel. A JPEG is small on disk and usually **large** once unpacked. **KTX2** is only the box. I picked **ETC1S** or **UASTC** because of this sleeve, and I wrote file bytes and GPU bytes from this machine.

It is a satellite under Bloque 5, like cover-shaders and ktx2-basis. It is **not** a numbered unit and adds **no** hours (D1, D5): it is reference and autonomous study. It invents no new technical claim. Every definition restates, and links to, the section that already teaches it.

## Deliverables

- `web-foundations/docs/lessons/en/feii/3d-terminology/index.md` (+ `exercises.md`, `deck-outline.md`)
- `lessons.yml` entry, unique slug `feii-3d-terminology`; linked from the FE II index (Bloque 5), Unit 8, Unit 9, cover-shaders, ktx2-basis and the assignment
- `PHASE-X13-COLD-REVIEW.md`, `PHASE-X13-REPORT.md`

## Scope

**In:**
- The oral paragraph first, then a word-by-word walk through it.
- A glossary table grouped as the journey runs: *screen and picture* (pixel, texel, texture, UV, sampler2D) → *scene* (mesh, vertex, triangle, material, draw call) → *shader* (vertex/fragment shader, uniform, varying, `shaderMaterial`) → *memory* (file bytes vs GPU bytes, upload inflation, mipmap, `renderer.info.memory.textures` as a **count**) → *colour* (screen colours, sRGB, linear, transfer function, colour space) → *packing* (container vs codec, KTX2, Basis, ETC1S, UASTC, transcode).
- Each row has an everyday gloss, a one-line "in this course" meaning, and a link to the defining section (`relative_url` + anchor).
- The two "same word, different thing" traps: **compressed** (file packing vs GPU-resident packing) and **texture** (the `.jpg` vs the GPU grid).
- A studio test: say the paragraph about *your* sleeve, with your two numbers.
- Optional links to the react-template running references (`/ex3-cover`, `/ex4-cover-shader`, `/ex5-ktx2`, D24) under the same publish rule as X11 step 11.

**Out:**
- New technical content not already taught on another page.
- Quote-database IDs (D22 applies: keep the journey, drop the names).
- WebGPU/TSL. TypeScript. Spanish (D11).

## Prompt (Implementation Agent)

```text
Implement PHASE-X13 per frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X13.md.

## Deliver
1. Read the four defining lessons (unit-8, unit-9, cover-shaders,
   ktx2-basis) on the integration branch and KTX2-FIRST-PRINCIPLES.md
   §1, §2, §6, §9. Build a term → defining section (file + anchor) map
   from the BUILT site (_site) so every anchor really exists.
2. Open the page with the oral paragraph VERBATIM (as in this file),
   then walk through it word by word in the order it speaks.
3. Glossary table grouped as in Scope. Every gloss must agree with its
   defining lesson. Where two lessons word a term differently, pick
   the defining lesson's wording and report the mismatch; do not
   silently rewrite either lesson. Texel = one stored colour; a lookup
   usually blends several. memory.textures = a count. GPU bytes are
   computed. Assign, never convert.
4. The two traps (compressed, texture). The studio test with blanks
   for the student's sleeve, mode and two numbers.
5. exercises.md: decontextualised vocabulary drills (B3), e.g.
   match the term to the sentence, spot the wrong use of "compressed".
   deck-outline.md: 5–7 slides.
6. lesson-scribe only for any B1 prose beyond the paragraph and the
   table (stdlib HTTP shim; record deviations). Say plainly who wrote
   any replacement paragraph.
7. Register in lessons.yml; link from the FE II index, U8, U9,
   cover-shaders, ktx2-basis and the assignment (one line each).
8. Build; no Liquid Warning; no internal metadata in the built HTML;
   every glossary link resolves under baseurl.
9. Hand off for cold review — do NOT mark DONE.

## Constraints
- No new claims, no invented numbers, no quote IDs.
- Autopilot may commit the lesson locally. Do not push web-atelier-udit.
```

## Acceptance

- [ ] The oral paragraph appears verbatim as the page's opening idea
- [ ] Every glossary term links to an existing anchor in its defining lesson (checked in `_site`)
- [ ] Glosses agree with the defining lessons (texel, `memory.textures` count, GPU bytes, assign vs convert); mismatches are reported, not hidden
- [ ] Pixel / UV / texel / texture come before any format name in prose (D22 order)
- [ ] No quote-database IDs; no internal metadata in the built HTML
- [ ] Registered in `lessons.yml`; linked from the index, U8, U9, both satellites and the assignment
- [ ] Build exit 0; no Liquid Warning; X11 and X12 gates still pass
- [ ] Cold review filed; blocking Fn closed

## Risks

The glossary drifts from the lessons over time. Still-success: every row links to its source section, so a reader can always check the authority, and the X13 gate re-runs X11 and X12.
