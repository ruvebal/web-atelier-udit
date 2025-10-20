---
layout: lesson
title: 'Tailwind CSS: Components & Design System — Building Reusable Patterns'
title_en: 'Tailwind CSS: Components & Design System — Building Reusable Patterns'
slug: tailwind-components-design-system
date: 2025-09-10
updated: 2025-10-07
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/tailwind/components-design-system/
description: 'Complete guide to creating reusable components and design systems with Tailwind CSS, including tokens, patterns, and pedagogical approaches.'
tags: [tailwindcss, components, design-system, tokens, pedagogy]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Tailwind CSS: Components & Design System — Building Reusable Patterns

> **AI Assistance Disclosure:** This lesson draws from classroom experience since September 2024, with AI iterations following research–practice–research cycles.

## 🎭 Critical Coding Approach

This lesson follows the **atelier methodology** (exploration → reflection → conceptualization → production → exhibition). We build not to automate, but to **articulate** — giving form to thought through rhythm, reflection, and resistance.

- **Exploration:** Designing and composing reusable component patterns.
- **Reflection:** Understanding design systems as cultural artifacts.
- **Conceptualization:** Connecting component reuse to design theory and ethics.
- **Production:** Building maintainable, scalable component libraries.
- **Exhibition:** Demonstrating cohesive design systems in action.

## Prerequisites

<div class="prerequisites">
  <h3>📚 Before Starting</h3>
  <ul>
    <li><strong>Completed S1 & S2:</strong> Vite + Tailwind setup and SPA routing foundation</li>
    <li><strong>Utility composition:</strong> Experience combining Tailwind classes for layouts</li>
    <li><strong>Responsive design:</strong> Understanding of mobile-first and breakpoint variants</li>
    <li><strong>Git workflow:</strong> Committing incremental changes with clear messages</li>
  </ul>
</div>

## 🚀 Design Systems: Beyond Individual Components

**Design systems** are more than component libraries — they encode organizational values, accessibility standards, and user experience patterns. In Tailwind, we express design systems through:

- **Design tokens:** Consistent colors, spacing, and typography scales
- **Component patterns:** Reusable combinations of utilities
- **Semantic naming:** Intent-revealing class compositions
- **Progressive enhancement:** Fallbacks and accessibility-first approaches

Our approach creates **PWA-ready components** that work across devices and assistive technologies.

## S3 — Components & Design System (Tokens, Patterns, Reuse)

This session transforms utility combinations into reusable, maintainable component systems that encode design decisions and accessibility requirements.

### 🔗 Building on S2 Routing

In S2, you created a modular routing system with separate view files. Now we'll enhance those views with a proper design system. You should already have:

- `src/views/components.js` from Exercise 2.2
- The ability to create new routes for different component showcases
- A foundation for building your portfolio of design work

**If you haven't completed S2 exercises yet**, create the `src/views/components.js` file now (see S2 Exercise 2.2).

### Step-by-Step Implementation

**💡 Important:** All components you create in this session will be implemented and tested in the views you already created in S2. Specifically, you'll work primarily in `src/views/components.js` (created in S2 Exercise 2.2).

1. **Define design tokens in Tailwind config:**

   ```javascript
   // tailwind.config.js
   /** @type {import('tailwindcss').Config} */
   export default {
   	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   	theme: {
   		extend: {
   			colors: {
   				primary: {
   					50: '#eff6ff',
   					500: '#3b82f6',
   					900: '#1e3a8a',
   				},
   				surface: {
   					light: '#f8fafc',
   					dark: '#1e293b',
   				},
   			},
   			spacing: {
   				18: '4.5rem',
   				88: '22rem',
   			},
   			borderRadius: {
   				'4xl': '2rem',
   			},
   		},
   	},
   	plugins: [],
   };
   ```

