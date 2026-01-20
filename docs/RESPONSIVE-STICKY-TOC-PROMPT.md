# Responsive Sticky Automatic TOC System - Implementation Prompt

> **Purpose**: This document provides a comprehensive specification for implementing a responsive, sticky, automatically-generated Table of Contents (TOC) sidebar for documentation/lesson pages. Follow these instructions to replicate the exact system used in the Web Atelier UDIT project.

---

## System Overview

The TOC system consists of four integrated components:

1. **Markdown TOC Generation** - Automatic TOC generation from headings using kramdown `{:toc}` directive
2. **HTML Layout Structure** - Jekyll/Liquid template with conditional TOC sidebar
3. **JavaScript Functionality** - DOM manipulation, mobile toggle, scroll tracking, and smooth navigation
4. **CSS Styling** - Grid layout, sticky positioning, responsive breakpoints, and visual feedback

---

## 1. Markdown Configuration & Usage

### Jekyll Configuration (`_config.yml`)

Add kramdown TOC configuration to your Jekyll `_config.yml`:

```yaml
markdown: kramdown
kramdown:
 input: GFM
 hard_wrap: false
 parse_block_html: true
 parse_span_html: true
 auto_ids: true
 auto_id_stripping: true

 # TOC levels to include (h2, h3, h4)
 toc_levels: 2..4
```

### Markdown File Usage

In each content file that needs a TOC, add this block at the beginning of your content (after front matter):

```markdown
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->
```

**Key elements:**

- `{: .no_toc }` - Excludes the "Table of Contents" heading from the TOC itself
- `- TOC` followed by `{:toc}` - Triggers kramdown to generate the TOC
- `<!-- prettier-ignore-start/end -->` - Prevents code formatters from breaking the syntax

The generated TOC will have the id `markdown-toc` and contain nested `<ul>` lists with `<a>` links to each heading.

---

## 2. HTML Layout Structure

### Layout Template (`_layouts/lesson.html`)

Create the layout template that conditionally renders the TOC sidebar:

```html
---
layout: default
---

{% comment %} Detect if TOC exists by checking if markdown has {:toc} {% endcomment %} {% assign has_toc = false %} {%
if page.content contains '{:toc}' %} {% assign has_toc = true %} {% endif %} {% if has_toc %}
<button class="toc-toggle" id="toc-toggle" aria-label="Open table of contents" aria-expanded="false">
	<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
	</svg>
	<span class="toc-toggle-text">{% if page.lang == "es" %}Contenido{% else %}Contents{% endif %}</span>
</button>
<div class="toc-backdrop" id="toc-backdrop" aria-hidden="true"></div>
{% endif %}

<div class="lesson-wrapper">
	{% if has_toc %}
	<aside class="lesson-toc" id="lesson-toc" aria-label="Table of Contents">
		<div class="toc-container">
			<div class="toc-header">
				<h2 class="toc-title">{% if page.lang == "es" %} Tabla de contenidos {% else %} Table of Contents {% endif %}</h2>
				<button class="toc-close" id="toc-close" aria-label="Close table of contents" aria-expanded="true">
					<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			</div>
			<nav class="toc-nav" id="toc-nav">
				<div id="toc-sidebar-placeholder" class="toc-content"></div>
			</nav>
		</div>
	</aside>
	{% endif %}

	<div class="lesson-main">
		<article class="lesson-content">
			<!-- Your breadcrumb, header, and content here -->
			<div class="lesson-body prose prose-lg prose-slate dark:prose-invert">{{ content }}</div>
		</article>
	</div>
</div>
```

### Key HTML Structure Elements

| Element                    | Purpose                                                   |
| -------------------------- | --------------------------------------------------------- |
| `.toc-toggle`              | Mobile floating button to open TOC drawer                 |
| `.toc-backdrop`            | Semi-transparent overlay when TOC is open on mobile       |
| `.lesson-wrapper`          | CSS Grid container for two-column layout                  |
| `.lesson-toc`              | Aside container for the TOC sidebar                       |
| `#toc-sidebar-placeholder` | Target container where JavaScript moves the generated TOC |
| `.lesson-main`             | Main content area with independent scrolling              |

