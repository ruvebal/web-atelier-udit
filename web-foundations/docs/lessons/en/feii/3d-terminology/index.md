---
layout: lesson
title: '3D Terminology — Say It Out Loud'
slug: feii-3d-terminology
date: 2026-11-05
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/3d-terminology/
description: 'A Bloque 5 satellite: one oral paragraph for the album sleeve, then a glossary that links each word back to the lesson section that already defines it. No new claims, no new hours.'
status: complete
category: feii
tags: [feii, terminology, glossary, album-cover, satellite, r3f, shaders, ktx2]
---

<aside class="lesson-framing" aria-label="Master idea and studio test">
<p><strong>Master idea:</strong> The words for the sleeve picture, the scene, the shader, the memory, the colour, and the packing already live on other pages. This page puts them in one place you can rehearse.</p>
<p><strong>Studio test:</strong> Say the oral paragraph about <em>your</em> sleeve, with your packing mode and your two numbers from your machine.</p>
</aside>

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> **This is not a numbered unit.** It adds no hours. It sits under Bloque 5 with [Cover shaders]({{ '/lessons/en/feii/cover-shaders/' | relative_url }}) and [KTX2/Basis]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}), inside the existing Units 8–9 lab window plus autonomous study. Every gloss below restates a section that already teaches the word. If a row and its linked section disagree, trust the linked section and tell the instructor.

> **Before you start.** [Unit 8]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}) built the scene and the budget panel. [Unit 9]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}) introduced shaders. Cover shaders made the sleeve look up a colour in a picture. KTX2/Basis taught how that picture travels and what room it takes. This page is the rehearsal, not a fifth story.

