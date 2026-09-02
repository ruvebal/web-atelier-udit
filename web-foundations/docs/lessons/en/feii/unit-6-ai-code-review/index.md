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
status: complete
---

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> AI review is a second opinion; human review is the learning evidence.</p>
<p><strong>Field lens:</strong> **Practice anchor:** code review requires context, criteria, and accountable acceptance/rejection. **Frontier signal:** PR-integrated AI review is active practice; front-end learning outcomes remain a gap.</p>
</aside>
>
> **Studio test:** Keep an ACCEPT/REJECT log and defend two decisions orally.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"Write code for humans first, computers second; the Tao lies in balancing both."_
> — Tao of Development, `cc-001`
{: .tao-development-quote }

> **AI Assistance Disclosure:** This unit is about AI assistance itself. Everything you produce here is disclosed under the shared [AI Use Declaration & Oral Defence Rubric]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }}) — including the AI reviewer you configure.

---

## The claim this unit makes

Most courses treat AI in one of two ways: banned, or ignored. Both are dishonest about how software is actually written in 2026.

This unit takes a third position, and it is the position the whole Web Atelier methodology rests on: **AI review is a technique with a correct form and many incorrect ones, so it should be taught, practised, and graded like any other technique.**

The grading target is not "did the AI find bugs". It is: **can you defend which suggestions you accepted and which you rejected?**

> _"Before fixing, understand. Before understanding, observe. Before observing, breathe."_
> — Tao of Development, `wis-002`
{: .tao-development-quote }

---

## Code conventions in this unit

- **CodeSandbox-ready** — complete file, copy-paste, runs as-is.
- **Excerpt** — partial pattern, illustrative. Does **not** run as-is.
- **Template** — copy and replace `[BRACKETED]` values before use.

Most of this unit is **Template**: your reviewer configuration depends on your repository, your model provider, and your team's conventions.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- [ ] State the evidence boundary for in-workflow AI review and distinguish a research claim from this course's assessment contract
- [ ] Wire an LLM reviewer into your GitHub pull-request workflow
- [ ] Write a **review prompt** that produces useful criticism instead of flattery
- [ ] Classify AI review output into accept / reject / escalate, and justify each
- [ ] Produce an **AI Use Declaration** that a sceptical examiner would accept
- [ ] Explain why the human, not the model, is accountable for a merged PR

---

## 1 — What the research actually says

> _"Not every problem is a bug. Sometimes the problem is expectation."_
> — Tao of Development, `arch-020`
{: .tao-development-quote }

### Evidence boundary — keep the gap visible

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
The course vault currently contains a discovery candidate for in-workflow AI code review, but **no evaluator-safe Ahmes node for that study is available in this publication pass**. Its reported cohort counts and response rates are therefore not reproduced here.
-->
{% endif %}

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
> **`[BIBLIO-GAP]` — in-workflow AI-code-review outcomes.** A relevant 2026 experience report has been identified, but it is not yet page-addressably resolved through the course's citation gate. It must not be used as proof that this workflow improves learning, code quality, or front-end outcomes.
-->
{% endif %}

The human-in-the-loop workflow below is consequently a **transparent course and assessment contract**, not a settled empirical conclusion: the model may comment; you must make, explain, and record the decision; a human reviewer approves the merge.

### The limits you must state in your defence

> **Scope caveat.** The course does not claim that AI review transfers learning to HTML/CSS/JS/React, nor that accepting more suggestions means a student understands more. Your evidence is your own decision log, implementation diff, tests, and oral explanation.

That gap is not a footnote. It is the intellectual position of this unit:

> **You are inside the gap.** The course tests a disciplined professional workflow with a front-end cohort and asks you to report honestly on whether it helped. Your Entrega is evidence for a question the current cited literature has not yet answered for this setting.

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
{: .tao-development-quote }

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

The point of *in-workflow* review is that feedback arrives **where the work already is** — the pull request — not in a chat window you have to remember to open.

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
{: .tao-development-quote }

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

**Step 5 is the assessment.** Accepting good advice is easy. **Rejecting bad advice with a stated reason is the demonstration of competence.** The course assesses that corrective judgement directly; it does not infer it from the model's output.

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
{: .tao-development-quote }

---

## 6 — Entrega 1 is due here

Entrega 1 covers **Units 2–6**: the Astro architecture (U2–U3), PWA behaviour (U4), the testing strategy (U5), and the AI review workflow (U6).

Submit, in the repository:

