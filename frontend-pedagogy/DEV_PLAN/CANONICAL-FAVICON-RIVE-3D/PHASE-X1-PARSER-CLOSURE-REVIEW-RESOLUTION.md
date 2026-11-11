# PHASE-X1 parser-closure review resolution

**Source review:** `PHASE-X1-PARSER-CLOSURE-REVIEW.md`
**Disposition:** blocking path/transform findings corrected and the P2 root-metadata gap constrained; external rerun and fresh closure review required

Compiler `1.0.5` closes the two P1 escapes from the fresh parser-closure review. `parsePath` now treats `Z`/`z` as terminal for the single V1 contour: SVG's implicit post-close subpath (`Z` followed by `L`/`C` or relative forms) rejects instead of being merged into one ring, while an explicit post-close `M` still rejects as a second subpath. `transformMatrix` is now a strict tokenizer rather than a regex/split/filter parser: it requires named `matrix`/`translate`/`scale`/`rotate` functions, exact numeric arity, no empty arguments or trailing separators, anchored numbers, and legal whitespace/comma function separators.

The P2 root-metadata gap is also constrained rather than deferred: root `xmlns`/`xmlns:xlink` must be the SVG/XLink namespaces when present, and `width`/`height` must be positive unitless-or-`px` lengths. They remain non-geometric metadata; `viewBox` is still the only coordinate authority.

Implementation tests and the independent A1–A13 verifier now reject absolute/relative post-close `L`/`C`, post-close `Z`, `translate(,1)`, `translate(1,)`, `scale(,2)`, empty `matrix`/`rotate` arguments, separator-only transform lists, missing function separators, and invalid root namespace/viewport values. Positive coverage keeps valid namespace declarations, `width="10px"`, composed transforms, and both golden fixtures unchanged in shape.

No accepted V1 fixture changed shape; generated artifacts and evidence hashes are rebuilt from compiler `1.0.5`.
