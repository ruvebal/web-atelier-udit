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
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

> **Session Objective (2h)**
>
> 1. Understand when to use Container Queries and Subgrid.
> 2. Build a real responsive gallery (mobile-first, progressive).
> 3. Make a commit with the result and a critical reflection.

---

# Pedagogical Guide: Container Queries and Subgrid in Responsive Design

## Introduction

📌 Simple analogy:

- **Container Queries** = "What should I do given the size of the box I'm in?"
- **Subgrid** = "How do I align following the lines from the box above?"

Almost every web designer has faced layouts that break when neighboring elements change size; this is usually frustrating[^1]. Fortunately, CSS has incorporated two powerful new tools as part of responsive design evolution: **Container Queries** and **Subgrid**.

These technologies allow page components to adapt their style based on the "container box" size (instead of viewport size) and enable internal grids to align with parent grid lines, respectively. In this guide we'll combine theory and practice (following our course's Atelier methodology) so that, by the end, you can apply these concepts by building a real responsive gallery and committing your design to the project repository.

## From Media Queries to Container Queries: responsive evolution

Media queries introduced over a decade ago enabled designs adaptable to browser window or device size. However, in more complex interfaces a redundancy problem soon emerged: if a component is inside a container and both need to adjust their design with similar breakpoints, keeping container and component media queries synchronized becomes complicated[^2].

For example, a section wrapping several cards might change layout at a certain screen width, and each card also needs to reorganize at that same width – with only media queries you'd have to duplicate conditions at both levels.

**Container Queries** arrives to solve this problem. Instead of relying on global viewport size, a container query allows a component to conditionally apply styles based on its parent container's dimensions[^3].

In other words, the component "asks": _"What size is the box I'm in?"_ and adjusts its presentation accordingly. This marks a paradigm shift in responsive design, moving from global (viewport) to contextual per-component designs.

According to documentation, "container queries allow you to make more specific adjustments to elements based on the size and state of their superior elements or containers"[^4]. This complements (doesn't totally replace) media queries, providing more granularity: a site can continue defining general styles with media queries for global design, but use container queries for components that must be flexible depending on where they're placed (for example, the same widget on a wide main page versus in a narrow sidebar).

## Subgrid: perfect alignment in nested grids

CSS Grid introduced a robust way to create two-dimensional layouts, but had a limitation: nested (child) grids couldn't share the lines or tracks of the parent grid, making it difficult to consistently align elements across different containers.

Without Subgrid, each internal container acts with its own independent grid, forcing us to handle separate grids and often generating irregular alignments when one element's content is longer than its neighbors'[^5].

In simple terms, grid children don't "inherit" the parent's row/column structure.

**Subgrid** solves this by allowing a child element declared as subgrid to use the row and/or column definitions of its parent container. Thus, grid tracks are shared between parent and nested children[^6], ensuring that, for example, all header rows of a set of cards align perfectly, same for their content sections and card footers.

In documentation words: _"with subgrid, you can share track sizing, templates, and grid names with nested grids"_[^7]. This eliminates those "ragged" designs and achieves clean alignments.

### Define a container

```css
.container {
	/* Parent becomes the inline-size (width) query context */
	container-type: inline-size;
	/* Optional: name to reference this specific container */
	container-name: gallery;
}
```

### Query the container

```css
@container gallery (min-width: 450px) {
	.my-component {
		flex-direction: row; /* When container is >= 450px wide */
	}
}
```

Note: Rules within `@container` only affect descendants of the defined container.

---

## Subgrid: align nested content

Without Subgrid, each card defines its own internal grid, and titles/descriptions don’t align across cards. With **Subgrid**, a child grid **inherits** parent rows/columns so equivalent content lines up.

```css
/* Parent grid with multiple columns */
.gallery {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 1rem;
}

/* Each card adopts parent rows */
.card {
	display: grid;
	grid-template-rows: subgrid;
	grid-row: span 2; /* spans two parent rows */
}

.card h3 {
	grid-row: 1;
}
.card p {
	grid-row: 2;
}
```

Result: homogeneous rows; titles and descriptions align without hacks.

---

## Practical example: Adaptable gallery

Base HTML:

```html
<section class="gallery">
	<article class="card">
		<img src="image1.jpg" alt="Description 1" />
		<h3>Title 1</h3>
		<p>Description of image/article 1.</p>
	</article>
	<article class="card">...</article>
	<article class="card">...</article>
</section>
```

Container Query (mobile-first → grid when space allows):

```css
/* Base: vertical list (mobile / narrow container) */
.gallery {
	display: flex;
	flex-direction: column;
	container-type: inline-size;
	container-name: gallery;
}

/* >= 600px: 2 columns */
@container gallery (min-width: 600px) {
	.gallery {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
}

/* >= 900px: 3 columns */
@container gallery (min-width: 900px) {
	.gallery {
		grid-template-columns: 1fr 1fr 1fr;
	}
}
```

Subgrid to align internal content:

```css
@container gallery (min-width: 600px) {
	.card {
		display: grid;
		grid-template-rows: subgrid;
		grid-row: span 2;
	}
	.card h3 {
		grid-row: 1;
	}
	.card p {
		grid-row: 2;
	}
}
```

---

## Accessibility & performance (apply now)

- Provide meaningful `alt` or `alt=""` for decorative images.
- Maintain adequate color contrast (≥ 4.5:1 for body text).
- Avoid embedding text inside images.
- Serve optimized images (AVIF/WebP) and consider a CDN (e.g. ImageKit: `?tr=w-800,q-80`).
- Keyboard navigation: visible focus, logical tab order.

---

## Commit & critical reflection

Recommended commit when closing the session:

```bash
git add .
git commit -m "feat: responsive gallery · container queries + subgrid (+a11y)"
git push
```

Write 3–5 sentences on how your decisions (alignment, density, contrast) improve care, inclusion, and sustainable attention, aligned with **Critical Coding for a Better Living**.

---

---

## References

[^1]: Using CSS Subgrids and Container Queries. LogRocket. https://blog.logrocket.com/using-css-subgrids-container-queries/
[^2]: Ibid.
[^3]: Ibid.
[^4]: Container Queries - Learn CSS. Web.dev. https://web.dev/learn/css/container-queries
[^5]: Using CSS Subgrids and Container Queries. LogRocket. https://blog.logrocket.com/using-css-subgrids-container-queries/
[^6]: CSS subgrid. Web.dev. https://web.dev/articles/css-subgrid
[^7]: Ibid.

### Additional sources

- **Container Queries**: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries
- **Subgrid**: https://www.freecodecamp.org/news/what-is-css-subgrid/
- **Browser Support**: https://www.joshwcomeau.com/css/browser-support/