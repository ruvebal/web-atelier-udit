# PHASE-X1 final closure trust review

**Reviewed commit:** `63591637db3b9f64c36b04b0af3dc3ebd1e2f184`
**Reviewer role:** fresh independent closure reviewer; no implementation authorship
**Verdict:** **CHANGES REQUIRED — one P1 finding**
**Status ownership:** this review does not mark X1 DONE, commit, merge, or push.

## Independent review basis

I read the studio and repository contracts, the canonical
`canvas-25d-content-hero`, `svg-to-rive-3d`, and `rive-animascript-3d` skills
and their routed references, the cascade/runbook, frozen decisions,
mathematical contracts, all three preceding X1 cold reviews and their
resolution documents, the current runner-owned verify log, phase evidence,
compiler, generated artifacts, and both test layers.

I did not accept the preceding green gate or reviews as proof. At the reviewed
commit I reran:

- `node web-foundations/scripts/svg-extrusion/test.mjs` — pass;
- `node web-foundations/scripts/svg-extrusion/verify-x1-acceptance.mjs` — A1–A13 reported pass;
- `node web-foundations/scripts/svg-extrusion/test-x1-evidence-validator.mjs` — seven forged receipts rejected;
- `frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/PHASE-X1.exit-gate.sh` — pass, including the full publication build;
- direct adversarial `compileSvg` calls covering every former finding plus
  malformed/unquoted/duplicate/namespaced/residual tag syntax, nested SVG
  viewport state, paint allowlist variants, transforms, contours, topology,
  dynamic counts, and provider consistency.

The worktree already contained the runner-owned modification to
`PHASE-X1-VERIFY-LOG.md`. This review did not alter that log.

## Former-failure audit

| Former failure | Result | Independent evidence |
| --- | --- | --- |
| Magnified affine cubic | **CLOSED** | Affine-baked control points and the independent dense-reference A12 measurement remain effective. |
| Inline stroke, invalid fill rule, collinear overlap | **CLOSED** | The exact former inputs reject; admitted `evenodd` reconciles with the manifest. |
| Quoted opacity/class/paint bypasses | **CLOSED** | Root/path allowlists and bounded fill parsing reject the named quoted cases and mixed-case paint functions. |
| Unquoted path/root attributes | **CLOSED for ordinary attribute tokens** | The exact `opacity=.5`, `class=x`, `vector-effect=non-scaling-stroke`, and unquoted `viewBox` cases reject. |
| Duplicate and namespaced path attributes | **CLOSED for lexed path tags** | Duplicate `fill`, path namespace declarations, and namespaced presentation names reject. |
| Residual start-tag tokens | **INCOMPLETE** | Ordinary junk rejects, but malformed `/ >` is treated as a valid self-close and nested `svg` start tags bypass attribute validation (F1). |

The new strict-attribute assertions are materially pre-fix-sensitive: the
named unquoted/residual cases compile or evade semantic validation at
`f1f68eb`. They do not cover the remaining element-level parser bypass below.

## Finding

### F1 — P1 blocking — element-level XML parsing still admits unvalidated nested SVG semantics and malformed tag closure

`assertSafeXmlStructure()` recognizes both `svg` and `path` at every nesting
level, but `compileSvg()` passes only the first matched `<svg>` start tag to
`attrs()`. Any later/nested `<svg>` attributes therefore escape both the
consuming lexer and the root allowlist. The compiler still gathers descendant
paths globally and interprets them in the outer viewBox, while the copied SVG
fallback applies the nested viewport/position semantics.

This supported-looking input compiles successfully:

```xml
<svg viewBox="0 0 10 10">
  <svg x="5" y="4" width="2" height="2" viewBox="0 0 2 2">
    <path fill="#000" d="M0 0L2 0L2 2Z"/>
  </svg>
</svg>
```

