---
layout: track
title: 'HELIOS DECK — Roadmap de Desarrollo'
title_alt: '8 sprints: del primer fetch al deploy asistido por IA'
slug: geo-physical-aggregator-roadmap
category: react
tags: [roadmap, sprints, planning, ai-assisted, deploy, cursor, claude-code]
date: 2025-03-16
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/geo-physical-aggregator/roadmap/
status: in progress
---

[← Volver al track](../)

---

## Visión general

- **8** Sprints · **~2** semanas/sprint · **8** APIs integradas · **∞** widgets posibles

Cada sprint produce **entregables funcionales** que se integran progresivamente. El proyecto crece de un simple fetch a un dashboard completo con autenticación, widgets configurables y deploy asistido por IA.

**Deploy desde el principio:** la app se despliega **en cuanto sea posible** (incluso en modo cáscara: una ruta, un “Hello HELIOS” o el primer loader funcionando). A partir de ahí se va **añadiendo CI/CD de forma progresiva**: primero un pipeline que hace build + deploy en cada push a `main`; más adelante se incorporan lint, tests y health checks. Objetivo: URL pública desde el Sprint 1 e ir haciendo CD/CI en los sprints siguientes.

---

## Sprint 1 — Foundation & Data Sources

Inicialización del proyecto fullstack con React Router v7 SSR, configuración de Tailwind v4, SQLite con better-sqlite3 y SQL directo (KISS, sin ORM), y el primer data fetcher funcional (NASA DONKI).

**Entregables:** Proyecto RR v7 SSR + Vite funcionando · Tailwind v4 + Shadcn configurados · SQLite (better-sqlite3) con esquema inicial en SQL · API Registry JSON con las 8 fuentes · Primer fetcher: NASA DONKI (flares) · Loader que lee de SQLite y muestra datos · Estructura de carpetas definida · README con instrucciones de setup · **Primer deploy (cáscara)** en Fly.io (o similar): app accesible por URL pública · **Pipeline CD mínimo**: GitHub Action que hace build + deploy en push a `main`

**Tech:** React Router v7 · Vite · Tailwind v4 · better-sqlite3 (SQL directo, sin ORM) · JavaScript · Fly.io (o Railway/Render) · GitHub Actions

### Detalle del Sprint 1

**Día 1-2: Scaffolding**

```bash
npx create-react-router@latest helios-deck --template remix-run/react-router-templates/javascript 
cd helios-deck
npm install better-sqlite3
npm install @tanstack/react-query tailwindcss @tailwindcss/vite
```

**Día 3-4: Esquema DB + primer fetcher**

