---
layout: lesson
title: 'AI-Assisted 3D Covenant — Entrega 2 Bar (Units 8–9)'
title_alt: 'Pacto 3D asistido por IA — Barra de Entrega 2 (Unidades 8–9)'
slug: feii-ai-assisted-3d-covenant
date: 2026-08-14
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/ai-assisted-3d-covenant/
description: 'Student contract for AI-assisted R3F work: four Entrega 2 bars, merge rubric, no MCP shopping, ACCEPT/REJECT log parity with Unit 6.'
tags: [feii, r3f, shaders, human-in-the-loop, ai-declaration, entrega-2]
status: complete
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"The module that knows its boundaries serves the whole. The module that knows no boundaries becomes the whole—and collapses under its own weight."_
> — Tao of Development, `arch-001`

This page is the **student path** for AI in Units 8–9. It is not a tool catalogue. MCP marketplaces, Stitch, corpus-to-boilerplate, and editor-plugin shopping are **out of scope** for Entrega 2.

Read it before you open an assistant on a scene or a shader. The same human-in-the-loop habit as [Unit 6]({{ '/lessons/en/feii/unit-6-ai-code-review/' | relative_url }}) — inspect, then merge.

---

## Four bars (Entrega 2 seed)

You pass the 3D slice of Entrega 2 when all four are true:

1. **Interface-layer transfer** — an R3F scene that uses React state, refs, and composition. A raw Three.js tutorial pasted into JSX does not count.
2. **One understood shader** — a custom GLSL fragment (or `shaderMaterial`) you can explain aloud: one uniform, coordinate space, one deliberate effect. Paste-from-lesson does not count.
3. **Documented GPU budget** — a `renderer.info` snapshot (draw calls, triangles, textures) with a threshold you accepted or a change you made to meet it. Desktop cap **≤ 200** draw calls; mobile **≤ 80**.
4. **Merge log** — every AI-assisted diff on the scene or shader is logged ACCEPT / REJECT / ESCALATE with a reason. A log of only ACCEPTs is treated as compliance, not evaluation — same rule as Unit 6.

You do **not** need a new MCP server, a design-generation product, or a generated monorepo.

---

## Merge rubric (gates)

Apply these before you keep an assistant's patch:

| Gate | Question | Fail if |
| --- | --- | --- |
| **API truth** | Does this use the R3F / three.js API you actually installed? | Invented props, deprecated `THREE.*` names, missing dispose |
| **Memory** | Are geometries, materials, and GPU resources owned? | New allocations inside `useFrame` |
| **Motion** | Is animation frame-budgeted? | Work that should be a uniform, done on the CPU every frame |
| **UI / canvas** | Is interactive copy in the DOM (or justified `<Html>`)? | Text and controls burned into the WebGL buffer with no a11y story |
| **Literacy** | Can you explain the shader without reading it back? | "It looks cool" with no `uTime` / `vUv` account |

**Template** — copy into `docs/ai-3d-merge-log.md` in your repo (customize paths and PR numbers).

```markdown
| Diff | Gate | Decision | Reason |
| --- | --- | --- | --- |
| # | API truth / memory / motion / ui-canvas / literacy | ACCEPT / REJECT / ESCALATE | One sentence |
```

At least **two REJECT** rows across Units 8–9, or an explicit finding that nothing was worth rejecting (and the reviews attached).

---

## What this course does not grade

- Installing Browser MCP, Stitch, 21st.dev, Nano Banana, or a "2026 MCP matrix"
- Generating a full studio scaffold (SSR, i18n, CMS stub, Gaussian splats)
- Delegating palette and camera taste to a design model without a written human choice

Those exist for **instructor demonstration**. Your job is transfer, literacy, budget, and judgment.

---

## Scholarly honesty (why the log exists)

Bloque 5 (R3F / GLSL *as a taught sequence*) is a declared **`[UNVERIFIED-GAP]`** in this course's research vault — there is no peer-reviewed finding that this syllabus is the right one. Adjacent CS-education work still motivates the gates:

- Assistants can raise speed while students **accept suggestions without reflecting** (cognitive offloading). That is why an unexplained shader fails.
- Generative design can induce **fixation** (fewer alternatives, more homogenization). That is why you write the palette / camera rationale yourself.

You are inside the gap, as in Unit 6: the Entrega is evidence, not a claim that the literature already settled 3D pedagogy.

Units: [8 — R3F]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}) · [9 — Shader literacy]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}) · [FE II index]({{ '/lessons/en/feii/' | relative_url }})
