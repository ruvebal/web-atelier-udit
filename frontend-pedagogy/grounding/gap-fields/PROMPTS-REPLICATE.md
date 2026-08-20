# Prompts to replicate — gap-fields, FE CV, and temario union

Copy-paste these into a new Cursor agent session (FE CV repo or a fresh Web Atelier thread). Adjust paths if the workspace root differs.

**DC twin (FE→CD translation, prompt only — do not confuse Athanor slugs):**  
`~/projects/ruvebal/scholar/universidadeuropea/digital-creativity-uem/digital-creativity-pedagogy/grounding/PROMPTS-REPLICATE.md`

---

## 1 · Prompt: create / refresh `gap-fields/` (what we did)

```text
You are working in Web Atelier FE pedagogy grounding.

Context:
- Profield gap runs live at ~/src/profield/runs/fe-*/20260815/
- Each has pass1.gpt.deep-research.raw.md + pass2.claude.audit.raw.md
- PDFs are under source-pdfs/; Ahmes batch-manifest.json points to ~/ahmes-library/scholar/documents/*/extract/extraction.db
- Teaching publication head: ~/projects/ruvebal/scholar/udit/web-atelier-udit/frontend-pedagogy/grounding/

Do this:

1) Apply Pass-2 audits to complete pass1.edited.md for every specialty field that lacks one:
   - Mechanical E1–E4: strip ChatGPT citation chips / +N counters / UI chrome; promote numbered areas to ## headings.
   - Apply required Pass-2 amendments as inline **[NEEDS CHECK]** / preprint flags (never invent DOIs).
   - Write pass2.claude.audit.ledger.md per field + a rollup under fe-curriculum-gap-harvest.

2) Ensure Athanor can discover coats:
   - Dry-run then inject each source-pdfs/.ahmes/batch-manifest.json into
     --project-slug profield-frontend-pedagogy --library scholar
   - Ahmes extract alone is not enough.

3) Promote into frontend-pedagogy/grounding/gap-fields/:
   - Copy pass1.edited.md → fe-<field>.pass1.edited.md
   - COAT-INVENTORY.json (all extraction_db paths)
   - INDEX.mdc (field → unit mapping + operator sequence)
   - FORGE-AVANTGARDE-QUESTIONS.md: avant-garde unit forge questions for Units 2–4, 7, 10
     Method per question: Athanor search (discovery only) → read Ahmes node page →
     `ahmes query --cite db:node --style chicago-author-date`.
     Cite only evaluator_safe=yes; otherwise keep ⟨coat⟩·nodo·p. with explicit [BIBLIO-GAP] + reason.
   - PENDING-procurement.md: DOIs in seeds but not coated; P0 forge-blocking first; no shadow libraries.
   - Update GAP-PROSPECTION-INDEX.mdc, README.mdc evidence matrix rows, PROFIELD-SYNC.json.

Hard rules:
- Never cite vector snippets.
- Never invent bibliographic metadata when host title is Abstract/Introduction/Keywords (Ahmes **12G.4** SHIPPED — re-enrich; not a missing RIS pass).
- Platform docs stay [PLATFORM], never Chicago bibliography.
- Pedagogy gaps stay declared gaps even when technique coats exist.
```

---

## 2 · Prompt: replicate for the FE CV repo

Use this in the FE curricular-guides / CV forge repo (same studio machine; vaults stay in `~/ahmes-library`).

```text
You are forging FE I/II curricular guides (guías) against Web Atelier grounding.

Read first:
- ~/projects/…/web-atelier-udit/frontend-pedagogy/grounding/README.mdc
- …/GAP-PROSPECTION-INDEX.mdc
- …/gap-fields/INDEX.mdc
- …/gap-fields/FORGE-AVANTGARDE-QUESTIONS.md
- …/gap-fields/PENDING-procurement.md
- …/PLATFORM-NOTES-POLICY.mdc

For each guía section that touches Units 2–4, 7, or 10:

1) Look up the evidence-matrix row (README.mdc). If it says declare gap/pilot, the guía must say so in prose.
2) Prefer forge questions from FORGE-AVANTGARDE-QUESTIONS.md as assessment/lab stems — do not invent weaker “build a PWA” checklists.
3) Provenance for every scholarly claim:
   ATHANOR=~/src/athanor/.venv/bin/athanor
   AHMES=~/src/ahmes/.venv/bin/ahmes
   set -a; source ~/src/athanor/.env; set +a
   $ATHANOR search "<claim theme>" --project-slug profield-frontend-pedagogy --library scholar --top-k 20
   Then open extraction.db page for the hit’s node_id; then:
   $AHMES query --cite <db>:<node_id> --style chicago-author-date
4) Insert citations only when evaluator_safe=yes.
   If BIBLIO-GAP: keep the pedagogical move, mark [BIBLIO-GAP], record coat·node·page, do not fake (Author Year).
5) Vendor facts → dated platform notes, never bibliography.
6) If a needed DOI is listed in gap-fields/PENDING-procurement.md and not coated, stop and queue procurement — do not substitute a blog post.

Deliverable: guía patches + a short PROVENANCE appendix listing every coat·node·page used or [BIBLIO-GAP] deferred.
```

