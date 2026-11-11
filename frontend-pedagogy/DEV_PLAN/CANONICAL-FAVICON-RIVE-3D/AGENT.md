# Agent roles

## Orchestrator

Owns phase status, starts only the next READY phase, triages review findings, amends downstream runbooks when reality changes, and alone promotes a phase to DONE.

## Phase implementer

Works only inside the harness-created phase worktree. Reads the canonical SVG rather than copying coordinates from screenshots. Runs developer checks, writes a VERIFYING report, and stops before the external phase gate. It never marks its own phase DONE.

## Cold reviewer

Runs in a fresh context after the harness has executed the external gate. It receives the runbook, diff, `PHASE-Xn-VERIFY-LOG.md`, and hard constraints. It independently checks source derivation, front-view fidelity, area/depth mapping, interaction identity, accessibility, runtime fallback, documentation claims, and the full build. It records `F1`, `F2`, … findings with severity and blocking status.

## Pedagogical editor

Reviews the public lesson after the runtime passes. It asks whether each graphic or code excerpt teaches ownership of time, space, pixels, interaction, and fallback—never merely whether it looks impressive.

## Provenance hook

Runs only after the implementation PR is merged. It reads Git and GitHub metadata without rewriting it, selects educational excerpts, redacts secrets/irrelevant machine details, and opens a separate docs-only PR. It must render “pending” when any required event is absent.

## Shared prohibition

No role may fabricate a command result, screenshot, benchmark, agent message, review finding, PR comment, approval, merge commit, or timestamp. Summaries must link to or embed the underlying immutable evidence.
