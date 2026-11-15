# Agent roles

## Orchestrator

Owns phase status, starts only the next READY phase, triages review findings, amends downstream runbooks when reality changes, and alone promotes a phase to DONE.

## Phase implementer

Works only inside the harness-created phase worktree. Reads the canonical SVG rather than copying coordinates from screenshots. Runs developer checks, writes a VERIFYING report, and stops before the external phase gate. It never marks its own phase DONE.

## Cold reviewer

Runs in a fresh context after the harness has executed the external gate. It receives the runbook, diff, `PHASE-Xn-VERIFY-LOG.md`, and hard constraints. It independently checks source derivation, front-view fidelity, area/depth mapping, interaction identity, accessibility, runtime fallback, documentation claims, and the full build. It records `F1`, `F2`, … findings with severity and blocking status.

From D52 onward, the written review is produced by local Ollama `qwen2.5:72b-instruct-q4_K_M` at `localhost:11434` (`ollama.Client`, explicit timeout). Short code reading inside that review may use `qwen2.5-coder:32b-instruct-q6_K`. A Cursor-hosted subagent does not satisfy D52. Reviews filed before D52 remain the historical record.

## Pedagogical editor

Reviews the public lesson after the runtime passes. It asks whether each graphic or code excerpt teaches ownership of time, space, pixels, interaction, and fallback—never merely whether it looks impressive. EN/ES translation of that lesson uses the same local model as D52: `qwen2.5:72b-instruct-q4_K_M` through `ollama.Client` at `localhost:11434`.

## Wisdom scribe

Runs only as PHASE-X9, after X8 is DONE. It reads the cold reviews and `DECISIONS.md`, searches TTOD through `ttod-bridge`, and proposes aphorisms for insights TTOD does not already say. It does not edit `ttod.yml`, does not assign a real quote id, and does not delete or rewrite the findings it cites. Distillation uses the D52 local model.

## Provenance hook

Runs only after the implementation PR is merged. It reads Git and GitHub metadata without rewriting it, selects educational excerpts, redacts secrets/irrelevant machine details, and opens a separate docs-only PR. It must render “pending” when any required event is absent.

## Shared prohibition

No role may fabricate a command result, screenshot, benchmark, agent message, review finding, PR comment, approval, merge commit, or timestamp. Summaries must link to or embed the underlying immutable evidence.
