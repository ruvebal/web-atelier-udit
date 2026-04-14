# Asset Pipeline — From Blender to Browser in One Command

> *"The pipeline is invisible architecture. Users never applaud it—until it breaks, and then it is the only thing they feel."*

**Code in this lesson:** Blocks tagged **CodeSandbox-ready** are paste-and-run helpers (browser or Node as noted). Blocks tagged **Excerpt** or **Template** need paths, CI layout, or project wiring adjusted.

---

## Why the pipeline matters more than the hero shader

A beautiful BRDF means nothing if the **glTF** arrives bloated, textures decode on the main thread, and the CDN serves **uncacheable** URLs. Frontend specialists own the **last mile**: how bytes become **GPU memory** under **latency** and **thermal** constraints.

This lesson frames **glTF 2.0** as the delivery contract, **gltf-transform** as the Swiss Army CLI, and **CI** as the enforcement layer that stops artists (and past-you) from shipping multi-hundred-megabyte mistakes.

---

## glTF ecosystem: `.gltf` vs `.glb` and extensions

- **`.gltf` + separate bin/textures**: human-diffable, awkward for many small files.
- **`.glb`**: single binary container; **preferred** for CDN caching and atomic deploys.

**Extensions** you will actually meet:

- **`KHR_draco_mesh_compression`**: smaller transmission; **decode cost** on CPU/WASM.
- **`EXT_meshopt_compression`**: often better **decode speed** and size tradeoffs for web.
- **`KHR_texture_basisu`**: KTX2 / Basis Universal textures inside glTF.
- **`KHR_materials_clearcoat`**, **`transmission`**, **`sheen`**: PBR richness; verify three.js support matrix before relying on them in production.

**Excerpt** — Point URLs at your built variants; implement `supportsMeshopt` / `supportsDraco` from runtime probes.

```js
// Runtime: feature-detect extension support before choosing which asset variant to load.
export const gltfVariants = {
  meshopt: '/models/product.meshopt.glb',
  draco: '/models/product.draco.glb',
  fallback: '/models/product.fallback.glb',
};

export function pickVariant({ supportsMeshopt, supportsDraco }) {
  if (supportsMeshopt) return gltfVariants.meshopt;
  if (supportsDraco) return gltfVariants.draco;
  return gltfVariants.fallback;
}
```

---

## gltf-transform CLI: one command, many sins forgiven

