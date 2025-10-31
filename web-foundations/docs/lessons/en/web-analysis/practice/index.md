---
layout: lesson
title: 'Practice: Report on Outstanding Websites Analysis (SOW)'
title_alt: 'Práctica: Informe de Análisis de Sitios Web Sobresalientes (SOW)'
slug: web-analysis-practice
date: 2025-09-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/web-analysis/practice/
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

## Overview

This practice proposes creating a `/sow/index.html` page where each student analyzes at least **4 award-winning websites** (for example, winners at [Awwwards](https://www.awwwards.com/), [Webby Awards](https://www.webbyawards.com/), [FWA](https://thefwa.com/) or [CSS Design Awards](https://www.cssdesignawards.com/)). The goal is to practice critical web design analysis following the Atelier methodology: students will review aspects such as structure, usability, visuals and performance, and will reflect their conclusions and critical reasoning in a clear and well-structured report.

> Important: Please review first [https://ruvebal.github.io/web-atelier-udit/lessons/en/web-analysis/](https://ruvebal.github.io/web-atelier-udit/lessons/en/web-analysis/)

---

## 🎯 Practice objectives

- **Critical analysis**: Each site must be examined from several perspectives (structure, visual design, interaction, performance, etc.) and include a critical reflection about context and possible biases or social implications.
- **Iterative practice (Atelier)**:
  1. **Selection**: Why did you choose this award-winning site?
  2. **Initial impression**: What feelings does it generate?
  3. **Structure**: How is the information organized?
  4. **Visual**: Palette, typography, branding.
  5. **Interaction**: Animations, effects, microinteractions.
  6. **Usability**: Clarity, accessibility, loading.
  7. **Technical**: Speed, semantics, Core Web Vitals.
  8. **Excellence criteria**: Creativity, content, UX.
  9. **Conclusion**: Strengths, weaknesses, and learnings.

---

## 📂 Proposed semantic structure

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Some Outstanding Webs – Analysis of Award-Winning Sites</title>
		<link rel="stylesheet" href="/assets/css/index.css" />
		<link rel="stylesheet" href="/assets/css/sow.css" />
	</head>
	<body>
		<header>
			<h1>Some Outstanding Webs</h1>
			<nav>
				<!-- Fixed navigation menu -->
				<ul>
					<li><a href="#site-awwwards">Awwwards</a></li>
					<li><a href="#site-webby">Webby</a></li>
					<li><a href="#site-fwa">FWA</a></li>
					<li><a href="#site-cssda">CSSDA</a></li>
				</ul>
			</nav>
		</header>

		<main>
			<!-- Individual sections for each site -->
			<section id="site-awwwards">
				<h2>Awwwards</h2>
				<!-- Analysis content for the Awwwards site -->
			</section>

			<section id="site-webby">
				<h2>Webby Awards</h2>
				<!-- Analysis content for the Webby site -->
			</section>

			<!-- More sections for FWA, CSS Design Awards, etc. -->
		</main>

		<footer>
			<p>© 2025 Web Atelier (UDIT) – Analysis report.</p>
		</footer>
	</body>
</html>
```

In this outline we use elements like `<header>`, `<nav>`, `<main>`, `<section>`, `<h1>…<h6>`, and `<footer>` to give meaning to each block. Using semantic HTML improves code readability and accessibility [GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L181-L184). CSS is loaded in order: first the general file `/assets/css/index.css` (base template), and then a specific `sow.css` which may override styles where needed.

---

## 📌 Sticky menu

To make navigation between sections easier, the menu should be “sticky” or fixed at the top. With CSS it is straightforward:

```css
header {
	background: #fff;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
nav {
	position: sticky;
	top: 0;
	z-index: 1000;
}
nav ul {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
}
nav ul li {
	margin-right: 1rem;
}
nav ul li a {
	text-decoration: none;
	color: #333;
}
```

With this the `<nav>` will stay fixed while scrolling. As an advanced option, you can add `scroll-behavior: smooth` in CSS for smooth transitions when clicking the menu links, or hover/active styles for greater interactivity. For example:

```css
html {
	scroll-behavior: smooth;
}
nav ul li a:hover,
nav ul li a:focus {
	color: #007acc;
	outline: none;
}
```

---

## 🎬 Animated cover (optional)

You may include an **animated cover or intro** with striking typography (“Some Outstanding Webs”). This is optional, but it adds a creative touch. A basic example with CSS would be a fade-in effect on the title:

```html
<section class="cover">
	<h1 class="title">Some Outstanding Webs</h1>
</section>
```

```css
.cover {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background: #222;
	color: #fff;
}
.title {
	font-size: 3rem;
	text-transform: uppercase;
	opacity: 0;
	animation: fadeIn 2s forwards ease-in;
}
@keyframes fadeIn {
	to {
		opacity: 1;
	}
}
```

_Advanced:_ For a “typewriter” effect, you can animate the text width. For example:

```css
.title {
	overflow: hidden;
	white-space: nowrap;
	border-right: 0.15em solid currentColor;
	animation: typing 3s steps(30, end) forwards, blink-caret 0.75s step-end infinite;
}
@keyframes typing {
	from {
		width: 0;
	}
	to {
		width: 100%;
	}
}
@keyframes blink-caret {
	50% {
		border-color: transparent;
	}
}
```

This code makes the title appear letter by letter. Smooth animations that do not distract from the main content are encouraged. Any extra animation (subtle rotations, dynamic background, etc.) is welcome in the advanced version, as long as it does not negatively affect the experience or accessibility.

---

## 📝 Analysis sections

Each award-winning site must have its own section with the following suggested structure:

- **Site iframe:** Embed the site in an `<iframe>` so the reader can explore the page directly (if the site allows it). For example:

```html
<iframe src="https://www.awwwards.com" title="Awwwards site" width="100%" height="400" loading="lazy"></iframe>
```

- Adjust `height` as needed and add `loading="lazy"` to improve performance. Check that the site allows being shown in an iframe (some block this option; in that case a link will suffice).

- **Analysis text:** Next, a descriptive text in responsive columns. Use multicolumn CSS or flexbox so that on large screens the text flows in two columns. Example with CSS multicolumn:

```html
<div class="analysis-text">
	<p>The Awwwards site presents an immersive experience with a parallax effect in the header...</p>
	<!-- more paragraphs -->
</div>
```

```css
.analysis-text {
	columns: 1;
	column-gap: 2rem;
}
@media (min-width: 800px) {
	.analysis-text {
		columns: 2;
	}
}
```

- This ensures that the text is **readable** on mobile (one column) and lays out across two columns on wide screens. Make sure to explain each aspect following the analysis scheme (structure, visual, interaction, etc.) [GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L140-L148).

- **Screenshot grid:** Show representative screenshots of the site in a grid (gallery). For example:

```html
<div class="screenshots">
	<img src="/assets/sow/awwwards1.png" alt="Screenshot 1" />
	<img src="/assets/sow/awwwards2.png" alt="Screenshot 2" />
	<!-- more images -->
</div>
```

```css
.screenshots {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 1rem;
}
.screenshots img {
	width: 100%;
	height: auto;
	border: 1px solid #ccc;
}
```

- The grid automatically adjusts to the available width. This block visually illustrates what is analyzed in the text. Include brief captions in `alt` describing each capture.

- **Conclusion:** A final paragraph or list with the conclusions and **takeaways**. What makes the site outstanding? Where does it fall short? What learnings are obtained? This conclusion allows you to close the analysis with a brief critical reflection [GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L149-L152).

In each section use hierarchical headings (`<h2>` or `<h3>`), paragraphs and lists to keep semantics. For example:

```html
<section id="site-awwwards">
	<h2>Awwwards – Analysis of the winning site</h2>
	<iframe ...></iframe>
	<div class="analysis-text">
		<p>The Awwwards site X uses many scroll effects...</p>
		<ul>
			<li>
				<strong>Structure:</strong>
				...
			</li>
			<li>
				<strong>Visual:</strong>
				...
			</li>
			<!-- etc -->
		</ul>
	</div>
	<div class="screenshots">
		<img src="img1.png" alt="Screenshot 1" />
		<img src="img2.png" alt="Screenshot 2" />
	</div>
	<p class="conclusion">
		**Conclusion:** The site stands out for its creative animations, but it could improve loading to optimize performance
		on mobile.
	</p>
</section>
```

As basic vs. advanced tasks, you may include more detail in the text or extra effects in the advanced version (for example, a small slider/carousel for the captures instead of a static grid).

---

## 🎨 Use of CSS

- **Main stylesheet (`index.css`)**: It should contain general styles (typography, colors, reset, etc.). Load this file first.

- **Specific stylesheet (`sow.css`)**: Load after `index.css` to override or add styles specific to this report. For example, in `sow.css` you will define the layout rules for the menu, text columns and image grid described above. Like this:

```css
<link rel="stylesheet" href="/assets/css/index.css">
<link rel="stylesheet" href="/assets/css/sow.css">

```

---

## 🌟 Advanced options

For advanced students you may incorporate additional effects:

- **CSS animations**: Smooth transitions on buttons and images (`:hover { transform: scale(1.05); }`), parallax scrolling with background-attachment, or microinteractions with `@keyframes`.

- **Scroll reveal**: Use lightweight JavaScript libraries or the Intersection Observer API to animate sections when entering the viewport.

- **Animated SVG**: Include SVG graphics with animation (e.g., a logo that draws its outline).

- **Extra accessibility**: Add ARIA roles in the navigation menu or controls for screen readers.

- **Performance**: Implement `loading="lazy"`, optimize images (use WebP/AVIF, responsive versions), and keep CSS/JS clean.

These are optional but demonstrate depth in design. Always test with tools such as Lighthouse, WAVE or the W3C validator to support your technical analysis [GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L181-L184).

---

## 🤔 Critical reflection (Atelier)

Beyond the aesthetics, the report must include **critical reflections**. What does each site convey in terms of culture or purpose? Are there elements that benefit some users and exclude others? The Atelier methodology emphasizes the importance of questioning the why behind design [GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L183-L184). For example:

- Who does the visual style attract? Does it reinforce stereotypes or is it inclusive?

- What values or messages underlie the content?

- Is every “wow effect” technically justified or merely decorative?

- How does the site balance form vs. function (creativity vs. usability?) [GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L140-L148)?

These questions should guide your final conclusion for each analysis. Provide improvement points based on objective criteria and your professional judgment. Remember the practice is not just to describe, but to professionalize the discourse by reflecting on each finding [GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L183-L184)[GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L140-L148).

---

## Code examples (basic vs. advanced)

- **Basic semantic HTML:** Use the main tags and a simple structure as shown above.

- **Advanced HTML:** You could use more `section` or `article` for each part of the analysis, `<aside>` for side notes, or `<figure>` + `<figcaption>` for the screenshots.

- **Basic menu CSS:** `position: sticky` + flex layout.

- **Advanced menu CSS:** Responsive menu with hamburger on mobile, or a collapsible menu with transitions.

- **Basic screenshots:** Static grid as shown.

- **Advanced screenshots:** Carousel with arrows using CSS+JS, or a lightbox effect when clicking the image.

- **Basic animation:** `@keyframes fadeIn`.

- **Advanced animation:** The typing effect shown above, or even small Lottie/SVG animations for the title.

Each code block above is a starting point. Customize and complete it according to your design and analysis criteria. The important thing is to keep code clean, well indented, commented where needed, and without validation errors.

---

## ✅ Deliverable

- File `/sow/index.html` with at least 4 analyzed sites.
- Styles in `/assets/css/index.css` and `/assets/css/sow.css`.
- Sticky menu, iframes, critical texts, screenshot grid and conclusion.
- Optional: animated cover.
- **Commit to GitHub.**

```bash
git add sow/index.html assets/css/sow.css
git commit -m "Add SOW analysis report with 4 award-winning sites"
git push
```

---

## 📊 Assessment

- **Depth and clarity** of the analysis.
- **Semantic structure and clean code**.
- **Design and visual quality**.
- **Critical reflection** following Atelier.

Good luck with the practice! This exercise seeks to combine aesthetic observation with technical rigor. **Analyze each site like a professional:** describe, evaluate and propose improvements based on clear criteria. Use the guide and references as support, but be creative in your implementation. A good analysis will balance form and substance [GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L140-L148)[GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L183-L184), and will demonstrate your critical thinking according to the Atelier methodology.

**Good luck and get to work!**