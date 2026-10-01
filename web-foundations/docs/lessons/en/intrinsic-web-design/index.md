---
layout: lesson
title: 'Intrinsic Web Design: Container Queries & Subgrid'
title_alt: 'Diseño Web Intrínseco: Container Queries y Subgrid'
slug: intrinsic-web-design
date: 2025-09-10
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/intrinsic-web-design/
week: 3
description: 'Responsive layout without viewport media queries: fluid grid, @container, and subgrid on your portfolio gallery.'
tags: [css, container-queries, subgrid, intrinsic-design, responsive]
status: complete
---

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> Responsive layout is relationship-aware, not device-shaped.</p>
<p><strong>Field lens:</strong> <strong>Practice anchor:</strong> responsive design adapts content to available space. <strong>Frontier signal:</strong> container queries and subgrid move responsiveness from viewport recipes to component context.</p>
</aside>

> **Studio test:** Test the same component inside three parent widths.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## For / Not for

**For:** Front-End I **Session 5** — container queries + subgrid on your portfolio landing (Sessions 3–4 CSS foundation).

**Not for:** JavaScript layout libraries or full grid frameworks — this session is native CSS intrinsic design.

**When you finish:** a gallery (or card grid) with fluid grid + `@container` and/or `subgrid`, tested at three parent widths, plus commit + critical reflection.

---

## Before you start

| Requirement | Required? |
| --- | --- |
| Sessions 3–4 landing with CSS tokens | Yes |
| Modern browser (Chrome/Edge/Firefox current) | Yes |
| Git workflow from Session 2 | Yes |

**Official time:** 2 h class + 1 h lab.

---

## Follow this path

| Step | Action | Section |
| --- | --- | --- |
| 1 | Internalize the kit without layout `@media` | Why we skip media queries here |
| 2 | Build fluid grid `auto-fit` + `minmax` | Tool 1 |
| 3 | Mark a parent with `container-type`; reflow with `@container` | Tool 2 |
| 4 | Align titles/footers across cards with `subgrid` | Tool 3 |
| 5 | Test the same component in narrow sidebar + wide main | Demo / Studio test |
| 6 | Commit + 3–5 sentence critical reflection | Commit & reflection |

---

## Verify before you leave

- [ ] Component layout changes when **parent** width changes, not only viewport
- [ ] Gallery reflows without layout `@media (min-width: …)`
- [ ] Keyboard focus visible on interactive items
- [ ] No horizontal scroll at ~320px container width
- [ ] `@supports` fallback or documented degradation
- [ ] Commit pushed mentioning container queries / subgrid

---

## Common failures

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Container query never fires | Missing `container-type` on ancestor | Set it on the parent wrapper |
| Same as media-query behavior | You used `@media` instead of `@container` | `@container (min-width: …)` |
| Subgrid lines misaligned | Parent not a grid or missing `span` | Parent `display: grid`; child `grid-row: span N` + `subgrid` |
| Gallery breaks in older Safari | Feature without fallback | `@supports`; simplify layout |
| No commit | Forgot reflection | Complete Commit & reflection |

---

## Submit (Session 5 evidence)

- Repo URL + commit `feat: responsive gallery · container queries…`
- 3–5 sentence critical reflection (Critical Coding for a Better Living)

---

## Code conventions in this session

- **CodeSandbox-ready** — complete HTML+CSS; paste into static HTML, CodePen, or your `index.html` + CSS.
- **Excerpt** — fragment that assumes the demo or your landing.
- **Template** — replace copy, colors, and image paths with yours.

Live demo (same page as the full block below): [intrinsic gallery demo]({{ '/lessons/en/intrinsic-web-design/demo/' | relative_url }}).

---

## Objectives

1. Build responsive layout **without viewport media queries** for columns and cards.
2. Use `@container` when a component’s *internals* must change with its box.
3. Use `subgrid` to align sections across neighboring cards.
4. Ship commit + critical reflection.

---

## Why we skip media queries here

<aside class="lesson-idea" aria-label="Key idea">
<p><strong>Key idea:</strong> In this session the space that matters is the <em>container</em>, not the device. You do not need a separate media-query lesson to ship a responsive gallery.</p>
</aside>

