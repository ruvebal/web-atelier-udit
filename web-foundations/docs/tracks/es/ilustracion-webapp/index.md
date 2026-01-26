---
layout: lesson
title: 'Ilustración Aplicada: Productos Digitales Web-App'
title_alt: 'Ilustración Aplicada: Productos Digitales Web-App'
slug: ilustracion-webapp
date: 2026-01-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/ilustracion-webapp/
description: 'Track intensivo de 4 sesiones con desarrollo asistido por IA, visión de producto, arquitectura profesional y criterios de diseño nivel Awwwards. Para ilustradores que quieren publicar su arte en la web.'
tags:
 [
  ilustracion,
  web,
  webapp,
  atelier,
  html,
  css,
  javascript,
  responsive,
  ux,
  media,
  portfolio,
  ai-assisted,
  product-management,
  awwwards,
 ]
status: borrador
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"La IA no es el destino. La IA es la brújula que nos ayuda a navegar hacia el florecimiento humano."_

> **Declaración de Asistencia IA:** Este track integra desarrollo asistido por IA siguiendo la metodología docs-first. Planes, prompts e informes de implementación se documentan durante todo el proceso. La pedagogía está fundamentada en la experiencia de aula y la reflexión crítica sobre el rol de la IA en la educación.

---

## 🎯 Visión del Track

Este track transforma el aprendizaje tradicional de desarrollo web en un **sprint de producto profesional**. En 4 sesiones intensivas (14 horas totales), pasarás de cero a un **portfolio digital nivel premio** utilizando:

- **🤖 Desarrollo Asistido por IA** — Metodología docs-first con planificación antes de implementación
- **📊 Visión de Product Manager** — Cada decisión responde a necesidades de usuario y objetivos de negocio
- **🏗️ Enfoque Arquitectónico** — Pensamiento sistémico, patrones reutilizables, código mantenible
- **🏆 Criterios Awwwards** — Estándares de diseño visual, UX, técnica e innovación de nivel industria

```
┌─────────────────────────────────────────────────────────┐
│                    FILOSOFÍA DEL TRACK                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Publicar rápido. Diseñar con excelencia.              │
│   Codificar profesionalmente. Presentar con confianza.  │
│                                                          │
│   No eres estudiante haciendo ejercicios.               │
│   Eres creador/a construyendo tu portfolio profesional. │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Contexto

Este módulo está diseñado para estudiantes de **Ilustración Aplicada** que desean expandir sus habilidades creativas al entorno digital, centrándose en el desarrollo de productos web y aplicaciones interactivas. El curso asume que los estudiantes tienen una sólida base en principios visuales y de diseño, pero poca o ninguna experiencia en programación.

### Perfil del estudiante

- **Formación artística**: Background en ilustración, diseño gráfico o artes visuales
- **Interés digital**: Curiosidad por cómo sus habilidades creativas pueden aplicarse a medios interactivos
- **Nivel técnico**: Principiantes en programación, con disposición para aprender
- **Objetivos profesionales**: Diseñadores UX/UI, desarrolladores front-end creativos, artistas digitales

---

## 🤖 Desarrollo Asistido por IA (Docs-First)

Este track integra la **[Guía Práctica de Desarrollo Asistido por IA]({{ '/methodology/es/ai-practical-guide/' | relative_url }})** como metodología central.

### El Enfoque de Dos Fases (No Negociable)

Para **cualquier tarea no trivial**, las interacciones con IA deben seguir:

```
┌─────────────────────────────────────────────────────────┐
│           EL ENFOQUE DE DOS FASES                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  FASE 1: PLANIFICACIÓN                                   │
│  ─────────────────────                                   │
│  → Solicita a la IA generar un plan de desarrollo        │
│  → Documenta en ./docs/plan-[feature].md                 │
│  → Revisa y aprueba antes de proceder                    │
│                                                          │
│  FASE 2: IMPLEMENTACIÓN                                  │
│  ─────────────────────────                               │
│  → Solo después de documentar el plan                    │
│  → La IA implementa según el plan                        │
│  → Genera informe de implementación                      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Por qué importa**:

- **Arquitectura intencional**: Previene generación de código sin rumbo
- **Consciencia**: Te obliga a pensar antes de codificar
- **Trazabilidad**: Documenta decisiones para referencia futura
- **Aprendizaje**: Planificar enseña a descomponer problemas
- **Debugging**: A las 2 AM, te agradecerás la documentación

### Patrones de Prompts

#### Patrón 1: El Prompt de Planificación

**Usa cuando**: Inicias cualquier feature o componente nuevo

```markdown
Genera un plan de desarrollo para [nombre del feature] con:

1. Visión general y criterios de éxito
2. Fases de implementación con entregables específicos
3. Decisiones de arquitectura y trade-offs
4. Prompts específicos para cada fase
5. Estrategia de testing

Documenta esto en formato docs/plan-[nombre-feature].md.
No implementes todavía—solo planificación.
```

#### Patrón 2: El Prompt Arquitecto

**Usa cuando**: Evalúas opciones de diseño

```markdown
Necesito implementar [feature]. Antes de escribir código:

1. Propón 2-3 enfoques arquitectónicos
2. Compara trade-offs de cada uno (rendimiento, mantenibilidad, complejidad)
3. Recomienda uno con justificación detallada
4. Describe los pasos de implementación

No escribas código todavía—quiero entender el diseño primero.
```

#### Patrón 3: El Prompt de Implementación

**Usa cuando**: Ejecutas una fase planificada

```markdown
Siguiendo el plan en docs/plan-[feature].md, implementa la Fase [N]:

[Descripción específica de la tarea]

Restricciones:

- Sigue el sistema de diseño en assets/css/style.css
- Asegura contraste WCAG AA (4.5:1 para texto)
- Mobile-first responsive (320px a 1920px)
- Progressive enhancement (funciona sin JS)
- Usa elementos HTML5 semánticos

Después de implementar, genera un informe documentando:

1. Archivos modificados y por qué
2. Decisiones clave tomadas
3. Recomendaciones de testing
4. Notas de handoff para la siguiente fase
```

#### Patrón 4: El Prompt Revisor

**Usa cuando**: Control de calidad y code review

```markdown
Revisa este [HTML/CSS/JS] críticamente:

[pega código]

Analiza:

1. Corrección y funcionalidad
2. Cumplimiento de accesibilidad WCAG AA
3. Problemas de rendimiento
4. Vulnerabilidades de seguridad
5. Preocupaciones de mantenibilidad
6. Mejoras sugeridas

Sé duro pero constructivo.
```

#### Patrón 5: El Prompt Rubber Duck

**Usa cuando**: Debugging (te ayuda a descubrir la solución)

```markdown
Tengo un bug. Déjame explicar qué espero vs. qué pasa:

Esperado: [descripción]
Actual: [descripción]
Código: [pega]

No me des la respuesta inmediatamente.
Hazme preguntas que me ayuden A MÍ a descubrir el bug.
```

### ✅ Buen Uso de IA

- **Planifica primero**: Siempre crea documento de plan para features no triviales
- **Ingeniería de prompts**: Preguntas específicas, ricas en contexto, con restricciones
- **Generación de código**: Genera boilerplate después de planificar
- **Resolución de problemas**: Usa prompts "Rubber Duck" para descubrir bugs tú mismo/a
- **Documentación**: Genera informes de implementación después de cada fase
- **Exploración de diseño**: Pide 2-3 opciones con trade-offs
- **Accesibilidad**: Solicita cumplimiento WCAG AA en cada prompt

### ❌ Mal Uso de IA

- Copiar código sin entenderlo
- **Saltarse la fase de planificación** (error más crítico)
- No testear código generado por IA
- Ignorar accesibilidad y rendimiento
- Dejar que la IA tome decisiones creativas por ti
- No documentar el trabajo asistido por IA

---

## 📊 Framework de Product Management

Cada sesión sigue un **ciclo de desarrollo de producto**:

```
┌─────────────────────────────────────────────────────────┐
│              CICLO DE PRODUCTO POR SESIÓN                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. DISCOVERY    → Investigación, análisis, necesidades │
│  2. DEFINITION   → Alcance, requisitos, métricas        │
│  3. DESIGN       → Wireframes, sistema visual, patrones │
│  4. DEVELOPMENT  → Construir, testear, iterar           │
│  5. DELIVERY     → Deploy, medir, recoger feedback      │
│  6. OPTIMIZATION → Refinar basándose en datos           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Pensamiento de Producto

Antes de cada feature, pregunta:

| Pregunta                    | Por qué importa                |
| --------------------------- | ------------------------------ |
| **¿Quién** es el usuario?   | Define audiencia y contexto    |
| **¿Qué** problema resuelve? | Justifica el esfuerzo          |
| **¿Por qué** ahora?         | Prioriza correctamente         |
| **¿Cómo** medimos éxito?    | Define criterios objetivos     |
| **¿Qué** sacrificamos?      | Gestiona scope conscientemente |

---

## 🏆 Criterios de Diseño Nivel Awwwards

Tu proyecto será evaluado con estándares de industria:

### Diseño Visual (30%)

| Criterio                 | Descripción                      | Indicadores                      |
| ------------------------ | -------------------------------- | -------------------------------- |
| **Excelencia estética**  | Armonía visual, paleta coherente | Paleta definida, uso consistente |
| **Maestría tipográfica** | Jerarquía clara, legibilidad     | Escala modular, contraste        |
| **Composición**          | Balance, espacio blanco, ritmo   | Grids, alineación, respiración   |
| **Originalidad**         | Voz única, diferenciación        | Identidad reconocible            |

### Experiencia de Usuario (30%)

| Criterio                 | Descripción                      | Indicadores                      |
| ------------------------ | -------------------------------- | -------------------------------- |
| **Navegación intuitiva** | Encontrar contenido sin fricción | 3 clics máximo a cualquier punto |
| **Micro-interacciones**  | Feedback visual y táctil         | Estados hover, focus, active     |
| **Rendimiento**          | Carga rápida, fluida             | < 3s carga, 60fps animaciones    |
| **Accesibilidad**        | Usable por todos                 | WCAG AA, teclado, lectores       |

### Ejecución Técnica (25%)

| Criterio                    | Descripción                        | Indicadores                      |
| --------------------------- | ---------------------------------- | -------------------------------- |
| **Calidad de código**       | Limpio, mantenible, semántico      | HTML válido, CSS organizado      |
| **Diseño responsive**       | Funciona en todos los dispositivos | 320px a 1920px sin roturas       |
| **Progressive enhancement** | Funciona sin JS                    | Core experience sin dependencias |
| **Estándares modernos**     | HTML5, CSS Grid/Flexbox, ES6+      | Sintaxis actual, no legacy       |

### Innovación y Concepto (15%)

| Criterio            | Descripción                  | Indicadores                 |
| ------------------- | ---------------------------- | --------------------------- |
| **Riesgo creativo** | Exploración, experimentación | Algo que no has hecho antes |
| **Narrativa**       | Historia coherente           | Conexión entre elementos    |
| **Propósito**       | Claridad de intención        | Mensaje claro en 5 segundos |

### ¿Qué puedes construir en este módulo?

Ejemplos de proyectos que desarrollarás:

- **Portfolio digital interactivo**: Presenta tu obra con animaciones sutiles y navegación fluida
- **Web art piece**: Una ilustración que responde al usuario, con micro-interacciones y transiciones
- **Versión digital de obra impresa**: Transforma tu libro ilustrado, cómic o zine a experiencia web
- **Landing page de proyecto**: Presenta tu serie de ilustraciones con contexto y narrativa
- **Micro-app creativa**: Pequeña aplicación que showcase tu estilo visual único
- **Galería inmersiva**: Espacio expositivo virtual con filtros, lightbox y animaciones
- **Storytelling interactivo**: Narrativa visual donde el usuario controla el descubrimiento
- **Tarjeta de presentación digital**: Mini-sitio que funciona como portafolio vivo
- **Proyecto editorial web**: Revista o catálogo con diseño responsive y multimedia
- **Prototipo de producto digital**: Concepto de app o servicio con tu identidad visual

---

## 🎓 Objetivos del módulo

Al finalizar este módulo, los estudiantes serán capaces de:

### Fundamentos técnicos

- **Comprender los principios básicos** del desarrollo web moderno (HTML, CSS, JavaScript)
- **Dominar herramientas de desarrollo** y flujos de trabajo profesionales con IA
- **Implementar diseños responsivos** que funcionen en múltiples dispositivos (320px-1920px)
- **Aplicar principios de accesibilidad** WCAG AA y usabilidad web
- **Usar desarrollo asistido por IA** de forma ética e intencional

### Aplicaciones creativas

- **Transformar ilustraciones estáticas** en experiencias web interactivas
- **Crear animaciones y transiciones** que mejoren la narrativa visual
- **Desarrollar interfaces atractivas** y funcionales para proyectos digitales
- **Integrar elementos multimedia** en proyectos web complejos
- **Alcanzar estándares de diseño nivel Awwwards**

### Desarrollo profesional

- **Construir un portafolio digital** que showcase habilidades técnicas y creativas
- **Pensar como Product Manager**: decisiones basadas en usuario y negocio
- **Comprender el ciclo completo** del desarrollo de productos digitales
- **Evaluar críticamente** las implicaciones éticas y sociales del diseño digital
- **Documentar y presentar** trabajo con case studies profesionales

---

## 🏛️ Metodología ATELIER

Este módulo sigue la metodología **ATELIER**, que se caracteriza por:

### El Acrónimo ATELIER

- **A**rquitectura: Piensa como product manager antes de codificar
- **T**écnica: Construye con estándares modernos (HTML5, CSS Grid, ES6+)
- **E**xperiencia: Diseña interacciones que deleiten y enganchen
- **L**anzamiento: Despliega temprano y a menudo (MVP en S1)
- **I**teración: Refina basándote en feedback y métricas
- **E**xhibición: Presenta tu trabajo con confianza y claridad
- **R**eflexión: Documenta decisiones, aprendizajes y próximos pasos

### Aprendizaje experiencial

- **Proyecto central**: Cada estudiante desarrolla un producto web completo a lo largo del módulo
- **Iteración continua**: Feedback constante y mejora progresiva
- **Reflexión crítica**: Análisis del proceso y resultados en cada etapa
- **Asistencia IA**: Aceleración con metodología docs-first

---

## 📅 Estructura de Sesiones (4 × 3.5 horas)

### Visión General del Timeline

| Sesión | Fase de Producto                  | Entregable Principal              | Foco                       |
| ------ | --------------------------------- | --------------------------------- | -------------------------- |
| **S1** | Discovery → Definition → MVP      | Sitio live + wireframe            | Arquitectura y fundamentos |
| **S2** | Content → Visual Design           | Galería + sistema visual          | Excelencia visual          |
| **S3** | Component Library → Responsive    | Multi-sección + componentes       | Maquetación profesional    |
| **S4** | Interaction → UX Testing → Launch | Portfolio completo + presentación | Interactividad y pulido    |

---

### Sesión 1 — Discovery & Foundation (3.5h)

**Fase de Producto**: Discovery → Definition → MVP Launch

Publicar tu primer "Hello, Web" y arrancar el proyecto con un wireframe y un commit inicial.

- Sesión:
  - [S1 — La web como lienzo + planteamiento del proyecto]({{ '/tracks/es/ilustracion-webapp/s1-introduccion-ecosistema-y-proyecto/' | relative_url }})

**Desglose de tiempo**:

| Parte | Duración | Actividad                                                              |
| ----- | -------- | ---------------------------------------------------------------------- |
| 1     | 45 min   | **Product Discovery**: análisis competitivo, user stories, referencias |
| 2     | 60 min   | **Design Definition**: moodboard, sistema de diseño, wireframe         |
| 3     | 90 min   | **Technical Build**: setup repo, tokens CSS, HTML semántico            |
| 4     | 30 min   | **Deploy & Reflect**: GitHub Pages, documentación, commit              |

**Prompt IA recomendado**:

```markdown
Genera un plan de discovery de producto para un [tipo de sitio] dirigido a [audiencia específica].

