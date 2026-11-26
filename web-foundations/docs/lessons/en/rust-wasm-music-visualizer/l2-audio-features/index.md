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

- `src/audio.js:41-55` creates one analyser graph and owns its typed arrays.
- `src/audio.js:145-149` reads the arrays and calls the pure extractor.
- `src/features.js:5-28` computes RMS, bass and highs, including the silence gate.
- `src/main.js:239-244` renders the three feature meters.

## Studio move

Use the common fixture, silence and one student-supplied track. Predict which feature changes first, then compare the overlay. Label the result as energy, not beat detection, unless you implement and test an onset detector.

## Exit ticket

Submit one annotated screenshot and a paragraph explaining why the same bass value can occur in different musical contexts.

**Grounding:** the Web Audio reading corpus grounds timing and analyser concepts; current browser behavior is checked against the implementation and platform documentation.

## Start from the signal

The browser gives us two arrays:

- the time-domain array describes the waveform around the centre line;
- the frequency-domain array describes energy in frequency bins.

The lesson’s `rms` value is a compact estimate of signal energy. The `bass` value is an average of the first portion of the frequency bins. Neither value tells us “the beat” by itself.

## Worked investigation

1. Start the included fixture and write down the overlay.
2. Pause the track: the arrays should settle near zero.
3. Use a quiet recording and a bass-heavy recording.
4. Predict which number changes most, then verify.
5. Record one case where the same `bass` value could mean two different musical events.

## Deliberately broken variation

Change one multiplier in `features.js:14` or `features.js:21` until quiet audio fills the visualizer. Explain why scaling is a calibration choice, not a scientific measurement.

## Vocabulary

| Term | Plain meaning |
| --- | --- |
| sample | One measured value in an audio array |
| RMS | A compact estimate of average signal energy |
| FFT bin | One frequency range in the analyser output |
| analyser | A Web Audio node that exposes time/frequency data without replacing the signal |
| onset | A possible beginning of a musical event; it needs its own detection rule |

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
[BIBLIO-GAP] Reiss analyser node `8cf15ed4-5e14-5490-94cc-e84dc78d4964` and adjacent node `da4bfc68-ad87-5c1c-9945-eb0264420b87` were read from the local extraction corpus; resolver metadata lacks a safe public year. Use current Web Audio platform documentation for implementation claims. Discovery project: Athanor `rust-wasm-music-visualizer`, library `scholar`.
-->
{% endif %}
