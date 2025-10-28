---
title: 'Modern Web Design Trends: Practical Guide for Students'
title_en: 'Modern Web Design Trends: Practical Guide for Students'
description: 'A hands-on exploration of key web design trends like parallax, glassmorphism, typography, dark mode, minimalism vs. maximalism, scrollytelling, and 3D effects. Simplified for beginners with active exercises and critical reflections.'
date: 2025-10-14
author: 'Atelier Team'
lang: 'en'
locale: 'en'
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Modern Web Design Trends: Practical Guide for Students

Welcome to this hands-on guide on modern web design trends! We'll explore trends that make websites more engaging and communicative. Each trend is broken into short, simple modules. You'll learn the "why" and "how" through analogies, interactive demos, and reflections.

Think of web design as storytelling: trends are tools to make your story clearer, more fun, or more immersive. We'll focus on **active learning**—try things as you go! Each module includes a complete, interactive demo you can explore, inspect, and customize.

> **Quick Tip:** Read one module at a time. After each, explore the demo and reflect. This keeps things clear and fun!

> **AI Assistance Disclosure:** This lesson draws from classroom experience since September 2024, with AI iterations following research–practice–research cycles.

---

## Module 1: Parallax Scrolling – Adding Depth Like a Movie

### What Is It?

Parallax scrolling makes backgrounds move slower than foreground content as you scroll. It's like looking out a car window: trees (background) move slower than the road (foreground). This adds **depth** and makes sites feel dynamic.

**Analogy:** Imagine a comic book where background panels shift slightly as you turn pages— it creates a sense of movement without overwhelming the story.

### Why Use It?

- Makes sites more engaging (users scroll longer).
- Helps tell a story visually (e.g., a portfolio showing "journey" through layers).
- But: Can cause motion sickness or slow down sites—use sparingly!

### Hands-On Learning: Explore the Demo

**📂 Open the demo file:** [`demo/01-parallax-scrolling.html`](demo/01-parallax-scrolling.html)

**🎯 What to look for:**

The **key CSS property** that creates parallax is `background-attachment: fixed`. Here's the core technique from the demo:

```css
.parallax-bg {
	background-image: url('...');
	min-height: 400px;
	background-attachment: fixed; /* This creates the parallax effect! */
	background-position: center;
	background-size: cover;
}
```

**How it works:**

- `background-attachment: fixed` keeps the background image **stationary relative to the viewport**
- As you scroll, the content moves but the background stays in place
- This creates the illusion of depth (like looking through layers)

**📚 Learning steps:**

1. **View it in your browser** – Scroll up and down to experience the parallax effect
2. **Compare both sections** – Purple section uses `fixed`, green section uses `scroll` (default)
3. **Open DevTools (F12)** – Find `.parallax-bg` and toggle `background-attachment` between `fixed` and `scroll`
4. **Check the JavaScript** – The demo respects `prefers-reduced-motion` for accessibility
5. **Experiment** – Change `min-height`, swap colors, or add your own images

**Time:** 5-10 minutes. **Reflection:** Does the parallax effect enhance storytelling or feel distracting? How does motion impact users differently?

> **Key Insight:** Parallax is simple but powerful—test on mobile to ensure it doesn't distract.

🎯 **[View Interactive Demo: Parallax Scrolling →](demo/01-parallax-scrolling.html)**

---

## Module 2: Glassmorphism – Frosted Glass Effects for Modern UIs

### What Is It?

Glassmorphism creates a "frosted glass" look: semi-transparent elements with blur, like a foggy window. You see through it but with softness.

**Analogy:** Picture a shower door with condensation—shapes are visible but blurred, adding a modern, layered feel.

### Why Use It?

- Adds depth and premium feel (e.g., cards that "float").
- Popular in apps like iOS—feels tactile without being heavy.
- Caveat: Can reduce readability; ensure text contrasts well.

### Hands-On Learning: Explore the Demo

**📂 Open the demo file:** [`demo/02-glassmorphism.html`](demo/02-glassmorphism.html)

**🎯 What to look for:**

