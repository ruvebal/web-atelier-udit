---
layout: lesson
title: 'Unit 6: AI-Assisted Code Review — Human-in-the-Loop, and Graded as Such'
title_alt: 'Unidad 6: Revisión de Código Asistida por IA — Human-in-the-Loop y Evaluada Como Tal'
slug: feii-unit-6-ai-code-review
date: 2026-08-09
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-6-ai-code-review/
description: 'AI code review as a taught technique, not a shortcut: what the research actually shows, wiring an LLM reviewer into GitHub PRs, designing review prompts, and defending the review decisions you kept and rejected.'
tags:
  [feii, ai-code-review, human-in-the-loop, github-actions, pull-request, self-regulated-learning, ai-declaration]
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"Write code for humans first, computers second; the Tao lies in balancing both."_
> — Tao of Development, `cc-001`

> **AI Assistance Disclosure:** This unit is about AI assistance itself. Everything you produce here is disclosed under the shared [AI Use Declaration & Oral Defence Rubric]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }}) — including the AI reviewer you configure.

---

## The claim this unit makes

Most courses treat AI in one of two ways: banned, or ignored. Both are dishonest about how software is actually written in 2026.

This unit takes a third position, and it is the position the whole Web Atelier methodology rests on: **AI review is a technique with a correct form and many incorrect ones, so it should be taught, practised, and graded like any other technique.**

The grading target is not "did the AI find bugs". It is: **can you defend which suggestions you accepted and which you rejected?**

> _"Before fixing, understand. Before understanding, observe. Before observing, breathe."_
> — Tao of Development, `wis-002`

---

## Code conventions in this unit

- **CodeSandbox-ready** — complete file, copy-paste, runs as-is.
- **Excerpt** — partial pattern, illustrative. Does **not** run as-is.
- **Template** — copy and replace `[BRACKETED]` values before use.

Most of this unit is **Template**: your reviewer configuration depends on your repository, your model provider, and your team's conventions.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- [ ] Summarise what the research **actually** shows about in-workflow AI code review — including its limits
- [ ] Wire an LLM reviewer into your GitHub pull-request workflow
- [ ] Write a **review prompt** that produces useful criticism instead of flattery
- [ ] Classify AI review output into accept / reject / escalate, and justify each
- [ ] Produce an **AI Use Declaration** that a sceptical examiner would accept
- [ ] Explain why the human, not the model, is accountable for a merged PR

---

## 1 — What the research actually says

> _"Not every problem is a bug. Sometimes the problem is expectation."_
> — Tao of Development, `arch-020`

The primary source for this unit is:

> **Oliveira, E.; Fu, M.; Thongtanunam, P.; López-Pernas, S.; Saqr, M.** — "AI-Assisted Code Review as a Scaffold for Code Quality and Self-Regulated Learning: An Experience Report." arXiv `2604.23251`, 2026. Accepted at **ICSE 2026 (SEET track)**.

**What the study did:** deployed an in-workflow, **GitHub-PR-integrated LLM reviewer** across two cohorts (>100 students, 2023–2024) in software-engineering capstone courses.

**What it found, precisely:**

- Iterative activity roughly **doubled cohort-over-cohort** — 581 → 1176 pull requests.
- Student **responsiveness stayed stable** at roughly **32–33%** of successfully reviewed PRs being followed by a subsequent commit.

Read that second number carefully, because it is the honest one: **about two-thirds of AI reviews produced no follow-up commit at all.** In-workflow AI review is a scaffold that increases iteration. It is not a mechanism that makes students act on feedback most of the time.

### The limits you must state in your defence

> **Scope caveat.** The cohort was *software-engineering capstone*, not front-end. Whether these results transfer to HTML/CSS/JS/React work is, in the research field this course is built on, an explicit **`[UNVERIFIED-GAP]`** — a documented blank, not a settled finding.

That gap is not a footnote. It is the intellectual position of this unit:

> **You are inside the gap.** This course applies a mechanism validated in general software engineering to a front-end cohort, and asks you to report honestly on whether it helped. Your Entrega is evidence in a question the literature has not answered.

This is what it means to be taught by research rather than by tutorials — and it is a legitimate thing to say out loud in Unit 12's oral defence.

---

## 2 — What AI review is good and bad at

Calibrate before you configure. An LLM reviewer is not a uniformly capable reviewer.

| Reliably useful | Unreliable — verify always | Cannot do |
| --- | --- | --- |
| Missing `await`, unhandled promise rejections | Whether an abstraction is *worth* extracting | Know your product requirements |
| Inconsistent naming, dead code | Performance claims (measure — see Unit 7) | Know what your users actually need |
| Missing `alt`, unlabelled inputs, obvious a11y | Security judgements beyond common patterns | Take responsibility |
| Missing error/loading states | "This is fine" (flattery bias) | Know what your team agreed last week |
| Forgotten test for a changed branch | Framework-version-specific advice (training lag) | |

