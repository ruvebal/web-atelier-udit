# PHASE-X2 cold review

**Verdict:** eligible for DONE triage. This review does not mark X2 DONE, does not edit the implementation, and does not change `INDEX.md` or `PHASE-X2-REPORT.md`.

**Findings:** 0 P0, 0 P1, 4 P2. None block DONE. P2 items are for the orchestrator to fix or defer in `DECISIONS.md`.

**Reviewed commit:** `367a2e9bd36f415b6de212533a6df727268855a9` on `cascade/CANONICAL-FAVICON-RIVE-3D-2`.

**Phase base:** `git merge-base HEAD codex/canonical-favicon-rive-3d-cascade` = `d674a972810aafc2a252572773f2a0f732627c8e` (`d674a97`, "merge: complete canonical favicon Rive X1"). `git log --oneline d674a97..HEAD` is only `367a2e9`. `f22a8f1` is not in that range.

**Harness transcript read:** `PHASE-X2-VERIFY-LOG.md` (left uncommitted). Commit `367a2e9`, exit code 0, A1–A8 PASS lines as recorded there. This review did not re-run `rive --verify` or `PHASE-X2.exit-gate.sh`: `--verify` appends `build/rive.log`, which the harness already extended by one line (`[00:32:31.260] rive verified (0 bytes, 62ms, 0 errors, 0 warnings)`). The committed log already contains an earlier verify at `00:21:53` with the same 0-error shape. `rive --help` states `--verify` checks the project without writing a `.riv`, so the "0 bytes" line is the no-output verify, consistent with the publish line at `00:13:21` (`481929` bytes).

## Acceptance

| Item | Result | Evidence |
| --- | --- | --- |
| A1 | Holds | Re-ran `verify-fidelity.mjs`: vertex stride 36, three float3 attributes, `depth32float` write on, blobs `96336+10392`, counts `2676/5196` from the provider. `build/gpu-manifest.json` sha256 `0a5145d8…d6de2` matches `PHASE-X2-EVIDENCE.json`. The manifest's pipeline has `"depthCompare":"less-equal"`. |
| A2 | Holds | Same run: all 13 manifest facets, worst interior fill 99.7%, 13189 samples, background 6134/6134. `N` comes from `manifest.facets.length`. `main.as` draws `drawIndexed(INDEX_COUNT)` from the generated module. The parent scene's `const FACET_COUNT: u32 = 13` is gone. |
| A3 | Holds | Same run: rest capture vs `fallback.svg` raster, IoU 0.9930, chamfer 0.004px on the normalised 220 grid. |
| A4 | Holds for existence | Same run: back 15/15, side 32/32. Independent full-pixel recount (below) shows back tones exact and side-class tones present. Oblique silhouette IoU against the software rasterizer is 0.9998, matching the report's ungated figure. |
| A5 | Holds in the buffers | Same run: formula max deviation `2.5e-10`, `facet-01` largest and deepest. Separate scan of `geometry.json`: front Z is 0 and back Z is `-facet.depth` with max error 0 (`zDev=0`). Repack is byte-identical (below). The assertion itself reads only the manifest. |
| A6 | Holds | Same run: narrow `400x800` and wide `1200x400` contain the object, aspect within 8%, IoU ≥ 0.85. |
| A7 | Holds for the three scalars the script computes | Same run: front depth `0.1562` < back `0.8438`; app Z, view Z, and the depth scalar differ on every fixture; front-centre lands on the capture. Clip Z and depth-buffer encoding are one variable (F4). |
| A8 | Holds for the generated normals | Same run: unit error `6.7e-11`, classes `446/446/1784`, centroid-outward `1676/1784`. Separate scan: all 446 side quads match the compiler's outward edge normal (F3). |

`node scripts/svg-extrusion/verify-fidelity.mjs` from `web-foundations/` exited 0 and reprinted the harness PASS lines.

## Claim checks

The pre-fix verifier source is not in `367a2e9` (one commit, no `eLen` identifier). The probes below patch a temp copy of `verify-fidelity.mjs` under `/private/tmp/x2-vf/` and leave the worktree sources untouched.

### Interior NaN filter

Live rest raster (`diag.mjs` A2): `owned=118523 nanOwned=0 zeroEdge=0`.

