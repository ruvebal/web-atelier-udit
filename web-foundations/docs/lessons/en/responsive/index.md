---
layout: lesson
title: 'Web Design: Responsive, Fluid and Intrinsic'
title_alt: ''
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

<figure class="quote">
  <blockquote>
    Good designers and developers are innovative by nature, and as more and more content makers begin to play with intrinsic the design, the more stunning and jaw dropping their creations will become.
  </blockquote>
  <figcaption>
    &mdash; <cite>Danny Decker</cite>[^1]
  </figcaption>
</figure>

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

### Responsive, Fluid and Intrinsic Design

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

### Style Queries: The Next Evolution of Contextual Design 🆕

**Style Queries** represent the natural evolution of Container Queries. While Container Queries allow components to adapt based on the **size** of their container, Style Queries allow them to adapt based on the **style properties** of their container. This opens up completely new possibilities for contextual design.

**What are Style Queries?**

Style Queries allow CSS components to respond to the style properties of their container, not just their size. This is revolutionary because it enables more contextual and semantic adaptation based on visual context.

**Basic example:**

```css
/* Dark theme container */
.theme-dark {
	--color-primary: #3b82f6;
	--color-surface: #1e293b;
}

/* Component that adapts to container theme */
@container style(--color-surface: #1e293b) {
	.card {
		background: var(--color-surface);
		color: white;
		border: 1px solid #374151;
	}
}

@container style(--color-surface: #f8fafc) {
	.card {
		background: var(--color-surface);
		color: #1e293b;
		border: 1px solid #e2e8f0;
	}
}
```

**Advantages of Style Queries:**

- **Semantic context**: Components adapt to style context, not just size
- **Advanced componentization**: Better encapsulation of styles and behavior
- **Thematic flexibility**: Enables more sophisticated design systems with multiple themes
- **Maintainability**: Reduces need for multiple utility classes and JavaScript

**Support status (2025):**

- **Chrome 111+**: Experimental support with flag `--enable-blink-features=CSSContainerStyleQueries`
- **Firefox**: In development
- **Safari**: In development

**Practical example - Component system:**

```html
<!-- Component that adapts to container theme -->
<div class="theme-dark">
	<div class="card">
		<h3>Card title</h3>
		<p>Content that automatically adapts to theme.</p>
	</div>
</div>

<div class="theme-light">
	<div class="card">
		<h3>Another card</h3>
		<p>Same component, different style context.</p>
	</div>
</div>
```

```css
/* Style Queries allow .card to adapt automatically */
@container style(background-color: #1e293b) {
	.card {
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}
}

@container style(background-color: #f8fafc) {
	.card {
		background: white;
		color: #1e293b;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}
}
```

**When to use Style Queries:**

- **Complex design systems** with multiple themes
- **Reusable components** that must adapt to visual context
- **Applications with dynamic themes** (dark/light mode)
- **Component libraries** that need maximum flexibility

**Current alternatives while waiting for full support:**

- CSS Custom Properties with JavaScript for theme detection
- CSS-in-JS with context providers
- Conditional utility classes
- CSS Cascade Layers for style organization

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

### 📂 File Structure for All Exercises

For each exercise, create the following file structure:

```
responsive/
├── exercise-1.html              # HTML for Exercise 1
├── exercise-2.html              # HTML for Exercise 2
└── exercise-3.html              # HTML for Exercise 3

# CSS in root folder (already exists)
/assets/css/
├── index.css                     # Student theme CSS
├── exercise-1.css               # Specific CSS for Exercise 1
├── exercise-2.css               # Specific CSS for Exercise 2
└── exercise-3.css               # Specific CSS for Exercise 3
```

**💡 Tips for students:**

- Create the `responsive/` folder for HTML files
- Add specific CSS files to `/assets/css/` (folder already exists)
- Each HTML has **two CSS links**: one to the general theme (`index.css`) and one to the specific exercise
- You can open each HTML file in your browser to see the result
- The specific CSS overrides the general theme styles when necessary

**⚠️ Important reminders:**

- **Git and binaries**: Don't include images, videos, or large binary files in Git. Use [ImageKit.io CDN API](https://imagekit.io/) for automatic image optimization
- **CSS links**: The `../assets/css/` links work locally, but GitHub Pages deploys in a subdirectory (`/name-of-repository/`), so absolute links break in remote deployment. Consider using absolute paths from the site root for GitHub Pages compatibility

### Practical example 1: Basic Responsive Portfolio with Media Queries and Flexbox

To understand the fundamentals of responsive design, we'll create a portfolio that uses traditional but effective techniques. We'll use **media queries** to adapt the layout according to viewport size and **Flexbox** to create flexible layouts. This will be our starting point that we'll evolve in Example 2.

**HTML:** Basic portfolio structure:

**📁 File to create:** `responsive/exercise-1.html`

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>My Portfolio - Basic Responsive</title>
		<!-- Relative links: work locally, break on GitHub Pages -->
		<link rel="stylesheet" href="../assets/css/index.css" />
		<link rel="stylesheet" href="../assets/css/exercise-1.css" />
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

**📁 File to create:** `/assets/css/exercise-1.css`

> **🎨 CSS Hierarchy:** This file loads after `index.css`, so it can override the student's general theme styles when necessary.

