---
layout: lesson
title: 'KTX2/Basis — Texture Choice from First Principles'
slug: feii-ktx2-basis
date: 2026-11-04
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/ktx2-basis/
description: 'A Bloque 5 satellite for the Units 8–9 album cover. Pixel, UV, texel and texture come first. Then why a small picture file turns into a large picture on the GPU. Then the box, the two packings, and the choice you write down with two labelled numbers.'
status: complete
category: feii
tags: [feii, ktx2, basis-universal, textures, album-cover, satellite]
---

<aside class="lesson-framing" aria-label="Master idea and studio test">
<p><strong>Master idea:</strong> A JPEG is a suitcase for the network. A GPU texture is the picture unpacked (or packed for the GPU) in memory, so that a shader can ask “what colour is here?”</p>
<p><strong>Studio test:</strong> Point at one sleeve and say, in your own words, what a pixel is (a dot on the screen) and what a texel is (one stored colour in the picture the GPU holds). Say why the file's byte size is not the GPU number. Then name the box you used, the packing inside it, and the two measurements you wrote down. This page teaches the box and the packing by name further down.</p>
</aside>

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> **Before you start.** Two things from earlier units, restated so you do not have to remember them. [Unit 8]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}) gave you `renderer.info`, the panel that counts draw calls, triangles, and the textures alive on the GPU. [Unit 9]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}) named **UV**: two numbers from 0 to 1 that say where on a picture. The [Cover shaders]({{ '/lessons/en/feii/cover-shaders/' | relative_url }}) satellite then made your sleeve shader look up a colour in the sleeve picture at a UV. This satellite is about the picture itself. It covers how the picture travels to the GPU, what room it takes there, and the choice you write down about it.

> **AI Assistance Disclosure:** Models write texture-loading code fluently. They often get the picture's orientation or its colour handling wrong, and they like to invent a download address for files you should copy yourself. Read the [AI-Assisted 3D covenant]({{ '/lessons/en/feii/ai-assisted-3d-covenant/' | relative_url }}) before the first prompt. Every loader or encode diff an assistant drafts goes into the covenant's `docs/ai-3d-merge-log.md` as ACCEPT, REJECT, or ESCALATE, the same habit as [Unit 6]({{ '/lessons/en/feii/unit-6-ai-code-review/' | relative_url }}).

**Code in this lesson:** each fence carries one of three labels.
- **CodeSandbox-ready** means complete, and it runs in your Unit 8 **cover fork** as published: one new file, `src/gpuBytes.js`.
- **Excerpts** show one idea and do not run alone. They are the `<img>` line, the diagrams, the lines that call `gpuBytes`, and the loader for the packed sleeve file. The loader needs a file and two helper files that only you can put in place.
- **Templates** need your values. They are the two encode commands and `docs/ktx2-note.md`.

Everything goes into the cover fork or your assignment route, never into the beacon sandbox.

---

## 🎯 Learning objectives

By the end of this satellite you will be able to:

- **Define four words** before any format name: pixel, UV, texel, texture.
- **Explain upload inflation**: why a picture that is small on disk takes a large room on the GPU. Compute that room in **GPU bytes**.
- **Tell two kinds of packing apart**: file packing for the download, and GPU-resident packing for the memory.
- **Choose one of two GPU packings** for your sleeve. Defend the choice with one honest reason and two labelled numbers from your own machine.
- **Check two traps** after loading the packed sleeve: which way up it landed, and which colour space (which kind of colour numbers) the loader says it holds.

---

## You already know this part

You already know how to put a picture on screen, and you never had to name the grid of colours behind it. The browser unpacks every JPEG in an `<img>` into rows of red, green and blue values and paints them, and CSS stretches that grid without asking what is in it. A 3D sleeve is not stretched: its shader asks the picture for a colour, one screen dot of the sleeve at a time, so what would the placeholder sleeve show if the shader asked every dot for the colour at the same place? A flat page never needed the grid to have a name, and giving it one will not, by itself, tell you whether the sleeve still reads as the album.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
tuning_record: 2026-11-04-b54056a3-c0ba-4018-a727-c7cb887c650f-feii-ktx2-basis-s0 (spine §0) — thessia-scholar-v3 attempt 1 via scribe_http.py shim, passed gates (markers 4/4, no cite, no quote), then substantially amended by the Claude executor (cascade-phase-executor, PHASE-X8): removed a false claim that the sleeve shader colours by light angle, a wrong description of the placeholder, an off-idea question about browser shades, and a vague close; rewrote S3/S4 into the same-place flat-colour question and the counter-critic. See amendments.diff. Professor release of this paragraph is a pre-publication step (independent_human_review: false).
-->
{% endif %}

**Excerpt** — the whole 2D story in one line.

```html
<img src="cover.jpg" alt="Album cover" />
```

The browser **downloads** a packed file. It **decodes** it into a grid of colours and **paints** that grid onto the screen. You never name the grid. CSS `background-size` stretches it, and that is enough for a flat page.

A 3D album cover is a different job. The sleeve is a **mesh**: a flat box in the scene. Its **shader** is the small program from Unit 9 that turns data into appearance. It colours each screen dot of that box by looking up a colour in a picture. The picture is not an `<img>`. It lives on the **GPU**, the chip that draws 3D, as a **texture**.

## Three words for one picture

