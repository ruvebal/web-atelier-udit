# PHASE-X1 cold review

**Reviewed commit:** `54b30116e3145296a3452aec4097cae3e3a12300` (implementation `1c4ceeb`)
**Reviewer role:** fresh cold reviewer; no implementation authorship
**Verdict:** **CHANGES REQUIRED — four P1 findings**
**Status ownership:** this review does not mark X1 DONE, merge, push, or commit.

## Independent evidence

I read the studio/repository contracts, the canonical `svg-to-rive-3d` and
`rive-animascript-3d` skills and their directly routed references, the cascade
hard constraints, X1 runbook, decisions/math contracts, both implementation
commits, and the runner-owned verify log. I then reran:

- `node scripts/svg-extrusion/test.mjs` — passed;
- `node scripts/svg-extrusion/verify-x1-acceptance.mjs` — reported A1–A13 pass;
- independent adversarial compiler inputs described below.

The clean verifier result is not sufficient: the adversarial inputs expose
accepted documents outside the frozen grammar and a measurable violation of
the flattening promise. The existing tests would not fail against these wrong
behaviours.

## Findings

### F1 — P1 blocking — path-local transforms can violate the declared projected curve tolerance

`compileSvg` flattens every cubic with `sourceTol = flattenTolerancePx /
maximumDisplayScale` **before** applying the path-local affine transform. It
does not scale the tolerance by the transform's largest singular value (nor
flatten after baking the transform). A transform that magnifies the curve can
therefore magnify flattening error beyond the promised screen-space bound.

Adversarial evidence: a supported single cubic transformed with
`scale(1000)` compiled successfully with four contour vertices. Dense sampling
measured projected deviation `0.5789407623690818 px`, exceeding the declared
`0.35 px`; the emitted manifest nevertheless declared model tolerance
`0.000875`. The current A12 test uses an untransformed curve, and A12 in the
acceptance verifier merely checks manifest strings and delegates to that same
test. This violates D4/D27, the math contract, and A12.

Required correction: bake transforms before adaptive error evaluation or
derive a conservative source tolerance from the affine transform; add
anisotropic/magnifying transform fixtures and have the independent verifier
measure the transformed dense-reference deviation.

### F2 — P1 blocking — strokes hidden in `style` are silently accepted as fills

The compiler rejects only the presentation attribute `stroke=...`. Input
`<path style="fill:#000;stroke:#fff" .../>` compiles successfully. The fallback
therefore contains a visible stroke which the generated front mesh omits,
breaking source fidelity while silently accepting an explicitly excluded V1
feature. This violates D20/D34 and A9/A10.

Required correction: resolve and validate every accepted presentation source,
including `style`; reject any non-`none` stroke (and unsupported/unresolved
style declaration) with an actionable diagnostic. Add this as a rejection
fixture in both implementation and independent tests.

### F3 — P1 blocking — invalid fill-rule values are accepted and the manifest contradicts the facet

Input with `fill-rule="banana"` compiles successfully. Its facet record says
`banana`, while the top-level manifest claims `fillRules: ["nonzero"]`. V1 is
required to accept only declared `nonzero`/`evenodd` semantics, and the emitted
contract must truthfully describe them. The current fixtures exercise neither
valid `evenodd` nor invalid values. This violates the supported-subset contract,
D20/D34, A9, A10 and A13.

Required correction: validate the resolved value, exercise both supported
values, reject every other value, and make the manifest report the actually
supported/used semantics consistently.

### F4 — P1 blocking — the self-intersection guard misses collinear overlap

`segmentsIntersect` detects only strict proper crossings (`x1*x2 < -EPS` and
`x3*x4 < -EPS`). A contour containing a retraced collinear edge, for example
`M0 0 L10 0 L5 0 L10 10 L0 10 Z`, compiles successfully and emits geometry.
That contour is non-simple/ambiguous and is explicitly outside V1. The existing
bow-tie fixture covers only a proper crossing, so the verifier would pass this
incorrect implementation. This violates D20/D34 and A9/A10.

Required correction: robustly reject non-adjacent endpoint touches and
collinear overlaps (while handling adjacent shared endpoints deliberately),
then add adversarial fixtures to both test layers.

## Acceptance audit

| Item | Result | Cold-review evidence |
| --- | --- | --- |
| A1 | PASS | Public CLI independently regenerates the canonical output and observes `N=13`. |
| A2 | PASS | The same CLI generates the curved/concave fixture at `N=2`. |
| A3 | PASS | Fresh-directory byte comparisons pass for both fixtures. |
| A4 | PASS | Both committed fixtures report positive normalized areas. |
| A5 | PASS | D4 depths recompute within tolerance for both fixtures. |
| A6 | PASS | Invalid viewBox and zero-area fixtures reject. |
| A7 | PASS | Existing equal-area/uniform-scale assertions pass. |
| A8 | PASS (fixture-limited) | Front area and mesh spans pass for committed fixtures; no separate defect found in emitted front/back/side topology. |
| A9 | **FAIL** | Style strokes, invalid fill rules, and collinear self-overlap are silently accepted (F2–F4). |
| A10 | **FAIL** | “Every V1 rejection class” is not covered; existing tests miss F2–F4 and transformed-tolerance failure. |
| A11 | PASS | Counts/spans/IDs are data-derived; favicon `13` occurs only as a golden assertion in this phase code. |
| A12 | **FAIL** | Magnifying path transforms break the projected tolerance (F1). |
| A13 | **FAIL** | Invalid per-facet fill rule can contradict top-level manifest semantics (F3). |

## Agentic failure-mode audit

- **Verifier mirroring / happy-path certification:** the “independent” verifier
  relies on the implementation test for A12 and samples the same narrow
  rejection cases, allowing all four findings through.
- **Checklist laundering:** A9/A10 print PASS after testing representative
  features, not the runbook's exhaustive rejection-class claim.
- **Manifest self-assertion:** A13 checks expected literal fields but does not
  reconcile them against all facet values or adversarial input.
- **No fabricated evidence observed:** the runner log, commit IDs, commands and
  generated hashes inspected were real and reproducible. No cloud-AI or
  provenance violation was found.

## Severity summary

- P0: 0
- P1: 4 (F1–F4, all blocking)
- P2: 0

X1 is not eligible for DONE until the four findings are corrected and the
external gate plus a fresh cold review pass against the amended commit.
