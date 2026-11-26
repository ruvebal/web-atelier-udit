---
layout: lesson
title: 'L4 · Animation Systems and Clocks'
slug: rust-wasm-music-visualizer-l4
date: 2026-11-24
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/rust-wasm-music-visualizer/l4-clocks-controls/
description: 'Distinguish audio transport, frame time and authored animation while building reliable controls.'
tags: [animation, clocks, accessibility, rive, threejs]
status: complete
category: animations
---

# L4 · Animation Systems and Clocks

**Master idea:** local audio time, frame time and authored animation are related clocks, not one clock. Tidal Orrery keeps an independent authored orbit so the form remains alive when audio is paused.

## Read the repository

- `src/main.js:212-245` calculates `delta`, reads features and renders the frame.
- `src/audio.js:20-35` handles metadata, time updates, end and error states.
- `src/main.js:123-156` wires play, file replacement, seek, loop, gain, smoothing and reset.
- `index.html:20-56` exposes the keyboard-reachable controls.
- `src/main.js:107-120` demonstrates the renderer-failure and recovery states.

## Studio move

Test pause, seek, end, loop and an unreadable input. Then compare the supplied Three.js motion with a Rive control-skin proposal. Rive is an expressive option, not a substitute for the required true-3D scene.

## Exit ticket

Record one lifecycle bug you found, the state transition that fixes it, and the reduced-motion or renderer-failure behavior.

**Grounding:** audio-clock reasoning is grounded in the indexed sound sources; Rive capability claims remain gated by the verified runtime specimen.

## Three clocks, in plain language

- **Audio time:** where the track is (`currentTime`).
- **Frame time:** how much time passed since the last animation frame (`delta`).
- **Authored motion time:** a bounded elapsed clock used for the quiet orbit; it is not a claim that the audio is still playing.

Do not use frame count as seconds. A 120 Hz screen and a 60 Hz screen must reach the same visual state after the same elapsed duration.

## Worked lifecycle walkthrough

1. Press Play and observe `Playing Studio test tone`.
2. Pause and verify the button and status change.
3. Seek after metadata loads.
4. Turn Loop on and let the fixture reach its end.
5. Toggle reduced motion and compare the same features with the fixed spatial rule.
6. Explain what happens if WebGL creation fails at `main.js:82-104`.

## Deliberately broken variation

Replace `delta` with a fixed `0.016` in a local branch. Explain why the result changes with refresh rate, why the idle orbit must not be derived from a paused audio clock, and why a reduced-motion mode must preserve state without preserving every movement.

## Rive boundary

Rive may provide an authored control skin or animation state machine. It does not automatically provide the required true-3D depth scene. Students must name which clock drives Rive and which clock drives Three.js.