| Approach | Question it answers | Use today? |
| --- | --- | --- |
| `@media (min-width: …)` | How wide is the **window**? | Not for component layout |
| Fluid grid (`auto-fit` + `minmax`) | How many columns fit in this slot? | Yes — baseline |
| `@container` | How wide is the component’s **box**? | Yes — internal structure |
| `subgrid` | Do I share the parent’s tracks? | Yes — alignment |
| `@media (prefers-*)` | User preferences? | Yes — accessibility only |

**In short:** preference media queries (`prefers-reduced-motion`, contrast, color scheme) remain useful. Layout breakpoints (`min-width: 768px` → “tablet mode”) are out of scope for this session — the intrinsic kit replaces them in your portfolio.

---

## Intrinsic kit (three tools)

### 1. Fluid grid — columns without breakpoints

<aside class="lesson-idea">
<p><strong>Idea:</strong> <code>repeat(auto-fit, minmax(…))</code> decides how many columns fit. You set a readable minimum; CSS distributes the rest.</p>
</aside>

**Excerpt** — columns that appear and disappear on their own:

```css
.gallery {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
	gap: 1rem;
}
```

- `min(100%, 14rem)` prevents overflow in boxes narrower than 14rem.
- Zero `@media`. Resize the **parent** (not only the window) and watch.

### 2. Container queries — the box, not the window

<aside class="lesson-idea">
<p><strong>Idea:</strong> First declare the container (<code>container-type: inline-size</code>). Then ask with <code>@container</code>.</p>
</aside>

**Excerpt:**

```css
.region {
	container-type: inline-size;
	container-name: region;
}

/* Base: stacked card */
.card {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

/* Wide box: image + text in a row */
@container region (min-width: 28rem) {
	.card {
		flex-direction: row;
		align-items: stretch;
	}

	.card img {
		width: 40%;
		object-fit: cover;
	}
}
```

**Studio test:** place the same `.card` in a narrow sidebar and a wide main. With media queries both would match the viewport; with `@container`, each box decides.

### 3. Subgrid — alignment across cards

<aside class="lesson-idea">
<p><strong>Idea:</strong> Without subgrid, each card sizes its own rows (titles “dance”). With subgrid, cards <em>share</em> the parent’s tracks.</p>
</aside>

**Excerpt:**

```css
.gallery {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
	grid-auto-rows: auto;
	gap: 1rem;
}

.card {
	display: grid;
	grid-template-rows: subgrid;
	grid-row: span 3; /* title · body · footer */
	gap: inherit;
}
```

---

## Full demo: gallery with no layout media queries

**CodeSandbox-ready** — single HTML (or `index.html` + CSS). Also open the [published demo]({{ '/lessons/en/intrinsic-web-design/demo/' | relative_url }}).

