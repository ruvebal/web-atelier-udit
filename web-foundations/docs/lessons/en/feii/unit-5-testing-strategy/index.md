---
layout: lesson
title: 'Unit 5: Testing Strategy — Pyramid, Tools, and CI/CD Integration'
title_alt: 'Unidad 5: Estrategia de Testeo — Pirámide, Herramientas e Integración CI/CD'
slug: feii-unit-5-testing-strategy
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-5-testing-strategy/
description: 'Testing strategy fundamentals: testing pyramid, unit testing with Vitest, component testing with React Testing Library, E2E testing with Playwright, and CI/CD integration.'
tags:
  [
    feii,
    testing,
    testing-pyramid,
    vitest,
    react-testing-library,
    playwright,
    ci-cd,
    test-automation,
  ]
status: complete
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- pretier-ignore-end -->

---

> _"Tests are not about proving code works. They're about giving you confidence to change it."_

> **AI Assistance Disclosure:** This unit integrates AI-assisted development following the docs-first methodology. Plans, prompts, and implementation reports are documented throughout the process.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- **Design a testing strategy** — Balance unit, integration, and E2E tests following the testing pyramid
- **Implement unit tests** — Vitest for pure functions and React component logic
- **Implement component tests** — React Testing Library for user behavior, not implementation details
- **Implement E2E tests** — Playwright for user flows across multiple pages
- **Integrate tests in CI/CD** — Automated testing on every commit and PR

---

## 📖 The Testing Pyramid

The testing pyramid provides a balanced approach to testing:

```
┌─────────────────────────────────────────────────────────┐
│                 TESTING PYRAMID                           │
├─────────────────────────────────────────────────────────┤
│                                                          │
│                   E2E Tests (Slow)                      │
│                  ◢◢◢◢◢◢◢◢◢◢◢◢◢ (few)                    │
│                                                          │
│              Integration Tests (Medium)                │
│                 ◢◢◢◢◢◢◢◢◢◢◢ (more)                   │
│                                                          │
│                 Unit Tests (Fast)                        │
│                ◢◢◢◢◢◢◢◢◢◢◢◢◢◢◢◢◢◢ (many)             │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Key principle:** More unit tests, fewer E2E tests. Unit tests are fast and isolate failures; E2E tests are slow and brittle.

### Pyramid Rationale

- **Unit tests (70%)** — Test individual functions and components in isolation
- **Integration tests (20%)** — Test how modules work together
- **E2E tests (10%)** — Test critical user flows from end to end

This balance gives you fast feedback on most failures while still catching integration issues.

---

## 🔬 Unit Testing with Vitest

Vitest is a fast unit test framework with native TypeScript support:

### Setup

```bash
npm install -D vitest @vitest/ui @vitest/coverage-v8
```

```js
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

### Unit Test Example

```ts
// counter.test.ts
import { describe, it, expect } from 'vitest';
import { increment, decrement } from './counter';

describe('Counter functions', () => {
  it('should increment by 1', () => {
    expect(increment(5)).toBe(6);
  });

  it('should decrement by 1', () => {
    expect(decrement(5)).toBe(4);
  });

  it('should handle zero', () => {
    expect(decrement(0)).toBe(-1);
  });
});
```

### Running Tests

```bash
npm test                 # Run all tests
npm test -- --ui         # Run with UI
npm test -- --coverage  # Run with coverage report
```

---

## 🧩 Component Testing with React Testing Library

React Testing Library encourages testing user behavior, not implementation details:

### Setup

```bash
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### Component Test Example

```tsx
// Counter.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter component', () => {
  it('should render initial count', () => {
    render(<Counter initialCount={5} />);
    expect(screen.getByText('Count: 5')).toBeInTheDocument();
  });

  it('should increment when button clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={0} />);

    await user.click(screen.getByRole('button', { name: /increment/i }));

    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('should handle rapid clicks', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={0} />);

    const button = screen.getByRole('button', { name: /increment/i });
    await user.tripleClick(button);

    expect(screen.getByText('Count: 3')).toBeInTheDocument();
  });
});
```

**RTL Principles:**
- Test behavior, not implementation — "Can the user do X?" not "Does the component use useState?"
- Use semantic queries — `getByRole`, `getByText`, not `getByClassName`
- Avoid testing internal state — Focus on what the user sees and does

---

## 🎭 E2E Testing with Playwright

Playwright provides reliable cross-browser E2E testing:

### Setup

```bash
npm install -D @playwright/test
```

### E2E Test Example

```ts
// e2e/checkout.spec.ts
import { test, expect } from '@playwright/test';

test('complete checkout flow', async ({ page }) => {
  await page.goto('/products');

  // Add item to cart
  await page.click('text=iPhone 15 Pro');
  await page.click('text=Add to cart');

  // Navigate to cart
  await page.click('text=Cart (1)');

  // Checkout
  await page.click('text=Checkout');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="address"]', '123 Main St');
  await page.click('text=Place Order');

  // Verify success
  await expect(page.locator('text=Order confirmed')).toBeVisible();
});
```

### Running E2E Tests

```bash
npx playwright test              # Run all E2E tests
npx playwright test --ui        # Run with UI mode
npx playwright test --headed   # Run headed (no headless)
```

---

## 🔄 CI/CD Integration

Automate testing on every commit and PR:

### GitHub Actions Example

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
      - run: npm run test:e2e
```

### Test Strategy in CI

- **On push to main:** Run full test suite (unit + integration + E2E)
- **On PR:** Run unit + integration tests (faster feedback)
- **On schedule:** Run full test suite daily (catch regressions)

---

## 🎯 Practice Exercise

**Time:** 3 hours

1. **Set up Vitest** in an existing React project with basic configuration
2. **Write unit tests** for at least 3 utility functions
3. **Add React Testing Library** and write component tests for a React component
4. **Set up Playwright** and write an E2E test for a critical user flow
5. **Integrate tests in CI/CD** — Add a GitHub Actions workflow that runs tests on PR
6. **Measure test coverage** — Aim for 80%+ coverage on critical paths

**Deliverable:** Test suite with CI/CD integration + coverage report

---

## 📚 Recommended Reading

- **Testing Pyramid** — https://martinfowler.com/articles/practical-test-pyramid/
- **Vitest Documentation** — https://vitest.dev/
- **React Testing Library** — https://testing-library.com/react/
- **Playwright Documentation** — https://playwright.dev/

---

## ✅ Session Outcome

By the end of this unit, you should:

- Understand the testing pyramid and how to balance unit, integration, and E2E tests
- Be able to write unit tests with Vitest for pure functions and component logic
- Write component tests with React Testing Library that focus on user behavior
- Implement E2E tests with Playwright for critical user flows
- Integrate automated testing in CI/CD pipelines

This unit covers the **Testeo (herramientas, diseño de pruebas, automatización)** official CONTENIDOS requirement. The next unit will build on this foundation by teaching AI-assisted code review as a technique.

---

> _"Tests are documentation that runs. Treat them as such."_
