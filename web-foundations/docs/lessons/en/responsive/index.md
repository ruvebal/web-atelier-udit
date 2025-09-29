---
layout: lesson
title: 'Web Design: Responsive, Fluid and Intrinsic'
title_en: ''
slug: responsive
date: 2025-09-10
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/responsive/
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

## Introduction and Context

> Good designers and developers are innovative by nature, and as more and more content makers begin to play with intrinsic the design, the more stunning and jaw dropping their creations will become. — **Danny Decker**[^1]

**Responsive web design** refers to creating websites capable of providing an optimal user experience across a wide variety of devices, from desktop computers to mobile phones[^2].

Currently, there are hundreds of different screen sizes used by users; in fact, on a website with sufficient traffic, **more than 1,000 different resolutions** can be recorded[^3]. This enormous diversity—which includes not only PCs and smartphones, but also tablets, 4K TVs, wearables and screens integrated into IoT devices—makes it **essential** for designers to adopt adaptive approaches. A design that doesn't adapt to different screens can offer a poor experience or even become unusable on certain devices. Therefore, **responsive** (adaptive) and **fluid** design techniques have become fundamental to ensure **accessibility and usability** in the _modern web ecosystem_.

**Learning objectives:**

- Understand **why** responsive and fluid design emerged, in the context of the rise of mobile devices and the Internet of Things (IoT).
- Know the **historical evolution** of adaptive web design, from the first fluid _layouts_ and the use of CSS _media queries_, to modern techniques such as **fluid design** (`clamp()` et.al.) and **intrinsic design** (`@container`)
- Apply **practically** modern CSS techniques—`media queries`, `container queries`, `style queries` `clamp()` function, relative units (`em`, `rem`, `vw`, `vh`, `%`, etc.)—to create fluid and adaptive designs in HTML/CSS **without using frameworks**.
- Reflect on the **advantages and limitations** of each technique (responsive _vs_ fluid design) and the possibilities of **combining** them in real projects.

## Fundamentals of Responsive, Fluid and Intrinsic Design

### The need for adaptive design in the multi-device era

The explosive growth of web-enabled devices over the last two decades completely changed the way we approach website design. In the early 2000s, most pages were designed thinking only of desktop monitors with fixed sizes; no major variability in screen dimensions was considered[^4]. However, the arrival of the **smartphone** (marked by the iPhone launch in 2007) began a new era. In a few years, millions of people began browsing on small screens and in vertical orientation, forcing a rethink of traditional web designs[^5]. Soon **tablets**, e-readers, smart TVs and even watches were added, each with different resolutions and navigation characteristics.

By 2015, mobile access already exceeded desktop in traffic volume[^6], and companies like Google began penalizing sites not optimized for mobile in positioning (the so-called _"Mobilegeddon"_ of 2015[^7]). In this context, the **imperative need** arose for websites to be able to "adapt" to the user's environment instead of forcing the user to adapt to the site (e.g., constantly zooming on mobile). Thus, adaptive design became a **crucial strategy** for reaching and retaining modern audiences in the multi-device era[^8].

### Brief historical evolution: from fixed layouts to fluid grids and _responsive design_

In the early days of the web, layouts were usually **static or fixed**: defined in pixels, with a rigid width designed for screens of ~800px or 1024px wide. This generated poor experiences outside that range (horizontal scroll bars on small screens, or huge empty margins on large screens).

As more screen sizes appeared, alternatives were explored. Before the popularization of the term _responsive_, there were attempts at **liquid or fluid design** (_liquid layouts_), where widths were defined in percentages or `em` (relative units) instead of pixels. The idea was that the page would stretch or shrink to fill the available space[^9]. Although this fluid approach worked well in certain ranges (e.g., tablets or medium monitors), problems were found at the extremes: on very large screens images and elements could expand excessively, and on very small screens the text became tiny and illegible[^10]. Attempts were made to improve by introducing maximum and minimum widths for the container, but this reintroduced empty areas on huge screens or caused horizontal scroll again on ultra-small screens[^11]. In parallel, the so-called **adaptive design (Adaptive Web Design)** also emerged, which consisted of preparing **multiple static templates** for different sizes (for example, a specific design for mobile, another for tablet, another for desktop) and choosing which one to show according to the device or detected width[^12]. While adaptive allowed some degree of device optimization, it involved maintaining several versions of the site (higher cost) and often provided an inconsistent experience—for example, mobile versions with reduced content or functionality[^13].

