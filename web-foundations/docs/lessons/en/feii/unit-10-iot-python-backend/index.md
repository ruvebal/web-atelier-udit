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
status: complete
---

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> A control panel is an operational membrane between live systems and human decisions.</p>
<p><strong>Field lens:</strong> **Practice anchor:** interface-layer planning, human factors, testing, and safe status feedback. **Frontier signal:** WebSockets, Python services, robotics, and real-time dashboards are expanding the field. **Pedagogy status:** IoT interface-layer curriculum is grounded; FE-to-device transfer remains a pilot.</p>
</aside>
>
> **Studio test:** Test open/reconnect/close, stale data, safe action, and accessible status.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"Optimize not for the device you hold, but for the connection you cannot see."_
> — Tao of Development, `img-032`
{: .tao-development-quote }

> **AI Assistance Disclosure:** Assistants draft WebSocket hooks and FastAPI endpoints fluently. You remain responsible for connection lifecycle (open/reconnect/close) and the merge log. Same ACCEPT / REJECT discipline as [Unit 6]({{ '/lessons/en/feii/unit-6-ai-code-review/' | relative_url }}) and the [AI-Assisted 3D covenant]({{ '/lessons/en/feii/ai-assisted-3d-covenant/' | relative_url }}) (device/network state is a different failure surface than a 3D scene, same review habit applies).

