---
layout: lesson
title: 'Unit 5: Testing Strategy — Designing a Suite That Earns Its Cost'
title_alt: 'Unidad 5: Estrategia de Testeo — Diseñar una Suite Que Justifique Su Coste'
slug: feii-unit-5-testing-strategy
date: 2026-08-09
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-5-testing-strategy/
description: 'Testing as an engineering decision, not a tool tutorial: what not to test, flakiness and determinism, Cypress→Playwright migration, CI time budgets, and contract testing against a real backend.'
tags:
  [feii, testing, testing-strategy, vitest, playwright, flakiness, ci-cd, contract-testing, test-design]
status: complete
---

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> Testing strategy buys confidence under a budget.</p>
<p><strong>Field lens:</strong> **Practice anchor:** behavioural tests, deterministic fixtures, failure modes, and reliability. **Frontier signal:** contract testing, Playwright migration, and flake triage reshape the suite.</p>
</aside>
>
> **Studio test:** Attach every test to risk, confidence, and maintenance cost.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"Code without quality checks is like a ship without a compass: it moves, but who knows where."_
> — Tao of Development, `qa-009`
{: .tao-development-quote }

> **AI Assistance Disclosure:** This unit integrates AI-assisted development following the docs-first methodology. Plans, prompts, and implementation reports are documented throughout. Unit 6 makes the AI itself a reviewer of the suite you build here.

---

## What this unit is **not**

You already know how to write a test. That happened in Front-End I.

In [Testing: Building Confidence in Your Code]({{ '/lessons/en/react/react-testing/' | relative_url }}) you learned the **Testing Trophy**, wrote unit tests with Vitest, component tests with React Testing Library, mocked APIs with MSW, wrote a Cypress E2E test, and ran the whole thing in GitHub Actions. That was **tool literacy** — the answer to _"can I write a test?"_

This unit answers a harder question, and it is the question that separates a second-year developer from a third-year one:

> **Which tests are worth writing, and how do you prove the suite is worth what it costs?**

A test suite is not free. It costs authoring time, CI minutes, and — most expensively — **trust**, which it loses every time it fails for a reason that isn't a bug. This unit is about designing a suite that survives contact with a real project.

> _"Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."_
> — Tao of Development, `cc-007`
{: .tao-development-quote }

---

## Code conventions in this unit

Same vocabulary as the Front-End I React lessons — check the label before you paste:

- **CodeSandbox-ready** — complete file, copy-paste, runs once the sandbox scaffold is in place.
- **Excerpt** — partial pattern, illustrative. Does **not** run as-is.
- **Template** — copy and replace `[BRACKETED]` values before use.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- [ ] Justify the **Testing Trophy** (inherited from FE I) over the Testing Pyramid for front-end work, and say when the Pyramid is still right
- [ ] Decide **what not to test** using an explicit cost/confidence model
- [ ] Diagnose and fix **flaky tests** — the failure mode that actually kills suites in production teams
- [ ] Migrate a Cypress suite to **Playwright** and defend the migration on engineering grounds, not fashion
- [ ] Keep CI inside a **wall-clock time budget** using sharding and selective runs
- [ ] Write a **contract test** against the backend so front and back break loudly instead of silently
- [ ] Fold **accessibility assertions** into the normal test suite rather than a separate audit

---

## 📍 Position in the journey

| Course | Unit | Owns |
| --- | --- | --- |
| FE I — Sprint 12 | [Testing]({{ '/lessons/en/react/react-testing/' | relative_url }}) | Trophy shape, Vitest, RTL, MSW, Cypress, first CI workflow |
| **FE II — Unit 5** | **This unit** | **Strategy: what to test, flakiness, CI economics, contracts** |
| FE II — Unit 6 | [AI-Assisted Code Review]({{ '/lessons/en/feii/unit-6-ai-code-review/' | relative_url }}) | AI as a reviewer of the suite you build here |
| FE II — Unit 7 | [Performance Engineering]({{ '/lessons/en/feii/unit-7-performance/' | relative_url }}) | Performance budgets — the same "budget" idea, applied to speed |

