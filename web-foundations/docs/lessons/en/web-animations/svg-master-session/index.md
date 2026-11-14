---
layout: lesson
title: 'SVG Animation Master Session: Motion, Interaction, and Depth'
title_alt: 'SVG Animation Master Session'
slug: svg-master-session
date: 2026-11-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/web-animations/svg-master-session/
---

<aside class="lesson-framing" aria-label="Master idea and studio test">
<p><strong>Master idea:</strong> the best animation is the simplest technique that achieves the intended motion, remains understandable, and respects the people who use the page.</p>
<p><strong>Studio test:</strong> compare the same ruvebal favicon reveal across native SVG/CSS and JavaScript approaches, then defend the best result for this landing page.</p>
</aside>

## Brief

The Web Atelier favicon is the source artwork for this session. Its 13 cleaned facets use the course palette (navy, blue, violet, and chartreuse). The browser favicon keeps a slow, self-contained CSS colour cycle. The larger landing mark reads those same paths into Canvas: the whole plane follows the pointer, facets separate along projected Z, colours rotate with a stagger, and clicking a visible facet toggles its inversion. This Canvas interaction is decorative rather than a keyboard control; reduced motion and script failure retain the static SVG. Navigation and comparison examples use a separate static copy so the loop cannot bias the baseline.

Open the [interactive technique comparison]({{ '/lessons/en/web-animations/svg-master-session/demo/' | relative_url }}). Round 1 gives CSS transition/keyframes, SMIL, WAAPI, GSAP, Motion, and Anime.js the same reveal task and timing. Round 2 gives them different motion tasks that fit their strengths. Round 3 asks how the same techniques receive, store, interrupt, and coordinate facet-level input. Round 4 separates flat SVG motion, CSS 3D planes, mathematical 2.5D projection, GPU-backed 2D rendering, and genuine depth-tested scenes. A short audio-sync bridge maps those same techniques onto the Web Audio clock and Rive/AnimaScript’s WASM audio lane—without turning this page into a full Web Audio master lesson. The authored-asset showreel plays generated Lottie JSON and a dotLottie v2 package, including timeline scrubbing and variant switching. Its Rive sequence now has four deliberately different specimens: an RML timeline/state machine, exact favicon paths drawn procedurally in 2D AnimaScript, a signed Rive + AnimaScript GPU Canvas scene whose thirteen triangular prisms unfold through real Z, lighting, and occlusion, and an AnimaScript `AudioProcessor` hum you can hear on the demo card after a click (CLI-rendered WAV → page `AudioContext`).

The comparison opens as a full page rather than a modal. Its wide stages, long-form evidence, browser history, and shareable URL are useful here; placing the same material in a focus-trapped overlay would introduce nested scrolling without improving the task. A compact, theme-aware section rail and proximity snap points preserve orientation without forcing every scroll gesture to stop.

## Learning outcomes

By the end of the session, students can:

- explain when an SVG must be inline to target its internal paths from page CSS or JavaScript;
- compare CSS transitions, CSS keyframes, SVG SMIL, WAAPI, GSAP, Motion for JavaScript, and Anime.js on the same visual task;
- distinguish direct DOM interaction, timeline control, packaged state machines, and authored runtime logic;
- distinguish a Rive state machine from custom AnimaScript logic compiled to WebAssembly, including an `AudioProcessor` audio lane;
- distinguish an animation technique from an exported format, player, or authoring runtime;
- distinguish a GPU rendering backend from a scene that actually owns depth, cameras, lights, materials, and occlusion;
- classify CSS 3D planes, SVG/Canvas 2.5D projection, and WebGL mesh rendering without calling them equivalent;
- name which animation techniques can lock to the Web Audio clock (or a WASM audio lane) versus which only approximate it;
- select a solution using visual fit, code clarity, delivery cost, and accessibility rather than library fashion;
- produce and justify a reduced-motion-safe ruvebal favicon for a landing page.

## Technique map

<aside class="lesson-emphasis lesson-emphasis--concept" aria-label="Key concept">
<p class="lesson-emphasis__label">Key concept</p>
<p><strong>Animation properties are widely shared; control models are not.</strong> Start by deciding whether the page, the SVG document, or an exported runtime should own timing, state, and interaction.</p>
</aside>

| Technique | What it animates here | Strength | Cost or limit |
| --- | --- | --- | --- |
| CSS transition | Opacity on inline SVG paths, with per-path delay | Smallest code and no runtime dependency; excellent for state changes such as hover/focus | Sequencing and replay state need careful CSS/DOM setup |
| CSS keyframes | The same path opacity reveal | Declarative fixed sequences with named offsets and repeated patterns | More choreography means more keyframes and selectors; SVG transform support needs deliberate testing |
| SVG SMIL | Path opacity with SVG `<animate>` elements | Self-contained in the SVG and no animation library | Longer sequences and external user controls are less convenient; animation embedded in an asset also runs wherever that animated asset is used |
| Web Animations API (WAAPI) | The same paths, with delay and replay controls | Native playback controls, dynamic timing, seeking, and no dependency | The developer still writes timing, orchestration, and DOM targeting |
| GSAP | Staggered path reveal in a timeline | Clear sequencing, labels, easing, reversal, and interruption; already taught in FE I Session 11 | Adds a runtime for a very small effect; use it when choreography earns that cost |
| Motion for JavaScript | Staggered path reveal with `animate()` and `stagger()` | Compact modern API, spring physics, and gesture response; works without React | Another dependency and API to learn when the CSS or WAAPI version already suffices |
| Anime.js | Staggered path reveal with `animate()` and `stagger()` | Expressive targets, sequencing, and SVG line-drawing helpers | Another dependency; an equivalent result is already available in the course's GSAP path |
| Canvas 2.5D | A translated field whose `x/y/z` values are projected to a 2D canvas | Many shapes, seeded depth, camera response, and bounded draw cost without a 3D engine | No SVG DOM, no depth buffer, and manual hit testing, sorting, projection, and accessibility |
| Lottie | Generated vector animation exported to Lottie JSON and rendered in the showreel | Portable motion-design format; can animate each facet with independent timing | Separate artwork/animation representation and player; JSON is 38 KB before transfer compression |
| dotLottie | Two Lottie animations packaged in a v2 archive and played on canvas | Packages brand/night variants together; one 14 KB archive in this lesson | Still a Lottie player and archive, not a way to animate existing SVG DOM nodes |
| Rive | Generated RML source with a one-shot animation and state-machine entry | Authored state-driven behavior; the current Rive platform can also own vector, raster, and native 3D scenes | This lesson's RML is intentionally 2D; signed `.riv` export is account-gated and web 3D support must be verified per runtime |
| Rive + AnimaScript | The same 14 canonical paths rebuilt through Rive `Path`, then fitted and pulsed procedurally | Typed custom drawing and runtime logic that travels with the Rive project and compiles to WebAssembly | It is neither DOM JavaScript nor a shortcut around Rive authoring, verification, runtime, signing, and accessibility integration |
| Rive + AnimaScript GPU Canvas | Thirteen instanced triangular prisms driven by AnimaScript and shaded in WGSL | One `.riv` packages the loop, GPU geometry, perspective projection, normals, lighting, depth testing, and palette | Requires the GPU-enabled Rive WebGL2 runtime; host HTML still owns fallback, accessibility, and reduced-motion policy |
| Three.js reference | Converts SVG paths into shapes or extruded meshes in a camera scene | Genuine geometry, materials, lighting, depth testing, and camera control through WebGL | It is a 3D renderer/scene graph, not an SVG animation technique; conversion loses SVG DOM semantics |

