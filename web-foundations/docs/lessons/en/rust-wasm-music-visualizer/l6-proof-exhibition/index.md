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
status: complete
category: 3d
---

# L6 · Proving and Exhibiting the Instrument

**Master idea:** the demo is the claim; tests, measurements and explanation are the evidence.

## Read the repository

- `rust/src/lib.rs:52-110` contains native tests for hostile inputs, silence, smoothing and frame-rate invariance.
- `test/wasm-boundary.mjs:4-28` checks the compiled Wasm exports, bounded results and replay behavior.
- `test/e2e/instrument.spec.js:30-230` checks the user-facing transport, failure recovery, accessibility and performance boundaries.
- `package.json:5-15` defines the Rust, unit, Wasm, browser and production-build gates.
- `.github/workflows/pages.yml` runs the same gates before deployment.

## Studio move

Run the gates, test the common track, switch to reduced motion, and fault-inject a student module. Record browser, device, frame rate, failure mode and fallback. Prepare a two-minute stack defence that includes one rejected alternative.

## Exit ticket

Submit the release checklist, benchmark note, asset credits, AI-use declaration and one prediction about a code change before running it.

**Grounding:** assessment and scaffolding claims are bounded by the grounded pedagogy notes; the rubric is an instructor decision, not a claimed research effect.

## A release is an argument

Students do not receive marks for a large stack. They receive evidence that their chosen stack serves the intended listening experience:

1. the mapping is original and bounded;
2. the plugin works on the common track and silence;
3. controls have readable labels and keyboard paths;
4. the renderer and network have a fallback story;
5. the student can explain one failure and one rejected alternative.

## Worked proof run

```sh
npm test
npm run build
```

Read the native Rust tests in `rust/src/lib.rs:34-65`, then read the Wasm boundary test in `test/wasm-boundary.mjs:1-15`. The first tests the mapping logic; the second tests that the browser-facing binary exports the expected functions.

## Deliberately broken variation

Remove the silence assertion or make the output unbounded. Ask whether the remaining demo can still be trusted. This is the difference between a visual success and a defensible instrument.

## Defence prompt

“Show me one input, one Rust decision, one GPU property and one observed limitation.” Students should answer from their own diff and test output, not from a generated summary.

## AI-use declaration

AI assistance is permitted when it is declared and verified. Add `AI-USE.md` to the project and record the tool/model, date, context supplied, generated or transformed material, files affected, tests run, browser checks, one suggestion rejected, and one remaining limitation. A vague sentence such as “AI helped me code” is not evidence. The student must be able to explain the submitted architecture and reproduce the important checks without asking the model to speak on their behalf.