The word you never needed for CSS is the one the shader cannot do without. A pixel is a dot on the screen, and a texel is one stored colour in the picture the GPU is holding: the placeholder sleeve is a grid of 512 by 512 texels, and the shader reaches them by UV, two numbers from 0 to 1, with `(0, 0)` at the bottom-left corner of the picture and `(1, 1)` at the top-right. When the shader asks for UV 0.3, 0.7, the GPU looks up the nearest texels and usually blends them, so what would come back if the sleeve were drawn so large that one texel covered a hundred pixels? Naming the texel does not make the sleeve sharper, and a sleeve can be sampled perfectly and still be the wrong picture.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
tuning_record: 2026-11-04-bb810c58-7e94-475b-9594-f13954ab87c7-feii-ktx2-basis-s1 (spine §1) — two thessia-scholar-v3 attempts via scribe_http.py shim, both REJECTED on editorial grounds although both passed the shim gates (attempt 1: false UV orientation 'top' for 0, no texel definition, 'shirt', run-on close; attempt 2: invented '50x76 pixels' and invented shader code, then degenerate word salad). Nothing from the raws was integrated. The paragraph above was written by the Claude executor (cascade-phase-executor agent), not by Thessia and not by the professor. It restates spine §1 and cover-shaders facts only. No citation. Professor release of this paragraph is a pre-publication step (independent_human_review: false).
-->
{% endif %}

| Word | Everyday gloss | In this lesson |
| --- | --- | --- |
| **Pixel** | A coloured dot **on the screen** | Short for *picture element*. What the monitor shows. |
| **UV** | “Where on the picture?” | Two numbers, each from 0 to 1. `(0, 0)` is one corner of the sleeve picture (bottom-left on your sleeve) and `(1, 1)` is the opposite corner. |
| **Texel** | A coloured sample **in the picture the GPU is holding** | Short for *texture element*. One texel is one stored colour in the grid. The shader asks for a UV. The GPU looks up the nearest texels and usually **blends** them, so the colour that comes back is often a mix, not one texel. |
| **Texture** | The whole picture on the GPU | A grid of texels. Not the image file on disk. |

**A poster on a wall.** A printed photograph of a cover has grains of colour in the print. Those are the texels. The wall you look at it on, through a screen, is made of dots. Those are the pixels. Stretch a small picture across a big sleeve and one texel covers many pixels, so the sleeve looks soft or blocky. Squeeze a huge picture onto a small sleeve and many texels compete for one pixel, so the sleeve shimmers.

You did not need *texel* for CSS. You need it now because the shader does not stretch anything with `background-size`. It **samples**: “UV 0.3, 0.7 — what colour?” Unit 9 named UV. The cover-shaders satellite used `sampler2D` without saying what was in it. Now `sampler2D` has a thing being sampled: a grid of texels.

## The suitcase and the room

The sleeve picture that fits in one hand on disk unpacks to fill a room on the GPU, and the panel's texture counter only counts how many rooms are taken, never how big they are. A 1024 by 1024 JPEG might be about 200 kilobytes, yet once uploaded its four bytes per texel occupy 4,194,304 bytes. How many bytes would a ten-by-ten version of the same picture take after the same unpacking, and would its file on disk shrink in the same proportion? There are two numbers, not one, the weight of the suitcase and the size of the room, and nothing on the panel will tell you the second unless you compute it.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
tuning_record: 2026-11-04-cbcbdebc-cab9-456f-9dd8-aecb837f76b0-feii-ktx2-basis-s2 (spine §2) — thessia-scholar-v3 attempt 1 via scribe_http.py shim, passed gates, amended by the Claude executor: 'over three megabytes' -> 4,194,304 bytes; 'pixel version' -> picture; removed 'barzakh' (not student-readable); merged the two questions; new counter-critic close. See amendments.diff. Professor release of this paragraph is a pre-publication step (independent_human_review: false).
-->
{% endif %}

**JPEG, PNG and WebP are file formats.** They pack a picture small for the download. By default the GPU does **not** draw from that packed file. The loader **unpacks** it into a plain grid, with four bytes for each texel: red, green, blue, and alpha (how see-through it is).

Here is a rough size, not a measurement of your cover:

- On disk, a 1024 × 1024 JPEG might be about 200 KB.
- Unpacked on the GPU it takes 1024 × 1024 × 4 bytes = **4,194,304 bytes**, about 4 MB.

That jump is **upload inflation**. The suitcase was small, and the unpacked clothes fill the room.

**Excerpt** — a diagram of the journey, not code.

```text
 network file (JPEG/PNG)         GPU memory (the default path)
┌───────────────────┐           ┌───────────────────────────────┐
│ packed suitcase   │  decode   │ width × height × 4 bytes      │
│ about 200 KB      │ ────────► │ 4,194,304 bytes for 1024×1024 │
└───────────────────┘  upload   └───────────────────────────────┘
  file bytes:                     GPU bytes: compute them.
  what Git stores and             renderer.info.memory.textures
  the network carries             only COUNTS textures (1 → 2)
```

**The panel counts. It does not weigh.** The `textures` row on your Unit 8 panel reads `renderer.info.memory.textures`. In three.js that number is a **count** of textures alive on the GPU. It goes up by one when the sleeve picture loads: the cover-shaders satellite saw it go from 1 to 2. It does not change with the size of the picture. A 64 × 64 sleeve and a 4096 × 4096 sleeve both add exactly one. So the room has its own number, **GPU bytes**, which you compute from what was uploaded:

- **PNG or JPEG path:** width × height × 4 for the picture itself. three.js exports the exact formula as `TextureUtils.getByteLength(width, height, format, type)`. It needs the texture's `format`, so write that down too.
- **Packed path (later in this page):** add up the byte length of every level the loader handed to the GPU.

**Compare like with like.** For an ordinary picture, three.js also makes a chain of smaller copies called **mipmaps** (half size, quarter size, down to 1 × 1). It uses them when the sleeve is far away, and it does this by default. That adds about a third to the room (× 4/3). So either count **all levels** on both sides, or count **level 0 only** on both sides, and say which. `src/gpuBytes.js` below does either.

If a packed file is small on disk **and** its GPU bytes still come out at width × height × 4, the GPU unpacked it anyway. The file did not do the job this lesson is for.

## Two meanings of “compressed”

