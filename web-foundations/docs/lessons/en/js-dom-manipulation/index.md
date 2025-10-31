---
layout: lesson
title: 'DOM Manipulation in the Browser: Strings, DOM API, Templates, and the Virtual DOM'
title_alt: 'Manipulación del DOM en el Navegador: Cadenas, API del DOM, Plantillas y DOM Virtual'
slug: js-dom-manipulation
date: 2025-10-27
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/js-dom-manipulation/
tags: [javascript, dom, security, history, pedagogy]
description: 'A critical, practice-oriented overview of DOM manipulation approaches: template strings, native DOM APIs, <template>, and the Virtual DOM — with history, caveats, and exercises.'
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

## 🎯 Learning Objectives

- **Understand the main DOM manipulation strategies**: string-based rendering, native DOM APIs, HTML `<template>`, and Virtual DOM/component approaches
- **Grasp history and trade-offs**: why these patterns emerged and how they evolved
- **Write secure DOM code**: avoid XSS, prefer `textContent`, and understand sanitization
- **Practice through the atelier methodology**: exploration → reflection → conceptualization → production → exhibition
- **Recognize the path toward React and modern frameworks** (JSX, Virtual DOM, templates)

---

## 📜 A Short History: How We Got Here

- 1997–2000: **DOM Level 1/2** standardized the document tree and manipulation APIs
- 2000s: Browsers exposed `innerHTML` — string-based updates became common (fast but risky)
- 2006: **jQuery** popularized ergonomic selection/events/manipulation
- 2009–2012: Logic-in-strings templating (Mustache/Handlebars, Underscore templates)
- 2013: **React** introduced the Virtual DOM and **JSX** (compiled to `createElement` calls)
- 2014+: `<template>` element shipped; Web Components matured
- 2018+: Tagged template libraries (lit-html, htm) refined string safety/ergonomics

> The story is one of moving from ad-hoc strings to structured, declarative components.

---

## 🧭 Four Main Approaches (and When to Use Them)

### 1) String-based rendering (template literals + `innerHTML`)

- **What**: Build an HTML string (often with `` `template literals` ``) and assign to `element.innerHTML`.
- **Pros**: Concise, fast for simple content, easy to prototype.
- **Cons**: **XSS risk** if interpolating untrusted data; re-attaching events; difficult to update incrementally.
- **Security**: Escape or sanitize untrusted input. Prefer `textContent` when you can.

### 2) Native DOM API (`document.createElement`, `append`, `textContent`)

- **What**: Create nodes programmatically, set attributes, append via `DocumentFragment`.
- **Pros**: Safer by default (strings go through `textContent`), fine-grained updates, ergonomic with helpers.
- **Cons**: Verbose compared to strings.

### 3) HTML `<template>` + cloning

- **What**: Define inert HTML in `<template>`, clone with `content.cloneNode(true)`, and fill slots.
- **Pros**: Separate structure from logic, fast cloning, keeps markup readable.
- **Cons**: Still need code to bind data and events.

### 4) Virtual DOM / Components (React path) and tagged templates

- **What**: Describe UI as functions/components; a runtime reconciles changes (React/Preact), or templates are compiled (Svelte), or tagged literals render safely (lit-html).
- **Pros**: Composability, predictable updates, large ecosystem.
- **Cons**: Tooling/runtime overhead; learning curve; build steps.

> React’s core idea: write components that return a description of UI (JSX → `createElement`), then efficiently reconcile changes. It builds on the same DOM fundamentals.

---

## 🔒 Security Essentials (Read Before Coding)

- Treat any user-provided string as unsafe. Use `textContent` or escape before `innerHTML`.
- Avoid building event handlers via strings. Add listeners with `addEventListener`.
- Prefer attribute assignment over string-concatenated HTML attributes.
- Consider browser **Trusted Types** in complex apps; learn what your framework’s sanitizer does.

---

## 🏗️ Atelier Workshop: Progressive DOM Techniques

Each exercise includes runnable demo files in this folder: `./demo/*.html`, `./demo/*.css`, `./demo/*.js`.

### Exercise 1 — Strings with Template Literals (Safely)

Goal: Render a list with template literals while escaping untrusted data.

