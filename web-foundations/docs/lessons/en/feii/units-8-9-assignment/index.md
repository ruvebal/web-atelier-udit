---
layout: lesson
title: 'Units 8–9 Assignment — 3D Album Cover'
title_alt: 'Tarea de las unidades 8–9 — Portada de álbum 3D'
slug: feii-units-8-9-assignment
date: 2026-11-04
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/units-8-9-assignment/
description: 'Build a recognisable web 3D version of a named music album cover and hand it in as small, reviewed PRs to your route in the shared gallery.'
tags: [feii, r3f, shaders, ktx2, album-cover, entrega-2, assignment]
status: complete
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _“The contributor who reads the style guide is the contributor whose PR gets merged.”_
> — Tao of Development, `qa-007`
{: .tao-development-quote }

Create a **web 3D version of your favourite music album cover**. The result must be recognisable as a named album, but it must also show your own decisions: a composed R3F scene, one sleeve shader you can explain, and a documented texture-delivery choice.

This is the team hand-in for [Unit 8]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}) and [Unit 9]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}), the 3D slice of Entrega 2. [Unit 10]({{ '/lessons/en/feii/unit-10-iot-python-backend/' | relative_url }}) remains a separate slice. The beacon in `react-template` is the Units 8–9 **lab demonstration**, not the hand-in.

Your work lands in the private class aggregator [`ruvebal/feii-album-covers`](https://github.com/ruvebal/feii-album-covers). You will be added as a collaborator before task1. You own one student **route**, `/covers/<slug>`, implemented under `covers/<slug>/` plus one object in `covers/registry.json`. Read that repository's [`CONTRIBUTING.md`](https://github.com/ruvebal/feii-album-covers/blob/main/CONTRIBUTING.md) before opening a PR. This reuses the [TTOD contribution ritual](https://github.com/ruvebal/ttod/blob/main/docs/public/guides/contributing.md); the cover slug is your boundary.

Use the two focused satellites while you build: [Cover shaders]({{ '/lessons/en/feii/cover-shaders/' | relative_url }}) and [KTX2/Basis first principles]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}).

### Running references

These are the reference routes in `react-template` (being published): [cover fork](https://ruvebal.github.io/react-template/ex3-cover), [cover shader](https://ruvebal.github.io/react-template/ex4-cover-shader), and [KTX2 switch](https://ruvebal.github.io/react-template/ex5-ktx2). Their source is on the `satellites-ex3-ex5` branch until the professor publishes it. The private aggregator's instructor reference is [`/covers/_studio`](https://github.com/ruvebal/feii-album-covers/tree/main/covers/_studio): collaborators can run it with `npm run dev`; it is not a deployed public page. Teams copy `covers/_template`, never `_studio`.

---

## The four covenant bars

The [AI-Assisted 3D covenant]({{ '/lessons/en/feii/ai-assisted-3d-covenant/' | relative_url }}) still defines the pass bar. Your route must show all four:

1. **Interface-layer transfer** — an R3F scene using React state, refs, and composition. The cover is readable as the named album; visible title and supporting copy stay accessible in the DOM.
2. **One understood shader** — one custom GLSL fragment or `shaderMaterial` sleeve effect that you can explain aloud: its uniform, coordinate space, sampled texture, and deliberate effect. It is not a paste of the Unit 9 bulb.
3. **Documented GPU budget** — `docs/renderer-info.md` records draw calls, triangles, and `renderer.info.memory.textures` for the device you name, with the threshold you accepted or the change you made.
4. **Merge judgment** — `docs/ai-3d-merge-log.md` records ACCEPT / REJECT / ESCALATE decisions. Include at least **two REJECT** rows across Units 8–9, or state explicitly that nothing was worth rejecting and attach the reviews that support that conclusion.

Two hand-in conditions make those bars specific to this cover:

- **KTX2 choice** — supply a source PNG on your route, compare ETC1S and UASTC, choose one, and explain the choice in `docs/ktx2-note.md`. Record both **file bytes** (the suitcase on disk) and **GPU bytes** (the room the picture takes once uploaded, computed: for the PNG, width × height × 4; for each KTX2, the sum of the transcoded mip data `byteLength`, as the [KTX2/Basis satellite]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}) teaches); they are different measurements. `renderer.info.memory.textures` is a texture **count**, not bytes: use it only to confirm the sleeve added one texture.
- **IP declaration** — photograph a physical album you own **or** name the licence that permits your image use in `docs/ktx2-note.md`. Private GitHub is not a licence. Do not place scraped commercial sleeve scans in `_studio`, and do not publish unlicensed cover imagery to a public Pages site.

