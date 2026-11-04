---
layout: lesson
title: 'Cover Shaders — One Authored Sleeve Effect'
slug: feii-cover-shaders
date: 2026-11-04
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/cover-shaders/
description: 'A Bloque 5 satellite for the Units 8–9 album cover: the sleeve shader looks up a colour in the sleeve picture at a UV, then changes it on purpose. sampler2D, vUv, one uniform from React, one effect you can explain.'
status: complete
category: feii
tags: [feii, shaders, glsl, r3f, album-cover, satellite]
---

<aside class="lesson-framing" aria-label="Master idea and studio test">
<p><strong>Master idea:</strong> A sleeve shader looks up a colour in the sleeve picture at a place on that picture, then changes that colour on purpose.</p>
<p><strong>Studio test:</strong> Point at your sleeve shader and name the picture, the place, the uniform React writes, and the one effect.</p>
</aside>

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"The wise developer knows: the smallest image carries the heaviest meaning."_
> — Tao of Development, `img-001`
{: .tao-development-quote }

> **This is not Unit 9.** [Unit 9]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}) is still the introduction to shaders: vertex and fragment, one uniform, one coordinate space, precision, and the graded checklist. This satellite assumes you have read it. It adds one thing Unit 9 never needed: a shader that reads a **picture**. The Unit 9 bulb reads none. Pasting the bulb onto your sleeve, with or without a texture bolted onto its rim, fails Unit 9's checklist item 5 and the assignment's second covenant bar.

> **AI Assistance Disclosure:** Models write texture shaders fluently and often get the colour handling or the coordinate space wrong. Read the [AI-Assisted 3D covenant]({{ '/lessons/en/feii/ai-assisted-3d-covenant/' | relative_url }}) before the first prompt. Every shader diff an assistant drafts goes into the covenant's `docs/ai-3d-merge-log.md` as ACCEPT, REJECT, or ESCALATE, the same habit as [Unit 6]({{ '/lessons/en/feii/unit-6-ai-code-review/' | relative_url }}).

**Code in this lesson:** each fence carries one of three labels.
- **CodeSandbox-ready** files are complete and run in your Unit 8 **cover fork** as published: `src/sleevePicture.js` and `src/SleeveMaterial.jsx`. Both are new files.
- **Excerpts** show one idea and do not run alone: the vocabulary lines, the diagram, and the three changes inside your own `src/Cover.jsx`.
- **Templates** need your values: the own-photo version of `src/sleevePicture.js` and line 7 of `docs/shader-note.md`.

Everything goes into the cover fork, never into the beacon sandbox. Like Units 8 and 9 it is one scene, so there is no route table.

---

## Scholarly honesty — a graphics-grounded pilot

No peer-reviewed study validates this cover-shader sequence, or the album sleeve as a way to teach texture sampling. The research precedent is narrower: shader and render functions stay substantially similar across changing graphics APIs, so the fundamental ideas are worth learning well (Angel and Shreiner 2024, 1–2). That supports teaching *sampling* as a durable idea. It says nothing about R3F, Drei, or whether this lesson works. What this cohort defends is the checklist at the end, not a finding.
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
Evidence-matrix row: frontend-pedagogy/grounding/README.mdc "Satellite — cover shaders" (X3, 2026-11-04).
VERIFIED: Angel, E. &amp; Shreiner, D. (2024). The Future of Teaching Computer Graphics. SIGGRAPH Educators Forum '24. DOI 10.1145/3641235.3664433. Ahmes coat 10_1145_3641235_3664433_the_future_of_teaching_computer_graphics_e2e9b45c, nodes 348bd016-3aee-5eb3-ae93-b3d422e137df p.1 and 92a534c1-6aff-5d5e-b1e5-2a7d2e2c65a9 p.2, evaluator_safe=yes (resolved X3 against a temporary copy of extraction.db; transcript FEII-3D-ALBUM-KTX-CITATION-TRANSCRIPT-20261104.md).
[UNVERIFIED-GAP]: no Ahmes coat validates an R3F/Drei cover-shader sequence or the album-cover brief as a learning intervention. AI Co-Artist remains excluded (unsafe). ShaderMatch not promoted (no OA, no node).
DevIAC/Athanor down on 2026-11-04; no vector discovery in X7; no vector snippet cited.
Khronos / three.js / Drei appear only as dated platform notes, never as References.
-->
{% endif %}

