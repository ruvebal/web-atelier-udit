---
layout: lesson
title: 'Unit 10: IoT/Robotics Control-Panel & Python-Backed Interface'
title_alt: 'Unidad 10: Panel de Control IoT/Robótica e Interfaz con Backend Python'
slug: feii-unit-10-iot-python-backend
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-10-iot-python-backend/
description: 'IoT/robotics control-panel development: device APIs, WebSocket real-time data, Python-backed interfaces, and the component model beyond REST/GraphQL.'
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

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"The interface layer doesn't end at REST APIs. It extends to devices, sensors, and Python services."_

> **AI Assistance Disclosure:** This unit integrates AI-assisted development following the docs-first methodology. Plans, prompts, and implementation reports are documented throughout the process.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- **Understand IoT/robotics APIs** — Device control, sensor data, and real-time streams
- **Implement WebSocket connections** — Real-time data flow without polling
- **Build control-panel interfaces** — React/Astro components for device control
- **Consume Python-backed services** — REST and WebSocket endpoints from Python backends
- **See the component model transfer** — Same state/props pattern, different data source

---

## 📖 Beyond REST/GraphQL

Most interfaces consume REST or GraphQL APIs. IoT/robotics requires different patterns:

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

**Key insight:** The component model stays the same. Only the data source changes.

---

## 🤖 IoT/Robotics APIs

### Device Control APIs

```typescript
// Example: Robotic arm control
async function moveArm(x: number, y: number, z: number) {
  const response = await fetch('http://robot-api.local/move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ x, y, z }),
  });
  return response.json();
}
```

### Sensor Data Streams

```typescript
// Example: Temperature sensor
async function getSensorData() {
  const response = await fetch('http://sensor-api.local/temperature');
  return response.json(); // { temperature: 23.5, humidity: 45 }
}
```

### WebSocket Real-Time Data

```typescript
const ws = new WebSocket('ws://device-api.local/stream');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // { temperature: 23.5, timestamp: 1691551234567 }
};
```

---

## 🔄 WebSocket Integration in React

### WebSocket Hook

```typescript
function useWebSocket(url: string) {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    const ws = new WebSocket(url);
    
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onmessage = (event) => setData(JSON.parse(event.data));
    
    return () => ws.close();
  }, [url]);
  
  return { data, connected };
}
```

### Control Panel Component

```typescript
function RobotControlPanel() {
  const { data: sensorData, connected } = useWebSocket('ws://robot-api.local/sensors');
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  
  const handleMove = async () => {
    await moveArm(position.x, position.y, position.z);
  };
  
  return (
    <div className="control-panel">
      <h2>Robot Control</h2>
      <p>Status: {connected ? 'Connected' : 'Disconnected'}</p>
      <p>Temperature: {sensorData?.temperature}°C</p>
      
      <div className="controls">
        <input 
          type="number" 
          value={position.x} 
          onChange={(e) => setPosition({ ...position, x: Number(e.target.value) })}
        />
        <input 
          type="number" 
          value={position.y} 
          onChange={(e) => setPosition({ ...position, y: Number(e.target.value) })}
        />
        <input 
          type="number" 
          value={position.z} 
          onChange={(e) => setPosition({ ...position, z: Number(e.target.value) })}
        />
        <button onClick={handleMove}>Move Arm</button>
      </div>
    </div>
  );
}
```

---

## 🐍 Python-Backed Services

### FastAPI Example

```python
# main.py
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/move")
async def move_arm(x: float, y: float, z: float):
    # Control physical robot here
    return {"status": "success", "position": {"x": x, "y": y, "z": z}}

@app.websocket("/stream")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        # Stream sensor data
        data = {"temperature": read_temperature_sensor()}
        await websocket.send_json(data)
        await asyncio.sleep(1)
```

### React/FastAPI Integration

```typescript
// Consume FastAPI endpoints
async function moveArm(x: number, y: number, z: number) {
  const response = await fetch('http://localhost:8000/move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ x, y, z }),
  });
  return response.json();
}

const ws = new WebSocket('ws://localhost:8000/stream');
```

---

## 🎯 Data Source Specification

**NOTE:** This unit requires coordination with the Back-End II synergy sheet (Phase 5). The specific data source below is a placeholder pending that synergy sheet.

### Placeholder Data Source

- **Type:** Mock WebSocket service (simulating IoT device)
- **Endpoint:** `ws://localhost:8000/device-stream`
- **Data Schema:** `{ deviceId: string, sensorType: string, value: number, timestamp: number }`
- **Control API:** `POST http://localhost:8000/device-control` with `{ deviceId, command, params }`

**Phase 5 Action:** Replace this placeholder with the actual Back-End II service endpoint once the synergy sheet is executed.

---

## 🎯 Practice Exercise

**Time:** 4 hours

1. **Set up a Python FastAPI service** — Create endpoints for device control and sensor streaming
2. **Implement WebSocket streaming** — Real-time sensor data flow
3. **Build a React control panel** — Component with device state and control inputs
4. **Integrate WebSocket in React** — Custom hook for real-time data
5. **Test with simulated device** — Mock device API if physical hardware unavailable
6. **Document the data contract** — API schema, WebSocket protocol, error handling

**Deliverable:** Control panel interface + Python FastAPI service + data contract documentation

---

## 📚 Recommended Reading

- **FastAPI Documentation** — https://fastapi.tiangolo.com/
- **WebSocket API** — https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
- **IoT Web Integration** — https://www.oreilly.com/library/view/designing-the-internet/9781449337032/
- **Real-Time Web Apps** — https://www.oreilly.com/library/view/real-time-web/9781449366307/

---

## ✅ Session Outcome

By the end of this unit, you should:

- Understand IoT/robotics APIs and how they differ from REST/GraphQL
- Be able to implement WebSocket connections for real-time data
- Build control-panel interfaces using the same component model as web apps
- Consume Python-backed services via FastAPI
- See the interface-layer transfer — same patterns, different data sources

This unit is **load-bearing** — it's the direct payoff of teaching both Full-Stack and Data-Science students. Full-Stack students learn to build the Python backend; Data-Science students learn to consume it. The Entrega 2 project can now be built using this pattern.

**Phase 5 Dependency:** The specific data source will be defined in the Back-End II synergy sheet. Replace the placeholder with the actual service endpoint once Phase 5 is executed.

---

> _"The interface layer extends beyond the browser. It reaches into the physical world."_