---

## 3. JavaScript Functionality

Add this script at the end of your layout template (after the closing `</div>` of lesson-wrapper):

```javascript
<script>
(function () {
  // 1. Move TOC from content to sidebar and hide the original heading
  const toc = document.getElementById('markdown-toc');
  const placeholder = document.getElementById('toc-sidebar-placeholder');

  if (toc && placeholder) {
    placeholder.appendChild(toc);
  }

  // 2. Hide the TOC heading in the main content (handles multiple languages)
  const tocHeading = document.querySelector('h2.no_toc');
  if (tocHeading) {
    const text = tocHeading.textContent.toLowerCase();
    if (text.includes('table of contents') || text.includes('tabla de contenidos') || text.includes('📋')) {
      tocHeading.style.display = 'none';
    }
  }

  // 3. Mobile TOC toggle functionality
  const tocToggle = document.getElementById('toc-toggle');
  const tocClose = document.getElementById('toc-close');
  const lessonToc = document.getElementById('lesson-toc');
  const tocBackdrop = document.getElementById('toc-backdrop');

  function openTOC() {
    if (lessonToc) {
      lessonToc.setAttribute('aria-expanded', 'true');
      // Force display in case CSS isn't applying
      lessonToc.style.display = 'block';
      lessonToc.style.transform = 'translateX(0)';
      lessonToc.style.visibility = 'visible';
      lessonToc.style.opacity = '1';
      lessonToc.style.zIndex = '100';
    }
    if (tocToggle) tocToggle.setAttribute('aria-expanded', 'true');
    if (tocBackdrop) tocBackdrop.setAttribute('aria-hidden', 'false');
    document.body.classList.add('toc-open');
    document.body.style.overflow = 'hidden';
  }

  function closeTOC() {
    if (lessonToc) {
      lessonToc.setAttribute('aria-expanded', 'false');
      // Reset inline styles
      lessonToc.style.display = '';
      lessonToc.style.transform = '';
      lessonToc.style.visibility = '';
      lessonToc.style.opacity = '';
      lessonToc.style.zIndex = '';
    }
    if (tocToggle) tocToggle.setAttribute('aria-expanded', 'false');
    if (tocBackdrop) tocBackdrop.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('toc-open');
    document.body.style.overflow = '';
  }

  if (tocToggle && lessonToc) {
    tocToggle.addEventListener('click', openTOC);
  }

  if (tocClose && lessonToc) {
    tocClose.addEventListener('click', closeTOC);
  }

  if (tocBackdrop) {
    tocBackdrop.addEventListener('click', closeTOC);
  }

  // 4. Active TOC section highlighting based on scroll position
  if (placeholder && placeholder.querySelector('a')) {
    const tocLinks = placeholder.querySelectorAll('a[href^="#"]');
    const sections = Array.from(tocLinks).map(link => {
      const id = link.getAttribute('href').substring(1);
      const element = document.getElementById(id);
      return element ? { link, element, id } : null;
    }).filter(Boolean);

    if (sections.length > 0) {
      // Intersection Observer for active section tracking
      const observerOptions = {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      };

      // Track if we're programmatically scrolling to prevent feedback loops
      let isScrollingProgrammatically = false;

      const observer = new IntersectionObserver((entries) => {
        // Don't update during programmatic scroll
        if (isScrollingProgrammatically) return;

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Remove active class from all links
            tocLinks.forEach(link => {
              link.classList.remove('toc-active');
              link.parentElement?.classList.remove('toc-item-active');
            });

            // Find and activate the corresponding TOC link
            const activeSection = sections.find(s => s.element === entry.target);
            if (activeSection) {
              activeSection.link.classList.add('toc-active');
              activeSection.link.parentElement?.classList.add('toc-item-active');

              // Auto-scroll TOC to show active item (bidirectional sync)
              const tocNav = document.getElementById('toc-nav');
              if (tocNav && activeSection.link.offsetParent) {
                isScrollingProgrammatically = true;

                const linkTop = activeSection.link.offsetTop;
                const linkHeight = activeSection.link.offsetHeight;
                const navHeight = tocNav.offsetHeight;
                const navScrollTop = tocNav.scrollTop;

                // Calculate if link is outside visible area
                if (linkTop < navScrollTop) {
                  // Link is above visible area - scroll up
                  tocNav.scrollTo({ top: linkTop - 20, behavior: 'smooth' });
                } else if (linkTop + linkHeight > navScrollTop + navHeight) {
                  // Link is below visible area - scroll down
                  tocNav.scrollTo({ top: linkTop - navHeight + linkHeight + 20, behavior: 'smooth' });
                }

                // Reset flag after scroll animation
                setTimeout(() => {
                  isScrollingProgrammatically = false;
                }, 500);
              }
            }
          }
        });
      }, observerOptions);

      // Observe all sections
      sections.forEach(section => observer.observe(section.element));

      // 5. Smooth scroll for TOC links
      const lessonMain = document.querySelector('.lesson-main');

      tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target && lessonMain) {
              e.preventDefault();
              const headerOffset = 100;

              // Get the scroll container (lesson-main)
              const containerRect = lessonMain.getBoundingClientRect();
              const targetRect = target.getBoundingClientRect();
              const scrollTop = lessonMain.scrollTop;

              // Calculate position relative to scroll container
              const targetTop = targetRect.top - containerRect.top + scrollTop;
              const offsetPosition = targetTop - headerOffset;

              // Scroll the main content container
              lessonMain.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });

              // Update URL without jumping
              history.pushState(null, '', href);

              // Close mobile TOC after navigation
              if (window.innerWidth <= 1024) {
                closeTOC();
              }
            }
          }
        });
      });
    }
  }
})();
</script>
```

