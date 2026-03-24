# p5.js as Live Texture — Generative 2D on 3D Surfaces

> *"A texture is static memory. A p5 sketch is living thought. Map one to the other and the surface begins to dream."*

---

## Why p5 inside three.js

p5.js is the creative-coding gateway: noise fields, particle systems, typography, algorithmic drawing — all immediate-mode and beginner-friendly. Three.js is the 3D engine. Combining them lets you use **p5's 2D canvas as a live `THREE.Texture`** painted onto a 3D mesh every frame, giving you procedural materials without writing GLSL.

This pattern is not exotic. Studios use it for:

- Dynamic data dashboards mapped to geometry
- Generative identity systems (logos, patterns) that animate in 3D space
- Interactive installations where 2D interaction (drawing, touch) feeds a 3D surface
- Teaching: students already know p5, so this is a bridge to three.js thinking

### The cost

p5 draws on the CPU. Every frame, the p5 canvas must be uploaded to the GPU as a texture. At 1080p this is ~8 MB/frame of pixel data transfer. Mitigations: lower resolution, `pixelDensity(1)`, lower `frameRate`, and skipping frames when the content hasn't changed.

---

## The mental model

```
p5 sketch (CPU)
  ↓  draws to an offscreen Graphics buffer
  ↓
buffer.elt (HTMLCanvasElement)
  ↓  wrapped in THREE.Texture
  ↓
texture.needsUpdate = true  ← set each frame p5 draws
  ↓
meshStandardMaterial.map = texture
  ↓
GPU samples the texture during rasterization
```

The p5 sketch never appears on screen as a DOM element. It draws into a headless `p.createGraphics()` buffer, and three.js uses that buffer's underlying `<canvas>` as the texture source.

---

## SSR safety

p5 requires `window` and `document`. In a server-side-rendered app (React Router v7, Remix), you must:

1. **Dynamic import** — `import('p5')` inside `useEffect`, never at the top level
2. **Hydration guard** — skip the effect until the client is ready (`useHydrated()` from `remix-utils`, or a simple `typeof window !== 'undefined'` check)
3. **No `window` in initial state** — avoid `useState(window.innerWidth)` at module scope; use a safe default and update after mount

> **Tao moment:** *"The server sees no canvas, hears no mouse, knows no frame. Respect its blindness and it will carry your HTML flawlessly."*

---

## Pattern 1: p5 noise field as texture (R3F)

This is the core pattern extracted from a production SSR project. The p5 sketch creates a 3D noise grid of spheres and pipes the result into a `boxGeometry` mesh via `meshStandardMaterial.map`.

### Architecture

```
ThreeScene (Canvas + lights + camera)
  └── P5Scene (CanvasProvider + mesh)
        └── P5SketchNoise (headless p5 → texture callback)
```

Two key abstractions:

- **P5Scene** — wraps children, provides a `CanvasProvider` for viewport math, renders a mesh whose material receives the texture
- **P5SketchNoise** — runs p5 in a `useEffect`, calls `onTextureUpdate(texture)` when the texture is ready

### The CanvasContext (forced perspective)

To make HTML planes and p5-textured meshes appear the **same apparent size** at different Z depths, compute the visible width/height at each depth using the perspective camera's FOV:

**Excerpt** — Forced-perspective math for depth-independent sizing

```jsx
const vFOV = THREE.MathUtils.degToRad(camera.fov);
const depth = Math.abs(camera.position.z - z);
const height = 2 * Math.tan(vFOV / 2) * depth;
const width = height * (viewport.width / viewport.height);
const scaleFactor = Math.min(1, height / viewport.height);
```

This is the same formula used in Renaissance forced perspective and theatrical stage design — objects farther from the camera are scaled up to compensate for perspective foreshortening.

### The p5 sketch

**Excerpt** — Headless p5 sketch that outputs a `THREE.Texture`

