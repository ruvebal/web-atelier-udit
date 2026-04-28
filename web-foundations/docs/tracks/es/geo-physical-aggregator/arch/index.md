---
layout: track
title: 'HELIOS DECK — Arquitectura del Sistema'
title_alt: 'Fullstack self-contained: React Router v7 SSR + SQLite + WebSockets'
slug: geo-physical-aggregator-arch
category: react
tags: [arquitectura, ssr, sqlite, websocket, fullstack, monolito, react-router]
date: 2025-03-16
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/geo-physical-aggregator/arch/
status: in progress
---

[← Volver al track](../)

---

## Principio fundamental: el frontend ES el backend

> **¿Es monorepo? ¿Es un monolito?**  
> Es un **monolito fullstack**. React Router v7 en modo SSR (la evolución de Remix) ejecuta código en el servidor. Los `loader` de cada ruta se ejecutan antes del render — pueden leer de la base de datos, llamar a APIs externas y devolver datos al componente. Los `action` manejan formularios y mutaciones. No hay un backend separado. No hay Express aparte. No hay API REST interna. El router *es* el servidor.

### ¿Por qué este patrón?

1. **Cero fricción backend.** Los estudiantes no necesitan aprender Express, NestJS ni Laravel. Escriben funciones `loader` y `action` junto a sus componentes React. Una sola mentalidad, un solo lenguaje, un solo deploy.

2. **SQLite como base de datos embebida.** Sin instalar Postgres ni MySQL. `better-sqlite3` es un archivo `.db` en disco que se genera/usa en cada entorno. Ideal para prototipado y proyectos educativos.

3. **SSR-first con hidratación selectiva.** El HTML se genera en el servidor con datos reales. El navegador hidrata los componentes interactivos (charts, WebSocket feeds). SEO incluido, Time to First Byte bajo, cero waterfalls de fetch en el cliente.

4. **WebSockets integrados.** El mismo servidor de React Router puede exponer un endpoint WebSocket. Usamos `ws` (o `socket.io`) sobre el mismo proceso Node.js que sirve la app.

---

## Diagrama de arquitectura

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                              HELIOS DECK                                     │
│                         Monolito Fullstack SSR                                │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │  CLIENTE (Browser)                                                      │  │
│  │  React Router v7 (client-side navigation + form submissions)            │  │
│  │  TanStack Query (caché · invalidación · optimistic UI)                   │  │
│  │       │ HTTP (loader/action)                                 │ WS        │  │
│  └───────┼──────────────────────────────────────────────────────┼──────────┘  │
│          ▼                                                      ▼             │
│  ┌───────────────────────────────────────────┐  ┌─────────────────────────┐  │
│  │  SERVIDOR (Node.js · React Router SSR)     │  │  WebSocket Server        │  │
│  │  loader() → db.query + fetch APIs          │  │  iss:position cada 5s   │  │
│  │  action() → INSERT/UPDATE/DELETE           │  │  solar:wind en vivo      │  │
│  └────────┬──────────────────────────────────┘  └────────┬────────────────┘  │
│           ▼                                              ▼                   │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  CAPA DE DATOS: SQLite (better-sqlite3) · Fetchers (NASA, NOAA, GFZ…)   │  │
│  │  Normalizer (validación en runtime) · signals, users, widgets, dashboards │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Capas del sistema

### Capa Cliente

Componentes React renderizados en el navegador tras hidratación SSR:

- `Dashboard` — grid de widgets con react-grid-layout
- `SignalChart` — Recharts wrapper para series temporales
- `GaugeWidget` — medidor circular (Kp, aurora)
- `ISSMap` — mapa Leaflet con posición en vivo
- `WidgetConfig` — modal CRUD para props del widget

### Capa Servidor (SSR)

Loaders y actions de React Router v7 ejecutados en Node.js:

- `loader` — lee señales de SQLite + fetch a APIs externas
- `action` — escribe widgets, dashboards, usuarios
- Sesiones — cookie-based con `createCookieSessionStorage`
- Middleware — autenticación, rate limiting, CORS

### Capa de Datos

SQLite embebido + servicios de fetching y normalización:

- `better-sqlite3` — DB en archivo, síncrono, rápido
- **SQL directo (KISS)** — queries parametrizadas (sin ORM)
- Fetchers — un servicio por API externa
- Normalizer — transforma a objeto normalizado

#### ¿Se versiona el `.db`?

**No.** El archivo `.db` **no debe ir a git** (va en `.gitignore`).

- **Razón 1 (seguridad/privacidad):** contiene **perfiles de usuario** (emails, contraseñas hasheadas) y **widgets/dashboards de cada uno** (layout, orden, configuración). Eso no debe acabar en el repositorio.
- **Razón 2 (ruido):** cambia constantemente y genera diffs binarios inútiles.
- **Razón 3 (portabilidad):** cada entorno (dev/CI/prod) tiene rutas y datos distintos; lo reproducible es el **esquema** y un **seed** opcional.

