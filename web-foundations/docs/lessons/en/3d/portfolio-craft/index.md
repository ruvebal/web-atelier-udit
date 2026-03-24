# Portfolio Craft — From Collage to Awwwards

> *"The Awwwards site you admire took six months. The craft took six years. What you screenshot is the fruit; what you practice is the root."*

A 3D portfolio is not a folder of demos. It is **proof** that you understand composition, performance, narrative, and restraint. This lesson connects the visual language of studio-grade experiential sites with the technical habits that let you ship them without embarrassing your GPU or your users.

**Code in this lesson:** **CodeSandbox-ready** snippets run as plain utilities in the browser (or Node where noted). **Excerpt** / **Template** lines need your scroll wiring, build defines, or bundler hooks.

---

## What makes a 3D portfolio “studio-grade”?

Studio-grade work shares traits visible in many **Site of the Day** winners that lean on WebGL:

- **Intent**: every motion answers “why now?” — not “because we can”
- **Hierarchy**: one primary story per view; secondary detail rewards curiosity
- **Performance envelope**: loading, interaction, and scroll stay inside a believable budget
- **Cohesion**: typography, sound, color, and 3D feel like one art direction
- **Degradation**: mobile and low-power devices get a designed experience, not a crash

When you analyze SOTD entries with heavy 3D, slow the recording down. Note **when** the camera moves, **what** stays still, and **how long** the hero holds before the next beat. That rhythm is craft.

---

## Visual grammar

### Composition and negative space

3D scenes tempt you to fill the frame. Strong portfolios **reserve** space: let typography or UI breathe against geometry. Use negative space to steer the eye — the same way editorial layouts use margins.

### Typography anchored in 3D

When type floats in screen space while meshes move in world space, you create **depth layers**. Keep type readable:

- Limit line length; increase size on large canvases
- Avoid placing critical copy over high-frequency texture noise
- Use subtle backing (blur panel, gradient scrim) only when it matches the brand

### Color as mood

Color in experiential sites is often **graded** like film: lifted shadows, restrained saturation in UI, one accent for calls to action. In WebGL, remember that post-processing shifts perceived contrast — validate UI legibility **after** bloom and color grading, not before.

---

## Interaction choreography

Think in **beats**, not features.

| Gesture | Common craft pattern |
|---------|---------------------|
| Hover | Micro-parallax, reveal secondary mesh, cursor state change |
| Scroll | Camera dolly, section morph, scrubbed timeline |
| Click | Navigate with a transition that preserves spatial context |

**CodeSandbox-ready** — Map `scrollY` from `window` or your scroll library.

```js
// Example: scroll progress → camera Z (explicit, debuggable)
function cameraZFromScroll(scrollY, startY, endY, zNear, zFar) {
  const t = (scrollY - startY) / (endY - startY);
  const clamped = Math.min(1, Math.max(0, t));
  return zNear + (zFar - zNear) * clamped;
}
```

Choreography fails when every interaction triggers the same spring. **Map** intensity to importance: hero entrance = large; tooltip = small.

---

## Case study anatomy (how studios tend to work)

These names are shorthand for **families** of approach — study their public case studies and breakdown interviews.

- **Active Theory**: large experiential builds, heavy real-time systems, strong narrative pacing between “moments”
- **Resn**: polished brand worlds, meticulous animation curves, product storytelling
- **Immersive Garden**: cinematic environmental storytelling, careful lighting and atmosphere
- **Bruno Simon**: playful physics-forward worlds; lesson = consistent interaction vocabulary

What to extract: **preloader philosophy**, **camera language**, **sound presence**, **mobile strategy**, and **how they end** the experience (CTA, contact, next project).

### Interaction vocabulary (steal this concept)

Great experiential sites teach you **how to play** without a tutorial modal. Common vocabulary:

- **Pointer = steer**, scroll = progress, click = commit
- **Hover** previews; **click** confirms (do not reverse this without reason)
- **Escape** closes overlays; **Tab** moves through real controls

When vocabulary is inconsistent, users feel the site is “broken” even when WebGL is flawless.

---

## The hero moment: first three seconds

In three seconds a visitor decides: stay, bounce, or bookmark. Your hero should communicate **genre** (playful vs luxury), **competence** (smooth, intentional), and **promise** (what they will get by scrolling).

Checklist:

- First paint is **fast** — poster, LQIP, or lightweight CSS stage
- First **meaningful** motion respects `prefers-reduced-motion`
- No mystery meat UI — if it moves, hint that it is interactive

---

## Loading experience as design

Treat loading as **scene one**. Skeleton layouts, branded progress, witty copy — all valid if honest. For WebGL specifically:

- Show **predictable** wait (avoid infinite spinners)
- Preload **only** what the first beat needs; stream the rest
- If initialization fails, offer **fallback content** with equivalent information

**CodeSandbox-ready** — Human-readable loading copy from milliseconds.

```js
function formatEtaMs(ms) {
  if (!Number.isFinite(ms) || ms < 0) return 'a moment';
  if (ms < 1500) return 'about a second';
  return `about ${Math.ceil(ms / 1000)} seconds`;
}
```

