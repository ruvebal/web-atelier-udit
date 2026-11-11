# PHASE-X0 · Freeze the measurable baseline

**Status:** READY

## Goal

Capture the current canonical SVG, approximate prism specimen, tool versions, signed build, browser behavior, and route output before geometry changes.

## Deliverables

- checksums and path/command inventory for all 13 facets;
- current Rive CLI/runtime versions and signing state;
- verified Athanor/Ahmes research anchors, evaluator-safety outcomes and bibliography gaps from the neural-match report;
- baseline screenshots/data dump/GPU manifest where supported;
- explicit support matrix for SVG commands and transforms;
- reusable phase-report/evidence schema validator used by every later gate;
- amendments to X1–X8 if any live probe contradicts this pack.

## Prompt

Run read-only probes first. Record exact commands and outputs. Verify there are 13 source paths, not “14 canonical paths”; identify all `M/L/C/Z` commands and the non-uniform transform. Do not alter the specimen. Write `PHASE-X0-REPORT.md` with status VERIFYING and hand off.

## Acceptance

- [ ] **A1** Canonical source checksum and 13-facet inventory are machine-generated.
- [ ] **A2** Current `.riv` verifies and its checksum is recorded.
- [ ] **A3** Baseline route and fallback are captured at desktop and narrow viewport.
- [ ] **A4** Rive/Node/Ruby/browser versions are dated.
- [ ] **A5** Every contradicted assumption amends downstream runbooks.
- [ ] **A6** `verify-phase-evidence.mjs X0` validates every acceptance item and names its immutable artifact.
- [ ] **A7** Research anchors used downstream resolve to full page context; unsafe citation metadata remains an explicit source-only gap.

## Risks

The GPU capture may differ from the browser runtime. Preserve both facts rather than treating one as a substitute for the other.
