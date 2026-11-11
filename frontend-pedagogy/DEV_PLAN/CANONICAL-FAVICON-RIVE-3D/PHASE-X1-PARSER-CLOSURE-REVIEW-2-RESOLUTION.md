# PHASE-X1 parser-closure review 2 resolution

**Source review:** `PHASE-X1-PARSER-CLOSURE-REVIEW-2.md`
**Disposition:** both P1 findings corrected; external rerun and fresh closure review required

Compiler `1.0.6` closes the two P1 escapes from the second parser-closure review. One XML-space predicate (`isXmlSpace`: space, tab, CR, LF) and one edge trimmer (`xmlTrim`) now replace every JavaScript `\s`/`trim` use in the grammar boundary — tag scanning, attribute lexing, transform tokenizing, path residue stripping, style declarations, `viewBox` splitting, and root length validation. Non-XML whitespace such as form feed, vertical tab, NBSP, U+2028/U+2029, U+3000, and U+FEFF no longer normalizes into separators between attributes, inside tags, inside `d`, inside `transform`, inside `viewBox`, or around the document; it rejects loudly instead of producing geometry the copied `fallback.svg` cannot reproduce.

Path and geometry finiteness is now enforced at every boundary the reviewer named: `num()` rejects non-finite coordinates (`1e999`, `-1e999`), the emitted ring is checked after transform bake and normalization, signed area must be finite and above `minimumTriangleArea`, the centroid must be finite, depth derives only from finite positive areas, and a final guard rejects any non-finite `positions`/`normals` buffer before serialization. Overflowing inputs such as `1e308` coordinates fail as degenerate/non-finite contours rather than emitting `null` provider data. The independent verifier's `validateMesh` now also asserts `Number.isFinite` on positions, normals, facet areas, depths, and centroids so A8 cannot bless corrupt buffers.

Implementation tests and the independent A1–A13 verifier now cover form feed/vertical-tab-class whitespace between attributes and tags, NBSP/U+2028/U+FEFF/U+3000 inside path data, non-XML whitespace inside transform arguments and `viewBox`, trailing non-XML whitespace after `</svg>`, `1e999`/`-1e999` coordinates, and `1e308` area overflow. Valid XML whitespace forms, composed transforms, and both golden fixtures are unchanged in shape.

No accepted V1 fixture changed shape; generated artifacts and evidence hashes are rebuilt from compiler `1.0.6`.
