---
layout: lesson
title: 'Making of: Canonical Favicon → Rive GPU 3D'
title_alt: 'Agentic making-of · Rive + AnimaScript 3D'
slug: agentic-rive-3d
date: 2026-11-14
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/web-animations/svg-master-session/agentic-rive-3d/
parent: svg-master-session
---

<aside class="lesson-framing" aria-label="Master idea and studio test">
<p><strong>Master idea:</strong> one SVG source can become a depth-tested, selectable 3D object — and the same stack is the first place in this session that can own an audible sample clock inside the asset.</p>
<p><strong>Studio test:</strong> explain who owns the sample clock, who owns elapsed time for choreography, and who owns the click that must match the pixels, without inventing a lock the fixtures do not prove.</p>
</aside>

## Brief

This making-of is the public record of the [canonical favicon · Rive + AnimaScript 3D]({{ '/lessons/en/web-animations/svg-master-session/demo/' | relative_url }}) specimen: `fava-mark-static.svg` is the only hand-authored geometry, a compiler emits a mesh for a dynamic facet count `N` (this fixture asserts `N = 13`), a signed `.riv` draws that mesh with a depth buffer, and a web host keeps semantic facet controls in sync with the scene’s own pick events.

It is also the place where the comparison session’s audio question becomes a *utility*, not a digression. Before mesh maths, read [sound synchronicity](#sound-synchronicity-first-relevance-utility). The hearable proof already lives on the demo as [Play hum — audio specimen]({{ '/lessons/en/web-animations/svg-master-session/demo/#audio-specimen' | relative_url }}). Parent session: [SVG Animation Master Session]({{ '/lessons/en/web-animations/svg-master-session/' | relative_url }}).

**Code block convention in this lesson:** blocks are labelled **Excerpt** (partial, not runnable alone), **Template** (needs your paths), or **CodeSandbox-ready** only when a learner can paste and run with minimal friction. Most studio evidence here is Excerpt or Template.

## Sound synchronicity: first relevance utility

<aside class="lesson-emphasis lesson-emphasis--concept" aria-label="Key concept">
<p class="lesson-emphasis__label">Key concept</p>
<p><strong>Who owns the audible sample clock?</strong> Among the techniques on the master comparison page, only Rive + AnimaScript can package that clock <em>inside</em> the WASM artifact. Everyone else follows an external Web Audio or media clock, or reacts to analysed energy.</p>
</aside>

Why open here? A student who only sees “prettier 3D” will miss the first honest answer to *why this stack is worth the host tax*. Sound synchronicity is that answer. The GPU favicon owns **elapsed time** for choreography (nine-second loop, staggered extrusion, quaternion inspect). The AnimaScript `AudioProcessor` specimen owns the **sample clock** for tone. Shared *ownership pattern*, not a claimed A/V lock between those two fixtures.

Three honest patterns (HOW, not a Web Audio course):

1. **Rive audio events** — authored stamps; web player unlocks after a user gesture.
2. **Rive + AnimaScript `AudioProcessor`** — `init` / `process` on the audio lane; Layout talks through `Snapshot` / `Ring`.
3. **External followers** — WAAPI / GSAP / Lottie / Canvas seek from `AudioContext.currentTime`, or `AnalyserNode` for reactive (not sample-locked) visuals.

**Excerpt** — ownership sketch from [`hum.as`]({{ '/assets/animations/fava/rive/animascript-audio/hum.as' | relative_url }}):

```ts
// Excerpt — AnimaScript, not browser TypeScript
export class Hum extends AudioProcessor<Snapshot<Level>> {
  override init(sampleRate: f64, maxFrames: i32, channels: i32, level: Snapshot<Level>): void {
    this.level = level;
    this.step = (2 * Math.PI * 110) / sampleRate; // rate from init — never hard-code
  }
  override process(out: StaticArray<f32>, frames: i32, startFrame: f64): void {
    // audio thread: no wait, no allocate; startFrame is the engine clock for this block
    this.level!.latestInto(this.current);
    // … interleaved f32 samples into out …
  }
}
```

**Template** — prove the lane without a device:

```sh
# Template — run from web-foundations/
rive docs/assets/animations/fava/rive/animascript-audio --verify
rive docs/assets/animations/fava/rive/animascript-audio \
  --render-audio=docs/assets/animations/fava/rive/animascript-audio/build/hum-preview.wav \
  --advance=1.5s
```

| Claim | Honest answer |
| --- | --- |
| “This is AnimaScript audio” | **Yes** — the WAV is the processor’s samples. |
| “Live AudioWorklet on GitHub Pages” | **No** — that needs a threaded web build and cross-origin isolation (COI). The card plays the CLI capture after a gesture. |
| “The 3D loop is sample-locked to the hum” | **No** — the fixtures do not prove that. They prove two ownership lanes in one stack. |

## Who owns what (D21 layers)

| Layer | Owner in this specimen |
| --- | --- |
| Vector representation | `fava-mark-static.svg` (sole geometry / fill authority) |
| Tessellation / mesh | `svg-extrusion` compiler → packed blobs + manifest (`N` facets) |
| Model / view / projection | AnimaScript `choreo.as` (ortho fit, quaternion inspect, near margin) |
| Visibility / depth | WGSL + `depth32float` / `lessEqual` |
| Shading / rasterization | `canonical-favicon.wgsl` (source fill fronts; normal-class sides/backs) |
| Input / picking | AnimaScript picker + host consuming `x3pick` (DOM twin, not canvas pixels) |
| Time / interpolation | Elapsed-time choreography; exponential orbit damping |
| Web semantics / fallback | HTML facet buttons, reduced-motion stills, failure stills |

**SVG vs 2.5D vs true depth-tested mesh.** Flat SVG and CSS 3D planes are not this specimen. Mathematical Canvas 2.5D projection is a sibling teaching path. This card is a **true GPU mesh** with side walls, occlusion, and a depth buffer — frontal rest must still compare to the static SVG.

## Source → mesh → signed asset

**Template** — regenerate geometry (favicon is the golden fixture, not a hardcoded `N`):

```sh
# Template — from web-foundations/
node scripts/svg-extrusion/cli.mjs \
  --input docs/assets/icons/fava-mark-static.svg \
  --out docs/assets/animations/fava/rive/animascript-3d/generated/favicon
node scripts/svg-extrusion/pack-rive-mesh.mjs
```

Intrinsic depth follows the frozen D4 rule: area after transforms, then `minDepth + (maxDepth - minDepth) × √(area / maxArea)`. That formula is an engineering contract validated by fixtures, not a theorem smuggled in as citation.

**Excerpt** — near margin must contain the selection pop (X4 finding):

```as
// Excerpt — choreo.as
let nearMargin: f64 = SELECT_OFFSET_Z + SEPARATION_DIST + 0.02;
let nearZ: f64 = Math.max(-maxVZ - nearMargin, 0.01);
```

## Host: semantics without lying about pixels

The host loads the signed `.riv`, wraps console to read `x3pick`, and builds `N` facet buttons from the manifest. It does not re-implement picking for display. Reduced motion and load failure show verified stills of the *same* scene — not a second 2D approximation.

Open the live card: [Rive + AnimaScript 3D on the demo]({{ '/lessons/en/web-animations/svg-master-session/demo/' | relative_url }}).

## Authored motion vs input-driven state

| Axis | What this specimen teaches |
| --- | --- |
| Authored timeline | Staggered extrusion, separation pulse, inspect orbit — elapsed-time based |
| Input-driven state | Click/tap/keyboard toggle, persistent selection, reset, interruptible orbit damping |
| Accessibility | Semantic twin in HTML; GPU pixels are never the only control surface |
| Reduced motion | No automatic loop; deliberate facet stills remain usable |

## Provenance (local, honest, pending where pending)

Public claims below cite **real local commits and reviews** already in this repository. The implementation PR and its merge are **pending** — a later phase imports them after they exist. A machine-readable receipt ships with the site data and is checked by the provenance verifier; it is not a student-facing route.

| Event | Role | Id / SHA | Status |
| --- | --- | --- | --- |
| X1 XML declaration pinned at offset 0 | agent implementation | `4d24ef185123dbc01401dc8897c5813edd13c94b` | recorded |
| X2 frontal GPU scene hardened | agent + cold review | `9f733466bd3622e286d2a4db48300cf97a0cb74c` | recorded |
| X4 host integration | agent implementation | `0b47e076cf972d84e6a9a0747e0315ab12231d13` | recorded |
| X4 cold-review closures F1–F5 | agent + review | `8b698be67ec27ff598991b171b8988b4e6cf2255` | recorded |
| X4 still-capture digest | agent + gate | `01a53612db3d83e8c56406c31494d988aa018fc3` | recorded |
| Implementation PR A | human / workflow | — | **pending** |
| Merge of PR A to `main` | human / workflow | — | **pending** |

## Studio judgment

- Lead with **who owns the clock** (audio sample vs display elapsed time) before admiring the mesh.
- Keep the favicon as a **fixture** — the compiler and skills must stay data-driven in `N`.
- Prefer a **failed gate** that taught a near-plane or uniform-layout bug over a green demo that lied about selection.
- Do not narrate a merge that has not happened.

## References

- Rive AnimaScript [audio processors](https://rive.app/rasc/docs/audio.html)
- Rive web [playing audio](https://rive.app/docs/runtimes/web/playing-audio)
- Parent lesson: [SVG Animation Master Session]({{ '/lessons/en/web-animations/svg-master-session/' | relative_url }})
- Demo: [technique comparison]({{ '/lessons/en/web-animations/svg-master-session/demo/' | relative_url }})
