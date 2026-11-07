---
layout: lesson
title: 'Canvas 2.5D Hex Field — Projection Without Three'
slug: feii-canvas-25d-hex-field
date: 2026-11-07
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/canvas-25d-hex-field/
description: 'Bloque 5 satellite: Hexaform lattice under pitch/yaw projection and painter’s algorithm — living archive covers, landing heroes, and depth literacy without the Three.js tax. Pair with Units 8–9, not a substitute.'
status: complete
category: feii
tags: [feii, canvas, projection, hex-grid, 2.5d, satellite, performance, hexaform, hero]
---

<aside class="lesson-framing" aria-label="Master idea and studio test">
<p><strong>Master idea:</strong> Depth on a 2D canvas is a lie you author — projection + draw order — not a free Z-buffer. The same Hexaform grammar can bake an SVG stamp or drive a living hero.</p>
<p><strong>Studio test:</strong> Open the gallery, name pitch vs yaw, why far cells paint first, what Seed vs Velocity control, and why a landing hero uses <code>pointerRoot</code> + scroll parallax with the canvas on <code>pointer-events: none</code>.</p>
</aside>

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> **This is not Unit 8.** [Unit 8]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}) teaches the React component model on a real WebGL scene graph with `renderer.info`. This satellite teaches the **math underneath a cheap spatial hero**: rotate, perspective-divide, sort, paint — then **ship it** as archive covers and landing backgrounds. Use it when a field should feel 3D without shipping Three.

> **AI Assistance Disclosure:** Models invent “3D SVG” and paste Three boilerplate. Ask them for a projection function and a painter sort; reject a dependency you cannot budget.

**Code convention in this lesson**

| Label | Meaning |
| --- | --- |
| **CodeSandbox-ready** | Paste / open as static ES modules under `demo/` — no npm |
| **Excerpt** | Load-bearing fragment; not a full app by itself |
| **Template** | Replace placeholders (seed, asset id, hero selector) |

**Where to look**

| Surface | URL |
| --- | --- |
| Gallery (one compo per hub) | [Living covers]({{ '/lessons/en/feii/canvas-25d-hex-field/demo/' | relative_url }}) |
| Lab (Seed + Velocity) | [Lab]({{ '/lessons/en/feii/canvas-25d-hex-field/demo/lab/' | relative_url }}) |
| Landing hero preview | [landing-preview]({{ '/lessons/en/feii/canvas-25d-hex-field/demo/landing-preview/' | relative_url }}) |
| Reference stamp (SVG) | [`archive-lessons-en.svg`]({{ '/assets/images/archive-covers/archive-lessons-en.svg' | relative_url }}) |
| Live home hero (when site is running) | site root — `archive-hero-live` mounts `archive-home` |

---

## How this is built

**One sentence:** plain **Canvas 2D** + **vanilla ES modules** + math we wrote — **no npm packages, no Three.js, no React, no Neo.mjs runtime.**

### What we use / what we do not

| | |
| --- | --- |
| **Runtime** | Browser only: `<canvas>`, `getContext('2d')`, `requestAnimationFrame`, `ResizeObserver`, `matchMedia`, pointer/scroll |
| **Modules** | Native `import` / `export` — open as static files; no bundler required for demos |
| **Lattice rules** | **Hexaform** (our repo): mode profile → activation → size/fill → centre chaos — same grammar as SVG archive stamps |
| **Depth illusion** | Pitch/yaw rotate → perspective divide → painter sort → stroke/fill hex paths |
| **Not in the bundle** | Three.js, R3F, WebGL, Neo.mjs, npm deps, shaders, physics engines |

