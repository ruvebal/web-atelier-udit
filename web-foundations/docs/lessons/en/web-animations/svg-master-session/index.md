---
layout: lesson
title: 'SVG Animation Master Session: One ruvebal Favicon, Seven Techniques'
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

The Web Atelier favicon is the source artwork for this session. Its 15 overlapping paths now use the course palette (navy, blue, violet, and chartreuse). The favicon and landing-page hero each use an eight-second CSS color cycle: each facet shifts through the palette with a small stagger, while the mark's geometry stays still. On the landing page, the external SVG progressively becomes an inline SVG so a user can invert one facet by selecting it; arrow keys provide roving facet navigation and Enter or Space toggles the selected colour. The loop stops for `prefers-reduced-motion`; some browsers also pause or suppress favicon animation. Navigation and comparison examples use a separate static copy so the loop cannot bias the baseline.

Open the [interactive technique comparison]({{ '/lessons/en/web-animations/svg-master-session/demo/' | relative_url }}). Round 1 gives CSS transition/keyframes, SMIL, WAAPI, GSAP, Motion, and Anime.js the same reveal task and timing. Round 2 gives them different motion tasks that fit their strengths. Round 3 asks how the same techniques receive, store, interrupt, and coordinate facet-level input. The authored-asset showreel plays generated Lottie JSON and a dotLottie v2 package, including timeline scrubbing and variant switching. Rive's RML project is verified and ready to export; the signed `.riv` file requires the course maintainer's Rive CLI sign-in.

The comparison opens as a full page rather than a modal. Its wide stages, long-form evidence, browser history, and shareable URL are useful here; placing the same material in a focus-trapped overlay would introduce nested scrolling without improving the task. A compact, theme-aware section rail and proximity snap points preserve orientation without forcing every scroll gesture to stop.

## Learning outcomes

By the end of the session, students can:

- explain when an SVG must be inline to target its internal paths from page CSS or JavaScript;
- compare CSS transitions, CSS keyframes, SVG SMIL, WAAPI, GSAP, Motion for JavaScript, and Anime.js on the same visual task;
- distinguish direct DOM interaction, timeline control, packaged state machines, and authored runtime logic;
- distinguish an animation technique from an exported format, player, or authoring runtime;
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
| Lottie | Generated vector animation exported to Lottie JSON and rendered in the showreel | Portable motion-design format; can animate each facet with independent timing | Separate artwork/animation representation and player; JSON is 38 KB before transfer compression |
| dotLottie | Two Lottie animations packaged in a v2 archive and played on canvas | Packages brand/night variants together; one 14 KB archive in this lesson | Still a Lottie player and archive, not a way to animate existing SVG DOM nodes |
| Rive | Generated RML source with a one-shot animation and state-machine entry | A compact authoring model for state-driven behavior and designer handoff | Signed `.riv` export is account-gated; source verification is available offline, but the playable export is pending sign-in |

