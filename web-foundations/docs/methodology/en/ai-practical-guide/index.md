---
layout: lesson
title: 'AI-Assisted Development: A Practical Guide'
title_alt: 'Desarrollo Asistido por IA: Guía Práctica'
slug: ai-practical-guide
date: 2026-08-13
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /methodology/en/ai-practical-guide/
description: 'Classroom protocol: when to plan, how to disclose, and what you must be able to defend when AI helps you build.'
tags: [ai, methodology, ethics, docs-first, disclosure]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

> _"Code is not written in text—it is written in understanding. The text is just the shadow of the understanding."_
> — Tao of Development, `wis-005`

**For:** an FE I or FE II student (or CD student under the same covenant) who may use an AI assistant on coursework and must still own every line they submit.

**Not for:** the public manifesto, the architecture primer, the Tao chapter, or a journalist. Those have their own pages — see [Where to go next](#where-to-go-next).

**Goal:** when AI helps you build, you still own the code. This page says when to plan, how to disclose, and what you must be able to defend.

These instructions exist to be **followed**, then **tested** in the oral defence. Completeness is not the test; whether you can act from this page is. `[studio-guides, 82b3b541-0cf2-5f0a-adb9-7470db8f8a71]` — bibliographic identity of that axis is in the studio RIS (`[BIBLIO-GAP]` on the Ahmes coat).

---

## The covenant (required)

| Rule | Why it is required |
| --- | --- |
| **Understand every line** | You defend it orally. Code you cannot explain is not yours. |
| **Disclose AI use** | README + commit. Undeclared AI is an integrity review. Disclosure is also the law in this classroom. |
| **No secrets in prompts** | Keys, passwords, personal data, and client files do not go into a chat. |
| **Verify before commit** | The checklist below is what the defence will ask. |

### The Human Flourishing Test

Before every AI-assisted project, ask:

> 1. Will this app **reduce suffering** or **increase joy**?
> 2. Am I **learning** through this process, or just **copying**?
> 3. Will future-me **thank** present-me for this work?

The [European Declaration on Digital Rights and Principles for the Digital Decade](https://digital-strategy.ec.europa.eu/en/library/european-declaration-digital-rights-and-principles) (European Commission, 2022) states the same principle in policy register: artificial intelligence should serve as a tool for people, with the ultimate aim of increasing human well-being, and everyone should be empowered to make informed choices in the digital environment while being protected against risks and harm.

---

## Critical Considerations: The Broader Impact of AI

### Understanding What You're Using

Before leveraging AI assistants, understand the fundamentals:

**How LLMs (Large Language Models) Work:**

- Trained on massive text corpora from the internet
- Predict next tokens based on statistical patterns
- Have no true understanding, reasoning, or consciousness
- Can hallucinate (generate plausible but false information)
- Reflect biases present in training data

**Current Technology Landscape:**

- Models: GPT-4, Claude, Gemini, Llama, Mistral
- Interfaces: Chat (ChatGPT, Claude.ai), IDE integration (Copilot, Cursor), APIs
- Protocols: MCP (Model Context Protocol) for tool integration

### Environmental Impact

```
┌─────────────────────────────────────────────────────────┐
│ 🌍 CLIMATE CONSIDERATIONS                                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Training GPT-4 ≈ 50,000 kg CO₂ (≈ 5 transatlantic      │
│  flights per passenger)                                  │
│                                                          │
│  Each query consumes energy. Ask intentionally.          │
│                                                          │
│  Consider:                                               │
│  → Is this query necessary?                              │
│  → Could I find this in documentation?                   │
│  → Am I using AI for learning or laziness?               │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Data Privacy & Security

| Risk                       | Mitigation                                     |
| -------------------------- | ---------------------------------------------- |
| **Data leakage**           | Never paste API keys, passwords, personal data |
| **Code exposure**          | Assume prompts may be logged/used for training |
| **Client confidentiality** | Anonymize sensitive business logic             |
| **GDPR/Privacy laws**      | Don't process personal data through AI         |

### Tech Industry Concentration

Be aware of the **monopolistic dynamics** in AI:

- **Chip manufacturing**: NVIDIA dominates GPU market; TSMC manufactures most advanced chips
- **Cloud infrastructure**: AWS, Azure, GCP control AI compute
- **Model development**: Concentrated in few well-funded companies
- **Data**: Training requires massive datasets, favoring incumbents

**Why this matters for developers:**

- Vendor lock-in risks
- Dependency on proprietary systems
- Ethical implications of supporting concentration
- Consider open-source alternatives (Llama, Mistral, local models)

### Ethical Frameworks

Our AI usage aligns with established ethical guidelines at international, EU, and professional levels:

**ACM Code of Ethics (Association for Computing Machinery):**

- Contribute to society and human well-being
- Avoid harm
- Be honest and trustworthy
- Be fair and take action not to discriminate
- Respect privacy
- Honor confidentiality

**UNESCO Recommendation on the Ethics of AI (2021):**

On teaching, teacher training, and e-learning specifically:

> "Member States should encourage research initiatives on the responsible and ethical use of AI technologies in teaching, teacher training and e-learning, among other issues... Member States should also ensure that AI technologies empower students and teachers and enhance their experience, bearing in mind that relational and social aspects and the value of traditional forms of education are vital in teacher-student and student-student relationships... AI should support the learning process without reducing cognitive abilities and without extracting sensitive information, in compliance with relevant personal data protection standards."
> — UNESCO (2021), §104

The Recommendation's broader principles (summarized):

- **Proportionality**: AI should not exceed what is necessary
- **Safety and security**: Prevent harm throughout lifecycle
- **Fairness and non-discrimination**: Promote social justice
- **Sustainability**: Assess environmental impact
- **Right to privacy**: Protect personal data
- **Human oversight**: Humans must remain in control
- **Transparency and explainability**: Understand AI decisions
- **Responsibility and accountability**: Clear attribution of responsibility

**EU AI Act — Article 4, AI Literacy (Regulation (EU) 2024/1689):**

> "Providers and deployers of AI systems shall take measures to ensure, to their best extent, a sufficient level of AI literacy of their staff and other persons dealing with the operation and use of AI systems on their behalf, taking into account their technical knowledge, experience, education and training and the context the AI systems are to be used in..."

Article 4 makes AI literacy a **binding legal requirement** in the EU — not merely good pedagogy. This course is a working example of that obligation.

<!--**Ethics Guidelines for Trustworthy AI (Horizon Europe / European Commission):**

 Note: MSCA fellows are required to conduct ethics self-assessments using this framework. The seven requirements emphasize key principles such as human agency and oversight, privacy and data governance, societal and environmental well-being, and accountability—including the duty for developers and operators to explain system outcomes (see European Commission, *How to complete your ethics self-assessment*, §8).

**MSCA-NET Policy Brief: Artificial Intelligence (2025):**

> "This policy brief explores the opportunities and challenges AI presents within Horizon Europe and the Marie Skłodowska-Curie Actions (MSCA)... It also offers a summary of recommendations to ensure AI research is conducted responsibly, ethically, and in line with the EU's values."
>
> "Ethical and legal risks: AI technologies can raise significant ethical and legal concerns, particularly regarding bias, discrimination, copyright issues and plagiarism. It must be ensured that AI research adheres to high ethical standards, including transparency, fairness, accountability, and non-discrimination."

I hold students to the same standard my own funding network holds me to.

**ERA Living Guidelines on the Responsible Use of Generative AI in Research (European Commission & ERA Forum):**

> "These guidelines intend to set out common directions on the responsible use of generative AI. While non-binding, they should be considered as a supporting tool for researchers, research organisations and research funding bodies, including the ones applying to the European Framework Programme for Research and Innovation."
>
> "Researchers, to be transparent, detail which generative AI tools have been used substantially in their research processes. When generative AI meaningfully shapes results, researchers transparently note its use according to the guidelines of their journal or standards in their discipline in the methods section (or equivalent) responsibly evaluating the extent of the contribution."
>
> "Accountability for the research from idea to publication, for its management and organisation, for training, supervision and mentoring, and for its wider societal impacts. This includes responsibility for all output that a researcher produces, underpinned by the notion of human agency and oversight."

**ICMJE Recommendations (2025)** — scholarly publishing, the same disclosure duty as this course's README:

> "At submission, the journal should require authors to disclose whether they used Artificial Intelligence (AI)-assisted technologies... Chatbots (such as ChatGPT) should not be listed as authors because they cannot be responsible for the accuracy, integrity, and originality of the work... Authors should be able to assert that there is no plagiarism in their paper, including in text and images produced by the AI. Humans must ensure there is appropriate attribution of all quoted material, including full citations."

> **References:**
>
> - [ACM Code of Ethics](https://www.acm.org/code-of-ethics)
> - [UNESCO Recommendation on AI Ethics](https://www.unesco.org/en/artificial-intelligence/recommendation-ethics)
> - [EU AI Act (Regulation (EU) 2024/1689)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
> - [Ethics Guidelines for Trustworthy AI](https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai)
> - [ERA Living Guidelines on Generative AI in Research](https://research-and-innovation.ec.europa.eu/document/download/2b6cf7e5-36ac-41cb-aab5-0d32050143dc_en?filename=ec_rtd_ai-guidelines.pdf)
> - [ICMJE Recommendations](https://www.icmje.org/recommendations/)

---

## When a plan is required

| Trivial — no plan | Non-trivial — plan required |
| --- | --- |
| Fix a typo | Add a feature |
| Adjust a colour | Refactor a module |
| Update a dependency | Authentication, routing, data shape |
| Add a comment | New component that other files import |
| One-line CSS | Change how data is stored or fetched |

**Rule of thumb:** more than about 15 minutes, or more than one file → write a plan first.

**Required** for non-trivial work. **Optional:** prompt libraries, MCP servers, mastery ladders — those live in lessons, not here.

---

## Docs-first loop (required for non-trivial work)

1. **Plan** — `docs/plans/plan-[feature].md`. What, why, success criteria. No code yet.
2. **Implement** — only after you have approved the plan. AI proposes; you decide.
3. **Report** — what changed, what you rejected, what you still cannot explain.
4. **Human commit** — you write the message. You push. You own the diff.

```
plan → implement → report → human commit
```

### Plan (keep it short)

```markdown
# Plan: [feature]

**Status:** Draft | Approved | Done

## Objective
[One sentence.]

## Success
- [ ] [criterion]
- [ ] [criterion]

## Out of scope
[What this plan will not do.]
```

### After the session (keep it shorter)

```markdown
# Report: [feature] — [date]

**Files:** `src/…`
**AI used:** [tool]. **Human verified:** yes / not yet.

## What changed
[Two sentences.]

## What I rejected, and why
[If nothing, say so.]

## Still cannot explain
[If this list is not empty, do not commit.]
```

---

## README disclosure (required)

Every repo that used AI **must** show this in `README.md`. Repositories with AI-shaped diffs and no disclosure can be flagged for integrity review.

```markdown
## AI Assistance Disclosure

This project was developed with AI assistance ([tool]).

**AI was used for:**
- [generation / debugging / docs — be specific]

**Human verification:**
- I can explain every line I submitted
- I take full responsibility for the implementation
```

Commit message pattern:

```text
feat: add auth flow (AI-assisted: Cursor)
```

---

## Verification checklist (required)

This is the oral-defence surface. If you cannot tick it, do not commit.

- [ ] I can explain what this code does, line by line if asked
- [ ] I know why it is written this way (not only that it runs)
- [ ] I ran it (browser, test, or both)
- [ ] I looked for secrets, XSS, and missing auth
- [ ] I considered empty, error, and keyboard/accessible paths
- [ ] README disclosure matches what I actually used
- [ ] The commit message names the tool if AI helped

---

## Where to go next

| Need | Page |
| --- | --- |
| One-sentence frame | [Manifesto]({{ '/methodology/en/ai-assisted-development-foundations/' | relative_url }}) |
| Architecture cluster | [AI-assisted development]({{ '/lessons/en/ai-assisted-development/' | relative_url }}) |
| RPC, RAG, MVC as discipline | [Architecture Foundations]({{ '/lessons/en/ai-assisted-development/foundations/' | relative_url }}) |
| Apply the stack in React | [AI Theory & Architecture for React]({{ '/lessons/en/react/ai-assisted-development-foundations/' | relative_url }}) |
| Craftsman's Oath | [Tao of AI Development]({{ '/methodology/en/tao-of-ai-development/' | relative_url }}) |
| How you are graded | [AI Use Declaration & Oral Defence Rubric]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }}) |
| Course pedagogy | [Methodology hub]({{ '/methodology/en/' | relative_url }}) |
| FE I / FE II | [How to pass FE I]({{ '/tracks/fei/how-to-pass-this-track/' | relative_url }}) · [How to pass FE II]({{ '/tracks/feii/how-to-pass-this-track/' | relative_url }}) |

Prompt patterns and MCP setup are **optional**. They are taught in the architecture lesson and the React sprint, not on this page.

---

## Risks this course has already seen

| What happened | Harm | Control |
| --- | --- | --- |
| Paste a whole feature, undeclared | Integrity review; you cannot claim the work | README + commit disclosure |
| Ship a diff you cannot walk through | Fail oral defence | Verification checklist before commit |
| API keys or personal data in chat | Credential leak; GDPR problem | Never paste secrets |
| Treat the model as author | You do not own the submission | Human authorship: own what you can defend |

---

> _"Write code for humans first, computers second; the Tao lies in balancing both."_
> — Tao of Development, `cc-001`

**Authorship:** Rubén Vega Balbás, PhD (UDIT) · ORCID: [0000-0001-6862-9081](https://orcid.org/0000-0001-6862-9081)
**License:** Content CC BY-NC-SA 4.0

_Critical Coding for a Better Living._