The great leap occurred in **May 2010**, when designer Ethan Marcotte published in _A List Apart_ the article **"Responsive Web Design"**, coining the term and proposing a new methodology[^14]. Marcotte integrated several ideas: the use of **fluid grids** and **flexible images** combined with the newly standardized **CSS3 media queries**. In a previous article (2009) he had already introduced the concept of _fluid grids_, explaining how to convert a pixel design to relative percentages based on the browser's text size[^15]. Now, with media queries, it was possible to apply different CSS rules according to device characteristics (screen width, orientation, resolution, etc.). In summary, **Responsive Web Design (RWD)** involved building a single page capable of **reorganizing its layout and scaling its elements fluidly** to look good on any device[^16].

This unified _"One Web"_ approach proved to be the most viable: instead of multiple sites, one that "responded" to the environment. The classic RWD techniques are summarized in: **fluid grids** (columns dimensioned in % instead of pixels[^17]), **flexible images** (images with max-width: 100% so they don't exceed their container[^18]), and **CSS media queries** to apply design changes at specific breakpoints[^19]. This philosophy spread rapidly: by 2013–2015 it became an industry standard, supported by methodologies like _mobile-first_ (design first for mobile and "scale" to desktop) and popular frameworks (Bootstrap, Foundation, etc.) that incorporated responsive grids.

In recent years, an increasingly **intrinsic and fluid** approach to adaptive web design has emerged. It's not about completely abandoning _breakpoints_, but letting CSS do more continuous work for us. For example, typography and margins can be defined with `clamp()` and relative units, greatly reducing the necessary media queries[^20]. Similarly, **container queries** and the newly appeared **style queries** allow components to adapt to their immediate context.

**Summarizing the evolution:**

- _1990s–2000s:_ Fixed layouts in pixels (designed for ~800px–1024px).

- _2005–2010:_ Liquid ("fluid") layouts with `%` and `em`.

- _2010:_ Ethan Marcotte publishes _"Responsive Web Design"_, proposing fluid grids, flexible images and CSS3 media queries.

- _2013–2015:_ _Mobile-first_ methodologies and frameworks (Bootstrap, Foundation) consolidate RWD in the industry.

- _2020:_ CSS Grid and Flexbox are widely supported; advanced CSS functions like `minmax()`, `clamp()`, `vw/vh` units emerge.

- _2023–2025:_ Adoption of **Container Queries** and **Style Queries** in browsers; rise of **intrinsic design**.

### **Responsive**, **Fluid** and **Intrinsic** Design

It's common to confuse the terms, since they all refer to making the interface adapt. In this guide we'll distinguish them as follows:

- **Fluid Design (or "liquid")**: All dimensions in the stylesheet are defined with **relative units** (%, `em`, `rem`, `vw`, etc.) instead of fixed pixel values. This way, the design scales continuously when the user resizes the window or changes devices. A _pure_ fluid layout avoids using any fixed width when not necessary[^21]. For example, a column might occupy `50%` of the container width instead of, say, `400px`. If the container grows, the column grows proportionally. The advantage is maximum space utilization at each size and **smooth** transitions, without abrupt "jumps". However, as we saw, pure fluid can lead to the extreme of disproportionate elements (text too small on mobile, excessively long text lines on XXL screens, etc.). The modern solution incorporates **limits**: it's common to combine fluid with _minimum_ and _maximum_ values for certain key elements. For example, you can allow a title to scale with the screen but setting a minimum of 16px so it's never illegible on a phone[^22]. In sum, fluid design seeks that everything _flows_ proportionally to the available space, maintaining some limits to ensure usability.

- **Responsive Design (Responsive or Adaptive)**: In the strict sense, _responsive web design_ is a broad approach that encompasses several techniques (in fact, a good responsive design usually includes fluid components). For comparison purposes, we can define the typical responsive approach as one that uses **breakpoints** with **CSS media queries** to reorganize or resize elements at certain predefined widths. Outside those points, dimensions sometimes remain fixed. For example, a site might show with a fixed width of 1200px on large screens, but below 992px width it would apply a media query to switch to 100% width (fluid) or to a column; then below 768px another media query to reorganize even more (collapsed menu, etc.). This would be a _classic adaptive responsive approach_, sometimes called **adaptive design** in Spanish when emphasizing the use of breakpoints. The web "jumps" or **changes design at certain thresholds** instead of adjusting every pixel continuously. Well executed, responsive can offer highly optimized designs per size range, showing or hiding elements as appropriate for each format. However, if fixed values are overused and only a few breakpoints are relied on, there may be suboptimal ranges between those points (for example, 801px width versus 799px could give quite different experiences if there's only a break at 800px).

- **Intrinsic Design (Intrinsic Design):** In this approach **the content itself shapes the layout**, instead of passively adapting to it[^23]. With CSS Grid and Flexbox, designs are created based on the _intrinsic size_ of the content: areas with large content occupy more space and small ones adjust proportionally[^24]. This allows "elastic" interfaces that minimize hacks and media queries: for example, using `grid-template-columns: minmax(min-content, 1fr)` lets columns grow according to their content[^25]. Intrinsic design seeks that the layout be more natural and **self-adjusting**, reducing abrupt jumps between breakpoints.

**Similarities and combination:** Both responsive and fluid design pursue the same goal: that the page **adapts to multiple screen sizes**. In fact, they are not exclusive, but complementary. Modern responsive design usually incorporates fluidity in many elements, and only uses breakpoints when it's necessary to change the general arrangement. In the words of some authors, fluid design is really a form of responsive design, in which fixed sizes are avoided whenever possible[^26]. In practice, a recommended approach is to use **fluidity by default** (layouts based on percentages or Grid `fr`, scalable text and images) and apply **media queries** for more drastic structure adjustments or to limit that fluidity at extremes. Thanks to this we get a smoother experience _between_ breakpoints, avoiding dead spaces, and at the same time guarantee an appropriate presentation in each device range[^27].

**When to use one or the other?** It's not really about choosing between "responsive vs fluid vs elastic", but about how much emphasis to give to each strategy. If our content is relatively simple and can be reorganized into a single column on mobile, we could opt for a very fluid design with minimal breakpoints. On the other hand, if we design a very complex interface (e.g., a web application) we might need multiple breakpoints and certain elements with minimum fixed sizes to maintain consistency. In general, nowadays it's advised to **combine**: use fluidity whenever it improves the experience (typography, containers that scale, etc.) and use breakpoints for layout changes or to maintain readability and aesthetics. We'll explore how to achieve this combination in practice.

### Current trends: fluid design vs responsive? Where are we heading?

In the 2024-2025 landscape, we see an interesting convergence: after years of consolidating responsive design, approaches that we could call "fluid" or **intrinsically responsive design** are gaining prominence. This doesn't mean discarding breakpoints, but many things that before could only be solved with media queries today are achieved with fluid techniques or new CSS functionalities:

- **Fluidity in typography and spacing:** As we've already practiced, the use of `clamp()` with relative units has reduced the need to write multiple media queries for things like adjusting font size, margins or column widths. This simplifies CSS and creates smoother transitions. In a way, **fluid design is partially replacing traditional responsive** in those micro aspects: we no longer need breakpoints for each text size, because fonts are liquid by nature[^35]. Many modern sites adopt this "fluid typography" to improve visual consistency on any device without noticeable jumps.

- **Container Queries:** One of the most anticipated additions to CSS (already available in modern browsers) are _container queries_. If traditional media queries base conditions on the viewport (global), container queries allow a component to adapt its style according to the size of its specific **parent container**. This is revolutionary for _responsive_ component design. For example, a card widget could have different arrangements of its internal elements if its container is wide or narrow, regardless of the global page size. Container queries complement fluid design, making contextual responsive possible. As they become standardized, we'll see even more modular design patterns.

- **Intrinsic Web Design:** In recent years there has been a shift towards what expert Jen Simmons calls Intrinsic Web Design – creating context-aware components, capable of adapting according to the available space where they are placed[^36]. New CSS specifications, especially Container Queries and Subgrid, make this intrinsic approach possible by allowing responsive design at the component level. These features represent the next evolutionary step of responsive design, solving historical problems we faced with hacks or JavaScript.

- **Other trends:** _Responsive Web Design_ continues to evolve with technology: the increase in foldable devices, for example, introduces concepts of different windows on the same device; integration with TV platforms or vehicles requires thinking about different viewing distances; and accessibility emphasizes adapting not only to size but to user needs (zoom, contrasts, motion preferences). Also, the arrival of tools like **CSS Nesting**, **CSS Layers**, etc., facilitate managing complex CSS in an organized way, which is useful when we combine many responsive conditions.

In summary, **fluid doesn't replace responsive, but enriches it**. We'll continue defining breakpoints for major layout changes, but we'll probably need fewer "minor" breakpoints because we'll let CSS do the continuous work for us in relative size matters. The trend is to achieve more "**elastic**" interfaces (a term sometimes used), that feel natural in any environment without showing abrupt break points.

### Advantages and limitations: comparative approaches

To consolidate concepts, let's make a **comparative** of the advantages, disadvantages and considerations of each technique:

- **Media Queries (Classic responsive):**

  - _Advantages:_ Allow **granular control**: we can reorder, show/hide elements, completely change styles in different screen ranges. They are very powerful for adapting **layout** and content to each context (e.g., a different menu on mobile). Easy to understand: "at such width, apply these styles".
  - _Limitations:_ Require anticipating break points; if a new intermediate size appears we might have to adjust the CSS. They can generate _discrete_ experiences (jumps). Overuse of media queries complicates maintenance (long CSS fragmented by breakpoints). They don't solve _continuous_ adaptation well within a range (only before/after the break).
  - _When to use them:_ Whenever we need **drastic changes** in layout or styles that can't be achieved with fluid values alone. For example, changing from a horizontal menu to a hamburger menu on mobile, or switching from a multi-column design to a single column. Also for applying totally different styles in landscape vs portrait orientation, etc.

- **Fluid Design (relative units, %):**

  - _Advantages:_ **Simplicity** in many cases: use % and let the browser calculate. Guarantees optimal space usage at any resolution (no "dead spaces" outside breakpoints). Less conditional CSS; sometimes with a single % rule you adapt to a thousand sizes. Improves visual sensation, avoiding that the user notices abrupt changes. Ideal for **proportional** elements (e.g., a chart that should always occupy 100% of the container).
  - _Limitations:_ Without anchor points, it can cause **usability problems** at extremes: if everything is completely liquid, on huge screens content can become too expanded (very long text lines, giant images) and on tiny screens everything gets cramped[^37]. Requires thinking about **limits** (min/max) to not break the design. Also, it can't by itself deeply reorganize the layout (e.g., it doesn't automatically convert a horizontal menu to vertical; that needs a media query or conditional flex-direction).
  - _When to use it:_ In **scalable components** where continuous adaptation is desirable: texts, boxes, margins, elements that simply must grow or shrink according to space. Use it for the _99% of the time_ when the page is between the main breakpoints. In general, start your styles using relative units and only add breakpoints if you detect that at some point something stops looking good.

- **`clamp()` function and viewport units (`vw`, etc.):**
  - _Advantages:_ Bring the best of fluid with the safety of limits. `clamp()` in particular reduces many media queries to a single rule[^38]. Facilitates creating truly **responsive-by-definition** components (e.g., a title with `clamp()` already "knows" how to adapt in any scenario). Viewport units allow relating elements to the real screen size (useful for fullscreen sections, for example a banner that always occupies 100vh of the viewport).
  - _Limitations:_ Can be a bit **counterintuitive** at first (you have to choose vw values and limits well to achieve the desired effect, sometimes trial and error). Overusing viewport units in elements within small containers could lead to inconsistencies (e.g., using `vw` for something within a narrow sidebar doesn't account for the sidebar, better use `%` in that case). On mobile browsers, `vh` can have peculiar behaviors due to the dynamic address bar.
  - _When to use them:_ `clamp()` for any property you want to be fluid but **bounded**. _Viewport units_ for global dimensions or elements that depend on the full window size (backgrounds, main typography, etc.), with caution to combine with `clamp` or `minmax` as needed.

In practice, a **good responsive design** will combine all this: you'll use relative units and clamp for many things, and you'll have some strategic media queries. The result should be a site that **responds** to the environment (responsive) but in a **flexible** way (fluid) at all times, adopting an **elastic** mindset where each component is aware of its context and adapts intrinsically.

## Modern Techniques for Fluid Design

### Relative units in CSS: the foundation of fluid design

Fluid design is based on the use of **relative units** instead of fixed values. These units allow elements to adapt proportionally to the size of their container or viewport:

- **Percentages (`%`)**: They are calculated relative to the parent element. Useful for widths, heights and margins that should be proportional.
- **Viewport units (`vw`, `vh`, `vmin`, `vmax`)**: They are based on the browser window size. `1vw` = 1% of the viewport width.
- **Relative units (`rem`, `em`)**: `rem` is based on the root element font size, `em` on the parent element.
- **Fraction units (`fr`)**: Specific to CSS Grid, they distribute the available space proportionally.

**Practical example:**

```css
.container {
	width: 90%; /* 90% of the parent container */
	max-width: 1200px; /* Maximum limit */
	margin: 0 auto; /* Centered */
	padding: 2rem; /* Spacing relative to font size */
}

.grid {
	display: grid;
	grid-template-columns: 1fr 2fr 1fr; /* Proportional columns */
	gap: 2vw; /* Space between elements relative to viewport */
}
```

### Fluid typography with CSS `clamp()`: texts that adapt without jumps ✨

The `clamp()` function is one of the most powerful tools for creating truly fluid typography. It allows defining a value that scales between a minimum and maximum:

```css
/* Syntax: clamp(minimum_value, preferred_value, maximum_value) */
h1 {
	font-size: clamp(1.5rem, 4vw, 3rem);
	/* Scales from 1.5rem to 3rem, using 4vw as preferred value */
}

p {
	font-size: clamp(1rem, 2.5vw, 1.25rem);
	line-height: clamp(1.4, 1.6, 1.8);
}
```

**Advantages of `clamp()`:**

- **No abrupt jumps**: The transition is smooth between sizes
- **Fewer media queries**: A single rule replaces multiple breakpoints
- **Better readability**: Texts are always in the optimal range
- **Simplified maintenance**: Less conditional CSS

**Advanced example with CSS variables:**

```css
:root {
	--text-xs: clamp(0.75rem, 1.5vw, 0.875rem);
	--text-sm: clamp(0.875rem, 2vw, 1rem);
	--text-base: clamp(1rem, 2.5vw, 1.125rem);
	--text-lg: clamp(1.125rem, 3vw, 1.25rem);
	--text-xl: clamp(1.25rem, 4vw, 1.5rem);
	--text-2xl: clamp(1.5rem, 5vw, 2rem);
	--text-3xl: clamp(2rem, 6vw, 3rem);
}

/* Consistent use throughout the application */
.title {
	font-size: var(--text-3xl);
}
.subtitle {
	font-size: var(--text-xl);
}
.body {
	font-size: var(--text-base);
}
```

### Fluid layouts with CSS Grid and more modern techniques

So far we've talked about fluid designs mainly in terms of continuous scaling of sizes. But **fluidity** can also be applied to the general composition of the page using the new CSS Layout capabilities:

- **CSS Grid Auto-fill/auto-fit:** Grid Layout allows us to create **responsive grids without media queries** in certain cases. For example, we can have a container of cards and we want as many columns as fit 200px wide each. Using `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));` we achieve that the grid automatically adds more columns fluidly as space allows, and reduces the number of columns when space is smaller (placing the remaining cards in new rows). Each card in that example would have a minimum of 200px (to not become too narrow) and a maximum of 1fr (to fill the available space). This technique produces an adaptive reflow effect without specifying explicit breakpoints.

- **Flexbox with `flex-basis` and `flex-grow`:** Similar to Grid, Flexbox can create layouts that adapt fluidly. With `flex: 1 1 200px` (which is `flex-grow: 1; flex-shrink: 1; flex-basis: 200px;`), elements will grow to fill the available space, shrink if necessary, but maintain a base size of 200px. This is useful for creating sidebars that adapt to content or for distributing elements proportionally.

- **Container Queries:** A more recent functionality (though still with limited browser support) are _container queries_. Unlike media queries that are based on viewport size, container queries allow a component to adapt according to the size of its **parent container**. This is revolutionary for reusable component design: a card widget could have a different layout if it's in a narrow sidebar versus if it's in the main content, regardless of screen size. As support improves, we'll see even more modular and truly "intrinsic" design patterns.

### Responsive images and other graphic elements

Images are one of the most challenging elements in responsive design, as they need to adapt both in size and content:

- **Scalable images:** The basic rule `max-width: 100%; height: auto;` makes images scale proportionally without exceeding their container. However, this can lead to very small images on large screens or very large images on small screens. A more sophisticated solution is to use the `object-fit` property with fixed dimensions: `width: 100%; height: 200px; object-fit: cover;` ensures that the image maintains its proportions and fills the assigned space, cropping if necessary.

- **`<picture>` element and `srcset`:** For more granular control, the `<picture>` element allows specifying different images according to screen size or pixel density. This is crucial for optimizing performance: loading a 300px wide image on mobile and a 1200px one on desktop. The browser automatically selects the most appropriate image.

- **SVGs and vector graphics:** SVGs (vector graphics) are intrinsically scalable. An SVG inserted in the page can behave as a "flexible image" without quality loss. Always make sure to give them relative width/height attributes or appropriate CSS styles. A trick: if we embed SVG directly in HTML, we can use CSS to control its size like any element (e.g., `width: 50%;`). SVG icons, for example, can be colored or sized with `em` to accompany text fluidly.

- **Embedded elements (iframes, videos):** To make a YouTube video or Google map _responsive_, it's usually wrapped in an aspect ratio container. This involves a bit more CSS (using percentages in padding for 16:9 ratio, etc.). It's an advanced detail, but mentionable: there are techniques with `aspect-ratio` in modern CSS that facilitate defining that an element should maintain a certain proportion when resizing.

In our practical examples, we'll focus on simple images and SVG. Always make sure to test how your images behave when the screen changes size. An image too small with `max-width:100%` can pixelate on large screens; one too large can exceed containers without that rule. **Check both extremes.**

## Practical Exercises: Learning Progression

| Example | Techniques                 | Level        | Purpose                 |
| ------- | -------------------------- | ------------ | ----------------------- |
| **1**   | Media Queries + Flexbox    | Basic        | Responsive fundamentals |
| **2**   | Grid + Container Queries   | Intermediate | Modern techniques       |
| **3**   | SPA + Scroll-snap + Images | Advanced     | Complete project        |

### Practical example 1: Basic Responsive Portfolio with Media Queries and Flexbox

To understand the fundamentals of responsive design, we'll create a portfolio that uses traditional but effective techniques. We'll use **media queries** to adapt the layout according to viewport size and **Flexbox** to create flexible layouts. This will be our starting point that we'll evolve in Example 2.

**HTML:** Basic portfolio structure:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>My Portfolio - Basic Responsive</title>
		<link rel="stylesheet" href="styles.css" />
	</head>
	<body>
		<header class="site-header">
			<div class="container">
				<h1 class="site-title">My Portfolio</h1>
				<nav class="main-nav">
					<ul class="nav-list">
						<li><a href="#home">Home</a></li>
						<li><a href="#about">About Me</a></li>
						<li><a href="#work">Work</a></li>
						<li><a href="#contact">Contact</a></li>
					</ul>
				</nav>
			</div>
		</header>

		<main class="main-content">
			<div class="container">
				<!-- Hero Section -->
				<section class="hero-section">
					<h2>Hello, I'm [Your Name]</h2>
					<p>Frontend Developer specialized in responsive design</p>
					<a href="#work" class="cta-button">View my work</a>
				</section>

				<!-- Projects Section -->
				<section class="projects-section">
					<h2>My Projects</h2>
					<div class="projects-grid">
						<article class="project-card">
							<img src="https://picsum.photos/400/300?random=1" alt="Project 1" />
							<div class="project-info">
								<h3>Web Project</h3>
								<p>Description of the first project developed with basic responsive techniques.</p>
								<div class="project-tags">
									<span class="tag">HTML</span>
									<span class="tag">CSS</span>
									<span class="tag">JavaScript</span>
								</div>
							</div>
						</article>

						<article class="project-card">
							<img src="https://picsum.photos/400/300?random=2" alt="Project 2" />
							<div class="project-info">
								<h3>Mobile App</h3>
								<p>An application that adapts to different devices using media queries.</p>
								<div class="project-tags">
									<span class="tag">React</span>
									<span class="tag">Flexbox</span>
									<span class="tag">API</span>
								</div>
							</div>
						</article>

						<article class="project-card">
							<img src="https://picsum.photos/400/300?random=3" alt="Project 3" />
							<div class="project-info">
								<h3>Dashboard</h3>
								<p>Control panel with responsive layout using Flexbox and media queries.</p>
								<div class="project-tags">
									<span class="tag">Vue.js</span>
									<span class="tag">CSS</span>
									<span class="tag">Node.js</span>
								</div>
							</div>
						</article>
					</div>
				</section>
			</div>
		</main>

		<footer class="site-footer">
			<div class="container">
				<p>&copy; 2025 My Portfolio. Designed with basic responsive techniques.</p>
			</div>
		</footer>
	</body>
</html>
```

**CSS:** We implement Media Queries and Flexbox (basic version):

```css
/* ===== BASIC RESPONSIVE PORTFOLIO ===== */

/* Basic CSS variables */
:root {
	--primary-color: #2563eb;
	--secondary-color: #64748b;
	--accent-color: #f59e0b;
	--text-color: #1e293b;
	--bg-color: #f8fafc;
	--white: #ffffff;
	--border-color: #e2e8f0;
	--spacing-sm: 1rem;
	--spacing-md: 1.5rem;
	--spacing-lg: 2rem;
	--spacing-xl: 3rem;
	--border-radius: 0.5rem;
	--shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Basic reset */
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: system-ui, -apple-system, sans-serif;
	line-height: 1.6;
	color: var(--text-color);
	background-color: var(--bg-color);
}

/* ===== BASIC CONTAINER ===== */
.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 var(--spacing-sm);
}

/* ===== RESPONSIVE HEADER ===== */
.site-header {
	background: var(--primary-color);
	color: white;
	padding: var(--spacing-md) 0;
}

.site-header .container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: var(--spacing-sm);
}

