# PHASE-X2 report — corpus retrieve, extract, ingest

**Status:** DONE

## Cold-review triage

| Finding | Severity | Blocks DONE | Disposition |
| --- | --- | --- | --- |
| F1 — known host disk capacity prevents a fresh full site build | P2 | No | Accepted as a carried environment risk. X2's zero-PDF path is valid, its gate exited 0, and no site/runtime source changed. Capacity must be re-checked before a later `wf_build` gate. |

## Scope completed

- Built `procurement-source.md` from every DOI and named URL in X1 `CONSOLIDATED.md`.
- Checked that no Ahmes/profield batch was already running and that `ollama ps` was idle before any possible embedding work.
- Ran the approved OA-only Profield retriever for the sole X1 DOI. It returned `NO OA`.
- Recorded all DOI and URL dispositions in `PENDING-procurement.md`.
- Took the explicit zero-corpus path: zero PDFs, batch skipped; therefore no coats or DevIAC ingest were started.
- Re-ran the KTX2 DevIAC discovery query. The service connection was refused and returned no titles; this is recorded as an unavailable-service miss rather than a content result.
- Verified Angel and Shreiner 2024 already exists in the 20260815 FE corpus and Ahmes vault; it was not reminted in the 20261104 run.

## Files created or updated

External L2 run:

- `runs/ai-assisted-3d-web/20261104/procurement-source.md`
- `runs/ai-assisted-3d-web/20261104/retrieve-report.json`
- `runs/ai-assisted-3d-web/20261104/pdfs/download-manifest.json`
- `runs/ai-assisted-3d-web/20261104/PENDING-procurement.md`

Cascade worktree:

- `frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X2-REPORT.md`

## Runnable evidence

| Check | Observed result |
| --- | --- |
| Concurrent batch | `ps` showed no Ahmes, `profield-athanor-ready`, or `ingest-ahmes` process other than the probe command itself. |
| Embedding availability | `ollama ps` returned the header and no loaded model. No embedding job was started. |
| DOI inventory | `procurement-source.md` contains exactly one DOI: `10.1109/LLM4Code66737.2025.00017`. |
| OA retrieval | `DOIs: 1`; DOI result `NO OA`; summary `ok: 0, no_oa: 1, fail: 0, skipped_existing: 0, errors: 0`. |
| PDF inventory | `pdfs/` contains only the empty machine manifest, no `.pdf` file. |
| Batch/coats/ingest | **zero PDFs, batch skipped**; no Ahmes batch manifest is expected for an empty corpus. |
| KTX2 discovery | POST to local DevIAC failed with `curl: (7) Failed to connect to localhost port 8100`; titles returned: none. |
| Angel 2024 | Existing retrieve report and PDF at `runs/fe-curriculum-gap-harvest/20260815/`; existing Ahmes document ID `10_1145_3641235_3664433_the_future_of_teaching_computer_graphics_e2e9b45c`; no 20261104 copy. |

## Constraints and uncertainty

- Khronos and practitioner HTML pages remain platform notes. No HTML was disguised as a PDF.
- The KTX2/Basis higher-education evidence gap remains open, which is an accepted D18 outcome and does not block X3–X12.
- DevIAC was unavailable, so no hit or no-hit content conclusion is claimed. X3 must re-probe before discovery and cite Ahmes nodes rather than vector snippets.
- Host disk capacity was already low; the zero-PDF path avoided creating extraction or build artifacts and did not delete unrelated data.

## Exact resume point

Run the X2 harness verification. If it passes, provide this report, the external run artifacts, the verification transcript, and the phase diff/path list to a fresh cold reviewer. The executor has not run the exit gate, marked X2 DONE, landed, merged, or pushed `web-atelier-udit`.