---

## 🎯 Learning objectives

By the end of this satellite you will be able to:

- **Say what a sampling shader does** in plain words before any jargon: it looks up a colour in a picture at a place on that picture.
- **Name the two inputs** of that lookup in your own code: the picture (`sampler2D uMap`) and the place (`vUv`).
- **Author one sleeve effect** that changes either the place or the colour on purpose, driven by one uniform React writes.
- **Explain your shader aloud**, line by line, with the checklist at the end of this page.

---

## A picture, and a place on it

The sleeve shader never paints the sleeve. For every dot of the sleeve on screen it asks one question: which colour does the sleeve picture have at this place? The GPU looks up the answer. The picture is the `sampler2D` called `uMap`. The place is the UV called `vUv`: two numbers that run from 0 to 1 across the picture, whatever size the picture is. The placeholder picture in this lesson prints its own UV in each corner, `uv 0,0` at the bottom left and `uv 1,1` at the top right, so you can check on the sleeve which way it landed. What does the sleeve show if you multiply `vUv` by 2 before the lookup, and why does the picture not simply repeat? The lookup is exact about places and silent about meaning. A sleeve can be printed perfectly and still not read as the album, and nothing in the shader can tell you which of the two you have made.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
tuning_record: 2026-11-04-ef657831-81ba-4d11-aaf1-4218b056ed40-feii-cover-shaders-idea1 — four thessia-scholar-v3 attempts via scribe_http.py shim, all REJECTED (shim quote gate on every attempt; attempt 1 also invented a citation year for the Angel and Shreiner paper that the shim's CI3 regex missed because it used an ampersand; attempt 3 degenerated into a runaway list; invented uniforms/JSX, "last week", wrong Unit 9 claims). Nothing from the raws was integrated. The paragraph above (9 sentences, over the scribe's four-to-five shape) was written by the Claude executor (cascade-phase-executor agent), not by Thessia and not by the professor, after the 4 rejected thessia-scholar-v3 attempts. It restates lesson facts only. No citation. Professor release of this paragraph is a pre-publication step (independent_human_review: false).
-->
{% endif %}

**Excerpt** — a diagram, not code.

```text
 the sleeve picture (uMap)              the sleeve on screen

 v = 1  ┌────────────────────┐          ┌──────────────┐
        │ uv 0,1      uv 1,1 │          │      ·       │ ← one dot; its vUv
        │      ·             │ ◄─────── │              │   is, say, (0.3, 0.7)
        │                    │  lookup  │              │
        │ uv 0,0      uv 1,0 │          │              │
 v = 0  └────────────────────┘          └──────────────┘
        u = 0          u = 1

 texture2D(uMap, vUv) → the colour of the picture at (0.3, 0.7)
```

Three words, each in its everyday sense first:

| Everyday | In the shader | Where it comes from |
| --- | --- | --- |
| the sleeve picture | `uniform sampler2D uMap;` | React passes a texture to the material |
| where on that picture | `varying vec2 vUv;` | the mesh's own `uv` numbers, copied by the vertex shader |
| look it up | `texture2D(uMap, vUv)` | gives back a colour: red, green, blue, alpha |

The GPU holds the picture as a grid of **texels**, short for *texture elements*: one texel is one stored colour in that grid. A lookup at a UV usually lands between texels and blends the nearest few, so the colour that comes back is often a mix of neighbouring texels, not one texel. How that picture is packed into GPU memory, and what it costs there, is the [KTX2/Basis satellite]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }})'s job, not this lesson's.

Unit 9 already named `uv` as a coordinate space. This is the first time it does real work. A `boxGeometry` gives each of its six faces its own 0-to-1 UV square. The sleeve's front face shows the whole picture, and its thin edges show the picture squeezed into a strip.

