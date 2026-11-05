<!--
FEII-3D-ALBUM-KTX — album-cover assignment + shader/KTX2 satellites + implementation repo
Author: Rubén Vega Balbás, PhD · 2026-11-04
-->

# FE II 3D album cover — shaders, KTX2, implementation repo

**Status:** ACTIVE cascade (X0–X13; X13 added 2026-11-05, D25) · not a 13th/14th numbered unit · not the `corpus-to-boilerplate` prospector.
**Author:** Rubén Vega Balbás, PhD · 2026-11-04
**Readers:** product owner (RATIONALE first); technical director (cascade second).

## How to read this pack

| Face | File | Question it answers |
| ---- | ---- | ------------------- |
| Product owner | [RATIONALE.md](RATIONALE.md) | Why an album cover, why satellites, why one GitHub aggregator. |
| Technical director | [FEII-3D-ALBUM-KTX-CASCADE.md](FEII-3D-ALBUM-KTX-CASCADE.md) | Ordered phases, gates, Ollama roles, cold review, hard constraints. |
| Autopilot | [AUTOPILOT.md](AUTOPILOT.md) | How an agent runs X0→X12 without clipboard waits. |
| Aggregator | [REPO-SHAPE.md](REPO-SHAPE.md) | `feii-album-covers` — one repo, student **routes** `/covers/<slug>`, TTOD branch/PR ritual (D21). |
| KTX2 pedagogy | [KTX2-FIRST-PRINCIPLES.md](KTX2-FIRST-PRINCIPLES.md) | Pixel → texel → suitcase vs GPU room → ETC1S/UASTC. Instructor rehearsal (D22). |
| Evidence | [FINDINGS-2026-11-04.md](FINDINGS-2026-11-04.md) | What was checked live, not assumed from briefs. |
| Decisions | [DECISIONS.md](DECISIONS.md) | Frozen 2026-11-04 (no PROPOSED rows). |
| Operator agents | [AGENT.md](AGENT.md) | Executor stops at VERIFYING; reviewer is a fresh session. |

Phase files (do not invert): [X0](PHASE-X0.md) · [X1](PHASE-X1.md) · [X2](PHASE-X2.md) · [X3](PHASE-X3.md) · [X4](PHASE-X4.md) · [X5](PHASE-X5.md) · [X6](PHASE-X6.md) · [X7](PHASE-X7.md) · [X8](PHASE-X8.md) · [X9](PHASE-X9.md) · [X10](PHASE-X10.md) · [X11](PHASE-X11.md) · [X12](PHASE-X12.md) · [X13](PHASE-X13.md).

Closing: each phase → VERIFYING → `PHASE-Xn-COLD-REVIEW.md` → amend if needed → `PHASE-Xn-REPORT.md` → DONE.

## Programme (do not invert)

| Step | File | Deliverable | Gate |
| ---- | ---- | ----------- | ---- |
| 0 | [PHASE-X0.md](PHASE-X0.md) | Re-probe live stores; DECISIONS already frozen | DONE 2026-11-04 |
| 1 | [PHASE-X1.md](PHASE-X1.md) | Autonomous Profield 20261104 map (web tools + Ollama Pass 2; no clipboard) | DONE 2026-11-04 |
| 2 | [PHASE-X2.md](PHASE-X2.md) | OA retrieve → Ahmes batch → coats → DevIAC ingest | DONE 2026-11-04 |
| 3 | [PHASE-X3.md](PHASE-X3.md) | Evidence-matrix rows + AUDIT-GROUNDED addendum (cite Ahmes, not vectors) | DONE 2026-11-04 |
| 4 | [PHASE-X4.md](PHASE-X4.md) | CV Bloque 5 / tracks / lesson-index structural freeze | DONE 2026-11-04 |
| 5 | [PHASE-X5.md](PHASE-X5.md) | Album-cover assignment pitch (Units 8–9 page) | DONE 2026-11-04 |
| 6 | [PHASE-X6.md](PHASE-X6.md) | Enrich Unit 8 + Unit 9 toward the cover (lesson-scribe) | DONE 2026-11-04 |
| 7 | [PHASE-X7.md](PHASE-X7.md) | New shaders satellite lesson | DONE 2026-11-04 |
| 8 | [PHASE-X8.md](PHASE-X8.md) | First-principles KTX2 satellite (texel before brand names) | DONE 2026-11-04 |
| 9 | [PHASE-X9.md](PHASE-X9.md) | GitHub aggregator `feii-album-covers` scaffold + `gh repo create --private` | DONE 2026-11-05 |
| 10 | [PHASE-X10.md](PHASE-X10.md) | `_studio` cover + KTX2 compare + gallery glob | DONE 2026-11-05 |
| 11 | [PHASE-X11.md](PHASE-X11.md) | Publish gates: lessons.yml, Liquid, citation firewall, build | DONE 2026-11-05 |
| 12 | [PHASE-X12.md](PHASE-X12.md) | Closing audit vs AUDIT-GROUNDED student/instructor split | READY |
| 13 | [PHASE-X13.md](PHASE-X13.md) | 3D terminology satellite (oral paragraph + glossary; D25) | BLOCKED until X12 DONE |