Predicate on `NaN`: `edgeDist < 1.2` is false, so A2's `continue` does not drop the sample. A4's `!(edgeDist >= 2)` is true, so A4 drops it.

Poison (fill `edgeDist` with `NaN` after rasterizing):

```
node /private/tmp/x2-vf/poison-a2.mjs A2
PASS A2: all 13 facet fills verified at interior samples (worst 99.6%), 16938 samples, bg 6134/6134
POISON_A2_EXIT:0

node /private/tmp/x2-vf/poison-a4.mjs A4
FAIL A4: back-face pixels match 0/0
POISON_A4_EXIT:1
```

An all-NaN distance buffer still passes A2 (more samples, 99.6%). The report's sentence that the interior filter now rejects NaN is false for A2. The full script still fails, at A4. See F1.

### `less` versus `lessEqual`

Parent `main.as` used `CompareFunction.less`. `367a2e9` uses `lessEqual`. `gpu-manifest.json` records `"depthCompare":"less-equal"`.

Reference rasterizer forced to strict `depth < zbuf` against the committed captures:

```
node /private/tmp/x2-vf/strict-less.mjs A2
PASS A2: all 13 facet fills verified at interior samples (worst 99.7%), 13189 samples, bg 6134/6134
STRICT_A2_EXIT:0

node /private/tmp/x2-vf/strict-less.mjs A4
PASS A4: oblique t=3.5s: reference back=62914 side=36237 px; capture matches back 15/15, side 33/33
STRICT_A4_EXIT:0
```

Pixel recount on the committed `<=` rasterizer (`diag.mjs`):

```
RASTER t=0 720x480 owned=118523 nanOwned=0 zeroEdge=0 painterWins=0 nearTie=62416
RASTER t=3.5 720x480 owned=99151 nanOwned=0 zeroEdge=0 painterWins=4858 nearTie=9806
```

`painterWins` counts pixels where a later, different facet is inside the `1e-7` band that `<=` accepts and `<` rejects. At rest that count is 0, and A2's sample count and rate are unchanged under strict `<`. The report's claim that `less` hid later front facets is not reproduced on this mesh at elapsed 0. At `t=3.5` the band contains 4858 pixels, so `lessEqual` does change oblique side ownership. A2 and A4 as written still pass when the reference uses strict `<`, and A1 never reads `depthCompare`. See F2.

Near/far margin, same camera log: rest `frontDepth=0.1562`, `bareFrontDepth=0.0000` (margin removed). Oblique `frontDepth=0.0768`, `bareFrontDepth=0.0000`. The 0.05 margin is what moves the front bounding plane off depth 0. That part of the report matches the formula. This review did not rebuild the `.riv` with the margin removed.

### A4 class tone versus winning facet

Full interior pixels (`edgeDist >= 2`) of `canonical-oblique.png` against the software rasterizer:

```
A4FULL back exact 42148/42150 any 42148/42150; side exact 22484/26394 any 26393/26394; anyNotExact 3909
A4IOU 0.9998 chamfer 0.000
```

Back faces agree on the winning facet. Side walls: class tone matches `26393/26394`; the exact winning facet matches `22484/26394` (85.2%); `3909` pixels match a different facet's side tone. Facet tones of one class are at least 37 (back) and 61 (side) levels apart, so `matchAny` is accepting a real neighbouring wall, not a front fill (front/back separation 13, front/side 21, both above the tolerance of 6). The report's rasterizer-dependence claim is true for side walls and is why exact-facet agreement sits on the script's own 0.85 line. Existence of back faces and side walls holds on the full image, not only on the gated 15 and 32 samples. The 0.9998 oblique IoU is real and is not an assertion in `verify-fidelity.mjs`.

## Agentic checks

