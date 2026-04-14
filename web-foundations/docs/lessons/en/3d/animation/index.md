# Animation — Skeletal, Procedural & the Illusion of Life

> *"Animation is not movement. Animation is the illusion of intention."*

On the web, animation is both **time** (keyframes authored in DCC tools) and **code** (springs, noise, interaction). The GPU does not care which story you told; it only sees updated matrices and morph attributes every frame. Production work separates **cheap** animation (moving nodes, blending clips) from **expensive** animation (dense skinning, huge bone counts on mobile).

This lesson covers Three.js’s keyframe system, glTF/Mixamo pipelines, morph targets, procedural patterns in the render loop, React-friendly motion libraries, GSAP timelines, and runtime bone tweaks — with honest performance notes.

---

## The three.js animation stack: Mixer, Clip, Action

Three concepts:

- **`AnimationClip`** — named duration + array of **`KeyframeTrack`**s (e.g. `VectorKeyframeTrack` for position). Usually loaded from glTF.
- **`AnimationMixer`** — player bound to a root object; advances time and applies tracks.
- **`AnimationAction`** — controls how a clip plays: loop, crossfade, weight, time scale.

> **CodeSandbox vs excerpts:** Blocks labeled **CodeSandbox-ready** are complete minimal runnable examples. Blocks labeled **Excerpt** are snippets only—not standalone projects.

**CodeSandbox-ready — Keyframe clip with mixer (no external model)**

```js
import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111118);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(2.5, 1.8, 4);
camera.lookAt(0, 0.4, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);
document.body.style.margin = "0";

const light = new THREE.DirectionalLight(0xffffff, 1.1);
light.position.set(3, 6, 4);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.25));

const actor = new THREE.Group();
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(0.8, 0.8, 0.8),
  new THREE.MeshStandardMaterial({ color: 0x6b9fff, roughness: 0.4 })
);
mesh.position.y = 0.4;
actor.add(mesh);
scene.add(actor);

const mixer = new THREE.AnimationMixer(actor);
const times = [0, 1, 2];
const values = [0, 0, 0, 1, 0.5, 0, 0, 1, 0];
const positionTrack = new THREE.VectorKeyframeTrack(".position", times, values);
const clip = new THREE.AnimationClip("Move", 2, [positionTrack]);
const action = mixer.clipAction(clip);
action.setLoop(THREE.LoopRepeat);
action.play();

const clock = new THREE.Clock();

function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener("resize", onResize);

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  mixer.update(delta);
  renderer.render(scene, camera);
}
animate();
```

**Excerpt — Mixer from glTF**

```js
import * as THREE from "three";

// Assume `gltf` from GLTFLoader: gltf.scene, gltf.animations
const mixer = new THREE.AnimationMixer(gltf.scene);
const clip = gltf.animations.find((c) => c.name === "Walk") || gltf.animations[0];
const action = mixer.clipAction(clip);
action.loop = THREE.LoopRepeat;
action.play();

// In your frame loop:
const delta = clock.getDelta();
mixer.update(delta);
```

**Crossfading** between clips avoids pops:

**Excerpt — Crossfade**

```js
const walk = mixer.clipAction(walkClip);
const run = mixer.clipAction(runClip);
walk.play();
run.play();
run.crossFadeFrom(walk, 0.35, false);
```

**Loop modes** — `THREE.LoopOnce`, `LoopRepeat`, `LoopPingPong` control end behavior. **`clampWhenFinished`** on the action keeps the last frame when a one-shot clip ends (handy for “death” or “interact” states).

**Time scale** — `action.setEffectiveTimeScale(0.5)` slows playback without retiming keyframes in Blender. Negative values reverse (use carefully with root motion).

**Stopping cleanly:**

**Excerpt — Fade out**

```js
action.fadeOut(0.25);
// after fade, optionally:
action.stop();
```

**Weights:** `action.setEffectiveWeight(0.7)` blends clips (layered locomotion + upper body). Keep total weights sane; normalized layering is a design choice, not a GPU guarantee.

---

## Programmatic clips (no DCC)

You can build `AnimationClip` at runtime for UI motion, camera beats, or simple object choreography — useful when glTF is overkill.

**Excerpt — Programmatic `AnimationClip`**

```js
const times = [0, 1, 2];
const values = [
  0, 0, 0,
  1, 0.5, 0,
  0, 1, 0,
];
const positionTrack = new THREE.VectorKeyframeTrack(
  ".position",
  times,
  values
);
const clip = new THREE.AnimationClip("Move", 2, [positionTrack]);
const action = mixer.clipAction(clip);
action.play();
```

**Naming:** The track property path (`.position`, `BoneName.quaternion`) must resolve on the **mixer root** or named subnodes. Wrong paths fail silently or throw depending on version — use the three.js editor or log `scene.getObjectByName`.

