---
layout: lesson
title: 'Individual Project: Geophysical Aggregator'
slug: geophysical-aggregator-project
category: react
tags:
 [
  react,
  react-router,
  framework-mode,
  ssr,
  react-query,
  i18n,
  authentication,
  geophysics,
  public-api,
  deployment,
  individual-project,
 ]
week: 12
phase: 3
sprint: 13
date: 2026-05-05
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/geophysical-aggregator-project/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents

{: .no_toc }

- TOC
  {:toc}

<!-- prettier-ignore-end -->

> _"Data without a frame is noise. A good interface is the lens through which the Earth speaks to the user."_
> — Tao of the Webapp Master

---

## Overview

This is an **individual project assignment** that synthesises the React curriculum into a single deployable application. You will build a **Geophysical Aggregator** — a web application that fetches, displays, and contextualises real-time or near-real-time data from public geophysical APIs.

The project is framed as a realistic professional brief: a small dashboard product a field scientist or emergency manager might use to monitor geophysical activity. You are both the engineer and the designer of its architecture.

---

## Departure point: the i18n Simple app

Your **starting point is the `helios-deck-fw` app** built in the [Framework Mode in practice: SSR auth & i18n](../react-framework-mode-auth-i18n/) lesson. That app already gives you:

- React Router v7 Framework Mode with SSR enabled
- `createCookieSessionStorage` with httpOnly cookie session
- `requireUser` / `requireRole` server-side guards
- `:locale` bilingual route tree (`/en/...`, `/es/...`)
- `i18n.server.js` locale resolution + JSON translation files
- Tailwind v4 styling

You will **extend** that scaffold — renaming the app, wiring in React Query, replacing the dummyjson data layer with real public APIs, and adding a proper data visualization layer.

> You do **not** need to rebuild the auth plumbing. Fork your own repo from the lesson template, then build on top of it.

---

## Learning objectives

By submitting this project you will demonstrate that you can:

- [ ] Configure a **React Router v7 Framework Mode** project for SSR with loaders and actions
- [ ] Use **React Query** (`@tanstack/react-query`) to manage client-side fetching, caching, and stale-while-revalidate for geophysical data feeds
- [ ] Integrate at least **two public geophysical APIs** from different domains (seismology, meteorology, oceanography, volcanology, etc.)
- [ ] Implement **server-side locale resolution** with bilingual UI (`/en/...`, `/es/...` or another pair)
- [ ] Implement **httpOnly cookie authentication** (dummyjson or a public OAuth provider) gating at least one route
- [ ] Deploy the application to a public URL (Render, Railway, Fly.io, VPS, or equivalent)
- [ ] Write a short **technical README** documenting setup, APIs used, architectural decisions, and known limitations

---

## Mandatory requirements

The following are non-negotiable. Projects missing any of them will not receive a passing grade.

| Requirement | Notes |
| ----------- | ----- |
| React Router v7 **Framework Mode** | `react-router.config.js` with `ssr: true`; routes defined in `routes.js` |
| At least **two public geophysical APIs** | One must return time-series or event-list data; one must return geographic coordinates suitable for a map or chart |
| **React Query** for client-side data management | At least one `useQuery` with meaningful `staleTime`; at least one cache key that changes with user input |
| **i18n** in at least two languages | Server-resolved locale from URL param; all UI strings translated |
| **Authentication** on at least one route | httpOnly cookie session; `requireUser` or equivalent in the loader |
| **Public deployment** with working URL | App must run without local setup; demo credentials in README |
| **GitHub repository** with clean history | No secrets committed; `.env.example` present; meaningful commit messages |

---

## Recommended API catalogue

All APIs listed here are public and free — most require no API key for moderate request rates. Pick at least two from different categories.

> **Code block note:** The fetch examples below are **Excerpt** blocks — they are illustrative service function bodies. To run them, place them inside a `.server.js` service module and call them from a route loader.

### Seismology

**USGS Earthquake Hazards Program**

Base URL: `https://earthquake.usgs.gov/fdsnws/event/1/`

```js
// Excerpt — app/utils/earthquakesApi.server.js
export async function getRecentEarthquakes({ minMagnitude = 4.5, days = 7 } = {}) {
	const endtime = new Date().toISOString().slice(0, 10);
	const starttime = new Date(Date.now() - days * 86400_000).toISOString().slice(0, 10);
	const url = new URL('https://earthquake.usgs.gov/fdsnws/event/1/query');
	url.searchParams.set('format', 'geojson');
	url.searchParams.set('starttime', starttime);
	url.searchParams.set('endtime', endtime);
	url.searchParams.set('minmagnitude', String(minMagnitude));
	url.searchParams.set('orderby', 'time');
	const res = await fetch(url.toString());
	if (!res.ok) throw new Error(`USGS API ${res.status}`);
	return res.json(); // GeoJSON FeatureCollection
}
```