2. **Create reusable Button component:**

   **Where:** Update `src/views/components.js` (created in S2)

   Add these buttons to your components view to test them:

   ```javascript
   // src/views/components.js
   export default {
   	template: `
       <section class="py-16 bg-gray-50 min-h-screen">
         <div class="container mx-auto px-4">
           <h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">Component System</h1>
           
           <!-- Button System -->
           <div class="bg-white rounded-lg shadow-md p-6 mb-8">
             <h2 class="text-2xl font-bold text-gray-900 mb-4">Buttons</h2>
             <div class="flex flex-wrap gap-4">
               <button class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-transparent bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                 Primary Button
               </button>
               
               <button class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                 Secondary Button
               </button>
               
               <button class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
                 Ghost Button
               </button>
             </div>
           </div>
           
           <!-- More components will be added in the next steps -->
           
           <a href="#/" class="inline-block text-primary-500 hover:text-primary-600 font-medium">← Back to Home</a>
         </div>
       </section>
     `,
   };
   ```

   **How to test:**

   1. Save the file
   2. Navigate to `#/components` in your browser
   3. Hover over each button
   4. Press Tab to verify focus states
   5. Inspect with DevTools to see applied classes

3. **Build Card component pattern:**

   ```html
   <!-- Card pattern with consistent spacing and typography -->
   <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
   	<div class="aspect-w-16 aspect-h-9 bg-gray-200">
   		<img src="https://picsum.photos/400/225?random=1" alt="Project image" class="w-full h-48 object-cover" />
   	</div>
   	<div class="p-6">
   		<h3 class="text-lg font-semibold text-gray-900 mb-2">Project Title</h3>
   		<p class="text-gray-600 text-sm mb-4 line-clamp-3">
   			Project description that demonstrates the card pattern with consistent spacing and typography hierarchy.
   		</p>
   		<div class="flex flex-wrap gap-2">
   			<span
   				class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
   				React
   			</span>
   			<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
   				API
   			</span>
   		</div>
   	</div>
   </article>
   ```

4. **Create responsive Projects grid:**

   ```html
   <!-- Projects section using grid utilities -->
   <section class="py-16 bg-gray-50">
   	<div class="container mx-auto px-4">
   		<header class="text-center mb-12">
   			<h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
   			<p class="text-lg text-gray-600 max-w-2xl mx-auto">
   				A showcase of work demonstrating responsive design and modern web technologies.
   			</p>
   		</header>

   		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
   			<!-- Card components repeated -->
   		</div>
   	</div>
   </section>
   ```

5. **Implement Section component pattern:**

   ```html
   <!-- Section wrapper with consistent padding -->
   <section class="py-16">
   	<div class="container mx-auto px-4">
   		<div class="max-w-4xl mx-auto">
   			<header class="text-center mb-12">
   				<h2 class="text-3xl font-bold text-gray-900 mb-4">Section Title</h2>
   				<p class="text-lg text-gray-600">Consistent section pattern with proper spacing and typography hierarchy.</p>
   			</header>

   			<div class="prose prose-lg max-w-none">
   				<!-- Content with consistent styling -->
   			</div>
   		</div>
   	</div>
   </section>
   ```

6. **Verify router loads updated views:**

   **Make sure `src/views/index.js` includes all views:**

   ```javascript
   // src/views/index.js
   import home from './home.js';
   import about from './about.js'; // Updated in step 5
   import projects from './projects.js'; // Updated in step 4
   import contact from './contact.js';
   import typography from './typography.js';
   import components from './components.js'; // Updated in steps 2-3
   import notFound from './404.js';

   export const views = {
   	'/': home,
   	'/about': about,
   	'/projects': projects,
   	'/contact': contact,
   	'/typography': typography,
   	'/components': components,
   	404: notFound,
   };
   ```

7. **Test component reusability across all views:**

   **Testing checklist:**

   - [ ] `#/components` - All component patterns display correctly
   - [ ] `#/projects` - Responsive grid works on mobile/tablet/desktop
   - [ ] `#/about` - Consistent spacing and typography hierarchy
   - [ ] Hover on cards in both views shows shadow transition
   - [ ] Tab through buttons shows clear focus states
   - [ ] DevTools confirms Tailwind classes apply correctly
   - [ ] No errors in browser console
   - [ ] Color contrast meets WCAG AA (verify with DevTools)