```css
/* ===== BASIC RESPONSIVE PORTFOLIO (MOBILE-FIRST) ===== */
/*
 * MOBILE-FIRST STRATEGY:
 * 1. Base styles are now mobile (small screens)
 * 2. Media queries use min-width instead of max-width
 * 3. Progressive enhancement - we add styles for larger screens
 */

/* Basic CSS variables for Exercise 1 */
:root {
	--primary-color: #2563eb;
	--secondary-color: #64748b;
	--accent-color: #f59e0b;
	--white: #ffffff;
	--border-color: #e2e8f0;
	--spacing-sm: 1rem;
	--spacing-md: 1.5rem;
	--spacing-lg: 2rem;
	--spacing-xl: 3rem;
	--border-radius: 0.5rem;
	--shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

body {
	font-family: system-ui, -apple-system, sans-serif;
	line-height: 1.6;
}

/* ===== BASIC CONTAINER ===== */
.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 var(--spacing-sm);
}

/* ===== RESPONSIVE HEADER (Mobile-First: base styles for mobile) ===== */
.site-header {
	background: var(--primary-color);
	color: white;
	padding: var(--spacing-md) 0;
}

.site-header .container {
	display: flex;
	flex-direction: column; /* Mobile: vertical navigation */
	text-align: center;
	gap: var(--spacing-sm);
}

.site-title {
	font-size: 1.25rem; /* Mobile: smaller title */
	font-weight: 700;
}

.main-nav ul {
	display: flex;
	flex-direction: column; /* Mobile: links stacked vertically */
	list-style: none;
	gap: var(--spacing-sm);
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
	padding: var(--spacing-lg) 0; /* Mobile: reduced padding */
	background: linear-gradient(135deg, var(--primary-color) 0%, #1e40af 100%);
	color: white;
	margin: var(--spacing-lg) 0;
	border-radius: var(--border-radius);
}

.hero-section h2 {
	font-size: 1.25rem; /* Mobile: smaller text */
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
	font-size: 1.5rem; /* Mobile: moderate size */
	margin-bottom: var(--spacing-lg);
}

/* ===== PROJECTS GRID WITH FLEXBOX ===== */
.projects-grid {
	display: flex;
	flex-direction: column; /* Mobile: single column */
	gap: var(--spacing-lg);
	align-items: center;
}

.project-card {
	width: 100%; /* Mobile: full width */
	max-width: 100%;
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

/* ===== MEDIA QUERIES (Mobile-First: Progressive Enhancement) ===== */

/* Tablet: 2-3 columns - 481px+ */
@media (min-width: 481px) {
	.site-title {
		font-size: 1.5rem;
	}

	.projects-grid {
		flex-direction: row; /* Tablet: multiple columns */
		flex-wrap: wrap;
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

	.projects-section h2 {
		font-size: 1.75rem;
	}
}

/* Desktop: Full horizontal layout - 769px+ */
@media (min-width: 769px) {
	.site-header .container {
		flex-direction: row; /* Desktop: horizontal navigation */
		justify-content: space-between;
		align-items: center;
		text-align: left;
	}

	.main-nav ul {
		flex-direction: row; /* Desktop: inline links */
		gap: var(--spacing-md);
	}

	.site-title {
		font-size: 1.5rem;
	}

	.project-card {
		min-width: 300px;
		max-width: 400px; /* Desktop: wider cards */
	}

	.hero-section {
		padding: var(--spacing-xl) 0; /* Desktop: more space */
	}

	.hero-section h2 {
		font-size: 2rem; /* Desktop: larger titles */
	}

	.hero-section p {
		font-size: 1.125rem;
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

> **💡 Reminder:**
>
> - Save the HTML code in `responsive/exercise-1.html`
> - Add the CSS code to `/assets/css/exercise-1.css` (folder already exists)
> - The HTML includes two CSS links: general theme and exercise-specific

**🚀 How to test your exercise:**

1. Open `responsive/exercise-1.html` in your browser
2. Resize the window to see the responsive behavior
3. Use developer tools (F12) to simulate mobile devices

**How does this example work?**

1. **Mobile-First**: Base styles are designed for mobile (small screens). Navigation is vertical, cards take full width, and text sizes are moderate.

2. **Progressive Media Queries**: We use `@media (min-width: 481px)` and `@media (min-width: 769px)` to **add** styles as the screen grows, instead of **removing** styles with `max-width`.

3. **Adaptive Flexbox**: The projects grid uses `display: flex` that adapts from single column (mobile) to multiple columns (tablet/desktop).

4. **Progressive Enhancement**: We start with the basic mobile experience and enhance for larger screens, adding features based on available space.

**Advantages of Mobile-First approach:**

- ✅ **Better Performance**: Mobile devices load less CSS
- ✅ **Progressive Enhancement**: We improve the experience for larger screens
- ✅ **Accessibility**: Prioritizes the experience on devices with fewer resources
- ✅ **Modern Best Practice**: Aligned with current industry standards
- ✅ **Mobile-First Indexing**: Google prioritizes the mobile version for SEO

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
/* 🎯 RECOMMENDED: Mobile First */
/* Start with mobile and add styles for larger screens */
@media (min-width: 768px) {
	/* Styles for tablet and desktop */
}

/* Desktop First (traditional approach, less efficient) */
/* Start with desktop and add styles for smaller screens */
@media (max-width: 768px) {
	/* Styles for tablet and mobile */
}
```

### Practical example 2: Intrinsic Portfolio with Modern Techniques

Now we'll **evolve** the portfolio from Example 1 by applying more advanced fluid and intrinsic design techniques. We'll maintain the same base structure but replace basic techniques with CSS Grid, Container Queries, and fluid typography.

**HTML:**

**📁 File to create:** `responsive/exercise-2.html`

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Responsive Portfolio</title>
		<!-- Relative links: work locally, break on GitHub Pages -->
		<link rel="stylesheet" href="../assets/css/index.css" />
		<link rel="stylesheet" href="../assets/css/exercise-2.css" />
	</head>
	<body>
		<header class="portfolio-header">
			<div class="container">
				<h1 class="portfolio-title">My Portfolio</h1>
				<nav class="portfolio-nav">
					<a href="#home">Home</a>
					<a href="#about">About Me</a>
					<a href="#work">Work</a>
					<a href="#contact">Contact</a>
				</nav>
			</div>
		</header>

		<main class="portfolio-main">
			<div class="container">
				<!-- Projects Section -->
				<section class="projects-section">
					<h2>My Projects</h2>
					<div class="projects-grid">
						<article class="project-card">
							<img src="https://picsum.photos/400/300?random=1" alt="Project 1" />
							<div class="project-content">
								<h3>Web Project</h3>
								<p>Description of the first project developed with modern responsive techniques.</p>
								<div class="project-tags">
									<span class="tag">HTML</span>
									<span class="tag">CSS</span>
									<span class="tag">JavaScript</span>
								</div>
							</div>
						</article>

						<article class="project-card">
							<img src="https://picsum.photos/400/300?random=2" alt="Project 2" />
							<div class="project-content">
								<h3>Mobile App</h3>
								<p>An application that adapts using CSS Grid and Container Queries.</p>
								<div class="project-tags">
									<span class="tag">React</span>
									<span class="tag">Grid</span>
									<span class="tag">API</span>
								</div>
							</div>
						</article>

						<article class="project-card">
							<img src="https://picsum.photos/400/300?random=3" alt="Project 3" />
							<div class="project-content">
								<h3>Dashboard</h3>
								<p>Control panel with intrinsic layout using CSS Grid and Subgrid.</p>
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

		<footer class="portfolio-footer">
			<div class="container">
				<p>&copy; 2025 My Portfolio. Designed with modern responsive techniques.</p>
			</div>
		</footer>
	</body>
</html>
```

**CSS:**

**📁 File to create:** `/assets/css/exercise-2.css`

> **🎨 CSS Hierarchy:** This file loads after `index.css`, so it can override the student's general theme styles when necessary.

```css
/* ===== RESPONSIVE PORTFOLIO WITH MODERN TECHNIQUES ===== */

