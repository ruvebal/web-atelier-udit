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
3. Read the [teacher guide]({{ '/lessons/en/rust-wasm-music-visualizer/' | relative_url }}) and begin L1.

## Three studios · 12 hours

| Studio | Lessons | Product evidence |
| --- | --- | --- |
| 1 · Hear, measure, compile | [L1]({{ '/lessons/en/rust-wasm-music-visualizer/l1-rust-browser-boundary/' | relative_url }}) · [L2]({{ '/lessons/en/rust-wasm-music-visualizer/l2-audio-features/' | relative_url }}) | A1: Rust/Wasm mapping, features, silence-safe test |
| 2 · Compose and interact | [L3]({{ '/lessons/en/rust-wasm-music-visualizer/l3-gpu-3d/' | relative_url }}) · [L4]({{ '/lessons/en/rust-wasm-music-visualizer/l4-clocks-controls/' | relative_url }}) | A2: original 3D, controls, lifecycle and stack decision |
| 3 · Connect, prove, defend | [L5]({{ '/lessons/en/rust-wasm-music-visualizer/l5-websocket-control/' | relative_url }}) · [L6]({{ '/lessons/en/rust-wasm-music-visualizer/l6-proof-exhibition/' | relative_url }}) | A3: relay interaction, tests, fallback and defence |

## Release boundary

L1–L4 are runnable against the current deployed X1 baseline. L5 is marked as a preparation lesson until the X3 relay is tagged. L6 is a release/exhibition gate and becomes complete when the tested plugin and competition harness are released. This status is deliberate; the track does not promise an unimplemented WebSocket or Rive runtime.

## Assessment

The challenge is [Make Sound Visible]({{ '/lessons/en/rust-wasm-music-visualizer/' | relative_url }}). Students submit cumulative A1, A2 and A3 versions of the same product, with individual transfer evidence and a short stack defence.
