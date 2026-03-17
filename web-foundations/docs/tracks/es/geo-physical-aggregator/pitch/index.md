---
layout: track
title: 'HELIOS DECK — Pitch del Proyecto'
title_alt: 'Visión, propuesta de valor y alcance del observatorio cósmico'
slug: geo-physical-aggregator-pitch
category: react
tags: [pitch, producto, visión, equipo, apis]
date: 2025-03-16
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/geo-physical-aggregator/pitch/
status: in progress
---

[← Volver al track](../)

---

## Visión del producto

**HELIOS DECK** es un observatorio cósmico colaborativo que permite a cualquier persona monitorizar el clima espacial y la actividad geofísica del planeta en tiempo real, a través de un dashboard interactivo construido enteramente por estudiantes de desarrollo web.

> **Elevator pitch:** Imagina un panel de control de la NASA — pero open source, construido con React, alimentado por APIs públicas y diseñado para que cada estudiante aporte una pieza del puzzle cósmico. Desde erupciones solares hasta la posición de la ISS, todo normalizado, visualizado y en vivo.

**En números:** 8 APIs públicas · 8 señales agregadas · 8 sprints · 0 backends externos.

---

## Propuesta de valor

### Para los estudiantes

1. **Practican fetching real** — no mocks, no JSONs locales. APIs de la NASA, NOAA y GFZ con datos que cambian cada minuto
2. **Dominan CRUD completo** — crean, leen, actualizan y eliminan configuraciones de widgets desde React hacia SQLite
3. **Construyen con WebSockets** — datos en vivo del viento solar y la posición orbital de la ISS
4. **Aprenden arquitectura fullstack** sin salir de React — React Router v7 SSR como BFF (Backend for Frontend)
5. **Despliegan un producto real** — no un ejercicio, sino una webapp que funciona y se puede enseñar

### Para el portfolio

- Un proyecto **diferenciador** que combina datos científicos con UI moderna
- Experiencia demostrable en **SSR, persistencia, real-time y autenticación**
- Trabajo **colaborativo con Git** profesional (ramas, PRs, convenciones de commit)

---

## Alcance funcional

- **Agregador de datos** — Servicio que consulta 8 APIs externas, normaliza las respuestas y almacena en SQLite con timestamps y atribución de fuente
- **Dashboard de widgets** — Grid configurable donde cada usuario autenticado elige qué señales visualizar, en qué formato y en qué posición
- **Visualización interactiva** — Gráficas temporales (Recharts), gauge de índice Kp, mapa orbital de la ISS (Leaflet) y feed de eventos solares
- **Tiempo real** — WebSocket server integrado que emite posición de la ISS cada 5s y velocidad del viento solar con actualización continua
- **CRUD de configuración** — Los usuarios crean, editan y eliminan layouts de dashboard. Los widgets tienen props configurables (rango temporal, tipo de gráfica)
- **Autenticación** — Sesiones basadas en cookies con SQLite como store de usuarios. Registro, login, protección de rutas y persistencia de preferencias

---

## Fuentes de datos detalladas

Cada fuente se integra como un **servicio independiente** con un contrato común (misma forma de entrada/salida):

| Fuente | Provider | Auth | Señales | Cadencia |
|--------|----------|------|---------|----------|
| **NASA Open APIs** | NASA | API_KEY (gratuita) | `solar_flare_events`, `coronal_mass_ejections` | ~1h |
| **NASA POWER** | NASA Earth Science | ninguna | `solar_radiation` | diaria |
| **NOAA SWPC** | NOAA | ninguna | `solar_wind_speed`, `solar_wind_density` | ~1min |
| **GFZ Kp Index** | GFZ Potsdam | ninguna | `kp_index` | ~3h |
| **SpaceWeatherLive** | SpaceWeatherLive | ninguna | `auroral_oval_probability` | ~15min |
| **Where The ISS At** | Open Notify | ninguna | `iss_coordinates` | ~5s (WebSocket) |
| **Open Astronomy Catalog** | Open Astronomy | ninguna | eventos cósmicos (suplem.) | variable |
| **Open-Meteo** | Open Meteo | ninguna | datos atmosféricos (suplem.) | ~1h |