**Code in this lesson:** none. The linked lessons carry the CodeSandbox-ready, Excerpt, and Template fences. Optional running references (being published) match those satellites: [cover fork](https://ruvebal.github.io/react-template/ex3-cover), [cover shader](https://ruvebal.github.io/react-template/ex4-cover-shader), [ex5 packed-texture switch](https://ruvebal.github.io/react-template/ex5-ktx2).

---

## 🎯 Learning objectives

By the end of this satellite you will be able to:

- **Say the oral paragraph** about your own sleeve, without skipping pixel, texel, or UV.
- **Point each glossary word** to the lesson section that defines it.
- **Keep the two traps apart:** “compressed” (file packing vs GPU-resident packing) and “texture” (the file on disk vs the grid on the GPU).
- **Write your two numbers** labelled as file bytes and GPU bytes, and treat `renderer.info.memory.textures` as a count.

---

## Say this first

Open with this paragraph. Do not paraphrase it yet. The bold words are the ones the walk-through and the glossary unpack, in the order the paragraph speaks them.

The sleeve is a picture on the GPU, not an `<img>`. A **pixel** is a screen dot; a **texel** is a colour in that GPU picture; **UV** is how the shader asks for a texel. A JPEG is small on disk and usually **large** once unpacked. **KTX2** is only the box. I picked **ETC1S** or **UASTC** because of this sleeve, and I wrote file bytes and GPU bytes from this machine.

That wording is the course spine for this rehearsal. The [KTX2/Basis satellite]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#say-it-out-loud) carries the same paragraph at the end of its own page.

---

## Word by word, in that order

1. **Sleeve / picture on the GPU, not an `<img>`.** On a flat page the browser downloads a packed file, decodes it, and paints it. You never name the grid. A 3D sleeve is a mesh whose shader asks a picture for a colour. That picture lives on the GPU as a texture, not as an `<img>`. Defining sections: [You already know this part]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#you-already-know-this-part), [A picture, and a place on it]({{ '/lessons/en/feii/cover-shaders/' | relative_url }}#a-picture-and-a-place-on-it).

2. **Pixel.** A coloured dot on the screen — what the monitor shows. Defining section: [Three words for one picture]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#three-words-for-one-picture).

3. **Texel.** One stored colour in the picture the GPU is holding. The shader asks for a UV; the GPU looks up the nearest texels and usually **blends** them, so the colour that comes back is often a mix, not one texel. Defining section: [Three words for one picture]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#three-words-for-one-picture).

4. **UV.** Two numbers, each from 0 to 1, that say where on the picture. On your sleeve, `(0, 0)` is bottom-left and `(1, 1)` is top-right. Defining sections: [Three words for one picture]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#three-words-for-one-picture), [A picture, and a place on it]({{ '/lessons/en/feii/cover-shaders/' | relative_url }}#a-picture-and-a-place-on-it). Unit 9 named UV first; the satellites pin the sleeve corners.

5. **JPEG small on disk, large once unpacked.** File formats pack for download. The default GPU path unpacks to width × height × 4 bytes. That jump is upload inflation. Defining section: [The suitcase and the room]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#the-suitcase-and-the-room).

6. **KTX2 is only the box.** Naming the container is incomplete until you name the packing inside it. Defining section: [Three names that are not synonyms]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#three-names-that-are-not-synonyms).

7. **ETC1S or UASTC because of this sleeve.** Two packing modes: smaller/lossier vs larger/cleaner. Your written choice needs one honest reason that belongs to this sleeve. Defining sections: [Three names that are not synonyms]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#three-names-that-are-not-synonyms), [The choice you write]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#the-choice-you-write).

8. **File bytes and GPU bytes from this machine.** File bytes are the suitcase on disk. GPU bytes are computed from what was uploaded (same mipmap levels on both sides; record `texture.format`). `renderer.info.memory.textures` is a **count**, not bytes. Defining sections: [The suitcase and the room]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#the-suitcase-and-the-room), [Measure the room]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#measure-the-room--srcgpubytesjs).

---

## Glossary

Each row: everyday gloss, the course meaning, and a link to the defining section. Groups follow the journey, not the alphabet.

### Screen and picture

| Term | Everyday gloss | In this course | Defining section |
| --- | --- | --- | --- |
| **Pixel** | A coloured dot on the screen | Picture + element. What the monitor shows. | [Three words for one picture]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#three-words-for-one-picture) |
| **Texel** | A coloured sample in the picture the GPU holds | One stored colour in the grid. A lookup usually blends neighbours. | [Three words for one picture]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#three-words-for-one-picture) |
| **Texture** | The whole picture on the GPU | A grid of texels. Not the `.jpg` / `.png` file on disk. | [Three words for one picture]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#three-words-for-one-picture) |
| **UV** | “Where on the picture?” | Two numbers from 0 to 1. Sleeve: `(0, 0)` bottom-left, `(1, 1)` top-right. | [Three words for one picture]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#three-words-for-one-picture) |
| **`sampler2D`** | The picture the shader can look into | The uniform that names the texture; the place is still UV / `vUv`. | [A picture, and a place on it]({{ '/lessons/en/feii/cover-shaders/' | relative_url }}#a-picture-and-a-place-on-it) |

### Scene

| Term | Everyday gloss | In this course | Defining section |
| --- | --- | --- | --- |
| **Mesh** | A shaped object in the 3D scene | Geometry + material as one drawable thing (your sleeve, vinyl, stage). | [Basic Scene]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}#basic-scene) |
| **Vertex** | A corner of that shape | Position (and often normal, UV) the vertex shader processes. | [Vertex Shader]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}#vertex-shader) |
| **Triangle** | The face the GPU fills | What `renderer.info.render.triangles` counts across draw calls. | [Graded budget — `renderer.info`]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}#graded-budget--rendererinfo) |
| **Material** | How the surface looks | Colour, lighting model, or a custom shader attached to a mesh. | [Basic Scene]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}#basic-scene) |
| **Draw call** | One “draw this mesh” order | What `renderer.info.render.calls` counts; course caps sit on this number. | [Graded budget — `renderer.info`]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}#graded-budget--rendererinfo) |

### Shader

