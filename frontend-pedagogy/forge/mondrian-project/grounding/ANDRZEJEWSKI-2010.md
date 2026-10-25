# Andrzejewski et al. — extraction and retrieval receipt

**Status:** extracted, injected and evaluator-safe. DOI
[`10.1117/12.840558`](https://doi.org/10.1117/12.840558) was verified against
the stored title through Ahmes's manual DOI resolver and Crossref.

## Pipeline receipt

- Source: `spie-2010.pdf`; SHA-256
  `c85b3b9ffc8c0637dc8d21cca4059784334757aade9c9098baf19a98d2c4e7e4`.
- Ahmes document: `db745f4a-1dea-5727-8f28-19330e20a8e2`.
- Vault:
  `/Users/ruvebal/ahmes-library/scholar/documents/spie_2010_c85b3b9f/extract/extraction.db`.
- Extraction: 118 nodes, 202 entities, 73 relations; 59 of 90 eligible nodes
  received semantic anchors. Seven unknown vocabulary URIs were rejected rather
  than stored.
- Bibliographic repair: `resolve_manual_doi.py --dry-run` matched the Crossref
  title, then the live run wrote DOI, title, authors, year and container with
  verified provenance. `ahmes query --cite --style apa
  --require-evaluator-safe` now returns `(Andrzejewski, 2010, p. 1)` at
  confidence 0.95, `evaluator_safe=yes`.
- Athanor injection:
  `9a1a8bb5-05ff-4340-88bd-fbc10268a50f`, project
  `profield-frontend-pedagogy`, library `scholar`, status `COMPLETED`.
- Athanor scoped retrieval returned the injected full node UUIDs and pages.
- DevIAC's general vector endpoint did not return this document: it is a
  different store from the scoped Athanor project.
- DevIAC GraphRAG could not open the `scholar` vault because its running
  `AHMES_VAULT_DIR` does not expose that library. The local Ahmes relation
  neighbourhood was inspected instead; it is discovery evidence only.

## Retained claims

These are plan-grounding claims. Public prose may cite them only after reading
the complete node; vector snippets remain discovery-only.

| Use in the plan | Full Ahmes anchor | What the complete node supports |
| --- | --- | --- |
| Classical analyzer | `⟨spie_2010_c85b3b9f⟩ · nodo e44e0d8d-0e0f-5cfb-9c71-dc0fde0e6f46 · p. 2` | Extraction of horizontal/vertical segments, their widths, coloured-rectangle parameters and a normalized list representation. |
| Work schema | `⟨spie_2010_c85b3b9f⟩ · nodo a0530710-719c-577b-b43c-2399694278cf · p. 5` | Coloured rectangles have colour roles; lines have pixel thickness; grid points represent line centres and canvas-edge boundaries. |
| Deliberate corpus scope | `⟨spie_2010_c85b3b9f⟩ · nodo 1d5b7216-991c-5a4d-833a-7e3a60c311dd · p. 2` | The study restricts itself to classical orthogonal neo-plastic works and excludes diagonal/lozenge and *Victory Boogie Woogie* cases. |
| Representation limit | `⟨spie_2010_c85b3b9f⟩ · nodo 07cd656b-12e0-5604-853c-636078747225 · p. 4` | Idealized digital sketches omit colour variation, brush-stroke texture and associated visual weight. |
| ML is not the artist's process | `⟨spie_2010_c85b3b9f⟩ · nodo 6939e2a2-5697-5c18-b10a-b29ebe7c0450 · p. 6` | Decision trees and generative models are not claimed to represent Mondrian's own iterative working method. |
| Reported classifier result | `⟨spie_2010_c85b3b9f⟩ · nodo 35d78ae8-7871-5810-9f13-c94d45c7202e · p. 1` | The abstract reports roughly 70% accuracy distinguishing genuine works from generated replicas with similar statistical properties. |
| Evaluation design | `⟨spie_2010_c85b3b9f⟩ · nodo 07107abf-a337-52db-8225-378ae39b0bfe · p. 8` | Forty-five genuine and forty-five generated works, decision-tree cross-fold experiments, ten repetitions and a 50% baseline. |
| Generation limit | `⟨spie_2010_c85b3b9f⟩ · nodo b1e40c2d-741b-5f62-a2bc-0be9e3cbad43 · p. 10` | The simple generated works do not closely resemble genuine compositions and contain too many uninterrupted full-canvas lines. |

Page numbers above are human-facing PDF pages (`page_index + 1`). Full UUIDs,
not vector snippets, are the evidence keys.

## Architectural consequence

The paper supports a normalized geometry/colour/line-width data contract and a
classical extraction aid. It does **not** support treating generated images as
authentic Mondrians, turning a classifier into an aesthetic score, or claiming
that a compact model captures material surface or artistic process. Therefore
the MVP keeps:

1. measured immutable works and explicit uncertainty;
2. OpenCV/NumPy extraction with human verification;
3. line weight as measured baseline plus visitor-controlled relative multiplier;
4. TensorFlow and generation outside the MVP;
5. public language such as “study after Mondrian,” never “new Mondrian.”

## Bibliographic record

Andrzejewski, D., Stork, D. G., Zhu, X., & Spronk, R. (2010). Inferring
compositional style in the neo-plastic paintings of Piet Mondrian by machine
learning (D. G. Stork, J. Coddington, & A. Bentkowska-Kafel, Eds.; p. 75310G).
https://doi.org/10.1117/12.840558

For claims, retain the full Ahmes node and page in the private grounding
surface. The ordinary APA reference is now safe for the public reference list.
