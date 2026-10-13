---
layout: lesson
title: 'DOM Manipulation in the Browser: Strings, DOM API, Templates, and the Virtual DOM'
title_alt: 'Manipulación del DOM en el Navegador: Cadenas, API del DOM, Plantillas y DOM Virtual'
slug: js-dom-manipulation
date: 2025-10-27
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/js-dom-manipulation/
status: complete
tags: [javascript, dom, security, xss, rendering]
description: 'Render the same UI with strings, native DOM APIs and <template>, watch an XSS payload fire and fail, and choose a safe default for your portfolio.'
---

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> Rendering is a trust boundary.</p>
<p><strong>Field lens:</strong> **Practice anchor:** DOM APIs, templates, text insertion, and XSS awareness. **Frontier signal:** component and virtual-DOM abstractions do not remove security or accessibility responsibility.</p>
</aside>

> **Studio test:** Compare string, native, and template rendering with untrusted input.

> _"Make everything as simple as possible, but not simpler."_
> — Tao of Development, `cc-010`

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## For / Not for

**For:** Front-End I **Session 8** — compare string, native DOM, and `<template>` rendering; watch an XSS payload fire and fail; apply the safe pattern on your portfolio repo.

**Not for:** React/Virtual DOM implementation (conceptual bridge only), sanitizer libraries, or npm build tooling (Session 10+).

**When you finish this session you will have:** the same UI fragment rendered two ways (string vs native API), a documented XSS caveat, and a commit.

---

## Before you start

| Requirement | Required? |
| --- | --- |
| Session 7 complete (`main.js` + events working) | Yes |
| Portfolio repo with semantic HTML | Yes |
| The four demo pages in [`./demo/`](./demo/01-strings.html) (open by double-click or Live Server) | Provided |

**Official time:** 3 h in class (≈ 0.5 h framing · 0.5 h guided exercises · 1 h lab · 1 h demo walkthrough and discussion).

---

## Follow this path

| Step | Action | Section |
| --- | --- | --- |
| 1 | Read the four approaches table | Four approaches |
| 2 | Open demo 1; tick **Unsafe mode**; watch the payload run; untick it | Exercise 1 |
| 3 | Open demo 2; same data, no escaping needed | Exercise 2 |
| 4 | Render a list on your portfolio with `createElement` + `textContent` | Exercise 3 (lab) |
| 5 | Write the ATELIER note: your default pattern and why | Submit below |
| 6 | Optional: `<template>` and the `h()` helper | Optional deep dive |

---

## Verify before you leave

- [ ] In demo 1, **Unsafe mode** shows the red banner (the payload ran) and safe mode does not — you saw both
- [ ] Your portfolio list renders user-visible text with `textContent`, not `innerHTML`
- [ ] You can name one XSS vector and one mitigation from this session
- [ ] If an assistant wrote a render function for you, you tested it with the payload from demo 1 before keeping it
- [ ] Commit pushed

---

## Common failures

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Injected code runs | `innerHTML` with untrusted data | Use `textContent`, or escape before building the string |
| Empty node after append | Forgot `append` or wrong parent | Log parent and child in Console |
| Template renders nothing | Cloned the `<template>` element instead of its `.content` | `document.importNode(template.content, true)` |
| Duplicate listeners | Re-rendering re-attaches handlers per item | One listener on the parent (event delegation) |
| “Works in CodePen, not repo” | Different file paths or script order | Match repo structure; `defer` the script; check Console |
| Assistant output uses `innerHTML = \`…${userText}…\`` | It is the shortest pattern in training data, so models suggest it first | Treat it as the default wrong answer: rewrite with `createElement` + `textContent` |

---

## Submit (Session 8 evidence)

- Commit showing a portfolio list rendered with the native DOM API (string version kept in a comment or a branch for comparison)
- Short note: default pattern for your portfolio and why
- **AI line:** `AI: <tool> / none · one suggestion I rejected and why` — see the [AI declaration and oral-defence rubric]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }})

---

## Learning objectives

- **Render** the same data with template strings and with the native DOM API.
- **Explain** why `innerHTML` with untrusted data is an XSS risk, and show it happening.
- **Default** to `createElement` + `textContent` for user-supplied text.
- **Batch** updates with `DocumentFragment`.
- **Recognise** `<template>` and component helpers as the same DOM underneath (bridge to React in semester 2).

