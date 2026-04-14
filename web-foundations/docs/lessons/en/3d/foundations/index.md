# GPU Pipeline, WebGL, WebGPU & the Render Loop

**Phase 1 — Foundations · Lesson 1.1**

> *The screen is not a canvas you paint; it is thousands of tiny workers finishing your sentences all at once. Wisdom is learning which sentences are worth saying—and how many voices you can afford to wake.*

---

## 1. Mental model: what actually happens when you “draw”

When a frontend developer says “render this mesh,” the browser does **not** magically move pixels. It schedules work on a **parallel processor** (the GPU) through a **graphics pipeline** whose modern shape is:

1. **Vertices in** — Your mesh is a list of points (positions, normals, UVs, etc.) usually living in GPU memory as **buffers**.
2. **Vertex stage** — A **vertex shader** runs *once per vertex* (conceptually in parallel). It transforms positions into **clip space** (homogeneous coordinates the GPU understands), and can pass **varyings** (interpolated data) to the next stage.
3. **Primitive assembly** — The GPU connects vertices into triangles (or lines/points, depending on topology).
4. **Rasterization** — Each triangle becomes a set of **fragments** (candidate pixels). This is massively parallel: many fragments are processed at once.
5. **Fragment stage** — A **fragment shader** (WebGL name) / **fragment entry point** in a pipeline (WebGPU) runs *per fragment* to decide color (and often depth). Early-z, stencil, and blending can discard or combine fragments before they hit the framebuffer.
6. **Output merge** — Depth test, stencil, blending, and writes to **render targets** (color attachments, depth buffer).

**Production takeaway:** Your JavaScript runs on the **CPU** and mostly **submits work** and **updates resources**. The heavy lifting—transforming vertices and shading millions of fragments—happens on the GPU. If your frame stutters, the cause is often **too much CPU submission**, **too many state changes**, **bandwidth** (uploads, texture reads), or **shader cost**—not “JavaScript being slow” in the abstract.

### Fixed-function vs programmable stages (why interviews mention this)

Early APIs exposed a lot of **fixed-function** behavior (the GPU decided how lighting worked). Modern pipelines are **programmable** at vertex and fragment stages (and compute sits beside graphics in WebGPU). Fixed-function pieces still exist—**rasterization**, **depth/stencil tests**, **blending**—configured by **pipeline state** rather than shader code.

**Shipping implication:** When a bug is “only on one GPU,” suspect **precision**, **non-uniform control flow**, **derivatives in conditionals**, **blend state**, or **sRGB vs linear** interpretation—not always “your math is wrong on paper.”

### The framebuffer is not magic

What you see on screen is typically a **swap chain** image (WebGPU) or the default framebuffer (WebGL) that the browser **composites** with CSS, video, and other layers. Your 3D canvas can be **opaque** or **alpha-blended** into the page; that choice changes **premultiplication**, **clear values**, and sometimes **performance** (intermediate surfaces).

**Tiny vocabulary cheat sheet**

| Term | Plain English |
|------|----------------|
| **Draw call** | “Use this pipeline + these bindings + draw N instances of this geometry.” |
| **Shader** | A small program that runs on the GPU at a specific pipeline stage. |
| **Framebuffer / render pass** | Where pixels accumulate for a frame (often the swap chain texture you see on screen). |
| **Clip space → NDC → screen** | GPU-internal projection pipeline; libraries like three.js hide the matrix math, not the cost. |

---

## 2. WebGL vs WebGPU: the paradigm shift

### Code examples in this lesson

**CodeSandbox-ready** snippets are complete runnable files or modules. **Excerpt** blocks show API shape only—they omit buffers, shaders, and context setup on purpose; do not paste them expecting a running app.

Both expose the same *physics* (vertices → raster → fragments), but the **CPU-side API design** is different. For a frontend specialist shipping real apps, think in terms of **who owns state** and **how work is recorded**.

### WebGL: implicit global state machine

WebGL 1/2 is built on OpenGL ES concepts: you **bind** objects to **global bind points**, then issue commands.

#### Excerpt — WebGL2 draw sequence (bind order; global state)

```text
// WebGL2 (illustrative) — order matters; hidden global state
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);
gl.bindVertexArray(vao);

gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0);
```

**What bites teams in production**