Harness: `~/src/.cursor/skills/cascade-forge/scripts/cascade-harness.sh`. Only the **first word** of Gate is a status token.

**Runner:** [autopilot.sh](autopilot.sh) (`bootstrap` · `start` · `verify` · `land` · `abort`) wraps the harness against the pack committed on branch `cascade/FEII-3D-ALBUM-KTX` in worktree `../web-atelier-udit-album`. The copy of this pack in the main checkout is **untracked**; once bootstrapped, the integration-worktree copy is the live one and `main` is never written by the cascade. Gates share [gate-lib.sh](gate-lib.sh) (worktree build + Liquid check).

## Live snapshot (2026-11-04)

| Fact | Value | Where checked |
| ---- | ----- | -------------- |
| FE II numbered units | 12; lab hours claimed closed at 30 | `docs/lessons/en/feii/index.md` Block tables; `docs/_data/tracks.yml` `feii.sessions: 12` |
| FE II ejerciciosHours | 14 exactly (U8/U9/U10 = 0) | `tracks.yml` FE II `ejerciciosHours` sum this session |
| Unit 9 | Already **shader literacy** (min-viable GLSL, bulb `shaderMaterial`) | `docs/lessons/en/feii/unit-9-shader-literacy/index.md` |
| Units 8–9 assignment | Generic “one scene, one shader”; beacon demo; **not** album cover | `docs/lessons/en/feii/units-8-9-assignment/index.md` |
| Instructor/student split | Covenant published; MCP/corpus-to-boilerplate instructor-only | `AUDIT-GROUNDED.md`; `/lessons/en/feii/ai-assisted-3d-covenant/` |
| KTX2 in private rules | `40-asset-pipeline.mdc` prefers KTX2; **no student lesson** | `private/ai-assisted-3d/cursor-rules/index.md` |
| KTX2 in Profield 20260814 | Khronos ETC1S vs UASTC tagged `[STANDARD]`; **not Ahmes-ingested as KTX2 primary** | `runs/ai-assisted-3d-web/20260814/pass1.edited.md` §10 |
| Vector search KTX2 / UASTC / ETC1S (`profield-ai-assisted-3d-web`) | Hits are AI Co-Artist GLSL evolution, **not** Basis/KTX2 | DevIAC `search_knowledge` this session |
| Vector search KTX2 (`profield-frontend-pedagogy`) | Hits are OpenGL Insights 2012 texture notes, **not** KTX2 | same |
| Beacon implementation repo | `courses-repos/react-template` · pins three@0.185.1 · fiber@9.8.2 · drei@10.7.9 · routes `/ex1-beacon`, `/ex2-shader` | `package.json`, `src/App.jsx`, `README.md` |
| Ahmes 20260814 batch | 10 manifest keys, `PROCESSED_OK` count 10 (9 PDFs + README + OpenGL Insights) | `source-pdfs/.ahmes/batch-manifest.json` |
| Ollama | `thessia-scholar-v3`, `thessia-coder-v3`, `qwen2.5:72b-instruct-q4_K_M` present; only `nomic-embed-text` loaded | `ollama list` / `ollama ps` this session |
| Evidence matrix U8/U9 | Declared graphics-grounded **pilots**; Angel & Shreiner 2024 only HE precedent | `frontend-pedagogy/grounding/README.mdc` rows 8–9 |

2026-11-04 later same day: aggregator GitHub + autopilot amend (D4, D6, D7, D14–D20). Contribution ritual frozen as D21. KTX2 first-principles pedagogy frozen as D22 (instructor-educating; no quote-database cites on that satellite). Lessons and repo still unbuilt until X0 runs. Readiness audit same evening: F15 in FINDINGS (runner, gate fixes, tool paths).

**Repo factory:** do **not** paste `corpus-to-boilerplate/` or run `index.md` as a generate-the-assignment-repo prompt. Recycle list is [REPO-SHAPE.md](REPO-SHAPE.md).
