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

**Live demo:** [Canvas 2.5D hex field]({{ '/lessons/en/feii/canvas-25d-hex-field/demo/' | relative_url }}) — sparse near+far Z bands (closest shells oversized), variable stroke alpha, hard cell budget (~140); **Seed** + **Velocity** faders; pointer tilt; wheel inertia; `prefers-reduced-motion`.

The irregular field is not a regular axial honeycomb. It is the **Hexaform** rule system from `web-foundations/scripts/lesson-covers/` (see `ALGORITHMIC-PHILOSOPHY.md` in the repo): mode profile → activation → variable cell size / stroke → optional spiral accent. SVG covers bake a filled stamp once; this demo keeps hollow, living profiles under 2.5D projection.

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
// World-space rotate, then offset onto the screen center (do not subtract cx/cy from world x/y).
function project(x, y, z, cosY, sinY, cosX, sinX, fov) {
  const x1 = x * cosY - z * sinY;
  const z1 = z * cosY + x * sinY;
  const y2 = y * cosX - z1 * sinX;
  const z2 = z1 * cosX + y * sinX;
  const scale = fov / Math.max(fov * 0.15, fov + z2);
  return { x: x1 * scale, y: y2 * scale, scale, depth: z2 };
}
// screenX = projected.x + cx; screenY = projected.y + cy;
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

- **Seed fader** — reshuffles the Hexaform field; higher seed opens complexity (more survivors).
- **Velocity fader** — global float rate (default slow ~0.38; `0` freezes drift).
- **Pointer / finger** — damped yaw/pitch + radial energy falloff on cells.
- **Wheel** — scroll velocity decays into pitch (inertia without Rapier).
- **`prefers-reduced-motion: reduce`** — freeze float; keep a readable static tilt.
- **DPR cap ~1.15 + `maxCells`** — laptop fill-rate budget (same instinct as Unit 8 ceilings).

---

## Using this for lessons, landings, and heroes

Three layers, one Hexaform language — pick by durability and motion budget:

| Surface | What ships | When |
| --- | --- | --- |
| **Static cover / OG / print** | Baked SVG from `scripts/lesson-covers/` (`archive-home.svg`, lesson stamps) | Always — no JS, sharable still |
| **Hub / track hero (CSS)** | `.hero-section--archive` paints the SVG as `background-image` under the title | Landings that need brand + typography, motion optional |
| **Living hero / lesson heading** | Absolute `<canvas>` behind the heading, `createHexField(canvas, { seed, velocity, maxCells, mode })`, pointer optional | When the page can afford ~100 stroke hexes and should breathe |

**Recipe for a lesson or landing heading**

1. Keep the **SVG** as the `noscript` / reduced-motion / OG fallback (same seed/mode as the canvas when possible).
2. Mount a full-bleed canvas *inside* the hero (`position: absolute; inset: 0; z-index: 0`), title/lede at `z-index: 1` with a soft scrim so type stays readable.
3. Call `createHexField` once with a **fixed seed** per page (brand consistency) and a **low velocity** (0.25–0.45). Do not expose faders on production heroes — faders are the lab.
4. Honour `prefers-reduced-motion`: destroy the RAF loop or pass motion freeze; show the SVG background instead.
5. Cap cost: `maxCells: 80–140`, `dprCap: 1.15`, no pointer warping on content-heavy pages (tilt-only or static yaw).

**Heading vs full-page demo** — demos teach the math with controls; heroes reuse `hex-field.js` as a silent background module. Same file, different options object.

---

## Files

| Path | Role |
| --- | --- |
| [`demo/index.html`]({{ '/lessons/en/feii/canvas-25d-hex-field/demo/' | relative_url }}) | Stage + Seed / Velocity readout |
| `demo/hex-field.js` | Lattice SoA, projection, painter sort, pointer/scroll, fader API |

**CodeSandbox-ready** — open the demo URL, or copy both files into any static host. No npm install.

---

## Lab check (15–20 min)

1. Drag **Seed** and **Velocity** — name what each controls (structure vs time).
2. Set velocity to `0` and resize — lattice rebuilds, drift does not. Why is that the right hero default under `prefers-reduced-motion`?
3. Disable the painter sort and describe what breaks.
4. One sentence: when would this field graduate to R3F `InstancedMesh` instead?

---

## Session outcome

You can fake a spatial hex field with projection + draw order, tune seed/velocity for a calm hero background, and name the moment the Three tax becomes worth paying. The archive SVG stays the durable still; this module is the living twin.

{% comment %}
outcome-graphic-selection:
  source-section: "Session outcome"
  visual-grammar: "projection-to-painter — axial lattice through pitch/yaw perspective into sorted 2D paint order"
{% endcomment %}
{% include lesson-outcome-graphic.html %}