| Term | Everyday gloss | In this course | Defining section |
| --- | --- | --- | --- |
| **Vertex shader** | Program that places each corner | Transforms each vertex; can copy `uv` into a varying. | [Vertex Shader]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}#vertex-shader) |
| **Fragment shader** | Program that colours each screen dot of the mesh | Runs per fragment (pixel of the drawn surface); looks up and mixes colour. | [Fragment Shader]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}#fragment-shader) |
| **Uniform** | A value React / JS writes once for the whole draw | The shader reads it; it cannot see your closed-over JS variable. | [Uniforms]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}#uniforms) |
| **Varying** | A value that travels from vertex to fragment | Declared both sides; the GPU blends it across the face (`vUv`). | [Reading the material, line by line]({{ '/lessons/en/feii/cover-shaders/' | relative_url }}#reading-the-material-line-by-line) |
| **`shaderMaterial`** | Drei helper that builds a custom material | Uniforms as props/setters; GLSL 1 words (`varying`, `gl_FragColor`) on this pin. | [The bulb — one shader on the Unit 8 scene]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}#the-bulb--one-shader-on-the-unit-8-scene) |

### Memory

| Term | Everyday gloss | In this course | Defining section |
| --- | --- | --- | --- |
| **File bytes** | How heavy the file is on disk | The suitcase: what Git stores and the network carries. | [The suitcase and the room]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#the-suitcase-and-the-room) |
| **GPU bytes** | How much room the picture takes once uploaded | Computed from what was uploaded — not Finder’s file size, not the panel’s texture counter. | [The suitcase and the room]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#the-suitcase-and-the-room) |
| **Upload inflation** | Small suitcase, large room | Decode/upload turns a packed JPEG/PNG into width × height × 4 (plus mipmaps by default). | [The suitcase and the room]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#the-suitcase-and-the-room) |
| **Mipmap** | Smaller copies of the same picture | Half, quarter, … down to 1×1; count all levels on both sides or level 0 on both. | [The suitcase and the room]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#the-suitcase-and-the-room) |
| **`renderer.info.memory.textures`** | The textures row on the Unit 8 panel | A **count** of textures alive on the GPU (e.g. 1 → 2). It does not measure bytes. | [The suitcase and the room]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#the-suitcase-and-the-room) |

### Colour

| Term | Everyday gloss | In this course | Defining section |
| --- | --- | --- | --- |
| **Screen colours** | Numbers already bent to look right on a monitor | What a sleeve photo stores; not “linear light” numbers. | [Trap 2 — colour space]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#trap-2--colour-space-the-sleeve-comes-out-washed-out) |
| **sRGB** | The usual way of storing those screen colours | The transfer tag a sleeve file must carry; `texture.colorSpace` should read `'srgb'`. | [Trap 2 — colour space]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#trap-2--colour-space-the-sleeve-comes-out-washed-out) |
| **Linear** | Numbers that rise with the amount of light | What shader maths prefers; not how you label a sleeve photo. | [Trap 2 — colour space]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#trap-2--colour-space-the-sleeve-comes-out-washed-out) |
| **Transfer function** | The rule that bends screen ↔ linear | Also called transfer; the encode flag names it (OETF). | [Trap 2 — colour space]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#trap-2--colour-space-the-sleeve-comes-out-washed-out) |
| **Colour space** | Which kind of numbers a picture holds | For a packed sleeve, three.js copies the file’s tag into `texture.colorSpace`. | [Trap 2 — colour space]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#trap-2--colour-space-the-sleeve-comes-out-washed-out) |
| **Assign, never convert** | Relabel screen colours; do not rewrite them | Use `--assign_oetf srgb` on a sleeve photo. Do not use `--convert_oetf srgb` to “fix” a wrong tag — convert rewrites pixels. | [Trap 2 — colour space]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#trap-2--colour-space-the-sleeve-comes-out-washed-out) |

### Packing

