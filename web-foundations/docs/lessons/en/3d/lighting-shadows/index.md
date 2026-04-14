# Lighting & Shadows — Painting with Photons

> *"The mesh is invisible until light strikes it. The user never sees your geometry — only the photons that left your scene and hit their eyes."*

Lighting in real-time 3D is a bundle of **approximations**: cheap equations repeated thousands of times per frame. As a frontend specialist, your job is to pick approximations that match art direction, budget, and hardware — then debug them when shadows acne, shimmer, or vanish entirely.

This lesson maps Three.js lights to GPU cost, explains shadow mapping without hand-waving, and connects HDR environments, baked lightmaps, and probes to production decisions.

---

## Light types in Three.js (mental model)

| Light | Physical intuition | Typical use | Runtime cost (broad) |
|-------|-------------------|-------------|------------------------|
| `AmbientLight` | Flat fill, no direction | Prevent total black shadows | Very low |
| `HemisphereLight` | Sky vs ground bounce approximation | Outdoor ambient | Low |
| `DirectionalLight` | Sun — parallel rays | Outdoor key light | Medium + shadow |
| `PointLight` | Bulb — radiates all directions | Lamps, fire | Medium–high + shadow |
| `SpotLight` | Cone | Stage, flashlight | Medium–high + shadow |
| `RectAreaLight` | Area panel (diffuse/specular) | Windows, soft boxes | Higher (area integration) |

**Ambient** alone flattens everything; pair it with directional or hemisphere so normals still read.

> **CodeSandbox vs excerpts:** Blocks labeled **CodeSandbox-ready** are complete minimal runnable examples. Blocks labeled **Excerpt** are snippets only—not standalone projects.

**Excerpt — Hemisphere and key light**

```js
import * as THREE from "three";

const hemi = new THREE.HemisphereLight(0x87ceeb, 0x444422, 0.35);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xffffff, 1.2);
sun.position.set(5, 10, 7);
scene.add(sun);
```

---

## Materials, tone mapping, and color space

Lights paint **linear** shading; displays expect **display-referred** output. Modern Three.js uses **`renderer.outputColorSpace`** (e.g. `THREE.SRGBColorSpace`) and **tone mapping** (`ACESFilmicToneMapping`, etc.) so HDR sun + bloom do not clip ugly.

**Excerpt — Output color space and tone mapping**

```js
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
```

**Physical materials** (`MeshPhysicalMaterial`) couple tightly with lighting: `roughness`, `metalness`, `clearcoat`, `ior`. A polished floor without `envMap` still looks wrong — **IBL is part of the lighting story**, not an optional garnish.

---

## Directional lights and the sun rig

Directionals do not “sit” at a point in the same sense as a point light — their **position** helps define ray direction (`target` vs position). Common pattern: parent the light to an empty object and orbit it for time-of-day.

**CodeSandbox-ready — Sun rig, shadows, and a simple stage**

```js
import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a24);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.set(6, 5, 9);
camera.lookAt(0, 0.5, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

document.body.appendChild(renderer.domElement);
document.body.style.margin = "0";

const hemi = new THREE.HemisphereLight(0x87ceeb, 0x3a3a2a, 0.35);
scene.add(hemi);

const sunGroup = new THREE.Group();
const directional = new THREE.DirectionalLight(0xfff5e6, 1.5);
directional.castShadow = true;
directional.shadow.mapSize.set(2048, 2048);
directional.shadow.camera.near = 0.5;
directional.shadow.camera.far = 80;
directional.shadow.camera.left = -20;
directional.shadow.camera.right = 20;
directional.shadow.camera.top = 20;
directional.shadow.camera.bottom = -20;
sunGroup.add(directional);
sunGroup.add(directional.target);
scene.add(sunGroup);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial({ color: 0x2c2c38, roughness: 0.95 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

const box = new THREE.Mesh(
  new THREE.BoxGeometry(1.2, 1.2, 1.2),
  new THREE.MeshStandardMaterial({ color: 0xc9a06c, roughness: 0.45, metalness: 0.15 })
);
box.position.set(0, 0.6, 0);
box.castShadow = true;
box.receiveShadow = true;
scene.add(box);

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
  renderer.render(scene, camera);
}
animate();
```

**Excerpt — Grouped directional for orbit rigs**

```js
const sunGroup = new THREE.Group();
const directional = new THREE.DirectionalLight(0xfff5e6, 1.5);
directional.castShadow = true;
directional.shadow.mapSize.set(2048, 2048);
directional.shadow.camera.near = 0.5;
directional.shadow.camera.far = 80;
directional.shadow.camera.left = -20;
directional.shadow.camera.right = 20;
directional.shadow.camera.top = 20;
directional.shadow.camera.bottom = -20;
sunGroup.add(directional);
sunGroup.add(directional.target);
scene.add(sunGroup);
```

Tune the **orthographic shadow camera** to tightly fit your scene’s shadow-receiving volume — oversized frustums waste resolution.

---

## Point and spot lights with shadows