:root {
	--primary-color: #3b82f6;
	--secondary-color: #64748b;
	--accent-color: #f59e0b;
	--white: #ffffff;
	--border-color: #e2e8f0;

	/* Fluid spacing */
	--spacing-xs: clamp(0.5rem, 1vw, 0.75rem);
	--spacing-sm: clamp(1rem, 2vw, 1.5rem);
	--spacing-md: clamp(1.5rem, 3vw, 2.5rem);
	--spacing-lg: clamp(2rem, 4vw, 3.5rem);
	--spacing-xl: clamp(3rem, 6vw, 5rem);

	/* Fluid typography */
	--text-xs: clamp(0.75rem, 1.5vw, 0.875rem);
	--text-sm: clamp(0.875rem, 2vw, 1rem);
	--text-base: clamp(1rem, 2.5vw, 1.125rem);
	--text-lg: clamp(1.125rem, 3vw, 1.25rem);
	--text-xl: clamp(1.25rem, 4vw, 1.5rem);
	--text-2xl: clamp(1.5rem, 5vw, 2rem);
	--text-3xl: clamp(2rem, 6vw, 3rem);
	--text-4xl: clamp(2.5rem, 8vw, 4rem);

	/* Shadows */
	--shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

	/* Border radius */
	--border-radius: clamp(0.5rem, 1vw, 0.75rem);
	--border-radius-lg: clamp(0.75rem, 1.5vw, 1rem);
}

/* ===== ENHANCED CONTAINER SYSTEM ===== */
.container {
	container-type: inline-size;
	container-name: portfolio-container;
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 var(--spacing-md);
}

/* ===== ENHANCED HEADER ===== */
.portfolio-header {
	background: var(--primary-color);
	color: var(--white);
	padding: var(--spacing-lg) 0;
	position: sticky;
	top: 0;
	z-index: 100;
	box-shadow: var(--shadow);
}

.portfolio-header .container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: var(--spacing-md);
}

.portfolio-title {
	font-size: var(--text-4xl);
	font-weight: 700;
}

/* ===== ENHANCED NAVIGATION ===== */
.portfolio-nav {
	display: flex;
	gap: var(--spacing-lg);
	flex-wrap: wrap;
}

.portfolio-nav a {
	color: var(--white);
	text-decoration: none;
	padding: var(--spacing-xs) var(--spacing-sm);
	border-radius: var(--border-radius);
	transition: background-color 0.2s;
	font-weight: 500;
}

.portfolio-nav a:hover {
	background-color: rgba(255, 255, 255, 0.1);
}

/* ===== CSS GRID SYSTEM WITH AUTO-FIT ===== */
.projects-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: var(--spacing-lg);
	margin: var(--spacing-xl) 0;
}

/* ===== SUBGRID IMPLEMENTATION ===== */
.project-card {
	display: grid;
	grid-template-columns: subgrid;
	grid-column: span 1;
	/* Fallback for browsers without subgrid support */
	@supports not (grid-template-columns: subgrid) {
		display: flex;
		flex-direction: column;
	}
}

/* Apply subgrid only when supported */
@supports (grid-template-columns: subgrid) {
	.projects-grid {
		grid-template-rows: auto auto 1fr auto; /* Title, image, description, tags */
	}

	.project-card {
		display: grid;
		grid-template-columns: subgrid;
		grid-template-rows: subgrid;
		grid-column: span 1;
		grid-row: span 1;
	}

	.project-card h3 {
		grid-row: 1;
	}

	.project-card img {
		grid-row: 2;
	}

	.project-card p {
		grid-row: 3;
	}

	.project-card .project-tags {
		grid-row: 4;
		align-self: end;
	}
}

/* ===== CONTAINER QUERIES (MOBILE-FIRST APPROACH) ===== */
/*
 * CONTAINER QUERIES CAN BE MOBILE-FIRST TOO!
 * Base styles are for narrow containers (mobile-like)
 * min-width adds styles for wider containers
 */

/* Base: Narrow containers (mobile-like) - horizontal card layout */
.project-card {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	gap: var(--spacing-md);
}

.project-card img {
	width: 120px;
	height: 90px;
	object-fit: cover;
	flex-shrink: 0;
}

.project-content {
	flex: 1;
}

/* Progressive enhancement: Wider containers - vertical card layout */
@container portfolio-container (min-width: 600px) {
	.project-card {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0;
	}

	.project-card img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		flex-shrink: 0;
	}

	.project-content {
		flex: 1;
		padding: var(--spacing-lg);
	}
}

/* ===== ENHANCED PROJECT CARD ===== */
.project-card {
	background: var(--card-bg);
	border-radius: var(--border-radius);
	box-shadow: var(--shadow);
	overflow: hidden;
	transition: transform 0.2s, box-shadow 0.2s;
}

.project-card:hover {
	transform: translateY(-4px);
	box-shadow: var(--shadow-lg);
}

.project-card img {
	width: 100%;
	height: 200px;
	object-fit: cover;
	transition: transform 0.2s;
}

.project-card:hover img {
	transform: scale(1.05);
}

.project-content {
	padding: var(--spacing-lg);
}

.project-content h3 {
	font-size: var(--text-xl);
	font-weight: 600;
	margin-bottom: var(--spacing-sm);
	color: var(--text-color);
}

.project-content p {
	color: var(--secondary-color);
	margin-bottom: var(--spacing-md);
	line-height: 1.6;
}

/* ===== ENHANCED TAG SYSTEM ===== */
.project-tags {
	display: flex;
	flex-wrap: wrap;
	gap: var(--spacing-xs);
}

.tag {
	background: var(--primary-color);
	color: var(--white);
	padding: var(--spacing-xs) var(--spacing-sm);
	border-radius: 9999px;
	font-size: var(--text-xs);
	font-weight: 500;
}

/* ===== ENHANCED TYPOGRAPHY ===== */
h1,
h2,
h3 {
	font-weight: 600;
	line-height: 1.2;
}

h2 {
	font-size: var(--text-3xl);
	text-align: center;
	margin: var(--spacing-xl) 0;
	color: var(--text-color);
}

