---
layout: lesson
title: 'Fundamentos de Desarrollo Asistido por IA'
title_alt: 'AI-Assisted Development Foundations'
slug: ai-assisted-development-foundations
date: 2026-08-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /methodology/es/ai-assisted-development-foundations/
description: 'Manifiesto público: los LLM son motores de razonamiento probabilístico dentro de sistemas. La arquitectura impide que se comporten como dioses.'
tags: [ia, metodología, arquitectura]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

> _"Los LLM no son funcionalidades. Son motores de razonamiento probabilístico que operan dentro de sistemas."_

**Para:** quien entra en el trabajo web asistido por IA y necesita el único giro antes de las herramientas.

**No es:** el protocolo de aula ([Guía práctica]({{ '/methodology/es/ai-practical-guide/' | relative_url }})), el cluster de arquitectura ([índice]({{ '/lessons/en/ai-assisted-development/' | relative_url }})), el capítulo del Tao ([stub]({{ '/methodology/es/tao-of-ai-development/' | relative_url }})), ni el sprint de React ([Teoría y arquitectura de IA]({{ '/lessons/en/react/ai-assisted-development-foundations/' | relative_url }})).

---

## El giro

Todo lo demás existe para **restringir, guiar, verificar y auditar** ese razonamiento. Si omites el giro, la IA parece mágica. Si lo sostienes, es un colaborador junior.

Los prompts no son contratos. Los esquemas sí. El razonamiento ocurre en el modelo; la ejecución, en las herramientas que permites. Los agentes no eliminan la arquitectura: te obligan a escribirla.

---

## Lo que ya debes controlar

Empieza en el 1. Agentes, RAG y MCP son la cima de la pila, no la puerta.

1. Contratos e interfaces de software
2. Modelado de datos y semántica
3. Determinismo frente a probabilismo
4. Descomposición funcional (lectura frente a escritura)
5. Seguridad por capacidades y radio de explosión
6. Observabilidad y trazas de auditoría
7. Recuperación y curación de contexto
8. Entonces — y solo entonces — agentes, RAG, MCP

---

## La escalera

| Fase | Qué cambia |
| --- | --- |
| Clásica | Controladores / ViewModels explícitos |
| Híbrida | *Sugieren*; la validación corre antes de ejecutar |
| Aumentada por IA | El LLM propone; las herramientas ejecutan; los esquemas atan |
| Gobernanza | Registros, aprobación humana, política |

> **La IA no sustituye MVC ni MVVM; vuelve inevitable su disciplina.**

Si omites la arquitectura, la IA se comporta como un dios. Si la respetas, se comporta como un intern junior. Tú sigues siendo el humano en el bucle.

---

## Dónde está el resto

| Necesidad | Página |
| --- | --- |
| Cuándo planificar, cómo declarar, qué debes defender | [Guía práctica]({{ '/methodology/es/ai-practical-guide/' | relative_url }}) |
| Contratos, descomposición, verificación en React | [Teoría y arquitectura de IA (lección, EN)]({{ '/lessons/en/react/ai-assisted-development-foundations/' | relative_url }}) |
| Primer de arquitectura (RPC, RAG, MVC como disciplina) | [Architecture Foundations]({{ '/lessons/en/ai-assisted-development/foundations/' | relative_url }}) |
| Cluster de arquitectura | [AI-assisted development]({{ '/lessons/en/ai-assisted-development/' | relative_url }}) |
| Juramento del artesano | [Tao del desarrollo con IA]({{ '/methodology/es/tao-of-ai-development/' | relative_url }}) (capítulo completo en TTOD) |
| Pedagogía del curso | [Hub de metodología]({{ '/methodology/es/' | relative_url }}) |
| Specs en el prompt del día a día | [Uso de la IA: specs y arquitectura]({{ '/methodology/es/uso-ia-specs-arquitectura/' | relative_url }}) |

---

> _"Cada decisión técnica es una decisión ética. Cada elección arquitectónica es una decisión de confianza."_

**Autoría:** Rubén Vega Balbás, PhD (UDIT) · ORCID: [0000-0001-6862-9081](https://orcid.org/0000-0001-6862-9081)
**Licencia:** Contenido CC BY-NC-SA 4.0

_Critical Coding for a Better Living._
