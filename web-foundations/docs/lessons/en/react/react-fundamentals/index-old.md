---
layout: lesson
title: 'React Fundamentals: Building Blocks of Modern UI'
slug: react-fundamentals
category: react
tags: [react, components, jsx, props, events]
week: 4
phase: 2
sprint: 5
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/react-fundamentals/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->


> *"A component is a promise: given these props, I will render this UI."*

---

## 🎯 Sprint Goal

**By the end of this sprint**: Build the foundational component library for your semester project—reusable, typed, composable pieces that will serve as the atoms of your application.

---

## 📍 Position in Journey

| Sprint | Focus | Your App Grows |
|--------|-------|----------------|
| **→ 5. Fundamentals** | Components, JSX, Props | Component library skeleton |
| 6. Hooks | State & effects | Interactive components |
| 7. Architecture | Global state | Connected features |
| 8. Routing | Navigation | Multi-page structure |

---

## 🧭 Learning Objectives

By the end of this lesson, you will:

- [ ] Create function components with TypeScript
- [ ] Understand JSX as syntactic sugar for `React.createElement`
- [ ] Pass and type props correctly
- [ ] Handle events (click, change, submit)
- [ ] Render lists with proper keys
- [ ] Apply conditional rendering patterns

---

## 🏗️ What We'll Build This Sprint

### The Component Library

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx       ← Variants, sizes, states
│   │   ├── Input.tsx        ← Text, email, password
│   │   ├── Card.tsx         ← Container with slots
│   │   ├── Modal.tsx        ← Overlay pattern
│   │   └── Badge.tsx        ← Status indicators
│   └── layout/
│       ├── Container.tsx    ← Max-width wrapper
│       ├── Stack.tsx        ← Vertical spacing
│       └── Grid.tsx         ← Responsive columns
```

These components will be **reused throughout your semester project**.

---

## 🔧 Integration Points

| Data Source | How It Connects |
|-------------|-----------------|
| **Hardcoded** | Start with static props for rapid prototyping |
| **Laravel API** | Components will later receive data from API calls |
| **Hygraph CMS** | Content-driven components (blog cards, etc.) |

---

## 🎓 Methodology: Atelier Practice

### The Sprint Rhythm

```
┌─────────────────────────────────────────────────────────┐
│ DAY 1: Learn the Pattern                                │
│   • Mini-lecture: Component model explained             │
│   • Live coding: Build Button component together        │
│   • AI Practice: Use Copilot to scaffold variants       │
├─────────────────────────────────────────────────────────┤
│ DAY 2: Apply to Your Project                            │
│   • Team work: Build 3+ components for YOUR app         │
│   • Code review: Pair with another team                 │
│   • Commit: Push component library to GitHub            │
├─────────────────────────────────────────────────────────┤
│ DAY 3: Integrate & Reflect                              │
│   • Compose: Combine components into a page layout      │
│   • Document: Add JSDoc comments, Storybook optional    │
│   • Reflect: What patterns emerged? What was hard?      │
└─────────────────────────────────────────────────────────┘
```

### AI-Assisted Development Protocol

| Task | AI Role | Your Role |
|------|---------|-----------|
| Generate component skeleton | Copilot suggests | You validate types |
| Add accessibility attrs | Ask Claude/GPT | You verify with axe |
| Create variant styles | AI generates options | You choose with intent |
| Write prop documentation | AI drafts JSDoc | You ensure accuracy |

#### Concrete AI Prompts for This Sprint

```markdown
✅ GOOD PROMPT:
"Create a TypeScript Button component with variants (primary, secondary, danger),
sizes (sm, md, lg), and disabled state. Include proper ARIA attributes and
handle loading state with a spinner. Use Tailwind CSS for styling."

❌ BAD PROMPT:
"Make me a button component"

✅ VALIDATION PROMPT:
"Review this Button component for:
1. Accessibility issues (keyboard nav, ARIA, focus states)
2. TypeScript type safety (are all props properly typed?)
3. Performance concerns (unnecessary re-renders?)
4. Missing edge cases (what if onClick is undefined?)"

🔍 WHEN NOT TO USE AI:
- Understanding WHY a component re-renders (use React DevTools)
- Deciding component API design (this is YOUR architectural decision)
- Choosing between controlled vs uncontrolled patterns (requires domain knowledge)
```

---

## 💡 Production-Ready Code Examples

### Example 1: Button Component (Best Practices)

```typescript
// components/ui/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils'; // classnames utility

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  ghost: 'bg-transparent hover:bg-gray-100 focus:ring-gray-500',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center gap-2',
        'rounded-lg font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // Variant and size
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner className="h-4 w-4" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
}

// Spinner component
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
```

**Usage:**

```typescript
// In your page/component
import { Button } from '@/components/ui/Button';
import { PlusIcon } from 'lucide-react';

function MyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await api.createItem(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
        Create Item
      </Button>

      <Button variant="secondary" leftIcon={<PlusIcon />}>
        Add New
      </Button>

      <Button variant="danger" size="sm" disabled>
        Delete
      </Button>
    </div>
  );
}
```

### Example 2: Card Component with Slots Pattern

```typescript
// components/ui/Card.tsx
import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-white shadow-sm',
        'dark:border-gray-800 dark:bg-gray-950',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardTitle({ className, children, ...props }: CardProps) {
  return (
    <h3
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

function CardDescription({ className, children, ...props }: CardProps) {
  return (
    <p className={cn('text-sm text-gray-500 dark:text-gray-400', className)} {...props}>
      {children}
    </p>
  );
}

function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('flex items-center p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
```

**Usage:**

```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={product.image} alt={product.name} className="w-full rounded" />
        <p className="mt-4 text-gray-700">{product.description}</p>
        <p className="mt-2 text-2xl font-bold">${product.price}</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="primary" className="flex-1">
          Add to Cart
        </Button>
        <Button variant="ghost">
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}
```

---

## 🎯 Critical Questions: Atelier Methodology

### On Component Design

> 💭 **Question 1: The Abstraction Dilemma**
>
> You've built a `Button` component with 5 variants, 3 sizes, and multiple states.
> Your teammate says: "This is over-engineered. We only use 2 variants."
>
> **Reflect:**
> - When does abstraction become premature optimization?
> - How do you balance "design for the future" vs "YAGNI" (You Aren't Gonna Need It)?
> - What evidence would convince you to simplify or expand your component API?

> 💭 **Question 2: Composition vs Configuration**
>
> Compare these two approaches:
>
> ```typescript
> // Approach A: Configuration
> <Card variant="product" showImage showPrice showActions />
>
> // Approach B: Composition
> <Card>
>   <CardImage src={...} />
>   <CardPrice value={...} />
>   <CardActions>{...}</CardActions>
> </Card>
> ```
>
> **Reflect:**
> - Which is more flexible? Which is easier to use?
> - When would you choose one over the other?
> - How does this relate to the "pit of success" principle?

> 💭 **Question 3: Accessibility as Default**
>
> Your AI assistant generated a beautiful modal component, but it's missing:
> - Focus trap
> - ESC key to close
> - ARIA attributes
> - Screen reader announcements
>
> **Reflect:**
> - Why didn't the AI include these by default?
> - What does this reveal about AI training data?
> - How do you build a "checklist mindset" for accessibility?
> - Who is excluded when we skip accessibility?

### On AI-Assisted Development

> 💭 **Question 4: The Trust Boundary**
>
> You ask AI to generate a form validation component. It produces 200 lines of code.
> You don't fully understand lines 87-134 (regex patterns and edge cases).
>
> **Reflect:**
> - Do you ship it anyway? Why or why not?
> - Where is YOUR responsibility boundary when using AI?
> - How do you validate code you didn't write?
> - What happens when that code breaks in production at 3 AM?

> 💭 **Question 5: Pattern Recognition vs Understanding**
>
> After using AI to generate 10 components, you notice you can predict what it will suggest.
>
> **Reflect:**
> - Does this mean you've learned the pattern, or just the AI's pattern?
> - How do you distinguish between "knowing React" and "knowing what AI generates"?
> - What would happen if AI tools disappeared tomorrow?

### On Atelier Collaboration

> 💭 **Question 6: Code Review as Learning**
>
> During peer review, your teammate's `Input` component handles validation differently than yours.
> Neither is "wrong," but they're incompatible.
>
> **Reflect:**
> - How do you negotiate a shared pattern?
> - When should you standardize, and when should you allow diversity?
> - What role does the "atelier master" (professor) play in this decision?
> - How does this mirror real-world team dynamics?

> 💭 **Question 7: The Portfolio Paradox**
>
> Your component library is YOUR work, but it uses AI-generated code, open-source patterns,
> and ideas from teammates.
>
> **Reflect:**
> - What percentage of this is "yours"?
> - How do you present this in your portfolio ethically?
> - Where is the line between collaboration and plagiarism?
> - What makes code "original" in 2025?

---

## 📝 Sprint Deliverables

- [ ] **5+ UI components** typed with TypeScript
- [ ] **2+ layout components** for structure
- [ ] **1 composed page** using your components
- [ ] **README** documenting component API
- [ ] **Commit history** showing incremental progress
- [ ] **Reflection entry** addressing at least 3 critical questions above
- [ ] **Accessibility audit** using axe DevTools on your components
- [ ] **Peer review** of another team's component library (written feedback)

---

## 🔗 Lesson Navigation

| Previous | Current | Next |
|----------|---------|------|
| [AI Foundations](../ai-assisted-development-foundations/) | **React Fundamentals** | [Hooks Mastery](../react-hooks/) |

---

### 🛠️ The 2025 Frontier: Lessons from the Oraclulum
**Reflections on Vite 7, Tailwind 4, and the SSR Necessity**

*As learned by the "Digital Golem" while manifestating the Oraculum:*

1. **The Config-to-CSS Pivot (Tailwind 4)**:
   - Traditional `tailwind.config.js` is secondary. Configuration now lives in your CSS via the `@theme` directive.
   - Lesson: Theme variables are now native CSS variables (`--color-sacred-gold`). This reduces the "Magic JS" and brings us back to the browser's roots.

2. **The "Empty Temple" Syndrome (Vite/CSR)**:
   - A standard Vite client-side app (CSR) renders an empty `div`. This is an empty temple.
   - The Sutras (our content) only appear after the JavaScript "hydrates" the spirit.
   - **Why we need SSR**: For a "Revelation System", the truth must be **inline**. It must exist in the initial HTML for SEO, performance, and immediate perception. A revelation that waits for a JS bundle is a delayed revelation.

3. **Agentic Responsibility**:
   - When an AI agent (like the Golem) runs ahead, it is often trying to preserve a "Build-Time Truth".
   - Scaffolding the repo and executing Git commands isn't just about speed; it's about lattice-working the reality before the session magma cools.

---


> *"Components should be like LEGO bricks: simple alone, powerful together."*