## Change the place, or change the answer

The sheen on the reference sleeve never moves the picture. A band of light crosses the sleeve on a diagonal every 7.5 seconds, but it only changes the colour that came back from looking up `uMap` at `vUv`, so the print underneath stays where it landed. What happens if you make the other move instead and add a small number to `vUv` before the lookup, so the shader changes where it looks rather than what it got back? The Unit 9 bulb makes neither move, because its rim follows the surface's angle to the camera, so on a sleeve it would brighten and fade as you orbit and never once read the picture. A sheen can also betray a cover that was printed on cardboard as surely as a pasted rim does, and no counter on the panel will make that judgement for you.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
tuning_record: 2026-11-04-ed47a69b-a4ca-4d2c-8796-47d8684664b6-feii-cover-shaders-idea2 — thessia-scholar-v3 attempt 1 via scribe_http.py shim, passed gates (markers 4/4, no cite, no quote), then amended: removed invented "At studio we made", "sleeveTexture", "last week", "sleeves folder", "around seam"; rewrote the tidy close ("every student who copies that code fails") into the cardboard counter-critic. Kept: sheen crosses diagonally, changes colour after the lookup and not the picture; the open question about offsetting the UV before the lookup; bulb rim from surface and camera, not an authored sleeve effect. No citation.
-->
{% endif %}

So there are two kinds of sleeve effect, and yours is one of them:

- **Move the place.** Change `vUv` before the lookup: a ripple, a drift, a slow zoom. The picture itself appears to move.
- **Change the answer.** Keep the lookup where it is and change the colour that comes back: a sheen, a tint, a fade, a duotone. The picture stays put.

The reference below changes the answer. If you pick it, change it enough that the shader note describes *your* decision, not this page.

### Why the material has two colour lines

A photo, or a canvas you draw on, stores its colours ready for a screen. That encoding is called sRGB. Mixing in light, which is what the sheen does, is only correct on numbers that behave like light. Two lines handle this:

- `texture.colorSpace = SRGBColorSpace` in `sleevePicture.js` tells the GPU to unpack the screen colours into light-like numbers when the shader looks them up.
- `#include <colorspace_fragment>`, the last line of the fragment shader, packs the result back for the screen.

The Unit 9 bulb has neither line, on purpose. It writes colours it chose itself, so the number it writes is the pixel you get. A picture has to come back out the way it went in. Leave out only one of the two lines and the sleeve comes out too dark or washed out. With both in place, the placeholder's orange disc (`#e36a2c`) rendered as `rgb(227, 106, 44)`: the same colour.

---

## Sandbox setup — your Unit 8 cover fork

1. Open the **cover fork** from the [Unit 8 lab]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}#lab-team--workplace-like--3-h). It is the one with `PartId.sleeve`, `PartId.vinyl`, and `PartId.stage` in `src/parts.js` and a `src/Cover.jsx`. Do not use the beacon sandbox, where Unit 9's bulb lives.
2. Nothing new to install. `shaderMaterial` comes from Drei and `CanvasTexture` comes from three, and both are already pinned.
3. Create `src/sleevePicture.js` and `src/SleeveMaterial.jsx` from the two CodeSandbox-ready files below. Then make the three changes in your own `src/Cover.jsx`.
4. Leave `src/parts.js`, `src/App.jsx`, `src/BudgetProbe.jsx`, `src/main.jsx`, and `src/index.css` alone. Do not paste `Beacon.jsx` or `BulbMaterial.jsx` into the fork.

`Cover.jsx` imports the new files, so the preview errors until both exist. Create them first.

**What you should see:** your sleeve shows the placeholder picture: blue ground, orange disc, your album title, and a UV label in each corner. A band of light crosses the sleeve every 7.5 seconds. Hover or select the sleeve and the picture brightens slightly. Under `prefers-reduced-motion` the band never appears, and the picture still renders.

The panel's `textures` count goes up by **one**, because the picture is a texture. Until you update `CEILING`, the verdict reads `over ceiling`. Unit 8 lab step 7 already asks you to keep your own `CEILING`; do it again here, and add the new reading to `docs/renderer-info.md`.

