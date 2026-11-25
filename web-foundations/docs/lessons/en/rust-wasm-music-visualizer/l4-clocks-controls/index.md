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

**Master idea:** local audio time, frame time and authored animation are related clocks, not one clock.

## Read the repository

- `src/main.js:176-191` calculates `delta`, reads features and renders the frame.
- `src/main.js:129-136` handles metadata, time updates, end and error states.
- `src/main.js:138-161` wires play, file replacement, seek, loop, gain and smoothing.
- `index.html:27-35` exposes the keyboard-reachable controls.
- `src/main.js:37-46` demonstrates the renderer-failure state.

## Studio move

Test pause, seek, end, loop and an unreadable input. Then compare the supplied Three.js motion with a Rive control-skin proposal. Rive is an expressive option, not a substitute for the required true-3D scene.

## Exit ticket

Record one lifecycle bug you found, the state transition that fixes it, and the reduced-motion or renderer-failure behavior.

**Grounding:** audio-clock reasoning is grounded in the indexed sound sources; Rive capability claims remain gated by the verified runtime specimen.

## Three clocks, in plain language

- **Audio time:** where the track is (`currentTime`).
- **Frame time:** how much time passed since the last animation frame (`delta`).
- **Wall-clock estimate:** `performance.now()`, useful for a gentle phase or diagnostic.

Do not use frame count as seconds. A 120 Hz screen and a 60 Hz screen must reach the same visual state after the same elapsed duration.

## Worked lifecycle walkthrough

1. Press Start and observe `Playing local fixture`.
2. Pause and verify the button and status change.
3. Seek after metadata loads.
4. Turn Loop on and let the fixture reach its end.
5. Choose the Pulse rings visualizer and compare the same features with a different motion rule.
6. Explain what happens if WebGL creation fails at `main.js:37-43`.

## Deliberately broken variation

Replace `delta` with a fixed `0.016` in a local branch. Explain why the result changes with refresh rate and why a reduced-motion mode must preserve state without preserving every movement.

## Rive boundary

Rive may provide an authored control skin or animation state machine. It does not automatically provide the required true-3D depth scene. Students must name which clock drives Rive and which clock drives Three.js.