- Crear esquema SQL (p. ej. `app/db/schema.sql` o `app/db/init.js` que ejecute `CREATE TABLE signals (...)`) y tabla `signals`
- Implementar `app/services/fetchers/nasa-donki.js`
- Obtener API key gratuita en [api.nasa.gov](https://api.nasa.gov/)
- Primer `loader` en `app/routes/signals/solar-activity.jsx`

**Día 5: Verificación end-to-end**

- Ejecutar fetcher → normalizar → insertar en SQLite → leer en loader → renderizar
- Commit: `feat: initial setup with NASA DONKI solar flare fetcher`

**Día 6 (o final del Sprint 1): Primer deploy (cáscara) + CD mínimo**

- Crear **Dockerfile** mínimo (Node 20, `npm ci`, `npm run build`, `npm start`) o usar `fly launch` / equivalente en Railway o Render.
- Configurar app en **Fly.io** (o alternativa): crear app, volumen opcional para SQLite si se usa en prod, variable de entorno si hace falta.
- Añadir **GitHub Action** (p. ej. `.github/workflows/deploy.yml`) que en cada push a `main`: checkout → `npm ci` → `npm run build` → deploy (e.g. `fly deploy --remote-only` con `FLY_API_TOKEN` en secrets).
- Objetivo: **URL pública** donde la app responde (aunque sea una sola ruta o una página “cáscara”). A partir de aquí, cada merge a `main` despliega automáticamente.
- Commit: `feat: first shell deploy + minimal CD pipeline`

En sprints posteriores se irá **enriqueciendo el pipeline** (lint, tests, health check) sin cambiar la idea: deploy pronto, CD desde el principio, CI progresivo.

---

## Sprint 2 — CRUD & Data Normalization

Implementación del servicio HttpRequest centralizado, HttpErrors para mensajes genéricos, pipeline de normalización (validación en runtime), y CRUD completo para configuraciones de fuentes de datos.

**Entregables:** HttpRequest service (GET/POST/PUT/DELETE) · HttpErrors con mensajes por status code · Normalizer con validación en runtime · Todos los 8 fetchers implementados · Action CRUD para gestión de fuentes · Aggregator que ejecuta todos los fetchers · Componentes Loader y ErrorBoundary · useNotifications hook global

**Tech:** TanStack Query · HttpRequest · HttpErrors · Promise.allSettled

### Detalle del Sprint 2

**Servicio HttpRequest:**

```typescript
// app/services/HttpRequest.js

const DEFAULT_TIMEOUT = 10_000;

export class HttpRequest {
	static async get(url, options) {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);
		try {
			const res = await fetch(url, { ...options, signal: controller.signal });
			if (!res.ok) throw new HttpError(res.status, res.statusText);
			return res.json();
		} finally {
			clearTimeout(timeout);
		}
	}

	static async post(url, body) {
		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});
		if (!res.ok) throw new HttpError(res.status, res.statusText);
		return res.json();
	}
	// PUT y DELETE siguen el mismo patrón
}
```

**Pipeline de normalización:**

```text
API Response (heterogéneo)
    │
    ▼
Fetcher.fetch()          ← Transforma respuesta cruda a array
    │
    ▼
normalize(raw)           ← Aplica forma normalizada, timestamps ISO, units
    │
    ▼
db.insert(signals)       ← Persiste en SQLite con UNIQUE constraint
```

---

## Sprint 3 — Visualización & Charts

Integración de librerías de visualización (Recharts / D3). Cada estudiante construye un widget visual para su señal asignada: gráficas temporales, gauges, feeds de eventos.

**Entregables:** TimeChart component (Recharts) · Gauge component para Kp y aurora · EventFeed para erupciones solares · SignalCard con valor actual + tendencia · Rango temporal configurable (6h/24h/7d) · Responsive y dark mode en todos los charts · Tooltips interactivos con datos de fuente · Loading skeletons para cada widget

**Tech:** Recharts · D3 (opcional) · Framer Motion · Skeleton UI

### Tipos de widget por señal

| Señal                      | Widget    | Visualización                                 |
| -------------------------- | --------- | --------------------------------------------- |
| `solar_flare_events`       | EventFeed | Lista cronológica con badges de clase (C/M/X) |
| `coronal_mass_ejections`   | TimeChart | Scatter plot con velocidad de eyección        |
| `solar_wind_speed`         | TimeChart | Línea temporal con umbral de tormenta         |
| `solar_wind_density`       | TimeChart | Área apilada (speed + density)                |
| `kp_index`                 | Gauge     | Medidor circular 0–9 con colores semáforo     |
| `auroral_oval_probability` | Gauge     | Probabilidad % con gradiente verde-púrpura    |
| `iss_coordinates`          | ISSMap    | Mapa Leaflet (se completa en Sprint 4)        |
| `solar_radiation`          | TimeChart | Barras diarias con media móvil                |

---

## Sprint 4 — Real-Time & WebSockets

Servidor WebSocket integrado en el proceso Node.js. Canales para posición ISS en vivo y viento solar. Hook useWebSocket con reconexión automática y heartbeat.

**Entregables:** WebSocket server con canales · Canal iss:position (cada 5s) · Canal solar:wind (real-time) · useWebSocket hook con reconexión · ISSMap con Leaflet + trayectoria viva · Indicador de conexión WS en UI · Heartbeat + detección de desconexión · Notificaciones en vivo (tormentas solares)

**Tech:** ws (WebSocket) · Leaflet · react-leaflet · Exponential backoff

### ISSMap: ejemplo de widget en tiempo real

```typescript
// app/components/widgets/ISSMap.jsx

import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { useWebSocket } from '~/hooks/useWebSocket';
import { useState, useEffect } from 'react';

export function ISSMap() {
  const { data, status } = useWebSocket('iss:position');
  const [trail, setTrail] = useState<[number, number][]>([]);

  useEffect(() => {
    if (data) {
      setTrail(prev => [...prev.slice(-50), [data.latitude, data.longitude]]);
    }
  }, [data]);

  return (
    <div className="relative">
      {status !== 'open' && (
        <div className="absolute top-2 right-2 z-[1000] px-2 py-1 bg-yellow-500/90 text-xs rounded">
          Reconectando...
        </div>
      )}
      <MapContainer
        center={data ? [data.latitude, data.longitude] : [0, 0]}
        zoom={3}
        className="h-64 w-full rounded-lg"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="CARTO"
        />
        {data && <Marker position={[data.latitude, data.longitude]} />}
        {trail.length > 1 && (
          <Polyline positions={trail} color="#60a5fa" weight={2} opacity={0.6} />
        )}
      </MapContainer>
    </div>
  );
}
```

---

## Sprint 5 — Widget System & Dashboard

Arquitectura de widgets configurables. Grid drag-and-drop con react-grid-layout. Widget registry, props configurables por widget y persistencia de layout en SQLite.

**Entregables:** Widget Registry (JSON de tipos disponibles) · DashboardGrid con react-grid-layout · WidgetConfigModal (CRUD de props) · Drag & drop para reordenar widgets · Resize de widgets en el grid · Persistencia de layout en SQLite · Widget factory pattern (render por tipo) · Añadir/eliminar widgets del dashboard

**Tech:** react-grid-layout · Widget Registry · Factory Pattern · Form actions (CRUD)

### Widget Registry

```typescript
// app/lib/widget-registry.js

export const WIDGET_REGISTRY = {
  time_chart: {
    label: 'Gráfica Temporal',
    component: 'TimeChart',
    defaultSize: { w: 6, h: 4 },
    configSchema: {
      signal: { type: 'select', options: ['solar_wind_speed', 'solar_radiation', ...] },
      timeRange: { type: 'select', options: ['6h', '24h', '7d', '30d'] },
      chartType: { type: 'select', options: ['line', 'area', 'bar'] },
    },
  },
  gauge: {
    label: 'Medidor',
    component: 'Gauge',
    defaultSize: { w: 3, h: 3 },
    configSchema: {
      signal: { type: 'select', options: ['kp_index', 'auroral_oval_probability'] },
      thresholds: { type: 'json' },
    },
  },
  map: {
    label: 'Mapa ISS',
    component: 'ISSMap',
    defaultSize: { w: 6, h: 5 },
    configSchema: {
      showTrail: { type: 'boolean', default: true },
      trailLength: { type: 'number', default: 50 },
    },
  },
  event_feed: {
    label: 'Feed de Eventos',
    component: 'EventFeed',
    defaultSize: { w: 4, h: 5 },
    configSchema: {
      signal: { type: 'select', options: ['solar_flare_events', 'coronal_mass_ejections'] },
      limit: { type: 'number', default: 20 },
    },
  },
  signal_card: {
    label: 'Tarjeta de Señal',
    component: 'SignalCard',
    defaultSize: { w: 3, h: 2 },
    configSchema: {
      signal: { type: 'select', options: ['*'] },
      showTrend: { type: 'boolean', default: true },
    },
  },
} as const;
```

### Flujo CRUD del dashboard

```text
Usuario abre /dashboard
    │
    ▼
loader() → SELECT dashboards + widgets WHERE user_id = ?
    │
    ▼
DashboardGrid renderiza widgets según layout JSON
    │
    ├── [Drag] → onLayoutChange → Form submit → action(intent:'update')
    ├── [+ Add] → WidgetConfigModal → Form submit → action(intent:'create')
    └── [✕ Remove] → Confirm → Form submit → action(intent:'delete')
    │
    ▼
action() → INSERT/UPDATE/DELETE en SQLite → redirect('/dashboard')
```

---

## Sprint 6 — Autenticación & User Profiles

Sistema de autenticación basado en cookies con SQLite como store de usuarios. Registro, login, protección de rutas y persistencia de dashboards por usuario.

**Entregables:** Formulario de registro con validación · Formulario de login con sesión cookie · requireUser middleware en loaders · Hash de contraseñas con bcrypt · Página de perfil de usuario · Dashboard por defecto para nuevos usuarios · Protección de rutas privadas · Logout con destrucción de sesión

**Tech:** bcryptjs · Cookie Sessions · createCookieSessionStorage

### Flujo de autenticación

```text
GET /auth/register
    │
    ▼
Form → POST /auth/register
    │
    ▼
action() {
  1. Validar email + password
  2. Verificar que email no exista
  3. Hash password con bcrypt
  4. INSERT INTO users (email, password_hash)
  5. Crear dashboard por defecto
  6. Crear sesión cookie → redirect('/dashboard')
}
    │
    ▼
GET /dashboard (loader verifica sesión → sirve datos del usuario)
```

---

## Sprint 7 — AI-Assisted Development & DevOps

Creación de rules y skills para asistentes de IA (.cursor, Claude Code, Windsurf, Antigravity). Documentación como definición para deploy asistido. **Evolución del CI/CD**: sobre el pipeline de deploy ya existente (Sprint 1), se añaden lint, tests y health check para tener un CI completo antes del deploy.

**Entregables:** .cursor/rules/ para convenciones del proyecto · .cursor/skills/ para workflows de desarrollo · CLAUDE.md para Claude Code · Docs-as-deployment-definition · Dockerfile multi-stage optimizado · **CI ampliado**: lint + tests en GitHub Actions antes de deploy · Health check endpoint + monitoring · SQLite volume persistente en Fly.io (si no estaba ya)

**Tech:** .cursor/rules · CLAUDE.md · Docker · GitHub Actions · Fly.io

### Ecosistema de asistentes IA soportados

- **Cursor** — Rules en `.cursor/rules/` para convenciones de código, estructura de carpetas y patrones del proyecto. Skills en `.cursor/skills/` para workflows de fetcher, widget y deploy.
- **Claude Code** — `CLAUDE.md` en la raíz con contexto del proyecto, stack técnico, convenciones y comandos frecuentes. `AGENTS.md` para delegación de tareas.
- **Windsurf** — `.windsurfrules` con directivas de estilo y patrones de React Router v7.
- **Antigravity** — Docs-as-definition: la documentación del proyecto (este track) sirve como entrada para generación asistida de código y despliegue automatizado.

### Estructura de archivos AI-config

```text
helios-deck/
├── .cursor/
│   ├── rules/
│   │   ├── project-conventions.mdc    ← Estructura, naming, imports
│   │   ├── react-router-patterns.mdc  ← Loader/action patterns
│   │   ├── database-patterns.mdc      ← SQL / better-sqlite3 (KISS, sin ORM)
│   │   └── api-fetcher-pattern.mdc    ← Contrato DataFetcher
│   └── skills/
│       ├── create-fetcher/SKILL.md    ← Workflow: crear un nuevo fetcher
│       ├── create-widget/SKILL.md     ← Workflow: crear un nuevo widget
│       └── deploy/SKILL.md            ← Workflow: build + deploy a Fly.io
│
├── CLAUDE.md                          ← Contexto para Claude Code
├── AGENTS.md                          ← Delegación de tareas para agentes
├── .windsurfrules                     ← Convenciones para Windsurf
│
├── docs/
│   ├── architecture.md                ← Este documento de arquitectura
│   ├── api-registry.json              ← Registro de fuentes de datos
│   └── deployment.md                  ← Guía de deploy (docs-as-code)
│
└── .github/
    └── workflows/
        └── deploy.yml                 ← CI/CD con GitHub Actions
```

### Ejemplo: .cursor rule para fetchers

```markdown
---
description: Patrón para crear nuevos data fetchers
globs: ['app/services/fetchers/*.js']
---

Todos los fetchers implementan la interfaz DataFetcher:

- Exportar una instancia nombrada (e.g. `nasaDonkiFetcher`)
- Método `fetch()` retorna una Promise que resuelve a un array de señales normalizadas
- Método `healthCheck()` retorna una Promise que resuelve a boolean
- Usar HttpRequest.get() con timeout configurable
- Validar forma de la respuesta en runtime
- Incluir retry con exponential backoff (3 intentos, base 1s)
- Logging estructurado en formato JSON
```

### GitHub Actions: evolución CI/CD

En **Sprint 1** el workflow hace solo `npm ci` → `npm run build` → deploy. En **Sprint 7** se amplía con pasos de CI antes de desplegar (lint, tests). Ejemplo de pipeline completo:

```yaml
# .github/workflows/deploy.yml (versión Sprint 7: CI + CD)
name: Deploy HELIOS DECK

on:
  push:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build

  deploy:
    needs: ci
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: superfly/flyctl-actions/setup-flyctl@master
      - run: flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

---

## Sprint 8 — Polish, Testing & Launch

Optimización de rendimiento, auditoría de accesibilidad, testing end-to-end, últimos ajustes de UX y lanzamiento público del observatorio cósmico.

**Entregables:** Performance audit (Lighthouse > 90) · Accesibilidad WCAG AA verificada · Tests unitarios para fetchers y normalizer · Tests E2E para flujos críticos (Playwright) · Error monitoring (Sentry o similar) · SEO meta tags + Open Graph · Landing page pública del proyecto · Presentación final y retrospectiva

**Tech:** Vitest · Playwright · Lighthouse · Sentry · axe-core

### Checklist de lanzamiento

```text
Pre-launch:
  ✓ Todos los fetchers con healthCheck pasando
  ✓ Dashboard funcional con al menos 4 widgets
  ✓ WebSocket estable con reconexión verificada
  ✓ Auth: registro, login, logout, sesiones persistentes
  ✓ CRUD de widgets sin errores
  ✓ Responsive verificado en móvil, tablet, desktop
  ✓ Dark mode consistente en todos los componentes
  ✓ Loading states en todas las rutas
  ✓ Error boundaries para fetch failures
  ✓ Lighthouse Performance > 90
  ✓ Lighthouse Accessibility > 90
  ✓ Tests pasando en CI

Launch:
  → Deploy a producción (Fly.io)
  → Verificar SQLite volume persistente
  → Health check endpoint respondiendo
  → WebSocket funcionando en producción
  → DNS / dominio configurado (si aplica)
  → Monitoring activo
```

---

## Mapa visual de dependencias

```text
Sprint 1 ──────┐
Foundation     │  (+ deploy cáscara + CD mínimo)
               ▼
Sprint 2 ──── Sprint 3 ──── Sprint 4
CRUD/Norm      Charts        WebSockets
               │              │
               └──────┬───────┘
                      ▼
               Sprint 5
               Widget System
                      │
                      ▼
               Sprint 6
               Auth & Users
                      │
                      ▼
               Sprint 7
               AI Dev & DevOps
                      │
                      ▼
               Sprint 8
               Polish & Launch
```

Los Sprints 2, 3 y 4 pueden ejecutarse **en paralelo** por diferentes estudiantes. Sprint 5 necesita los tres anteriores. Sprint 6 necesita Sprint 5. Sprints 7 y 8 son secuenciales.

---

## Metodología ATELIER aplicada

| Fase ATELIER          | Sprints | Actividad                                                       |
| --------------------- | ------- | --------------------------------------------------------------- |
| **Exploración**       | 1–2     | Investigar APIs, diseñar esquema, primer fetch funcional        |
| **Conceptualización** | 3–4     | Diseñar widgets, planificar WebSocket, wireframes del dashboard |
| **Producción**        | 5–6     | Construir widget system, auth, CRUD completo                    |
| **Exhibición**        | 7       | CI completo (lint + tests), refinamiento deploy, documentación, demo |
| **Reflexión**         | 8       | Testing, retrospectiva, mejoras y portfolio                     |

---

## Evaluación por sprint

| Criterio                              | Peso | Sprint de evaluación |
| ------------------------------------- | ---- | -------------------- |
| Fetching funcional con datos reales   | 15%  | Sprint 2             |
| Visualización con charts interactivos | 15%  | Sprint 3             |
| WebSocket con datos en vivo           | 10%  | Sprint 4             |
| Widget system configurable            | 15%  | Sprint 5             |
| Auth + CRUD de dashboards             | 15%  | Sprint 6             |
| AI config + deploy                    | 10%  | Sprint 7             |
| Testing + accesibilidad + performance | 10%  | Sprint 8             |
| Git profesional + colaboración        | 10%  | Continuo             |

---

[← Volver al track](../) · [Pitch →](../pitch/) · [Arquitectura →](../arch/)
