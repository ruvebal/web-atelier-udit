# PHASE-X1 parser-closure review 3 resolution

**Source review:** `PHASE-X1-PARSER-CLOSURE-REVIEW-3.md`
**Disposition:** the P1 viewBox coercion finding and both P2 hardening findings corrected; external rerun and fresh closure review required

Compiler `1.0.7` closes the third parser-closure review's findings. `viewBox` no longer uses bare `Number()`: tokens must match the same SVG-number grammar as path and transform data (optional sign, decimal, exponent — `0x`/`0b`/`0o`/`Infinity` coercion rejects), and splitting preserves empty tokens so `0,,0`, `0 , , 10 10`, leading/trailing commas, and comma runs reject instead of collapsing. This matters because `viewBox` is the sole normalization authority: a coerced or collapsed parse would emit geometry no conforming consumer derives from `fallback.svg`.

The two P2 gaps are also closed rather than deferred. `stripComments` now enforces XML comment well-formedness — `--` inside the body and a trailing `-` reject, and non-XML characters in comment bodies reject — so a malformed comment cannot make the byte-copied `fallback.svg` non-well-formed while the compiler accepts it. The attribute lexer rejects attribute values containing characters outside the XML `Char` production (control characters such as FF/VT), which previously could pass into carried metadata like `sourceId`. Path commas are now placement-checked: a comma must sit between two numbers, so `M0,,0`, `M0 0,L…`, trailing commas, and `Z`/`z` followed by comma-wsp reject consistently with the transform lexer's separator rules. Compiler config values (`minimumTriangleArea` included) are finite-checked in the same pass.

Implementation tests and the independent A1–A13 verifier now cover hex/binary/octal viewBox tokens, collapsed and edge comma runs in `viewBox`, malformed comments, control characters in attribute values and comments, and misplaced path commas including the post-close comma form. Valid comma-separated `viewBox`, comma-separated path coordinates, negative-number commas, and well-formed comments still compile.

No accepted V1 fixture changed shape; generated artifacts and evidence hashes are rebuilt from compiler `1.0.7`.