/* ===== ENHANCED FOOTER ===== */
.portfolio-footer {
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

> **💡 Reminder:**
>
> - Save the HTML code in `responsive/exercise-2.html`
> - Add the CSS code to `/assets/css/exercise-2.css` (folder already exists)
> - The HTML includes two CSS links: general theme and exercise-specific

**🚀 How to test your exercise:**

1. Open `responsive/exercise-2.html` in your browser
2. Resize the window to see the responsive behavior
3. Compare with Exercise 1 to see the improvements
4. Use developer tools (F12) to simulate mobile devices

**What does this example demonstrate?**

1. **Evolution from Example 1**: Maintains the same HTML structure but with advanced CSS techniques
2. **Grid Auto-fit**: `repeat(auto-fit, minmax(300px, 1fr))` replaces Example 1's Flexbox
3. **Subgrid**: Cards inherit the parent grid's row structure for perfect alignment
4. **Container Queries**: Changes card layout when the container is narrow (not the viewport)
5. **Fluid Typography**: `clamp()` for smooth title scaling without abrupt jumps
6. **Relative Units**: `rem`, `%`, `fr`, `vw` for intrinsic fluidity
7. **Modern Effects**: Hover effects, smooth transitions, shadows
8. **Intrinsic Design**: Components adapt according to their context, not global breakpoints

**Improvements over Example 1:**

- **Flexbox → CSS Grid**: More powerful and flexible layout
- **Media Queries → Container Queries**: Adaptation based on container, not viewport
- **Fixed Sizes → Fluid Typography**: Smooth scaling with `clamp()`
- **Fixed Breakpoints → Intrinsic Fluidity**: Automatic adaptation without break points
- **Less Code**: Grid Auto-fit reduces the need for media queries

**Advantages of this advanced approach:**

- **Better Performance**: Less CSS code and more efficient layouts
- **More Maintainable**: Container queries are more semantic
- **Future-Proof**: Uses modern CSS specifications
- **Intrinsic Design**: Components are context-aware
- **Smoother Experience**: No abrupt jumps between breakpoints

### Practical example 3: SPA Portfolio with Scroll-snap and Responsive Images

We'll create the **final complete project**: an SPA-style portfolio with scroll by screen-frames, advanced responsive images, and all the modern techniques learned. This will be our integrated project that demonstrates complete mastery of intrinsic web design.

**HTML:**

**📁 File to create:** `responsive/exercise-3.html`

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Intrinsic Portfolio - [Your Name]</title>
		<!-- Relative links: work locally, break on GitHub Pages -->
		<link rel="stylesheet" href="../assets/css/index.css" />
		<link rel="stylesheet" href="../assets/css/exercise-3.css" />
	</head>
	<body>
		<!-- Fixed SPA Navigation -->
		<nav class="main-nav">
			<div class="nav-container">
				<a href="#home" class="nav-link active">Home</a>
				<a href="#about" class="nav-link">About</a>
				<a href="#work" class="nav-link">Work</a>
				<a href="#contact" class="nav-link">Contact</a>
			</div>
		</nav>

		<!-- Scroll Container with Snap -->
		<div class="scroll-container">
			<!-- Home Section -->
			<section id="home" class="section home-section theme-light">
				<div class="hero-background">
					<picture>
						<source media="(max-width: 768px)" srcset="https://picsum.photos/768/1024?random=hero-mobile" />
						<source media="(max-width: 1200px)" srcset="https://picsum.photos/1200/800?random=hero-tablet" />
						<img src="https://picsum.photos/1920/1080?random=hero-desktop" alt="Hero Background" class="hero-bg-image" />
					</picture>
				</div>
				<div class="container">
					<div class="hero-content">
						<h1 class="hero-title">Hello, I'm [Your Name]</h1>
						<p class="hero-subtitle">Frontend Developer specialized in intrinsic and responsive design</p>
						<a href="#work" class="cta-button">View my work</a>
					</div>
				</div>
			</section>

			<!-- About Section -->
			<section id="about" class="section about-section theme-dark">
				<div class="container">
					<h2 class="section-title">About Me</h2>
					<div class="about-content">
						<div class="about-image">
							<picture>
								<source media="(max-width: 480px)" srcset="https://picsum.photos/200/200?random=profile-mobile" />
								<img src="https://picsum.photos/300/300?random=profile" alt="Profile Picture" class="profile-image" />
							</picture>
						</div>
						<div class="about-text">
							<p>
								I'm a passionate frontend developer with expertise in modern CSS techniques, responsive design, and user
								experience. I love creating fluid, intrinsic designs that adapt beautifully to any device.
							</p>
							<p>
								My skills include HTML5, CSS3, JavaScript, React, Vue.js, and modern CSS features like Grid, Flexbox, Container
								Queries, and CSS Layers.
							</p>
						</div>
					</div>
				</div>
			</section>

			<!-- Work Section -->
			<section id="work" class="section work-section theme-light">
				<div class="container">
					<h2 class="section-title">My Projects</h2>
					<div class="projects-grid">
						<article class="project-card">
							<div class="project-image-container">
								<picture>
									<source media="(max-width: 480px)" srcset="https://picsum.photos/300/200?random=project1-mobile" />
									<img src="https://picsum.photos/400/300?random=project1" alt="Project 1" class="project-image" />
								</picture>
								<div class="project-overlay">
									<a href="#" class="project-link">View Project</a>
								</div>
							</div>
							<div class="project-info">
								<h3>Intrinsic Web App</h3>
								<p>Modern web application using CSS Grid, Container Queries, and fluid typography for perfect adaptation.</p>
								<div class="project-tags">
									<span class="tag">CSS Grid</span>
									<span class="tag">Container Queries</span>
									<span class="tag">Subgrid</span>
								</div>
							</div>
						</article>

						<article class="project-card">
							<div class="project-image-container">
								<picture>
									<source media="(max-width: 480px)" srcset="https://picsum.photos/300/200?random=project2-mobile" />
									<img src="https://picsum.photos/400/300?random=project2" alt="Project 2" class="project-image" />
								</picture>
								<div class="project-overlay">
									<a href="#" class="project-link">View Project</a>
								</div>
							</div>
							<div class="project-info">
								<h3>Responsive Dashboard</h3>
								<p>Data visualization dashboard with scroll-snap sections and advanced responsive images.</p>
								<div class="project-tags">
									<span class="tag">Scroll-snap</span>
									<span class="tag">Responsive Images</span>
									<span class="tag">CSS Layers</span>
								</div>
							</div>
						</article>

						<article class="project-card">
							<div class="project-image-container">
								<picture>
									<source media="(max-width: 480px)" srcset="https://picsum.photos/300/200?random=project3-mobile" />
									<img src="https://picsum.photos/400/300?random=project3" alt="Project 3" class="project-image" />
								</picture>
								<div class="project-overlay">
									<a href="#" class="project-link">View Project</a>
								</div>
							</div>
							<div class="project-info">
								<h3>Fluid Design System</h3>
								<p>Complete design system with fluid typography, spacing, and intrinsic layouts.</p>
								<div class="project-tags">
									<span class="tag">Design System</span>
									<span class="tag">Fluid Typography</span>
									<span class="tag">CSS Custom Properties</span>
								</div>
							</div>
						</article>
					</div>
				</div>
			</section>

			<!-- Contact Section -->
			<section id="contact" class="section contact-section theme-dark">
				<div class="container">
					<h2 class="section-title">Get In Touch</h2>
					<div class="contact-content">
						<p>Ready to work together? Let's create something amazing!</p>
						<a href="mailto:your.email@example.com" class="cta-button">Send me an email</a>
					</div>
				</div>
			</section>
		</div>
	</body>
</html>
```

**CSS:**

**📁 File to create:** `/assets/css/exercise-3.css`

> **🎨 CSS Hierarchy:** This file loads after `index.css`, so it can override the student's general theme styles when necessary.

```css
/* ===== SPA PORTFOLIO WITH SCROLL-SNAP ===== */

:root {
	/* Base colors */
	--white: #ffffff;
	--accent: #f59e0b;

	/* Fluid spacing */
	--space-xs: clamp(0.5rem, 1vw, 0.75rem);
	--space-sm: clamp(1rem, 2vw, 1.5rem);
	--space-md: clamp(1.5rem, 3vw, 2.5rem);
	--space-lg: clamp(2rem, 4vw, 3.5rem);
	--space-xl: clamp(3rem, 6vw, 5rem);

	/* Fluid typography */
	--text-xs: clamp(0.75rem, 1.5vw, 0.875rem);
	--text-sm: clamp(0.875rem, 2vw, 1rem);
	--text-base: clamp(1rem, 2.5vw, 1.125rem);
	--text-lg: clamp(1.125rem, 3vw, 1.25rem);
	--text-xl: clamp(1.25rem, 4vw, 1.5rem);
	--text-2xl: clamp(1.5rem, 5vw, 2rem);
	--text-3xl: clamp(2rem, 6vw, 3rem);
	--text-4xl: clamp(2.5rem, 8vw, 4rem);

	/* Fluid line heights */
	--leading-tight: clamp(1.1, 1.2, 1.25);
	--leading-normal: clamp(1.4, 1.5, 1.6);
	--leading-relaxed: clamp(1.5, 1.6, 1.75);

	/* Shadows */
	--shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

	/* Borders */
	--radius: clamp(0.5rem, 1vw, 0.75rem);
	--radius-lg: clamp(0.75rem, 1.5vw, 1rem);
}

/* ===== THEME DEFINITIONS FOR STYLE QUERIES ===== */
.theme-light {
	--color-surface: #f8fafc;
	--color-text: #1e293b;
	--color-primary: #3b82f6;
	--color-secondary: #64748b;
	--color-accent: #f59e0b;
	--color-border: #e2e8f0;
	--color-shadow: rgba(0, 0, 0, 0.1);
}

.theme-dark {
	--color-surface: #1e293b;
	--color-text: #f8fafc;
	--color-primary: #60a5fa;
	--color-secondary: #94a3b8;
	--color-accent: #fbbf24;
	--color-border: #374151;
	--color-shadow: rgba(0, 0, 0, 0.3);
}

/* Reset and base */
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html {
	scroll-behavior: smooth;
}

body {
	font-family: system-ui, -apple-system, sans-serif;
	line-height: var(--leading-normal);
	color: var(--color-text);
	background: var(--color-surface);
}

/* ===== SCROLL SNAPPING ===== */
.scroll-container {
	scroll-snap-type: y mandatory;
	height: 100vh;
	overflow-y: scroll;
}

.section {
	/* Use 100dvh (dynamic viewport height), 100svh (small viewport height), or 100lvh (large viewport height) to ensure each section fills the full visible screen height, including on mobile devices where browser UI can change the viewport size. 100svh is especially useful for handling mobile browser toolbars that appear/disappear, providing a more accurate visible area. 100lvh can be useful to ensure maximum height when the browser UI is fully expanded. */
	min-height: 100dvh;
	scroll-snap-align: start;
	display: flex;
	align-items: center;
	position: relative;
}

.container {
	container-type: inline-size;
	container-name: section-container;
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 var(--space-md);
	width: 100%;
}

/* ===== SPA NAVIGATION ===== */
.main-nav {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	background: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(10px);
	z-index: 1000;
	padding: var(--space-sm) 0;
	box-shadow: var(--shadow);
}

.nav-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 var(--space-md);
	display: flex;
	justify-content: center;
	gap: var(--space-lg);
}