**Platform notes** (installed versions checked 2026-11-04 in the course's `react-template`):

| Package | Version | Note |
| --- | --- | --- |
| `three` | `0.185.1` | Course pin. npm's latest that day was `0.187.0`; this lesson was not run on it. |
| `@react-three/fiber` | `9.8.2` | Same as Units 8–9. Its automatic colour tagging only covers built-in material slots such as `map`, never a custom `uMap`, so the file sets `colorSpace` itself. |
| `@react-three/drei` | `10.7.9` | `shaderMaterial` turns each uniform into a property, so `uMap={map}` works as a JSX prop. |
| `react` | `19.3.1` | Same as Units 8–9. |

### `src/sleevePicture.js`

**CodeSandbox-ready** — in the cover fork, create `src/sleevePicture.js`. It draws a placeholder sleeve on a canvas, so the sandbox needs no image file and no licence decision yet. Swap in your own photo later with the Template further down.

```js
import { useEffect, useMemo } from 'react';
import { CanvasTexture, SRGBColorSpace } from 'three';

const SIZE = 512;

const PLACEHOLDER = {
  ground: '#1f3a5f',
  disc: '#e36a2c',
  ink: '#f4efe6',
};

/**
 * Paints a placeholder sleeve picture on a 2D canvas. Each corner is labelled
 * with its UV, so you can see which way the picture lands on the mesh.
 *
 * @param {string} title Album title, printed across the middle.
 * @returns {HTMLCanvasElement} A square canvas, 512 × 512 pixels.
 */
export function drawSleevePicture(title) {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = PLACEHOLDER.ground;
  ctx.fillRect(0, 0, SIZE, SIZE);

  ctx.fillStyle = PLACEHOLDER.disc;
  ctx.beginPath();
  ctx.arc(SIZE / 2, SIZE / 2, SIZE * 0.28, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = PLACEHOLDER.ink;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.font = '600 36px system-ui, sans-serif';
  ctx.fillText(title, SIZE / 2, SIZE / 2);

  // Canvas rows count down from the top. The upload flips them, so the top row becomes v = 1.
  ctx.font = '22px ui-monospace, monospace';
  ctx.textAlign = 'left';
  ctx.fillText('uv 0,1', 16, 28);
  ctx.fillText('uv 0,0', 16, SIZE - 28);
  ctx.textAlign = 'right';
  ctx.fillText('uv 1,1', SIZE - 16, 28);
  ctx.fillText('uv 1,0', SIZE - 16, SIZE - 28);

  return canvas;
}

/**
 * Makes the sleeve picture once per title and frees its GPU copy when the
 * component that asked for it unmounts.
 *
 * @param {string} title Album title for the placeholder picture.
 * @returns {import('three').CanvasTexture} The texture to pass to the material as `map`.
 */
export function useSleevePicture(title) {
  const picture = useMemo(() => {
    const texture = new CanvasTexture(drawSleevePicture(title));
    // The canvas holds screen colours. This tag tells the GPU to unpack them before the maths.
    texture.colorSpace = SRGBColorSpace;
    return texture;
  }, [title]);

  useEffect(() => () => picture.dispose(), [picture]);

  return picture;
}
```

`useMemo` makes the texture once per title, not once per render. `dispose()` frees the GPU copy when the sleeve unmounts. The canvas is the picture's source. After upload, the GPU holds its own copy, and that copy is the `+1` on the panel.

### `src/SleeveMaterial.jsx`

**CodeSandbox-ready** — in the cover fork, create `src/SleeveMaterial.jsx`. This is the new material file Unit 9's lab step 1 asks for.

{% raw %}

```jsx
import { useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

// The band moves 0.4 per second along a diagonal that runs from -0.5 to 2.5: 3.0 / 0.4 = 7.5 s.
const SWEEP_SECONDS = 7.5;

/*
 * Purpose: print the sleeve picture on the mesh and sweep one band of light across it.
 * Inputs: uMap (the sleeve picture), uTime (seconds, wrapped), uHot (0 or 1, from React state).
 * Coordinate space: UV. vUv says where on the picture this pixel is, copied from the mesh.
 * Performance: one texture lookup per pixel. No loop, no discard.
 */
const SleeveShader = shaderMaterial(
  { uMap: null, uTime: 0, uHot: 0 },
  /* glsl */ `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    uniform sampler2D uMap;
    uniform float uTime;
    uniform float uHot;
    varying vec2 vUv;

    void main() {
      vec4 picture = texture2D(uMap, vUv);

      float diagonal = vUv.x + vUv.y;
      float sweep = uTime * 0.4 - 0.5;
      float sheen = 1.0 - smoothstep(0.0, 0.12, abs(diagonal - sweep));

      vec3 color = picture.rgb * (1.0 + 0.15 * uHot);
      color = mix(color, vec3(1.0), sheen * 0.35);
      gl_FragColor = vec4(color, 1.0);

      #include <colorspace_fragment>
    }
  `,
  (material) => {
    material.precision = 'mediump';
  },
);

extend({ SleeveShader });

/**
 * The sleeve's material. It looks up the picture at the mesh's UV and sweeps
 * one band of light across it.
 *
 * @param {object} props
 * @param {import('three').Texture} props.map The sleeve picture.
 * @param {boolean} props.hot True while the sleeve is hovered or selected.
 * @param {boolean} props.reduced True under prefers-reduced-motion. The band then waits off the picture.
 * @returns {JSX.Element} A material element; put it inside the sleeve's `<mesh>`.
 */
export default function SleeveMaterial({ map, hot, reduced }) {
  const material = useRef(null);

  useFrame((_, delta) => {
    const node = material.current;
    if (!node) return;
    if (reduced) {
      // uTime 0 puts the band at -0.5, off the picture. The picture itself still renders.
      node.uTime = 0;
      return;
    }
    // Wrap once per crossing, so uTime stays small enough for a mediump float.
    node.uTime = (node.uTime + Math.min(delta, 0.05)) % SWEEP_SECONDS;
  });

  return <sleeveShader ref={material} uMap={map} uHot={hot ? 1 : 0} />;
}
```

{% endraw %}

### `src/Cover.jsx` — three changes

**Excerpt** — the lines that change in *your* `src/Cover.jsx`. Everything else in your file stays as you composed it in Unit 8. Put your album's title where the placeholder says `Placeholder Album`.

{% raw %}

```jsx
// 1. Beside the other imports:
import SleeveMaterial from './SleeveMaterial.jsx';
import { useSleevePicture } from './sleevePicture.js';

// 2. Inside Cover(), next to the other hooks:
const picture = useSleevePicture('Placeholder Album');

// 3. Inside the sleeve's <mesh>, in place of its <meshStandardMaterial … />:
<SleeveMaterial
  map={picture}
  hot={hovered === PartId.sleeve || selected === PartId.sleeve}
  reduced={reduced}
/>
```

{% endraw %}

The sleeve no longer calls `colorFor`, so `hot` brings back the hover and selection feedback the standard material used to give. The stage and the vinyl keep `meshStandardMaterial`. `bindPart`, the ids, the panel, and `App.jsx` do not change.

### Reading the material, line by line

- **`vUv = uv;`** Three hands every vertex its `uv` numbers, the same way Unit 9 used `position` and `normal`. Do not declare `uv` again. The vertex shader copies it into `vUv`, and the GPU blends it across the face, so every pixel knows its own place on the picture.
- **`texture2D(uMap, vUv)`** is the lookup. You write GLSL 1 words, as in Unit 9; on WebGL 2 three maps `texture2D` onto the newer `texture`. Its answer, `picture`, has `.rgb` and `.a`.
- **`diagonal = vUv.x + vUv.y`** is 0 at the bottom-left corner and 2 at the top-right. Every point with the same sum sits on one diagonal line across the sleeve.
- **`sweep = uTime * 0.4 - 0.5`** is where the band is now. It starts at -0.5, below the picture, and reaches 2.5, past it, after 7.5 seconds. Then `uTime` wraps.
- **`smoothstep(0.0, 0.12, abs(diagonal - sweep))`** is 0 on the band's centre line and 1 from 0.12 away. `1.0 -` flips it, so `sheen` is 1 on the band and fades to 0 at its edges.
- **`picture.rgb * (1.0 + 0.15 * uHot)`** is the state, not the effect. Hover or selection lifts the picture by 15%.
- **`mix(color, vec3(1.0), sheen * 0.35)`** is the effect. On the band, the colour moves 35% toward white. Off the band, `sheen` is 0, so the picture is unchanged.
- **`#include <colorspace_fragment>`** packs the colour back for the screen. Three swaps this line for one call, `gl_FragColor = linearToOutputTexel(gl_FragColor);`, before it compiles. Keep it last.
- **`material.precision = 'mediump'`** is the same decision as Unit 9, in the same place. Do not add a `precision` line to the GLSL as well.
- **`% SWEEP_SECONDS`** keeps `uTime` between 0 and 7.5, for the same mediump reason Unit 9 wraps its clock at 2π. The clamp at 0.05 is Unit 9's too: a hidden tab cannot jump the band.
- **`reduced`** sets `uTime` to 0, which parks the band at -0.5, off the picture. The shader still runs. Only the motion stops.

This file follows the studio's shader rules. The uniforms are `u…` and the varying is `v…`. A header says the purpose, the inputs, the coordinate space, and the cost. There is no `for` loop and no `discard`. Each pixel does one texture lookup.

### What was checked, and what was not

These two files and the three `Cover.jsx` changes were dropped into the Unit 8 cover fork exactly as published. The `App.jsx` swap was applied, with `Placeholder Album` as the title. The checks:

- **Bundle.** The fork bundled with esbuild against the course pins above.
- **Render.** It rendered on 2026-11-04 in headless Chrome, using the SwiftShader software renderer rather than a GPU.
- **Picture.** Each UV label landed on its own corner, and the band crossed the sleeve.
- **Hover.** Hovering the sleeve set `Hover: sleeve` and brightened the picture.
- **Reduced motion.** With `prefers-reduced-motion` emulated, no band appeared.
- **Console.** No shader error.
- **Panel.** The Unit 8 placeholder tree read `textures 1` before this change and `textures 2` after it. Calls (3), triangles (280), and geometries (3) did not move. A material swap is not a new draw, and the picture is the one new texture.

The software renderer cannot tell you about speed or phone memory. Your own cover, measured on your own machine, gives the row you defend. Neither this page nor Unit 8 publishes a budget for a cover.

---

## Your own photo

**Template** — when you have a picture you are allowed to use, replace `src/sleevePicture.js` with this version. Put the file at `public/sleeve.jpg` in the fork: Vite serves `public/` from the site root. That is true of the fork only; on the assignment the path changes (see Lab mapping, step 2). Replace the path if your file has another name. `Cover.jsx` does not change. The title argument it still passes is simply ignored.

```js
import { useTexture } from '@react-three/drei';
import { SRGBColorSpace } from 'three';

function tagScreenColours(texture) {
  // A photo holds screen colours. This tag tells the GPU to unpack them before the maths.
  texture.colorSpace = SRGBColorSpace;
}

/**
 * Loads your own sleeve photo from `public/sleeve.jpg`. The Canvas waits,
 * blank, until the file has arrived.
 *
 * @returns {import('three').Texture} The texture to pass to the material as `map`.
 */
export function useSleevePicture() {
  return useTexture('/sleeve.jpg', tagScreenColours);
}
```

What to customise and check:

- **Crop the photo square.** UV runs from 0 to 1 on both axes, so a picture that is not square is stretched to fit the square sleeve. This version was rendered with a wide image to confirm it: the picture stretched.
- **Keep `tagScreenColours` outside the hook.** `useTexture` calls it once, before the upload. A new arrow function on every render would make it run again on every render.
- **The rights are yours to declare.** The rule is the assignment's: photograph a physical album you own, or name the licence that lets you use the image. A private repository is not a licence.
- **This is not the final delivery.** A JPEG or PNG is a file format for the network. The [KTX2/Basis satellite]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}) changes how the sleeve picture is delivered, and measures it on the GPU. When you load a KTX2 sleeve, check what the loader set: `texture.colorSpace` should read `'srgb'` for a sleeve photo. If it does not, the file was encoded without screen colours and the sleeve comes out washed out. Fix the encode, not the shader: keep `#include <colorspace_fragment>`.