Both can `castShadow`. Each shadow-casting light renders the scene from its viewpoint into a **depth map** (for point lights, typically a cubemap face set or dual-paraboloid depending on engine — Three.js uses cubemap faces for point shadow).

**Production:** Cap the number of simultaneous shadow-casting point lights (often 0–2 on mobile). Prefer baked lighting or fake speculars for fill.

**Excerpt — Spot light with shadow**

```js
const spot = new THREE.SpotLight(0xffffff, 80, 30, Math.PI / 6, 0.3, 1);
spot.position.set(0, 8, 0);
spot.castShadow = true;
spot.shadow.mapSize.set(1024, 1024);
spot.shadow.bias = -0.0001;
scene.add(spot);
scene.add(spot.target);
```

---

## Shadow mapping: how it works

1. **First pass (light POV):** Render scene depth from the light into a texture — the shadow map.
2. **Second pass (camera POV):** For each lit fragment, transform world position to light clip space, sample the map, compare depth.

If the surface is farther from the light than the map’s stored depth, it is **in shadow**.

### `shadowMap` types

**Excerpt — Enable shadow maps and filtering**

```js
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default-ish quality
// Alternatives: BasicShadowMap, PCFShadowMap, VSMShadowMap
```

- **Basic** — hard edges, fast.  
- **PCF** — percentage-closer filtering, softer penumbra (more samples).  
- **VSM** — variance shadow maps; can blur for soft shadows but suffer light leak artifacts without care.

### Bias, acne, and peter-panning

**Shadow acne** — self-shadowing noise from finite precision. Fix with **bias** (push depth slightly) or **normal bias** on the light.

**Peter-panning** — bias too high; shadows detach from objects. Tune in small increments per scene scale.

**Excerpt — Shadow bias**

```js
directional.shadow.bias = -0.0005;
directional.shadow.normalBias = 0.02;
```

Resolution matters: `mapSize` 512 vs 2048 is 16× texels. Mobile often lives at 1024 for a single directional.

### Static shadows (performance)

If lights and geometry do not move, you can avoid re-rendering shadow maps every frame:

**Excerpt — Static shadow maps**

```js
renderer.shadowMap.autoUpdate = false;
directional.shadow.needsUpdate = true; // once after scene settles
// Later, when something moves:
directional.shadow.needsUpdate = true;
```

Use for architectural walkthroughs with fixed sun; useless for time-of-day sliders.

---

## Cascaded shadow maps (CSM) — concept

For large view distances, a single orthographic shadow map wastes texels near the camera or looks blocky far away. **Cascaded shadow maps** split the frustum into depth slices; each slice gets its own shadow map with tighter projection — more stable detail up close and fewer giant texels wasted on distant hills.

Three.js provides `CSM` in examples/addons; integration is more involved than toggling a flag. **When to reach for it:** open-world style scenes, flight simulators, big architectural flythroughs. **When to skip:** product configurators with tight bounds — a single directional map is simpler.

---

## Environment lighting: HDR → PMREM → `envMap`

Image-based lighting (IBL) uses an environment map for diffuse and specular reflections. HDR equirectangular images hold a wide luminance range; the GPU needs **prefiltered** versions for roughness mip chains.

Three.js flow (conceptual):

1. Load HDR (`RGBELoader`).  
2. `PMREMGenerator` precomputes the cube LOD chain.  
3. Assign result to `scene.environment` and/or `material.envMap`.

**Excerpt — HDR → PMREM → `scene.environment` (needs your HDR URL)**

```js
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { PMREMGenerator } from "three/extras/PMREMGenerator.js";

const renderer = new THREE.WebGLRenderer({ antialias: true });
const pmrem = new THREE.PMREMGenerator(renderer);
pmrem.compileEquirectangularShader();

const rgbeLoader = new RGBELoader();
const hdrTexture = await rgbeLoader.loadAsync("/env/studio.hdr");
const envRT = pmrem.fromEquirectangular(hdrTexture);
scene.environment = envRT.texture;
scene.background = envRT.texture;

hdrTexture.dispose();
pmrem.dispose();
```

**Metal/rough PBR** materials (`MeshStandardMaterial`, `MeshPhysicalMaterial`) **need** sane `envMap` or metal surfaces read black. `scene.environment` is the modern shortcut so you do not set env per mesh.

**Precedence:** Per-material `envMap` overrides `scene.environment` for that material — useful for a chrome hero prop with a studio cube while the rest of the room uses a different HDR.

---

## RectAreaLight (soft rectangular sources)

Area lights approximate studio panels and bright windows. They are **not** free: integration over the rectangle costs more than a point light.

**CodeSandbox-ready — Rect area light with a reflective subject**

```js
import * as THREE from "three";
import { RectAreaLight } from "three";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";

RectAreaLightUniformsLib.init();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0e0e12);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 2.2, 7);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);
document.body.style.margin = "0";

const ambient = new THREE.AmbientLight(0xffffff, 0.08);
scene.add(ambient);

const width = 4;
const height = 2;
const intensity = 6;
const rectLight = new RectAreaLight(0xffffff, intensity, width, height);
rectLight.position.set(0, 3.5, 0);
rectLight.lookAt(0, 0, 0);
scene.add(rectLight);

const subject = new THREE.Mesh(
  new THREE.SphereGeometry(0.9, 48, 48),
  new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    roughness: 0.25,
    metalness: 0.85,
  })
);
subject.position.y = 0.9;
scene.add(subject);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: 0x222228, roughness: 0.9 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

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
  renderer.render(scene, camera);
}
animate();
```

