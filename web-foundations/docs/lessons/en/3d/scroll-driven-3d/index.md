# Scroll-Driven 3D — Cinematic Experiences in the Viewport

> *"The scroll is the user's timeline. You are the cinematographer: every pixel of travel is a cut, a dolly, or a breath held in the dark."*

---

## Why scroll + 3D matters

Scroll-driven 3D is how many award-grade marketing sites achieve **cinematic pacing** without forcing the user into a game loop. The browser already gives you a universal input: vertical (or horizontal) displacement. Your job is to map that displacement to **camera pose**, **material parameters**, and **layered depth** so the scene feels authored, not accidental.

This lesson assumes **React Three Fiber (R3F)** and **three.js** on the rendering side, and treats **GSAP ScrollTrigger** as the timeline authority for scroll-normalized progress. Smooth scroll (Lenis) is optional polish, not a substitute for a clear mental model.

---

## The mental model: scroll → progress → scene state

1. **Scroll position** is noisy and device-dependent (trackpad vs wheel, inertia, reduced motion).
2. **Normalized progress** `t ∈ [0, 1]` (or per-section spans) is your **director's timecode**.
3. **Scene state** is whatever you derive from `t`: camera position on a curve, fog density, shader uniforms, object visibility.

Never bind raw `window.scrollY` to React state every frame unless you enjoy re-render storms. Prefer **imperative writes** into three.js objects inside `requestAnimationFrame` or GSAP's ticker, or a single ref that R3F reads once per frame in `useFrame`.

> **CodeSandbox vs excerpts:** Blocks labeled **CodeSandbox-ready** are complete minimal runnable examples. Blocks labeled **Excerpt** are snippets only—not standalone projects.

**CodeSandbox-ready — Scroll progress drives a mesh (vanilla three.js)**

```js
import * as THREE from "three";

function createScrollProgress(getScrollY, start, end) {
  return function getProgress() {
    const y = getScrollY();
    const span = Math.max(1, end - start);
    const raw = (y - start) / span;
    return Math.min(1, Math.max(0, raw));
  };
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0c0c12);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.2, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);
document.body.style.margin = "0";

document.body.style.minHeight = "300vh";

scene.add(new THREE.AmbientLight(0xffffff, 0.35));
const sun = new THREE.DirectionalLight(0xffffff, 0.9);
sun.position.set(2, 5, 3);
scene.add(sun);

const mesh = new THREE.Mesh(
  new THREE.TorusGeometry(0.65, 0.22, 24, 64),
  new THREE.MeshStandardMaterial({ color: 0x88ccff, roughness: 0.35, metalness: 0.2 })
);
mesh.position.y = 0.65;
scene.add(mesh);

const getProgress = createScrollProgress(
  () => window.scrollY,
  0,
  Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
);

function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener("resize", onResize);
window.addEventListener("scroll", onResize, { passive: true });

function animate() {
  requestAnimationFrame(animate);
  const t = getProgress();
  mesh.rotation.y = t * Math.PI * 2;
  mesh.position.y = 0.65 + Math.sin(t * Math.PI) * 0.25;
  renderer.render(scene, camera);
}
animate();
```

**Excerpt — Scroll progress helper**

```js
function createScrollProgress(getScrollY, start, end) {
  return function getProgress() {
    const y = getScrollY();
    const span = Math.max(1, end - start);
    const raw = (y - start) / span;
    return Math.min(1, Math.max(0, raw));
  };
}
```

---

## GSAP ScrollTrigger + R3F: who owns time?

**ScrollTrigger** excels at:

- Pinning sections and scrubbing timelines
- Normalizing multiple scroll ranges into one master timeline
- Batch updates and layout measurement

**R3F** excels at:

- Scene graph composition
- `useFrame` for per-frame GPU work
- Integration with drei helpers

**Production pattern:** ScrollTrigger updates a **ref** or a **small store** that `useFrame` reads. Avoid driving React `useState` from scroll events at 60–120 Hz.

**CodeSandbox-ready — ScrollTrigger progress + camera on a curve (R3F)**

