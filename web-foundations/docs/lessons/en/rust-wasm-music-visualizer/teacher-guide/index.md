---
layout: lesson
title: 'Teacher Guide · Rust/Wasm Music Visualizer Studio'
slug: rust-wasm-music-visualizer-teacher-guide
date: 2026-11-26
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/rust-wasm-music-visualizer/teacher-guide/
description: 'A ready-to-teach guide for the three-session Rust/Wasm, Web Audio and GPU 3D visualizer sprint.'
tags: [rust, wasm, web-audio, threejs, teaching, rubric, ai-literacy]
status: complete
category: 3d
---

# Teacher Guide · Rust/Wasm Music Visualizer Studio

This is the public teaching companion for the [six-lesson sequence](../) and the [three-studio student track]({{ '/tracks/en/udit/rust-wasm-music-visualizer/' | relative_url }}). The runnable reference is the separate [Rust/Wasm Music Visualizer repository](https://github.com/ruvebal/rust-wasm-music-visualizer), with a live [Tidal Orrery demo](https://ruvebal.github.io/rust-wasm-music-visualizer/).

## Ready-to-teach status

The core sprint is ready for three 4-hour sessions. The required product is a local audio-reactive 3D visualizer. WebSockets, Rive and beat detection are optional extensions, not hidden pass/fail requirements.

Before class:

1. Pin a tested experiment commit from the repository.
2. Have students run `npm test` before editing.
3. Open the Vite server over HTTP; do not open `index.html` with `file://`.
4. Prepare the included test tone, a silence case and one credited comparison track.
5. Require an individual explanation and `AI-USE.md` from every student.

## Common setup

```sh
git clone https://github.com/ruvebal/rust-wasm-music-visualizer.git
cd rust-wasm-music-visualizer/web-foundations/private/x1-vertical-slice
npm ci
npm test
npm run dev -- --host 127.0.0.1
```

## How the professor’s instrument works

The reference was built as a sequence of explicit ownership boundaries:

1. `src/audio.js` owns one `HTMLAudioElement`, one Web Audio graph, local-file URLs, transport and disposal.
2. `src/features.js` extracts finite RMS plus low/mid/high band readings; silence is explicitly gated.
3. `src/rhythm.js` estimates BPM from repeated low-frequency rises and emits a short beat pulse; it is intentionally explainable rather than “AI magic.”
4. `rust/src/lib.rs` smooths and maps normalized values without knowing about the DOM, audio or Three.js.
5. `src/main.js` owns the renderer, camera, controls, keyboard path, Wasm loading, clocks and recovery states.
6. `src/visualizers/tidal-orrery.js` owns the 3D scene subtree: vanes, rings, gimbals, lights, materials and disposal. Low changes aperture/warmth, mids change assembly motion/hue, highs change edge light, and the beat pulse marks an onset.
7. Audio time explains the musical relationship; an authored motion clock keeps a gentle idle orbit when playback is paused. Reduced motion freezes spatial movement.
8. Rust tests, Wasm ABI checks and Playwright tests prove bounded values, silence, controls, failures, mobile layout and resource cleanup.

The key teaching sentence is: **the browser orchestrates, Web Audio measures, Rust transforms, and Three.js makes the interpretation spatial.**

## Lesson-to-code map

| Lesson | Walk through | Student evidence |
| --- | --- | --- |
| L1 | `rust/src/lib.rs:5-50`; `src/main.js:195-227` | Trace `{ rms, bass, mid, high }` through Wasm into bounded visual values. |
| L2 | `src/audio.js:41-55,145-149`; `src/features.js:5-29`; `src/rhythm.js:1-38` | Explain why bands are not beats, then defend the onset/BPM estimate. |
| L3 | `src/visualizers/tidal-orrery.js:2-90,94-109` | Replace the metaphor while retaining real depth and ownership. |
| L4 | `src/main.js:212-245`; `src/audio.js:20-35` | Distinguish audio time, frame delta and authored idle motion. |
| L5 | Static module seam at `src/main.js:5`; contract in `src/visualizers/tidal-orrery.js:2-130` | Design a bounded remote-intent message; relay implementation is stretch. |
| L6 | `rust/src/lib.rs:52-110`; `test/wasm-boundary.mjs`; `test/e2e/instrument.spec.js` | Produce a release evidence bundle and defend one trade-off. |

## Three-session delivery

### Session 1 · Hear and map

Demonstrate Tidal Orrery, draw the data path, choose a visual metaphor, then implement one Rust mapping and one visible 3D response. End with a prediction, a browser check and an A1 commit.

### Session 2 · Give sound a body

Build the owned scene subtree. Add meaningful transport and keyboard controls, reduced motion, responsive layout and one failure path. End with an A2 composition and mapping table.

### Session 3 · Prove and pitch

Run tests, remove dead controls, check the console, capture silence and mobile evidence, then give each student a two-minute defence. End with a reproducible handoff or deployed URL.

The complete timings and [100-point rubric are on the student track]({{ '/tracks/en/udit/rust-wasm-music-visualizer/' | relative_url }}).

## AI-use standard

AI may help students explore syntax, compare approaches, debug or draft explanations. It may not replace the student’s understanding. Require `AI-USE.md` with:

- tool/model and date;
- context supplied;
- generated or transformed files;
- tests and browser checks performed;
- one suggestion rejected and why;
- one remaining limitation;
- an authorship statement in the student’s own words.

Assess quality through specificity, verification, critical rejection and oral transfer—not through the number or brand of tools used. Generated citations, benchmark claims and unexplained code do not count as evidence.

## Instructor close

Ask every student: “Show me one input, one Rust decision, one GPU property and one observed limitation.” A beautiful demo becomes a defensible project when the student can answer from the repository, the tests and the listening experience.
