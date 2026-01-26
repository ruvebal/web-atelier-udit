---
layout: lesson
title: 'Testing: Building Confidence in Your Code'
slug: react-testing
category: react
tags: [react, testing, vitest, rtl, cypress]
week: 10
phase: 3
sprint: 11
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/react-testing/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->


> *"Tests are not about finding bugs. Tests are about building confidence to change."*

---

## 🎯 Sprint Goal

**By the end of this sprint**: Your app has a testing foundation—unit tests for logic, component tests for UI behavior, and at least one end-to-end test for a critical user flow.

---

## 📍 Position in Journey

| Sprint | Focus | Your App Grows |
|--------|-------|----------------|
| 9. Backend | Data fetching | Real data, real app |
| 10. Auth | Security | User sessions |
| **→ 11. Testing** | Quality | Reliable codebase |
| 12. Performance | Speed | Optimized experience |

---

## 🧭 Learning Objectives

By the end of this lesson, you will:

- [ ] Write unit tests for pure functions and hooks
- [ ] Test React components with React Testing Library
- [ ] Mock API calls in component tests
- [ ] Write at least one Cypress E2E test
- [ ] Understand the Testing Trophy (what to test most)
- [ ] Set up CI to run tests on every push

---

## 🏗️ The Testing Trophy

```
                    ┌───────┐
                    │  E2E  │  ← Few, critical paths
                    └───┬───┘
                   ┌────┴────┐
                   │Integration│  ← Most of your tests
                   └────┬─────┘
                 ┌──────┴──────┐
                 │    Unit     │  ← Pure functions, hooks
                 └──────┬──────┘
               ┌────────┴────────┐
               │  Static Types   │  ← TypeScript
               └─────────────────┘

Focus: Does the user's goal get accomplished?
Avoid: Testing implementation details
```

---

## 🔧 Testing Stack

| Type | Tool | Tests What |
|------|------|-----------|
| **Unit** | Vitest | Pure functions, utilities |
| **Component** | React Testing Library | User interactions with UI |
| **Integration** | RTL + MSW | Components with mocked APIs |
| **E2E** | Cypress | Full app flows in browser |
| **Static** | TypeScript | Types catch errors at compile |

---

## 🎓 Methodology: Atelier Practice

### The Sprint Rhythm

```
┌─────────────────────────────────────────────────────────┐
│ DAY 1: Unit & Component Tests                           │
│   • Set up Vitest and React Testing Library             │
│   • Write unit tests for utility functions              │
│   • Test a form component (render, type, submit)        │
├─────────────────────────────────────────────────────────┤
│ DAY 2: Integration & Mocking                            │
│   • Set up MSW (Mock Service Worker) for API mocking    │
│   • Test a data-fetching component end-to-end           │
│   • Test error and loading states                       │
├─────────────────────────────────────────────────────────┤
│ DAY 3: E2E & CI                                         │
│   • Write one Cypress test for login → dashboard flow   │
│   • Set up GitHub Actions to run tests on push          │
│   • Celebrate green checkmarks ✅                       │
└─────────────────────────────────────────────────────────┘
```

### What to Test (Priority Order)

| Priority | Test This | Example |
|----------|-----------|---------|
| 🔴 High | User can complete critical flow | Login, checkout, create post |
| 🟠 Medium | Component handles states | Loading, error, empty, success |
| 🟡 Lower | Edge cases | Very long text, special characters |
| ⚪ Skip | Implementation details | Internal state shape, CSS classes |

---

### AI-Assisted Development Protocol

| Task | AI Role | Your Role |
|------|---------|-----------|
| Generate test cases | Scaffold test structure | Add assertions that matter |
| Mock complex APIs | Create MSW handlers | Verify they match real API |
| Debug failing tests | Explain the error | Understand *why* it fails |
| Increase coverage | Suggest edge cases | Prioritize important paths |

---

## 📝 Sprint Deliverables

- [ ] **5+ unit tests** for utilities and pure functions
- [ ] **3+ component tests** using RTL
- [ ] **MSW setup** for mocking API in tests
- [ ] **1 Cypress E2E test** for critical flow
- [ ] **GitHub Actions** workflow running tests on push
- [ ] **Test coverage report** (aim for 60%+ on core code)
- [ ] **Reflection**: What did tests reveal about your code?

---

## 💡 Test Examples

### Unit Test (Vitest)

```typescript
// src/utils/formatPrice.test.ts
import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  it('formats whole numbers', () => {
    expect(formatPrice(1000)).toBe('$10.00');
  });

  it('handles zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });
});
```

### Component Test (RTL)

```typescript
// src/components/LoginForm.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

test('submits email and password', async () => {
  const handleSubmit = vi.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
  await userEvent.type(screen.getByLabelText(/password/i), 'password123');
  await userEvent.click(screen.getByRole('button', { name: /login/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123'
  });
});
```

---

## 🔗 Lesson Navigation

| Previous | Current | Next |
|----------|---------|------|
| [Authentication](../react-authentication/) | **Testing** | [Performance](../react-performance/) |

---

## 📚 Key Concepts Preview

### What “good testing” means (in this course)

- **Tests are a change-enabler**: the goal is confidence to refactor, not “100% coverage”.
- **Prefer integration tests** for user-visible behavior (forms, flows, navigation).
- **Unit test pure logic** (reducers, validators, formatters).
- **Avoid brittle tests** (testing implementation details, internal state, DOM structure).

### Minimal stack (recommended)

- **Unit / component**: Vitest + React Testing Library
- **Network mocking**: MSW (Mock Service Worker)
- **E2E smoke** (optional): Cypress (or Playwright if you already know it)

### Example: test behavior, not structure

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('submits the form with user input', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  render(<LoginForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/password/i), 'password123');
  await user.click(screen.getByRole('button', { name: /login/i }));

  expect(onSubmit).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
});
```

### Reflection (Atelier)

> 💭 _Which bug did your tests prevent—specifically? What changed in your code because tests existed?_

> 💭 _Which test became too hard to write? What does that reveal about your architecture?_

### Koan

> _"If your tests require lies, your design is already lying."_

---

> *"Write tests. Not too many. Mostly integration."* — Guillermo Rauch
