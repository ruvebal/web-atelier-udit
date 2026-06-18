---
layout: lesson
title: 'AI-Assisted Development: A Practical Guide'
title_alt: 'Desarrollo Asistido por IA: Guía Práctica'
slug: ai-practical-guide
date: 2026-01-03
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /methodology/en/ai-practical-guide/
description: 'Comprehensive guide for ethical, intentional AI-assisted development: docs-first methodology, prompt architecture, implementation reports, and critical considerations.'
tags: [ai, methodology, ethics, prompts, mcp, documentation]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"AI is not the destination. AI is the compass that helps us navigate toward human flourishing."_

> **AI Assistance Disclosure:** This guide was developed using the docs-first methodology it describes. Plans, prompts, and implementation reports were documented throughout. The pedagogy is grounded in classroom experience and critical reflection on AI's role in education.

---

## Philosophy: AI for Human Better Living

### The Core Principle

```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│   AI exists to AMPLIFY human intent, not replace it.     │
│                                                          │
│   Every AI interaction should answer:                    │
│   → Does this help me understand more?                   │
│   → Does this help me create something of value?         │
│   → Does this free me to focus on what matters?          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### The Tao Developer's AI Relationship

| Mindset              | Practice                                                |
| -------------------- | ------------------------------------------------------- |
| **AI as Apprentice** | You are the master; AI proposes, you decide             |
| **AI as Mirror**     | Use AI to reflect on your own thinking                  |
| **AI as Amplifier**  | Let AI handle the mechanical; you handle the meaningful |
| **AI as Teacher**    | Ask AI to explain, not just do                          |
| **AI as Pair**       | Collaborate, critique, iterate together                 |

### The Human Flourishing Test

Before every AI-assisted project, ask:

> 1. Will this app **reduce suffering** or **increase joy**?
> 2. Am I **learning** through this process, or just **copying**?
> 3. Will future-me **thank** present-me for this work?

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

Our AI usage aligns with established ethical guidelines:

**ACM Code of Ethics (Association for Computing Machinery):**

- Contribute to society and human well-being
- Avoid harm
- Be honest and trustworthy
- Be fair and take action not to discriminate
- Respect privacy
- Honor confidentiality

**UNESCO Recommendation on the Ethics of AI (2021):**

- **Proportionality**: AI should not exceed what is necessary
- **Safety and security**: Prevent harm throughout lifecycle
- **Fairness and non-discrimination**: Promote social justice
- **Sustainability**: Assess environmental impact
- **Right to privacy**: Protect personal data
- **Human oversight**: Humans must remain in control
- **Transparency and explainability**: Understand AI decisions
- **Responsibility and accountability**: Clear attribution of responsibility

> 📚 **References:**
>
> - [ACM Code of Ethics](https://www.acm.org/code-of-ethics)
> - [UNESCO Recommendation on AI Ethics](https://www.unesco.org/en/artificial-intelligence/recommendation-ethics)

---

## The Docs-First Methodology

### The Two-Phase Approach (Non-Negotiable)

For **any non-trivial task**, AI interactions must follow:

```
┌─────────────────────────────────────────────────────────┐
│           THE TWO-PHASE APPROACH                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  PHASE 1: PLANNING                                       │
│  ─────────────────                                       │
│  → Request AI to generate a development plan             │
│  → Document in ./docs/plan1.md, plan2.md, etc.           │
│  → Review and approve before proceeding                  │
│                                                          │
│  PHASE 2: IMPLEMENTATION                                 │
│  ───────────────────────                                 │
│  → Only after plan is documented                         │
│  → AI implements according to plan                       │
│  → Generate implementation report                        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Why this matters:**

- **Intentional architecture**: Prevents aimless code generation
- **Consciousness**: Forces you to think before coding
- **Audit trail**: Documents decisions for future reference
- **Learning**: Planning teaches you to break down problems
- **Debugging**: At 2 AM, you'll thank yourself for the documentation

### What Counts as "Non-Trivial"?

| Trivial (no plan needed) | Non-trivial (plan required) |
| ------------------------ | --------------------------- |
| Fix a typo               | Add a new feature           |
| Adjust a color value     | Refactor a module           |
| Update a dependency      | Implement authentication    |
| Add a comment            | Create a new component      |
| Simple CSS adjustment    | Change data architecture    |

