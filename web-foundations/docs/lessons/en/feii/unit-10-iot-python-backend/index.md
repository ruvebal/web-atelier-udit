---
layout: lesson
title: 'Unit 10: IoT/Robotics Control-Panel & Python-Backed Interface'
title_alt: 'Unidad 10: Panel de Control IoT/Robótica e Interfaz con Backend Python'
slug: feii-unit-10-iot-python-backend
date: 2026-08-20
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-10-iot-python-backend/
description: 'IoT/robotics control-panel development: WebSocket real-time data, device APIs, Python-backed interfaces, and the component model beyond REST/GraphQL — a declared pedagogical pilot.'
tags:
  [
    feii,
    iot,
    robotics,
    websockets,
    python-backend,
    real-time,
    control-panel,
    interface-layer,
  ]
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"Optimize not for the device you hold, but for the connection you cannot see."_
> — Tao of Development, `img-032`

> **AI Assistance Disclosure:** Assistants draft WebSocket hooks and FastAPI endpoints fluently. You remain responsible for connection lifecycle (open/reconnect/close) and the merge log. Same ACCEPT / REJECT discipline as [Unit 6]({{ '/lessons/en/feii/unit-6-ai-code-review/' | relative_url }}) and the [AI-Assisted 3D covenant]({{ '/lessons/en/feii/ai-assisted-3d-covenant/' | relative_url }}) (device/network state is a different failure surface than a 3D scene, same review habit applies).

**Code in this unit:** every fence is an **Excerpt** unless labelled otherwise — illustrative device-control and WebSocket patterns, not a routed CodeSandbox lesson. The data-source specification near the end is a **Template**: values must be replaced once the Back-End II synergy sheet (Phase 5) lands.

---

## Scholarly honesty — this block is a declared pilot

Interface-*transfer* pedagogy for WebSocket/IoT/Python-backend interfaces has **no** peer-reviewed coat in the course vault. That is an explicit **`[UNVERIFIED-GAP]`**, not a footnote — same status as Units 8–9.

Two IoT-education-specific coats are named in the grounding matrix and were checked live this session, not assumed from a prior pass:

- Abichandani et al. (2022), *Internet-of-Things Curriculum, Pedagogy, and Assessment* — coat `10_1109_access_2022_3164709_08eb5ba5`. `ahmes status` reports `evaluator_safe: no` (confidence 0.70, LLM-extracted). `ahmes enrich --meta --online` was attempted this session: result **"Host registry mismatch — identifiers only,"** 0 nodes enriched — the online registry's title disagrees with this PDF's own heading, so Ahmes correctly refused a silent override rather than force a match. **Genuine content gap — `[BIBLIO-GAP]`.**
- Ciungan et al. (2025), *Enhancing IoT Education Through Hybrid Robotic Arm Integration* — coat `applsci_15_10537_26eedf9b`. Same check: `evaluator_safe: no` (confidence 0.70). `ahmes enrich --meta --online` attempted: 0 nodes enriched, no online registry match found. **Genuine content gap — `[BIBLIO-GAP]`.**

Neither is cited as evidence below. What *is* cited grounds vocabulary and technique, never "this sequence teaches interface transfer well":

