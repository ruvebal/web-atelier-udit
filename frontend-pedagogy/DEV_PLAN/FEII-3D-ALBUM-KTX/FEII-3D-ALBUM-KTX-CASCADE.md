# Technical director — FEII-3D-ALBUM-KTX (X0–X12)

**Status:** ACTIVE. Autopilot: [AUTOPILOT.md](AUTOPILOT.md). Run phases **in order**. Each `PHASE-Xn.md` is a self-contained paste prompt.

**Product claim:** Entrega 2’s 3D slice is a web-3D album cover, handed in as **TTOD-shaped PRs** that light a **route** on one GitHub aggregator.
**Engineering claim:** two satellite lessons + `ruvebal/feii-album-covers` (private), hour-closed, grounded, cold-reviewed; no 13th unit; no corpus-to-boilerplate.

## Programme (do not invert)

See [INDEX.md](INDEX.md) Programme table. Gate column first word is the harness token.

**Operators:** [AGENT.md](AGENT.md). Loop: [AUTOPILOT.md](AUTOPILOT.md). Repo: [REPO-SHAPE.md](REPO-SHAPE.md).

## Layer map

| Layer | Store | Phases that write | Downstream |
| --- | --- | --- | --- |
| L2 research | `~/src/profield/runs/ai-assisted-3d-web/20261104/` | X1 (autonomous) | X2 |
| L2 vaults | Ahmes `extraction.db` per PDF | X2 (OA only; PENDING otherwise) | X3 |
| L2 vectors | DevIAC `project_slug=profield-ai-assisted-3d-web` | X2 ingest | X3 discovery only |
| L2 evidence | `frontend-pedagogy/grounding/` + `AUDIT-GROUNDED.md` addendum | X3 | X4–X8 |
| L1 teaching | `web-foundations/docs/lessons/en/feii/**` | X4–X8, X11 | students |
| L3 product | `courses-repos/feii-album-covers` + GitHub `ruvebal/feii-album-covers` | X9–X10 | assignment PRs (D21: TTOD contributing.md) |

## Ollama delegation

| Phase | Model | Allowed job |
| --- | --- | --- |
| X1 | `qwen2.5:32b-instruct` | Pass-2 audit of CONSOLIDATED.md (schema/delimited). Does **not** browse. WebSearch/WebFetch are the operator tools. |
| X2 | none for extraction | Ahmes is deterministic. Embeddings only if ingest needs them — check `ollama ps`. |
| X3 | none for cites | Discover in vectors; cite Ahmes nodes. |
| X6–X8 | `thessia-scholar-v3` via lesson-scribe | One paragraph per BRIEF. |
| X9–X10 | `thessia-coder-v3` optional | JSDoc/comments only. |
| Any | `qwen2.5:72b-instruct-q4_K_M` | High-stakes audit after `ollama ps` is idle. |

No `ollama run` CLI for unattended work. No cloud SDKs. No clipboard wait.

## Master paste (start / resume / autopilot)

