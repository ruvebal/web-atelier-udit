---
layout: lesson
title: 'Desarrollo Asistido por IA: Guía Práctica'
title_alt: 'AI-Assisted Development: A Practical Guide'
slug: ai-practical-guide
date: 2026-01-03
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /methodology/es/ai-practical-guide/
description: 'Guía completa para el desarrollo asistido por IA de forma ética e intencional: metodología docs-first, arquitectura de prompts, informes de implementación y consideraciones críticas.'
tags: [ia, metodología, ética, prompts, mcp, documentación]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"La IA no es el destino. La IA es la brújula que nos ayuda a navegar hacia el florecimiento humano."_

> **Declaración de Asistencia IA:** Esta guía fue desarrollada usando la metodología docs-first que describe. Los planes, prompts e informes de implementación fueron documentados a lo largo del proceso. La pedagogía se fundamenta en la experiencia de aula y la reflexión crítica sobre el rol de la IA en la educación.

---

## Filosofía: IA para una Mejor Vida Humana

### El Principio Fundamental

```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│   La IA existe para AMPLIFICAR la intención humana,     │
│   no para reemplazarla.                                  │
│                                                          │
│   Cada interacción con IA debe responder:               │
│   → ¿Me ayuda esto a entender más?                      │
│   → ¿Me ayuda a crear algo de valor?                    │
│   → ¿Me libera para enfocarme en lo que importa?        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### La Relación del Desarrollador Tao con la IA

| Mentalidad               | Práctica                                                       |
| ------------------------ | -------------------------------------------------------------- |
| **IA como Aprendiz**     | Tú eres el maestro; la IA propone, tú decides                  |
| **IA como Espejo**       | Usa la IA para reflexionar sobre tu propio pensamiento         |
| **IA como Amplificador** | Deja que la IA maneje lo mecánico; tú manejas lo significativo |
| **IA como Profesor**     | Pide a la IA que explique, no solo que haga                    |
| **IA como Par**          | Colabora, critica, itera juntos                                |

### El Test del Florecimiento Humano

Antes de cada proyecto asistido por IA, pregunta:

> 1. ¿Esta aplicación **reducirá el sufrimiento** o **aumentará la alegría**?
> 2. ¿Estoy **aprendiendo** a través de este proceso, o solo **copiando**?
> 3. ¿El yo-del-futuro me **agradecerá** por este trabajo?

---

## Consideraciones Críticas: El Impacto Más Amplio de la IA

### Entendiendo lo que Usas

Antes de aprovechar los asistentes de IA, comprende los fundamentos:

**Cómo Funcionan los LLM (Large Language Models / Modelos de Lenguaje Grande):**

- Entrenados con corpus masivos de texto de internet
- Predicen tokens siguientes basándose en patrones estadísticos
- No tienen comprensión, razonamiento o consciencia real
- Pueden alucinar (generar información plausible pero falsa)
- Reflejan los sesgos presentes en los datos de entrenamiento

**Panorama Tecnológico Actual:**

- Modelos: GPT-4, Claude, Gemini, Llama, Mistral
- Interfaces: Chat (ChatGPT, Claude.ai), integración IDE (Copilot, Cursor), APIs
- Protocolos: MCP (Model Context Protocol) para integración de herramientas

### Impacto Ambiental

```
┌─────────────────────────────────────────────────────────┐
│ 🌍 CONSIDERACIONES CLIMÁTICAS                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Entrenar GPT-4 ≈ 50.000 kg CO₂ (≈ 5 vuelos             │
│  transatlánticos por pasajero)                           │
│                                                          │
│  Cada consulta consume energía. Pregunta intencionalmente│
│                                                          │
│  Considera:                                              │
│  → ¿Es necesaria esta consulta?                          │
│  → ¿Podría encontrar esto en la documentación?           │
│  → ¿Estoy usando IA para aprender o por pereza?          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Privacidad de Datos y Seguridad

