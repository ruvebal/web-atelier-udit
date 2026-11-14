# PHASE-X5 · Publish the build as a pedagogical agentic lesson

**Status:** VERIFYING — lesson + provenance + evidence prepared

## Goal

Teach how one SVG became a portable, crisp, responsive real-3D asset, including the engineering value and cost of the Rive + AnimaScript + GPU Canvas stack.

**First relevance utility — sound synchronicity.** Before the mesh and picking deep dive, the making-of lesson states why this stack is worth learning for a web animation course: it is the only specimen on the comparison page that can own an audible sample clock inside the same WASM artifact that owns motion. The existing AnimaScript `AudioProcessor` hum (`animascript-audio/hum.as`, CLI `--render-audio` capture, demo card after a user gesture) is the hearable proof. The GPU 3D favicon owns elapsed time for choreography; the audio specimen owns the sample clock for tone. Students must leave knowing which techniques *follow* `AudioContext.currentTime` or analyser energy, and which can *package* the clock. This is not a full Web Audio master lesson — it is the first honest answer to “why Rive here?”

Teach the current favicon as a golden fixture with N=13 while describing compiler, runtime, picker, and semantic-control capacity as data-driven N. Label cubic evaluation/flattening, shoelace area/centroid, triangle signed-area inclusion, Möller–Trumbore picking, exponential damping, and D4 area-to-depth/GPU depth mapping as engineering derivations unless a verified source directly supports the algorithm. Keep the curriculum metadata gap as source-only evidence.

## Deliverables

- master-session integration plus a dedicated public making-of route;
- an opening section that teaches sound synchronicity as the first relevance utility of the stack, with labelled Excerpt from `hum.as` and a link to the hearable demo card, without claiming live AudioWorklet on GitHub Pages;
- diagrams for source → mesh → runtime → web ownership;
- a graphics-architecture diagram covering D21’s eight layers and identifying which layer Rive, AnimaScript, WGSL and HTML own;
- runnable tool invocation and clearly labelled Excerpt code for tessellation, area-depth mapping, WGSL, picking and host semantics;
- before/after captures and fidelity/performance evidence;
- append-only provenance data with a clearly pending PR/merge section;
- provenance schema fields: event URL, immutable ID/SHA, actor role, timestamp, verbatim-or-summary label, source digest, and pending reason;
- `verify-rive-3d-provenance.mjs` that rejects unresolved non-pending events, secrets, and unsafe local paths.

## Prompt

Author the public making-of under `docs/lessons/en/web-animations/svg-master-session/agentic-rive-3d/`. Open with sound synchronicity (D54), then the SVG → mesh → GPU → host pipeline, then interaction and fallback. Index the lesson in `lessons.yml`. Wire a short cross-link from the master session. Build provenance YAML from real local commits and reviews only; mark PR/merge pending. Stop at VERIFYING.

## Acceptance

- [ ] **A1** Every code block is labelled CodeSandbox-ready, Excerpt or Template as applicable.
- [ ] **A2** The lesson distinguishes SVG, projected 2.5D and true depth-tested mesh rendering.
- [ ] **A3** It states what Rive, AnimaScript, WGSL and HTML each own.
- [ ] **A4** It explains area-derived depth and selection without hiding limitations.
- [ ] **A5** Public provenance contains only real local commits/reviews available at publication time and labels pending events.
- [ ] **A6** The provenance verifier rejects unresolved non-pending events, secrets and unsafe local paths.
- [ ] **A7** The lesson is indexed and survives the built route/link checks.
- [ ] **A8** Public technical claims cite evaluator-safe sources; the unresolved curriculum metadata gap is omitted publicly or taught without a polished citation.
- [ ] **A9** The lesson distinguishes elapsed-time interpolation, camera/model transforms, depth/visibility, shader computation cost and DOM-versus-GPU interaction ownership.
- [ ] **A10** The comparison rubric evaluates authored motion principles separately from input-driven state, interruption, persistence and reset.
- [ ] **A11** Sound synchronicity is taught as the first relevance utility: the lesson names who owns the audible sample clock, distinguishes Rive/AnimaScript audio ownership from external followers, links the hearable specimen, and does not claim a live threaded AudioWorklet on the published Pages host.

## Risks

Do not turn implementation logs into marketing. Select evidence that teaches a decision, failure, correction or gate. Do not invent live sample-lock between the GPU 3D loop and the hum; teach shared *ownership pattern*, not a fake A/V lock that the fixtures do not prove.
