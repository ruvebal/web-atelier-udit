# PHASE-X1 cold-review resolution

**Source review:** `PHASE-X1-COLD-REVIEW.md`
**Disposition:** all four P1 findings corrected; external rerun and independent re-review still required

| Finding | Resolution | Regression evidence |
| --- | --- | --- |
| F1 · transformed curve tolerance | Cubic control points are transformed before de Casteljau flatness evaluation. The tolerance therefore lives in baked SVG coordinates and is conservative under scale, rotation, shear, and anisotropy. | Implementation and independent A12 tests densely sample a cubic under `scale(1000 600)` and measure projected deviation against 0.35 px. |
| F2 · inline style stroke | Inline style is parsed as a bounded declaration map. Only `fill`, `fill-rule`, and `stroke` are resolvable; non-`none` stroke and unknown properties reject. | Both test layers reject `style="fill:#000;stroke:#fff"`; implementation also rejects unresolved style properties. |
| F3 · invalid fill rule | Resolved fill rule must be `nonzero` or `evenodd`. The manifest records supported rules separately from the rules actually used by facets. | Both test layers reject `banana`, accept `evenodd`, and A13 reconciles all facet values with the manifest. |
| F4 · collinear overlap | Simplicity validation now handles proper crossings, non-adjacent touches, collinear point-on-segment cases, and adjacent direction-reversing retraces. | Both test layers reject the reviewer’s `M0 0 L10 0 L5 0 ...` contour. |

No acceptance criterion was removed or weakened. The generated golden outputs and all evidence hashes are regenerated from the amended compiler.
