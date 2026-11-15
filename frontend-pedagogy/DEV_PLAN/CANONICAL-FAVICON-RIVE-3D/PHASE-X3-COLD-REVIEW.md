# PHASE-X3 cold review

**Verdict:** not eligible for DONE. This review does not mark X3 DONE, does not edit the implementation, and does not change `INDEX.md` or `PHASE-X3-REPORT.md`.

**Findings:** 1 P0, 1 P1, 4 P2. F1 and F2 block DONE. P2 items are for the orchestrator to fix or defer in `DECISIONS.md`.

**Reviewed commit:** `ef6e9001589fc19a7b63d8f8d2ce7e43341c7cf6` on `cascade/CANONICAL-FAVICON-RIVE-3D-3`.

**Phase base:** `git merge-base HEAD codex/canonical-favicon-rive-3d-cascade` = `030ed73a951d23e1f298d19944108127123abfd0` (X2 promotion). `git diff 030ed73...HEAD` is that one commit. `fava-mark-static.svg`, `geometry.json`, `manifest.json`, `favicon-indices.bin`, and `favicon_mesh.as` are absent from the diff. Indices and `favicon_mesh.as` are byte-identical to the base (`cmp`).

**Harness transcript read:** `PHASE-X3-VERIFY-LOG.md` (left uncommitted). Commit `ef6e900`, exit code 0, `rive --test` 21/21, then the A1–A11 PASS lines, then `verify-phase-evidence.mjs X3`. This review did not re-run `rive --test` or `verify-picking.mjs`. Both rewrite `build/rive.log` and the x3-checks captures. The pre-existing svg-extrusion suite was run separately; it does not touch those logs. Hashes of the dirty `build/rive.log` and `build/problems.log` were the same before and after this review (`c7ac22b0…cc0850`, `de17d029…6359b`).

## Acceptance

| Item | Result | Evidence |
| --- | --- | --- |
| A1 | Holds on the CPU log | `build/x3-checks/A1.json`: clicks got facet 2 (`facet-03`, 18 verts), facet 0 (`facet-01`, 810 verts), facet 4 (`facet-05`) with `overlapCover: [0, 4]`. Later source order wins that overlap. Harness line matches. |
| A2 | Holds for occlusion, separation, touch, and rest culling. The named z-offset probe did not run as labelled | `A2-A3.json` `got` matches `expected` for seven events. Occlusion cover `[0, 4]` returns facet 0. Separated clicks return facets 0 and 2. Touch tap at `(333, 173)` toggles facet 0 off. Rest cull returns facet 4. The two events noted `zoffset-select` and `zoffset-probe` both got facet 0 (see F4). The PASS text `cull=empty` is a literal in `verify-picking.mjs`, not the JSON. |
| A3 | Holds for the CPU picker | Harness `rive --test`: `nearest positive hit wins over source order`. `pick.as` keeps a hit only when `hit > 1e-9`, then prefers larger view-space z. The A2/A3 session shows the scene log matches `pickJS` on extruded, separated, and rest frames. |
| A4 | Holds for the CPU bitset and the blobs. The rendered palette does not change | `A4.json`: same facet, `selected` 1 then 0, `count` 1 then 0. Geometry, manifest, and vertex-blob sha256 unchanged. GPU highlight and Z offset are F1. |
| A5 | Holds | `A5.json`: `resetLogged: true`, ImageMagick AE `0`. `x3-rest-after.png`, `x3-rest-ref.png`, and `build/x3-rest.png` are byte-identical to `build/canonical-rest.png` (`cmp`, AE 0). |
| A6 | Holds as mirror agreement at two viewports | `A6.json`: 400×480 and 1200×480, center and off-point both want and got facet 0. The rive test `narrow and wide aspects still map the centre ray` passes a synthetic centre triangle at aspects 0.5, 1, and 2. |
| A7 | Holds for selection surviving the scripted gap | `A7.json`: first click selects facet 0 (`count` 1); after `advance 37` + `500ms` + `95` + `3` + `250ms` + `7`, the second click on facet 0 deselects (`count` 0). A cleared bitset would have selected again (`count` 1). Both fixtures are facet 0, so this does not prove a phase jump would miss. |
| A8 | Not proven by the gate | Source has a 3 px deadzone (`choreo.DRAG_DEADZONE`, `main.as` pointer move). The pixel check does not exercise it (F3). `A8.json` `diff` is 0 and the two micro PNGs are byte-identical. `picks` is empty. |
| A9 | Holds for the three committed captures | `x3-a9-f6x30.png`, `x3-a9-f3x60.png`, and `x3-a9-f1x180.png` are byte-identical (`cmp`, AE 0). Harness diffs `[0, 0]`. |
| A10 | Holds for those screenshots and for `dampStep`. The `advance()` 0.5 s clamp is a separate untested path | `x3-a10-hz30.png`, `hz60`, and `hz144` are byte-identical. Harness: `960ms damping diffs=[0,0]`; 5 s pick `0` vs `0`. `interaction-test.as` compares 30 steps of `1/30` with 144 steps of `1/144` and expects `abs < 1e-9`. See F6. |
| A11 | Holds on the harness `rive --test` lines | Transcript: identity looks down −z, 90° yaw goes to −x, slerp midpoint is 45°, near-identical slerp stays finite. `verify-picking.mjs` `checkA11` evaluates the JS copy only; it never starts `rive`. |

