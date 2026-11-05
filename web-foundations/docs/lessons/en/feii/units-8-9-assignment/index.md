---
layout: lesson
title: 'Units 8–9 Assignment — 3D Album Cover'
title_alt: 'Tarea de las unidades 8–9 — Portada de álbum 3D'
slug: feii-units-8-9-assignment
date: 2026-11-05
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/units-8-9-assignment/
description: 'Build a recognisable web version of a named music album cover and hand it in as small, reviewed PRs to your route in the shared gallery.'
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

Create a **recognisable web version of your favourite music album cover** at your team's route `/covers/<slug>`. The hand-in is a **complete endpoint** you own: DOM, WebGL, shaders, audio, multi-scene, or hybrid — any visual language that lights the route and meets the covenant bars **that apply to your format**.

This is the team hand-in for [Unit 8]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}) and [Unit 9]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}), the 3D slice of Entrega 2. [Unit 10]({{ '/lessons/en/feii/unit-10-iot-python-backend/' | relative_url }}) remains a separate slice. The beacon in `react-template` is the Units 8–9 **lab demonstration**, not the hand-in. **Unit 8's sleeve fork is lab practice** — you may reuse that composition inside your `Route.jsx`, but it is not the only valid entrega shape.

Your work lands in the public class aggregator [`ruvebal/feii-album-covers`](https://github.com/ruvebal/feii-album-covers), exhibited on GitHub Pages at [https://ruvebal.github.io/feii-album-covers/](https://ruvebal.github.io/feii-album-covers/). You will be added as a collaborator before task1. You own one **route** under `covers/<slug>/` plus one object in `covers/registry.json`. Read that repository's [`CONTRIBUTING.md`](https://github.com/ruvebal/feii-album-covers/blob/main/CONTRIBUTING.md) before opening a PR. This reuses the [TTOD contribution ritual](https://github.com/ruvebal/ttod/blob/main/docs/public/guides/contributing.md); the cover slug is your boundary.

Use the focused satellites while you build: [Cover shaders]({{ '/lessons/en/feii/cover-shaders/' | relative_url }}), [KTX2/Basis first principles]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}), and the [3D terminology]({{ '/lessons/en/feii/3d-terminology/' | relative_url }}) rehearsal page.

### Running references

These are the reference routes in `react-template` (being published): [cover fork](https://ruvebal.github.io/react-template/ex3-cover), [cover shader](https://ruvebal.github.io/react-template/ex4-cover-shader), and [KTX2 switch](https://ruvebal.github.io/react-template/ex5-ktx2). Their source is on the `satellites-ex3-ex5` branch until the professor publishes it.

On the aggregator, **`covers/_studio`** is **one instructor reference** (sleeve shader + KTX2 compare on original art) — live at [https://ruvebal.github.io/feii-album-covers/#/covers/_studio](https://ruvebal.github.io/feii-album-covers/#/covers/_studio) when built for Pages. It is **not the expected answer**. Teams copy **`covers/_template`** (neutral DOM / WebGL / hybrid starters), never `_studio`.

---

## Format freedom (D26)

Your route's **endpoint** is `covers/<slug>/src/Route.jsx`. You control layout, Canvas (if any), camera, interaction, and CSS scoped to your slug. The gallery shell only routes, lazy-loads, and navigates.

| Format | Covenant bars that apply |
| --- | --- |
| **WebGL / R3F** (like Unit 8 lab or `_studio`) | Interface transfer, shader note, renderer budget, KTX2 when you load GPU textures, merge log |
| **DOM / CSS poster** | Interface transfer (DOM state/composition), merge log; **shader-note and KTX2 docs = honest N/A** (do not invent GPU numbers) |
| **Hybrid** | Each bar applies only to the part of the route that uses that technology |

Album title and supporting copy stay **accessible DOM text** when you use WebGL — not pixels in the buffer alone.

---

## The four covenant bars

The [AI-Assisted 3D covenant]({{ '/lessons/en/feii/ai-assisted-3d-covenant/' | relative_url }}) still defines the pass bar. Your route must show all four **where your format uses them**:

1. **Interface-layer transfer** — readable React composition and state (DOM and/or R3F). The cover is recognisable as the named album.
2. **One understood shader** — when you use custom GLSL: one effect you can explain (uniform, space, sampler, deliberate look). Not a paste of the Unit 9 bulb. **Pure DOM: state N/A in `docs/shader-note.md`.**
3. **Documented GPU budget** — when you use WebGL: `docs/renderer-info.md` with draw calls, triangles, and texture counts for the device you name. **Pure DOM: honest N/A in `docs/renderer-info.md`.**
4. **Merge judgment** — `docs/ai-3d-merge-log.md` with ACCEPT / REJECT / ESCALATE; at least **two REJECT** rows across Units 8–9, or explicit justification with review evidence.

Additional hand-in conditions:

- **KTX2 choice** — **when your route loads GPU textures:** source PNG, ETC1S vs UASTC comparison, choice in `docs/ktx2-note.md`, file bytes and computed GPU bytes (see [KTX2/Basis satellite]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }})). **Pure DOM: N/A — do not fake KTX2 rows.**
- **IP declaration** — photograph an album you own **or** name the licence in `docs/ktx2-note.md`. **Public Pages is not a licence.** No scraped commercial sleeves on the exhibition site (D8).

