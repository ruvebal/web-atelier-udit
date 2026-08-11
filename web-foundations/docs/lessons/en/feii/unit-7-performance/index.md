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

> _"Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."_
> — Tao of Development, `cc-007`

### Why a budget, and not just a score

A Lighthouse score rewards you. A **budget** constrains you — and only a constraint changes what you build.

The reason to accept the constraint is physical, not cosmetic. **Work costs power, and power becomes heat** — in a phone, in a laptop, in a data centre answering your request. That cost does not stop at the device; it lands on a shared climate, and so on everything alive in it. We are technological beings, and the line between what lives and what is built was never clean.

So a budget is one question, asked before you add anything:

> **What does this cost the world it runs in — and who pays?**

Performance asks it about energy. Accessibility asks it about exclusion. **Same question, two currencies.** Neither is optimisation; both are ethics — and the second half of that pairing is well evidenced: Fisseler argues accessibility training must instil "ethical and social responsibility," not merely technique, and Lewthwaite and Sloan frame it as "a socio-technical challenge that is primarily about the problem of teaching empathy" (see §Recommended Reading).

> 🔬 **Scholarly honesty — state this in your defence, and state it precisely.** The two halves of that claim rest on **different kinds of source**, and conflating them is the error to avoid.
>
> **Accessibility** rests on peer-reviewed evidence (see Recommended Reading).
>
> **Energy and resources** now rest on a **normative instrument**: the **UNESCO Recommendation on the Ethics of Artificial Intelligence**, adopted by Member States. It requires assessing *"the direct and indirect environmental impact throughout the AI system life cycle, including… its carbon footprint, energy consumption and the environmental impact of raw material extraction"*, and instructs actors to *"favour data, energy and resource-efficient AI methods"* given the *"data-intensive or resource-intensive character"* of some of them.
>
> **What that does and does not license.** It establishes an **obligation** — efficiency is an ethical requirement in computing, not a matter of taste. It does **not** measure anything: there is still no study in this course's corpus quantifying the carbon effect of a front-end engineering choice, and UNESCO's scope is **AI systems** — which covers the AI-assisted method this course teaches, but is not a direct front-end-to-carbon claim. **Do not invent figures.** If you want to argue this quantitatively in your capstone, bring your own measurements and sources.

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

**Technique**

- **Core Web Vitals** — https://web.dev/vitals/
- **Performance Budgets** — https://web.dev/performance-budgets-101/
- **Bundle Analysis** — https://bundlephobia.com/
- **Chrome DevTools Performance** — https://developer.chrome.com/docs/devtools/performance/

**The "who pays" argument** — for the ethics framing above, and for your oral defence

- Fisseler, B. (2024). *Digital Accessibility Literacy: A Conceptual Framework for Training on Digital Accessibility.* ASSETS 2024 Workshop, Teaching Accessibility in Different Disciplines. — Accessibility literacy as **encoding *and* decoding**, which "improves technical skills and instills ethical and social responsibility." Cites Lewthwaite and Sloan on accessibility as "a socio-technical challenge that is primarily about the problem of teaching empathy," and reports that **only ~15% of surveyed computing teachers actually teach digital accessibility** — the gap this course is trying not to reproduce.
- Correa, M., Vitoriano, M. A., & Llanos, C. H. (2025). *Web Accessibility in an Academic Management System in Brazil.* Informatics, 12(3), 63. — SIGAA, in use at **39 higher-education institutions**, still shows accessibility gaps *"even after 20 years of eMAG"*, evidenced through living-lab testing with visually impaired students. Standards do not enforce themselves; someone has to build to them, which is the point of the budget.
- Batista, H. E. N., & Baluz, R. A. R. S. (2025). *Evaluation of Higher Education Institution Websites According to WCAG 2.1 — Brazil.* iSys, 18(1). — Recurring failures across university sites are **missing alternative text and inadequate contrast**: cheap to fix, routinely unfixed.
- ACM/IEEE-CS/AAAI (2023). *Computer Science Curricula 2023.* DOI: [`10.1145/3664191`](https://doi.org/10.1145/3664191) — curricular standing for treating accessibility and web platforms as core rather than elective.
- **UNESCO (2021). *Recommendation on the Ethics of Artificial Intelligence.*** — the normative basis for the "who pays" framing above. Read §§ on environmental impact assessment and resource-efficient methods; note that it obliges rather than measures.

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