Returned data includes `geometry.coordinates` (lon, lat, depth), `properties.mag`, `properties.place`, and `properties.time` (Unix ms). Ideal for a map overlay and a magnitude histogram.

---

**IRIS DMC / FDSN Earthquake API** (alternative or complement to USGS)

Base URL: `https://service.iris.edu/fdsnws/event/1/`

Same FDSN protocol as USGS — you can swap the base URL. Useful for older catalog depth or regional filters not available in USGS.

---

### Meteorology & Atmosphere

**Open-Meteo** (no API key required)

Base URL: `https://api.open-meteo.com/v1/forecast`

```js
// Excerpt — app/utils/weatherApi.server.js
export async function getForecast({ lat, lon, days = 7 }) {
	const url = new URL('https://api.open-meteo.com/v1/forecast');
	url.searchParams.set('latitude', String(lat));
	url.searchParams.set('longitude', String(lon));
	url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max');
	url.searchParams.set('forecast_days', String(days));
	url.searchParams.set('timezone', 'auto');
	const res = await fetch(url.toString());
	if (!res.ok) throw new Error(`Open-Meteo ${res.status}`);
	return res.json();
}
```

Returned `daily` arrays are perfect for a line/area chart. Pair with USGS events to show weather conditions at the time and place of a seismic event.

---

**OpenWeatherMap Current & Forecast** (free tier, API key required)

Register at [openweathermap.org](https://openweathermap.org/api). Free tier includes current conditions, 5-day forecast, and air quality index. Useful if you want a richer weather widget alongside geophysical data.

---

**NOAA Global Surface Summary of Day (GSOD)**

Accessed via NOAA's Climate Data Online (CDO) API — requires a free API token. Provides historical daily weather summaries. Useful for retrospective analysis alongside earthquake or volcanic event timelines.

---

### Oceanography & Sea Level

**NOAA Tides and Currents**

Base URL: `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter`

```js
// Excerpt — app/utils/tidesApi.server.js
export async function getTidePredictions({ stationId, days = 2 }) {
	const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
	const url = new URL('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter');
	url.searchParams.set('begin_date', today);
	url.searchParams.set('range', String(days * 24));
	url.searchParams.set('station', stationId);
	url.searchParams.set('product', 'predictions');
	url.searchParams.set('datum', 'MLLW');
	url.searchParams.set('time_zone', 'GMT');
	url.searchParams.set('interval', 'h');
	url.searchParams.set('units', 'metric');
	url.searchParams.set('application', 'geo-aggregator');
	url.searchParams.set('format', 'json');
	const res = await fetch(url.toString());
	if (!res.ok) throw new Error(`NOAA Tides ${res.status}`);
	return res.json();
}
```

Good for tide charts at coastal monitoring stations. Station IDs: San Francisco = `9414290`, New York = `8518750`, etc.

---

**Copernicus Marine Service (CMEMS)** — free, registration required

Provides sea surface temperature, salinity, and ocean current data via REST/OPeNDAP. Free academic/student accounts available. Use it as an extension if you want a more research-grade dataset.

---

### Volcanology

**Smithsonian Global Volcanism Program (GVP) / Volcanoes of the World**

No API key. GVP publishes weekly volcanic activity reports. For programmatic access, use the **GeoNet** (New Zealand) or **VAAC** APIs for near-real-time data.

**GeoNet (New Zealand) Earthquake & Volcano API**

Base URL: `https://api.geonet.org.nz`

```js
// Excerpt — app/utils/geonetApi.server.js
export async function getVolcanicAlerts() {
	const res = await fetch('https://api.geonet.org.nz/volcano/val');
	if (!res.ok) throw new Error(`GeoNet ${res.status}`);
	return res.json();
}

export async function getNZEarthquakes({ pastHours = 48 } = {}) {
	const res = await fetch(
		`https://api.geonet.org.nz/quake?MMI=3`
	);
	if (!res.ok) throw new Error(`GeoNet quakes ${res.status}`);
	return res.json();
}
```

New Zealand Volcanic Alert Levels (0–5) per volcano — compact, easy to display as a status board. Great companion to USGS earthquake data.

---

### Air Quality & Atmosphere

**OpenAQ** (no API key for basic queries)

Base URL: `https://api.openaq.org/v3/`

