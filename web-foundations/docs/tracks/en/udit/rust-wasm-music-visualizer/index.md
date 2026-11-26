---
layout: lesson
title: 'Rust/Wasm Music Visualizer — Studio Track'
title_alt: 'Rust/Wasm Music Visualizer — Studio Track'
slug: rust-wasm-music-visualizer-track
date: 2026-11-24
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /tracks/en/udit/rust-wasm-music-visualizer/
description: 'Three 4-hour studios: Rust/Wasm boundary, Web Audio, GPU 3D, animation clocks and the staged visualizer challenge.'
tags: [rust, wasm, web-audio, threejs, gpu, websocket, rive, udit]
status: complete
---

# Rust/Wasm Music Visualizer — Studio Track

This is the three-studio teaching route for the [canonical six-lesson sequence]({{ '/lessons/en/rust-wasm-music-visualizer/' | relative_url }}). The runnable reference is the separate [experiment repository](https://github.com/ruvebal/rust-wasm-music-visualizer) and its [deployed X1 baseline](https://ruvebal.github.io/rust-wasm-music-visualizer/).

## Start here

1. Clone the experiment and run `npm test`.
2. Open the Vite URL; do not open `index.html` with `file://`.
3. Read the public [Teacher Guide]({{ '/lessons/en/rust-wasm-music-visualizer/teacher-guide/' | relative_url }}) and begin L1.

## Three studios · 12 hours

| Studio | Lessons | Product evidence |
| --- | --- | --- |
| 1 · Hear, measure, compile | [L1]({{ '/lessons/en/rust-wasm-music-visualizer/l1-rust-browser-boundary/' | relative_url }}) · [L2]({{ '/lessons/en/rust-wasm-music-visualizer/l2-audio-features/' | relative_url }}) | A1: Rust/Wasm mapping, features, silence-safe test |
| 2 · Compose and interact | [L3]({{ '/lessons/en/rust-wasm-music-visualizer/l3-gpu-3d/' | relative_url }}) · [L4]({{ '/lessons/en/rust-wasm-music-visualizer/l4-clocks-controls/' | relative_url }}) | A2: original 3D, controls, lifecycle and stack decision |
| 3 · Connect, prove, defend | [L5]({{ '/lessons/en/rust-wasm-music-visualizer/l5-websocket-control/' | relative_url }}) · [L6]({{ '/lessons/en/rust-wasm-music-visualizer/l6-proof-exhibition/' | relative_url }}) | A3: tests, fallback, evidence and defence; relay is stretch |

The required product is the local, audio-reactive 3D visualizer. WebSockets, Rive and a second client are stretch options; they are not prerequisites for a fair three-session sprint. Every team must finish a coherent core before attempting one.

## The shared analysis plug-in contract

Students do not need to rebuild the audio analyser. A visualizer module receives the shared `features` object in its factory and can use the same analysis as the served Tidal Orrery:

| Signal | Meaning | Good first visual mapping |
| --- | --- | --- |
| `features.rms` | overall relative energy, 0–1 | global scale or aperture |
| `features.bass` | low band, 35–250 Hz, 0–1 | weight, expansion, warm colour |
| `features.mid` | mid band, 250–2000 Hz, 0–1 | rotation, deformation, hue |
| `features.high` | high band, 2–10 kHz, 0–1 | emissive light, edge opacity, sparkle |
| `features.bpm` | bounded BPM estimate, available after repeated onset candidates | tempo-labelled UI or phase choice |
| `features.beatPulse` | short 0–1 onset pulse | a ring burst, marker flash or bounded camera accent |

The direct seam is `src/main.js:224-251` → `src/visualizers/tidal-orrery.js:2-116` in the experiment repository. A student keeps the host and replaces only the owned module:

```js
export function createVisualizer({ scene, THREE, features, options }) {
  const root = new THREE.Group();
  scene.add(root);
  return {
    update({ time, motionTime, reducedMotion }) {
      const low = features.bass;
      const mids = features.mid;
      const highs = features.high;
      const pulse = features.beatPulse;
      // Map each signal to a deliberate spatial or material property.
    },
    resize() {},
    dispose() { scene.remove(root); },
  };
}
```

`features.bpm` is an estimate, not a metronome truth. The baseline uses a small energy/onset tracker in `src/rhythm.js` so its threshold, refractory interval and reset behavior can be tested in one lesson. Research extensions may compare spectral flux + autocorrelation, wavelet decomposition or a classical DSP library such as aubio; FFT is useful here, but it is not the only valid BPM method. Do not claim “machine learning” for aubio without evidence.

## Release boundary

L1–L4 are runnable against the current deployed X1 baseline. L5 is a preparation lesson until the X3 relay is tagged. L6 is the release/exhibition gate for the current baseline: tests, evidence, accessibility, AI declaration and defence are ready now. This status is deliberate; the track does not promise an unimplemented WebSocket or Rive runtime.

## The student pitch

> **Make Sound Visible.** Build the best small audiovisual instrument you can defend. Your local audio must drive a real depth-tested 3D scene through the shared Rust/Wasm and Web Audio boundary. Choose a visual metaphor, map sound deliberately, make the controls usable, test the quiet and broken cases, and explain every important decision. The winning project is not the one with the most effects; it is the one whose form, code and evidence belong together.

### Session 1 · Hear and map (4 hours)

| Time | Activity | Evidence before leaving |
| --- | --- | --- |
| 0:00–0:30 | Professor demonstration: Tidal Orrery, architecture map, challenge and rubric | A one-sentence concept and one listener effect |
| 0:30–1:15 | Clone, run `npm test`, open the local server, trace one feature through `audio.js`, `features.js`, Rust and the module | A hand-drawn or photographed data path |
| 1:15–2:00 | Choose a metaphor and write a feature → property → perception table | A1 design card |
| 2:00–3:30 | Implement one bounded mapping and one visible 3D response | A working first vertical slice |
| 3:30–4:00 | Peer test with the common fixture and silence; record one prediction and result | A1 commit, screenshot and short explanation |

### Session 2 · Give sound a body (4 hours)

| Time | Activity | Evidence before leaving |
| --- | --- | --- |
| 0:00–0:30 | Critique: can a listener read the mapping without a legend? | One design revision |
| 0:30–2:00 | Build the owned scene subtree: geometry, materials, camera relationship and depth | A2 working 3D composition |
| 2:00–3:00 | Add play, seek, gain, loop, reset, keyboard path and reduced-motion behavior | A2 interaction checklist |
| 3:00–4:00 | Test silence, invalid input, resize and one failure path; explain the stack choice | A2 commit and evidence note |

### Session 3 · Prove and pitch (4 hours)

| Time | Activity | Evidence before leaving |
| --- | --- | --- |
| 0:00–1:00 | Harden: dispose resources, remove dead controls, check console and build | A3 release candidate |
| 1:00–2:00 | Run tests and capture the common track, silence, reduced motion and mobile states | A3 evidence bundle |
| 2:00–3:15 | Individual defence: two minutes per student plus one question | Stack defence and limitation |
| 3:15–4:00 | Exhibition and peer voting | Deployed URL or reproducible local handoff |

## Required submission

Submit one repository or tagged branch containing:

1. a working visualizer built from the experiment contract;
2. a concept statement and feature-to-visual mapping table;
3. a test/evidence note covering audio, silence, controls, reduced motion and one failure;
4. a two-minute individual defence: one input, one Rust decision, one GPU property, one limitation;
5. an AI-use declaration using the template below;
6. credits for music, textures, models, fonts and code that are not yours.

## Rubric · 100 points

| Criterion | Points | Full-credit evidence |
| --- | ---: | --- |
| Concept and audiovisual authorship | 15 | A specific metaphor; the visual form is intentional and not a generic equalizer. |
| Audio and Rust/Wasm understanding | 20 | Correctly traces local audio → features → Rust mapping → bounded values; explains silence and limits. |
| 3D/GPU craft | 20 | Real depth-tested geometry, materials, camera and spatial composition; performance remains usable. |
| Interaction and accessibility | 15 | Play/seek/gain/loop/reset work; keyboard and reduced-motion paths are usable; labels and status are clear. |
| Engineering quality and evidence | 15 | Tests or repeatable checks, clean console, resource disposal, responsive behavior and a reproducible run. |
| Defence and critical judgement | 10 | Explains one rejected alternative, one limitation and one meaningful trade-off without reading a generated summary. |
| AI practice and declaration | 5 | Declaration is specific, honest and matched by the student’s ability to explain and verify the work. |
| **Total** | **100** | |

AI use is not rewarded for volume. A student who writes every line without understanding cannot receive full marks; a student who uses AI selectively, documents it and verifies the result can.

## AI-use declaration (required)

Add `AI-USE.md` to the submission. **Template** — create `AI-USE.md` and replace every placeholder:

```md
# AI-use declaration

## Tools and dates
- Tool/model:
- Dates or sessions:
- What I supplied as context:

## Contributions
- Explanation, planning or debugging assistance:
- Code or prose generated or transformed:
- Files and sections affected:

## Verification
- Tests and commands I ran:
- Behaviours I checked in the browser:
- One suggestion I rejected and why:
- One limitation or uncertainty that remains:

## Authorship statement
I can explain the architecture, the feature-to-visual mapping, the main interaction path,
and the failure behavior in my own words. I accept responsibility for the submitted work.
```

The declaration must name the tool, contribution and verification. “I used AI” or “AI was only a helper” is insufficient. Do not paste private recordings, credentials or another person’s code into a model. Do not present generated citations, benchmark numbers or understanding that you did not verify.

## Stretch options after the core passes

- Rive for an authored 2D control skin or presentation overlay.
- WebSocket messages for preset/parameter intent, with rate limits and offline fallback.
- Replace the baseline onset estimate with spectral flux, autocorrelation, wavelet or aubio-based analysis, with a comparison note and tests.
- A second visualizer module using the same host contract.

Stretch work cannot compensate for a missing core visualizer, missing evidence or missing AI declaration.
