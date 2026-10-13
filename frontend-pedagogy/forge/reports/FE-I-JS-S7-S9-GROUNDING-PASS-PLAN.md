# FE-I-JS-S7-S9 — Grounding pass (JS canon) — plan and gates

**Date:** 2026-10-13
**Status:** pipeline running → pass runs after it completes
**Run:** `~/src/profield/runs/fe-js-canon/20261013/` (`pipeline.sh`, `pipeline.log`, `grounding_candidates.py`)

## Sources (staged copies, SHA-256)

| Short | Source | Format | SHA-256 (12) |
| --- | --- | --- | --- |
| Simpson 2020 | Kyle Simpson, *You Don't Know JS Yet: Scope & Closures*, Leanpub, 2020 | PDF | `46ce42fd4811` |
| Crockford 2008 | Douglas Crockford, *JavaScript: The Good Parts*, O'Reilly, 2008 | EPUB | `0b18ecddbaed` |
| Haverbeke 2024 | Marijn Haverbeke, *Eloquent JavaScript*, 4th ed., No Starch Press, 2024 | EPUB | `6eab5aecef0c` |

## Pipeline (one command, logged)

1. `ahmes batch` → `~/ahmes-library/scholar` with treeshake + NER + semantic (Anchor C).
2. `ahmes enrich --meta --online` pass A (only-missing) and pass B (force-meta on `[BIBLIO-GAP]`) → `bibliographic.ris` per bundle.
3. `profield-verify-batch.sh --require-coats`.
4. DevIAC vector ingest (DERIVED, not citation authority), project `profield-frontend-pedagogy`.
5. `athanor inject --from-manifest … --project-slug profield-frontend-pedagogy --vault scholar`.

## Grounding pass — gates (binding)

1. **Coat gate.** A source may be cited only if `ahmes status` and `ahmes query --cite … --require-evaluator-safe` exit 0. Otherwise it stays `[BIBLIO-GAP]`, internal only.
2. **Verbatim gate.** Quoted text is copied from the node's `original_content`, never paraphrased into quotation marks. One quote per lesson at most, at the point where the claim is taught; max ~40 words.
3. **Locator gate.** Chicago author-date direct quotes need a locator. PDF → page. EPUB → whatever stable locator Ahmes records (chapter/section). If only a reflowable page index exists, use the chapter title as locator and say so in the internal comment.
4. **Publication gate.** The page shows `(Author Year, locator)` + a final `## References` / `## Referencias` with complete Chicago entries. The node id, vault slug, `evaluator_safe`, RIS path stay inside `{% if site.publication.publish_internal_metadata %}` comments (§6.1). `npm run build` must pass `verify:publication` and `verify:citations`.
5. **Scope gate.** Books ground *practice claims* (events/DOM, string-vs-node building, module scope). They do not replace the three course references (ECMA-262 · MDN · Oracle trademark) already in every JS lesson.

## Target claims

| Lesson | Claim to ground | Likely source |
| --- | --- | --- |
| S7 | Handlers are registered and the browser calls them when the event occurs | Haverbeke 2024 (Handling Events) |
| S8 | Building DOM nodes vs strings; text nodes do not parse markup | Haverbeke 2024 (The Document Object Model) |
| S9 | Global scope as a shared namespace / modules as explicit interfaces | Crockford 2008 (global variables) · Simpson 2020 (module pattern, ES modules) · Haverbeke 2024 (Modules) |
