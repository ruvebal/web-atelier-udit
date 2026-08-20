# Avant-garde forge questions — FE Units 2–4, 7, 10

**Date:** 2026-08-16  
**Audience:** CV / unit forge authors in Web Atelier  
**Method demonstrated:** Athanor discovery → Ahmes page read → `ahmes query --cite` gate → calibrated claim  
**Maps:** Pass-2 audited `gap-fields/fe-*.pass1.edited.md`  
**Coats:** [`COAT-INVENTORY.json`](./COAT-INVENTORY.json) (23 documents; injected into `profield-frontend-pedagogy` / `scholar`)

These questions are designed to make FE II a **research site**, not a vendor tutorial. Each question states: what students must *do*, what evidence class supports it, and the Tri-Anchor when available.

---

## How this was forged (operator craft)

```bash
ATHANOR=~/src/athanor/.venv/bin/athanor
AHMES=~/src/ahmes/.venv/bin/ahmes
set -a; source ~/src/athanor/.env; set +a

# 1) Discovery (pointer only)
$ATHANOR search "resumability hydration islands web weight" \
  --project-slug profield-frontend-pedagogy --library scholar --top-k 10

# 2) Open the vault page (evidence)
sqlite3 ~/ahmes-library/scholar/documents/<coat>/extract/extraction.db \
  "SELECT page_index, substr(markdown_content,1,400)
   FROM fission_node n JOIN anchor_spatial s USING(node_id)
   WHERE node_id='…';"

# 3) Cite gate
$AHMES query --cite <extraction.db>:<node_id> --style chicago-author-date
# Keep only evaluator_safe=yes as ordinary (Author Year, p.)
# Else: keep coat·node·page + [BIBLIO-GAP] + reason
```

**Observed cite-gate failure mode on this wave:** host title = `Abstract` / `1 INTRODUCTION` / `Keywords` while Crossref has the real title → `host_registry_mismatch` → missing AU/year → `[BIBLIO-GAP]`. That is Ahmes **12G.4**, not a missing PDF. Forge authors must not invent metadata.

---

## Units 2–3 — Metaframework / islands (architecture literacy)

### Q2.1 — Name the primitive, not the brand

> After shipping the same portfolio in Astro islands *and* a SPA-shaped baseline, students write a 400-word defence: which costs did they move (payload, hydration, TTI), and which costs did they only rename?

**Evidence class:** technical architecture (not HE pedagogy).  
**Discovery coat:** `10_1109_access_2024_3352891_resumability_…_3d09df05`  
**Page evidence (read, not snippet):**

> Hydration re-executes application code on the client to recover component boundaries, state, and listeners; resumability is proposed as a distinct primitive addressing growing website weight.
> — Ahmes `…3d09df05` · nodo `7862af5c-…` · p. 0 · **[BIBLIO-GAP]** (host title polluted; Crossref DOI `10.1109/ACCESS.2024.3352891` present)

> Follow-on: *How does resumability address growing website weight?* — nodo `996fea69-…` · p. 7 · **[BIBLIO-GAP]** same coat

**Forge rule:** teach **hydration vs resumability vs islands** as vocabulary; declare `[UNVERIFIED-GAP]` for any claim that islands sequencing *improves learning*. Platform notes (Astro docs) stay HOW-only.

### Q2.2 — Islands under latency, not under marketing

> Design a lab where one island is edge-served and one is origin-served; students measure payload and interaction readiness, then argue when “islands” are the wrong holotype (e.g. immersive/dynamic UIs).

**Coat:** `10_13052_jwe1540_9589_2411_…_68c7da35` · nodo `bd7bbcd8-…` · p. 0 · latency/payload framing · **[BIBLIO-GAP]**  
**Adjacent:** nodo `712ae0ae-…` · p. 24 — immersive apps as opposite of static portfolio holotype · **[BIBLIO-GAP]**

---

## Unit 4 — PWA / offline (resilience as learning object)

### Q4.1 — Offline is a failure mode you design, not a feature you enable

> Students convert a course site to installable/offline, then break the network during a graded task. Rubric scores: cache strategy explanation, stale-while-revalidate trade-off, and a user-visible failure state — not “PWA checklist complete.”