```text
Autopilot FEII-3D-ALBUM-KTX per
~/projects/ruvebal/scholar/udit/web-atelier-udit-album/frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/AUTOPILOT.md
and FEII-3D-ALBUM-KTX-CASCADE.md (live pack = integration worktree;
autopilot.sh bootstrap creates it).

## Tooling (Claude Code or Cursor)
- Git/worktrees: autopilot.sh only (bootstrap/start/verify/land/abort).
- Subagents: cascade-phase-executor, cascade-cold-reviewer.
- DevIAC search_knowledge: MCP if present, else
  curl -s -X POST http://localhost:8100/vectors/search -H 'Content-Type: application/json'
  -d '{"query":"…","project_slug":"profield-ai-assisted-3d-web","knowledge_scope":"field_prospection","n_results":5}'
- Ollama: HTTP http://localhost:11434/api/chat (python `ollama` pkg is not installed).

## Context
- Evidence: FINDINGS-2026-11-04.md
- Product: RATIONALE.md · REPO-SHAPE.md · KTX2-FIRST-PRINCIPLES.md
- Freezes: DECISIONS.md (already CONFIRMED/AMENDED — do not re-open)
- Grounding: web-foundations/private/ai-assisted-3d/AUDIT-GROUNDED.md
- Recycle: index.md philosophy+rules+KTX2 notes; cursor-rules 00/20/30/40/50;
  react-template pins. NEVER execute corpus-to-boilerplate/.
- Skills: cascade-forge, curriculum-forger, lesson-scribe, fe-unit-forge.mdc,
  lesson-publishing-integrity.mdc, lesson-code-block-conventions.mdc

## Out of scope
- Numbered Units 13–14
- Overwriting react-template
- corpus-to-boilerplate / MCP / Stitch as student path
- Cloud LLM SDKs
- Spanish translations
- Unit 10 inside the aggregator
- WebGPU/TSL as taught path
- Commercial album scans in covers/_studio
- git push of web-atelier-udit

## Programme
Execute the next incomplete phase only, in order X0 → X12, through the
AUTOPILOT loop (executor → harness verify → cold-reviewer subagent →
REPORT → flip next READY). Do not wait for clipboard Pass 1.
Implementer must not self-certify DONE.

## Hard constraints
- No cloud AI SDKs. Ollama localhost:11434 only.
- Cite Ahmes nodes after vector discovery; never cite snippets.
- Student pages: Chicago + References; coats behind the publication switch.
- Code fences: CodeSandbox-ready | Excerpt | Template. Wrap {{ }} in {% raw %}.
- JavaScript + JSDoc.
- Preserve FE II 12 units and 10/30/14 hours.
- Commits: cascade reports + local lessons land on branch
  cascade/FEII-3D-ALBUM-KTX via autopilot.sh land — never on main.
  Aggregator repo: commit + push origin. No --force, no skipped hooks.
```

## Closing protocol

`BLOCKED → READY → IN_PROGRESS → VERIFYING → COLD_REVIEW → DONE`

- Cold review: fresh `cascade-cold-reviewer` subagent (Agent tool / Cursor Task). Not optional under autopilot.
- Landing: `autopilot.sh land PHASE-Xn.md` refuses without COLD-REVIEW + a DONE report, and re-runs the gate.
- Amend on surprise: same change set as the report.
- X0 re-probes only; D1–D22 are already frozen unless a probe falsifies them.

## Resume rule

Report status enum: `DONE | PARTIAL | IN_PROGRESS | VERIFYING | COLD_REVIEW | BLOCKED`.

- **DONE** — skip (`land` already flipped the next Gate to READY).
- **PARTIAL** — finish that phase.
- **IN_PROGRESS** — long job (X2 `ahmes batch`). Do not restart; do not skip.
- **VERIFYING** — finish exit-gate; hand to cold reviewer; do not open next.
- **COLD_REVIEW** — wait for the subagent’s `PHASE-Xn-COLD-REVIEW.md`, triage, REPORT, DONE or back to IN_PROGRESS.
- **BLOCKED** — named blocker only (`gh` auth, encoder fake, P0). Do not invent a human-clipboard blocker for X1.

## Cold-review paste

```text
Cold-review PHASE-<Xn> per frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-<Xn>.md Acceptance.

You did not implement this phase. Do not trust the implementer's DONE claim.

Inputs:
- Runbook: PHASE-<Xn>.md
- Diff: git diff / path list
- Suite transcript: cascade-harness verify log
- Hard constraints: FEII-3D-ALBUM-KTX-CASCADE.md
- AUDIT-GROUNDED.md student/instructor split
- DECISIONS.md · REPO-SHAPE.md · AUTOPILOT.md

Check:
1. Every Acceptance checkbox against runnable evidence.
2. Agentic-change failure modes §§1–6.
3. Non-negotiables: hours, IP, no corpus-to-boilerplate on student path,
   no cloud SDKs, no vector-snippet cites, aggregator shape not a
   single-app overwrite of App.jsx, D21 TTOD contribution ritual
   (cover slugs, not Astro seams).

Write PHASE-<Xn>-COLD-REVIEW.md with Fn findings.
Do not mark DONE. You may not git push web-atelier-udit.
```