---

## Explain this shader — checklist

This is the same kind of checklist as Unit 9's, applied to the sleeve. Unit 9's six items still apply. Point at your sleeve shader and name, aloud and in `docs/shader-note.md`:

1. **The picture.** Which `sampler2D`, what is in it, and where the file comes from, with its licence.
2. **The place.** Which UV, where `vUv` comes from, and what the sleeve would show if you multiplied it by 2.
3. **The uniform React writes.** Which one (`uTime`, `uHot`, or yours), who writes it, and why it is not a number in the shader source.
4. **The one effect.** Does it move the place or change the answer? Point to the line that does it.
5. **The colour lines.** What `colorSpace` and `#include <colorspace_fragment>` each do, and what the sleeve looks like without one of them.
6. **Precision and cost.** `mediump` or why not; texture lookups per pixel; any loop or `discard` and why; the `textures` reading before and after the picture.
7. **Not the bulb.** One sentence on why your effect is not Unit 9's rim.

**Template** — line 7 of `docs/shader-note.md`, which Unit 9 left as a question. Replace each ellipsis.

```markdown
7. Sampler: uMap is ... (what the picture shows, and its source or licence). It is looked up at vUv, the sleeve's own UV, so the picture stays printed when the camera orbits. My effect ... (moves the place / changes the answer) in the line ...
```

