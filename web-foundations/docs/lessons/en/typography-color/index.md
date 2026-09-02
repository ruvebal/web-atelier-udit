---
layout: lesson
title: Typography & Color
title_alt: 'Tipografía y sistemas de color'
slug: typography-color
date: 2025-09-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/typography-color/
description: 'Fluid typography with clamp(), CSS custom properties, accessible color palettes, and contrast verification.'
tags: [css, typography, color, accessibility, design-tokens, clamp]
status: complete
---

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> Visual style is a communication system with access and hierarchy.</p>
<p><strong>Field lens:</strong> **Practice anchor:** typographic scale, contrast, readable rhythm, and meaningful tokens. **Frontier signal:** fluid type, wider colour spaces, and preference-aware themes are volatile layers.</p>
</aside>

> **Studio test:** Build a small token system and justify contrast and hierarchy decisions.

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
| Session 3 semantic landing committed | Yes |
| `assets/css/index.css` linked from `index.html` | Yes |
| Browser DevTools (Computed styles + contrast checker) | Yes |

**Official time:** 2 h class + 1 h lab.

---

## Follow this path

| Step | Action | Section |
| --- | --- | --- |
| 1 | Define `:root` type + color tokens | Design tokens in CSS |
| 2 | Apply fluid headings with `clamp()` | Fluid typography |
| 3 | Set body rhythm (`line-height`, `max-width`) | Readable rhythm |
| 4 | Check contrast (4.5:1 body, 3:1 large text) | Accessible color |
| 5 | Commit + ATELIER note on one trade-off | Submit |

---

## Verify before you leave

- [ ] Headings scale smoothly from mobile to desktop (no sudden jumps)
- [ ] Body text meets **WCAG AA** contrast against background
- [ ] Link color distinct from body text **and** meets contrast
- [ ] Tokens referenced by `var(--…)` — no magic hex repeated in rules
- [ ] Commit pushed; Pages still loads

---

## Common failures

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Text tiny on mobile, huge on desktop | `clamp()` min/max inverted | Pattern: `clamp(min, preferred, max)` |
| Gray on gray unreadable | `--text-muted` too close to `--surface` | Re-check contrast; darken text or lighten surface |
| Tokens ignored | Typo in `var()` name | Match `:root` declaration exactly |
| Headings bolder but same size | Only changed `font-weight` | Adjust `--text-*` scale |
| `rem` sizes wrong | Root font-size unset | Set `html { font-size: 100%; }` or explicit `%` |

---

## Submit (Session 4 evidence)

- Repo URL + commit with typography/color tokens
- One ATELIER comment: which contrast or hierarchy choice you made and why
- Optional: DevTools contrast audit screenshot

---

## Code conventions in this session

- **Template** — `:root` token block: replace font family and hex values with your brand.
- **Excerpt** — partial CSS; assumes Session 3 landing structure exists.

---

## 🎯 Learning objectives

- Define a **typographic scale** with CSS custom properties
- Use **`clamp()`** for fluid headings without media-query sprawl
- Build a **semantic color palette** (surface, content, accent, muted)
- Verify **WCAG AA contrast** for body text and interactive elements
- Document one styling decision in ATELIER reflection style

---

## Design tokens in CSS

**Template** — add to the top of `assets/css/index.css`:

```css
:root {
  /* Typography */
  --font-sans: system-ui, sans-serif;
  --font-display: Georgia, 'Times New Roman', serif;

  --text-sm: clamp(0.875rem, 0.8rem + 0.25vw, 1rem);
  --text-base: clamp(1rem, 0.95rem + 0.35vw, 1.125rem);
  --text-lg: clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem);
  --text-xl: clamp(1.5rem, 1.2rem + 1vw, 2rem);
  --text-2xl: clamp(1.875rem, 1.4rem + 1.5vw, 2.5rem);

  /* Color — semantic names, not literal "blue" */
  --surface: #f8fafc;
  --surface-elevated: #ffffff;
  --content: #0f172a;
  --content-muted: #475569;
  --accent: #2563eb;
  --accent-hover: #1d4ed8;
  --focus-ring: #f59e0b;
}
```

Semantic names survive palette changes; literal color names do not.

---

## Fluid typography

Apply tokens to your Session 3 landing:

```css
body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--content);
  background: var(--surface);
  max-width: 65ch;
  margin: 0 auto;
  padding: 1rem;
}

h1 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  line-height: 1.2;
}

h2 {
  font-size: var(--text-xl);
}

h3 {
  font-size: var(--text-lg);
}

p,
li {
  font-size: var(--text-base);
}
```

---

## Readable rhythm

- **Measure:** `max-width: 65ch` on body or main text column keeps line length comfortable.
- **Line-height:** 1.5–1.7 for body; tighter for large display headings.
- **Spacing:** use consistent `margin-bottom` on sections (you defined some in Session 3 — refine with tokens if needed).

---

## Accessible color

```css
a {
  color: var(--accent);
}

a:hover {
  color: var(--accent-hover);
}

a:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
```

**Check contrast** with DevTools → inspect text → Accessibility pane, or [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

Minimum targets (WCAG AA):
- Normal text: **4.5:1**
- Large text (≥ 18pt / 14pt bold): **3:1**

---

## 🎯 Practice exercise

**Time:** 1 hour

1. Replace ad-hoc font sizes from Session 3 with the token scale above (customize values).
2. Introduce at least **four semantic colors** in `:root` and use them throughout.
3. Fix any contrast failure the checker reports.
4. Add an ATELIER reflection comment in `index.html` or CSS noting one hierarchy decision.

**Deliverable:** styled landing with tokenized type and color + commit.

---

## 📚 Recommended reading

- [MDN: CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [MDN: clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
- [WCAG contrast (Understanding 1.4.3)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

## ✅ Session outcome

By the end of this session you should:

- Read and write a small token layer in `:root`
- Apply fluid type without breakpoint-only hacks
- Justify color choices with contrast evidence
- Keep HTML semantic — style lives in CSS tokens, not inline styles

---

{% comment %}
outcome-graphic-selection:
  source-section: "✅ Session outcome"
  visual-grammar: "contrast-and-hierarchy-system — a visual token field balancing contrast, hierarchy, scale, and accessible rhythm"
{% endcomment %}
{% include lesson-outcome-graphic.html %}