**Pedagogy precedent (older, ESTABLISHED in Pass-1 map):** Case, Steeve & Woolery SIGCSE 2020 — *active learning + PWA conversion* (DOI `10.1145/3328778.3367007`). **Not in this wave’s PDF set** — cite from omnibus / acquire before guía promotion.  
**This wave’s coat (adjacent EDTECH, not HE PWA pedagogy):** `10_26594_register_v11i2_5087_…_483a966a` · progressive/offline architecture language · nodo `3f6bb096-…` · p. 2 · **[BIBLIO-GAP]**  
**Forge rule:** Unit 4 remains **declared gap** for HE outcomes; Case 2020 is the strongest teaching *precedent*, vendor Learn PWA is `[PLATFORM]`.

---

## Unit 7 — Performance pedagogy (measurement + obligation)

### Q7.1 — Budgets as ethics instruments

> Students set a transfer-size budget for a public page, measure lab vs field, then write: what did we refuse to ship, and who pays if we don’t?

**Normative obligation (already in grounding README):** UNESCO Rec. AI Ethics coat `381137eng` · nodes `630c7152` p.29 / `17ccc7a8` p.30 — energy/resource-efficient methods.  
**Empirical-adjacent (this wave):** Mahoney et al. COP websites environmental analysis · coat `10_1371_journal_pclm_0000767_…_03bab1df`

> W3C Web Sustainability Guidelines referenced as evidence-based practices for sustainable web.
> — nodo `3546fa32-…` · p. 4 · **[BIBLIO-GAP]** (host title Abstract; invalid truncated DOI in coat metadata)

**Forge rule:** UNESCO = **obligation**; Mahoney/WSG = **measurement vocabulary / sector evidence**; still **no** FE-classroom performance-pedagogy RCT. Phung “optimisation never demanded” (omnibus) remains the demand-gap spine. Pass-2 holds ISO/IEC 21031:2024 and Phung percentages as **[NEEDS CHECK]**.

---

## Unit 10 — WebSocket realtime UI + IoT/Python interface membrane

### Q10.1 — Connection lifetime literacy (technique spine)

> Build a dashboard that survives: server restart, tab backgrounding, and Origin-check failure. Students must diagram message ordering, reconnection, and back-pressure — then demo a visible degraded mode.

**Systems evidence (not pedagogy):** Murley et al. WebSocket adoption · coat `3442381_3450063_3ee00512` · DOI `10.1145/3442381.3450063`

> Origin-header checking measured against live WebSocket servers; payload structure and PII leakage discussed.
> — nodos `69737d62-…` p. 6 · `4075e141-…` p. 7 · **[BIBLIO-GAP]** (host title = `1 INTRODUCTION`; missing AU/year in coat)

**Forge rule:** Murley grounds *what realtime web is at scale*; it does **not** ground that teaching Origin checks improves learning. Declare pedagogy gap; use Murley for threat model + realism.

### Q10.2 — Interface layer over devices (pedagogical frame)

> Same React state skills, new side-effects: command vs telemetry separation, latency, inaccessible dashboards, physical harm. Assessment includes an accessibility pass on the control panel.

**ESTABLISHED review (load-bearing):** Abichandani et al. 2022 · coat `…08eb5ba5` · DOI `10.1109/ACCESS.2022.3164709`

> IoT education organised across sensing–networking–services–**interface**; remote labs enable remote experimentation.
> — nodo `6e477947-…` · p. 9 · cite `(Abichandani 2022, 15)` on sibling node `6120a53b-…` p.14 · **`evaluator_safe=no`** (confidence 0.70) → treat as **[BIBLIO-GAP]** until coat confidence raised; page text still reopenable.

**HMI exposure (EMERGING, not web-FE pedagogy):** Ciungan et al. 2025 · coat `applsci_15_10537_26eedf9b` · 31 students, VR vs keyboard robotic-arm interfaces · nodo `31eb4dfa-…` · p. 1 · **`evaluator_safe=no`**.

