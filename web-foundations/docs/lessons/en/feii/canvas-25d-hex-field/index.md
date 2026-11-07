---
layout: lesson
title: 'Canvas 2.5D Hex Field — Projection Without Three'
slug: feii-canvas-25d-hex-field
date: 2026-11-07
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/canvas-25d-hex-field/
description: 'Bloque 5 satellite: pitch/yaw projection and painter’s algorithm on a Canvas hex lattice — depth literacy without the Three.js tax. Pair with Units 8–9, not a substitute.'
status: complete
category: feii
tags: [feii, canvas, projection, hex-grid, 2.5d, satellite, performance]
---

<aside class="lesson-framing" aria-label="Master idea and studio test">
<p><strong>Master idea:</strong> Depth on a 2D canvas is a lie you author — projection + draw order — not a free Z-buffer.</p>
<p><strong>Studio test:</strong> Point at the demo and name: what pitch rotates, what yaw rotates, why far cells must paint before near ones, and when you would switch to R3F instead.</p>
</aside>

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> **This is not Unit 8.** [Unit 8]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}) teaches the React component model on a real WebGL scene graph with `renderer.info`. This satellite teaches the **math underneath a cheap spatial hero**: rotate, perspective-divide, sort, paint. Use it when a landing field should feel 3D without shipping Three.

> **AI Assistance Disclosure:** Models invent “3D SVG” and paste Three boilerplate. Ask them for a projection function and a painter sort; reject a dependency you cannot budget.

**Code in this lesson:** the demo is **CodeSandbox-ready** as static files under `demo/`. Excerpts below show the two load-bearing ideas.

**Live demo:** [Canvas 2.5D hex field]({{ '/lessons/en/feii/canvas-25d-hex-field/demo/' | relative_url }}) — pointer tilt, wheel inertia, archive palette, `prefers-reduced-motion`.

---

## Why learn this (even if you already know R3F)

| Need | Choose |
| --- | --- |
| Lights, materials, true occlusion, custom GLSL | [Unit 8–9 R3F]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}) |
| Dense geometric field, crisp strokes, tiny bundle, integrated GPU | **Canvas 2.5D** (this page) |
| Static OG / print / no-JS fallback | SVG (`archive-home.svg`) |

Worth it for an instructor: you stop treating WebGL as the only “real” 3D, and you can defend a hero that costs kilobytes, not hundreds of kilobytes. Neo.mjs documents the same trade-off for their Neural Fabric ([Neo.mjs Neural Fabric guide](https://neomjs.com/learn/guides/advanced/NeuralFabric)).

---

## The two ideas

### 1. Pitch / yaw projection — **Excerpt**

Rotate around Y (yaw), then X (pitch), then divide by depth. No matrix library required for a floor lattice.

```js
function project(x, y, z, cx, cy, cosY, sinY, cosX, sinX, fov) {
  const dx = x - cx;
  const dy = y - cy;
  const x1 = dx * cosY - z * sinY;
  const z1 = z * cosY + dx * sinY;
  const y2 = dy * cosX - z1 * sinX;
  const z2 = z1 * cosX + dy * sinX;
  const scale = fov / (fov + z2);
  return { x: x1 * scale + cx, y: y2 * scale + cy, scale, depth: z2 };
}
```

### 2. Painter’s algorithm — **Excerpt**

Canvas 2D has no Z-buffer. Far cells must be drawn before near cells, every frame.

```js
// depth[i] = projected z2 for cell i
order.sort((a, b) => depth[b] - depth[a]);
for (const i of order) drawHex(i);
```

Wrong order = near cells buried under far ones. That bug is the whole lesson.

---

## Interaction contract (demo)

- **Pointer / finger** — damped yaw/pitch + radial energy falloff on cells.
- **Wheel** — scroll velocity decays into pitch (inertia without Rapier).
- **`prefers-reduced-motion: reduce`** — freeze breath; keep a readable static tilt.
- **DPR cap 1.5** — same mobile fill-rate instinct as Unit 8.

---

## Files

| Path | Role |
| --- | --- |
| [`demo/index.html`]({{ '/lessons/en/feii/canvas-25d-hex-field/demo/' | relative_url }}) | Stage + readout |
| `demo/hex-field.js` | Lattice SoA, projection, painter sort, pointer/scroll |

**CodeSandbox-ready** — open the demo URL, or copy both files into any static host. No npm install.

---

## Lab check (15–20 min)

1. Change `lattice.radius` and watch cell count / fps in the panel.
2. Disable the sort (`order` left unsorted) and describe what breaks.
3. One sentence: when would this field graduate to R3F `InstancedMesh` instead?

---

## Session outcome

You can fake a spatial hex field with projection + draw order, interact with pointer and scroll inertia, and name the moment the Three tax becomes worth paying. The archive SVG stays the durable still; this demo is the living twin.

{% comment %}
outcome-graphic-selection:
  source-section: "Session outcome"
  visual-grammar: "projection-to-painter — axial lattice through pitch/yaw perspective into sorted 2D paint order"
{% endcomment %}
{% include lesson-outcome-graphic.html %}