.nav-link {
	text-decoration: none;
	color: var(--color-text);
	font-weight: 500;
	font-size: var(--text-sm);
	padding: var(--space-xs) var(--space-sm);
	border-radius: var(--radius);
	transition: all 0.2s;
}

.nav-link:hover,
.nav-link.active {
	background: var(--color-primary);
	color: var(--white);
}

/* ===== STYLE QUERIES: CONTEXTUAL COMPONENT ADAPTATION ===== */
/*
 * 🆕 EXPERIMENTAL TECHNIQUE: Style Queries
 * Allows components to adapt based on their container's style properties
 * Instead of just size (Container Queries)
 */

/* Light theme container - components adapt automatically */
@container style(--color-surface: #f8fafc) {
	.section-title {
		color: var(--color-text);
		text-shadow: none;
	}

	.project-card {
		background: var(--color-surface);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		box-shadow: 0 4px 6px var(--color-shadow);
	}

	.project-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 15px var(--color-shadow);
	}

	.cta-button {
		background: var(--color-primary);
		color: white;
		border: 2px solid var(--color-primary);
	}

	.cta-button:hover {
		background: transparent;
		color: var(--color-primary);
	}
}

/* Dark theme container - components adapt automatically */
@container style(--color-surface: #1e293b) {
	.section-title {
		color: var(--color-text);
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	}

	.project-card {
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		backdrop-filter: blur(10px);
		box-shadow: 0 4px 6px var(--color-shadow);
	}

	.project-card:hover {
		background: rgba(255, 255, 255, 0.15);
		transform: translateY(-4px);
		box-shadow: 0 8px 15px var(--color-shadow);
	}

	.cta-button {
		background: var(--color-primary);
		color: var(--color-text);
		border: 2px solid var(--color-primary);
	}

	.cta-button:hover {
		background: transparent;
		color: var(--color-primary);
	}
}

/* ===== SECTION STYLES ===== */
.home-section {
	background: linear-gradient(135deg, var(--color-primary) 0%, #1e40af 100%);
	color: var(--white);
	text-align: center;
}

.about-section {
	background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.work-section {
	background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
	color: var(--white);
}

.contact-section {
	background: linear-gradient(135deg, var(--accent) 0%, #d97706 100%);
	color: var(--white);
}

/* ===== HERO WITH BACKGROUND IMAGE ===== */
.hero-background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
}

.hero-bg-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
}

.hero-content {
	text-align: center;
	color: var(--white);
	z-index: 1;
	background: rgba(0, 0, 0, 0.4);
	padding: var(--space-xl);
	border-radius: var(--radius);
	backdrop-filter: blur(10px);
}

.hero-title {
	font-size: var(--text-4xl);
	font-weight: 700;
	line-height: var(--leading-tight);
	margin-bottom: var(--space-md);
}

.hero-subtitle {
	font-size: var(--text-xl);
	line-height: var(--leading-relaxed);
	margin-bottom: var(--space-lg);
	opacity: 0.9;
}

.section-title {
	font-size: var(--text-3xl);
	font-weight: 600;
	text-align: center;
	margin-bottom: var(--space-xl);
}

/* ===== ADVANCED GRID SYSTEM ===== */
.projects-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: var(--space-lg);
}

/* ===== SUBGRID FOR PERFECT ALIGNMENT ===== */
/* Apply subgrid only when supported */
@supports (grid-template-columns: subgrid) {
	.projects-grid {
		grid-template-rows: auto auto 1fr auto auto; /* Image, overlay, title, description, tags */
	}

	.project-card {
		display: grid;
		grid-template-columns: subgrid;
		grid-template-rows: subgrid;
		grid-column: span 1;
		grid-row: span 1;
	}
}