```jsx
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function P5SketchNoise({ onTextureUpdate }) {
  const p5Ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    import('p5').then(({ default: p5 }) => {
      if (p5Ref.current) return;

      p5Ref.current = new p5((p) => {
        let graphics;
        let threeTexture;
        let t = 0;

        p.setup = () => {
          graphics = p.createGraphics(window.innerWidth, window.innerHeight, p.WEBGL);
          graphics.pixelDensity(1);
          graphics.noStroke();
          p.frameRate(30);

          threeTexture = new THREE.Texture(graphics.elt);
          threeTexture.minFilter = THREE.LinearFilter;
          threeTexture.magFilter = THREE.LinearFilter;
          threeTexture.generateMipmaps = false;
          threeTexture.needsUpdate = true;

          onTextureUpdate?.(threeTexture);
        };

        p.draw = () => {
          t += 0.02;
          graphics.background(0, 0, 0, 0);

          const cols = 30;
          const spacing = window.innerWidth / cols;
          graphics.strokeWeight(1.5);
          graphics.stroke(255, 255, 255, 180);

          for (let i = 0; i < cols; i++) {
            for (let j = 0; j < cols; j++) {
              const x = (i - cols / 2) * spacing;
              const y = (j - cols / 2) * spacing;
              const noiseVal = p.noise(i * 0.1, j * 0.1, t) * 2 - 1;
              const zOffset = noiseVal * 50;

              graphics.push();
              graphics.translate(x, y, zOffset);
              graphics.sphere(3);
              graphics.pop();
            }
          }

          graphics.loadPixels();
          threeTexture.needsUpdate = true;
        };
      });
    });

    return () => {
      p5Ref.current?.remove();
      p5Ref.current = null;
    };
  }, [ready, onTextureUpdate]);

  return null; // headless — no DOM output
}
```

Key details:

- `createGraphics(w, h, p.WEBGL)` — offscreen buffer with WebGL context for 3D primitives
- `pixelDensity(1)` — halves the pixel count on retina screens, critical for performance
- `frameRate(30)` — 30fps for the p5 sketch is enough; R3F runs at 60fps independently
- `graphics.elt` — the raw `<canvas>` element that `THREE.Texture` wraps
- `threeTexture.needsUpdate = true` — tells the GPU to re-upload every p5 draw cycle
- The component returns `null` — p5 never renders visible DOM

### Composing in the scene

**Excerpt** — Route that layers HTML, p5, and HTML at different depths

```jsx
import { ThreeScene } from '../components/ThreeScene';
import { HtmlPlane } from '../components/HtmlPlane';
import { P5Scene } from '../components/P5Scene';
import P5SketchNoise from '../components/p5/P5SketchNoise';

export default function Index() {
  return (
    <ThreeScene>
      {/* BACKGROUND — z=-100 */}
      <HtmlPlane z={-100}>
        <div>SSR-rendered HTML content</div>
      </HtmlPlane>

      {/* MIDDLE — z=-50 */}
      <P5Scene z={-50}>
        <P5SketchNoise />
      </P5Scene>

      {/* FOREGROUND — z=-1 */}
      <HtmlPlane z={-1}>
        <div>More HTML content</div>
      </HtmlPlane>
    </ThreeScene>
  );
}
```

The camera starts at `z=5` and moves via wheel scroll (lerped). The forced-perspective `CanvasProvider` ensures every plane fills the viewport regardless of its Z position. Scrolling the wheel creates a **depth travel** effect — the user moves through layered content planes.

---

## Pattern 2: scroll-driven camera through depth layers

The camera in the old project uses `useFrame` to lerp toward a target Z based on cumulative wheel delta:

**Excerpt** — Scroll-depth camera controller

```jsx
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function CameraController({ scrollDepth }) {
  const { camera } = useThree();

  useFrame(() => {
    const targetZ = 5 + scrollDepth;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
  });

  return null;
}
```

`scrollDepth` is maintained in the parent via `onWheel` → `setScrollDepth`. Range: `[0, -100]`, matching the Z positions of the content planes. This creates a parallax-free forced-perspective traversal — each plane fills the view identically as the camera arrives at it.

> **Tao moment:** *"Forced perspective is a lie that tells the truth. The planes are not equal. The camera makes them so."*

---

## Pattern 3: SSR pre-rendered HTML in 3D

