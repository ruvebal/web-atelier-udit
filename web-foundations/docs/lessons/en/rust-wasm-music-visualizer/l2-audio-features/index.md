---
layout: lesson
title: 'L2 · Listening Before Drawing'
slug: rust-wasm-music-visualizer-l2
date: 2026-11-24
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/rust-wasm-music-visualizer/l2-audio-features/
description: 'Interpret time-domain and frequency-domain audio features before mapping them to visuals.'
tags: [rust, wasm, web-audio, fft, rms]
status: complete
category: media
---

# L2 · Listening Before Drawing

**Master idea:** an analyser measurement is not automatically a musical event.

## Read the repository

- `src/main.js:86-97` fills the time-domain and frequency-domain arrays.
- `src/main.js:90-92` computes RMS energy.
- `src/main.js:93-96` averages low frequency bins into the bass feature.
- `src/main.js:190` renders the diagnostic `RMS … · Bass …` overlay.

## Studio move

Use the common fixture, silence and one student-supplied track. Predict which feature changes first, then compare the overlay. Label the result as energy, not beat detection, unless you implement and test an onset detector.

## Exit ticket

Submit one annotated screenshot and a paragraph explaining why the same bass value can occur in different musical contexts.

**Grounding:** the Web Audio reading corpus grounds timing and analyser concepts; current browser behavior is checked against the implementation and platform documentation.
