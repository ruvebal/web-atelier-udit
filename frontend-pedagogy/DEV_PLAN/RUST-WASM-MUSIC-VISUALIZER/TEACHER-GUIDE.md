# Teacher guide: teaching from the experiment repository

This guide makes the curriculum executable against the deployed experiment. The application repository is separate:

`/Users/ruvebal/projects/ruvebal/scholar/udit/rust-wasm-music-visualizer`

Students should work from a tagged experiment commit, not from an instructor working tree. The current X1 baseline is the commit that passed the Pages workflow and is available at:

<https://ruvebal.github.io/rust-wasm-music-visualizer/>

## Common setup

```sh
git clone git@github.com:ruvebal/rust-wasm-music-visualizer.git
cd rust-wasm-music-visualizer/web-foundations/private/x1-vertical-slice
npm install
npm test
npm run dev -- --host 127.0.0.1
```

Open the Vite URL. `file://` is intentionally unsupported because the browser must fetch the Wasm module over HTTP.

## Lesson-to-code map

| Lesson | Instructor code walk | Student action | Exit evidence |
| --- | --- | --- | --- |
| L1 — Rust at the browser boundary | `rust/src/lib.rs:5-50` maps bounded values; `src/main.js:195-227` loads Wasm and sends features through it | Change one Rust mapping while preserving its documented range; rebuild and observe the sculpture | Student traces one `rms/bass/high` sample from JS to Rust to `visualizer.update` |
| L2 — Listening before drawing | `src/audio.js:41-55,145-149` owns the analyser; `src/features.js:5-28` computes RMS/bass/high; `src/main.js:239-244` exposes meters | Compare silence, the fixture and one student track; explain why bass energy is not beat detection | Screenshot or log with named features and a silence prediction |
| L3 — Giving sound a body | `src/visualizers/tidal-orrery.js:2-90` creates the owned geometry and lights; `94-109` applies values | Replace or extend the Tidal Orrery with a meaningful spatial metaphor; keep real depth occlusion | One original 3D composition plus a feature → property → perception table |
| L4 — Animation systems and clocks | `src/main.js:212-245` uses audio time, frame delta and renderer output; `index.html:20-56` exposes controls | Predict a parameter change, test it, then add a reduced-motion or fallback decision | Working pause/seek/loop behavior and a short Three.js/Rive decision record |
| L5 — Sending intention over a network | X1 has no relay; the static module seam is `src/main.js:5` and `src/visualizers/tidal-orrery.js:2-130` | Distinguish local audio-clock data from a future remote preset/control message; treat WebSocket as stretch work | Protocol sketch with rate limit, stale-message rule and offline fallback |
| L6 — Proving and exhibiting the instrument | `rust/src/lib.rs:52-110`, `test/wasm-boundary.mjs:4-28`, `test/e2e/instrument.spec.js:30-230`, `package.json:5-15` | Run gates, test the common track, reduced motion and failure paths, then defend one rejected choice | Release checklist, evidence bundle, AI declaration and oral defence |

## The reference data path

```text
local audio file
  → HTMLAudioElement / Web Audio analyser (`src/audio.js:41-55`)
  → normalized `rms`, `bass` and `high` (`src/features.js:17-28`)
  → Rust/Wasm `smooth`, `aperture`, `core_scale`, `radiance` (`rust/src/lib.rs:14-50`)
  → bounded values (`src/main.js:218-225`)
  → Tidal Orrery scene subtree (`src/visualizers/tidal-orrery.js:2-130`)
```

The browser owns transport, decoding and rendering. Rust owns the stateful smoothing and mapping function. This ownership distinction is the first thing students should be able to explain without looking at the scaffold.

## What is teachable now

The current repository is ready for the complete three-session sprint. The required core is L1–L4 plus the evidence and defence work in L6. L5 is a protocol-design lesson and optional stretch; students do not need a WebSocket relay to pass. The app runs, the tests pass, local audio and the original test tone work, controls are visible, reduced motion is present, and the static visualizer module contract is demonstrable.

## What must not be claimed yet

Do not promise a finished WebSocket relay, Rust-rendered UI, runtime plugin loader or Rive/3D parity. Present those as stretch boundaries. The baseline contract is a static module import with explicit `update`, `resize` and `dispose` methods.

## Instructor checklist before class

- verify the cohort/browser/device matrix;
- pin the experiment commit in the lesson handout;
- run `npm test` and open the Pages site;
- prepare one silence fixture and one common benchmark track;
- rehearse the individual B3 explanation without code-generation assistance;
- provide the student module URL convention and asset-credit rule.

## How the professor built Tidal Orrery

Use this as the live “making of” explanation. The visual polish is the result of a sequence of small, teachable boundaries, not a single magic prompt:

1. **Own transport once.** `src/audio.js` creates one `HTMLAudioElement`, one Web Audio graph and one analyser. File replacement revokes the old Blob URL; reset, seek and visibility changes clear feature history.
2. **Measure before interpreting.** `src/features.js` computes finite RMS, bass and high-band readings. A silence gate prevents residual analyser history from pretending that silence is musical energy.
3. **Keep Rust small.** `rust/src/lib.rs` has no DOM, audio or Three.js knowledge. It clamps hostile values, smooths using elapsed seconds and maps features into designed ranges.
4. **Author a spatial metaphor.** `src/visualizers/tidal-orrery.js` owns the sculpture’s groups, extruded vanes, rings, lights and materials. Twelve vanes, a core, a cage and gimbals make the audio mapping legible as a mechanism.
5. **Let the host schedule.** `src/main.js` owns the renderer, camera, controls, keyboard path, reduced-motion behavior, WebGL recovery and frame loop. The module receives values and returns `update`, `resize` and `dispose`.
6. **Make time honest.** The visualizer separates media time (the musical relationship) from an authored motion clock (the gentle idle orbit); Rust smoothing uses seconds rather than frame count. The result is explainable across refresh rates without claiming sample-accurate audiovisual synchronization.
7. **Prove the edges.** Native Rust tests, a real Wasm ABI test and Playwright tests cover hostile numbers, silence, file errors, loop, keyboard controls, reduced motion, mobile layout, context loss and resource disposal.

This is the professor’s teaching point: beauty comes after ownership, bounded data, deliberate form and verification. Students may choose another metaphor, but they must preserve the same clarity.

## Ready-to-teach sprint check

The pitch is ready when the instructor has done these five things:

- pinned the experiment commit in the handout;
- run `npm test` and `npm run build` from `web-foundations/private/x1-vertical-slice`;
- prepared the common fixture, a silence case and one legal/credited comparison track;
- shown the Tidal Orrery once without narrating every line, then replayed it through the ownership map;
- required `AI-USE.md` and an individual defence from every student.

The rubric is published on the track page. AI quality is assessed through specificity, verification, rejected suggestions, limitations and the student’s ability to explain the submitted diff—not through the brand or quantity of tools used.
