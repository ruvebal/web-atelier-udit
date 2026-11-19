# PHASE-X1 parser-closure review 5 resolution

**Source review:** `PHASE-X1-PARSER-CLOSURE-REVIEW-5.md`
**Disposition:** the single P2 declaration-position finding corrected; external rerun required

Compiler `1.0.9` closes the fifth parser-closure review's finding. The optional XML declaration is now matched against the raw source at offset 0 *before* comment stripping and edge trimming, so ` <?xml …?>`, `\n<?xml …?>`, and `<!-- c --><?xml …?>` no longer have the prolog silently promoted to declaration status. Those forms now reject loudly (the surviving `<?xml …?>` text is not a valid root element), matching the byte-copied `fallback.svg`'s well-formedness: an XML declaration is only a declaration at offset 0, and `<?xml` anywhere else is a reserved processing-instruction target. Comments *after* a valid offset-0 declaration remain legal and ignored, and all previously validated `XMLDecl` forms are unchanged.

Implementation tests and the independent A1–A13 verifier now reject whitespace-before-declaration and comment-before-declaration inputs in both layers.

No accepted V1 fixture changed shape; generated artifacts and evidence hashes are rebuilt from compiler `1.0.9`.
