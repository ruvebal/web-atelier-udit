# Autopilot — run X0→X16 without a human in the clipboard loop

Authorized 2026-11-04 by the product owner: aggregator GitHub repo + cascade may proceed to the end without waiting for ChatGPT paste, decision confirmations, or per-phase “please commit”.

This does **not** waive cold review. It makes cold review a **fresh agent subprocess**, not a professor.

## Runner — `autopilot.sh` (amended 2026-11-04 audit)

`web-atelier-udit` is a **public** repo and `main` is what the professor pushes to Pages. Cascade work therefore lands on an **integration branch** `cascade/FEII-3D-ALBUM-KTX` in its own worktree `../web-atelier-udit-album`, never on `main`. The harness runs against the pack **inside that worktree**. [autopilot.sh](autopilot.sh) is the only git plumbing the orchestrator uses — do not improvise worktree / merge commands.

```bash
AP=~/projects/ruvebal/scholar/udit/web-atelier-udit-album/frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/autopilot.sh
# once (idempotent): creates the integration worktree, commits the pack there
~/projects/ruvebal/scholar/udit/web-atelier-udit/frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/autopilot.sh bootstrap
```

## Loop (one phase at a time)

```text
while "$AP next" prints a READY step:
  1. $AP start                                  # harness start + symlink node_modules/vendor; prints PHASE PACKAGE path
  2. Agent cascade-phase-executor on that PHASE PACKAGE path, working in that worktree
       - writes PHASE-Xn-REPORT.md with Status: VERIFYING; never DONE
  3. $AP verify PHASE-Xn.md                     # writes PHASE-Xn-VERIFY-LOG.md in the worktree
       - FAIL → new executor turn with the log; repeat 2–3 (max 3 rounds, then BLOCKED)
  4. Agent cascade-cold-reviewer (fresh; Cold-review paste in the CASCADE file) → PHASE-Xn-COLD-REVIEW.md
  5. P0/P1 that block DONE → fresh executor turn on those Fn only; back to 3
  6. Orchestrator (not the executor) sets PHASE-Xn-REPORT.md Status: DONE + triage table
  7. $AP land PHASE-Xn.md                       # re-runs gate, flips INDEX (n DONE, n+1 READY), commits, merges, removes worktree
```

Do not open two phases at once (`start` refuses). Do not mark DONE in the same agent that implemented. `$AP abort PHASE-Xn.md` drops a clean worktree; `FORCE=1` discards work — only after a BLOCKED report is written **in the integration worktree**.

**BLOCKED stop:** write `PHASE-Xn-REPORT.md` (Status: BLOCKED, exact command/decision needed) in the phase worktree, leave it in flight, and **stop the loop** — later phases depend on it. Exception: X9 `gh` failure is a BLOCKED *line*, not a stop (local tree still lands).

**End state:** `main` is unchanged. The professor reviews `git log main..cascade/FEII-3D-ALBUM-KTX`, deletes the untracked pack copy in the main checkout (`frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX`, superseded by the committed one), then merges and pushes by hand.

## What used to wait on a human — now automatic

| Old gate | Autopilot replacement |
| --- | --- |
| X0 “confirm D1–D14” | Already frozen in DECISIONS.md (this amend). X0 only re-probes and files the report. |
| X1 ChatGPT/Claude paste | Operator-autonomous lane: 20260814 map + WebSearch/WebFetch + Crossref + Ollama audit as Pass 2. Provenance: `surface: operator-web-tools`. |
| X2 “wait for OA PDF” | Retrieve what is OA; PENDING the rest; **do not block X3–X12** on a missing Khronos PDF. Platform notes remain legal. |
| “Do not commit unless asked” | Cascade **may** commit: (a) this pack’s reports, (b) web-atelier lesson files locally, (c) `feii-album-covers` + `git push origin` of **that** repo. No `--force`. No skip hooks. |
| GitHub repo | X9 runs `gh repo create` per REPO-SHAPE.md. If `gh` auth fails: BLOCKED with the exact command, then the rest of X9 still leaves a local tree. |
| Cold review | `cascade-cold-reviewer` subagent (Claude Code Agent tool or Cursor Task), required. |

## What still stops the machine (named BLOCKED, not a vibe)

- `gh` not authenticated / repo name taken and the fallback `feii-album-covers-udit` also taken
- `ahmes batch` still running — resume, do not second-batch
- P0 cold-review finding not fixed
- Encoder missing **and** X10 fakes a `.ktx2` (forbidden; the X10 gate checks the KTX 2.0 magic bytes) — PNG path + PENDING is success
- A permission denial on an outward action (`gh repo create`, `git push` of the aggregator): record the exact command as BLOCKED; for X9/X10 the local tree still lands

## What autopilot must not do

- `git push` of **web-atelier-udit**, or any commit/merge onto its `main` (Pages is still the professor’s publish)
- Cloud LLM SDKs
- Force-push, `--no-verify`, rewrite of `react-template`
- Assign `corpus-to-boilerplate` or MCP installs to students
- Commit commercial album scans into `_studio`

## Ollama

Same table as the orchestrator. Check `ollama ps` before thessia/72B. No `ollama run` CLI for unattended calls.

## Start

```text
Autopilot FEII-3D-ALBUM-KTX per
~/projects/ruvebal/scholar/udit/web-atelier-udit-album/frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/AUTOPILOT.md
and FEII-3D-ALBUM-KTX-CASCADE.md (same directory — the integration
worktree copy is the live pack; run autopilot.sh bootstrap first if it
does not exist yet).

Execute the next incomplete phase only, in order, through X16, using
autopilot.sh start / verify / land exactly as the Loop section says.
After each: verify → cold-reviewer subagent → report DONE → land.
Never commit to or push web-atelier-udit main.
Decisions are already frozen (incl. D26). Do not wait for clipboard Pass 1.
Aggregator: student **endpoints** `/covers/<slug>` via Route.jsx (D26);
TTOD branch/PR ritual D21; shell owns discovery/routing/isolation only.
```
