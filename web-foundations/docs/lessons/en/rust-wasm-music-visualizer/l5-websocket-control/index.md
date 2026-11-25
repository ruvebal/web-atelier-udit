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

## Start from the network question

The useful message is usually small: “select preset 3” or “set gain to 1.4,” not “send the whole song.” The local browser remains responsible for hearing the track and animating the frame. A remote message changes an intention at a later moment.

## Preparation message

```json
{
  "type": "set-parameter",
  "name": "gain",
  "value": 1.4,
  "sequence": 12
}
```

Before implementation, decide what happens when sequence 11 arrives after sequence 12, when the connection closes, and when a student sends 1,000 messages per second.

## Deliberately broken variation

Pretend every remote message is a new audio frame. Draw the resulting failure: network delay becomes visible musical jitter. The X3 relay must bound, coalesce or reject messages before it becomes a student requirement.

## Current status

This page is teachable as a protocol-design lesson. It must not be presented as a completed WebSocket implementation until the experiment repository contains the tagged relay, two-client test and offline fallback.