[`gltf-transform`](https://gltf-transform.donmccurdy.com/) is a **Node** CLI and library for lossless and lossy operations.

Typical commands (names may vary slightly by version—check `--help`):

```bash
# Inspect: know your enemy
npx gltf-transform inspect input.glb

# Resize textures, compress, prune unused accessors
npx gltf-transform resize input.glb resized.glb --width 1024 --height 1024
npx gltf-transform etc1s resized.glb etc1s.glb
npx gltf-transform prune etc1s.glb final.glb
```

**Philosophy:** run **inspect** in CI and **fail** the build when limits exceed team budgets (texture size, triangle count, extension presence).

---

## Draco vs meshopt: when to use which

| | Draco | meshopt |
|---|--------|---------|
| **Decode** | WASM/JS, can be noticeable on huge meshes | Usually faster on web targets |
| **Compression** | Strong on geometry | Strong; tuned for GPU-friendly layouts |
| **Risk** | Older pipelines know it | Slightly newer extension path |

**Rule of thumb:** prefer **meshopt** for **large** web scenes when your runtime supports `MeshoptDecoder`. Keep **Draco** as a **fallback** variant or for toolchain compatibility. Always ship a **third** uncompressed or lightly compressed fallback for **exotic** environments during beta.

**Excerpt** — Set `dracoPath` to your hosted Draco decoder WASM folder (matches three.js examples layout).

```js
// three.js side: register the decoder once at app bootstrap.
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function makeGLTFLoader(renderer, dracoPath) {
  const loader = new GLTFLoader();
  const draco = new DRACOLoader();
  draco.setDecoderPath(dracoPath);
  loader.setDRACOLoader(draco);
  loader.setMeshoptDecoder(MeshoptDecoder);
  return loader;
}
```

---

## KTX2 in glTF: `KHR_texture_basisu`

Basis Universal inside KTX2 gives you **transcodable** GPU textures. In three.js, `KTX2Loader` + Basis transcoder WASM bridge does the heavy lifting.

Pipeline goals:

- **Author** once in PNG/EXR/TGA in DCC; **convert at build** to KTX2.
- Choose **ETC1S** vs **UASTC** per texture role (albedo vs normal/detail)—see the dedicated KTX2 lesson in this corpus.

```bash
# Example: gltf-transform can integrate with texture compression workflows.
# Exact flags depend on your installed codecs and version.
npx gltf-transform etc1s model.glb model-etc1s.glb
```

**Gotcha:** normal maps and **alpha** textures need careful encoding settings; a “successful” encode can still look **mushy** or **noisy** if channels are wrong.

---

## Texture preparation: resize, channels, mips

- **Power-of-two** is less mandatory than in WebGL1 days, but **mips** and **compression** still behave better on **sane** dimensions.
- **Resize** based on **on-screen** footprint: a 4K albedo for a phone icon is malpractice.
- **Channel pack** metallic/roughness/AO when your material model allows it—fewer samplers, fewer state changes.
- **Mip generation**: let tools generate mips for **minification** stability; shimmering distant surfaces are often **missing mips** or wrong **gamma**.

**CodeSandbox-ready** — Approximate mip chain size (~4/3 of base).

```js
export function estimateTextureVRAM(width, height, bytesPerTexel) {
  // Crude mip chain sum: ~4/3 of base level.
  const base = width * height * bytesPerTexel;
  return (base * 4) / 3;
}
```

---

## Blender export settings that actually matter

- **Apply transforms** before export (scale 1,1,1 in the root you ship).
- **Y-up / forward** axis conventions: glTF is **Y-up**; fix in Blender’s glTF exporter.
- **Triangulate**—ngons are not your friend in real-time.
- **Bake modifiers** you intend to be static; keep armatures if you need skinning.
- **Material**: Principled BSDF maps map cleanly to glTF PBR when names/connections are disciplined.
- **Disable** experimental nodes that do not translate—verify in **three.js** viewer after export.

---

## CI/CD: GitHub Actions sketch

Fail builds on **budgets**; do not “warn” forever.

**Template** — Copy into `.github/workflows/gltf-check.yml`; change `paths`, Node version, and the glob in the `for` loop to match your repo.

```yaml
# .github/workflows/gltf-check.yml (illustrative)
name: gltf-check
on:
  push:
    paths:
      - 'assets/models/**'
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install -g @gltf-transform/cli
      - name: Inspect all glbs
        run: |
          set -euo pipefail
          for f in assets/models/*.glb; do
            echo "== $f =="
            gltf-transform inspect "$f"
          done
```

Pair this with a **custom script** that parses `inspect` JSON (if you use the **library** API) and asserts:

- `textures[].resolution` max
- `meshes[].primitives[].indices` / vertex counts
- presence of **forbidden** extensions

---

## CDN strategies for 3D assets

- **Content-hash filenames** (`hero-a3f9c2.glb`) for **immutable** caching.
- **`Cache-Control: public, max-age=31536000, immutable`** on hashed assets.
- **Versioned** directories when you must invalidate groups: `/v3/...`
- **Preload** only **hero** assets; defer the rest with `requestIdleCallback` or route-based splitting.
- **HTTP Range**: large files may benefit from **range** caching at CDNs; confirm your loader behavior (most glTF loaders fetch the whole GLB—still fine if the file is right-sized).

**CodeSandbox-ready** — DOM preload link; call once per critical GLB URL.

```js
export function preloadGLB(url) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'fetch';
  link.crossOrigin = 'anonymous';
  link.href = url;
  document.head.appendChild(link);
}
```

---

## Asset budgets (starting points, tune per project)

| Tier | Triangles (on screen) | Albedo res | Total glTF (gzip) |
|------|------------------------|------------|-------------------|
| Mobile hero | 150k–400k | 1k–2k | < 3–8 MB |
| Desktop hero | 500k–2M | 2k–4k | < 15–40 MB |

These are **order-of-magnitude** guardrails, not laws. **Overdraw**, **lights**, and **post-processing** burn the budget faster than triangles. Always pair **geometry** budgets with **shader** and **texture** budgets.

**Excerpt** — Tune numbers to your team’s `PERF_BUDGETS` doc.

```js
export const budgets = {
  maxAlbedoResolution: 2048,
  maxTrianglesScene: 750000,
  maxDracoDecodeMsMobile: 120,
};
```

---

## One-command pipeline script (Node-friendly)

**CodeSandbox-ready** — Save as `scripts/gltf-pipeline.mjs`, run with Node 18+; requires `npx` / network for `gltf-transform` unless installed locally.

```js
#!/usr/bin/env node
import { execSync } from 'node:child_process';

const [,, input, output] = process.argv;
if (!input || !output) {
  console.error('usage: pipeline.mjs input.glb output.glb');
  process.exit(1);
}

function run(cmd) {
  console.error(cmd);
  execSync(cmd, { stdio: 'inherit' });
}

run(`npx gltf-transform inspect "${input}"`);
run(`npx gltf-transform prune "${input}" "${output}.pruned.glb"`);
run(`npx gltf-transform dedup "${output}.pruned.glb" "${output}.dedup.glb"`);
run(`npx gltf-transform etc1s "${output}.dedup.glb" "${output}"`);
```

Wrap with **npm scripts** so designers can run `npm run assets:build`.

**Excerpt** — Merge into your `package.json` `scripts`; fix paths to real GLB files.

```json
{
  "scripts": {
    "assets:inspect": "gltf-transform inspect assets/models/*.glb",
    "assets:build": "node scripts/gltf-pipeline.mjs assets/models/src/hero.glb assets/models/dist/hero.glb"
  }
}
```

---

## LOD packaging: multiple glTFs vs single file

**Multiple GLBs per LOD** (hero LOD0, LOD1, LOD2) are simple to reason about and **stream** independently:

**Template** — Replace URLs; implement real distance logic and dispose unused LODs in your loader.

```js
export const lodUrls = [
  '/models/hero-lod2.glb',
  '/models/hero-lod1.glb',
  '/models/hero-lod0.glb',
];

export async function loadLOD(loader, camera, root) {
  // Pseudocode: swap when distance thresholds cross.
  const d = camera.position.length();
  const idx = d > 20 ? 0 : d > 8 ? 1 : 2;
  return loader.loadAsync(lodUrls[idx]);
}
```

**MSFT_lod** and similar extensions exist but **ecosystem support** in three.js tooling varies; most teams ship **explicit** LOD files until a standard path is boringly reliable.

---

## Validation: catch broken assets before merge

- **Khronos glTF Validator** (CLI or VS Code extension) for spec conformance.
- **three.js editor** or **gltf-viewer.donmccurdy.com** for eyeballing.
- **Automated renders** (headless or screenshot tests) catch **alpha** and **normal** regressions that validators miss.

---

## Security and supply chain

- Treat `.glb` from untrusted sources like **any binary**: scan, sandbox artist laptops, pin CLI versions in CI.
- **Remote textures** inside `.gltf` JSON can phone home—prefer **self-hosted** bundles for production.
- Lock **WASM decoders** (Draco, Basis) to **pinned** versions in `package-lock.json`.

---

## Environment and lighting assets

IBL often ships as **HDR** or **preconvolved** environment maps. Keep **separate** pipeline steps:

- Convert HDR to **PMREM-friendly** sizes.
- Do not accidentally **double-linearize** color—**color space** bugs look like “muddy PBR”.

---

## AI notes (working with copilots)

- Paste **gltf-transform inspect** output and ask for **specific** optimizations—generic “optimize glTF” yields vague advice.
- Have AI generate **CI assertions** from your **written** budgets, not the other way around.
- When the model suggests **double Draco + meshopt**, sanity-check: you usually pick **one** geometry compression strategy per primitive, not both stacked blindly.
- Ask for **Blender Python** export snippets only if you actually run them; otherwise stay CLI-first.

---

## Tao moment

The visible scene is **the tip**. The pipeline is **the iceberg**—texture layouts, decoder WASM, CDN headers, and the quiet **`dispose()`** when the user navigates away. Treat every asset as a **promise** you make to the user’s RAM: small enough to keep, honest enough to load, and versioned enough to **let go** when the story ends.

---

## Further reading

- [glTF 2.0 specification](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html)
- [gltf-transform documentation](https://gltf-transform.donmccurdy.com/)
- [meshoptimizer](https://github.com/zeux/meshoptimizer)
- [Google Draco](https://google.github.io/draco/)
- [KTX 2.0 specification](https://github.com/KhronosGroup/KTX-Specification)