---

## Smooth rotations: quaternions, not Euler spikes

Avoid setting `rotation.x/y/z` from noisy input every frame — **gimbal** and jumps appear under user control. Prefer `quaternion.slerp` toward a target orientation:

**Excerpt — Slerp toward a heading**

```js
const current = mesh.quaternion;
const target = new THREE.Quaternion().setFromAxisAngle(
  new THREE.Vector3(0, 1, 0),
  heading
);
const alpha = 1 - Math.exp(-4 * delta);
current.slerp(target, alpha);
```

Cameras, vehicles, and “look at” rigs share the same pattern.

---

## Loading animations from glTF / Mixamo

**glTF** is the web’s animation interchange. Export with:

- Consistent scale (Mixamo often needs scale/orientation fixes — apply a root correction empty in Blender or code).
- **Single skeleton** per skinned mesh where possible.
- Trim redundant tracks at export.

**Excerpt — Load glTF and inspect clips**

```js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const gltf = await loader.loadAsync("/models/character.glb");

scene.add(gltf.scene);

const mixer = new THREE.AnimationMixer(gltf.scene);
gltf.animations.forEach((clip) => {
  console.log(clip.name, clip.duration);
});
```

**Mixamo → glTF:** Download FBX or glTF from Mixamo, convert through Blender or `fbx2gltf`, verify bone names. Retargeting across rigs is an art — for web, prefer **one rig** per project.

**Root motion:** If clips move the character in world space, decide whether to bake root to hips only or drive translation from code. Web games often **strip root translation** and move a parent `Group` with physics/controller logic to avoid sliding on slopes.

---

## Morph targets (blend shapes)

Morph targets are **vertex deltas** stored as extra attributes (`morphTargetInfluences` on `Mesh`). Facial expressions and corrective shapes are typical.

**Excerpt — Morph influences**

```js
// influences: array of weights, one per morph target
mesh.morphTargetInfluences[0] = 0.5;
mesh.morphTargetInfluences[1] = 0.2;
```

You can animate influences with `NumberKeyframeTrack` in a clip, or drive them from audio/reactivity in code.

**Cost:** Each active morph adds vertex work in the vertex shader. Mobile: keep morph counts modest; prefer texture-based facial animation only when you have pipeline support.

---

## Procedural animation in `useFrame` / render loop

Not everything needs keyframes. **Sine** for idle bob, **`lerp`** for lazy follows, **damped** motion for cameras, **noise** for organic drift.

**CodeSandbox-ready — Procedural bob and smooth follow**

```js
import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a10);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.6, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);
document.body.style.margin = "0";

scene.add(new THREE.AmbientLight(0xffffff, 0.35));
const key = new THREE.DirectionalLight(0xffffff, 0.9);
key.position.set(2, 5, 3);
scene.add(key);

const mesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.45, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0xff8866, roughness: 0.35 })
);
mesh.position.set(0, 0.45, 0);
scene.add(mesh);

const clock = new THREE.Clock();
const tmp = new THREE.Vector3();
const targetX = 0.8;
const targetY = 0.55;
const targetZ = -0.3;

function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener("resize", onResize);

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  mesh.position.y = 0.45 + Math.sin(t * 2) * 0.12;
  mesh.position.lerp(tmp.set(targetX, mesh.position.y, targetZ), 0.06);

  renderer.render(scene, camera);
}
animate();
```

**Excerpt — Bob + lerp inside your own loop**

```text
const clock = new THREE.Clock();
const tmp = new THREE.Vector3();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  mesh.position.y = Math.sin(t * 2) * 0.1;
  mesh.position.lerp(tmp.set(targetX, targetY, targetZ), 0.08);

  renderer.render(scene, camera);
}
```

**Spring / damp:** For a production-grade feel without importing physics, use a small damp helper (critical damping approximates “heavy” UI motion).

**Excerpt — Exponential smoothing helper**

```js
function damp(current, target, lambda, dt) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}

// Usage per axis or use Vector3.lerp toward target with exp smoothing
```

**Additive layers:** `AnimationAction` can use additive blending (`THREE.AdditiveAnimationBlendMode` on the action, when your three.js revision exposes it) so secondary clips stack on a base pose — breathing, weapon sway, hit reactions — without a combinatorial explosion of full-body clips. Author additive layers against a **reference pose** in your DCC when possible.

---

## `@react-three/fiber` + motion: react-spring / animated

In R3F, `useFrame` runs in sync with the render loop — ideal for reading refs and mutating `Object3D` state.

**`@react-spring/three`** can drive springs; feed **refs** (`meshRef.current.position.y = y.get()`), not `useState`, for 60fps work.

Plain-JS mental model: read spring values in your per-frame callback and write transforms:

**Excerpt — Spring in the render loop (pseudocode)**

```text
// Pseudocode: spring integrates each step; mesh follows
function onBeforeRender(dt) {
  spring.step(dt);
  mesh.position.y = spring.value;
}
```

**Rule:** React reconciliation every frame is expensive. The illusion of life dies on re-renders.

---

## GSAP for timeline-based 3D animation

GSAP excels at **choreography**: sequences, eases, scrubbing with scroll, and timelines you can pause/reverse.

**Excerpt — GSAP timeline on three.js transforms**

```js
import gsap from "gsap";

gsap.timeline()
  .to(mesh.position, { x: 3, duration: 1.2, ease: "power2.inOut" })
  .to(mesh.rotation, { y: Math.PI * 2, duration: 2 }, "<0.2")
  .to(camera.position, { z: 8, duration: 1.5 }, "-=0.5");
```

**Integration tip:** Update Three.js objects directly (position, rotation, scalar uniforms). For scroll-linked scenes, use `ScrollTrigger` and treat progress as your timeline driver — still keep heavy math out of React state.

**Excerpt — Scroll-scrubbed camera (needs `.scene-section` in the DOM)**

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-section",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
  },
}).to(camera.position, { z: 12, y: 4, ease: "none" });
```

**Kill / cleanup:** On route change in SPAs, `timeline.kill()` and remove ScrollTriggers so cameras do not keep tweening detached scenes.

---

## Bone manipulation at runtime

Skinned meshes expose a **`Skeleton`** with `bones` array. You can rotate individual bones for IK-lite, head tracking, or procedural overlays.

**Excerpt — Find a bone by name**

```js
let skinned = null;
gltf.scene.traverse((obj) => {
  if (obj.isSkinnedMesh) skinned = obj;
});
if (skinned && skinned.skeleton) {
  const bone = skinned.skeleton.getBoneByName("Head");
  if (bone) {
    bone.rotation.y = Math.sin(performance.now() * 0.001) * 0.2;
  }
}
```

**Caveat:** Fighting active `AnimationMixer` tracks that write the same bones requires **layer masks**, **additive blending**, or **manual override** after mixer update — order matters (`mixer.update` then your code, or vice versa depending on who wins).

**Practical order** for look-at-head on a walking character:

1. `mixer.update(delta)` applies locomotion.  
2. Your code overwrites head bone rotation from mouse/camera direction (optionally slerp for smoothness).

---

## Performance: animation is cheap; skinning is not

- **Moving `Object3D` transforms** — very cheap (hundreds/thousands OK if batched/instanced sensibly).  
- **Keyframe tracks** updating matrices — moderate; many simultaneous clips on many characters adds CPU.  
- **Skinned meshes** — vertex shader transforms each vertex by bone weights; high vertex count + many bones hurts **fragment-bound** scenes less than **transform-bound** ones, but mobile GPUs feel it.  
- **Morph targets** — extra vertex ALU per influence.

**Production checklist:**

- Reduce bone count for web LOD rigs.  
- Share `AnimationMixer` patterns (one mixer per character, not per mesh fragment).  
- Use **instancing** for crowds with GPU-only motion, not 500 skinned clones.  
- Profile with **CPU** (mixer update) and **GPU** (skinning) separately.

---

## Debugging checklist (symptoms → causes)

| Symptom | Likely cause |
|---------|----------------|
| T-pose forever | `mixer.update` missing or delta = 0 |
| Mesh explodes | Wrong bind pose, scale not applied, double skeleton |
| Sliding feet | Root motion vs capsule movement mismatch |
| Popping at loop end | `LoopOnce` without `clampWhenFinished`, or bad key at last frame |
| Stutter every N ms | GC from allocating `Vector3` in loop — reuse objects |
| Bones ignore code | Mixer overwrites after your write — reorder updates |

---

## AI notes

- Generated code often forgets **`mixer.update(delta)`** — without it, nothing plays.
- Ask for **retargeting awareness** when mixing Mixamo with custom rigs; wrong rest pose explodes meshes.
- For R3F, insist on **`useFrame`** + refs for per-frame motion; reject `setState` in animation loops.
- Bone names are **case-sensitive** — have the model print `skeleton.bones.map(b => b.name)` once.

---

## Tao moment

The rig is a puppet; the mixer is the puppeteer. Procedural motion is the breath between lines of dialogue. Do not animate every object — animate **attention**. The user follows intention, not displacement. When in doubt, slower and clearer beats busy and clever.

---

## Further reading

- [AnimationMixer](https://threejs.org/docs/#api/en/animation/AnimationMixer)
- [AnimationAction](https://threejs.org/docs/#api/en/animation/AnimationAction)
- [SkinnedMesh](https://threejs.org/docs/#api/en/objects/SkinnedMesh)
- [GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)