| Riesgo                           | Mitigación                                                             |
| -------------------------------- | ---------------------------------------------------------------------- |
| **Fuga de datos**                | Nunca pegues claves API, contraseñas, datos personales                 |
| **Exposición de código**         | Asume que los prompts pueden ser registrados/usados para entrenamiento |
| **Confidencialidad del cliente** | Anonimiza la lógica de negocio sensible                                |
| **Leyes RGPD/Privacidad**        | No proceses datos personales a través de IA                            |

### Concentración de la Industria Tecnológica

Sé consciente de las **dinámicas monopolísticas** en IA:

- **Fabricación de chips**: NVIDIA domina el mercado de GPUs; TSMC fabrica la mayoría de chips avanzados
- **Infraestructura cloud**: AWS, Azure, GCP controlan el cómputo de IA
- **Desarrollo de modelos**: Concentrado en pocas empresas bien financiadas
- **Datos**: El entrenamiento requiere datasets masivos, favoreciendo a los incumbentes

**Por qué esto importa para desarrolladores:**

- Riesgos de vendor lock-in
- Dependencia de sistemas propietarios
- Implicaciones éticas de apoyar la concentración
- Considera alternativas open-source (Llama, Mistral, modelos locales)

### Marcos Éticos

Nuestro uso de IA se alinea con guías éticas establecidas:

**Código de Ética ACM (Association for Computing Machinery):**

- Contribuir a la sociedad y al bienestar humano
- Evitar el daño
- Ser honesto y confiable
- Ser justo y actuar para no discriminar
- Respetar la privacidad
- Honrar la confidencialidad

**Recomendación de la UNESCO sobre la Ética de la IA (2021):**

- **Proporcionalidad**: La IA no debe exceder lo necesario
- **Seguridad y protección**: Prevenir daños a lo largo del ciclo de vida
- **Equidad y no discriminación**: Promover la justicia social
- **Sostenibilidad**: Evaluar el impacto ambiental
- **Derecho a la privacidad**: Proteger datos personales
- **Supervisión humana**: Los humanos deben mantener el control
- **Transparencia y explicabilidad**: Entender las decisiones de IA
- **Responsabilidad y rendición de cuentas**: Atribución clara de responsabilidad

