<!--
Case study — grounding web-foundations/docs/methodology/en/ai-assisted-development-foundations/index.md
against semantic vector search across the WHOLE ahmes-library, not one profield corpus.
Author: ruvebal@crea-comm.net (Claude-assisted) · 2026-08-19
-->

# Case study — library-wide grounding for AI-Assisted Development Foundations

**Generation-method disclosure (added 2026-08-19, per the studio's own
authorship-stays-human covenant, AI-MANIFEST.md §5):** the analysis, query
design, and prose in this document were produced by Claude (Anthropic,
cloud-hosted), running as Claude Code, directed turn-by-turn by
`ruvebal@crea-comm.net`. **Not** locally-Ollama-authored — checked against
AI-MANIFEST.md §1 / provenance-layer/SKILL.md rule 6 ("No cloud AI"), and
this document does not currently comply with that clause as literally
written. Ollama (local) computed the embedding substrate the vector queries
in §2 ran against (`nomic-embed-text`) — that layer is locally sovereign;
the orchestration, judgment calls (which queries to run, which hits to
push to citation, the evaluator_safe findings) were not. Every specific
factual claim below (similarities, citations, `evaluator_safe` verdicts)
was independently verified live against real systems in-session, not
generated from the model's own knowledge — see inline commands throughout.

**Trigger:** "there is much on AI on vaults in different projects and allover
the library — can we use that use-case for a deeper [dive] than the email
technical guide?" Confirmed correct — see §2. This is a **methodology
demonstration + a first real citation pushed through**, not a claim that
the lesson page is now fully grounded — see §4 for what's still open.

**Target:** [`web-foundations/docs/methodology/en/ai-assisted-development-foundations/index.md`](../../../web-foundations/docs/methodology/en/ai-assisted-development-foundations/index.md)
— a short manifesto page (title/description/8-point stack/4-rung ladder,
~90 lines). Full text read before running any query — see §1.

---

## 1. What the page actually claims (read, not paraphrased from memory)

| Claim | Exact wording |
| --- | --- |
| A | LLMs are probabilistic reasoning engines operating inside systems |
| B | Capability-based security and blast radius (stack item 5) |
| C | Observability and audit trails (stack item 6) |
| D | Retrieval and context curation comes before agents/RAG/MCP (stack item 7-8) |
| E | Governance rung: "Logs, human approval, policy" |
| F | "AI does not replace MVC or MVVM; it makes their discipline unavoidable" |

## 2. Library-wide vector search — real query, real results, not by corpus

Ran `POST /graph/grounded_context` against the MCP gateway (`localhost:8100`,
container `deviac-mcp`, confirmed live/healthy, `~/ahmes-library` mounted in
full — no `vault` parameter, so this searches the gateway's entry-point
discovery across **whatever `knowledge_chunks` project_slugs exist**, not
one profield corpus). First checked what's actually indexed — the operator's
belief was correct, AI-relevant material is genuinely scattered:

```sql
SELECT project_slug, source_type, count(*) FROM knowledge_chunks GROUP BY 1,2;
```

Real result (2026-08-19) — 24 distinct `project_slug`s, several explicitly
AI-engineering-scoped and **not** part of any pedagogy corpus this session
had touched before: `profield-agent-skill-optimization` (2,463 chunks),
`graphrag` (6,365), `knowledge-engines` (1,156), `document-intelligence`
(1,420), `ai-studio` (108), `computational-authorship` (3,889),
`synthetic-memory` (839), `synthetic-voices` (788) — plus the pedagogy
corpora, `svcm`, and `provenance`. Confirms the premise: this page's claims
are answerable from material that was never assembled with this page in
mind.

### 2a. Claim A — "LLMs are probabilistic reasoning engines"

Query: *"LLMs are probabilistic reasoning engines that operate inside
systems, architecture constrains them"*

| Similarity | Source vault | Excerpt |
| --- | --- | --- |
| **0.825** | `merrill_et_al_2025_handling_the_hype...` (svcm) | "Large language models (LLMs): probabilistic machine learning models with many parameters (typically more than a billion) designed to interpret and synthesize responses to human language." |
| 0.791 | `building_ai_agents_with_llms_rag_and_knowledge_graphs...` | "...an attempt was made to measure reasoning capabilities through benchmark datasets..." (GLUE, SuperGLUE, HellaSwag) |
| 0.791 | `knowledge_graphs_and_llms_in_action_kus...` | discussion of feature-selection vs. LLM approaches |
| 0.781 | `knowledge_graphs_and_llms_in_action_kus...` | "...LLMs can use their probabilistic reasoning capabilities to generate contextually relevant..." |

**Pushed to an actual citation, not left at vector-hit level:** found the
exact `fission_node` behind the top hit and resolved it:

```
ahmes query --cite \
  '.../svcm/documents/merrill_et_al_2025_handling_the_hype_demystifying_ai_for_memory_studies_f3191eeb/extract/extraction.db:695e2784-ace9-5919-9b5d-024a9c118e36' \
  --style apa
→ (Merrill, 2025, p. 2)  confidence=0.95 source=metadata evaluator_safe=yes
```

