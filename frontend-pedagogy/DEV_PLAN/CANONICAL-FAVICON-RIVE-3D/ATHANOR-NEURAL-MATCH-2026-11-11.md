# Athanor neural match · SVG, motion and 3D graphics architecture

**Run:** 2026-11-11 · local Athanor/Ollama discovery, Ahmes page verification  
**Purpose:** ground the canonical-favicon cascade in graphics monographs and technical curriculum evidence without treating vector similarity as citation evidence.

## Scope searched

Separate read-only searches were run against these injected `scholar` projects:

| Project | Search families |
| --- | --- |
| `profield-frontend-pedagogy` | SVG/DOM/Canvas interaction; WebGL projection/depth/picking; animation time; GPU/shader performance |
| `profield-formula-driven-visual-systems` | Bézier curves; tessellation/mesh; transforms/camera/projection; keyframes/interpolation/quaternions |
| `profield-dc-3d-form-volume-pedagogy` | form/volume/surface/depth; camera/occlusion/lighting/interaction |
| `profield-digital-creativity` | motion-design and interactive-3D vocabulary |

`nomic-embed-text` was available locally. No corpus was injected or modified.

## Retained page-level matches

### 1. SVG is a representation and interaction choice

Haverbeke’s browser-graphics chapter compares HTML, SVG and Canvas as task-dependent interfaces. The verified page explains that SVG shapes remain DOM elements and can receive per-element interaction, while Canvas centralizes a picture in one element; it also motivates SVG for crisp drawing across zoom levels. This supports D23 and the lesson’s existing claim that interactivity is not “common to all techniques” in the same architectural sense.

- Source: Marijn Haverbeke, *Eloquent JavaScript*, 4th ed., chapter 17, “Drawing on Canvas,” especially “SVG” and “Choosing a Graphics Interface.”
- Ahmes nodes: `ae6b838e-3c54-5340-ae22-0f93571d00ad`, `64676c43-5466-5ca6-bea3-34751f0237ff`, `022a19d8-283a-5fb3-b075-66c52fd5910a`.
- Citation gate: `evaluator_safe=yes`. EPUB has no reliable folio; cite chapter/section, not resolver PDF-order page 47.
- Transfer boundary: this supports renderer/interaction ownership, not a benchmark proving SVG always outperforms Canvas.

### 2. Curves, projection and interpolation are separate mathematical contracts

Vince treats cubic Bézier curves, interpolation, quaternion interpolation and perspective projection in distinct chapters. The perspective page explicitly separates world-to-camera conversion from camera-to-projection-plane conversion. The interpolation pages connect animation frames to a parameter `t`, explain uniform linear spacing, and show that controlling spacing changes perceived acceleration; quaternion interpolation addresses orientation rather than ordinary position.

- Source pages verified in the printed edition: perspective projection p. 204; animation interpolation around pp. 216–219; quaternion interpolation around pp. 229–231; cubic Bézier curve p. 244.
- Ahmes nodes: `0874eb09-97c7-5cdd-9841-77b7b2c5a5cc`, `b82017e9-e5c6-597b-81c6-f770443500c0`, `bbeb0ba1-779b-5463-b197-781766908cd5`, `6f55faef-ae07-5720-94c3-57db8c32b4c8`, `0cd5672a-361a-58e7-921c-3efde2fcb9fc`.
- Citation gate: `evaluator_safe=yes`.
- Cascade consequence: X1 owns curve flattening; X2 owns projection; X3 owns elapsed-time position/orientation interpolation. These must not collapse into one “3D animation” function.

### 3. Graphics architecture is a sequence of knowledge layers

The ACM/IEEE-CS/AAAI *Computer Science Curricula 2023* Graphics and Interactive Techniques area separates interaction, animation/simulation, rendering, geometric modeling and shading. Its verified printed pages name visibility/occlusion, depth buffering, affine transforms, camera-versus-model transforms, vertex buffers and shaders, tessellation, mesh generation, parametric curves, GPU architecture, human sensitivity to flicker, and analysis of shader bandwidth/computation.

