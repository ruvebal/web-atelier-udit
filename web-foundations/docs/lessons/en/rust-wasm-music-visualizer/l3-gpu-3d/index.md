---
layout: lesson
title: 'L3 · Giving Sound a Body'
slug: rust-wasm-music-visualizer-l3
date: 2026-11-24
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/rust-wasm-music-visualizer/l3-gpu-3d/
description: 'Map audio features to a real depth-tested Three.js composition with an intentional spatial metaphor.'
tags: [threejs, gpu, 3d, depth, geometry]
status: complete
category: 3d
---

# L3 · Giving Sound a Body

**Master idea:** a visualizer is a spatial interpretation, not a louder meter.

## Read the repository

- `src/main.js:23-26` creates the scene and camera; `82-99` creates the renderer and controls.
- `src/visualizers/tidal-orrery.js:2-90` creates the owned groups, extruded vanes, rings, lights and materials.
- `src/visualizers/tidal-orrery.js:94-120` applies the mapped values, low/mid/high colour fields, beat pulse and moon orbit every frame.
- `src/style.css` defines the responsive stage that contains the canvas.

## Studio move

Replace the three icosahedra with an original composition. Keep the camera, material and depth relationship understandable. Verify that near geometry occludes far geometry; do not submit a flat overlay labelled “3D.”

## Exit ticket

Provide a mapping table: feature → property → intended listener perception. Include one screenshot at rest and one under audio.

**Grounding:** the existing Three.js lesson corpus supplies the scene-graph and GPU vocabulary; the experiment is the executable reference.

## Start from the scene graph

The scene is a tree. The camera looks at the tree. The renderer turns the visible surfaces into pixels. A `Group` lets one scale or rotate several meshes together; a mesh combines geometry (shape) and material (appearance).

## Worked construction

1. Identify the `Scene`, `PerspectiveCamera`, `Group` and meshes in `src/main.js:23-26` and `src/visualizers/tidal-orrery.js:2-75`.
2. Change only one geometry parameter.
3. Rotate the camera and explain what changed: object, camera or projection?
4. Turn one mesh so it passes in front of another and verify depth occlusion.
5. Map one audio feature to one spatial property, not to every property at once.
6. Put any satellite or “moon” inside an intentional wire/group. In the reference, `Moon orbit` is a child of `ringB`, so it cannot float outside the display; its orbit is authored time plus a small BPM term.

## Deliberately broken variation

Set every mesh to the same position. The renderer still works, but the composition becomes unreadable. Diagnose the difference between “GPU renders” and “the listener can perceive a deliberate form.”

## Colour is also a mapping

Do not reserve audio response for scale. The reference uses low energy for warmer brass, mids for the metal/cage hue, highs for emissive and edge colour, and `beatPulse` for a brief light surge. Your mapping table must state the colour space or property you change and what the listener should perceive. A random hue cycle is authored motion, not frequency inference.

## Vocabulary

| Term | Plain meaning |
| --- | --- |
| scene graph | A tree of objects and their transforms |
| geometry | The vertices and faces that describe a shape |
| material | The rules for how a surface looks under light |
| depth test | The rule that nearer surfaces hide farther surfaces |
| frame | One rendered image in the animation loop |

## Accessibility pause

Describe the scene without relying on colour or speed alone. The final plugin must retain a usable control path when motion is reduced.
