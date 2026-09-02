---
layout: lesson
title: 'Unit 4: Progressive Web Apps & Offline Capabilities'
title_alt: 'Unidad 4: PWA y Capacidades Offline'
slug: feii-unit-4-pwa-offline
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-4-pwa-offline/
description: 'Progressive Web App fundamentals: service workers, offline caching, installability, and the PWA lifecycle.'
tags:
  [
    feii,
    pwa,
    service-workers,
    offline-first,
    caching-strategies,
    installability,
  ]
status: complete
---

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> Offline is a product promise designed as a failure mode.</p>
<p><strong>Field lens:</strong> **Practice anchor:** service workers, caching, manifests, and recovery states. **Frontier signal:** local-first data, sync/conflict resolution, and browser-sensitive background work continue to evolve. **Pedagogy status:** offline-first architecture is grounded; this FE failure-mode sequence remains a pilot.</p>
</aside>

> **Studio test:** Test offline, stale, reconnect, and data-conflict states.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## Before you start

| Requirement | Required? |
| --- | --- |
| Team Astro project from Units 2–3 (HTTPS or localhost) | Yes |
| `npm run build` green on main branch | Yes |
| Chrome or Edge DevTools (Application + Lighthouse tabs) | Yes |
| Team backlog issue for offline fallback | For B2 lab |

**Official time:** 1 h magistral (B1) + 2 h lab (team, B2) + 2 h exercise resolution (individual, B3).

> Service workers require **HTTPS** in production. `localhost` is exempt for development.

---

## Follow this path

| Phase | Who | Action | Section |
| --- | --- | --- | --- |
| 1 | Individual | List which routes/features must survive offline vs may degrade | Master idea + What is a PWA |
| 2 | Individual | Add `manifest.json` + link tags; verify icons load | Web App Manifest |
| 3 | Individual | Register `sw.js`; confirm in DevTools → Application | Service Workers |
| 4 | Individual | Assign cache-first / network-first / stale-while-revalidate **per route** | Caching Strategies |
| 5 | Individual | Offline test: load online → DevTools Offline → refresh | Practice Exercise |
| 6 | Team | Ship offline fallback on real backlog issue; record Lighthouse delta (B2) | B2 · Lab |
| 7 | Individual | Complete B3; item 2 declared no-AI | B3 · Exercises |

---

## Verify before you leave

- [ ] Manifest validates in DevTools → Application → Manifest (no missing icons)
- [ ] Service worker status is **activated**; update flow documented if you changed `sw.js`
- [ ] Offline refresh loads shell or explicit offline page (not a blank error)
- [ ] Lighthouse PWA section scored before **and** after (screenshot or CI artifact)
- [ ] Release note maps each route to a caching strategy and why
- [ ] B3 item 2 completed without AI assistance (declared)

---

## Common failures

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| SW never activates | Syntax error in `sw.js`; registration promise rejected | Check Console; fix register path (`/sw.js` at site root) |
| Old assets after deploy | Cache name unchanged; no `activate` cleanup | Bump cache version; delete old caches in `activate` handler |
| API data never updates | Cache-first on dynamic JSON | Switch route to network-first or stale-while-revalidate |
| Install prompt missing | Invalid manifest, missing icons, or not HTTPS | Fix manifest errors in DevTools; test on localhost or HTTPS |
| Offline = white screen | Shell not precached; only network routes | Precache `/`, CSS, JS, offline fallback HTML |
| “Works in dev, not prod” | SW blocked on HTTP origin | Deploy with HTTPS |
| Team lab blocked | No backlog issue | Use professor seed issue |

---

## Submit (Unit 4 evidence)

- **Individual:** B3 answers + offline test notes (what broke, what you fixed)
- **Team:** issue link, PR link, Lighthouse before/after, caching-strategy release note

---

> _"The best web app is the one that works even when the network doesn't."_

> **AI Assistance Disclosure:** This unit integrates AI-assisted development following the docs-first methodology. Plans, prompts, and implementation reports are documented throughout the process.

---

## Code conventions in this unit

Same vocabulary as Units 2–3 and FE II Unit 5 — check the label before you paste:

- **CodeSandbox-ready** — complete file, copy-paste, runs once the sandbox scaffold is in place.
- **Excerpt** — partial pattern, illustrative. Does **not** run as-is. The three caching-strategy fetch handlers below are Excerpts.
- **Template** — copy and replace placeholder values before use. The manifest JSON below is a Template — `name`, colors, and icon paths are this lesson's examples, not yours.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- **Understand the PWA paradigm** — What makes an app "progressive" and why it matters
- **Implement service workers** — Caching strategies, offline fallbacks, and cache invalidation
- **Make apps installable** — Web app manifest, install prompts, and app-like behavior
- **Design offline experiences** — Graceful degradation and offline-first UX patterns
- **Test PWA capabilities** — Lighthouse PWA audit, offline testing, and performance validation

---

## 📖 What is a PWA?

A Progressive Web App is a web app that uses modern web capabilities to deliver an app-like experience:

### Core PWA Characteristics

