# Canonical favicon · Rive + AnimaScript 3D cascade

**Status:** ACTIVE · X0 DONE · X1 DONE · X2 DONE · X3 DONE · X4 DONE · X5 READY · X9 BLOCKED · integration branch `codex/canonical-favicon-rive-3d-cascade`  
**Author:** Rubén Vega Balbás, PhD · 2026-11-10  
**Product claim:** any SVG inside the supported subset becomes a crisp, responsive, depth-tested object whose dynamic set of source facets remains individually understandable and selectable; the favicon is the golden fixture.
**Engineering claim:** geometry, colour, area, intrinsic extrusion depth, hit identity, fallback, and teaching evidence are generated from one SVG source rather than copied by hand.

## Read this pack

| Reader | File | Question |
| --- | --- | --- |
| Product owner | [RATIONALE.md](RATIONALE.md) | Why is this specimen worth its runtime and authoring cost? |
| Technical director | [CANONICAL-FAVICON-RIVE-3D-CASCADE.md](CANONICAL-FAVICON-RIVE-3D-CASCADE.md) | In what order is it built, falsified, reviewed, and published? |
| Implementer/reviewer | [AGENT.md](AGENT.md) | What may each agent change, and who may certify it? |
| Evidence reader | [FINDINGS-2026-11-10.md](FINDINGS-2026-11-10.md) | Which claims were checked against this repository and installed tools? |
| Research reader | [ATHANOR-NEURAL-MATCH-2026-11-11.md](ATHANOR-NEURAL-MATCH-2026-11-11.md) | Which local monographs and graphics sources ground the cascade architecture? |
| Geometry implementer | [MATH-CONTRACTS-2026-11-11.md](MATH-CONTRACTS-2026-11-11.md) | Which equations are sourced, which are engineering derivations, and what must tests prove? |
| Maintainer | [DECISIONS.md](DECISIONS.md) | Which geometry, interaction, accessibility, and provenance choices are frozen? |
| Reviewer | [PLAN-COLD-REVIEW.md](PLAN-COLD-REVIEW.md) | Which planning defects were found independently? |
| Orchestrator | [PLAN-REVIEW-RESOLUTION.md](PLAN-REVIEW-RESOLUTION.md) | How were those findings closed before X0? |
| Independent verifier | [PHASE-X0-FINAL-COLD-REVIEW.md](PHASE-X0-FINAL-COLD-REVIEW.md) | Did the hardened X0 evidence survive a fresh adversarial review? |
| Independent verifier | [PHASE-X1-PARSER-CLOSURE-REVIEW-5.md](PHASE-X1-PARSER-CLOSURE-REVIEW-5.md) | Did the hardened X1 grammar survive five adversarial reviews? |
| Independent verifier | [PHASE-X2-COLD-REVIEW.md](PHASE-X2-COLD-REVIEW.md) | Did the frontal GPU scene survive an independent review? |
| Independent verifier | [PHASE-X3-CLOSURE-COLD-REVIEW.md](PHASE-X3-CLOSURE-COLD-REVIEW.md) | Did the choreography and picker survive the closure review? |
| Independent verifier | [PHASE-X4-CLOSURE-COLD-REVIEW.md](PHASE-X4-CLOSURE-COLD-REVIEW.md) | Did the responsive host survive the closure review? |

## Programme

Only the first word of each Gate cell is machine status.

| Step | Runbook | Deliverable | Gate |
| --- | --- | --- | --- |
| 0 | [PHASE-X0.md](PHASE-X0.md) | Baseline captures, canonical-source checksum, runtime/browser/tool probes | DONE — exit gate and independent cold review passed |
| 1 | [PHASE-X1.md](PHASE-X1.md) | Deterministic SVG → indexed extrusion compiler and manifest | DONE — exit gate and independent cold review passed |
| 2 | [PHASE-X2.md](PHASE-X2.md) | Exact frontal Rive GPU scene and area-derived facet depths | DONE — exit gate and independent cold review passed |
| 3 | [PHASE-X3.md](PHASE-X3.md) | Build/unbuild choreography, facet picking, persistent selection | DONE — exit gate and independent cold review passed |
| 4 | [PHASE-X4.md](PHASE-X4.md) | Responsive demo integration, semantics, reduced-motion/static fallbacks | DONE — exit gate and independent cold review passed |
| 5 | [PHASE-X5.md](PHASE-X5.md) | Public making-of lesson; sound synchronicity as first relevance utility; truthful agentic provenance | VERIFYING |
| 6 | [PHASE-X6.md](PHASE-X6.md) | Full implementation audit and performance/fidelity matrix | BLOCKED — opens after X5 DONE |
| 7 | [PHASE-X7.md](PHASE-X7.md) | Promote the general Rive/AnimaScript 3D skill and SVG adapter; open implementation PR A | BLOCKED — opens after X6 DONE |
| 8 | [PHASE-X8.md](PHASE-X8.md) | Post-merge provenance hook with real PR/review/merge evidence | BLOCKED — opens only after PR A is merged |
| 9 | [PHASE-X9.md](PHASE-X9.md) | Propose animation wisdom to TTOD from the findings this pack keeps | BLOCKED — opens after X8 DONE |

Every phase closes `VERIFYING → COLD_REVIEW → DONE`; the implementer never marks their own work DONE.

The runnable contracts are `PHASE-Xn.exit-gate.sh`. They intentionally fail
until their phase artifacts exist; changing an artifact contract requires
amending the runbook and its gate together.

## Live snapshot · 2026-11-10

| Fact | Observed value | Where checked |
| --- | --- | --- |
| Worktree before branch | clean `main...origin/main` | `git status --short --branch` |
| Working branch | `codex/canonical-favicon-rive-3d-cascade` | `git branch --show-current` |
| Canonical source | `fava-mark-static.svg`, `viewBox="0 0 1024 920"` | `web-foundations/docs/assets/icons/fava-mark-static.svg` |
| Canonical fixture facets | 13 `<path>` elements today; fixture assertion, not an engine limit | same source, lines 3–15 |
| Existing GPU specimen | 13 copies of one hand-authored triangular prism | `animascript-3d/main.as`, `prismatic-favicon.wgsl` |
| Existing renderer | AnimaScript GPU Canvas, WGSL, depth32float, back-face culling | current `main.as` and shader |
| Existing signed asset | `build/fava_prismatic_3d.riv` | animation asset tree |
| Rive CLI | 1.9.2 at `/opt/homebrew/bin/rive`; supports verification, pointer/touch input, screenshots, semantics, data dumps, GPU manifests and benchmarks | `rive --version`, `rive --help` |
| GitHub authority | `ruvebal` authenticated; `repo` and `workflow` scopes | `gh auth status` |

## Non-negotiable outcome

At loop rest, the rendered front projection must compare to the canonical static SVG within the declared raster tolerance. During the spatial phase it must reveal actual side walls, depth testing, occlusion, lighting, and two-sided geometry. Clicking/tapping a visible facet must persistently select that exact source facet. The public lesson must distinguish generated evidence from design interpretation and must never invent an agent message, review, PR, or merge.
