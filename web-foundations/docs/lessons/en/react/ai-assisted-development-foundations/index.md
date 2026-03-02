---
layout: lesson
title: 'AI Theory & Architecture for React: Contracts, Decomposition, Verification'
slug: ai-assisted-development-foundations
category: react
tags: [react, ai, architecture, contracts, verification, prompting, security]
week: 4
phase: 1
sprint: 4
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/ai-assisted-development-foundations/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> _"AI accelerates output. Architecture protects outcomes."_

---

## 🎯 Sprint Goal

**By the end of this sprint**: you can use AI as a collaborator **without outsourcing understanding**, by working with **contracts**, **decomposition**, and **verification loops** that reduce risk (bugs, security issues, accessibility regressions).

---

## 🔗 Canonical Reading (Required)

This lesson is React-focused, but it builds on the canonical methodology:

- [`/methodology/en/ai-assisted-development-foundations/`](/methodology/en/ai-assisted-development-foundations/)

---

## 🧱 Architecture Mapping: From Classical Patterns to React

| Classical idea | React translation | Why it matters with AI |
| --- | --- | --- |
| Contracts | Prop shapes, API schemas, JSDoc or types | AI is “creative”; contracts limit ambiguity |
| Decomposition | Components + hooks + modules | Smaller units are easier to verify |
| Invariants | “Always true” rules | Prevents silent regressions |
| Observability | Logs, error boundaries, devtools | AI code fails in surprising ways |

### Minimal “Contract Stack” for Student Projects

- **Type contracts**: Clear prop shapes and API response shapes (JSDoc or type checkers as needed)
- **Runtime contracts**: defensive checks at boundaries (inputs, API errors)
- **Behavior contracts**: tests for reducers/hooks + a few critical flows

---

## 🧪 Verification Loop (The Non-Negotiable Habit)

1) **Ask AI for a plan**, not code (architecture first)
2) **Write or confirm contracts** (types + expected behavior)
3) **Generate code in small chunks**
4) **Run tests / lint / typecheck**
5) **Manual check**: accessibility + edge cases
6) **Document**: what AI suggested and what you changed

---

## 🧠 Practical Prompts (Copy-Paste Ready)

```markdown
✅ ARCHITECTURE PROMPT
"Given this feature: [describe], propose:
1) component decomposition (list components)
2) state model (UI/server/URL/shared)
3) data flow diagram (text)
4) failure modes + mitigations
Return only the plan, no code."

✅ CONTRACT PROMPT
"Write clear contracts for:
- API response shape (include error variants)
- UI state discriminated union (status + data/error)
Then list 5 invariants that must remain true."

✅ VERIFICATION PROMPT
"Review this diff for:
- security issues (XSS, token storage, unsafe HTML)
- accessibility regressions (focus, ARIA, keyboard)
- error handling gaps (loading/error/empty)
- stale closures / effect dependency issues
Return a checklist and the exact lines to inspect."
```

---

## 🧩 Hands-On: Apply the Method to One Feature

Pick one feature (auth, cart, search, media upload) and produce:

- **Decomposition**: 5–10 components/hooks/modules (named)
- **Contracts**:
  - Clear prop and API shapes (JSDoc or types as needed)
  - 3–6 invariants
- **Verification evidence**:
  - at least 2 tests (hook/reducer)
  - a screenshot of your accessibility check (keyboard-only or axe)

---

## 💭 Reflection Questions (Atelier)

> 💭 _Which part of your system is “most fragile” when AI generates code? Why?_

> 💭 _What did you verify manually that AI claimed was correct?_

> 💭 _What contract would have prevented your last bug?_

---

## 🧘 Koan

> _"The prompt is not the program. The program is what survives contact with reality."_

