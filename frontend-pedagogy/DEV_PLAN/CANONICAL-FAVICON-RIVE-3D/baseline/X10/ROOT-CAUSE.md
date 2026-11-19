# X10 front-phase artifact diagnosis

## Reproduction

At 720×480, the X9 Rive CLI baseline is clean at phases 0.10 and 0.12, then
shows colored slashes/fragments at 0.15, 0.20 and 0.30. The exact captures,
per-session command output, source hashes and Rive CLI hash/version are in
[`front-phase-manifest.json`](front-phase-manifest.json) and its `before`
session. The baseline p00/p10/p12 PNGs share SHA-256
`682cce47d744a48f0189ce9fe0bbdb9c219445d866f0eae2c429631f3be2f02f`;
p15/p20/p30 differ.

The cause is a choreography overlap, not a damaged SVG, triangulation or
depth/picking disagreement. `facetExtrusion` staggers the individual prism
depths from phase 0.10 through 0.42, while the old `inspectWeight` began
rotating the camera at 0.12. The old camera weights at 0.12, 0.15, 0.20 and
0.30 were respectively 0, 0.039744, 0.241664 and 0.808704. The first changed
capture is p15: its nonzero camera turn projects the independently extruded
back/side caps laterally across neighbouring facets that are still at different
build amounts. These temporary colored overlaps are not coherent front faces.
The source’s front triangles, identities and depth mapping remain unchanged.

## Minimal correction and evidence

`inspectWeight` now starts at
`EXTRUDE_START + EXTRUDE_SPAN` (phase 0.42), after the last staggered facet
reaches full extrusion. The front camera stays exactly frontal while the
facets build; quaternion camera easing then turns during the already
fully-extruded interval. The X3 picker verifier and X4 host math mirror use the
same derived start.

The corrected p12/p15/p20/p30 captures are each byte-identical to p00
(SHA-256
`682cce47d744a48f0189ce9fe0bbdb9c219445d866f0eae2c429631f3be2f02f`).
Phase 0.42 remains frontal after extrusion; phase 0.72 is the oblique inspect
pose, and its screenshot remains byte-identical to the X9 phase-0.72 capture
(`079f51c6dc64314d114b8feeab20dd8a6687fe0eee08320a37431e086e1eb006`),
preserving the visible 3D inspection result. The exact captures and hashes are
in the `after` session of the manifest.

The focused Rive regression was run against the X9 formula before correction:
`rive . --test` exited 6 (22/23 passed), reporting a nonzero inspect weight
and non-frontal camera vectors at phases 0.15, 0.20 and 0.30. After correction,
all 23/23 Rive tests pass.
