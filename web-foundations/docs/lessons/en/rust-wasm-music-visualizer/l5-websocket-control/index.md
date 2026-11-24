---
layout: lesson
title: 'L5 · Sending Intention Over a Network'
slug: rust-wasm-music-visualizer-l5
date: 2026-11-24
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/rust-wasm-music-visualizer/l5-websocket-control/
description: 'Separate local audio-clock rendering from bounded remote control messages.'
tags: [websocket, axum, rust, realtime]
status: stub
category: js
---

# L5 · Sending Intention Over a Network

**Master idea:** send a command or preset when you can; do not pretend a remote feature stream is shared musical time.

## Current boundary

The X1 repository intentionally has no relay. The student module seam is visible in `src/main.js:163-174`; the X3 lesson becomes runnable after the Axum relay is tagged and two clients pass reconnect/offline checks.

## Preparation exercise

Design a message for one parameter change. State its schema, maximum rate, stale-message policy and offline fallback. Compare it with sending the audio itself.

## Exit ticket

Submit a sequence diagram showing local audio time separately from the remote command path. Do not claim cross-device audio synchronization.

**Grounding:** the WebSocket and timing direction is supported by the indexed platform notes and audio corpus; implementation is deliberately deferred until the relay is verified.
