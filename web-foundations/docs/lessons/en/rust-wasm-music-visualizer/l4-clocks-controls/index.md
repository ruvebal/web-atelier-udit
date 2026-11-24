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