The old project uses `renderToString` in the loader to pre-render React JSX to HTML, then injects it via `dangerouslySetInnerHTML` inside a Drei `<Html>` component in the 3D scene.

**Excerpt** — Loader pre-renders HTML for injection into 3D

```jsx
export async function loader({ request }) {
  const t = await i18nServer.getFixedT(request);
  const data = await fetchContent(request);

  const prerenderedHtml = renderToString(
    <div className="flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-extrabold">{t('intro')}</h1>
      <p>{data.description}</p>
    </div>
  );

  return { prerenderedHtml };
}
```

This is an SSR-first pattern: the HTML content is server-rendered with i18n and data, then placed onto a 3D plane. The 3D scene acts as a **presentation layer** — the content itself is fully crawlable, localized, and accessible as static HTML.

---

## Performance budget

| Item | Cost | Mitigation |
|------|------|------------|
| p5 draw loop | CPU-bound, ~2-8ms per frame at 1080p | `pixelDensity(1)`, `frameRate(30)`, skip frames when no change |
| Texture upload | ~8MB/frame at 1080p RGBA | Lower resolution for p5 buffer, use `LinearFilter` (no mipmaps) |
| Multiple planes | One draw call per textured mesh | Minimal impact with < 10 planes |
| Drei `<Html>` | DOM → CSS3D → compositing | Use `occlude="blending"` for proper depth, limit to 3-5 planes |
| Forced-perspective math | Per-frame `useMemo` in context | Memoized, negligible cost |

**Rule of thumb:** p5-as-texture works well for **1-3 active p5 sketches** at **720p** or below. For more, pre-render to video or bake to spritesheet.

---

## AI collaboration notes

### What AI does well

- Generating novel p5 sketches (noise patterns, particle systems, generative typography)
- Converting between p5 patterns and GLSL (when the GPU budget demands it)
- Calculating forced-perspective math for custom camera rigs

### What AI gets wrong

- **Texture lifecycle** — AI often creates new `THREE.Texture()` every frame instead of setting `.needsUpdate`
- **SSR safety** — AI puts `window.innerWidth` in top-level `useState` or uses bare `import p5` without dynamic import
- **Memory leaks** — AI forgets to call `p5Instance.remove()` in cleanup

### Prompt template

```text
Create a p5 sketch that draws [DESCRIPTION] into a headless createGraphics buffer.
The sketch must:
- Dynamic import p5 in useEffect (SSR-safe)
- Use pixelDensity(1) and frameRate(30)
- Create ONE THREE.Texture from graphics.elt and call onTextureUpdate once in setup
- Set texture.needsUpdate = true each draw cycle (do NOT recreate the texture)
- Return null (no visible DOM)
- Clean up p5 instance on unmount
```

---

## Historical context: forced perspective

The `ThreeScene.md` essay in the reference project traces the forced-perspective technique from:

- **Ancient Greece** — Euclid's linear perspective in murals
- **Renaissance** — Brunelleschi's trompe-l'œil: painted architecture mimicking real depth
- **Baroque** — Andrea Pozzo's illusionistic ceilings (foreshortening ≈ camera FOV warping)
- **Theater** — Giacomo Torelli's forced-perspective sets (shrinking objects toward the back)
- **Film** — Peter Jackson's Lord of the Rings hobbits, Disneyland's compressed buildings, the Ames Room

The web version is mathematically identical: compute `height = 2 * tan(FOV/2) * depth`, scale the object to compensate, and the parallax illusion vanishes. The user scrolls through **apparently flat layers** that exist at wildly different Z depths.

---

## When to upgrade to GLSL

If the p5 sketch is:

- **Static per frame** (no animation) → bake it to a PNG
- **Simple math** (noise, gradients, waves) → port to a fragment shader for 100x less CPU
- **Heavy** (>16ms per p5 draw) → must move to GPU

The p5-as-texture pattern is ideal for **prototyping and teaching**. For production at scale, it's a stepping stone to custom shaders.

> *"p5 is the pencil sketch. GLSL is the oil painting. Both start with the same composition."*
