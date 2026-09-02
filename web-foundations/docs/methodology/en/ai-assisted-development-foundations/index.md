---
layout: lesson
title: 'AI-Assisted Development Foundations'
title_alt: 'Fundamentos de Desarrollo Asistido por IA'
slug: ai-assisted-development-foundations
date: 2026-08-13
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /methodology/en/ai-assisted-development-foundations/
description: 'Public manifesto: LLMs are probabilistic reasoning engines inside systems. Architecture is how you keep them from behaving like gods.'
tags: [ai, methodology, architecture]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

> _"LLMs are not features. They are probabilistic reasoning engines that operate inside systems."_

**For:** anyone entering AI-assisted web work who needs the one shift before tools.

**Not for:** the classroom protocol ([Practical Guide]({{ '/methodology/en/ai-practical-guide/' | relative_url }})), the architecture cluster ([index]({{ '/lessons/en/ai-assisted-development/' | relative_url }})), the Tao chapter ([stub]({{ '/methodology/en/tao-of-ai-development/' | relative_url }})), or the React sprint ([AI Theory & Architecture]({{ '/lessons/en/react/ai-assisted-development-foundations/' | relative_url }})).

---

## The shift

Everything else exists to **constrain, guide, verify, and audit** that reasoning. Skip the shift and AI feels magical. Keep it and AI is a junior collaborator.

Prompts are not contracts. Schemas are. Reasoning happens in the model; execution happens in tools you allow. Agents do not remove architecture — they force you to write it down.

---

## What you must already control

Start at 1. Agents, RAG, and MCP are the top of the stack, not the entrance.

1. Software contracts and interfaces
2. Data modelling and semantics
3. Determinism vs probabilism
4. Functional decomposition (read vs write)
5. Capability-based security and blast radius
6. Observability and audit trails
7. Retrieval and context curation
8. Then — and only then — agents, RAG, MCP

---

## The ladder

| Phase | What changes |
| --- | --- |
| Classical | Explicit controllers / ViewModels |
| Hybrid | They *suggest*; validation runs before execution |
| AI-augmented | The LLM proposes; tools execute; schemas bind |
| Governance | Logs, human approval, policy |

> **AI does not replace MVC or MVVM; it makes their discipline unavoidable.**

If you skip architecture, AI behaves like a god. If you respect it, AI behaves like a junior intern. You remain the human in the loop.

---

## A live example: verify the server, not just the prompt

Point 5 above — capability-based security and blast radius — is not
abstract. On 2026-08-20, two separate MCP tooling recommendations were
checked against their real sources before adoption. Both contained
fabricated claims a plausible-sounding writeup had smoothed over: a
security-audit attribution to an organization that had never evaluated
the software, and a package name sitting unclaimed inside a real vendor's
trusted npm scope — precisely the shape of a supply-chain attack, not a
hypothetical one.

Treat an MCP server like executable supply-chain code, not like a passive
prompt: verify the publisher, inspect the capabilities it requests, pin the
version, and assume that an end-user installation may bypass the review an API
integration would normally receive. This is a course security rule pending a
fully resolved scholarly citation; it is not presented as a research finding.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
[BIBLIO-GAP] Errico, H., Sojan, S., and Ngiam, J. Securing the Model Context Protocol (MCP): Risks, Controls, and Governance (2025), arXiv:2511.20920v1. Ahmes anchor: scholar/documents/2511_20920v1_43fed367/extract/extraction.db; node 33f6f8e1-e1d7-5805-8f0e-c0ff3ec907df, p. 3; node 170c5680-e021-50cf-906a-b264284d0a2f, p. 4; evaluator_safe=no. Original quotations retained in the extraction and intentionally not published here.
-->
{% endif %}

**The lesson isn't "don't use MCP."** It's that an MCP server is a tool
you're granting execution capability to — the same discipline point 5
already asks of any interface: what can this actually do, and who
verified that. A model recommending a server is not verification. A
plausible README is not verification. Checking the registry, the
maintainer, and the actual dependency list is the minimum — and it is
exactly as necessary when the recommender is an AI as when it's a person.

## Where the rest lives

| Need | Page |
| --- | --- |
| When to plan, how to disclose, what you must defend | [Practical Guide]({{ '/methodology/en/ai-practical-guide/' | relative_url }}) |
| Contracts, decomposition, verification in React | [AI Theory & Architecture (lesson)]({{ '/lessons/en/react/ai-assisted-development-foundations/' | relative_url }}) |
| Architecture cluster (primer + React sprint) | [AI-assisted development]({{ '/lessons/en/ai-assisted-development/' | relative_url }}) |
| Craftsman's Oath | [Tao of AI Development]({{ '/methodology/en/tao-of-ai-development/' | relative_url }}) (full chapter in TTOD) |
| Course pedagogy | [Methodology hub]({{ '/methodology/en/' | relative_url }}) |

---

> _"Every technical decision is an ethical decision. Every architectural choice is a trust decision."_

**Authorship:** Rubén Vega Balbás, PhD (UDIT) · ORCID: [0000-0001-6862-9081](https://orcid.org/0000-0001-6862-9081)
**License:** Content CC BY-NC-SA 4.0

_Critical Coding for a Better Living._