## Claim checks

### Stride 36 → 40 and regenerated blobs

`favicon-vertices.bin` is 107040 bytes = 2676 × 40. The base blob is 96336 = 2676 × 36. Decoding both as little-endian f32: position, normal, and colour (9 floats × 2676 verts) have 0 mismatches. The new float at byte 36 is the manifest source-order index 0..12 on every vertex (`badFacet=0`). `gpu-manifest.json` records `arrayStride: 40` and a `float32` attribute at offset 36. `FACET_COUNT` in `favicon_mesh.as` is the generated `13`. The renderer reads that export; it does not literalise 13.

### Discard, lessEqual tie-break, nearest positive hit

`canonical-favicon.wgsl` discards when `tags.x < frame.c3.y && normal.z < 0.5`. `pick.as` skips when `facetE < DISCARD_E && nz < 0.5` with `DISCARD_E = 0.001`. `gpu-manifest.json` has `"depthCompare": "less-equal"`. The synthetic rive test `equal depth resolves to later source-order facet` expects facet 1 for two coplanar triangles. `nearest positive hit wins over source order` expects the nearer earlier facet. Those two tests would fail if the comparisons were swapped. The tie uses a ±1e-5 band (F5), which is wider than exact GPU equality.

### Rest pose and D4

`build/x3-rest.png` and `build/canonical-rest.png` are the same 7458 bytes. Geometry and the manifest are not in the commit. Per-facet minimum geometry Z matches `-facet.depth` within 1e-6 on all 13 facets (`depthBad=0`). X3 did not recompute depth. The X2 verifier no longer accepts the blob (F2), so this depth check is the one this review ran, not `verify-fidelity.mjs` A5.

### Raw pick coordinates, conditioned camera

`pointerDown` / `pointerMove` / `pointerUp` pass `event.position` into `pickFacet` and into the deadzone. `advance` damps `userYaw` / `userPitch` toward the drag targets, and `computeCamera` uses those damped angles. The picker does not read the damped yaw.

### 0.5 s clamp

`advance` adds the full `seconds` to `elapsed` and damps with `Math.min(seconds, 0.5)`. `interaction-test.as` calls `dampStep(0, 1, 5, ORBIT_LAMBDA)` and never calls `Main.advance`. This review did not run `rive --commands`, so it did not observe the CLI subdividing advances. The report’s sentence that the clamp is unreachable through `--commands` is unconfirmed here (F6).

## Findings

### F1 — P0 — blocks DONE — amend `PHASE-X4.md`

The frame uniform the shader compiles is 192 bytes: `mvp` (0), five `vec4<f32>` (64..143), `camDir` at 144, `selection` at 160. `gpu-manifest.json` records that struct and `minBindingSize: 192`. `main.as` `updateUniforms` writes the eight selection words at byte 144 and never writes `frame.towardX/Y/Z`.

A one-facet selection (`selWords[0] = 1`) laid out the same way:

```
node --input-type=module  (inline Buffer, stores matching main.as)
{
  "cpuSelWord0At144": 1,
  "shaderCamDirXasF32": 1.401298464324817e-45,
  "shaderSelectionWord0At160": 0,
  "facet0SelBitShaderReads": 0,
  "bytes176to191": "00000000000000000000000000000000"
}
```

Facets 0–12 live in word 0. The shader reads that word from byte 160, which is still 0. `selBit` stays 0, so `select()` keeps the source fill and `selVec` is multiplied by 0. The CPU picker uses the in-memory `selWords` array and `CameraFrame.toward*`, which is why A1–A7 logs stay green. No x3 capture is a screenshot of a selected facet. `updateUniforms` runs from `init`, `resize`, and `advance` only, so a host that stops calling `advance` (X4 reduced motion) would not upload a corrected block either.

D47 and D48 claim the GPU and the picker share the selection offset. `README.md` repeats that. The packed vertex id is shared. The selection uniform is not.