- **State leakage**: forgetting to unbind or restore state causes bugs that show up “sometimes.”
- **No first-class compute**: you can abuse vertex/fragment tricks, but general GPU compute is not the model.
- **Driver overhead**: the API encourages many small state toggles; drivers work hard to optimize, but you still pay for **state churn**.

Official background: [WebGL API on MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API).

### WebGPU: explicit devices, queues, and encoders

WebGPU is closer to modern APIs (Vulkan/Metal/D3D12): you create a **device**, build **pipelines** and **bind groups**, record commands into **command encoders**, and **submit** batches to a **queue**.

Mental model:

- **`GPUDevice`** — Your connection to the adapter (GPU).
- **`GPUQueue`** — Submission point; work is batched.
- **`GPUCommandEncoder` / `GPURenderPassEncoder`** — Record draws inside **render passes** with explicit **attachments** (color, depth).
- **`GPURenderPipeline`** — Mostly **immutable** configuration: shader modules, vertex layout, blend state, etc.
- **`GPUBindGroup`** — A bundle of resources (uniform buffers, textures, samplers) matching a **layout**.

#### Excerpt — WebGPU render pass and indexed draw (explicit encoder)

```text
// WebGPU (illustrative) — explicit pass + pipeline + bind group
const encoder = device.createCommandEncoder();
const pass = encoder.beginRenderPass({
  colorAttachments: [
    {
      view: context.getCurrentTexture().createView(),
      clearValue: { r: 0.02, g: 0.02, b: 0.05, a: 1 },
      loadOp: 'clear',
      storeOp: 'store',
    },
  ],
  depthStencilAttachment: {
    view: depthTexture.createView(),
    depthClearValue: 1,
    depthLoadOp: 'clear',
    depthStoreOp: 'store',
  },
});

pass.setPipeline(renderPipeline);
pass.setBindGroup(0, frameBindGroup);
pass.setVertexBuffer(0, vertexBuffer);
pass.setIndexBuffer(indexBuffer, 'uint16');
pass.drawIndexed(indexCount);

pass.end();
device.queue.submit([encoder.finish()]);
```

**Why teams adopt WebGPU**

- **Lower CPU overhead** potential when batches are structured well.
- **Compute shaders** as a first-class citizen (`GPUComputePipeline`) — same device/queue story as graphics.
- **Explicit resource lifetimes and layouts** — more boilerplate, fewer “mystery binds.”

Canonical entry point: [WebGPU API on MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) (links into `GPUDevice`, `GPUQueue`, `GPUCommandEncoder`, etc.).

### Side-by-side: same frame, different verbs

| Concern | WebGL2 mental verb | WebGPU mental verb |
|--------|--------------------|--------------------|
| Context/device | `getContext('webgl2')` | `navigator.gpu.requestAdapter()` → `requestDevice()` |
| Swap image | implicit default framebuffer | `context.configure({ device, format, ... })` |
| Clear | `clearColor` + `clear` | `loadOp: 'clear'` on attachments |
| Draw | `drawElements` | `pass.drawIndexed` |
| Uniforms | `uniformMatrix4fv` etc. | uniform buffers / bind groups |
| Textures | `bindTexture` + active texture | `createBindGroup` with sampled texture entries |

Neither table is exhaustive; it is a **translation guide** for reading engine code and debugging captures.

### Binding model (the real productivity cliff)

**WebGL** binding is “bind texture unit 3, bind buffer to ARRAY_BUFFER, set uniform by location…”

**WebGPU** binding is “this pipeline expects **group 0** with these **entries**; here is a `GPUBindGroup` that matches the **layout**.”

Production pattern: **one bind group per “frequency”** of change (per frame vs per material vs per draw) to minimize encoder chatter.

### Compute shaders (why this matters to “frontend 3D”)

Compute is not just for particles. In production WebGPU stacks you see it for **culling**, **skinning**, **morph targets**, **baking**, **IBL preprocess**, and **GPU picking**—work that would otherwise hammer the CPU or require awkward vertex shader hacks.

---

## 3. The render loop: `requestAnimationFrame`, budget, and thieves of time

Browsers paint on a **vsync-aligned** schedule. For **60 Hz**, you have about:

\[
\frac{1000\ \text{ms}}{60} \approx 16.67\ \text{ms}
\]

per frame for **everything** that must complete before a smooth presentation: input, JS, layout (if any), **your 3D frame**, compositing, and the browser’s own work.

#### Excerpt — render-loop skeleton (`update` / `render` are placeholders)

