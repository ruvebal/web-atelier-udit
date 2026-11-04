# Album sleeve on a GPU — from `<img>` to KTX2

**Who this is for:** the instructor rehearsing Bloque 5, and the student who can put a JPEG in an `<img>` and a box in a Unit 8 `<Canvas>`, and who has never needed the word *texel*. This is the spine the published KTX2 lesson must follow (PHASE-X8). It is not a Khronos spec and not a graphics degree.

**Master idea:** A JPEG is a suitcase for the network. A GPU texture is the unpacked (or GPU-packed) picture sitting in memory so a shader can ask “what colour is here?”

**Studio test:** Point at one sleeve and say, in your own words: pixel, texel, why the JPEG byte size is not the GPU number, which box you used (KTX2), which packing (ETC1S or UASTC), and the two measurements you wrote down.

Ideas kept, names not cited: one small complete journey before brand names; name where each thing lives; one observable boundary (file bytes vs GPU memory); measure before claiming an optimisation; the hello-world is a switch you can see, the assignment is the same habit on your cover.

---

## 0. You already know this part

On a normal webpage:

```html
<img src="cover.jpg" alt="Album cover" />
```

The browser **downloads** a packed file, **decodes** it into a grid of colours, and **paints** that grid onto the screen. You never name the grid. CSS `background-size` stretches it. That is enough for 2D.

A 3D album cover is a different job. The sleeve is a **mesh** (a flat box in the scene). A **shader** (Unit 9: a small program that turns data into appearance) colours each screen dot of that box by looking up a colour in a picture. The picture is not an `<img>`. It lives on the **GPU** — the chip that draws 3D — as a **texture**.

---

## 1. Three words for one picture

Teach these **before** KTX2, UASTC, or ETC1S. Never use them undefined.

| Word | Everyday gloss | In this lesson |
| --- | --- | --- |
| **Pixel** | A coloured dot **on the screen** | Picture + element. What the monitor shows. |
| **UV** | “Where on the picture?” | Two numbers, usually 0 to 1. `(0, 0)` one corner of the sleeve image; `(1, 1)` the opposite corner. |
| **Texel** | A coloured sample **in the picture the GPU is holding** | **Tex**ture + **el**ement. One stored colour in the grid. The shader asks for a UV; the GPU looks up the nearest texels and usually **blends** them, so the colour it returns is often a mix, not one texel. |
| **Texture** | The whole picture on the GPU | A grid of texels. Not the `.jpg` file on disk. |

**Poster analogy.** A photograph of a cover has grains of colour in the print (texels). The wall you see it on has paint dots (pixels). Stretch the photo across a large 3D sleeve and one texel covers many pixels (soft, blocky). Squeeze a huge photo onto a small sleeve and many texels fight for one pixel (shimmer, aliasing).

You did not need “texel” for CSS. You need it now because the shader does not stretch with `background-size`. It **samples**: “UV 0.3, 0.7 — what colour?”

Unit 9 already named **UV**. This satellite names **texel** so “sampling a `sampler2D`” has a thing being sampled.

---

## 2. The suitcase problem (the whole reason this lesson exists)

**JPEG / PNG / WebP** are **file** formats. They pack a picture small for download. The GPU, by default, does **not** paint from that packed file. The loader **unpacks** it into a raw grid: width × height × 4 bytes (red, green, blue, alpha).

A concrete order of magnitude, not a measurement of your cover:

- File on disk: a 1024×1024 JPEG might be ~200 KB.
- Unpacked on the GPU: 1024 × 1024 × 4 bytes = **4,194,304 bytes ≈ 4 MB**.

That jump is **upload inflation**. The suitcase was small. The unpacked clothes fill the room.

Unit 8 already taught `renderer.info` (draw calls, triangles, and `memory.textures`). Careful: in three.js `renderer.info.memory.textures` is a **count** of textures alive on the GPU (it goes 1 → 2 when the sleeve loads), **not bytes**. The room is measured as **GPU bytes**, computed from what was uploaded: for a PNG, width × height × 4; for a KTX2, the sum of the transcoded `mipmaps[i].data.byteLength`. Compare like with like: three generates mipmaps for a PNG by default, which adds about one third (× 4/3), so count all levels on both sides — or say “level 0 only” for both — and write down `texture.format` (`TextureUtils.getByteLength(width, height, format, type)` needs it). It is not Finder’s file size. A lesson that reports only “my KTX2 is 80 KB” has measured the suitcase and skipped the room. (Amended 2026-11-04, X7 cold review F3: three 0.185.1 `WebGLInfo.js` / `WebGLTextures.js` increment the counter per texture.)

```
Network file (JPEG/PNG)     GPU memory (typical default)
┌─────────────────┐         ┌──────────────────────────┐
│ packed suitcase │  decode │ width × height × 4 bytes │
│  ~200 KB        │ ──────► │  ~4 MB for 1024²         │
└─────────────────┘         └──────────────────────────┘
   what Git stores             GPU bytes — compute it;
                               renderer.info.memory.textures
                               only counts textures (1 → 2)
```

If a later encoded file is small **and** its GPU bytes stay at width × height × 4, the GPU still unpacked. The format did not do the job this lesson is for.

---

## 3. Two different meanings of “compressed” (do not mix them)