> **The flattery failure.** The default failure of an LLM reviewer is not hallucinating a bug — it is approving code to be agreeable. A reviewer that never objects is a reviewer you must re-prompt, not trust. §3 is written to counter exactly this.

> _"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."_
> — Tao of Development, `dbg-003`

---

## 3 — Designing the review prompt

A generic "review this code" prompt produces generic praise. A good review prompt does three things: **assigns a role, constrains scope, and forbids agreeableness.**

**Template** — `.github/ai-review-prompt.md`. Replace the `[BRACKETED]` values with your project's real conventions.

```markdown
You are reviewing a pull request in a [FRONT-END / ASTRO + REACT] project
for a third-year university course.

PROJECT CONVENTIONS (treat as non-negotiable):

- Accessibility: WCAG 2.2 AA. Interactive elements need accessible names.
- Testing: every changed branch of logic needs a corresponding test.
- Services: components never call fetch() directly — only modules in src/services/.
- State: server state via [React Query]; UI state local; auth state in context.

REVIEW ONLY the diff provided. Do not comment on unchanged code.

For each issue, output exactly:
  SEVERITY: blocker | should-fix | nitpick
  FILE:LINE
  PROBLEM: one sentence, concrete
  WHY IT MATTERS: user-visible or maintenance consequence
  SUGGESTION: minimal change, as a diff

RULES:
- If you are not confident, write "UNCERTAIN" and say what you would need to check.
- Do NOT praise. Do NOT summarise the PR. Only issues.
- If you find no blockers, say "No blockers found" and list nitpicks only.
- Never suggest a library the project does not already depend on without
  flagging it as a new dependency with a cost.
```

> **Why "do not praise" is a real instruction.** You are optimising for *signal*. Praise consumes reviewer attention and biases you toward merging. The human — you — supplies the encouragement.

**Excerpt** — the same review request, weak vs. strong. Run both on one of your own PRs and compare the output; the difference is the lesson.

```text
❌ "Can you review this code and tell me if it looks good?"
   → invites agreement, unbounded scope, no severity, no format

✅ "Review ONLY this diff against the conventions above. Output blockers first
    in the given format. If you find none, say so. Do not praise."
   → bounded, structured, adversarial by design
```

---

## 4 — Wiring the reviewer into GitHub

The point of *in-workflow* review (Oliveira et al.'s core design) is that feedback arrives **where the work already is** — the pull request — not in a chat window you have to remember to open.

**Template** — `.github/workflows/ai-review.yml`. Requires a model API key in repository secrets.

{% raw %}

```yaml
# .github/workflows/ai-review.yml
# In-workflow AI review: posts a review comment on every PR.
# The AI NEVER approves or merges — it comments. A human approves. (See §5.)

name: AI Review

on: pull_request

permissions:
  contents: read
  pull-requests: write # comment only — deliberately NOT `approve`

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0 # need history to diff against the base branch

      - name: Collect the diff
        run: git diff origin/${{ github.base_ref }}...HEAD > /tmp/pr.diff

      - name: Request review
        env:
          API_KEY: ${{ secrets.[YOUR_MODEL_API_KEY] }}
        run: node .github/scripts/ai-review.mjs /tmp/pr.diff > /tmp/review.md

      - name: Post as PR comment
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: gh pr comment ${{ github.event.number }} --body-file /tmp/review.md
```

{% endraw %}

> ⚠️ **Two guardrails that are graded.**
>
> 1. `permissions:` grants `pull-requests: write` (comment) and **never** approval rights. An AI that can approve its own suggestions has removed the human from the loop — which is the entire mechanism.
> 2. Never send secrets, `.env` files, or personal data in a diff to a third-party model. Add a path filter if your repo contains anything sensitive.

---

## 5 — The human-in-the-loop workflow

> _"Code is not written in text — it is written in understanding. The text is just the shadow of the understanding."_
> — Tao of Development, `wis-005`

The workflow you are graded on:

```
1. Open PR
      ↓
2. AI posts structured review
      ↓
3. YOU triage every item:  ACCEPT / REJECT / ESCALATE
      ↓
4. You implement accepted items as commits
      ↓
5. You record REJECTED items and your reason  ← the graded artefact
      ↓
6. A human reviewer (peer or instructor) approves
      ↓
7. Merge
```

**Step 5 is the assessment.** Accepting good advice is easy. **Rejecting bad advice with a stated reason is the demonstration of competence** — it is the "corrective competence" that the profield research (Sankaranarayanan, 2026) identifies as what's actually at risk when AI is used unreflectively.

**Template** — `docs/ai-review-log.md`. One row per AI suggestion, for every PR in Entrega 1.

```markdown
# AI Review Log — Entrega 1

| PR  | Suggestion (short)                    | Severity   | Decision | Reason                                                     |
| --- | ------------------------------------- | ---------- | -------- | ---------------------------------------------------------- |
| #12 | Add `alt` to the chart `<img>`        | blocker    | ACCEPT   | Real WCAG 2.2 failure; screen reader announced nothing.    |
| #12 | Extract `useSignalData` into a hook   | should-fix | REJECT   | One consumer only. Rule of three — premature (`arch-012`). |
| #14 | Replace `map` with `for` "for speed"  | nitpick    | REJECT   | Unmeasured claim. Profiled: no difference at n=40.         |
| #15 | Add loading state to `<DevicePanel>`  | blocker    | ACCEPT   | WebSocket latency left a blank panel for ~800 ms.          |
| #16 | Use `[LIBRARY]` for date formatting   | nitpick    | ESCALATE | New dependency — asked instructor before adding (`qa-006`).|
```

> _"A dependency added is a dependency maintained. Choose wisely."_
> — Tao of Development, `qa-006`

---

## 6 — Entrega 1 is due here

Entrega 1 covers **Units 2–6**: the Astro architecture (U2–U3), PWA behaviour (U4), the testing strategy (U5), and the AI review workflow (U6).

Submit, in the repository:

- [ ] Working Astro project with your islands architecture
- [ ] `docs/testing-strategy.md` — from [Unit 5]({{ '/lessons/en/feii/unit-5-testing-strategy/' | relative_url }})
- [ ] Green CI within the stated wall-clock budget, with the measurement recorded
- [ ] `.github/workflows/ai-review.yml` running on your PRs
- [ ] `docs/ai-review-log.md` — **minimum 5 PRs**, with at least **two REJECT decisions** and their reasons
- [ ] `AI_USE_DECLARATION.md` per the [shared rubric]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }})
- [ ] Commit history that shows iteration, not one final dump

