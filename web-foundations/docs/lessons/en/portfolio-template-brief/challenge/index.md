---
layout: methodology
title: 'Final Course Project: Professional Portfolio Template'
title_alt: 'Final Course Project: Professional Portfolio Template'
slug: portfolio-template-brief
date: 2025-11-19
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/portfolio-template-brief/challenge/
description: 'Comprehensive final project brief for building a production-ready, reusable portfolio template across three grade levels: vanilla JS, Bootstrap+GSAP, and Tailwind+Vite.'
tags: [final-project, portfolio, deployment, responsive, web-standards]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> **Live Document:**
> This specification is always available at:
> [https://web-ateliers.github.io/web-foundations/lessons/en/portfolio-template-brief/challenge/](https://web-ateliers.github.io/web-foundations/lessons/en/portfolio-template-brief/challenge/)


> **On AI Agent Usage:**
> Even if you are working with tools like VS Code and Copilot, **every interaction with AI coding assistants (e.g., Cursor, GitHub Copilot, Claude, ChatGPT) must follow a two-phase approach:**
>
> 1. **Phase 1: Planning** — Request the AI to generate a development plan for the specific task/feature
> 2. **Phase 2: Implementation** — Only after the plan is documented, proceed with implementation
>
> Document each plan in `./docs/plan1.md`, `./docs/plan2.md`, `./docs/plan3.md`, etc., before implementing the corresponding feature. This ensures intentional architecture and prevents aimless code generation. (Though one suspects the AI might appreciate the structure as much as you will when debugging at 2 AM.)
>
> **Note:** This document itself was created following this methodology. See the [development plan](../plan/index.md) that guided its creation.

---

## The Philosophy: Teaching to Fish, Not Giving a Fish

<figure class="quote">
  <blockquote>
    Give a man a fish and you feed him for a day. Teach him how to fish and you feed him for a lifetime.
  </blockquote>
  <figcaption>
    &mdash; Chinese Proverb
  </figcaption>
</figure>

This final project is **not** about building just another portfolio. We have enough static portfolios cluttering GitHub that will never be updated again after receiving a grade. Instead, you are building a **reusable template**—a well-architected foundation that you (and others) can clone, fork, and customize for multiple projects throughout your career.

Think of this as crafting a **fishing net**, not catching a single fish. You're creating:

- A solid starting point for future client projects
- A demonstration of your technical capabilities
- A customizable system adaptable to different contexts
- A professional template worthy of being forked by others

This template should be so well-structured that six months from now, when someone asks you to build them a portfolio site, you can say: "Let me show you my template" and have a professional foundation ready in minutes, not hours.

### The Web Atelier Approach

In our atelier methodology, we believe in **learning by doing**, with theory, practice, and shared reflection. This project embodies that philosophy:

1. **Theory**: You've learned responsive design, animations, typography, accessibility, and deployment throughout the course
2. **Practice**: Now you integrate everything into a cohesive, professional project
3. **Reflection**: You'll document your decisions, critique your work, and help index the broader course community

Professional web development isn't about memorizing frameworks—it's about understanding principles and applying them creatively. (And yes, occasionally questioning why CSS Grid behaves that way at 3 AM, only to realize you forgot `display: grid`. We've all been there.)

---

## Project Overview

### What You're Building

A **production-ready portfolio template** that demonstrates:

- Professional web development standards
- Responsive, fluid, and intrinsic design principles
- Modern CSS techniques and thoughtful animations
- Clean, maintainable, and well-documented code
- Proper deployment and version control practices
- Your unique creative signature and storytelling ability

### Three Grade Levels

This project accommodates three technical levels, each building on different foundations:

#### 🎯 First Grade: Vanilla Foundations

**Tech Stack:**

- HTML5, CSS3, JavaScript (ES6+)
- All dependencies via CDN (no build tools)
- Focus on fundamentals and clean architecture

**Ideal for:**

- Students mastering core web technologies
- Projects emphasizing semantic HTML and vanilla JS
- Learning deployment without build complexity

**Key Skills:**

- DOM manipulation without frameworks
- CSS architecture (custom properties, logical structure)
- Responsive design with media queries
- Progressive enhancement mindset

---

#### 🎯 Second Grade: Bootstrap + GSAP

**Tech Stack:**

- Bootstrap 5.x (via CDN)
- GSAP (GreenSock Animation Platform) via CDN
- JavaScript intermediate patterns
- jQuery optional (if Bootstrap components require it)

**Ideal for:**

- Students comfortable with CSS frameworks
- Projects requiring rapid prototyping
- Advanced animation implementations

**Key Skills:**

- Bootstrap customization
- GSAP timeline animations and ScrollTrigger
- Component-based thinking
- Framework-enhanced responsive design

---

#### 🎯 Third Grade: Tailwind + Vite SPA

**Tech Stack:**

- Vite build tool (Node.js environment)
- Tailwind CSS utility framework
- Vanilla JavaScript SPA with client-side routing
- PostCSS for CSS processing

**Ideal for:**

- Students ready for modern tooling
- Single-page application architecture
- Advanced build optimization

**Key Skills:**

- Modern build tools and hot module replacement
- Utility-first CSS methodology
- Client-side routing (vanilla JS implementation)
- Component architecture without frameworks
- Production build optimization

---

## Common Requirements (All Levels)

Regardless of your grade level, every project must include:

### 1. Repository & Version Control

- **GitHub repository** with clear, descriptive name (e.g., `portfolio-template-2025`)
- **Meaningful commit messages** following conventional commit style
- **Complete `.gitignore`** (exclude `node_modules/`, `.DS_Store`, IDE configs, etc.)
- **Git tag** for final submission: `v1.0.0`
- **GitHub Release** created from the tag with release notes

### 2. Deployment

- **GitHub Pages** hosting with live, accessible URL
- **Custom 404 page** with navigation back to home
- **HTTPS enabled** (automatic with GitHub Pages)
- **Deployment verification** (all assets loading, no broken links)

### 3. Documentation

- **README.md** with:

  - Live deployment link **at the very top**
  - Project description and purpose
  - Tech stack used
  - Setup instructions for local development
  - Customization guide
  - Screenshots or demo GIF
  - Credits and acknowledgments

- **LICENSE** file in root (choose [MIT](https://choosealicense.com/licenses/mit/), [Apache 2.0](https://choosealicense.com/licenses/apache-2.0/), or [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)—recommended: MIT)

- **AI Agent Usage Policy**: If you use AI assistants, include a clear section in your README describing when and how the AI was used. **Critical:** Every AI interaction must follow a **two-phase workflow**:

  1. **Phase 1: Planning** — Request a development plan from the AI
  2. **Phase 2: Implementation** — Only after documenting the plan, proceed with code

- **docs/plan1.md, plan2.md, plan3.md...**: For each feature or task where you use AI, create a separate plan file:

  - `docs/plan1.md` — First feature/task (e.g., "Responsive Navigation Component")
  - `docs/plan2.md` — Second feature/task (e.g., "GSAP Scroll Animations")
  - `docs/plan3.md` — Third feature/task (e.g., "Contact Form Integration")
  - Each plan file should contain:
    - Your prompt/question to the AI
    - The AI's complete plan response
    - Brief notes on what was implemented from the plan
  - **Never skip the planning phase** — implementation without documented planning defeats the purpose of structured development

- **Professional commit and pull request hygiene**: Use descriptive PR titles, clear summaries, and self-reviews to document your process and decision-making.
- **Before using an AI agent for implementation:** Always commit your current (pre-AI) state with a clear message (e.g., `feat(nav): before applying AI planning`). This preserves your original work and creates a transparent history of what was changed with AI involvement.

**Minimum required files for every level:**

- `README.md`
- `LICENSE`
- `.gitignore`
- `404.html` (custom error page)
- `docs/plan1.md` (if using AI for any feature—create additional plan files as needed: `plan2.md`, `plan3.md`, etc.)

**Recommended:**

- `CONTRIBUTING.md` if others may fork/contribute

### 4. Responsive Design (Fluid + Elastic + Intrinsic)

Reference: [Responsive Design Lesson]({{ base_url }}/lessons/en/responsive/)

- **Mobile-first approach** with progressive enhancement
- **Fluid typography** using `clamp()` for smooth scaling
- **Elastic layouts** adapting to container context
- **Intrinsic design** with CSS Grid `auto-fit` and Container Queries (where supported)
- **Parallax and scroll-driven effects** integrated into layout strategy
- **Tested across breakpoints**: mobile (320px-480px), tablet (481px-768px), desktop (769px+)

### 5. HTML Semantics & Structure

- **Semantic HTML5** elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- **Proper heading hierarchy** (single `<h1>`, logical `<h2>`-`<h6>` structure)
- **Accessible forms** with `<label>` associations and ARIA attributes where needed
- **Coherent directory structure**:

```
portfolio-template/
├── index.html
├── 404.html
├── README.md
├── LICENSE
├── .gitignore
├── docs/                  # Documentation and plans
│   └── plan.md           # AI agent development plan (if using AI)
├── assets/
│   ├── css/
│   │   ├── index.css        # barrel file: centralizes all CSS imports
│   │   ├── base.css         # resets, variables, root styles
│   │   ├── layout.css       # layout/grid/flex utilities
│   │   ├── components.css   # shared component styles (buttons, cards, etc.)
│   │   └── [other].css      # add as needed
│   ├── js/
│   │   └── main.js
│   ├── images/           # Use CDN for images; if local, optimized & small
│   └── fonts/            # If custom fonts (prefer system fonts)
└── [build config if applicable]
```

### 6. Metadata & Visual Identity

Reference: [Metadata & Visual Identity Lesson]({{ base_url }}/lessons/en/metadata-visual-identity-web/)

- **Complete `<head>` metadata**:
  - Title, description, keywords
  - Open Graph tags (Facebook/LinkedIn sharing)
  - Twitter Card tags
  - Viewport meta tag
  - Theme color meta tag
- **Favicon** (multiple sizes: 16x16, 32x32, 180x180 for Apple Touch)
- **Manifest.json** (optional but recommended for PWA-readiness)
- **Consistent visual identity**: color scheme, typography, iconography

### 7. Code Quality & Standards

Reference: [Linting & Formatting Lesson]({{ base_url }}/lessons/en/linting-and-formatting/)

- **Prettier** for consistent formatting
- **ESLint** for JavaScript linting (or JSHint minimum)
- **Stylelint** for CSS linting (optional but recommended)
- **No console errors** in deployed site
- **Commented code** explaining complex logic or design decisions
- **CSS organization**: variables, resets, layout, components, utilities
- **JavaScript organization**: clear functions, no global namespace pollution

### 8. Basic Accessibility

(Note: Full accessibility will be covered next semester. For now, focus on fundamentals.)

- **Color contrast** meeting WCAG AA standards (4.5:1 for body text)
- **`prefers-reduced-motion` media query** to disable animations for users who need it
- **Alt text** on all meaningful images
- **Keyboard navigation** functional for interactive elements
- **Skip-to-content link** for screen readers (optional but appreciated)

---

## Technical Components to Implement

### Animation & Interactivity

Choose techniques appropriate to your grade level:

#### CSS Animations (All Levels)

Reference: [CSS Animations Lesson]({{ base_url }}/lessons/en/web-animations/css/)

- **Transitions** for hover states, button interactions
- **Keyframe animations** for hero entrances, loading states
- **Scroll-driven animations** (modern CSS `animation-timeline: scroll()`)

#### GSAP Animations (Grade 2 & 3)

Reference: [GSAP Animations Lesson]({{ base_url }}/lessons/en/web-animations/gsap/)

- **Timeline animations** for complex sequences
- **ScrollTrigger** for scroll-based reveals and parallax
- **SplitText** for text reveals (optional, premium plugin)

### Typography

Reference: [Typography & Color Lesson]({{ base_url }}/lessons/en/typography-color/)

- **Fluid typography system** using `clamp()`:
  ```css
  :root {
  	--text-base: clamp(1rem, 2.5vw, 1.125rem);
  	--text-lg: clamp(1.125rem, 3vw, 1.25rem);
  	--text-xl: clamp(1.25rem, 4vw, 1.5rem);
  	--text-2xl: clamp(1.5rem, 5vw, 2rem);
  	--text-3xl: clamp(2rem, 6vw, 3rem);
  }
  ```
- **System font stack** or carefully chosen web font (max 2-3 font families)
- **Responsive line heights**

### Design Trends (Choose 2-3 to Implement)

Reference: [Modern Web Design Trends Lesson]({{ base_url }}/lessons/en/modern-web-design-trends/)

- **Glassmorphism**: Frosted glass effect with `backdrop-filter: blur()`
- **Neumorphism**: Soft UI with subtle shadows (use sparingly)
- **Parallax scrolling**: Different scroll speeds for depth
- **Dark mode toggle**: CSS custom properties + JavaScript state
- **Gradient backgrounds**: Modern, vibrant color transitions
- **Scroll-snapping**: Section-by-section navigation
- **Micro-interactions**: Delightful small animations on user actions

### Component Patterns

Build these core components with attention to detail:

1. **Navigation**

   - Responsive menu (hamburger on mobile)
   - Smooth scroll to sections
   - Active state indication
   - Sticky/fixed positioning (optional)

2. **Hero Section**

   - Compelling headline and subheading
   - Call-to-action button
   - Background image or gradient
   - Scroll indicator (optional)

3. **About Section**

   - Brief bio or introduction
   - Skills or technologies grid
   - Optional: profile image with hover effect

4. **Projects/Portfolio Grid**

   - CSS Grid or Flexbox layout
   - Project cards with images
   - Hover effects (or modals) revealing project info
   - Links to live demos and code repos

5. **Contact Section**

   - Contact form (can be Formspree integration) or email link
   - Social media links
   - Location or availability info (optional)

6. **Footer**
   - Copyright notice
   - Quick links
   - Back-to-top button (optional)
   - Link to gitHub repository

---

## Grading Rubric _(provisional — point values subject to minor adjustment)_

> _Note: These percentages are a working draft and may be fine-tuned as the course progresses — focus on your process, not perfection! Don’t stress over individual points; the real goal is to enjoy learning, build something meaningful, and grow your skills._

Your project will be evaluated on both **technical excellence** (60 points) and **design & human factors** (40 points). This balance reflects that professional web development requires both solid engineering and thoughtful user experience.

### Technical Excellence (60 points)

#### 1. Code Quality & Architecture (15 points)

- **[5 pts]** Clean, well-organized code structure
- **[3 pts]** Proper use of CSS custom properties and modern features
- **[3 pts]** JavaScript follows best practices
- **[2 pts]** Code is linted and formatted (Prettier + ESLint)
- **[2 pts]** Meaningful comments explaining complex logic

#### 2. Deployment & Repository Setup (10 points)

- **[3 pts]** GitHub repository properly configured with clear README
- **[3 pts]** Live deployment on GitHub Pages, fully functional
- **[2 pts]** Git tag (`v1.0.0`) and GitHub Release created
- **[2 pts]** Complete `.gitignore` and clean commit history

#### 3. Responsive Design Implementation (15 points)

- **[5 pts]** Fluid typography system with `clamp()`
- **[4 pts]** Mobile-first responsive layout working across all breakpoints
- **[3 pts]** Parallax and scroll-driven effects integrated into layout
- **[3 pts]** Intrinsic design principles (CSS Grid auto-fit, container awareness)

#### 4. Animations & Interactivity (10 points)

- **[4 pts]** Smooth, purposeful animations (CSS and/or GSAP)
- **[3 pts]** Interactive components (navigation, hover states, forms)
- **[3 pts]** `prefers-reduced-motion` implementation for accessibility

#### 5. HTML Semantics & Accessibility (10 points)

- **[4 pts]** Semantic HTML5 structure with proper heading hierarchy
- **[3 pts]** Complete `<head>` meta elements and favicon.
- **[3 pts]** Basic accessibility: color contrast, alt text, keyboard navigation

---

### Design & Human Factors (40 points)

#### 6. Visual Aesthetics & Coherence (12 points)

- **[4 pts]** Professional, polished visual design
- **[4 pts]** Coherent color scheme and typography system
- **[4 pts]** Consistent visual language throughout (spacing, sizing, patterns)

#### 7. Creativity & Personal Signature (12 points)

- **[5 pts]** Unique creative touches that distinguish this template
- **[4 pts]** Personal style evident in design choices
- **[3 pts]** Thoughtful implementation of design trends (not just copying)

#### 8. Narrativity & Storytelling (8 points)

- **[4 pts]** Clear narrative flow guiding the user through sections
- **[4 pts]** Content structure tells a coherent story (even if placeholder content)

#### 9. Pragmatics & Usability (8 points)

- **[4 pts]** Intuitive navigation and user flows
- **[4 pts]** Practical usability: fast load times, no broken interactions

---

## Web Professional Standards: Pre-Submission Checklist

Before you submit, verify **every item** on this checklist. Professional developers don't ship work without quality assurance. (Why do developers prefer dark mode? Because bugs are attracted to light. But seriously—this checklist catches those bugs before your portfolio goes live.)

### Repository & Version Control

- [ ] Repository has a clear, descriptive name
- [ ] README.md exists with live deployment link at the top
- [ ] README includes setup instructions and tech stack
- [ ] `.gitignore` is complete and appropriate for your stack
- [ ] Commit history is clean with meaningful messages
- [ ] Git tag `v1.0.0` created
- [ ] GitHub Release created with release notes
- [ ] No sensitive information committed (API keys, passwords, etc.)

### Deployment Verification

- [ ] Site is live on GitHub Pages at public URL
- [ ] All pages load without errors (check browser console)
- [ ] All images and assets load correctly
- [ ] No broken links (internal or external)
- [ ] Custom 404 page works and navigates back to home
- [ ] HTTPS is enabled (automatic with GitHub Pages)
- [ ] Site works in incognito/private mode (caching not hiding issues)

### Responsive Behavior

- [ ] Mobile (320px): Layout is usable, no horizontal scroll
- [ ] Mobile (480px): All content readable and accessible
- [ ] Tablet (768px): Layout adapts appropriately
- [ ] Desktop (1024px): Full layout displays correctly
- [ ] Large desktop (1920px): No excessive whitespace or stretching
- [ ] Orientation changes handled gracefully (portrait/landscape)

### Code Quality

- [ ] HTML validates (use [W3C Validator](https://validator.w3.org/))
- [ ] CSS is organized and follows naming conventions
- [ ] JavaScript has no console errors in production
- [ ] Code is formatted with Prettier
- [ ] Code is linted (ESLint for JS, optionally Stylelint for CSS)
- [ ] No commented-out code blocks left in production
- [ ] Comments explain "why," not "what"

### HTML Semantics & Structure

- [ ] Semantic HTML5 elements used appropriately
- [ ] Single `<h1>` per page, logical heading hierarchy
- [ ] All images have descriptive `alt` attributes
- [ ] Forms have proper `<label>` associations
- [ ] Directory structure is logical and clean

### Design & Animations

- [ ] Fluid typography system implemented with `clamp()`
- [ ] At least 2 design trends from lessons implemented
- [ ] CSS animations smooth (60fps, no jank)
- [ ] `prefers-reduced-motion` media query disables animations
- [ ] Hover states on interactive elements
- [ ] Loading states for any async content

### Metadata & Visual Identity

- [ ] `<title>` is descriptive and unique
- [ ] Meta description exists and is compelling (150-160 chars)
- [ ] Open Graph tags complete (og:title, og:description, og:image, og:url)
- [ ] Twitter Card tags complete
- [ ] Favicon exists and displays correctly (multiple sizes)
- [ ] Viewport meta tag configured: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] Theme color meta tag set

### Performance

- [ ] Images optimized (use ImageKit CDN or similar)
- [ ] CSS and JS minified (if using build tools)
- [ ] No unused CSS or JavaScript
- [ ] Fonts loaded efficiently (preload, font-display: swap)
- [ ] Page loads in under 3 seconds on 3G (test with DevTools throttling)

### Accessibility (Basic)

- [ ] Color contrast meets WCAG AA (4.5:1 for body text)
- [ ] All interactive elements keyboard-navigable
- [ ] `prefers-reduced-motion` implemented
- [ ] Focus states visible on interactive elements
- [ ] No color-only information (use icons or text too)

### Level-Specific

#### Vanilla (Grade 1)

- [ ] All dependencies via CDN (no build step required)
- [ ] Vanilla JavaScript, no jQuery or frameworks
- [ ] CSS custom properties used for theming

#### Bootstrap + GSAP (Grade 2)

- [ ] Bootstrap 5 loaded via CDN
- [ ] Bootstrap customized (not default theme)
- [ ] GSAP animations implemented with ScrollTrigger
- [ ] Bootstrap components styled consistently

#### Tailwind + Vite (Grade 3)

- [ ] Vite build configuration works (`npm run build`)
- [ ] Tailwind purges unused CSS in production
- [ ] Client-side routing functional
- [ ] Production build deploys correctly to GitHub Pages

---

## Five-Sprint Development Plan

Each sprint is designed to be completable in 1.5-4 hours of focused work. Sprints will be conducted during class sessions, allowing for professor assistance, peer collaboration, and AI agent consultation (with proper planning documentation).

### Sprint 1 (Week 1): Foundation & Setup

**Time Estimate:** 1.5-2 hours
**Goal:** Establish project structure and initial deployment

> **Quick Planning Note:** Simple pencil sketches of your layout ideas are more than helpful, but high-fidelity mockups are not necessary.

#### Tasks:

1. **Repository Setup**

   - Create GitHub repository with clear name
   - Initialize with README template
   - Create `.gitignore` appropriate for your stack
   - Set up local development environment

2. **Project Structure**

   - Create directory structure (assets/css, assets/js, etc.)
   - Set up index.html with semantic skeleton
   - Create 404.html page
   - If using Vite: Initialize project with `npm create vite@latest`

3. **CSS Architecture**

   - Define CSS custom properties for colors, spacing, typography
   - Create CSS reset/normalize
   - Set up base typography styles
   - Implement system font stack or load web fonts

4. **Initial Deployment**

   - Configure GitHub Pages
   - Deploy initial version
   - Verify deployment works

5. **Documentation**
   - Write initial README with project description
   - Add deployment link to README
   - If using AI agents: Create `docs/plan1.md` with development plan (Phase 1: Planning) before any implementation (Phase 2)

**Deliverable:** Live site with basic structure deployed to GitHub Pages

---

### Sprint 2 (Week 2): Responsive Layout & Core Sections

**Time Estimate:** 2-3 hours
**Goal:** Build main layout with responsive, fluid design

#### Tasks:

1. **Fluid Typography System**

   - Implement `clamp()` based typography scale
   - Test scaling across breakpoints
   - Ensure readability at all sizes

2. **Core Sections HTML**

   - Build hero section with CTA
   - Create about section structure
   - Build projects grid structure
   - Add contact section
   - Create footer

3. **Responsive Layout**

   - Implement mobile-first CSS
   - Add media queries for tablet and desktop
   - Test layout across all breakpoints
   - Ensure no horizontal scroll on mobile

4. **Parallax & Scroll-Driven Effects**

   - Integrate parallax scrolling in hero or sections
   - Implement scroll-driven layout strategies
   - Test performance and smoothness

5. **Grid/Flexbox Layouts**
   - CSS Grid for projects (auto-fit, minmax)
   - Flexbox for navigation and smaller components
   - Ensure intrinsic, container-aware behavior

**Deliverable:** Fully responsive layout working across all devices

---

### Sprint 3 (Week 3): Animations & Interactivity

**Time Estimate:** 2-4 hours
**Goal:** Add polish with animations and interactive components

#### Tasks:

1. **CSS Animations**

   - Transitions for hover states (buttons, cards, links)
   - Keyframe animations for hero entrance
   - Scroll-driven animations (modern CSS or polyfill)

2. **GSAP Implementation** (Grades 2 & 3)

   - Set up GSAP via CDN or npm
   - Create timeline animations for complex sequences
   - Implement ScrollTrigger for scroll-based reveals
   - Add parallax effects with GSAP

3. **Interactive Components**

   - Responsive navigation (hamburger menu on mobile)
   - Smooth scroll to sections
   - Project card hover effects
   - Form validation (if including contact form)

4. **Motion Accessibility**

   - Implement `prefers-reduced-motion` media query
   - Test with reduced motion enabled
   - Ensure core functionality works without animations

5. **Performance Testing**
   - Check animations run at 60fps
   - Optimize any janky animations
   - Ensure mobile performance is smooth

**Deliverable:** Polished, animated site with excellent UX

---

### Sprint 4 (Week 4): Visual Identity & Polish

**Time Estimate:** 2-3 hours
**Goal:** Complete metadata, visual identity, and creative signature

#### Tasks:

1. **Metadata Implementation**

   - Complete all `<head>` meta tags
   - Create Open Graph image (1200x630px)
   - Set up Twitter Card tags
   - Add theme-color meta tag

2. **Favicon & Visual Identity**

   - Design and generate favicon (multiple sizes)
   - Create manifest.json
   - Ensure consistent visual identity across all sections

3. **Design Trends Implementation**

   - Choose and implement 2-3 modern design trends
   - Glassmorphism, neumorphism, gradients, etc.
   - Ensure trends enhance, don't distract

4. **Creative Signature**

   - Add unique creative touches
   - Personal style in micro-interactions
   - Easter eggs or delightful details (optional but fun)

5. **Self-Index in Course Repository**
   - Fork professor's course repository
   - Add your project to student index
   - Submit pull request with your entry
   - Include: name, project URL, tech stack, brief description

**Deliverable:** Visually complete site with full metadata and course indexing

---

### Sprint 5 (Week 5): Quality Assurance & Submission

**Time Estimate:** 1.5-2 hours
**Goal:** Final testing, optimization, and submission

#### Tasks:

1. **Comprehensive Checklist Review**

   - Work through entire pre-submission checklist
   - Fix any issues discovered
   - Document any known limitations

2. **Code Quality Pass**

   - Run Prettier on all files
   - Run ESLint and fix issues
   - Remove console.logs and commented code
   - Ensure all comments are helpful

3. **Cross-Browser Testing**

   - Test in Chrome, Firefox, Safari, Edge
   - Mobile: iOS Safari and Android Chrome
   - Fix any browser-specific issues

4. **Performance Optimization**

   - Optimize images (compression, CDN)
   - Minify CSS and JS (if using build tools)
   - Test loading speed with DevTools
   - Aim for < 3 seconds on 3G

5. **Final Documentation**

   - Update README with final details
   - Add screenshots or demo GIF
   - Document setup instructions clearly
   - Add license information

6. **Version Control & Submission**
   - Final commit with message "Release v1.0.0"
   - Create git tag: `git tag -a v1.0.0 -m "Final submission"`
   - Push tag: `git push origin v1.0.0`
   - Create GitHub Release from tag with release notes

**Deliverable:** Submission-ready, production-quality portfolio template

---

## Submission Requirements

### When You're Ready to Submit:

1. **Verify Deployment**

   - Confirm your site is live at your GitHub Pages URL
   - Test in incognito/private mode to avoid caching issues
   - Check console for any errors

2. **Create Git Tag**

   ```bash
   git tag -a v1.0.0 -m "Final portfolio template v1.0.0"
   git push origin v1.0.0
   ```

3. **Create GitHub Release**

   - Go to your repository on GitHub
   - Click "Releases" → "Create a new release"
   - Choose tag `v1.0.0`
   - Title: "Portfolio Template v1.0.0"
   - Description: Brief release notes (what's included, key features)
   - Publish release

4. **Self-Index in Course Repository** (Sprint 4 task)

   - Your entry helps build a showcase of all student work
   - Creates a collaborative learning resource
   - Practices professional open-source contribution workflow

5. **Submission Confirmation**
   - Verify your GitHub Release is public
   - Ensure README has deployment link prominently at top
   - Double-check all checklist items

---

## Level-Specific Considerations

### Vanilla (Grade 1): Fundamentals Excellence

**Focus Areas:**

- Clean, readable code without framework magic
- Deep understanding of DOM manipulation
- CSS architecture with custom properties
- Progressive enhancement mindset

**Tips:**

- Use modern JavaScript (ES6+): `const`, `let`, arrow functions, modules
- Organize JavaScript in clear, single-purpose functions
- Comment your CSS organization (variables, layout, components, utilities)
- Embrace constraints: vanilla forces you to truly understand the platform

**Common Pitfalls:**

- Not enough structure (everything in global scope)
- Overcomplicated vanilla implementations of simple tasks
- Forgetting to modularize CSS (use CSS custom properties!)

---

### Bootstrap + GSAP (Grade 2): Framework Finesse

**Focus Areas:**

- Customizing Bootstrap, not using default theme
- GSAP for complex, timeline-based animations
- Balancing framework convenience with custom styling
- Component-based organization

**Tips:**

- Customize Bootstrap via CDN variables or override styles systematically
- Use GSAP's ScrollTrigger for sophisticated scroll effects
- Don't fight the framework—learn to work with Bootstrap's grid and utilities
- Combine Bootstrap's responsive utilities with custom CSS for polish

**Common Pitfalls:**

- "Bootstrappy" default look (customize colors, fonts, spacing!)
- Loading too many Bootstrap components (only use what you need)
- Overcomplicated GSAP timelines (keep animations purposeful)
- Not testing Bootstrap's responsive breakpoints

---

### Tailwind + Vite (Grade 3): Modern Tooling Mastery

**Focus Areas:**

- Build tool configuration and optimization
- Utility-first CSS methodology
- Client-side routing (vanilla JS SPA)
- Production build optimization

**Tips:**

- Configure Tailwind purge to remove unused styles
- Use Tailwind's JIT mode for faster development
- Implement client-side routing with History API
- Optimize Vite build for GitHub Pages deployment
- Create reusable component structure despite vanilla JS

**Common Pitfalls:**

- Tailwind class soup (extract repeated patterns to CSS)
- Not purging CSS (production builds too large)
- Routing breaks on GitHub Pages (configure base path)
- Over-engineering SPA architecture (keep it simple)

**Vite + GitHub Pages Deployment:**

```javascript
// vite.config.js
export default {
	base: '/your-repo-name/', // Important for GitHub Pages
	build: {
		outDir: 'dist',
	},
};
```

Then deploy `dist/` folder to `gh-pages` branch or configure Pages to serve from `/docs` folder.

---

## Resources & References

### Essential Lessons

- [Responsive Design (Canonical)]({{ base_url }}/lessons/en/responsive/) — Fluid, elastic, and intrinsic design
- [CSS Animations]({{ base_url }}/lessons/en/web-animations/css/) — Transitions, keyframes, scroll-driven
- [GSAP Animations]({{ base_url }}/lessons/en/web-animations/gsap/) — Timeline animations and ScrollTrigger
- [Typography & Color]({{ base_url }}/lessons/en/typography-color/) — Fluid typography, color systems
- [Modern Web Design Trends]({{ base_url }}/lessons/en/modern-web-design-trends/) — Glassmorphism, parallax, dark mode
- [Metadata & Visual Identity]({{ base_url }}/lessons/en/metadata-visual-identity-web/) — Complete metadata guide
- [Linting & Formatting]({{ base_url }}/lessons/en/linting-and-formatting/) — Code quality standards

### Level-Specific Resources

**Bootstrap + GSAP:**

- [Bootstrap Final Project Deployment]({{ base_url }}/lessons/en/bootstrap/final-project-deployment/)

**Tailwind + Vite:**

- [Tailwind Build & Deploy]({{ base_url }}/lessons/en/tailwind/build-deploy/)

### External Tools

- [W3C HTML Validator](https://validator.w3.org/) — Validate HTML
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — Check color contrast
- [PageSpeed Insights](https://pagespeed.web.dev/) — Test performance
- [ImageKit.io](https://imagekit.io/) — CDN for image optimization
- [Formspree](https://formspree.io/) — Contact form backend (free tier)

---

## FAQ & Troubleshooting

### "My GitHub Pages site shows a 404 error"

**Check:**

- Settings → Pages: Is Pages enabled and set to correct branch/folder?
- Did you push your commits and wait 1-2 minutes for deployment?
- Is your `index.html` in the root (or `/docs`) folder?
- For Vite: Did you configure correct `base` path in `vite.config.js`?

### "My CSS/images aren't loading on GitHub Pages"

**Check:**

- Are paths relative, not absolute? (`./assets/css/style.css`, not `/assets/css/style.css`)
- Did you commit and push the asset files?
- Check browser console for 404 errors on specific assets
- For Vite: Ensure assets are in `public/` folder or imported correctly

### "Animations are jank on mobile"

**Optimize:**

- Use `transform` and `opacity` for animations (GPU accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Add `will-change` property for elements that will animate
- Test on actual mobile device, not just DevTools
- Reduce animation complexity or use `prefers-reduced-motion`

### "My site is too slow"

**Optimize:**

- Compress images (use ImageKit CDN or TinyPNG)
- Minify CSS and JavaScript (build tools or online minifiers)
- Remove unused CSS (PurgeCSS for Tailwind, manual audit for others)
- Load fonts efficiently (`font-display: swap`, subset fonts)
- Defer non-critical JavaScript

### "I'm stuck and don't know where to start"

**Strategies:**

- Review the sprint plan—follow it step by step
- Start with Sprint 1 even if it feels basic
- Look at the demo in the Bootstrap deployment lesson for structure inspiration
- Ask in class discussion—your peers likely have similar questions
- If using AI: Follow two-phase approach—request a plan first (document in `docs/plan1.md`, `plan2.md`, etc.), then implement incrementally

### "Can I use a CSS framework not covered in class?"

For this project, stick to the three defined stacks (Vanilla, Bootstrap, Tailwind). The goal is demonstrating mastery of course content, not exploring new frameworks. However, if you have a compelling reason and get professor approval, document your choice clearly in the README.

---

## On Perfectionism & Iteration

A word of encouragement (and reality): this template **will not be perfect**. That's not the goal. Professional development is about shipping work that's good enough, learning from it, and iterating.

You might find yourself at 3 AM tweaking a hover animation by 50 milliseconds. This is a sign to commit your code and go to sleep. The template can evolve after submission—in fact, it should. Real portfolios are living documents, updated as you grow.

Build something you're proud of, meet the requirements, and remember: a shipped portfolio template beats a perfect one that stays in draft forever. (And yes, we realize the irony of this advice coming at the end of a 2000+ line brief. Do as we say, not as we do.)

Your future self—and future clients—will thank you for building this foundation well. Now go forth and create something excellent.

---

## Conclusion

This final project synthesizes everything you've learned: semantic HTML, responsive CSS, modern animations, professional deployment, and thoughtful design. More importantly, you're building a tool you'll actually use—a template that demonstrates your capabilities and serves as a foundation for future work.

Approach this with intention. Document your decisions. Collaborate with peers. Ask questions. Use AI thoughtfully (with plans!). And most importantly, **ship it**. The web needs more heart-loved sites, and you're about to add one to the ecosystem.

Good luck, and happy building. 🚀

---

**Questions or need clarification?**
Review the linked lessons, consult the professor during sessions, collaborate with peers, and document your process. See you at the finish line with your `v1.0.0` release.