This course treats the sequence as a transparent studio pilot, not as a settled claim that R3F, KTX2, or an album-cover prompt is the best higher-education syllabus. The research precedent is that durable graphics concepts can remain meaningful across changing APIs (Angel and Shreiner 2024, 1–2); the implementation, measurements, PRs, and defence are the evidence for this cohort.

---

## What you hand in

Your completed route contains the scene plus these four documents:

- `docs/renderer-info.md` — machine/device, draw calls, triangles, textures, threshold, and any before/after change.
- `docs/shader-note.md` — the uniform, coordinate space, sampler, and authored visual effect in eight to twelve lines.
- `docs/ktx2-note.md` — source/licence declaration; source PNG, ETC1S, and UASTC file bytes; computed GPU bytes for each (same levels counted, `texture.format` recorded); the orientation and `colorSpace` checks; chosen delivery and reason.
- `docs/ai-3d-merge-log.md` — the covenant decisions and required REJECT evidence across the two units.

**Template** — keep the KTX2 comparison explicit rather than writing “compressed better.” This is the same template as the [KTX2/Basis satellite]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }})'s; replace every ellipsis. The orientation and `colorSpace` rows are the two traps that satellite teaches: a packed sleeve is not flipped on upload, and its colour space comes from the file.

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

There is **no post required**. The route, the four documents, the PR history, and the human defence are the hand-in.

---

## The PR sequence

Start every task from the current teaching baseline, `main`, and use this branch family:

`cover-<slug>-task<N>-<short-topic-name>`

For example: `cover-ok-computer-task1-mesh`, `cover-ok-computer-task2-shader`, and `cover-ok-computer-task3-ktx2`. Submit small staged PRs rather than one final dump:

1. **task1 — mesh and scene.** Copy `_template` once, create `covers/<slug>/`, add your one registry object, and make the named album readable. Type and controls stay in the DOM.
2. **task2 — authored shader.** Add the sleeve sampler effect and `docs/shader-note.md`; update the renderer note if the budget moves.
3. **task3 — KTX2 and evidence.** Add the source PNG, the chosen encoded asset, `docs/ktx2-note.md`, the completed renderer note, and the merge log.
4. **task4 — cross-cover contribution.** Open a real fix in another slug (or a shared accessibility/gallery fix) with that team's consent. You must also complete at least one formal review of a PR outside your slug.

Tasks 1–3 change only `covers/<slug>/**` plus your one `registry.json` object. Never edit another team's slug except through the explicit task4 contribution. Never replace `src/App.jsx`; the instructor-owned router already lights `/covers/<slug>` from the registry and page module.

Every PR must use the repository template and include its **AI Review Log**. Before requesting review, run `npm run lint` and `npm run build`; the course expects the `lint-and-build` check to be green and at least one human approval. Bots and assistants may comment; they never approve or merge. Students never push or force-push `main`; on this personal-account course repository that is a course convention, and only the instructor merges through PRs.

---

## What this file does not ask for

- A second sandbox or a rewrite of `App.jsx`. The aggregator already owns the gallery and route contract.
- TTOD's Astro seam names as student branches. Use `cover-<slug>-task<N>-<topic>`, not the TTOD content/graph/oracle/PWA/accounts vocabulary.
- TTOD's quote-proposal workflow, an in-app `ASSIGNMENT.md`, or cloud PR-review automation.
- A post-processing pass. Zero passes is the reference; one is allowed only with comparable renderer measurements before and after.
- Unit 10's socket, device API, Python service, or assessment work.
- An MCP server, MCP shopping, Stitch, 21st.dev, or `corpus-to-boilerplate/`: these are not required for this hand-in.
- A generated monorepo, a second dependency culture, or a replacement for the shared route contract.
- Three-dimensional lettering as a grade requirement. Album title and explanatory copy remain accessible DOM text.
- A social post or reflection post. The graded record is the route, documents, reviews, and PR history.

---

## References

Angel, Edward, and Dave Shreiner. 2024. “The Future of Teaching Computer Graphics.” _SIGGRAPH Educators Forum ’24_. https://doi.org/10.1145/3641235.3664433.

The KTX2 and R3F pages above use dated standards and current platform documentation for **how** the APIs work. They are not presented as evidence that this exact teaching sequence is already validated.
