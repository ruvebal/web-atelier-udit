---
layout: lesson
title: 'Pseudo-Elements and State-Based Styling: Critical Approaches to Dynamic CSS'
slug: pseudo-elements-and-state-styling
date: 2025-10-30
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/pseudo-elements-and-state-styling/
description: 'Master pseudo-classes and pseudo-elements to create dynamic, accessible interfaces with critical thinking about performance, accessibility, and progressive enhancement'
tags: [css, pseudo-classes, pseudo-elements, accessibility, state-management, interactive-design]
status: complete
---

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> Interaction states are semantic feedback, not decoration.</p>
<p><strong>Field lens:</strong> **Practice anchor:** focus, hover, active, and reduced-motion states communicate status. **Frontier signal:** native CSS state selectors and preference media queries expand the state vocabulary.</p>
</aside>

> **Studio test:** Keyboard-test every state and provide a non-motion fallback.

{% include lesson-semantic-graphic.html %}

---

## For / Not for

**For:** Front-End I **Session 6** — pseudo-classes and pseudo-elements on your landing: focus, hover, decoration without extra DOM.

**Not for:** JavaScript state machines (React semester 2) or animation libraries (Session 11 GSAP).

**When you finish this session you will have:** accessible `:focus-visible` styles, at least one purposeful `::before`/`::after` pattern, and documented progressive-enhancement notes.

---

## Before you start

| Requirement | Required? |
| --- | --- |
| Sessions 3–5 CSS foundation on repo | Yes |
| Keyboard available for testing (Tab through page) | Yes |
| `prefers-reduced-motion` awareness | Recommended |

**Official time:** 2 h class + 1 h lab.

---

## Follow this path

| Step | Action | Section |
| --- | --- | --- |
| 1 | Audit nav + buttons with Tab only | Learning Objectives / map |
| 2 | Add `:focus-visible` rings (not `:focus` alone on mouse) | Pseudo-classes |
| 3 | Add one decorative `::after` or `::before` (not content-critical) | Pseudo-elements |
| 4 | Test `:hover` does not hide focus for keyboard users | Accessibility |
| 5 | Commit + note one selector you rejected for performance | Submit |

---

## Verify before you leave

- [ ] Every interactive element shows visible focus via keyboard
- [ ] No information exists **only** in a pseudo-element (screen readers must get real text)
- [ ] `:hover` styles have `:focus-visible` equivalent where needed
- [ ] `@media (prefers-reduced-motion: reduce)` considered for transitions
- [ ] Commit pushed

---

## Common failures

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Focus invisible | `outline: none` without replacement | Use `:focus-visible` + custom ring |
| Keyboard user can't see hover styles | Hover-only feedback | Mirror critical feedback on `:focus-visible` |
| Decorative icon missing for SR | Content only in `::before` | Put text in HTML; pseudo-element decorates only |
| Layout shift on hover | Padding/border added on `:hover` | Reserve space or use `transform` |
| Specificity wars | Over-long selector chains | Shorten; avoid `#id .nav ul li a:hover` depth |

---

## Submit (Session 6 evidence)

- Repo URL + commit describing state/pseudo work
- Short note: one pseudo pattern you chose and one you rejected (accessibility or performance reason)

---

# Pseudo-Elements and State-Based Styling: Critical Approaches to Dynamic CSS

## 🎯 Learning Objectives

By the end of this lesson, you will:

- Quickly distinguish between pseudo-classes and pseudo-elements
- Improve interaction states without sacrificing accessibility
- Use pseudo-elements for decoration without hiding meaningful content
- Judge when a selector can impact runtime performance
- Document styling decisions to sustain progressive enhancement

## Five Key Takeaways

- **Pseudo-classes** react to state (`:hover`, `:focus-visible`, `:nth-child()`)
- **Pseudo-elements** provide visual scaffolding (`::before`, `::after`, `::selection`)
- **Accessibility** demands visible focus and synchronized ARIA attributes
- **Performance** benefits from short selector chains and shallow nesting
- **Progressive enhancement** leans on `@supports` and resilient `:focus` fallbacks for legacy browsers

## Pseudo-Selector Map

### Pseudo-classes by intent