```js
// Excerpt — app/utils/airQualityApi.server.js
export async function getLatestMeasurements({ locationId }) {
	const res = await fetch(
		`https://api.openaq.org/v3/locations/${locationId}/latest`
	);
	if (!res.ok) throw new Error(`OpenAQ ${res.status}`);
	return res.json();
}
```

PM2.5, PM10, NO2, O3 measurements at thousands of monitoring stations globally. Useful for a multi-sensor environmental dashboard.

---

### Combining APIs — suggested pairings

| Pairing | Teaching value |
| ------- | -------------- |
| USGS Earthquakes + Open-Meteo | Time series + event map; two different temporal resolutions |
| USGS Earthquakes + GeoNet Volcanic Alerts | Event list + status board; contrasting data shapes |
| NOAA Tides + Open-Meteo | Continuous time series from two independent sources |
| GeoNet Earthquakes + OpenAQ | Geographic filtering; real-time vs. periodic polling |

---

## Architecture guide

Your project must follow the **Framework Mode service architecture** established in the lesson:

```
app/
  routes.js                     ← central registry; /:locale/* tree + resource routes
  root.jsx                      ← HTML shell; root loader returns { locale, user }
  utils/
    session.server.js           ← cookie read/write + requireUser/requireRole
    i18n.server.js              ← locale resolution + tFor(locale)
    authApi.server.js           ← login, refresh, verifyOrRefresh
    earthquakesApi.server.js    ← (or whichever APIs you choose)
    weatherApi.server.js
  locales/
    en.json
    es.json
  routes/
    $locale/
      _index.jsx                ← dashboard home; links to all features
      login.jsx                 ← loader + action
      dashboard.jsx             ← protected; calls ≥1 API service in loader
      earthquakes.jsx           ← public or protected; data page
      [your-second-api].jsx
    logout.js
    api/
      healthz.js
      [optional proxy routes]
  components/
    EarthquakeList.jsx
    MagnitudeChart.jsx
    [your components]
```

### Where React Query fits

React Router loaders handle **initial SSR data** (critical for first paint, SEO, auth guards). React Query handles **client-side polling, user-triggered refreshes, and derived queries** — data that changes while the user is on the page.

```js
// Excerpt — mixing loader data and React Query in the same page
// app/routes/$locale/earthquakes.jsx

export async function loader({ request, params }) {
	const user = await getOptionalUser(request);
	// Load the first page of events server-side for instant first paint.
	const initial = await getRecentEarthquakes({ minMagnitude: 5, days: 7 });
	return { initial, user, locale: params.locale };
}

export default function Earthquakes({ loaderData }) {
	const { initial, locale } = loaderData;

	// React Query takes over for live refresh — refetches every 5 minutes.
	const { data, isRefetching } = useQuery({
		queryKey: ['earthquakes', 5, 7],
		queryFn: () => fetch('/api/earthquakes?min=5&days=7').then(r => r.json()),
		initialData: initial,
		staleTime: 5 * 60 * 1000,
		refetchInterval: 5 * 60 * 1000,
	});

	return (/* ... */);
}
```

The `/api/earthquakes` route is a **resource route** in `routes.js` that returns JSON — the client calls it; the loader hydrates the first render.

---

## Extension features (optional but encouraged)

These are **not graded as required**, but a project that includes one or more of them demonstrates genuine mastery. They are good stretch goals if you finish the core requirements early.

### Framer Motion interactions

Add enter animations and layout transitions to data lists and map overlays:

```js
// Excerpt — animated earthquake row
import { motion, AnimatePresence } from 'framer-motion';

