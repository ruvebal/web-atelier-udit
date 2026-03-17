---
layout: track
title: 'HELIOS DECK — Observatorio Cósmico de Datos Geofísicos'
title_alt: 'Track de desarrollo fullstack · React Router v7 · Datos en tiempo real'
slug: geo-physical-aggregator
category: react
tags: [react, fullstack, ssr, sqlite, websocket, api, space-weather, dashboard]
phase: 3
date: 2025-03-16
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/geo-physical-aggregator/
status: in progress
---

# HELIOS DECK

*Track activo · 8 sprints · Fullstack*

Un observatorio cósmico en tiempo real. Construido con React Router v7 SSR, SQLite, WebSockets y APIs públicas de clima espacial. Tu dashboard de señales del universo.

## Navegación del track

- **[Pitch](pitch/)** — Visión del producto, propuesta de valor y alcance del proyecto colaborativo
- **[Arquitectura](arch/)** — Stack técnico, flujo de datos SSR + SQLite y diseño de sistema fullstack
- **[Roadmap](roadmap/)** — 8 sprints detallados con entregables, testing y despliegue asistido por IA

---

## ¿Qué es HELIOS DECK?

Un **dashboard de observación cósmica** que agrega datos geofísicos y heliofísicos de múltiples fuentes públicas en tiempo real. Los estudiantes construyen una aplicación fullstack profesional que:

- **Consume** APIs REST de la NASA, NOAA, GFZ y otras fuentes espaciales
- **Normaliza** datos heterogéneos en un esquema JSON unificado
- **Persiste** en SQLite a través del SSR de React Router v7
- **Visualiza** con gráficas interactivas (Recharts/D3)
- **Transmite** datos en vivo vía WebSockets (posición ISS, viento solar)
- **Permite** a usuarios autenticados configurar dashboards personalizados con widgets

> **Premisa pedagógica:** No existe backend separado. React Router v7 en modo SSR actúa como fullstack framework — los `loader` leen de la base de datos, los `action` escriben en ella. El frontend *es* el backend.

---

## Señales agregadas

La aplicación normaliza estas señales cósmicas en un esquema unificado con timestamps y atribución de fuente:

- `solar_flare_events` · `coronal_mass_ejections` · `solar_wind_speed` · `solar_wind_density`
- `kp_index` · `auroral_oval_probability` · `iss_coordinates` · `solar_radiation`

### Esquema de salida normalizado

```json
{
  "timestamp": "2025-03-16T14:30:00Z",
  "source": "NASA_DONKI",
  "signal": "solar_flare_events",
  "value": {
    "classType": "M2.1",
    "beginTime": "2025-03-16T12:00:00Z",
    "peakTime": "2025-03-16T12:45:00Z",
    "sourceLocation": "N15W30"
  },
  "unit": "flare_class",
  "confidence": 0.95,
  "metadata": {
    "instrument": "GOES-16/XRS",
    "cadence_seconds": 60
  }
}
```

---

## Fuentes de datos (API Registry)

| Fuente | Provider | Auth | Temas |
|--------|----------|------|-------|
| NASA Open APIs | NASA | API_KEY | astronomía, eventos solares, DONKI, asteroides |
| NASA POWER | NASA Earth Science | ninguna | radiación solar, clima, energía solar |
| NOAA SWPC | NOAA | ninguna | viento solar, tormentas geomagnéticas, índice Kp |
| GFZ Kp Index | GFZ Potsdam | ninguna | perturbación geomagnética, interacción solar |
| SpaceWeatherLive | SpaceWeatherLive | ninguna | aurora boreal, magnetosfera, manchas solares |
| Where The ISS At | Open Notify | ninguna | órbita satelital, posición ISS |
| Open Astronomy Catalog | Open Astronomy | ninguna | supernovas, eventos cósmicos, astrofísica |
| Open-Meteo | Open Meteo | ninguna | datos atmosféricos, irradiancia solar, clima |

---

## Stack tecnológico

React 19 · React Router v7 (SSR) · Tailwind CSS v4 · Shadcn/ui · TanStack Query · better-sqlite3 · Recharts / D3 · WebSockets · Drizzle ORM · Vite · JavaScript (TypeScript el próximo curso)

---

## Propuestas de nombre

El proyecto necesita una identidad. Candidatas:

- **HELIOS DECK** (elegido) — Panel de observación cósmica; referencia directa al Sol como fuente de señales
- **SOLARIS** — Dashboard de clima espacial; evoca la novela de Lem y la ciencia solar
- **MAGNETAR** — Agregador geofísico; estrella de neutrones con campo magnético extremo
- **AURORA NEXUS** — Centro de monitoreo; punto de conexión entre datos y fenómenos visibles
- **COSMOS PULSE** — Monitor de señales cósmicas; el pulso del universo en tu pantalla
- **STELLAR WIND** — Central de datos heliofísicos; el viento que conecta Sol y Tierra
- **HELIOSCOPE** — Observatorio solar interactivo; instrumento de exploración heliofísica

---

## Lección de referencia

Este track parte de la lección teórica **[Integración con backend: conectando con el mundo real]({{ '/lessons/es/react/react-backend-integration/' | relative_url }})**, que cubre:

1. Fetch API y async/await
2. React Query: patrones de caché y sincronización
3. Mutations (POST, PUT, DELETE) con optimistic updates
4. Arquitectura de capa API (`api/`, `hooks/`, `services/`)
5. Error boundaries para operaciones asíncronas

La lección sirve como **introducción teórica** antes de que los estudiantes aborden el reto práctico del track completo.

---

## Resumen de secciones

| Sección | Contenido | Estado |
|---------|-----------|--------|
| [Pitch →](pitch/) | Visión, propuesta de valor, alcance | ✓ Definido |
| [Arquitectura →](arch/) | Stack, flujo de datos, esquema DB | ✓ Definido |
| [Roadmap →](roadmap/) | 8 sprints con entregables y deploy | ✓ Definido |

---

> *"El cosmos no es hostil, ni amigable. Es simplemente indiferente. Nuestro trabajo es escucharlo."* — adaptado de John Holmes
