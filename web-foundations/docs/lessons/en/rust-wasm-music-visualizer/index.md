---
layout: lesson
title: 'Rust/Wasm Music Visualizer — Studio Sequence'
slug: rust-wasm-music-visualizer
date: 2026-11-24
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/rust-wasm-music-visualizer/
description: 'Six executable lessons connecting Rust/Wasm, Web Audio and Three.js through a separately versioned music-visualizer experiment.'
tags: [rust, wasm, web-audio, threejs, 3d, gpu, atelier, music-visualizer]
status: complete
category: 3d
---

# Rust/Wasm Music Visualizer

This is the canonical lesson index for the six-lesson studio. The runnable application is maintained separately in the [Rust/Wasm Music Visualizer experiment repository](https://github.com/ruvebal/rust-wasm-music-visualizer). Start with the [live X1 experiment](https://ruvebal.github.io/rust-wasm-music-visualizer/), then clone the repository when you need to edit code.

| Lesson | Question | Product increment |
| --- | --- | --- |
| [L1 · Rust at the browser boundary](l1-rust-browser-boundary/) | What should Rust own? | A bounded Rust/Wasm mapping call |
| [L2 · Listening before drawing](l2-audio-features/) | What are we measuring? | RMS/bass features and silence |
| [L3 · Giving sound a body](l3-gpu-3d/) | How does sound become space? | An original depth-tested scene |
| [L4 · Animation systems and clocks](l4-clocks-controls/) | What is local time? | Pause, seek, loop and controls |
| [L5 · Sending intention over a network](l5-websocket-control/) | What should cross a network? | A bounded remote preset/control |
| [L6 · Proving and exhibiting the instrument](l6-proof-exhibition/) | What makes the work defensible? | Tests, benchmark and defence |

L1–L4 are runnable against the current X1 baseline. L5 becomes runnable when the X3 relay is tagged; L6 is the release and exhibition gate.
