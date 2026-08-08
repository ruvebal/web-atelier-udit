---
layout: lesson
title: 'Unit 7: Performance Engineering — Core Web Vitals & Optimization'
title_alt: 'Unidad 7: Ingeniería de Rendimiento — Core Web Vitals y Optimización'
slug: feii-unit-7-performance
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-7-performance/
description: 'Performance engineering fundamentals: Core Web Vitals, performance budgets, bundle optimization, and runtime performance optimization.'
tags:
  [
    feii,
    performance,
    core-web-vitals,
    performance-budgets,
    bundle-optimization,
    runtime-optimization,
    web-performance,
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

> _"Performance is not an optimization target. It's a baseline expectation."_

> **AI Assistance Disclosure:** This unit integrates AI-assisted development following the docs-first methodology. Plans, prompts, and implementation reports are documented throughout the process.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- **Measure performance** — Core Web Vitals, Lighthouse audits, and performance budgets
- **Optimize bundles** — Code splitting, tree shaking, lazy loading, and dependency pruning
- **Optimize runtime** — Image optimization, font loading, critical CSS, and rendering optimization
- **Set performance budgets** — Define and enforce budgets for bundle size, load time, and metrics
- **Debug performance issues** — Identify bottlenecks using Chrome DevTools and profiling tools

---

## 📖 Core Web Vitals

Core Web Vitals are the essential metrics for a good user experience:

### The Three Core Metrics

1. **LCP (Largest Contentful Paint)** — Time to render the largest content element (≤ 2.5s)
2. **INP (Interaction to Next Paint)** — Time from user interaction to visual response (≤ 200ms)
3. **CLS (Cumulative Layout Shift)** — Visual stability during page load (≤ 0.1)

### Measuring Core Web Vitals

```bash
# Lighthouse CLI
npx lighthouse https://example.com --view

# Web Vitals extension (Chrome)
# Install from Chrome Web Store
```

### Real User Monitoring (RUM)

```js
// web-vitals library
import { onCLS, onFID, onLCP } from 'web-vitals';

onCLS(console.log);
onFID(console.log);
onLCP(console.log);
```

---

## 📦 Bundle Optimization

### Code Splitting

```js
// Lazy load routes
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
```

### Tree Shaking

```js
// Bundle analysis
npm install -D @rollup/plugin-analyzer

// vite.config.ts
import { defineConfig } from 'vite';
import analyzer from '@rollup/plugin-analyzer';

export default defineConfig({
  plugins: [analyzer()],
});
```

### Dependency Pruning

```js
// Replace heavy libraries with lighter alternatives
// Example: Moment.js → date-fns or dayjs
// Example: Lodash → lodash-es (tree-shakeable)
```

---

## 🖼️ Asset Optimization

### Image Optimization

```js
// next/image (Next.js) or astro/image (Astro)
import { Image } from 'astro:assets';
import myImage from './my-image.png';

<Image src={myImage} alt="Description" format="webp" width={800} height={600} />
```

**Best practices:**
- Use modern formats (WebP, AVIF)
- Serve responsive images (srcset)
- Lazy load below-the-fold images
- Compress images automatically

### Font Loading

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />

<!-- Display fallback font immediately -->
<style>
  @font-face {
    font-family: 'Inter';
    font-display: swap;
    src: url('/fonts/inter.woff2') format('woff2');
  }
</style>
```

---

## 🎨 Critical CSS & Rendering Optimization

### Critical CSS Extraction

```js
// vite-plugin-critical (Vite)
import { defineConfig } from 'vite';
import critical from 'vite-plugin-critical';

export default defineConfig({
  plugins: [
    critical({
      criticalUrl: 'http://localhost:3000',
      criticalBase: 'public/critical-css',
      criticalPages: ['/'],
    }),
  ],
});
```

### Reduce JavaScript Execution

```js
// Defer non-critical JS
<script defer src="/analytics.js"></script>

// Use native APIs instead of heavy libraries
// Example: Intersection Observer → instead of lazy-loading library
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadImage(entry.target);
    }
  });
});
```

---

## 📊 Performance Budgets

### Setting Budgets

```js
// vite.config.ts
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash-es'],
        },
      },
    },
  },
  plugins: [
    visualizer({
      filename: './dist/stats.html',
      open: true,
      gzipSize: true,
    }),
  ],
});
```

### Budget.json

```json
{
  "budgets": [
    {
      "path": "/*.js",
      "limit": "500 kB",
      "type": "initial"
    },
    {
      "path": "/*.css",
      "limit": "50 kB",
      "type": "initial"
    }
  ]
}
```

---

## 🎯 Practice Exercise

**Time:** 2 hours

1. **Audit an existing app** with Lighthouse — Measure LCP, INP, CLS
2. **Optimize bundles** — Implement code splitting and tree shaking
3. **Optimize images** — Convert to WebP, implement lazy loading
4. **Optimize fonts** — Implement font-display: swap and preload critical fonts
5. **Set performance budgets** — Define budgets for bundle size and load time
6. **Re-audit** — Measure improvement in Core Web Vitals

**Deliverable:** Before/after Lighthouse scores + optimization changes documented

---

## 📚 Recommended Reading

- **Core Web Vitals** — https://web.dev/vitals/
- **Performance Budgets** — https://web.dev/performance-budgets-101/
- **Bundle Analysis** — https://bundlephobia.com/
- **Chrome DevTools Performance** — https://developer.chrome.com/docs/devtools/performance/

---

## ✅ Session Outcome

By the end of this unit, you should:

- Understand Core Web Vitals and how to measure them
- Be able to optimize bundles through code splitting, tree shaking, and dependency pruning
- Implement image and font optimization techniques
- Set and enforce performance budgets
- Debug performance issues using Chrome DevTools

This unit covers the **Optimización de rendimiento** official CONTENIDOS requirement. Performance optimization applies to all future projects, whether using Astro, React, or vanilla JS.

---

> _"Fast is a feature. Slow is a bug."_