```text
let last = performance.now();

function frame(now) {
  const dt = (now - last) / 1000;
  last = now;

  // 1) Update simulation / animation / camera (CPU)
  update(dt);

  // 2) Record GPU work (CPU) + GPU executes asynchronously
  render();

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
```

### CodeSandbox-ready: minimal `requestAnimationFrame` loop with a visible canvas

Vanilla sandbox: single `index.html` (no extra dependencies). Shows `dt`, resizing, and a moving shape so students see the loop, not only a black canvas.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Minimal render loop</title>
    <style>
      html, body { margin: 0; height: 100%; overflow: hidden; background: #111; }
      canvas { display: block; width: 100%; height: 100%; }
    </style>
  </head>
  <body>
    <canvas id="c" aria-label="Animation demo"></canvas>
    <script>
      const canvas = document.getElementById("c");
      const ctx = canvas.getContext("2d");

      function configureCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
        const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        return dpr;
      }

      let last = performance.now();

      function update(dt) {
        // Replace with physics, input, camera, or scene-graph work.
        return dt;
      }

      function render(now, dt) {
        const dpr = configureCanvas();
        ctx.fillStyle = "#1a1a22";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const t = now * 0.001;
        const cx = canvas.width * 0.5 + Math.sin(t) * (canvas.width * 0.15);
        const cy = canvas.height * 0.5 + Math.cos(t * 0.9) * (canvas.height * 0.12);
        ctx.beginPath();
        ctx.arc(cx, cy, 28 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = "#6cf";
        ctx.fill();
        ctx.fillStyle = "#ccc";
        ctx.font = `${14 * dpr}px system-ui, sans-serif`;
        ctx.fillText("dt: " + dt.toFixed(4) + "s", 12 * dpr, 24 * dpr);
      }

      function frame(now) {
        const dt = (now - last) / 1000;
        last = now;
        update(dt);
        render(now, dt);
        requestAnimationFrame(frame);
      }

      new ResizeObserver(() => configureCanvas()).observe(canvas);
      configureCanvas();
      requestAnimationFrame(frame);
    </script>
  </body>
</html>
```

### What eats the 16.6 ms (typical suspects)

| Bucket | Examples |
|--------|-----------|
| **CPU: scene graph** | Too many objects, per-mesh matrix updates without caching |
| **CPU: allocation** | Creating `new` objects, cloning arrays, string work in hot paths |
| **CPU: driver / API** | WebGL state thrashing; WebGPU encoder overhead if micro-batched poorly |
| **GPU: fill rate / overdraw** | Transparent stacking, huge fullscreen passes, unoptimized post-FX |
| **GPU: bandwidth** | Huge textures, unnecessary mip regeneration, readbacks |
| **Sync points** | `gl.readPixels`, `mapAsync` misuse, forcing CPU to wait for GPU |

**Production discipline**

- Measure with **Performance** panel + **GPU** timing (where available); pair with **fixed camera** tests to separate CPU vs GPU.
- Treat **steady frame time** as a feature: cap expensive effects on low-tier devices.

MDN context for scheduling: [`window.requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).

### `requestAnimationFrame` vs timers vs `resize`

- **`setInterval` / `setTimeout`** — Not vsync-aligned; fine for **network polling**, awkward for **smooth rendering**.
- **`requestAnimationFrame`** — Pauses when the tab is backgrounded (good for battery); use a **last-timestamp** approach so large `dt` does not explode simulations when returning to the tab.
- **Resize** — Listen to `ResizeObserver` on the canvas container; debounce expensive layout reads; call your renderer’s `setSize` / `configure` paths when DPR or dimensions change.

#### Excerpt — backing-store sizing helper + `ResizeObserver` (wire `canvas` / `container` yourself)

```text
function configureCanvas(canvas, cssWidth, cssHeight, maxDpr) {
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  const w = Math.max(1, Math.floor(cssWidth * dpr));
  const h = Math.max(1, Math.floor(cssHeight * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  return { dpr, width: w, height: h };
}

const ro = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;
    configureCanvas(canvas, width, height, 2);
    // Then: renderer.setSize(width, height, false) or WebGPU context.configure(...)
  }
});
ro.observe(container);
```

### Frame budget at other refresh rates

| Display Hz | Budget (ms) |
|------------|----------------|
| 60 | ~16.67 |
| 90 | ~11.11 |
| 120 | ~8.33 |