/* Fallback for browsers without subgrid support */
@supports not (grid-template-columns: subgrid) {
	.project-card {
		display: flex;
		flex-direction: column;
		grid-column: span 1;
	}
}

	.project-image-container {
		grid-row: 1;
	}

	.project-overlay {
		grid-row: 2;
	}

	.project-info h3 {
		grid-row: 3;
	}

	.project-info p {
		grid-row: 4;
	}

	.project-tags {
		grid-row: 5;
		align-self: end;
	}
}

/* ===== CONTAINER QUERIES ===== */
@container section-container (min-width: 600px) {
	.project-card {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: var(--space-md);
	}

	.project-card img {
		width: 120px;
		height: 90px;
		object-fit: cover;
		flex-shrink: 0;
	}

	.project-info {
		flex: 1;
	}
}

/* ===== PROJECT CARD IMAGES ===== */
.project-card {
	background: var(--white);
	border-radius: var(--radius-lg);
	overflow: hidden;
	box-shadow: var(--shadow);
	transition: transform 0.2s, box-shadow 0.2s;
}

.project-card:hover {
	transform: translateY(-4px);
	box-shadow: var(--shadow-lg);
}

.project-image-container {
	position: relative;
	overflow: hidden;
}

.project-image {
	width: 100%;
	height: 200px;
	object-fit: cover;
	transition: transform 0.3s ease;
}

.project-card:hover .project-image {
	transform: scale(1.05);
}

/* ===== IMAGE OVERLAY EFFECTS ===== */
.project-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
	opacity: 1;
}

.project-link {
	color: white;
	text-decoration: none;
	padding: var(--space-sm) var(--space-lg);
	border: 2px solid white;
	border-radius: var(--radius);
	font-weight: 600;
	transition: all 0.3s ease;
}

.project-link:hover {
	background: white;
	color: var(--color-text);
}

/* ===== PROJECT INFO STYLES ===== */
.project-info {
	padding: var(--space-md);
}

.project-info h3 {
	font-size: var(--text-lg);
	font-weight: 600;
	margin-bottom: var(--space-xs);
	color: var(--color-text);
}

.project-info p {
	font-size: var(--text-sm);
	color: var(--color-secondary);
	margin-bottom: var(--space-sm);
	line-height: var(--leading-normal);
}

/* ===== ENHANCED TAG SYSTEM ===== */
.project-tags {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-xs);
}

.tag {
	background: var(--color-primary);
	color: var(--white);
	padding: var(--space-xs) var(--space-sm);
	border-radius: 9999px;
	font-size: var(--text-xs);
	font-weight: 500;
}

/* ===== BUTTON COMPONENTS ===== */
.cta-button,
.submit-button {
	background: var(--accent);
	color: var(--white);
	padding: var(--space-sm) var(--space-lg);
	border: none;
	border-radius: var(--radius);
	font-size: var(--text-base);
	font-weight: 600;
	cursor: pointer;
	transition: all 0.2s;
	text-decoration: none;
	display: inline-block;
}

.cta-button:hover,
.submit-button:hover {
	background: #d97706;
	transform: translateY(-2px);
}

/* ===== HERO WITH RESPONSIVE BACKGROUND ===== */
.hero-section {
	position: relative;
	min-height: 100dvh;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.hero-background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
}

.hero-bg-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
}

/* ===== PROFILE IMAGE RESPONSIVE ===== */
.about-content {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--space-xl);
	align-items: center;
}

.about-image {
	text-align: center;
}

.profile-image {
	width: 100%;
	max-width: 300px;
	height: auto;
	border-radius: 50%;
	box-shadow: var(--shadow-lg);
	transition: transform 0.3s ease;
}

.profile-image:hover {
	transform: scale(1.05);
}

/* ===== RESPONSIVE IMAGES WITH ASPECT RATIO ===== */
.aspect-ratio-container {
	position: relative;
	width: 100%;
	height: 0;
	padding-bottom: 56.25%; /* 16:9 aspect ratio */
	overflow: hidden;
}

.aspect-ratio-container img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

/* ===== HIGH DPI IMAGES ===== */
.high-dpi-image {
	width: 100%;
	height: auto;
	/* For high density screens */
	image-rendering: -webkit-optimize-contrast;
	image-rendering: crisp-edges;
}

/* ===== RESPONSIVE SVG ===== */
.responsive-svg {
	width: 100%;
	height: auto;
	max-width: 100%;
}

.responsive-svg svg {
	width: 100%;
	height: auto;
}

/* ===== LAZY LOADING UTILITIES ===== */
.lazy-image {
	opacity: 0;
	transition: opacity 0.3s ease;
}

.lazy-image.loaded {
	opacity: 1;
}

/* ===== IMAGE PLACEHOLDER UTILITIES ===== */
.image-placeholder {
	background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(
			-45deg,
			#f0f0f0 25%,
			transparent 25%
		), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
	background-size: 20px 20px;
	background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.image-loading {
	background: var(--color-surface);
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--color-secondary);
}

/* ===== CONTAINER QUERIES FOR IMAGES ===== */
@container section-container (min-width: 600px) {
	.about-content {
		grid-template-columns: 1fr;
		text-align: center;
	}

	.project-image-container {
		height: 150px;
	}

	.project-image {
		height: 150px;
	}

	.hero-content {
		padding: var(--space-lg);
	}
}

/* ===== MEDIA QUERIES FOR IMAGES (Mobile-First: Progressive Enhancement) ===== */
/*
 * MOBILE-FIRST STRATEGY:
 * - Base styles are for mobile (already defined above)
 * - min-width adds styles for larger screens
 * - Progressive enhancement - we improve the experience as the screen grows
 */

/* Tablet: 481px+ */
@media (min-width: 481px) {
	.hero-content {
		padding: var(--space-md);
	}

	.project-image {
		height: 160px;
	}

	.profile-image {
		max-width: 200px;
	}
}

/* Small desktop: 769px+ */
@media (min-width: 769px) {
	.hero-bg-image {
		object-position: center;
	}

	.project-image {
		height: 180px;
	}

	.profile-image {
		max-width: 250px;
	}

	.hero-content {
		padding: var(--space-lg);
	}
}

/* Large desktop: 1024px+ */
@media (min-width: 1024px) {
	.project-image {
		height: 200px;
	}

	.profile-image {
		max-width: 300px;
	}
}

	.project-image {
		height: 160px;
	}

	.profile-image {
		max-width: 200px;
	}
}
```

> **💡 Reminder:**
>
> - Save the HTML code in `responsive/exercise-3.html`
> - Add the CSS code to `/assets/css/exercise-3.css` (folder already exists)
> - The HTML includes two CSS links: general theme and exercise-specific

**🚀 How to test your exercise:**

1. Open `responsive/exercise-3.html` in your browser
2. Test scroll-snap by scrolling through the sections
3. Resize the window to see the responsive behavior
4. Compare with previous exercises to see the evolution
5. Use developer tools (F12) to simulate mobile devices

**JavaScript for lazy loading (optional):**

```javascript
// Lazy loading for images
const lazyImages = document.querySelectorAll('.lazy-image');

const imageObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			const img = entry.target;
			img.src = img.dataset.src;
			img.classList.add('loaded');
			observer.unobserve(img);
		}
	});
});

lazyImages.forEach((img) => imageObserver.observe(img));

// Preload critical images
const preloadImage = (src) => {
	const img = new Image();
	img.src = src;
};

// Preload hero image
preloadImage('https://picsum.photos/1920/1080?random=hero-large');
```

**What does this example demonstrate?**

1. **Picture Element**: Different images according to screen size
2. **Object-fit**: Precise control of cropping and positioning
3. **Aspect Ratio**: Maintain consistent proportions
4. **Subgrid**: Perfect alignment of elements in project cards
5. **Lazy Loading**: Deferred loading for better performance
6. **Hover Effects**: Visual interactions with images
7. **Container Queries**: Adaptation based on container, not viewport
8. **High DPI**: Optimization for high-density screens

**Applied techniques:**

- **`<picture>`**: Multiple sources according to media queries
- **`object-fit: cover`**: Intelligent cropping maintaining proportions
- **`grid-template-columns: subgrid`**: Grid structure inheritance for perfect alignment
- **`aspect-ratio`**: Consistent proportions without JavaScript
- **`backdrop-filter`**: Modern blur effects
- **Container Queries**: Intrinsic adaptation of images
- **Style Queries**: 🆕 Contextual adaptation based on container style properties
- **Lazy Loading**: Optimized loading for performance

**🆕 Style Queries in action:**

This exercise demonstrates **Style Queries** with a theme system where components automatically adapt based on their container's style context:

- **Light theme** (`theme-light`): Components with solid backgrounds and subtle shadows
- **Dark theme** (`theme-dark`): Components with translucent backgrounds and blur effects
- **Automatic adaptation**: Same components change appearance based on container theme
- **No JavaScript**: Everything handled by CSS with `@container style()`

## Conclusion: Towards Intrinsic Design

Throughout this lesson we have explored the evolution of web design from traditional responsive to more **intrinsic and elastic** approaches. The three practical exercises demonstrate this progression:

- **Exercise 1** taught us the fundamentals with Media Queries and Flexbox
- **Exercise 2** introduced modern techniques with Grid and Container Queries
- **Exercise 3** integrated everything into a complete SPA portfolio

### Reflection Questions

To consolidate learning, reflect on these questions:

- **Why** is it important to offer a unified experience across different devices? (Hint: think about user satisfaction, SEO, audience reach, etc.)
- Analyze a known website and describe **which parts** of its design seem fluid and which respond to breakpoints. Do you notice jumps? Could you improve something with learned techniques?
- Consider a complex UI element (e.g., a large data table). What combination of techniques would you use to make it usable on mobile without losing functionality on desktop?
- **Intrinsic perspective**: Imagine a navigation component that must work both in the main header and in a narrow sidebar. How would you design this component to be **context-aware** and adapt automatically?

The future of web design lies in creating **elastic systems** where each component is aware of its context and adapts intrinsically, combining the best of traditional responsive with modern fluidity.

## 📁 Summary of Created Files

At the end of this lesson, you should have the following file structure:

```
responsive/
├── exercise-1.html              # Basic portfolio with Media Queries + Flexbox
├── exercise-2.html              # Modern portfolio with Grid + Container Queries
└── exercise-3.html              # SPA portfolio with Scroll-snap + Responsive images