- Printed pages verified: 151, 153, 158–159.
- Representative Ahmes nodes: `9708117d-1a8f-5d10-9936-2d5fcb6f7e69`, `1ae1e1cd-4be4-5e6f-9507-4e82095fcfb7`, `c0bd56b4-cf72-57ef-baf0-21aabe070246`, `25665122-3076-525d-949f-acb86fbcc80d`, `cf1d4bcd-4d12-5747-8182-cf6157f84230`, `91c82bde-89c4-50fb-9ddd-2458a2baa3df`.
- **[BIBLIO-GAP]:** the injected twin resolves from slug-derived author/year; the better local twin contains authors but remains `evaluator_safe=no` at confidence 0.70. Use this as private architecture evidence only until bibliographic metadata is repaired from the report title page. Do not publish `(Kumar 2024, …)` as if the report had a single author.
- Transfer boundary: curriculum coverage validates the layered teaching map; it does not prescribe Rive, WGSL or this favicon implementation.

### 4. Teach portable shader/pipeline concepts without hiding modern API cost

Angel and Shreiner observe that much graphics logic remains similar across APIs and lives in shaders, while modern GPU APIs require substantial setup code. Their proposed pedagogical route begins with a minimal vertex-shader/rasterizer/fragment-shader model before expanding API machinery. This strongly supports D24 and the cascade’s “who owns time, space, and pixels?” frame.

- Source: Edward Angel and Dave Shreiner, “The Future of Teaching Computer Graphics,” SIGGRAPH Educators Forum 2024, pp. 1–2, DOI `10.1145/3641235.3664433`.
- Ahmes nodes: `493d33dd-6417-52ce-b356-d722abd49f57`, `ea4b03ac-8a91-5eb1-8004-1cd4c87a2902`, `92a534c1-6aff-5d5e-b1e5-2a7d2e2c65a9`.
- Citation gate: `evaluator_safe=yes`; resolver truncates co-authorship, so public citation must be `(Angel and Shreiner 2024, 1–2)`.
- Cascade consequence: expose generated buffers, transforms, depth and shader responsibilities while packaging boilerplate behind the reusable extruder/runtime adapter.

## Discarded matches

- Additive-manufacturing “extrusion” and tetrahedral finite-element nodes: lexical collision with SVG extrusion, wrong domain.
- Fashion-avatar/virtual-try-on papers: relevant to 3D pedagogy broadly, not to vector tessellation or web GPU architecture.
- Bibliography-only nodes and figure captions without substantive explanation.
- TikZ figure captions about Bézier splines: weaker than the verified mathematics monograph.
- General motion-design snippets about apparent motion: useful design vocabulary but insufficient for the cascade’s technical decisions.

## Cascade amendments justified by the search

1. Add D21’s explicit pipeline/layer map to the public lesson.
2. Add D22’s elapsed-time and position/orientation interpolation distinction to X3 tests.
3. Add D23’s DOM-versus-GPU interaction ownership to the technique comparison.
4. Add D24’s GPU setup/performance distinction and shader computation evidence to X5.
5. Carry the ACM curriculum metadata problem as a source-only `[BIBLIO-GAP]`; do not leak the label or local architecture into the published site.

## Evaluator-safe bibliography candidates

- Angel, Edward, and Dave Shreiner. 2024. “The Future of Teaching Computer Graphics.” In *SIGGRAPH Educators Forum ’24*. https://doi.org/10.1145/3641235.3664433.
- Haverbeke, Marijn. 2024. *Eloquent JavaScript*. 4th ed. No Starch Press. Chapter 17, “Drawing on Canvas.”
- Vince, John. 2017. *Mathematics for Computer Graphics*. 5th ed. London: Springer.

These candidates still require the public lesson editor to match the repository’s Chicago formatting and preserve the internal node trail behind the publication metadata switch.

## X0 live anchor recheck · 2026-11-11

The X0 implementer resolved all 15 retained node IDs again through their current Ahmes `extraction.db` files and captured the full extracted node text plus `ahmes query --cite` output in `baseline/X0/research-anchor-verification.json`. Haverbeke, Vince, and Angel/Shreiner nodes still resolve as evaluator-safe (`confidence=0.95`, metadata-backed); their verified content supports SVG/DOM interaction, camera-then-projection, time-parameterized interpolation, quaternion interpolation, Bézier representation, and modern GPU setup cost. ACM CS2023 nodes resolve to full page text, but the current cite outputs are `source=slug`, `confidence=0.60`, `evaluator_safe=no` (rather than the earlier report’s 0.70 observation). Keep the source-only bibliography gap; do not publish a citation derived from the slug. The live recheck supersedes any different safety score in this earlier search note.
