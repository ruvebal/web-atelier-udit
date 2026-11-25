# One instrument, many interpretations

Build a shared player whose visual identity changes with each student plugin. The pedagogical object is a traceable chain: **sound → measured feature → Rust transformation → GPU geometry → human control**. The competition asks who can make that chain expressive, understandable and robust.

Twelve contact hours are enough for a bounded extension of a functioning scaffold, conditional on prior JavaScript, Git, browser debugging and basic 3D experience. They are not a credible allowance for novices to independently learn Rust ownership, a Rust UI framework, GPU APIs, DSP and network media transport from zero. This is a planning judgement to test in the rehearsal, not a measured learning claim.

## Recommended scope

| Requirement | Instructor prepares | Each student demonstrates |
| --- | --- | --- |
| Rust and Wasm | Reproducible toolchain and kernel interface | Meaningful Rust feature-to-motion function, tests and browser-loaded `.wasm` |
| Rust UI | Leptos player and schema-driven controls | Two declared controls routed through the Rust UI into their kernel; explain the event/state path |
| GPU and true 3D | Three.js adapter and depth-tested example | Own mesh/scene composition, camera and visible occlusion; explain GPU work |
| Audio synchronization | One audio graph, timestamped features, diagnostic click track | Audio-clock-driven motion; pause/seek/reset behaviour and measured limitations |
| WebSockets | Axum room relay, client and offline simulator | One remote control or feature mode, disconnect behaviour and packet explanation |
| Animation/Rive | Rive Wasm runtime adapter and a comparison specimen | Choose Rive alongside the 3D renderer, or a verified true-3D Rive path; defend the choice |
| Integration | Registry, validation, gallery and fixture suite | One independently identifiable plugin and PR with evidence |

“Rust UI” means actual Rust components rendering semantic DOM. Student-specified controls are rendered by that host. It does not imply every student authors an entire UI framework application. A custom Rust component is an extension. “GPU” may mean WebGL2; WebGPU and Rust `wgpu` are ambitious alternatives with an instructor-tested starter, not extra grading credit by themselves.

## The competition

Working title: **Make Sound Visible — the Music Visualizer Challenge**.

One common audio pack and one common player permit comparison. Students choose an expressive concept and defend a stack. Award a jury prize, an engineering prize and a separate audience choice; the audience vote never determines a grade. A quieter, accessible composition can win over a costly particle spectacle.

Every student submits their own plugin, even when debugging in pairs. The product gallery is collective; assessment of understanding remains individual. AI assistance follows the existing course declaration and ACCEPT/REJECT review discipline. No grade depends on purchasing software or on paid model access.

## Grounding and limits

The sequence follows desired results → acceptable evidence → learning activities, using the verified backward-design passage in Wiggins and McTighe (2011, 8–9). That gives us the order of design; it does not prove that six lessons is the optimal number.

Liu, Fan, and Pan (2026, 17) present a theory-building account of scaffolding/offloading and propose critique, verification journals and fading support. We adopt an individual explanation and a small unaided transfer task as course design choices. Their paper explicitly calls for further empirical verification; do not claim causal efficacy for this competition.

The Rust and audio books ground technical concepts and reading selections. Their TOCs are not a syllabus. Their bibliographic issues and current-API limits remain visible in [SOURCES.md](SOURCES.md).

## What the initial release leaves for later

Live PCM/Opus music over a custom WebSocket, multiplayer acoustic synchronization, streaming-service integration, arbitrary plugin uploads, native desktop packaging, custom audio decoders and production accounts are later projects. The base product plays local/licensed files and sends controls or analysis data over WebSockets. A network feature stream contains information about sound, not the sound itself.

The three-session pilot has **12 scheduled hours including three 10-minute breaks**, plus an explicitly proposed 90-minute readiness activity and at most two optional 60-minute polish periods. If no work outside the studios is available, use the prebuilt scaffold and keep the reference renderer. Do not move essential Rust/GPU work into undisclosed homework.
