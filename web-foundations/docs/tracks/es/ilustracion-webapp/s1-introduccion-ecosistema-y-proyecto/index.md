---
layout: lesson
title: 'La web como lienzo + planteamiento del proyecto'
title_alt: 'La web como lienzo + planteamiento del proyecto'
slug: ilustracion-webapp-s1
date: 2026-01-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/ilustracion-webapp/s1-introduccion-ecosistema-y-proyecto/
description: 'Primera sesión: entender la web como medio creativo, configurar el flujo Git/GitHub Pages y publicar un primer "Hello, Web" con tu ilustración.'
tags: [ilustracion, web, html, css, github, atelier]
status: borrador
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

## ⏰ Duración estimada

**3,5 horas (1 sesión)**

**Fase de Producto**: Discovery → Definition → MVP Launch

---

## 🎯 Objetivos

### Objetivos de Producto

- Entender **por qué la web es un medio creativo** para ilustradores: ubicuidad, acceso, iteración y publicación
- Definir **propuesta de valor** clara: ¿qué problema resuelve tu portfolio?
- Identificar **audiencia objetivo** y sus necesidades
- Establecer **métricas de éxito** para validación

### Objetivos Técnicos

- Dominar el **mínimo técnico viable** para empezar: HTML/CSS básicos + flujo Git
- Implementar **sistema de diseño** con variables CSS
- Aplicar **HTML semántico** y accesibilidad básica
- Configurar **deployment automático** con GitHub Pages

### Objetivos de Aprendizaje

- Arrancar el proyecto con un **primer resultado tangible**: sitio publicado el mismo día
- Practicar **metodología docs-first**: planificar antes de implementar
- Usar **desarrollo asistido por IA** de forma ética
- Establecer el hábito ATELIER: **un commit por sesión**, con intención

## 🧭 Antes de empezar

### Student Project Template

Tu proyecto parte del **student-project-template**. Antes de la sesión:

1. **Crea tu repositorio** desde el template
2. **Lee** [`GETTING-STARTED.md`](https://github.com/ruvebal/student-project-template/blob/main/GETTING-STARTED.md) — guía rápida universal
3. **Completa** [`project-brief.md`](https://github.com/ruvebal/student-project-template/blob/main/project-brief.md) — define tu proyecto
4. **Explora** [`project-inspiration.md`](https://github.com/ruvebal/student-project-template/blob/main/project-inspiration.md) — tendencias y referencias

### Canon de Referencia

Esta sesión conecta y reutiliza contenido ya existente. Úsalo como "canon" para detalles y teoría:

**Setup y Herramientas**:

- [Guía para Configurar un Entorno de Desarrollo Web]({{ '/lessons/es/entorno-de-desarrollo/' | relative_url }})
- [Práctica: HTML semántico + Fundamentos de CSS]({{ '/lessons/es/html-css-basics/' | relative_url }})

**Metodología**:

- [Metodología ATELIER (ES)]({{ '/methodology/es/' | relative_url }})
- [Guía Práctica de Desarrollo Asistido por IA]({{ '/methodology/es/ai-practical-guide/' | relative_url }})

### Preparación Previa

Antes de la sesión, asegúrate de tener:

- [ ] **Repositorio creado** desde student-project-template
- [ ] **project-brief.md** con tu concepto inicial
- [ ] **project-inspiration.md** con 5-10 referencias visuales
- [ ] Cuenta de GitHub creada
- [ ] Git instalado localmente
- [ ] Editor de código (VS Code, Cursor, etc.)
- [ ] Navegador con DevTools (Chrome/Firefox)
- [ ] 3-5 imágenes de tu trabajo optimizadas para web

## 道 Tao del desarrollo web (versión ATELIER)

En ATELIER, "aprender web" no es memorizar etiquetas: es **cultivar una práctica**.

```
┌─────────────────────────────────────────────────────────┐
│                  TAO DEL DESARROLLO                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  El código es un MATERIAL (como acuarela o tinta)        │
│  El commit es una HUELLA (registro de tu proceso)        │
│  El sitio publicado es tu EXHIBICIÓN (obra viva)         │
│                                                          │
│  No memorizas etiquetas.                                 │
│  Cultivas una práctica consciente.                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## ⏱️ Desglose de Tiempo (3.5 horas)

| Parte | Duración | Fase        | Actividad Principal                                        |
| ----- | -------- | ----------- | ---------------------------------------------------------- |
| **1** | 45 min   | Discovery   | Product discovery: análisis competitivo, user stories      |
| **2** | 60 min   | Definition  | Design definition: moodboard, sistema de diseño, wireframe |
| **3** | 90 min   | Development | Technical build: setup repo, HTML semántico, CSS tokens    |
| **4** | 30 min   | Delivery    | Deploy & reflect: GitHub Pages, documentación, commit      |

---

## Parte 1: Product Discovery (45 min)

### 1.1 Exploración — La web como nuevo lienzo (15 min)

**Actividad**: Observa y analiza 3 ejemplos de portfolios de ilustradores

**Ejemplos sugeridos**:

- Portfolios de ilustradores en Awwwards
- Storytelling interactivo (The Boat, Snow Fall)
- Webcomics y microsites creativos

**Preguntas guía para análisis**:

| Pregunta                                                          | Por qué importa           |
| ----------------------------------------------------------------- | ------------------------- |
| ¿Qué cambia cuando una ilustración pasa de "imagen" a "interfaz"? | Entender el medio         |
| ¿Qué gana tu trabajo con navegación, tiempo, interacción?         | Identificar oportunidades |
| ¿Cómo presentan su trabajo los ilustradores que admiras?          | Benchmarking              |
| ¿Qué te frustra como usuario en portfolios mal diseñados?         | Pain points               |

### 1.2 Análisis Competitivo con IA (15 min)

**Prompt IA - Análisis Competitivo**:

```markdown
Analiza estos 3 portfolios de ilustradores [URLs o descripciones]:

Para cada uno, identifica:

1. **Fortalezas**
   - Diseño visual
   - Navegación/UX
   - Presentación del trabajo
   - Elementos únicos

2. **Debilidades**
   - Fricciones en la experiencia
   - Problemas de accesibilidad
   - Áreas de mejora

3. **Oportunidades de diferenciación**
   - ¿Qué no están haciendo?
   - ¿Qué podrías hacer mejor?
   - ¿Qué refleja tu voz única?

Formato: Tabla comparativa con insights accionables.
```

**Documenta** en: `docs/plan-discovery.md`

### 1.3 User Stories (15 min)

**Actividad**: Define 3-5 user stories para tu portfolio

**Formato**:

```
Como [tipo de usuario],
Quiero [acción/objetivo],
Para que [beneficio/resultado].
```

**Ejemplos**:

- Como **director de arte**, quiero **ver tu rango de estilos rápidamente**, para que **pueda evaluar si encajas en mi proyecto**
- Como **ilustrador colega**, quiero **entender tu proceso creativo**, para que **pueda aprender de tu enfoque**
- Como **cliente potencial**, quiero **contactarte fácilmente**, para que **pueda solicitar un presupuesto**

**Prompt IA - User Stories**:

```markdown
Genera 5 user stories para un portfolio de ilustrador/a especializado/a en [tu especialidad].

Audiencia objetivo:

- Directores de arte
- Editores editoriales
- Agencias de publicidad
- Clientes directos
- Colegas ilustradores

Formato: Como [usuario], quiero [acción], para que [beneficio].

Prioriza por impacto en conversión (conseguir trabajo/proyectos).
```

---

## Parte 2: Design Definition (60 min)

### 2.1 Conceptualización — Idea, audiencia y propuesta de valor (20 min)

**Actividad**: Define tu proyecto en formato de producto

**Template de Propuesta de Valor**:

```markdown
# Mi Portfolio Digital

## Propuesta de Valor (1 frase)

[Qué haces] para [quién] que [beneficio único]

Ejemplo: "Ilustraciones editoriales con narrativa visual para
editoriales independientes que buscan diferenciarse."

## Audiencia Objetivo

- Primaria: [quién es tu cliente ideal]
- Secundaria: [otros usuarios importantes]
- Terciaria: [audiencia de apoyo]

## Diferenciación

¿Qué te hace único/a?

- Estilo visual:
- Enfoque narrativo:
- Proceso creativo:

## Acciones Clave del Usuario

Cuando alguien entra a mi portfolio, debe poder:

1. [Acción 1] en < 5 segundos
2. [Acción 2] en < 30 segundos
3. [Acción 3] en < 2 minutos
```

**Prompt IA - Propuesta de Valor**:

```markdown
Ayúdame a definir la propuesta de valor para mi portfolio de ilustración.

Contexto:

- Especialidad: [tu especialidad]
- Estilo: [describe tu estilo]
- Audiencia: [quién contrata tu trabajo]
- Diferenciación: [qué te hace único/a]

Genera:

1. 3 versiones de propuesta de valor (1 frase cada una)
2. Análisis de cuál comunica mejor el valor
3. Recomendación con justificación

Criterios: Claridad, diferenciación, relevancia para audiencia.
```

### 2.2 Sistema de Diseño Básico (20 min)

**Actividad**: Define tu sistema de diseño mínimo viable

**Elementos a definir**:

1. **Paleta de color** (3-5 colores)
   - Primario (identidad/CTAs)
   - Secundario (acentos)
   - Neutros (texto, fondos)
   - Verificar contraste WCAG AA

2. **Tipografía** (2 familias máximo)
   - Títulos/headings
   - Cuerpo de texto
   - Escala modular (h1, h2, h3, p)

3. **Espaciado** (escala consistente)
   - Base: 8px o 4px
   - Escala: 0.5x, 1x, 1.5x, 2x, 3x, 4x

**Prompt IA - Sistema de Diseño**:

```markdown
Crea un sistema de diseño minimalista para portfolio de ilustrador/a.

Referencias visuales: [describe tu estilo o adjunta imágenes]
Mood: [profesional/juguetón/editorial/experimental]

Genera:

1. **Paleta de colores**
   - 1 color primario (hex + nombre)
   - 1-2 colores secundarios
   - Escala de grises (5 tonos)
   - Verificar todos los contrastes WCAG AA (4.5:1 texto, 3:1 UI)

2. **Tipografía**
   - 1 fuente para títulos (Google Fonts)
   - 1 fuente para texto (Google Fonts)
   - Escala modular (16px base)
   - Pesos recomendados

3. **Variables CSS**
   - Código listo para copiar
   - Nomenclatura consistente
   - Comentarios explicativos

Formato: CSS custom properties en :root
```

### 2.3 Wireframe (20 min)

**Actividad**: Boceto de estructura (papel o digital)

**Secciones mínimas**:

```
┌─────────────────────────────────────┐
│  HEADER                             │
│  [Logo/Nombre]    [Nav: Work|About] │
├─────────────────────────────────────┤
│  HERO                               │
│  [Título grande]                    │
│  [Subtítulo: qué haces]             │
│  [CTA: Ver proyectos]               │
│  [Imagen destacada]                 │
├─────────────────────────────────────┤
│  GALERÍA / PROYECTOS                │
│  [Grid de thumbnails]               │
│  [3-6 proyectos destacados]         │
├─────────────────────────────────────┤
│  BIO / ABOUT                        │
│  [Foto + texto breve]               │
│  [Especialidades/skills]            │
├─────────────────────────────────────┤
│  CONTACTO                           │
│  [Email/redes]                      │
│  [CTA: Trabajemos juntos]           │
├─────────────────────────────────────┤
│  FOOTER                             │
│  [Copyright] [Links]                │
└─────────────────────────────────────┘
```

**Herramientas**:

- Papel y lápiz (más rápido)
- Excalidraw (digital, simple)
- Figma (si ya lo conoces)

**Documenta**: Foto o screenshot en `docs/wireframe-s1.png`

---

## Parte 3: Technical Build (90 min)

### 3.1 Setup de Repositorio (15 min)

**Paso A**: Crea tu repo desde template

```bash
# Opción 1: Usar template estudiantil
# Ve a: github.com/[tu-org]/student-project-template
# Click: "Use this template" → "Create a new repository"

# Opción 2: Crear desde cero
git init mi-portfolio
cd mi-portfolio
```

**Estructura inicial**:

```
mi-portfolio/
├── docs/
│   ├── plan-discovery.md
│   └── wireframe-s1.png
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       └── [tus ilustraciones]
├── index.html
└── README.md
```

**Guía detallada**: [Configurar Entorno de Desarrollo Web]({{ '/lessons/es/entorno-de-desarrollo/' | relative_url }})

### 3.2 Sistema de Diseño en CSS (20 min)

**Actividad**: Implementa tu sistema de diseño como CSS custom properties

**Archivo**: `assets/css/style.css`

**Prompt IA - Generar CSS**:

```markdown
Convierte este sistema de diseño a CSS custom properties:

Colores:

- Primario: [hex]
- Secundario: [hex]
- Texto: [hex]
- Fondo: [hex]

Tipografía:

- Títulos: [fuente]
- Texto: [fuente]
- Base: 16px

Espaciado:

- Base: 8px
- Escala: 0.5x, 1x, 1.5x, 2x, 3x, 4x

Genera:

1. Variables CSS en :root
2. Reset CSS moderno
3. Estilos base (body, headings, links)
4. Clases utility (spacing, colors)
5. Comentarios explicativos

Asegura:

- Nomenclatura BEM o consistente
- Dark mode con @media (prefers-color-scheme)
- Mobile-first
```

**Ejemplo de output esperado**:

```css
:root {
	/* Colores */
	--color-primary: #1d4ed8;
	--color-primary-hover: #1e40af;
	--color-text: #0f172a;
	--color-text-muted: #64748b;
	--color-bg: #ffffff;
	--color-bg-alt: #f8fafc;

	/* Tipografía */
	--font-heading: 'Playfair Display', serif;
	--font-body: 'Inter', sans-serif;
	--font-size-base: clamp(1rem, 0.8vw + 0.85rem, 1.125rem);

	/* Espaciado */
	--space-xs: 0.5rem; /* 8px */
	--space-sm: 1rem; /* 16px */
	--space-md: 1.5rem; /* 24px */
	--space-lg: 2rem; /* 32px */
	--space-xl: 3rem; /* 48px */
	--space-2xl: 4rem; /* 64px */
}
```

### 3.3 HTML Semántico (30 min)

**Actividad**: Estructura tu `index.html` con HTML5 semántico

**Criterios de calidad**:

- ✅ Estructura semántica (`<header>`, `<main>`, `<section>`, `<footer>`)
- ✅ Jerarquía de encabezados correcta (h1 → h2 → h3, sin saltos)
- ✅ Al menos 1 ilustración tuya con `alt` descriptivo
- ✅ Navegación accesible con `<nav>` y `aria-label`
- ✅ Skip links para accesibilidad
- ✅ Meta tags básicos (viewport, description)

**Prompt IA - Generar HTML**:

```markdown
Genera estructura HTML5 semántica para portfolio de ilustrador/a.

Secciones (basado en mi wireframe):

1. Header con navegación
2. Hero con título y CTA
3. Galería de proyectos (3 placeholders)
4. Bio/About
5. Contacto
6. Footer

Requisitos:

- HTML5 semántico (<header>, <nav>, <main>, <section>, <article>, <footer>)
- Jerarquía de headings correcta (h1 único, h2 para secciones, h3 para subsecciones)
- Skip links para accesibilidad
- ARIA labels donde necesario
- Atributos alt descriptivos en imágenes
- Estructura mobile-first
- Comentarios explicativos
- Clases usando nomenclatura consistente

No incluyas estilos inline. Usa clases que referencien el sistema de diseño.
```

**Práctica guiada**: [HTML semántico + Fundamentos CSS]({{ '/lessons/es/html-css-basics/' | relative_url }})

### 3.4 Estilos MVP (25 min)

**Actividad**: Aplica estilos básicos usando tu sistema de diseño

**Prioridades**:

1. **Layout básico**
   - Container con max-width
   - Espaciado consistente
   - Grid simple para galería

2. **Tipografía**
   - Aplicar fuentes
   - Escala de tamaños
   - Line-height legible

3. **Colores**
   - Aplicar paleta
   - Verificar contraste
   - Estados hover en links

4. **Responsive**
   - Mobile-first
   - Breakpoint tablet (768px)
   - Breakpoint desktop (1024px)

**Prompt IA - CSS Layout**:

```markdown
Crea CSS para layout de portfolio usando mi sistema de diseño.

Componentes necesarios:

1. **Container**
   - Max-width: 1200px
   - Padding lateral responsive
   - Centrado

2. **Header**
   - Sticky en scroll
   - Flex para logo + nav
   - Responsive (hamburger en móvil)

3. **Hero**
   - Altura viewport
   - Centrado vertical
   - Imagen de fondo o ilustración

4. **Galería**
   - CSS Grid
   - 1 col móvil, 2 cols tablet, 3 cols desktop
   - Gap consistente
   - Aspect ratio 4:3

5. **Footer**
   - Centrado
   - Links en fila
   - Espaciado generoso

Requisitos:

- Mobile-first
- Usa variables CSS del sistema
- Transiciones suaves (300ms)
- Estados hover/focus visibles
- Sin frameworks (CSS vanilla)
```

---

## Parte 4: Deploy & Reflect (30 min)

### 4.1 Deploy a GitHub Pages (10 min)

**Paso 1**: Commit inicial

```bash
git add .
git commit -m "feat(s1): MVP portfolio con sistema de diseño y estructura semántica

- Implementa sistema de diseño con variables CSS
- Estructura HTML5 semántica completa
- Layout responsive mobile-first
- Galería de proyectos con grid
- Navegación accesible

Entregables S1:
- [x] URL live
- [x] Wireframe documentado
- [x] Sistema de diseño implementado
- [x] HTML semántico
- [x] Mobile-responsive"
```

**Paso 2**: Push a GitHub

```bash
git branch -M main
git remote add origin https://github.com/[tu-usuario]/[tu-repo].git
git push -u origin main
```

**Paso 3**: Activar GitHub Pages

1. Ve a Settings → Pages
2. Source: Deploy from branch
3. Branch: main / (root)
4. Save
5. Espera 1-2 minutos
6. Tu sitio estará en: `https://[tu-usuario].github.io/[tu-repo]/`

### 4.2 Documentación (10 min)

**Actividad**: Actualiza tu README.md

**Template**:

```markdown
# [Tu Nombre] - Portfolio Digital

> Portfolio de ilustración desarrollado en el track Ilustración Aplicada: Productos Digitales Web-App (UDIT)

## 🔗 Links

- **Live Site**: https://[tu-usuario].github.io/[tu-repo]/
- **Repositorio**: https://github.com/[tu-usuario]/[tu-repo]

## 📋 Sesión 1 - Discovery & Foundation

### Entregables

- [x] URL live (GitHub Pages)
- [x] Wireframe documentado (`docs/wireframe-s1.png`)
- [x] Sistema de diseño implementado (variables CSS)
- [x] Estructura HTML semántica
- [x] Mobile-responsive (320px-1920px)
- [x] 1 commit significativo

### Decisiones de Diseño

**Propuesta de Valor**:
[Tu propuesta de valor en 1 frase]

**Audiencia Objetivo**:

- Primaria: [quién]
- Secundaria: [quién]

**Sistema de Diseño**:

- Paleta: [colores principales]
- Tipografía: [fuentes elegidas]
- Mood: [profesional/editorial/experimental]

### Próximos Pasos (S2)

- [ ] Contenido compelling para cada sección
- [ ] Galería completa con 6-8 proyectos
- [ ] Micro-interacciones CSS
- [ ] Optimización de imágenes

## 🛠️ Tech Stack

- HTML5 semántico
- CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (próxima sesión)
- GitHub Pages (deployment)

## 📚 Metodología

- **ATELIER**: Arquitectura, Técnica, Experiencia, Lanzamiento, Iteración, Exhibición, Reflexión
- **Docs-First**: Planificación antes de implementación
- **AI-Assisted**: Desarrollo asistido por IA de forma ética

---

**Desarrollado con ❤️ y código en [UDIT](https://udit.es)**
```

### 4.3 Exhibición en Clase (5 min)

**Actividad**: Comparte tu MVP con el grupo

**Formato de presentación** (2 min por persona):

1. **Muestra tu sitio live**
   - URL pública
   - Vista móvil + desktop

2. **Comparte 1 decisión de diseño**
   - "Elegí [X] porque [razón]"

3. **Declara tu intención**
   - "En S2 quiero lograr [objetivo específico]"

**Captura**: Screenshot de tu sitio para documentación

### 4.4 Reflexión ATELIER (5 min)

**Actividad**: Reflexión crítica individual

**Preguntas guía**:

```markdown
## Reflexión S1

### Proceso

1. ¿Qué fue más difícil: el diseño, el código, o el flujo Git?
2. ¿En qué momento sentiste que "entendiste" algo importante?
3. ¿Qué te sorprendió del proceso?

### Producto

1. ¿Qué parte te dio más confianza al ver el sitio online?
2. ¿Qué decisión de diseño defiendes más?
3. ¿Qué cambiarías si tuvieras 30 minutos más?

### Aprendizaje

1. ¿Cómo usaste la IA? ¿Fue útil?
2. ¿Qué concepto técnico necesitas reforzar?
3. ¿Qué decisión de hoy te comprometes a mantener en S2?

### Próxima Sesión

1. ¿Qué contenido necesitas preparar?
2. ¿Qué imágenes necesitas optimizar?
3. ¿Qué aspecto visual quieres mejorar?
```

**Documenta**: Guarda tus respuestas en `docs/reflexion-s1.md`

---

## ✅ Checklist de Entregables S1

### Mínimo Viable (Requerido)

- [ ] **URL live** en GitHub Pages funcionando
- [ ] **Repositorio** en GitHub con código fuente
- [ ] **Wireframe** documentado (`docs/wireframe-s1.png`)
- [ ] **Plan de discovery** (`docs/plan-discovery.md`)
- [ ] **Sistema de diseño** implementado (variables CSS)
- [ ] **HTML semántico** con estructura correcta
- [ ] **Mobile-responsive** (320px mínimo)
- [ ] **1 commit significativo** con mensaje descriptivo
- [ ] **README.md** actualizado con info del proyecto
- [ ] **Reflexión** documentada (`docs/reflexion-s1.md`)

### Calidad Técnica

- [ ] HTML válido (verificar con [W3C Validator](https://validator.w3.org/))
- [ ] CSS válido (verificar con [W3C CSS Validator](https://jigsaw.w3.org/css-validator/))
- [ ] Contraste WCAG AA en todos los textos (verificar con [WebAIM](https://webaim.org/resources/contrastchecker/))
- [ ] Jerarquía de headings correcta (h1 único, sin saltos)
- [ ] Imágenes con `alt` descriptivo
- [ ] Meta tags básicos (viewport, description)

### Excelencia (Opcional pero Recomendado)

- [ ] Skip links para accesibilidad
- [ ] Dark mode con `prefers-color-scheme`
- [ ] Favicon personalizado
- [ ] Open Graph tags para redes sociales
- [ ] Transiciones CSS suaves
- [ ] Estados hover/focus en todos los elementos interactivos

---

## 🎯 Criterios de Éxito S1

### Producto

✅ **Sitio publicado y accesible** en menos de 3 segundos de carga  
✅ **Propuesta de valor clara** en los primeros 5 segundos de visita  
✅ **Navegación funcional** en móvil y desktop  
✅ **Al menos 1 ilustración** de tu trabajo visible

### Proceso

✅ **Planificación documentada** antes de implementar  
✅ **Uso ético de IA** con prompts documentados  
✅ **Commit significativo** que cuenta la historia de S1  
✅ **Reflexión crítica** sobre proceso y aprendizajes

### Aprendizaje

✅ **Entiendes** por qué la web es un medio creativo  
✅ **Dominas** el flujo Git básico (add, commit, push)  
✅ **Aplicas** HTML semántico conscientemente  
✅ **Implementas** un sistema de diseño con variables CSS

---

## 📚 Recursos Adicionales

### Para profundizar

- [MDN: HTML Semántico](https://developer.mozilla.org/es/docs/Glossary/Semantics#sem%C3%A1ntica_en_html)
- [CSS Tricks: Custom Properties](https://css-tricks.com/a-complete-guide-to-custom-properties/)
- [Web.dev: Accesibilidad](https://web.dev/accessibility/)
- [GitHub Pages Docs](https://docs.github.com/es/pages)

### Inspiración

- [Awwwards: Portfolio](https://www.awwwards.com/websites/portfolio/)
- [Siteinspire: Illustration](https://www.siteinspire.com/websites?categories=18)
- [Behance: Web Design](https://www.behance.net/search/projects?field=web%20design)

### Herramientas

- [Coolors](https://coolors.co/) - Generador de paletas
- [Google Fonts](https://fonts.google.com/) - Tipografías web
- [TinyPNG](https://tinypng.com/) - Optimización de imágenes
- [Excalidraw](https://excalidraw.com/) - Wireframes rápidos

---

<table style="width: 100%; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
  <tr>
    <td style="text-align: left;">
      ← Anterior: <a href="{{ '/tracks/es/ilustracion-webapp/' | relative_url }}">Track: Ilustración Aplicada</a>
    </td>
    <td style="text-align: right;">
      Siguiente →: <a href="{{ '/tracks/es/ilustracion-webapp/s2-galerias-layouts-media/' | relative_url }}">S2: Galerías y layouts para tu arte</a>
    </td>
  </tr>
</table>
