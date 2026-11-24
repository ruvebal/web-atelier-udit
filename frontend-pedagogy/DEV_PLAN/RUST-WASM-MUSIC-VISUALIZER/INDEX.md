# Rust/Wasm Music Visualizer Studio

Author: Rubén Vega Balbás, PhD · UDIT · ruvebal@crea-comm.net  
Prepared: 2026-11-24 · Status: teaching pack; executable experiment lives in the sibling `rust-wasm-music-visualizer` repository.

**Product:** one accessible Rust/Wasm music player that exhibits a collection of student-authored, audio-reactive GPU 3D plugins.

**Engineering:** establish the audio clock, plugin lifecycle and a tested reference vertical slice before adding networking, Rive alternatives or student-facing lessons.

## How to run this pack

1. Read this INDEX, then [TECHNICAL-DIRECTOR-CASCADE.md](TECHNICAL-DIRECTOR-CASCADE.md) for the phase-gate protocol.
2. Read [SESSION-RECEIPT.md](SESSION-RECEIPT.md) before acting; do not restart completed extraction or re-ingest the corpus.
3. Resume at the first row below whose gate is not satisfied. Current entry point: close the remaining X0 acceptance items (cohort facts, placement/hour decision, readiness task) recorded in the receipt.
4. Never claim a step DONE in this index without updating the matching phase file and the receipt in the same change.

## Planning pack

- [RATIONALE.md](RATIONALE.md): the proposed challenge, boundaries and instructor/student split.
- [CURRICULUM.md](CURRICULUM.md): six lessons, three timed studios, cumulative weekly assignments and monograph outline.
- [CHALLENGE.md](CHALLENGE.md): draft student pitch, concept menu, submission contract and rubric.
- [ARCHITECTURE.md](ARCHITECTURE.md): player, plugin SDK, Rust UI, audio clock, renderer choices and WebSockets.
- [SOURCES.md](SOURCES.md): local book audit, verified grounding, gaps and dated platform notes.
- [TECHNICAL-DIRECTOR-CASCADE.md](TECHNICAL-DIRECTOR-CASCADE.md): phase gates, master prompt, resume rules and review protocol.
- [EXPERIMENT-LINK.md](EXPERIMENT-LINK.md): the explicit contract between lesson milestones and the separate application repository.
- [TEACHER-GUIDE.md](TEACHER-GUIDE.md): direct file/symbol references, setup commands, lesson evidence and teachability boundaries.
- [SESSION-RECEIPT.md](SESSION-RECEIPT.md): ingestion, search, validation and remaining work from this session.
- [PLAN-COLD-REVIEW.md](PLAN-COLD-REVIEW.md) and [PLAN-REVIEW-TRIAGE.md](PLAN-REVIEW-TRIAGE.md): fresh local Qwen review and dispositions.
- [PHASE-X0-REPORT.md](PHASE-X0-REPORT.md): X0 cold-review dispatch record (model, timings, triage link).

This is an instructor planning pack outside the Jekyll publication tree. It does not add hours or change assessment weights in the official course. The proposed challenge rubric is internal to this assignment. Course placement and formal hour-category mapping must be recorded before lesson publication.

## Programme

| Step | File | Deliverable | Gate |
| --- | --- | --- | --- |
| X0 | [PHASE-X0.md](PHASE-X0.md) | Evidence and cohort readiness | IN_PROGRESS — corpus ingested, plan drafted and cold-reviewed (see [PHASE-X0-REPORT.md](PHASE-X0-REPORT.md)); remaining acceptance items recorded in [SESSION-RECEIPT.md](SESSION-RECEIPT.md) |
| X1 | [PHASE-X1.md](PHASE-X1.md) | Locked toolchain and vertical slice | VERIFYING — code fixes landed; fresh browser walkthrough pending |
| X2 | [PHASE-X2.md](PHASE-X2.md) | Player and plugin SDK | BLOCKED — X1; two independent plugins pass lifecycle checks |
| X3 | [PHASE-X3.md](PHASE-X3.md) | WebSocket control/feature relay | BLOCKED — X2; two clients, bounded queues, reconnect and offline operation |
| X4 | [PHASE-X4.md](PHASE-X4.md) | Rive adapter and comparison specimen | BLOCKED — X3; identical input fixture; runtime capability evidence |
| X5 | [PHASE-X5.md](PHASE-X5.md) | Monograph and six lesson packages | BLOCKED — X4; runnable examples, citations, publication checks and rehearsal |
| X6 | [PHASE-X6.md](PHASE-X6.md) | Student starter, aggregator and competition kit | BLOCKED — X5; novice rehearsal and independent plugin submission |
| X7 | [PHASE-X7.md](PHASE-X7.md) | Delivery, exhibition and retrospective | BLOCKED — X6; three studios delivered and individual evidence assessed |

Manual cascade initially; no harness runner is installed by this pack. Add real exit-gate scripts before enabling the studio harness. Statuses denote dependencies, not requests for repeated permission.

## Live snapshot — checked 2026-11-24

| Fact | Observed | Where checked |
| --- | --- | --- |
| User-specified duration | 3 × 4 hours | Request; timetable in CURRICULUM.md totals 720 minutes including breaks |
| Supplied Rust EPUBs | Both readable; metadata and TOCs extracted | `evidence/epub-inventory.json` |
| Rust language extraction | 6,825 retained nodes | Ahmes ingest log and read-only SQLite count |
| Rust mastery extraction | 2,790 retained nodes; unusually heavy treeshaking | Ahmes log: 17,101 extracted blocks; inspect examples before reuse |
| Existing Web Audio vaults | Smus 441; Reiss 3,992; Turner/Leonard 2,094 nodes | `evidence/corpus-dbs.json`; SQLite counts |
| Additional candidate | Beginning Axum (2026), chapter 5 WebSocket | Local EPUB metadata/TOC; not ingested in this session |
| Research reuse | Existing FE II covenant, Three.js lessons, Rive GPU/audio specimens | Repository source pages named in SOURCES.md |
| Current local model capability | nomic-embed-text and qwen3.8:27b present; preferred Qwen 72B absent | `ollama list`; fallback required for cold review |
| Corpus namespace | Dedicated `rust-wasm-music-visualizer` in `scholar`; five sources, 16,142 nodes, 15,894 vectors covering every nonempty node | `evidence/athanor-project.json`, `evidence/corpus-counts.json`; final counts in receipt |
| Citation quality | Mixed; safe metadata is not universal | `evidence/citation-audit.json`; do not equate ingestion with citation readiness |
| Existing worktree change | `web-atelier-udit.code-workspace` modified before work | Initial `git status --short`; left untouched |

## Decision to carry forward

Build the instructor host first. Students own an individual Rust mapping kernel, an interactive 3D scene and a reasoned stack defence. The host supplies Rust UI, audio transport/analysis and the relay. Rive is actively demonstrated and supported; a Rive runtime binary alone does not satisfy the student's Rust requirement.

## Open items before X1 can unblock

- Cohort facts: size, prior Rust/JS/3D knowledge, target devices, homework allowance.
- Official placement: exact slot in FE I/FE II and formal hour-category mapping.
- Readiness task: run the short diagnostic described in [PHASE-X0.md](PHASE-X0.md) and record support needs.
- Citation ledger: close or quarantine every `[BIBLIO-GAP]` noted in [SOURCES.md](SOURCES.md) and `evidence/citation-audit.json`; do not repair with plausible prose.

Record each resolution in [SESSION-RECEIPT.md](SESSION-RECEIPT.md) and flip the X0 row to DONE only when all four are closed.