**Entrega 1 is due at the end of Unit 6.** This unit produces most of it.

---

## 1 — Trophy, not Pyramid (and why FE I was right)

> _"Not every problem is a bug. Sometimes the problem is expectation."_
> — Tao of Development, `arch-020`
{: .tao-development-quote }

FE I taught you the **Testing Trophy** (Kent C. Dodds). You may meet the older **Testing Pyramid** (Mike Cohn) in interviews and in backend teams. They disagree about where the bulk of your tests belong, and the disagreement is not academic:

| | Pyramid | Trophy |
| --- | --- | --- |
| **Bulk of tests** | Unit | **Integration** |
| **Assumes** | Units are where the logic lives | Logic lives in how units are *wired together* |
| **Fits** | Backends, algorithms, pure domain logic | **UIs, glue code, API consumers** |
| **Failure it prevents** | Wrong calculation | Wrong wiring, wrong state, wrong render |

Front-end code is mostly **glue**: this component reads that context, calls that service, renders that state. A unit test of a component that mocks its context, its router, and its API has tested nothing but your mocks.

> **Say this out loud in the defence (Unit 12).** "We use the Trophy because our bugs are integration bugs. Our unit tests cover pure functions — date formatting, sorting, reducers — where the logic really is local."

**The Pyramid is still right** when you're testing something with real algorithmic depth: a pricing engine, a scheduling constraint solver, a geospatial projection. If your capstone has one of those, unit-test it heavily and say why.

---

## 2 — The decision that matters: what **not** to test

> _"A dependency added is a dependency maintained. Choose wisely."_
> — Tao of Development, `qa-006`
{: .tao-development-quote }

Every test is a dependency on your own code's shape. Test the wrong thing and every refactor breaks your suite while the app still works — the fastest way to teach a team to distrust its own tests.

### The cost/confidence grid

Before writing a test, place it:

```
                 HIGH CONFIDENCE GAIN
                          │
     Write it first  ●    │    ● Write it, accept the cost
     (cheap + vital)      │      (expensive + vital)
                          │
  LOW COST ───────────────┼─────────────── HIGH COST
                          │
     Write if bored  ○    │    ○ Do NOT write
     (cheap + trivial)    │      (expensive + trivial)
                          │
                 LOW CONFIDENCE GAIN
```

### Concrete rules for this course

**Do test:**

- The **user's path through a feature** — can they actually complete the task?
- **State transitions that are hard to reason about** — loading → error → retry → success
- **Pure functions** with real branching logic
- **The contract with the backend** (§6) — the boundary you don't control
- **Regressions** — every bug you fix gets a test, so it can never come back twice

> _"The debugger who debugs wisely, debugs only once; for each bug fixed in understanding will not return in code."_
> — Tao of Development, `dbg-005`
{: .tao-development-quote }

**Do not test:**

- **Implementation details** — internal state names, whether a `useMemo` exists, how many times a function was called (unless the count *is* the requirement, e.g. "don't double-charge")
- **The framework** — React's rendering, Astro's islands hydration, the router's matching. Those have their own test suites and their teams are better at it than you.
- **Third-party libraries** you didn't write
- **Static markup with no logic** — a snapshot of a component with no branches is a change-detector, not a test
- **Styling**, unless it carries meaning (a disabled state, an error colour with a contrast requirement — and even then assert the *semantic* attribute, not the hex)

**Excerpt** — the same intent tested badly and well. The first breaks on refactor; the second breaks only when the user is actually harmed.

```jsx
// ❌ Implementation detail — couples the test to a variable name.
expect(wrapper.state('isLoading')).toBe(true);

// ✅ User-visible behaviour — survives any refactor that keeps the promise.
expect(await screen.findByRole('status')).toHaveTextContent(/loading/i);
```

---

## 3 — Flakiness: the failure mode that actually kills suites