.site-title {
	font-size: 1.5rem;
	font-weight: 700;
}

.main-nav ul {
	display: flex;
	list-style: none;
	gap: var(--spacing-md);
}

.main-nav a {
	color: white;
	text-decoration: none;
	padding: 0.5rem 1rem;
	border-radius: var(--border-radius);
	transition: background-color 0.2s;
}

.main-nav a:hover {
	background-color: rgba(255, 255, 255, 0.1);
}

/* ===== SECTIONS ===== */
.hero-section {
	text-align: center;
	padding: var(--spacing-xl) 0;
	background: linear-gradient(135deg, var(--primary-color) 0%, #1e40af 100%);
	color: white;
	margin: var(--spacing-lg) 0;
	border-radius: var(--border-radius);
}

.hero-section h2 {
	font-size: 2rem;
	margin-bottom: var(--spacing-sm);
}

.hero-section p {
	font-size: 1.125rem;
	margin-bottom: var(--spacing-lg);
	opacity: 0.9;
}

.projects-section {
	margin: var(--spacing-xl) 0;
}

.projects-section h2 {
	text-align: center;
	font-size: 1.75rem;
	margin-bottom: var(--spacing-lg);
}

/* ===== PROJECTS GRID WITH FLEXBOX ===== */
.projects-grid {
	display: flex;
	flex-wrap: wrap;
	gap: var(--spacing-lg);
	justify-content: center;
}

.project-card {
	flex: 1;
	min-width: 300px;
	max-width: 400px;
	background: var(--white);
	border-radius: var(--border-radius);
	overflow: hidden;
	box-shadow: var(--shadow);
	transition: transform 0.2s;
}

.project-card:hover {
	transform: translateY(-4px);
}

.project-card img {
	width: 100%;
	height: 200px;
	object-fit: cover;
}

.project-info {
	padding: var(--spacing-md);
}

.project-info h3 {
	font-size: 1.125rem;
	margin-bottom: var(--spacing-sm);
}

.project-info p {
	color: var(--secondary-color);
	margin-bottom: var(--spacing-md);
	font-size: 0.875rem;
}

/* ===== TAGS ===== */
.project-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
}