**Fixed 2026-08-19, after this case study was first written.** Originally
`evaluator_safe=no` — the stored `title` metadata was literally `"Abstract"`
(a mis-detected heading, `host_title_mismatch=true` was already flagged).
Recovered the real title from the vault's own `fission_node` headings
("Handling the hype: Demystifying artificial intelligence for memory
studies"), searched it against Crossref directly (not the stored garbage
title), got an exact title+author match (Merrill, Makhortykh, Mandolessi,
Richardson-Walden, Smit, Wang — `10.1017/mem.2025.10018`), verified, wrote
it via `resolve_manual_doi.py --confirm-same-work`. **Claim A now has a
real, citable, `evaluator_safe=yes` anchor**, not just a strong vector hit.

### 2b. Claim B — capability-based security / blast radius

Query: *"capability-based security and blast radius for AI agent tool execution"*

Real hits, weaker match (0.66-0.70) — EU AI Act cybersecurity-resilience
language (`oj_l_202401689_en_txt`, svcm — the same OJ vault Tribune already
uses), and **`SKILL-INJECT`** (`2602_20156_skill_inject`, profield-agent-
skill-optimization) — "the first benchmark for measuring skill-based
injection vulnerabilities of agent systems, across 23 skills and 70 attack
scenarios." This is a genuinely good real-world anchor for "blast radius" —
a named, measured vulnerability class for exactly the kind of system this
manifesto is warning about — but the similarity gap (0.70 vs. 0.825 above)
means this is a weaker match; read the source before citing, don't treat
0.66 the same as 0.825.

### 2c. Claim E — governance rung ("logs, human approval, policy")

Query: *"human in the loop governance validation gate before deploying
AI-proposed changes"*

**0.731** — `aligning_ai_with_human_values_design_principles_for_human_c...`
(2026, Procedia): "Design for oversight and intervention, implement
failsafe mechanisms and clarify roles, training and authority. Define
risk-based decision gates where AI must..." — this is close to a direct
match for the manifesto's governance rung, from a paper never associated
with this course's pedagogy corpus.

### 2d. Claim D — retrieval/context curation before agents/RAG/MCP

Query: *"retrieval and context curation before agents RAG and MCP"*

**0.662** — the actual Lewis et al. RAG paper itself ("Retrieval-Augmented
Generation for Knowledge-Intensive NLP Tasks") — the foundational citation
for the term the manifesto uses. Moderate similarity (RAG's own abstract
discusses classification-task adaptation, not the "sequencing before
agents" framing this page makes), worth a human read before citing as
directly supporting the specific *ordering* claim.

## 3. What this proves about the studio's retrieval fabric

- The gateway's full-library mount (SF2, verified live this turn — see the
  chat turn's separate confirmation) means a single `grounded_context` call
  reaches 24 different project_slugs without the caller needing to know
  which one holds the answer. That's the actual value of "expose the whole
  library," demonstrated, not asserted.
- Vector similarity alone separates a strong match (0.825, near-verbatim
  conceptual overlap) from a weak one (0.59-0.66, thematically adjacent but
  not a direct match) — read the number, don't treat every hit the same.
- **Discover ≠ cite, reconfirmed a third time this session:** the strongest
  hit (0.825) still required manually finding its `fission_node` and
  running `ahmes query --cite` before it was usable as anything more than
  "this direction looks promising" — and even then came back
  `evaluator_safe=no`.

## 4. What's still open — do not add these to the lesson page yet

**Status, 2026-08-19, second pass:** claim A is now `evaluator_safe=yes`
(§2a) — genuinely citable, not just a strong vector hit. Attempted B and D
too: neither `SKILL-INJECT` nor the Lewis et al. RAG paper surfaced a
confident Crossref match (bibliographic search returned unrelated papers
for both — tried, not silently skipped). Claims B, D, E remain real,
promising vector hits with **no citable node** — read the source before
citing anything from them, they are not ready to be treated as evidence.

- This searched `source_type='docs'` chunks (document-level, from each
  vault's generated `index.md`) — coarser than the `fission_node`-level
  precision claim A's fix ultimately used (recovering the real title from
  `fission_node` headings directly, since the stored metadata title was
  itself wrong). Claims B/D/E would need the same per-document archaeology,
  not another automated pass — the two auto-repair tools built this session
  (`resolve_manual_doi.py`, `scan_and_repair_biblio_gaps.py`) both correctly
  refused to guess on generic/short titles rather than write something
  wrong; that refusal is a feature, and it means what's left needs a human
  or an agent doing focused, one-document-at-a-time work, not a batch pass.
- If this page is ever revised to carry citations (it currently reads as a
  deliberately citation-free manifesto, by design — matching its own
  "public manifesto" framing), the corresponding editorial decision (does
  a manifesto page want inline citations at all, or does citing belong in
  the Practical Guide it points to instead) is the operator's call, not
  implied by this case study existing.

**This case study itself is complete as a methodology demonstration** — the
question of whether to keep chasing claims B/D/E is a scoping decision, not
a sign of unfinished work already promised.