### JavaScript Functionality Breakdown

| Feature                   | Description                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------- |
| **TOC Relocation**        | Moves the kramdown-generated `#markdown-toc` from content to `#toc-sidebar-placeholder` |
| **Heading Cleanup**       | Hides the "Table of Contents" heading that kramdown leaves in the content               |
| **Mobile Toggle**         | Opens/closes the TOC drawer with floating button on mobile                              |
| **Backdrop Click**        | Closes TOC when clicking outside the drawer                                             |
| **Intersection Observer** | Tracks which section is currently visible and highlights the corresponding TOC link     |
| **Active Item Tracking**  | Adds `.toc-active` class to the currently visible section's link                        |
| **TOC Auto-scroll**       | Scrolls the TOC sidebar to keep the active item visible                                 |
| **Smooth Scroll**         | Smooth scrolling when clicking TOC links                                                |
| **URL Update**            | Updates browser URL hash without triggering page jump                                   |

---

## 4. CSS Styling

### Complete CSS for TOC System

Add these styles to your main stylesheet:

```css
/* ========================================
   CSS Variables (add to :root)
   ======================================== */
:root {
	--bg: #ffffff;
	--bg-light: #f8fafc;
	--border-light: #e2e8f0;
	--text-primary: #0f172a;
	--text-secondary: #334155;
	--muted: #64748b;
	--primary: #1d4ed8;
	--primary-hover: #1e40af;
}

/* Dark mode variables */
html.dark,
.dark {
	--bg: #0a0a0a;
	--bg-light: #171717;
	--border-light: #262626;
	--text-primary: #f5f5f5;
	--text-secondary: #d4d4d4;
	--muted: #a3a3a3;
}

/* ========================================
   Lesson Wrapper - Grid Layout
   ======================================== */
.lesson-wrapper {
	display: grid;
	grid-template-columns: 280px 1fr;
	gap: 0;
	min-height: calc(100vh - 80px);
	max-width: 100%;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

@media (max-width: 1024px) {
	.lesson-wrapper {
		grid-template-columns: 1fr;
		min-height: 0;
		display: block;
		margin: 0;
		padding: 0;
		width: 100%;
	}

	/* TOC doesn't take space in grid on mobile */
	.lesson-wrapper > .lesson-toc:not([aria-expanded='true']) {
		display: none !important;
		position: fixed !important;
	}

	/* When expanded, ensure TOC is visible */
	.lesson-wrapper > .lesson-toc[aria-expanded='true'] {
		display: block !important;
		position: fixed !important;
	}
}

/* ========================================
   TOC Sidebar (Aside)
   ======================================== */
.lesson-toc {
	position: sticky;
	top: 0;
	height: 100vh;
	overflow: hidden;
	background: var(--bg);
	border-right: 1px solid var(--border-light);
	z-index: 10;
}

@media (max-width: 1024px) {
	.lesson-toc {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		max-width: 320px;
		height: 100vh;
		z-index: 100;
		transform: translateX(-100%);
		transition: transform 0.3s ease;
		box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
		border-right: none;
		display: none;
	}

	.lesson-toc[aria-expanded='true'] {
		display: block;
		transform: translateX(0);
	}
}

.toc-container {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.toc-header {
	padding: 1.5rem 1.25rem 1rem;
	border-bottom: 1px solid var(--border-light);
	background: var(--bg);
	flex-shrink: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
}

.toc-title {
	font-size: 0.75rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--text-secondary);
	margin: 0;
	line-height: 1.2;
	flex: 1;
}

/* Close button (mobile only) */
.toc-close {
	display: none;
	background: none;
	border: none;
	color: var(--text-secondary);
	cursor: pointer;
	padding: 0.25rem;
	border-radius: 4px;
	transition: all 0.2s ease;
	width: 24px;
	height: 24px;
	align-items: center;
	justify-content: center;
}

.toc-close:hover {
	background: var(--bg-light);
	color: var(--text-primary);
}

@media (max-width: 1024px) {
	.toc-close {
		display: flex;
	}
}

/* ========================================
   Mobile TOC Toggle Button
   ======================================== */
.toc-toggle {
	display: none;
	position: fixed;
	bottom: 2rem;
	right: 2rem;
	z-index: 101;
	background: var(--primary);
	color: white;
	border: none;
	border-radius: 50px;
	padding: 0.75rem 1.25rem;
	cursor: pointer;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	transition: all 0.3s ease;
	align-items: center;
	gap: 0.5rem;
	font-size: 0.875rem;
	font-weight: 500;
}

.toc-toggle:hover {
	background: var(--primary-hover);
	transform: translateY(-2px);
	box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.toc-toggle svg {
	flex-shrink: 0;
}

@media (max-width: 1024px) {
	.toc-toggle {
		display: flex;
	}

	/* Hide toggle when TOC is open */
	body.toc-open .toc-toggle {
		opacity: 0;
		pointer-events: none;
	}
}

/* ========================================
   TOC Backdrop (Mobile)
   ======================================== */
.toc-backdrop {
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	z-index: 99;
	opacity: 0;
	transition: opacity 0.3s ease;
	backdrop-filter: blur(4px);
	pointer-events: none;
}

.toc-backdrop[aria-hidden='false'] {
	display: block;
	opacity: 1;
	pointer-events: all;
}

@media (max-width: 1024px) {
	.toc-backdrop {
		display: block;
	}
}

/* ========================================
   TOC Navigation Area
   ======================================== */
.toc-nav {
	flex: 1;
	overflow-y: auto;
	overflow-x: hidden;
	padding: 1rem 0;
	scroll-behavior: smooth;
	-webkit-overflow-scrolling: touch;
}

.toc-nav::-webkit-scrollbar {
	width: 6px;
}

.toc-nav::-webkit-scrollbar-track {
	background: transparent;
}

.toc-nav::-webkit-scrollbar-thumb {
	background: var(--border-light);
	border-radius: 3px;
}

.toc-nav::-webkit-scrollbar-thumb:hover {
	background: var(--muted);
}

.toc-content {
	padding: 0 1.25rem;
}

/* ========================================
   TOC List Styling
   ======================================== */
#toc-sidebar-placeholder ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

#toc-sidebar-placeholder > ul {
	margin: 0;
}

#toc-sidebar-placeholder li {
	margin: 0;
	position: relative;
}

#toc-sidebar-placeholder > ul > li {
	margin-bottom: 0.5rem;
}

/* TOC Links */
#toc-sidebar-placeholder a {
	display: block;
	padding: 0.5rem 0.75rem;
	margin: 0 -0.75rem;
	text-decoration: none;
	color: var(--text-secondary);
	font-size: 0.875rem;
	line-height: 1.5;
	border-radius: 6px;
	transition: all 0.2s ease;
	position: relative;
}

#toc-sidebar-placeholder a:hover {
	color: var(--text-primary);
	background: var(--bg-light);
}

/* Active TOC Link */
#toc-sidebar-placeholder a.toc-active {
	color: var(--primary);
	background: var(--bg-light);
	font-weight: 500;
}

#toc-sidebar-placeholder a.toc-active::before {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 3px;
	height: 60%;
	background: var(--primary);
	border-radius: 0 2px 2px 0;
}

/* Nested TOC Items (H3, H4) */
#toc-sidebar-placeholder ul ul {
	margin-left: 0.75rem;
	margin-top: 0.25rem;
	padding-left: 0.75rem;
	border-left: 1px solid var(--border-light);
}

#toc-sidebar-placeholder ul ul ul {
	margin-left: 0.5rem;
	padding-left: 0.5rem;
}

#toc-sidebar-placeholder ul ul a {
	font-size: 0.8125rem;
	padding: 0.375rem 0.625rem;
	color: var(--muted);
}

#toc-sidebar-placeholder ul ul a:hover,
#toc-sidebar-placeholder ul ul a.toc-active {
	color: var(--text-primary);
}

/* Active TOC Item Parent */
.toc-item-active > a {
	color: var(--primary);
	font-weight: 500;
}

/* ========================================
   Main Content Area
   ======================================== */
.lesson-main {
	overflow-y: auto;
	height: 100vh;
	scroll-behavior: smooth;
	-webkit-overflow-scrolling: touch;
	position: relative;
	margin: 0;
	padding: 0;
}

@media (max-width: 1024px) {
	.lesson-main {
		height: auto;
		overflow-y: visible;
		min-height: calc(100vh - 80px);
		margin: 0;
		padding: 0;
	}
}

.lesson-main::-webkit-scrollbar {
	width: 8px;
}

.lesson-main::-webkit-scrollbar-track {
	background: transparent;
}

.lesson-main::-webkit-scrollbar-thumb {
	background: var(--border-light);
	border-radius: 4px;
}

.lesson-main::-webkit-scrollbar-thumb:hover {
	background: var(--muted);
}

.lesson-content {
	max-width: 900px;
	margin: 0 auto;
	padding: 2rem 3rem;
}

@media (max-width: 1024px) {
	.lesson-content {
		padding: 1.5rem 1.25rem;
		max-width: 100%;
		margin-top: 0;
	}
}

@media (max-width: 768px) {
	.lesson-content {
		padding: 1.25rem 1rem;
	}
}

/* ========================================
   Heading Scroll Margins (for TOC navigation)
   ======================================== */
.lesson-body :where(h2, h3, h4) {
	scroll-margin-top: 120px;
}

.lesson-body :where(h2, h3, h4)[id] {
	position: relative;
}

/* Optional: Hover anchor indicator */
.lesson-body :where(h2, h3, h4)[id]:hover::before {
	content: '#';
	position: absolute;
	left: -1.5rem;
	color: var(--muted);
	font-weight: 400;
	opacity: 0;
	transition: opacity 0.2s ease;
}

.lesson-body :where(h2, h3, h4)[id]:hover::before {
	opacity: 1;
}

/* ========================================
   Responsive Adjustments
   ======================================== */
@media (max-width: 768px) {
	.toc-header {
		padding: 1rem 1rem 0.75rem;
	}

	.toc-content {
		padding: 0 1rem;
	}

	#toc-sidebar-placeholder a {
		font-size: 0.8125rem;
		padding: 0.4375rem 0.625rem;
	}
}

/* ========================================
   Print Styles
   ======================================== */
@media print {
	.lesson-toc,
	.toc-toggle,
	.toc-backdrop {
		display: none !important;
	}

	.lesson-wrapper {
		grid-template-columns: 1fr !important;
		display: block !important;
	}

	.lesson-main {
		height: auto !important;
		overflow: visible !important;
	}
}

/* ========================================
   Reduced Motion Support
   ======================================== */
@media (prefers-reduced-motion: reduce) {
	.lesson-main,
	.toc-nav {
		scroll-behavior: auto;
	}

	.lesson-toc,
	.toc-toggle,
	.toc-backdrop,
	#toc-sidebar-placeholder a {
		transition: none;
	}
}
```

