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
| L1 — Rust at the browser boundary | `rust/src/lib.rs:8-32` exports `set_gain`, `set_smoothing`, `reset`, `step`; `src/main.js:75-84` fetches and instantiates Wasm; `src/main.js:182-184` calls `kernel.step` | Change the Rust mapping while preserving the bounded return contract; rebuild and observe the mesh | Student traces one `rms/bass` sample from JS to Rust to `group.scale` |
| L2 — Listening before drawing | `src/main.js:86-97` fills time/frequency arrays and computes RMS/bass; `src/main.js:190` exposes the diagnostic overlay | Compare a silence case and two tracks; explain why bass energy is not beat detection | Screenshot or log with named features and a silence prediction |
| L3 — Giving sound a body | `src/main.js:32-62` creates camera, meshes, materials and lights; `src/main.js:184-187` applies scale and rotation | Replace or extend the icosahedra with a meaningful spatial metaphor; keep real depth occlusion | One original 3D composition plus a before/after mapping explanation |
| L4 — Animation systems and clocks | `src/main.js:176-191` uses `delta`, `performance.now`, feature values and renderer output; `index.html:27-34` exposes play, gain, smoothing, seek, loop and visualizer controls | Predict a parameter change, test it, then add a reduced-motion or fallback decision | Working pause/seek/loop behavior and a short Three.js/Rive decision record |
| L5 — Sending intention over a network | X1 has no relay yet; use the boundary in `src/main.js:163-174` as the plugin seam and introduce the future relay only after X3 | Distinguish local audio-clock data from a remote preset/control message; implement against the supplied relay when released | Two-client control trace, reconnect result and offline behavior |
| L6 — Proving and exhibiting the instrument | `rust/src/lib.rs:34-65` contains the native tests; `test/wasm-boundary.mjs:1-15` checks Wasm exports; `package.json:5-11` defines the gates | Run tests, fault-inject a plugin, measure the common track and defend one rejected stack choice | Release checklist, benchmark note, accessibility check and oral defence |

## The reference data path

```text
local audio file
  → HTMLAudioElement / Web Audio analyser (`main.js:99-155`)
  → normalized `rms` and `bass` (`main.js:86-97`)
  → Rust/Wasm `step` (`lib.rs:25-31`)
  → bounded scale (`main.js:182-184`)
  → Three.js group and meshes (`main.js:48-62`, `176-191`)
```

The browser owns transport, decoding and rendering. Rust owns the stateful smoothing and mapping function. This ownership distinction is the first thing students should be able to explain without looking at the scaffold.

## What is teachable now

The current repository is ready for a supervised X1 pilot covering L1–L4 and A1/A2 foundations: the app runs, the tests pass, local audio works, the controls are visible, and the plugin URL seam is demonstrable.

## What must not be claimed yet

L5 WebSocket teaching, a Rust-rendered UI, a formal plugin manifest, lifecycle disposal, Rive parity and the full A3 competition contract remain X2–X6 work. Teach those as design boundaries or defer them until their experiment milestones are tagged.

## Instructor checklist before class

- verify the cohort/browser/device matrix;
- pin the experiment commit in the lesson handout;
- run `npm test` and open the Pages site;
- prepare one silence fixture and one common benchmark track;
- rehearse the individual B3 explanation without code-generation assistance;
- provide the student module URL convention and asset-credit rule.
