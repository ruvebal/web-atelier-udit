# PHASE-X6 · Full implementation audit

**Status:** DONE — exit gate, cold review, and promotion gate passed

## Goal

Audit the complete implementation independently before any studio skill claims are promoted.

## Deliverables

- fresh full-stack cold review and closed blocking findings;
- fidelity, interaction, accessibility, responsive, fallback and performance matrix;
- clean-checkout rebuild transcript for both fixture SVGs and the signed asset;
- at least two distinct eligible-shape-count fixtures (the favicon golden fixture plus a smaller synthetic SVG) proving the manifest drives facet IDs, GPU buffers/draw counts, area-to-depth mapping, picking, staggered motion, generated controls, reset state, and semantic labels; assert output counts follow each fixture's N and contain no fixed favicon capacity;
- explicit list of portable lessons eligible for X7 skill promotion.

## Acceptance

- [ ] **A1** Clean checkout regenerates both fixture meshes through the documented public CLI.
- [ ] **A2** Compiler tests, Rive verify/test/captures/benchmark and full Jekyll build pass.
- [ ] **A3** GPU and interaction fixtures prove the D4 and D19 contracts.
- [ ] **A4** Public lesson claims resolve to executed evidence.
- [ ] **A5** Promotion candidate list separates reusable rules from Web Atelier details.

## Post-review promotion acceptance

- [ ] **R1** Cold-review findings are structurally parsed and no P0/P1 remains open after triage.
- [ ] **R2** The orchestrator records the reviewed promotion candidate list before opening X7.

## Closing exception

The ordinary X6 evidence receipt contains only `A1`–`A5` and does **not** read its future cold review. After the review, the orchestrator runs `PHASE-X6.promotion-gate.sh` against a separate `PHASE-X6-PROMOTION-EVIDENCE.json` containing `R1`–`R2`; only that post-review gate may mark X6 eligible for DONE and open X7.

## Risks

A polished capture can hide wrong geometry or hit identity. Numeric and expected-ID fixtures remain authoritative.