A note that only restates this page's sheen does not pass item 4. The effect has to be one you chose for your album.

---

## Failure modes this lesson refuses

- **`BulbMaterial` with new colours, or with a texture added to its rim.** Its look comes from the camera, not the picture. It fails item 7 here and Unit 9's item 5.
- **Looking the picture up at `gl_FragCoord` or by view direction.** The picture swims across the sleeve as you orbit. Look it up at `vUv` and it stays printed.
- **Only one of the two colour lines.** The sleeve comes out too dark, or washed out, and the shader still compiles.
- **`new CanvasTexture(...)` inside the render body.** It uploads a new texture on every render. Make the picture once with `useMemo`, as in the reference file.
- **`useTexture` with a new callback inside the render body.** The texture is cached and uploaded once, but the callback runs again on every render. Keep it outside the hook, as in the own-photo version.
- **A varying that the vertex shader never declares.** Here that is `vUv`. If the vertex shader has no `varying vec2 vUv;` line, the link fails, exactly as Unit 9 describes.
- **A varying that the vertex shader declares but never sets.** Delete only `vUv = uv;` and there is no error at all: the shader compiles and links, and the whole sleeve shows one flat colour, the picture's colour at UV (0,0). Look for the flat colour, not for an error.
- **A clock uniform that grows forever under `mediump`.** Wrap it.
- **A `for` loop or `discard` you cannot justify aloud.** One lookup per pixel is the reference cost.