```jsx
import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useScrubbedRef(initial = 0) {
  const tRef = useRef(initial);
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        tRef.current = self.progress;
      },
    });
    return () => st.kill();
  }, []);
  return tRef;
}

function Rig({ curve }) {
  const tRef = useScrubbedRef(0);
  const { camera } = useThree();

  useFrame(() => {
    const t = tRef.current;
    const point = curve.getPointAt(t);
    camera.position.copy(point);
    const tangent = curve.getTangentAt(t).normalize();
    camera.lookAt(point.clone().add(tangent));
  });

  return null;
}

function Subject() {
  const ref = useRef(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.2;
  });
  return (
    <mesh ref={ref} position={[0, 0.4, 0]}>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial color="#c9d6ff" roughness={0.35} />
    </mesh>
  );
}

export default function App() {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 1.2, 5),
        new THREE.Vector3(2, 1.6, 2.5),
        new THREE.Vector3(-1.5, 1.0, 0.5),
        new THREE.Vector3(0, 1.4, -2),
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.minHeight = "280vh";
    return () => {
      document.body.style.minHeight = "";
    };
  }, []);

  return (
    <Canvas camera={{ fov: 50, near: 0.1, far: 100 }} style={{ position: "fixed", inset: 0 }}>
      <color attach="background" args={["#0a0a10"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 6, 4]} intensity={0.85} />
      <Subject />
      <Rig curve={curve} />
    </Canvas>
  );
}
```

**Excerpt — Hook + camera component (split across files in real apps)**

```js
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrubbedRef(initial = 0) {
  const tRef = useRef(initial);
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        tRef.current = self.progress;
      },
    });
    return () => st.kill();
  }, []);
  return tRef;
}

export function CameraOnProgress({ curve }) {
  const tRef = useScrubbedRef(0);
  const { camera } = useThree();

  useFrame(() => {
    const t = tRef.current;
    const point = curve.getPointAt(t);
    camera.position.copy(point);
    const tangent = curve.getTangentAt(t).normalize();
    camera.lookAt(point.clone().add(tangent));
  });

  return null;
}
```

For section-based experiences, create **one ScrollTrigger per act** and blend progress with `gsap.utils.clamp` and `gsap.utils.mapRange`.

---

## Lenis smooth scroll: butter, not band-aids

**Lenis** (or similar smooth scroll libraries) interpolates scroll position over time. That changes two things:

1. **ScrollTrigger** may need `ScrollTrigger.scrollerProxy` so GSAP measures the virtual scroller.
2. **Input latency** increases slightly; always respect `prefers-reduced-motion: reduce` and offer a **reduced or instant** mode.

Production checklist:

- Initialize Lenis once; kill it on route unmount in SPAs.
- Call `ScrollTrigger.update()` after Lenis scroll events if you see desync.
- Test on low-end Android: smooth scroll + heavy 3D can **compound** jank.

---

## Scroll-linked camera paths: the camera on a curve

A **CatmullRomCurve3** (or a hand-tuned sequence of easing keyframes) gives repeatable cinematography. Author control points in Blender or a small debug GUI, export as JSON, load at runtime.

**Excerpt — Build a curve from JSON points**

```js
import * as THREE from 'three';

export function loadCameraPath(points) {
  const vectors = points.map((p) => new THREE.Vector3(p.x, p.y, p.z));
  return new THREE.CatmullRomCurve3(vectors, false, 'catmullrom', 0.5);
}
```

Tips:

- Keep **FOV** modest on wide shots; extreme FOV + scroll scrub exaggerates motion sickness.
- Add **slight noise or secondary motion** (micro-parallax on UI layers) only after the main path reads cleanly.
- For **handheld feel**, layer a low-amplitude sine on `lookAt` based on `t`, not on wall-clock time, so it stays deterministic when scrubbing.

---

## Parallax depth layers

Parallax is **different speeds for different depths**, implemented as:

- **2D DOM layers** with CSS `transform: translateY` tied to the same `t` (cheap, crisp text).
- **Multiple three.js planes** at different `z` with offset factors on `t`.
- **Shader-based** offsets in vertex stage for large backgrounds.