### Contrato común del fetcher (JavaScript)

Cada fetcher exporta un objeto con:

- `source` (string) — identificador de la fuente, p. ej. `"NASA_DONKI"`
- `signals` (array de string) — señales que expone
- `cadenceMs` (number) — cadencia de refresco en milisegundos
- `fetch()` — función async que devuelve un array de señales normalizadas
- `healthCheck()` — función async que devuelve `true`/`false`

Cada **señal normalizada** es un objeto con: `timestamp` (ISO 8601), `source`, `signal`, `value`, `unit`, `confidence` (0–1), y opcionalmente `metadata`.

---

## Modelo colaborativo

Cada estudiante es responsable de **una ruta completa** dentro de la aplicación, asignada a una señal o grupo de señales:

- **Actividad Solar** — NASA DONKI · flares + CME
- **Viento Solar** — NOAA SWPC · speed + density
- **Campo Geomagnético** — GFZ · Kp index
- **Aurora Boreal** — SpaceWeatherLive · oval
- **Tracker ISS** — Open Notify · coordenadas
- **Radiación Solar** — NASA POWER · irradiancia
- **Eventos Cósmicos** — Astrocats · supernovas
- **Dashboard Core** — Widget system · auth · layout

### Componentes compartidos

- `Loader` — skeleton/spinner configurable
- `ErrorBoundary` — manejo graceful de errores async
- `SignalCard` — tarjeta de señal con valor, fuente y timestamp
- `TimeChart` — gráfica temporal reutilizable (Recharts wrapper)
- `GaugeWidget` — medidor circular para índices (Kp, probabilidad aurora)
- `Notification` — toast animado con tipos success/error/warning/info

### Hooks compartidos

- `useSignalFetch(signal)` — React Query wrapper para cualquier señal
- `useWebSocket(channel)` — conexión WebSocket con reconexión automática
- `useNotifications()` — sistema global de notificaciones
- `useDashboardLayout()` — gestión del grid de widgets por usuario

---

## Flujo Git

```text
main ─────────────────────────────────────────────
  │                                               ↑
  ├── feature/solar-activity ──── PR ─── review ──┤
  ├── feature/solar-wind ──────── PR ─── review ──┤
  ├── feature/kp-index ────────── PR ─── review ──┤
  ├── feature/aurora-tracker ──── PR ─── review ──┤
  ├── feature/iss-tracker ─────── PR ─── review ──┤
  ├── feature/dashboard-core ──── PR ─── review ──┘
  └── ...
```

**Convenciones de commit:**

```text
feat: add solar wind speed chart with 24h range
fix: handle NOAA API timeout with retry logic
refactor: extract signal normalizer to shared service
docs: update arch diagram with WebSocket flow
style: align gauge widget with design system tokens
```

---

## Diferenciación frente a ejercicios típicos

| Ejercicio típico | HELIOS DECK |
|------------------|-------------|
| Mock data / JSON local | APIs reales con datos que cambian cada minuto |
| CRUD genérico (todos, notas) | CRUD de widgets y dashboards personalizados |
| Sin persistencia real | SQLite embebido, sin backend externo |
| Sin tiempo real | WebSockets para ISS y viento solar |
| Deploy manual | CI/CD asistido por IA con docs-as-code |
| Proyecto individual | Monorepo colaborativo con Git profesional |

---

## Criterios de éxito

- [ ] **8 señales** normalizadas y persistidas en SQLite
- [ ] **Dashboard** funcional con al menos 4 widgets configurables
- [ ] **WebSocket** activo para al menos 1 señal en tiempo real
- [ ] **CRUD** completo para layouts de dashboard por usuario
- [ ] **Autenticación** funcional con registro, login y sesiones
- [ ] **Gráficas** interactivas con al menos 2 tipos de visualización
- [ ] **Deploy** exitoso en entorno de producción
- [ ] **Documentación** técnica generada con asistencia de IA

---

[← Volver al track](../) · [Arquitectura →](../arch/) · [Roadmap →](../roadmap/)
