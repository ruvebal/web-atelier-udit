# PHASE-X3 · Choreograph and make every facet selectable

**Status:** DONE
**Branch:** `cascade/CANONICAL-FAVICON-RIVE-3D-3`

## Outcome

The X2 static mesh is now a 9 s deterministic choreography with depth-correct facet selection. `choreo.as` owns the loop: staggered per-facet extrusion (smoothstep windows, reverse-order retraction), a separation pulse, inspect-camera weighting via quaternion slerp, and exponential orbit damping (`1 - e^{-λdt}`, λ = 6) that is frame-rate independent by construction. `pick.as` is a pure CPU picker over the packed 40-byte vertex records — it rebuilds the camera ray from the shared `CameraFrame`, applies the same extrusion/separation/selection transforms the shader evaluates, mirrors the GPU discard rule (`e < ε && nz < 0.5` skipped) and the `lessEqual` later-source-order tie-break, and returns the nearest positive visible facet or -1. `main.as` wires pointer down/move/up with a 3 px drag deadzone, click/tap toggling into a 256-bit selection word set uploaded in the frame uniform, touch input, and reset; every pick logs a parseable `x3pick facet=N selected=S count=C` (or `x3pick reset`) line through `context.log`. `canonical-favicon.wgsl` consumes the expanded uniform and applies per-facet displacement plus the camera-relative selected offset while keeping front/back/side material classes and `lessEqual` depth.

Rest fidelity is preserved exactly: `build/x3-rest.png` is pixel-identical (ImageMagick AE = 0) to `build/canonical-rest.png` — the X2 frontal pose is untouched. `build/x3-inspect.png`, `x3-narrow.png`, and `x3-wide.png` are the X3 pose/viewport captures; `build/fava_prismatic_3d.riv` is rebuilt, verified (`rive --verify`, 0 errors) and signed; `build/gpu-manifest.json` now records the 40-byte/4-attribute vertex layout.

## Verification prepared for the external gate

- `rive <project> --verify` — 0 errors (1 lint warning: none remaining after unused-import cleanup; see notes).
- `rive <project> --test` — `tests/interaction-test.as`, **22/22 passed**: loop phase wrapping, extrusion/retraction ordering, separation, quaternion identity/90°/45°-midpoint/near-identical stability, damping equivalence and bounded long frames, deterministic unit-length facet directions, a 1e-6 view-z separation that must keep the nearer facet over later source order, `Main.advance(5)` proving the 0.5 s damping clamp, and picker fixtures (single hit, corner miss, equal-depth source-order tie, nearest-positive, selected offset, collapsed-back visibility, narrow/wide centre ray, real packed blobs).
- `node scripts/svg-extrusion/verify-picking.mjs --all-fixtures` — independent JS re-implementation of the choreography math and picker; drives `rive --commands` pointer/touch/viewport/advance sessions and compares logged `x3pick` events against predicted expected IDs. **A1–A11 all PASS.**
- `node scripts/svg-extrusion/capture-x3-evidence.mjs` — replays A1–A11, stores immutable transcripts in `baseline/X3/`, writes `PHASE-X3-EVIDENCE.json` (reportStatus VERIFYING).
- `node scripts/svg-extrusion/verify-phase-evidence.mjs X3` — PASS, 11 acceptance items match the runbook.
- `PHASE-X3.exit-gate.sh` additionally requires `tests/interaction-test.as`, `rive --test`, the picking verifier, and evidence verification.

Measured results: A1 selects the smallest facet (`facet-03`, 18 verts), the largest (`facet-01`, 810 verts) and an overlapping pair (`facet-05` over `[facet-01, facet-05]`, later source order wins) by expected ID; A2/A3 match all eight session events (occlusion, reset, z-offset select+probe on a clean bitset, touch, two separated-motion picks, rest back-face culling probe) against the JS mirror, with each pick evaluated at its exact `--commands` frame; A5 rest-pose pixel diff vs a fresh rest capture is 0; A6 picks correctly at 400×480 and 1200×480; A9 equal-elapsed screenshots identical across 6f/3f/1f advance granularities; A10 960 ms damping identical at ~30/60/144 Hz subdivisions and a 5 s advance still picks correctly.

## Cold-review corrections (post-`ef6e900`)

The cold review blocked DONE on one P0, one P1 and four P2 findings; all are corrected in this tree and the phase stays VERIFYING for a fresh gate:

- **F1 (P0, uniform layout):** the frame block is now 192 bytes matching the WGSL `Frame` struct — `camDir` at byte 144, padding at 156, and the eight `u32` selection words at bytes 160–191 (previously the bitset was written at 144, overwriting `camDir`, so the GPU never saw selections 0–12). `updateUniforms()` now also runs inside `toggleFacet()` and `resetSelection()`, not only `advance()`. A4 gained a GPU proof: two sessions at identical elapsed, one with the facet selected plus one advance — the frames differ by 70,255 px, so a missing upload fails the check.
- **F2 (P1, fidelity verifier):** `verify-fidelity.mjs` accepts the 40-byte/4-attribute layout (blob 107,040 B), keeps packed Z at byte 8, and asserts the float at byte 36 equals each vertex's source-order facet index. The script exits 0 with all A1–A8 passing.
- **F3 (P2, deadzone test):** A8 now advances damping frames after the sub-3 px micro-drag (expect zero pixel change vs a no-pointer session at equal elapsed) and adds a >3 px drag control that must change pixels (58,108 px). Equal elapsed is enforced by discounting the one frame each `--commands` line consumes.
- **F4 (P2, z-offset fixture):** an empty-space reset click clears the bitset before the pair, the PASS line prints the actual culling facet (`facet-05`, back `facet-01`), and the fixture itself was retargeted in the closure round: `pointer click` costs three 60 fps ticks, so the select/probe picks land on frames 247/250 (phases 0.457/0.463, separation already nonzero) — candidates are now sampled at those exact phases, the select must return the fixture facet, and the probe must return that same facet only via its selection offset (verified: `facet-10` select→selected=1, probe→selected=0).
- **F5 (P2, tie semantics):** the ±1e-5 view-z band is gone. The picker ties only when both hits' depth scalars round to the same `depth32float` value (`(-viewZ - near)/(far - near)` as f32), then later source order wins — in `pick.as`, its JS mirror, and a new runtime test where two facets 1e-6 apart in view z must keep the nearer one. The picker and verifier now share one f64 camera basis (`eye/right/upv/fwd` on `CameraFrame`, ortho fit computed on that basis) so picks agree bit-for-bit; the GPU keeps the f32 `Mat4` MVP.
- **F6 (P2, long-frame clamp):** the runtime test calls `Main.advance(5)` and asserts the damped value equals `dampStep(0,1,0.5)` — the clamped step — not the dt=5 result.
- `PHASE-X4.md` records the corrected 192-byte uniform contract in the same change, per the reviewer's instruction not to open X4 on the broken layout.

## Amendments and honest limitations

- The packed vertex stride grew 36 → 40 bytes to carry the facet source-order index (D45); `pack-rive-mesh.mjs` was re-run and `favicon-vertices.bin` regenerated — indices and `favicon_mesh.as` are unchanged.
- `--commands` ticks one 60fps frame per dispatched event (`advance N` = N ticks; `pointer click`/`touch tap` = 3 ticks for down+move+up; `pointer down|move|up` = 1 each), so multi-command sessions drift in phase — the A2/A3 expectations now compute each pick's phase at its exact frame index. `advance <time>` still subdivides into frame steps, so the 0.5 s per-call clamp is exercised directly by `Main.advance(5)` in the runtime tests (F6) while A10 verifies rate-equivalence plus long-advance stability.
- `advance 20ms`-scale sub-frame times quantize in `--commands` (10 px drift vs 180 frames); A9 uses exact frame counts (6f/3f/1f) which are lossless.
- The culling fixture clicks a rest pixel covered by a collapsed back triangle; the expected winner is a front cap, proving the picker applies the same discard the shader does.
- `rive publish` still watermarks local builds with the Rive splash — same X2 portability note for X4/X6.
- The unused `Expect` import warning in `tests/interaction-test.as` was removed; `--verify`/`--test`/`--publish` now report 0 warnings.

## Promotion

**Promotion evidence:** the external exit gate passed at `604a55a810719b66f7a2685a6151c38649d82ec8` (A1–A11, `rive --test` 22/22). A2 prints `zoff=facet-10`, and `A2-A3.json` records select `facet-10 sel=1` then probe `facet-10 sel=0`. The review of `ef6e900` blocked on F1 and F2; the closure review of `85f6ff7` left F4 open; `604a55a` retargets that fixture only. No third review. See [PHASE-X3-COLD-REVIEW.md](PHASE-X3-COLD-REVIEW.md), [PHASE-X3-CLOSURE-COLD-REVIEW.md](PHASE-X3-CLOSURE-COLD-REVIEW.md), and [PHASE-X3-VERIFY-LOG.md](PHASE-X3-VERIFY-LOG.md).

Browser-host pointer/touch behaviour (real PointerEvents, not `--commands` synthesis) remains X4/X6 host-integration scope.