Most arguments about compressed pictures are two people using one word for two jobs. File packing, the job of JPEG and PNG, makes the download small and then has to be undone, so the placeholder that travels as a small PNG still arrives on the GPU as a full grid of four bytes per texel. GPU-resident packing is the other job: the picture stays packed in memory, in a form the graphics chip can read directly, so which of your two numbers, the file bytes or the GPU bytes, should each kind of packing move? A format can be excellent at one job and useless at the other, and the word compressed, said alone, cannot tell you which one you are looking at.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
tuning_record: 2026-11-04-5cdf1de1-e206-41b7-be18-0e7ae1ad214f-feii-ktx2-basis-s3 (spine §3) — two thessia-scholar-v3 attempts via scribe_http.py shim, both REJECTED (attempt 1: shim quote gate FAIL on a 2-word quote canonical would have passed, plus 6 sentences and a search-the-web question; attempt 2: false claim that the box is lossless, a format brand name inside §3, 6 sentences). Nothing from the raws was integrated. The paragraph above was written by the Claude executor (cascade-phase-executor agent), not by Thessia and not by the professor. It restates spine §3 only. No citation. Professor release of this paragraph is a pre-publication step (independent_human_review: false).
-->
{% endif %}

| Kind | Examples | Where it helps | What it does not do |
| --- | --- | --- | --- |
| **File packing** | JPEG, PNG, WebP | The download, Git, `<img>` | It does not keep the GPU grid small after decoding |
| **GPU-resident packing** | the two packings named in the next section, translated to a GPU-native format | The room **on the GPU** while the shader samples | It is not a drop-in replacement for `<img src>` |

“Compressed” is one word for two jobs. Using it for both is how this topic turns into fake expertise. In this course you say **file packing** or **GPU-resident packing**, never just “compressed”.

**GPU-resident** means the hardware can look up colours while the picture stays packed, in a format the chip understands. A JPEG is not that, because it has to be decoded first.

## Three names that are not synonyms

Three names are routinely said together as if they were one thing, and that confuses a box with what is packed inside it. A picture file already has layers of naming that do different jobs, an extension, a media type, a packing, and in the same way KTX2 names only the box, while ETC1S, the smaller and lossier packing, and UASTC, the larger and cleaner one, name what is inside. Encode the same sharp title type both ways and look closely at the sleeve: where do the edges of the letters give way first? Basis Universal, the translator that runs in the browser after the download, turns either packing into whatever this particular GPU understands, which buys one file for every device and leaves you a choice that no translator can make for you.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
tuning_record: 2026-11-04-89db33a8-d568-4677-9658-0f119ea1f86a-feii-ktx2-basis-s4 (spine §4) — thessia-scholar-v3 attempt 1 via scribe_http.py shim, passed gates, amended by the Claude executor: brand names moved out of S1 so each is glossed where it first appears (spine §8); JFIF/MIME specifics generalised; vendor format names ASTC/PVRTC removed; muddled 'load day zero' close rewritten. See amendments.diff. Professor release of this paragraph is a pre-publication step (independent_human_review: false).
-->
{% endif %}

| Name | Role | Everyday gloss |
| --- | --- | --- |
| **KTX2** | **Container** | The box. Like saying `.zip`, it makes no claim about what is inside. “I used KTX2” is an incomplete sentence. |
| **ETC1S** | **Packing mode** | Smaller and lossier. A photographic sleeve, with gradients and print grain, can live here. |
| **UASTC** | **Packing mode** | Larger and cleaner. Use it for sharp type, logos, thin lines, anything someone will inspect closely. |
| **Basis Universal** | The family that can **transcode** (translate) those two modes | A translator, not a third artistic look. |
| **Transcoder** | The translator at run time: a `.wasm` file plus a small `.js` file next to your app | Turns the box into **this GPU's** own packed format when the page loads. You copy the files the pinned three.js ships. You never invent a download address for them. |

**Container and codec** are the same pair as “MP4 and H.264”. The box is not the packing.

You do **not** need to memorise the GPU's own format names. The transcoder picks one for the device in front of it, and three.js stores it in `texture.format`. You write that name down. You do not choose it. Your **written choice** is ETC1S or UASTC, made when you encode.

## The choice you write

What you hand in is not a brand but a sentence and two numbers. You name the packing, ETC1S or UASTC, give one honest reason that belongs to this sleeve, say whose picture it is, and write the file bytes on disk beside the GPU bytes in memory, computed the same way for the PNG and for your file. On the placeholder sleeve the UASTC file came out slightly larger on disk than the PNG while taking far less room on the GPU of that test renderer, so which of the two numbers would you have trusted if you had measured only one? A choice made without the room number is a vibe, however small the file looks, and two numbers from one machine still say nothing about the phone in a stranger's pocket.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
tuning_record: 2026-11-04-6fe81dda-6c50-44f0-b914-0a542908a810-feii-ktx2-basis-s5 (spine §5) — two thessia-scholar-v3 attempts via scribe_http.py shim, both REJECTED (attempt 1: fabricated measurements '308 KB' and '96 bytes of GPU memory'; attempt 2: invented 'glTF-Pipeline' as the measuring tool, criterion drifted to runtime speed, 6 sentences). Nothing from the raws was integrated. The paragraph above was written by the Claude executor (cascade-phase-executor agent), not by Thessia and not by the professor. It restates spine §5 and the executor's measured placeholder result in words only. No citation. Triage round 1 (X8 cold review F8): "far less room on the GPU" narrowed to "... of that test renderer"; see integrated-triage-1.md + amendments-triage-1.diff in the record. Professor release of this paragraph is a pre-publication step (independent_human_review: false).
-->
{% endif %}

The choice is not a brand. It is a sentence plus two numbers:

1. **Mode:** ETC1S or UASTC.
2. **Why it fits this sleeve:** photo or sharp type and logo. One honest reason.
3. **Source licence:** a photograph of a physical album you own, or a named licence. A private GitHub repository is not a licence.
4. **File bytes** on disk: the suitcase.
5. **GPU bytes** for the PNG and for your chosen file: the room, computed as above, with the same levels counted on both sides and `texture.format` recorded. Add `renderer.info.memory.textures` as a sanity count only, because it goes up by one for either format. Date the numbers and say which machine they come from. If the encoder is missing, say so and keep the PNG. Never fake a `.ktx2`.