.tag {
	background: var(--primary-color);
	color: white;
	padding: 0.25rem 0.75rem;
	border-radius: 9999px;
	font-size: 0.75rem;
	font-weight: 500;
}

/* ===== CTA BUTTON ===== */
.cta-button {
	background: var(--accent-color);
	color: white;
	padding: var(--spacing-sm) var(--spacing-lg);
	text-decoration: none;
	border-radius: var(--border-radius);
	font-weight: 600;
	transition: background-color 0.2s;
	display: inline-block;
}

.cta-button:hover {
	background: #d97706;
}

/* ===== MEDIA QUERIES ===== */
/* Tablet: 2 columns */
@media (max-width: 768px) {
	.projects-grid {
		justify-content: center;
	}

	.project-card {
		flex: 1;
		min-width: 280px;
		max-width: 350px;
	}

	.hero-section h2 {
		font-size: 1.5rem;
	}
}

/* Mobile: 1 column */
@media (max-width: 480px) {
	.site-header .container {
		flex-direction: column;
		text-align: center;
	}

	.main-nav ul {
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.site-title {
		font-size: 1.25rem;
	}

	.projects-grid {
		flex-direction: column;
		align-items: center;
	}

	.project-card {
		width: 100%;
		max-width: 100%;
	}

	.hero-section {
		padding: var(--spacing-lg) 0;
	}

	.hero-section h2 {
		font-size: 1.25rem;
	}
}

/* ===== BASIC TYPOGRAPHY ===== */
h1,
h2,
h3 {
	font-weight: 600;
	line-height: 1.2;
}

h1 {
	font-size: 1.5rem;
}

h2 {
	font-size: 1.75rem;
}

h3 {
	font-size: 1.125rem;
}

p {
	margin-bottom: var(--spacing-sm);
}

/* ===== FOOTER ===== */
.site-footer {
	background: var(--secondary-color);
	color: white;
	text-align: center;
	padding: var(--spacing-lg) 0;
	margin-top: var(--spacing-xl);
}

/* ===== RESPONSIVE IMAGES ===== */
img {
	max-width: 100%;
	height: auto;
}

/* ===== UTILITIES ===== */
.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}
```

**How does this example work?**

1. **Media Queries**: We use `@media (max-width: 768px)` and `@media (max-width: 480px)` to change the layout according to viewport size.

2. **Flexbox**: The projects grid uses `display: flex` with `flex-wrap` to create a flexible layout that adapts automatically.

3. **Strategic Breakpoints**:

   - **Desktop** (>768px): 3 project columns with flexbox
   - **Tablet** (≤768px): 2 project columns
   - **Mobile** (≤480px): 1 project column and vertical navigation

4. **Base Structure**: This example establishes the base that we'll evolve in Example 2 with more advanced techniques.

**Advantages of this basic approach:**

- **Simplicity**: Easy to understand and maintain
- **Compatibility**: Works in all browsers
- **Control**: Clear and predictable breakpoints
- **Solid Base**: Structure that can be improved progressively

**Evolution towards Example 2:**

This basic portfolio will be the base for Example 2, where:

- We'll replace **Flexbox** with **CSS Grid** with `auto-fit`
- We'll add **Container Queries** for intrinsic adaptation
- We'll implement **fluid typography** with `clamp()`
- We'll add **scroll snapping** and **screen-frames**

**Common Breakpoints:**

- **Mobile**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px+

**Tips for Media Queries:**

```css
/* Mobile First: Start with mobile and add styles for larger screens */
@media (min-width: 768px) {
	/* Styles for tablet and desktop */
}

/* Desktop First: Start with desktop and add styles for smaller screens */
@media (max-width: 768px) {
	/* Styles for tablet and mobile */
}
```