The **magic ingredient** is `backdrop-filter` combined with semi-transparent backgrounds. Here's the glassmorphism recipe from the demo:

```css
.glass-card {
	/* Semi-transparent background - lets content show through */
	background: rgba(255, 255, 255, 0.2);

	/* The glassmorphism magic! */
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px); /* Safari support */

	/* Subtle border adds definition */
	border: 1px solid rgba(255, 255, 255, 0.3);

	/* Modern rounded corners */
	border-radius: 16px;

	/* Depth with shadow */
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
}
```

**How it works:**

- `backdrop-filter: blur()` blurs **whatever is behind** the element
- `rgba()` with low alpha (0.2) makes the background **see-through**
- The combination creates a "frosted glass" effect
- Border adds definition so the glass doesn't disappear

**📚 Learning steps:**

1. **Experience three variations** – Standard (10px blur), dark (15px), and extra blur (20px)
2. **Compare blur amounts** – Notice how readability changes with 5px vs. 20px
3. **Open DevTools** – Try changing `blur(10px)` to different values like `blur(5px)` or `blur(30px)`
4. **Adjust transparency** – Change `rgba(255, 255, 255, 0.2)` to `0.1` or `0.5` and see the difference
5. **Test readability** – Ask: can you still read text comfortably?

**Time:** 5-10 minutes. **Reflection:** When does glass enhance vs. hinder readability? How does blur amount affect the "premium" feeling?

> **Key Insight:** Use `backdrop-filter` for the blur—it's supported in modern browsers.

🎯 **[View Interactive Demo: Glassmorphism →](demo/02-glassmorphism.html)**

---

## Module 3: Neumorphism – Soft 3D Shadows for Embossed Interfaces

### What Is It?

Neumorphism (a blend of "new" and "skeuomorphism") combines 3D elements with soft shadows and subtle highlights to create an "embossed" or "pressed" look. It uses light shadows for raised elements and dark shadows for inset ones, often on a matching background for a seamless feel. Combined with glassmorphism, it adds translucent layers for extra depth.

**Analogy:** Imagine buttons that look like they're gently pressed into soft clay—raised edges catch light, inset areas feel recessed, giving a tactile, almost physical quality to flat screens.

### Origins and Definitions

- Coined by designer Alexander Plyuto, neumorphism draws from skeuomorphism (realistic designs mimicking physical objects) but softens it for modern, minimalist interfaces.
- First notable example: Plyuto's "Skeuomorph Mobile Banking" concept on Dribbble ([Dribbble Shot](https://dribbble.com/shots/7994421-Skeuomorph-Mobile-Banking)).
- It gained traction in 2020 as a "next step" after flat design, often paired with glassmorphism for layered, futuristic UIs.

### Why Use It?

- Creates a soft, approachable feel—elements seem touchable and integrated.
- Enhances user experience in apps (e.g., toggles that "press in" like real buttons).
- Popular in fintech and creative tools for a premium, innovative vibe.
- Caveat: Can reduce accessibility (low contrast); ensure sufficient color differences for readability.

### Hands-On Learning: Explore the Demo

**📂 Open the demo file:** [`demo/03-neumorphism.html`](demo/03-neumorphism.html)

**🎯 What to look for:**

Neumorphism uses **dual shadows** (light and dark) to create a soft, embossed look. Here's the technique from the demo:

```css
.neu-button {
	background: #e0e0e0; /* Must match page background! */
	border: none;
	border-radius: 20px;
	padding: 15px 30px;

	/* Dual shadows create the raised effect */
	box-shadow: 8px 8px 15px #bebebe, /* Dark shadow (bottom-right) */ -8px -8px 15px #ffffff; /* Light shadow (top-left) */

	transition: all 0.3s ease;
}

.neu-button:active {
	/* Inset shadows create "pressed" effect */
	box-shadow: inset 8px 8px 15px #bebebe, /* Pressed in */ inset -8px -8px 15px #ffffff;
}
```

**How it works:**