function EarthquakeRow({ quake }) {
	return (
		<motion.li
			layout
			initial={{ opacity: 0, y: -8 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.25 }}
		>
			{/* row content */}
		</motion.li>
	);
}
```

Useful patterns: staggered list entrance, magnitude-scaled pulse animation on the map, page transition between dashboard and detail views.

---

### Data visualisation libraries

| Library | Strength | Install |
| ------- | -------- | ------- |
| **Recharts** | Simple React-native charts; composable; good for line/area/bar | `npm i recharts` |
| **Visx** (Airbnb) | D3-powered but React-friendly; precise control | `npm i @visx/xychart @visx/scale` |
| **Chart.js + react-chartjs-2** | Mature; large plugin ecosystem; familiar to data teams | `npm i chart.js react-chartjs-2` |
| **Leaflet + react-leaflet** | Interactive maps; tile layers; custom markers | `npm i leaflet react-leaflet` |
| **Mapbox GL JS** | High-performance WebGL map; 3D terrain; free tier | `npm i mapbox-gl` |
| **deck.gl** | Large-scale geospatial data layers on WebGL | `npm i deck.gl` |

Recommended minimum: **one chart** (time series of magnitudes, tide heights, or temperature) and **one map** (earthquake epicentres or station locations on a Leaflet or Mapbox canvas).

---

### Role-gated admin panel

Extend the `admin` route from the lesson scaffold to show aggregated statistics only visible to `admin`-role dummyjson users: event counts by region, API health status, or a raw data inspector.

---

### Dark mode + theme tokens

Add a `theme.css` with CSS custom properties (Tailwind v4 supports this natively) and a server-resolved theme preference (cookie → `prefers-color-scheme` header → default light). Demonstrate theme switching without flash of incorrect content.

---

### Service Worker + offline fallback

Add a Workbox-based service worker that caches the last successful API response. When the network is unavailable, the dashboard shows a "Last known data" banner and renders stale data. Useful for field use cases where connectivity is intermittent.

---

## AI usage policy

This project is built under the Web Atelier **docs-first, AI-as-amplifier** methodology described in full at [/methodology/en/ai-practical-guide/](/methodology/en/ai-practical-guide/). The rules below are not suggestions — they are grading criteria.

### The non-negotiables

| Rule | Why it matters |
| ---- | -------------- |
| **Understand every line you submit** | You are responsible for the code, not the model. If you cannot explain a function in your own words, it does not belong in your repo. |
| **Document AI usage transparently** | Undisclosed AI-generated code that is submitted as original work is an academic integrity violation. |
| **No secrets in prompts** | Never paste `SESSION_SECRET`, API tokens, or any credential into a chat interface. Assume all prompts may be logged. |
| **Verify security** | AI does not know your threat model. Every auth-related piece of code must be understood and verified by you before submission. |

### The docs-first workflow

For every non-trivial feature (anything touching more than one file, or taking more than 15 minutes), you must follow the two-phase approach:

**Phase 1 — Plan before you code.** Create `docs/plan-[feature].md` before asking AI to implement anything. The plan must include: what you are building, why, the phases, and success criteria. Ask AI to review the plan for gaps — but approve it yourself before proceeding.

**Phase 2 — Implement with a report.** After each AI-assisted implementation phase, ask AI to generate an implementation report and save it to `docs/reports/YYYY-MM-DD-[phase].md`. The report must document: files changed, decisions made, potential issues, and what you verified.

**Minimum documentation expected at submission:**

```
docs/
  plans/
    plan-[feature1].md        ← written before coding started
    plan-[feature2].md
  reports/
    YYYY-MM-DD-[phase1].md    ← generated after each AI session
    YYYY-MM-DD-[phase2].md
```

You do not need a plan for: fixing a typo, adjusting a colour, or changing a single config value. You do need one for: adding a new page, wiring a new API, implementing a query hook, or changing the auth flow.

### Inline disclosure

Mark AI-assisted code at the function level when the AI's contribution was non-trivial:

```js
// Excerpt — inline AI disclosure convention
/**
 * Builds the USGS query URL with dynamic time range and magnitude filter.
 * @ai-assisted Claude proposed the URLSearchParams pattern; reviewed against
 *              the USGS FDSN spec at earthquake.usgs.gov/fdsnws/event/1/.
 */
export function buildUSGSUrl({ minMagnitude, days }) {
	// ...
}
```

You do not need to annotate every line. Annotate at the boundary where AI-generated logic begins: a function, a hook, a service method.

### The verification checklist

Before submitting, confirm each item for every AI-generated piece of code:

- [ ] I can explain what this code does
- [ ] I understand why it is written this way
- [ ] I have tested it manually in the browser
- [ ] I have checked for security issues (especially in auth and cookie handling)
- [ ] I have verified edge cases (empty data, API errors, expired session)
- [ ] I have documented the AI assistance (inline comment or report)

### README AI disclosure (mandatory)

Every repository must include this section in `README.md`. A repository submitted without it will have the **documentation criterion** marked Unsatisfactory regardless of other quality.

**Template** — add to your `README.md` under its own heading.

```markdown
## AI assistance disclosure

This project was developed with AI assistance (Claude / ChatGPT / Copilot — specify which).

**AI was used for:**
- [List specific uses: scaffolding service functions, suggesting React Query patterns,
  debugging loader data flow, generating translation strings, etc.]

**Human verification:**
- All code has been read, understood, and tested by the author
- Auth and cookie handling was verified against the lesson spec and OWASP guidelines
- The author takes full responsibility for the final implementation

