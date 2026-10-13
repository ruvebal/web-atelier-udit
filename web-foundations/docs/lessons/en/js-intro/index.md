---
layout: lesson
title: 'Introduction to JS'
title_alt: 'Introducción a JS'
slug: js-intro
date: 2025-09-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/js-intro/
status: complete
tags: [javascript, fundamentals, events, dom, devtools]
---

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> JavaScript is a browser/runtime model, not just syntax.</p>
<p><strong>Field lens:</strong> **Practice anchor:** events, DOM, types, control flow, and browser execution. **Frontier signal:** browser APIs and asynchronous interaction keep expanding the runtime boundary.</p>
</aside>

> **Studio test:** Draw the event → DOM → user-feedback loop before coding.

> _"The river does not push; it allows. The master developer does not force the scroll—they channel its flow."_
> — Tao of Development, `js-001`

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## For / Not for

**For:** Front-End I **Session 7** — JavaScript fundamentals, the DOM, and the event model in `assets/js/main.js` on your portfolio repo (after Sessions 3–6 CSS).

**Not for:** ES modules (Session 9), linting setup (Session 10), frameworks or React (semester 2).

**When you finish this session you will have:** working JS in `main.js`, at least one DOM update driven by user input, and DevTools notes in your ATELIER reflection.

---

## Before you start

| Requirement | Required? |
| --- | --- |
| Sessions 3–6 complete (semantic HTML + CSS on repo) | Yes |
| `assets/js/main.js` exists (empty is fine) | Yes |
| Live Server (VS Code) or any static server | Yes |
| Chrome or Edge with DevTools | Yes |
| [JavaScript Fundamentals pre-work]({{ '/lessons/en/js-fundamentals/' | relative_url }}) — variables to objects, errors (MDN Core 6.1–6.8) | Yes (≈ 3–4 h self-study) |

**Official time:** 3 h in class (≈ 0.5 h framing · 0.5 h guided exercises · 1.5 h lab).

---

## Follow this path

| Step | Action | Section |
| --- | --- | --- |
| 1 | Sketch the event → DOM → feedback loop on paper | The runtime model |
| 2 | Open DevTools; run expressions; change a node with `$0` | DevTools first |
| 3 | Meet `window` and `document`; select a node and change its text from JS | `window` and `document` · The DOM |
| 4 | Wire one button to a listener that updates the page | Events |
| 5 | Make the three commits in `main.js` | Lab |
| 6 | Push + one-line reflection + AI line | Submit below |

---

## Verify before you leave

- [ ] `main.js` loads without console errors on your Pages URL
- [ ] At least one user action changes **visible page content** (not an `alert`)
- [ ] You can explain `addEventListener` vs inline `onclick` in one sentence
- [ ] DevTools Elements panel used to inspect a node you changed from JS
- [ ] Without looking at the code, you can narrate your handler as *event → node → change* (if an assistant wrote any of it, this box is the proof you own it)
- [ ] Commit pushed to GitHub

---

## Common failures

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `main.js` never runs | Script not linked or wrong path | `<script src="assets/js/main.js" defer></script>` inside `<head>` |
| `null` when querying DOM | Script runs before HTML exists | Use `defer`, or wrap in `DOMContentLoaded` |
| Changes invisible | Updated wrong element or typo in selector | Log `document.querySelector(...)` in Console |
| Button does nothing | Listener on wrong node, or a `<form>` reloads the page | Inspect the node; call `event.preventDefault()` on `submit` |
| Assistant output has `import`, JSX, `$(...)` or a framework | AI suggests the stack it sees most often, not the one this session needs | Reject it. This week is plain `main.js`, no libraries |

---

## Submit (Session 7 evidence)

- GitHub repo URL + commit(s) touching `assets/js/main.js`
- One-line note: which event you handled and what DOM feedback the user sees
- **AI line:** `AI: <tool> / none · one suggestion I rejected and why` — this habit is graded later with the [AI declaration and oral-defence rubric]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }})

---

## Objectives

