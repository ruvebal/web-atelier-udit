# Phase X3 — WebSocket relay

## Goal

Add networked control and an optional timestamped feature mode without turning the sprint into a media-streaming course.

## Entry gate

PHASE-X2-REPORT.md is DONE with evidence and cold-review disposition. Recheck facts on the target environment.

## Deliverables

Axum relay; versioned message schema; client connection state; deterministic offline simulator; two-client demo and deployment topology note.

## Scope

Control/preset messages, bounded analysis frames, room policy and reconnect. No raw audio streaming or promise of cross-device sample lock.

## Implementation prompt

Template — execute only after the entry gate passes.

```text
Read INDEX, TECHNICAL-DIRECTOR-CASCADE, SOURCES and this runbook.
Implement explicit message types, sender authority, sequence/epoch handling and state snapshots. Coalesce high-rate visual features; enforce payload and queue limits. Add local/offline mode. Document static-site vs server hosting, HTTPS/WSS and origin/room checks. Demonstrate with two real browser clients and a fault injector.
Run the Acceptance checks below and record actual commands and exits.
Do not mark DONE; hand off the packet for fresh local Qwen cold review.
Use the orchestrator's closing protocol and amend-on-surprise rule.
```

## Acceptance

- [ ] Two clients exchange a preset/parameter through the actual server; disconnect preserves local playback.
- [ ] Tests inject invalid version, oversized payload, nonfinite parameter, stale epoch, duplicate sequence and a slow consumer.
- [ ] Queue limits/drop counters and reconnect snapshot behaviour are observable under sustained overload.
- [ ] A feature-only display is labelled silent; remote clock origins are never treated as local AudioContext times.
- [ ] Server and frontend full suites/builds pass; hosted configuration does not embed secrets.

## Risks

Backlog growth; reconnect storms; public relay abuse; accidental claim that feature streaming transports music.

