# Accessibility in 3D — No One Left Behind

> *"The Tao of the 3D web: the most dazzling scene is worthless if half your audience cannot perceive it. Inclusion is not a feature — it is the measure of whether your craft serves humans or vanity."*

3D on the web is often treated as a visual-only medium. Production teams ship parallax heroes, product configurators, and immersive portfolios without asking who is left out. This lesson reframes accessibility as a **rendering contract** that extends beyond pixels: motion sensitivity, cognition, keyboard users, screen readers, and low-vision users all interact with the same URL. Your job is to make the **experience** accessible — not to narrate every triangle.

**Code in this lesson:** **CodeSandbox-ready** blocks are self-contained utilities. **Excerpt** / **Template** blocks assume surrounding HTML (`#scene-status`, overlay markup) or app callbacks you must provide.

---

## Learning outcomes

By the end of this lesson you should be able to:

- Detect and honor `prefers-reduced-motion` in WebGL/R3F scenes
- Pair semantic HTML with canvas-based 3D without lying to assistive tech
- Use `aria-live` and structured descriptions for dynamic 3D state
- Design keyboard paths through 3D UIs and manage focus across DOM and canvas
- Apply WCAG thinking to overlays, contrast, and testing workflows

---

## `prefers-reduced-motion`: detect and respect

Users who enable reduced motion are not asking for a worse product; they are asking for **predictable, low-vestibular-load** interfaces. For 3D, that usually means: fewer camera sweeps, no auto-orbit, shorter spring animations, and optional static fallbacks.

**CodeSandbox-ready** — Browser-only; skip or guard `window` on SSR.

```js
// media-query helper — read once, subscribe to changes
function getReducedMotionPreference() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function onReducedMotionChange(callback) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handler = () => callback(mq.matches);
  mq.addEventListener('change', handler);
  handler();
  return () => mq.removeEventListener('change', handler);
}

// Example: gate cinematic camera lerp
const reducedMotion = getReducedMotionPreference();
const cameraLerpFactor = reducedMotion ? 1 : 0.08;
```

**Production pattern:** expose a single `motionProfile: 'full' | 'reduced'` in your app config, set from the media query at bootstrap, and pass it into your animation layer (GSAP timelines, `useFrame` dampers, scroll-linked transforms). Document the behavior in your design system so marketing does not “add motion” in a CMS without a reduced path.

---

## Semantic HTML alongside canvas

The `<canvas>` element is a **bitmap sink**. It has no intrinsic structure for headings, landmarks, or interactive regions. Surround 3D with real HTML:

- Use `<main>`, `<section>`, and headings (`<h1>`–`<h3>`) for page structure
- Place controls (sliders, toggles, “Reset view”) as native `<button>` / `<input>` elements **outside** the canvas when possible
- If controls must overlay the canvas, ensure they remain in the tab order and are not `pointer-events: none` without an alternative

**Excerpt** — Adjust ids, copy, and `role="application"` only if you implement full keyboard semantics inside the canvas.

```html
<section aria-labelledby="viewer-title">
  <h2 id="viewer-title">Product configurator</h2>
  <p id="viewer-help">
    Use the controls below or Tab through focusable hotspots in the scene.
  </p>
  <div
    class="viewer-shell"
    role="application"
    aria-label="3D product viewer"
    aria-describedby="viewer-help"
  >
    <canvas id="webgl" width="1200" height="800"></canvas>
    <!-- overlay UI as real controls -->
  </div>
</section>
```

**Caution:** `role="application"` tells assistive tech to switch to an application interaction model. Use it **only** when you implement full keyboard semantics inside the viewer; otherwise prefer a simpler landmark without `application`.

---

## `aria-live` for dynamic 3D content

When selection, camera mode, or measurements change, **announce the outcome**, not the implementation.

**Excerpt** — Add matching CSS for `.sr-only` (visually hidden, screen-reader available) in your stylesheet.

```html
<div id="scene-status" class="sr-only" aria-live="polite" aria-atomic="true"></div>
```

**CodeSandbox-ready** — Pairs with the `#scene-status` node above.

```js
function announceSceneStatus(message) {
  const el = document.getElementById('scene-status');
  if (!el) return;
  el.textContent = '';
  // Force some ATs to pick up repeated messages
  window.requestAnimationFrame(() => {
    el.textContent = message;
  });
}

// Good: task-oriented
announceSceneStatus('Chair fabric changed to ocean blue.');

// Bad: render narration
announceSceneStatus('Recompiled shader; draw calls now 124.');
```

Use `assertive` sparingly — for errors that block progress (e.g., WebGL context lost), not for every hover.

---

## Keyboard navigation in 3D scenes

Treat focusable “hotspots” as **first-class UI**. Patterns that work in production:

1. **Overlay buttons** positioned in screen space for discrete actions (open door, select variant)
2. **Spatial grid** with roving `tabindex` on a small set of nodes (not thousands of meshes)
3. **Mode keys** (e.g., `R` reset, `1–4` camera presets) **documented** and not the only path

**Excerpt** — Supply `onReset` / `onToggleLabels`. Call once at mount; call the returned function on unmount (or in a `useEffect` cleanup).

```js
function installBasicViewerKeys({ onReset, onToggleLabels }) {
  function onKeyDown(e) {
    if (e.defaultPrevented) return;
    const tag = (e.target && e.target.tagName) || '';
    if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(tag)) return;

    if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      onReset();
    }
    if (e.key === 'l' || e.key === 'L') {
      e.preventDefault();
      onToggleLabels();
    }
  }
  window.addEventListener('keydown', onKeyDown);
  return function uninstallBasicViewerKeys() {
    window.removeEventListener('keydown', onKeyDown);
  };
}
```

Always mirror key shortcuts with visible controls so discoverability does not depend on folklore.

---

## Screen readers: describe the scene, don’t narrate the render

Assistive technology users need **equivalent information**: what the object is, what changed, what they can do next. They do not need vertex counts, frame times, or material names unless you are building a devtool.

Provide:

- A concise **scene summary** in visible or visually hidden text
- **Instructions** for interaction (keyboard, pointer, voice)
- **Alt text** for static previews (see below)

**Excerpt** — Replace image `src` and `alt` with your asset and description.

```html
<figure>
  <img
    src="/previews/chair-ocean-blue.webp"
    alt="Office chair with high mesh back, ocean blue fabric, five-star base."
  />
  <figcaption>
    Static preview of the 3D configurator. Live 3D view follows.
  </figcaption>
</figure>
```

---

## Focus management between DOM and canvas

When opening modals, drawers, or “detail” panels from the 3D layer:

1. Store `document.activeElement` before opening
2. Move focus into the dialog (`dialog.showModal()` does this if you use `<dialog>`)
3. On close, restore focus to the stored element

**Template** — Expects `overlayEl` to contain a focusable control and to emit a bubbling `closeOverlay` event (or replace with your dialog API).

```js
function openOverlay(fromEl, overlayEl) {
  const previous = document.activeElement;
  overlayEl.hidden = false;
  const focusable = overlayEl.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable) focusable.focus();

  function onClose() {
    overlayEl.hidden = true;
    if (previous && typeof previous.focus === 'function') previous.focus();
    overlayEl.removeEventListener('closeOverlay', onClose);
  }
  overlayEl.addEventListener('closeOverlay', onClose, { once: true });
}
```

Avoid **focus traps** inside canvas-only UIs unless you fully implement WAI-ARIA keyboard patterns.

---

## Alt text and previews for 3D content

Not every user will execute WebGL. Offer:

- **Poster image** or **low-motion GIF** as progressive enhancement
- **Meaningful `alt`** describing purpose, not “3D model”
- Optional **download** of a static spec sheet (PDF) for procurement flows

---

## Color contrast in 3D UI overlays

WCAG contrast requirements apply to **text and essential UI** on top of the canvas — labels, buttons, tooltips, HUD chrome. A cinematic dim vignette is fine; illegible tooltips are not.

- Test overlays on **light and dark** HDR backgrounds
- Avoid relying on color alone for state (add icons or text)

---

## WCAG applicability to 3D

WCAG is **technology-agnostic**. Success criteria still apply to your web page: perceivable text, operable controls, understandable errors, robust parsing. 3D-specific gaps are usually in **operable** and **understandable** — address them with HTML, ARIA, keyboard support, and clear copy.

---

## Testing tools

| Tool | Role |
|------|------|
| axe DevTools / Lighthouse accessibility | Automated checks for DOM contrast, ARIA, labels |
| VoiceOver (macOS), NVDA (Windows), TalkBack (Android) | Real screen reader behavior |
| Keyboard-only pass | Tab order, focus visibility, escape routes |
| `prefers-reduced-motion` emulation | Chrome DevTools rendering tab |

Schedule an **accessibility pass** before launch, not after Awwwards submission.

---

## AI notes

Large language models are helpful for **generating ARIA copy**, **checklists**, and **test plans**. They are unreliable for **WCAG legal interpretation** and may hallucinate ARIA roles. Always validate against the spec and real AT. Use AI to draft `aria-live` messages and keyboard help text — then edit for human clarity.

---

## Tao moment

> *The canvas has no soul until the document speaks truth around it. When motion yields to respect, and structure yields to clarity, the 3D web stops performing wonder — and starts serving everyone.*

---

## Further reading

- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/) — patterns for composite widgets and focus
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- WebGL context loss handling — pair technical recovery with user-facing status announcements