**Fix:** write `camDir` at byte 144 and the eight `u32` words at byte 160; call `updateUniforms` from toggle and reset. Add a capture that selects one facet, advances one frame, and fails if the pixels match the unselected frame. Until that is true, `PHASE-X4.md` selected-state synchronization is aimed at a highlight the shader does not draw. This review did not amend `PHASE-X4.md`.

### F2 — P1 — blocks DONE

`verify-fidelity.mjs` still requires stride 36 and a 96336-byte blob. From `web-foundations/`:

```
FAIL A1: vertex buffer layout missing or wrong stride
PASS A2: all 13 facet fills verified at interior samples (worst 99.7%), 13189 samples, bg 6134/6134, nanEdge=0
PASS A3: rest capture vs SVG raster: IoU 0.9930, chamfer 0.004px (normalised 220 grid)
PASS A4: oblique t=3.5s: reference back=62914 side=36237 px; capture matches back 15/15, side 32/32
FAIL A5: vertex blob 107040 != 96336
PASS A6: narrow 400x800 and wide 1200x400 captures contain the object, aspect within 8% of reference, IoU>=0.85
PASS A7: ...
PASS A8: normals unit (max err 6.7e-11), classes f/b/s=446,446,1784, side normals = contour edge normals 2676/2676, axis err 0.0e+0
EXIT verify-fidelity.mjs 1
```

A5 returns before it reads packed Z, so the pre-existing depth assertion did not run on the 40-byte records. A2–A4 and A6–A8 still pass against `geometry.json` and the X2 captures. The xyz payload is unchanged (claim check above), so this is a stale checker, and the suite is red.

**Fix:** accept stride 40 and four attributes, keep Z at byte 8, and assert the float at byte 36 equals the manifest source-order index. Re-run until exit 0.

### F3 — P2 — does not block DONE

A8’s command list is `screenshot`, pointer down/move/up by 1 px around `(10,10)`, `screenshot`. There is no `advance` between the move and the second screenshot. `pointerMove` writes `userYawTarget` and does not call `updateUniforms`. The drawn yaw changes only in `advance`. Deleting the deadzone would leave both PNGs byte-identical.

The 3 px check is in `main.as` (`Math.sqrt(ddx*ddx+ddy*ddy) < choreo.DRAG_DEADZONE`). That is source, not the gate.

**Fix:** after a 1 px move, `advance` enough frames for λ=6 to show up, and expect AE 0 against a no-move control. Pair it with a drag longer than 3 px that must change pixels.

### F4 — P2 — does not block DONE

`checkA2A3` builds a z-offset fixture whose facet is index 1 (`zoff.facet: 1` in `A2-A3.json`). The session then clicks occlusion first, which selects facet 0. The following `zoffset-select` and `zoffset-probe` events both got facet 0 toggles (`sel` 0 then 1). Touch reuses the occlusion coordinate `(333, 173)`. The success string always appends `cull=empty` (`verify-picking.mjs` around the A2 `record` call) while the JSON cull click got `facet-05`.

The CPU offset itself is covered by the rive test `selected offset toward camera can win a depth contest` (unselected pick 0, selection word `[2,0,…]` pick 1). That test would fail if `SELECT_OFFSET_Z` were removed from `pick.as`. It does not touch the GPU (F1).

**Fix:** run the z-offset select and probe in their own session with a clean bitset, and print the cull facet from the JSON. Keep the synthetic test.

### F5 — P2 — does not block DONE

`PICK_TIE_EPS` is `0.00001`. `pick.as` treats view-z inside that band as a tie and then lets the later source-order facet win. GPU `lessEqual` ties on equal stored depth. The synthetic equal-z test stays inside the band, so it passes for exact ties and would also pass for a band this wide. X2 measured the `<` versus `<=` split at about `1e-7` on the oblique pose; this review did not re-rasterize that pose.

**Fix:** tie-break only when the two view-z values map to the same `depth32float` value, and add a synthetic pair separated by `1e-6` that must keep the nearer facet.

### F6 — P2 — does not block DONE

`advance` clamps the damping step to 0.5 s and does not clamp `elapsed`. The long-frame rive test calls `dampStep` with `dt = 5`, which `advance` would have reduced to 0.5. A10’s `advance 32ms` / `16ms` / `7ms` / `5s` path is under the CLI, which this review did not run. Equal PNGs at those three labels are consistent with rate-independent damping and with the CLI quantizing every label onto the same steps. `dampStep` itself is pinned by the 30-vs-144 scalar test (`abs < 1e-9`), which a fixed per-step alpha would fail.

