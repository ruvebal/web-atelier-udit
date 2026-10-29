---
layout: lesson
title: 'Units 8–9 Assignment — One Scene, One Shader'
title_alt: 'Tarea de las unidades 8–9 — Una escena, un shader'
slug: feii-units-8-9-assignment
date: 2026-10-22
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/units-8-9-assignment/
description: 'Team hand-in for the 3D slice of Entrega 2: the Unit 8 scene, one shader you can explain, a budget note, and the covenant merge log.'
tags: [feii, r3f, shaders, entrega-2, assignment]
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
{: .tao-development-quote }

This is the team hand-in for [Unit 8]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}) and [Unit 9]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}). It is the 3D slice of Entrega 2. [Unit 10]({{ '/lessons/en/feii/unit-10-iot-python-backend/' | relative_url }}) is the rest of that entrega and is not part of this file. The four bars live in the [AI-Assisted 3D covenant]({{ '/lessons/en/feii/ai-assisted-3d-covenant/' | relative_url }}). This page says what to commit.

One repo. One scene. The individual self-checks in each lesson stay individual and are not this submission. The beacon in the lessons — and the live `react-template` **1.0.0** instructor sandbox (`/ex1-beacon`, `/ex2-shader`) — is a demonstration. Yours has to be a scene you can defend, with a shader that is not a paste of `BulbMaterial.jsx`. Instructor routing and lazy-loaded exercise pages are for teaching both units from one demo; they are **not** part of the graded shape.

---

## What you hand in

On the shared repo, at the date your section sets:

1. **The scene** — Canvas, lights, one composed mesh tree, hover and click that write React state, one `useFrame` that does not allocate geometry. Prefer an opaque GL clear (`alpha: false`) and clear hover when the pointer leaves the canvas. Unit 8's lab is this list.
2. **`docs/renderer-info.md`** — the Unit 8 template, with your machine's row filled in. Course caps stay desktop ≤ 200 draw calls and mobile ≤ 80. The reference scene's own ceiling is tighter (**6 / 1368 / 6 / 1** with or without the rim shader). If your tree is different, your row is the one you accept, and it still has to sit under the course cap for the device you name.
3. **`docs/shader-note.md`** — the Unit 9 template. Eight to twelve lines. All six checklist items. The uniform, the coordinate space, and the effect have to match the shader in the repo.
4. **`docs/ai-3d-merge-log.md`** — the covenant template. At least two REJECT rows across Units 8–9, or an explicit finding that nothing was worth rejecting, with the reviews attached. One log for both units.

A generated look you cannot narrate fails bar 2 of the covenant. A log of only ACCEPTs fails bar 4.

---

## What this file does not ask for

- A second sandbox, a student route table, or a new dependency list. Unit 9's shader runs in the Unit 8 project. Copying the instructor's `react-router-dom` shell does not earn credit by itself.
- A post-processing pass. Zero passes is the reference. One pass is allowed when `docs/renderer-info.md` has a row with it and a row without it, both read with Unit 9's per-frame `BudgetProbe`. The Unit 8 probe sees only a composer's last pass: Bloom read as 1 call there and 23 per frame with the per-frame probe.
- Unit 10's socket, a device API, or a Python service.
- An MCP server, a design-generation product, or a generated monorepo. The covenant already excludes those.

---

## How the two labs meet

Unit 8's three hours produce the scene and `docs/renderer-info.md`. Unit 9's three hours replace one material and produce `docs/shader-note.md`. The merge log is written across both afternoons, not duplicated. If the shader change moves the budget, you update the renderer note in the same commit as the shader. The two documents have to describe one tree.