**Pro tip:** `performance.now()` deltas measure **CPU-side wall time** between rAF callbacks; they do **not** fully capture **GPU queue** behavior. Use browser profiling and (when available) GPU tracks to see overlap.

---

## 4. Draw calls: what they are, why they cost, and how teams fight back

### Definition

A **draw call** is one dispatch of geometry through the pipeline: e.g. `gl.drawElements` / `drawArrays` in WebGL, or `pass.draw` / `pass.drawIndexed` in WebGPU.

Each call carries:

- **Pipeline selection** (shader variant + fixed-function state)
- **Resource bindings** (textures, buffers, uniform sets)
- **Geometry description** (vertex buffers, index buffer, offsets, instance count)

### Why they are expensive

GPUs are fast; **CPUs (and drivers) are often the bottleneck** at **many small draws**. Each call is a **context switch** between “what GPU configuration is active” and “what work runs next.” Engines also **sort** draws to reduce state changes—sorting itself costs CPU.

### Batching strategies (what you actually ship)

1. **Merge static geometry** — Combine meshes that share the same material into one buffer (trade: flexibility vs fewer draws).
2. **Instancing** — One draw, many copies with per-instance attributes or instance buffers (`drawArraysInstanced`, `pass.drawIndexed` with `instanceCount`).
3. **Texture atlases / array textures** — Reduce texture binds; watch **mipmap** and **filtering** edge cases.
4. **Material sorting** — Render opaque front-to-back where helpful; transparent often back-to-front; group by shader.
5. **LOD (level of detail)** — Fewer triangles → fewer vertices shaded → less fragment work.

**Rule:** Prefer **fewer, fatter** draws over **many tiny** draws when CPU is hot.

### Shader variants: the hidden multiplier

Every **material permutation** (fog on/off, skinning on/off, double-sided, different `#ifdef` paths) tends to become another **program** (WebGL) or **pipeline** (WebGPU). Engines **cache** compiled variants, but **first-use hitch** still shows up in production as a stutter.

**Mitigation:** Pre-warm critical materials during loading screens; keep **keyword explosion** under control; prefer **uniform toggles** only when the GPU branch is cheap and the variant count stays stable (profile—don’t guess).

### Debugging draw storms in practice

1. **Freeze animation** — If cost collapses, you are paying for **updates**, not baseline geometry.
2. **Replace materials** with a single **unlit** shader — If FPS jumps, fragment cost or texture bandwidth dominated.
3. **Turn off shadows/post** — Isolates **extra passes**.
4. **Use Spector.js / WebGPU captures / three.js inspector** — Associate **GPU commands** with **scene objects**.

---

## 5. GPU memory model: textures, buffers, and the RAM divide

### Two memory worlds

- **System RAM** — What your JS heap and typed arrays live in (from your perspective as a web author).
- **VRAM (GPU memory)** — Where **large**, **fast-for-GPU-access** resources usually reside once uploaded.

The bridge between them is **bandwidth** and **upload paths**. A 4K uncompressed texture can be “fine” on paper and still **stutter** on first use because of **transcoding**, **upload**, and **mipmap generation**.

### Buffers

Typical uses:

- **Vertex/index buffers** — Mesh data.
- **Uniform/storage buffers** — Frame constants, material params, structured data (WebGPU `GPUBuffer` usage flags make intent explicit).

### Textures and samplers

Textures are **sampled** by shaders (with **samplers** controlling filtering and addressing). Mipmaps reduce **cache thrash** when textures are minified on screen—missing mips can look sparkly and cost performance.

### Readbacks

Moving data **GPU → CPU** is slow and often **stalls** parallelism (`readPixels`, buffer maps). In production UIs, avoid readbacks in the steady-state frame; if you need picking, prefer GPU picking patterns or **async** readback with **a frame delay**.

### Upload patterns you will recognize in prod

- **Static mesh** — Upload once, reuse forever (until LOD swap).
- **Streaming** — Chunk uploads per tile/segment; watch **frame spread** to avoid spikes.
- **Dynamic buffers** — Particle systems, morphs: either **orphan** buffers (`bufferData` with null) on WebGL-style paths or use **ring buffers** / **per-frame staging** patterns appropriate to WebGPU’s explicit queues.

### Memory pressure symptoms

