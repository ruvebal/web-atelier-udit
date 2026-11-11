# PHASE-X0 · Freeze the measurable baseline

**Status:** READY

## Goal

Capture the current canonical SVG, approximate prism specimen, tool versions, signed build, browser behavior, and route output before geometry changes.

## Deliverables

- checksums and path/command inventory for the canonical fixture (currently N=13);
- current Rive CLI/runtime versions and signing state;
- verified Athanor/Ahmes research anchors, evaluator-safety outcomes and bibliography gaps from the neural-match report;
- baseline screenshots/data dump/GPU manifest where supported;
- explicit support matrix for SVG commands and transforms;
- reusable phase-report/evidence schema validator used by every later gate;
- amendments to X1–X8 if any live probe contradicts this pack.

## Prompt

Run read-only probes first. Record exact commands and outputs. Verify that the current golden fixture has N=13 source paths, not “14 canonical paths”; identify all `M/L/C/Z` commands and the non-uniform transform. Record N as an observed fixture property only: downstream compiler/runtime capacity, generated buffers, IDs, picking and semantic controls must remain data-driven. Capture narrow browser behavior as well as the desktop route. Do not alter the existing specimen. Write `PHASE-X0-REPORT.md` with status VERIFYING and hand off.

## Acceptance

- [ ] **A1** Canonical source checksum and machine-generated path inventory record observed N and confirm N=13 only for this golden fixture.
- [ ] **A2** Current `.riv` loads in the browser runtime and its checksum is recorded; CLI source-project verification is reported separately.
- [ ] **A3** Baseline and deliberate GPU-failure routes are captured at desktop and narrow viewport; the fallback image and truthful failure status are visible, and viewport/page-width/card metrics accompany each failure capture.
- [ ] **A4** Rive/Node/Ruby/browser version commands, outputs, and capture date are recorded in an immutable transcript.
- [ ] **A5** Every contradicted assumption amends downstream runbooks.
- [ ] **A6** `verify-phase-evidence.mjs X0` validates semantic assertions, immutable command transcripts, artifact hashes, and visual capture hashes; mutation fixtures reject missing/extra IDs, bad digests, nonzero exits, pending/prose-only claims, and receipt exit codes without transcripts.
- [ ] **A7** All 15 research anchors resolve to complete page context with verified node membership, page/document identity, and context hashes; unsafe citation metadata remains an explicit source-only gap.

## Risks

The GPU capture may differ from the browser runtime. Preserve both facts rather than treating one as a substitute for the other.
