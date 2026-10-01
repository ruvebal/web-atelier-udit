# Proposal: One Student Protocol + Grounded Thin Gates

**Status:** active plan (supersedes the three-pillar split)  
**Targets:** `web-foundations/docs/methodology/{en,es}/ai-practical-guide/`  
**Sibling (unchanged role):** `…/ai-assisted-development-foundations/` (manifesto / architecture depth)  
**Grounding contract:** Ahmes cite-grade only · Athanor/DevIAC discovery · publication firewall

---

## Verdict

Keep **one student-facing document**. Rename and restructure it as an actionable **AI-Assisted Development Protocol**. Do **not** split ethics and law into peer methodology URLs.

The live page already states the right audience contract (“followed, then tested in the oral defence”). The defect is **mix and bulk**, not missing pages: protocol, Human Flourishing Test, and broader impact share one spine without clear gate vs digression.

Three peer pillars (Protocol / Ethical Position / Legal Framework) help *authors* and hurt *students*. Cross-links rot; defence needs one bookmark.

---

## Document shape (single page)

| Layer | Role on the page | Thickness |
| ----- | ---------------- | --------- |
| **Spine** | Plan → disclose → verify → defend | Full — checklists, docs-first loop, ladder, MCP/server checks |
| **Ethics gate** | Human Flourishing Test + short “why” | Thin — required before each AI-assisted project; not a research position paper |
| **Legal / integrity gate** | Classroom rules that exceed or implement disclosure | Thin — disclose tool + contribution + human verification; no secrets in prompts; copyright/authorship you can defend |
| **Out of page** | MSCA computational-authorship write-ups, EU AI Act treatise, institutional counsel memos | Link out or stay unpublished; do not invent empty methodology peers |

### Rename

| | Current | Target |
| --- | --- | --- |
| **Title** | AI-Assisted Development: A Practical Guide | AI-Assisted Development Protocol |
| **Slug / path** | `ai-practical-guide` | Prefer keep slug for stable URLs; title change is enough unless a redirect campaign is scheduled |
| **ES title** | Desarrollo Asistido por IA: Guía Práctica | Protocolo de Desarrollo Asistido por IA |

### Keep on this page

- Covenant table (understand every line · disclose · no secrets · verify before commit)
- Docs-first loop
- README / commit disclosure requirements
- Verification checklist (defence-facing)
- Technical security considerations students can act on
- The ladder (Classical → Hybrid → AI-augmented → Governance) as orientation, not manifesto
- Thin ethics + integrity gates (above)
- “Where to go next” → Foundations, Tao, tracks

### Cut or relocate

| Content | Disposition |
| ------- | ----------- |
| Broader ethical frameworks / funded-research narrative | Cut from student page; optional unpublished research note or Foundations only if already in scope |
| Regulatory compliance survey (EU AI Act catalogue, industry regs) | Cut; if a classroom rule needs a legal corollary, cite **official** primary source only (see Grounding) |
| Funding / MSCA context | Never on the student protocol page |
| Long “how LLMs work” landscape that does not change defence behaviour | Compress to what students must know to distrust hallucinated code |

### Do not create (unless a real audience appears later)

```
/methodology/en/ai-ethical-position/           # research position — not student protocol
/methodology/en/ai-legal-regulatory-framework/ # counsel memo — not student protocol
```

Audience split (students / researchers / administrators) is expressed as **section depth and external links**, not three methodology peers.

---

## Grounding (mandatory before content lock)

Student claims that look like research, policy, or law must pass the studio cite pipeline. Vector hits are discovery only.

### Pipeline

```
claim on draft page
        │
        ▼
Athanor / DevIAC search_knowledge   ← discovery (project-scoped; record every slug tried)
        │
        ▼
Ahmes: read full node + page context   ← evidence boundary
        │
        ▼
ahmes query --cite … --style chicago-author-date
        │
        ├─ evaluator_safe=yes → public Chicago (Author Year, page) + References entry
        └─ else → [BIBLIO-GAP] in gated source comment only; omit polished cite or teach as open question
```

Legal / regulatory claims are **not** settled by similarity search. Browse EUR-Lex / Commission / competent authority; verify article, force status, dates, actors, exceptions. Course rules that exceed the statute must be labelled as **course rules**.

### Surfaces (publication firewall)

| Surface | What appears |
| ------- | ------------ |
| **Student HTML** | Chicago author-date · complete References · operative course rules · official law links |
| **Markdown source** | Full audit in switch-gated `curriculum-internal` comments |

```liquid
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
[BIBLIO-GAP or VERIFIED]
Ahmes anchor: <namespace>/documents/<doc>/extract/extraction.db
node: <uuid>; page: <n>; evaluator_safe=<yes|no>; reason: <resolver>
discovery: <project_slug / scope>; transfer-boundary: <frame vs measured outcome>
-->
{% endif %}
```