/assets/css/
├── index.css                     # Student theme CSS (already exists)
├── exercise-1.css               # Specific CSS for Exercise 1
├── exercise-2.css               # Specific CSS for Exercise 2
└── exercise-3.css               # Specific CSS for Exercise 3
```

**🎯 Next steps:**

1. **Open each exercise** in your browser to see the results
2. **Compare the exercises** to understand the evolution of techniques
3. **Experiment** by modifying CSS values and observing changes
4. **Test on different devices** or using developer tools
5. **Customize** the exercises with your own content and images

---

## References

[^1]: [https://www.harlointeractive.com/blog/post/goodbye-responsive-hello-intrinsic](https://www.harlointeractive.com/blog/post/goodbye-responsive-hello-intrinsic)
[^2]: [The importance of responsive web design in the mobile era | Pibeca Solutions](https://www.pibeca.com/2023/11/27/la-importancia-del-diseno-web-responsive-en-la-era-movil/#:~:text=El%20dise%C3%B1o%20web%20responsive%20se,audiencia%20cada%20vez%20m%C3%A1s%20m%C3%B3vil)
[^3]: [Fluid web design](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=Hoy%20en%20d%C3%ADa%2C%20en%20una,%E2%80%8D)
[^4]: [The importance of responsive web design in the mobile era | Pibeca Solutions](https://www.pibeca.com/2023/11/27/la-importancia-del-diseno-web-responsive-en-la-era-movil/#:~:text=El%20dise%C3%B1o%20web%20ha%20experimentado,este%20enfoque%20ha%20cambiado%20dr%C3%A1sticamente)
[^5]: [Fluid web design](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=Desde%20que%20sali%C3%B3%20el%20iPhone,%E2%80%8D)
[^6]: [The importance of responsive web design in the mobile era | Pibeca Solutions](https://www.pibeca.com/2023/11/27/la-importancia-del-diseno-web-responsive-en-la-era-movil/#:~:text=Este%20cambio%20hacia%20el%20dise%C3%B1o,a%20la%20audiencia%20en%20l%C3%ADnea)
[^7]: [Responsive web design - Wikipedia](https://en.wikipedia.org/wiki/Responsive_web_design#:~:text=Responsive%20web%20design%20became%20more,13)
[^8]: [The importance of responsive web design in the mobile era | Pibeca Solutions](https://www.pibeca.com/2023/11/27/la-importancia-del-diseno-web-responsive-en-la-era-movil/#:~:text=Este%20cambio%20hacia%20el%20dise%C3%B1o,a%20la%20audiencia%20en%20l%C3%ADnea)
[^9]: [What are fluid, adaptive and responsive web designs?](https://blog.ida.cl/diseno/diferencias-diseno-web-fluido-adaptativo-responsivo/#:~:text=Dise%C3%B1o%20web%20l%C3%ADquido%20o%20fluido)
[^10]: [What are fluid, adaptive and responsive web designs?](https://blog.ida.cl/diseno/diferencias-diseno-web-fluido-adaptativo-responsivo/#:~:text=En%20este%20tipo%20de%20dise%C3%B1o,textos%20son%20dif%C3%ADciles%20de%20leer)
[^11]: [What are fluid, adaptive and responsive web designs?](https://blog.ida.cl/diseno/diferencias-diseno-web-fluido-adaptativo-responsivo/#:~:text=Como%20una%20forma%20de%20evitar,horizontal%20en%20las%20m%C3%A1s%20peque%C3%B1as)
[^12]: [What are fluid, adaptive and responsive web designs?](https://blog.ida.cl/diseno/diferencias-diseno-web-fluido-adaptativo-responsivo/#:~:text=Usa%20plantillas%20est%C3%A1ticas%20basadas%20en,se%20cambia%20a%20otro%20dise%C3%B1o)
[^13]: [What are fluid, adaptive and responsive web designs?](https://blog.ida.cl/diseno/diferencias-diseno-web-fluido-adaptativo-responsivo/#:~:text=Esta%20aproximaci%C3%B3n%20podr%C3%ADa%20funcionar%20mejor,gana%20cada%20vez%20m%C3%A1s%20relevancia)
[^14]: [Fluid web design](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=En%20cualquier%20caso%2C%20como%20dec%C3%ADa%2C,%E2%80%8D)
[^15]: [Fluid web design](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=Pero%20la%20accesibilidad%20y%20la,%E2%80%8D)
[^16]: [The importance of responsive web design in the mobile era | Pibeca Solutions](https://www.pibeca.com/2023/11/27/la-importancia-del-diseno-web-responsive-en-la-era-movil/#:~:text=La%20respuesta%20a%20este%20desaf%C3%ADo,desde%20el%20que%20se%20accede)
[^17]: [Responsive web design - Wikipedia](https://en.wikipedia.org/wiki/Responsive_web_design#:~:text=,to%20any%20device%20screen%20size)
[^18]: [Responsive web design - Wikipedia](https://en.wikipedia.org/wiki/Responsive_web_design#:~:text=,to%20any%20device%20screen%20size)
[^19]: [Responsive web design - Wikipedia](https://en.wikipedia.org/wiki/Responsive_web_design#:~:text=,to%20any%20device%20screen%20size)
[^20]: [GitHub](https://github.com/ruvebal-udit/web-fundamentals/blob/eaa1f9b1d58060e616645f06d6f85d56b9e18a10/docs/responsive/LEEME.md#L401-L405)
[^21]: [Fluid web design](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=Responsive%20Fluido%3A)
[^22]: [Fluid web design](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=El%20dise%C3%B1o%20fluido%20es%2C%20por,%E2%80%8D)
[^23]: [harlointeractive.com](https://www.harlointeractive.com/blog/post/goodbye-responsive-hello-intrinsic#:~:text=The%20beauty%20of%20intrinsic%20design,it%20into%20rigidly%20proportioned%20columns)
[^24]: [harlointeractive.com](https://www.harlointeractive.com/blog/post/goodbye-responsive-hello-intrinsic#:~:text=The%20beauty%20of%20intrinsic%20design,it%20into%20rigidly%20proportioned%20columns)
[^25]: [harlointeractive.com](https://www.harlointeractive.com/blog/post/goodbye-responsive-hello-intrinsic#:~:text=The%20beauty%20of%20intrinsic%20design,it%20into%20rigidly%20proportioned%20columns)
[^26]: [Fluid web design](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=Responsive%20Fluido%3A)
[^27]: [Fluid web design](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=Mantendremos%20los%20breakpoints%20y%20la,%E2%80%8D)
[^28]: [Responsive web design: Fluid typography with CSS clamp • Silo Creativo](https://www.silocreativo.com/diseno-web-responsive-tipografia-fluida-con-css-clamp/#:~:text=La%20tipograf%C3%ADa%20fluida%20tiene%20una,de%20media%20queries%20con%20diferentes)
[^29]: [clamp() - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp#:~:text=Note%20that%20using%20,the%20use%20of%20media%20queries)
[^30]: [Design and fluid typography with CSS: How to apply it to your web with clamp](https://utopigstudio.com/es/blog/diseno/tipografia-fluida-css-clamp#:~:text=Esta%20funci%C3%B3n%20toma%20tres%20argumentos%3A)
[^31]: [Design and fluid typography with CSS: How to apply it to your web with clamp](https://utopigstudio.com/es/blog/diseno/tipografia-fluida-css-clamp#:~:text=Pst%3A%20Clamp%20como%20verbo%20en,que%20el%20nombre%20tiene%20sentido)
[^32]: [Fluid web design](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=El%20dise%C3%B1o%20fluido%20es%2C%20por,%E2%80%8D)
[^33]: [Responsive web design: Fluid typography with CSS clamp • Silo Creativo](https://www.silocreativo.com/diseno-web-responsive-tipografia-fluida-con-css-clamp/#:~:text=Con%20las%20tipograf%C3%ADas%20fluidas%2C%20hacemos,m%C3%ADnimo%20de%20tama%C3%B1o%20de%20fuente)
[^34]: [Images - Bootstrap](https://getbootstrap.com/docs/4.0/content/images/#:~:text=Images%20,scales%20with%20the%20parent%20element)
[^35]: [Responsive web design: Fluid typography with CSS clamp • Silo Creativo](https://www.silocreativo.com/diseno-web-responsive-tipografia-fluida-con-css-clamp/#:~:text=tama%C3%B1o%20adecuado,referimos%20a%20la%20tipograf%C3%ADa%20fluida)
[^36]: freecodecamp.org
[^37]: [What are fluid, adaptive and responsive web designs?](https://blog.ida.cl/diseno/diferencias-diseno-web-fluido-adaptativo-responsivo/#:~:text=En%20este%20tipo%20de%20dise%C3%B1o,textos%20son%20dif%C3%ADciles%20de%20leer)
[^38]: [clamp() - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp#:~:text=Note%20that%20using%20,the%20use%20of%20media%20queries)
[^40]: [alistapart.com](https://alistapart.com/article/responsive-web-design/)
[^41]: [alistapart.com](https://alistapart.com/article/fluidgrids/)
[^42]: [What are fluid, adaptive and responsive web designs?](https://blog.ida.cl/diseno/diferencias-diseno-web-fluido-adaptativo-responsivo/)
[^43]: [Responsive web design: Fluid typography with CSS clamp • Silo Creativo](https://www.silocreativo.com/diseno-web-responsive-tipografia-fluida-con-css-clamp/)
[^44]: [Design and fluid typography with CSS: How to apply it to your web with clamp](https://utopigstudio.com/es/blog/diseno/tipografia-fluida-css-clamp)
[^45]: [Fluid web design](https://www.kingseo.es/post/el-diseno-web-fluido-2022)
[^46]: [The importance of responsive web design in the mobile era | Pibeca Solutions](https://www.pibeca.com/2023/11/27/la-importancia-del-diseno-web-responsive-en-la-era-movil/)
[^47]: [Images - Bootstrap](https://getbootstrap.com/docs/4.0/content/images/)