8. **Commit your component system:**
   ```bash
   git add src/views/components.js src/views/projects.js src/views/about.js src/views/index.js
   git commit -m "feat: S3 - Design tokens + reusable components implemented in views
   ```

- Updated components.js with button system and cards
- Updated projects.js with responsive project grid
- Updated about.js with consistent section patterns
- All components using design tokens"

  ```

  ```

## 🎓 Architectural Progression: From Monolithic to Modular

### Why Did We Start with Everything in One View?

In the previous steps, we put all components in `src/views/components.js`. This is **pedagogically intentional**:

**Advantages of the initial approach (everything in one view):**

- ✅ **Simpler to understand** at the beginning
- ✅ **Fewer files** = less cognitive complexity
- ✅ **Seeing everything together** helps understand patterns
- ✅ **Easy to test** in a single route

**But for advanced students and real projects...**

### 🚀 Advanced Level: Components in Separate Files

For scalable projects and large teams, each component should be in its own file.

**Advantages of the modular approach:**

- ✅ **Real reusability** - import only what you need
- ✅ **Isolated testing** - test each component independently
- ✅ **Collaboration** - different devs on different components
- ✅ **Maintainability** - localized changes
- ✅ **Tree-shaking** - bundlers eliminate unused code
- ✅ **Professional** - this is how it's done in the industry

### 📁 Refactoring: Modular Component Structure

Let's refactor to achieve this structure:

```
src/
├── components/
│   ├── Button.js           # Reusable Button component
│   ├── Card.js             # Reusable Card component
│   ├── Section.js          # Reusable Section wrapper
│   └── SkillCard.js        # Specific SkillCard component
├── views/
│   ├── components.js       # Imports and displays components
│   ├── projects.js         # Uses Card component
│   ├── about.js            # Uses Section and SkillCard
│   └── index.js
├── router.js
└── main.js
```

## 🎯 Practice Exercises: Modular Refactoring (Advanced Level)

### Exercise 3.3: Extract Components to Separate Files

#### Step 1: Create the reusable Button component

```javascript
// src/components/Button.js
/**
 * Button Component
 * Reusable button with variants: primary, secondary, ghost
 * @param {string} variant - Button style variant
 * @param {string} size - Button size (sm, md, lg)
 * @param {string} text - Button text content
 * @param {Function} onClick - Optional click handler
 * @returns {string} HTML template string
 */
export function Button({ variant = 'primary', size = 'md', text = 'Button', onClick = null } = {}) {
	const baseClasses =
		'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors';

	const variants = {
		primary: 'border border-transparent bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
		secondary: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary-500',
		ghost: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
	};

	const sizes = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base',
	};

	return `
    <button 
      class="${baseClasses} ${variants[variant]} ${sizes[size]}"
      ${onClick ? `onclick="${onClick}"` : ''}>
      ${text}
    </button>
  `;
}

// Export with default values for easy use
export const PrimaryButton = (text, size = 'md') => Button({ variant: 'primary', text, size });
export const SecondaryButton = (text, size = 'md') => Button({ variant: 'secondary', text, size });
export const GhostButton = (text, size = 'md') => Button({ variant: 'ghost', text, size });
```

#### Step 2: Create the reusable Card component

