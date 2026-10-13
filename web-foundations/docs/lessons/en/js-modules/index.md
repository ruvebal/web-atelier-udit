---
layout: lesson
title: 'JavaScript Modules: From Chaos to Modularity'
title_alt: 'Módulos JavaScript: Del Caos a la Modularidad'
slug: js-modules
date: 2025-10-20
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/js-modules/
status: complete
tags: [javascript, modules, esm, architecture]
---

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> Modularity keeps change local.</p>
<p><strong>Field lens:</strong> **Practice anchor:** explicit imports/exports and dependency boundaries reduce accidental coupling. **Frontier signal:** ESM, package graphs, and build tooling continue to evolve.</p>
</aside>

> **Studio test:** Produce an import graph and explain one boundary.

> _"When the namespace grows too wide, its meaning becomes thin. When the namespace is too narrow, its future suffocates."_
> — Tao of Development, `cc-004`

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## For / Not for

**For:** Front-End I **Session 9** — split your `main.js` into ES modules with `import`/`export` on your vanilla portfolio, using native ESM in the browser served over HTTP.

**Not for:** bundlers (Vite comes in portfolio Level 3), npm packages, CommonJS/`require`, or React modules (semester 2).

**When you finish this session you will have:** at least three `.js` files with explicit exports, `index.html` loading one `type="module"` entry, and an import graph in your README or ATELIER note.

---

## Before you start

| Requirement | Required? |
| --- | --- |
| Sessions 7–8 complete (`main.js` with events + a rendered list) | Yes |
| Live Server or another static server (modules need HTTP, not `file://`) | Yes |
| Git history from Sessions 7–8 | Recommended |

**Official time:** 2 h in class (≈ 0.5 h framing · 0.5 h guided exercises · 1 h lab).

---

## Follow this path

| Step | Action | Section |
| --- | --- | --- |
| 1 | Read why modules exist (one screen) | Why modules |
| 2 | Learn the four rules that change with `type="module"` | What changes |
| 3 | Read one named and one default export pair | Syntax |
| 4 | Split your `main.js` into `utils.js`, `projects.js`, `header.js` | Lab |
| 5 | Draw the import graph and explain one boundary | Studio test |
| 6 | Commit | Submit below |

---

## Verify before you leave

- [ ] Page loads over `http://127.0.0.1:…` or `http://localhost:…` (not a double-clicked `file://`)
- [ ] Console shows no CORS, 404 or `Cannot use import statement` errors
- [ ] At least one named export, one default export, and their imports, in separate files
- [ ] You can explain default vs named export in one sentence
- [ ] You drew the import graph **before** asking any assistant to refactor, and the final code matches your drawing
- [ ] Commit pushed

---

## Common failures

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `Cannot use import statement outside a module` | Missing `type="module"` | `<script type="module" src="assets/js/main.js"></script>` |
| 404 on a module file | Wrong path in `import` | Import paths are relative to the **importing file**, start with `./` or `../`, and include `.js` |
| CORS error with `file://` | Opened HTML by double-click | Serve with Live Server (or `python3 -m http.server`) |
| `does not provide an export named …` | Named/default mismatch | `export function x` ↔ `import { x }`; `export default` ↔ `import x` |
| Value is `undefined` at start-up | Two files import each other (circular) | Move the shared code to a third file |
| Assistant adds `vite.config.js`, `package.json`, `require(...)` or CDN imports | AI assumes a build setup it has seen more often than plain browser ESM | Reject it. This session needs no install, no config, no build |

---

## Submit (Session 9 evidence)

- Commit with the module split + one `type="module"` script tag
- Import graph (ASCII or bullet list) in README or reflection, with one sentence on a boundary
- **AI line:** `AI: <tool> / none · one suggestion I rejected and why` — see the [AI declaration and oral-defence rubric]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }})

---

## Learning objectives

- Explain the problem modules solve: one shared global scope.
- Use `type="module"` and know what changes (scope, timing, strict mode, HTTP).
- Write and import **named** and **default** exports.
- Split your own `main.js` by responsibility and draw its import graph.

---

## How code works in this lesson

- **CodeSandbox-ready** — complete and runnable as shown.
- **Excerpt** — a fragment to read or place in an existing file.
- **Template** — a starting point to adapt (names, selectors, content).

All runnable code lives in **your portfolio repo** (`index.html` + `assets/js/`). Modules need an HTTP server, so a double-clicked file will not run them. The routed React sandbox convention used in later units does not apply to this vanilla session.

---

## JavaScript references

The three references this course uses in every JavaScript session:

| Role | Reference |
| --- | --- |
| Standard — current reference | [ECMAScript® Language Specification (ECMA-262), Ecma International](https://262.ecma-international.org/) |
| Recommended documentation | [MDN Web Docs — JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |
| Trademark | [JavaScript at Oracle](https://www.oracle.com/developer/javascript/) — as MDN states: “Both "Java" and "JavaScript" are trademarks or registered trademarks of Oracle in the U.S. and other countries.” |

Reference pages for this session: [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) · [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) · [`import() (dynamic)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) · [`<script type="module">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script) · [ECMA-262 — Modules](https://262.ecma-international.org/#sec-modules).

---

## Why modules

Classic scripts share **one global scope**. Every top-level name in every file lands in the same place:

**Excerpt** — two classic scripts loaded by the same page.

```html
<script src="gallery.js"></script>  <!-- declares function render() -->
<script src="contact.js"></script>  <!-- also declares function render() — silently replaces the first -->
```

Crockford describes the mechanism: “In web browsers, each `<script>` tag delivers a compilation unit that is compiled and immediately executed. Lacking a linker, JavaScript throws them all together in a common global namespace” (Crockford 2008, chap. 2).

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
VERIFIED evaluator_safe=yes (ahmes query --cite --require-evaluator-safe, 2026-10-13)
Ahmes anchor: scholar/crockford_douglas_javascript_the_good_parts_o_reilly_media_2008_sans_upgrade_offer_c801bfec; node: c74d0e22-eb4f-5151-88e8-fd2ea6c5dfa7
Source: operator-authorized derived EPUB without O'Reilly upgrade-offer pages (source-derived/DERIVATION.json; original SHA-256 0b18ecdd…, derived c801bfec…).
Locator: EPUB spine page_index=15 = OEBPS/ch02s05.html "Statements" in NCX "2. Grammar" -> public "chap. 2". Verbatim checked against EPUB XHTML.
Run: ~/src/profield/runs/fe-js-canon/20261013 (pipeline-derived.log)
-->
{% endif %}

Problems: names collide, nothing is private, and the order of `<script>` tags is a hidden dependency list.

Simpson names the failure precisely — “if you use a common and useful variable/function name in two different parts of the program, but the identifier comes from one shared scope (like the global scope), then name collision occurs, and it’s very likely that bugs will occur as one part uses the variable/function in a way the other part doesn’t expect” (Simpson 2020, 101).

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
VERIFIED evaluator_safe=yes (ahmes query --cite --require-evaluator-safe, 2026-10-13)
Ahmes anchor: scholar/you_don_t_know_js_yet_kyle_simpson_you_don_t_know_js_yet_scope_closures_leanpub_2020_46ce42fd; node: c6ec6d64-3b52-5a74-8e4e-ea991b9a9d67
Locator: ahmes cite (Simpson 2020, 119) uses scheme=pdf_order; pdftotext page 119 running head "Chapter 6: Limiting Scope Exposure 101" -> printed page 101. Verbatim checked against PDF.
Run: ~/src/profield/runs/fe-js-canon/20261013 (pipeline.log, grounding-candidates.json)
-->
{% endif %}

The community worked around it for twenty years — **IIFEs** wrapped code in a function to hide variables, **CommonJS** (`require`, 2009) gave Node.js files their own scope, **AMD** loaded modules asynchronously in browsers — until **ES2015** standardised `import`/`export`. Today every current browser runs ES modules natively, without any tool.

---

## What changes with `type="module"`

| Rule | Classic `<script>` | `<script type="module">` |
| --- | --- | --- |
| Scope | Top-level names are global | Each file has its own scope; share only what you `export` |
| Timing | Runs immediately unless `defer` | **Deferred automatically** — no `defer` needed |
| Strictness | Sloppy mode by default | Strict mode always |
| Loading | Works from `file://` | Needs HTTP (`file://` → CORS error) |
| Paths in `import` | — | Relative to the importing file; `./` and `.js` are required |
| Repeat imports | Same file twice runs twice | A module runs once, however many files import it |

Pin-checked 2026-10-13 against [MDN — JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

---

## Syntax: one named pair, one default pair

**Named exports** — a file can export many things; importers pick them by name.

**Excerpt**

```js
// utils.js
export function select(selector) {
	return document.querySelector(selector);
}

// main.js
import { select } from './utils.js';
```

**Default export** — one main thing per file; the importer chooses the local name.

**Excerpt**

```js
// header.js
export default function initHeader(header) {
	/* … */
}

// main.js
import initHeader from './header.js';
```

Rule of thumb for this course: **named** exports for collections of helpers and data; **default** export when the file exists for one thing.

---

## Lab: split your `main.js`

**AI check:** draw the import graph on paper first (step 1 below). If you then ask an assistant to do the split, compare its result with your drawing and reject any file, dependency or tool you did not plan.

### 1. Plan the graph

**Template** — adapt file names to what your `main.js` actually does after Sessions 7–8.

```text
index.html
  └─ assets/js/main.js        (entry: wires everything, no logic of its own)
       ├─ ./utils.js          select()
       ├─ ./projects.js       projects, renderProjects()
       │    └─ ./utils.js
       └─ ./header.js         default initHeader()
```

### 2. Create the modules

**Template** — `assets/js/utils.js`.

```js
export function select(selector) {
	const node = document.querySelector(selector);
	if (!node) console.warn(`No element matches ${selector}`);
	return node;
}
```

**Template** — `assets/js/projects.js` (your Session 8 list, moved here).

```js
import { select } from './utils.js';

export const projects = [
	{ title: 'Typography poster', url: 'https://example.com/poster', year: 2026 },
	{ title: 'Grid study', url: 'https://example.com/grid', year: 2026 },
];

export function renderProjects(selector) {
	const container = select(selector);
	if (!container) return;

	const frag = document.createDocumentFragment();
	for (const project of projects) {
		const li = document.createElement('li');
		const link = document.createElement('a');
		link.href = project.url;
		link.textContent = `${project.title} (${project.year})`;
		li.append(link);
		frag.append(li);
	}
	container.replaceChildren(frag);
}
```

**Template** — `assets/js/header.js` (your Session 7 scroll behaviour, moved here).

```js
export default function initHeader(header) {
	if (!header) return;
	window.addEventListener(
		'scroll',
		() => header.classList.toggle('is-scrolled', window.scrollY > 100),
		{ passive: true }
	);
}
```

**Template** — `assets/js/main.js` becomes the entry point only.

```js
import { select } from './utils.js';
import { renderProjects } from './projects.js';
import initHeader from './header.js';

initHeader(select('header'));
renderProjects('#projects');
```

### 3. Switch the script tag

**Excerpt** — replace the Session 7 tag in `index.html`.

```html
<script type="module" src="assets/js/main.js"></script>
```

No `defer`: module scripts are deferred automatically. The `src` here is relative to the page; the `import` paths inside the modules are relative to each module file.

### 4. Serve and check

Open the page with **Live Server**. If you do not have it:

**Excerpt** — from the repo root.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. In **DevTools → Network**, filter by JS: you should see `main.js`, `utils.js`, `projects.js`, `header.js` — each fetched **once**, even though two files import `utils.js`.

### 5. Commit

**Excerpt**

```bash
git add index.html assets/js
git commit -m "refactor(js): split main.js into ES modules"
```

---

## Studio test: the import graph

<figure class="lesson-key-figure" markdown="0">
<img src="{{ '/assets/images/lesson-figures/fe-i-09-import-graph-en-1ba094b97a14.svg' | relative_url }}" width="680" height="362" alt="The lab import graph" aria-describedby="fe-i-09-import-graph-caption" loading="lazy" />
<figcaption id="fe-i-09-import-graph-caption"><strong>The lab import graph.</strong> <code>main.js</code> only wires modules together. <code>projects.js</code> is the boundary: it owns the data and its rendering, so a change to the card markup stays inside it. <code>utils.js</code> is imported twice but fetched and run once. <span class="image-credit">Figure by @ruvebal with visual-forger 1.2.0.</span></figcaption>
</figure>

Copy your graph into the README or your ATELIER note and add one sentence about a **boundary**, for example:

> `projects.js` owns the data and how it is rendered; `main.js` only decides *where*. If I change the card markup, no other file changes.

That sentence is the whole point of the session: **modularity keeps change local**.

---

## Optional deep dive: barrels and dynamic imports

**Excerpt** — a "barrel" file re-exports from several modules so other files import from one place.

```js
// assets/js/ui/index.js
export { renderProjects } from '../projects.js';
export { default as initHeader } from '../header.js';
```

**Excerpt** — `import()` loads a module only when needed and returns a Promise.

```js
const button = document.querySelector('#open-gallery');

button?.addEventListener('click', async () => {
	const { openGallery } = await import('./gallery.js');
	openGallery();
});
```

Both are useful in larger projects; neither is needed for this session's lab.

---

## Atelier reflection

- **Observe:** which file changes if you edit a project title? Which if you change the header colour threshold?
- **Intervene:** move one more responsibility out of `main.js`.
- **Reflect:** where would a circular import appear if you were careless?
- **Share:** show your graph to a classmate and let them guess what each file does from its name.

{% comment %}
outcome-graphic-selection:
  source-section: "Atelier reflection"
  visual-grammar: "local-change-module-graph — small modules connected through explicit imports so change remains local"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

---

## Further reading

- [MDN — JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) (pin-checked 2026-10-13)
- [V8 — JavaScript modules](https://v8.dev/features/modules)
- [ECMA-262 — Modules](https://262.ecma-international.org/#sec-modules) (reference, not required reading)

Next session: [Linting & formatting]({{ '/lessons/en/linting-and-formatting/' | relative_url }}) keeps these files consistent as they multiply.

---

## References

- Crockford, Douglas. 2008. *JavaScript: The Good Parts*. 1st ed. Sebastopol, CA: O’Reilly Media.
- Simpson, Kyle. 2020. *You Don’t Know JS Yet: Scope & Closures*. 2nd ed. GetiPub; Leanpub.