**Neo.mjs?** Cited only as a *pedagogy parallel* ([Neural Fabric guide](https://neomjs.com/learn/guides/advanced/NeuralFabric)): another team budgeting spatial UI without defaulting to a full 3D engine. **We do not import, install, or ship Neo.mjs.** Their fabric ≠ our `hex-field.js`.

### Pipeline (build → ship)

```text
1. Hexaform rules (frequency / drift / pulse, seed)
        │
        ├─► scripts/archive-covers/generate-archive-covers.mjs
        │         └─► assets/images/archive-covers/*.svg   (OG / print / reduced-motion)
        │
        └─► demo/hex-field.js  (live SoA lattice + project + sort + paint)
                  │
                  ├─► compositions.js  (one preset per hub URL / seed)
                  ├─► mount.js         (mountComposition / gallery thumbs)
                  │
                  ├─► demo gallery + lab + landing-preview   (teach / tune)
                  └─► _includes/archive-hero-live.html      (site landing heroes)
```

### File graph (what calls what)

```text
HTML page
  └─ <script type="module">
        import { mountComposition } from '…/demo/mount.js'
              ├─ compositions.js   → preset { seed, fillMode, doubleDepth, … }
              └─ hex-field.js      → createHexField(canvas, options)
                    ├─ buildHexaformField()   // lattice SoA
                    ├─ project()             // pitch / yaw / FOV
                    ├─ painter sort          // far → near
                    └─ ctx.fill / ctx.stroke // hex polygons
```

### Why this shape

| Choice | Reason |
| --- | --- |
| Canvas 2D, not WebGL | Teach projection + draw order; no shader/GPU tax for ~100 hexes |
| No npm | Demos and heroes stay copy-paste / static-hostable; students see every line |
| SVG twin + live canvas | Same Hexaform seed language for OG and motion; `prefers-reduced-motion` keeps the stamp |
| Neo.mjs as reference only | Name the industry trade-off without adding a framework students must learn first |

---

## Why this exists

Three layers, one Hexaform language:

| Surface | What ships | Why |
| --- | --- | --- |
| **Static cover / OG / print** | Baked SVG from `scripts/archive-covers/` | No JS, sharable still, print-safe |
| **Hub hero (CSS)** | `.hero-section--archive` + `--hero-archive-image` | Brand + typography; SVG as durable background |
| **Living hero** | Canvas 2.5D (`hex-field.js`) behind the title | Motion, tilt, parallax — kilobytes, not hundreds of kilobytes |

| Need | Choose |
| --- | --- |
| Lights, materials, true occlusion, custom GLSL | [Unit 8–9 R3F]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}) |
| Dense geometric field, crisp fills/strokes, tiny bundle | **Canvas 2.5D** (this page) |
| Static OG / print / `prefers-reduced-motion` fallback | SVG stamp |

**Reason to teach it:** students stop treating WebGL as the only “real” 3D and can defend a hero that shares grammar with the PDF/OG image — without adopting Neo.mjs or Three to get there.

---

## Hexaform → living field

The irregular field is **not** a regular axial honeycomb. It is the Hexaform rule system (repo: `web-foundations/scripts/lesson-covers/ALGORITHMIC-PHILOSOPHY.md` and `scripts/archive-covers/generate-archive-covers.mjs`):

1. **Mode profile** — `[frequency, drift, pulse]` (e.g. `archive`, `shader`, `field`)
2. **Activation** — wave + focus + noise; cull weak cells
3. **Variable radius / alpha / fill**
4. **Centre chaos** — closer, bigger spiral cluster (the solid accents in `archive-lessons-en.svg`)
5. **Double depth** — far sheet + offset near sheet under 2.5D projection

SVG covers bake that once. `demo/hex-field.js` keeps it live under pitch/yaw.

**Excerpt** — composition preset (from `demo/compositions.js`):

```js
{
  id: 'archive-lessons-en',
  endpoint: '/lessons/en/',
  family: 'fe-i',
  seed: 769,
  options: {
    mode: 'archive',
    fillMode: 'solid',
    doubleDepth: true,
    centerChaos: true,
    complexity: 0.48,
    energy: 0.62,
    density: 16,
    velocity: 0.34,
    zDepth: 440,
    maxCells: 160,
  },
}
```

**Why fixed seeds per endpoint:** the home page and the OG image should feel like siblings, not random redraws every deploy.

---

## The two load-bearing ideas

### 1. Pitch / yaw projection — **Excerpt**

Rotate around Y (yaw), then X (pitch), then divide by depth. Do **not** subtract canvas centre from world `x/y` before projecting — offset onto the screen **after**.

```js
// From demo/hex-field.js — world-space rotate, then screen offset at the call site.
export function project(x, y, z, cosY, sinY, cosX, sinX, fov) {
  const x1 = x * cosY - z * sinY;
  const z1 = z * cosY + x * sinY;
  const y2 = y * cosX - z1 * sinX;
  const z2 = z1 * cosX + y * sinX;
  const denom = Math.max(fov * 0.15, fov + z2);
  const scale = fov / denom;
  return { x: x1 * scale, y: y2 * scale, scale, depth: z2 };
}
// screenX = projected.x + cx + panX;
// screenY = projected.y + cy + panY;
```

