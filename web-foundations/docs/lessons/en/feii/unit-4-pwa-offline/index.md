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
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

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

```js
// sw.js
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

```js
// main.js
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

1. **Create a simple Astro project** with a few pages
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

## B1 · Lección magistral — 1 h

**Claim:** offline-first is an architectural decision made before the network fails, not a fallback bolted on after the fact.

An educational-systems architecture study lists "connectivity independent" as a first-class requirement, met by service workers, alongside a stated distinction between features that must survive offline (points, badges, progress tracking) and features that legitimately require connectivity (leaderboards, social interaction) — "enhanced with service workers to function offline or on low-quality networks" (Fibrian et al. 2026, 2 — Ahmes coat `483a966a`, node `00b4388d-211a-5715-8504-64973d1a8eb7`).

**Read this citation carefully.** The source is a study of a *gamified learning system's* software architecture, not a study of how to teach front-end development. It grounds the vocabulary and design requirement — which features can degrade gracefully, which cannot — never the claim that this unit's teaching sequence works pedagogically.

**Declared gap:** the grounding matrix names an HE precedent (Case 2020) for offline-failure-mode pedagogy that is **not yet in the vault** — it is not cited here, and no substitute is offered. No source establishes that this unit's PWA/offline teaching sequence produces measurably better learning outcomes than an alternative.

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

## Provenance and evidence gate

- Fibrian, I. D., Utomo, T. P., Lukmana, I. &amp; Muttaqin, Z. (2026). *Architectural Consideration for Gamified Learning Systems: An Exploration of Offline-First Progressive Web Application.* Register: Jurnal Ilmiah Teknologi Sistem Informasi 11(2), 139–150. `10.26594/register.v11i2.5087`. Ahmes coat `483a966a`, node `00b4388d-211a-5715-8504-64973d1a8eb7`, p.2. Resolved via `ahmes query --cite`, `evaluator_safe=yes`.
  <!-- provenance: located by grep over extract/index.md for "enhanced with service workers" inside coat 483a966a (matrix-named as the adjacent architecture coat for Unit 4), node/page resolved via sqlite3 join fission_node × anchor_spatial, cite confirmed via `ahmes query --cite <db>:<node_id> --require-evaluator-safe` -->
- **Missing evidence:** this unit does not establish that teaching offline-first PWA architecture produces measurably better learning outcomes for front-end students than an alternative sequence. The cited source studies a learning system's own offline-first design, not the teaching of that design — the pedagogy gap named in the FE II grounding matrix row for Unit 4 stays open. The HE precedent named in the matrix (Case 2020) remains outside the vault and is not cited.
