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

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> Performance engineering chooses what work to do, where, and when.</p>
<p><strong>Field lens:</strong> **Practice anchor:** budgets, measurement, loading strategy, and runtime diagnosis. **Frontier signal:** islands, resumability, edge delivery, and adaptive work scheduling are active. **Pedagogy gap:** current evidence supports the primitives, not this sequence.</p>
</aside>
>
> **Studio test:** Compare a baseline with one intervention and report the cost.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"The student said: 'My images look beautiful!' The master checked the Network tab and said: 'Your users have left before seeing them.'"_
> — Tao of Development, `img-051`
{: .tao-development-quote }

> **AI Assistance Disclosure:** This unit integrates AI-assisted development following the docs-first methodology. Plans, prompts, and implementation reports are documented throughout the process.

> 📐 **Code block convention for this sequence:** every code block below is labelled **CodeSandbox-ready**, **Excerpt**, or **Template**, per the policy on the [FE II index]({{ '/lessons/en/feii/' | relative_url }}#-conventions-used-across-these-lessons). All performance snippets in this unit are **Excerpt** — partial patterns that rely on a surrounding build config (Vite/Astro) and are illustrative, not paste-and-run.

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

### Measuring Core Web Vitals — Excerpt

```bash
# Lighthouse CLI
npx lighthouse https://example.com --view

# Web Vitals extension (Chrome)
# Install from Chrome Web Store
```

### Real User Monitoring (RUM) — Excerpt

```js
// web-vitals library
import { onCLS, onFID, onLCP } from 'web-vitals';

onCLS(console.log);
onFID(console.log);
onLCP(console.log);
```

---

## 📦 Bundle Optimization

### Code Splitting — Excerpt

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

### Tree Shaking — Excerpt

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

### Dependency Pruning — Excerpt

```js
// Replace heavy libraries with lighter alternatives
// Example: Moment.js → date-fns or dayjs
// Example: Lodash → lodash-es (tree-shakeable)
```

---

## 🖼️ Asset Optimization

### Image Optimization — Excerpt

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

### Font Loading — Excerpt

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

### Critical CSS Extraction — Excerpt

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

### Reduce JavaScript Execution — Excerpt

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
{: .tao-development-quote }

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
> **What that does and does not license.** It establishes an **obligation** — efficiency is an ethical requirement in computing, not a matter of taste. It does **not** measure anything: UNESCO's scope is **AI systems** — which covers the AI-assisted method this course teaches, but is not a direct front-end-to-carbon claim. **Do not invent figures.** If you want to argue this quantitatively in your capstone, bring your own measurements and sources.

### A real measurement — narrow, but real

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
Since the last pass on this page, one genuine empirical (not merely normative) source has resolved in this course's citation library: **Mahoney, Terras, Lee & Zeller (2025), "The growing environmental impact of COP websites,"** *PLOS Climate*, DOI [`10.1371/journal.pclm.0000767`](https://doi.org/10.1371/journal.pclm.0000767) — Ahmes node `0e9f7882-ac52-57c3-bbec-b745ab2987f0`, p.1, `(Mahoney 2025, 1)`, `evaluator_safe=yes` (confidence 0.95, crossref-verified, re-checked live this session). <!&#45;&#45; provenance: coat 03bab1df; ahmes query &#45;&#45;cite &#45;&#45;require-evaluator-safe run live this session against the extraction.db, exit 0; matrix's own row 7 previously flagged this coat "[BIBLIO-GAP] until host-title fix" — that fix has since landed (host_registry_match: true), a genuine pipeline-lag closure, not forced this session
-->
{% endif %}

The study archived every UNFCCC COP host-country website from COP1 (1995) to COP30 (2025) via the Internet Archive's Wayback Machine and measured page weight against modelled emissions. The real, unflattering numbers, quoted rather than summarised away:

> _"Our analysis reveals an exponential increase in website size, with average emissions rising over 13,000%, and many recent COP pages emitting roughly ten times the global average of approximately 0.36g of CO₂e per pageview. In-session participant homepage views drove emissions up by 83,400%, from 0.14 kg of CO₂e at COP3 (1997)… to 116.85 kg of CO₂e at COP29 (2024)… This dramatic growth is largely driven by richer media content and scripts."_
>
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
> <!&#45;&#45; provenance: same coat, same node 0e9f7882-ac52-57c3-bbec-b745ab2987f0, p.1 (abstract); ahmes query &#45;&#45;cite re-confirmed evaluator_safe=yes live
-->
{% endif %}

(Mahoney et al. 2025, 1)

**What this does and does not license.** This is a real, quantified page-weight-to-emissions relationship — the first such study used in this course — and its own stated driver ("richer media content and scripts") is precisely the bundle/asset discipline this unit teaches. It does **not** license a general "front-end performance work reduces carbon" law: the dataset is one institution's websites over 30 years, not a controlled study of optimisation technique, and the study measures *outcome* (page weight → modelled emissions), not *which engineering practices* caused which website to grow. Cite the COP figures as a real-world stakes example, not as proof that this unit's specific techniques (code splitting, tree shaking, image optimisation) have been measured to reduce emissions by any amount.

### Setting Budgets — Excerpt

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

### Budget.json — Template (replace the `path`/`limit` values for your own repo's bundles)

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

## Lab (team) — workplace-like · 2 h

Pick up (or open, if none exists) a performance-budget issue on the shared repo's backlog.

- **Issue:** set real `budget.json` limits for the repo's actual bundle (not the placeholder numbers above — measure first), and wire a CI step that fails the build when a budget is exceeded.
- **Definition of done:** CI budget check green, or a documented and justified budget exception; PR reviewed by a human after AI review (Unit 6 workflow); a real before/after Lighthouse pair recorded — including any metric that got **worse**, not only the ones that improved.
- **Roles rotate:** bundle-analysis owner, CI-config owner, before/after-measurement owner. Nobody owns the same layer they owned in a prior lab.
- **Evidence emitted:** branch, PR, AI-review log rows, `budget.json` diff, before/after Lighthouse report.

The `budget.json` and `vite.config` snippets above are reused here — **Template** and **Excerpt** respectively, per the labels already on them.

## Exercises (individual) — decontextualised · 2 h

Not the team lab's deliverable — three short problems that isolate the strategy:

1. **Diagnostic.** Given a Lighthouse report showing LCP 4.1 s and a 2.8 MB main bundle with three unused large dependencies listed, name the two highest-leverage fixes and justify the order. "Fix everything" is not an answer.
2. Given the Mahoney et al. (2025) figures above, write one paragraph stating what they license you to claim in a capstone defence about *this repo's* performance choices, and what they do not. **Solvable without AI — declared as such**: this is a scope-boundary exercise, not a research-retrieval one.
3. Given a `budget.json` with a limit and a build that exceeds it by 4 KB, write the one-sentence PR description that either fixes it or honestly justifies the exception. The professor checks for honesty of framing, not a specific number.

Professor expected-answer sketch: kept in `exercises.md`, not this page.

---

## 📚 Recommended Reading

**Technique**

- **Core Web Vitals** — https://web.dev/vitals/
- **Performance Budgets** — https://web.dev/performance-budgets-101/
- **Bundle Analysis** — https://bundlephobia.com/
- **Chrome DevTools Performance** — https://developer.chrome.com/docs/devtools/performance/

**The “who pays” argument** — the research and normative sources cited above are listed in the final References section.
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- **Mahoney, D., Terras, M., Lee, J., & Zeller, F. (2025). *The growing environmental impact of COP websites: An analysis of UNFCCC COP host country websites (1995–2025).*** PLOS Climate. DOI: [`10.1371/journal.pclm.0000767`](https://doi.org/10.1371/journal.pclm.0000767) — Ahmes node `0e9f7882-ac52-57c3-bbec-b745ab2987f0`, p.1, `evaluator_safe=yes`. The **real, measured** page-weight-to-emissions example behind the "narrow, but real" subsection above; scope stays one institution's websites, not a general claim.
-->
{% endif %}

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
**Missing evidence — stated plainly, per this course's own discipline.** Performance-engineering *pedagogy* (which teaching sequence best develops budget discipline) remains `[UNVERIFIED-GAP]` — nothing in this course's corpus validates that this unit's specific sequence teaches performance judgement better than an alternative. Phung `ea8cf54c` is named in the evidence matrix as adjacent grounding for "optimisation never demanded" but is **not currently cited anywhere in this unit's or Unit 5's published text** — flagged here as an inconsistency between the matrix and the published pages, not fixed in this pass (out of this wave's two-unit scope). UNESCO grounds an *obligation*, not a measurement. Mahoney et al. (2025) grounds one *real, quantified* page-weight-to-carbon relationship, scoped to one dataset. None of the three is evidence that this specific 12-slide, 2-hour sequence produces better performance judgement in students than any other sequence would.
-->
{% endif %}

---

## ✅ Session Outcome

By the end of this unit, you should:

- Understand Core Web Vitals and how to measure them
- Be able to optimize bundles through code splitting, tree shaking, and dependency pruning
- Implement image and font optimization techniques
- Set and enforce performance budgets, and defend a real one on the shared repo
- Debug performance issues using Chrome DevTools
- State, precisely, what UNESCO obliges, what Mahoney et al. (2025) measures, and what neither one proves about this course's teaching method

This unit covers the **Optimización de rendimiento** official CONTENIDOS requirement. Performance optimization applies to all future projects, whether using Astro, React, or vanilla JS.

---

> _"The master writes `<img srcset="…" sizes="…" />`. The novice writes `<img src="huge-image.jpg" />`. The user pays the price."_
> — Tao of Development, `img-045`
{: .tao-development-quote }

{% comment %}
outcome-graphic-selection:
  source-section: "✅ Session Outcome"
  visual-grammar: "scheduled-performance-work — browser work redistributed across time until interaction and rendering fit a defended budget"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

## References

- ACM, IEEE Computer Society, and AAAI. 2023. *Computer Science Curricula 2023*. https://doi.org/10.1145/3664191.
- Batista, H. E. N., and R. A. R. S. Baluz. 2025. “Evaluation of Higher Education Institution Websites According to WCAG 2.1—Brazil.” *iSys* 18 (1).
- Correa, M., M. A. Vitoriano, and C. H. Llanos. 2025. “Web Accessibility in an Academic Management System in Brazil.” *Informatics* 12 (3): 63.
- Fisseler, B. 2024. “Digital Accessibility Literacy: A Conceptual Framework for Training on Digital Accessibility.” In *Teaching Accessibility in Different Disciplines: ASSETS 2024 Workshop*.
- Mahoney, D., M. Terras, J. Lee, and F. Zeller. 2025. “The Growing Environmental Impact of COP Websites: An Analysis of UNFCCC COP Host Country Websites (1995–2025).” *PLOS Climate*. https://doi.org/10.1371/journal.pclm.0000767.
- UNESCO. 2021. *Recommendation on the Ethics of Artificial Intelligence*.
