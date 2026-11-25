# Technical director cascade

Read [INDEX.md](INDEX.md) for the programme table, current statuses and live snapshot. This file governs execution; the rationale and architecture explain why.

## Master prompt

Template — use this pack's absolute location if invoked from another checkout.

```text
Continue frontend-pedagogy/DEV_PLAN/RUST-WASM-MUSIC-VISUALIZER/.
Read the studio/project AGENTS contracts, INDEX, SESSION-RECEIPT,
RATIONALE, SOURCES, ARCHITECTURE and the next phase runbook.
Preserve unrelated worktree changes. Check actual processes and receipts
before restarting any ingestion or embedding job.
Use the closed status enum and resume rules below.
Implement only the next phase whose entry gate is satisfied.
Do not mark application or lesson delivery complete because a plan exists.
Use local Ollama for embeddings, cold reviews and teaching translations.
Keep source books, extraction databases and secrets out of the teaching site.
Do not change Ahmes/Athanor pipeline code or unrelated project defaults.
Do not create public repositories, deploy, commit or push unless requested.
Build reviewable artifacts and run the phase's acceptance checks.
Stop at VERIFYING; supply the evidence packet for a fresh local Qwen review.
Amend downstream runbooks when observed behaviour changes an assumption.
```

The user's current request authorizes the source ingestion, local research and planning pack. It does not mean the seven later implementation phases have already occurred. Later requests to execute this cascade authorize the specified development scope; do not add repetitive approval stops for routine reversible work.

## Closed statuses and resume rules

| Status | Resume action |
| --- | --- |
| BLOCKED | Name the unmet prerequisite. Work on independent research if useful; do not claim the gate passed. |
| READY | Recheck entry facts, record owner/time and start the phase. |
| IN_PROGRESS | Inspect process IDs, logs and changed artifacts; attach to surviving work. Retry idempotently only after determining prior state. |
| VERIFYING | Run or complete the documented checks; failed checks return to IN_PROGRESS. |
| COLD_REVIEW | Run/await fresh local Qwen review, triage numbered findings and amend the pack. |
| DONE | Check report and evidence existence, then advance to the next phase. Missing evidence reopens VERIFYING. |

Only one implementation phase is active at a time. Book embedding and independent document drafting may overlap within X0; never mutate an extraction DB while a live injection is reading it.

## Closing protocol

READY → IN_PROGRESS → VERIFYING → COLD_REVIEW → DONE. A phase may return to BLOCKED when an external prerequisite fails. The implementer does not certify their own DONE.

Before handoff, record actual commands/exits and required full existing suites for touched code repositories. A documentation-only phase uses structural/link/source checks; do not run Ahmes's entire test suite merely because its unchanged CLI was used. Any Ahmes code edit would require its full suite, but such edits are out of scope here.

Cold reviewer receives the runbook, explicit path list/diff, verification transcript and hard constraints only. Use local Ollama Qwen per the studio rule: preferred qwen2.5:72b-instruct-q4_K_M; available fallback qwen3.8:27b with thinking disabled where necessary. Use the Python client with explicit timeout. Preserve exact output, model and decoding settings. No cloud reviewer, no implementer wearing a reviewer role.

Review output: Fn, P0/P1/P2, blocks closure?, evidence, remedy. File PHASE-Xn-COLD-REVIEW.md. Resolve blockers; record deferred issues with rationale. Amend INDEX, this orchestrator and downstream phases in the same change when a discovery invalidates their assumptions.

PHASE-Xn-REPORT.md begins with a status from the enum and includes: owner; dependencies; touched paths; commands/exits; metrics; artifact paths; rejected hypotheses; cold reviewer identity; findings disposition; amendments; safe resume point. Keep open checkboxes open. A planning review cannot close a missing browser build or a cohort-delivery phase.

## Store and artifact boundaries

| Layer | Reads | Writes | Consumer |
| --- | --- | --- | --- |
| Evidence | Supplied EPUB/PDF, existing local vaults, official docs | Ahmes scholar vaults; authorized dedicated Athanor project; private provenance | Monograph/lesson authors |
| Product | Frozen interfaces and fixture assets | Local player/SDK/relay code in destination chosen in X1 | Students and gallery |
| Teaching | Verified product milestones and safe citations | Monograph, B1/B2/B3 packages, challenge kit | Students |
| Publication | Built lessons and permitted app artifacts | Registry/site only after checks; deployment separately authorized | Class/public audience |
| Assessment | Student submissions and individual evidence | Course assessment records through existing process | Instructor; not public ranking data |

## Estimates and stop conditions

Planning estimates: X1 1–2 instructor days; X2 2–3; X3 0.5–1; X4 1–2; X5 2–4; X6 1–2, then rehearsal fixes. These are scheduling hypotheses, not commitments. The prepared teaching platform is a separate workload from the students' 12 hours.

If X1 cannot achieve a reproducible Rust UI + kernel + audio + mesh slice, simplify the integration before authoring six lessons. If Rive true-3D fails X4, keep the Three.js 3D baseline and Rive control/state example, and explicitly defer that advanced path. If target hardware cannot meet budgets, amend budgets before assessment. If beginners cannot complete the rehearsal, increase preparatory support or reduce features; do not disguise that work as optional homework.