**Docs-first plans:** see `docs/plans/`
**Implementation reports:** see `docs/reports/`
```

### Prompts that align with the methodology

Use these prompt patterns from the [AI Practical Guide](/methodology/en/ai-practical-guide/) when working on this project:

**Before you build — the Architect prompt:**

> "I need to implement [feature] for a React Router v7 Framework Mode app. Before writing code, propose 2–3 architectural approaches, compare their trade-offs, and recommend one. Do not write code yet."

**When you are stuck — the Rubber Duck prompt:**

> "I have a bug. Expected: [description]. Actual: [description]. Code: [paste]. Do not give me the answer immediately. Ask me questions that help me discover the bug."

**After each session — the Report Generator prompt:**

> "Based on the changes we just made, generate an implementation report: files changed and why, key decisions, potential issues or tech debt, and what I should verify manually."

### Ethical framework

Web Atelier AI usage is grounded in the [ACM Code of Ethics](https://www.acm.org/code-of-ethics) and the [UNESCO Recommendation on the Ethics of AI (2021)](https://www.unesco.org/en/artificial-intelligence/recommendation-ethics). The relevant principles for this project:

- **Proportionality** — use AI where it amplifies your learning, not where it replaces it. Generating boilerplate is proportionate. Generating the entire auth flow without reading it is not.
- **Transparency and explainability** — your README disclosure and `docs/` folder are your transparency artefacts.
- **Human oversight** — you approve every diff. "The AI wrote it" is not an explanation of a bug.
- **Environmental awareness** — each query has a cost. Ask intentionally. Favour documentation lookup over AI regeneration for things you already know.

> _"AI is not the destination. AI is the compass that helps us navigate toward human flourishing."_
> — Web Atelier Methodology

---

## Submission requirements

### GitHub repository

- Public (or private with instructor as collaborator)
- Branch: `main` (deployable)
- No secrets in commit history; `.env.example` with all required variable names
- Commit messages follow conventional commit style or are human-readable and granular (not `wip`, `final`, `final2`)
- `README.md` at the root — see template below

### Deployed application

- URL is publicly accessible without local setup
- Demo credentials provided in the README (or a clearly labelled demo/guest mode)
- `npm run build && npm run start` succeeds locally before submission

### README template

**Template** — `README.md` (replace `[BRACKETED]` values).

```markdown
# [YOUR APP NAME]

> [One sentence describing the application and the geophysical domain it covers.]

## Live demo

URL: [DEPLOYMENT_URL]
Demo credentials: username `[USERNAME]` / password `[PASSWORD]`
(or) Public mode: all routes are accessible without login — no credentials needed.

## APIs used

| API | Endpoint | Data type | Refresh strategy |
| --- | -------- | --------- | ---------------- |
| [API NAME] | [BASE URL] | [e.g. GeoJSON events] | [e.g. React Query, 5 min] |
| [API NAME] | [BASE URL] | [e.g. daily time series] | [e.g. SSR loader only] |

## Tech stack

- React Router v7 Framework Mode (SSR)
- React Query v5 (`@tanstack/react-query`)
- Tailwind v4
- [Any visualisation or map libraries]
- Deployed on [Render / Railway / Fly.io / VPS]

## Architecture notes

[2–4 sentences. Where does React Query run? What does the SSR loader handle? How is auth scoped?]

## Known limitations

[Be honest. Examples: "Polling interval is fixed at 5 min; no WebSocket push yet." "Admin role only works with dummyjson credentials." "Map does not render without JavaScript."]

## Setup

\`\`\`bash
npm install
cp .env.example .env          # fill in SESSION_SECRET (and any API keys)
npm run dev
\`\`\`

Required env vars:
- `SESSION_SECRET` — any random string ≥ 32 chars (openssl rand -base64 32)
- `[OTHER_VAR]` — [description]
```

---

## Deployment decision guide

React Router v7 Framework Mode requires a **Node.js process** — not a static CDN. Not every "deploy for free" platform supports this cleanly. Use the table below to pick a platform before you build, not after.

| Platform | Effort | Free tier | SSR / Node.js | Notes |
| -------- | ------ | --------- | ------------- | ----- |
| **Render** | Low | Yes — sleeps after 15 min inactivity | Native | Easiest cold start. Add a `/api/healthz` ping to prevent sleep during demo. |
| **Railway** | Low | Yes — $5 credit/month | Native | Always-on on free credit; GitHub deploy in ~2 min. Recommended default. |
| **Fly.io** | Medium | Yes — 3 shared VMs | Native | More setup (`flyctl launch`); best for persistent apps. |
| **VPS + PM2** | High | Depends on provider | Native | Full control; PM2 + nginx as shown in the lesson. Good if you already have a server. |
| **Vercel** | Low–Medium | Yes | **Requires config** | Works, but needs the `@react-router/vercel` adapter and a `vercel.json`. See below. |

