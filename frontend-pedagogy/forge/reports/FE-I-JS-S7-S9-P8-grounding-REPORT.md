# FE-I-JS-S7-S9 — Phase 8 — JS canon grounding

**Date:** 2026-10-13
**Agent:** Claude Code (Opus 5.5)
**Plan:** `FE-I-JS-S7-S9-GROUNDING-PASS-PLAN.md` · **Run:** `~/src/profield/runs/fe-js-canon/20261013/`

## Pipeline result (`pipeline.log`, exit 0, 12:36 → 13:37 UTC)

| Source | Nodes | Coat after meta A+B | Citation preview | RIS |
| --- | --- | --- | --- | --- |
| Simpson 2020 (PDF) | 1,796 | ISBN 9781647862213 · Open Library · host match | `(Simpson 2020, n)` · `evaluator_safe=yes` | `extract/bibliographic.ris` |
| Haverbeke 2024 (EPUB) | 5,685 | ISBN 9781718504110 · Open Library · host match | `(Haverbeke 2024, n)` · `evaluator_safe=yes` | `extract/bibliographic.ris` |
| Crockford 2008 (EPUB) | 1,192 | ISBN 9780596517748 · Open Library · **host mismatch** | **`[BIBLIO-GAP]` — missing authors** | `extract/bibliographic.ris` (polluted) |

DevIAC vector ingest finished (`profield-frontend-pedagogy`, `field_prospection`); `athanor inject` → `injected: 3`.

## Quotes placed (one per lesson, EN + ES)

| Lesson | Claim | Quote source | Public locator | Verbatim check |
| --- | --- | --- | --- | --- |
| S7 | Handlers are registered with `addEventListener` and react to page events | Haverbeke node `b9a81fd8` | (Haverbeke 2024, chap. 15) | EPUB `ch15.xhtml` "15. HANDLING EVENTS" |
| S8 | A string becomes a text node that is displayed, not parsed | Haverbeke node `43e22d53` | (Haverbeke 2024, chap. 14) | EPUB `ch14.xhtml` "14. THE DOCUMENT OBJECT MODEL" |
| S9 | One shared (global) scope causes name collisions | Simpson node `c6ec6d64` | (Simpson 2020, 101) | PDF page 119 = printed p. 101 |

- ES lessons quote the English original verbatim + a marked own translation ("Traducción propia").
- Each lesson ends with `## References` / `## Referencias` (Chicago author-date). Audit data (vault slug, node id, locator mapping, year note) sits beside each quote inside `{% if site.publication.publish_internal_metadata %}`.
- Ledger: four `ahmes ground --span-type verbatim_quote` records in `~/ahmes-library/provenance.db`.

## Update — Crockford resolved (operator instruction, same day)

- Operator: "dismiss the O'Reilly SPECIAL OFFER page"; supplied references for Crockford (1st ed., O'Reilly Media) and Haverbeke (subtitle *A Modern Introduction to Programming*).
- Derived EPUB without `upgrade_offer_front/back.html` (manifest, spine, NCX); provenance in `source-derived/DERIVATION.json` (orig `0b18ecdd…` → derived `c801bfec…`). Pipeline re-run (`pipeline-derived.log`, exit 0): coat **safe**, `host_registry_match: true`, `(Crockford 2008, …)`, DevIAC + Athanor `injected: 1`.
- S9 gains a second quote (operator override of the ≤ 1 quote/lesson plan): (Crockford 2008, chap. 2) — `ch02s05.html` "Statements", node `c74d0e22`; `ahmes ground` recorded.
- References kept in **Chicago author-date** (repo contract §6.1; `verify:citations` rejects APA inline) with the operator's bibliographic data.
- Ahmes backlog filed: 12J.2 (EPUB inline whitespace), 12J.3 (EPUB OPF host metadata — the Crockford root cause), 12J.4 (PDF printed page labels); 12J.1 evidence addendum.

## Findings that need a human decision

1. ~~**Crockford is not citable (gate held).**~~ Resolved via derived EPUB (see Update). The EPUB opens with an O'Reilly "SPECIAL OFFER" page; extraction took it as the title and sentence fragments as A2 authors, so the host validator rejects the (correct) registry record *JavaScript: The Good Parts*, Crockford, O'Reilly 2008. Ahmes has no manual metadata override; forcing it would weaken the gate. → Ahmes backlog: skip vendor front matter when deriving host title from EPUB. Its 17 S9 candidates (global variables) are available internally only.
2. **Simpson page numbers.** `ahmes query --cite` reports `(Simpson 2020, 119)` with `scheme=pdf_order`; Chicago needs the printed page (101). → Ahmes backlog: printed-page mapping for Leanpub PDFs.
3. **Haverbeke year.** Coat/registry/printer key say 2024; the EPUB copyright page says © 2025. Cited as 2024 to stay consistent with the evaluator-safe coat; recorded internally.
4. **EPUB inline code loses spaces** in `original_content` ("The**addEventListener**method"). Quotes were transcribed from the source XHTML, not from the node text. → Ahmes backlog: EPUB inline-element whitespace.
5. **S7 length 464 lines (target 450).** Growth = figure markup, reference block, hidden metadata comment, References; visible teaching text did not grow. Accept or trim.

## Acceptance

- [x] Coat gate: only `evaluator_safe=yes` sources cited (Simpson, Haverbeke; Crockford after the derived-EPUB re-ingest).
- [x] Verbatim gate: every quote checked against the source file; ≤ 1 quote per lesson except S9 (2, operator override).
- [x] Locator gate: printed page (PDF) / chapter (EPUB).
- [x] Publication gate: `npm run build` exit 0 · "Publication safety passed" · "Citation conformance passed"; built pages: no `ahmes|evaluator_safe|curriculum-internal`; References is the last H2 in all six.
- [x] Parity: EN = ES line counts (464 / 404 / 408); all fences labelled.

## Blockers

- (none) — S7 464 / S9 408 lines exceed the 450 / 400 targets only by figure markup, reference blocks and hidden metadata; accept or trim.