- Real-time bidirectional web communication is a measured, adopted pattern, not a course convenience (Murley, Ma, Mason, Bailey & Kharraz 2021, *WebSocket Adoption and the Landscape of the Real-Time Web*, WWW'21; DOI `10.1145/3442381.3450063`; coat `3442381_3450063_3ee00512` · nodo `40a6fdfe-be41-575f-a1d0-5c2964feaa60` · p. 1) — `(Murley 2021, 1)`. <!-- provenance: resolved live 2026-08-20 via `ahmes query --cite --require-evaluator-safe`, evaluator_safe=yes, confidence 0.95 (crossref). -->
- IoT data streams and dashboards carry an accessibility dimension from the start — semantic HTML5 and WAI-ARIA over raw sensor values, not an afterthought (Stelea, Sangeorzan & Enache-David 2025, *Accessible IoT Dashboard Design with AI-Enhanced Descriptions for Visually Impaired Users*; DOI `10.3390/fi17070274`; coat `futureinternet_17_00274_v2_c91a8b55` · nodo `bef656b5-408d-5961-aadf-bce6ddef958b` · p. 1) — `(Stelea 2025, 1)`. <!-- provenance: resolved live 2026-08-20, evaluator_safe=yes, confidence 0.95 (crossref). Cross-links the grounding matrix's cross-cutting accessibility rule. -->
- Copilot-class tools raise speed while students **accept suggestions without reflecting** — the same gate as Units 8–9, reused here for the AI-declaration framing on any generated WebSocket/FastAPI code, not as new IoT evidence (Shihab et al. 2025; coat `2506_10051_copilot_brownfield_29f3d2f5` · nodo `1d671902-3c68-5ad4-9b08-198236f1d5e5` · p. 9) — `(Shihab 2025, 9)`. <!-- provenance: re-verified live 2026-08-20, evaluator_safe=yes; matrix row 10 names this node explicitly as "evaluator_safe=yes for AI oral." -->

You are inside the gap: connection-lifetime discipline and the human-machine-interface membrane are what this unit teaches as primitives, not a validated finding that this teaching sequence works.

**Platform notes** (checked 2026-08-20): `fastapi@0.121` (Python ≥3.10) · WebSocket API is a browser standard (no npm version to pin) · React `useEffect`/`useState` as already taught in FE I. Vendor/spec docs are HOW, not bibliography.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- **See the data-source transfer** — Same component model (props, state, hooks); the data source's *shape* changes from stateless request/response to a stateful, bidirectional connection.
- **Implement WebSocket connections with a full lifecycle** — Connect, reconnect, and **close** — not just `onmessage`.
- **Build a control-panel interface** — React components driven by live device/sensor state.
- **Consume a Python-backed service** — REST and WebSocket endpoints from a FastAPI backend.
- **Declare AI assistance** — Log ACCEPT / REJECT on any AI-drafted hook or endpoint (same discipline as Units 6, 8, 9).

---

## 📖 Beyond REST/GraphQL

Most interfaces consume REST or GraphQL. IoT/robotics needs a different shape:

```
┌─────────────────────────────────────────────────────────┐
│           DATA SOURCE TRANSFER                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   REST/GraphQL API        IoT/Robotics/Python Service     │
│   ┌─────────────┐         ┌─────────────┐              │
│   │ request/response      │ WebSocket    │              │
│   │ JSON over HTTP         │ Bi-directional│              │
│   │ Stateless              │ Stateful     │              │
│   └─────────────┘         └─────────────┘              │
│                                                          │
│   Same component model: props, state, hooks               │
│   Different data source: HTTP vs WebSocket vs Device API  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Key insight:** The component model stays the same. Only the data source's shape changes — and a stateful connection has a lifecycle a stateless request never had (Murley 2021, above): it opens, it can drop, it must be closed. That lifecycle is this unit's real subject.

---

## 🤖 IoT/Robotics APIs — Excerpt

Illustrative, not runnable as-is — no `robot-api.local` exists.

### Device Control API

```js
// Example: robotic arm control — Excerpt
async function moveArm(x, y, z) {
  const response = await fetch('http://robot-api.local/move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ x, y, z }),
  });
  return response.json();
}
```

### Sensor Data Stream (one-shot poll)

```js
// Example: temperature sensor — Excerpt
async function getSensorData() {
  const response = await fetch('http://sensor-api.local/temperature');
  return response.json(); // { temperature: 23.5, humidity: 45 }
}
```

A one-shot poll is the REST shape applied to a device — it works, but it does not scale to a continuous stream. That is what WebSocket is for.

---

## 🔄 WebSocket — the full connection lifecycle (not just `onmessage`)

**Excerpt.** Most WebSocket tutorials show only `onmessage` and skip what makes a real interface: reconnect and cleanup.

```js
function useDeviceStream(url) {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let socket;
    let reconnectTimer;

    function connect() {
      socket = new WebSocket(url);

      socket.onopen = () => setConnected(true);
      socket.onmessage = (event) => setData(JSON.parse(event.data));
      socket.onclose = () => {
        setConnected(false);
        // reconnect after a delay — the "connection you cannot see" failing gracefully
        reconnectTimer = setTimeout(connect, 2000);
      };
    }

    connect();

    // cleanup: without this, navigating away leaks a live socket
    return () => {
      clearTimeout(reconnectTimer);
      if (socket) socket.close();
    };
  }, [url]);

  return { data, connected };
}
```

### Control Panel Component

```jsx
function DeviceControlPanel() {
  const { data: sensorData, connected } = useDeviceStream(
    'ws://localhost:8000/device-stream',
  );
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

  const handleMove = async () => {
    await moveArm(position.x, position.y, position.z);
  };

  return (
    <div className="control-panel">
      <h2>Device Control</h2>
      <p>Status: {connected ? 'Connected' : 'Reconnecting…'}</p>
      <p>Reading: {sensorData?.value}</p>

      <div className="controls">
        <input
          type="number"
          value={position.x}
          onChange={(e) =>
            setPosition({ ...position, x: Number(e.target.value) })
          }
        />
        <button onClick={handleMove}>Move</button>
      </div>
    </div>
  );
}
```

---

## 🐍 Python-Backed Services — Excerpt

### FastAPI

```python
# main.py — Excerpt
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/device-control")
async def device_control(deviceId: str, command: str, params: dict):
    # Control physical device or simulator here
    return {"status": "success", "deviceId": deviceId, "command": command}