---

## 5. Optional: CSS Counter Numbering for TOC

If you want numbered TOC items, add these CSS rules:

```css
/* Numbered TOC with CSS Counters */
#toc-sidebar-placeholder > ul {
	counter-reset: toc-h2;
}

#toc-sidebar-placeholder > ul > li {
	counter-increment: toc-h2;
}

#toc-sidebar-placeholder > ul > li > a::before {
	content: counter(toc-h2) '. ';
	font-weight: 600;
	color: var(--muted);
}

/* Nested numbering for H3 */
#toc-sidebar-placeholder > ul > li > ul {
	counter-reset: toc-h3;
}

#toc-sidebar-placeholder > ul > li > ul > li {
	counter-increment: toc-h3;
}

#toc-sidebar-placeholder > ul > li > ul > li > a::before {
	content: counter(toc-h2) '.' counter(toc-h3) ' ';
	font-weight: 500;
	color: var(--muted);
}

/* Nested numbering for H4 */
#toc-sidebar-placeholder > ul > li > ul > li > ul {
	counter-reset: toc-h4;
}

#toc-sidebar-placeholder > ul > li > ul > li > ul > li {
	counter-increment: toc-h4;
}

#toc-sidebar-placeholder > ul > li > ul > li > ul > li > a::before {
	content: counter(toc-h2) '.' counter(toc-h3) '.' counter(toc-h4) ' ';
	font-weight: 400;
	color: var(--muted);
}
```