| Term | Everyday gloss | In this course | Defining section |
| --- | --- | --- | --- |
| **Container vs codec** | The box vs what is packed inside | Same idea as MP4 vs H.264. The box is not the packing. | [Three names that are not synonyms]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#three-names-that-are-not-synonyms) |
| **KTX2** | The box | Container only. “I used KTX2” is an incomplete sentence. | [Three names that are not synonyms]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#three-names-that-are-not-synonyms) |
| **ETC1S** | Smaller, more lossy packing | Photographic sleeves (grain, soft print) can live here. | [Three names that are not synonyms]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#three-names-that-are-not-synonyms) |
| **UASTC** | Larger, cleaner packing | Sharp type, logos, thin lines — edges survive; you pay in size. | [Three names that are not synonyms]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#three-names-that-are-not-synonyms) |
| **Basis Universal** | The family that can translate those modes | A translator, not a third artistic look. | [Three names that are not synonyms]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#three-names-that-are-not-synonyms) |
| **Transcode** | Turn the box into this GPU’s native packing | Done at load time by the vendored transcoder (`.wasm` + `.js`), not by inventing a CDN. | [Three names that are not synonyms]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#three-names-that-are-not-synonyms) |

---

## Two traps — same word, different thing

### “Compressed”

| Kind | Examples | Where it helps | What it does not do |
| --- | --- | --- | --- |
| **File packing** | JPEG, PNG, WebP | Download, Git, `<img>` | Keep the GPU grid small after decode |
| **GPU-resident packing** | ETC1S, UASTC (then a GPU-native format) | Memory on the GPU while sampling | Drop-in for `<img src>` |

Say **file packing** or **GPU-resident packing**. Never let one word “compressed” do both jobs. Defining section: [Two meanings of “compressed”]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#two-meanings-of-compressed).

### “Texture”

| Sense | What people point at | What this course means |
| --- | --- | --- |
| File on disk | `cover.jpg`, `sleeve.png` | Packed suitcase for the network / Git |
| GPU grid | The thing `sampler2D` samples | Grid of texels the shader asks for colour |

The `.jpg` is not the texture. The texture is the picture on the GPU. Defining section: [Three words for one picture]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}#three-words-for-one-picture).

---

## Studio test — your sleeve

Fill the blanks out loud (or on paper). Use numbers from **your** machine. Do not invent ratios.

> The sleeve is a picture on the GPU, not an `<img>`. A **pixel** is a screen dot; a **texel** is a colour in that GPU picture; **UV** is how the shader asks for a texel. A JPEG is small on disk and usually **large** once unpacked. **KTX2** is only the box. I picked `________` (ETC1S or UASTC) because `________` (one honest reason for *this* sleeve), and I wrote file bytes `________` and GPU bytes `________` from `________` (machine / browser / date).

Sanity check: `renderer.info.memory.textures` went `________` → `________` when the sleeve loaded (a count). Levels counted: `________` (all levels / level 0 only). `texture.format`: `________`.

---

## Lab mapping

This satellite is reference and autonomous study. It does not add a numbered unit or steal lab hours. On the [Units 8–9 assignment]({{ '/lessons/en/feii/units-8-9-assignment/' | relative_url }}), use it when you rehearse the oral defence of task2 (shader) and task3 (KTX2 note). The drills sit in `exercises.md` beside this page.

---

## Independent self-check — autonomous study

1. Say the oral paragraph without looking. Stop yourself if a format name appears before pixel, texel, or UV.
2. Point at your sleeve and name: mesh, material, draw-call budget line you trust, and whether `memory.textures` is a count or a weight.
3. A classmate says “the KTX2 is more compressed, so the GPU uses less memory” while both PNG and KTX2 show `textures: 2`. Name the two mistakes.

---

## Session outcome

You can rehearse the sleeve vocabulary in the order the oral paragraph speaks it, and every word points back to a defining lesson. Cover shaders still own the authored effect. KTX2/Basis still owns the suitcase, the room, and the written choice. The hand-in remains the [assignment]({{ '/lessons/en/feii/units-8-9-assignment/' | relative_url }}).

---

## References

- Angel, Edward, and Dave Shreiner. 2024. “The Future of Teaching Computer Graphics.” *SIGGRAPH Educators Forum ’24*. https://doi.org/10.1145/3641235.3664433.
