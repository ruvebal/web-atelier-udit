---
layout: methodology
title: 'Development Plan: Portfolio Template Brief Showcase'
title_alt: 'Plan de desarrollo: Showcase del brief de plantilla de portfolio'
slug: portfolio-template-brief-showcase-plan
date: 2025-01-27
author: 'Auto (AI Agent)'
lang: en
permalink: /lessons/en/portfolio-template-brief/site/plan/
description: 'Comprehensive development plan for refactoring CSS architecture and building an award-winning showcase page that demonstrates best web design practices from the course lessons.'
tags: [development-plan, css-architecture, showcase, web-design, teaching-innovation]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> **Meta-Plan Note:**
> This plan was generated following the two-phase methodology outlined in the challenge brief. Phase 1 (Planning) is documented here. Phase 2 (Implementation) will follow only after this plan is reviewed and approved. Because, as the brief wisely notes: "aimless code generation" is the enemy of intentional architecture. (And yes, we're aware of the irony that this plan itself is quite verbose. Do as we say, not as we do.)

---

## Executive Summary: The Challenge

**The Mission:** Transform the portfolio template brief into a **showcase page** that demonstrates award-winning web design while simultaneously **refactoring the CSS architecture** into a modular, maintainable barrel system. This is not just a lesson page—it's a **meta-demonstration** of the principles we teach.

**The Constraints:**

- Must work within Jekyll's markdown-to-HTML pipeline (automation is key)
- Must be doable in a single AI agent prompt (we're not building a cathedral here)
- Must maintain the sharp, self-critical humor that defines the atelier
- Must integrate techniques from lessons: parallax, glassmorphism, fluid typography, GSAP, Tailwind, intrinsic design
- Must support CSS/JS inlining for performance optimization

**The Philosophy:** We're teaching "investigación docente" (teaching innovation research). This page should be both a **teaching tool** and a **research artifact**—demonstrating that we practice what we preach.

---

## Part 1: CSS Architecture Refactoring

### Current State Analysis

**What We Have:**

- `site.css` (1000 lines) — monolithic file with everything mixed together
- `tailwind.css` (202 lines) — Tailwind directives and custom components
- `tailwind-processed.css` (3355 lines) — PostCSS output (auto-generated)
- Empty `modules/` directory — ready for modularization

**What's Wrong:**

- `site.css` violates single-responsibility principle (variables, resets, layout, components, utilities, print styles all in one file)
- No clear separation of concerns
- Difficult to maintain and extend
- Unused styles likely present (no audit performed)
- No barrel/index pattern for clean imports

**What We Need:**
A modular CSS architecture following the pattern demonstrated in the example barrel file structure:

```
assets/css/
├── index.css              # Barrel file: centralizes all imports
├── base/
│   ├── reset.css         # CSS resets/normalize
│   ├── variables.css     # CSS custom properties (design tokens)
│   └── typography.css    # Base typography system
├── layout/
│   ├── containers.css    # Container utilities, max-widths
│   ├── grid.css          # Grid layouts (homepage, lessons)
│   └── flexbox.css       # Flexbox utilities
├── components/
│   ├── navigation.css    # Header, footer, nav
│   ├── cards.css         # Lesson cards, resource cards
│   ├── buttons.css       # Button styles
│   ├── code-blocks.css   # Code highlighting, copy buttons
│   ├── tables.css        # Table styles
│   └── forms.css         # Form elements (if any)
├── utilities/
│   ├── accessibility.css # Skip links, focus states, sr-only
│   ├── animations.css    # Transitions, keyframes
│   └── print.css         # Print media queries
└── theme/
    └── dark-mode.css     # Dark mode overrides
```

### Refactoring Strategy

**Step 1: Audit & Clean**

- Use browser DevTools Coverage tool to identify unused CSS rules
- Remove styles not referenced in any layout or include file
- Document what's removed (for transparency)

**Step 2: Modularize `site.css`**
Break down the 1000-line monolith into logical modules:

1. **Variables** (lines 2-105) → `base/variables.css`

   - All `:root` custom properties
   - Dark mode variables
   - Typography scale tokens

2. **Resets & Base** (lines 129-146) → `base/reset.css`

   - Box-sizing, text-size-adjust
   - Body defaults, font-family stack

3. **Layout Components** (lines 162-177, 430-434, etc.) → `layout/containers.css`, `layout/grid.css`

   - `.container`, `.site-header`, `.site-footer`
   - Grid systems (`.lessons-grid`, `.methodology-grid`)

4. **Typography** (lines 200-285, 674-687) → `base/typography.css`

   - `.prose` styles
   - Heading hierarchy
   - Code block styles

5. **Component Styles** (lines 288-641) → `components/*.css`

   - Navigation, cards, buttons, resources
   - Hero section, sidebar info

6. **Utilities** (lines 644-1000) → `utilities/*.css`
   - Accessibility helpers
   - Print styles
   - Responsive breakpoints

**Step 3: Create Barrel File**
Create `index.css` that imports all modules in correct order:

```css
/* =============================================================================
   WEB ATELIER (UDIT) – CSS Architecture
   Barrel file: centralizes all CSS imports
   ============================================================================= */

/* 1. Base Layer: Foundation */
@import url('./base/reset.css');
@import url('./base/variables.css');
@import url('./base/typography.css');

/* 2. Layout Layer: Structure */
@import url('./layout/containers.css');
@import url('./layout/grid.css');
@import url('./layout/flexbox.css');

/* 3. Components Layer: UI Elements */
@import url('./components/navigation.css');
@import url('./components/cards.css');
@import url('./components/buttons.css');
@import url('./components/code-blocks.css');
@import url('./components/tables.css');

/* 4. Utilities Layer: Helpers */
@import url('./utilities/accessibility.css');
@import url('./utilities/animations.css');
@import url('./utilities/print.css');

/* 5. Theme Layer: Theming */
@import url('./theme/dark-mode.css');
```

**Step 4: Update Jekyll Head Include**
Modify `_includes/head.html` to load the barrel file instead of `site.css`:

```liquid
<link rel="stylesheet" href="{{ '/assets/css/tailwind-processed.css' | relative_url }}" />
<link rel="stylesheet" href="{{ '/assets/css/index.css' | relative_url }}" />
```

**Step 5: Verify & Test**

- Build Jekyll site: `npm run build`
- Test all pages render correctly
- Check browser DevTools for any missing styles
- Verify dark mode toggle still works
- Test print styles

---

## Part 2: Showcase Page Architecture

### The Vision: Award-Winning Design in Markdown

**The Challenge:** We need a showcase page that demonstrates:

- Parallax scrolling (from Modern Web Design Trends lesson)
- Glassmorphism effects
- Fluid typography with `clamp()`
- GSAP ScrollTrigger animations (if applicable)
- Intrinsic responsive design
- Dark mode toggle
- Smooth scroll-driven animations
- Professional visual hierarchy

**The Constraint:** It must be authored in **Markdown** (for Jekyll automation), not hand-crafted HTML. This means we need to:

1. Use Jekyll/Liquid to inject custom HTML where needed
2. Leverage CSS classes that can be applied via markdown extensions
3. Create a custom layout or include file for showcase-specific components
4. Use HTML blocks within markdown where necessary (Jekyll's `parse_block_html: true` allows this)

### Showcase Page Structure

**File:** `web-foundations/docs/lessons/en/portfolio-template-brief/site/index.md`

**Front Matter:**

```yaml
---
layout: showcase # Custom layout for this page
title: 'Portfolio Template Brief: A Showcase of Modern Web Design'
title_alt: 'Portfolio Template Brief: Showcase de Diseño Web Moderno'
slug: portfolio-template-brief-showcase
date: 2025-01-27
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/portfolio-template-brief/site/
description: 'An award-winning showcase page demonstrating parallax, glassmorphism, fluid typography, and modern web design techniques from the course curriculum.'
tags: [showcase, web-design, parallax, glassmorphism, teaching-innovation]
showcase: true # Flag for custom styling
---
```

**Page Sections (Markdown + Strategic HTML):**

1. **Hero Section with Parallax**

   - Large, fluid typography headline
   - Parallax background effect (CSS `animation-timeline: scroll()` or GSAP)
   - Glassmorphic overlay card with brief introduction
   - Smooth scroll indicator

2. **Design Principles Grid**

   - CSS Grid with `auto-fit` and `minmax()` (intrinsic design)
   - Cards showcasing: Responsive Design, Animations, Typography, Accessibility
   - Hover effects with glassmorphism
   - Each card links to relevant lesson

3. **Interactive Timeline/Process**

   - Visual representation of the 5-sprint development plan
   - Scroll-triggered reveals (GSAP ScrollTrigger or CSS `@scroll-timeline`)
   - Progressive disclosure of information

4. **Technique Showcase**

   - Live demos embedded (iframe or code playground)
   - Side-by-side comparisons (before/after, technique A vs B)
   - Interactive code examples with copy buttons

5. **Award Criteria Alignment**

   - Section explicitly mapping design decisions to Awwwards/Webby criteria
   - Visual design, UX, creativity, content, technical excellence
   - Self-critical annotations (what could be better)

6. **Footer with Meta-Reflection**
   - "How This Page Was Built" section
   - Links to development plan (this document)
   - Credits and methodology notes

### Custom Layout: `_layouts/showcase.html`

Create a new layout that:

- Extends `default.html` but adds showcase-specific wrapper classes
- Includes GSAP library (if using GSAP animations)
- Adds showcase-specific JavaScript for interactions
- Supports CSS/JS inlining via Jekyll plugin or build step

{% raw %}

```liquid
---
layout: default
---
{% assign showcase_css = '/assets/css/showcase.css' | relative_url %}
{% assign showcase_js = '/assets/js/showcase.js' | relative_url %}

{% if jekyll.environment == 'production' %}
  {% comment %} Inline CSS/JS for performance {% endcomment %}
  <style>
    {% include_relative ../assets/css/showcase.css %}
  </style>
  <script>
    {% include_relative ../assets/js/showcase.js %}
  </script>
{% else %}
  <link rel="stylesheet" href="{{ showcase_css }}" />
  <script src="{{ showcase_js }}" defer></script>
{% endif %}

<article class="showcase-page">
  {{ content }}
</article>
```

{% endraw %}

### Showcase-Specific CSS: `assets/css/showcase.css`

This file will demonstrate:

- Parallax scrolling with modern CSS (`animation-timeline: scroll()`)
- Glassmorphism with `backdrop-filter: blur()`
- Fluid typography with `clamp()`
- Smooth scroll-driven animations
- Dark mode support
- Responsive, intrinsic layouts

**Key Techniques to Showcase:**

```css
/* Parallax Hero */
.showcase-hero {
	position: relative;
	height: 100vh;
	overflow: hidden;
}

.showcase-hero__background {
	position: absolute;
	inset: 0;
	background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
	animation: parallax-scroll linear;
	animation-timeline: scroll();
	animation-range: 0% 100%;
}

@keyframes parallax-scroll {
	to {
		transform: translateY(-20%);
	}
}

/* Glassmorphism Card */
.glass-card {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 16px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Fluid Typography */
.showcase-title {
	font-size: clamp(2rem, 5vw + 1rem, 4rem);
	line-height: 1.2;
	font-weight: 800;
}

/* Scroll-Driven Reveal */
.reveal-on-scroll {
	opacity: 0;
	transform: translateY(2rem);
	animation: reveal linear;
	animation-timeline: view();
	animation-range: entry 0% entry 50%;
}

@keyframes reveal {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
```

---

## Part 3: Build Process & Inlining Strategy

### CSS/JS Inlining for Performance

**Why Inline?**

- Reduces HTTP requests (critical for first paint)
- Eliminates render-blocking for above-the-fold content
- Improves Lighthouse scores
- Demonstrates performance optimization (award criteria: Technical Excellence)

**Implementation Options:**

**Option A: Jekyll Plugin (Recommended)**
_(Conceptual example — if you implement it, remember to wrap the Liquid snippet in `{% raw %}` inside plan documents so Jekyll doesn’t execute it.)_

```ruby
# _plugins/inline_assets.rb
module Jekyll
  class InlineAssets < Liquid::Tag
    def initialize(tag_name, path, tokens)
      super
      @path = path.strip
    end

    def render(context)
      site = context.registers[:site]
      file_path = File.join(site.source, @path)
      if File.exist?(file_path)
        File.read(file_path)
      else
        Jekyll.logger.warn "InlineAssets: File not found: #{@path}"
        ""
      end
    end
  end
end

Liquid::Template.register_tag('inline_css', Jekyll::InlineAssets)
```

Usage in layout (wrapped in `{% raw %}` here so this document shows it as an example instead of executing it):

{% raw %}

```liquid
<style>
  {% inline_css assets/css/showcase.css %}
</style>
```

{% endraw %}

**Option B: Post-Build Script**
Create a Node.js script that:

1. Reads built HTML files
2. Finds `<link rel="stylesheet">` tags with `data-inline` attribute
3. Inlines the CSS content
4. Removes the `<link>` tag
5. Writes modified HTML

**Option C: Manual Inlining (Fallback)**
For GitHub Pages compatibility, provide a manual inlining step documented in README.

### Build Script Enhancement

Update `package.json` to include inlining step:

```json
{
	"scripts": {
		"postcss:build": "postcss docs/assets/css/tailwind.css -o docs/assets/css/tailwind-processed.css",
		"css:modularize": "node scripts/modularize-css.mjs",
		"inline:assets": "node scripts/inline-assets.mjs",
		"build": "npm run postcss:build && npm run css:modularize && bundle exec jekyll build --source docs --destination _site --config _config.yml && npm run inline:assets"
	}
}
```

---

## Part 4: The AI Agent Prompt

### The Complete Prompt for Implementation

**Target Agent:** Claude 4.5 (reasoning below)

**Prompt:**

```
You are a creative technologist working on a teaching innovation project (investigación docente) for a web development course. Your task is to refactor a CSS architecture and build an award-winning showcase page that demonstrates modern web design techniques.

CONTEXT:
- This is a Jekyll static site (Ruby-based, markdown-to-HTML)
- Current CSS is monolithic (1000 lines in site.css)
- We need modular, barrel-pattern CSS architecture
- The showcase page must be authored in Markdown (for automation)
- Must demonstrate: parallax, glassmorphism, fluid typography, GSAP (optional), intrinsic design
- Must support CSS/JS inlining for performance
- Maintain sharp, self-critical humor in content

TASK 1: CSS ARCHITECTURE REFACTORING
1. Audit site.css (1000 lines) and identify unused styles
2. Break down into modules:
   - base/ (reset, variables, typography)
   - layout/ (containers, grid, flexbox)
   - components/ (navigation, cards, buttons, code-blocks, tables)
   - utilities/ (accessibility, animations, print)
   - theme/ (dark-mode)
3. Create index.css barrel file importing all modules in correct order
4. Update _includes/head.html to load index.css instead of site.css
5. Verify no visual regressions

TASK 2: SHOWCASE PAGE CREATION
1. Create docs/lessons/en/portfolio-template-brief/site/index.md with:
   - Hero section with parallax (CSS scroll-driven animations)
   - Design principles grid (intrinsic CSS Grid)
   - Interactive timeline (scroll-triggered reveals)
   - Technique showcases with live demos
   - Award criteria alignment section
   - Meta-reflection footer
2. Create _layouts/showcase.html extending default.html
3. Create assets/css/showcase.css demonstrating:
   - Parallax with animation-timeline: scroll()
   - Glassmorphism with backdrop-filter
   - Fluid typography with clamp()
   - Scroll-driven reveals
   - Dark mode support
4. Ensure all techniques are responsive and accessible (prefers-reduced-motion)

TASK 3: BUILD PROCESS
1. Create scripts/modularize-css.mjs to automate CSS splitting (optional helper)
2. Document inlining strategy (Jekyll plugin or post-build script)
3. Update package.json build scripts if needed

CONSTRAINTS:
- Must work with Jekyll's markdown pipeline (use HTML blocks where needed)
- Maintain existing functionality (dark mode, navigation, etc.)
- Follow existing code style and naming conventions
- Test in both development and production builds
- Document any breaking changes

DELIVERABLES:
1. Modularized CSS files in assets/css/ structure
2. index.css barrel file
3. showcase/index.md with front matter and content
4. _layouts/showcase.html
5. assets/css/showcase.css
6. Updated _includes/head.html
7. Build script updates (if any)
8. Brief documentation of changes

TONE:
Maintain the sharp, self-critical humor evident in the existing codebase. This is teaching innovation research—be meta, be intentional, be excellent.
```

### Why Claude 4.5 Over ChatGPT 5.1?

**Claude 4.5 Advantages:**

1. **Better Long-Context Handling:** This refactoring requires understanding 1000+ lines of CSS, multiple layout files, and the entire Jekyll structure. Claude's 200k token context window handles this more gracefully than ChatGPT's (typically 128k, though GPT-4 Turbo can handle more).

2. **Superior Code Organization:** Claude excels at breaking down monolithic code into logical modules. Its reasoning about code architecture is more systematic.

3. **Markdown + HTML Hybrid:** Claude handles the nuanced requirement of "Markdown for automation, HTML where needed" better. It understands Jekyll's `parse_block_html: true` and can strategically mix markdown with HTML blocks.

4. **Self-Critical Tone:** Claude's training data includes more academic/technical writing with critical reflection. It can maintain the "sharp, self-critical humor" more authentically.

5. **Teaching Context:** Claude understands pedagogical contexts better—it can create content that's both a teaching tool and a research artifact.

**ChatGPT 5.1 Advantages (When to Use Instead):**

- If you need more creative/experimental design variations
- If you want multiple rapid iterations with different approaches
- If the task requires more "artistic" web design exploration

**Verdict:** For this task (systematic refactoring + educational showcase), **Claude 4.5 is the better choice**. It's the "architect" to ChatGPT's "artist."

---

## Part 5: Implementation Checklist

### Phase 1: CSS Refactoring (Do First)

- [ ] Audit `site.css` for unused styles (DevTools Coverage)
- [ ] Create directory structure: `assets/css/base/`, `layout/`, `components/`, `utilities/`, `theme/`
- [ ] Split `site.css` into modules (preserve line-by-line mapping for debugging)
- [ ] Create `index.css` barrel file with imports
- [ ] Update `_includes/head.html` to load `index.css`
- [ ] Test Jekyll build: `npm run build`
- [ ] Visual regression test (screenshot comparison or manual review)
- [ ] Verify dark mode toggle still works
- [ ] Test print styles
- [ ] Commit with message: `refactor(css): modularize site.css into barrel architecture`

### Phase 2: Showcase Page (Do Second)

- [ ] Create `docs/lessons/en/portfolio-template-brief/site/index.md`
- [ ] Write front matter with `layout: showcase`
- [ ] Create `_layouts/showcase.html` extending `default.html`
- [ ] Create `assets/css/showcase.css` with parallax, glassmorphism, fluid typography
- [ ] Write showcase content in markdown (with strategic HTML blocks)
- [ ] Add GSAP ScrollTrigger if using GSAP (optional)
- [ ] Test responsive behavior (320px, 768px, 1024px, 1920px)
- [ ] Test accessibility (keyboard nav, screen reader, prefers-reduced-motion)
- [ ] Verify dark mode support
- [ ] Test scroll performance (60fps target)
- [ ] Commit with message: `feat(showcase): add award-winning design demonstration page`

### Phase 3: Build Process (Do Third)

- [ ] Create `scripts/modularize-css.mjs` helper (optional)
- [ ] Implement CSS inlining strategy (Jekyll plugin or post-build script)
- [ ] Update `package.json` build scripts
- [ ] Test production build with inlined assets
- [ ] Verify Lighthouse scores improve (Performance, Best Practices)
- [ ] Document inlining process in README or DEVELOPMENT.md
- [ ] Commit with message: `feat(build): add CSS/JS inlining for performance`

### Phase 4: Documentation & Meta-Reflection

- [ ] Update this plan document with "What Was Implemented" section
- [ ] Add showcase page to course index/navigation
- [ ] Write brief reflection on process (what worked, what didn't)
- [ ] Document any deviations from plan and why
- [ ] Create GitHub Release with notes

---

## Part 6: Risk Mitigation & Contingencies

### Risk 1: Visual Regressions After CSS Split

**Mitigation:**

- Preserve original `site.css` as `site.css.backup`
- Use browser DevTools to compare before/after
- Test on multiple pages (homepage, lesson pages, methodology pages)
- Have rollback plan: revert to `site.css` if critical issues found

### Risk 2: Jekyll Build Breaks

**Mitigation:**

- Test build locally before pushing
- Use `bundle exec jekyll build --trace` for debugging
- Check Jekyll logs for Liquid syntax errors
- Verify all `@import` paths are correct (relative to `index.css`)

### Risk 3: CSS Inlining Breaks GitHub Pages

**Mitigation:**

- Test inlining in production build locally
- If plugin doesn't work on GitHub Pages, fall back to manual inlining or skip inlining
- Document workaround in README

### Risk 4: Showcase Page Too Complex for Markdown

**Mitigation:**

- Use HTML blocks within markdown (Jekyll allows this)
- Create reusable Liquid includes for complex components
- If needed, create a hybrid approach: markdown content, HTML structure

### Risk 5: Performance Degradation from Showcase Effects

**Mitigation:**

- Test on low-end devices (throttle CPU in DevTools)
- Use `will-change` sparingly
- Implement `prefers-reduced-motion` for all animations
- Consider lazy-loading GSAP if used
- Monitor Lighthouse scores before/after

---

## Part 7: Success Criteria

### Technical Excellence

- [ ] CSS architecture is modular and maintainable (barrel pattern)
- [ ] No visual regressions (pixel-perfect or acceptable deviations documented)
- [ ] Build process works in both development and production
- [ ] Lighthouse Performance score ≥ 90
- [ ] All pages load without console errors
- [ ] Dark mode toggle functions correctly
- [ ] Print styles work

### Design Excellence

- [ ] Showcase page demonstrates at least 4 design techniques from lessons
- [ ] Parallax scrolling is smooth (60fps)
- [ ] Glassmorphism effects are visually appealing
- [ ] Fluid typography scales gracefully across breakpoints
- [ ] Responsive design works on mobile (320px) to desktop (1920px)
- [ ] Visual hierarchy is clear and intentional

### Educational Value

- [ ] Showcase page serves as a teaching tool (students can learn from it)
- [ ] Code is well-commented explaining "why" not just "what"
- [ ] Meta-reflection section explains the design decisions
- [ ] Links to relevant lessons are present
- [ ] Award criteria alignment is explicit

### Process Excellence

- [ ] Plan was followed (with documented deviations)
- [ ] Commits are meaningful and descriptive
- [ ] Documentation is updated
- [ ] This plan document reflects what was actually built

---

## Part 8: Meta-Reflection (To Be Completed After Implementation)

### What Worked Well

_[To be filled after implementation]_

### What Didn't Work

_[To be filled after implementation]_

### What We Learned

_[To be filled after implementation]_

### What We'd Do Differently

_[To be filled after implementation]_

### Final Notes

_[To be filled after implementation]_

---

## Conclusion: The Plan as a Living Document

This plan is intentionally comprehensive (some might say verbose) because:

1. **Teaching Innovation Research** requires documentation of process, not just outcomes
2. **AI Agent Collaboration** benefits from explicit, detailed instructions
3. **Future Iterations** need a clear record of decisions and rationale
4. **Student Learning** is enhanced when they can see the "behind the scenes" of professional development

The plan should be updated as implementation progresses. Deviations are expected and welcome—as long as they're documented and justified. After all, the best plans are the ones that adapt to reality while maintaining their core objectives.

**Next Step:** Review this plan, approve it (or suggest modifications), then proceed to Phase 2: Implementation using the AI agent prompt provided above.

---

**Questions or Clarifications?**

If anything in this plan is unclear, ambiguous, or seems impractical, flag it before implementation begins. Better to refine the plan than to discover issues mid-implementation. (We've all been there at 3 AM, debugging CSS that worked yesterday. Let's avoid that.)

---

**Generated by:** Auto (AI Agent)
**Date:** 2025-01-27
**Methodology:** Two-phase approach (Planning → Implementation)
**Status:** Phase 1 Complete — Awaiting Approval for Phase 2