> _"Every bug is a question your code could not answer."_
> — Tao of Development, `dbg-004`
{: .tao-development-quote }

A **flaky** test passes and fails on the same code. It is worse than no test, because it trains the team to re-run CI until it goes green — at which point a real failure is invisible.

This is the single most valuable thing in this unit. Most students have never seen a suite die this way; every professional has.

### The four causes, and their fixes

| Cause | Symptom | Fix |
| --- | --- | --- |
| **Time** | Passes locally, fails in CI (slower machine) | Never `waitForTimeout`. Await a *condition*, not a duration |
| **Order** | Passes alone, fails in the suite | No shared mutable state between tests; reset stores/DB per test |
| **Network** | Fails when an API is slow or rate-limited | Mock at the network boundary (MSW); reserve real calls for contract tests |
| **Animation/focus** | Fails on a click that "should" work | Disable animations in test config; assert the element is actually interactable |

**Excerpt** — the single most common flake in student projects, and its fix.

```js
// ❌ Flaky: hopes 1000ms is enough. On a loaded CI runner it isn't.
await page.click('#load');
await page.waitForTimeout(1000);
expect(await page.textContent('#total')).toBe('42');

// ✅ Deterministic: waits for the condition itself, with a generous ceiling.
await page.click('#load');
await expect(page.getByTestId('total')).toHaveText('42'); // auto-retries
```

**CodeSandbox-ready** — Create `src/test/setup.js`. Kills the animation and time-based flake classes at the root.

```js
// src/test/setup.js
// Imported once via vitest.config.js `setupFiles`. Everything here runs before every test file.

import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// 1. Unmount React trees between tests — kills the "order" class of flakes.
afterEach(() => {
	cleanup();
});

// 2. Disable CSS animations/transitions so clicks never land mid-transition.
const style = document.createElement('style');
style.innerHTML = `*, *::before, *::after {
  animation-duration: 0s !important;
  transition-duration: 0s !important;
}`;
document.head.appendChild(style);

// 3. Fail loudly on unhandled promise rejections instead of silently passing.
process.on('unhandledRejection', (reason) => {
	throw reason;
});
```

> **Teaching moment.** Run your suite 20 times in a row (`npx vitest run --repeat 20`). Anything that fails once is flaky *now*, not "sometimes". Fix it before it becomes someone else's Friday night.

---

## 4 — Cypress → Playwright: migrate for reasons, not fashion

> _"Extract when the boundary is clear. Inline when the boundary was premature. Know the difference by the friction of change."_
> — Tao of Development, `arch-010`
{: .tao-development-quote }

FE I used **Cypress**. This unit moves to **Playwright**. You must be able to defend that — "the new one is newer" is not an engineering argument.

**The actual reasons:**

| | Cypress | Playwright |
| --- | --- | --- |
| **Browsers** | Chromium, Firefox, WebKit (added later) | Chromium, Firefox, **WebKit** — first-class, same API |
| **Execution** | Runs *inside* the browser event loop | Runs **out-of-process** via CDP — can control multiple tabs/origins |
| **Parallelism** | Paid dashboard for orchestration | **Free, built-in** sharding (§5 — this is the one that matters for us) |
| **Auto-wait** | Yes | Yes, plus **web-first assertions** that retry the assertion itself |
| **Multi-origin** | Historically painful | Native — matters for OAuth redirects |

**For this course the deciding factor is free parallel sharding**, because Unit 5's CI budget (§5) is a graded constraint and Cypress's free tier can't shard.

> **Honest counterpoint, and say it in the defence:** if your team already has a large, healthy Cypress suite, *migrating is usually the wrong call*. The migration cost is real and the benefit is incremental. We migrate here because the suite is small and the learning transfer is the point.

### Versions used in this unit

Pinned as of **August 2026** — check for newer before you start, and record what you actually used in your README:

| Package | Version | Note |
| --- | --- | --- |
| `vitest` | `^4.1` | Requires **Node ≥ 20** and Vite ≥ 6 |
| `@vitest/coverage-v8` | `^4.1` | Must match the `vitest` major exactly |
| `jsdom` | `^27` | **Vitest 4 no longer auto-installs this** — declare it explicitly |
| `@testing-library/react` | `^16.3` | React 19 compatible |
| `@testing-library/jest-dom` | `^6` | Import the `/vitest` entry point (see `setup.js` above) |
| `@playwright/test` | `^1.60` | Runs on Chrome for Testing builds |

**Template** — install line. Replace nothing; re-verify versions first.

```bash
npm install -D vitest@^4.1 @vitest/coverage-v8@^4.1 jsdom@^27 \
  @testing-library/react@^16.3 @testing-library/jest-dom@^6 \
  @testing-library/user-event@^14 @playwright/test@^1.60
npx playwright install --with-deps chromium
```

> ⚠️ **Vitest 4 migration trap.** If you copy a `vitest.config` from a pre-2026 tutorial it will likely fail: v4 requires you to install `jsdom`/`happy-dom` yourself, and the old `workspace` option is now `projects`. This is exactly the "volatile layer" the course keeps warning you about — the *concept* (a test runner needs a DOM implementation) is durable; the install line is not.

**CodeSandbox-ready** — Create `vitest.config.js` in the project root.

```js
// vitest.config.js
// Vitest 4.x. `environment: 'jsdom'` requires the jsdom package to be an explicit devDependency.

import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/test/setup.js'],
		// E2E lives in /e2e and is run by Playwright, not Vitest. Keep them apart.
		exclude: ['**/node_modules/**', '**/e2e/**'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html'],
			// Coverage of files never imported by a test is misleading — include them all.
			all: true,
			include: ['src/**/*.{js,jsx}'],
			exclude: ['src/test/**', 'src/**/*.test.{js,jsx}'],
		},
	},
});
```

**CodeSandbox-ready** — Create `vitest.contract.config.js` for the separate
real-service contract suite. Keeping this configuration separate prevents
nightly network checks from entering the fast unit/component suite.

```js
// vitest.contract.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'node',
		include: ['src/services/**/__tests__/contract.test.{js,jsx}'],
		setupFiles: [],
	},
});
```

---

## 5 — CI economics: the wall-clock budget

> _"The wise instructor automates what repeats. The foolish instructor repeats what should be automated."_
> — Tao of Development, `qa-001`
{: .tao-development-quote }

A suite nobody waits for is a suite nobody runs. **The budget for this course: pull-request feedback in under 5 minutes.** That is a design constraint on your tests, exactly like a performance budget (Unit 7) is a design constraint on your bundle.

Three levers, in order of value:

1. **Split fast from slow.** Unit + component tests on every push. E2E only where it pays.
2. **Shard the slow part.** Playwright splits one suite across N parallel machines for free.
3. **Fail fast.** If linting or type-checking fails, don't spend 4 minutes on E2E.

**CodeSandbox-ready** — Create `.github/workflows/test.yml`.

{% raw %}

```yaml
# .github/workflows/test.yml
# Budget: PR feedback < 5 min wall-clock.
# Strategy: cheap gate first, then unit tests, then E2E sharded 3 ways in parallel.

name: Test

on:
  push:
    branches: [main]
  pull_request:

jobs:
  # ── Gate: seconds, not minutes. Nothing else runs until this passes. ──
  gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22' # Node 20 is Vitest's floor; 22 is current LTS.
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  unit:
    needs: gate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npx vitest run --coverage

  # ── E2E: one job definition, three machines, ~1/3 the wall-clock. ──
  e2e:
    needs: gate
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        shard: [1, 2, 3]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test --shard=${{ matrix.shard }}/3
      - uses: actions/upload-artifact@v4
        if: failure() # Only pay for artifacts when something actually broke.
        with:
          name: playwright-report-${{ matrix.shard }}
          path: playwright-report/
          retention-days: 7
```

{% endraw %}

