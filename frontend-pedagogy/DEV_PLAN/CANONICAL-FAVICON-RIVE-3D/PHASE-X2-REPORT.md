# PHASE-X2 · Render the exact frontal object in Rive GPU Canvas

**Status:** VERIFYING
**Branch:** `cascade/CANONICAL-FAVICON-RIVE-3D-2`
**Implemented:** 2026-11-12

## Outcome

The generic triangular-instance scene is replaced by the generated canonical mesh. `pack-rive-mesh.mjs` consumes the X1 provider (`geometry.json` + `manifest.json`) and emits two immutable blob assets plus a generated AnimaScript constants module; `main.as` wires them through `GPUBuffer`/`GPUVertexBufferLayout`/`setIndexBuffer`/`drawIndexed` with a `depth32float` attachment and `lessEqual` compare so coplanar front facets resolve in SVG painter order. `canonical-favicon.wgsl` consumes indexed facet geometry, unit normals and source fills; the fragment stage keeps front faces at the exact source colour and derives back/side tones from the generated object-space normal class. No renderer code contains the favicon count, palette, or coordinates — all counts and bounds come from the generated module.

The camera is CPU-side `Mat4.lookAt` + `Mat4.ortho`, rebuilt every frame from elapsed time and the rotated model bounds; elapsed = 0 is exactly frontal, so rest fidelity is deterministic. `build/fava_prismatic_3d.riv` is rebuilt, verified (`rive --verify`, 0 errors/0 warnings) and signed; `build/canonical-rest.png`, `canonical-oblique.png`, `canonical-narrow.png`, `canonical-wide.png` and `build/gpu-manifest.json` are the gate captures.

## Verification prepared for the external gate

- `node scripts/svg-extrusion/verify-fidelity.mjs` — independent A1–A8 verifier; rebuilds the world→view→clip→depth chain in plain JS, software-rasterizes the generated triangles, and compares the GPU captures. All eight items PASS.
- `node scripts/svg-extrusion/capture-x2-evidence.mjs` — replays A1–A8, stores immutable command transcripts in `baseline/X2/`, writes `PHASE-X2-EVIDENCE.json` (reportStatus VERIFYING).
- `node scripts/svg-extrusion/verify-phase-evidence.mjs X2 <pack>` — PASS, 8 acceptance items match the runbook.
- `PHASE-X2.exit-gate.sh` additionally requires the `.riv`, both canonical captures, `gpu-manifest.json`, `rive --verify`, the full fidelity run, and evidence verification.

Measured results: rest capture vs canonical SVG raster IoU 0.9930 / chamfer 0.004 px; all 13 facet fills verified at 13,189 interior samples; oblique capture matches back 15/15 and side 32/32 class-tone samples; depth matches `0.04 + 0.18·sqrt(area/max)` within 2.5e-10; normals unit to 6.7e-11 with outward side winding; narrow/wide captures contain the object within tolerance.

## Amendments from implementation

- A4 compares capture pixels against *any* facet's tone of the predicted class rather than the exact winning facet: adjacent side walls can meet at near-equal depth, making the winner rasterizer-dependent. The assertion still proves back faces and side walls exist with the declared shading; silhouette IoU at the oblique pose is 0.9998.
- The independent verifier initially had a degenerate-triangle edge-distance bug (`eLen` underflow → NaN distances bypassing the interior filter); fixed before evidence capture, with the interior-distance filter now rejecting NaN explicitly.
- Coplanar front facets needed `lessEqual` depth compare plus painter-order index layout to reproduce SVG layering; `less` hid later facets.
- Ortho near/far margins initially clipped the front plane; near/far are now derived from rotated view-space bounds each frame.

## Open gate

The implementer has not marked X2 DONE. The cascade harness must rerun `PHASE-X2.exit-gate.sh` from the committed tree; a fresh cold reviewer must inspect the packer, WGSL, camera math, verifier independence, and evidence.

## Risks / notes for the reviewer

- `rive publish` reports the plan watermark: local signed builds carry the Rive splash screen. This is a portability/classroom risk recorded for X4/X6, not hidden.
- `rive <project> --verify` exits 0 but reports "0 bytes" for the directory target; the gate invokes it exactly this way.
- `.bin` blob assets and `favicon_mesh.as` are generated and committed so `rive` builds reproduce without re-running the packer; `pack-rive-mesh.mjs` is deterministic and is the regeneration path.