- [ ] Working Astro project with your islands architecture
- [ ] Astro [i18n routing](https://docs.astro.build/en/guides/internationalization/) with at least `es` and `en` locales and working locale-prefixed routes (mandatory)
- [ ] `docs/testing-strategy.md` — from [Unit 5]({{ '/lessons/en/feii/unit-5-testing-strategy/' | relative_url }})
- [ ] Green CI within the stated wall-clock budget, with the measurement recorded
- [ ] `.github/workflows/ai-review.yml` running on your PRs
- [ ] `docs/ai-review-log.md` — **minimum 5 PRs**, with at least **two REJECT decisions** and their reasons
- [ ] `AI_USE_DECLARATION.md` per the [shared rubric]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }})
- [ ] Commit history that shows iteration, not one final dump

> **The two REJECTs are not padding.** A log with only ACCEPTs suggests you did not evaluate — you complied. If the AI genuinely produced nothing worth rejecting across five PRs, say so explicitly and show the reviews; that itself is a finding worth defending.

> _"The wise instructor grades with consistency. The enlightened instructor grades with compassion."_
> — Tao of Development, `qa-012`
{: .tao-development-quote }

---

## 🎯 Practice Exercise

**Lab time: 3 h** (of the official 30 h Prácticas de Laboratorio)

1. **Calibrate (30 min).** Take a PR you already merged in Unit 5. Run the weak prompt and the strong prompt (§3) over the same diff. Paste both outputs side by side in your log. Which found real problems?
2. **Wire it (60 min).** Add the workflow (§4) to your repository. Confirm the comment appears on a test PR.
3. **Break it deliberately (30 min).** Introduce a real accessibility failure and a real missing-await bug in a branch. Does your reviewer catch them? Record what it missed — misses are data.
4. **Run the loop (60 min).** Work normally for the rest of the session. Every AI suggestion goes in `docs/ai-review-log.md` with a decision and a reason.

**Deliverable:** the AI review log, plus a 150-word reflection answering: *did in-workflow review change how you wrote code, or only how you documented it?* State what your own evidence can show and what it cannot establish beyond this project.

---

## B3 · Individual exercises — decontextualised · 2 h

These are distinct from the team workflow. Submit your own judgement record;
Exercise 1 is explicitly no-AI.

1. **No-AI diagnostic.** Read the weak and strong review prompts in §3. Name
   three constraints in the strong prompt that make a review more auditable.
2. For each suggestion, write ACCEPT, REJECT, or ESCALATE and give the smallest
   defensible reason: “replace map with for for speed” without a measurement;
   “add an accessible name to the icon-only button”; “add a new date library.”
3. A model says “no blockers found.” Write the next human verification step
   before merge and explain why the statement itself is not approval evidence.

Professor expected-answer sketches are in the companion exercise sheet.

### Companion materials

- [Session deck outline](./deck-outline.md)
- [Individual exercise sheet](./exercises.md)

---

## 📚 Recommended Reading

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- **Evidence status:** the relevant in-workflow code-review study remains **`[BIBLIO-GAP]`** until it has an evaluator-safe Ahmes page/node. It is not a student citation and no numerical finding from it is asserted in this lesson.
-->
{% endif %}
- [Web Atelier AI Practical Guide]({{ '/methodology/en/ai-practical-guide/' | relative_url }}) — the docs-first methodology this unit operationalises
- [AI Use Declaration & Oral Defence Rubric]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }}) — how this is graded

---

## ✅ Session Outcome

You should now be able to:

- State the evidence boundary for AI code review — and where it stops
- Run an in-workflow reviewer on your own pull requests
- Write a review prompt that produces criticism rather than agreement
- Defend a rejection of AI advice on technical grounds
- Submit Entrega 1 with process evidence, not just a working app

This unit completes the official **Testeo (herramientas, diseño de pruebas, automatización)** CONTENIDOS block alongside Unit 5.

Next: [Unit 7 — Performance Engineering]({{ '/lessons/en/feii/unit-7-performance/' | relative_url }}), where "measure, don't assume" stops being advice about tests and becomes advice about milliseconds.

---

> _"The wise instructor automates what repeats. The foolish instructor repeats what should be automated."_
> — Tao of Development, `qa-001`
{: .tao-development-quote }

{% comment %}
outcome-graphic-selection:
  source-section: "✅ Session Outcome"
  visual-grammar: "human-review-correction-loop — automated review suggestions cycling through human inspection, rejection, correction, and evidence"
{% endcomment %}
{% include lesson-outcome-graphic.html %}
