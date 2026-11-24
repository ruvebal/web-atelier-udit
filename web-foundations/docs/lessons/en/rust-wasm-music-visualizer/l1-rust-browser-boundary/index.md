---
layout: lesson
title: 'L1 · Rust at the Browser Boundary'
slug: rust-wasm-music-visualizer-l1
date: 2026-11-24
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/rust-wasm-music-visualizer/l1-rust-browser-boundary/
description: 'Trace one normalized audio sample from JavaScript into Rust/Wasm and back to a Three.js scale.'
tags: [rust, wasm, ownership, interop]
status: complete
category: 3d
---

# L1 · Rust at the Browser Boundary

**Master idea:** the browser owns orchestration; Rust owns a small, testable mapping function.

## Read the repository

- `rust/src/lib.rs:8-32` exports `set_gain`, `set_smoothing`, `reset` and `step`.
- `src/main.js:75-84` fetches `visualizer_kernel.wasm` and exposes its exports.
- `src/main.js:182-184` calls `kernel.step(features.rms, features.bass, ...)` and applies the returned scale.
- `package.json:5-11` defines the reproducible build and test gates.

## Studio move

Run `npm test`, then change the formula in `step` while keeping the return value finite and within `0.78..=3.6`. Run `npm run build`, open the Vite URL, and predict how the scene changes.

## Exit ticket

Draw the data path and explain why the browser, not Rust, owns audio decoding and rendering. Show one passing test for silence.

**Grounding:** Rust ownership and boundary decisions are supported by the indexed Rust corpus; exact implementation claims are verified against this repository.
