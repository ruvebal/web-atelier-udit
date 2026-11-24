---
layout: lesson
title: 'L6 · Proving and Exhibiting the Instrument'
slug: rust-wasm-music-visualizer-l6
date: 2026-11-24
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/rust-wasm-music-visualizer/l6-proof-exhibition/
description: 'Turn a successful demo into a tested, accessible and defensible release.'
tags: [testing, accessibility, performance, defence]
status: stub
category: 3d
---

# L6 · Proving and Exhibiting the Instrument

**Master idea:** the demo is the claim; tests, measurements and explanation are the evidence.

## Read the repository

- `rust/src/lib.rs:34-65` contains native tests for silence, smoothing and clamping.
- `test/wasm-boundary.mjs:1-15` checks the compiled Wasm exports and bounded results.
- `package.json:5-11` defines `npm test` and the production build.
- `.github/workflows/pages.yml` runs the same gates before deployment.

## Studio move

Run the gates, test the common track, switch to reduced motion, and fault-inject a student module. Record browser, device, frame rate, failure mode and fallback. Prepare a two-minute stack defence that includes one rejected alternative.

## Exit ticket

Submit the release checklist, benchmark note, asset credits, AI-use declaration and one prediction about a code change before running it.

**Grounding:** assessment and scaffolding claims are bounded by the grounded pedagogy notes; the rubric is an instructor decision, not a claimed research effect.