---

## Sound design (optional but powerful)

Audio multiplies presence but punishes autoplay policies and open offices. Production approach:

- **Muted by default** with a clear, delightful unmute
- Loop layers that **crossfade** rather than hard cut
- Compress and normalize; watch memory on mobile

If you skip sound, compensate with **haptics of motion** — crisp easing, satisfying snap points.

**CodeSandbox-ready** — Pass an existing `AudioContext`; call returned disposer on unmount if you register in a component.

```js
// Web Audio unlock pattern: resume on first user gesture (policy-safe sketch)
export function createAudioUnlock(audioContext) {
  let unlocked = false;
  async function unlockOnce() {
    if (unlocked) return;
    if (audioContext.state === 'suspended') await audioContext.resume();
    unlocked = true;
    window.removeEventListener('pointerdown', unlockOnce);
    window.removeEventListener('keydown', unlockOnce);
  }
  window.addEventListener('pointerdown', unlockOnce, { passive: true });
  window.addEventListener('keydown', unlockOnce);
  return () => {
    window.removeEventListener('pointerdown', unlockOnce);
    window.removeEventListener('keydown', unlockOnce);
  };
}
```

Pair with a visible **Sound on** control that sets user expectation before any ambience plays.

---

## Mobile-first 3D: what to cut, what to keep

Mobile is not “desktop but smaller.” It is **thermal**, **memory**, and **attention** constrained.

Often cut:

- Secondary reflections, heavy SSAO, multi-pass bloom stacks
- Dense particle fields, expensive transparent overdraw

Often keep:

- Core silhouette and brand color story
- One strong interaction loop
- Fast contact path — studios get hired from phones too

Ship a **reduced scene graph** or alternate route (video poster + simplified mesh) when metrics demand it.

---

## Technical checklist

| Area | What to verify |
|------|----------------|
| Lighthouse | Performance + accessibility + best practices |
| Core Web Vitals | LCP, INP, CLS — especially CLS with lazy WebGL mounts |
| Cross-browser | Safari WebGL limits, shader precision, texture caps |
| Device lab | Mid-tier Android, fanless laptops, external displays |

### Cross-browser matrix (minimum)

| Browser | Focus |
|---------|--------|
| Safari (macOS + iOS) | Precision, texture limits, memory, `OffscreenCanvas` availability |
| Chrome (Android) | Thermal throttling, GPU composition with DOM overlays |
| Firefox | Shader compiler differences — test one custom material |
| Edge | Usually Chromium-aligned — spot-check only |

### What “studio-grade” *feels* like

- Scroll-linked motion stays **coupled** to input — no visible lag behind the finger
- **No jarring** resolution switches — if `dpr` adapts, ease the transition or hide it in motion
- **Contact** is never more than two calm gestures away

**CodeSandbox-ready** — Feature-detect WebGL; extend with your minimum extension checks if needed.

```js
// Lightweight feature gate example (extend per project)
function webglSupport() {
  try {
    const c = document.createElement('canvas');
    return !!(
      c.getContext('webgl2') ||
      c.getContext('webgl') ||
      c.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}
```

---

## Building your narrative: projects aren’t demos — they’re stories

For each portfolio piece, document:

1. **Problem** — what needed to exist in the world?
2. **Constraints** — timeline, brand, performance envelope
3. **Your call** — technical and visual decisions (with tradeoffs)
4. **Outcome** — metrics, quotes, or qualitative wins

The 3D is evidence. The **story** is what hiring managers remember.

---

## From concept to deployment workflow

### Designer ↔ developer handoff (3D)

| Artifact | Why it matters |
|----------|----------------|
| Camera sheet | Focal length, height, forbidden angles |
| Lighting key | Reference HDR / blockout + rim intent |
| Motion spec | Durations, easing names, reduced-motion alternative |
| Asset manifest | Which glb variants exist per breakpoint |

Arguments shrink when **intent** is drawn before **topology** is debated.

A production-lean pipeline:

1. **Beat sheet** — storyboard scroll sections and interactions
2. **Greybox** — block meshes + camera rails + timing
3. **Art pass** — materials, lighting, grade
4. **Optimization pass** — textures (KTX2), meshes (meshopt/Draco where appropriate), draw-call budget
5. **Accessibility + motion modes**
6. **Staging deploy** — share URL, gather device feedback
7. **Analytics** — engagement depth without creepy over-collection

### Pre-launch review (30 minutes)

1. **Keyboard** path through all primary actions
2. **Reduced motion** path — no auto-orbit, no gratuitous camera whip
3. **3G Fast** throttling on first load — does the story still begin?
4. **Screen reader** pass on DOM chrome around the canvas
5. **Analytics** events named so you can read charts six months later

---

## How to read an Awwwards SOTD (3D-heavy) like a studio lead

Use a **repeatable scorecard** so admiration turns into learning:

| Lens | Questions |
|------|-----------|
| First read | What is the single promise of the hero? What is deliberately *not* shown yet? |
| Timebase | Where are the holds? Where does motion accelerate? Is easing consistent with brand? |
| Asset strategy | What loads before WebGL? What streams after first interaction? |
| Failure modes | Safari? Integrated GPU? Offline? What is the fallback’s *quality*? |
| Exit | How do they convert attention — contact, reel, shop, newsletter? |

Pause recordings and scrub frame-by-frame through transitions. Studios often hide **hard cuts** behind motion blur and grain — your job is to see the cut.

---

## Scroll as timeline (production sketch)

Treat scroll position as **non-linear time**. Map it explicitly so design and engineering share one curve.

**CodeSandbox-ready** — Pure math; feed `scrollY` from your scroll source.

```js
// Smoothstep: cheap easing for scroll remapping
function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Section-local progress: scrollY mapped to [0,1] inside [start,end]
function sectionProgress(scrollY, start, end) {
  return smoothstep(start, end, scrollY);
}
```

Pair this with **Lenis** or native scroll — the math stays the same; the input signal changes.

---

## Case study page template (for your own site)

Use this skeleton so visitors see *judgment*, not only screenshots:

1. **Context** — client/agency, role, stack, timeline
2. **Brief** — one paragraph in the client’s voice (synthetic is fine if accurate)
3. **Constraints** — performance target, browsers, brand guardrails
4. **Architecture diagram** — DOM vs Canvas vs CMS boundaries (ASCII is enough)
5. **Key decisions** — three bullets with *tradeoffs* (“We chose X over Y because…”)
6. **Results** — Lighthouse (when fair), vitals, or qualitative quotes

---

## Metrics that matter (without vanity)

| Metric | Why it is useful |
|--------|------------------|
| LCP (with poster strategy) | First meaningful paint still drives bounce |
| INP | Scroll-driven sites fail here when handlers thrash the main thread |
| CLS | WebGL mount + lazy fonts + injected banners — watch layout shift |
| Engagement depth | Scroll depth, time on case study — correlate with narrative beats |

Do not publish **fake** Lighthouse scores from throttled local runs without stating conditions.

---

## Deployment and staging hygiene

- **Staging** mirrors production compression (Brotli/Gzip), CDN headers, and **same** asset domain to catch CORS and caching bugs
- **Feature flags** for experimental post stacks — disable without redeploying geometry
- **Version** heavy assets (`chair.v2.glb`) so caches do not serve stale geometry alongside new JS

**Template** — Define `__ASSET_VERSION__` via bundler (`define` in Vite/webpack) or replace with your own version string.

```js
// Simple cache-bust helper for immutable filenames (build-time preferred)
export function assetUrl(path) {
  const v = typeof __ASSET_VERSION__ !== 'undefined' ? __ASSET_VERSION__ : '';
  return v ? `${path}?v=${v}` : path;
}
```

---

## AI notes for creative direction

Use AI to **brainstorm** visual metaphors, **draft** case-study copy, and **stress-test** interaction lists. Do not outsource **taste**: curate references, delete clichés, and enforce a single art direction. The strongest prompt is a **moodboard in words** plus explicit **constraints** (palette, typographic voice, forbidden effects).

**Prompt pattern:** “Given references A/B/C, propose **three** distinct art directions. For each: palette, typography pairing, lighting metaphor, motion philosophy, and **what we sacrifice** on mobile.” Then delete two.

---

## Tao moment

> *A portfolio is a mirror. If the mirror only flatters your shader skill, it lies. If it shows restraint, timing, and empathy for the visitor’s device — it tells the truth.*

---

## Exercise

Pick one Awwwards 3D-heavy SOTD. Break it into **beats** (0–3s, 3–10s, scroll chapter 1…). For each beat, list **purpose**, **assets loaded**, and **motion profile**. Rewrite one beat for `prefers-reduced-motion: reduce`.

---

## Studio critique rubric (self-score before ship)

Rate 1–5 honestly; anything below 4 needs a pass.

| Criterion | Question |
|-----------|----------|
| Clarity | Can a tired visitor explain what this is in one sentence after 10 seconds? |
| Rhythm | Are there moments of rest, or is it constant stimulation? |
| Cohesion | Do type, color, motion, and sound feel like one director? |
| Performance | Does it feel *tight* on a laptop with integrated graphics? |
| Accessibility | Is there a credible path without relying on parallax alone? |
| Ending | Does the experience *resolve* — or merely stop? |

Publish the rubric internally; optional: publish scores in case-study footnotes to show maturity.

---

## Reel sites vs portfolio sites

Showreels optimize for **density**; portfolios optimize for **judgment**. Your site should demonstrate you can **sustain** a world long enough to read copy, click links, and return later. If every section is max intensity, you signal impatience — not range.

---

## Further reading & references

- Case study write-ups from studios (search “case study” + studio name + WebGL)
- [web.dev — Core Web Vitals](https://web.dev/articles/vitals) — tie technical work to business language
- Your own **git history** — the best portfolios narrate the *iterations* you survived