**Rule of thumb**: If it takes more than 15 minutes or touches multiple files, create a plan.

### The Complete Workflow

```
┌─────────────────────────────────────────────────────────┐
│           THE DOCS-FIRST WORKFLOW                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. CREATE THE PLAN (docs/plan-feature-name.md)          │
│     └── Confluence-style implementation plan             │
│     └── Phases, outcomes, success criteria               │
│                                                          │
│  2. GENERATE PROMPTS (one per phase)                     │
│     └── Each phase gets a tailored prompt                │
│     └── Prompt includes context, constraints, output     │
│                                                          │
│  3. EXECUTE WITH REPORTS                                 │
│     └── AI generates implementation                      │
│     └── AI generates implementation report               │
│     └── Human reviews, approves, commits                 │
│                                                          │
│  4. ITERATE & DOCUMENT                                   │
│     └── Update plan with learnings                       │
│     └── Build knowledge base for future projects         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Plan Document Template

**Location**: `docs/plan-[feature-name].md`

```markdown
# Implementation Plan: [Feature Name]

> **Created**: [Date] > **Status**: Draft | In Progress | Complete
> **AI Model**: Claude/GPT-4/Copilot

---

## 1. Overview

### Objective

[What are we building and why?]

### Success Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

### Constraints

- Time: [X days/weeks]
- Tech: [Required stack]
- Dependencies: [External systems]

---

## 2. Phases

### Phase 1: [Name]

**Goal**: [Single sentence]
**Deliverables**:

- [ ] Deliverable 1
- [ ] Deliverable 2

**Prompt for this phase**:

> [To be generated]

**Implementation Report**:

> [To be filled after execution]

---

## 3. Architecture Decisions

| Decision | Rationale | Alternatives Considered |
| -------- | --------- | ----------------------- |
| [Choice] | [Why]     | [Other options]         |

---

## 4. Learnings & Retrospective

[Fill after completion]
```

---

## The Prompt Architecture

### Prompt Anatomy

A well-structured prompt has **layers**:

```
┌─────────────────────────────────────────────────────────┐
│ LAYER 1: ROLE & CONTEXT                                  │
│ "You are a senior React developer helping me build..."   │
├─────────────────────────────────────────────────────────┤
│ LAYER 2: KNOWLEDGE                                       │
│ "Here is the current codebase structure: [tree]"         │
│ "Here are relevant files: [contents]"                    │
├─────────────────────────────────────────────────────────┤
│ LAYER 3: TASK                                            │
│ "Implement [specific feature] following [pattern]"       │
├─────────────────────────────────────────────────────────┤
│ LAYER 4: CONSTRAINTS                                     │
│ "Must use TypeScript, must not break existing tests"     │
├─────────────────────────────────────────────────────────┤
│ LAYER 5: OUTPUT FORMAT                                   │
│ "Provide: 1) Code, 2) Explanation, 3) Report"            │
└─────────────────────────────────────────────────────────┘
```

### Prompt Patterns Library

#### 1. The Explainer Prompt

**Purpose**: Understand existing code or concepts

```markdown
Explain [concept/code] as if teaching a junior developer.
Include:

1. What it does
2. Why it exists
3. How it works step by step
4. Common pitfalls
5. Best practices
```

#### 2. The Architect Prompt

**Purpose**: Design before implementing

```markdown
I need to implement [feature].

Before writing code, please:

1. Propose 2-3 architectural approaches
2. Compare trade-offs of each
3. Recommend one with rationale
4. Outline the implementation steps

Do not write code yet—I want to understand the design first.
```

#### 3. The Reviewer Prompt

**Purpose**: Critical analysis of code

```markdown
Review this code critically:
[paste code]

Analyze for:

1. Correctness
2. Security vulnerabilities
3. Performance issues
4. Maintainability concerns
5. Suggested improvements

Be harsh but constructive.
```

#### 4. The Rubber Duck Prompt

**Purpose**: Debug by explaining

```markdown
I have a bug. Let me explain what I expect vs. what happens:

Expected: [description]
Actual: [description]
Code: [paste]

Don't give me the answer immediately.
Ask me questions that help ME discover the bug.
```

#### 5. The Report Generator Prompt

**Purpose**: Document completed work

```markdown
Based on the changes we just made:

Generate an implementation report including:

1. Summary of what was implemented
2. Files changed and why
3. Key decisions made
4. Potential issues or tech debt
5. Testing recommendations
6. Handoff notes for the next developer/phase
```

---

## Implementation Reports

### Why Reports Matter

Every AI-assisted implementation should produce a **human-readable report** documenting:

1. **What happened** — Concrete changes made
2. **Why it happened** — Decisions and rationale
3. **What was learned** — Insights for future
4. **What's next** — Handoff information

### The Report Cycle

```
┌───────────────────┐
│   ASK AI TO DO    │
│    something      │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  AI IMPLEMENTS +  │
│  GENERATES REPORT │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  HUMAN REVIEWS    │
│  code + report    │
└────────┬──────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
APPROVE    REQUEST
& COMMIT   CHANGES
    │         │
    │         └──► (iterate)
    │
    ▼
┌───────────────────┐
│  UPDATE PLAN DOC  │
│  with learnings   │
└───────────────────┘
```

### Report Templates

#### Quick Report (for small changes)

```markdown
## Change: [Brief description]

**Files**: `src/component.tsx`, `src/utils.ts`
**Type**: Feature | Bugfix | Refactor
**Tested**: [ ] Manual [ ] Unit [ ] Integration

**Summary**: [1-2 sentences]

**AI-Assisted**: Yes/No
**Human Verified**: Yes/Pending
```

#### Full Report (for phases/features)

```markdown
## Implementation Report: [Feature Name]

### 1. Summary

[2-3 sentences describing what was accomplished]

### 2. Changes Made

| File      | Type     | Description           |
| --------- | -------- | --------------------- |
| `src/...` | Added    | New component for...  |
| `src/...` | Modified | Updated to support... |

### 3. Architecture Decisions

| Decision     | Why                               | Alternatives   |
| ------------ | --------------------------------- | -------------- |
| Used Zustand | Simpler than Redux for this scale | Context, Redux |

### 4. How It Works

[Brief explanation of the implementation]

### 5. Testing

- [x] Manual testing in browser
- [x] Unit tests for utilities
- [ ] E2E test (TODO)

### 6. Known Issues / Tech Debt

- [ ] Need to add error boundary
- [ ] Performance optimization for list

### 7. Next Steps

1. Wire to backend API
2. Add loading states
3. Write E2E test

### 8. Learning Notes

[What did I learn from this implementation?]
```

---

## MCP: The New Standard

### What is MCP (Model Context Protocol)?

MCP is an **open standard** for connecting AI models to external tools and data sources.

```
┌─────────────────────────────────────────────────────────┐
│                    MCP ARCHITECTURE                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   [AI Model] ◄──JSON-RPC──► [MCP Server]                │
│       │                          │                       │
│       │                          ├── Tools (write ops)   │
│       │                          ├── Resources (read)    │
│       │                          └── Prompts (templates) │
│       │                                                  │
│       └── Makes requests like:                          │
│           "read file X"                                 │
│           "run command Y"                               │
│           "query database Z"                            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### MCP Concepts

| Concept      | Description                | Example                       |
| ------------ | -------------------------- | ----------------------------- |
| **Server**   | Exposes capabilities to AI | filesystem, database, API     |
| **Tool**     | Write operation            | `create_file`, `run_command`  |
| **Resource** | Read operation             | `read_file`, `list_directory` |
| **Root**     | Permission boundary        | `/project` directory only     |
| **Prompt**   | Reusable template          | "code review", "explain"      |

### Why MCP Matters for You

1. **Standardization** — One protocol, many tools
2. **Control** — Define exactly what AI can access
3. **Auditability** — All tool calls are logged
4. **Security** — Capability-based permissions

### MCP in Your Workflow

```
Traditional workflow:
   Copy code → Paste into AI → Copy response → Paste back
   ❌ Context loss, manual effort, no audit trail

MCP workflow:
   AI reads your files directly → Proposes changes → You approve
   ✅ Full context, automated, auditable, controlled
```

### Setting Up MCP (Claude Desktop Example)

```json
// ~/.config/claude/claude_desktop_config.json
{
	"mcpServers": {
		"filesystem": {
			"command": "npx",
			"args": ["-y", "@anthropic/mcp-server-filesystem", "/path/to/project"]
		}
	}
}
```

### MCP Best Practices