The generated provider ignores the nested `x`, `y`, `width`, `height`, and
`viewBox`, but the authoritative fallback renders through that nested
viewport. Arbitrary nested root presentation state such as `class` or
`opacity` is likewise never lexed. This is the same silent source/fallback
divergence class as the preceding paint findings, now at the element boundary.

The bounded parser also accepts XML-invalid delimiter forms:

```text
<path ... / >       ACCEPT
</path junk>         ACCEPT
```

The first passes because both the structure check and `attrs()` treat a slash
followed by whitespace as a self-close; the second passes because closing-tag
residue is never consumed or validated. Multiple/nested `svg` roots are also
not rejected as a document-shape invariant. Thus compiler `1.0.3` does not yet
establish its documented claim that malformed/residual syntax rejects or that
every relevant start-tag character reaches an allowlist.

This violates A9 and A10, D20/D34, the frozen X1 grammar, and the adapter
skill's explicit-failure/source-fidelity invariants.

Required correction: make the bounded XML parser enforce exactly one root
`svg`, permit only direct `path` children for V1 (or deliberately parse and
bake every admitted nested viewport), run the consuming attribute lexer on
every admitted start tag, and validate the complete lexical form of both
start- and end-tags including an exact `/>` delimiter. Add nested SVG with
viewport/presentation attributes, multiple roots, `/ >`, and closing-tag
residue to both the implementation suite and the independent verifier. The
appropriate V1 result is explicit rejection.

## Acceptance audit

| Item | Result | Final trust-review evidence |
| --- | --- | --- |
| A1 | PASS | Public CLI regenerates the canonical fixture at dynamic `N=13`. |
| A2 | PASS | The same API/CLI converts the concave/cubic fixture at `N=2`. |
| A3 | PASS | Fresh deterministic rebuild comparisons pass. |
| A4 | PASS | Positive normalized facet areas hold for both fixture counts. |
| A5 | PASS | Recorded depths recompute from D4 within tolerance. |
| A6 | PASS | Exercised invalid bounds and degenerate contours reject. |
| A7 | PASS | Equal-area and uniform-scale relative-depth invariants pass. |
| A8 | PASS | Index bounds, spans, normals, front/back area, and side-wall counts pass for both fixtures. |
| A9 | **FAIL** | Nested SVG viewport/presentation semantics degrade silently and malformed delimiter syntax is admitted (F1). |
| A10 | **FAIL** | The rejection matrix omits nested/multiple SVG document shapes and residual closing/self-close syntax (F1). |
| A11 | PASS | IDs, buffers, spans, and counts remain source-`N` derived; `13` is fixture-only. |
| A12 | PASS | The transformed cubic remains independently bounded by the projected tolerance. |
| A13 | PASS for accepted flat fixtures | Coordinate, paint, fill-rule, area/centroid, winding, and provider records reconcile for the intended flat document shape. |

## Topology, determinism, dynamic-N, provider, and test-sensitivity audit

- **Topology:** the two golden fixtures retain valid facet-local indices,
  paired front/back faces, boundary side walls, unit normals, and matching area.
  The former crossing/touch/retrace/overlap cases reject.
- **Determinism:** two fresh generations of each fixture remain byte-identical.
- **Dynamic N:** canonical `N=13` and distinct `N=2` flow through the same
  compiler; no runtime capacity of thirteen was found.
- **Provider contract:** schema, array lengths, index ranges, and facet spans
  reconcile, and the scene fragment does not encode a fixture count.
- **Tests-would-fail:** regressions for all three preceding review rounds fail
  against their respective pre-fix commits. Current tests would **not** fail
  for F1: the official gate passes while each direct input above is accepted.
- **Evidence discipline:** commit, commands, receipt hashes, and external gate
  are reproducible. No fabricated provenance, cloud-AI use, or hand-copied
  fixture geometry was observed.

## Severity summary

- P0: 0
- P1: 1 (F1, blocking)
- P2: 0

PHASE-X1 is **not eligible for DONE**. Correct F1, rerun the external gate,
and assign another fresh closure review against the amended commit.