**Recommended platform for this assignment: Railway or Render.** Both deploy a Node.js app from a GitHub repo in under five minutes with no extra config beyond env vars.

---

### Deploying to Railway (recommended path)

```bash
# 1. Push your repo to GitHub
# 2. Go to railway.app → New Project → Deploy from GitHub repo
# 3. Set environment variables in the Railway dashboard:
#    SESSION_SECRET=<openssl rand -base64 32>
#    NODE_ENV=production
# 4. Railway auto-detects the start command from package.json:
#    "start": "react-router-serve ./build/server/index.js"
# 5. Done — Railway gives you a public URL.
```

No `Dockerfile` needed. Railway reads `npm run build` then `npm run start` from your `package.json`.

---

### Deploying to Render

```bash
# In the Render dashboard → New Web Service → Connect GitHub repo
# Build command:  npm install && npm run build
# Start command:  npm run start
# Environment variables: SESSION_SECRET, NODE_ENV=production
```

Free tier instances spin down after 15 minutes of inactivity — the first request after sleep takes ~30 seconds. Add a note in your README so the grader knows to wait.

---

### Deploying to Vercel (extra steps required)

Vercel's default runtime is Edge (V8 isolates), which does not support the Node.js `crypto` module that `createCookieSessionStorage` needs. You must opt into the Node.js runtime explicitly.

**Step 1** — Install the Vercel adapter:

```bash
npm install @react-router/vercel
```

**Step 2** — Update `react-router.config.js`:

```js
// react-router.config.js
import { vercelPreset } from '@react-router/vercel';

export default {
	ssr: true,
	presets: [vercelPreset()],
};
```

**Step 3** — Add `vercel.json` at the project root:

```json
{
	"functions": {
		"build/server/index.js": {
			"runtime": "nodejs22.x"
		}
	}
}
```

**Step 4** — Set env vars in the Vercel dashboard: `SESSION_SECRET`, `NODE_ENV=production`, and any API keys.

> **If `createCookieSessionStorage` still throws at runtime**, add `export const runtime = 'nodejs';` at the top of your `app/entry.server.jsx`. Vercel's React Router adapter handles the rest.

**Vercel free tier limits** that affect this project: 100 GB-hours compute/month, 100 GB bandwidth. For a demo app with moderate traffic, this is more than enough.

---

### Environment variables — all platforms

Whatever platform you choose, these variables must be set in the deployment dashboard (never committed):

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `SESSION_SECRET` | Yes | Random string ≥ 32 chars — `openssl rand -base64 32` |
| `NODE_ENV` | Yes | Set to `production` |
| `MAPBOX_TOKEN` | If using Mapbox | Public token from mapbox.com — still keep it in env, not in code |
| Any other API keys | If applicable | OpenWeatherMap, NOAA CDO, etc. |

Document all required variables in `.env.example` with placeholder values. A grader who cannot run `cp .env.example .env && npm run dev` without guessing variable names will mark the setup criterion down.

---

## Evaluation rubric

| Criterion | Weight | Unsatisfactory | Satisfactory | Excellent |
| --------- | ------ | -------------- | ------------ | --------- |
| **React Router Framework Mode** — SSR, loaders, actions, route registry | 20% | SPA mode or no loaders; missing `routes.js` | SSR enabled; loaders fetch data; `routes.js` complete | Loaders + actions for all mutations; guards in loaders; resource routes for API |
| **React Query integration** | 15% | No React Query; `useEffect` for fetching | `useQuery` in at least one page; `staleTime` configured | Multiple queries; cache keys change with filters; `initialData` from SSR loader |
| **Public geophysical APIs** — two distinct sources | 15% | Fewer than two APIs; mock data | Two APIs integrated, data visible in UI | Two APIs with meaningful cross-domain presentation; data shapes documented |
| **i18n** — bilingual UI, server-resolved locale | 10% | Hardcoded strings; no locale routing | `:locale` param; `en.json` and `es.json` complete; UI switches cleanly | All strings translated; locale cookie persisted; language switch works without reload |
| **Authentication** — httpOnly cookie session, server guard | 15% | No auth; or client-side-only guard | httpOnly cookie; `requireUser` gates ≥1 route; logout clears cookie | Correct `Set-Cookie` on login/logout; `?from=` redirect after login; session verified per request |
| **Deployment** — public URL, working build | 10% | No deployment or local-only | App accessible at a public URL; `npm run build` passes locally | CI/CD or one-command redeploy; HTTPS; no exposed secrets |
| **Code quality & architecture** — service layer, file structure | 10% | Services mixed into components; secrets in components | `.server.js` service layer; components receive data via `loaderData` | Clean separation; no dead code; meaningful commits; `.env.example` |
| **README, docs-first artefacts & AI disclosure** | 5% | No README; no AI disclosure; no plans or reports | README complete; AI disclosure present; at least one `docs/plans/` file | `docs/plans/` + `docs/reports/` present; inline `@ai-assisted` comments where relevant; verification checklist demonstrably followed |

