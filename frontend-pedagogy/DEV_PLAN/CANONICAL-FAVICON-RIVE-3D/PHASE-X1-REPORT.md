# PHASE-X1 · Reusable SVG extrusion compiler

**Status:** VERIFYING
**Branch:** `cascade/CANONICAL-FAVICON-RIVE-3D-1`
**Implemented:** 2026-11-11

## Outcome

The favicon-agnostic compiler now converts the supported SVG subset into deterministic indexed front/back/side geometry, a reviewable manifest, a source-agnostic Rive scene fragment, and the unchanged SVG fallback. `fava-mark-static.svg` is the golden fixture and currently produces 13 stable facets; `concave-cubic.svg` exercises a different dynamic count (2), concavity, a cubic curve, and composed affine transforms.

The implementation and schemas are documented in `web-foundations/scripts/svg-extrusion/README.md`. Canonical generated output lives under `docs/assets/animations/fava/rive/animascript-3d/generated/favicon/`; the second golden output lives under `scripts/svg-extrusion/golden/concave-cubic/`.

## Verification prepared for the external gate

- `node scripts/svg-extrusion/test.mjs` — implementation tests for deterministic generation, depth, path grammar, concave triangulation, dense cubic deviation, and rejection classes.
- `node scripts/svg-extrusion/verify-x1-acceptance.mjs` — independent A1–A13 verifier; rebuilds canonical and distinct-N fixtures twice in fresh temporary directories and inspects output mesh invariants and scene-fragment conformance.
- `node scripts/svg-extrusion/test-x1-evidence-validator.mjs` — adversarial mutations reject missing/extra acceptance IDs, forged hashes/exits, unresolved claims, and missing/forged transcripts.
- `PHASE-X1.exit-gate.sh` also runs the complete publication build after semantic evidence verification.

## Amendments from implementation

The original “affine transforms” and “M/L/C/Z” wording was underspecified. D34/D35 and the X1 runbook now freeze XML safety, tokenizer behavior, transform composition, coordinate normalization, generated-provider schema, winding, depth direction, and dynamic facet spans. No downstream phase assumes the favicon count as capacity.

## Open gate

The implementer has not marked X1 DONE. The cascade harness must rerun the exit gate from the committed tree; a fresh cold reviewer must inspect the verifier, mesh output, and acceptance evidence.

## Cold-review amendment

The first cold review correctly blocked promotion with four P1 findings. The amendment now flattens cubics after the full affine transform, resolves and validates inline paint style, validates `nonzero`/`evenodd` against truthful manifest semantics, and rejects proper crossings, endpoint touches, retracing, and collinear overlap. Both test layers contain adversarial cases that fail the pre-amendment code, including a transformed cubic measured independently against the projected 0.35 px bound. See `PHASE-X1-REVIEW-RESOLUTION.md`. X1 remains VERIFYING pending a new external gate and independent re-review.

The next closure review found one further P1 in the same supported-subset boundary: unresolved path paint semantics could still make the copied fallback diverge from generated materials. Compiler V1 now publishes and enforces `solid-hex-or-rgb/v1`, opaque-only paint, a root/path attribute allowlist, and explicit rejection of class, opacity/fill-opacity, inherited or variable colours, case-varied paint functions, invalid fill strings, and unknown presentation state. Both test layers reproduce every named adversarial case. See `PHASE-X1-FINAL-REVIEW-RESOLUTION.md`. X1 remains VERIFYING.

The final trust review then found that unquoted/malformed attributes could bypass those allowlists because the old extractor ignored residual tag syntax. Compiler `1.0.3` replaces extraction with a consuming attribute lexer: every character must form one unique quoted attribute or compilation fails. Both test layers cover the reviewer’s unquoted opacity/class/vector-effect cases plus unquoted root values, duplicates, path namespaces, and arbitrary residue. See `PHASE-X1-TRUST-REVIEW-RESOLUTION.md`. X1 remains VERIFYING.