```
┌──────────────────┐      ┌─────────────────┐      ┌──────────────────┐
│  Build HTML      │ ────▶│  Escape Data     │ ────▶│  innerHTML       │
│  Template String │      │  (sanitize)      │      │  (render once)    │
└──────────────────┘      └─────────────────┘      └──────────────────┘
```

**Figure:** String-based rendering with XSS protection via HTML escaping.

Files created for you:

```html
<!-- demo/01-strings.html -->
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Exercise 1 — Strings</title>
		<link rel="stylesheet" href="01-strings.css" />
	</head>
	<body>
		<main class="container">
			<h1>Products (String Rendering)</h1>
			<div id="list"></div>
		</main>
		<script src="01-strings.js" type="module"></script>
	</body>
</html>
```

```css
/* demo/01-strings.css */
:root {
	--bg: #0b1020;
	--fg: #f1f5f9;
	--card: #111827;
	--muted: #94a3b8;
	--accent: #3b82f6;
}
html,
body {
	margin: 0;
	padding: 0;
	background: var(--bg);
	color: var(--fg);
	font-family: system-ui, sans-serif;
}
.container {
	max-width: 800px;
	margin: 2rem auto;
	padding: 1rem;
}
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
	gap: 1rem;
}
.card {
	background: var(--card);
	border: 1px solid #1f2937;
	border-radius: 0.75rem;
	padding: 1rem;
}
.price {
	color: var(--accent);
	font-weight: 700;
}
.desc {
	color: var(--muted);
	font-size: 0.95rem;
}
```

### Template literals

