# PHASE-X10: `_studio` reference cover + KTX2 compare

> **Track:** L3 · instructor route `/covers/_studio` on the aggregator.
> **Status:** BLOCKED until X9 DONE

## Goal

A runnable studio cover at `/covers/_studio`: composed meshes, React state, shader sampling the sleeve, UASTC vs ETC1S switch, filled docs. Students copy `_template` to light **their** route; they do not fork `_studio`.

## Deliverables

- `covers/_studio/src/Cover.jsx` + docs + public art (original/PD)
- Gallery route `/covers/_studio` (and a KTX2 compare control in studio or `/ktx2` gallery page)
- Vendored Basis transcoder as required by the pinned three.js
- Two encoded KTX2 files **or** loud skip if toktx missing (D9; do not fake)
- Measured docs dated
- `git commit` + `git push origin` on **feii-album-covers**
- `PHASE-X10-COLD-REVIEW.md`, `PHASE-X10-REPORT.md`

## Scope

**In:** `_studio` scene, shared `src/lib` loader/probe, encode script that runs if tools exist.
**Out:** Post stack default. shadcn. Other students’ routes. web-atelier push.

## Prompt (Implementation Agent)

```text
Implement PHASE-X10 per frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X10.md.

## Deliver
1. Studio cover: sleeve, simple vinyl/stage, hover/click → state,
   useFrame without allocating geometry. Default export Cover, gallery wraps Canvas.
2. Shader samples uMap; one authored effect. JSDoc on helpers. Reuse the
   cover-shaders lesson's SleeveMaterial.jsx / sleevePicture.js unchanged
   (X7 round-2 G1: the lesson promises they move over as they are).
3. KTX2Loader + transcoder. Compare ETC1S vs UASTC vs PNG as a visible
   switch (D22 hello-world). Label two numbers in the UI or docs:
   “file bytes (suitcase)” vs “GPU bytes (room)”. GPU bytes are COMPUTED
   (PNG: width × height × 4 via THREE.TextureUtils.getByteLength; KTX2: sum
   of transcoded mipmaps[i].data.byteLength). renderer.info.memory.textures
   is only a texture count — show it, labelled as a count (X7 F3).
   Do not print a raw dump with no gloss.
   encode-cover.mjs must pass `--lower_left_maps_to_s0t0` (toktx 4.4.2;
   KTX2 is not flipped on upload) and set sRGB transfer explicitly
   (`--convert_oetf srgb`, the flag toktx help recommends; `--assign_oetf` is “use with caution”; `ktx create` equivalent `--convert-tf srgb`). _studio checks at
   runtime that texture.colorSpace === THREE.SRGBColorSpace and shows a
   UV-labelled test picture so orientation is visibly right for PNG, ETC1S
   and UASTC. Do NOT fix orientation with 1.0 - vUv.y in the shader (PNG
   and KTX2 would need different shaders). Re-check the flip flag if
   `ktx create` replaces toktx.
4. encode-cover.mjs: non-zero exit + install text if toktx missing.
   Run `which toktx ktx` FIRST. If present (the professor may install
   KTX-Software 4.4.2 .pkg after 2026-11-04 → /usr/local/bin), encode both
   modes for real and record measured bytes. Only if absent: do not install
   system software unattended; take the loud-skip path:
   ktx2-note.md says "encoder skip — toktx missing" + PNG numbers; the
   ETC1S/UASTC switch shows "not encoded yet". Never commit a fake .ktx2
   (the gate checks the KTX 2.0 magic bytes).
5. Fill covers/_studio/docs/* with this machine's numbers.
6. npm run build && npm run lint. Browser-verify gallery + /covers/_studio
   if a browser tool is up; else `npm run preview` + curl the routes, and
   say renderer.info numbers were not browser-measured.
7. Instructor `_studio` work also uses a branch + PR into main (D21),
   not a direct commit to main if protection is live. Commit and push
   feii-album-covers only.
8. Hand off for cold review — do NOT mark DONE.

## Constraints
- Same pins. Original/PD art only in _studio.
```

## Acceptance

- [ ] `npm run build` and `npm run lint` exit 0 in feii-album-covers
- [ ] Grep `uastc` and `etc1s` under `covers/_studio` or `src/lib`
- [ ] `covers/_studio/docs/ktx2-note.md` has bytes or explicit encoder skip
- [ ] Compare UI/docs label **file bytes** vs **GPU bytes (computed)**; `memory.textures` shown only as a count
- [ ] Orientation and `colorSpace` verified for PNG, ETC1S, UASTC (screenshot or logged check)
- [ ] `registry.json` lists `_studio`
- [ ] Budget caps ≤200 / ≤80 still in lib
- [ ] Cold review filed; blocking Fn closed

## Risks

toktx absent. Still-success: PNG path works; script fails loud; no fake ktx2.