Incluye:

1. 5 necesidades clave del usuario basadas en pain points de [audiencia]
2. Análisis competitivo de [ejemplos de competidores]
3. 3 features de diferenciación únicas con justificación
4. User stories (Como [usuario], quiero [acción], para que [beneficio])
5. Métricas de éxito para validación

Documenta en formato docs/plan-discovery.md.
```

**Canon recomendado**:

- [Guía para Configurar un Entorno de Desarrollo Web]({{ '/lessons/es/entorno-de-desarrollo/' | relative_url }})
- [Práctica: HTML semántico + Fundamentos de CSS]({{ '/lessons/es/html-css-basics/' | relative_url }})

**Entregables S1**:

- ✅ URL live (GitHub Pages)
- ✅ Wireframe documentado
- ✅ Sistema de diseño implementado (variables CSS)
- ✅ Estructura HTML semántica
- ✅ Mobile-responsive
- ✅ 1 commit significativo

---

### Sesión 2 — Visual Excellence & Content Strategy (3.5h)

**Fase de Producto**: Content → Visual Design → Component Library

Construir galerías de imágenes y layouts que muestren tu trabajo con ritmo visual y jerarquía.

- Sesión:
  - [S2 — Galerías y layouts para tu arte]({{ '/tracks/es/ilustracion-webapp/s2-galerias-layouts-media/' | relative_url }})

**Desglose de tiempo**:

| Parte | Duración | Actividad                                                          |
| ----- | -------- | ------------------------------------------------------------------ |
| 1     | 40 min   | **Content Strategy**: copy compelling, jerarquía, storytelling     |
| 2     | 90 min   | **Visual Design**: tipografía, layout Grid/Flexbox, color, imagery |
| 3     | 60 min   | **Component Library**: cards, galería, estados hover               |
| 4     | 30 min   | **Polish & Deploy**: micro-interacciones CSS, commit               |

**Prompt IA recomendado**:

```markdown
Basándote en estas referencias visuales [describe o adjunta imágenes]:

1. Sugiere una paleta de colores (3-5 colores) con códigos hex que transmita [mood/feeling]
2. Asegura ratios de contraste WCAG AA (4.5:1 para texto, 3:1 para UI)
3. Recomienda 2 combinaciones de Google Fonts que encajen con esta estética
4. Proporciona justificación para cada elección
5. Incluye guías de uso (primario para CTAs, secundario para acentos, etc.)

Testea todas las combinaciones con WebAIM Contrast Checker.
```

**Canon recomendado**:

- [Media: Video y contenido audiovisual]({{ '/lessons/es/media/video/' | relative_url }})
- [Diseño Web: Responsive, Fluido e Intrínseco]({{ '/lessons/es/responsive/' | relative_url }})
- [Diseño Intrínseco Web]({{ '/lessons/es/intrinsic-web-design/' | relative_url }})

**Entregables S2**:

- ✅ Contenido compelling y bien escrito
- ✅ Diseño visual nivel Awwwards
- ✅ Librería de componentes reutilizables
- ✅ Responsive en todos los dispositivos
- ✅ Micro-interacciones y pulido CSS
- ✅ 1 commit significativo

---

### Sesión 3 — Responsive Mastery & Professional Layout (3.5h)

**Fase de Producto**: Component Library → Multi-Section → Responsive

Convertir tu página en un layout responsive con identidad visual y componentes funcionales.

- Sesión:
  - [S3 — Maquetación responsive con Bootstrap + Tailwind]({{ '/tracks/es/ilustracion-webapp/s3-maquetacion-responsive-frameworks/' | relative_url }})

**Desglose de tiempo**:

| Parte | Duración | Actividad                                                          |
| ----- | -------- | ------------------------------------------------------------------ |
| 1     | 45 min   | **Architecture Review**: estructura multi-sección, navegación      |
| 2     | 90 min   | **Framework Integration**: Bootstrap/Tailwind, componentes         |
| 3     | 60 min   | **Responsive Testing**: breakpoints, DevTools, dispositivos reales |
| 4     | 30 min   | **Accessibility Audit**: WCAG AA, contraste, teclado, commit       |

**Prompt IA recomendado**:

```markdown
Siguiendo docs/plan-layout.md, implementa la Fase 2: Layout Multi-sección

Crea un layout CSS Grid responsive para página de portfolio con:

Requisitos:

- Header sticky con navegación
- Hero section con ilustración destacada
- Galería de proyectos (del S2)
- Sección bio/about
- Footer con contacto/redes

Restricciones:

- Mobile-first (320px base)
- Breakpoints: 768px, 1024px, 1440px
- Usa variables CSS del sistema de diseño
- Navegación accesible por teclado
- Skip links para accesibilidad

Genera informe de implementación después de completar.
```

**Canon recomendado**:

- [Bootstrap CSS: Configuración y Fundamentos]({{ '/lessons/es/bootstrap/setup-and-fundamentals/' | relative_url }})
- [Tailwind CSS: Configuración y Fundamentos]({{ '/lessons/es/tailwind/setup-and-fundamentals/' | relative_url }})

**Entregables S3**:

- ✅ Sitio multi-sección responsive
- ✅ Navegación funcional y accesible
- ✅ Componentes integrados (Bootstrap/Tailwind o custom)
- ✅ Testeado en 320px, 768px, 1024px, 1920px
- ✅ Audit de accesibilidad pasado
- ✅ 1 commit significativo

---

### Sesión 4 — Interactivity, UX Testing & Launch (3.5h)

**Fase de Producto**: Interaction Design → JavaScript → UX Testing → Public Launch

Añadir interacción real, hacer un test rápido con pares y mejorar la experiencia iterando.

- Sesión:
  - [S4 — Interactividad + UX/UI básico]({{ '/tracks/es/ilustracion-webapp/s4-interactividad-ux-ui/' | relative_url }})

**Desglose de tiempo**:

| Parte | Duración | Actividad                                                                  |
| ----- | -------- | -------------------------------------------------------------------------- |
| 1     | 45 min   | **Interaction Design**: user flows, inventario de micro-interacciones      |
| 2     | 60 min   | **JavaScript Implementation**: funcionalidad core, progressive enhancement |
| 3     | 60 min   | **UX Testing**: test con 2-3 pares, documentar feedback, iterar            |
| 4     | 45 min   | **Launch & Present**: deploy final, case study, presentación               |

**Prompt IA recomendado**:

```markdown
Siguiendo docs/plan-interactivity.md, implementa Fase 1: Animaciones de Scroll

Escribe una función JavaScript usando Intersection Observer para fade-in de elementos al hacer scroll.

Requisitos:

- Progressive enhancement (sitio funciona sin JS)
- Respeta media query prefers-reduced-motion
- Usa requestAnimationFrame para rendimiento
- Threshold y root margin configurables
- Limpia observers cuando elementos son visibles
- Soporta múltiples elementos con data attributes

Restricciones:

- Vanilla JS (sin librerías)
- Sintaxis ES6+
- Accesible (no rompe navegación por teclado)
- Performante (sin layout thrashing)

Entrega:

1. Código comentado con explicación
2. Ejemplos de uso
3. Recomendaciones de testing
4. Informe de implementación
```

**Canon recomendado**:

- [Introducción a JS]({{ '/lessons/es/js-intro/' | relative_url }})
- [JS: DOM Manipulation]({{ '/lessons/es/js-dom-manipulation/' | relative_url }})

**Entregables S4**:

- ✅ Features interactivas con JavaScript
- ✅ Progressive enhancement (funciona sin JS)
- ✅ Testeado con usuarios e iterado
- ✅ Lighthouse score 90+
- ✅ Totalmente accesible (WCAG AA)
- ✅ Case study y presentación
- ✅ 1 commit significativo

---

## ✅ Entregables (Mínimo Viable)

### Por Sesión

| Sesión | Evidencia Requerida                                                |
| ------ | ------------------------------------------------------------------ |
| **S1** | URL live + wireframe + plan de discovery documentado               |
| **S2** | Galería con grid/layout + sistema visual + contenido               |
| **S3** | Responsive testeado + componentes + audit accesibilidad            |
| **S4** | Interacción + evidencia de test con pares + iteración + case study |

### Totales

- ✅ Sitio publicado (URL) + repo en GitHub
- ✅ Documentación docs-first (plans + reports)
- ✅ Mínimo 4 commits significativos (1 por sesión)
- ✅ Case study de portfolio
- ✅ Presentación final

---

## 🧪 Evaluación (Criterios Awwwards)

### Componente Técnico (40%)

| Criterio           | Peso | Indicadores                                  |
| ------------------ | ---- | -------------------------------------------- |
| **Semántica HTML** | 10%  | Estructura correcta, heading hierarchy, ARIA |
| **CSS/Layout**     | 10%  | Grid/Flexbox, variables, organización        |
| **Responsive**     | 10%  | 320px-1920px sin roturas, mobile-first       |
| **Accesibilidad**  | 10%  | WCAG AA, contraste, teclado, lectores        |

### Componente Creativo (40%)

| Criterio          | Peso | Indicadores                            |
| ----------------- | ---- | -------------------------------------- |
| **Diseño Visual** | 15%  | Estética, tipografía, composición      |
| **UX/Usabilidad** | 15%  | Navegación, micro-interacciones, flujo |
| **Innovación**    | 5%   | Riesgo creativo, experimentación       |
| **Narrativa**     | 5%   | Historia coherente, propósito claro    |

### Componente Procesual (20%)

| Criterio          | Peso | Indicadores                           |
| ----------------- | ---- | ------------------------------------- |
| **Documentación** | 8%   | Plans, reports, README completo       |
| **Reflexión**     | 4%   | Análisis crítico, aprendizajes        |
| **Colaboración**  | 4%   | Testing con pares, feedback integrado |
| **Presentación**  | 4%   | Case study, demo clara, confianza     |

### Métricas de Éxito Técnico

```
┌─────────────────────────────────────────────────────────┐
│              LIGHTHOUSE TARGETS                          │
├─────────────────────────────────────────────────────────┤
│  Performance:     90+                                    │
│  Accessibility:   100                                    │
│  Best Practices:  90+                                    │
│  SEO:             100                                    │
├─────────────────────────────────────────────────────────┤
│  HTML Válido:     W3C Validator ✓                        │
│  CSS Válido:      W3C CSS Validator ✓                    │
│  JS Errors:       0 en consola                           │
└─────────────────────────────────────────────────────────┘
```

---

## 📚 Referencias

### Recursos Web

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [A List Apart](https://alistapart.com/)

### Inspiración Nivel Awwwards

- [Awwwards](https://www.awwwards.com/) — Sitios premiados, tendencias
- [CSS Design Awards](https://www.cssdesignawards.com/) — Galería de excelencia
- [FWA](https://thefwa.com/) — Cutting edge digital
- [Siteinspire](https://www.siteinspire.com/) — Curación de diseño web

### Herramientas de Diseño

- [Coolors](https://coolors.co/) — Generador de paletas
- [Realtime Colors](https://www.realtimecolors.com/) — Visualiza colores en diseño
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — Verificador de contraste
- [Type Scale](https://type-scale.com/) — Escalas tipográficas

### Bibliografía Viva (Zotero)

- [Zotero Web Atelier (UDIT) Library](https://www.zotero.org/groups/5649080/ruvebal-web/library)

### Metodología IA

- [Guía Práctica de Desarrollo Asistido por IA]({{ '/methodology/es/ai-practical-guide/' | relative_url }})
- [ACM Code of Ethics](https://www.acm.org/code-of-ethics)
- [UNESCO Recommendation on AI Ethics](https://www.unesco.org/en/artificial-intelligence/recommendation-ethics)

---

## 🧭 Nota Crítica

Este curso busca formar **creadores conscientes**: no solo "hacer web", sino reflexionar sobre impacto, ética, accesibilidad y cultura visual.

### Consideraciones Éticas de IA

```
┌─────────────────────────────────────────────────────────┐
│ 🌍 CONSIDERACIONES CLIMÁTICAS                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Entrenar GPT-4 ≈ 50,000 kg CO₂ (≈ 5 vuelos            │
│  transatlánticos por pasajero)                          │
│                                                          │
│  Cada consulta consume energía. Pregunta con intención. │
│                                                          │
│  Considera:                                              │
│  → ¿Es esta consulta necesaria?                         │
│  → ¿Podría encontrar esto en documentación?             │
│  → ¿Estoy usando IA para aprender o por pereza?         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Principios del Creador Consciente

- **Cuestiona** paradigmas establecidos
- **Considera** implicaciones sociales y éticas
- **Desarrolla** una voz auténtica
- **Contribuye** a un ecosistema digital más inclusivo
- **Documenta** tu proceso y decisiones
- **Comparte** conocimiento con la comunidad