**Excerpt — Parallax factor inside `useFrame`**

```text
// useFrame excerpt: parallax factor k in [0, 1] — farther layers move less.
function applyParallax(mesh, t, k) {
  mesh.position.y = THREE.MathUtils.lerp(-2, 2, t) * k;
}
```

Compositor-friendly parallax uses **transform** and **opacity**, not `top`/`left` or layout thrashing.

---

## Scroll-driven material transitions

Drive **uniforms** or built-in material properties from `t`:

- **Opacity**: fade between acts; sort transparent meshes or use `depthWrite: false` with care.
- **Color**: `mesh.material.color.lerpColors(a, b, smoothstep(t0, t1, t))`.
- **Displacement strength**: scale normal/displacement maps for a “terrain waking up” effect.

Throttle expensive updates: if you only need 30 effective steps across a long scroll, **quantize** `t` before writing uniforms to reduce GPU state churn.

**Excerpt — Quantize progress**

```js
export function quantize01(t, steps) {
  const s = Math.max(1, steps);
  return Math.round(t * (s - 1)) / (s - 1);
}
```

---

## Gesture + scroll hybrid

Touch devices mix **pan**, **momentum scroll**, and sometimes **horizontal** gestures. Rules of thumb:

- **One primary axis** per section: if the user is scrubbing a 3D story vertically, avoid simultaneous horizontal carousel unless gestures are clearly separated.
- **Pointer capture** for drag-to-rotate overlays; keep scroll for the page story.
- Offer **keyboard** alternatives (arrow keys / space) for long-form pages.

---

## Performance: throttle, `will-change`, compositor-friendly

- **Do not** update React state per scroll event for 3D parameters.
- Use **`will-change: transform`** sparingly on DOM overlays that track scroll; remove when sections unpin.
- Prefer **transform/opacity** animations on DOM; avoid animating `width`, `margin`, or properties that trigger layout.
- **Measure**: Performance panel + `renderer.info` in three.js; watch **GPU time** when post-processing stacks up.

For R3F: mark hot meshes with `frustumCulled` appropriately; off-screen pinned canvases still render unless you **pause** the loop when out of view.

---

## drei `ScrollControls`: HTML in synchronized scroll space

`@react-three/drei`'s **ScrollControls** maps scroll to a virtual height and exposes `useScroll()` with `offset`, `delta`, and range helpers. It shines when **3D and DOM** must stay in **one scroll narrative**.

When to choose **drei ScrollControls** vs **GSAP ScrollTrigger**:

- **drei**: tight coupling of Canvas rows and HTML; minimal GSAP dependency; great for portfolio scenes.
- **GSAP**: complex pinning, timelines, and handoffs between multiple DOM roots and canvases.

You can combine them, but **avoid double sources of truth** for `t`. Pick one master clock.

---

## Case studies (patterns, not endorsements)

| Site pattern | Technique | Takeaway |
|--------------|-----------|----------|
| Long-form product launch | Pinned full-viewport WebGL + scrubbed camera | One WebGL context; aggressive asset streaming |
| Architecture portfolio | Section-based triggers + light 3D accents | 3D only where it earns its bytes |
| “Scroller video” illusion | Mesh sequence or video texture + scroll | Often cheaper than full GI per frame |

Study how **first paint** works: many sites show static or video first, then **upgrade** to WebGL after idle.

---

## AI notes (working with copilots)

- Ask for **GSAP ScrollTrigger + Lenis scrollerProxy** boilerplate as a single file; verify cleanup (`kill()`, `lenis.destroy()`).
- Request **curve JSON** schemas and loaders; have the model **never** hardcode camera paths in JSX without data files.
- When the model suggests `useState` + scroll listener, **redirect** to ref + `useFrame` or GSAP scrub.
- Have AI generate **reduced-motion branches** alongside the flashy path.

---

## Tao moment