---

## 6. File Structure Summary

```
your-project/
├── _config.yml                    # Jekyll config with kramdown TOC settings
├── _layouts/
│   ├── default.html               # Base layout
│   └── lesson.html                # Layout with TOC sidebar
├── assets/
│   └── css/
│       └── site.css               # Main stylesheet with TOC styles
└── content/
    └── your-lesson.md             # Content files with {:toc} directive
```

---

## 7. Behavior Summary

| Viewport                    | TOC Behavior                                               |
| --------------------------- | ---------------------------------------------------------- |
| **Desktop (>1024px)**       | Sticky sidebar on left, main content scrolls independently |
| **Tablet/Mobile (≤1024px)** | Hidden by default, floating button opens drawer from left  |
| **Print**                   | TOC hidden, single-column layout                           |

### User Interactions

1. **Desktop**: TOC is always visible, scrolls to keep active item visible
2. **Mobile**: Tap floating button → TOC slides in from left → backdrop appears
3. **TOC Click**: Smooth scroll to section, URL updates, mobile drawer closes
4. **Content Scroll**: Active section highlighted in TOC, TOC auto-scrolls to show active item

---

## 8. Accessibility Features

- `aria-label` on TOC aside and buttons
- `aria-expanded` state management for toggle/close buttons
- `aria-hidden` for backdrop
- Focus visible styles on all interactive elements
- Skip link support
- Reduced motion support via `prefers-reduced-motion`
- Keyboard navigation friendly

---

## 9. Checklist for Implementation

- [ ] Configure kramdown in `_config.yml` with `toc_levels: 2..4`
- [ ] Create layout template with conditional TOC sidebar
- [ ] Add `{: .no_toc }` and `{:toc}` directives to content files
- [ ] Add CSS for grid layout, sticky positioning, and responsive breakpoints
- [ ] Add JavaScript for TOC relocation, toggle, and scroll tracking
- [ ] Test on desktop, tablet, and mobile viewports
- [ ] Verify print styles hide TOC appropriately
- [ ] Test keyboard navigation and screen reader compatibility

---

## References

- [Kramdown TOC Documentation](https://kramdown.gettalong.org/converter/html.html#toc)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [CSS Scroll Behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)
- [ARIA Best Practices](https://www.w3.org/WAI/ARIA/apg/)

---

_Generated from Web Atelier UDIT project implementation - January 2026_