---

## Lab mapping — on the assignment

This satellite is studied inside the Units 8–9 lab hours. It does not add hours. On the [Units 8–9 assignment]({{ '/lessons/en/feii/units-8-9-assignment/' | relative_url }}), the sleeve shader is **task2 — authored shader**. The steps:

1. **Branch.** Work on a `cover-<slug>-task2-shader` branch.
2. **Move the files.** `SleeveMaterial.jsx` and your `sleevePicture.js` go into your route's `covers/<slug>/src/`, beside its `Cover.jsx`. They do not touch the Canvas, the router, or `App.jsx`, but two things change. First, the own-photo version's `'/sleeve.jpg'` assumes the fork's root `public/`; on the aggregator each route has its own `covers/<slug>/public/`, so put the photo there and reference it relative to your route, as the aggregator's `_template` shows. Second, the gallery's `/covers/<slug>` route is built to pass `Cover` the same five props the fork's `App.jsx` does (`hovered`, `selected`, `reduced`, `onHover`, `onSelect`), so your `Cover.jsx` moves over unchanged; the aggregator's `CONTRIBUTING.md` documents that contract.
3. **Write the notes.** Fill line 7 of `docs/shader-note.md`, and add the new `textures` reading to `docs/renderer-info.md`.
4. **Stop before KTX2.** The KTX2 choice is task3, in the KTX2/Basis satellite. Do not start it in this PR.