**Accessibility frontier:** Stelea et al. AccessiDashboard · coat `futureinternet_17_00274_v2_c91a8b55` · nodo `bef656b5-…` p. 0 · **[BIBLIO-GAP]** · Pass-2 **[NEEDS CHECK]** load-bearing.

**Central forge stance (from Pass-1/2):** no mature HE programme teaches “already-learned front-end → device membrane transfer.” Unit 10 is a **declared pilot** that *creates* the evidence.

### Q10.3 — AI that ships working realtime code without comprehension

> Students may use Copilot/ChatGPT on a brownfield WebSocket client, then sit an oral defence on reconnection and state. Grade the defence, not the green lights.

**Evaluator-safe coat (this wave’s cleanest cite):** Shihab et al. 2025 · coat `…29f3d2f5`

> Brownfield / legacy settings as the industrial destination for graduates using GenAI assistants.
> — (Shihab 2025, 3) · nodo `c4d78d7a-be8c-5732-bbec-9604a42d1d70` · p. 2 · **`evaluator_safe=yes`**

> Comprehension concerns in Copilot use (novice interaction patterns).
> — (Shihab 2025, 11) · nodo `4bb1ebab-308b-504d-8d6f-b054af0aa8e1` · p. 10 · **`evaluator_safe=yes`**

**Process / offloading (maps, cite-gated soft):** López-Pernas et al. Koli 2025 · coat `3769994_3770043_205390e7` · interaction-process evaluation · nodo `c484e42c-…` · p. 1 · **[BIBLIO-GAP]** (host=`Abstract`). Pass-2 already softened descriptors to “undergraduate web-programming assignment.”  
**Assessment tooling implications:** Russo et al. CHI EA 2026 · coat `3772363_3798887_68bbd8f6` · oral-probing / artifact-consistency · nodo `be29462e-…` · p. 3 · **[BIBLIO-GAP]**.  
**Conceptual learning vs generation:** Isa et al. CHI 2026 · coat `3772318_3793207_eabb6c18` · **[BIBLIO-GAP]** host=`Keywords`.

---

## Cross-cutting forge questions (assessment architecture)

### QX.1 — Four-pillar AI-resilient assessment in a web studio

Use Nikolić & Basta Nikolić 2026 (coat in curriculum-gap harvest `…5a9bceda`) as **conceptual** frame: process documentation, oral defence, authentic tasks, transparent AI use — not as validated effect sizes.

### QX.2 — Never let a platform note become a bibliography entry

Astro / MDN / web.dev / FastAPI docs answer *how*. Abichandani / Shihab / Murley / Vepsäläinen answer *what the field knows*. Mixing them is the failure mode PLATFORM-NOTES-POLICY already forbids.

---

## Matrix delta (what changes for authoring)

| Unit | Before (README matrix) | After this promotion |
| --- | --- | --- |
| 2–3 | NONE | Technical coats for islands/resumability; **pedagogy still NONE** — declare gap, teach primitives |
| 4 | NONE | Adjacent PWA architecture coat; **HE pedagogy still Case 2020 (acquire) + declare gap** |
| 7 | Partial (Phung + UNESCO) | + Mahoney/WSG vocabulary coat; ISO/Phung-% NEEDS CHECK; pedagogy still unsupported |
| 10 | NONE / pilot | Abichandani + Ciungan + Murley + Stelea + Shihab (safe); **interface-transfer pedagogy still UNVERIFIED-GAP** |

---

## Next forge actions

1. Prefer Shihab `evaluator_safe=yes` nodes in Unit 6/10 AI oral-defence wording.  
2. BIBLIO-GAP from `Abstract` / `1 INTRODUCTION` / `Keywords` = **12G.4** (SHIPPED) — **not** a missing RIS pass. Re-enrich coats with post-12G.4 Ahmes, then re-cite; do not invent AU/TI meanwhile.  
3. Acquire Case et al. 2020 PDF into a PWA run if Unit 4 needs an ESTABLISHED HE precedent on-page.  
4. Re-run Pass-3 only after NEEDS CHECK DOI queue is cleared (see per-field ledgers under `~/src/profield/runs/…/pass2.claude.audit.ledger.md`).