1. **Installable** — Can be added to home screen from the browser
2. **Offline-capable** — Works without network connectivity
3. **Fast and responsive** — Loads quickly, responds to user input instantly
4. **Secure** — Served over HTTPS (PWA requirement)
5. **Discoverable** — Identifiable as an application (manifest, meta tags)

### The Progressive Enhancement Philosophy

PWAs enhance the web experience progressively:

```
┌─────────────────────────────────────────────────────────┐
│              PROGRESSIVE ENHANCEMENT LAYERING             │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Layer 1: Basic HTML/CSS (works everywhere)             │
│   Layer 2: JavaScript enhancement (modern browsers)       │
│   Layer 3: Service Worker (PWA support)                   │
│   Layer 4: Installable (home screen integration)          │
│                                                          │
│   Each layer adds capability without breaking earlier layers │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

This is different from native apps, which require all-or-nothing platform support.

---

## 🔧 Service Workers

Service workers are the backbone of PWA offline capabilities:

### What is a Service Worker?

A service worker is a JavaScript file that runs separately from your main thread:

- **Network proxy** — Intercepts network requests and decides how to handle them
- **Cache control** — Stores assets for offline use and manages cache invalidation
- **Background sync** - Performs actions even when the app is closed (push notifications, data sync)

### Service Worker Lifecycle

**Excerpt** — add `skipWaiting` / cache cleanup in `activate` when you iterate in lab:

```js
// sw.js — Excerpt
self.addEventListener('install', (event) => {
  // Cache assets during install
  event.waitUntil(
    caches.open('static-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/styles.css',
        '/script.js',
        '/images/logo.png',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Intercept network requests
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

### Registering a Service Worker

**Excerpt** — call after page load; SW file must be served from site root scope:

```js
// main.js — Excerpt
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('SW registered:', registration);
    })
    .catch((error) => {
      console.log('SW registration failed:', error);
    });
}
```

---

## 📦 Caching Strategies

Different caching patterns for different use cases:

### Cache-First Strategy

Best for static assets that rarely change:

```js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        const responseClone = fetchResponse.clone();
        caches.open('dynamic-v1').then((cache) => {
          cache.put(event.request, responseClone);
        });
        return fetchResponse;
      });
    })
  );
});
```

**Use for:** CSS, JS, images, fonts

### Network-First Strategy

Best for dynamic content that should always be fresh:

```js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).then((fetchResponse) => {
      const responseClone = fetchResponse.clone();
      caches.open('dynamic-v1').then((cache) => {
        cache.put(event.request, responseClone);
      });
      return fetchResponse;
    }).catch(() => {
      return caches.match(event.request);
    })
  );
});
```

**Use for:** API responses, dynamic HTML

### Stale-While-Revalidate

Balance between speed and freshness:

```js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        const networkResponseClone = networkResponse.clone();
        caches.open('dynamic-v1').then((cache) => {
          cache.put(event.request, networkResponseClone);
        });
        return networkResponse;
      });
      return cachedResponse || fetchPromise;
    })
  );
});
```

**Use for:** Most web content (best default for general use)

---

## 📱 Web App Manifest

The manifest makes your app installable:

### manifest.json

```json
{
  "name": "FE II PWA Demo",
  "short_name": "FE II PWA",
  "description": "Progressive Web App demonstration",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Linking the Manifest

```html
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#2563eb" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

### Display Modes

- **standalone** — Full screen, no browser UI
- **minimal-ui** — Minimal browser UI (back button, URL bar)
- **browser** — Normal browser window

---

## 🎯 Practice Exercise

**Time:** 2 hours

1. **Use your team Astro project** from Units 2–3 (do not start a new repo)
2. **Add a service worker** with cache-first strategy for static assets
3. **Create a web app manifest** with icons and display settings
4. **Test offline functionality**:
   - Load the app with network connected
   - Go offline (DevTools → Network → Offline)
   - Refresh the page — it should still load from cache
5. **Test installability**:
   - Open in Chrome/Edge
   - Look for the install icon in the address bar
   - Install to home screen
   - Launch from home screen — should look like a native app
6. **Run Lighthouse PWA audit** — Aim for 90+ score

**Deliverable:** PWA URL + Lighthouse PWA audit screenshot

---

## 📚 Recommended Reading

- **PWA Checklist** — https://web.dev/progressive-web-apps-checklist/
- **Service Worker API** — https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- **Workbox** — https://developer.chrome.com/docs/workbox (service worker library)
- **Web App Manifest** — https://developer.mozilla.org/en-US/docs/Web/Manifest

---

## ✅ Session Outcome

By the end of this unit, you should:

- Understand what makes a web app a PWA and why progressive enhancement matters
- Be able to implement service workers with different caching strategies
- Create web app manifests that make apps installable
- Design offline-first experiences with graceful degradation
- Test PWA capabilities using Lighthouse and offline simulation

This unit covers the **Desarrollo de PWA, funcionalidades offline** official CONTENIDOS requirement. The skills learned here apply to any future web project, whether using Astro, React, or vanilla JS.

---

> _"Offline is not a bug. It's a feature of the distributed web."_

> _"Deploy in haste, repent in downtime."_
> — Tao of Development, `ops-001`
{: .tao-development-quote }

{% comment %}
outcome-graphic-selection:
  source-section: "✅ Session Outcome"
  visual-grammar: "offline-resilience-path — a network request moving between online, cached, stale, and recoverable offline states"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

## B1 · Lección magistral — 1 h

**Claim:** offline-first is an architectural decision made before the network fails, not a fallback bolted on after the fact.

An educational-systems architecture study lists "connectivity independent" as a first-class requirement, met by service workers, alongside a stated distinction between features that must survive offline (points, badges, progress tracking) and features that legitimately require connectivity (leaderboards, social interaction) — "enhanced with service workers to function offline or on low-quality networks" (Fibrian et al. 2026, 2).
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
An educational-systems architecture study lists "connectivity independent" as a first-class requirement, met by service workers, alongside a stated distinction between features that must survive offline (points, badges, progress tracking) and features that legitimately require connectivity (leaderboards, social interaction) — "enhanced with service workers to function offline or on low-quality networks" (Fibrian et al. 2026, 2 — Ahmes coat `483a966a`, node `00b4388d-211a-5715-8504-64973d1a8eb7`).
-->
{% endif %}

**Read this citation carefully.** The source is a study of a *gamified learning system's* software architecture, not a study of how to teach front-end development. It grounds the vocabulary and design requirement — which features can degrade gracefully, which cannot — never the claim that this unit's teaching sequence works pedagogically.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
**Evidence update (2026-08-23):** Fibrian et al. is now confirmed evaluator-safe in Ahmes for offline-first architecture, service workers, caching, UI trade-offs, and prototype limits. A separate 2026 school study is retained as a web-only research lead in the dated FE II gap-pass record in the research repository copy, not as a student-facing Ahmes citation. The HE precedent named in the matrix (Case 2020) remains outside the vault. **No source establishes that this unit's PWA/offline teaching sequence produces measurably better learning outcomes than an alternative.**
-->
{% endif %}

**Speaker outline:** see `deck-outline.md`.

## B2 · Prácticas de laboratorio — 2 h · team

Real backlog issue: add an offline fallback to the team's own Astro project from Units 2–3 — a cached app shell or an explicit offline page — choosing **cache-first** for static assets and **network-first or stale-while-revalidate** for any dynamic route, decided per route rather than blanket.

Definition of done: a Lighthouse PWA audit score is recorded before and after; the manifest makes the app installable; CI is green; a human reviews any AI-generated suggestion; a release note states which caching strategy covers which route and why.

Roles rotate; do not repeat a role already owned in Units 2–3's labs.

Evidence: branch, PR, Lighthouse score delta, AI accept/reject log row if AI assistance was used.

## B3 · Resolución de ejercicios — 2 h · individual

1. **Diagnostic:** a service worker caches an API response with cache-first and never invalidates it. Describe the staleness bug a user will see, and name the caching strategy that fixes it.
2. **No-AI (declared):** for four feature descriptions (a saved-draft editor, a live chat widget, a static help page, a payment form), decide "must work offline," "may degrade gracefully," or "must fail loudly offline," and justify each in one sentence, without AI assistance.
3. Explain why service-worker registration failing silently in a browser that doesn't support it is a progressive-enhancement success, not a bug — and what the app must never assume as a result.

Professor answer sketches belong in the instructor copy, not the public handout. These exercises are intentionally decontextualised from the team's product.

## References

- Fibrian, I. D., T. P. Utomo, I. Lukmana, and Z. Muttaqin. 2026. “Architectural Consideration for Gamified Learning Systems: An Exploration of Offline-First Progressive Web Application.” *Register: Jurnal Ilmiah Teknologi Sistem Informasi* 11 (2): 139–150. https://doi.org/10.26594/register.v11i2.5087.
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- Fibrian, I. D., Utomo, T. P., Lukmana, I. &amp; Muttaqin, Z. (2026). *Architectural Consideration for Gamified Learning Systems: An Exploration of Offline-First Progressive Web Application.* Register: Jurnal Ilmiah Teknologi Sistem Informasi 11(2), 139–150. `10.26594/register.v11i2.5087`. Ahmes coat `483a966a`, node `00b4388d-211a-5715-8504-64973d1a8eb7`, p.2. Resolved via `ahmes query &#45;&#45;cite`, `evaluator_safe=yes`.
-->
{% endif %}
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
located by grep over extract/index.md for "enhanced with service workers" inside coat 483a966a (matrix-named as the adjacent architecture coat for Unit 4), node/page resolved via sqlite3 join fission_node × anchor_spatial, cite confirmed via `ahmes query &#45;&#45;cite <db>:<node_id> &#45;&#45;require-evaluator-safe`
-->
{% endif %}
- **Remaining evidence boundary:** this unit does not establish that teaching offline-first PWA architecture produces measurably better learning outcomes for front-end students than an alternative sequence. The cited source studies a learning system's own offline-first design; the unit therefore remains a failure-mode teaching pilot with process traces and verification tests.