> 📚 **Referencias:**
>
> - [Código de Ética ACM](https://www.acm.org/code-of-ethics)
> - [Recomendación UNESCO sobre Ética de la IA](https://www.unesco.org/es/artificial-intelligence/recommendation-ethics)

---

## La Metodología Docs-First

### El Enfoque de Dos Fases (No Negociable)

Para **cualquier tarea no trivial**, las interacciones con IA deben seguir:

```
┌─────────────────────────────────────────────────────────┐
│           EL ENFOQUE DE DOS FASES                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  FASE 1: PLANIFICACIÓN                                   │
│  ─────────────────────                                   │
│  → Solicita a la IA que genere un plan de desarrollo     │
│  → Documenta en ./docs/plan1.md, plan2.md, etc.          │
│  → Revisa y aprueba antes de proceder                    │
│                                                          │
│  FASE 2: IMPLEMENTACIÓN                                  │
│  ──────────────────────                                  │
│  → Solo después de documentar el plan                    │
│  → La IA implementa según el plan                        │
│  → Genera informe de implementación                      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Por qué esto importa:**

- **Arquitectura intencional**: Previene la generación de código sin rumbo
- **Consciencia**: Te obliga a pensar antes de codificar
- **Rastro de auditoría**: Documenta decisiones para referencia futura
- **Aprendizaje**: Planificar te enseña a descomponer problemas
- **Debugging**: A las 2 AM, te agradecerás por la documentación

### ¿Qué Cuenta como "No Trivial"?

| Trivial (sin plan necesario) | No trivial (plan requerido)    |
| ---------------------------- | ------------------------------ |
| Corregir un typo             | Añadir una nueva funcionalidad |
| Ajustar un valor de color    | Refactorizar un módulo         |
| Actualizar una dependencia   | Implementar autenticación      |
| Añadir un comentario         | Crear un nuevo componente      |
| Ajuste CSS simple            | Cambiar arquitectura de datos  |

**Regla general**: Si toma más de 15 minutos o toca múltiples archivos, crea un plan.

### El Flujo de Trabajo Completo

```
┌─────────────────────────────────────────────────────────┐
│           EL FLUJO DOCS-FIRST                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. CREAR EL PLAN (docs/plan-nombre-feature.md)          │
│     └── Plan de implementación estilo Confluence         │
│     └── Fases, resultados, criterios de éxito            │
│                                                          │
│  2. GENERAR PROMPTS (uno por fase)                       │
│     └── Cada fase tiene un prompt adaptado               │
│     └── El prompt incluye contexto, restricciones, salida│
│                                                          │
│  3. EJECUTAR CON INFORMES                                │
│     └── La IA genera la implementación                   │
│     └── La IA genera informe de implementación           │
│     └── Humano revisa, aprueba, hace commit              │
│                                                          │
│  4. ITERAR Y DOCUMENTAR                                  │
│     └── Actualizar plan con aprendizajes                 │
│     └── Construir base de conocimiento para el futuro    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Plantilla de Documento de Plan

**Ubicación**: `docs/plan-[nombre-feature].md`

```markdown
# Plan de Implementación: [Nombre del Feature]

> **Creado**: [Fecha] > **Estado**: Borrador | En Progreso | Completo
> **Modelo IA**: Claude/GPT-4/Copilot

---

## 1. Visión General

### Objetivo

[¿Qué estamos construyendo y por qué?]

### Criterios de Éxito

- [ ] Criterio 1
- [ ] Criterio 2
- [ ] Criterio 3

### Restricciones

- Tiempo: [X días/semanas]
- Tech: [Stack requerido]
- Dependencias: [Sistemas externos]

---

## 2. Fases

### Fase 1: [Nombre]

**Meta**: [Una oración]
**Entregables**:

- [ ] Entregable 1
- [ ] Entregable 2

**Prompt para esta fase**:

> [A generar]

**Informe de Implementación**:

> [A completar después de la ejecución]

---

## 3. Decisiones de Arquitectura

| Decisión   | Justificación | Alternativas Consideradas |
| ---------- | ------------- | ------------------------- |
| [Elección] | [Por qué]     | [Otras opciones]          |

---

## 4. Aprendizajes y Retrospectiva

[Completar después de finalizar]
```

---

## Arquitectura de Prompts

### Anatomía de un Prompt

Un prompt bien estructurado tiene **capas**:

```
┌─────────────────────────────────────────────────────────┐
│ CAPA 1: ROL Y CONTEXTO                                   │
│ "Eres un desarrollador senior React ayudándome a..."     │
├─────────────────────────────────────────────────────────┤
│ CAPA 2: CONOCIMIENTO                                     │
│ "Aquí está la estructura actual del código: [tree]"      │
│ "Aquí están los archivos relevantes: [contenidos]"       │
├─────────────────────────────────────────────────────────┤
│ CAPA 3: TAREA                                            │
│ "Implementa [feature específico] siguiendo [patrón]"     │
├─────────────────────────────────────────────────────────┤
│ CAPA 4: RESTRICCIONES                                    │
│ "Debe usar TypeScript, no debe romper tests existentes"  │
├─────────────────────────────────────────────────────────┤
│ CAPA 5: FORMATO DE SALIDA                                │
│ "Proporciona: 1) Código, 2) Explicación, 3) Informe"     │
└─────────────────────────────────────────────────────────┘
```

### Biblioteca de Patrones de Prompts

#### 1. El Prompt Explicador

**Propósito**: Entender código existente o conceptos

```markdown
Explica [concepto/código] como si enseñaras a un desarrollador junior.
Incluye:

1. Qué hace
2. Por qué existe
3. Cómo funciona paso a paso
4. Errores comunes
5. Mejores prácticas
```

#### 2. El Prompt Arquitecto

**Propósito**: Diseñar antes de implementar

```markdown
Necesito implementar [feature].

Antes de escribir código, por favor:

1. Propón 2-3 enfoques arquitectónicos
2. Compara trade-offs de cada uno
3. Recomienda uno con justificación
4. Esboza los pasos de implementación

No escribas código aún—quiero entender el diseño primero.
```

#### 3. El Prompt Revisor

**Propósito**: Análisis crítico de código

```markdown
Revisa este código críticamente:
[pegar código]

Analiza:

1. Corrección
2. Vulnerabilidades de seguridad
3. Problemas de rendimiento
4. Preocupaciones de mantenibilidad
5. Mejoras sugeridas

Sé duro pero constructivo.
```

#### 4. El Prompt Rubber Duck

**Propósito**: Depurar explicando

```markdown
Tengo un bug. Déjame explicar qué espero vs. qué sucede:

Esperado: [descripción]
Actual: [descripción]
Código: [pegar]

No me des la respuesta inmediatamente.
Hazme preguntas que me ayuden a MÍ a descubrir el bug.
```

#### 5. El Prompt Generador de Informes

**Propósito**: Documentar trabajo completado

```markdown
Basándote en los cambios que acabamos de hacer:

Genera un informe de implementación incluyendo:

1. Resumen de lo implementado
2. Archivos cambiados y por qué
3. Decisiones clave tomadas
4. Posibles problemas o deuda técnica
5. Recomendaciones de testing
6. Notas de handoff para el siguiente desarrollador/fase
```

---

## Informes de Implementación

### Por Qué Importan los Informes

Cada implementación asistida por IA debe producir un **informe legible por humanos** documentando:

1. **Qué pasó** — Cambios concretos realizados
2. **Por qué pasó** — Decisiones y justificación
3. **Qué se aprendió** — Insights para el futuro
4. **Qué sigue** — Información de handoff

### El Ciclo de Informes

```
┌───────────────────┐
│   PEDIR A IA QUE  │
│   haga algo       │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  IA IMPLEMENTA +  │
│  GENERA INFORME   │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  HUMANO REVISA    │
│  código + informe │
└────────┬──────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
APROBAR    SOLICITAR
& COMMIT   CAMBIOS
    │         │
    │         └──► (iterar)
    │
    ▼
┌───────────────────┐
│  ACTUALIZAR DOC   │
│  con aprendizajes │
└───────────────────┘
```

### Plantillas de Informes

#### Informe Rápido (para cambios pequeños)

```markdown
## Cambio: [Descripción breve]

**Archivos**: `src/component.tsx`, `src/utils.ts`
**Tipo**: Feature | Bugfix | Refactor
**Testeado**: [ ] Manual [ ] Unit [ ] Integration

**Resumen**: [1-2 oraciones]

**Asistido por IA**: Sí/No
**Verificado por Humano**: Sí/Pendiente
```

#### Informe Completo (para fases/features)

```markdown
## Informe de Implementación: [Nombre del Feature]

### 1. Resumen

[2-3 oraciones describiendo lo logrado]

### 2. Cambios Realizados

| Archivo   | Tipo       | Descripción                  |
| --------- | ---------- | ---------------------------- |
| `src/...` | Añadido    | Nuevo componente para...     |
| `src/...` | Modificado | Actualizado para soportar... |

### 3. Decisiones de Arquitectura

| Decisión     | Por qué                               | Alternativas   |
| ------------ | ------------------------------------- | -------------- |
| Usar Zustand | Más simple que Redux para esta escala | Context, Redux |

### 4. Cómo Funciona

[Explicación breve de la implementación]

### 5. Testing

- [x] Testing manual en navegador
- [x] Tests unitarios para utilidades
- [ ] Test E2E (TODO)

### 6. Problemas Conocidos / Deuda Técnica

- [ ] Necesita añadir error boundary
- [ ] Optimización de rendimiento para lista

### 7. Próximos Pasos

1. Conectar a API backend
2. Añadir estados de carga
3. Escribir test E2E

### 8. Notas de Aprendizaje

[¿Qué aprendí de esta implementación?]
```

---

## MCP: El Nuevo Estándar

### ¿Qué es MCP (Model Context Protocol)?

MCP es un **estándar abierto** para conectar modelos de IA con herramientas externas y fuentes de datos.

```
┌─────────────────────────────────────────────────────────┐
│                    ARQUITECTURA MCP                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   [Modelo IA] ◄──JSON-RPC──► [Servidor MCP]             │
│       │                          │                       │
│       │                          ├── Tools (ops escritura)│
│       │                          ├── Resources (lectura) │
│       │                          └── Prompts (plantillas)│
│       │                                                  │
│       └── Hace peticiones como:                         │
│           "leer archivo X"                              │
│           "ejecutar comando Y"                          │
│           "consultar base de datos Z"                   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Conceptos MCP

| Concepto     | Descripción             | Ejemplo                       |
| ------------ | ----------------------- | ----------------------------- |
| **Server**   | Expone capacidades a IA | filesystem, database, API     |
| **Tool**     | Operación de escritura  | `create_file`, `run_command`  |
| **Resource** | Operación de lectura    | `read_file`, `list_directory` |
| **Root**     | Límite de permisos      | Solo directorio `/project`    |
| **Prompt**   | Plantilla reutilizable  | "code review", "explain"      |

### Por Qué MCP Importa para Ti

1. **Estandarización** — Un protocolo, muchas herramientas
2. **Control** — Define exactamente qué puede acceder la IA
3. **Auditabilidad** — Todas las llamadas a tools se registran
4. **Seguridad** — Permisos basados en capacidades

### MCP en Tu Flujo de Trabajo

```
Flujo tradicional:
   Copiar código → Pegar en IA → Copiar respuesta → Pegar de vuelta
   ❌ Pérdida de contexto, esfuerzo manual, sin rastro de auditoría

Flujo MCP:
   IA lee tus archivos directamente → Propone cambios → Tú apruebas
   ✅ Contexto completo, automatizado, auditable, controlado
```

### Mejores Prácticas MCP

| Práctica                           | Justificación                             |
| ---------------------------------- | ----------------------------------------- |
| **Limita roots estrictamente**     | Solo da acceso a directorios del proyecto |
| **Prefiere resources sobre tools** | Solo-lectura es más seguro que escritura  |
| **Audita llamadas a tools**        | Registra lo que la IA hace en tu código   |
| **Aprueba ops destructivas**       | Nunca auto-ejecutes deletes o deploys     |

---

## Flujos de Trabajo Prácticos

### Flujo 1: Desarrollo de Nueva Funcionalidad

```
┌─────────────────────────────────────────────────────────┐
│ FLUJO: Nueva Funcionalidad                               │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ 1. CREAR PLAN                                            │
│    └── docs/plan-nombre-feature.md                       │
│    └── Definir fases, criterios de éxito                 │
│                                                          │
│ 2. PEDIR A IA QUE REVISE EL PLAN                         │
│    └── "Revisa este plan por gaps o riesgos"             │
│    └── Iterar hasta que esté sólido                      │
│                                                          │
│ 3. PARA CADA FASE:                                       │
│    └── Generar prompt de fase                            │
│    └── IA implementa + reporta                           │
│    └── Humano revisa, testea, aprueba                    │
│    └── Commit con mensaje descriptivo                    │
│                                                          │
│ 4. RETROSPECTIVA                                         │
│    └── Actualizar plan con aprendizajes                  │
│    └── Notar patrones para reusar                        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Flujo 2: Investigación de Bugs

```
┌─────────────────────────────────────────────────────────┐
│ FLUJO: Investigación de Bugs                             │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ 1. DESCRIBIR EL BUG                                      │
│    └── Comportamiento esperado vs. actual                │
│    └── Pasos para reproducir                             │
│                                                          │
│ 2. PEDIR A IA QUE AYUDE A INVESTIGAR (no arreglar)       │
│    └── "¿Qué podría causar esto? Hazme preguntas."       │
│    └── Deja que IA guíe tu debugging                     │
│                                                          │
│ 3. IDENTIFICAR CAUSA RAÍZ (juntos)                       │
│    └── Tú confirmas la hipótesis                         │
│    └── Tú entiendes POR QUÉ sucede                       │
│                                                          │
│ 4. IMPLEMENTAR ARREGLO                                   │
│    └── IA propone fix                                    │
│    └── Tú verificas que aborda la causa raíz             │
│    └── IA genera informe                                 │
│                                                          │
│ 5. DOCUMENTAR                                            │
│    └── Añadir a base de conocimiento                     │
│    └── Prevenir bugs similares                           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Flujo 3: Aprender un Nuevo Concepto

```
┌─────────────────────────────────────────────────────────┐
│ FLUJO: Aprendizaje                                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ 1. DECLARAR QUÉ QUIERES APRENDER                         │
│    └── "Quiero entender [concepto]"                      │
│                                                          │
│ 2. PEDIR EXPLICACIÓN                                     │
│    └── "Explica como si fuera un desarrollador junior"   │
│    └── "¿Cuáles son los malentendidos comunes?"          │
│                                                          │
│ 3. PEDIR EJEMPLO MÍNIMO                                  │
│    └── "Muéstrame el ejemplo funcional más pequeño"      │
│    └── Escríbelo tú mismo (no copy-paste)                │
│                                                          │
│ 4. ROMPERLO                                              │
│    └── "¿Qué pasa si hago X mal?"                        │
│    └── Causa errores deliberadamente                     │
│                                                          │
│ 5. ENSEÑAR DE VUELTA                                     │
│    └── Explica el concepto a la IA                       │
│    └── "¿Es correcto mi entendimiento?"                  │
│                                                          │
│ 6. DOCUMENTAR                                            │
│    └── Escribe notas en tus propias palabras             │
│    └── Añade a tu base de conocimiento personal          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## El Protocolo de Ética IA

### Los No Negociables

| Regla                       | Por Qué Importa                           |
| --------------------------- | ----------------------------------------- |
| **Entiende cada línea**     | Tú eres responsable de tu código          |
| **Documenta el uso de IA**  | La transparencia construye confianza      |
| **Sin secretos en prompts** | Claves API, contraseñas, datos personales |
| **Verifica seguridad**      | La IA no conoce tu modelo de amenazas     |
| **Cita en entregables**     | Integridad académica y profesional        |

### ⚠️ Requisito de Declaración de IA en README

> **OBLIGATORIO**: Todo repositorio que use asistencia de IA **DEBE** incluir una declaración visible de uso de IA en el archivo `README.md`.

```markdown
## 🤖 Declaración de Asistencia IA

Este proyecto fue desarrollado con asistencia de IA (Claude/GPT-4/Copilot).

**La IA se usó para:**
- [Lista usos específicos: generación de código, debugging, documentación, etc.]

**Verificación humana:**
- Todo el código ha sido revisado y comprendido por el autor
- Las implicaciones de seguridad han sido evaluadas
- El autor asume total responsabilidad por la implementación final

**Metodología:** [Enlace a planes docs-first si aplica]
```

**Por qué esto importa:**

1. **Integridad académica**: La declaración transparente previene acusaciones de plagio
2. **Ética profesional**: Futuros empleadores y colaboradores merecen honestidad
3. **Responsabilidad de aprendizaje**: Debes entender lo que entregas
4. **Claridad legal**: El código generado por IA tiene implicaciones de PI complejas

> 🚨 **Los repositorios sin declaración de IA que contengan código generado por IA pueden ser marcados para revisión de integridad académica.**

### El Estándar de Documentación

```javascript
// ✅ Buena documentación de IA
/**
 * Formatea precio en centavos a string de moneda.
 * @ai-assisted Claude sugirió usar Intl.NumberFormat
 *              para soporte i18n. Verificado contra MDN.
 */
function formatPrice(cents: number): string {
	return new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currency: 'EUR',
	}).format(cents / 100);
}

// ❌ Malo: Sin indicación de asistencia IA
function formatPrice(cents) {
	return new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currency: 'EUR',
	}).format(cents / 100);
}
```

### La Lista de Verificación

Antes de aceptar código generado por IA:

- [ ] Puedo explicar qué hace este código
- [ ] Entiendo POR QUÉ está escrito así
- [ ] Lo he testeado manualmente
- [ ] He verificado problemas de seguridad
- [ ] He verificado casos límite
- [ ] He considerado accesibilidad
- [ ] He documentado la asistencia IA

---

## Referencia Rápida

### Estructura de Directorios para Proyectos Asistidos por IA

```
proyecto/
├── docs/
│   ├── plans/               # Planes de implementación
│   │   ├── plan-auth.md
│   │   └── plan-cart.md
│   ├── reports/             # Informes de implementación
│   │   ├── 2025-01-15-auth-fase1.md
│   │   └── 2025-01-16-auth-fase2.md
│   ├── prompts/             # Prompts reutilizables
│   │   ├── code-review.md
│   │   └── explain-code.md
│   └── learnings/           # Base de conocimiento
│       ├── react-patterns.md
│       └── security-notes.md
├── src/                     # Tu código
└── tests/
```

### Los Comandos Esenciales

```bash
# Crear documento de plan
touch docs/plans/$(date +%Y-%m-%d)-nombre-feature.md

# Crear informe después de sesión IA
touch docs/reports/$(date +%Y-%m-%d)-nombre-fase.md

# Git commit con declaración de IA
git commit -m "feat: añadir flujo auth (IA-asistido: Claude)"
```

### Los Prompts Esenciales

**Iniciar una sesión**:

> "Estoy trabajando en [proyecto]. Aquí está mi plan en docs/plan.md. Implementemos la Fase [N]."

**Solicitar un informe**:

> "Genera un informe de implementación de lo que acabamos de hacer."

**Terminar una sesión**:

> "Resume lo que logramos y qué sigue."

---

## Progresión de Maestría

### Nivel 1: Aprendiz

- Usa IA para explicaciones y generación de código simple
- Flujo de copy-paste
- Aprendiendo a hacer buenas preguntas

### Nivel 2: Practicante

- Metodología docs-first
- Prompts estructurados con contexto
- Solicita y revisa informes de implementación
- Comenzando integración MCP

### Nivel 3: Artesano

- Flujo MCP completo con integración de herramientas
- Construye bibliotecas de prompts reutilizables
- Enseña tu metodología a otros
- Contribuye a tooling IA open source

### Nivel 4: Maestro

- Diseña sistemas aumentados por IA
- Crea políticas organizacionales de IA
- Mentoriza a otros desarrolladores
- Da forma a la ética de la IA en desarrollo

---

## 🔗 Recursos Relacionados

| Recurso                                                                                                         | Descripción                              |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [**El Tao del Desarrollo con IA**]({{ site.url }}{{ site.baseurl }}/methodology/es/tao-of-ai-development/) | 道 Addendum filosófico sobre ética, artesanía y la lucha eterna contra el código basura |
| [Metodología Web Atelier]({{ site.url }}{{ site.baseurl }}/methodology/es/)                                     | Pedagogía central y estructura del curso |
| [Colección de Prompts del Atelier]({{ site.url }}{{ site.baseurl }}/lessons/en/atelier-prompts/)                | Prompts curados para desarrollo web      |
| [Brief de Plantilla Portfolio]({{ site.url }}{{ site.baseurl }}/lessons/en/portfolio-template-brief/challenge/) | Proyecto ejemplo usando esta metodología |
| [Código de Ética ACM](https://www.acm.org/code-of-ethics)                                                       | Guías de ética profesional               |
| [Ética IA UNESCO](https://www.unesco.org/es/artificial-intelligence/recommendation-ethics)                      | Marco internacional para ética de IA     |

---

> _"El objetivo no es reemplazar tu pensamiento con IA, sino amplificar tu pensamiento a través de IA—para que puedas construir cosas que importen para una mejor vida humana."_

---

**Autoría:** Rubén Vega Balbás, PhD (UDIT) · ORCID: [0000-0001-6862-9081](https://orcid.org/0000-0001-6862-9081)
**Licencia:** Contenido CC BY-NC-SA 4.0

_Critical Coding for a Better Living._