- Explain what JavaScript does **in the browser**: parse → DOM → listen → react → repaint.
- Use **DevTools** (Console, Elements, Sources) as your first debugging tool.
- **Select** and **change** DOM nodes safely with `textContent` and `classList`.
- Attach **event listeners** and give the user visible feedback.
- Leave three small, explained commits in `assets/js/main.js`.

---

## How code works in this lesson

Every code block is labelled:

- **CodeSandbox-ready** — complete and runnable as shown.
- **Excerpt** — a fragment: paste it into the Console or into an existing file; it depends on context around it.
- **Template** — a starting point you must adapt (names, selectors, text).

Runnable code lives in **your portfolio repo** (`index.html` + `assets/js/main.js`), not in a sandbox; the routed React sandbox convention used in later units does not apply to this vanilla session.

---

## JavaScript references

The three references this course uses in every JavaScript session:

| Role | Reference |
| --- | --- |
| Standard — current reference | [ECMAScript® Language Specification (ECMA-262), Ecma International](https://262.ecma-international.org/) |
| Recommended documentation | [MDN Web Docs — JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |
| Trademark | [JavaScript at Oracle](https://www.oracle.com/developer/javascript/) — as MDN states: “Both "Java" and "JavaScript" are trademarks or registered trademarks of Oracle in the U.S. and other countries.” |
| Learning path | [MDN Curriculum — Core 6. JavaScript fundamentals](https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/) — this session covers 6.9 DOM scripting (`Window`, `Document`, selecting nodes, `classList`), 6.10 Events and 6.15 Debugging. 6.1–6.8 (variables → objects) are in the [pre-work]({{ '/lessons/en/js-fundamentals/' | relative_url }}). |

Reference pages for this session: [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) · [`Document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) · [`Introduction to the DOM`](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) · [`querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) · [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) · [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) · [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

---

## The runtime model

Before syntax, the shape of what happens:

<figure class="lesson-key-figure" markdown="0">
<img src="{{ '/assets/images/lesson-figures/fe-i-07-event-loop-en-77b0b39edeec.svg' | relative_url }}" width="680" height="366" alt="The event loop for this session" aria-describedby="fe-i-07-event-loop-caption" loading="lazy" />
<figcaption id="fe-i-07-event-loop-caption"><strong>The event loop for this session.</strong> Once, at load, <code>main.js</code> registers listeners. Then every interaction runs the same loop: event → listener → DOM change → repaint → feedback the user can perceive. The highlighted step is what the studio test checks. <span class="image-credit">Figure by @ruvebal with visual-forger 1.2.0.</span></figcaption>
</figure>

Three facts carry most of this session:

1. **JS waits.** After the first run, your code mostly sits idle until an event fires.
2. **The DOM is not the HTML file.** It is the live tree the browser built from it; JS edits the tree, never the file.
3. **Feedback must be visible.** If the user cannot see or hear (screen reader) the change, the loop is not closed.

---

## DevTools first

Open DevTools: **Cmd ⌘ + ⌥ + I** (macOS) / **Ctrl + Shift + I** (Windows/Linux).

### Console — run JS live

**Excerpt** — type each line in the Console.

```js
1 + 2;
document.title;
typeof window;
console.table([{ name: 'Ana', skills: 3 }, { name: 'Leo', skills: 5 }]);
```

### Elements — inspect and change the DOM

Right-click any element → **Inspect**. The selected node is available in the Console as `$0`.

**Excerpt** — run in the Console with a node selected in Elements.

```js
$0.textContent = 'Changed from the Console';
$0.classList.add('highlighted');
$0.parentElement;
```

Mini-challenge: change the text of your `h1` without reloading, then reload — the change is gone. That is the DOM-vs-file difference made visible.

### Sources — pause your own code

1. Open `assets/js/main.js` in **Sources**.
2. Click a line number to set a breakpoint (blue marker), then trigger the code (reload or click).
3. While paused, hover variables or add them to **Watch**; use **Step over** (F10) and **Step into** (F11).
4. Or write `debugger;` in your code — execution pauses there when DevTools is open. Remove it before committing.

> Prefer breakpoints and `console.log` over `alert()`: `alert` blocks the page and hides the state you are trying to see.

---

## `window` and `document`: where your code starts

Every script on a page starts with two objects already available.

| Object | What it represents | You use it for |
| --- | --- | --- |
| [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) | The browser tab — viewport, URL, timers — and the **global object** | `scrollY`, `innerWidth`, `location`; listening for `scroll` / `resize` |
| [`document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) | The page loaded in that tab — the entry point to the DOM tree | `querySelector()`, `createElement()`, `title`, `body` |

`document` is itself a property of `window`, so `window.document === document`. Because `window` is the global object, you can write `document` instead of `window.document` and `innerWidth` instead of `window.innerWidth`. In a classic script, top-level `function` and `var` declarations also become `window` properties — the shared global scope that Session 9 replaces with modules.

**Excerpt** — run in the Console, resize the window, then run the last two lines again.

```js
window.document === document; // true
document.title;
window.innerWidth;
window.location.href;
```

Rule of thumb: listen on `window` for tab and viewport events (`scroll`, `resize`); listen on elements for what the user does to content (`click`, `input`, `submit`).

---

## The DOM: select and change

**Excerpt** — assumes `<h1 id="title">Hello</h1>` exists in your HTML.

```js
const title = document.querySelector('#title');

if (title) {
	title.textContent = 'Modified with JS';
	title.classList.add('is-updated');
}
```

| Task | Use | Avoid this week |
| --- | --- | --- |
| Find one node | `document.querySelector('#id')` / `('.class')` | Guessing — log it first |
| Change text | `node.textContent = '…'` | `innerHTML` (Session 8 shows why) |
| Change style | `node.classList.add/remove/toggle('…')` + CSS rule | Long chains of `node.style.*` |
| Read form value | `input.value` | — |

Always guard with `if (node)`: a `null` selector is the most common Session 7 error.

---

## Events: the logic of the front end

**Excerpt** — assumes a `<button id="btn">` and a `<p id="status">`.

```js
const btn = document.querySelector('#btn');
const status = document.querySelector('#status');

btn.addEventListener('click', (event) => {
	status.textContent = `Clicked at ${new Date().toLocaleTimeString()}`;
	console.log('target:', event.target);
});
```

In Haverbeke’s summary, “Event handlers make it possible to detect and react to events happening in our web page. The `addEventListener` method is used to register such a handler” (Haverbeke 2024, chap. 15).

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
VERIFIED evaluator_safe=yes (ahmes query --cite --require-evaluator-safe, 2026-10-13)
Ahmes anchor: scholar/marijn_haverbeke_eloquent_javascript_no_starch_press_2024_6eab5aec; node: b9a81fd8-78d7-5336-b4a8-7d3fa9dbe9d4
Locator: EPUB spine page_index=42 = OPS/xhtml/ch15.xhtml "15. HANDLING EVENTS" -> public "chap. 15". Verbatim checked against EPUB XHTML (extraction drops spaces around inline code). Year: coat/registry 2024 + printer key "24 1"; copyright page reads (c) 2025.
Run: ~/src/profield/runs/fe-js-canon/20261013 (pipeline.log, grounding-candidates.json)
-->
{% endif %}

**Why `addEventListener` and not `onclick="…"` in HTML:** behaviour stays in `main.js`, you can attach several listeners, and HTML stays semantic.

| Event | Typical use |
| --- | --- |
| `click` | Buttons, links, toggles |
| `input` | Live update while typing |
| `submit` | Forms (call `event.preventDefault()` to stay on the page) |
| `keydown` | Shortcuts; keyboard access |
| `scroll` | Header state, progress indicators |
| `DOMContentLoaded` | Run once the DOM is parsed (not needed with `defer`) |

UX notes:

- Use real `<button>` elements: they are focusable and fire `click` on Enter/Space for free.
- High-frequency events (`scroll`, `pointermove`) should do little work; mark scroll listeners `{ passive: true }`.
- Announce changes for screen readers with `aria-live="polite"` on the feedback node.

---

## Lab: three commits in `assets/js/main.js`

**AI check (explain before paste):** before you accept any suggestion for these steps, write one sentence in your notes: *"When the user ___, the ___ node changes to ___."* If you cannot write it, do not paste the code.

### Prerequisites

- Your portfolio repo open in VS Code, served with Live Server.
- `index.html` links the script once, in `<head>`:

**Excerpt** — the only script tag you need this session.

```html
<script src="assets/js/main.js" defer></script>
```

### Commit 1 — Connect and change one node

**Template** — replace `#title` with a selector that exists on your page.

```js
console.log('main.js loaded');

const title = document.querySelector('#title');

if (title) {
	title.textContent = 'Text changed from main.js';
}
```

Check in **Console**: the message appears; the heading text changed.
If you see `null` in a log → the selector does not match anything in your HTML.

**Excerpt**

```bash
git add assets/js/main.js
git commit -m "feat(js): connect main.js and update title"
```

### Commit 2 — A click that changes the page

Add a button and a feedback node to `index.html`:

**Template** — place it where it makes sense in your layout; adapt the text.

```html
<button id="btn-action" type="button">Show availability</button>
<p id="status" aria-live="polite"></p>
```

**Template** — adapt the message to your portfolio.

```js
const btn = document.querySelector('#btn-action');
const status = document.querySelector('#status');
let clicks = 0;

if (btn && status) {
	btn.addEventListener('click', () => {
		clicks += 1;
		status.textContent = `Open to projects — you asked ${clicks} time(s).`;
	});
}
```

Check: click → the paragraph text changes and the count grows. Inspect `#status` in **Elements** and watch it update.
If nothing happens → set a breakpoint inside the listener and click again.

**Excerpt**

```bash
git add index.html assets/js/main.js
git commit -m "feat(js): button updates status text"
```

### Commit 3 — Scroll state through a CSS class

Behaviour in JS, appearance in CSS:

**Template** — adapt colours to your design tokens from Sessions 3–6.

```css
header {
	transition: background-color 0.2s, color 0.2s;
}
header.is-scrolled {
	background-color: rgb(0 0 0 / 0.8);
	color: white;
}
```

**Excerpt** — append to `main.js`.

```js
const header = document.querySelector('header');

if (header) {
	window.addEventListener(
		'scroll',
		() => {
			header.classList.toggle('is-scrolled', window.scrollY > 100);
		},
		{ passive: true }
	);
}
```

Check: scroll down → the header changes; scroll up → it returns. In **Elements** watch the `class` attribute toggle.
If the class never appears → your page may be too short to scroll past 100 px.

**Excerpt**

```bash
git add assets/css assets/js/main.js
git commit -m "feat(js): header state on scroll via class toggle"
```

### Summary

After three commits your `main.js`:

1. Proves it is connected and changes a node (Commit 1).
2. Responds to a click with visible, announced feedback (Commit 2).
3. Toggles a CSS class from a scroll event (Commit 3).

{% comment %}
outcome-graphic-selection:
  source-section: "Summary"
  visual-grammar: "browser-event-runtime — browser events moving through runtime, state, and document response"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

---

## Extra (optional)

**Excerpt** — mirror an input into the page as the user types.

```js
const input = document.querySelector('input');
const output = document.querySelector('#output');

if (input && output) {
	input.addEventListener('input', () => {
		output.textContent = input.value;
	});
}
```

**Excerpt** — log keys (useful for shortcuts and accessibility checks).

```js
document.addEventListener('keydown', (event) => {
	console.log('Key pressed:', event.key);
});
```

---

## ATELIER methodology applied

- **Observe**: watch the DOM change in Elements while you interact.
- **Intervene**: one small commit per behaviour.
- **Reflect**: write the event → node → change sentence for each commit.
- **Share**: push, and show a classmate the loop you drew.

---

## References

- Haverbeke, Marijn. 2024. *Eloquent JavaScript: A Modern Introduction to Programming*. 4th ed. San Francisco: No Starch Press.