| Practice                        | Rationale                               |
| ------------------------------- | --------------------------------------- |
| **Scope roots narrowly**        | Only give access to project directories |
| **Prefer resources over tools** | Read-only is safer than write           |
| **Audit tool calls**            | Log what AI does in your codebase       |
| **Approve destructive ops**     | Never auto-run deletes or deploys       |

---

## Practical Workflows

### Workflow 1: New Feature Development

```
┌─────────────────────────────────────────────────────────┐
│ WORKFLOW: New Feature                                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ 1. CREATE PLAN                                           │
│    └── docs/plan-feature-name.md                         │
│    └── Define phases, success criteria                   │
│                                                          │
│ 2. ASK AI TO REVIEW PLAN                                 │
│    └── "Review this plan for gaps or risks"              │
│    └── Iterate until solid                               │
│                                                          │
│ 3. FOR EACH PHASE:                                       │
│    └── Generate phase prompt                             │
│    └── AI implements + reports                           │
│    └── Human reviews, tests, approves                    │
│    └── Commit with descriptive message                   │
│                                                          │
│ 4. RETROSPECTIVE                                         │
│    └── Update plan with learnings                        │
│    └── Note patterns for reuse                           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Workflow 2: Bug Investigation

```
┌─────────────────────────────────────────────────────────┐
│ WORKFLOW: Bug Investigation                              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ 1. DESCRIBE THE BUG                                      │
│    └── Expected vs. actual behavior                      │
│    └── Steps to reproduce                                │
│                                                          │
│ 2. ASK AI TO HELP INVESTIGATE (not fix)                  │
│    └── "What could cause this? Ask me questions."        │
│    └── Let AI guide your debugging                       │
│                                                          │
│ 3. IDENTIFY ROOT CAUSE (together)                        │
│    └── You confirm the hypothesis                        │
│    └── You understand WHY it happens                     │
│                                                          │
│ 4. IMPLEMENT FIX                                         │
│    └── AI proposes fix                                   │
│    └── You verify it addresses root cause                │
│    └── AI generates report                               │
│                                                          │
│ 5. DOCUMENT                                              │
│    └── Add to knowledge base                             │
│    └── Prevent similar bugs                              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Workflow 3: Learning a New Concept

```
┌─────────────────────────────────────────────────────────┐
│ WORKFLOW: Learning                                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ 1. STATE WHAT YOU WANT TO LEARN                          │
│    └── "I want to understand [concept]"                  │
│                                                          │
│ 2. ASK FOR EXPLANATION                                   │
│    └── "Explain like I'm a junior developer"             │
│    └── "What are the common misconceptions?"             │
│                                                          │
│ 3. ASK FOR MINIMAL EXAMPLE                               │
│    └── "Show me the smallest working example"            │
│    └── Type it yourself (no copy-paste)                  │
│                                                          │
│ 4. BREAK IT                                              │
│    └── "What happens if I do X wrong?"                   │
│    └── Deliberately cause errors                         │
│                                                          │
│ 5. TEACH BACK                                            │
│    └── Explain the concept to AI                         │
│    └── "Is my understanding correct?"                    │
│                                                          │
│ 6. DOCUMENT                                              │
│    └── Write notes in your own words                     │
│    └── Add to personal knowledge base                    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## The AI Ethics Protocol

### The Non-Negotiables

| Rule                      | Why It Matters                      |
| ------------------------- | ----------------------------------- |
| **Understand every line** | You are responsible for your code   |
| **Document AI usage**     | Transparency builds trust           |
| **No secrets in prompts** | API keys, passwords, personal data  |
| **Verify security**       | AI doesn't know your threat model   |
| **Cite in deliverables**  | Academic and professional integrity |

### ⚠️ README AI Disclosure Requirement

> **MANDATORY**: Every repository using AI assistance **MUST** include a visible AI usage disclosure in the `README.md` file.

```markdown
## 🤖 AI Assistance Disclosure

This project was developed with AI assistance (Claude/GPT-4/Copilot).

**AI was used for:**

- [List specific uses: code generation, debugging, documentation, etc.]

**Human verification:**

- All code has been reviewed and understood by the author
- Security implications have been assessed
- The author takes full responsibility for the final implementation