Typical use. This table is qualitative. It invents no ratios.

| Sleeve character | Lean toward | Because |
| --- | --- | --- |
| Photograph, grain, soft print | ETC1S | Smaller; its extra loss is harder to see in grain |
| Sharp title type, high-contrast logo | UASTC | Edges survive; you pay in size |
| You have not looked at both | Measure both, then pick | A win claimed without GPU bytes is a vibe |

A measured pair for a **real** sleeve photograph is not on this page. It is measured in the reference repo, the album aggregator's studio switch. Until it lands, the only numbers here are the placeholder's, further down, and they come with a warning.

---

## Measure the room — `src/gpuBytes.js`

The PNG path needs no encoder. It is the inflation demo, and it already runs in your cover fork. The cover-shaders placeholder is a 512 × 512 canvas. So the GPU bytes for level 0 are 512 × 512 × 4 = 1,048,576. Counting the mipmap chain three.js builds, all ten levels down to 1 × 1, gives 1,398,100.

**CodeSandbox-ready** — in the cover fork, create `src/gpuBytes.js`. It works for the canvas placeholder, for your own photo, and for a packed `.ktx2` sleeve.

Running reference: [live route](https://ruvebal.github.io/react-template/ex5-ktx2) · [source](https://github.com/ruvebal/react-template/blob/main/src/cover/gpuBytes.js).

{% raw %}

```js
import * as THREE from 'three';

/**
 * Names a three.js format number, so a note can say `RGBAFormat`
 * instead of `1023`.
 *
 * @param {number} format The texture's `format` value.
 * @returns {string} The constant's name, or the number as text if none matches.
 */
export function formatName(format) {
  const match = Object.entries(THREE).find(
    ([name, value]) => name.endsWith('Format') && value === format,
  );
  return match ? match[0] : String(format);
}

/**
 * Computes how many bytes a texture takes on the GPU, from what three.js
 * uploads. This is not the file size on disk.
 *
 * - A KTX2 texture arrives already packed for this GPU: the bytes are the
 *   sum of its transcoded `mipmaps[i].data.byteLength`.
 * - A PNG or JPEG texture is unpacked to a grid: level 0 is
 *   `TextureUtils.getByteLength(width, height, format, type)`, which is
 *   width × height × 4 for an ordinary picture. three.js also makes
 *   smaller copies (mipmaps) when `generateMipmaps` is true, which it is
 *   by default; `levels: 'all'` counts them too.
 *
 * Compare like with like: `'all'` on both sides, or `'level0'` on both.
 *
 * @param {import('three').Texture} texture A loaded texture (wait for it).
 * @param {{ levels?: 'all' | 'level0' }} [options]
 * @returns {{ bytes: number, levels: number, width: number, height: number, format: string }}
 */
export function gpuBytes(texture, { levels = 'all' } = {}) {
  if (texture.isCompressedTexture) {
    const all = texture.mipmaps;
    const counted = levels === 'all' ? all : all.slice(0, 1);
    return {
      bytes: counted.reduce((sum, level) => sum + level.data.byteLength, 0),
      levels: counted.length,
      width: all[0].width,
      height: all[0].height,
      format: formatName(texture.format),
    };
  }

  const image = texture.image;
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;
  const chain =
    levels === 'all' && texture.generateMipmaps
      ? Math.floor(Math.log2(Math.max(width, height))) + 1
      : 1;

  let bytes = 0;
  for (let level = 0; level < chain; level += 1) {
    const w = Math.max(1, Math.floor(width / 2 ** level));
    const h = Math.max(1, Math.floor(height / 2 ** level));
    bytes += THREE.TextureUtils.getByteLength(w, h, texture.format, texture.type);
  }

  return { bytes, levels: chain, width, height, format: formatName(texture.format) };
}
```

{% endraw %}

**Excerpt** — the lines that call it from *your* `src/Cover.jsx`, after the line that makes `picture`. The rest of your file stays as it is.

```jsx
// Beside the other imports. Add useEffect to the react import you already have,
// for example: import { useEffect, useRef } from 'react';
import { gpuBytes } from './gpuBytes.js';

// Inside Cover(), after: const picture = useSleevePicture(...);
useEffect(() => {
  console.table({
    all: gpuBytes(picture).bytes,
    level0: gpuBytes(picture, { levels: 'level0' }).bytes,
    format: gpuBytes(picture).format,
    colorSpace: picture.colorSpace,
  });
}, [picture]);
```

Read the **count** on your Unit 8 panel, not in this log. The panel reads it after the sleeve has been drawn. An effect can run before the first upload and report one texture too few. In development, React's Strict Mode runs the effect twice, so the table prints twice. Both copies are the same numbers.

---

## Load the packed sleeve

Everything above works with a PNG. This section is the packed path. It comes last on purpose, because the code only makes sense once the box, the two packings, and the transcoder have names.

1. **Encode** your own source PNG twice, once as ETC1S and once as UASTC (Template below). The aggregator's encode script runs the same two commands. Installing the encoder on every laptop is **not** a lab outcome. If it is missing, the script should stop with a loud error, and the PNG path still teaches inflation.
2. **Copy the transcoder files the repo vendors.** They are `basis_transcoder.js` and `basis_transcoder.wasm`, from `node_modules/three/examples/jsm/libs/basis/`. In your cover fork, copy both into `public/basis/`. On the aggregator, the instructor vendors one shared copy at the site root for every route, and the loader's path to it is built from `import.meta.env.BASE_URL`. Do not copy it into your route. Either way, the files must match the three.js version that loads them, so never fetch them from a CDN address you found online.
3. **Swap `src/sleevePicture.js`** for the loader below. `Cover.jsx` and `SleeveMaterial.jsx` do not change.

**Excerpt** — a packed-sleeve version of `src/sleevePicture.js`, three `0.185.1`. It does not run until `public/sleeve-etc1s.ktx2` (or your UASTC file) and the two transcoder files exist.

```js
import { useLoader, useThree } from '@react-three/fiber';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';

// Copied by hand from node_modules/three/examples/jsm/libs/basis/ — same three.js version.
const TRANSCODER_PATH = '/basis/';

/**
 * Loads the packed sleeve. The loader sets `colorSpace` from the file itself,
 * so this hook does not touch it: check it instead (see the two traps).
 *
 * @returns {import('three').CompressedTexture} The texture to pass to the material as `map`.
 */
export function useSleevePicture() {
  const gl = useThree((state) => state.gl);
  return useLoader(KTX2Loader, '/sleeve-etc1s.ktx2', (loader) => {
    loader.setTranscoderPath(TRANSCODER_PATH);
    loader.detectSupport(gl);
  });
}
```

`detectSupport(gl)` asks this GPU which packed formats it understands. The transcoder then translates the box into one of them, or falls back to an unpacked grid if it finds none. That fallback is why you record `texture.format` next to the GPU bytes. The same file can take a different room on a different device.

If you leave out `setTranscoderPath`, three `0.185.1` falls back to a path worked out from the loader's own file inside `node_modules`. This page did not check whether your bundler serves that path, so set the path and copy the files. The two files in `public/basis/` are then files you can see and commit. On the aggregator the path is `import.meta.env.BASE_URL + 'basis/'` rather than `'/basis/'`, so it finds the shared copy even when the site is served from a subfolder.

Do not use Drei's `useKTX2` with its default settings. In Drei `10.7.9` it loads a different copy of the loader (from `three-stdlib`), and its default transcoder path points at a CDN. That breaks both rules of step 2.

**Platform notes** (versions checked 2026-11-04; the npm packages are the ones installed in the course's `react-template`):

| Package | Version | Note |
| --- | --- | --- |
| `three` | `0.185.1` | Course pin. Its `KTX2Loader` and the transcoder files in `examples/jsm/libs/basis/` ship together; copy both from this version. |
| `@react-three/fiber` | `9.8.2` | `useLoader` keeps one loader per loader class and caches each file, so the transcoder is set up once. |
| `@react-three/drei` | `10.7.9` | `useKTX2` exists but defaults to a CDN transcoder path; not used here. |
| `react` | `19.3.1` | Same as Units 8–9. |
| KTX-Software (`toktx`, `ktx`) | `4.4.2` | Flags checked 2026-11-04; `toktx --help` is the authority. Not required on every laptop: the aggregator's encode script runs it. |

---

## Two traps on the way back

A packed sleeve can load without an error and still be wrong. Use the cover-shaders placeholder as the test picture, because it prints its own UV in each corner. Save the canvas as a PNG (right-click the canvas in the browser and save the image, or use `canvas.toBlob`), encode it, and look.

### Trap 1 — orientation: the sleeve comes out upside down

An ordinary picture file stores its rows from the top down. When three.js uploads a PNG or a canvas, it flips the rows (`flipY = true`), so the top of the picture ends up at v = 1. A packed texture is **not** flipped on upload. three.js gives it `flipY = false`, and `KTX2Loader` ignores the orientation note the encoder wrote into the file. So a default encode lands upside down. `uv 0,1` shows at the bottom-left of your sleeve, and the title reads upside down.

**Fix the file, not the shader.** Encode it already flipped: `--lower_left_maps_to_s0t0` with `toktx`, or `--convert-texcoord-origin bottom-left` with `ktx create`. Do not “fix” it with `1.0 - vUv.y` in the shader. That flips the PNG path too, leaves every other material that reads the same file upside down, and leaves the file wrong for the next person.

**Check:** `uv 0,0` lands bottom-left on the sleeve, and the title reads the right way up.

### Trap 2 — colour space: the sleeve comes out washed out

**Four colour words first.** A picture file stores **screen colours**: numbers already bent so that they look right on a monitor. That way of storing colour is called **sRGB**. A shader does its maths on **linear** numbers instead, numbers that rise in step with the amount of light. The rule that bends one kind into the other is the **transfer function**, or **transfer** for short. Which kind of numbers a picture holds is its **colour space**. For a packed KTX2 file, three.js copies the file's transfer tag into `texture.colorSpace`, so the GPU can turn screen colours into linear ones as it looks them up. A sleeve photo always holds screen colours, so the tag must say sRGB.

The cover-shaders satellite tagged the canvas picture `colorSpace = SRGBColorSpace` by hand. A packed sleeve is different. `KTX2Loader` sets `texture.colorSpace` itself, from the colour description stored in the file. For a sleeve photo it must read `'srgb'`. If the source PNG carried a wrong colour tag, the encoder copies it, the loader reports `'srgb-linear'`, and the sleeve comes out washed out. The shader still compiles.

**Fix the file, not the shader.** Re-encode with an sRGB transfer. `--assign_oetf srgb` (with `ktx create`, `--assign-tf srgb`) relabels the pixels as the screen colours they already are. (OETF is the flag's name for the transfer.) Never delete `#include <colorspace_fragment>` to make the colours “look right”. And do not reach for `--convert_oetf srgb` on a sleeve photo, because it trusts whatever tag the file carries, even a wrong one. On a correctly tagged or untagged PNG it changes nothing. On a file tagged linear it rewrites the pixels as if they had been linear, and brightens them for good. On a file with an embedded profile tag, toktx refuses to run. `--assign_oetf srgb` was right in every case this page tested.

**Phone and editor photos.** A **colour profile** is a tag that a camera or image editor embeds in a picture to describe its colour space. If your PNG carries a profile other than sRGB (phone photos often carry Display P3), convert it to sRGB in your image editor first, then encode with `--assign_oetf srgb`. The encode flag only relabels, so on an unconverted Display P3 photo the colours come out muted, and the `colorSpace` check below still logs `srgb`.

**Check:** `texture.colorSpace` logs `srgb` (the `console.table` above prints it).

### What the two traps looked like on the placeholder

These were checked on 2026-11-04 with a 512 × 512 PNG drawn to match the cover-shaders placeholder: blue ground, orange disc `#e36a2c`, a UV label in each corner. It was not exported from the canvas, so your file bytes will differ; the GPU bytes will not. The tools were `toktx` v4.4.2 and three `0.185.1` with its own `KTX2Loader`. Rendering was in headless Chrome on the SwiftShader software renderer, not a GPU, and each picture was drawn on a plane with `MeshBasicMaterial`:

- **Default encode** (`toktx --t2 --encode etc1s`): the file says its orientation is top-down. On the plane it rendered **upside down**, with the `uv 0,1` label at the bottom-left and the title mirrored top to bottom.
- **Flipped encode** (`--lower_left_maps_to_s0t0`): it rendered the right way up, exactly like the PNG.
- **Wrong colour tag:** the same PNG carried a colour tag that says “linear”. Encoded without a fix, it loaded with `colorSpace` `'srgb-linear'`. The disc rendered `rgb(242, 171, 118)` instead of about `rgb(227, 106, 44)`: washed out.
- **Fixed with `--assign_oetf srgb`:** it loaded as `'srgb'` and the disc rendered `rgb(229, 105, 47)`. The small difference is ETC1S's loss.
- **The tempting mistake, `--convert_oetf srgb`:** it labelled the file sRGB but rewrote the pixels. Decoded, the disc read `rgb(240, 174, 116)`, and that brightening is now in the file.

---

## Encode — the two commands

**Template** — run from your route folder, with the encoder installed. Replace `public/sleeve.png` with your own source PNG and keep the output names your loader expects. The aggregator's encode script runs these same two commands for you, and it should stop with a loud error if `toktx` is missing.

Running reference: [live route](https://ruvebal.github.io/react-template/ex5-ktx2) · [source](https://github.com/ruvebal/react-template/blob/main/scripts/encode-ex5.sh).

```bash
# Your own source picture, square, with a licence you can name.
SRC=public/sleeve.png

# ETC1S: smaller, lossier. Flipped for three.js, sRGB, with mipmaps.
toktx --t2 --encode etc1s --genmipmap --lower_left_maps_to_s0t0 --assign_oetf srgb \
  public/sleeve-etc1s.ktx2 "$SRC"

# UASTC: larger, cleaner. Same flags, plus zstd so the file is not huge on disk.
toktx --t2 --encode uastc --zcmp 18 --genmipmap --lower_left_maps_to_s0t0 --assign_oetf srgb \
  public/sleeve-uastc.ktx2 "$SRC"

# Both lines must show Transfer: KHR_DF_TRANSFER_SRGB and KTXorientation: ru
ktx info public/sleeve-etc1s.ktx2 | grep -E "Transfer|KTXorientation"
ktx info public/sleeve-uastc.ktx2 | grep -E "Transfer|KTXorientation"
```

What each flag is for:
- `--genmipmap` builds the mipmap chain inside the file. Without it a `.ktx2` has one level, while three.js gives the PNG ten, so the GPU bytes would not compare like with like.
- `--lower_left_maps_to_s0t0` is trap 1.
- `--assign_oetf srgb` is trap 2.
- `--zcmp 18` adds file packing (zstd) on top of UASTC. Without it, UASTC files are very large on disk; the next section shows by how much. It does not change the GPU bytes.

---

## What was measured, and what was not

This table is for the **placeholder only**: the same 512 × 512 PNG and the same encodes as above, measured on 2026-11-04. GPU bytes were computed with `src/gpuBytes.js` in headless Chrome on the SwiftShader software renderer. They count all ten levels on every row.

| Asset | File bytes (on disk) | GPU bytes, all levels | GPU bytes, level 0 | `texture.format` there |
| --- | ---: | ---: | ---: | --- |
| Source PNG | 20,245 | 1,398,100 | 1,048,576 | `RGBAFormat` |
| ETC1S `.ktx2` | 8,616 | 174,776 | 131,072 | `RGB_ETC2_Format` |
| UASTC `.ktx2` (`--zcmp 18`) | 24,968 | 349,552 | 262,144 | `RGBA_ASTC_4x4_Format` |
| UASTC `.ktx2` (no `--zcmp`) | 350,032 | not loaded | — | — |

Read this table with three warnings:

- **The suitcase can grow while the room shrinks.** The UASTC file is larger on disk than the PNG, yet it takes far less room on the GPU. File bytes alone would have told you the wrong story.
- **The placeholder flatters every encoder.** It is flat colour and clean shapes, which PNG packs extremely well. A photograph of a real sleeve will give different file bytes, and you must measure your own.
- **`texture.format` belongs to the device.** SwiftShader offered the transcoder ETC2 and ASTC. A laptop GPU may get a different format, and so a different number of GPU bytes, from the same file. That is why the format sits next to the number in your note.

**The whole chain, in the cover fork.** The Unit 8 cover fork was put together from that unit's published files. It had the cover-shaders `sleevePicture.js` and `SleeveMaterial.jsx`, plus this page's `src/gpuBytes.js` and its `Cover.jsx` lines. It was bundled against the course pins and rendered in the same headless Chrome, twice:

- **Canvas placeholder (PNG path):** the panel read `textures 2`, and the log showed 1,398,100 bytes (all levels), 1,048,576 bytes (level 0), `RGBAFormat`, `srgb`.
- **Packed-sleeve loader swapped in,** with the flipped ETC1S file and the copied transcoder: the sleeve rendered the right way up with the sheen crossing it, and the panel still read `textures 2`. The log showed 174,776 bytes, 131,072 bytes, `RGB_ETC2_Format`, `srgb`.

The count did not move between the two. The GPU bytes did.

The software renderer tells you nothing about speed or phone memory. The two traps and the arithmetic are what this page checked. A measured pair for a real sleeve comes from the reference repo, and your own pair comes from your machine.

---

## Your note — `docs/ktx2-note.md`

**Template** — create `docs/ktx2-note.md` in your route and replace every ellipsis. The [assignment]({{ '/lessons/en/feii/units-8-9-assignment/' | relative_url }}) uses this same template.

Running reference: [live route](https://ruvebal.github.io/react-template/ex5-ktx2) · [source](https://github.com/ruvebal/react-template/blob/main/src/pages/Ex5Ktx2.jsx).

```markdown
# KTX2 choice

Album, and the source picture's licence (a photo of an album you own, or the named licence): ...

Chosen mode (ETC1S or UASTC; or PNG kept, if the encoder was missing — say so): ...
Why it fits this sleeve (one honest reason: photo grain, sharp type, a logo...): ...

Measured on (machine, browser, date): ...
Levels counted (all levels on every row, or level 0 on every row): ...

| Asset | File bytes (on disk) | GPU bytes (computed) | texture.format | Observation |
| --- | ---: | ---: | --- | --- |
| Source PNG | ... | ... | RGBAFormat | ... |
| ETC1S .ktx2 | ... | ... | ... | ... |
| UASTC .ktx2 | ... | ... | ... | ... |

Texture count (renderer.info.memory.textures, a count, not bytes), before and after the sleeve loads: ... → ...

Orientation check (does uv 0,0 land bottom-left and the title read upright? how was the file encoded?): ...
colorSpace check (what does texture.colorSpace log after loading? what did you do if it was not srgb?): ...
```

Two numbers carry the grade: **file bytes** (the suitcase) and **GPU bytes** (the room). A note with only file bytes measured the suitcase and skipped the room. A note that writes the texture count in the GPU bytes column has measured nothing.

---

## Say it out loud

This is the studio test in paragraph form. If you cannot say something like this about **your** sleeve, the lesson is still too much brand and not enough picture.

> The sleeve is a picture on the GPU, not an `<img>`. A **pixel** is a screen dot; a **texel** is a colour in that GPU picture; **UV** is how the shader asks for a texel. A JPEG is small on disk and usually **large** once unpacked. **KTX2** is only the box. I picked **ETC1S** or **UASTC** because of this sleeve, and I wrote file bytes and GPU bytes from this machine.

---

## Failure modes this lesson refuses

- **“I used KTX2” as the outcome.** The box is not a choice. Name the packing, the reason, and the two numbers.
- **One word, “compressed”, for both jobs.** Say file packing or GPU-resident packing.
- **The texture count reported as memory.** `renderer.info.memory.textures` goes up by one for any picture of any size.
- **GPU bytes compared across different levels.** A one-level `.ktx2` against a PNG with ten levels is not a comparison. Use `--genmipmap`, or count level 0 on both sides.
- **File bytes reported as GPU bytes.** Finder's size is the suitcase.
- **An upside-down sleeve fixed with `1.0 - vUv.y`.** Re-encode flipped.
- **A washed-out sleeve fixed by deleting `colorspace_fragment`, or by setting `colorSpace` by hand over a mislabelled file.** Re-encode with an sRGB transfer, so the file tells the truth to the next person who loads it.
- **Transcoder files from a CDN address, or Drei's `useKTX2` default path.** Copy the files your pinned three.js ships.
- **A faked `.ktx2`.** If the encoder is missing, say so and keep the PNG.
- **Invented ratios.** “KTX2 saves 75%” is not a measurement. Two numbers from your machine are.
- **A scraped commercial sleeve.** Photograph an album you own, or name the licence.

---

## Lab mapping — on the assignment

This satellite is studied inside the Units 8–9 lab hours and adds no hours. On the [Units 8–9 assignment]({{ '/lessons/en/feii/units-8-9-assignment/' | relative_url }}), it is **task3 — KTX2 and evidence**:

1. **Branch.** Work on a `cover-<slug>-task3-ktx2` branch, after task2's shader PR.
2. **Source.** Put your own source PNG in your route's `covers/<slug>/public/`, with its licence in the note.
3. **Encode** both modes (Template above, or the aggregator's script). Reference your `.ktx2` from your route the way `_template` references its picture. Do not copy the transcoder files: the aggregator already has one shared copy at the site root.
4. **Check** both traps on your sleeve, measure the two numbers for the PNG and both modes, and fill `docs/ktx2-note.md`.
5. **Commit** the source PNG, the chosen `.ktx2`, and the note. Add the new `textures` reading to `docs/renderer-info.md`, and record any assistant diff in the merge log.

---

## Independent self-check — autonomous study

This is an individual self-check, not part of the formal 14-hour Resolución de Ejercicios allocation. The decontextualised drills for this satellite are in `exercises.md` beside this page.

1. Without looking, define pixel, UV, texel, and texture in one line each, without using any format name.
2. A 2048 × 2048 PNG sleeve: compute its GPU bytes at level 0, then say roughly what counting all levels adds.
3. Your packed sleeve loads with the title upside down. Name the cause and the fix, and say why `1.0 - vUv.y` is the wrong fix.

---

## What this lesson can and cannot claim

No peer-reviewed study validates this sequence, or the album sleeve as a way to teach GPU picture formats. The nearest research precedent is broader. Graphics concepts stay meaningful while the APIs that carry them change, so the fundamental ideas are worth learning well (Angel and Shreiner 2024, 1–2). That supports teaching texels and GPU memory as durable ideas. It says nothing about KTX2, ETC1S, UASTC, or whether this page works. The Khronos and three.js links below are **how** notes: they describe the tools, and they are not evidence about teaching. What this cohort defends is the written choice and the two numbers, not a finding.
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
STEP A (PHASE-X8, 2026-11-04): evidence-matrix row frontend-pedagogy/grounding/README.mdc "Satellite — KTX2 first principles" is PLATFORM-ONLY.
[UNVERIFIED-GAP]: no evaluator-safe HE KTX2/Basis teaching coat landed in the 20261104 run.
[STANDARD]: Khronos KTX 2.0. [PRACTITIONER]: Basis Universal, three.js KTX2Loader — platform HOW notes, not Ahmes coats, not pedagogy evidence (PLATFORM-NOTES-POLICY.mdc).
VERIFIED graphics-pedagogy precedent only: Angel, E. & Shreiner, D. (2024). The Future of Teaching Computer Graphics. SIGGRAPH Educators Forum '24. DOI 10.1145/3641235.3664433. Ahmes coat 10_1145_3641235_3664433_the_future_of_teaching_computer_graphics_e2e9b45c, nodes 348bd016-3aee-5eb3-ae93-b3d422e137df p.1 and 92a534c1-6aff-5d5e-b1e5-2a7d2e2c65a9 p.2, evaluator_safe=yes (X3 transcript FEII-3D-ALBUM-KTX-CITATION-TRANSCRIPT-20261104.md). It does NOT validate this KTX2 page; the prose says so.
D22: no Tao / quote-database citations on this page (no epigraphs, no qa-/arch-/dop- IDs).
DevIAC/Athanor not used in X8 (down per X3/X7; KTX2 vector hits are the wrong papers per FINDINGS "Rejected hypotheses"). No vector snippet cited.
Real-sleeve measured pair: deferred to X10 (feii-album-covers _studio switch). The placeholder table above is executor-measured, scratchpad only, no binaries committed.
-->
{% endif %}

---

## 📚 Platform notes (HOW, not bibliography)

Checked 2026-11-04. These explain how the tools work. None of them is evidence that this lesson teaches well.

- Khronos — KTX 2.0 file format specification: <https://registry.khronos.org/KTX/specs/2.0/ktxspec.v2.html>
- Khronos — KTX-Software (`toktx`, `ktx`): <https://github.com/KhronosGroup/KTX-Software>
- Khronos — `ktx create` reference: <https://github.khronos.org/KTX-Software/ktxtools/ktx_create.html>
- Binomial — Basis Universal: <https://github.com/BinomialLLC/basis_universal>
- three.js — `KTX2Loader`: <https://threejs.org/docs/pages/KTX2Loader.html>
- three.js — `CompressedTexture`: <https://threejs.org/docs/pages/CompressedTexture.html>
- three.js — `TextureUtils`: <https://threejs.org/docs/pages/TextureUtils.html>
- three.js manual — color management: <https://threejs.org/manual/#en/color-management>

---

## Session outcome

You can say what a texel is without naming a format. You can explain why the picture's file size is not its GPU number, and compute GPU bytes for a PNG and for a packed file, counting the same levels on both sides. KTX2 is the box. ETC1S and UASTC are the choice you write, with a reason, a licence, and two numbers. You know the two traps a packed sleeve sets: it can land upside down, and it can land in the wrong colour space. The sleeve effect stays the [Cover shaders]({{ '/lessons/en/feii/cover-shaders/' | relative_url }}) satellite's job. Say the oral paragraph from [3D terminology]({{ '/lessons/en/feii/3d-terminology/' | relative_url }}) about your own sleeve. The hand-in is the [assignment]({{ '/lessons/en/feii/units-8-9-assignment/' | relative_url }}).

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
Professor answer sketch for the self-check and exercises.md (not for the student handout):
- 2048 × 2048 PNG, level 0: 2048 × 2048 × 4 = 16,777,216 bytes (16 MiB). All levels: about × 4/3, exactly 22,369,620 bytes for the 12-level chain.
- Upside down: CompressedTexture.flipY = false and KTX2Loader ignores KTXorientation (three 0.185.1); a default toktx encode writes KTXorientation=rd (top-down rows). Fix: re-encode with --lower_left_maps_to_s0t0 (writes ru). 1.0 - vUv.y is wrong because it flips every picture the material reads, including the PNG path, and leaves the asset wrong.
- exercises.md diagnostic (washed-out sleeve): texture.colorSpace logs 'srgb-linear' because the source PNG carried gAMA 1.0, toktx copied it to the DFD (KHR_DF_TRANSFER_LINEAR), and KTX2Loader.parseColorSpace mapped it to LinearSRGBColorSpace. Fix: re-encode with --assign_oetf srgb. --convert_oetf srgb is wrong for a screen-colour photo: measured disc (227,106,44) -> (240,174,116) after decode.
- exercises.md item 2: 1024 × 512 level 0 = 2,097,152 GPU bytes; 11-level chain = 2,796,204 bytes; level 0 × 4/3 = 2,796,202.67. File bytes = 180,000 (given), GPU bytes = the computed ones.
- exercises.md item 3: renderer.info.memory.textures = 2 in both cases because it is a count (one sleeve texture added to one existing texture); they should have written computed GPU bytes for each format, same levels on both sides.
- exercises.md item 5: KTX2 container; ETC1S and UASTC packing modes; transcoder .wasm run-time translator. Complete sentence e.g. "UASTC in a KTX2 box, because the white title type must keep its edges; file bytes X, GPU bytes Y on <machine>".
Measured (X8 executor, 2026-11-04, scratchpad only): placeholder 512×512 PNG rendered from an SVG twin of the cover-shaders canvas (rsvg-convert + magick, 20,245 bytes, no colour chunks); toktx v4.4.2 / ktx v4.4.2; three 0.185.1 KTX2Loader + vendored basis transcoder; headless Chrome, ANGLE Vulkan SwiftShader; WebGL extensions astc, bptc, s3tc, etc, etc1 all exposed; texture count 0 → 1 → 2 → 3 as the PNG, default ETC1S and flipped ETC1S were drawn. Not a GPU measurement.
-->
{% endif %}

---

## References

- Angel, Edward, and Dave Shreiner. 2024. “The Future of Teaching Computer Graphics.” *SIGGRAPH Educators Forum ’24*. https://doi.org/10.1145/3641235.3664433.