CSS, SMIL, and WAAPI are browser-native comparisons. GSAP, Motion, and Anime.js are JavaScript animation libraries. Lottie, dotLottie, and Rive are authored asset/runtime choices. Keep those categories separate when students score them. Current platform/library details: [MDN on SVG embedding](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Including_vector_graphics), [MDN on SVG SMIL](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_animation_with_SMIL), [MDN on WAAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API), [GSAP installation](https://gsap.com/docs/v3/Installation/), [Motion quick start](https://motion.dev/docs/quick-start), [Anime.js animation API](https://animejs.com/documentation/animation/), [dotLottie web runtime](https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x), [Rive web use cases](https://rive.app/use-cases/websites).

### Current platform signal

Native CSS continues to gain expressive tools, including scroll-driven timelines; the 2025 State of CSS survey tracked these emerging features with 5,506 respondents. That is a signal to teach browser-native choices first, not a reason to use scroll motion on a logo. Path morphing via CSS `d: path()` remains non-Baseline in MDN compatibility data, so this session avoids it as a default technique. Likewise, SVG import into Lottie is artwork preparation, not automatic animation: a designer must still author the motion and export it. ([State of CSS 2025 methodology](https://2025.stateofcss.com/en-US/about/), [MDN CSS `d` compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/d), [LottieFiles SVG import](https://docs.lottiefiles.com/en/integrations/after-effects/03_import/importing-from-file))

## Contest rubric: elegance and economy

Score each approach from 1–5, then weight the criteria. Each student should record the score and one piece of evidence from the live comparison.

| Criterion | Weight | Look for |
| --- | ---: | --- |
| Motion fit | 20% | The reveal supports the identity, has good pacing, and ends cleanly |
| SVG fidelity | 15% | The original colours and geometry stay intact at different sizes |
| Interaction granularity | 25% | Pointer and keyboard input can reach the intended facet/state without fragile targeting |
| Code elegance | 20% | Input, state, timing, interruption, and reset behavior are easy to find and adjust |
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

Score all three rounds separately. In Round 2, judge whether the technique fits its motion task. In Round 3, judge input reach, state clarity, interruption, reset behavior, keyboard equivalence, and whether the interaction model earns its delivery cost. Lottie and dotLottie are live, authored exports with working players. Rive is accurately marked as pending its signed runtime file; a CSS fade on an image would not fairly demonstrate any of these authoring tools.

## Round 3: interaction is shared—but not equally portable

Colour, opacity, transforms, visibility, and movement are not exclusive to one animation engine. If the SVG is inline, CSS, SMIL, WAAPI, GSAP, Motion, and Anime.js can all target the same path or wrapper. The important difference is architectural: who performs hit testing, where persistent state lives, how multiple animations are interrupted, and whether the interaction travels inside an exported asset.

An SVG loaded through `<img>` is intentionally non-interactive from the host page. Inline SVG exposes normal DOM targets; SVG `pointer-events` can refine whether fill, stroke, or the painted area receives input. Event delegation on the root `<svg>` can identify `event.target`, which is why the landing mark can remain economical even with 15 facets. ([MDN: scripting SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/Scripting), [MDN: SVG `pointer-events`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/pointer-events))

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
| Rive | Listeners, hit areas, state-machine layers, transitions, events, and data binding live with the art | Interactive icons, controls, characters, and product graphics whose logic must travel across runtimes | Re-authoring/export/runtime cost; direct page semantics and accessibility still require host integration |

Primary capability references: [SMIL event timing](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/begin), [WAAPI playback objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API), [Motion gestures](https://motion.dev/examples/js-gestures), [Anime.js SVG attributes](https://animejs.com/documentation/animation/animatable-properties/svg-attributes/), [Lottie playback methods](https://github.com/airbnb/lottie-web/blob/master/README.md), [dotLottie v2 state machines](https://www.dotlottie.io/spec/2.0/), and [Rive interactive website states](https://rive.app/use-cases/websites).

### Interaction verdict

- **Smallest clean facet interaction:** inline SVG + one delegated JavaScript listener + a CSS class. That is the landing-page implementation.
- **Most granular dependency-free playback:** WAAPI, because each facet can expose a real `Animation` object.
- **Best coordinated choreography in this course:** GSAP, when one input must affect many facets and timelines can be interrupted or reversed.
- **Best physical gesture feedback:** Motion, if a spring or press response materially improves the control.
- **Best authored interaction that travels with the asset:** Rive; dotLottie v2 is now a serious state-machine alternative when a Lottie pipeline already exists.
- **Best timeline exchange format:** Lottie, but use markers/segments/player controls rather than treating its rendered SVG internals as an API.

## Authored asset build and export

The canonical geometry is the ruvebal favicon in [`fava-mark-static.svg`]({{ '/assets/icons/fava-mark-static.svg' | relative_url }}). The `fava-*` filenames remain as legacy URL-compatible asset identifiers. Run the asset builder from `web-foundations/` to parse its 15 facets and regenerate the distributable files:

```sh
python3 scripts/build-fava-motion-assets.py
```

This produces:

- `docs/assets/animations/fava/fava-brand.json`: Lottie JSON, 60 fps, one-shot center bloom with staggered scale/opacity and a short overshoot/settle.
- `docs/assets/animations/fava/fava-night.json`: same motion with a light-on-dark palette.
- `docs/assets/animations/fava/fava-showcase.lottie`: dotLottie v2 ZIP package containing both animations and selecting `fava-brand` as the initial animation.
- `docs/assets/animations/fava/rive/scene.rml` and `rive.yaml`: Rive Markup Language source with converted vector paths, matching colors, a `ruvebal Favicon Reveal` one-shot timeline, and a `ruvebal favicon reveal machine` entry point.

The demo uses `lottie-web` to render the JSON as SVG and `@lottiefiles/dotlottie-web` to play the archive on canvas. Each has a static SVG fallback and does not autoplay when reduced motion is requested. Rive's RML can be verified and previewed without signing in. To publish the signed `.riv` file locally, install/sign in to the Rive CLI, then run from the workspace root:

```sh
rive login
rive docs/assets/animations/fava/rive --verify
rive docs/assets/animations/fava/rive --publish=local --output-dir=.
```

The signed output should be `docs/assets/animations/fava/rive/fava-motion.riv`; the showreel detects that file and enables its Rive canvas player automatically. Rive CLI requires sign-in to publish/export a `.riv`; until that step, the demo links the verified `.rml` source and displays the static mark. See the [Rive CLI guide](https://rive.app/agents), [dotLottie v2 specification](https://dotlottie.io/spec/2.0/), and [dotLottie JavaScript player guide](https://docs.lottiefiles.com/en/runtimes/distributions/js).

## 3-hour master session

| Time | Studio move | Evidence of learning |
| ---: | --- | --- |
| 15 min | Inspect favicon and static mark: viewBox, palette, path order, overlap, and absent IDs/groups | Mark up which facets can be animated without changing geometry |
| 25 min | Compare CSS transition/keyframes, SMIL, and WAAPI on the same reveal | Explain which capabilities are native and which require page scripting |
| 25 min | Compare GSAP, Motion, and Anime.js on the same reveal | Score code clarity and runtime cost using the rubric |
| 20 min | Play the Round 2 best-in-show examples | Name the task each approach handles especially well |
| 30 min | Use the Round 3 facet interaction lab and authored timeline controls | Distinguish DOM targeting, playback objects, gesture response, coordinated timelines, and asset state machines |
| 10 min | Play Lottie/dotLottie exports and inspect the Rive source/export workflow | Identify conversion, authoring, player, and account/export costs |
| 45 min | Build the chosen static-mark treatment into a landing-page hero | Keep the original silhouette, tune timing, and provide a static mark |
| 10 min | Review reduced motion, keyboard access, and performance | Demonstrate reduced-motion behavior and note one rendering observation |

## Accessibility and delivery constraints

- The mark is decorative when adjacent text already identifies Web Atelier. Once its facets become controls, expose the inline SVG as a labelled group, use roving `tabindex` so it contributes only one Tab stop, and support arrow keys plus Enter/Space.
- Keep navigation marks static. The tab favicon and landing-page hero use a slow color cycle, not geometric movement. The hero has a pause/resume control and both assets stop for `prefers-reduced-motion`; browser favicon policies can still freeze or ignore the tab animation.
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
5. one thing the student would remove if the animation did not improve communication.

## Instructor note

The profile-research framing for FE I treats motion as a temporal communication layer with cost. This exercise operationalizes that principle through a bounded design comparison; it does not claim that SVG-animation teaching outcomes have already been empirically validated. Keep evidence of student decisions and revisions if this session becomes part of the course research line.

See also: [Web Animations]({{ '/lessons/en/web-animations/' | relative_url }}), [CSS Web Animations]({{ '/lessons/en/web-animations/css/' | relative_url }}), and [GSAP for Designers]({{ '/lessons/en/gsap/overview/' | relative_url }}).
