# Phase X2 — Player and plugin SDK

## Goal

Turn the slice into a reusable host that accepts independently authored student plugins.

## Entry gate

PHASE-X1-REPORT.md is DONE with evidence and cold-review disposition. Recheck facts on the target environment.

## Deliverables

Versioned manifest/schema and frame types; registry; two distinct plugins; fixtures and conformance command; accessible gallery and parameter panel.

## Scope

Reviewed same-origin modules; per-plugin Rust/Wasm artifacts; controlled JS adapters. Arbitrary uploads and dynamic Rust trait linking are excluded.

## Implementation prompt

Template — execute only after the entry gate passes.

```text
Read INDEX, TECHNICAL-DIRECTOR-CASCADE, SOURCES and this runbook.
Freeze the contract from ARCHITECTURE against working code. Implement loading/cancellation, mount/update/resize/reset/dispose, host-owned audio and scheduler, parameter validation and failure UI. Build a second plugin without modifying host internals. Add common-device performance and cleanup checks. Document which resources belong to host vs plugin and the lack of a main-thread infinite-loop sandbox.
Run the Acceptance checks below and record actual commands and exits.
Do not mark DONE; hand off the packet for fresh local Qwen cold review.
Use the orchestrator's closing protocol and amend-on-surprise rule.
```

## Acceptance

- [ ] Run manifest/schema validation with duplicate IDs, incompatible versions, malformed parameters and missing assets; failures are actionable.
- [ ] Two separate plugin packages install and run via the registry without host-specific branches.
- [ ] Twenty switches leave one active scene loop and no growing listener/canvas/resource counts; slow mount cancellation cannot resurrect a disposed scene.
- [ ] Silence, NaN rejection, variable delta time, seek epoch and deterministic reset fixtures pass.
- [ ] Bad module/load failures preserve transport and keyboard navigation; full code suites and production build pass.

## Risks

Memory growth across Wasm modules; leaks; multiple audio contexts; stale async mounts; confusing a trusted module with isolation.

