# PHASE-X3 · Choreograph and make every facet selectable

**Status:** BLOCKED — X2 must be DONE

## Goal

Animate assembled SVG → area-depth extrusion → separated spatial inspection → exact rebuild, while supporting persistent, depth-correct facet selection.

## Deliverables

- deterministic build/unbuild loop with interruptible state;
- pointer/touch picking that returns source facet ID;
- click/tap selection toggle, bounded Z offset and reversible palette state;
- reset action and selection data exposed for tests;
- conditioned camera input separated from raw picking coordinates.
- shared projection/view/model transforms used by rendering and CPU ray/triangle picking.

## Acceptance

- [ ] **A1** CLI pointer/touch tests select at least one small, one overlapping and one large facet by expected ID.
- [ ] **A2** Expected-ID fixtures cover occlusion, separated motion, selected Z offset, front/back culling, narrow/wide and touch.
- [ ] **A3** Picking returns the nearest positive visible triangle using the current animated transforms.
- [ ] **A4** Repeating selection toggles state without changing intrinsic area/depth.
- [ ] **A5** Reset clears every selection and rebuilds the exact rest pose.
- [ ] **A6** Pointer selection remains correct at narrow and wide viewports.
- [ ] **A7** Loop interruption does not jump or lose selected state.
- [ ] **A8** Pen-scale micro-movement does not visibly steer the camera.

## Risks

GPU readback picking can be expensive. Use deterministic CPU ray/triangle tests unless measurement proves a facet-ID picking pass necessary. Raw canvas coordinates are converted to normalized device coordinates and unprojected through the inverse current projection/view matrix; the ray is transformed into each current facet model space, intersected with its animated front/back/side triangles, culled consistently with the GPU pipeline, and the nearest positive visible hit wins.