| Intent                | Key selectors                                          | Practical use                                  |
| --------------------- | ------------------------------------------------------ | ---------------------------------------------- |
| Interaction           | `:hover`, `:focus-visible`, `:active`, `:focus-within` | Immediate, accessible feedback                 |
| Structure             | `:first-child`, `:nth-of-type(odd)`, `:last-child`     | Visual rhythm without extra classes            |
| Forms                 | `:required`, `:valid`, `:placeholder-shown`, `:has()`  | Inline validation and stateful layouts         |
| JavaScript-free state | `:target`, `:checked`, `:focus-within`                 | Accordions, tabs, popovers controlled with CSS |

```css
/* Quick references while auditing interaction states */
/* 
  Ensure visible focus indication for accessible navigation.
  The :focus-visible pseudo-class matches when the element 
  should indicate focus (e.g. via keyboard, not mouse).
  This highlights links in navigation with a 2px outline 
  using the --focus-ring CSS variable for color, and 
  separates the outline from the element for clarity.
*/
.nav a:focus-visible {
	outline: 2px solid var(--focus-ring); /* Prominent focus for keyboard users */
	outline-offset: 2px; /* Space between link and outline */
}

input:required:invalid {
	border-color: #f87171;
	box-shadow: 0 0 0 1px rgba(248, 113, 113, 0.35);
}
```

### Pseudo-elements by purpose

| Purpose           | Selectors                                       | Rapid use case                                 |
| ----------------- | ----------------------------------------------- | ---------------------------------------------- |
| Visual decoration | `::before`, `::after`, `::marker`               | Inline icons, badges, separators               |
| Typography        | `::first-letter`, `::first-line`, `::selection` | Drop caps, highlighted leads, custom selection |
| Experience        | `::placeholder`, `::backdrop`, `::cue`          | Helper text, overlays, media cues              |

```css
/* Lightweight decoration without touching HTML */
.badge::before {
	content: '●';
	color: currentColor;
	margin-inline-end: 0.25rem;
}
```

### Demo: Typography with pseudo-elements (CSS only)

<iframe src="./demo/typography.html" title="Typography enhancements using pseudo-elements" style="width:100%;min-height:360px;border:1px solid #eee;border-radius:6px;overflow:hidden"></iframe>

## JavaScript-Free Patterns

Pseudo-classes can cover many interactions when you combine semantic HTML with native controls:

- `:focus-within` keeps menus, accordions, or tooltips open for keyboard and touch users.
- `:checked` and `details[open]` toggle panels or disclosure widgets without scripting.
- `:target` powers deep-linked modals or tabs via the URL hash.

```html
<input type="checkbox" id="info-toggle" class="accordion__toggle" />
<label for="info-toggle" class="accordion__label">Reveal content</label>
<div class="accordion__panel">Accessible accordion content without JavaScript.</div>
```

```css
.accordion__toggle {
	position: absolute;
	inline-size: 1px;
	block-size: 1px;
	opacity: 0;
}

.accordion__panel {
	max-block-size: 0;
	overflow: hidden;
	transition: max-block-size 0.3s ease;
}

.accordion__toggle:checked + .accordion__label + .accordion__panel {
	max-block-size: 20rem;
}
```

### Demo: CSS-only accessible tooltip

<iframe src="./demo/tooltip.html" title="CSS-only tooltip using pseudo-elements" style="width:100%;min-height:220px;border:1px solid #eee;border-radius:6px;overflow:hidden"></iframe>

## Express Workshop: Accessible Dropdown

1. **Lean HTML structure**

```html
<nav class="dropdown">
	<button class="dropdown__trigger" aria-haspopup="true" aria-expanded="false">Menu</button>
	<ul class="dropdown__content" hidden>
		<li><a href="#home">Home</a></li>
		<li><a href="#about">About</a></li>
		<li><a href="#contact">Contact</a></li>
	</ul>
</nav>
```

2. **Key interaction states**

```css
.dropdown {
	position: relative;
	--focus-ring: 2px solid #2563eb;
}

.dropdown__trigger {
	padding: 0.75rem 1rem;
	min-height: 44px;
}

.dropdown__trigger:focus {
	outline: var(--focus-ring);
	outline-offset: 2px;
}

.dropdown__trigger:focus:not(:focus-visible) {
	outline: none;
}
```

3. **Pseudo-elements + controlled reveal**

`CSS`

