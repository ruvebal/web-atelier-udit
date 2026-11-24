# The player as a teaching instrument

Proposed architecture; X1 must validate it before it becomes starter code. Component names below are design targets, not existing APIs.

## Default stack and alternatives

| Layer | Proposed default | Reason / boundary |
| --- | --- | --- |
| UI and application state | Rust + Leptos CSR | Semantic DOM, browser app, explicit Rust UI; no SSR required for the studio |
| Browser interop | wasm-bindgen + web-sys; small JS renderer adapters | Browser audio/DOM and Three.js/Rive remain explicit external boundaries |
| Audio transport | Browser Web Audio with local/licensed track input | One graph and one clock owned by the host, controlled from Rust |
| Student computation | Separate Rust/Wasm kernel per plugin | Testable smoothing/mapping/simulation; no claim that Wasm is automatically faster |
| Baseline rendering | Three.js WebGL2 | Reuse familiar GPU 3D concepts and existing shader literacy |
| Authored animation | Rive web runtime, verified package/runtime pair | Optional control skin or scene adapter; verify true-3D capability separately |
| Network | Native Rust Axum relay + browser WebSocket client | Small room/control service; static frontend can work without it |
| Extensions | wgpu/WGSL; Three.js WebGPURenderer/TSL; alternate Rust UI | Each needs a tested adapter and a justified scope, not framework accumulation |

Leptos is the recommended starting point, not a claim of universal superiority over Yew, Dioxus or egui. Students compare alternatives in the ADR; the first cohort should not implement several UI frameworks. Use vanilla Three.js behind an adapter rather than nesting React Three Fiber in the Rust UI just to reproduce existing lessons.

## Data and ownership

1. User gesture unlocks the host audio context. The player selects a local file or a licensed HTTP fixture.
2. A single audio graph provides playback and an analyser. The host samples time-domain/frequency data and normalizes the declared bands.
3. A frame carries feature values, playback position and clock identity. Student Rust transforms these values into scene parameters.
4. The active renderer adapter updates its GPU scene. The host owns the outer frame scheduler; adapters must not accidentally start competing loops.
5. Rust UI controls update a typed parameter store. The same validated commands can arrive from a second client through the relay.
6. The gallery switches plugins without restarting the track. Disposing a plugin releases its graphics resources and listeners, not the host audio context.

A Rust-based player still relies on browser audio output, decoding and GPU APIs. Wasm does not bypass the browser sandbox. The native Axum relay and browser Wasm are separate compilation targets.

## Plugin contract v0 — design target

One student folder contains `plugin.json`, a Rust kernel crate, a renderer module, optional assets, tests and a short README. A build-generated, allowlisted registry supplies the gallery. Student modules are reviewed and built before inclusion; there is no arbitrary user-upload execution in v0.

| Surface | Contract |
| --- | --- |
| Manifest | `apiVersion`, unique `id`, display name, author, renderer kind, entry module, kernel artifact, asset credits, thumbnail and parameter schema |
| Parameters | Stable key, label, finite default, min/max/step or enum choices; host Rust UI renders labelled semantic controls |
| `mount` | Async resource loading and capability report; receives canvas/container and explicit host services |
| `update` | Receives timestamped feature frame and parameter values; finite bounded output; no per-frame resource creation |
| `resize` | Width, height and clamped DPR; preserve scene state |
| `reset` | Track/seek epoch, deterministic seed and playback position; clears smoothing and history |
| `dispose` | Idempotent cleanup of listeners, GPU objects and owned async work |
| Kernel | Exported Rust `step`/`reset` boundary; fixture-testable without audio hardware; define concrete layouts in X1 |

Use ES modules plus generated wasm-bindgen glue for v0. Do not promise dynamic linking of arbitrary Rust traits, a browser-native WASI plugin ABI, or interchangeable raw `.wasm` files. Every independently built module has its own glue/memory; transfer small feature/control arrays with explicit copies first. A borrowed view into Wasm memory must not outlive allocation/growth assumptions. Measure before introducing shared memory or threads.

Rust UI requirement is met by the host's real Rust-rendered controls and each plugin's declared parameter/state path. The kernel and visual interpretation remain individual work. A student-written Rust UI component is a supported extension once the host extension API is proven.

Same-origin reviewed modules are trusted code, not a security sandbox. JS exceptions can be caught, but a synchronous infinite loop cannot be reliably timed out on the main thread. X2 must enforce review/budgets and document that limit. An untrusted plugin marketplace would require a different origin/process design and is outside v0.