@app.websocket("/device-stream")
async def device_stream(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = {"value": read_sensor(), "timestamp": now_ms()}
            await websocket.send_json(data)
            await asyncio.sleep(1)
    except Exception:
        # a dropped client raises here — the server side of "connection you cannot see"
        pass
```

Pinned as of **August 2026**, re-verify before the term starts:

| Package | Version | Note |
| --- | --- | --- |
| `fastapi` | `0.121` | Python ≥ 3.10 |
| `uvicorn` | `^0.34` | ASGI server to run the app above |

---

## 🎯 Data Source Specification — Template

**NOTE:** This unit requires coordination with the Back-End II synergy sheet (Phase 5). The specific data source below is a placeholder pending that synergy sheet — **replace every value below, do not ship the placeholder to Entrega 2.**

- **Type:** Mock WebSocket service (simulating an IoT device) — *replace with the real Back-End II endpoint*
- **Endpoint:** `ws://localhost:8000/device-stream` — *replace with the synergy-sheet URL*
- **Data Schema:** `{ deviceId: string, sensorType: string, value: number, timestamp: number }` — *confirm against the actual service's schema*
- **Control API:** `POST http://localhost:8000/device-control` with `{ deviceId, command, params }` — *confirm against the actual service's contract*

---

## Lab (team) — workplace-like · 4 h

On the shared Entrega 2 repo, alongside Units 8–9's 3D core:

1. Wire the placeholder mock WebSocket stream above into the project as a live-data panel, **or** stand up the FastAPI control-panel skeleton if your seed needs device-control state rather than a stream — pick the one your team's backlog issue actually needs.
2. Implement the **full connection lifecycle**: connect, reconnect on drop, and `close()` on unmount. A hook that never closes is not done.
3. Write a short release note: which reconnect strategy you chose (fixed delay, backoff, none) and why.
4. Log every AI-assisted diff ACCEPT / REJECT ([Unit 6]({{ '/lessons/en/feii/unit-6-ai-code-review/' | relative_url }}) workflow).
5. Human review after any AI review; CI green.

**Deliverable:** branch on the shared repo + `docs/ai-declaration-log.md` row + the release note above.

---

## Exercises (individual) — decontextualised · ~1 h

Not the showroom. Isolate the strategy:

1. **Diagnostic:** given a `useDeviceStream` hook whose `useEffect` never returns a cleanup function, explain what leaks when the component unmounts and fix it.
2. **Solvable without AI, declared as such:** for three data-shape descriptions — (a) a one-shot "turn on the light" command, (b) a continuous temperature stream, (c) an occasional "device is alive" ping — decide REST, WebSocket, or polling for each, one sentence of justification each.
3. Write two sentences: what is the same as consuming a REST API in React, and what is genuinely new about a stateful connection.

<!-- Professor answer sketch, not the student handout: (1) missing `socket.close()` in the cleanup return — the old socket keeps receiving/reconnecting after the component is gone, duplicating state updates or throwing on a stale closure. (2) a=REST (one-shot, fire-and-forget), b=WebSocket (continuous, low-latency, bidirectional not required but the shape fits), c=polling or a lightweight heartbeat WebSocket message, not a fresh REST call per ping. -->

---

## 📚 Platform notes (HOW, not bibliography)

- FastAPI — https://fastapi.tiangolo.com/
- WebSocket API (MDN) — https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
- WHATWG WebSocket protocol — https://websockets.spec.whatwg.org/

---

## Session outcome

You can consume a stateful, bidirectional data source with the same component model FE I taught for REST — and you know the lifecycle a stateless request never had. This unit is **load-bearing** for the Full-Stack ↔ Data-Science synergy: Full-Stack students build the Python backend, Data-Science students consume it. Units 8–10 together seed Entrega 2; [Unit 11]({{ '/lessons/en/feii/unit-11-capstone-integration/' | relative_url }}) integrates all three.

**Phase 5 dependency:** the placeholder data source above is not the Entrega 2 deliverable — replace it once the Back-End II synergy sheet lands.

---

> _"Ship the module when it works alone. Ship the system when the modules work together. Ship the platform when the systems work together."_
> — Tao of Development, `arch-007`