```css
.dropdown__trigger::before {
	content: '▾';
	margin-right: 0.5rem;
	transition: transform 0.2s ease;
}

.dropdown[data-expanded='true'] .dropdown__trigger::before {
	transform: rotate(180deg);
}

.dropdown__content {
	position: absolute;
	inset-inline-start: 0;
	right: 0;
	margin-top: 0.5rem;
	background: white;
	border: 1px solid #e2e8f0;
	box-shadow: 0 8px 16px rgba(15, 23, 42, 0.1);
	list-style: none;
	padding: 0;
}

.dropdown__content[hidden] {
	display: none;
}

.dropdown__content li:nth-child(odd) {
	background: #f7fafc;
}

.dropdown__content li:not(:last-child) {
	border-bottom: 1px solid #e2e8f0;
}
```

4. **Dropdown behavioral script**

The following JavaScript keeps `aria-expanded`, the `hidden` attribute, and the `data-expanded` state synchronized—so styles and pseudo-elements stay accurate. Adapt this logic to the framework or UI library you prefer.

```js
// Accessible dropdown pattern: syncs ARIA, hidden, and data attributes for style and state.
const dropdown = document.querySelector('.dropdown');
const trigger = dropdown.querySelector('.dropdown__trigger');
const content = dropdown.querySelector('.dropdown__content');

// Initialize visual state
dropdown.dataset.expanded = trigger.getAttribute('aria-expanded');

trigger.addEventListener('click', () => {
	const expanded = trigger.getAttribute('aria-expanded') === 'true';
	const newState = String(!expanded);
	trigger.setAttribute('aria-expanded', newState);
	content.hidden = expanded;
	dropdown.dataset.expanded = newState;
});
```

> The script toggles `hidden`, keeps `aria-expanded` accurate, and updates `data-expanded` for pseudo-element styling. Feel free to adapt it to your framework or Web Components setup.

#### Live demo: Accessible dropdown

<iframe src="./demo/dropdown.html" title="Accessible dropdown with pseudo-classes and pseudo-elements" style="width:100%;min-height:360px;border:1px solid #eee;border-radius:6px;overflow:hidden"></iframe>

## Critical Checklist

- Visible focus ensured with `:focus-visible` and a sensible `:focus` fallback
- `Tab`, `Enter`, and `Esc` enable complete keyboard navigation
- `hidden` reflects the same state as `aria-expanded`
- Prefer straightforward selectors (`.dropdown__item`) before reaching for `:nth-child()`

## Guided Exercises

### Exercise 1 · Rapid Audit

- Audit an existing dropdown with the checklist
- Capture two accessibility improvements and log them as an issue or PR
- Prioritize fixes that immediately help keyboard-only users

### Exercise 2 · CSS-Only Dropdown

- Use `:focus-within` as your primary trigger
- Cap transitions at 300 ms and honor `prefers-reduced-motion`
- Test on mobile, dark mode, and high-contrast themes before shipping

### Demo: Combined patterns (CSS + pseudo-elements)

<iframe src="./demo/exercises.html" title="Navigation and cards using pseudo-classes and pseudo-elements" style="width:100%;min-height:420px;border:1px solid #eee;border-radius:6px;overflow:hidden"></iframe>

## Best Practices

- Keep critical content in HTML; reserve pseudo-elements for supporting visuals
- Pair `:hover` with `:focus` to cover pointer and keyboard input
- Gate progressive enhancements behind `@supports selector(:focus-visible)`
- Measure performance in DevTools and run axe DevTools for accessibility regressions

## Essential Resources

- [Pseudo-classes (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)
- [Pseudo-elements (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)
- [WebAIM Keyboard Accessibility Checklist](https://webaim.org/techniques/keyboard/)

## Conclusion

Pseudo-classes and pseudo-elements extend CSS so interfaces can react without abandoning semantic HTML. Combine them with accessible patterns and performance measurements to ship components that scale gracefully.

Now take these techniques to your **GitHub repositories**, experiment with styling variants, and share your results by shipping an accessible dropdown, capturing two design decisions in the README, and posting a screenshot or GIF of the final behavior.

{% comment %}
outcome-graphic-selection:
  source-section: "Conclusion"
  visual-grammar: "semantic-state-feedback — interaction states transforming a stable element while preserving meaning and feedback"
{% endcomment %}
{% include lesson-outcome-graphic.html %}