`publication.publish_internal_metadata` defaults **false**. Normal build must fail if rendered output contains `Ahmes`, `Athanor`, `DevIAC`, `[BIBLIO-GAP]`, node/coat IDs, extraction paths, or local architecture names.

### Existing anchors to reconcile (do not invent replacements)

The EN guide already carries a studio node pointer that is **[BIBLIO-GAP]** on the Ahmes coat:

- `curriculum-internal` → studio guide node `82b3b541-0cf2-5f0a-adb9-7470db8f8a71`
- Foundations page already models the dual-surface pattern (e.g. MCP security arXiv nodes behind the gate)

Refactor work must **preserve or strengthen** those trails, not silently drop them. Prefer adding verified cites beside claims; never polish a gap into a fake author-date line.

### Suggested discovery scopes (read-only; record misses)

| Claim family | Likely scopes (attempt and log) |
| ------------ | -------------------------------- |
| Pedagogy / disclosure / authorship integrity | frontend-pedagogy · MSCA/SVCM authorship corpora if injected · studio TTOD only for epigraphs |
| Digital rights / human-centred AI framing | Official EU/UNESCO texts first; Ahmes only if extracted copies exist |
| Security / MCP / toolchain | Already patterned on Foundations — reuse verified nodes where claims overlap |
| EU AI Act / GDPR-style obligations | Official primary sources only; Ahmes optional for secondary commentary never as the legal cite |

Skill references when executing: `ground-with-athanor-ahmes` · DevIAC `provenance-layer` · web-atelier `lesson-publishing-integrity.mdc` §6–§6.1.

---

## Implementation phases

### Phase 0 — Inventory & grounding map

1. Outline current EN/ES sections; tag each as **spine / gate / cut / relocate**.
2. List every research, policy, or legal claim that will remain.
3. Run scoped Athanor/DevIAC discovery; Ahmes page reads; cite gate; official-law checks.
4. Produce a short claim→anchor table (internal only) before rewriting prose.

**Exit:** claim map with VERIFIED / BIBLIO-GAP / official-law / course-rule labels.

### Phase 1 — Restructure the single page (EN then ES)

1. Retitle to Protocol; tighten frontmatter `description` to defence ownership.
2. Lead with covenant + ethics gate + integrity gate.
3. Spine: docs-first → disclosure → verification checklist → security students can act on → ladder (short).
4. Cut relocated digressions; compress LLM landscape.
5. Refresh “Where to go next” (Foundations, Tao, tracks) — no new peer methodology URLs.
6. Insert Chicago cites + gated `curriculum-internal` blocks from Phase 0.
7. Parity pass on ES.

**Exit:** EN/ES Protocol pages; no new methodology directories.

### Phase 2 — Navigation & redirects

1. Update methodology hubs and track links that still say “Practical Guide” as title.
2. Keep permalink `/methodology/{lang}/ai-practical-guide/` unless a deliberate redirect campaign is approved.
3. Student template reminder (`student-project-template/docs/AI-METHODOLOGY-REMINDER.md`) points at the Protocol title.

**Exit:** one student entry point; Foundations remains depth, not a second covenant.

### Phase 3 — Publication gates

1. `cd web-foundations && npm run build` — no Liquid warnings.
2. Publication / citation checks: no Ahmes/Athanor/DevIAC/BIBLIO-GAP/IDs in `_site/`.
3. Spot-check that gated comments remain in source Markdown.
4. Confirm References entries match inline Chicago forms for every public cite.

**Exit:** build clean; firewall green; claim map archived next to this proposal or under `frontend-pedagogy/grounding/` if it grows.

---

## Benefits (revised)

| Concern | How the single Protocol answers it |
| ------- | ---------------------------------- |
| Student actionability | One page to follow and defend |
| Ethics without digression | Thin gate, not a research peer |
| Law without counsel-memo sprawl | Course rules + official links; no Act catalogue |
| Maintenance | Tools/checklists update on this page; research essays stay off it |
| Scholarly integrity | Ahmes cite-grade + dual-surface provenance on every retained claim |

---

## Explicit non-goals

- Three-pillar methodology site architecture
- Publishing MSCA / grant narrative on the student protocol
- Citing vector snippets or unresolved BIBLIO-GAP as Chicago
- Treating ethics recommendations as legal mandates (or the reverse)
- Renaming slug without a redirect plan

---

## File structure (after)

```
/methodology/en/
├── ai-practical-guide/                 # Protocol (retitled; same slug)
├── ai-assisted-development-foundations/  # Manifesto / depth depth
└── tao-of-ai-development/              # Stub → TTOD chapter

/methodology/es/
├── ai-practical-guide/                 # Protocolo (parity)
└── …
```

Internal (unpublished) artefacts from this work may live under `docs/` or `frontend-pedagogy/grounding/` — never under student-facing Paths without the publication firewall.