---

## 3 · Prompt: blend `gap-fields/` + `temario/` → one temario with no gaps

Destiny: a single Contidos/temario surface where every CONTENIDOS strand has either (a) cite-safe Ahmes evidence or (b) an explicit, dated declared gap with a procurement ticket — never a silent blank.

```text
You are unifying FE Contidos research into one gapless temario publication head.

Sources to merge (do not overwrite either blindly):
A) grounding/temario/     — T1–T3 edited strands + PENDING-procurement.md (omnibus frontend-pedagogy/01)
B) grounding/gap-fields/  — Pass-2 audited fe-*.pass1.edited.md + FORGE questions + PENDING-procurement.md (20260815 units 2–4/7/10)

Create grounding/temario-unified/ (or evolve temario/ in place with a clear banner) containing:

1) INDEX.md — one row per Contidos / FE II unit strand:
   | Strand | Map evidence | Coats (Ahmes) | Cite-safe? | Forge questions | Procurement tickets | Status |
   Status ∈ {READY_CITE, READY_DECLARED_GAP, BLOCKED_PROCUREMENT, BLOCKED_BIBLIO_GAP_12G4}

2) Merge PENDING lists:
   - Deduplicate DOIs across temario/PENDING-procurement.md and gap-fields/PENDING-procurement.md
   - Preserve P0 Case 2020, Kleppmann, Phung, CRDT, remote-lab priorities from gap-fields
   - Keep temario ISBN monographs (Krug, Lazar, Holmes) as Strand T1 procurement
   - Output PENDING-procurement.md (unified) + already-coated appendix pointing at COAT-INVENTORY + fe-main coats

3) Content merges:
   - For T3 (Astro/PWA/3D/IoT): fold gap-fields forge questions and Pass-2 confidence tags into the strand;
     replace “NONE” handwaves with either Tri-Anchors or DECLARED_GAP paragraphs copied from FORGE-AVANTGARDE-QUESTIONS.
   - For T1/T2: keep existing edited prose; only add gap-field AI coats (Shihab evaluator_safe=yes, López-Pernas/Isa as BIBLIO-GAP) where they strengthen assessment claims.
   - Never promote [PLATFORM] or NEEDS CHECK 2026 DOIs to ESTABLISHED.

4) Provenance pass:
   - Re-run Athanor search + Ahmes --cite for every ESTABLISHED/EMERGING claim you keep in the unified temario.
   - Write PROVENANCE-LAYER.md (coat · nodo · p. · evaluator_safe).
   - Claims that fail cite gate from host-heading pollution stay `[BIBLIO-GAP]` until **re-enrich** with post-12G.4 Ahmes (SHIPPED; not a missing RIS pass) — they do not block DECLARED_GAP teaching text.

5) Definition of done (“temario with no gaps”):
   - Every Contidos row has Status ≠ empty.
   - Every READY_CITE row has ≥1 evaluator_safe Ahmes citation.
   - Every READY_DECLARED_GAP row states the gap in student-facing language and links a procurement or research-line ticket.
   - Zero silent NONE cells in the evidence matrix for Units 2–4, 7, 10.

Hard rules unchanged: discover in Athanor, cite from Ahmes; no shadow libraries; no invented metadata.
```

---

## Quick operator cheatsheet

```bash
# Discover
$ATHANOR search "…" --project-slug profield-frontend-pedagogy --library scholar --top-k 20

# Cite
$AHMES query --cite ~/ahmes-library/scholar/documents/<coat>/extract/extraction.db:<node_id> \
  --style chicago-author-date

# Inventories
open grounding/gap-fields/COAT-INVENTORY.json
open grounding/gap-fields/PENDING-procurement.md
open grounding/temario/PENDING-procurement.md
```