Template strings in JavaScript are wrapped in backticks (\`), so you can embed variables and expressions inside with `${...}`.

```js
const name = 'World';
console.log(`Hello, ${name}!`); // Output: Hello, World!
```

- The code uses `Array.prototype.map` to turn each product object `p` into an HTML string:
  - For every item, the arrow function `(p) = ...` returns one product card as a string.
  - This makes a new array of all the card strings.
  - Then, `Array.prototype.join('')` combines them into a single HTML block.

### Further reading:

- [Array (MDN docs)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

```javascript
// demo/01-strings.js
const products = [
	{ id: 1, name: 'Safe Mug', price: 19.99, description: 'Durable, everyday mug.' },
	{ id: 2, name: 'Travel Bottle', price: 29.5, description: 'Keeps drinks cold.' },
	// Simulate a malicious payload coming from user input or external API
	{
		id: 3,
		name: '<img src=x onerror="alert(`XSS`);document.body.innerHTML=`<h1>Pwned</h1>`">',
		price: 9.99,
		description: 'Try to break the DOM!',
	},
];

function escapeHtml(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function render(products) {
	const list = document.getElementById('list');
	const html = `
		<div class="grid">
			${products
				.map(
					(p) => `
						<article class="card" data-id="${p.id}">
							<h3>${escapeHtml(p.name)}</h3>
							<p class="desc">${escapeHtml(p.description)}</p>
							<p class="price">$${p.price.toFixed(2)}</p>
						</article>
					`
				)
				.join('')}
		</div>
	`;
	list.innerHTML = html;
}
render(products);
```

**Why is `escapeHtml` needed? Answer and Explanation:**

If you remove `escapeHtml`, user-supplied data—such as product names or descriptions—will be injected directly into your HTML using `innerHTML` without any protection. This means that if the data contains special HTML characters (like `<`, `>`, `"`), they will be interpreted as actual HTML tags or attributes.

For example, if a product name contains dangerous HTML, and you don't escape it, the browser may interpret it as real markup—which could allow unwanted scripts to run on your page (a security risk known as XSS, or Cross-Site Scripting). This can let attackers execute code, which might steal data or harm users.

Using `escapeHtml` transforms special characters into their safe HTML entity forms (`<` becomes `&lt;`, `"` becomes `&quot;`, etc.). As a result, the browser displays the product name as plain text instead of parsing it as code, neutralizing any embedded scripts.

**In summary:** Removing `escapeHtml` makes your code vulnerable to XSS attacks. Always sanitize any dynamic data before injecting it as HTML, especially when rendering user input or data from external sources.

---

### Exercise 2 — Native DOM API + DocumentFragment

Goal: Build the same UI with `createElement`, `textContent`, and a `DocumentFragment`.

```
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│  Create Element  │ ────▶│  Set textContent  │ ────▶│  Append Safely    │
│  Hierarchy       │      │  (auto-escape)   │      │  to Fragment      │
└──────────────────┘      └──────────────────┘      └──────────────────┘
```

**Figure:** DOM API construction with built-in XSS safety via `textContent`.

```html
<!-- demo/02-dom-api.html -->
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Exercise 2 — DOM API</title>
		<link rel="stylesheet" href="02-dom-api.css" />
	</head>
	<body>
		<main class="container">
			<h1>Products (DOM API)</h1>
			<div id="list"></div>
		</main>
		<script src="02-dom-api.js" type="module"></script>
	</body>
</html>
```

```css
/* demo/02-dom-api.css */
@import url('01-strings.css');
```

**Key DOM Methods to Use:**

- The `document` object is the entry point to the page's DOM; you use it to create or look up elements. Each node you create or select is a `element` within this document tree.
- `document.createElement(elementName)`: Creates a new DOM element of the given name.
- `element.textContent = value`: Safely sets plain text content (auto-escapes HTML).
- `element.className = value` or `element.setAttribute(attr, value)`: Adds classes or attributes.
- `document.createDocumentFragment()`: Creates a lightweight, memory-efficient container to build elements off-screen.
- `parent.appendChild(child)` or `parent.append(...)`: Adds elements to the DOM tree.
- `element.dataset`: Reads/writes data attributes.
- `document.getElementById(id)`/`document.querySelector()`/`element.querySelector()`: Selects elements from the DOM.

These native methods let you build UI safely and flexibly, with automatic protection against XSS when you use `textContent`.

```javascript
// demo/02-dom-api.js
const products = [
	{ id: 1, name: 'Safe Mug', price: 19.99, description: 'Durable, everyday mug.' },
	{ id: 2, name: 'Travel Bottle', price: 29.5, description: 'Keeps drinks cold.' },
	{ id: 3, name: '<img onerror=alert("XSS") src=x>', price: 9.99, description: 'Harden your code!' },
];

function createCard(product) {
	const article = document.createElement('article');
	article.className = 'card';
	article.dataset.id = String(product.id);

	const h3 = document.createElement('h3');
	h3.textContent = product.name; // safe text

	const pDesc = document.createElement('p');
	pDesc.className = 'desc';
	pDesc.textContent = product.description;

	const pPrice = document.createElement('p');
	pPrice.className = 'price';
	pPrice.textContent = `$${product.price.toFixed(2)}`;

	article.append(h3, pDesc, pPrice);
	return article;
}

function render(products) {
	const list = document.getElementById('list');
	const grid = document.createElement('div');
	grid.className = 'grid';

	const frag = document.createDocumentFragment();
	products.forEach((p) => frag.appendChild(createCard(p)));
	grid.appendChild(frag);

	list.textContent = '';
	list.appendChild(grid);
}

render(products);
```

Reflect: Which version is easier to maintain? Which is easier to secure?

**References**:

- [MDN: DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)
- [MDN: Element.dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
- [MDN: document.createElement()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
- [MDN: HTMLTemplateElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement)

---

### Exercise 3 — HTML `<template>` and cloning

Goal: Separate markup from logic with `<template>` and clone per item.
[https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template)

The native HTML <template> element allows developers to define reusable chunks of markup that are not rendered immediately but can be cloned and inserted into the page using JavaScript.

This approach cleanly separates structure (HTML) from behavior (JS), reduces duplication, and improves maintainability.

Nowadays, the <template> element is well-supported in all major browsers. It's commonly used in vanilla JS projects and popular frameworks and libraries to build fast, secure, and maintainable dynamic UIs—especially for rendering lists, tables, or cards. For example, <template> is **a key building block** in web components and is also used behind the scenes in UI toolkits like Material Web Components.

```html
<!-- demo/03-template.html -->
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Exercise 3 — HTML Template</title>
		<link rel="stylesheet" href="03-template.css" />
	</head>
	<body>
		<main class="container">
			<h1>Products (HTML Template)</h1>
			<template id="card-template">
				<article class="card">
					<h3 class="title"></h3>
					<p class="desc"></p>
					<p class="price"></p>
				</article>
			</template>
			<div id="list" class="grid"></div>
		</main>
		<script src="03-template.js" type="module"></script>
	</body>
</html>
```

```css
/* demo/03-template.css */
@import url('01-strings.css');
```

### Key DOM Methods for Dynamic Content

Before you implement dynamic rendering with templates, it's valuable to understand a few fundamental DOM methods and structures used for efficient and safe manipulation of HTML in JavaScript:

- **`.content` on `<template>`:** Gives you a document fragment of the template's inner HTML, kept separate from the live DOM until you need it.
- **`.cloneNode(deep)`**: Clones elements or fragments. With `deep: true`, all descendants are duplicated. Essential for making copies of template content.
- **`DocumentFragment`**: A lightweight container for batching DOM updates. You can append multiple nodes to a fragment, then insert the whole fragment into the document to minimize reflows and repaints.
- **`.appendChild()` and `.append()`**: Methods used to place new nodes into the document or fragments.

Understanding these is crucial for writing robust, fast code that updates the DOM dynamically, in bulk, and securely.

To select elements within the DOM, the `querySelector` method is often used. For example, after cloning your template fragment, you can find elements inside it like this:

```js
// 1. Clone the template
// 2. Fill in data, add to a fragment
// 3. Insert the fragment into the DOM
```

_Tip: Batching updates with DocumentFragment is much faster than inserting each item one by one!_

**demo/03-template.js**

```javascript
// demo/03-template.js
const products = [
	{ id: 1, name: 'Safe Mug', price: 19.99, description: 'Durable, everyday mug.' },
	{ id: 2, name: 'Travel Bottle', price: 29.5, description: 'Keeps drinks cold.' },
	{ id: 3, name: '<img onerror=alert("XSS") src=x>', price: 9.99, description: 'Harden your code!' },
];

const template = document.getElementById('card-template');
const list = document.getElementById('list');

// Helper: clone the <template> and fill it with product data, then return the fragment
function renderCard(product) {
	const { id, name, description, price } = product;
	const fragment = template.content.cloneNode(true); // deep clone of template fragment
	const article = fragment.querySelector('.card');
	article.dataset.id = String(id);
	fragment.querySelector('.title').textContent = name;
	fragment.querySelector('.desc').textContent = description;
	fragment.querySelector('.price').textContent = `$${price.toFixed(2)}`;
	return fragment;
}

// - We batch all the product cards into a `DocumentFragment` named `batch`.
// - After filling all cards, we append `batch` to `list` (the container in the DOM), so all cards appear at once without many slow repaints.
const batch = document.createDocumentFragment();
products.forEach((product) => batch.appendChild(renderCard(product)));
list.appendChild(batch);
```

The template-based helper function (`renderCard`) simplifies the task of generating multiple similar DOM elements in a few powerful ways:

- **`.content` on `<template>`**:  
  The `.content` property comes from the [HTMLTemplateElement API](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement/content). When you have a `<template>` element in your HTML, accessing its `.content` property gives you a special _document fragment_ that contains the template’s HTML structure—but this fragment is **not in the live DOM yet**. This allows you to define reusable layouts in your HTML and "stamp out" copies to fill with data via JavaScript, keeping your code DRY and clearly separating your structure from your logic.

- **`.cloneNode(true)`**:  
  Every time you need a new "card", you can _deeply_ clone the template's content with `.cloneNode(true)`. This gives you a _fresh_, ready-to-customize DOM subtree for every product, preventing bugs that come from reusing the same element.

- **`.dataset`**: <sup>[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)</sup>
  The `.dataset` property is a convenient way to set/read all `data-*` attributes on an element.  
  For example:

  ```js
  article.dataset.id = String(id);
  ```

  This line is equivalent to:

  ```js
  article.setAttribute('data-id', id);
  ```

  It attaches extra data you might need later (for example, identifying the product or handling events), without affecting layout or JavaScript logic.

- **Batching with `DocumentFragment`**:  
  Instead of adding cards to the DOM **one at a time** (which is slow!), you use a `DocumentFragment` as a temporary container. You append all the cards to this fragment, and **only one call** to `list.appendChild(batch)` pushes them all into the live DOM at once.
  This improves performance by limiting expensive reflows/repaints and keeps your code readable.

**Summary:**  
Using `<template>`, `.content`, `.cloneNode`, `.dataset`, and batching via `DocumentFragment` leads to code that is:

- More readable (structure in HTML; filling-in in JS).
- More reusable and DRY.
- More robust and secure, as you can't accidentally insert code directly as HTML (so XSS is avoided).
- Much faster for bulk updates.

Reflect: How does `<template>` improve readability and reusability?

#### References

- [MDN: template example](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#examples)
- [MDN: Using templates and slots](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)
- [Material Web Components](https://github.com/material-components/material-components-web-components)

---

### Exercise 4 — A Tiny Hyperscript Helper (React’s lineage)

Goal: This is your first glimpse of how JSX (a popular JavaScript syntax used in React) actually turns into regular JavaScript function calls—like this simple `h()` helper. We'll see that what looks like HTML inside JavaScript is really just calling a function for each element!

```html
<!-- demo/04-hyperscript.html -->
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Exercise 4 — Hyperscript</title>
		<link rel="stylesheet" href="04-hyperscript.css" />
	</head>
	<body>
		<main class="container">
			<h1>Products (Hyperscript)</h1>
			<div id="app"></div>
		</main>
		<script src="04-hyperscript.js" type="module"></script>
	</body>
</html>
```

```css
/* demo/04-hyperscript.css */
@import url('01-strings.css');
```

```javascript
// demo/04-hyperscript.js
function h(type, props = {}, ...children) {
	const el = document.createElement(type);
	for (const [k, v] of Object.entries(props)) {
		if (k === 'className') el.className = v;
		else if (k.startsWith('on') && typeof v === 'function') {
			el.addEventListener(k.slice(2).toLowerCase(), v);
		} else {
			el.setAttribute(k, v);
		}
	}
	for (const child of children.flat()) {
		if (child == null) continue;
		if (typeof child === 'string' || typeof child === 'number') {
			el.appendChild(document.createTextNode(String(child)));
		} else {
			el.appendChild(child);
		}
	}
	return el;
}

const products = [
	{ id: 1, name: 'Safe Mug', price: 19.99, description: 'Durable, everyday mug.' },
	{ id: 2, name: 'Travel Bottle', price: 29.5, description: 'Keeps drinks cold.' },
	{ id: 3, name: '<img onerror=alert("XSS") src=x>', price: 9.99, description: 'Harden your code!' },
];

function Card({ id, name, description, price }) {
	return h(
		'article',
		{ className: 'card', 'data-id': String(id) },
		h('h3', {}, name),
		h('p', { className: 'desc' }, description),
		h('p', { className: 'price' }, `$${price.toFixed(2)}`)
	);
}

function App() {
	return h(
		'div',
		{ className: 'grid' },
		products.map((p) => Card(p))
	);
}

document.getElementById('app').appendChild(App());
```

Reflect: JSX is syntactic sugar for calls like `h(type, props, ...children)`. React adds a Virtual DOM diff to update efficiently.

---

## 🎓 Atelier Critical Questions

### Exploration

- What’s fastest to prototype? What’s safest by default?

### Reflection

- When would strings be acceptable? When must you switch to DOM APIs or templates?

### Conceptualization

- How do components help us think about UI as data + render?

### Production

- Can you refactor Exercise 1 into Exercise 2 or 3 without changing UI?

### Exhibition

- Show your demos, explain security considerations and trade-offs.

---

## 🔧 Practice Extensions

- Add interactivity: click a card to toggle selection; prefer event delegation on a parent.
- Add filtering/sorting controls; compare cost of re-render with strings vs incremental DOM.
- Replace Exercise 4’s `h()` with a small tagged template (e.g., `html\`...\``) that returns DOM nodes using `template.content`.

---

## 📚 Further Reading

- MDN — Template literals
- MDN — DOM API (`Document`, `Element`, `DocumentFragment`)
- MDN — HTML `<template>`
- OWASP — Cross-Site Scripting (XSS)
- Google — Trusted Types (advanced)
- React docs — Rendering elements; JSX in depth
- lit.dev — Lit and `html` tagged templates

---

## ✅ What You Should Now Understand

- Multiple valid paths to manipulate the DOM, each with trade-offs
- Why React’s approach emerged from earlier techniques
- How to avoid XSS and write secure UI code
- How to choose the right tool for the job and evolve your codebase over time