**Methodology:** [Link to docs-first plans if applicable]
```

**Why this matters:**

1. **Academic integrity**: Transparent disclosure prevents plagiarism accusations
2. **Professional ethics**: Future employers and collaborators deserve honesty
3. **Learning accountability**: You must understand what you submit
4. **Legal clarity**: AI-generated code has complex IP implications

> 🚨 **Repositories without AI disclosure that contain AI-generated code may be flagged for academic integrity review.**

### The Documentation Standard

```javascript
// ✅ Good AI documentation
/**
 * Formats price in cents to currency string.
 * @ai-assisted Claude suggested using Intl.NumberFormat
 *              for i18n support. Verified against MDN.
 */
function formatPrice(cents: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(cents / 100);
}

// ❌ Bad: No indication of AI assistance
function formatPrice(cents) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(cents / 100);
}
```

### The Verification Checklist

Before accepting AI-generated code:

- [ ] I can explain what this code does
- [ ] I understand WHY it's written this way
- [ ] I have tested it manually
- [ ] I have checked for security issues
- [ ] I have verified edge cases
- [ ] I have considered accessibility
- [ ] I have documented the AI assistance

---

## Quick Reference

### Directory Structure for AI-Assisted Projects

```
project/
├── docs/
│   ├── plans/               # Implementation plans
│   │   ├── plan-auth.md
│   │   └── plan-cart.md
│   ├── reports/             # Implementation reports
│   │   ├── 2025-01-15-auth-phase1.md
│   │   └── 2025-01-16-auth-phase2.md
│   ├── prompts/             # Reusable prompts
│   │   ├── code-review.md
│   │   └── explain-code.md
│   └── learnings/           # Knowledge base
│       ├── react-patterns.md
│       └── security-notes.md
├── src/                     # Your code
└── tests/
```

### The Essential Commands

```bash
# Create plan document
touch docs/plans/$(date +%Y-%m-%d)-feature-name.md

# Create report after AI session
touch docs/reports/$(date +%Y-%m-%d)-phase-name.md

# Git commit with AI disclosure
git commit -m "feat: add auth flow (AI-assisted: Claude)"
```

### The Essential Prompts

**Start a session**:

> "I'm working on [project]. Here's my plan in docs/plan.md. Let's implement Phase [N]."

**Request a report**:

> "Generate an implementation report for what we just did."

**End a session**:

> "Summarize what we accomplished and what's next."

---

## Mastery Progression

### Level 1: Apprentice

- Use AI for explanations and simple code generation
- Copy-paste workflow
- Learning to ask good questions

### Level 2: Practitioner

- Docs-first methodology
- Structured prompts with context
- Request and review implementation reports
- Beginning MCP integration

### Level 3: Craftsperson

- Full MCP workflow with tool integration
- Build reusable prompt libraries
- Teach others your methodology
- Contribute to open source AI tooling

### Level 4: Master

- Design AI-augmented systems
- Create organizational AI policies
- Mentor other developers
- Shape the ethics of AI in development

---

## 🔗 Related Resources

| Resource                                                                                                    | Description                                                                                       |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [**The Tao of AI Development**]({{ site.url }}{{ site.baseurl }}/methodology/en/tao-of-ai-development/)     | 道 Philosophical addendum on ethics, craftsmanship, and the eternal struggle against garbage code |
| [Web Atelier Methodology]({{ site.url }}{{ site.baseurl }}/methodology/en/)                                 | Core pedagogy and course structure                                                                |
| [Atelier Prompt Collection]({{ site.url }}{{ site.baseurl }}/lessons/en/atelier-prompts/)                   | Curated prompts for web development                                                               |
| [Portfolio Template Brief]({{ site.url }}{{ site.baseurl }}/lessons/en/portfolio-template-brief/challenge/) | Example project using this methodology                                                            |
| [ACM Code of Ethics](https://www.acm.org/code-of-ethics)                                                    | Professional ethics guidelines                                                                    |
| [UNESCO AI Ethics](https://www.unesco.org/en/artificial-intelligence/recommendation-ethics)                 | International framework for AI ethics                                                             |

---

> _"The goal is not to replace your thinking with AI, but to amplify your thinking through AI—so that you may build things that matter for a better human living."_

---

**Authorship:** Rubén Vega Balbás, PhD (UDIT) · ORCID: [0000-0001-6862-9081](https://orcid.org/0000-0001-6862-9081)
**License:** Content CC BY-NC-SA 4.0

_Critical Coding for a Better Living._
