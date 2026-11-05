# FE II album-cover satellites — cite and platform-note transcript

**Date:** 2026-11-04  
**Rule:** vectors and Profield maps discover; only Ahmes coat · node · page supports research claims. Standards and vendor documentation are labelled platform notes and never presented as pedagogy evidence.

## Ahmes citation gate

The current Ahmes CLI attempted a v8→v9 schema migration even for a citation query. The sovereign vault is read-only in this run, so the first direct command failed closed with `OperationalError: attempt to write a readonly database`. To avoid mutating the authoritative vault, the executor copied its 132 KiB `extraction.db` to a temporary directory and ran the same resolver there. Node IDs, metadata, and page anchors are unchanged.

```text
$ ahmes query --cite <temporary-copy>/extraction.db:348bd016-3aee-5eb3-ae93-b3d422e137df --style chicago-author-date --require-evaluator-safe
(Angel 2024, 1)  [348bd016-3aee-5eb3-ae93-b3d422e137df]  page_index=0
  confidence=0.95 source=metadata kind=person scheme=pdf_order evaluator_safe=yes

$ ahmes query --cite <temporary-copy>/extraction.db:92a534c1-6aff-5d5e-b1e5-2a7d2e2c65a9 --style chicago-author-date --require-evaluator-safe
(Angel 2024, 2)  [92a534c1-6aff-5d5e-b1e5-2a7d2e2c65a9]  page_index=1
  confidence=0.95 source=metadata kind=person scheme=pdf_order evaluator_safe=yes
```

Sovereign coat: `10_1145_3641235_3664433_the_future_of_teaching_computer_graphics_e2e9b45c`.

The cited nodes state that shader/render functions remain substantially similar across evolving graphics APIs and argue for preserving fundamental graphics topics. They support a durable-concepts precedent. They do **not** validate R3F, Drei, an album-cover brief, a KTX2 lesson, or this cohort's assessment sequence.

## Explicit gaps and excluded records

- **[UNVERIFIED-GAP]** No evaluator-safe Ahmes node validates higher-education KTX2/Basis pedagogy, R3F/Drei shader teaching, the album-cover cultural prompt, or TTOD-shaped cover-route PRs as learning interventions.
- **[BIBLIO-GAP] / excluded:** AI Co-Artist remains unsafe for student citation and is not used as the cover-shader authority.
- ShaderMatch DOI `10.1109/LLM4Code66737.2025.00017` was not OA in X2 and therefore has no Ahmes node in the 20261104 run. It is not promoted into X5–X8 citations.

## Platform-note ledger for X5–X8

These sources ground HOW only; none closes the HE gaps above.

| Class | Source | Use |
| --- | --- | --- |
| `[STANDARD]` | Khronos Group, KTX 2.0 specification, https://registry.khronos.org/KTX/specs/2.0/ktxspec.v2.html (accessed 2026-11-04) | Container and ETC1S/UASTC distinctions. |
| `[PRACTITIONER]` | Binomial, Basis Universal format specification, https://github.com/BinomialLLC/basis_universal/wiki/.basis-File-Format-and-User-Documentation (accessed 2026-11-04) | Encoder trade-offs; verify against actual assets. |
| `[PRACTITIONER]` | Three.js, `KTX2Loader`, https://threejs.org/docs/pages/KTX2Loader.html (accessed 2026-11-04) | Runtime support detection and transcoding. |
| `[STANDARD]` | Khronos Group, glTF 2.0 specification, https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html (accessed 2026-11-04) | Texture/image/sampler delivery model. |
| `[PRACTITIONER]` | React Three Fiber and Drei documentation (accessed 2026-11-04) | Current renderer, hook, and helper APIs only. |

## Student-facing Chicago forms to copy in X5–X8

Research reference:

- Angel, Edward, and Dave Shreiner. 2024. “The Future of Teaching Computer Graphics.” *SIGGRAPH Educators Forum ’24*. https://doi.org/10.1145/3641235.3664433.

Dated platform notes (keep visibly separate from References-as-research):

- Khronos Group. n.d. “KTX™ Version 2.0.” Accessed November 4, 2026. https://registry.khronos.org/KTX/specs/2.0/ktxspec.v2.html.
- Three.js. n.d. “KTX2Loader.” Accessed November 4, 2026. https://threejs.org/docs/pages/KTX2Loader.html.
- Khronos Group. n.d. “glTF™ 2.0 Specification.” Accessed November 4, 2026. https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html.

No DOI is asserted for any platform note.
