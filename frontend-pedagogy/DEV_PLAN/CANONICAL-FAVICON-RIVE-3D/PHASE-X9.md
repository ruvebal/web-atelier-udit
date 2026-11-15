# PHASE-X9 · Propose the animation wisdom, and keep the findings

**Status:** BLOCKED — X8 must be DONE

## Goal

Turn the cascade's tested motion and graphics contracts into TTOD proposals a student can meet again later, without retiring the findings those sentences come from.

## Deliverables

- one `ttod-bridge` proposal per insight that TTOD does not already say, staged under `~/src/.cursor/skills/ttod-bridge/pending/`;
- a manifest in this pack listing each proposal path, the finding or decision it cites, and the existing TTOD section it targets;
- a local Ollama transcript for the distillation pass (`qwen2.5:72b-instruct-q4_K_M` at `localhost:11434`, per D52);
- the cold reviews, verify logs, and `DECISIONS.md` left in place.

## Prompt

Search TTOD through `TTODCliAdapter` before proposing. Propose only a sentence distilled from a named finding or frozen decision in this pack. Use `propose_quote`. Section must already exist (`images`, `css`, `architecture`, or `wisdom`); the suggested id prefix must match that section. `origin` stays `blackbox`. Do not set `validated_by`. Do not edit `~/src/ttod/ttod.yml`. Do not delete a review because its sentence now exists as a proposal. Stop at VERIFYING.

## Acceptance

- [ ] **A1** Every proposal's `source` names a finding id or a `DECISIONS.md` id that is still present in this pack.
- [ ] **A2** `propose_quote` is the only write. `ttod.yml` is byte-identical to its hash recorded before the phase.
- [ ] **A3** Each staged proposal has `origin: blackbox`, `proposal.status: pending_human_review`, and no `validated_by`.
- [ ] **A4** Each section id exists in `ttod.yml`, and any suggested id prefix matches that section's registered prefix.
- [ ] **A5** A search of TTOD shows the proposed sentence is not already an active quote.
- [ ] **A6** The distillation transcript names `qwen2.5:72b-instruct-q4_K_M` and `localhost:11434`.
- [ ] **A7** The cited cold-review files and decision rows are unchanged by this phase.

## Risks

A fluent sentence can sound like the finding while dropping the condition that made it true. The proposal teaches the contract. The finding remains the proof. A human accepts or refuses the proposal inside TTOD; this phase does not merge it.