```javascript
// src/components/Card.js
/**
 * Card Component
 * Reusable card with optional image, title, description, and tags
 * @param {string} image - Image URL or gradient
 * @param {string} title - Card title
 * @param {string} description - Card description
 * @param {Array<string>} tags - Array of tag names
 * @param {string} tagColors - Tailwind color classes for tags
 * @returns {string} HTML template string
 */
export function Card({ image = null, title = 'Card Title', description = '', tags = [], tagColors = {} } = {}) {
	const imageSrc = image?.startsWith('http')
		? `<img src="${image}" alt="${title}" class="w-full h-48 object-cover" />`
		: `<div class="flex items-center justify-center ${image || 'bg-gray-200'} text-white text-2xl font-bold h-48">
         ${title}
       </div>`;

	const tagsHtml =
		tags.length > 0
			? `
      <div class="flex flex-wrap gap-2 mt-4">
        ${tags
									.map(
										(tag, i) => `
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
											tagColors[tag] || 'bg-gray-100 text-gray-800'
										}">
            ${tag}
          </span>
        `
									)
									.join('')}
      </div>
    `
			: '';

	return `
    <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div class="aspect-w-16 aspect-h-9">
        ${imageSrc}
      </div>
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">${title}</h3>
        <p class="text-gray-600 text-sm">${description}</p>
        ${tagsHtml}
      </div>
    </article>
  `;
}
```

#### Step 3: Create the Section wrapper component

```javascript
// src/components/Section.js
/**
 * Section Component
 * Consistent section wrapper with header and content
 * @param {string} title - Section title
 * @param {string} subtitle - Section subtitle (optional)
 * @param {string} content - Section HTML content
 * @param {string} bgColor - Background color class
 * @returns {string} HTML template string
 */
export function Section({ title, subtitle = '', content = '', bgColor = 'bg-white' } = {}) {
	return `
    <div class="${bgColor} rounded-lg shadow-md p-8 mb-8">
      ${
							title
								? `
        <header class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">${title}</h2>
          ${subtitle ? `<p class="text-gray-600">${subtitle}</p>` : ''}
        </header>
      `
								: ''
						}
      <div class="content">
        ${content}
      </div>
    </div>
  `;
}
```

#### Step 4: Refactor the components view to use imports

```javascript
// src/views/components.js
import { Button, PrimaryButton, SecondaryButton, GhostButton } from '../components/Button.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';

export default {
	template: `
    <section class="py-16 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">Modular Component System</h1>
        
        ${Section({
									title: 'Button System',
									content: `
            <div class="flex flex-wrap gap-4">
              ${PrimaryButton('Primary Button')}
              ${SecondaryButton('Secondary Button')}
              ${GhostButton('Ghost Button')}
            </div>
            
            <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">Sizes</h3>
            <div class="flex flex-wrap items-center gap-4">
              ${Button({ text: 'Small', size: 'sm' })}
              ${Button({ text: 'Medium', size: 'md' })}
              ${Button({ text: 'Large', size: 'lg' })}
            </div>
          `,
								})}
        
        ${Section({
									title: 'Card System',
									content: `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              ${Card({
															image: 'https://picsum.photos/400/225?random=1',
															title: 'Project 1',
															description: 'Card with real image from API.',
															tags: ['React', 'API'],
															tagColors: {
																React: 'bg-primary-100 text-primary-800',
																API: 'bg-green-100 text-green-800',
															},
														})}
              
              ${Card({
															image: 'bg-gradient-to-r from-blue-400 to-purple-500',
															title: 'Project 2',
															description: 'Card with CSS gradient.',
															tags: ['Vue', 'Tailwind'],
															tagColors: {
																Vue: 'bg-green-100 text-green-800',
																Tailwind: 'bg-blue-100 text-blue-800',
															},
														})}
              
              ${Card({
															title: 'Project 3',
															description: 'Card without image.',
															tags: ['TypeScript'],
															tagColors: {
																TypeScript: 'bg-blue-100 text-blue-800',
															},
														})}
            </div>
          `,
								})}
        
        <a href="#/" class="inline-block text-primary-500 hover:text-primary-600 font-medium">← Back to Home</a>
      </div>
    </section>
  `,
};
```

#### Step 5: Use components in other views

