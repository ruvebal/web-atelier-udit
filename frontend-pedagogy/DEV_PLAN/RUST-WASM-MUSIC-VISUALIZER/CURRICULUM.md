# Six lessons, three studios, one accumulating product

Planning specification, not the finished monograph or published lesson prose. The curricular unit here is the three-session studio. Six lessons are short conceptual sections within it, not six additional meetings.

Executable teaching references are maintained in [TEACHER-GUIDE.md](TEACHER-GUIDE.md). Every lesson should be taught against a tagged commit of the separate experiment repository, with the exact file/symbol and exit evidence recorded there.

## Outcomes and acceptable evidence

| Outcome | Evidence in final product | Individual check |
| --- | --- | --- |
| Explain the browser/Rust/Wasm boundary | A compiled Rust mapping function is called during visualization | Trace one input sample/feature to one mesh property |
| Interpret audio features without confusing energy and beat | Named, normalized feature mappings and a diagnostic overlay | Explain why bass energy is not automatically beat detection |
| Build and control GPU 3D | Depth-tested mesh, camera and two meaningful controls | Predict what a parameter change will do before running it |
| Reason about clocks and transport | Correct pause/seek/reset and a clearly bounded future network path | Diagnose why remote intent is not shared audio time |
| Defend an engineering choice | Short ADR, measured performance and a rejected alternative | Explain a trade-off using observed evidence |

## Six lessons and cumulative assignments

| Lesson | Central question | Small worked example | Product increment | Reading selection |
| --- | --- | --- | --- | --- |
| L1. Rust at the browser boundary | What should Rust own, and what does the browser still do? | Rust receives normalized features and returns bounded values | Load the kernel; change one mapping and preserve its contract | Rust book chs. 1, 4–6, 9; binding platform note |
| L2. Listening before drawing | What are we actually measuring? | Waveform/RMS, FFT bins and bass/high mapping | Audio graph → feature extraction → Rust smoothing | Smus chs. 2 and 5; Reiss chs. 5 and 7; Turner ch. 21 |
| L3. Giving sound a body | Which property of a sound should become which spatial change? | Extruded vanes, rings or a deforming low-poly object | Original composition, depth and camera interaction | Existing Three.js core, FE II shader literacy; Rust book structs/collections |
| L4. Animation systems and clocks | Is this reactive motion, a timeline cue, or synchronized playback? | Same feature drives a Three.js object under audio time | Transport controls, explicit reset and motion policy | Existing Rive making-of; current runtime docs; Jones ch. 7 as audited comparison |
| L5. Sending intention over a network | Do we need to send sound, or only a command? | A bounded preset message designed on paper | Protocol sketch with rate limit, stale-message rule and offline fallback | Existing WebSocket material; Axum docs; optional Yoon ch. 5 after citation audit |
| L6. Proving and exhibiting the instrument | What makes this good beyond a successful demo? | Fault-injected module and common benchmark track | Tested release, evidence, AI declaration and stack defence | Rust book ch. 11; Jones chs. 9–10 only after example verification |

Reading selections are selective references, not whole-book homework. Source resolution and edition notes are in SOURCES.md. Chapters from the supplied EPUBs must be cited by section unless print page markers are verified.

Reading selections were located through metadata/TOCs and sampled nodes, not a line-by-line validation of every chapter. Bibliographic gaps and code currency remain explicit; neither a TOC nor a resolver score establishes technical accuracy.

L3 depth check: rotate a pair of crossing/intersecting meshes and verify near surfaces occlude far surfaces with depth testing enabled. L5 distinction: identify local audio-clock-driven motion separately from remote parameter updates; a late network command changes when a control takes effect, and does not establish a shared audio clock.

## Repeatable lesson structure

Each lesson package contains a master idea, a prediction question, one complete worked example, one deliberately broken variation, a product increment and an exit check. Its B1 section explains the concept; B2 is the contextual plugin lab; B3 isolates a strategy individually. Label all code as CodeSandbox-ready, Excerpt or Template. Rust build instructions require a tested repository/toolchain route; do not label native compiler setup CodeSandbox-ready without proving it there.

The lesson authoring phase uses `curriculum-forger` and the local `lesson-scribe` workflow for conceptual prose. Existing React material is a prerequisite reference, not something to silently re-teach. The current X1 host intentionally uses HTML controls; a Rust-rendered UI is a future comparison, not a hidden sprint requirement.

## Studio 1 — Hear, measure, compile

| Minutes | Activity | Evidence |
| --- | --- | --- |
| 0–15 | Hear the common track; predict two visual mappings | Initial sketch and prediction |
| 15–40 | L1 worked example and boundary explanation | Rust/JS/browser ownership diagram |
| 40–85 | Guided kernel/UI build | Browser loads student's Rust module |
| 85–95 | Break | — |
| 95–120 | L2 waveform, frequency and time demonstration | Feature vocabulary |
| 120–205 | Build a one-mesh audio-reactive slice | First executable plugin |
| 205–225 | Individual B3: bounded mapping and silence case | Test + explanation without generation tools |
| 225–240 | Submit A1 and select concept | Commit/tag and brief |

