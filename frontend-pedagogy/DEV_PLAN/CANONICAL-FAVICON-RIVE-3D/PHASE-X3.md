# PHASE-X3 · Choreograph and make every facet selectable

**Status:** BLOCKED — X2 must be DONE

## Goal

Animate assembled SVG → area-depth extrusion → separated spatial inspection → exact rebuild, while supporting persistent, depth-correct facet selection.

## Deliverables

- deterministic build/unbuild loop with interruptible state;
- elapsed-time animation and distinct position/orientation interpolation contracts;
- pointer/touch picking that returns source facet ID;
- N-driven picking and selection state, with identity mapped from generated source-order IDs;
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
- [ ] **A9** Equal elapsed time produces equivalent loop state across at least two simulated frame rates.
- [ ] **A10** Exponential camera damping converges equivalently over equal elapsed time at 30, 60 and 144 Hz with bounded long-frame handling.
- [ ] **A11** Orientation fixtures include identity→90° rotation with an expected 45° midpoint and near-identical quaternion handling.

## Risks

GPU readback picking can be expensive. Use deterministic CPU ray/triangle tests unless measurement proves a facet-ID picking pass necessary. Raw canvas coordinates are converted to normalized device coordinates and unprojected through the inverse current projection/view matrix; the ray is transformed into each current facet model space, intersected with its animated front/back/side triangles, culled consistently with the GPU pipeline, and the nearest positive visible hit wins. The GPU depth compare is `lessEqual`, so equal-depth fragments resolve to the later facet in source/index order; the picker must apply the same tie-break — among hits at equal depth, the later source-order facet wins — or it will disagree with the rendered surface (4858 such pixels at the X2 oblique pose). Triangle-area inclusion, Möller–Trumbore intersection and exponential damping are engineering derivations rather than claims sourced from local graphics research. Position interpolation uses elapsed-time `lerp(a,b,t)` or a named easing curve; orientation interpolation is separately specified with quaternion interpolation, not Euler-angle lerp.
