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