---

## How code works in this lesson

- **CodeSandbox-ready** — complete and runnable as shown.
- **Excerpt** — a fragment of a demo file or of your project; read it in context.
- **Template** — a starting point to adapt to your portfolio.

The runnable source of truth is the [`demo/`](./demo/01-strings.html) folder next to this page: each exercise is an HTML + CSS + JS trio you can open by double-click. The routed React sandbox convention used in later units does not apply to this vanilla session.

---

## JavaScript references

The three references this course uses in every JavaScript session:

| Role | Reference |
| --- | --- |
| Standard — current reference | [ECMAScript® Language Specification (ECMA-262), Ecma International](https://262.ecma-international.org/) |
| Recommended documentation | [MDN Web Docs — JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |
| Trademark | [JavaScript at Oracle](https://www.oracle.com/developer/javascript/) — as MDN states: “Both "Java" and "JavaScript" are trademarks or registered trademarks of Oracle in the U.S. and other countries.” |

Reference pages for this session: [`createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) · [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) · [`DocumentFragment`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) · [`replaceChildren()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren).

---

## Four approaches (and when to use them)

| Approach | How | Strength | Risk / cost | Use it for |
| --- | --- | --- | --- | --- |
| 1. Strings + `innerHTML` | Build HTML with template literals, assign once | Short, fast to prototype | **XSS** if data is untrusted; replaces nodes and their listeners | Static, trusted markup only |
| 2. Native DOM API | `createElement`, `textContent`, `append`, `DocumentFragment` | Safe by default; fine-grained updates | Verbose | **Your default** for data from users or APIs |
| 3. `<template>` + clone | Inert markup in HTML, cloned and filled from JS | Structure stays in HTML | Still needs code to bind data | Repeated cards, rows, list items |
| 4. Components / Virtual DOM | Functions return UI descriptions; a runtime updates the DOM (React, Preact, Lit) | Composition at scale | Tooling, runtime, learning curve | Semester 2 — same DOM underneath |

How we got here, in one line: `innerHTML` (late 1990s) made string updates easy and risky → jQuery (2006) made selection ergonomic → `<template>` and Web Components (2010s) separated structure → React (2013) described UI as functions compiled to `createElement`-style calls.

---

## Security essentials (read before coding)

<figure class="lesson-key-figure" markdown="0">
<img src="{{ '/assets/images/lesson-figures/fe-i-08-trust-boundary-en-12f5dac47605.svg' | relative_url }}" width="680" height="324" alt="One string, two sinks" aria-describedby="fe-i-08-trust-boundary-caption" loading="lazy" />
<figcaption id="fe-i-08-trust-boundary-caption"><strong>One string, two sinks.</strong> The same untrusted string crosses the trust boundary twice. Through <code>innerHTML</code> it is parsed and its <code>onerror</code> code runs; through <code>textContent</code> it stays text and nothing runs — what demo 1 lets you toggle. <span class="image-credit">Figure by @ruvebal with visual-forger 1.2.0.</span></figcaption>
</figure>

- **Treat every string from outside your code as untrusted:** form fields, URL parameters, API responses, and anything an assistant generated from them.
- **Know what actually fires.** `innerHTML` does not run injected `<script>` tags, but it does run event-handler attributes such as `<img src=x onerror=…>` — that is why demo 1's payload is an image.
- **`textContent` never parses HTML.** It is the simplest safe primitive for text (MDN; OWASP calls `innerHTML` an unsafe sink and recommends `textContent`).
- **Attach behaviour with `addEventListener`,** never by building `onclick="…"` strings.
- **Beyond FE I:** Trusted Types — Baseline across browsers since February 2026 — let a site forbid raw strings in `innerHTML` entirely. You will meet this in production code, not in this lab.

Pin-checked 2026-10-13: [MDN `Element.innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML), [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html), [MDN Trusted Types](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API).

---

## Exercise 1 — Strings, and the payload

Open [`demo/01-strings.html`](./demo/01-strings.html). Three products render as cards; the third product's name is a malicious string.

1. Leave **Unsafe mode** unticked: the third card shows the raw markup as text. Nothing runs.
2. Tick **Unsafe mode**: a red banner appears. Code from the "product name" ran on your page.
3. Inspect the third card in **Elements**: in unsafe mode there is a real `<img>` node with an `onerror` attribute.

**Excerpt** — `demo/01-strings.js` (the parts that matter; open the file for the full version).

```js
function escapeHtml(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function render(products, unsafe) {
	const list = document.getElementById('list');
	const clean = unsafe ? (value) => String(value) : escapeHtml;

	// map() turns each product into an HTML string; join('') glues them into one block.
	const html = `
		<div class="grid">
			${products
				.map(
					(p) => `
						<article class="card" data-id="${p.id}">
							<h3>${clean(p.name)}</h3>
							<p class="desc">${clean(p.description)}</p>
							<p class="price">$${p.price.toFixed(2)}</p>
						</article>
					`
				)
				.join('')}
		</div>
	`;
	document.getElementById('xss-banner').hidden = true;
	list.innerHTML = html;
}
```

How the string is built: a template literal (backticks) lets you embed `${expression}`; `map` turns each product into an HTML string and `join('')` glues them into one block. One forgotten `escapeHtml` call anywhere in that string is enough for the payload to run — that is why strings are "simple, but not simpler" than safe.

---

## Exercise 2 — Native DOM API + `DocumentFragment`

Open [`demo/02-dom-api.html`](./demo/02-dom-api.html). Same data, same payload, no escaping function — and nothing runs.

**Excerpt** — `demo/02-dom-api.js`.

```js
function createCard(product) {
	const article = document.createElement('article');
	article.className = 'card';
	article.dataset.id = String(product.id);

	const h3 = document.createElement('h3');
	h3.textContent = product.name; // text, never parsed as HTML

	const pDesc = document.createElement('p');
	pDesc.className = 'desc';
	pDesc.textContent = product.description;

	const pPrice = document.createElement('p');
	pPrice.className = 'price';
	pPrice.textContent = `$${product.price.toFixed(2)}`;

	article.append(h3, pDesc, pPrice);
	return article;
}

const list = document.getElementById('list');
const frag = document.createDocumentFragment();
products.forEach((p) => frag.append(createCard(p)));
list.replaceChildren(frag); // one insertion, one repaint
```

The reason is structural: “Given a string, `createTextNode` gives us a text node that we can insert into the document to make it show up on the screen” (Haverbeke 2024, chap. 14). A text node is displayed, never parsed — `textContent` gives you the same guarantee in one assignment.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
VERIFIED evaluator_safe=yes (ahmes query --cite --require-evaluator-safe, 2026-10-13)
Ahmes anchor: scholar/marijn_haverbeke_eloquent_javascript_no_starch_press_2024_6eab5aec; node: 43e22d53-b256-5398-962a-9fef6de148e8
Locator: EPUB spine page_index=40 = OPS/xhtml/ch14.xhtml "14. THE DOCUMENT OBJECT MODEL" -> public "chap. 14". Verbatim checked against EPUB XHTML. Year: coat/registry 2024; copyright page reads (c) 2025.
Run: ~/src/profield/runs/fe-js-canon/20261013 (pipeline.log, grounding-candidates.json)
-->
{% endif %}

| Method | What it does |
| --- | --- |
| `document.createElement(tag)` | New, detached element |
| `node.textContent = …` | Set text; HTML is shown literally |
| `node.className` / `classList` | Set classes |
| `node.dataset.key = …` | Set a `data-key` attribute |
| `parent.append(a, b, …)` | Insert nodes or strings (as text) |
| `parent.replaceChildren(…)` | Clear and insert in one call |
| `document.createDocumentFragment()` | Off-DOM container for batching |
| `parent.addEventListener(…)` on a container | One listener for many items (delegation) |

---

## Exercise 3 — Lab on your portfolio

Move the safe pattern into your own repo: render a list (projects, skills, links) from an array.

**AI check:** if you ask an assistant for this function, paste demo 1's malicious name into your array before you accept its answer. If the payload runs, the answer is rejected — note it in your AI line.

**Template** — replace the array with your own content and `#projects` with a container that exists in `index.html`.

```js
const projects = [
	{ title: 'Typography poster', url: 'https://example.com/poster', year: 2026 },
	{ title: 'Grid study', url: 'https://example.com/grid', year: 2026 },
];

function createProjectItem(project) {
	const li = document.createElement('li');
	const link = document.createElement('a');
	link.href = project.url;
	link.textContent = `${project.title} (${project.year})`;
	li.append(link);
	return li;
}

const container = document.querySelector('#projects');

if (container) {
	const frag = document.createDocumentFragment();
	projects.forEach((p) => frag.append(createProjectItem(p)));
	container.replaceChildren(frag);
}
```

Then write the string version of `createProjectItem` as a comment underneath, and one sentence on which you keep and why.

**Excerpt**

```bash
git add assets/js/main.js index.html
git commit -m "feat(js): render project list with DOM API (textContent)"
```

---

## Optional deep dive: `<template>` and the road to components

### `<template>` + cloning

Open [`demo/03-template.html`](./demo/03-template.html). The card markup lives inside an inert `<template>`; JS clones and fills it.

**Excerpt** — `demo/03-template.js`.

```js
function renderCard(product) {
	const fragment = document.importNode(template.content, true);
	fragment.querySelector('.card').dataset.id = String(product.id);
	fragment.querySelector('.title').textContent = product.name;
	fragment.querySelector('.desc').textContent = product.description;
	fragment.querySelector('.price').textContent = `$${product.price.toFixed(2)}`;
	return fragment;
}
```

`template.content` is a `DocumentFragment` that is not in the live page. MDN recommends `document.importNode(template.content, true)` over `cloneNode(true)` so any custom elements inside are built with the current document's definitions; for plain HTML both work. Filling with `textContent` keeps the trust boundary intact.

### A tiny hyperscript helper

Open [`demo/04-hyperscript.html`](./demo/04-hyperscript.html). An `h(type, props, ...children)` function wraps `createElement`, `textContent` and `append`.

**Excerpt** — `demo/04-hyperscript.js`.

```js
function Card({ id, name, description, price }) {
	return h(
		'article',
		{ className: 'card', 'data-id': String(id) },
		h('h3', {}, name),
		h('p', { className: 'desc' }, description),
		h('p', { className: 'price' }, `$${price.toFixed(2)}`)
	);
}
```

That is the shape [JSX](https://react.dev/learn/writing-markup-with-jsx) compiles to in React: HTML-like syntax becomes function calls, and a runtime turns the result into DOM nodes. Frameworks change *how you describe* UI; they do not remove the trust boundary — React's escape hatch for raw HTML is literally named `dangerouslySetInnerHTML`.

---

## Atelier critical questions

- **Exploration:** what is fastest to prototype? What is safest by default?
- **Reflection:** when are strings acceptable? (Trusted, static markup you wrote yourself.)
- **Conceptualization:** what does "UI = data + render" mean in demo 2?
- **Production:** can you refactor demo 1 into demo 2 without changing what the user sees?
- **Exhibition:** show the unsafe toggle to a classmate and explain why the `<img>` runs but a `<script>` would not.

---

## Practice extensions (optional)

- Click a card to toggle a `selected` class, with **one** listener on the grid (event delegation).
- Add a filter input that re-renders the list; compare string vs incremental DOM updates.

---

## Further reading

- [MDN — Element.innerHTML (security considerations)](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
- [MDN — `<template>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template)
- [OWASP — Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [react.dev — Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx) (before React in semester 2)

---

## What you should now understand

- Several valid ways to change the DOM, each with a different trust cost.
- Why `textContent` + `createElement` is the safe default for user data.
- How to see an XSS payload fire, and prove your code stops it.
- Why component frameworks sit on the same DOM and the same boundary.

{% comment %}
outcome-graphic-selection:
  source-section: "What you should now understand"
  visual-grammar: "rendering-trust-boundary — untrusted input crossing a guarded rendering boundary into a safe document surface"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

---

## References

- Haverbeke, Marijn. 2024. *Eloquent JavaScript: A Modern Introduction to Programming*. 4th ed. San Francisco: No Starch Press.