Tab **jank**, **context loss** (WebGL), **device drops**, or **evicted textures** (engine-specific) often trace to **VRAM oversubscription** on integrated GPUs. Your **content budget** is part of UX.

---

## 6. The three.js abstraction layer: mapping ideas to `WebGLRenderer` / `WebGPURenderer`

three.js is a **scene graph** engine: you add `Mesh` objects with `Material` + `Geometry`, lights, cameras. Each frame, the renderer **walks the scene**, **computes matrices**, **sorts** drawables, and issues the underlying API calls.

### Where your concepts appear

| Concept | three.js surface |
|---------|------------------|
| **Draw calls** | Roughly “each renderable item / pass” after sorting & batching (instancing merges draws). |
| **Shaders** | `ShaderMaterial`, `RawShaderMaterial`, or built-in materials compiling to programs/pipelines. |
| **Textures** | `Texture`, `DataTexture`, compressed formats, `colorSpace` choices. |
| **Buffers** | `BufferGeometry` attributes + index buffer. |
| **Post-processing** | Extra render targets and fullscreen passes (`EffectComposer` in examples). |

### WebGLRenderer vs WebGPURenderer

- **`WebGLRenderer`** — Mature path; widest compatibility; traditional WebGL2 backend.
- **`WebGPURenderer`** — Modern path; aligns with WebGPU’s explicit passes and (eventually) compute-heavy features; still evolving across releases.