**A1 — Signal to form:** one mesh, one Rust mapping, silence-safe output, a working Wasm load, and a one-page concept/stack hypothesis. This becomes the foundation of A2. Optional between-session polish: 60 minutes, replacing the visual sketch only; no new required system.

## Studio 2 — Compose and interact

| Minutes | Activity | Evidence |
| --- | --- | --- |
| 0–15 | Compare A1 predictions and actual output | One corrected assumption |
| 15–40 | L3 mesh, camera, material and GPU cost | Spatial mapping plan |
| 40–85 | Guided 3D construction and profiling | Scene with real depth |
| 85–95 | Break | — |
| 95–120 | L4 Three.js/Rive comparison and audio clock | Renderer decision |
| 120–205 | Extend original plugin; add two controls and a preset | A2 candidate |
| 205–225 | Individual B3: seek/reset and frame-rate independence | Small isolated test and prediction |
| 225–240 | Submit A2 and peer critique | Revision note |

**A2 — Playable composition:** extend A1 with original 3D, two controls in the Rust UI, deterministic pause/seek/reset and a 200–300-word architecture decision comparing two plausible stacks. Optional polish: 60 minutes for asset/parameter refinement. Rive is a supported expressive option, not an extra mandatory framework for every student.

## Studio 3 — Connect, prove, defend

| Minutes | Activity | Evidence |
| --- | --- | --- |
| 0–15 | Diagnose why a remote command is not shared audio time | Prediction |
| 15–40 | L5 WebSocket control vs feature vs audio transport | Protocol explanation |
| 40–85 | Harden the local visualizer; design a bounded stretch message only if core passes | Release candidate or protocol sketch |
| 85–95 | Break | — |
| 95–120 | L6 profiling, accessibility and fair comparison | Verification checklist |
| 120–165 | Fix failures and package the visualizer | Release candidate |
| 165–185 | Individual B3: unseen feature sequence + short explanation | Transfer evidence |
| 185–230 | Exhibition and defence | Demo, peer questions, jury notes |
| 230–240 | Submit A3 and reflection | Final release |

**A3 — Exhibition release:** A2 plus lifecycle evidence, benchmark results, failure fallback, asset credits, AI-use declaration and individual defence. WebSocket interaction is stretch, not a gate. With more than nine five-minute demo slots, use concurrent stations and brief individual recordings collected in the B3 block; do not quietly add a fourth session. Confirm cohort size in X0 and rehearse the chosen format.

## Pedagogical scaffold

Desired result: students can explain and alter an instrument, not merely replay a template. Acceptable evidence: an original mapping, a tested plugin and a small unfamiliar transfer task. Learning plan: reproduce → vary → independently diagnose. This is the backward-design application grounded in Wiggins and McTighe (2011, 8–9).

| Strand | Process × knowledge type | Scaffolding |
| --- | --- | --- |
| B1 | Understand × conceptual | Instructor explains one boundary or clock at a time |
| B2 | Create × procedural | Complete reference → constrained adaptation → original plugin |
| B3 | Analyze × conceptual | Small fresh inputs, no production scaffold or generative completion |
| Defence | Evaluate × metacognitive | Compare intention, results and an abandoned alternative |

These Bloom placements are design classifications. Resolve the relevant taxonomy passage before using them as public scholarly claims. A formal 5E cycle is not imposed on compiler installation or lifecycle compliance. The inquiry portion uses prediction, experimentation, explanation, revision and evaluation without claiming a separately validated 5E intervention.

Load decisions: supply toolchain and relay; introduce one interop boundary first; postpone wgpu/AudioWorklet/custom streaming. Critical questions are concrete: does a better GPU buy a better grade; does proprietary asset authoring constrain reproducibility; does a high-motion interface exclude listeners; who owns uploaded music? Address these through the shared benchmark, a free starter path, motion controls and local-file default. No audience upload collection is needed.

The evidence from Liu, Fan, and Pan (2026, 17) informs the critique and individual explanation design. It does not establish the optimal lesson count, homework allowance or scoring weights.

## Monograph architecture

Proposed title: **Sound into Space: Rust, WebAssembly and the Design of Musical Interfaces**.

Write a compact teaching monograph, approximately 12,000–18,000 words as an editorial target, with six core chapters matching L1–L6. Each chapter includes a durable concept, current platform note, runnable specimen, failure case, reading guide and corresponding assignment increment. Appendices hold installation/troubleshooting, plugin/protocol reference, source/citation ledger and the competition brief. Do not reproduce six separate boilerplate applications: use one growing player with tagged chapter milestones.

The code must precede the final explanatory prose. X1–X4 establish what actually runs; X5 writes and verifies the monograph against those releases. The first edition is English; any requested Spanish lesson/deck twins go through local Qwen and structural parity checks. Language expansion does not block review of this English planning pack.