**Code in this unit:** every fence is an **Excerpt** unless labelled otherwise — illustrative device-control and WebSocket patterns. The versioned local lab contract below is a **Template**: copy it unchanged first, then document any project-specific contract change rather than silently substituting an endpoint. The flagship **Streamfield** rehearsal lives in the course `react-template` sandbox as route `/ex6-streamfield` — read the [file map](#flagship-sandbox--streamfield) before judging the graphics.

---

## Research frame — this sequence is a pilot

A review of IoT curricula identifies interface-layer planning, human factors,
software/hardware testing, dashboards, and active learning as recurring design
concerns (Abichandani et al. 2022, 7–8). It supports the vocabulary and design
object used here; it does not test this FE-to-device transfer sequence. Treat
the sequence as a studio hypothesis to verify through lifecycle, stale-data,
safe-action, and accessibility tests.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
The narrower FE *transfer* claim — carrying a component/state model from ordinary web APIs to device telemetry and Python-backed control — has no direct peer-reviewed coat in the course vault. That is an explicit **`[UNVERIFIED-GAP]`**, not a footnote.
-->
{% endif %}

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
The evaluator-safe Ahmes review grounds the vocabulary and design object, never the claim that this sequence teaches interface transfer well:
-->
{% endif %}

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- Abichandani, Sivakumar, Lobo, Iaboni &amp; Shekhar (2022), *Internet-of-Things Curriculum, Pedagogy, and Assessment for STEM Education: A Review of Literature* — coat `10_1109_access_2022_3164709_08eb5ba5`; interface-layer nodes `ed35202e-baa9-59d9-b12b-73134e0b5127` and `0b94a031-2b3c-5dd5-83d7-6fb593ddc68f`, p. 7 — `(Abichandani 2022, 7)`, `evaluator_safe=yes`.
-->
{% endif %}
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- The same review's dashboard and active-learning nodes `cc6fa3cc-85e3-5eda-8622-380b11e830e5` and `0ea742b2-67e3-54a4-af0a-cebef3ef1c7f`, p. 8 — `(Abichandani 2022, 8)`, `evaluator_safe=yes`.
-->
{% endif %}
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- The 2025 robotics coat named in the older matrix is deliberately excluded: its Ahmes resolver still returns `evaluator_safe=no`. No unsafe bibliography record is promoted.
-->
{% endif %}

- Real-time bidirectional web communication is a measured, adopted pattern, not a course convenience (Murley 2021, 1).
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- Real-time bidirectional web communication is a measured, adopted pattern, not a course convenience (Murley, Ma, Mason, Bailey & Kharraz 2021, *WebSocket Adoption and the Landscape of the Real-Time Web*, WWW'21; DOI `10.1145/3442381.3450063`; coat `3442381_3450063_3ee00512` · nodo `40a6fdfe-be41-575f-a1d0-5c2964feaa60` · p. 1) — `(Murley 2021, 1)`. Pre-round 2026-11-11: DevIAC vector + GraphRAG discovery reconfirmed the same coat (`project_slug=profield-frontend-pedagogy`); graph vault unresolved for entity hops — citation still Ahmes-node only. Prior resolve 2026-08-20 `evaluator_safe=yes`.
-->
{% endif %}
- IoT data streams and dashboards carry an accessibility dimension from the start: semantic HTML5 and WAI-ARIA over raw sensor values, not as an afterthought (Stelea 2025, 1).
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- IoT data streams and dashboards carry an accessibility dimension from the start — semantic HTML5 and WAI-ARIA over raw sensor values, not an afterthought (Stelea, Sangeorzan & Enache-David 2025, *Accessible IoT Dashboard Design with AI-Enhanced Descriptions for Visually Impaired Users*; DOI `10.3390/fi17070274`; coat `futureinternet_17_00274_v2_c91a8b55` · nodo `bef656b5-408d-5961-aadf-bce6ddef958b` · p. 1) — `(Stelea 2025, 1)`. <!&#45;&#45; provenance: resolved live 2026-08-20, evaluator_safe=yes, confidence 0.95 (crossref). Cross-links the grounding matrix's cross-cutting accessibility rule.
-->
{% endif %}
- Copilot-class tools can raise speed while students accept suggestions without reflecting. That concern supports the AI-declaration and review requirement for generated WebSocket/FastAPI code; it is not IoT evidence (Shihab 2025, 9).
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- Copilot-class tools raise speed while students **accept suggestions without reflecting** — the same gate as Units 8–9, reused here for the AI-declaration framing on any generated WebSocket/FastAPI code, not as new IoT evidence (Shihab et al. 2025; coat `2506_10051_copilot_brownfield_29f3d2f5` · nodo `1d671902-3c68-5ad4-9b08-198236f1d5e5` · p. 9) — `(Shihab 2025, 9)`. <!&#45;&#45; provenance: re-verified live 2026-08-20, evaluator_safe=yes; matrix row 10 names this node explicitly as "evaluator_safe=yes for AI oral."
-->
{% endif %}

You are inside the gap: connection-lifetime discipline and the human-machine-interface membrane are what this unit teaches as primitives, not a validated finding that this teaching sequence works.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
**Evidence update (2026-08-23):** teach the chain `sensor → transport → service/state → interface → human decision`. Assess live/stale/offline/reconnecting/error states, safe commands, accessibility, and an individual transfer explanation. The current ESP32-dashboard and undergraduate IoT-P2BL studies are web-only research leads recorded in the dated FE II gap-pass record in the research repository copy; they do not close the FE transfer gap.
-->
{% endif %}

**Platform notes** (checked 2026-11-11): `fastapi@0.121` (Python ≥3.10) · WebSocket API is a browser standard (no npm version to pin) · `msw@3` WebSocket mocking (`ws.link` / `connection`) for the Streamfield sandbox · React `useEffect`/`useState` as already taught in FE I. Vendor/spec docs are HOW, not bibliography.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- **See the data-source transfer** — Same component model (props, state, hooks); the data source's *shape* changes from stateless request/response to a stateful, bidirectional connection.
- **Name a telemetry frame** — Know that `snapshot(sequence)` builds one JSON message (not a Rive Snapshot), and map its fields to the Streamfield graphics.
- **Implement WebSocket connections with a full lifecycle** — Connect, reconnect, and **close** — not just `onmessage`.
- **Build a control-panel interface** — React components driven by live device/sensor state, including a visual membrane that can go live/stale/offline.
- **Trace the Streamfield file map** — Say what `contract`, `handlers`, `useDeviceStream`, continuum, RIS, and aura each own.
- **Mock or run the stream** — Rehearse against an MSW (or other) WebSocket mock before (or beside) a FastAPI process; know which tool owns which test layer.
- **Consume a Python-backed service** — REST and WebSocket endpoints from a FastAPI backend.
- **Declare AI assistance** — Log ACCEPT / REJECT on any AI-drafted hook or endpoint (same discipline as Units 6, 8, 9).

---

## 📖 Beyond REST/GraphQL

Most interfaces consume REST or GraphQL. IoT/robotics needs a different transport shape — not a different React model.

<figure class="spectacle-image" markdown="0">
<img src="{{ '/assets/images/feii/unit-10/websocket-membrane-v1.svg' | relative_url }}" alt="Device and control panel exchange frames through an open WebSocket membrane; states live, reconnecting, and closed" width="680" height="420" loading="lazy" />
<figcaption>
<p>WebSocket as an operational membrane: one open channel, many frames, and states the panel must show.</p>
<p class="image-credit">visual-forger · studio figure · websocket-membrane-v1</p>
</figcaption>
</figure>

| | REST / GraphQL | WebSocket (this unit) |
| --- | --- | --- |
| Shape | request → response | open channel → many messages |
| State | stateless per call | stateful connection |
| Lifecycle you own | almost none | open · drop · reconnect · **close** |
| Typical use here | one-shot command (`POST …/commands`) | continuous telemetry stream |

**Key insight:** The component model stays the same (props, state, hooks). Only the data source's shape changes — and a stateful connection has a lifecycle a stateless request never had (Murley 2021, 1). That lifecycle is this unit's real subject.

### Vocabulary — frame vs snapshot

Students often meet two different words for the same JSON blob, and a third word from Rive that means something else entirely:

| Word in this unit | Means | Does **not** mean |
| --- | --- | --- |
| **Telemetry frame** | One JSON message on the wire (one tick of the stream) | A screenshot or browser Snapshot API |
| **`snapshot(sequence)`** | The **function name** in the Python Template and `contract.js` that *builds* that frame | A Rive AnimaScript `Snapshot` (audio/layout lane) |
| **History ring** | The last ~48 `readings` kept in the hook for drawing | The live connection itself |

When the lesson or Ex6 says “latest frame,” it means the last object returned by `snapshot(n)` / received in `onmessage`.

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

## Flagship sandbox — Streamfield

The membrane is easier to defend when you can **see** live / stale / reconnecting *and* name which file owns each part. Ex6 is not a mystery dashboard: it is the Entrega 2 `lab-01` contract made audible-visible.

**Open:** in `react-template`, run Vite and open `/ex6-streamfield`. Start with **MSW mock**, aura **off**. Read the JSON frame in the side panel first; then the continuum ribbon; then the RIS. Toggle aura only after you can explain the SVG without it.

### What one frame looks like

<figure class="spectacle-image" markdown="0">
<img src="{{ '/assets/images/feii/unit-10/telemetry-frame-v1.svg' | relative_url }}" alt="Sequence of telemetry frames on a WebSocket wire with JSON fields mapped to RIS radius, ring opacity, and ripple" width="680" height="460" loading="lazy" />
<figcaption>
<p>One telemetry frame on the wire. <code>snapshot(sequence)</code> builds that JSON; the graphics map fields to geometry.</p>
<p class="image-credit">visual-forger · studio figure · telemetry-frame-v1</p>
</figcaption>
</figure>

| Field | Role | Where you see it in Ex6 |
| --- | --- | --- |
| `deviceId` | Which simulated device | Readout |
| `online` | Device claims presence | Part of the frame (panel can still be reconnecting) |
| `readings.temperatureC` | Primary continuous value | Continuum **Y**; RIS **radius** |
| `readings.humidityPct` | Secondary continuous value | RIS **ring opacity**; continuum label |
| `sequence` | Frame order (monotonic) | RIS **ripple**; readout |
| `timestamp` | Wall clock of the frame | Freshness / stale risk |

### File map — every participant

<figure class="spectacle-image" markdown="0">
<img src="{{ '/assets/images/feii/unit-10/streamfield-files-v1.svg' | relative_url }}" alt="Flow from contract and MSW handlers through useDeviceStream into Ex6 page, then StreamReadout, RIS and continuum, and optional StreamAura" width="680" height="520" loading="lazy" />
<figcaption>
<p>Who owns what in <code>src/streamfield/</code>. Green leaves are operational truth; grey aura is optional atmosphere.</p>
<p class="image-credit">visual-forger · studio figure · streamfield-files-v1</p>
</figcaption>
</figure>

| File | Owns | Teach with |
| --- | --- | --- |
| `contract.js` | `STREAM_URL` + `snapshot(sequence)` shape | Compare to the Python Template’s `snapshot` |
| `handlers.js` | MSW `ws.link` → `client.send` every 1 s | “Mock owns transport when FastAPI is down” |
| `browser.js` | Start/stop the service worker for this route | Toggle MSW ↔ live must **stop** the interceptor |
| `useDeviceStream.js` | open · `onmessage` · backoff reconnect · `close` on unmount | History ring (~48 readings) feeds the SVGs |
| `Ex6Streamfield.jsx` | Source toggle, aura toggle, composition | Page is wiring — not business logic |
| `StreamReadout.jsx` | Status, freshness, field → graphic map, **latest JSON** | Human decision surface |
| `StreamContinuum.jsx` | Time-domain ribbon (Catmull–Rom + CSS dash flow) | Live = flowing dash; reconnecting = gap |
| `RisField.jsx` | Polar view of the **same** history | Radius / rings / ripple = the three fields |
| `path.js` | Shared Catmull–Rom helper | Continuity maths, not a second data source |
| `StreamAura.jsx` | R3F décor | Off by default; never the grade |

That split reuses the [SVG master session]({{ '/lessons/en/web-animations/svg-master-session/' | relative_url }}) Round-4 question — *who owns time, who owns space, who draws the pixels?* — inside a WebSocket panel. SVG + readout answer the human decision; WebGL is atmosphere.

### How to read the graphics (in order)

1. **Latest telemetry frame** (JSON in the readout) — prove you know what arrived.
2. **Continuum** — temperature across the history ring; dash motion means the channel is live.
3. **RIS** — same history, polar layout (not a second sensor).
4. **Aura** (optional) — mood only; if it conflicts with SVG/readout, trust SVG/readout.

**Studio test:** kill MSW or uvicorn → status becomes reconnecting → freshness drifts → ribbon gaps. That is the unit’s measure, not how pretty the aura looks.

**Excerpt — MSW WebSocket handler** (sandbox twin: `src/streamfield/handlers.js`):

```js
import { ws } from 'msw/ws';
import { STREAM_URL, snapshot } from './contract.js';

const device = ws.link(STREAM_URL);

export const handlers = [
  device.addEventListener('connection', ({ client }) => {
    let sequence = 0;
    const push = () => {
      client.send(JSON.stringify(snapshot(sequence)));
      sequence += 1;
    };
    push();
    const timer = setInterval(push, 1000);
    client.addEventListener('close', () => clearInterval(timer));
  }),
];
```

---

## Mock sockets — test without a device

You do not need a robot on the desk to rehearse lifecycle. Pick the mock layer that matches the question you are asking (FE I already taught MSW for HTTP; here the same library owns WHATWG WebSockets).

| Tool | Best when | How it touches the socket | Primary docs |
| --- | --- | --- | --- |
| **MSW** | Unit / component work in the browser or Node, same handlers as FE I | `ws.link(url)` + `connection` → `client.send` / listen to client `message` | [MSW WebSockets](https://mswjs.io/docs/websocket/) |
| **WireMock** | Integration tests against a robust stub server (JVM/admin API; 4.x messaging) | Accept WS on a path; stub by message content; templated responses; verify via Admin API | [WireMock WebSockets](https://wiremock.org/docs/websockets/) |
| **Playwright** | E2E: assert UI behaviour under controlled frames | `page.routeWebSocket(url, (ws) => { … ws.onMessage / ws.send })` — no app code change | [Playwright WebSocketRoute](https://playwright.dev/docs/network#websockets) |
| **Mockoon** | Fast local desktop mock for demos / non-coders on the team | Native `ws://` / `wss://`; conversational, 1:1, or broadcast modes | [Mockoon WebSockets](https://mockoon.com/docs/latest/api-endpoints/websockets/) |

**Studio rule:** MSW is the default rehearsal for Streamfield and for Vitest/RTL-shaped work. WireMock when the contract must be shared with a Java/backend pipeline. Playwright when the grade is “the panel behaves under drop/reconnect.” Mockoon when someone needs a GUI stub before the FastAPI Template is running. None of these replace the versioned Python contract for Entrega 2 — they let you fail the membrane safely first.

---

## 🐍 Python-Backed Services — Excerpt

### FastAPI shape

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

## 🎯 Entrega 2 lab contract — Template v1, not a placeholder

This course owns a small, deterministic contract so the interface can be built, tested, and defended now. It simulates a device; it does **not** claim to be a production robotics protocol. A Back-End II team may implement the same v1 contract later, but it may not silently change it. A breaking change needs a documented v2 proposal, an updated contract test, and a frontend migration note.

**Template — backend/main.py.** Copy this complete file to the local lab service. It runs unchanged with the default Vite origin; change FRONTEND_ORIGIN only if your dev server uses a different origin.

```python
# backend/main.py
import asyncio
import math
import time
from typing import Literal

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

DEVICE_ID = "lab-01"
FRONTEND_ORIGIN = "http://localhost:5173"

app = FastAPI(title="FE II device contract", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class DeviceCommand(BaseModel):
    command: Literal["move", "stop"]
    target: dict[str, float] | None = None


def snapshot(sequence: int) -> dict:
    """Build one telemetry frame (JSON message). Not a Rive Snapshot."""
    phase = sequence / 4
    return {
        "deviceId": DEVICE_ID,
        "online": True,
        "readings": {
            "temperatureC": round(21 + math.sin(phase) * 2, 1),
            "humidityPct": round(45 + math.cos(phase) * 5, 1),
        },
        "sequence": sequence,
        "timestamp": int(time.time() * 1000),
    }


@app.get("/v1/devices/lab-01")
async def get_device() -> dict:
    return snapshot(sequence=0)


@app.post("/v1/devices/lab-01/commands")
async def send_command(command: DeviceCommand) -> dict:
    return {
        "deviceId": DEVICE_ID,
        "accepted": True,
        "command": command.command,
        "target": command.target,
    }


@app.websocket("/v1/devices/lab-01/stream")
async def device_stream(websocket: WebSocket) -> None:
    await websocket.accept()
    sequence = 0
    try:
        while True:
            await websocket.send_json(snapshot(sequence))
            sequence += 1
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        pass
```

**Template — local setup.** Re-verify package versions before the course starts, record the versions you actually use, then run:

```bash
python -m venv .venv
.venv/bin/pip install "fastapi==0.121.*" "uvicorn[standard]==0.34.*"
.venv/bin/uvicorn main:app --reload
```

### Contract surface

- **One-shot frame (REST):** GET http://localhost:8000/v1/devices/lab-01 — returns one telemetry frame (same shape as a stream message; built by `snapshot(0)`).
- **Stream:** ws://localhost:8000/v1/devices/lab-01/stream — sends a new frame every second (`snapshot(0)`, `snapshot(1)`, …).
- **Control:** POST http://localhost:8000/v1/devices/lab-01/commands
- **Frame shape:** `deviceId`, `online`, `readings` (`temperatureC`, `humidityPct`), `sequence`, `timestamp`
- **Control shape:** `command` (`move` or `stop`) and optional `target` coordinates

Unit 5's contract test runs against the REST frame endpoint. It is the guard that tells the frontend and backend teams when a field was renamed or a shape changed.

---

## Lab (team) — workplace-like · 4 h

On the shared Entrega 2 repo, alongside Units 8–9's 3D core:

1. Rehearse first on **Ex6 Streamfield** (`/ex6-streamfield`): MSW mock, aura off. Name each file in the [file map](#file-map--every-participant). Note live / reconnecting / stale in one sentence each; paste one telemetry frame into the release note.
2. Start the versioned local contract and wire its WebSocket stream into the project as a live-data panel. Use its command endpoint for one move or stop interaction; the simulator is sufficient for Entrega 2.
3. Implement the **full connection lifecycle**: connect, reconnect on drop, and `close()` on unmount. A hook that never closes is not done.
4. Write a short release note: which reconnect strategy you chose (fixed delay, backoff, none) and why; which mock tool (if any) you used before the live socket.
5. Log every AI-assisted diff ACCEPT / REJECT ([Unit 6]({{ '/lessons/en/feii/unit-6-ai-code-review/' | relative_url }}) workflow).
6. Human review after any AI review; CI green.

**Deliverable:** branch on the shared repo + `docs/ai-declaration-log.md` row + the release note above.

---

## Independent self-check — autonomous study

This is an individual self-check, not part of the formal 14-hour
Resolución de Ejercicios allocation.

Not the showroom. Isolate the strategy:

1. **Diagnostic:** given a `useDeviceStream` hook whose `useEffect` never returns a cleanup function, explain what leaks when the component unmounts and fix it.
2. **Solvable without AI, declared as such:** for three data-shape descriptions — (a) a one-shot "turn on the light" command, (b) a continuous temperature stream, (c) an occasional "device is alive" ping — decide REST, WebSocket, or polling for each, one sentence of justification each.
3. Write two sentences: what is the same as consuming a REST API in React, and what is genuinely new about a stateful connection.

<!-- Professor answer sketch, not the student handout: (1) missing `socket.close()` in the cleanup return — the old socket keeps receiving/reconnecting after the component is gone, duplicating state updates or throwing on a stale closure. (2) a=REST (one-shot, fire-and-forget), b=WebSocket (continuous, low-latency, bidirectional not required but the shape fits), c=polling or a lightweight heartbeat WebSocket message, not a fresh REST call per ping. -->

---

## 📚 Platform notes (HOW, not bibliography)

Pinned as of **November 2026** — re-verify before the term starts:

| Package / surface | Version / note |
| --- | --- |
| `fastapi` | `0.121` · Python ≥ 3.10 |
| `uvicorn` | `^0.34` |
| `msw` (Streamfield sandbox) | `^3` · WebSocket via `msw/ws` |
| Browser `WebSocket` | Standard — no npm pin |

- FastAPI — https://fastapi.tiangolo.com/
- WebSocket API (MDN) — https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
- WHATWG WebSocket protocol — https://websockets.spec.whatwg.org/
- MSW WebSockets — https://mswjs.io/docs/websocket/
- Playwright `routeWebSocket` — https://playwright.dev/docs/network#websockets
- SVG master session (spatial model) — [lesson]({{ '/lessons/en/web-animations/svg-master-session/' | relative_url }})

---

## Session outcome

You can consume a stateful, bidirectional data source with the same component model FE I taught for REST — and you know the lifecycle a stateless request never had. This unit is **load-bearing** for the Full-Stack ↔ Data-Science synergy: Full-Stack students can implement the published contract, and Data-Science students can consume it. Units 8–10 together seed Entrega 2; [Unit 11]({{ '/lessons/en/feii/unit-11-capstone-integration/' | relative_url }}) integrates all three.

> _"Ship the module when it works alone. Ship the system when the modules work together. Ship the platform when the systems work together."_
> — Tao of Development, `arch-007`
{: .tao-development-quote }

{% comment %}
outcome-graphic-selection:
  source-section: "Session outcome"
  visual-grammar: "live-operational-membrane — bidirectional live data crossing a reconnecting control-panel membrane with safe stale-state handling"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

## References

- Abichandani, Pramod, Deepthi Sivakumar, David Lobo, Matthew Iaboni, and Tarun Shekhar. 2022. “Internet-of-Things Curriculum, Pedagogy, and Assessment for STEM Education: A Review of Literature.” *IEEE Access*. https://doi.org/10.1109/ACCESS.2022.3164709.
- Murley, Ma, Mason, Bailey, and Kharraz. 2021. “WebSocket Adoption and the Landscape of the Real-Time Web.” In *Proceedings of the Web Conference 2021*. https://doi.org/10.1145/3442381.3450063.
- Shihab, Md Istiak Hossain, et al. 2025. “The Effects of GitHub Copilot on Computing Students’ Programming Effectiveness, Efficiency, and Processes in Brownfield Programming Tasks.” In *Proceedings of ICER 2025*. https://doi.org/10.1145/3702652.3744219.
- Stelea, Sangeorzan, and Enache-David. 2025. “Accessible IoT Dashboard Design with AI-Enhanced Descriptions for Visually Impaired Users.” *Future Internet* 17 (7): 274. https://doi.org/10.3390/fi17070274.