Near cells use strongly negative `z` so projected scale grows (oversized shells in the centre cluster).

### 2. Painter’s algorithm — **Excerpt**

Canvas 2D has no Z-buffer ([MDN: CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)). Far cells must paint before near cells every frame (classic [painter’s algorithm](https://en.wikipedia.org/wiki/Painter%27s_algorithm)).

```js
// depthBuf[i] = projected z2 for visible cell i (farther = larger depth in our convention)
// Insertion sort for ~100–160 cells — avoids Array.sort comparator allocation.
for (let i = 1; i < visible; i += 1) {
  const d = depthBuf[i];
  /* …shift while depthBuf[j] < d… */
}
for (let n = 0; n < visible; n += 1) drawHex(order[n]);
```

Wrong order = near cells buried under far ones. That bug is the whole depth lesson.

---

## Engine anatomy (`demo/hex-field.js`)

**CodeSandbox-ready** — open any gallery card or copy `hex-field.js` + `compositions.js` + `mount.js` into a static host.

| Concern | How the demo does it | Why |
| --- | --- | --- |
| Lattice | SoA `Float32Array`, stride 15 | Cache-friendly; one rebuild on resize |
| Coverage | Loose pack + overscan, not every site filled | Frame fill is camera/FOV, not a carpet |
| Fills | `fillMode: 'solid' \| 'mixed' \| 'stroke'` | Match SVG archive stamps vs wire lab |
| Depth bands | `doubleDepth` + `centerChaos` | Far sheet + near sheet + oversized centre |
| Budget | `maxCells` (~120–160), `dprCap` ~1.15 | Laptop fill-rate; same instinct as Unit 8 ceilings |
| Motion | Per-cell float dirs × global `velocity` | Seed = structure; velocity = time |
| Interaction | `pointerRoot`, `scrollParallax`, optional `wheelPitch` | Heroes tilt without stealing link clicks |

**Excerpt** — mount a composition (from `demo/mount.js`):

```js
import { createHexField } from './hex-field.js';
import { compositionOptions, getComposition } from './compositions.js';

export function mountComposition(canvas, id, overrides = {}) {
  const compo = getComposition(id);
  if (!compo) throw new Error(`Unknown composition: ${id}`);
  return {
    compo,
    field: createHexField(canvas, compositionOptions(compo, overrides)),
  };
}
```

---

## Lab vs production hero

### Lab — Seed + Velocity

Open the [lab]({{ '/lessons/en/feii/canvas-25d-hex-field/demo/lab/' | relative_url }}).

| Control | Controls | Production? |
| --- | --- | --- |
| **Seed** | Reshuffles activation / survivors (complexity gate) | Fixed per endpoint |
| **Velocity** | Global float rate (default slow ~0.38; `0` freezes drift) | Fixed low (0.25–0.45) |
| Pointer / wheel | Tilt + pitch inertia on the canvas | Hero: pointer on **hero**, no wheel-pitch |

### Landing hero — **Template**

What production does via `_includes/archive-hero-live.html` (JS options only — Liquid omitted here):

```js
import { mountComposition } from './mount.js'; // published path under demo/

const hero = document.querySelector('.hero-section--archive');
const canvas = document.createElement('canvas');
canvas.className = 'hexaform-live-bg';
canvas.setAttribute('aria-hidden', 'true');
hero.prepend(canvas);
hero.classList.add('has-hexaform-live');

mountComposition(canvas, 'archive-home', {
  interactive: true,
  pointerRoot: hero,      // tilt without blocking <a> / text
  scrollParallax: true,   // page scroll shifts yaw/pitch/pan
  wheelPitch: false,      // do not steal page scroll
  pointerAmp: 1.15,
  dprCap: 1.15,
  maxCells: 120,
});
```

**Replace:** composition id (`archive-home`, `archive-lessons-en`, …) to match `site.data.archive_covers[page.url].asset`.

**CSS contract** (see `docs/assets/css/site.css`):

- Canvas: `position: absolute; inset: 0; z-index: 0; pointer-events: none`
- Title / lede: `z-index: 1` + scrim gradients
- `prefers-reduced-motion: reduce` → hide canvas, restore SVG `--hero-archive-image` ([MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion))

**Why `pointerRoot`:** if the canvas ate pointer events, every CTA in the hero would miss clicks. Bind tilt to the hero; keep the canvas decorative for hit-testing.

---

## Performance contract

| Knob | Hero default | Why |
| --- | --- | --- |
| `maxCells` | ≤ 120 | Sort + 6-corner project per cell |
| `dprCap` | 1.15 | Retina fill-rate without 2× pixel tax |
| Frustum cull | skip off-screen centres | Less sort/draw work |
| Flat / light gradient bg | no per-frame nebula fills | Nebulae were a fill-tax |
| `desynchronized: true` | on 2D context | Lower latency where supported |

Graduate to R3F `InstancedMesh` when you need true occlusion, lights, or >~300 interactive cells with materials.

---

## Files

| Path | Role |
| --- | --- |
| [`demo/`]({{ '/lessons/en/feii/canvas-25d-hex-field/demo/' | relative_url }}) | Gallery |
| [`demo/lab/`]({{ '/lessons/en/feii/canvas-25d-hex-field/demo/lab/' | relative_url }}) | Seed / Velocity lab |
| [`demo/landing-preview`]({{ '/lessons/en/feii/canvas-25d-hex-field/demo/landing-preview/' | relative_url }}) | Hero tilt + scroll pad |
| `demo/hex-field.js` | Projection, SoA lattice, painter, interaction |
| `demo/compositions.js` | One preset per archive hub endpoint |
| `demo/mount.js` | `mountComposition` / gallery thumbs |
| `_includes/archive-hero-live.html` | Site-wide living hero boot |
| `assets/images/archive-covers/*.svg` | Baked Hexaform stamps |
| `scripts/archive-covers/generate-archive-covers.mjs` | SVG generator (source of truth for stamps) |

**CodeSandbox-ready** — no npm. Open the gallery URL, or serve `demo/` as static files (`demo/preview-server.mjs` for local docs without Jekyll).

---

## Lab check (20–30 min)

1. **Gallery** — open [`archive-lessons-en`]({{ '/lessons/en/feii/canvas-25d-hex-field/demo/archive-lessons-en/' | relative_url }}) and the [SVG stamp]({{ '/assets/images/archive-covers/archive-lessons-en.svg' | relative_url }}). Name three shared traits (solid fills, centre weight, palette).
2. **Lab** — drag Seed then Velocity. One sentence each: structure vs time.
3. **Painter** — in a fork, skip the depth sort. Describe what breaks.
4. **Hero** — on [landing-preview]({{ '/lessons/en/feii/canvas-25d-hex-field/demo/landing-preview/' | relative_url }}), move then scroll. Why is `wheelPitch: false` correct on a real landing?
5. **Graduate** — one sentence: when does this field become R3F `InstancedMesh`?

---

## Session outcome

You can author depth with projection + painter order, keep Hexaform consistent from SVG stamp → living cover → landing hero, and name the moment the Three tax becomes worth paying.

{% comment %}
outcome-graphic-selection:
  source-section: "Session outcome"
  visual-grammar: "projection-to-painter — Hexaform lattice through pitch/yaw into sorted 2D paint; SVG stamp twin of living hero"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

---

## References

1. MDN — [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D). 2D drawing model; no Z-buffer.
2. Wikipedia — [Painter’s algorithm](https://en.wikipedia.org/wiki/Painter%27s_algorithm). Far-to-near draw order for occlusion without a depth buffer.
3. MDN — [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion). Freeze float / show SVG fallback on living heroes.
4. Neo.mjs — [Neural Fabric guide](https://neomjs.com/learn/guides/advanced/NeuralFabric). **Citation only** (same budget pedagogy). Not a dependency of this lesson’s demos or heroes.
5. Repo — `web-foundations/scripts/lesson-covers/ALGORITHMIC-PHILOSOPHY.md` and `scripts/archive-covers/generate-archive-covers.mjs`. Hexaform profiles and baked archive stamps.
6. Course pair — [Unit 8 R3F fundamentals]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}), [Unit 9 shader literacy]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}). When the field must leave Canvas 2D.
