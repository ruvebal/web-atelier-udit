# Make Sound Visible

Draft challenge brief for instructor review. Starter links, repository URL and deadlines are supplied only after the rehearsal passes.

**Create a music visualizer that makes a listener notice something new.** You will develop a plugin for our shared Rust/WebAssembly player, turn audio features into interactive GPU 3D, and defend how your technology choices serve the experience.

## Choose a direction

| Concept | Minimum viable interpretation | Ambitious extension |
| --- | --- | --- |
| Spectral sculpture | Three bands deform one low-poly mesh | Rust-generated geometry |
| Rhythm city | Instanced buildings respond to spectral bands | Camera paths with measured onset cues |
| Orbital ensemble | Bass, mid and treble control three orbiting bodies | User-composed parameter relationships |
| Kinetic instrument | One articulated object responds to level/envelope | Rive control skin plus Three.js body |
| Resonant garden | A small set of stems bend with energy | Instanced growth and seed presets |
| Particle chamber | A bounded cloud expands and changes colour | wgpu compute on a verified device |
| Living album | A 3D cover opens into an audio-reactive scene | Rive-authored transitions |
| Listening room | Calm spatial changes reveal contrast and silence | Accessible alternate visual modes |

Each concept can succeed at baseline scope. More particles, paid assets or more frameworks do not earn marks by themselves. Propose another concept if it satisfies the same evidence contract.

## What must work

1. An identifiable student plugin with an original spatial composition, camera and visible 3D occlusion.
2. Student-authored Rust compiled to WebAssembly performs a meaningful feature-to-motion calculation: for example, delta-time-aware smoothing, an envelope with attack/release, a bounded nonlinear mapping or a small stateful simulation. Test normal, silence and discontinuity inputs. A pass-through wrapper or dependency's Wasm file is insufficient.
3. GPU rendering through an approved adapter; name WebGL2 or WebGPU accurately.
4. Declare at least two meaningful parameters in your plugin manifest; the shared Rust UI renders their controls. Show their values reaching your Rust kernel, and explain the provided UI component and your declarations. You are extending the supplied UI, not building a framework.
5. Audio-reactive behaviour on the common test tracks, correct silence handling and a coherent pause/seek/reset policy. Explain the synchronization limit you measured.
6. One WebSocket-controlled parameter or preset, visible connection state and local operation after disconnect. You use the supplied relay; you need not build a streaming server.
7. Keyboard-operable controls, pause/reduced-motion mode, readable labels and a usable renderer-failure state. Keep the audio playable when a scene fails.
8. Tests and a brief defence that explain your choices and your own contribution.

Rive is encouraged for authored interaction and animation. Standard Rive vector animation alone does not meet the true-3D criterion. Pair it with a 3D renderer or use the instructor-verified Rive 3D specimen. Do not claim that WebAssembly is automatically GPU execution, that volume peaks are beat tracking, or that remote features transmit audible music.

The Rive-as-primary-3D option opens only when the instructor releases the X4-tested specimen for the actual class browsers. Until then, use Three.js (or an approved wgpu starter) for spatial rendering and Rive for a control skin or authored animation. Existing studio 3D assets are evidence to inspect, not an automatic compatibility guarantee for this new player.

## Deliverables

- A1: first working Rust/Wasm audio-to-mesh slice and concept sketch.
- A2: original composition, two controls, preset and architecture decision.
- A3: tested plugin, remote interaction, fallback and final evidence.
- Final package: source, lockfiles, manifest, thumbnail, asset credits, test results, short demo, benchmark environment and AI-use declaration. No copyrighted music copied into the submission unless licensed for redistribution.
- Defence: explain the path from sound to geometry, compare two stacks, show one meaningful failure you fixed, and predict the result of a small change before running it.

The weekly deliverables are versions of the same product. Feedback on A1 and A2 must be addressed or explicitly declined with a reason in A3.

## Assessment proposal — assignment rubric, not course-wide weights

| Criterion | Weight | Evidence |
| --- | --- | --- |
| Musical and visual interpretation | 25% | Coherent mappings, restraint, response to contrasting tracks and silence |
| Rust/Wasm and engineering explanation | 20% | Meaningful kernel, interop trace, tests and defensible choices |
| 3D interaction and accessibility | 20% | Depth, composition, useful controls, keyboard and reduced motion |
| Timing, reliability and performance | 20% | Seek/reset, network faults, lifecycle cleanup and common-device measurements |
| Individual understanding and process | 15% | Transfer task, contribution evidence, critique and oral explanation |

Competition eligibility requires all eight functional requirements to be demonstrated or a documented accessibility accommodation approved under the course process. Missing features receive criterion-specific feedback and marks; do not invent an automatic course failure or let an audience vote override assessment.

Jury: use the same reference laptop/browser, resolution, fixture pack and run duration for every entry. Record platform limitations. Audience choice is a separate recognition. Publish the criteria before students choose their concept.

Assess local audio/visual alignment separately from the delay of remote commands. The baseline does not require cross-device musical synchronization. Report network command latency and dropped/stale frames; do not grade them against the local sound-to-picture offset target.

## Stack defence template

Template — replace each prompt with your own evidence.

| Question | Your answer |
| --- | --- |
| What experience do you intend? | Listener, musical feature and spatial metaphor |
| What did Rust contribute? | Function, data types, test and measured/correctness reason |
| What owns the UI, audio clock and rendering? | Named components and interfaces |
| Which alternative did you reject? | One fair comparison, including implementation cost |
| What fails on a weaker device or network? | Observed failure and fallback |
| Which AI suggestion did you change or reject? | Suggestion, reasoning and verification |