- **Two shadows at opposite angles** simulate light hitting a 3D surface
- Dark shadow (#bebebe) at bottom-right = shadow side
- Light shadow (#ffffff) at top-left = highlighted side
- `inset` keyword makes shadows go inward (pressed effect)
- **Background must match parent** for seamless integration

**📚 Learning steps:**

1. **Click the buttons** – Feel how the shadow flips from outset to inset
2. **Study the shadow pairs** – Open DevTools, find `.neu-button`, and change shadow angles
3. **Compare raised vs. pressed** – Notice how `inset` changes the entire feeling
4. **Try the input field** – It uses inset shadows by default (looks recessed)
5. **Test color matching** – Change background color and see why matching is crucial
6. **Check contrast** – Why is the demo's text color #555 instead of #000?

**Time:** 5-10 minutes. **Reflection:** Does the tactile feeling improve interaction or just add visual complexity? How does low contrast affect accessibility?

> **Key Insight:** Neumorphism shines in light themes—combine with glassmorphism for hybrid effects like translucent raised cards.

🎯 **[View Interactive Demo: Neumorphism →](demo/03-neumorphism.html)**

---

## Module 4: Typography Trends – Fonts That Speak Louder

### What Is It?

Typography trends focus on fonts that adapt and express personality: fluid scaling, variable fonts (fonts that change weight/style), and bold choices.

**Analogy:** Fonts are like voices— a bold, playful font is like an excited storyteller; a clean serif is like a calm teacher.

### Why Use It?

- Makes text more readable and responsive (e.g., `clamp()` for sizes that grow with screen).
- Variable fonts save load time (one file for many styles).
- But: Too many fonts slow sites—stick to 2-3.

### Hands-On Learning: Explore the Demo

**📂 Open the demo file:** [`demo/04-fluid-typography.html`](demo/04-fluid-typography.html)

**🎯 What to look for:**

The **`clamp()` function** is the key to fluid typography. Here's how it works in the demo:

```css
.hero h1 {
	/* clamp(minimum, preferred, maximum) */
	font-size: clamp(2rem, 5vw + 1rem, 4rem);

	/* Translation:
       - Never smaller than 2rem (32px)
       - Scales with viewport: 5vw + 1rem
       - Never larger than 4rem (64px)
    */
}

.hero p {
	font-size: clamp(0.9rem, 1vw + 0.5rem, 1.1rem);
	/* Smaller range = subtler scaling */
}
```

**How it works:**

- `clamp(min, preferred, max)` takes **three values**
- `min`: smallest size (for tiny screens)
- `preferred`: viewport-based calculation (e.g., `5vw` = 5% of viewport width)
- `max`: largest size (prevents text from becoming huge)
- **Fluid scaling without media queries!**

**Compare three approaches:**

```css
/* Old way: Fixed */
h1 {
	font-size: 32px;
} /* Same on all screens */

/* Better: Viewport units */
h1 {
	font-size: 5vw;
} /* Scales but can get too small or huge */

/* Best: Fluid with boundaries */
h1 {
	font-size: clamp(2rem, 5vw, 4rem);
} /* Scales smartly */
```

**📚 Learning steps:**

1. **Resize your browser window** – Drag it from wide to narrow and watch text scale
2. **Compare the demo boxes** – Fixed vs. viewport-based vs. clamp()
3. **Open DevTools** – Find `.hero h1` and change `5vw` to `10vw` to see dramatic scaling
4. **Adjust boundaries** – Try `clamp(1rem, 5vw, 10rem)` for a wider range
5. **Test readability** – Is the minimum size still readable? Is the maximum too large?

**Time:** 5-10 minutes. **Reflection:** How does fluid typography improve user experience? When might fixed sizes be better? What's the accessibility impact?

> **Key Insight:** Use Google Fonts for easy access—always check contrast for accessibility.

🎯 **[View Interactive Demo: Fluid Typography →](demo/04-fluid-typography.html)**

---

## Module 5: Dark Mode Design – Comfortable Interfaces for All

### What Is It?

Dark mode uses dark backgrounds with light text—great for low light or saving battery.

**Analogy:** Like switching from a bright room to a cozy lamp—easier on the eyes at night.

### Why Use It?

- Reduces eye strain and saves battery on OLED screens.
- User preference—many apps offer it.
- Caveat: Can be harder to read in bright light; design for both modes.

### Two Approaches to Dark Mode

There are **two main paths** for implementing dark mode. Each has its pros and cons!

---

#### **Path A: Pure CSS (Automatic, OS-Based)**

This method uses CSS to detect the user's OS preference. **No JavaScript needed!**

**✅ Pros:** Simple, respects user's system preference, no code to maintain.  
**❌ Cons:** Cannot be toggled manually, not persistent (always follows OS settings).

**Hands-On Learning: Explore Path A in the Demo**

**📂 Open the demo file:** [`demo/05-dark-mode.html`](demo/05-dark-mode.html)

**🎯 What to look for (Path A - CSS Only):**

The demo uses **CSS Custom Properties (variables)** with a **media query** to detect OS preferences:

```css
:root {
	/* Light mode colors (default) */
	--bg-primary: #ffffff;
	--text-primary: #212529;
	--accent: #667eea;
}

/* Automatically switch when OS is in dark mode */
@media (prefers-color-scheme: dark) {
	:root {
		--bg-primary: #1a1a1a;
		--text-primary: #e9ecef;
		--accent: #8b9eff;
	}
}

/* Use variables throughout */
body {
	background-color: var(--bg-primary);
	color: var(--text-primary);
	transition: background-color 0.3s ease; /* Smooth transition */
}
```

**How it works:**

- **CSS variables** (`--variable-name`) store colors in one place
- `@media (prefers-color-scheme: dark)` detects OS setting
- When OS switches, variables update automatically
- `var(--variable-name)` uses the current value
- **Zero JavaScript needed!**

**📚 Learning steps:**

1. **Change your OS dark mode** (System Preferences → Appearance)
2. **Watch the demo switch** instantly to match your OS
3. **Open DevTools** → Elements → `:root` to see variables change
4. **Try it yourself** – Add `--new-color: red;` and use it with `var(--new-color)`

**Time:** 3 minutes. **Reflection:** Is automatic detection convenient or restrictive? Should users always have control?

---

#### **Path B: JavaScript Toggle (Manual, Persistent)**

This method lets users **manually toggle** dark mode with a button. You can save their choice in `localStorage` to make it persistent!

**✅ Pros:** User control, can be persistent across visits, works independently of OS.  
**❌ Cons:** Requires JavaScript, more code to maintain.

**Hands-On Learning: Explore Path B in the Demo**

**📂 Continue with the same demo file:** [`demo/05-dark-mode.html`](demo/05-dark-mode.html)

**🎯 What to look for (Path B - JavaScript Toggle):**

The demo uses `data-theme` attribute with JavaScript to toggle manually:

```css
/* Light mode (default) */
:root {
	--bg-primary: #ffffff;
	--text-primary: #212529;
}

/* Dark mode when attribute is set */
[data-theme='dark'] {
	--bg-primary: #1a1a1a;
	--text-primary: #e9ecef;
}
```

```javascript
// Toggle function
function toggleTheme() {
	const html = document.documentElement;
	const currentTheme = html.getAttribute('data-theme');
	const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

	// Apply new theme
	html.setAttribute('data-theme', newTheme);

	// Save to localStorage for persistence
	localStorage.setItem('theme', newTheme);
}

// Load saved theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
	document.documentElement.setAttribute('data-theme', savedTheme);
}
```

**How it works:**

- `data-theme` attribute controls which CSS rules apply
- `localStorage` saves user preference in browser
- **Persists across page reloads and sessions**
- `getAttribute()` / `setAttribute()` manage the theme
- Toggle button calls `toggleTheme()` on click

**Key difference from Path A:**

- ✅ User has **manual control**
- ✅ Preference **persists** across visits
- ❌ Requires JavaScript (won't work if JS is disabled)

**📚 Learning steps:**

1. **Click the toggle button** (moon/sun icon in header)
2. **Reload the page** – Notice it remembers your choice!
3. **Open DevTools → Application → Local Storage** – Find `theme: "dark"`
4. **View the HTML element** – See `<html data-theme="dark">` change
5. **Experiment** – Try `localStorage.setItem('theme', 'dark')` in Console

**Time:** 7 minutes. **Reflection:** When is manual control better than automatic? How important is persistence for UX?

---

### Combining Both: The Best of Both Worlds

**Pro tip:** You can combine both! Start with CSS auto-detection, then let JavaScript override it:

```css
/* Respect OS preference by default */
@media (prefers-color-scheme: dark) {
	body {
		background: #121212;
		color: white;
	}
}
/* But allow manual override */
body.light-override {
	background: white;
	color: black;
}
body.dark-override {
	background: #121212;
	color: white;
}
```

**Use Case Examples:**

- **Pure CSS:** Blogs, documentation sites (simple, respects user's global preference).
- **JavaScript Toggle:** Apps, dashboards (users want control, need persistence).
- **Combined:** E-commerce, social media (respect OS but allow override).

> **Key Insight:** Pure CSS is elegant but inflexible. JavaScript adds control but requires more work. Choose based on your users' needs!

🎯 **[View Interactive Demo: Dark Mode →](demo/05-dark-mode.html)**

---

## Module 6: Minimalism vs. Maximalism – Less or More?

### What Is It?

Minimalism: Simple, clean designs with lots of space. Maximalism: Bold, busy designs with colors and details.

**Analogy:** Minimalism is a quiet library; maximalism is a vibrant festival—both tell stories, just differently.

### Why Use It?

- Minimalism: Focuses attention, feels professional.
- Maximalism: Stands out, shows personality.
- Balance: Use minimal for clarity, maximal for impact.

### Hands-On Learning: Explore the Demo

**📂 Open the demo file:** [`demo/06-minimalism-maximalism.html`](demo/06-minimalism-maximalism.html)

**🎯 What to look for:**

The demo contrasts two opposite design philosophies. Here are the key techniques:

**Minimalism:**

```css
.minimal-section {
	/* Lots of white space */
	padding: 4rem 2rem;

	/* Limited color palette */
	background: #ffffff;
	color: #333333;

	/* Simple, clean typography */
	font-family: 'Helvetica Neue', sans-serif;
	line-height: 1.8;

	/* Generous spacing */
	margin-bottom: 3rem;
}

.minimal-card {
	padding: 3rem; /* Breathing room */
	border: 1px solid #e0e0e0; /* Subtle border */
	border-radius: 4px; /* Minimal rounding */
}
```

**Maximalism:**

```css
.maximal-section {
	/* Dense, layered backgrounds */
	background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #ffe66d);
	background-size: 200% 200%;
	animation: gradientShift 5s ease infinite;

	/* Rich patterns and textures */
	background-image: url('pattern.png'), linear-gradient(135deg, #667eea 0%, #764ba2 100%);

	/* Bold, varied typography */
	font-family: 'Impact', sans-serif;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

	/* Tight spacing, more density */
	padding: 1rem;
}
```

**Key differences:**

- **Spacing:** Minimalism = generous; Maximalism = tight
- **Color:** Minimalism = 2-3 colors; Maximalism = full spectrum
- **Elements:** Minimalism = few; Maximalism = many
- **Visual weight:** Minimalism = light; Maximalism = heavy

**📚 Learning steps:**

1. **Scroll through both sections** – Feel the emotional difference
2. **Compare spacing** – Measure padding/margin values in DevTools
3. **Count colors** – How many distinct colors in each section?
4. **Notice hierarchy** – How does each style guide your attention?
5. **Test readability** – Which is easier to scan? Which is more memorable?
6. **Try hybrid** – Can you combine minimalist layout with maximalist accents?

**Time:** 10 minutes. **Reflection:** Which communicates more effectively? Does your audience prefer calm or excitement? When does "less" actually mean "more"?

> **Key Insight:** Trends swing—minimalism was big in the 2010s; maximalism is rising for uniqueness.

🎯 **[View Interactive Demo: Minimalism vs. Maximalism →](demo/06-minimalism-maximalism.html)**

---

## Module 7: Scroll-Based Narratives – Stories That Unfold

### What Is It?

Scrollytelling: Stories that reveal as you scroll, with animations or media.

**Analogy:** Like a choose-your-own-adventure book where pages "animate" as you turn them.

### Why Use It?

- Keeps users engaged (longer scroll times).
- Great for explaining complex topics (e.g., data stories).
- Caveat: Can be heavy—optimize for performance.

### Hands-On Learning: Explore the Demo

**📂 Open the demo file:** [`demo/07-scrollytelling.html`](demo/07-scrollytelling.html)

**🎯 What to look for:**

Scrollytelling uses the **Intersection Observer API** to trigger animations when elements enter the viewport:

```javascript
// Create an observer to watch when elements scroll into view
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// Element is visible - add 'visible' class
				entry.target.classList.add('visible');
			}
		});
	},
	{
		threshold: 0.2, // Trigger when 20% of element is visible
	}
);

// Observe all story sections
document.querySelectorAll('.story-section').forEach((section) => {
	observer.observe(section);
});
```

```css
/* Initial state: hidden and shifted down */
.story-section {
	opacity: 0;
	transform: translateY(50px);
	transition: opacity 0.8s ease, transform 0.8s ease;
}

/* Revealed state: visible and in place */
.story-section.visible {
	opacity: 1;
	transform: translateY(0);
}
```

**How it works:**

- **Intersection Observer** watches for elements entering viewport
- Much more **efficient than scroll listeners** (better performance)
- `threshold: 0.2` means "trigger when 20% visible"
- `isIntersecting` checks if element is in view
- CSS transitions create smooth reveals

**📚 Learning steps:**

1. **Scroll slowly** – Watch each section fade/slide in as it appears
2. **Open DevTools Console** – The demo logs when sections become visible
3. **Find `.story-section`** – See how the `visible` class gets added
4. **Adjust threshold** – Try changing `0.2` to `0.5` or `0.8` in the code
5. **Modify transitions** – Change `0.8s` to `2s` for slower animations
6. **Stagger delays** – Notice how stat items appear one after another

**Time:** 5-10 minutes. **Reflection:** Does progressive reveal enhance storytelling or distract from content? When is scrollytelling appropriate vs. gratuitous?

> **Key Insight:** Use tools like GSAP for advanced effects—start simple.

🎯 **[View Interactive Demo: Scrollytelling →](demo/07-scrollytelling.html)**

---

## Module 8: 3D on the Web – From Flat to Immersive

### What Is It?

Adds 3D depth: CSS for simple effects, WebGL for complex scenes (e.g., rotating objects).

**Analogy:** Flat design is a photo; 3D is a sculpture—you can "walk around" it.

### Why Use It?

- Makes sites immersive (e.g., product previews).
- Fun for portfolios.
- Caveat: Can slow sites—use fallbacks.

### Hands-On Learning: Explore the Demo

**📂 Open the demo file:** [`demo/08-3d-web.html`](demo/08-3d-web.html)

**🎯 What to look for:**

CSS 3D transforms require **three key properties**. Here's the flip card technique:

```css
/* Container sets up 3D space */
.flip-container {
	perspective: 1000px; /* Creates depth - like camera distance */
	height: 300px;
}

/* Card preserves 3D transforms for children */
.flip-card {
	width: 100%;
	height: 100%;
	transform-style: preserve-3d; /* Essential for 3D! */
	transition: transform 0.6s; /* Smooth animation */
}

/* Rotate on hover */
.flip-container:hover .flip-card {
	transform: rotateY(180deg); /* Flip around Y-axis */
}

/* Front and back faces */
.flip-front,
.flip-back {
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden; /* Hide back when flipped */
}

.flip-back {
	transform: rotateY(180deg); /* Start rotated */
}
```

**The 3 pillars of CSS 3D:**

1. **`perspective`** – Creates depth (lower = more extreme, higher = subtle)
2. **`transform-style: preserve-3d`** – Enables 3D transforms for children
3. **`backface-visibility: hidden`** – Hides back side of elements

**How it works:**

- **Perspective** establishes a 3D viewing context
- **preserve-3d** maintains 3D positioning through nested elements
- **transform: rotateY/X/Z** rotates in 3D space
- **backface-visibility** prevents "see-through" effect

**3D Cube example:**

```css
.cube {
	transform-style: preserve-3d;
	animation: rotateCube 20s infinite linear;
}

/* Each face positioned in 3D space */
.cube-front {
	transform: translateZ(100px);
}
.cube-back {
	transform: rotateY(180deg) translateZ(100px);
}
.cube-right {
	transform: rotateY(90deg) translateZ(100px);
}
.cube-left {
	transform: rotateY(-90deg) translateZ(100px);
}
.cube-top {
	transform: rotateX(90deg) translateZ(100px);
}
.cube-bottom {
	transform: rotateX(-90deg) translateZ(100px);
}
```

**📚 Learning steps:**

1. **Hover over the flip card** – Watch front/back sides swap
2. **Observe the rotating cube** – See all six faces in 3D space
3. **Open DevTools** – Find `.flip-container` and change `perspective` from `1000px` to `500px` or `2000px`
4. **Modify rotation** – Try `rotateX(180deg)` instead of `rotateY(180deg)`
5. **Test `preserve-3d`** – Remove it and see the 3D effect break
6. **Adjust animation speed** – Change `20s` to `5s` for faster rotation

**Time:** 5-10 minutes. **Reflection:** When does 3D enhance UX (e.g., product previews) vs. when is it just visual flair? What's the performance cost?

> **Key Insight:** CSS for basics; Three.js for advanced—test performance.

🎯 **[View Interactive Demo: 3D on the Web →](demo/08-3d-web.html)**

---

## Interactive Demos

💡 **All demos are ready to explore!** We've created 8 comprehensive, interactive demos for each module. Each demo includes:

- **Functional code** you can inspect and learn from
- **Detailed explanations** and best practices embedded in the page
- **Critical design reflections** following the Atelier methodology
- **Self-contained HTML files** you can download, modify, and make your own
- **No external dependencies** – everything works offline!

**How to use the demos:**

1. **Browse in your browser** – Click any demo link to see it in action
2. **View the source** – Right-click and "View Page Source" to see all the code
3. **Use DevTools** – Press F12 to inspect elements and experiment with live changes
4. **Download and modify** – Save the HTML files and customize them for your projects
5. **Learn by doing** – Change values, break things, fix them—that's how you learn!

👉 [**View all demos →**](demo/)

---

## Conclusion and Final Project

You've explored 8 trends! Web design is about communication: trends help you "speak" visually.

**Final Project:** Pick 2-3 trends and apply them to a simple site (e.g., a one-page portfolio).

**Suggested approach:**

1. **Start with a demo** – Pick your favorite demo file and save it as your starting point
2. **Combine trends** – Blend glassmorphism with dark mode, or parallax with fluid typography
3. **Make it yours** – Replace the content with your own text, images, and colors
4. **Test thoroughly** – Check on mobile, test accessibility, verify performance
5. **Reflect deeply** – What worked? What would you change? Does it enhance user experience?

**Atelier Reflection:** How do these trends align with critical design? Ask yourself:

- "Does this enhance user understanding or just look cool?"
- "Who might struggle with this design choice?"
- "What's the purpose of each visual element?"
- "Could I achieve the same goal with simpler techniques?"

**Key Takeaway:** Trends are tools—use them thoughtfully. Experiment, reflect, and iterate!

## References

- [Awwwards](https://www.awwwards.com/) – Trend examples and design inspiration
- [Nielsen Norman Group](https://nngroup.com/) – UX research on dark mode, parallax, and accessibility
- [MDN Web Docs](https://developer.mozilla.org/) – Comprehensive CSS and web API documentation
- **Demo Files** – All 8 interactive demos are in the `demo/` folder—open, inspect, and learn!