**Fix:** a test that constructs `Main`, calls `advance(5)`, and reads the damped yaw. Expect the 0.5 s step, not `dampStep(..., 5)`. Keep the scalar test.

## Agentic-change checks

| Check | Result |
| --- | --- |
| Load the modules that changed | `node --check` on `verify-picking.mjs`, `pack-rive-mesh.mjs`, and `capture-x3-evidence.mjs` exited 0. Importing `verify-picking.mjs` would run the suite, so it was not imported. The harness transcript is the load of `choreo.as`, `pick.as`, `main.as`, and `interaction-test.as` (`rive --test`, 21/21). |
| Pre-existing suite | `test.mjs` exit 0. `verify-x1-acceptance.mjs` exit 0 (A1–A13). `test-x1-evidence-validator.mjs` exit 0. `verify-fidelity.mjs` exit 1 (F2). |
| Would the new assertions fail on the pre-phase code? | The later-source-order test expects facet 1 and the nearer-wins test expects facet 0; swapping the comparison fails them. The real-blob centre test only checks `0 <= id < FACET_COUNT`, so a garbage id of 0 would pass it. The byte decode above is what shows the ids are real. A8 would pass with the deadzone deleted (F3). |
| Unpack arity | `expectSequence` returns `{expected, selSet}`; callers read `expected`. `runCommands` returns `{picks, resets, errs, raw}`. No mismatched unpack found in the new `.mjs`. |
| Discriminated fields | Vertex position, normal, colour, and facet id are separate floats. `camDir` and the selection bitset are separate shader fields that the CPU upload aliases onto the same bytes (F1). |
| README commands | `node verify-picking.mjs --all-fixtures` and `node pack-rive-mesh.mjs <geometry> <manifest> <out-dir>` match the scripts’ argv checks. The README sentence that the shader applies the same selection transform as the picker does not match F1. |

## Cascade constraints

- Geometry authority stays `fava-mark-static.svg` (not in the diff). The packer still refuses a bad schema and still takes colour from each facet’s fill.
- `N` in the renderer is `FACET_COUNT` from the generated module. The favicon module’s value is 13. `interaction-test.as` also loops `f < 13` in the choreography tests.
- Depth is the X2 geometry, still `min Z = -facet.depth`.
- Frontal rest bytes match the X2 capture.
- Picking identity for the CPU path is the packed source-order index. GPU selection identity is F1.
- No `openai` / `anthropic` / `langchain` imports in the new scene or scripts.

## Downstream

`PHASE-X4.md` — selected-state synchronization and reduced-motion controls assume the rendered mesh shows the current selection. The shader’s selection word for facets 0–12 is the zero word at byte 160, and nothing uploads the uniform from a click unless `advance` runs. Do not start X4 on this uniform layout. This review did not edit `PHASE-X4.md`. No later phase file states a second fact this commit has already made false.

## Eligibility

X3’s CPU picker, loop phase, quaternion slerp, and rest-pose bytes meet A1, A3, A5, A9, and A11, and meet A2, A4, A6, and A7 on the logged bitset. The GPU selection block does not match the picker, and `verify-fidelity.mjs` exits 1. Those two are enough.

**Not eligible for DONE. Not promoted. Status stays VERIFYING until the orchestrator records a disposition for F1–F6.**

## Commands this review ran

| Command | Exit |
| --- | --- |
| `node scripts/svg-extrusion/test.mjs` | 0 |
| `node scripts/svg-extrusion/verify-x1-acceptance.mjs` | 0 |
| `node scripts/svg-extrusion/test-x1-evidence-validator.mjs` | 0 |
| `node scripts/svg-extrusion/verify-fidelity.mjs` | 1 |
| `node --check scripts/svg-extrusion/verify-picking.mjs` | 0 |
| `node --check scripts/svg-extrusion/pack-rive-mesh.mjs` | 0 |
| `node --check scripts/svg-extrusion/capture-x3-evidence.mjs` | 0 |
| `cmp` / `magick compare -metric AE` on the rest, A9, A10, and micro PNGs | 0 (AE 0, rest bytes equal) |
| Node decode of the 40-byte blob against the base 36-byte blob and the manifest | 0 mismatches on xyz/normal/colour; facet ids 0..12 |

Working directory for the node scripts: `web-foundations/`.

## Not run

`pnpm build`, `rive --test`, `rive --verify`, `verify-picking.mjs`, `PHASE-X3.exit-gate.sh`, and any browser PointerEvents session. Re-running the first three of those would append `build/rive.log`. The 0.5 s clamp’s CLI subdivision was not observed. The X2 oblique `1e-7` tie count was not re-measured.
