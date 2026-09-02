---
layout: lesson
title: 'Practice: Semantic HTML + CSS Fundamentals'
title_alt: 'Práctica: HTML semántico + Fundamentos de CSS'
slug: html-css-basics
date: 2025-09-10
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/html-css-basics/
---

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> Semantics are the interface's durable contract.</p>
<p><strong>Field lens:</strong> **Practice anchor:** semantic structure and accessibility belong in the substrate. **Frontier signal:** platform-first teaching resists hiding the document contract behind frameworks.</p>
</aside>

> **Studio test:** Inspect the page with a keyboard and with JavaScript disabled.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## Before you start

| Requirement | Required? |
| --- | --- |
| Session 2 complete (repo + GitHub Pages URL) | Yes |
| VS Code + Live Server | Yes |
| `index.html` + `assets/css/index.css` from template | Yes |

**Official time:** 3 h class + 1.5 h lab (90 min core activities below + extension time).

---

## Follow this path

| Step | Action | Section |
| --- | --- | --- |
| 1 | Inspect template structure in DevTools | Explore and Observe |
| 2 | Build semantic sections (header → footer) | Intervene: Semantic Landing |
| 3 | Apply CSS fundamentals in `index.css` | CSS Styles |
| 4 | Add ATELIER reflection comment | Reflection |
| 5 | Commit + push | Deliverable |

---

## Verify before you leave

- [ ] One `<main>`; sections use `<section>` / `<article>` where appropriate
- [ ] Keyboard can reach all nav links and form controls
- [ ] Page is readable with CSS enabled (visual hierarchy visible)
- [ ] ATELIER reflection comment present in `index.html`
- [ ] Commit pushed to GitHub; Pages still loads

---

## Common failures

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Everything in `<div>` soup | Skipped semantic tags | Use `<header>`, `<main>`, `<section>`, `<footer>` |
| Nav links jump but no target | Missing `id` on sections | Match `href="#about"` to `id="about"` |
| Styles not applying | Wrong CSS path or not linked | `<link rel="stylesheet" href="assets/css/index.css">` |
| Live Server shows old file | Cache or wrong folder open | Open repo root; hard refresh |
| Copilot adds non-semantic markup | Accepted suggestion blindly | Re-read Critical Note; fix tags manually |

---

## Submit (Session 3 evidence)

- GitHub repo URL + Pages URL
- Commit message documents semantic landing work
- Optional: screenshot of DevTools accessibility tree

---

## ⏰ Estimated Duration

90 minutes (1 full session)

## 🎯 Objectives