CSS, SMIL, and WAAPI are browser-native comparisons. GSAP, Motion, and Anime.js are JavaScript animation libraries. Lottie, dotLottie, and Rive are authored asset/runtime choices. AnimaScript belongs inside the Rive toolchain: it uses TypeScript-like syntax but is statically typed, has no DOM, and compiles to WebAssembly. Keep those categories separate when students score them. Current platform/library details: [MDN on SVG embedding](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Including_vector_graphics), [MDN on SVG SMIL](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_animation_with_SMIL), [MDN on WAAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API), [GSAP installation](https://gsap.com/docs/v3/Installation/), [Motion quick start](https://motion.dev/docs/quick-start), [Anime.js animation API](https://animejs.com/documentation/animation/), [dotLottie web runtime](https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x), [Rive web use cases](https://rive.app/use-cases/websites), and [AnimaScript introduction](https://rive.app/rasc/docs/introduction.html).

### Current platform signal

Native CSS continues to gain expressive tools, including scroll-driven timelines; the 2025 State of CSS survey tracked these emerging features with 5,506 respondents. That is a signal to teach browser-native choices first, not a reason to use scroll motion on a logo. Path morphing via CSS `d: path()` remains non-Baseline in MDN compatibility data, so this session avoids it as a default technique. Likewise, SVG import into Lottie is artwork preparation, not automatic animation: a designer must still author the motion and export it. ([State of CSS 2025 methodology](https://2025.stateofcss.com/en-US/about/), [MDN CSS `d` compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/d), [LottieFiles SVG import](https://docs.lottiefiles.com/en/integrations/after-effects/03_import/importing-from-file))

## Round 4: 3D compatibility—renderer is not scene model

<aside class="lesson-emphasis lesson-emphasis--caution" aria-label="Critical distinction">
<p class="lesson-emphasis__label">Critical distinction</p>
<p><strong>WebGL is a backend, not proof of three-dimensional content.</strong> A player can draw a flat vector timeline through WebGL or WebGPU and still have no camera, mesh, material, light, Z-buffered scene, or 3D authoring model.</p>
</aside>

The phrase “3D compatible” hides three different questions:

1. **Can the timing engine animate numeric values?** GSAP, Motion, and Anime.js can drive properties belonging to another renderer. They do not become renderers by doing so.
2. **Can the browser composite flat elements in a shared perspective?** CSS transforms can arrange HTML or SVG wrappers as intersecting planes. The elements remain flat surfaces with no thickness.
3. **Does the asset/runtime own a genuine 3D scene?** Three.js/WebGL and current Rive 3D can own cameras, lights, geometry, materials, shaders, and depth. That is categorically different from 2.5D projection.

<figure class="spatial-stack-figure" aria-labelledby="spatial-stack-caption" markdown="0">
<div class="spatial-stack-figure__scene" aria-hidden="true">
<div class="spatial-stack-figure__layer spatial-stack-figure__layer--timing"><span>Timing</span><small>CSS · WAAPI · GSAP · Motion · Anime.js</small></div>
<div class="spatial-stack-figure__layer spatial-stack-figure__layer--model"><span>Spatial model</span><small>2D · CSS planes · projected 2.5D · mesh scene</small></div>
<div class="spatial-stack-figure__layer spatial-stack-figure__layer--renderer"><span>Renderer</span><small>SVG · Canvas 2D · WebGL/WebGPU · Rive Renderer</small></div>
</div>
<figcaption id="spatial-stack-caption"><strong>Ask in this order:</strong> who owns time, who owns space, and who draws the pixels? Choosing WebGL answers only the third question.</figcaption>
</figure>

### Spatial compatibility matrix

| Technique/runtime | Flat SVG facets | CSS 3D planes | Can drive an external 3D scene? | Own native 3D geometry? | Honest classification |
| --- | --- | --- | --- | --- | --- |
| CSS transitions/keyframes | Excellent | Yes, on wrappers or DOM planes | No application-object bridge | No | 2D or planar 3D compositing |
| SVG SMIL | Excellent and portable | Not its native transform model | Only through host event/code bridging | No | SVG 2D; `animateTransform` exposes translate, scale, rotate, skew |
| WAAPI | Excellent playback control | Yes, through CSS transform keyframes | Indirectly; `Element.animate()` targets DOM presentation, not arbitrary scene objects | No | DOM/CSS animation clock |
| GSAP | Excellent | Yes | Yes; it tweens arbitrary object properties, including Three.js object values | No | Renderer-neutral timing/orchestration engine |
| Motion | Excellent | Yes | Yes; its official Three.js integration targets objects, materials, cameras, and uniforms | No | Renderer-neutral motion engine with a Three.js bridge |
| Anime.js | Excellent | Yes | Yes; Anime.js ships a Three.js adapter | No | Renderer-neutral motion engine with adapters |
| Canvas 2D projection | Artwork must be translated to paths/primitives | Not applicable | It can share values, but draws its own projected 2D result | No Z-buffer or mesh scene | **2.5D**: `x/y/z` math projected to pixels, then manually sorted |
| Lottie / dotLottie | Re-authored vector timeline | Player-level plane only | Not as a scene-object API | No general 3D scene; 3D layers, cameras, and lights remain unsupported/unsafe | GPU-backed **2D** when using WebGL2/WebGPU renderers |
| Rive | Re-authored Rive vector or GPU Canvas scene | Component can be positioned as a plane | Its own state, AnimaScript, shaders, and runtime | **Yes in the current Rive platform**: geometry, cameras, lights, shaders, and depth | Authored 2D/3D engine; this lesson includes two 2D Rive assets and one true-3D GPU Canvas specimen |
| Three.js / WebGL reference | SVG paths must be parsed and converted | Canvas itself can be a page plane | It is the scene being driven | **Yes** | Genuine camera/mesh/material/depth scene |

Sources and current capability evidence: [CSS Transforms Level 2](https://www.w3.org/TR/css-transforms-2/) explicitly says transformed elements remain flat planes; [SVG `animateTransform` types](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/type) remain 2D; [GSAP can animate any object property](https://gsap.com/docs/v3/GSAP/gsap.to%28%29/); [Motion's Three.js integration](https://motion.dev/docs/three) targets objects, materials, cameras, and shader uniforms; [Anime.js adapters](https://animejs.com/documentation/adapters/) include Three.js; [LottieFiles advises avoiding 3D layers, cameras, and lights](https://help.lottiefiles.com/supported-after-effects-features), even though [dotLottie offers WebGL2 and WebGPU renderers](https://docs.lottiefiles.com/en/runtimes/distributions/react/v0.x/gpu-rendering); [Rive now describes vector, raster, and 3D in one scene](https://rive.app/); and [Three.js SVGLoader](https://threejs.org/docs/pages/SVGLoader.html) explicitly converts SVG paths into Three.js shapes.

### Four code shapes for depth

**1. CSS 3D: the complete SVG is still one flat plane.**

```css
.scene { perspective: 700px; }
.svg-plane {
  transform-style: preserve-3d;
  transform: rotateX(-8deg) rotateY(18deg) translateZ(40px);
}
```

This is economical for a card, cover, or whole mark. It does not extrude paths or add thickness. Opacity, filters, clipping, and other grouping properties can also force descendants to flatten.

**2. Canvas 2.5D: project coordinates, then sort them yourself.**

```js
const scale = fov / (fov + z);
const screenX = centerX + rotatedX * scale;
const screenY = centerY + rotatedY * scale;

cells.sort((a, b) => b.projectedZ - a.projectedZ); // painter order
cells.forEach(drawProjectedPolygon);
```

This is the economical answer for the course's hexagonal field: it needs camera response and many independent cells, but not lighting, mesh intersections, or a general 3D engine.

### 2.5D UX: evidence, restraint, and the flotation metaphor

There is no universal “comfortable damping value” for pointer-responsive depth. Separate what the evidence actually establishes from what the designer must tune:

- **Standards:** WCAG 2.2 [Success Criterion 2.3.3, Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions) is Level AAA and explicitly includes parallax-like motion that can trigger vestibular symptoms. Non-essential interaction motion must be suppressible. [SC 2.2.2, Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide) is Level A when automatic movement lasts more than five seconds beside other content.
- **Platform guidance:** Apple's [Motion guidance](https://developer.apple.com/design/human-interface-guidelines/motion) asks for purposeful, optional, brief motion and warns against sustained oscillation near 0.2 Hz; its [Reduced Motion criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria) explicitly name parallax and depth simulation. This is valuable design guidance, not a web conformance rule.
- **Web evidence:** Frederick et al.'s study of 86 participants found a parallax site more fun, but not broadly more usable; two participants reported motion sickness or usability problems. The study concerns scrolling parallax, not proof that a shallow pointer-tilted favicon has the same effect ([Journal of Usability Studies paper](https://uxpajournal.org/wp-content/uploads/sites/7/pdf/JUS_Frederick_Feb2015.pdf)).
- **Implementation fact:** SVG and Canvas use painter-style ordering; Canvas therefore needs an explicit far-to-near sort when facets move in projected depth ([SVG rendering model](https://svgwg.org/svg2-draft/render.html), [Canvas compositing](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)). Three.js documents damping in [OrbitControls](https://threejs.org/docs/pages/OrbitControls.html), but that API does not prescribe a UX optimum.

For a soft return, model each camera value as a damped spring rather than tying it directly to pointer coordinates:

```js
// x'' + 2ζωx' + ω²(x - target) = 0
velocity += (frequency ** 2 * (target - value)
  - 2 * damping * frequency * velocity) * dt;
value += velocity * dt;
```

`damping ≈ 1` is a critically damped starting point: little or no overshoot, frame-rate-independent when `dt` is bounded, and a gentle return to the exact frontal mark. This is physics-inspired interaction design, not a claim that the icon is a physical body.

The production mapping also follows a **foveal centre rule**: pointer displacement is measured from the favicon's own centre, not the page or hero centre. The landing mark listens across the viewport, so its 2.5D composition continues to respond after the pointer leaves the icon; actual icon hover remains a separate signal that yields the background camera. A small central dead zone produces exactly zero camera response; outside it, `smoothstep()` raises the gain nonlinearly toward the viewport perimeter. Yaw, pitch, depth, and plane travel all use that gain. Facet extrusion has its own multiplier, while perspective scale remains clamped, so depth can increase without a near facet suddenly dominating:

```js
const radius = Math.min(1, Math.hypot(pointerX, pointerY));
const t = clamp((radius - deadZone) / (1 - deadZone));
const gain = t * t * (3 - 2 * t);

target.yaw = pointerX * gain * yawAmplitude;
target.depth = gain;
projectedZ *= extrusionStrength;
perspective = clamp(rawPerspective, 0.94, 1.06);
```

**Pen-tablet note:** a Wacom pen can emit tiny, high-frequency pointer excursions while the hand is visually still. The camera therefore conditions input separately from facet hit testing: the camera dead zone is intentionally larger (`0.24` here), and the normalized pointer vector is low-pass filtered at `0.08` before yaw, pitch, depth, and plane travel are derived. Raw coordinates remain available for precise facet selection. This removes eye-seeking micro-motion without making deliberate pen gestures feel unresponsive.

<aside class="lesson-emphasis lesson-emphasis--concept" aria-label="Flotation model boundary">
<p class="lesson-emphasis__label">Flotation is a metaphor</p>
<p>A sine wave or spring can suggest buoyancy, but true flotation would integrate mass, gravity, displaced-fluid buoyancy, drag, collisions, and a stable time step. The production mark keeps camera response, per-shape displacement recovery, ambient flotation, and pointer position as separate channels. The background interpolates a rendered interaction point toward the latest mouse or touch sample and retains that position when events cease. Its neutral origin is the live centre of the favicon: local displacement and camera gain become exactly zero inside a small radial dead zone, then grow smoothly with distance. Favicon hover alone never resets the background; the actual filtered position eases it toward rest only as the pointer approaches that centre. Competing scroll-camera targets pause, while the animation clock and low-amplitude levitation continue.</p>
</aside>

**3. A timing library can drive a scene without rendering it.**

```js
// GSAP: any numeric object property
gsap.to(mesh.rotation, { y: Math.PI * 2, duration: 2 });

// Motion after registering motion/three
animate(mesh, { rotateY: 180, z: 1.2 }, { type: "spring" });

// Anime.js after importing animejs/adapters/three
animate(mesh.rotation, { y: Math.PI * 2, duration: 2000 });
```

In all three cases, Three.js still owns the camera, mesh, material, render loop, and WebGL context.

**4. True SVG-to-WebGL conversion creates new geometry.**

```js
const { paths } = await new SVGLoader().loadAsync(svgUrl);
const group = new THREE.Group();

for (const path of paths) {
  for (const shape of path.toShapes(true)) {
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: 12 });
    group.add(new THREE.Mesh(geometry, materialFor(path.color)));
  }
}
scene.add(group);
```

The result is no longer the original SVG DOM. It is a Three.js scene derived from the SVG's path geometry, so page semantics and facet-level accessibility must be rebuilt outside the canvas.

### Technology identities

<div class="technology-atlas" role="list" aria-label="Official technology website favicons" markdown="0">
<a role="listitem" href="https://developer.mozilla.org/" class="technology-atlas__item"><img src="{{ '/assets/images/technology-favicons/mdn.svg' | relative_url }}" alt=""><span>Web platform<br><small>CSS · SVG · WAAPI</small></span></a>
<a role="listitem" href="https://gsap.com/" class="technology-atlas__item"><img src="{{ '/assets/images/technology-favicons/gsap.svg' | relative_url }}" alt=""><span>GSAP</span></a>
<a role="listitem" href="https://motion.dev/" class="technology-atlas__item"><img src="{{ '/assets/images/technology-favicons/motion.svg' | relative_url }}" alt=""><span>Motion</span></a>
<a role="listitem" href="https://animejs.com/" class="technology-atlas__item"><img src="{{ '/assets/images/technology-favicons/animejs.png' | relative_url }}" alt=""><span>Anime.js</span></a>
<a role="listitem" href="https://lottiefiles.com/" class="technology-atlas__item"><img src="{{ '/assets/images/technology-favicons/lottiefiles.png' | relative_url }}" alt=""><span>LottieFiles</span></a>
<a role="listitem" href="https://www.dotlottie.io/" class="technology-atlas__item"><img src="{{ '/assets/images/technology-favicons/dotlottie.ico' | relative_url }}" alt=""><span>dotLottie</span></a>
<a role="listitem" href="https://rive.app/" class="technology-atlas__item"><img src="{{ '/assets/images/technology-favicons/rive.ico' | relative_url }}" alt=""><span>Rive</span></a>
<a role="listitem" href="https://threejs.org/" class="technology-atlas__item"><img src="{{ '/assets/images/technology-favicons/threejs.ico' | relative_url }}" alt=""><span>Three.js</span></a>
</div>

The icons above are the official website favicons, stored locally for a stable classroom page and used nominatively. Their source URLs and retrieval record live beside the files.

## Audio sync bridge: Rive, AnimaScript processors, and the other clocks

<aside class="lesson-emphasis lesson-emphasis--concept" aria-label="Key concept">
<p class="lesson-emphasis__label">Key concept</p>
<p><strong>Rive is where this session’s techniques meet sample-accurate sound.</strong> Authored <em>audio events</em> ride the web runtime’s <code>AudioContext</code>. <strong>AnimaScript audio processors</strong> go further: they render interleaved samples on the audio thread (AudioWorklet on the web), so motion and tone can share one WASM artifact’s clock. That is the “own WebAssembly” answer — not a DOM tween chasing <code>HTMLMediaElement.timeupdate</code>.</p>
</aside>

This session already asks *who owns time, who owns space, who draws the pixels?* Sound adds a fourth owner: **who owns the audible sample clock?** Among the techniques on this page, only **Rive** can package that clock *inside the asset*. Everyone else either **follows** an external Web Audio / media clock or **reacts** to analysed energy.

Three honest patterns (HOW, not a full Web Audio course):

1. **Rive audio events** — designer/runtime stamps; web player unlocks after a user gesture ([Playing audio](https://rive.app/docs/runtimes/web/playing-audio)).
2. **Rive + AnimaScript `AudioProcessor`** — you write `init` / `process` on the audio lane; main lane talks through `Snapshot` / `Ring` ([Audio processors](https://rive.app/rasc/docs/audio.html)).
3. **External followers** — WAAPI/GSAP/Lottie/Canvas seek from `AudioContext.currentTime`, or `AnalyserNode` for reactive (not sample-locked) visuals.

### Coded specimen — AnimaScript audio processor

**Template / lab source** (verified locally with Rive CLI 1.9.2: **0 errors, 0 warnings**):

- Project: [`docs/assets/animations/fava/rive/animascript-audio/`]({{ '/assets/animations/fava/rive/animascript-audio/rive.yaml' | relative_url }})
- Script: [`hum.as`]({{ '/assets/animations/fava/rive/animascript-audio/hum.as' | relative_url }}) — `Humming` (Layout) + `Hum` (`AudioProcessor`)
- Published `.riv`: [`ruvebal-favicon-animascript-audio.riv`]({{ '/assets/animations/fava/rive/animascript-audio/build/ruvebal-favicon-animascript-audio.riv' | relative_url }})
- Hearable capture: [`hum-preview.wav`]({{ '/assets/animations/fava/rive/animascript-audio/build/hum-preview.wav' | relative_url }}) (PCM stereo 48 kHz, ~1.5 s)
- Demo card: [Play hum — audio specimen]({{ '/lessons/en/web-animations/svg-master-session/demo/#audio-specimen' | relative_url }})
- Official pattern twin: [AnimaScript audio docs — first processor](https://rive.app/rasc/docs/audio.html)

```sh
# From web-foundations/
rive docs/assets/animations/fava/rive/animascript-audio --verify
rive docs/assets/animations/fava/rive/animascript-audio --publish=local --output-dir=build
rive docs/assets/animations/fava/rive/animascript-audio \
  --render-audio=docs/assets/animations/fava/rive/animascript-audio/build/hum-preview.wav \
  --advance=1.5s
```

`--render-audio` writes a deterministic WAV with **no window and no device** — the same path CI or a student laptop can use to prove the processor without autoplay. Live browser playback of processors needs a **threaded** web build (`@rive-app/webgl2-threads`) plus cross-origin isolation; without that host tax, `AudioHandle.failed` is set (the specimen reads that field). Pages therefore plays the **captured** WAV on a gesture-unlocked page `AudioContext` — same samples, honest about the delivery path.

### How the demo sounds

What you hear on **Play hum** is not a designer sample dropped into the page. It is the **output of `Hum.process`**: a soft **110 Hz** sine whose gain the Layout lane pulses through a `Snapshot<Level>` (~0.05–0.09). The demo card:

1. fetches [`hum-preview.wav`]({{ '/assets/animations/fava/rive/animascript-audio/build/hum-preview.wav' | relative_url }}) (the CLI capture of that processor);
2. unlocks / resumes an `AudioContext` on your click (autoplay policy);
3. `decodeAudioData` → `BufferSource` → light gain → `AnalyserNode` (waveform meter) → destination;
4. stops after the buffer ends (~1.5 s) or on **Stop**.

| Claim | Honest answer |
| --- | --- |
| “This is AnimaScript audio” | **Yes** — the WAV is the processor’s interleaved samples, not an unrelated MP3. |
| “This is a live AudioWorklet on GitHub Pages” | **No** — that needs threads + COI; the card teaches ownership without that deploy tax. |
| “The meter proves sample-lock to the mark” | **No** — the meter is a Web Audio follower of the same buffer; the *ownership* lesson is still `hum.as`. |
| `prefers-reduced-motion` | Play stays off; open `hum.as` / the WAV instead. |

Studio takeaway: prove the audio lane with `--verify` / `--render-audio`; let the page *hear* the capture; reserve threaded live processors for hosts that can ship COI.

**Excerpt — the two-lane contract** (full file is the specimen; this is the ownership sketch):

```ts
// Excerpt — from hum.as (AnimaScript, not browser TypeScript)
export class Hum extends AudioProcessor<Snapshot<Level>> {
  override init(sampleRate: f64, maxFrames: i32, channels: i32, level: Snapshot<Level>): void {
    this.level = level;
    this.step = (2 * Math.PI * 110) / sampleRate; // device rate from init — never hard-code
  }
  override process(out: StaticArray<f32>, frames: i32, startFrame: f64): void {
    // audio thread: no wait, no allocate; startFrame is the engine clock for this block
    this.level!.latestInto(this.current);
    // … write interleaved f32 samples into out …
  }
}

export class Humming extends Layout {
  override init(context: Context): bool {
    this.level.publish(new Level());
    this.hum = Audio.start(() => new Hum(), this.level); // keep the handle or the processor stops
    return true;
  }
}
```

### Sync matrix for this session’s techniques

| Technique / runtime | Sync with sound | How | Honest limit |
| --- | --- | --- | --- |
| CSS / SMIL | **Weak** | Class toggles / `beginElementAt` from callbacks | No seekable playhead |
| WAAPI / GSAP / Motion / Anime | **Strong–good (followers)** | Seek/progress from host `AudioContext.currentTime` | Paint still follows display refresh |
| Canvas 2.5D / Three.js | **Strong (manual follower)** | Sample audio time or Analyser in `rAF` / `useFrame` | You own the mapping |
| Lottie / dotLottie | **Good (follower)** | Seek player time from audio progress | Still an external timeline |
| **Rive audio events** | **Strong (authored)** | Events in the `.riv`; runtime `AudioContext` after gesture | Autoplay policy; not custom DSP |
| **Rive + AnimaScript audio processors** | **Strongest here (WASM audio lane)** | `AudioProcessor.process` on audio thread / AudioWorklet; `Snapshot`/`Ring` from Layout | Threaded web build for live processors; `process` must stay allocation-free |

Host-Web-Audio followers remain useful when the visual is still DOM/SVG (this favicon comparison). They are not a substitute for packaging sound **inside** a Rive artifact. (Convolution reverb / `ConvolverNode` is an *effect* on a Web Audio graph — unrelated to Rive’s brand or to sync ownership.)

### Studio judgment

- Choose **Rive audio events** when hit sounds and loops should ship with the `.riv` and designers own placement.
- Choose **AnimaScript audio processors** when you need procedural DSP or sample-accurate stamps (`startFrame`) beside procedural drawing — same WASM family as this lesson’s path/AnimaScript specimens.
- Choose **WAAPI/GSAP followers** when the mark stays inline SVG/DOM and audio lives in page script.
- Keep **`prefers-reduced-motion`** and gesture-unlock rules even when the processor is perfect.

This bridge does **not** replace a dedicated Web Audio course. It answers, for techniques already on this page: who can *own* the sample clock (Rive/AnimaScript) versus who can only *follow* or *react*.

## Contest rubric: elegance and economy

Score each approach from 1–5, then weight the criteria. Each student should record the score and one piece of evidence from the live comparison.

| Criterion | Weight | Look for |
| --- | ---: | --- |
| Motion fit | 15% | The reveal supports the identity, has good pacing, and ends cleanly |
| SVG fidelity | 15% | The original colours and geometry stay intact at different sizes |
| Interaction granularity | 20% | Pointer and keyboard input can reach the intended facet/state without fragile targeting |
| Spatial honesty | 10% | The explanation names planar 3D, simulated 2.5D, GPU-backed 2D, or true 3D correctly |
| Audio-clock honesty | 5% | If sound is claimed, the note names Rive events / AnimaScript processor vs external follower vs Analyser-reactive |
| Code elegance | 15% | Input, state, timing, interruption, and reset behavior are easy to find and adjust |
| Delivery economy | 20% | Added code, runtime, asset conversion, and maintenance are proportionate to the result |

For the landing-page use case, **CSS is the economy baseline**: an embedded palette keyframe keeps the color cycle self-contained, while a small host-page control swaps to the static asset to pause it. If the direction needs multi-step choreography or richer playback controls, **GSAP is the strongest course fit** because students already learn it in Session 11. Motion and Anime.js remain useful comparison points, but should win only if their APIs materially improve the project. Lottie/dotLottie or Rive should win only when the authoring workflow, interaction model, or cross-platform reuse justifies exporting and shipping a separate animation asset. The lesson's author-generated Lottie and dotLottie files make that delivery cost visible rather than treating those formats as hypothetical.

These are design judgments for this specific task, not claims about measured student learning or universal library rankings.

## Same reveal, different code shapes

The demo prepares the paths once, then each method reveals them with roughly the same timing. Compare how much state and orchestration each API exposes:

```css
/* CSS keyframes: the browser owns the sequence */
.is-playing .facet {
  animation: reveal 420ms ease-out both;
  animation-delay: calc(var(--order) * 34ms);
}
@keyframes reveal { from { opacity: 0 } to { opacity: 1 } }
```

```xml
<!-- SMIL: an animation element lives inside the SVG -->
<animate attributeName="opacity" from="0" to="1"
  dur="420ms" fill="freeze" begin="indefinite" />
```

```js
// WAAPI: browser-native playback control
paths.forEach((path, i) => path.animate(
  [{ opacity: 0 }, { opacity: 1 }],
  { duration: 420, delay: i * 34, fill: "both" }
));

// GSAP: one timeline controls the stagger
gsap.timeline().fromTo(paths, { opacity: 0 }, {
  opacity: 1, duration: 0.42, stagger: 0.034, ease: "power2.out"
});

// Motion: compact target and stagger helpers
animate(paths, { opacity: [0, 1] }, {
  duration: 0.42, delay: stagger(0.034)
});

// Anime.js: similar intent with a different API surface
animate(paths, {
  opacity: [0, 1], duration: 420, delay: stagger(34)
});
```

The page-level demo also compares CSS transitions: a class changes each path's opacity, and transition delays produce the stagger. That is especially economical when the only needed states are hidden and visible.

## Round 2: best in show

Round 1 isolates code shape by holding the motion goal constant. Round 2 changes the task so each approach can show an idiomatic strength. These capabilities are not exclusive; they are useful fits to teach and compare.

<aside class="lesson-emphasis lesson-emphasis--decision" aria-label="Design decision">
<p class="lesson-emphasis__label">Design decision</p>
<p><strong>“Best” means best matched to a motion problem.</strong> A tiny state change rewards economy; a labelled reversible sequence rewards orchestration; portable authored behaviour may justify a separate runtime.</p>
</aside>

| Technique | Showcase task | What it demonstrates | Cost to notice |
| --- | --- | --- | --- |
| CSS transition | Hover, focus, or activate the brand control | Declarative state-to-state response | Minimal CSS; only meaningful on an actual control or link |
| CSS keyframes | Three-beat entrance: anticipation, overshoot, settle | Explicit offsets and readable fixed choreography | More stages mean more keyframe maintenance |
| SMIL | Replay a short rotation authored inside SVG | Portable timing that travels with the vector asset | External controls and reduced-motion integration need more care |
| WAAPI | Scrub the path assembly with a range input | Seeking and native Animation objects | Most custom state and accessible control code in this set |
| GSAP | Play or reverse a labelled reveal/settle timeline | Sequencing and direction control | Runtime is justified only when orchestration matters |
| Motion | Hover, focus, or press for a small spring response | Physics-based feedback with a compact API | Adds a library; use motion only when the spring helps the interaction |
| Anime.js | Draw a light outline of the SVG facets, then clear it | SVG draw helpers and target/stagger control | Extra runtime and stroke overlay; keep it subtle at icon size |
| Lottie | Art-directed kinetic reveal with overlapping beats | Motion-design authoring and exchangeable exported animation | Requires authored JSON and a player; SVG import does not create motion |
| dotLottie | Bundle idle/reveal/theme variants into one package | Asset packaging and Lottie player/state features | A Lottie container/runtime, not a separate SVG DOM technique |
| Rive | Pointer-reactive idle/attracted/flourish states | Interactive state-machine animation | Requires prepared artwork, `.riv` authoring, and runtime |
| Rive + AnimaScript | Responsive, staggered procedural facet pulse | Typed custom drawing and per-frame logic compiled to WebAssembly | Requires a Rive project and runtime; the page still owns HTML semantics and reduced-motion policy |
| Rive + AnimaScript 3D | Instanced prismatic favicon constellation that unfolds and reassembles | Portable scripted GPU scene with real side faces, lighting, perspective, and depth-tested occlusion | Requires signed scripts and the GPU-enabled WebGL2 runtime; use a verified still when unavailable |

Score all three rounds separately. In Round 2, judge whether the technique fits its motion task. In Round 3, judge input reach, state clarity, interruption, reset behavior, keyboard equivalence, and whether the interaction model earns its delivery cost. Lottie and dotLottie are live, authored exports with working players. The Rive GPU Canvas specimen is a signed runtime file, not a CSS reconstruction; when WebGL2/GPU Canvas is unavailable, the card explicitly falls back to a frame rendered from that same verified source.

## Round 3: interaction is shared—but not equally portable

Colour, opacity, transforms, visibility, and movement are not exclusive to one animation engine. If the SVG is inline, CSS, SMIL, WAAPI, GSAP, Motion, and Anime.js can all target the same path or wrapper. The important difference is architectural: who performs hit testing, where persistent state lives, how multiple animations are interrupted, and whether the interaction travels inside an exported asset.

An SVG loaded through `<img>` is intentionally non-interactive from the host page. Inline SVG exposes normal DOM targets; SVG `pointer-events` can refine whether fill, stroke, or the painted area receives input, and event delegation on the root `<svg>` can identify `event.target`. Canvas has no facet DOM: this lesson's landing mark tests paths in reverse painter order with `isPointInPath()` after transforming the pointer through each facet's inverse matrix. That is economical for a decorative effect, but inline SVG remains the better choice when facets are semantic controls. ([MDN: scripting SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/Scripting), [MDN: SVG `pointer-events`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/pointer-events), [MDN: `isPointInPath()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath))

<aside class="lesson-emphasis lesson-emphasis--practice" aria-label="Practical rule">
<p class="lesson-emphasis__label">Practical rule</p>
<p><strong>Choose the smallest owner for the interaction.</strong> Let CSS present state, JavaScript store only the state the page truly needs, and a specialised runtime own behaviour only when that behaviour must travel with the artwork.</p>
</aside>

| Technique | Granularity and interaction model | Best interactive use | Main friction |
| --- | --- | --- | --- |
| CSS transition/keyframes | Any selectable path can react to `:hover`, `:focus`, or a class/attribute; persistent click state normally needs HTML/JavaScript state | Two-state colour, opacity, focus, selected, or disclosed feedback | CSS animates state but does not by itself own arbitrary click-state logic |
| SVG SMIL | An animation can begin from an SVG event such as `facet.click`, or from `beginElement()` | Portable click-triggered pulse, colour change, transform, or motion path inside the SVG | Complex toggles, shared application state, and keyboard parity need more coordination |
| WAAPI | Every facet can own an independent `Animation` object with play, pause, reverse, seek, rate, and cancellation | Granular disappear/restore controls, scrubbing, interruption, and dynamic timing | Hit testing, state, roving focus, and composition are still application code |
| GSAP | Any DOM/SVG target can participate in one interruptible timeline; setters are useful for high-frequency pointer input | One gesture coordinating a selected facet and all its neighbours | The event model is still DOM code, and the runtime is wasteful for a single property toggle |
| Motion | DOM/SVG targets combine compact animation with hover/press gesture helpers and springs | Physical hover, focus, press, drag, or spring feedback | Another runtime; complex sequencing is less explicit than a labelled GSAP timeline |
| Anime.js | DOM/SVG targets, functional values, callbacks, seek/reverse controls, and distance-based delays | Local ripples, per-facet functions, SVG attribute changes, and compact interactive effects | User-input semantics still need DOM wiring; native WAAPI covers simpler cases |
| Lottie | The player controls the authored timeline through play, pause, direction, markers, segments, and frame seeking | Scrubbed explainers, triggered chapters, and art-directed playback | The original SVG nodes are not a stable public interaction contract across renderers |
| dotLottie v2 | Packages animations, themes, inputs, pointer interactions, and optional state-machine JSON | Shipping several authored states/themes and portable player-level interaction | State machines must be authored into the package; the current ruvebal bundle only switches complete variants |
| Rive | Listeners, hit areas, state-machine layers, transitions, events, data binding, and optional AnimaScript logic live with the art | Interactive icons, controls, characters, procedural effects, and product graphics whose logic must travel across runtimes | Re-authoring/export/runtime cost; scripts have no DOM, so page semantics, keyboard context, and reduced-motion policy still require host integration |

Primary capability references: [SMIL event timing](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/begin), [WAAPI playback objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API), [Motion gestures](https://motion.dev/examples/js-gestures), [Anime.js SVG attributes](https://animejs.com/documentation/animation/animatable-properties/svg-attributes/), [Lottie playback methods](https://github.com/airbnb/lottie-web/blob/master/README.md), [dotLottie v2 state machines](https://www.dotlottie.io/spec/2.0/), and [Rive interactive website states](https://rive.app/use-cases/websites).

### Interaction verdict

- **Smallest clean semantic facet interaction:** inline SVG + one delegated JavaScript listener + a CSS class.
- **Smallest reusable decorative depth treatment:** Canvas + source paths + inverse-matrix hit testing, as used by the landing mark.
- **Most granular dependency-free playback:** WAAPI, because each facet can expose a real `Animation` object.
- **Best coordinated choreography in this course:** GSAP, when one input must affect many facets and timelines can be interrupted or reversed.
- **Best physical gesture feedback:** Motion, if a spring or press response materially improves the control.
- **Best authored interaction that travels with the asset:** Rive; dotLottie v2 is now a serious state-machine alternative when a Lottie pipeline already exists.
- **Best timeline exchange format:** Lottie, but use markers/segments/player controls rather than treating its rendered SVG internals as an API.

## Authored asset build and export

The canonical geometry is the ruvebal favicon in [`fava-mark-static.svg`]({{ '/assets/icons/fava-mark-static.svg' | relative_url }}). The `fava-*` filenames remain as legacy URL-compatible asset identifiers. Run the asset builder from `web-foundations/` to parse its source paths and regenerate every distributable file, including both animated SVG endpoints:

```sh
python3 scripts/build-fava-motion-assets.py
```

This produces:

- `docs/assets/animations/fava/fava-brand.json`: Lottie JSON, 60 fps, one-shot center bloom with staggered scale/opacity and a short overshoot/settle.
- `docs/assets/animations/fava/fava-night.json`: same motion with a light-on-dark palette.
- `docs/assets/animations/fava/fava-showcase.lottie`: dotLottie v2 ZIP package containing both animations and selecting `fava-brand` as the initial animation.
- `docs/assets/animations/fava/rive/scene.rml` and `rive.yaml`: Rive Markup Language source with converted vector paths, matching colors, a `ruvebal Favicon Reveal` one-shot timeline, and a `ruvebal favicon reveal machine` entry point.
- [`docs/assets/animations/fava/rive/animascript/favicon-pulse.as`]({{ '/assets/animations/fava/rive/animascript/favicon-pulse.as' | relative_url }}) and its `rive.yaml`: a generated AnimaScript project that reconstructs every canonical line and cubic curve, applies responsive fitting and procedural scale/opacity, and claims pointer presses to launch a staggered five-colour palette rotation.
- [`favicon-pulse.webp`]({{ '/assets/animations/fava/rive/animascript/favicon-pulse.webp' | relative_url }}): a reduced-size capture rendered by the verified AnimaScript project for the showreel. The capture includes a synthetic pointer press and its colour wave; it is evidence of the Rive output, not a substitute runtime.
- [`animascript-3d/main.as`]({{ '/assets/animations/fava/rive/animascript-3d/main.as' | relative_url }}), [`canonical-favicon.wgsl`]({{ '/assets/animations/fava/rive/animascript-3d/canonical-favicon.wgsl' | relative_url }}), and the signed [`fava_prismatic_3d.riv`]({{ '/assets/animations/fava/rive/animascript-3d/build/fava_prismatic_3d.riv' | relative_url }}): a true-3D Rive GPU Canvas loop. AnimaScript owns time, GPU resources, instancing, and the render pass; WGSL owns prism construction, perspective, normals, palette, directional light, and depth-tested occlusion.

The landing-page favicon now uses the selected **Canvas projection** treatment. It reads the unchanged SVG paths and palette, starts with zero depth contribution, translates the complete mark on one inertial spring, separates facets on an independent Z/camera channel, and sorts them back to front. It also rotates the source palette with a per-facet stagger and performs click hit testing against the topmost painted path. Leaving the mark returns both plane and depth to the frontal composition. Reduced motion retains the static SVG. The linked AnimaScript remains a separate authored-Rive alternative; a browser can execute that source only after Rive builds and signs a `.riv`, so the lesson does not present its capture as a live runtime.

### Production module boundary

The implementation is deliberately split so the relationship between foreground icon and background field can be reused without copying a page-specific script:

```text
favicon-motion/
├── math.js               projection, source-order depth, damped springs
├── palette.js            source palette, staggered colour transitions
├── favicon-canvas.js     SVG loading, drawing, hit testing, lifecycle
└── hero-coordinator.js   foreground activity → background camera suspension
```

The foreground emits one bubbling `favicon-canvas-interaction` event. The coordinator composes pointer/focus reasons and calls `field.setCameraPaused(active)`. That method must suspend new pointer/scroll camera targets, hold the current camera pose, and leave the render loop running when ambient levitation is meant to continue. It must not silently retarget the scene to its rest centre. This boundary prevents the favicon from knowing which geometry engine is behind it and prevents the background from knowing how the favicon is rendered.

The demo uses `lottie-web` to render the JSON as SVG and `@lottiefiles/dotlottie-web` to play the archive on canvas. Each has a static SVG fallback and does not autoplay when reduced motion is requested. The 2D AnimaScript capture is replaced by the static SVG under `prefers-reduced-motion`; the 3D specimen uses a verified rendered still. Its live player uses `@rive-app/webgl2` with GPU Canvas explicitly enabled and offscreen rendering disabled, because a conventional 2D Rive renderer cannot execute its depth scene. Rive projects can be verified, previewed, and captured without signing in; distributable scripted `.riv` files require signing.

### Rive scripting lab: AnimaScript

<aside class="lesson-emphasis lesson-emphasis--concept" aria-label="AnimaScript distinction">
<p class="lesson-emphasis__label">Runtime distinction</p>
<p><strong>AnimaScript is not TypeScript running in the page.</strong> It uses familiar TypeScript syntax over WebAssembly types, compiles with the Rive CLI, has no browser DOM, and reaches only the Rive APIs exposed to its protocol.</p>
</aside>

The generated example extends Rive's `Layout` protocol. Its `init()` hook constructs the 14 exact favicon paths and paints once; `resize()` stores the available layout box; `advance()` owns the eight-second clock; and `draw()` applies a responsive matrix plus a small per-facet pulse. Paths remain stable objects between frames, so the script changes only transforms and modulation while drawing.

```typescript
export class RuvebalFaviconPulse extends Layout {
  paths: Array<Path> = new Array<Path>();
  paints: Array<Paint> = new Array<Paint>();
  elapsed: f64 = 0;

  override advance(seconds: f64): bool {
    this.elapsed = (this.elapsed + seconds) % 8.0;
    return true;
  }

  override draw(renderer: Renderer): void {
    for (let i = 0; i < this.paths.length; i++) {
      const phase: f64 = this.elapsed * 1.65 - <f64>i * 0.34;
      const wave: f64 = 0.5 + 0.5 * Math.sin(phase);
      // The full source fits the artboard, builds Mat2D, and scopes each draw.
      renderer.save();
      renderer.modulateOpacity(0.78 + wave * 0.22);
      renderer.drawPath(this.paths[i], this.paints[i]);
      renderer.restore();
    }
  }
}
```

The complete generated source includes every `moveTo`, `lineTo`, and `cubicTo`; the excerpt keeps the lesson focused on ownership. This is where AnimaScript is strongest: procedural drawing, simulation, custom layout, converters, path effects, or logic that must ship with a Rive artifact across runtimes. A visual state machine remains more economical for ordinary hover/click states that designers need to inspect and tune without code.

From `web-foundations/`, verify and capture the script without an account:

```sh
rive docs/assets/animations/fava/rive/animascript --verify
rive docs/assets/animations/fava/rive/animascript \
  --screenshot=build/favicon-pulse.png --advance=1s
```

Both AnimaScript drawing projects were verified with the Homebrew-pinned Rive CLI 1.9.2: **0 errors and 0 warnings**. The 3D project was then signed and exported as a 117 KB `.riv`; the current workspace plan adds Rive's splash watermark. A third specimen, [`animascript-audio/hum.as`]({{ '/assets/animations/fava/rive/animascript-audio/hum.as' | relative_url }}), verifies the **audio lane** (`AudioProcessor` + `Snapshot`) the same way — see [Audio sync bridge](#audio-sync-bridge-rive-animascript-processors-and-the-other-clocks). Rive recommends AnimaScript for new scripts; the older Luau scripting path is deprecated. See the official [AnimaScript introduction](https://rive.app/rasc/docs/introduction.html), [getting-started protocol example](https://rive.app/rasc/docs/getting-started.html), [execution model](https://rive.app/rasc/docs/execution-lanes.html), and [audio processors](https://rive.app/rasc/docs/audio.html).

To publish the timeline/state-machine RML project as a signed `.riv`, run from the workspace root:

```sh
rive login
rive docs/assets/animations/fava/rive --verify
rive docs/assets/animations/fava/rive --publish=local --output-dir=.
```

The local Rive export is `docs/assets/animations/fava/rive/fava-motion.riv`; the showreel detects that file and enables its Rive canvas player automatically. The Homebrew CLI writes an unsigned/watermarked local file for the current account plan; `rive login` is still required for a fully signed publish without the watermark. The demo retains the RML and AnimaScript source links and static fallback. See the [Rive CLI guide](https://rive.app/agents), [dotLottie v2 specification](https://dotlottie.io/spec/2.0/), and [dotLottie JavaScript player guide](https://docs.lottiefiles.com/en/runtimes/distributions/js).

## 4-hour master session

| Time | Studio move | Evidence of learning |
| ---: | --- | --- |
| 15 min | Inspect favicon and static mark: viewBox, palette, path order, overlap, and absent IDs/groups | Mark up which facets can be animated without changing geometry |
| 25 min | Compare CSS transition/keyframes, SMIL, and WAAPI on the same reveal | Explain which capabilities are native and which require page scripting |
| 25 min | Compare GSAP, Motion, and Anime.js on the same reveal | Score code clarity and runtime cost using the rubric |
| 20 min | Play the Round 2 best-in-show examples | Name the task each approach handles especially well |
| 30 min | Use the Round 3 facet interaction lab and authored timeline controls | Distinguish DOM targeting, playback objects, gesture response, coordinated timelines, and asset state machines |
| 15 min | Play Lottie/dotLottie exports; compare Rive's 2D state machine, procedural 2D paths, and signed GPU Canvas scene | Distinguish timelines, state machines, procedural scripts, GPU geometry, players, and signing/export costs |
| 35 min | Use the Round 4 spatial lab: flat SVG, CSS plane, Canvas projection, and WebGL extrusion | Classify each result as 2D, planar 3D, 2.5D, GPU-backed 2D, or true 3D and identify who owns rendering |
| 20 min | Read and adapt the CSS, projection, scene-driver, and SVGLoader code examples | Explain the boundary between a timing engine and a renderer |
| 15 min | Audio sync bridge: Rive events vs AnimaScript processor vs external follower | Open `hum.as`, click **Play hum** on the demo card, name which lane owns the sample clock vs the page `AudioContext` follower |
| 40 min | Build the chosen static-mark treatment into a landing-page hero | Keep the original silhouette, tune timing, and provide a static mark |
| 10 min | Review reduced motion, keyboard access, and performance | Demonstrate reduced-motion behavior and note one rendering observation |

## Accessibility and delivery constraints

- The landing mark is decorative because adjacent text already identifies Web Atelier. Its Canvas camera is a pointer enhancement, not a hidden control; the static SVG remains the no-script and reduced-motion twin. If facets become real controls in another treatment, use inline SVG, a labelled group, roving `tabindex`, arrow keys, and Enter/Space rather than Canvas hit regions alone.
- Keep navigation marks static. The tab favicon may use its slow colour cycle, while the landing mark uses bounded plane travel, pointer depth, and a staggered palette. Hovering the landing mark suspends only the competing background camera; ambient levitation continues and the camera eases toward rest. `prefers-reduced-motion` keeps the SVG still. Browser favicon policies can still freeze or ignore tab animation.
- The lesson animation is short and plays once. If a production animation instead starts automatically, lasts more than five seconds, and runs beside other content, provide a pause, stop, or hide control as WCAG 2.2.2 requires.
- Preserve the source SVG's color and geometry; animate presentation properties rather than replacing the favicon artwork.
- Keep the palette cycle subtle, without flashing or rapid movement. Do not add a repeating cycle to other large page-content marks.

References: [WAI, WCAG 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide) and [WAI technique C39 for `prefers-reduced-motion`](https://www.w3.org/WAI/WCAG22/Techniques/css/C39).

## Deliverable

One ruvebal favicon treatment in the landing-page hero, plus a short design note containing:

1. the selected technique and why it fits the motion;
2. the weighted contest scores for at least three alternatives;
3. the reduced-motion behavior;
4. the added delivery cost (code, runtime, or exported asset);
5. the spatial classification—2D, planar 3D, 2.5D, GPU-backed 2D, or true 3D—and the renderer that actually owns it;
6. if the treatment involves sound: whether it uses **Rive audio events**, an **AnimaScript `AudioProcessor`** (cite `hum.as` or equivalent), or an **external follower**—and one sentence on gesture unlock / threaded web builds;
7. one thing the student would remove if the animation did not improve communication.

## Instructor note

The profile-research framing for FE I treats motion as a temporal communication layer with cost. This exercise operationalizes that principle through a bounded design comparison; it does not claim that SVG-animation teaching outcomes have already been empirically validated. Keep evidence of student decisions and revisions if this session becomes part of the course research line.

See also: [Web Animations]({{ '/lessons/en/web-animations/' | relative_url }}), [CSS Web Animations]({{ '/lessons/en/web-animations/css/' | relative_url }}), and [GSAP for Designers]({{ '/lessons/en/gsap/overview/' | relative_url }}).
