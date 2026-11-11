# PHASE-X1 parser-closure review 4 resolution

**Source review:** `PHASE-X1-PARSER-CLOSURE-REVIEW-4.md`
**Disposition:** all three P2 findings corrected; external rerun required, fresh closure review at orchestrator discretion

Compiler `1.0.8` closes the fourth parser-closure review's findings. The attribute lexer now builds its map on `Object.create(null)`, so `__proto__` (and any other prototype-chain name) is stored and reaches the root/path allowlists — `<svg __proto__="x">` rejects as an unsupported root attribute, a lone `__proto__` on `path` rejects as unresolved, and duplicate `__proto__` declarations reject as duplicates instead of one silently vanishing.

The optional `<?xml …?>` prolog is no longer stripped by an unvalidated regex: when present it must match the strict `XMLDecl` production — `version` first as `"1.n"`/`'1.n'`, then optional `encoding`, then optional `standalone` yes/no, in that order — and its body may contain only XML characters. `<?xml garbage?>`, `<?xml version="x"?>`, out-of-order pseudo-attributes, and control characters inside the declaration all reject, so the byte-copied `fallback.svg` can never be non-well-formed XML while the compiler accepts it. Valid declarations including the canonical `<?xml version="1.0" encoding="utf-8" ?>` still compile.

The `viewbox-comma-run` regression in both test layers now uses the discriminating `0 0 , , 10 10` form (four tokens plus an empty middle) that the pre-fix `Number()`+collapsing split accepted and `1.0.7` rejects; `__proto__` root/path/duplicate cases and malformed/valid XML declaration cases were added to both `test.mjs` and `verify-x1-acceptance.mjs`.

No accepted V1 fixture changed shape; generated artifacts and evidence hashes are rebuilt from compiler `1.0.8`.