```javascript
// src/views/projects.js
import { Card } from '../components/Card.js';

export default {
	template: `
    <section class="py-16 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4">
        <header class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Card components reused from src/components/Card.js
          </p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${Card({
											image: 'bg-gradient-to-r from-blue-400 to-purple-500',
											title: 'Personal Portfolio',
											description: 'Responsive website built with Tailwind CSS.',
											tags: ['Tailwind', 'JavaScript'],
											tagColors: {
												Tailwind: 'bg-primary-100 text-primary-800',
												JavaScript: 'bg-yellow-100 text-yellow-800',
											},
										})}
          
          ${Card({
											image: 'bg-gradient-to-r from-green-400 to-teal-500',
											title: 'Analytics Dashboard',
											description: 'Data analysis interface with reusable components.',
											tags: ['React', 'API'],
											tagColors: {
												React: 'bg-blue-100 text-blue-800',
												API: 'bg-purple-100 text-purple-800',
											},
										})}
          
          ${Card({
											image: 'bg-gradient-to-r from-pink-400 to-red-500',
											title: 'E-commerce',
											description: 'Online store with shopping cart.',
											tags: ['Vue', 'Stripe'],
											tagColors: {
												Vue: 'bg-green-100 text-green-800',
												Stripe: 'bg-indigo-100 text-indigo-800',
											},
										})}
        </div>
        
        <a href="#/" class="inline-block mt-8 text-primary-500 hover:text-primary-600 font-medium">← Back to Home</a>
      </div>
    </section>
  `,
};
```

### 🎨 Advantages of This Modular Approach

**1. Real Reusability:**

```javascript
// Use the same component in multiple views
import { Card } from '../components/Card.js';
// projects.js, components.js, blog.js all use Card
```

**2. Isolated Testing:**

```javascript
// Test only the Button component
import { Button } from '../components/Button.js';
// Unit test without view dependencies
```

**3. Localized Maintenance:**

```javascript
// Changing Button.js updates ALL views that use it
// One change, multiple benefits
```

**4. Clear Documentation:**

```javascript
// JSDoc in each component explains usage
/**
 * @param {string} variant - Button style variant
 * @param {string} size - Button size (sm, md, lg)
 */
```

### 🔄 Approach Comparison

| Aspect                 | Monolithic (S3 basic) | Modular (S3 advanced)  |
| ---------------------- | --------------------- | ---------------------- |
| **Initial complexity** | ⭐ Low                | ⭐⭐⭐ High            |
| **Reusability**        | ❌ Copy-paste         | ✅ Import              |
| **Maintainability**    | ⭐⭐ Medium           | ⭐⭐⭐⭐⭐ Excellent   |
| **Testing**            | ⭐ Difficult          | ⭐⭐⭐⭐⭐ Easy        |
| **Collaboration**      | ⭐⭐ Conflicts        | ⭐⭐⭐⭐⭐ Parallel    |
| **Scalability**        | ⭐⭐ Limited          | ⭐⭐⭐⭐⭐ Unlimited   |
| **Bundle size**        | ⭐⭐⭐ All included   | ⭐⭐⭐⭐⭐ Tree-shaken |

### 💡 When to Use Each Approach

**Use monolithic approach (everything in one view) when:**

- 🎓 You're learning and want simplicity
- 🚀 Rapid prototyping
- 👤 Small personal project
- 📝 Components are unique to that view

**Use modular approach (separate files) when:**

- 👥 Working in a team
- 📈 The project will grow
- 🔄 You need to reuse components
- ✅ You want robust testing
- 💼 It's a professional project

### 🏆 Challenge for Advanced Students

**Refactor your entire project:**

1. ✅ Create `src/components/` folder
2. ✅ Extract Button, Card, Section to separate files
3. ✅ Add JSDoc to each component
4. ✅ Update all views to import components
5. ✅ Create `src/components/index.js` for barrel exports:

```javascript
// src/components/index.js
export { Button, PrimaryButton, SecondaryButton, GhostButton } from './Button.js';
export { Card } from './Card.js';
export { Section } from './Section.js';

// Now import everything from one place:
// import { Button, Card, Section } from '../components/index.js';
```

6. ✅ Commit with descriptive message:

```bash
git add src/components/ src/views/
git commit -m "refactor: Extract components to separate files for reusability

- Create src/components/ directory structure
- Extract Button, Card, Section components
- Add JSDoc documentation to all components
- Update views to import from components
- Add barrel export in components/index.js

BREAKING CHANGE: Views now depend on component imports"
```