This course treats the sequence as a transparent studio pilot, not as a settled claim that one stack is the best higher-education syllabus. The research precedent is that durable graphics concepts can remain meaningful across changing APIs (Angel and Shreiner 2024, 1–2); the implementation, measurements, PRs, and defence are the evidence for this cohort.

---

## What you hand in

Your completed route plus these four documents (honest N/A where a bar does not apply):

- `docs/renderer-info.md` — machine/device, metrics or N/A.
- `docs/shader-note.md` — eight to twelve lines on your effect, or N/A.
- `docs/ktx2-note.md` — licence, bytes, choice, or N/A.
- `docs/ai-3d-merge-log.md` — covenant decisions and REJECT evidence.

Registry row (one object, sorted by slug): `slug`, `title`, `authors`, `concept` (artist/album + pitch), `thumbnail`, `tags`, `readiness` (`wip` → `ready`).

**Template** — KTX2 comparison when you use textures (same table as the [KTX2/Basis satellite]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }})); replace every ellipsis. Skip the table honestly if your route never uploads a texture.

There is **no post required**. The route, the documents, the PR history, and the human defence are the hand-in.

---

## The PR sequence

Start every task from `main`:

`cover-<slug>-task<N>-<short-topic-name>`

For example: `cover-ok-computer-task1-mesh`, `cover-ok-computer-task2-shader`, `cover-ok-computer-task3-ktx2`. Submit small staged PRs:

1. **task1 — light the route.** Copy `_template`, create `covers/<slug>/`, add registry metadata, make the album readable at `/covers/<slug>`.
2. **task2 — authored shader.** When applicable: sampler effect + `docs/shader-note.md`; otherwise document N/A.
3. **task3 — KTX2 and evidence.** When applicable: PNG, chosen `.ktx2`, notes, merge log; otherwise document N/A.
4. **task4 — cross-cover contribution.** A real fix in another slug (with consent) or a shared gallery/a11y fix, plus at least one formal review outside your slug.

Tasks 1–3 change only `covers/<slug>/**` plus your one `registry.json` object. Never replace `src/App.jsx`.

Every PR must use the repository template and include its **AI Review Log**. Before requesting review, run `npm run lint` and `npm run build`. Bots never approve or merge; students never push `main`; the instructor merges through PRs.

---

## What this file does not ask for

- A second sandbox or a rewrite of `App.jsx`. The aggregator already owns the gallery and route contract.
- Mandating the Unit 8 sleeve/vinyl stage as the **only** hand-in format.
- TTOD's Astro seam names as student branches. Use `cover-<slug>-task<N>-<topic>`.
- TTOD's quote-proposal workflow, an in-app `ASSIGNMENT.md`, or cloud PR-review automation.
- Fake KTX2 or shader evidence on routes that never use those technologies.
- Unit 10's socket, device API, Python service, or assessment work.
- MCP servers, MCP shopping, Stitch, 21st.dev, or `corpus-to-boilerplate/`.
- A social post. The graded record is the route, documents, reviews, and PR history.

---

## References

Angel, Edward, and Dave Shreiner. 2024. “The Future of Teaching Computer Graphics.” _SIGGRAPH Educators Forum ’24_. https://doi.org/10.1145/3641235.3664433.

The KTX2 and R3F pages above use dated standards and current platform documentation for **how** the APIs work. They are not presented as evidence that this exact teaching sequence is already validated.
