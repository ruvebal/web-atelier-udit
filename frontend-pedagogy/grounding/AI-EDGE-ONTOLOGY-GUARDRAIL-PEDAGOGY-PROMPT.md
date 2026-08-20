# Master prompt — AI Edge ontology guardrails for Web Atelier

Use this prompt to design or revise a Web Atelier unit on responsible AI-assisted frontend
development. Name the inspiration explicitly: **The AI Edge — “Guardrails for Agentic AI”** by
drC/Codesupreme. Treat it as a pedagogical and engineering design frame, not as a peer-reviewed
source or a guarantee of truth.

## Prompt

You are a frontend educator and systems designer. Build a practical, critical lesson in which
students learn that an AI agent is useful because it can propose, inspect, and act, but it is not
authorized to decide what is valid. Teach the four-layer guardrail stack:

1. prompt — guidance, not enforcement;
2. schema — shape and type enforcement;
3. validation — domain values and business rules;
4. ontology/graph constraints — typed concepts, relationships, provenance, and contradictions.

Use the Web Atelier context: a small accessible frontend feature, a content/data model, an MCP or
API tool, and a human review step. Students must implement the following loop:

```text
agent proposes a typed action
→ schema validator checks shape
→ provenance check identifies source, version, and intended use
→ SHACL/domain rules check semantic consistency
→ authorized action executes, otherwise human review
→ result and decision are recorded
```

### Learning outcomes

By the end, students can:

- explain why semantic similarity is not truth;
- distinguish an API/schema error from a domain/ontology contradiction;
- model a small domain with explicit entities, relations, ranges, and cardinalities;
- validate JSON or JSON-LD before a tool call or write;
- preserve source, version, and human-review provenance;
- design an interface that makes uncertainty, rejection, and escalation visible;
- evaluate an AI-assisted implementation with adversarial tests rather than a happy-path demo.

### Studio exercise

Have students build a small “content publishing assistant” for a frontend project. The agent may
propose creating or editing a content card, but it may not publish directly. Require:

- a typed action schema;
- a content ontology with `Person`, `Work`, `Source`, `Draft`, `Publication`, and `Review`;
- a rule that every published claim has at least one identified source;
- a rule that restricted content cannot be published without an explicit rights decision;
- a rule that conflicting source claims become `HUMAN_REVIEW_REQUIRED`;
- a visible review panel showing the proposed action, source links, validation failures, and the
  approving person;
- positive, malformed, stale-source, conflicting-source, and denied-rights fixtures.

### Teaching method

Adopt the constructive philosophy associated with The AI Edge: make a runnable artifact, write
down what happened, inspect failures, and iterate. “Nothing is a mistake; there is no win or
fail, only make” may be used as a studio invitation, but do not turn it into a claim about
learning science. Require a notebook or decision log so students can compare the agent’s proposal
with the deterministic gate and their own judgment.

### Critical guardrails

- Do not claim that ontologies make an AI truthful in general.
- Do not present a vendor course, model, or API as a neutral authority.
- Do not hide missing source metadata behind a polished citation.
- Do not let a model override a failed validation or rights decision.
- Do not publish personal, culturally restricted, or copyrighted material without a human policy
  decision.
- Treat GraphRAG/vector retrieval as discovery until the source and provenance are resolved.

### Assessment rubric

| Criterion | Excellent work demonstrates |
| --- | --- |
| Schema | malformed and extra fields are rejected deterministically |
| Ontology | entities/relations/rules are explicit and tested |
| Provenance | source, version, transformation, and reviewer are visible |
| Safety | failed gates produce no side effects |
| UX | uncertainty and escalation are understandable to a non-specialist |
| Critique | student identifies where ontology coverage is incomplete or contestable |
| Reflection | decision log separates model confidence from human authorization |

End with a short comparison: prompts guide, schemas constrain shape, validators constrain values,
ontologies constrain meaning, provenance explains origin, and people remain accountable for
ambiguous or consequential decisions.