**Dónde viven los datos por usuario:** en el mismo SQLite: tablas `users` (perfil), `dashboards` (vista por usuario) y `widgets` (widgets de cada dashboard). Los perfiles y la configuración de widgets de cada uno están en el `.db` — local en dev o en el volumen del servidor en producción; por eso no se versiona.

**Patrón recomendado:** versionamos el esquema (SQL) y un `seed` determinista; cada entorno crea su `.db` al arrancar o con un script (`npm run db:init` / `db:seed`).

### Capa Real-Time

WebSocket server integrado en el mismo proceso Node.js:

- Canal `iss:position` — lat/lng cada 5 segundos
- Canal `solar:wind` — velocidad y densidad en vivo
- Reconexión automática con backoff exponencial
- Heartbeat para detectar desconexiones

---

## Estructura del proyecto

```text
helios-deck/
├── app/
│   ├── routes/
│   │   ├── _index.jsx              ← Landing / redirect a dashboard
│   │   ├── dashboard.jsx           ← Layout del dashboard (loader: user + widgets)
│   │   ├── dashboard.widgets.jsx   ← CRUD de widgets (action: create/update/delete)
│   │   ├── signals/
│   │   │   ├── solar-activity.jsx  ← Loader: NASA DONKI → flares + CMEs
│   │   │   ├── solar-wind.jsx      ← Loader: NOAA SWPC → speed + density
│   │   │   ├── kp-index.jsx        ← Loader: GFZ → Kp values
│   │   │   ├── aurora.jsx          ← Loader: SpaceWeatherLive → oval prob
│   │   │   ├── iss-tracker.jsx     ← Loader: Open Notify + WebSocket
│   │   │   └── solar-radiation.jsx ← Loader: NASA POWER → irradiance
│   │   ├── auth/
│   │   │   ├── login.jsx           ← Form + action → session cookie
│   │   │   ├── register.jsx        ← Form + action → INSERT user
│   │   │   └── logout.jsx          ← Action → destroy session
│   │   └── api/
│   │       └── ws.js               ← WebSocket upgrade endpoint
│   ├── components/
│   │   ├── ui/                     ← Shadcn/ui components
│   │   ├── widgets/
│   │   │   ├── TimeChart.jsx       ← Recharts series temporal
│   │   │   ├── Gauge.jsx           ← Medidor circular
│   │   │   ├── ISSMap.jsx          ← Leaflet con trayectoria
│   │   │   ├── EventFeed.jsx       ← Lista de eventos solares
│   │   │   └── SignalCard.jsx      ← Tarjeta de señal individual
│   │   ├── DashboardGrid.jsx       ← react-grid-layout wrapper
│   │   ├── WidgetConfigModal.jsx   ← CRUD modal para widgets
│   │   ├── Loader.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── Notification.jsx
│   ├── hooks/
│   │   ├── useSignalFetch.js       ← React Query wrapper genérico
│   │   ├── useWebSocket.js         ← WS con reconexión automática
│   │   ├── useNotifications.js     ← Toast global
│   │   └── useDashboardLayout.js   ← Grid state por usuario
│   ├── services/
│   │   ├── fetchers/
│   │   │   ├── nasa-donki.js       ← DataFetcher para NASA DONKI
│   │   │   ├── noaa-swpc.js        ← DataFetcher para NOAA
│   │   │   ├── gfz-kp.js           ← DataFetcher para GFZ
│   │   │   ├── spaceweatherlive.js
│   │   │   ├── open-notify.js
│   │   │   ├── nasa-power.js
│   │   │   ├── astrocats.js
│   │   │   └── open-meteo.js
│   │   ├── normalizer.js           ← Heterogéneo → objeto normalizado
│   │   ├── aggregator.js           ← Orquesta todos los fetchers
│   │   ├── HttpRequest.js          ← Wrapper fetch con retry + timeout
│   │   └── HttpErrors.js           ← Mensajes genéricos por status code
│   ├── db/
│   │   ├── schema.sql              ← Esquema SQLite versionado (signals, users, widgets, dashboards)
│   │   ├── seed.js                 ← Datos iniciales para desarrollo/demo
│   │   └── index.js                ← Conexión better-sqlite3 + helpers SQL
│   ├── lib/
│   │   ├── session.server.js       ← createCookieSessionStorage
│   │   ├── auth.server.js          ← hash passwords, verify, requireUser
│   │   └── constants.js            ← API URLs, timeouts, config
│   └── root.jsx                    ← Layout raíz con providers
├── public/                         ← Assets estáticos
├── db/
│   ├── schema.sql                  ← Esquema SQLite versionado
│   └── seed.js                     ← Seed determinista (dev/demo)
├── vite.config.js                  ← Vite + React Router plugin
├── tailwind.config.js
├── package.json
├── .env.example                    ← NASA_API_KEY, SESSION_SECRET, DATABASE_PATH
└── helios.db                       ← SQLite database file (gitignored)
```

---

## Esquema de base de datos

