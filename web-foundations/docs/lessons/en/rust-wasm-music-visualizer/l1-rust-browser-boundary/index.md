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

- `rust/src/lib.rs:5-50` defines the finite, bounded `smooth`, `aperture`, `core_scale` and `radiance` exports.
- `src/main.js:195-209` fetches `visualizer_kernel.wasm`, validates its exports and reports a recoverable error.
- `src/main.js:218-227` smooths the feature channels, maps them through Rust and passes bounded values to the visualizer.
- `package.json:5-11` defines the reproducible build and test gates.

## Studio move

Run `npm test`, then change one mapping in `rust/src/lib.rs` while keeping the return value finite and inside its documented range. Run `npm run build`, open the Vite URL, and predict how the scene changes.

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

1. `transport.features()` returns normalized `{ rms, bass, high }` readings.
2. `kernel.smooth(...)` crosses the WebAssembly boundary for each channel.
3. Rust clamps and maps the channels to `aperture`, `coreScale` and `radiance`.
4. JavaScript receives bounded numbers with an explicit contract.
5. `visualizer.update(...)` changes the owned Three.js scene subtree.

## Deliberately broken variation

Return an unclamped value from one mapping function. Run the silence and bounded-output tests. The point is not to “make it fail”; it is to see why a visual mapping needs a contract at its boundary.

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
