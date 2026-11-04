# PHASE-X2: Corpus — retrieve, extract, ingest

> **Track:** L2 · OA PDFs → Ahmes → DevIAC vectors.
> **Status:** BLOCKED until X1 DONE

## Goal

Vault the primaries X1 listed so X3 can cite nodes. This phase exists because live vector search returned Co-Artist and OpenGL Insights 2012 for a KTX2 query — the 20260814 batch cannot support the new lessons.

## Deliverables

- `PENDING-procurement.md` in the 20261104 run (OA vs closed)
- OA PDFs under `runs/ai-assisted-3d-web/20261104/pdfs/` (or `source-pdfs/`)
- Ahmes batch manifest with per-file status
- Coats; DevIAC ingest `project_slug=profield-ai-assisted-3d-web` `knowledge_scope=field_prospection`
- `PHASE-X2-COLD-REVIEW.md`, `PHASE-X2-REPORT.md`

## Scope

**In:** OA retrieve via Profield scripts (`retrieve-oa-dois.py` / `make retrieve-…` pattern in `profield-corpus-pipeline`). Khronos spec PDFs if legitimately downloadable. Angel & Shreiner 2024 already vaulted — do not duplicate.
**Out:** Citing in lessons (X3). Shadow libraries. Re-extracting the whole 20260814 batch unless a vault is corrupt.

## Prompt (Implementation Agent)

```text
Implement PHASE-X2 per frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X2.md.

## Deliver
1. From X1 CONSOLIDATED.md, build a DOI/URL list. Run Profield retrieve.
   Failed/no_oa rows stay in PENDING-procurement.md — do not invent PDFs.
2. Place files in the 20261104 pdfs dir. SHA-256 keyed; re-run must not dup.
3–5. Batch + coats + ingest in one documented script (checked 2026-11-04;
   the profield/deviac `*-a3d` make targets are hard-wired to 20260814):
     ~/src/ahmes/scripts/profield-athanor-ready.sh \
       ~/src/profield/runs/ai-assisted-3d-web/20261104/pdfs \
       --with-batch --ingest-project-slug profield-ai-assisted-3d-web \
       --knowledge-scope field_prospection
   (it runs ahmes batch → --only-missing coats → --force-meta on gaps →
   verify --require-coats → DevIAC ingest). Re-ingest only:
     make -C ~/src/deviac ingest-ahmes-manifest \
       PDF_DIR=../profield/runs/ai-assisted-3d-web/20261104/pdfs \
       PROJECT_SLUG=profield-ai-assisted-3d-web KNOWLEDGE_SCOPE=field_prospection
   Record batch-manifest.json. If a flag fails, amend from --help.
6. Resume: if ahmes batch is still running, status IN_PROGRESS with log
   path. Do not start a second batch.
7. Zero new PDFs is allowed: empty pdfs/ + PENDING covering every X1 DOI,
   skip batch, still write the report. That must NOT block X3 (D18).
8. search_knowledge KTX2 probe (MCP or the CASCADE HTTP form): quote top
   hits (discovery). A miss is not a phase failure.
9. Hand off for cold review — do NOT mark DONE.

## Constraints
- No cloud SDKs. Check ollama ps before any embedding job.
- Autopilot may commit the run notes; do not push web-atelier-udit.
```

## Acceptance

- [ ] `PENDING-procurement.md` exists; every X1 DOI is either a PDF on disk or a no_oa/fail row
- [ ] If any PDF landed: batch-manifest exists and failures are named. If none landed: report says “zero PDFs, batch skipped”
- [ ] `search_knowledge` KTX2 query re-run; titles quoted (hit or miss)
- [ ] Angel 2024 IDs not reminted
- [ ] Cold review filed; blocking Fn closed
- [ ] Phase is DONE even when KTX2 remains platform-note-only (D18)

## Risks

Khronos HTML is not a PDF. Still-success: PENDING + continue. Do not stall autopilot for a spec PDF.