| Check | Command | Exit |
| --- | --- | --- |
| Pre-existing compiler suite | `node scripts/svg-extrusion/test.mjs` | 0 (`PASS X1 compiler: canonical N=13, distinct curved/concave N=2…`) |
| X1 acceptance | `node scripts/svg-extrusion/verify-x1-acceptance.mjs` | 0 (A1–A13) |
| X1 evidence mutations | `node scripts/svg-extrusion/test-x1-evidence-validator.mjs` | 0 (`7 forged receipts rejected`) |
| X2 fidelity | `node scripts/svg-extrusion/verify-fidelity.mjs` | 0 (A1–A8) |
| Syntax | `node --check` on `pack-rive-mesh.mjs`, `verify-fidelity.mjs`, `capture-x2-evidence.mjs` | 0, 0, 0 |
| Import fidelity module | `node --input-type=module -e "await import('file://…/verify-fidelity.mjs')"` from `/tmp` | 0, no PASS lines (`argv[1]` undefined, main guard skipped) |
| Import packer with no args | same pattern for `pack-rive-mesh.mjs` | 2, prints usage. The file runs at import; missing args are the CLI contract. |
| Repack | `node scripts/svg-extrusion/pack-rive-mesh.mjs <geometry.json> <manifest.json> /tmp/x2-pack` | 0. `cmp` identical for `favicon-vertices.bin`, `favicon-indices.bin`, `favicon_mesh.as` |
| README CLI | `node scripts/svg-extrusion/cli.mjs --input docs/assets/icons/fava-mark-static.svg --output /tmp/x2-cli-readme --config scripts/svg-extrusion/fixtures/config.json` | 0 (`compiled 13 facets, 2676 vertices, 5196 indices`). Manifest equals the committed favicon manifest once `compilerVersion` is removed. Output directory was `/tmp` so the worktree was not written. |

`capture-x2-evidence.mjs` was not imported: top-level execution rewrites `PHASE-X2-EVIDENCE.json` and `baseline/X2/`. `node --check` covers it.

Unpack shape: the packer takes three CLI paths; fidelity's `VERTEX_COUNT` / `INDEX_COUNT` regex matches `favicon_mesh.as`; no callee returns a tuple the caller mis-unpacks.

Modes: position, normal, and source fill are three float3 attributes in one 36-byte record (manifest and packer agree). Application Z, view Z, and the depth scalar are separate numbers in the A7 log. Clip Z and depth-buffer encoding share `project().depth` (F4). Shade class is a discriminant (`nz` thresholds) with a per-class scale, not one field holding two measurements.

Constraints that hold: `fava-mark-static.svg` remains the geometry source (`manifest.source.path`). Facet ids stay source order `0..12`. Depth is `0.04 + (0.22-0.04)*sqrt(area/maxArea)` in both the manifest and the position buffer. Rest camera at elapsed 0 is on +Z (`yaw=pitch=0`). Blobs match a fresh pack. `main.as` has no fixture count and no source-fill literals. `generated/favicon/fallback.svg` is still present. No cloud SDK in the X2 scripts.

## Findings

### F1 — P2 — does not block DONE

A2 treats a NaN edge distance as interior. The report says the interior filter now rejects NaN after an `eLen` bug. The committed A2 predicate is `ref.edgeDist[i] < 1.2`, and `NaN < 1.2` is false, so the sample is kept. Poisoning every distance to NaN still passes A2 (`worst 99.6%`, `16938` samples, exit 0). A4's `!(edgeDist >= 2)` does drop NaN and fails closed (`back-face pixels match 0/0`, exit 1). The live rasterizer emits `nanOwned=0` and `zeroEdge=0`, so the current images are unaffected.

**Fix:** in A2, skip unless `ref.edgeDist[i] >= 1.2` (that form rejects NaN). Add a one-line fixture that fills `edgeDist` with NaN and expects A2 to fail or to select zero samples.

### F2 — P2 — does not block DONE — amend `PHASE-X3.md`

A2 and A4 do not lock `CompareFunction.lessEqual`, and the rest-pose half of the z-fighting claim does not reproduce.

`build/gpu-manifest.json` has `"depthCompare":"less-equal"`, and `main.as` sets `depthState.compare = CompareFunction.lessEqual`. A1 checks depth format and `depthWriteEnabled` only. Against the committed captures, a reference rasterizer using strict `<` still passes A2 (99.7%, 13189 samples, exit 0) and A4 (back 15/15, side 33/33, exit 0). At elapsed 0, `painterWins=0`. At `t=3.5`, `painterWins=4858`: equal-depth side walls do depend on `lessEqual`. `canonical-favicon.wgsl` lines 5–6 still say the depth buffer uses "compare less".