| Kind | Examples | Where it helps | What it does not do |
| --- | --- | --- | --- |
| **File compression** | JPEG, PNG, WebP | Download, Git, `<img>` | Does not keep the GPU grid small after decode |
| **GPU texture compression** | ETC1S, UASTC, then a GPU-native format | Memory **on the GPU** while sampling | Not a drop-in for `<img src>` |

Using one word “compressed” for both is how this topic becomes fake expertise. Discriminate: **file packing** vs **GPU-resident packing**.

**GPU-resident** means the hardware can sample while the picture stays packed in a format the GPU understands. JPEG is not that. JPEG must be decoded first.

---

## 4. Three names that are not synonyms

Only after §§1–3.

| Name | Role | Everyday gloss |
| --- | --- | --- |
| **KTX2** | **Container** | The box. Like saying `.zip` — not a claim about what is inside. “I used KTX2” is incomplete. |
| **ETC1S** | **Codec mode** | Smaller, more lossy. A photographic sleeve (gradients, print grain) can live here. |
| **UASTC** | **Codec mode** | Larger, cleaner. Sharp type, logos, thin lines, anything you will inspect closely. |
| **Basis Universal** | The family that can **transcode** those modes | A translator, not a third artistic look. |
| **Transcoder** | Runtime unpacker (often a `.wasm` file next to the app) | Turns the box into **this GPU’s** native compressed format. You vendor the files the pinned three.js expects; you do not invent a CDN. |

**Container vs codec** is the same idea as “MP4 vs H.264”: the box is not the packing.

You do **not** need to memorise vendor format names (BC7, ASTC, ETC2). Those are what the transcoder targets. Your **written choice** is ETC1S vs UASTC at encode time.

---

## 5. The choice you will actually write

Not a brand. A sentence plus two numbers.

1. **Mode:** ETC1S or UASTC.
2. **Why it fits this sleeve:** photo vs sharp type / logo (one honest reason).
3. **Source licence:** photograph of a physical album you own, or a named licence. Private GitHub is not a licence.
4. **File bytes** on disk (the suitcase).
5. **GPU bytes** with PNG vs with your chosen KTX2 (the room), computed as above; plus `renderer.info.memory.textures` as a sanity count (it should go up by one when the sleeve loads, for either format). Dated, from **your** machine. If the encoder is missing, say so and keep PNG — do not fake a `.ktx2`.

Typical use (qualitative; do not invent ratios):

| Sleeve character | Lean toward | Because |
| --- | --- | --- |
| Photograph, grain, soft print | ETC1S | Smaller GPU footprint; extra loss is harder to see |
| Sharp title type, high-contrast logo | UASTC | Edges survive; you pay in size |
| You have not looked at both | Measure both in the studio switch, then pick | Claiming a win without GPU bytes is a vibe |

---

## 6. Hello-world, then your cover

The complete journey on one page, before anyone “owns” a cover:

1. One source PNG of a sleeve (original or PD in `_studio`).
2. The same picture as an ordinary GPU texture (PNG path).
3. The same picture encoded ETC1S and UASTC (when the encoder exists).
4. A **switch** in the scene: PNG / ETC1S / UASTC.
5. Two numbers visible: file bytes, GPU bytes (computed; `memory.textures` only counts).

That switch is the rehearsal. The assignment copies the **habit**, not the studio art.

Encoding every student laptop is not the lab outcome. The repo script may encode; if `toktx` / the encoder is missing, the script fails **loudly** and the PNG path still teaches inflation.

---

## 7. How this sits next to Units 8 and 9

| You already did | This satellite adds |
| --- | --- |
| Unit 8: `<Canvas>`, mesh, `renderer.info` budgets | **GPU bytes** computed from what was uploaded, not file size; the `memory.textures` row is only a count |
| Unit 9: a shader as a small program; UV as a coordinate | **Texel** as what UV looks up; `sampler2D` as “the picture” |
| Cover-shaders satellite: one authored sleeve effect | That effect still works; packing must not be an unexplained paste |
| Covenant merge log | Log the encode/load path the same way you log shader diffs |

WebGPU, TSL, and installing a full KTX-Software GUI are out. This is WebGL via the same three.js pins as Unit 8.

Platform notes stay **dated**. Khronos and three.js `KTX2Loader` are **how** notes (standard / vendor), not a claim that this syllabus is a peer-reviewed graphics-education result. Angel & Shreiner still cover concept-first graphics; they do not validate this KTX2 page.

---

## 8. Forbidden on the published lesson

- Using *texel*, *transcode*, *Basis*, *UASTC*, or *ETC1S* before a gloss in the same section.
- One word “compressed” for JPEG and GPU-resident packing.
- “Just use KTX2” as the learning outcome.
- Invented MB ratios. Missing encoder → say PENDING; PNG path remains the inflation demo.
- Tao / quote-database citations on this page. The journey above is enough.
- Scraped commercial sleeves in `_studio`.
- MCP, Stitch, or corpus-to-boilerplate as student setup.

---

## 9. One paragraph you should be able to say out loud

> The sleeve is a picture on the GPU, not an `<img>`. A **pixel** is a screen dot; a **texel** is a colour in that GPU picture; **UV** is how the shader asks for a texel. A JPEG is small on disk and usually **large** once unpacked. **KTX2** is only the box. I picked **ETC1S** or **UASTC** because of this sleeve, and I wrote file bytes and GPU bytes from this machine.

If you cannot say that, the lesson is still too much brand and not enough picture.