> **Measure it, don't assume it.** Open the Actions tab and read the real wall-clock time. If you're over budget, the fix is usually "too many E2E tests", not "a faster runner". Record the before/after in your Entrega — that measurement *is* part of the deliverable.

---

## 6 — Contract testing: the boundary you don't control

> _"One source of truth. One place to change. One mind at peace."_
> — Tao of Development, `arch-013`
{: .tao-development-quote }

Mocks are a lie you agree to tell yourself. MSW (FE I) makes your component tests fast and deterministic — and completely unable to notice when the backend renames a field.

The gap: **your mocks say `{ user_name }`, production ships `{ userName }`, every test passes, the app is broken.**

A **contract test** is a small, separate suite that hits the *real* API and asserts only its **shape** — not its data. It runs on a schedule (nightly), not on every PR, because it depends on a service you don't control.

**CodeSandbox-ready** — Create `src/services/__tests__/contract.test.js`.

```js
// src/services/__tests__/contract.test.js
// Runs against the REAL backend. Asserts SHAPE, never specific values.
// Values change constantly; shape changing is a breaking change someone forgot to announce.
//
// Run nightly / on demand, NOT on every PR:
//   npx vitest run --config vitest.contract.config.js

import { describe, expect, it } from 'vitest';

const API = process.env.CONTRACT_API_URL;
const DEVICE_ID = 'lab-01';

describe('backend contract', () => {
	it('GET /v1/devices/lab-01 returns the fields the panel depends on', async () => {
		expect(API, 'CONTRACT_API_URL must name a running contract service').toBeTruthy();

		const res = await fetch(`${API}/v1/devices/${DEVICE_ID}`);
		expect(res.ok).toBe(true);

		const body = await res.json();

		// Assert the CONTRACT: field presence and type. Not the value.
		expect(body).toMatchObject({
			deviceId: DEVICE_ID,
			online: expect.any(Boolean),
			readings: {
				temperatureC: expect.any(Number),
			},
		});

		// Guard the exact failure that mocks cannot catch: a silently renamed field.
		expect(body.readings.temperatureC).toBeDefined();
		expect(body.readings.temperature_c).toBeUndefined();
	});
});
```

Run it against the local Unit 10 service with `CONTRACT_API_URL=http://localhost:8000 npx vitest run --config vitest.contract.config.js`. In CI, point `CONTRACT_API_URL` at the deployed contract environment; no third-party demo API belongs in this test.

> **Coordination note (and a real deliverable).** Unit 10 publishes the initial versioned laboratory contract. The contract test above is the artefact that keeps any later Back-End II implementation honest: compatible changes keep `v1` green; breaking changes require a documented `v2` proposal, a frontend migration, and an updated test. Agreeing on the shape *before* either side builds is the whole point.

---

## 7 — Accessibility belongs in the suite, not in an audit

> _"Accessibility is not a feature. It is the foundation upon which all features rest."_
> — Tao of Development, `a11y-001`
{: .tao-development-quote }

An accessibility audit you run once before submission is a checklist. An accessibility **assertion** that runs on every PR is a standard. FE I taught WCAG in practice; FE II makes it automatic.

Automated checks catch only a **subset** of accessibility issues: they can find missing labels and some contrast failures, but cannot tell you whether your focus order makes sense. Use them as a floor, never as proof.

**CodeSandbox-ready** — Create `e2e/a11y.spec.js`. Requires `npm i -D @axe-core/playwright`.

```js
// e2e/a11y.spec.js
// Automated axe scan on critical pages. A floor, not a ceiling:
// keyboard and screen-reader passes stay manual.

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const CRITICAL_PAGES = ['/', '/dashboard'];

for (const path of CRITICAL_PAGES) {
	test(`${path} has no detectable WCAG A/AA violations`, async ({ page }) => {
		await page.goto(path);

		const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();

		// Print readable failures instead of a bare count.
		expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
	});
}
```

---

## 🎯 Practice Exercise — builds Entrega 1

**Lab time: 3 h** (of the official 30 h Prácticas de Laboratorio)