{% raw %}

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Intrinsic gallery — demo</title>
		<style>
			:root {
				--surface: #f1f5f9;
				--card: #ffffff;
				--content: #0f172a;
				--muted: #475569;
				--accent: #2563eb;
				--border: #e2e8f0;
				--radius: 0.75rem;
				--gap: 1rem;
				--text: clamp(1rem, 0.95rem + 0.3vw, 1.125rem);
			}

			* {
				box-sizing: border-box;
			}

			body {
				margin: 0;
				font-family: system-ui, sans-serif;
				font-size: var(--text);
				line-height: 1.5;
				color: var(--content);
				background: var(--surface);
			}

			.page {
				display: grid;
				grid-template-columns: repeat(
					auto-fit,
					minmax(min(100%, 16rem), 1fr)
				);
				gap: var(--gap);
				padding: var(--gap);
				max-width: 72rem;
				margin-inline: auto;
			}

			.region {
				container-type: inline-size;
				container-name: region;
				min-width: 0;
				padding: var(--gap);
				border-radius: var(--radius);
				background: #e2e8f0;
			}

			.region--wide {
				background: transparent;
				padding: 0;
			}

			.gallery {
				display: grid;
				grid-template-columns: repeat(
					auto-fit,
					minmax(min(100%, 13rem), 1fr)
				);
				gap: var(--gap);
			}

			.card {
				display: flex;
				flex-direction: column;
				gap: 0.65rem;
				padding: 0.85rem;
				background: var(--card);
				border: 1px solid var(--border);
				border-radius: var(--radius);
				min-width: 0;
			}

			.card img {
				display: block;
				width: 100%;
				aspect-ratio: 16 / 10;
				object-fit: cover;
				border-radius: calc(var(--radius) - 0.25rem);
				background: #cbd5e1;
			}

			.card h3 {
				margin: 0;
				font-size: 1.05rem;
			}

			.card p {
				margin: 0;
				color: var(--muted);
				font-size: 0.95rem;
				flex: 1;
			}

			.card a:focus-visible {
				outline: 3px solid #f59e0b;
				outline-offset: 2px;
			}

			@container region (min-width: 28rem) {
				.card {
					flex-direction: row;
					align-items: stretch;
				}

				.card img {
					width: min(42%, 12rem);
					flex-shrink: 0;
					aspect-ratio: 1 / 1;
					align-self: stretch;
				}

				.card-body {
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
					min-width: 0;
					flex: 1;
				}
			}
		</style>
	</head>
	<body>
		<div class="page">
			<aside class="region" aria-label="Narrow sidebar">
				<div class="gallery">
					<article class="card">
						<img
							src="https://picsum.photos/seed/atelier1/640/400"
							alt=""
							width="640"
							height="400"
						/>
						<div class="card-body">
							<h3>Project A</h3>
							<p>In a narrow box the card stacks.</p>
							<footer><a href="#">View</a></footer>
						</div>
					</article>
				</div>
			</aside>

			<main class="region region--wide" aria-label="Main">
				<div class="gallery">
					<article class="card">
						<img
							src="https://picsum.photos/seed/atelier2/640/400"
							alt=""
							width="640"
							height="400"
						/>
						<div class="card-body">
							<h3>Project B</h3>
							<p>Wider box → image + body in a row.</p>
							<footer><a href="#">View</a></footer>
						</div>
					</article>
					<article class="card">
						<img
							src="https://picsum.photos/seed/atelier3/640/400"
							alt=""
							width="640"
							height="400"
						/>
						<div class="card-body">
							<h3>Project C</h3>
							<p>Short description.</p>
							<footer><a href="#">View</a></footer>
						</div>
					</article>
				</div>
			</main>
		</div>
	</body>
</html>
```

{% endraw %}

<aside class="lesson-summary" aria-label="Demo summary">
<p><strong>Summary:</strong> the page itself uses fluid <code>auto-fit</code> (no layout media query). Cards switch stacked → row via <code>@container region</code>. In DevTools, constrain only a <code>.region</code> — the card changes without resizing the viewport.</p>
</aside>

---

## Lab on your portfolio

1. Wrap your projects gallery in a parent with `container-type: inline-size`.
2. Replace fixed columns or layout media queries with `auto-fit` + `minmax`.
3. If a card has image + text, switch to a row with `@container`, not `@media`.
4. Optional: `subgrid` + `grid-row: span N` to align title / body / footer.
5. Studio test: three parent widths (constrain the container in DevTools, not only the window).
6. Add `@media (prefers-reduced-motion: reduce)` only if you animate.

**Template** — minimal skeleton for your CSS:

```css
.projects {
	container-type: inline-size;
	container-name: projects;
}

.projects-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
	gap: 1rem;
}

.project-card {
	display: grid;
	grid-template-rows: subgrid;
	grid-row: span 3;
	gap: 0.75rem;
}

@container projects (min-width: 28rem) {
	.project-card {
		/* adjust internal structure if needed */
	}
}
```

---

## Accessibility (apply now)

- Meaningful `alt`, or `alt=""` when decorative next to a visible title.
- Contrast ≥ 4.5:1 for body text.
- Visible `:focus-visible` on card links.
- Motion preference: `@media (prefers-reduced-motion: reduce)` — the only “required” media query this session if you animate.

---

## Commit & critical reflection

```bash
git add .
git commit -m "feat: responsive gallery · container queries + subgrid (+a11y)"
git push
```

Write 3–5 sentences on how *component-context* design (not device recipes) improves care, inclusion, or sustainable attention — aligned with **Critical Coding for a Better Living**.

---

{% comment %}
outcome-graphic-selection:
  source-section: "Commit & critical reflection"
  visual-grammar: "relationship-aware-layout — layout regions adapting through intrinsic relationships rather than device-specific breakpoints"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

---

## References

- [MDN — Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
- [MDN — Subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid)
- [web.dev — Container queries](https://web.dev/learn/css/container-queries)
- [LogRocket — Subgrid + container queries](https://blog.logrocket.com/using-css-subgrids-container-queries/)