> **The two REJECTs are not padding.** A log with only ACCEPTs suggests you did not evaluate — you complied. If the AI genuinely produced nothing worth rejecting across five PRs, say so explicitly and show the reviews; that itself is a finding worth defending.

> _"The wise instructor grades with consistency. The enlightened instructor grades with compassion."_
> — Tao of Development, `qa-012`

---

## 🎯 Practice Exercise

**Lab time: 3 h** (of the official 30 h Prácticas de Laboratorio)

1. **Calibrate (30 min).** Take a PR you already merged in Unit 5. Run the weak prompt and the strong prompt (§3) over the same diff. Paste both outputs side by side in your log. Which found real problems?
2. **Wire it (60 min).** Add the workflow (§4) to your repository. Confirm the comment appears on a test PR.
3. **Break it deliberately (30 min).** Introduce a real accessibility failure and a real missing-await bug in a branch. Does your reviewer catch them? Record what it missed — misses are data.
4. **Run the loop (60 min).** Work normally for the rest of the session. Every AI suggestion goes in `docs/ai-review-log.md` with a decision and a reason.

**Deliverable:** the AI review log, plus a 150-word reflection answering: *did in-workflow review change how you wrote code, or only how you documented it?* — the honest answer to the research question in §1.

---

## 📚 Recommended Reading

- Oliveira, Fu, Thongtanunam, López-Pernas & Saqr — "AI-Assisted Code Review as a Scaffold for Code Quality and Self-Regulated Learning," arXiv [`2604.23251`](https://arxiv.org/abs/2604.23251), ICSE 2026 SEET
- Sankaranarayanan — "Mitigating 'Epistemic Debt' in Generative AI-Scaffolded Novice Programming using Metacognitive Scripts," arXiv [`2602.20206`](https://arxiv.org/abs/2602.20206), L@S '26 — the "fragile expert" framing behind §5
- [Web Atelier AI Practical Guide]({{ '/methodology/en/ai-practical-guide/' | relative_url }}) — the docs-first methodology this unit operationalises
- [AI Use Declaration & Oral Defence Rubric]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }}) — how this is graded

---

## ✅ Session Outcome

You should now be able to:

- State what the evidence for AI code review actually supports — and where it stops
- Run an in-workflow reviewer on your own pull requests
- Write a review prompt that produces criticism rather than agreement
- Defend a rejection of AI advice on technical grounds
- Submit Entrega 1 with process evidence, not just a working app

This unit completes the official **Testeo (herramientas, diseño de pruebas, automatización)** CONTENIDOS block alongside Unit 5.

Next: [Unit 7 — Performance Engineering]({{ '/lessons/en/feii/unit-7-performance/' | relative_url }}), where "measure, don't assume" stops being advice about tests and becomes advice about milliseconds.

---

> _"The wise instructor automates what repeats. The foolish instructor repeats what should be automated."_
> — Tao of Development, `qa-001`