`PHASE-X3.md` tells picking to take the nearest positive visible triangle and to cull consistently with the GPU. It does not say equal depth resolves to the later source-order facet. A nearest-only picker will disagree with this GPU on those 4858 oblique pixels. Amend `PHASE-X3.md` before X3 implementation so the tie-break is `lessEqual` / source order. This review did not amend it, and did not rebuild the `.riv` with `CompareFunction.less`.

**Fix:** assert `depthStencil.depthCompare === "less-equal"` in A1; correct the WGSL comment; add the tie-break sentence to `PHASE-X3.md`.

### F3 — P2 — does not block DONE

Two X2 assertions pass on this mesh and would also pass on a broken sibling of it.

A5 recomputes depth from `manifest.facets[].depth` and `area`. It never reads `geometry.json` positions or `favicon-vertices.bin`. A hand-edited vertex Z would still pass A5 and A1 (A1 checks blob length only). On this commit the buffers are the formula: `zDev=0` for front Z = 0 and back Z = `-depth`, and `/tmp/x2-pack` is `cmp`-identical to the committed blobs. Repack command exited 0.

A8's outward test is a centroid dot. It reports `1676/1784` and allows 10% failure (`sidePerp / sideTot < 0.9`). The 108 misses are the centroid heuristic on a concave contour. All 446 side quads match `compiler.mjs` `extrude`: normal `(edgeY, -edgeX)` normalised, perpendicular to the edge, back vertex at `-depth` (`sideFormula=446`).

**Fix:** A5 compares packed positions to `geometry.positions` (or refuses a blob whose per-facet Z is not `{0, -depth}`). A8 checks the edge normal, or drops the 10% allowance once that check is in place.

### F4 — P2 — does not block DONE — amend `PHASE-X4.md`

`367a2e9` deletes `prismatic-favicon.wgsl`. The demo still links it:

`web-foundations/docs/lessons/en/web-animations/svg-master-session/demo/index.html` line 211, href `…/animascript-3d/prismatic-favicon.wgsl`.

`git cat-file -e d674a97:…/prismatic-favicon.wgsl` succeeds; the file is absent at HEAD. `generated/favicon/fallback.svg` and `fava-prismatic-3d.webp` are still in the tree, so the X1 SVG fallback and the poster image were not removed. Host semantics stay X4's deliverable. `PHASE-X4.md` does not name the shader file, so the runbook text is not already false, but the demo href is already dangling and X4's host edit has to point at `canonical-favicon.wgsl`. Amend `PHASE-X4.md` to record that rename. This review did not amend it.

A7 labels `project().depth` as `clipZ` and also calls that same number the depth in the summary string. There is no separate depth-buffer encoding. `main.as` discards the depth attachment (`depthStoreOp = StoreOp.discard`), so the script cannot read GPU depth. The four fixtures still show distinct application Z, view Z, and that scalar, and the `[0,1]` check rejects using view Z or the back face's application Z (`-0.22`) as the depth value. D44's "separately named" sentence overstates the script.

**Fix:** retarget the demo href in the X4 host change; name clip Z and depth-buffer encoding as two values in `verify-fidelity.mjs` if a real second mapping exists, or narrow D44 to the three scalars the script actually computes.

## Downstream

- `PHASE-X3.md` — amend the picking tie-break (F2). X3's elapsed-time and selection goals are otherwise intact.
- `PHASE-X4.md` — record the shader rename and the dangling demo href (F4). Reduced motion, semantic controls, and the static poster remain X4 work; X2 did not remove `fallback.svg`.

No later phase file states a fact this commit has already made false beyond those two gaps.

## Eligibility

X2 meets A1–A8 on the committed captures, the generated buffers, and the pre-existing svg-extrusion suite. The four findings are test-strength and host-link gaps. The scene's `lessEqual` depth compare, D4 depths, source-order facet count, and packed blobs match the cascade constraints.

**Eligible for DONE triage. Not promoted. Status stays VERIFYING until the orchestrator records a disposition for F1–F4.**

## Not run

`pnpm build`, the X1 compiler suite beyond the three commands above, `rive --verify` (appends `rive.log`), and a GPU rebuild with `CompareFunction.less` or a zero near/far margin. Those last two would overwrite `build/`.
