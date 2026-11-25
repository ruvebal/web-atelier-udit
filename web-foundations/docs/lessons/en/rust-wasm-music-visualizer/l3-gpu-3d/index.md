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

- `src/main.js:32-47` creates the scene, camera and renderer.
- `src/main.js:48-62` creates the grouped meshes, materials and lights.
- `src/main.js:184-187` applies scale and rotation every frame.
- `src/style.css` defines the responsive stage that contains the canvas.

## Studio move

Replace the three icosahedra with an original composition. Keep the camera, material and depth relationship understandable. Verify that near geometry occludes far geometry; do not submit a flat overlay labelled “3D.”

## Exit ticket

Provide a mapping table: feature → property → intended listener perception. Include one screenshot at rest and one under audio.

**Grounding:** the existing Three.js lesson corpus supplies the scene-graph and GPU vocabulary; the experiment is the executable reference.
