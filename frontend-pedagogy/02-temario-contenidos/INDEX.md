# Temario / Contenidos — three-pass bibliography prospection (Frontend)

_Operator-local. Follows the field-scoping philosophy: **map → independent audit → merge** (then optional tool re-check / OA retrieve)._

**Contract:** official Contidos / Temario in **Frontend I** and **Frontend II** (UDIT Web Atelier) need **technical · canonical/theoretical · academic** references with **DOI and/or ISBN** before they enter CV Temario / lesson lists.

**CV anchors:**

- [`../cv/udit-ruvebal-frontend-i-cv.md`](../cv/udit-ruvebal-frontend-i-cv.md)
- [`../cv/udit-ruvebal-frontend-ii-cv.md`](../cv/udit-ruvebal-frontend-ii-cv.md)

**Field map (already run):** [`../profield-frontend-pedagogy.md`](../profield-frontend-pedagogy.md). Research twin for raw replies / OA / Ahmes: `profield/runs/frontend-pedagogy/02-temario-contenidos/`. This pack is the **syllabus-contents** bibliography layer — not a redo of the global field map.

**Operator index:** [`../grounding/temario/INDEX.md`](../grounding/temario/INDEX.md)

**Complement:** critical / AI-critique strand → [`../03-temario-critica/`](../03-temario-critica/).

## Rhythm (per cluster T1 · T2 · T3)

| Pass | Surface | Prompt | Save reply as |
| ---- | ------- | ------ | ------------- |
| **1 · Map** | External model **A** (deep research) | `T*.pass1.prompt.md` | `T*.pass1.raw.md` |
| **2 · Audit** | External model **B** (*different* vendor) | [`pass2-audit.prompt.md`](./pass2-audit.prompt.md) + paste Pass-1 raw | `T*.pass2.raw.md` |
| **3 · Merge** | External model **C** *or* careful human+tools | [`pass3-merge.prompt.md`](./pass3-merge.prompt.md) + Pass-1 + Pass-2 | `T*.edited.md` |

**Non-negotiables**

1. Pass 2 **verifies, does not extend** the map.  
2. Pass 3 **merges edits** into one bilingual bibliography; drops or quarantine anything without a checkable **DOI** and/or **ISBN** (or an explicit `identifier:` + `no-doi-no-isbn` quarantine list).  
3. Adversarial independence: A ≠ B. Prefer a third surface for merge, or merge yourself with doi.org / Crossref / library catalogue open.  
4. Public keywords only in exported prompts (confidentiality gate — see `frontend-pedagogy.yaml`).  
5. Keep claim types separate: web-platform ≠ interface-layer ≠ general programming education ≠ practitioner docs ≠ peer-reviewed. Collapsing these is the field’s main secondary-literature failure mode.

## Clusters

| Pass-1 file | Anchors | Course |
| ----------- | ------- | ------ |
| [`T1-durable-core-css-js-a11y.pass1.prompt.md`](./T1-durable-core-css-js-a11y.pass1.prompt.md) | CSS3 / responsive · modern JS / async / Fetch · UX/UI + WCAG foundations | FE I · Mods 1–3 |
| [`T2-react-ai-assisted-modern.pass1.prompt.md`](./T2-react-ai-assisted-modern.pass1.prompt.md) | Framework philosophy · React / state / routing / data · testing & deploy · AI-assisted method (docs-first) | FE I · Sem 2 (Mods 4–7) |
| [`T3-production-frontier-astro-pwa-3d-iot.pass1.prompt.md`](./T3-production-frontier-astro-pwa-3d-iot.pass1.prompt.md) | Metaframeworks / islands · PWA · performance budgets · R3F / shaders · IoT–Python interfaces · AI code review | FE II · Blocks 1–6 |

After `T*.edited.md` is stable → promote to `profield/.../01/temario/` + `grounding/temario/` → `make harvest-temario-fe` → `refcheck-temario-fe` → `retrieve-temario-fe` → Ahmes / Athanor / `make ingest-profield-fe`. Guide: [`../grounding/TEMARIO-PROSPECTION.md`](../grounding/TEMARIO-PROSPECTION.md).

**Status 2026-08-11:** T1–T3 Pass-3 merges promoted and harvested (19 DOI · 3 ISBN-only). Historical `*.pass1.resultant.mdc` kept for provenance; not harvested.
