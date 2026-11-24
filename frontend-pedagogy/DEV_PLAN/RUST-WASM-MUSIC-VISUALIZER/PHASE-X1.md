# Phase X1 — A complete vertical slice

## Goal

Prove Rust UI → browser audio → Rust/Wasm mapping → GPU 3D on the classroom hardware.

## Entry gate

PHASE-X0-REPORT.md is DONE with evidence and cold-review disposition. Recheck facts on the target environment.

## Deliverables

Local repository destination decision; exact lockfiles/toolchain; one playable reference plugin; reproducible build instructions; measured clock/renderer baseline.

## Scope

One Leptos CSR UI, one Rust kernel, one Three.js mesh and local audio. No remote service, SSR, custom DSP or Rive 3D dependency yet.

## Implementation prompt

Template — execute only after the entry gate passes.

```text
Read INDEX, TECHNICAL-DIRECTOR-CASCADE, SOURCES and this runbook.
Inspect existing course-repo contracts and choose a local app directory without creating a remote. Read current primary docs and freeze compatible versions. Apply the appropriate frontend design skill for a polished semantic player. Build a complete vertical slice, with Rust control state visible in the scene. Generate/license small audio fixtures. Make compile, test, build and serve commands executable. Record actual installed versions, browser/device capability and measured timing.
Run the Acceptance checks below and record actual commands and exits.
Do not mark DONE; hand off the packet for fresh local Qwen cold review.
Use the orchestrator's closing protocol and amend-on-surprise rule.
```

## Acceptance

- [ ] A clean checkout with locked dependencies builds through documented commands; tests run on the native kernel and browser Wasm boundary.
- [ ] User gesture starts audio; loading, pause, seek, end, silence and unsupported input have coherent states.
- [ ] Changing a Rust-rendered control reaches the Rust mapping and a visibly depth-tested GPU scene.
- [ ] Run on the reference laptop/browser; record timings, artifact sizes, console/network errors and the calibration method.
- [ ] Screenshots and keyboard walkthrough verify a usable wide/narrow layout and renderer failure state; required full suites pass.

## Risks

Interop ownership conflicts; incompatible tool versions; hidden GPU assumptions; decoded-track memory use.

