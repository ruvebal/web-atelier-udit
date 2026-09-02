---
layout: lesson
title: 'Desarrollo Asistido por IA: Guía Práctica'
title_alt: 'AI-Assisted Development: A Practical Guide'
slug: ai-practical-guide
date: 2026-08-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /methodology/es/ai-practical-guide/
description: 'Protocolo de aula: cuándo planificar, cómo declarar y qué debes poder defender cuando la IA te ayuda a construir.'
tags: [ia, metodología, ética, docs-first, declaración]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

> _"Code is not written in text—it is written in understanding. The text is just the shadow of the understanding."_
> — Tao of Development, `wis-005`

**Para:** un estudiante de FE I o FE II (o de CD bajo el mismo pacto) que puede usar un asistente de IA en el trabajo de curso y aun así debe poseer cada línea que entrega.

**No es:** el manifiesto público, el primer de arquitectura, el capítulo del Tao, ni un artículo de tribuna. Esas páginas están en [Adónde ir después](#donde-ir-despues).

**Objetivo:** cuando la IA te ayuda a construir, el código sigue siendo tuyo. Esta página dice cuándo planificar, cómo declarar y qué debes poder defender.

Estas instrucciones existen para **seguirse** y luego **comprobarse** en la defensa oral. Lo completo no es el test; si puedes actuar desde esta página, sí.
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
Nodo de guía de estudio 82b3b541-0cf2-5f0a-adb9-7470db8f8a71; la identidad bibliográfica permanece [BIBLIO-GAP] en el coat de Ahmes y se conserva en el RIS del estudio.
-->
{% endif %}

---

## El pacto (obligatorio)

| Regla | Por qué es obligatoria |
| --- | --- |
| **Entiende cada línea** | La defiendes en oral. El código que no puedes explicar no es tuyo. |
| **Declara el uso de IA** | README + commit. IA no declarada es revisión de integridad. En este aula, declarar también es la ley. |
| **Nada de secretos en el prompt** | Claves, contraseñas, datos personales y archivos de cliente no van al chat. |
| **Verifica antes del commit** | La lista de abajo es lo que preguntará la defensa. |

> Platform note (comprobado agosto 2026): Cursor, Copilot y Claude Code son herramientas de este curso. Cómo las configuras es opcional. Lo que entregas no lo es.

---

<!-- KEEP: ## Marcos éticos is load-bearing. Do not strip, shorten, or move to the tribune. -->

## Marcos éticos

El pacto de arriba es **obligatorio en este curso**. Las fuentes de abajo son el porqué — internacional, europeo y profesional.

**Código de Ética ACM (Association for Computing Machinery):**

- Contribuir a la sociedad y al bienestar humano
- Evitar el daño
- Ser honesto y confiable
- Ser justo y actuar para no discriminar
- Respetar la privacidad
- Honrar la confidencialidad

**Recomendación de la UNESCO sobre la Ética de la IA (2021):**

En enseñanza, formación docente y e-learning específicamente:

> "Member States should encourage research initiatives on the responsible and ethical use of AI technologies in teaching, teacher training and e-learning, among other issues... Member States should also ensure that AI technologies empower students and teachers and enhance their experience, bearing in mind that relational and social aspects and the value of traditional forms of education are vital in teacher-student and student-student relationships... AI should support the learning process without reducing cognitive abilities and without extracting sensitive information, in compliance with relevant personal data protection standards."
> — UNESCO (2021), §104

Principios más amplios de la Recomendación (resumidos):

- **Proporcionalidad**: La IA no debe exceder lo necesario
- **Seguridad y protección**: Prevenir daños a lo largo del ciclo de vida
- **Equidad y no discriminación**: Promover la justicia social
- **Sostenibilidad**: Evaluar el impacto ambiental
- **Derecho a la privacidad**: Proteger datos personales
- **Supervisión humana**: Los humanos deben mantener el control
- **Transparencia y explicabilidad**: Entender las decisiones de IA
- **Responsabilidad y rendición de cuentas**: Atribución clara de responsabilidad

**Ley de IA de la UE — Artículo 4, Alfabetización en IA (Reglamento (UE) 2024/1689):**

> "Providers and deployers of AI systems shall take measures to ensure, to their best extent, a sufficient level of AI literacy of their staff and other persons dealing with the operation and use of AI systems on their behalf, taking into account their technical knowledge, experience, education and training and the context the AI systems are to be used in..."

El Artículo 4 convierte la alfabetización en IA en un **requisito legal vinculante** en la UE — no solo en buena pedagogía. Este curso es un ejemplo práctico de ese deber.

**Directrices de Ética para una IA Fiable (Horizonte Europa / Comisión Europea):**

Los becarios MSCA completan autoevaluaciones éticas conforme a este marco. Sus siete requisitos incluyen: agencia y supervisión humana; privacidad y gobernanza de datos; bienestar social y ambiental; y rendición de cuentas — exigiendo que desarrolladores y operadores expliquen cómo y por qué un sistema produce determinados resultados (Comisión Europea, *How to complete your ethics self-assessment*, §8).

**Policy Brief MSCA-NET sobre Inteligencia Artificial (2025):**

> "This policy brief explores the opportunities and challenges AI presents within Horizon Europe and the Marie Skłodowska-Curie Actions (MSCA)... It also offers a summary of recommendations to ensure AI research is conducted responsibly, ethically, and in line with the EU's values."
>
> "Ethical and legal risks: AI technologies can raise significant ethical and legal concerns, particularly regarding bias, discrimination, copyright issues and plagiarism. It must be ensured that AI research adheres to high ethical standards, including transparency, fairness, accountability, and non-discrimination."

Exijo de mis estudiantes el mismo estándar que mi propia red de financiación exige de mí.

**Directrices Vivas de la ERA sobre el Uso Responsable de la IA Generativa en la Investigación (Comisión Europea y Foro ERA):**

> "These guidelines intend to set out common directions on the responsible use of generative AI. While non-binding, they should be considered as a supporting tool for researchers, research organisations and research funding bodies, including the ones applying to the European Framework Programme for Research and Innovation."
>
> "Researchers, to be transparent, detail which generative AI tools have been used substantially in their research processes. When generative AI meaningfully shapes results, researchers transparently note its use according to the guidelines of their journal or standards in their discipline in the methods section (or equivalent) responsibly evaluating the extent of the contribution."
>
> "Accountability for the research from idea to publication, for its management and organisation, for training, supervision and mentoring, and for its wider societal impacts. This includes responsibility for all output that a researcher produces, underpinned by the notion of human agency and oversight."

**Recomendaciones ICMJE (2025)** — publicación académica, el mismo deber de declaración que el README de este curso:

> "At submission, the journal should require authors to disclose whether they used Artificial Intelligence (AI)-assisted technologies... Chatbots (such as ChatGPT) should not be listed as authors because they cannot be responsible for the accuracy, integrity, and originality of the work... Authors should be able to assert that there is no plagiarism in their paper, including in text and images produced by the AI. Humans must ensure there is appropriate attribution of all quoted material, including full citations."

> **Referencias:**
>
> - [Código de Ética ACM](https://www.acm.org/code-of-ethics)
> - [Recomendación UNESCO sobre Ética de la IA](https://www.unesco.org/es/artificial-intelligence/recommendation-ethics)
> - [Ley de IA de la UE (Reglamento (UE) 2024/1689)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
> - [Directrices de Ética para una IA Fiable](https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai)
> - [Directrices Vivas ERA sobre IA Generativa en la Investigación](https://research-and-innovation.ec.europa.eu/document/download/2b6cf7e5-36ac-41cb-aab5-0d32050143dc_en?filename=ec_rtd_ai-guidelines.pdf)
> - [Recomendaciones ICMJE](https://www.icmje.org/recommendations/)

---

## Cuándo hace falta un plan

| Trivial — sin plan | No trivial — plan obligatorio |
| --- | --- |
| Corregir un typo | Añadir una feature |
| Ajustar un color | Refactorizar un módulo |
| Actualizar una dependencia | Autenticación, routing, forma de los datos |
| Añadir un comentario | Componente nuevo que otros archivos importan |
| Una línea de CSS | Cambiar cómo se guarda o se pide el dato |

**Regla práctica:** más de unos 15 minutos, o más de un archivo → escribe el plan primero.

**Obligatorio** para trabajo no trivial. **Opcional:** bibliotecas de prompts, servidores MCP, escalas de maestría — viven en las lecciones, no aquí.

---

## Bucle docs-first (obligatorio si no es trivial)

1. **Plan** — `docs/plans/plan-[feature].md`. Qué, por qué, criterios de éxito. Aún no hay código.
2. **Implementar** — solo cuando hayas aprobado el plan. La IA propone; tú decides.
3. **Informe** — qué cambió, qué rechazaste, qué aún no puedes explicar.
4. **Commit humano** — tú escribes el mensaje. Tú haces push. El diff es tuyo.

```
plan → implementar → informe → commit humano
```

### Plan (corto)

```markdown
# Plan: [feature]

**Estado:** Borrador | Aprobado | Hecho

## Objetivo
[Una frase.]

## Éxito
- [ ] [criterio]
- [ ] [criterio]

## Fuera de alcance
[Lo que este plan no hará.]
```

### Después de la sesión (más corto)

```markdown
# Informe: [feature] — [fecha]

**Archivos:** `src/…`
**IA usada:** [herramienta]. **Verificado por humano:** sí / aún no.

## Qué cambió
[Dos frases.]

## Qué rechacé, y por qué
[Si nada, dilo.]

## Aún no puedo explicar
[Si esta lista no está vacía, no hagas commit.]
```

---

## Declaración en el README (obligatorio)

Todo repo que haya usado IA **debe** mostrar esto en `README.md`. Un diff con forma de IA y sin declaración puede ir a revisión de integridad.

```markdown
## Declaración de asistencia de IA

Este proyecto se desarrolló con asistencia de IA ([herramienta]).

**La IA se usó para:**
- [generación / depuración / docs — sé concreto]

**Verificación humana:**
- Puedo explicar cada línea que he entregado
- Asumo la responsabilidad completa de la implementación
```

Patrón de mensaje de commit:

```text
feat: add auth flow (AI-assisted: Cursor)
```

---

## Lista de verificación (obligatorio)

Esta es la superficie de la defensa oral. Si no puedes marcarla, no hagas commit.

- [ ] Puedo explicar qué hace este código, línea a línea si me lo piden
- [ ] Sé por qué está escrito así (no solo que funciona)
- [ ] Lo he ejecutado (navegador, test, o ambos)
- [ ] He buscado secretos, XSS y auth faltante
- [ ] He pensado en vacío, error y teclado / accesibilidad
- [ ] La declaración del README coincide con lo que usé
- [ ] El mensaje de commit nombra la herramienta si la IA ayudó

---

## Adónde ir después
{: #donde-ir-despues }

| Necesidad | Página |
| --- | --- |
| El giro de una frase | [Manifiesto]({{ '/methodology/es/ai-assisted-development-foundations/' | relative_url }}) |
| Cluster de arquitectura | [AI-assisted development]({{ '/lessons/en/ai-assisted-development/' | relative_url }}) |
| RPC, RAG, MVC como disciplina | [Architecture Foundations]({{ '/lessons/en/ai-assisted-development/foundations/' | relative_url }}) |
| Aplicar la pila en React | [Teoría y arquitectura de IA para React]({{ '/lessons/en/react/ai-assisted-development-foundations/' | relative_url }}) |
| Juramento del artesano | [Tao del desarrollo con IA]({{ '/methodology/es/tao-of-ai-development/' | relative_url }}) |
| Cómo te evalúan | [Rúbrica de declaración y defensa oral]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }}) |
| Pedagogía del curso | [Hub de metodología]({{ '/methodology/es/' | relative_url }}) |
| Specs en el prompt | [Uso de la IA: specs y arquitectura]({{ '/methodology/es/uso-ia-specs-arquitectura/' | relative_url }}) |
| FE I / FE II | [Cómo aprobar FE I]({{ '/tracks/fei/how-to-pass-this-track/' | relative_url }}) · [Cómo aprobar FE II]({{ '/tracks/feii/how-to-pass-this-track/' | relative_url }}) |

Los patrones de prompt y la configuración MCP son **opcionales**. Se enseñan en la lección de arquitectura y en el sprint de React, no en esta página.

---

## Riesgos que este curso ya ha visto

| Qué pasó | Daño | Control |
| --- | --- | --- |
| Pegar una feature entera, sin declarar | Revisión de integridad; no puedes reclamar el trabajo | README + commit |
| Entregar un diff que no puedes recorrer | Suspender la defensa oral | Lista de verificación antes del commit |
| Claves o datos personales en el chat | Fuga de credenciales; problema GDPR | Nunca pegues secretos |
| Tratar al modelo como autor | No posees la entrega | Autoría humana: defiende lo que es tuyo |

---

> _"Write code for humans first, computers second; the Tao lies in balancing both."_
> — Tao of Development, `cc-001`

**Autoría:** Rubén Vega Balbás, PhD (UDIT) · ORCID: [0000-0001-6862-9081](https://orcid.org/0000-0001-6862-9081)
**Licencia:** Contenido CC BY-NC-SA 4.0

_Critical Coding for a Better Living._
