# PHASE-X3 · Choreograph and make every facet selectable

**Status:** VERIFYING
**Branch:** `cascade/CANONICAL-FAVICON-RIVE-3D-3`

## Outcome

The X2 static mesh is now a 9 s deterministic choreography with depth-correct facet selection. `choreo.as` owns the loop: staggered per-facet extrusion (smoothstep windows, reverse-order retraction), a separation pulse, inspect-camera weighting via quaternion slerp, and exponential orbit damping (`1 - e^{-λdt}`, λ = 6) that is frame-rate independent by construction. `pick.as` is a pure CPU picker over the packed 40-byte vertex records — it rebuilds the camera ray from the shared `CameraFrame`, applies the same extrusion/separation/selection transforms the shader evaluates, mirrors the GPU discard rule (`e < ε && nz < 0.5` skipped) and the `lessEqual` later-source-order tie-break, and returns the nearest positive visible facet or -1. `main.as` wires pointer down/move/up with a 3 px drag deadzone, click/tap toggling into a 256-bit selection word set uploaded in the frame uniform, touch input, and reset; every pick logs a parseable `x3pick facet=N selected=S count=C` (or `x3pick reset`) line through `context.log`. `canonical-favicon.wgsl` consumes the expanded uniform and applies per-facet displacement plus the camera-relative selected offset while keeping front/back/side material classes and `lessEqual` depth.

Rest fidelity is preserved exactly: `build/x3-rest.png` is pixel-identical (ImageMagick AE = 0) to `build/canonical-rest.png` — the X2 frontal pose is untouched. `build/x3-inspect.png`, `x3-narrow.png`, and `x3-wide.png` are the X3 pose/viewport captures; `build/fava_prismatic_3d.riv` is rebuilt, verified (`rive --verify`, 0 errors) and signed; `build/gpu-manifest.json` now records the 40-byte/4-attribute vertex layout.

## Verification prepared for the external gate

- `rive <project> --verify` — 0 errors (1 lint warning: none remaining after unused-import cleanup; see notes).
- `rive <project> --test` — `tests/interaction-test.as`, **21/21 passed**: loop phase wrapping, extrusion/retraction ordering, separation, quaternion identity/90°/45°-midpoint/near-identical stability, damping equivalence and bounded long frames, deterministic unit-length facet directions, and picker fixtures (single hit, corner miss, equal-depth source-order tie, nearest-positive, selected offset, collapsed-back visibility, narrow/wide centre ray, real packed blobs).
- `node scripts/svg-extrusion/verify-picking.mjs --all-fixtures` — independent JS re-implementation of the choreography math and picker; drives `rive --commands` pointer/touch/viewport/advance sessions and compares logged `x3pick` events against predicted expected IDs. **A1–A11 all PASS.**
- `node scripts/svg-extrusion/capture-x3-evidence.mjs` — replays A1–A11, stores immutable transcripts in `baseline/X3/`, writes `PHASE-X3-EVIDENCE.json` (reportStatus VERIFYING).
- `node scripts/svg-extrusion/verify-phase-evidence.mjs X3` — PASS, 11 acceptance items match the runbook.
- `PHASE-X3.exit-gate.sh` additionally requires `tests/interaction-test.as`, `rive --test`, the picking verifier, and evidence verification.

Measured results: A1 selects the smallest facet (`facet-03`, 18 verts), the largest (`facet-01`, 810 verts) and an overlapping pair (`facet-05` over `[facet-01, facet-05]`, later source order wins) by expected ID; A2/A3 match all seven session events (occlusion, z-offset select+probe, touch, two separated-motion picks, rest back-face culling probe) against the JS mirror; A5 rest-pose pixel diff vs a fresh rest capture is 0; A6 picks correctly at 400×480 and 1200×480; A9 equal-elapsed screenshots identical across 6f/3f/1f advance granularities; A10 960 ms damping identical at ~30/60/144 Hz subdivisions and a 5 s advance still picks correctly.

## Amendments and honest limitations

- The packed vertex stride grew 36 → 40 bytes to carry the facet source-order index (D45); `pack-rive-mesh.mjs` was re-run and `favicon-vertices.bin` regenerated — indices and `favicon_mesh.as` are unchanged.
- `--commands` subdivides `advance <time>` into frame steps, so the 0.5 s per-call clamp in `advance()` is defensive and unreachable through the CLI; A10 therefore verifies rate-equivalence plus long-advance stability rather than claiming CLI-level clamp coverage.
- `advance 20ms`-scale sub-frame times quantize in `--commands` (10 px drift vs 180 frames); A9 uses exact frame counts (6f/3f/1f) which are lossless.
- The culling fixture clicks a rest pixel covered by a collapsed back triangle; the expected winner is a front cap, proving the picker applies the same discard the shader does.
- `rive publish` still watermarks local builds with the Rive splash — same X2 portability note for X4/X6.
- The unused `Expect` import warning in `tests/interaction-test.as` was removed; `--verify`/`--test`/`--publish` now report 0 warnings.

## Not checked here

- The external exit gate and cold review are run by the harness after this report; X3 stays VERIFYING and INDEX is untouched.
- Browser-host pointer/touch behaviour (real PointerEvents, not `--commands` synthesis) is X4/X6 host-integration scope.