---

## Independent self-check — autonomous study

This is an individual self-check, not part of the formal 14-hour Resolución de Ejercicios allocation. The decontextualised drills for this satellite are in `exercises.md` beside this page.

1. Without looking at this page, write the four GLSL lines that declare a picture and a place and look one up.
2. Say in one sentence what a texel is, without using the word "texture".
3. Your sleeve shows the picture upside down. Name two places it could have been flipped.

---

## 📚 Platform notes (HOW, not bibliography)

Checked 2026-11-04. These explain how the tools work. None of them is evidence that this lesson teaches well.

- three.js — `ShaderMaterial`: <https://threejs.org/docs/pages/ShaderMaterial.html>
- three.js — `CanvasTexture`: <https://threejs.org/docs/pages/CanvasTexture.html>
- three.js manual — color management: <https://threejs.org/manual/#en/color-management>
- Drei — `shaderMaterial`: <https://drei.docs.pmnd.rs/shaders/shader-material>
- Drei — `useTexture`: <https://drei.docs.pmnd.rs/loaders/texture-use-texture>
- Khronos — GLSL ES 3.00 specification (PDF): <https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf>

---

## Session outcome

You can say in plain words what your sleeve shader does: it looks up a colour in the sleeve picture at the sleeve's own UV, then changes that colour, or the place, on purpose. You can name the line that does each part. The bulb stays Unit 9's demonstration. The sleeve is yours. How the picture travels and what it costs on the GPU is the [KTX2/Basis satellite]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}). The hand-in is the [assignment]({{ '/lessons/en/feii/units-8-9-assignment/' | relative_url }}).

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
Professor answer sketch for the self-check and exercises.md (not for the student handout):
- vUv * 2.0 with the default ClampToEdgeWrapping: the picture fills only the bottom-left quarter of the sleeve, and its right and top edge texels smear across the rest. It repeats only if texture.wrapS/wrapT = RepeatWrapping (and then once per unit of UV).
- Four lines: uniform sampler2D uMap; varying vec2 vUv; (vertex) vUv = uv; (fragment) vec4 c = texture2D(uMap, vUv);
- Upside down: flipY on the texture (CanvasTexture/TextureLoader default true; KTX2 textures are not flipped the same way), or the mesh's UVs (a rotated plane, or using 1.0 - vUv.y somewhere).
- exercises.md diagnostic (dark sleeve): colorSpace set to SRGBColorSpace but no colorspace_fragment, so linear values reach an sRGB screen unconverted. Fix: add #include <colorspace_fragment> as the last line. Washed out = the reverse.
- exercises.md no-AI item: sheen is a change-the-answer effect; ripple (vUv.x += 0.02 * sin(vUv.y * 20.0 + uTime)) is a move-the-place effect.
Measured (X7 executor, 2026-11-04, headless Chrome with the SwiftShader ANGLE backend, three 0.185.1 / fiber 9.8.2 / drei 10.7.9 / react 19.3.1, Unit 8 cover Template + this material): calls 3, triangles 280, geometries 3, textures 1 → 2; orange disc #e36a2c sampled rgb(227,106,44); hover rgb(241,113,47). Not a GPU measurement.
-->
{% endif %}

---

> _"If you can name it too quickly, you do not understand it. If you can't name it at all, you do not understand yourself."_
> — Tao of Development, `cc-002`
{: .tao-development-quote }

## References

- Angel, Edward, and Dave Shreiner. 2024. “The Future of Teaching Computer Graphics.” *SIGGRAPH Educators Forum ’24*. https://doi.org/10.1145/3641235.3664433.