Docs hub: [three.js documentation](https://threejs.org/docs/).

**Production note:** three.js can hide complexity, but **you still pay for**:

- **Lights and shadows** (extra passes)
- **Physical materials** (more texture fetches, BRDF cost)
- **Transparency** (sorting + overdraw)
- **Post-processing stack** (each pass is real GPU work)

### What happens each frame (simplified)

1. **Update world matrices** from the scene graph (`Object3D.updateMatrixWorld` cascades).
2. **Frustum culling** (on by default for many objects) reduces submitted drawables.
3. **Sorting** for opaque vs transparent pipelines.
4. **Binding** textures, attributes, and shader uniforms/pipeline resources.
5. **Issuing draws** to the underlying API.

**Insight:** Moving an object in the scene graph is cheap; **changing material parameters** or **textures** can be expensive if it prevents batching or triggers recompilation.

### Coordinating with the DOM and React

In React Three Fiber apps, remember: **React reconciliation** runs on the CPU. Keep **rapid per-frame props** from forcing huge subtree work; prefer **refs** and **imperative** three.js updates for hot paths (camera wobble, scrubbing sliders) while still using React for structure.

three.js manual and migration notes (color space, renderer parameters): start from [three.js docs](https://threejs.org/docs/) and follow links for `WebGLRenderer` / `WebGPURenderer`.

---

## 7. Feature detection and graceful degradation (WebGPU → WebGL2)

Ship **capability-based** rendering, not **browser-sniffing** wishful thinking.

### WebGPU probe

#### Excerpt — capability probe (integrate with your engine bootstrap; not a full app)

```text
async function pickRenderer(canvas) {
  if (navigator.gpu) {
    try {
      const adapter = await navigator.gpu.requestAdapter();
      if (adapter) {
        const device = await adapter.requestDevice();
        // If you use three.js: branch to WebGPURenderer with your bootstrap code.
        return { api: 'webgpu', adapter, device };
      }
    } catch (e) {
      console.warn('WebGPU init failed, falling back', e);
    }
  }
  const gl = canvas.getContext('webgl2');
  if (!gl) {
    throw new Error('WebGL2 not available');
  }
  return { api: 'webgl2', gl };
}
```

**Degradation tactics**

- **Disable** expensive effects (SSR, large shadow maps, contact shadows) on WebGL2-only paths.
- **Reduce** render resolution (`setPixelRatio`) on low-tier adapters.
- **Prefer** compressed textures where supported (KTX2/Basis pipelines).

MDN: [`Navigator.gpu`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/gpu) and the broader [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API).

### Capability tiers (a pragmatic product pattern)

#### Excerpt — heuristic tier stub (extend with real limits and benchmarks)

```text
function gpuTier(adapterInfo) {
  // Pseudocode: combine adapterInfo, max texture size, optional benchmarks
  if (!adapterInfo) return 1;
  const desc = `${adapterInfo.vendor} ${adapterInfo.architecture}`.toLowerCase();
  if (desc.includes('swiftshader') || desc.includes('llvmpipe')) return 0;
  return 2;
}
```

Use tiers to select **shadow map resolution**, **DPR cap**, **SSR on/off**, and **texture resolution**. Re-evaluate on **`visibilitychange`** or **`resize`** if users drag windows across displays.

### User-facing messaging

When falling back, avoid shame: **“High performance mode (compatibility)”** beats **“Your GPU is bad.”** Telemetry (opt-in) helps you learn which tiers matter for your content.

---

## 8. Performance implications: “every feature has a GPU cost”

Use this **checklist** when a designer asks for “just one more” effect:

- **Shadows** — Extra render passes from light perspectives; PCF/PCSS softening multiplies samples.
- **High dynamic range + bloom** — Multiple targets, thresholds, blurs.
- **Screen-space effects** — Depend on depth/normals; fragile with transparency and thin geometry.
- **Anisotropic filtering + huge textures** — Bandwidth.
- **MSAA** — Memory and fill rate.
- **Real-time reflections** — Often imply rendering the scene again (or clever probes with their own artifacts).

**The honest product engineering line:** *We can do anything; we cannot do everything at 60fps on a five-year-old laptop.*

### A minimal “cost intuition” table for leads

| Feature | Roughly taxes… | First knob to turn |
|---------|----------------|--------------------|
| Soft shadows | Extra passes + shader samples | Map size, light count, PCF radius |
| SSR | Ray march in screen space | Step count, resolution scale, roughness cutoff |
| PBR + IBL | Texture fetches + BRDF | Mip bias, env resolution, LOD |
| Particles (CPU) | JS + buffer uploads | GPU sim or reduce count |
| Post chain | Fill rate | Half-res passes, merge effects |

Numbers vary by content; the table is for **conversation alignment** with design and product—not for benchmarks.

---

## 9. AI collaboration notes: prompting for GPU work that actually helps

Models are strong at **explaining** pipelines and **sketching** API usage, but they are dangerous when **version drift** or **engine internals** matter. Make prompts **operationally specific**:

1. **Name the API and version** — “WebGL2 + three.js r17x” or “WebGPU + three.js WebGPURenderer”.
2. **Paste the symptom, not the vibe** — “CPU 14ms, GPU 6ms, 4000 draw calls, static scene” beats “it’s laggy.”
3. **Ask for tradeoffs** — “Two ways to batch transparent grass; which breaks sorting?”
4. **Demand citations** — Require links to MDN / three.js docs for anything involving limits, flags, or browser support.
5. **Reject magic** — If the model proposes `readPixels` every frame for hover, ask for a **GPU picking** or **raycast** alternative.

**Good prompt fragment**

> “WebGPU render pass with depth texture; I see Z-fighting only on integrated GPU; here is my depth clear/load ops and compare function—what changed in the spec vs my code?”

### What to verify yourself (always)

- **Browser support matrices** — MDN compatibility data and release notes change quarterly.
- **three.js migration guides** — Renderer defaults move across minors.
- **Precision qualifiers** — Shader compilers ignore your feelings about `mediump`.

### Red flags in model-generated GPU code

- **Synchronous readbacks** “to get the mouse position” every frame.
- **`if (uv.x < 0.5)` branching** in a fragment shader that samples different textures in each branch without **static** selection patterns—can explode into **non-uniform** surprises.
- **Unbounded loops** in shaders “to find the hit”—GPUs hate unbounded work.

Ask the model to **justify** each with **doc links** or mark it as **experimental**.

---

## 10. Tao moment: the closing insight

You were trained to think in **sequential** stories: first this line runs, then the next. The GPU asks you to think in **graphs of parallel work**: rivers of vertices widening into a delta of fragments, all governed by schedules you do not fully control.

The craft is not “learning WebGPU syntax.” The craft is **respecting the machine**: batching humbly, measuring honestly, degrading gracefully—and remembering that every frame is a **negotiation** between what you want to show and how many parallel voices you can afford to raise at once.

When in doubt, **count draws**, **watch bandwidth**, **trim passes**, and **simplify shaders**. The pipeline will meet you halfway—but only if you stop shouting over it.

---

## Further reading (official)

- [WebGPU API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WebGL API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [window.requestAnimationFrame (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [three.js documentation](https://threejs.org/docs/) — `WebGLRenderer`, `WebGPURenderer`, materials, textures, render targets

---

*End of Lesson 1.1 — GPU Pipeline & Render Loop*