```sql
-- Señales normalizadas de todas las fuentes
CREATE TABLE signals (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp   TEXT    NOT NULL,  -- ISO 8601
  source      TEXT    NOT NULL,  -- e.g. 'NASA_DONKI'
  signal      TEXT    NOT NULL,  -- e.g. 'solar_flare_events'
  value       TEXT    NOT NULL,  -- JSON serializado
  unit        TEXT    NOT NULL,
  confidence  REAL    DEFAULT 1.0,
  metadata    TEXT,              -- JSON opcional
  created_at  TEXT    DEFAULT (datetime('now')),
  UNIQUE(timestamp, source, signal)
);

CREATE INDEX idx_signals_lookup ON signals(signal, timestamp DESC);
CREATE INDEX idx_signals_source ON signals(source, timestamp DESC);

CREATE TABLE users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT    UNIQUE NOT NULL,
  password_hash TEXT    NOT NULL,
  display_name  TEXT,
  created_at    TEXT    DEFAULT (datetime('now'))
);

CREATE TABLE dashboards (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        TEXT    NOT NULL DEFAULT 'Mi Dashboard',
  layout      TEXT    NOT NULL DEFAULT '[]',
  is_default  INTEGER DEFAULT 0,
  created_at  TEXT    DEFAULT (datetime('now')),
  updated_at  TEXT    DEFAULT (datetime('now'))
);

CREATE TABLE widgets (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  dashboard_id INTEGER NOT NULL REFERENCES dashboards(id) ON DELETE CASCADE,
  type         TEXT    NOT NULL,
  signal       TEXT    NOT NULL,
  config       TEXT    NOT NULL DEFAULT '{}',
  position     TEXT    NOT NULL DEFAULT '{}',
  created_at   TEXT    DEFAULT (datetime('now'))
);

CREATE INDEX idx_widgets_dashboard ON widgets(dashboard_id);
```

---

## Flujo de datos: loader → componente

Resumen del flujo (archivos en `.jsx`/`.js`):

- **Loader:** `requireUser(request)` → consulta a `signals` con SQL parametrizado → `return { flares }` para el componente.
- **Action:** `formData.get('intent')` → `create` / `update` / `delete` sobre `widgets` → `redirect('/dashboard')`.
- **WebSocket:** `initWebSocketServer(httpServer)` con canal `iss:position` cada 5s; cliente usa `useWebSocket('iss:position')` con reconexión.

---

## Autenticación: sesiones con cookies

`createCookieSessionStorage` con cookie `__helios_session`, HttpOnly, 7 días. `requireUser(request)` lee sesión y redirige a `/auth/login` si no hay `userId`. `createUserSession(userId, redirectTo)` escribe cookie y redirige.

---

## Pipeline de agregación de datos

```text
Timer (cron) → Aggregator Service → Normalizer (validación en runtime) → SQLite INSERT
                        ↑
    NASA DONKI | NOAA SWPC | GFZ Kp | … (8 fetchers)
```

`aggregateAll()`: `Promise.allSettled(fetchers.map(f => f.fetch()))` → `normalize` → `db.insert(signals).onConflictDoNothing()`.

---

## Decisiones técnicas clave

| Decisión | Opción elegida | Alternativa descartada | Razón |
|----------|---------------|----------------------|--------|
| Framework | React Router v7 SSR | Next.js / Astro | Continuidad con el curriculum React; loaders/actions son más explícitos |
| Base de datos | SQLite + `better-sqlite3` | PostgreSQL | Cero config, embebido, ideal para educación. Migratable a Postgres si escala |
| Acceso a datos | **SQL directo (KISS)** | ORM | Menos magia, menos dependencias, más fácil de depurar y enseñar en JS |
| Charts | Recharts | D3 directo | API declarativa React-friendly. D3 disponible para visualizaciones custom |
| Real-time | WebSocket (`ws`) | Socket.io / SSE | Menor overhead, sin dependencias. SSE no soporta bidireccional |
| Auth | Cookie sessions | JWT | Más seguro para SSR (HttpOnly), sin almacenamiento en cliente |
| Styling | Tailwind v4 + Shadcn | CSS Modules | Consistencia con el curriculum, components pre-construidos |
| Validación | Validación en runtime (Zod opcional) | Yup / Joi / manual | Consistencia del objeto normalizado; Zod opcional para esquemas estrictos |

---

## Consideraciones de deploy

La app es un **ejecutable Node.js único** que sirve HTML, maneja WebSockets y escribe en SQLite:

```text
Deploy options:
├── Fly.io          ← Recomendado. Soporte nativo para SQLite persistente (volumes)
├── Railway         ← Simple, con persistent storage
├── Render          ← Free tier disponible
├── VPS (DigitalOcean / Hetzner)  ← Control total
└── Docker          ← Portable, reproducible
```

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
VOLUME ["/app/data"]
ENV DATABASE_URL="file:/app/data/helios.db"
EXPOSE 3000
CMD ["npm", "start"]
```

---

[← Volver al track](../) · [Pitch →](../pitch/) · [Roadmap →](../roadmap/)
