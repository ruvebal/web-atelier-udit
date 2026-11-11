# PHASE-X5 · Publish the build as a pedagogical agentic lesson

**Status:** BLOCKED — X4 must be DONE

## Goal

Teach how one SVG became a portable, crisp, responsive real-3D asset, including the engineering value and cost of the Rive + AnimaScript + GPU Canvas stack.

## Deliverables

- master-session integration plus a dedicated public making-of route;
- diagrams for source → mesh → runtime → web ownership;
- runnable tool invocation and clearly labelled Excerpt code for tessellation, area-depth mapping, WGSL, picking and host semantics;
- before/after captures and fidelity/performance evidence;
- append-only provenance data with a clearly pending PR/merge section.
- provenance schema fields: event URL, immutable ID/SHA, actor role, timestamp, verbatim-or-summary label, source digest, and pending reason.

## Acceptance

- [ ] **A1** Every code block is labelled CodeSandbox-ready, Excerpt or Template as applicable.
- [ ] **A2** The lesson distinguishes SVG, projected 2.5D and true depth-tested mesh rendering.
- [ ] **A3** It states what Rive, AnimaScript, WGSL and HTML each own.
- [ ] **A4** It explains area-derived depth and selection without hiding limitations.
- [ ] **A5** Public provenance contains only real local commits/reviews available at publication time and labels pending events.
- [ ] **A6** The provenance verifier rejects unresolved non-pending events, secrets and unsafe local paths.
- [ ] **A7** The lesson is indexed and survives the built route/link checks.

## Risks

Do not turn implementation logs into marketing. Select evidence that teaches a decision, failure, correction or gate.