## 🎯 Practice Exercises: Enhancing Your Component Routes

Now that you understand design tokens and component patterns, enhance the routes you created in S2.

### Exercise 3.1: Upgrade Your Components Playground

Update your `src/views/components.js` to use design tokens:

```javascript
// src/views/components.js
export default {
	template: `
    <section class="py-16 bg-surface-light min-h-screen">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">Design System Showcase</h1>
        
        <!-- Button System with Design Tokens -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Button System</h2>
          <div class="flex flex-wrap gap-4">
            <button class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
              Primary Action
            </button>
            <button class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
              Secondary Action
            </button>
            <button class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
              Ghost Button
            </button>
          </div>
          
          <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">Button Sizes</h3>
          <div class="flex flex-wrap items-center gap-4">
            <button class="px-3 py-1.5 text-sm font-medium rounded-md bg-primary-500 text-white hover:bg-primary-600">
              Small
            </button>
            <button class="px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-white hover:bg-primary-600">
              Medium
            </button>
            <button class="px-6 py-3 text-base font-medium rounded-md bg-primary-500 text-white hover:bg-primary-600">
              Large
            </button>
          </div>
        </div>

        <!-- Card Pattern Library -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Card Patterns</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Image Card -->
            <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="aspect-w-16 aspect-h-9 bg-gray-200">
                <img src="https://picsum.photos/400/225?random=1" alt="Project preview" class="w-full h-48 object-cover" />
              </div>
              <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Image Card</h3>
                <p class="text-gray-600 text-sm mb-4">Card with image header and text content below.</p>
                <div class="flex gap-2">
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">Design</span>
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Featured</span>
                </div>
              </div>
            </article>

            <!-- Icon Card -->
            <article class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center">
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Icon Card</h3>
              <p class="text-gray-600 text-sm">Card with centered icon and content.</p>
            </article>

            <!-- Stats Card -->
            <article class="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-md p-6 text-white hover:shadow-lg transition-shadow">
              <h3 class="text-sm font-medium text-primary-100 mb-1">Total Projects</h3>
              <p class="text-3xl font-bold mb-1">42</p>
              <p class="text-sm text-primary-100">↑ 12% from last month</p>
            </article>
          </div>
        </div>

        <!-- Form Components -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Form Components</h2>
          <div class="max-w-md space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" id="name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="Enter your name" />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="you@example.com" />
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea id="message" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="Your message..."></textarea>
            </div>
          </div>
        </div>
        
        <a href="#/" class="inline-block text-primary-500 hover:text-primary-600 font-medium">← Back to Home</a>
      </div>
    </section>
  `,
};
```

### Exercise 3.2: Create a Design Tokens Reference Route

Create a new route to document your design system:

```javascript
// src/views/design-tokens.js
export default {
	template: `
    <section class="py-16 min-h-screen">
      <div class="container mx-auto px-4 max-w-6xl">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">Design Tokens Reference</h1>
        
        <!-- Color Palette -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Color System</h2>
          
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Primary Colors</h3>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div class="space-y-2">
              <div class="h-20 bg-primary-50 rounded border border-gray-200"></div>
              <p class="text-sm font-mono text-gray-600">primary-50</p>
            </div>
            <div class="space-y-2">
              <div class="h-20 bg-primary-500 rounded"></div>
              <p class="text-sm font-mono text-gray-600">primary-500</p>
            </div>
            <div class="space-y-2">
              <div class="h-20 bg-primary-900 rounded"></div>
              <p class="text-sm font-mono text-gray-600">primary-900</p>
            </div>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 mb-3">Surface Colors</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <div class="h-20 bg-surface-light rounded border border-gray-200"></div>
              <p class="text-sm font-mono text-gray-600">surface-light</p>
            </div>
            <div class="space-y-2">
              <div class="h-20 bg-surface-dark rounded"></div>
              <p class="text-sm font-mono text-gray-600 text-white">surface-dark</p>
            </div>
          </div>
        </div>

        <!-- Typography Scale -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Typography Scale</h2>
          <div class="space-y-4">
            <div class="border-b border-gray-200 pb-4">
              <p class="text-5xl font-bold text-gray-900 mb-2">Display</p>
              <p class="text-sm text-gray-600 font-mono">text-5xl font-bold</p>
            </div>
            <div class="border-b border-gray-200 pb-4">
              <p class="text-4xl font-bold text-gray-900 mb-2">Heading 1</p>
              <p class="text-sm text-gray-600 font-mono">text-4xl font-bold</p>
            </div>
            <div class="border-b border-gray-200 pb-4">
              <p class="text-3xl font-bold text-gray-900 mb-2">Heading 2</p>
              <p class="text-sm text-gray-600 font-mono">text-3xl font-bold</p>
            </div>
            <div class="border-b border-gray-200 pb-4">
              <p class="text-base text-gray-900 mb-2">Body Text - The quick brown fox jumps over the lazy dog</p>
              <p class="text-sm text-gray-600 font-mono">text-base</p>
            </div>
          </div>
        </div>

        <!-- Spacing System -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Spacing System</h2>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-20 text-sm font-mono text-gray-600">spacing-4</div>
              <div class="h-4 bg-primary-500 rounded" style="width: 1rem;"></div>
              <span class="text-sm text-gray-600">1rem / 16px</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-20 text-sm font-mono text-gray-600">spacing-8</div>
              <div class="h-4 bg-primary-500 rounded" style="width: 2rem;"></div>
              <span class="text-sm text-gray-600">2rem / 32px</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-20 text-sm font-mono text-gray-600">spacing-18</div>
              <div class="h-4 bg-primary-500 rounded" style="width: 4.5rem;"></div>
              <span class="text-sm text-gray-600">4.5rem / 72px (custom)</span>
            </div>
          </div>
        </div>
        
        <a href="#/components" class="inline-block text-primary-500 hover:text-primary-600 font-medium">View Components →</a>
      </div>
    </section>
  `,
};
```

Register the new route:

```javascript
// src/views/index.js
import home from './home.js';
import about from './about.js';
import projects from './projects.js';
import contact from './contact.js';
import typography from './typography.js';
import components from './components.js';
import designTokens from './design-tokens.js'; // Add this
import notFound from './404.js';

export const views = {
	'/': home,
	'/about': about,
	'/projects': projects,
	'/contact': contact,
	'/typography': typography,
	'/components': components,
	'/design-tokens': designTokens, // Add this
	404: notFound,
};
```

Add to navigation:

```html
<!-- index.html -->
<li><a href="#/components" class="hover:text-blue-400 transition-colors">Components</a></li>
<li><a href="#/design-tokens" class="hover:text-blue-400 transition-colors">Design Tokens</a></li>
```

**Commit your enhanced component system:**

```bash
git add .
git commit -m "feat: S3 - Enhanced components with design tokens and documentation"
```

### 🎨 Design System Best Practices

- **Document everything:** Your design tokens route becomes living documentation
- **Consistency first:** Every new component should use tokens, not arbitrary values
- **Accessibility checks:** Test color contrast, focus states, and keyboard navigation
- **Mobile-first:** Build responsive components from the smallest screen up

## 🎓 Pedagogical Explanations

### Component Composition vs. Custom CSS

**Utility composition** treats components as combinations of atomic styles, while **custom CSS** creates named abstractions. Each approach has trade-offs:

**Utility composition advantages:**

- **Explicit styling:** Every style decision is visible in markup
- **Smaller bundles:** Unused styles are purged automatically
- **Easier maintenance:** No cascade conflicts or specificity wars
- **Responsive by default:** Breakpoint variants built-in

**Utility composition challenges:**

- **HTML verbosity:** Many classes can clutter markup
- **Learning curve:** Requires understanding utility relationships
- **Consistency enforcement:** Teams need conventions for common patterns