**Total: 100%**

> A project that meets every *Satisfactory* criterion across all rows will receive a passing grade. The *Excellent* column is for distinction.

---

## Frequently asked questions

**Can I use a different auth provider instead of dummyjson?**
Yes — GitHub OAuth via a public endpoint, or any provider that can be called server-side from a loader and whose token can be stored in `createCookieSessionStorage`. Document your choice in the README. If you use an OAuth provider, the token exchange must happen in an action or loader (not in the browser), and the resulting session must be httpOnly.

**Can I add TypeScript?**
Yes. The lesson scaffold uses plain JavaScript, but you may migrate to TypeScript. TypeScript does not add or subtract from the grading criteria.

**Can I use a different CSS framework?**
Yes, as long as the result looks deliberate. Tailwind is the default; shadcn/ui, Radix UI, or a fully custom CSS system are all acceptable. Document your choice.

**Can I use a different map library?**
Yes. Leaflet, Mapbox GL JS, and deck.gl are all acceptable. If you use Mapbox, handle the access token as an environment variable (`MAPBOX_TOKEN`); never commit it.

**What deployment platforms are accepted?**
Any platform that can run a Node.js process: Render, Railway, Fly.io, Heroku, a VPS (nginx + PM2 as shown in the lesson), or Vercel (note: Vercel's React Router adapter uses Edge/serverless — test `createCookieSessionStorage` compatibility before committing to it). The only requirement is that the deployed URL works without local setup.

**Can I work in a team?**
No — this is an individual assignment. Commit history must reflect individual authorship. You may ask peers for code review; document any meaningful external contributions in the README under "Acknowledgements".

---

## Resources

- **React Router v7 Framework Mode** — [reactrouter.com/start/modes](https://reactrouter.com/start/modes)
- **React Query v5 docs** — [tanstack.com/query/latest](https://tanstack.com/query/latest)
- **TanStack Query + React Router** — [tanstack.com/query/latest/docs/framework/react/guides/ssr](https://tanstack.com/query/latest/docs/framework/react/guides/ssr)
- **USGS Earthquake API** — [earthquake.usgs.gov/fdsnws/event/1/](https://earthquake.usgs.gov/fdsnws/event/1/)
- **Open-Meteo** — [open-meteo.com/en/docs](https://open-meteo.com/en/docs)
- **NOAA Tides and Currents API** — [api.tidesandcurrents.noaa.gov/api/prod/](https://api.tidesandcurrents.noaa.gov/api/prod/)
- **GeoNet API** — [api.geonet.org.nz](https://api.geonet.org.nz)
- **OpenAQ v3** — [docs.openaq.org](https://docs.openaq.org)
- **Framer Motion docs** — [motion.dev/docs](https://motion.dev/docs)
- **Recharts** — [recharts.org](https://recharts.org)
- **react-leaflet** — [react-leaflet.js.org](https://react-leaflet.js.org)
- **Lesson: Framework Mode in practice** — [../react-framework-mode-auth-i18n/](../react-framework-mode-auth-i18n/)
- **Lesson: React Backend Integration** — [../react-backend-integration/](../react-backend-integration/)

---

## Closing

> _"A dashboard that shows the Earth's pulse is not decoration. It is an argument: that data, well framed, makes the invisible visible."_

You are not building a toy. You are building the kind of product a scientist opens at 6 a.m. when the seismograph wakes them. Make it honest. Make it fast. Make it work without JavaScript for its first breath. Then make it live.

---

## Resumen de la práctica (en español)

### Agregador Geofísico — Proyecto Individual

Construirás una aplicación web que consuma **APIs públicas de datos geofísicos** (sismología, meteorología, oceanografía, vulcanología...) y los presente en un dashboard funcional, desplegado y accesible desde cualquier navegador.

### Punto de partida

Parte de la aplicación `helios-deck-fw` que construiste en la lección [Framework Mode en práctica](../react-framework-mode-auth-i18n/). Ya tienes el scaffolding de SSR, sesiones con cookie httpOnly, rutas bilingües y Tailwind. **No tienes que reescribir la fontanería de autenticación** — extiéndela.

### Requisitos obligatorios

| Requisito | Qué debes entregar |
| --------- | ------------------ |
| **React Router v7 Framework Mode** | SSR activo (`ssr: true`); rutas en `routes.js`; datos cargados en `loader`, mutaciones en `action` |
| **Dos APIs geofísicas públicas** | De dominios distintos (ej. sismología + meteorología); al menos una devuelve coordenadas geográficas |
| **React Query** | Mínimo un `useQuery` con `staleTime` configurado; los datos iniciales vienen del `loader` de SSR |
| **i18n bilingüe** | Locale resuelto en el servidor desde el parámetro URL (`/en/...`, `/es/...`); todos los textos traducidos |
| **Autenticación** | Sesión con cookie httpOnly; al menos una ruta protegida con `requireUser` en el loader |
| **Despliegue público** | URL accesible sin instalación local; credenciales de demo en el README |
| **Repositorio GitHub** | Sin secretos en el historial; `.env.example`; commits con mensajes legibles |

### Qué se entrega

1. **URL de la aplicación desplegada** (Render, Railway, Fly.io, VPS, etc.)
2. **Repositorio GitHub** con rama `main` desplegable
3. **README.md** con: descripción, APIs usadas, stack técnico, notas de arquitectura, limitaciones conocidas e instrucciones de setup

### Criterios de evaluación (resumen)

| Criterio | Peso |
| -------- | ---- |
| React Router Framework Mode (SSR, loaders, actions, routes.js) | 20% |
| React Query (useQuery, staleTime, initialData desde loader) | 15% |
| Dos APIs geofísicas integradas y visibles en la UI | 15% |
| Autenticación con cookie httpOnly y guard en loader | 15% |
| i18n bilingüe con locale resuelto en servidor | 10% |
| Despliegue público funcionando | 10% |
| Calidad del código y arquitectura de servicios | 10% |
| README y documentación | 5% |

Un proyecto que alcance el nivel *Satisfactorio* en todos los criterios obtiene nota de aprobado. El nivel *Excelente* corresponde a matrícula de honor.

### APIs recomendadas (sin clave, gratuitas)

- **USGS Earthquakes** — terremotos globales en GeoJSON
- **Open-Meteo** — previsión meteorológica diaria (sin clave)
- **NOAA Tides and Currents** — predicciones de mareas por estación
- **GeoNet NZ** — alertas volcánicas y terremotos en Nueva Zelanda
- **OpenAQ** — calidad del aire en estaciones de todo el mundo

### Extensiones opcionales (no obligatorias)

- Animaciones con **Framer Motion** (listas, transiciones de página, pulso en el mapa)
- Visualizaciones con **Recharts**, **Leaflet** o **Mapbox GL JS**
- Panel de administración con guard de rol (`requireRole`)
- Modo oscuro con tokens CSS resueltos en el servidor
- Service Worker con fallback offline ("Últimos datos conocidos")

### Uso de IA (política obligatoria)

Este proyecto sigue la metodología **docs-first** de Web Atelier, descrita en detalle en [/methodology/en/ai-practical-guide/](/methodology/en/ai-practical-guide/). Las normas siguientes forman parte de los criterios de evaluación.

**Lo que es obligatorio:**

- **Entender cada línea que entregas.** Si no puedes explicar una función con tus propias palabras, no pertenece a tu repositorio.
- **Documentar el uso de IA de forma transparente.** Código generado por IA presentado como trabajo original sin declaración es una falta de integridad académica.
- **Nunca pegues secretos en prompts.** `SESSION_SECRET`, tokens de API y credenciales nunca deben aparecer en un chat con IA.

**El flujo docs-first:**

1. Para cualquier función no trivial (más de un archivo, más de 15 minutos), crea `docs/plans/plan-[feature].md` **antes** de pedir a la IA que implemente nada.
2. Después de cada sesión de implementación asistida por IA, genera un informe y guárdalo en `docs/reports/YYYY-MM-DD-[fase].md`.

**La sección de declaración en el README es obligatoria.** Sin ella, el criterio de documentación se califica como Insatisfactorio. Debe indicar: qué herramienta de IA usaste, para qué la usaste, y que has revisado y verificado todo el código.

**Comentarios inline:** marca las funciones con contribución IA no trivial con `@ai-assisted` y una nota breve sobre qué verificaste.

**Marco ético:** el uso de IA en Web Atelier se basa en el [Código Ético de la ACM](https://www.acm.org/code-of-ethics) y la [Recomendación UNESCO sobre Ética de la IA (2021)](https://www.unesco.org/en/artificial-intelligence/recommendation-ethics). Proporcionalidad, transparencia y supervisión humana son los principios guía.

> _"Un dashboard que muestra el pulso de la Tierra no es decoración. Es un argumento: que los datos, bien enmarcados, hacen visible lo invisible."_