Work on your own capstone project. Each step produces evidence for the Entrega.

1. **Audit before you add.** Run your existing FE I suite. Record: how many tests, wall-clock time, and how many test *implementation details*. Write the number down — you'll compare at the end.
2. **Delete something.** Find at least one test that tests the framework, a snapshot with no branches, or an implementation detail. Delete it and justify the deletion in one sentence. _(Yes, deleting tests is graded. `cc-007`.)_
3. **Hunt a flake.** Run `npx vitest run --repeat 20`. If nothing flakes, deliberately introduce one (`waitForTimeout`), watch it fail under load, then fix it with a condition-based wait.
4. **Shard the CI.** Implement the workflow in §5. Record wall-clock time before and after.
5. **Write one contract test** (§6) against whatever API your project consumes.
6. **Add the axe scan** (§7) to your two most important pages. Fix what it finds.

**Deliverable:** a `docs/testing-strategy.md` in your repo containing:

- Your Trophy/Pyramid choice **with the reason for your project**
- The test you deleted, and why
- The flake you found, its cause (time/order/network/animation), and the fix
- CI wall-clock before → after
- What your contract test would catch that your mocks cannot

> _"Practice in the dojo, perform in the arena."_
> — Tao of Development, `wis-013`
{: .tao-development-quote }

---

## B3 · Individual exercises — decontextualised · 2 h

These are separate from the shared-repository lab. Submit your own reasoning;
use no AI for Exercise 1 and declare any AI assistance used for Exercises 2–3.

1. **No-AI diagnostic.** Classify each proposed test as Trophy-oriented,
   Pyramid-oriented, or not worth writing: a currency converter, a login form
   that retries after an error, a snapshot of a static heading, and a checkout
   flow. Give one sentence of cost/confidence reasoning for each.
2. A test passes alone but fails in the full suite. Name the most likely flake
   class, the first observation you would make, and a structural fix.
3. A backend changes a field from temperatureC to temperature_c. Explain why an
   MSW-backed component test can remain green and which contract assertion
   should fail.

Professor expected-answer sketches are in the companion exercise sheet.

### Companion materials

- [Session deck outline](./deck-outline.md)
- [Individual exercise sheet](./exercises.md)

---

## 📚 Recommended Reading

- Kent C. Dodds — [The Testing Trophy and Testing Classifications](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications) (the shape FE I taught you)
- Martin Fowler — [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid/) (the counter-position; read it to argue with it)
- [Vitest 4 migration guide](https://vitest.dev/guide/migration.html) — the volatile layer, documented
- [Playwright: sharding](https://playwright.dev/docs/test-sharding) and [test parallelism](https://playwright.dev/docs/test-parallel)
- [Deque axe-core rule descriptions](https://dequeuniversity.com/rules/axe/) — platform notes for what each automated rule can and cannot report

---

## ✅ Session Outcome

You should now be able to:

- Defend a testing shape for **your** project rather than reciting one
- Name what you chose **not** to test, and why that was the right call
- Diagnose a flaky test by cause and fix it structurally
- Keep CI inside a stated time budget, with evidence
- Explain why a mock-only suite cannot catch a backend rename

This unit covers the official **Testeo (herramientas, diseño de pruebas, automatización)** CONTENIDOS — specifically the _diseño de pruebas_ and _automatización_ halves, since _herramientas_ was covered in FE I.

Next: [Unit 6 — AI-Assisted Code Review]({{ '/lessons/en/feii/unit-6-ai-code-review/' | relative_url }}), where the suite you just built becomes something an AI reviews with you — and where Entrega 1 is due.

---

> _"The wise engineer makes danger optional."_
> — Tao of Development, `wis-012`
{: .tao-development-quote }

{% comment %}
outcome-graphic-selection:
  source-section: "✅ Session Outcome"
  visual-grammar: "confidence-under-budget — testing effort distributed across product risks while staying inside a confidence and time budget"
{% endcomment %}
{% include lesson-outcome-graphic.html %}