The user does not owe you their attention at 60fps. Scroll gives them **the rhythm**; your scene gives **the meaning**. When progress flows from their thumb, the camera should feel like **memory pulling them forward**—not a slot machine they crank for sparks. Build the path, honor the pause, and let the last frame rest.

---

## Section pinning + multiple acts

Long pages behave like **acts** in a play. Each act might pin the canvas while copy scrolls beside it, or pin both until a 3D transition completes. ScrollTrigger’s `pin: true` is powerful and easy to misuse.

**Excerpt — Pin factory**

```js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function pinAct({ trigger, start, end, onProgress }) {
  return ScrollTrigger.create({
    trigger,
    start,
    end,
    pin: true,
    anticipatePin: 1,
    scrub: 0.8,
    onUpdate: (self) => onProgress(self.progress),
  });
}
```

**Production notes:**

- `anticipatePin` reduces visual jump when pinning starts; tune per layout.
- `scrub: 0.8` adds slight **lag** (cinematic smoothing); `scrub: true` is frame-tight.
- Always `kill()` triggers when unmounting routes; leaked triggers are a top source of “ghost” scroll behavior in SPAs.

---

## drei `ScrollControls` + `useScroll` (minimal JS pattern)

When the Canvas **is** the scroll surface, drei exposes normalized ranges per `<Scroll>` child:

**Excerpt — `ScrollControls` + `useScroll` (place inside a parent `<Canvas>`)**

```jsx
import { useRef } from "react";
import { ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function SceneContent() {
  const scroll = useScroll();
  const group = useRef(null);

  useFrame(() => {
    const t = scroll.offset;
    if (group.current) {
      group.current.rotation.y = t * Math.PI * 2;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0.35, 0]}>
        <torusGeometry args={[0.45, 0.16, 32, 64]} />
        <meshStandardMaterial color="#9adbc9" roughness={0.35} />
      </mesh>
    </group>
  );
}

export function ScrollDrivenCanvas() {
  return (
    <ScrollControls pages={4} damping={0.2}>
      <SceneContent />
      <Scroll html>
        <section style={{ height: "100vh" }}>Act I</section>
        <section style={{ height: "100vh" }}>Act II</section>
      </Scroll>
    </ScrollControls>
  );
}
```

`damping` trades **responsiveness** for **smoothness**. On high-refresh displays, smaller damping can feel twitchy; pair with Lenis only after verifying ScrollTrigger sync.

---

## `prefers-reduced-motion`: non-negotiable

Treat reduced motion as a **first-class timeline**:

**Excerpt — Reduced motion helpers**

```js
export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function scrollScrubValue(reduce, tAnimated, tInstant) {
  return reduce ? tInstant : tAnimated;
}
```

Implementation strategies:

- **Instant jumps** between narrative states instead of scrubbed camera flights.
- Disable Lenis; use native scroll.
- Shorten pinned durations so users are not trapped in a viewport.

---

## Debugging checklist (when scroll and WebGL disagree)

1. **One scroller**: confirm whether `document` or a div is the scroll root; mix-ups break Trigger start/end.
2. **Resize**: call `ScrollTrigger.refresh()` after fonts load, images decode, or WebGL canvas resizes.
3. **Transforms on ancestors**: CSS `transform` on a pinned ancestor creates containing blocks; remeasure.
4. **Mobile URL bar**: `100vh` is a lie; use `window.innerHeight` or CSS `dvh` for full-bleed layouts and re-refresh triggers.
5. **R3F sizing**: `resize` debouncing on the canvas can desync DOM measurement; prefer `frameloop="always"` only when needed.

---

## Security and sanity (user-generated or CMS-driven paths)

If camera paths or section heights come from a CMS:

- **Clamp** all progress and durations; reject NaN from malformed JSON.
- **Cap** the number of control points on splines to prevent pathological curves.
- **Sanitize** any HTML injected into `<Scroll html>` layers.

---

## Further reading

- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Lenis](https://github.com/studio-freight/lenis)
- [drei ScrollControls](https://github.com/pmndrs/drei#scrollcontrols)
- [three.js Curve](https://threejs.org/docs/#api/en/extras/core/Curve)