**Excerpt — RectAreaLight setup only**

```js
import { RectAreaLight } from "three";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";

RectAreaLightUniformsLib.init();

const width = 4;
const height = 2;
const intensity = 6;
const rectLight = new RectAreaLight(0xffffff, intensity, width, height);
rectLight.position.set(0, 5, 0);
rectLight.lookAt(0, 0, 0);
scene.add(rectLight);
```

Verify **`RectAreaLightUniformsLib.init()`** once at startup for your three.js version — without it, materials may not sample the light correctly.

---

## Baked lightmaps: when runtime shadows are too expensive

**Lightmaps** store precomputed diffuse lighting in a second UV channel (`uv2`). Great for static interiors, architectural viz, and mobile games with no moving sun.

Tradeoffs:

- Static geometry only (or relight rarely).  
- Second UV set must not overlap (unless intentional packing for separate objects).  
- Large textures = memory; bake resolution vs quality.

In Three.js, `Lightmap` is wired via material properties (e.g. `lightMap` + `lightMapIntensity`) on standard materials when your pipeline exports appropriate UV2 and textures.

**Rule of thumb:** If nothing important moves, **bake**; if the user controls time of day, **runtime sun + selective shadows**; hybrid pipelines bake bounce + add dynamic characters with simpler lighting.

---

## Light helpers (debugging)

**Excerpt — Directional helper + shadow camera frustum**

```js
import { DirectionalLightHelper } from "three/addons/helpers/DirectionalLightHelper.js";
import { CameraHelper } from "three/addons/helpers/CameraHelper.js";

const dirHelper = new DirectionalLightHelper(directional, 2, 0xff9900);
scene.add(dirHelper);

const camHelper = new CameraHelper(directional.shadow.camera);
scene.add(camHelper);
```

Remove helpers in production builds or gate behind `?debug=1`.

---

## Shadow casting & receiving checklist

Shadows fail silently when any link in the chain is missing:

1. `renderer.shadowMap.enabled = true`  
2. Light has `castShadow = true`  
3. Meshes that **block** light: `mesh.castShadow = true`  
4. Meshes that **receive**: `mesh.receiveShadow = true`  
5. Materials are not fully transparent in ways that break depth (transparent sorting is a separate headache)  
6. Shadow camera **near/far** and **ortho bounds** actually cover the geometry  

**Thin objects** (leaves, cloth) may need **double-sided materials** or thickness to cast believable shadows; single planes can disappear in depth precision.

---

## LightProbe — spherical harmonics probe

`LightProbe` captures diffuse irradiance as spherical harmonics (low frequency ambient). Useful for matching inserted 3D objects to a photographed environment without full per-pixel probes.

**Excerpt — Add a probe**

```js
const probe = new THREE.LightProbe();
probe.intensity = 1;
scene.add(probe);
// Often loaded from precomputed data or generated from cube map
```

Pair with renderer tone mapping and correct color spaces for plausible integration.

---

## Performance cost per light type (ordering)

From generally cheapest to most expensive (still scene-dependent):

1. `AmbientLight`  
2. `HemisphereLight`  
3. `DirectionalLight` (no shadow)  
4. `DirectionalLight` + one shadow map  
5. Multiple shadow casters  
6. `PointLight` / `SpotLight` (shadow cubemap / extra passes)  
7. Many dynamic lights on large meshes (fragment cost adds up)  
8. `RectAreaLight` (area sampling; use sparingly)

**Mitigation:** Limit lights, use distance cutoffs where supported, prefer `MeshBasicMaterial` for unlit UI meshes, bake static lighting, use LOD to reduce shadow casters.

---

## AI notes

- Shadow bugs: ask for **both** `renderer.shadowMap.enabled` **and** `light.castShadow` **and** `mesh.receiveShadow` / `castShadow` on objects — incomplete checklists are common in generated snippets.
- Specify **units** (meters vs arbitrary) when asking for bias values — wrong scale produces nonsense.
- For HDR, require **`PMREMGenerator` disposal** and texture disposal to avoid GPU leaks in SPAs.
- RectArea lights require **`RectAreaLightUniformsLib`** init in older patterns; verify current Three.js docs for your version.

---

## Tao moment

Light is not decoration; it is **information**. Shadows tell the user where surfaces meet. Specular tells them what material they touch. Strip the lights down until the story still reads — then add one accent, not ten. The frame is a sentence; every lamp is a word.

---

## Further reading

- [Lights — Three.js manual](https://threejs.org/manual/#en/lights)
- [Shadow maps — Three.js manual](https://threejs.org/manual/#en/shadows)
- [PMREMGenerator](https://threejs.org/docs/#api/en/extras/PMREMGenerator)
- [MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)
