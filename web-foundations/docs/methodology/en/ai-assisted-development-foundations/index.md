# 🤖 AI-Assisted Development Foundations

> *"LLMs are not features. They are probabilistic reasoning engines that operate inside systems."*

---

## 📜 Table of Contents

1. [Mental Reframing](#mental-reframing)
2. [The Foundation Stack](#the-foundation-stack)
3. [Classical Software Architecture](#classical-software-architecture)
4. [Data Modeling & Semantics](#data-modeling--semantics)
5. [Beyond Prompting](#beyond-prompting)
6. [Functional Decomposition](#functional-decomposition)
7. [Security & Trust Models](#security--trust-models)
8. [Observability & Operations](#observability--operations)
9. [Knowledge Retrieval Before RAG](#knowledge-retrieval-before-rag)
10. [Connecting to MVC/MVVM](#connecting-to-mvcmvvm)
11. [The Pedagogical Ladder](#the-pedagogical-ladder)
12. [Lesson Navigation](#lesson-navigation)

---

## Mental Reframing

### The Prerequisite Before Prerequisites

Before any technical detail, internalize this shift:

```
┌─────────────────────────────────────────────────────────┐
│              THE FUNDAMENTAL INSIGHT                     │
│                                                          │
│   LLMs are PROBABILISTIC REASONING ENGINES               │
│   that operate INSIDE SYSTEMS                            │
│                                                          │
│   Everything else exists to:                             │
│   • Constrain that reasoning                             │
│   • Guide that reasoning                                 │
│   • Verify that reasoning                                │
│   • Audit that reasoning                                 │
└─────────────────────────────────────────────────────────┘
```

If you skip this reframing, AI will feel "magical" and uncontrollable.

---

## The Foundation Stack

These are the **foundations you must already control** before AI-assisted development makes sense:

```
┌─────────────────────────────────────────────────────────┐
│ 8. AGENTS, RAG, MCP ◄── Where we're going               │
├─────────────────────────────────────────────────────────┤
│ 7. Retrieval & Context Curation                         │
│ 6. Observability & Audit Trails                         │
│ 5. Capability-Based Security                            │
│ 4. Functional Decomposition                             │
│ 3. Determinism vs Probabilism                           │
│ 2. Data Modeling & Semantics                            │
│ 1. Software Contracts & Interfaces ◄── Start here       │
└─────────────────────────────────────────────────────────┘
```

---

## Classical Software Architecture

### 1.1 Client–Server & Remote Procedure Call (RPC) Models

You should be fluent in:

| Concept | What to Know |
|---------|--------------|
| **Request/Response** | HTTP lifecycle, headers, status codes |
| **RPC vs REST** | When to use each, trade-offs |
| **Stateless vs Stateful** | Session management, scaling implications |

**Why it matters for AI**:
- MCP is *JSON-RPC with schemas*
- Tool calls are RPC calls with a probabilistic caller

### 1.2 Contracts & Interfaces

| Concept | Implementation |
|---------|----------------|
| Interface segregation | Small, focused contracts |
| Input/output contracts | Defined shapes, validation |
| Versioning | Backward compatibility |

**Critical insight**:
```
Prompt strings are NOT contracts
Schemas (JSON Schema, OpenAPI, Zod, Pydantic) ARE contracts
```

---

## Data Modeling & Semantics

Modern AI systems collapse without this layer.

### 2.1 Structured vs Unstructured

| Type | Examples | AI Handling |
|------|----------|-------------|
| **Unstructured** | Free text, notes | Needs parsing/extraction |
| **Semi-structured** | JSON, Markdown | Can navigate with guidance |
| **Structured** | Typed schemas, enums | Direct processing |

> **Insight**: LLMs reason best when unstructured data is *wrapped in structure*.

### 2.2 Information vs Knowledge

| Information | Knowledge |
|-------------|-----------|
| Stored facts | Contextualized, retrievable |
| Raw data | Purpose-bound information |

This distinction explains:
- Why **RAG** exists
- Why context windows are *curated*, not *dumped*

---

## Beyond Prompting

Prompting matters—but it sits *on top of deeper concepts*.

### 3.1 Determinism vs Probabilism

| Traditional Code | LLM Output |
|------------------|------------|
| Same input → Same output | Same input → Distribution of outputs |
| Test for equality | Test for acceptable range |
| Debug step-by-step | Evaluate probabilistically |

**Implications**:
- Design **guardrails**, not instructions
- Validation happens *after* generation
- Accept non-determinism, plan for it

### 3.2 System vs User vs Tool Context

```
┌─────────────────────────────────────────────────────────┐
│               CONTEXT LAYERS                             │
├─────────────────────────────────────────────────────────┤
│ SYSTEM PROMPT (highest authority)                        │
│   └── Defines persona, constraints, capabilities         │
│                                                          │
│ USER MESSAGE (variable, untrusted)                       │
│   └── The request, potentially adversarial               │
│                                                          │
│ TOOL CONTEXT (structured, bounded)                       │
│   └── Data from tools, with schemas                      │
└─────────────────────────────────────────────────────────┘
```

Understand:
- Authority levels
- Precedence rules
- **Injection risks** (prompt injection is real)

---

## Functional Decomposition

If you practice good decomposition, agents will feel obvious.

### 4.1 Small, Composable Functions

| Principle | Why It Matters for AI |
|-----------|----------------------|
| One responsibility | Tools must be *boring* |
| Clear side-effects | Predictable outcomes |
| Idempotency | Safe to retry |

```
Reasoning happens in the model
Execution happens in tools
```

### 4.2 Read vs Write Separation

| Operation | Characteristic | MCP Mapping |
|-----------|----------------|-------------|
| **Read** | Queries, fetches | Resources |
| **Write** | Create, update, deploy | Tools |

This is not just good practice—it's required for safe AI systems.

---

## Security & Trust Models

If security is an afterthought, AI will **amplify the damage**.

### 5.1 Capability-Based Security

Instead of "who are you?" ask: **"What are you allowed to do *right now*?"**

This underlies:
- MCP roots
- Tool allowlists
- Role-scoped agents

### 5.2 Blast Radius Thinking

| Principle | Application |
|-----------|-------------|
| Least privilege | Only grant needed permissions |
| Environment isolation | Dev/staging/prod separation |
| Explicit escalation | Clear paths for elevated access |

> **Key insight**: Agents don't remove these requirements—they **force you to formalize them**.

---

## Observability & Operations

AI systems without observability are un-debuggable.

### 6.1 Event Thinking

Instead of "the AI did something," log:

```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "tool_call": "create_file",
  "inputs": { "path": "/src/component.tsx" },
  "outputs": { "success": true },
  "decision_context": "User requested new component",
  "model": "claude-3",
  "tokens_used": 1234
}
```

This enables:
- Tool-call auditing
- Reproducibility
- Postmortems

### 6.2 Human-in-the-Loop Design

| Concept | Implementation |
|---------|----------------|
| Checkpoints | Pause before destructive actions |
| Confidence thresholds | Require approval below threshold |
| Approval gates | Explicit human confirmation |

> **Mantra**: Agents are *junior interns*, not autonomous gods.

---

## Knowledge Retrieval Before RAG

RAG only makes sense if you understand the underlying concepts.

### 7.1 Indexing & Retrieval

| Concept | What It Means |
|---------|---------------|
| Search ≠ Retrieval | Finding vs. extracting relevant context |
| Relevance ranking | Not all results are equal |
| Freshness vs authority | New data vs. trusted sources |

### 7.2 Context Budgeting

| Constraint | Strategy |
|------------|----------|
| Token limits | Can't include everything |
| Prioritization | Most relevant first |
| Summarization | Compress when needed |
| Truncation | Cut when necessary |

> **RAG is not "attach a vector DB"—it's context curation engineering.**

---

## Connecting to MVC/MVVM

AI-assisted systems are a **continuation** of MVC/MVVM patterns, not a rupture.

### The Core Question (Unchanged)

> *Where does reasoning live, and how does it affect state and presentation?*

AI systems raise the same question—just with **non-deterministic reasoning**.

### MVC with AI

| MVC Component | AI-Era Interpretation |
|---------------|----------------------|
| Model | Source of truth (DB, CMS) |
| View | Human-facing UI |
| Controller | **Probabilistic Controller (LLM)** |
| Services | Tools / MCP servers |
| Validation | Schemas + post-generation checks |

**Critical shift**: The Controller no longer *decides by code*, but **proposes actions** which must be validated.

### MVVM with AI

| MVVM Component | AI-Era Interpretation |
|----------------|----------------------|
| Model | CMS / DB / APIs |
| View | Chat UI, dashboards |
| ViewModel | **LLM reasoning layer** |
| Commands | Tool calls |
| State | Structured context |

**Why this works**: An LLM:
- Does **not** render UI
- Does **not** persist data
- Does **not** execute side effects directly

*Exactly like a ViewModel.*

### MCP as Typed Commands

| MVVM Concept | MCP Equivalent |
|--------------|----------------|
| Read-only bindings | MCP Resources |
| Commands | MCP Tools |
| Compile-time safety | Schemas (runtime) |

---

## The Pedagogical Ladder

### Phase 1: Classical

- MVC with explicit controllers
- MVVM with reactive bindings

### Phase 2: Hybrid

- Controllers/ViewModels that *suggest* actions
- Validation before execution

### Phase 3: AI-Augmented

- LLM as Controller/ViewModel
- Tools as Services
- MCP as interface contracts

### Phase 4: Governance

- Audit logs
- Human approval
- Policy-based constraints

---

## The One Sentence

> **AI does not replace MVC or MVVM; it makes their discipline unavoidable.**

If you skip architecture, AI will behave like a god.
If you respect architecture, AI behaves like a junior collaborator.

---

## 🔗 Lesson Navigation

| Previous | Current | Next |
|----------|---------|------|
| [State & UI](./state-and-ui-extended.md) | **AI-Assisted Foundations** | [React Fundamentals](./react-fundamentals.md) |

---

> *"Every technical decision is an ethical decision. Every architectural choice is a trust decision."*