- Practice **semantic HTML structure** following [Mozilla's guidelines](https://developer.mozilla.org/en-US/curriculum/core/semantic-html/).
- Apply **CSS fundamentals** from [Mozilla](https://developer.mozilla.org/en-US/curriculum/core/css-fundamentals/).
- Modify the **initial landing page** in your `index.html` project.
- Use **Git and commits** to document your process in your ATELIER repository:  
  👉 [ATELIER Methodology](https://ruvebal.github.io/web-atelier-udit/methodology/en/).

---

## 📂 Starting Point

- Your cloned repository:  
  [`student-project-template`](https://github.com/ruvebal/web-atelier-udit/tree/main/student-project-template)
- Key files:
  - `index.html` → landing page structure.
  - `assets/css/index.css` → basic styles.

---

## 🔑 UI Elements to Create in Your Landing

1. **Header with navigation** (`<header>` + `<nav>`).

   - Site logo or title.
   - Menu with internal links (`About`, `Projects`, `Contact`).

2. **Hero section** (initial block with `<h1>` and subtitle).

   - Brief phrase explaining what the website is about.
   - Option: include an image or highlighted background color.

3. **"About Me" section** (`<section>`).

   - Introduction paragraph.
   - Optional profile image.

4. **Projects gallery** (`<section>` + `<article>`).

   - At least 2 `<article>` elements with title and description.
   - Optional: screenshot or `<figure>`.

5. **Contact form** (`<form>` with `<input>` + `<textarea>` + `<button>`).

   - Symbolic (does not need to send anything).

6. **Footer** (`<footer>`).
   - Copyright information.
   - Links to social networks or GitHub.

---

## 📋 Activities

### 1. Explore and Observe (15 min)

1. Open `index.html` in VSCode.
2. Analyze its structure. Are there `<header>`, `<main>`, `<footer>`?
3. Check [MDN: Semantic HTML](https://developer.mozilla.org/en-US/curriculum/core/semantic-html/).
4. In your browser, inspect your page with DevTools to see how elements are rendered.

---

### 2. Intervene: Create Your Semantic Landing (30 min)

- Minimum structure you should create in `index.html`:

```html
<header>
	<h1>My Landing</h1>
	<nav>
		<a href="#about">About Me</a>
		<a href="#projects">Projects</a>
		<a href="#contact">Contact</a>
	</nav>
</header>

<main>
	<section id="hero">
		<h2>Welcome</h2>
		<p>An inspiring phrase for my site.</p>
	</section>

	<section id="about">
		<h2>About Me</h2>
		<p>Personal introduction text.</p>
	</section>

	<section id="projects">
		<h2>Projects</h2>
		<article>
			<h3>Project 1</h3>
			<p>Brief description.</p>
		</article>
		<article>
			<h3>Project 2</h3>
			<p>Brief description.</p>
		</article>
	</section>

	<section id="contact">
		<h2>Contact</h2>
		<form>
			<input type="text" placeholder="Your name" required />
			<input type="email" placeholder="Your email" required />
			<textarea placeholder="Your message"></textarea>
			<button type="submit">Send</button>
		</form>
	</section>
</main>

<footer>
	<p>© 2025 · My Name</p>
</footer>
```

### 3. CSS Styles (30 min)

In `assets/css/index.css` apply [CSS](https://developer.mozilla.org/en-US/curriculum/core/css-fundamentals/) fundamentals:

```css
body {
	font-family: sans-serif;
	line-height: 1.5;
	max-width: 900px;
	margin: 0 auto;
	padding: 1rem;
}

header,
footer {
	background: #f0f0f0;
	padding: 1rem;
}

nav a {
	margin-right: 1rem;
	text-decoration: none;
	color: #0066cc;
}

section {
	margin-bottom: 2rem;
}

form {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}
```

### 4. Reflection (10 min)

At the end of `index.html`, add:

```html
<!-- ATELIER Reflection: I learned that semantic elements improve accessibility 
and that CSS allows me to give visual hierarchy without altering HTML structure. -->
```

---

### 💡 Suggested Prompts to Improve Your `index.html` with Copilot

These prompts are phrases you can write as **comments in your code**.  
Copilot will generate suggestions that **you should then critically review** (don't accept anything without understanding it).

### 🎨 HTML Structure and Content

```html
<!-- Create a "hero" section with a main title, subtitle and a call-to-action button -->
```

```html
<!-- Add an article with image, title and paragraph inside the projects section -->
```

```html
<!-- Generate a contact form with name, email and message -->
```

```html
<!-- Create a footer with links to social networks (GitHub, LinkedIn, Instagram) -->
```

```html
<!-- Include a testimonials section with three quotes and people's names -->
```

---

## 🎨 CSS Styles

```css
/* Create a hero style with gradient background and centered text */
```

```css
/* Add responsive styles: make navigation menu turn into a column on small screens */
```

```css
/* Apply a two-column grid to the projects gallery */
```

```css
/* Define button styles with hover and smooth transition */
```

```css
/* Give consistent styling to the form: inputs with rounded borders and padding */
```

---

### 🧭 ATELIER Reflection

After using a prompt, add a comment with your evaluation:

```html
<!-- ATELIER Reflection: Copilot suggested a hero with background image. I adapted it to text because it improves accessibility. -->
```

---

### ⚠️ Critical Note

- Copilot **doesn't always follow good semantic or accessible practices**.
- Verify that tags are correct (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Adjust the code to your own style and design.

---

## ✅ Deliverable

- `index.html` populated with your landing page (with all UI elements).
- `assets/css/index.css` with applied styles.
- Final ATELIER reflection comment.
- Commit to your repo:

```bash
git add index.html assets/css/index.css
git commit -m "Populate semantic landing page with CSS fundamentals"
git push
```

{% comment %}
outcome-graphic-selection:
  source-section: "✅ Deliverable"
  visual-grammar: "semantic-interface-contract — semantic content layers becoming a durable styled interface contract"
{% endcomment %}
{% include lesson-outcome-graphic.html %}
