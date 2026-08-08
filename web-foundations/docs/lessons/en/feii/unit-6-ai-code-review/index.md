---
layout: lesson
title: 'Unit 6: AI-Assisted Code Review — Human-in-the-Loop Workflow'
title_alt: 'Unidad 6: Revisión de Código Asistida por IA — Flujo Humano-en-el-Bucleo'
slug: feii-unit-6-ai-code-review
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-6-ai-code-review/
description: 'AI-assisted code review as a taught technique: GitHub PR integration, human-in-the-loop workflows, and Oliveira et al. 2026 research findings.'
tags:
  [
    feii,
    ai-assisted-development,
    code-review,
    github-pr,
    human-in-the-loop,
    testing-automation,
    research-grounded,
  ]
status: complete
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_tOC }
- TOC
{:toc}

<!-- pretier-ignore-end -->

---

> _"AI-assisted code review is not a shortcut. It's a force multiplier for human reviewers."_

> **AI Assistance Disclosure:** This unit teaches AI-assisted code review as a documented technique following Oliveira et al. 2026 research. Plans, prompts, and implementation reports are documented throughout the process.

---

## 🎯 Learning Objectives

By the end of this unit, you will be:

- **Grounded in research** — Understand Oliveira et al. 2026 findings on AI-assisted code review effectiveness
- **Configure AI for PR review** — Set up GitHub Actions with AI review tools that integrate into your workflow
- **Design human-in-the-loop processes** — AI suggests, human decides, with explicit accountability
- **Measure review quality** — Metrics for review coverage, accuracy, and false positive/negative rates
- **Avoid common pitfalls** — AI hallucinations, over-reliance, and maintaining human judgment

---

## 📖 Research Context: Oliveira et al. 2026

The research by Oliveira et al. (2026) on AI-assisted code review provides evidence-based guidance:

### Key Findings

1. **AI as force multiplier** — AI can review faster than humans, but human oversight remains critical
2. **Accuracy vs. speed trade-off** — AI catches many issues but produces false positives requiring human filtering
3. **Human-in-the-loop essential** — Best results when AI suggests and human decides, not AI decides unilaterally
4. **Domain-specific tuning** — AI models trained on your codebase perform better than generic models
5. **Accountability matters** — All AI suggestions must be attributable to a human reviewer

### Implications for Teaching

- AI-assisted code review should be **taught as a technique**, not used as a shortcut
- Students must learn to **evaluate AI suggestions critically**, not accept them blindly
- The workflow must preserve **human responsibility** for the final review decision

---

## 🤖 Configuring AI for PR Review

### GitHub Actions with AI Review Tools

Several AI-powered code review tools integrate with GitHub:

- **GitHub Copilot** — PR suggestions inline with the diff
- **CodeT5** — AI-powered code review as a GitHub Action
- **Ponicode** — AI security-focused code review
- **DeepCode** — AI vulnerability detection

### Example: CodeT5 GitHub Action

```yaml
# .github/workflows/ai-review.yml
name: AI Code Review

on:
  pull_request:
    types: [opened, synchronize]

permissions:
  pull-requests: write

jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: codet5/codet5-action@main
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

### GitHub Copilot for PR Review

GitHub Copilot can provide inline suggestions during PR review:

```bash
# Install GitHub CLI
gh extension install github/nextbrave/ai-reviewer
```

This adds AI-generated review comments directly to PR diffs.

---

## 🔄 Human-in-the-Loop Workflow

The critical pattern: **AI suggests, human decides**.

### AI-Assisted Review Process

```
┌─────────────────────────────────────────────────────────┐
│           HUMAN-IN-THE-LOOP WORKFLOW                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   1. AI Scans PR                                     │
│      └─ Generates suggestions: "Add null check",    │
│        "Extract magic number", "Add type guard"        │
│                                                          │
│   2. Human Reviewer Evaluates                         │
│      └─ Accepts valid suggestions                    │
│      └─ Rejects false positives                        │
│      └─ Adds context AI missed (business logic)      │
                                                          │
│   3. Changes Committed                                │
│      └─ Each line attributable to human reviewer        │
│                                                          │
│   4. Feedback Loop                                    │
│      └─ Track false positives to improve AI prompts      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Accountability Mechanisms

Every AI suggestion must be:

- **Attributed** — Logged with reviewer ID and timestamp
- **Actionable** — Specific enough to implement or reject
- **Contextualized** — Includes rationale, not just the change
- **Reversible** — Human can revert with a single revert if needed

---

## 🎯 Designing Effective AI Review Prompts

The quality of AI review depends heavily on prompt design:

### Good Review Prompt Template

```
Review this pull request for:

1. Bug risks: null checks, array bounds, type mismatches
2. Performance issues: unnecessary loops, memory leaks, N+1 queries
3. Security concerns: SQL injection, XSS, CSRF vulnerabilities
4. Code style violations: inconsistent naming, magic numbers, long functions
5. Missing edge cases: error handling, input validation, boundary conditions

For each issue, provide:
- The problematic line number
- The specific problem
- A suggested fix
- The severity level (critical, major, minor)

Ignore style preferences (spaces vs tabs) unless they violate the project's lint rules.
```

### Measuring AI Review Quality

Track metrics to improve the AI review process:

- **False positive rate** — Percentage of AI suggestions rejected by humans
- **False negative rate** — Percentage of real issues AI missed (caught by human review)
- **Review coverage** — Percentage of files AI reviewed vs. total changed files
- **Time saved** — Reduction in human review time (comparing before/after AI integration)

---

## 🎯 Practice Exercise

**Time:** 3 hours

1. **Set up AI code review** in a GitHub repo using CodeT5 or Copilot
2. **Create a test PR** with intentional bugs (null check missing, type error, security issue)
3. **Review the AI suggestions** — Evaluate each suggestion for accuracy and relevance
4. **Document false positives** — Keep a log of AI suggestions you rejected and why
5. **Iterate on prompts** — Refine the AI review prompt based on false positive patterns
6. **Compare review quality** — Measure time saved vs. manual review for similar PRs

**Deliverable:** AI review configuration + test PR analysis + prompt iteration log

---

## 📚 Recommended Reading

- **Oliveira et al. 2026** — AI-Assisted Code Review: A Human-in-the-Loop Approach (research paper)
- **GitHub Copilot for PR Review** — https://github.com/features/copilot
- **CodeT5 Documentation** — https://codet5.com/docs/
- **Google AI Review** — https://cloud.google.com/ai/reviewer

---

## ✅ Session Outcome

By the end of this unit, you should:

- Understand the research evidence for AI-assisted code review as a human-in-the-loop technique
- Be able to configure AI tools for GitHub PR review
- Design human-in-the-loop workflows that preserve human accountability
- Write effective AI review prompts that minimize false positives
- Measure AI review quality to iterate and improve

This unit completes the **Testeo (herramientas, diseño de pruebas, automatización)** official CONTENIDOS requirement by adding AI-assisted code review as a taught technique. The Entrega 1 project can now be built using the testing strategy (unit 5) and AI-assisted review (unit 6) patterns.

---

> _"AI assists, but humans decide. The difference is accountability."_
