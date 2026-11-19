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

**Code in this unit:** every fence is an **Excerpt** unless labelled **Template**. The versioned local lab contract is a **Template**: copy it unchanged first, then document any project-specific contract change. The [Streamfield](#flagship-sandbox--streamfield) section links the running files in `react-template`. The delta-server fence is a **Template** you run on your machine. GitHub Pages publishes files; it does not run that process.

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
- **Fold a delta stream** — Tell a full snapshot from a patch, and say why the patch needs a long-lived process.

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

The snapshot socket repeats the whole frame. [Continuous flow — delta streaming](#continuous-flow--delta-streaming) adds a second socket that sends only the fields that changed. That second socket needs a process you start. The graded contract on this page stays the snapshot route.

---

## Flagship sandbox — Streamfield {#flagship-sandbox--streamfield}

The wired rehearsal is Ex6 in the instructor sandbox [`react-template`](https://github.com/ruvebal/react-template).

Running reference: [live route](https://ruvebal.github.io/react-template/ex6-streamfield) · [page source](https://github.com/ruvebal/react-template/blob/main/src/pages/Ex6Streamfield.jsx).

The live route moves because [MSW](https://mswjs.io/docs/websocket/) answers `ws://localhost:8000/v1/devices/lab-01/stream` inside the browser. The service worker is shipped as a file, and GitHub Pages can serve that file. Each visit gets its own private clock. Two browsers do not share a sequence, and closing the tab ends the clock.

The same page has a **Delta server** radio. On the published site that radio stays disconnected. The reason is the next section: a continuous delta flow needs a process, and Pages does not run processes. The page is also served over HTTPS, and browsers refuse `ws://` from an HTTPS origin. Run both processes over `http://localhost` when you want to see patches fold.

Each file below links back to this lesson from its header comment. The Focus strip on the route (`src/focus.js`) links here, to the file map, and to the delta section.

## File map — every participant {#file-map--every-participant}

| File | Job |
| --- | --- |
| [`src/pages/Ex6Streamfield.jsx`](https://github.com/ruvebal/react-template/blob/main/src/pages/Ex6Streamfield.jsx) | Route. Starts MSW for snapshots. Points the delta radio at port 8001. |
| [`src/streamfield/useDeviceStream.js`](https://github.com/ruvebal/react-template/blob/main/src/streamfield/useDeviceStream.js) | Connect, reconnect with backoff, `close()` on unmount. |
| [`src/streamfield/reduce.js`](https://github.com/ruvebal/react-template/blob/main/src/streamfield/reduce.js) | `applyFrame` — snapshot replaces, delta folds, a sequence gap is refused. |
| [`src/streamfield/contract.js`](https://github.com/ruvebal/react-template/blob/main/src/streamfield/contract.js) | `snapshot(sequence)`, `STREAM_URL` (port 8000), `DELTA_URL` (port 8001). |
| [`src/streamfield/handlers.js`](https://github.com/ruvebal/react-template/blob/main/src/streamfield/handlers.js) | MSW clock. Full snapshot every second. This is the Pages path. |
| [`src/streamfield/browser.js`](https://github.com/ruvebal/react-template/blob/main/src/streamfield/browser.js) | Starts and stops the service worker. The worker URL respects Vite `base`. |
| [`src/streamfield/StreamReadout.jsx`](https://github.com/ruvebal/react-template/blob/main/src/streamfield/StreamReadout.jsx) | Status, freshness, wire message, folded frame. |
| [`src/streamfield/StreamContinuum.jsx`](https://github.com/ruvebal/react-template/blob/main/src/streamfield/StreamContinuum.jsx) | Temperature ribbon over the last 48 folded readings. |
| [`src/streamfield/RisField.jsx`](https://github.com/ruvebal/react-template/blob/main/src/streamfield/RisField.jsx) | Same history in polar form. Radius, ring opacity, ripple. |
| [`src/streamfield/StreamAura.jsx`](https://github.com/ruvebal/react-template/blob/main/src/streamfield/StreamAura.jsx) | Optional WebGL mood. The SVG and the readout own the data. |
| [`src/streamfield/path.js`](https://github.com/ruvebal/react-template/blob/main/src/streamfield/path.js) | Catmull–Rom ribbon shared by the continuum and the RIS trail. |
| [`server/delta-stream.mjs`](https://github.com/ruvebal/react-template/blob/main/server/delta-stream.mjs) | The process. One sequence, shared by every browser that connects. |
| [`src/focus.js`](https://github.com/ruvebal/react-template/blob/main/src/focus.js) | Focus strip. Those three links point back at this lesson. |

## How to read the graphics, in order {#how-to-read-the-graphics-in-order}

1. **The frame.** On a snapshot source the wire and the frame are the same JSON object. On the delta source, read the wire message first (often only `temperatureC`), then the folded frame (both readings).
2. **Continuum** ([`StreamContinuum.jsx`](https://github.com/ruvebal/react-template/blob/main/src/streamfield/StreamContinuum.jsx)). Temperature over the history ring. A solid flowing dash means the channel is live. A dashed gap means reconnecting.
3. **RIS** ([`RisField.jsx`](https://github.com/ruvebal/react-template/blob/main/src/streamfield/RisField.jsx)). The same history drawn in polar form. Temperature sets the radius, humidity sets the ring opacity, sequence sets the ripple.
4. **Aura** ([`StreamAura.jsx`](https://github.com/ruvebal/react-template/blob/main/src/streamfield/StreamAura.jsx)), off unless you turn it on. Grade the membrane from the SVG and the readout.

Studio test: stop the source (MSW, uvicorn, or `server/delta-stream.mjs`). Connection goes to reconnecting, freshness ages, and the last folded frame stays on screen. A panel that blanks the last good reading hides the outage.

## Continuous flow — delta streaming {#continuous-flow--delta-streaming}

A snapshot stream repeats every field on every tick. The v1 contract does that, and the MSW handler does that. It is easy to read: each message is a complete frame, and a client that joins late needs nothing it does not already hold.

A continuous flow sends the first full frame, then the difference. The server remembers the previous readings. The client remembers them too, and writes the patch on top:

```json
{ "kind": "snapshot", "deviceId": "lab-01", "online": true, "readings": { "temperatureC": 21.0, "humidityPct": 45.0 }, "sequence": 4, "timestamp": 1000 }
```

```json
{ "kind": "delta", "deviceId": "lab-01", "sequence": 5, "timestamp": 2000, "patch": { "temperatureC": 21.4 } }
```

After that delta the folded frame still has `humidityPct: 45.0`. Humidity was held. The wire did not need to say so.

That memory has to live somewhere between ticks. GitHub Pages stores the built HTML, CSS, and JavaScript and returns those files when a browser asks. It does not keep a WebSocket open, it does not remember sequence 41, and it does not compute a patch. The published Ex6 page can still show snapshots because the MSW service worker is running in the visitor's own browser, pretending to be `localhost:8000`. That pretense ends when the tab closes, and it is a different clock in every tab.

A delta stream that two browsers share, and that continues while you reload, is a process you start. In this sandbox that process is `server/delta-stream.mjs`, bound to `127.0.0.1:8001` so it does not collide with the snapshot contract on port 8000. The Pages site is `https://ruvebal.github.io`. A page loaded over HTTPS will not open `ws://127.0.0.1:8001`, even if the process is running on the same laptop. Use `npm run dev` (`http://localhost:5173/ex6-streamfield`) next to `npm run delta-server`.

Three rules keep the fold honest:

- The first message to a client is a **snapshot** of the current sequence, so a late joiner has a base.
- A **delta** is accepted only when `sequence === previous + 1`. A skipped number means a patch was lost. The client keeps the last good frame and waits. Drawing a guessed temperature would be a lie.
- Every 8th tick is a **keyframe snapshot**. Deltas are not a journal you can replay from zero. The keyframe heals a client that refused a gap. An empty `patch` still advances the sequence: the channel is alive, the readings are unchanged.

The lab simulator moves temperature every tick and holds humidity for four ticks. If both fields changed every tick, the patch would be the whole frame plus the bookkeeping. Two floats rarely justify a delta. The same fold is what you use when the frame is a pose, a point cloud slice, or a document and most of it did not move.

Pinned as of **19 November 2026**:

| Package | Version | Note |
| --- | --- | --- |
| `ws` | `8.23.0` | Node WebSocket server. Imported only by `server/delta-stream.mjs`, so the Pages bundle does not ship it. |
| Node.js | `24.5.0` on the machine that checked this | `ws@8.23.0` also runs on Node 22. |

### The fold — `src/streamfield/reduce.js`

**Excerpt.** This is the complete module the hook calls. Pasting it into an empty page does nothing until `useDeviceStream.js` passes each parsed message through `applyFrame`. A snapshot, including a legacy frame with no `kind` (the MSW clock and the v1 FastAPI route), replaces the frame. A delta folds. Anything else is refused and the previous frame stays.

Source: [`src/streamfield/reduce.js`](https://github.com/ruvebal/react-template/blob/main/src/streamfield/reduce.js). The header of that file links back to this section.

{% raw %}

```js
/**
 * Fold a WebSocket message into the last full telemetry frame.
 *
 * Lesson — Unit 10, Continuous flow — delta streaming:
 * https://ruvebal.github.io/web-atelier-udit/lessons/en/feii/unit-10-iot-python-backend/#continuous-flow--delta-streaming
 *
 * A snapshot replaces the frame. A delta is only the fields that changed, so
 * it is meaningful only when we still hold the previous frame and the
 * sequence advanced by one. A gap means a patch was lost; inventing the
 * missing readings would draw a lie, so the previous frame stays put.
 */

/**
 * @param {Record<string, unknown> | null} prev Folded frame already on screen.
 * @param {unknown} message Parsed JSON from the socket.
 * @returns {{ frame: Record<string, unknown> | null, accepted: boolean }}
 */
export function applyFrame(prev, message) {
  if (!isRecord(message)) return { frame: prev, accepted: false };

  if (message.kind === 'delta') {
    const sequence = message.sequence;
    if (!isRecord(prev) || typeof sequence !== 'number' || sequence !== prev.sequence + 1) {
      return { frame: prev, accepted: false };
    }
    if (message.patch != null && !isRecord(message.patch)) {
      return { frame: prev, accepted: false };
    }
    const patch = isRecord(message.patch) ? message.patch : {};
    const prevReadings = isRecord(prev.readings) ? prev.readings : {};
    return {
      frame: {
        ...prev,
        sequence,
        timestamp: typeof message.timestamp === 'number' ? message.timestamp : prev.timestamp,
        readings: { ...prevReadings, ...patch },
      },
      accepted: true,
    };
  }

  // Snapshot, or a legacy full frame with no kind (MSW and the v1 FastAPI route).
  if (isRecord(message.readings) && typeof message.sequence === 'number') {
    return { frame: message, accepted: true };
  }

  return { frame: prev, accepted: false };
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}
```

{% endraw %}

### The process — `server/delta-stream.mjs`

**Template.** Run this file; do not deploy it to GitHub Pages. `npm run delta-server` from the `react-template` repo starts it. Host and port are the values the Ex6 radio expects (`127.0.0.1:8001`). Move them only by changing this file and `DELTA_URL` in `contract.js` together. Loopback is deliberate: the simulator is a lab clock, not a service on the network.

One sequence is shared. A new socket receives a snapshot of the current readings immediately, then the same ticks as every client already connected. That shared clock is the part a service worker in one tab cannot do for another tab.

Source: [`server/delta-stream.mjs`](https://github.com/ruvebal/react-template/blob/main/server/delta-stream.mjs).

{% raw %}

```js
#!/usr/bin/env node
/**
 * Continuous-flow delta server for Ex6 Streamfield.
 *
 * Lesson — Unit 10, Continuous flow — delta streaming:
 * https://ruvebal.github.io/web-atelier-udit/lessons/en/feii/unit-10-iot-python-backend/#continuous-flow--delta-streaming
 *
 * GitHub Pages publishes files. It cannot remember the previous frame or
 * keep a socket open, so this process has to run on your machine.
 * Bind is loopback only: the lab simulator is not a service on the network.
 *
 * The Ex6 "Delta server" radio opens ws://127.0.0.1:8001/v1/devices/lab-01/delta.
 * Do not point it at port 8000 — that port is the snapshot FastAPI contract.
 */
import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';

const HOST = '127.0.0.1';
const PORT = 8001;
const SOCKET_PATH = '/v1/devices/lab-01/delta';
const DEVICE_ID = 'lab-01';
const TICK_MS = 1000;
// A keyframe snapshot heals a client that missed a patch. Deltas are not a
// journal you can rebuild from zero unless you still hold the base frame.
const KEYFRAME_EVERY = 8;

/**
 * Temperature moves every tick. Humidity is held for four ticks so most
 * deltas carry only temperatureC — otherwise a two-field frame that changes
 * entirely is a snapshot with extra bookkeeping.
 *
 * @param {number} sequence
 */
function readingsAt(sequence) {
  const phase = sequence / 4;
  const humidityStep = Math.floor(sequence / 4);
  return {
    temperatureC: Math.round((21 + Math.sin(phase) * 2) * 10) / 10,
    humidityPct: Math.round((45 + Math.cos(humidityStep) * 5) * 10) / 10,
  };
}

/**
 * @param {number} sequence
 * @param {{ temperatureC: number, humidityPct: number }} readings
 */
function snapshotMessage(sequence, readings) {
  return {
    kind: 'snapshot',
    deviceId: DEVICE_ID,
    online: true,
    readings,
    sequence,
    timestamp: Date.now(),
  };
}

/**
 * @param {number} sequence
 * @param {{ temperatureC: number, humidityPct: number }} previous
 * @param {{ temperatureC: number, humidityPct: number }} next
 */
function deltaMessage(sequence, previous, next) {
  /** @type {{ temperatureC?: number, humidityPct?: number }} */
  const patch = {};
  if (next.temperatureC !== previous.temperatureC) patch.temperatureC = next.temperatureC;
  if (next.humidityPct !== previous.humidityPct) patch.humidityPct = next.humidityPct;
  return {
    kind: 'delta',
    deviceId: DEVICE_ID,
    sequence,
    timestamp: Date.now(),
    patch,
  };
}

/** @param {Record<string, unknown>} record */
function log(record) {
  process.stdout.write(
    `${JSON.stringify({ ts: new Date().toISOString(), service: 'delta-stream', ...record })}\n`,
  );
}

// One sequence for every browser. A new client receives the current snapshot
// immediately, then the same ticks as everyone already connected.
let sequence = 0;
let readings = readingsAt(0);

const httpServer = createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
  res.end(`Delta stream WebSocket is at ${SOCKET_PATH}\n`);
});

const wss = new WebSocketServer({ server: httpServer, path: SOCKET_PATH });

/**
 * @param {import('ws').WebSocket} socket
 * @param {Record<string, unknown>} message
 */
function send(socket, message) {
  if (socket.readyState === socket.OPEN) socket.send(JSON.stringify(message));
}

wss.on('connection', (socket) => {
  log({ event: 'connection', sequence, clients: wss.clients.size });
  send(socket, snapshotMessage(sequence, readings));
  socket.on('close', () => {
    log({ event: 'close', clients: wss.clients.size });
  });
});

const timer = setInterval(() => {
  const previous = readings;
  sequence += 1;
  readings = readingsAt(sequence);
  const message =
    sequence % KEYFRAME_EVERY === 0
      ? snapshotMessage(sequence, readings)
      : deltaMessage(sequence, previous, readings);
  for (const socket of wss.clients) send(socket, message);
}, TICK_MS);

httpServer.on('error', (err) => {
  log({ event: 'error', message: err instanceof Error ? err.message : String(err) });
  process.exit(1);
});

httpServer.listen(PORT, HOST, () => {
  log({ event: 'listen', host: HOST, port: PORT, path: SOCKET_PATH });
});

function shutdown() {
  clearInterval(timer);
  wss.close();
  httpServer.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
```

{% endraw %}

```bash
npm install
npm run delta-server
```

In a second terminal: `npm run dev`, then open `http://localhost:5173/ex6-streamfield` and choose **Delta server**. The wire panel should show `kind: "delta"` and, on most ticks, a patch that names only `temperatureC`. The folded frame keeps `humidityPct` until a later patch changes it. Stop the server: the pill goes to reconnecting, and the last folded frame stays.

### The same messages on FastAPI

**Template.** Paste the block below into the v1 `backend/main.py` under the snapshot route. Leave the snapshot route in place. This clock is the entrega-shaped copy of `server/delta-stream.mjs`: one shared sequence, a snapshot on join, deltas between keyframes. It listens on the FastAPI process (port 8000, path `/v1/devices/lab-01/delta`). The Ex6 radio does not use that URL. It uses the Node process on 8001 so the two servers can run at once. A backend pair that owns the clock can point a client at this route by changing `DELTA_URL`.

```python
KEYFRAME_EVERY = 8
delta_clients: set[WebSocket] = set()
delta_sequence = 0


def delta_readings(sequence: int) -> dict:
    # Humidity is held for four ticks so a delta often carries only temperatureC.
    phase = sequence / 4
    humidity_step = sequence // 4
    return {
        "temperatureC": round(21 + math.sin(phase) * 2, 1),
        "humidityPct": round(45 + math.cos(humidity_step) * 5, 1),
    }


delta_readings_now = delta_readings(0)


def snapshot_message(sequence: int, readings: dict) -> dict:
    return {
        "kind": "snapshot",
        "deviceId": DEVICE_ID,
        "online": True,
        "readings": readings,
        "sequence": sequence,
        "timestamp": int(time.time() * 1000),
    }


def delta_message(sequence: int, previous: dict, readings: dict) -> dict:
    patch = {}
    if readings["temperatureC"] != previous["temperatureC"]:
        patch["temperatureC"] = readings["temperatureC"]
    if readings["humidityPct"] != previous["humidityPct"]:
        patch["humidityPct"] = readings["humidityPct"]
    return {
        "kind": "delta",
        "deviceId": DEVICE_ID,
        "sequence": sequence,
        "timestamp": int(time.time() * 1000),
        "patch": patch,
    }


async def delta_clock() -> None:
    global delta_sequence, delta_readings_now
    while True:
        await asyncio.sleep(1)
        previous = delta_readings_now
        delta_sequence += 1
        delta_readings_now = delta_readings(delta_sequence)
        if delta_sequence % KEYFRAME_EVERY == 0:
            message = snapshot_message(delta_sequence, delta_readings_now)
        else:
            message = delta_message(delta_sequence, previous, delta_readings_now)
        for client in list(delta_clients):
            try:
                await client.send_json(message)
            except Exception:
                delta_clients.discard(client)


@app.on_event("startup")
async def start_delta_clock() -> None:
    # The process lifetime. A static host has no equivalent hook.
    asyncio.create_task(delta_clock())


@app.websocket("/v1/devices/lab-01/delta")
async def device_delta(websocket: WebSocket) -> None:
    await websocket.accept()
    delta_clients.add(websocket)
    await websocket.send_json(snapshot_message(delta_sequence, delta_readings_now))
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        delta_clients.discard(websocket)
```

`set` is a builtin in the Python that runs this course. `asyncio`, `math`, `time`, `WebSocket`, and `WebSocketDisconnect` are the same imports as the snapshot template.

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
4. **Fold:** the folded frame is at sequence 10. A delta arrives with sequence 12 and a temperature patch. What stays on screen, and which later message is allowed to replace it?

<!-- Professor answer sketch, not the student handout: (1) missing `socket.close()` in the cleanup return — the old socket keeps receiving/reconnecting after the component is gone, duplicating state updates or throwing on a stale closure. (2) a=REST (one-shot, fire-and-forget), b=WebSocket (continuous, low-latency, bidirectional not required but the shape fits), c=polling or a lightweight heartbeat WebSocket message, not a fresh REST call per ping. (4) refuse the delta, keep sequence 10 and the previous readings, status waits for a snapshot; the next keyframe snapshot replaces the frame. -->

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
<<<<<<< HEAD
- `ws@8.23.0` — https://github.com/websockets/ws — the local delta server. Checked 2026-11-19.
- GitHub Pages — https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages — static file hosting. The delta process does not run there.
=======
- MSW WebSockets — https://mswjs.io/docs/websocket/
- Playwright `routeWebSocket` — https://playwright.dev/docs/network#websockets
- SVG master session (spatial model) — [lesson]({{ '/lessons/en/web-animations/svg-master-session/' | relative_url }})
>>>>>>> 03163b9803002c521d6b4d495e04819c52cf4e6e

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
