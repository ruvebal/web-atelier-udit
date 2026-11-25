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

## Start from zero Rust

Read this function as a small machine:

```rust
pub extern "C" fn step(rms: f32, bass: f32, elapsed_seconds: f32) -> f32 {
    let input = (rms * 0.55 + bass * 0.45).clamp(0.0, 1.0);
    input
}
```

`fn` introduces a function. The names inside parentheses are inputs. `f32` is the input and output type. `let` gives a value a name. The final expression is returned because it has no semicolon. Before reading the full implementation, predict what happens when `rms` and `bass` are both zero.

## Worked trace

1. `featureValues()` in JavaScript returns `{ rms, bass }`.
2. `kernel.step(...)` crosses the WebAssembly boundary.
3. Rust clamps and smooths the values.
4. JavaScript receives one number named `scale`.
5. `group.scale.lerp(...)` changes the Three.js group.

## Deliberately broken variation

Return `rms * 1000.0` without clamping. Run the silence and bounded-output tests. The point is not to “make it fail”; it is to see why a visual mapping needs a contract at its boundary.

## Vocabulary

| Term | Plain meaning |
| --- | --- |
| Rust | The language used for the small mapping kernel |
| Wasm | A portable binary format the browser can execute |
| export | A function made visible to JavaScript |
| clamp | Keep a number inside a safe interval |
| boundary | The point where one system hands data to another |

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
[BIBLIO-GAP] Rust books were semantically indexed through the dedicated Athanor project `rust-wasm-music-visualizer`, but fresh resolver metadata is incomplete. Do not publish a fabricated author-date citation. Use the repository and official Rust documentation for implementation claims; retain the EPUBs as reading sources pending reconciliation.
-->
{% endif %}