## Frame and clock contract

Proposed `AudioFrame`: `version`, `trackId`, `epoch`, `sequence`, `contextTimeSeconds`, `trackTimeSeconds`, `sampleRateHz`, `fftSize`, `rms`, `bands`, and optional `onsetStrength`. Band definitions and normalization are versioned; silence maps to finite zeros. RMS is not loudness in LUFS; analyser magnitudes are not beat labels. The minimal kernel needs only a small fixed set of scalars.

`contextTimeSeconds` is local to an AudioContext. `trackTimeSeconds` identifies position within the current track and changes on seek. Neither is a globally synchronized network clock. The host increments `epoch` on track/seek discontinuities and resets plugin state. Use elapsed audio/playback time for choreography and delta time for smoothing; do not count rendered frames as musical time.

`requestAnimationFrame` schedules drawing, not sample-accurate audio. Where available, `getOutputTimestamp()` maps an audio context position to a performance-clock estimate. Capability-test it, record output/device latency and retain a fallback. Analyser sampling and display scanout still introduce delay; exact audiovisual sample lock is not a baseline claim.

Verification fixture: silence, sustained tone, frequency sweep and regularly spaced clicks. Schedule audio from the audio clock, log intended cue times and render timestamps, then capture audible/visible output on the reference machine. Report median and p95 offset and jitter, plus method/resolution. A provisional local visual-offset target is ≤80 ms p95; calibrate its feasibility in X1 and publish the final threshold before the assignment. A JS timing log alone does not measure sound-to-photon latency.

## WebSocket contract and music input

Baseline: music enters via the player's file picker or a licensed fixture URL. WebSocket messages carry `setParameter`, `selectPreset`, `transportState`, `stateSnapshot` and optionally `featureFrame`. One teacher-controlled sender owns transport; reconnect obtains a snapshot rather than replaying an unbounded history.

Envelope: protocol version, room ID, sender ID, monotonically increasing sequence, track ID/epoch and a typed payload. Keep command and feature message types separate. Reject unknown versions, oversized payloads, nonfinite values and invalid parameter keys. An initial feature budget is 20 Hz and ≤4 KiB/frame; parameter changes are rate-limited and coalesced. Keep only the newest pending visual-feature frame. Use bounded server queues, client `bufferedAmount` thresholds and explicit drop counters; browser WebSocket has no automatic receive-side backpressure.

Remote features may drive a silent display. For a remote browser also playing the music, distribute the same track separately and estimate clock offset/drift; stream IDs/timestamps alone do not synchronize devices. That is an extension. Use HTTPS/WSS when hosted, origin checks and a room capability for the classroom relay; omit private tokens from bundles. A static Pages host cannot run Axum, so the relay needs an explicit local or server deployment target. Offline simulation remains available.

If live music input is essential later, first define source, codec, sample rate, channel count, timestamp, jitter buffer, reconnect and latency budget. Compare WebRTC media transport with custom WebSocket audio. Do not send arbitrary MediaRecorder fragments to `decodeAudioData` and assume each fragment is a decodable, gapless file. This extension is not part of the three-session minimum.

## Rive path

Demonstrate the existing authored audio and GPU 3D specimens; audit their build/runtime provenance before adapting them. The standard web package is a JS/Wasm runtime. `.riv` is an asset format, and AnimaScript is not Rust. Promote three bounded uses: responsive control skin, audio-driven authored state, and the separately verified true-3D scene path.

All adapters consume the same host features. For the base competition, the player owns audible music; Rive's own audio is muted/disabled to avoid a second clock and duplicate sound. A native Rive audio processor remains an instructor extension until browser hosting, threading/COI and common-track behaviour are demonstrated. Existing offline WAV capture is not proof of a live audio worklet.

## UX and performance acceptance targets

Player layout: focusable transport with track/connection status, central scene, labelled parameter panel, plugin gallery and an optional diagnostics drawer. Keyboard access, volume, pause and reduced motion must remain usable when the canvas fails. This is a design brief; the implementation phase applies the frontend design skill to produce and visually test the interface.

Provisional benchmark: 60-second common track, 1280×720, DPR capped at 1.5, one active scene; aim for p95 frame interval ≤33.3 ms on the named reference laptop. Record load time and compressed artifact size separately. Avoid absolute GPU-time claims from CPU frame intervals. Repeat plugin switching 20 times and check canvas/listener/resource counts for growth. Tighten or relax budgets only from X1/X2 rehearsal evidence, before students are graded.