**Design tokens** bridge this gap by providing semantic names for design decisions while maintaining utility composition benefits.

### Accessibility in Component Design

Components must be **accessible by default**:

- **Semantic HTML:** Use appropriate landmarks and roles
- **ARIA attributes:** Provide context for dynamic content
- **Keyboard navigation:** Ensure all interactive elements are focusable
- **Color contrast:** Meet WCAG AA standards (4.5:1 for normal text)
- **Reduced motion:** Respect user preferences

## Atelier Critical Questions

Following our **atelier methodology**, reflect on these questions:

### Exploration

- Which utilities best express your design tokens and component patterns?
- How did composing components change your relationship to styling decisions?

### Reflection

- Where did component reuse reduce complexity? Where did it obscure intent?
- Which component patterns improved maintainability versus individual utility usage?

### Conceptualization

- How do design tokens relate to brand identity and accessibility requirements?
- In what ways does component composition embody "design as code"?

### Production

- Are your components documented with clear usage patterns and variants?
- How might this component approach scale for larger teams or projects?

### Exhibition

- How will you demo component variants and responsive behavior in a live presentation?
- What alternative component approaches (CSS-in-JS, component libraries) could achieve similar reusability?

## Critical Prompts

### Reflection Prompts

- How does Tailwind change your approach to design system architecture?
- What is the relationship between component semantics and visual aesthetics?
- How can critical coding shape our understanding of digital design culture?
- How does your component system represent your identity as a designer-developer?

### Design Ethics Prompts

- Whose needs are prioritized in your component accessibility choices?
- How do your design tokens encode cultural or organizational values?
- What happens when component reuse conflicts with unique user needs?

### Technical Philosophy Prompts

- Is utility composition more "honest" than abstracted component systems?
- How does component composition relate to programming paradigms like functional composition?
- What does it mean to "design with constraints" in a utility-first system?

## 🏗️ Minimal Repo Scaffold

Here's a complete starting point for your component system:

```
tailwind-components/
├── index.html
├── src/
│   ├── main.js
│   ├── style.css
│   └── components/
│       ├── button.js
│       ├── card.js
│       └── section.js
└── tailwind.config.js
```

**src/components/button.js:**

```javascript
// Button component factory
export function createButton({ variant = 'primary', size = 'md', children, ...props }) {
	const baseClasses =
		'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

	const variants = {
		primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
		secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500',
		ghost: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
	};

	const sizes = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base',
	};

	return {
		tag: 'button',
		className: `${baseClasses} ${variants[variant]} ${sizes[size]}`,
		children,
		...props,
	};
}
```

**src/components/card.js:**

```javascript
// Card component pattern
export function createCard({ title, description, image, tags = [], href }) {
	const cardClasses = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow';

	return {
		tag: 'article',
		className: cardClasses,
		children: [
			{
				tag: 'div',
				className: 'aspect-w-16 aspect-h-9 bg-gray-200',
				children: image
					? [
							{
								tag: 'img',
								src: image,
								alt: `${title} preview`,
								className: 'w-full h-48 object-cover',
							},
					  ]
					: [],
			},
			{
				tag: 'div',
				className: 'p-6',
				children: [
					{ tag: 'h3', className: 'text-lg font-semibold text-gray-900 mb-2', children: title },
					{ tag: 'p', className: 'text-gray-600 text-sm mb-4 line-clamp-3', children: description },
					tags.length > 0
						? {
								tag: 'div',
								className: 'flex flex-wrap gap-2',
								children: tags.map((tag) => ({
									tag: 'span',
									className:
										'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800',
									children: tag,
								})),
						  }
						: null,
				],
			},
		],
	};
}
```

## References

- [Tailwind CSS - Design tokens guide](https://tailwindcss.com/docs/adding-custom-styles#using-css-variables)
- [Design systems handbook](https://www.designsystems.com/)
- [WCAG component guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/)

---

> **Next:** [S4 - State & Interactivity →]({{ '/lessons/en/tailwind/state-interactivity/' | relative_url }})
