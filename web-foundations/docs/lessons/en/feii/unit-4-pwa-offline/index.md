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
