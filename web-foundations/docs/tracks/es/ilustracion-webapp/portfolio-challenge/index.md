---
layout: methodology
title: 'Proyecto Final: Portfolio de Ilustración con Scrollytelling'
title_alt: 'Proyecto Final: Portfolio de Ilustración con Scrollytelling'
slug: ilustracion-webapp-portfolio-challenge
date: 2026-02-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/ilustracion-webapp/portfolio-challenge/
description: 'Proyecto final del track Ilustración Aplicada: construye tu portfolio profesional con scrollytelling, vanilla JS y estándares web profesionales.'
tags: [ilustracion, portfolio, scrollytelling, vanilla-js, responsive, web-standards]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> **Documento Vivo:**
> Esta especificación estará siempre disponible en:
> [https://ruvebal.github.io/web-atelier-udit/tracks/es/ilustracion-webapp/portfolio-challenge/](https://ruvebal.github.io/web-atelier-udit/tracks/es/ilustracion-webapp/portfolio-challenge/)

> **Sobre el uso de agentes de IA:**
> **Toda interacción con asistentes de programación basados en IA (Cursor, GitHub Copilot, Claude, ChatGPT) debe seguir un enfoque en dos fases:**
>
> 1. **Fase 1: Planificación** — Pide a la IA que genere un plan de desarrollo para la tarea/feature concreta
> 2. **Fase 2: Implementación** — Solo después de documentar el plan, pasa a implementar
>
> Documenta cada plan en `./docs/plan1.md`, `./docs/plan2.md`, `./docs/plan3.md`, etc., antes de implementar la feature correspondiente. Esto garantiza una arquitectura intencional y evita la generación de código sin rumbo.
>
> **Metodología completa:** [Guía de trabajo con agentes de IA]({{ '/methodology/es/ai-practical-guide/' | relative_url }})
>
> **Nota:** Este documento se creó siguiendo precisamente esta metodología.

---

## La filosofía: Tu portfolio, tu historia

Este proyecto final **no** va de crear «otro portfolio más». Ya hay suficientes portfolios estáticos perdidos en GitHub que nunca se actualizarán después de recibir una nota. En lugar de eso, vas a construir **tu portfolio profesional real**: una presencia digital que refleje tu identidad como ilustrador/a y que puedas usar para conseguir clientes, oportunidades y trabajo.

Piensa en ello como **tu carta de presentación digital**. Estás creando:

- Una vitrina profesional de tu trabajo de ilustración
- Una demostración de tus capacidades técnicas web
- Una experiencia narrativa que cuenta tu historia
- Un portfolio que evolucionará contigo a lo largo de tu carrera

Este portfolio debería estar tan bien construido que, cuando alguien te pregunte «¿tienes portfolio?», puedas compartir el enlace con orgullo y confianza.

### El enfoque Atelier Web

En nuestro método de atelier creemos en el **aprender haciendo**, con teoría, práctica y reflexión compartida. Este proyecto encarna esa filosofía:

1. **Teoría**: Has visto diseño responsive, galerias, layouts, frameworks y UX/UI a lo largo del curso.
2. **Práctica**: Ahora lo integras todo en tu proyecto profesional coherente.
3. **Reflexión**: Documentarás tus decisiones, criticarás tu trabajo y compartirás con la comunidad del curso.

El desarrollo web profesional no consiste en memorizar frameworks, sino en entender principios y aplicarlos creativamente.

---

## Visión general del proyecto

### Qué vas a construir

Un **portfolio profesional de ilustración** con experiencia de scrollytelling que demuestre:

- Estándares profesionales de desarrollo web
- Principios de diseño responsive, fluido e intrínseco
- Técnicas modernas de CSS y animaciones cuidadas
- Código limpio, mantenible y bien documentado
- Buenas prácticas de despliegue y control de versiones
- Tu identidad visual única y capacidad de contar historias
- Tu trabajo de ilustración presentado de forma profesional

### Stack tecnológico: Fundamentos en Vanilla

**Stack tecnológico obligatorio:**

- HTML5, CSS3, JavaScript (ES6+)
- Todas las dependencias vía CDN (sin herramientas de build)
- Enfoque en los fundamentos y en una arquitectura limpia
- ImageKit.io para optimización de imágenes

**Ideal para:**

- Consolidar las tecnologías web básicas
- Proyectos que enfatizan HTML semántico y JS vanilla
- Aprender despliegue sin la complejidad de un build
- Portfolios de ilustración con foco en el contenido visual

**Competencias clave:**

- Manipulación del DOM sin frameworks
- Arquitectura CSS (custom properties, estructura lógica)
- Diseño responsive con media queries
- Mentalidad de mejora progresiva (_progressive enhancement_)
- Optimización de imágenes para web

---

## Requisitos del proyecto

### 1. Repositorio y control de versiones

- **Repositorio en GitHub** con nombre claro y descriptivo (por ejemplo, `portfolio-ilustracion-2026`)
- **Mensajes de commit significativos** siguiendo un estilo tipo Conventional Commits
- **`.gitignore` completo** (excluye `.DS_Store`, configuraciones de IDE, etc.)
- **Tag de Git** para la entrega final: `v1.0.0`
- **GitHub Release** creado a partir del tag con notas de versión

### 2. Despliegue

- **Hosting en GitHub Pages** con URL pública y accesible
- **Página 404 personalizada** con navegación de vuelta a inicio
- **HTTPS activado** (automático en GitHub Pages)
- **Verificación del despliegue** (todos los assets cargan, sin enlaces rotos)

### 3. Documentación

- **README.md** con:
  - Enlace al despliegue **en la primera línea**
  - Descripción y propósito del proyecto
  - Stack tecnológico utilizado
  - Instrucciones de configuración para desarrollo local
  - Capturas de pantalla o GIF de demo
  - Créditos y agradecimientos

- **LICENSE** en la raíz (recomendada: [MIT](https://choosealicense.com/licenses/mit/))

- **Política de uso de agentes de IA**: si utilizas asistentes de IA, incluye una sección clara en el README describiendo cuándo y cómo se ha usado la IA. **Crítico:** toda interacción con IA debe seguir un **flujo en dos fases**:
  1. **Fase 1: Planificación** — Solicitar a la IA un plan de desarrollo
  2. **Fase 2: Implementación** — Solo después de documentar el plan, pasar a código

- **`docs/plan1.md, plan2.md, plan3.md...`**: para cada feature o tarea en la que uses IA, crea un archivo de plan independiente:
  - `docs/plan1.md` — Primera feature/tarea (ej. «Componente de navegación responsive»)
  - `docs/plan2.md` — Segunda feature/tarea (ej. «Galería con lightbox»)
  - `docs/plan3.md` — Tercera feature/tarea (ej. «Animaciones de scroll reveal»)
  - Cada plan debe contener:
    - Tu prompt/pregunta a la IA
    - La respuesta completa de la IA (el plan)
    - Notas breves sobre qué se implementó del plan
  - **Nunca te saltes la fase de planificación** — implementar sin plan documentado vacía de sentido el desarrollo estructurado

- **Higiene profesional de commits**: usa títulos descriptivos, resúmenes claros y commits que documenten tu proceso y decisiones.

- **Antes de usar un agente de IA para implementar:** haz siempre un commit de tu estado (pre‑IA) con un mensaje claro (por ejemplo, `feat(gallery): before applying AI planning`). Esto preserva tu trabajo original y crea un historial transparente de lo que cambió con ayuda de IA.

**Archivos mínimos obligatorios:**

- `README.md`
- `LICENSE`
- `.gitignore`
- `404.html` (página de error personalizada)
- `project-brief.md` (tu brief de contenidos preparados)
- `docs/plan1.md` (si usas IA para cualquier feature; crea `plan2.md`, `plan3.md`, etc. según necesites)

**Recomendado:**

- `project-inspiration.md` (tus referencias visuales y moodboard)

### 4. Diseño responsive (fluido + elástico + intrínseco)

Referencia: [Lección de Diseño Responsive]({{ '/lessons/es/responsive/' | relative_url }})

- Enfoque **mobile-first** con mejora progresiva
- **Tipografía fluida** usando `clamp()` para una escala suave
- **Layouts elásticos** que se adaptan al contexto del contenedor
- **Diseño intrínseco** con CSS Grid `auto-fit` y `minmax()`
- **Efectos de parallax y scroll** integrados en la estrategia de layout
- **Pruebas en distintos breakpoints**: móvil (320px-480px), tablet (481px-768px), escritorio (769px+)

### 5. Semántica y estructura HTML

- **HTML5 semántico** (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- **Jerarquía de encabezados correcta** (un solo `<h1>`, estructura lógica `<h2>`–`<h6>`)
- **Formularios accesibles** con `<label>` asociado y atributos ARIA cuando sea necesario
- **Estructura de directorios coherente**:

```
portfolio-ilustracion/
├── index.html
├── 404.html
├── README.md
├── LICENSE
├── .gitignore
├── project-brief.md          # Contenidos preparados
├── project-inspiration.md    # Referencias visuales (opcional)
├── docs/                     # Documentación y planes
│   ├── plan1.md              # Plan de desarrollo feature 1
│   ├── plan2.md              # Plan de desarrollo feature 2
│   └── plan3.md              # Plan de desarrollo feature 3
├── assets/
│   ├── css/
│   │   ├── index.css         # archivo "barrel": centraliza todos los imports de CSS
│   │   ├── base.css          # reset, variables, estilos de raíz
│   │   ├── layout.css        # utilidades de layout/grid/flex
│   │   ├── components.css    # estilos compartidos de componentes
│   │   └── [otros].css       # añade según necesidad
│   ├── js/
│   │   └── main.js
│   └── images/               # solo imágenes locales necesarias (favicon, etc.)
│       └── inspiration/      # capturas de referencia (opcional, no se despliegan)
└── [imágenes en ImageKit]    # todas las imágenes de proyectos
```

### 6. Metadatos e identidad visual

Referencia: [Lección de Metadatos e Identidad Visual]({{ '/lessons/es/metadata-visual-identity-web/' | relative_url }})

- **Metadatos completos en `<head>`**:
  - Título, descripción, palabras clave
  - Open Graph (Facebook/LinkedIn)
  - Twitter Card
  - Meta viewport
  - Meta theme-color
- **Favicon** (varios tamaños: 16×16, 32×32, 180×180 para Apple Touch)
- **Manifest.json** (opcional pero recomendable para preparación PWA)
- **Identidad visual consistente**: paleta de color, tipografía, iconografía

### 7. Calidad de código y estándares

Referencia: [Lección de Linting y Formateo]({{ '/lessons/es/linting-and-formatting/' | relative_url }})

- **Prettier** para formato consistente
- **ESLint** para linting de JavaScript (o JSHint como mínimo)
- **Stylelint** para CSS (opcional pero recomendable)
- **Sin errores de consola** en la versión desplegada
- **Código comentado** explicando la lógica o decisiones de diseño complejas
- **Organización CSS**: variables, reset, layout, componentes, utilidades
- **Organización JavaScript**: funciones claras, sin contaminar el espacio global

### 8. Accesibilidad básica

- **Contraste de color** que cumpla WCAG AA (4.5:1 para texto de cuerpo)
- **`prefers-reduced-motion`** para desactivar animaciones cuando el usuario lo solicite
- **Texto alternativo** en todas las imágenes con significado
- **Navegación por teclado** funcional en los elementos interactivos
- **Enlace de «saltar al contenido»** para lectores de pantalla (opcional pero apreciado)

---

## Componentes técnicos a implementar

### Secciones obligatorias del portfolio

Tu portfolio debe incluir estas secciones, basadas en tu `project-brief.md`:

#### 1. **Navegación Sticky**

Referencia: [Ejemplo de Navegación](/student-project-template/docs/ejemplo-navegacion.md)

- Menú responsive (hamburguesa en móvil)
- Scroll suave a secciones
- Indicación de estado activo
- Posicionamiento fijo/pegajoso
- **Elige tu estilo**: Hamburguesa Overlay, Sidebar Deslizante o Mega Menu

#### 2. **Sección Hero**

- Titular y tagline de tu `project-brief.md`
- Tu nombre y especialización
- Imagen o gradiente de fondo
- Botón de llamada a la acción (scroll a portfolio)
- Indicador de scroll (opcional)

#### 3. **Sección About**

- Bio corta de tu `project-brief.md`
- Estadísticas personales (3 stats con números)
- Foto de perfil (opcional)
- Artist statement (opcional)

#### 4. **Sección My Work / Especialidades**

- 3 cards con tus áreas de especialización
- Iconos o ilustraciones representativas
- Descripciones breves (1-2 frases)
- Layout con CSS Grid o Flexbox

#### 5. **Sección Timeline / Proceso Creativo**

- 3 pasos de tu proceso creativo
- Visualización tipo timeline o steps
- Descripciones claras de cada fase
- Animaciones de reveal al hacer scroll

#### 6. **Sección Skills / Herramientas**

- 3 cards con categorías de skills
- Herramientas digitales
- Técnicas tradicionales
- Especialidades
- Iconos o badges visuales

#### 7. **Galería de Proyectos**

**CRÍTICO**: Mínimo 3-6 proyectos de ilustración

- Grid responsive con CSS Grid
- Imágenes servidas desde ImageKit
- Lightbox funcional (opcional pero recomendado)
- Información de proyecto al hover o click
- Categorías/filtros (opcional)

**Optimización ImageKit obligatoria:**

```html
<!-- Thumbnail en grid -->
<img
	src="https://ik.imagekit.io/tu-id/proyecto1.jpg?tr=w-400,h-300,q-80,f-auto"
	alt="Descripción accesible del proyecto" />

<!-- Full-size para lightbox -->
<img src="https://ik.imagekit.io/tu-id/proyecto1.jpg?tr=w-1200,q-85,f-auto" alt="Descripción accesible del proyecto" />
```

#### 8. **Sección de Contacto**

- Email de tu `project-brief.md`
- Enlaces a redes sociales (Instagram, Behance, LinkedIn, etc.)
- CTA final personalizado
- Formulario de contacto (opcional, puede usar Formspree)

#### 9. **Footer**

- Aviso de copyright
- Enlaces rápidos a secciones
- Botón para volver arriba (opcional)
- Enlace al repositorio en GitHub

### Animación e interactividad

#### Animaciones CSS (obligatorio)

Referencia: [Lección de Animaciones CSS]({{ '/lessons/es/web-animations/css/' | relative_url }})

- **Transiciones** para estados _hover_, interacciones de botones
- **Animaciones con `@keyframes`** para entrada del hero, estados de carga
- **Scroll reveal** para secciones (Intersection Observer API)
- **Parallax** con CSS `transform: translateY()` y JavaScript

#### JavaScript vanilla (obligatorio)

- Navegación responsive con toggle de menú
- Smooth scroll a secciones
- Scroll reveal con Intersection Observer
- Lightbox para galería (opcional pero recomendado)
- Lazy loading de imágenes

### Tipografía

Referencia: [Lección de Tipografía y Color]({{ '/lessons/es/tipografia-color/' | relative_url }})

- **Sistema tipográfico fluido** con `clamp()`:

```css
:root {
	--text-base: clamp(1rem, 2.5vw, 1.125rem);
	--text-lg: clamp(1.125rem, 3vw, 1.25rem);
	--text-xl: clamp(1.25rem, 4vw, 1.5rem);
	--text-2xl: clamp(1.5rem, 5vw, 2rem);
	--text-3xl: clamp(2rem, 6vw, 3rem);
}
```

- **Google Fonts** (máximo 3 familias)
- **Interlineados responsivos**
- **Jerarquía visual clara**

### Tendencias de diseño (elige 2–3)

Referencia: [Lección de Tendencias Modernas de Diseño Web]({{ '/lessons/es/modern-web-design-trends/' | relative_url }})

- **Glassmorphism**: efecto de vidrio esmerilado con `backdrop-filter: blur()`
- **Parallax**: diferentes velocidades de scroll para dar profundidad
- **Modo oscuro**: toggle con custom properties + estado en JavaScript
- **Fondos en gradiente**: transiciones modernas y vibrantes
- **Scroll-snapping**: navegación por secciones
- **Micro‑interacciones**: pequeñas animaciones de placer al interactuar

---

## Preparación de contenidos: project-brief.md

**ANTES de empezar a programar**, debes completar tu `project-brief.md` con todos tus contenidos preparados. Este archivo es tu **fuente de verdad** para el proyecto.

### Contenidos obligatorios en project-brief.md

Usa la plantilla en `/student-project-template/project-brief.md` y completa:

1. **Concepto del Portfolio** (3 preguntas)
2. **Identidad Visual**:
   - Estilo visual principal (palabras clave)
   - Paleta de colores (5 colores con hex codes)
   - Tipografías (títulos + body con Google Fonts)
   - Verificación de contraste WCAG AA
3. **Contenidos Preparados**:
   - Bio corta (2-3 párrafos)
   - Tagline para hero (1 frase)
   - Estadísticas personales (3 stats)
   - Áreas de especialización (3 especialidades)
   - Proceso creativo (3 pasos)
   - Herramientas y skills (3 cards)
4. **Proyectos para Galería** (mínimo 6):
   - URL de ImageKit
   - Título
   - Descripción (1 frase)
   - Categoría
   - Alt text descriptivo
5. **Información de Contacto**:
   - Email
   - Redes sociales
   - CTA final

### Checklist de preparación

- [ ] `project-brief.md` completado al 100%
- [ ] Paleta de colores verificada con [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ ] Tipografías seleccionadas de [Google Fonts](https://fonts.google.com/)
- [ ] Mínimo 6 proyectos de ilustración listos
- [ ] Todas las imágenes subidas a ImageKit
- [ ] URLs de ImageKit con transformaciones probadas
- [ ] Alt text descriptivo para cada imagen
- [ ] Bio, tagline y contenidos revisados

**IMPORTANTE**: No empieces a programar hasta que este checklist esté completo. Programar sin contenidos es como ilustrar sin boceto.

---

## Rúbrica de evaluación (indicativa)

Tu proyecto se evaluará tanto por la **excelencia técnica** (60 puntos) como por el **diseño y factores humanos** (40 puntos). Este equilibrio refleja que el desarrollo web profesional exige tanto una buena ingeniería como una experiencia de usuario cuidada.

### Excelencia técnica (60 puntos)

#### 1. Calidad de código y arquitectura (15 puntos)

- **[5 pts]** Estructura de código limpia y bien organizada
- **[3 pts]** Uso adecuado de custom properties de CSS y features modernas
- **[3 pts]** JavaScript sigue buenas prácticas (vanilla, sin jQuery)
- **[2 pts]** Código formateado y linteado (Prettier + ESLint)
- **[2 pts]** Comentarios significativos que explican la lógica compleja

#### 2. Despliegue y configuración de repositorio (10 puntos)

- **[3 pts]** Repositorio en GitHub bien configurado con README claro
- **[3 pts]** Despliegue en GitHub Pages, completamente funcional
- **[2 pts]** Tag de Git (`v1.0.0`) y GitHub Release creados
- **[2 pts]** `.gitignore` completo e historial de commits limpio

#### 3. Implementación de diseño responsive (15 puntos)

- **[5 pts]** Sistema tipográfico fluido con `clamp()`
- **[4 pts]** Layout mobile-first funcionando en todos los breakpoints
- **[3 pts]** Efectos de parallax y scroll integrados en el layout
- **[3 pts]** Principios de diseño intrínseco (CSS Grid auto‑fit, responsive)

#### 4. Animaciones e interactividad (10 puntos)

- **[4 pts]** Animaciones suaves y con propósito (CSS y vanilla JS)
- **[3 pts]** Componentes interactivos (navegación, galería, scroll reveal)
- **[3 pts]** Implementación de `prefers-reduced-motion` para accesibilidad

#### 5. Semántica HTML y accesibilidad (10 puntos)

- **[4 pts]** Estructura HTML5 semántica con jerarquía de encabezados correcta
- **[3 pts]** Metadatos completos en `<head>` y favicon
- **[3 pts]** Accesibilidad básica: contraste, alt text, navegación por teclado

---

### Diseño y factores humanos (40 puntos)

#### 6. Contenidos y preparación (12 puntos)

- **[5 pts]** `project-brief.md` completado con todos los contenidos
- **[4 pts]** Mínimo 6 proyectos de ilustración con descripciones
- **[3 pts]** Imágenes optimizadas con ImageKit correctamente

#### 7. Estética visual y coherencia (10 puntos)

- **[4 pts]** Diseño visual profesional y pulido
- **[3 pts]** Sistema coherente de color y tipografía
- **[3 pts]** Lenguaje visual consistente (espaciados, tamaños, patrones)

#### 8. Creatividad y firma personal (10 puntos)

- **[4 pts]** Toques creativos que distinguen el portfolio
- **[3 pts]** Estilo personal evidente en las decisiones de diseño
- **[3 pts]** Uso reflexivo de tendencias (no solo copiar ejemplos)

#### 9. Narratividad y _storytelling_ (8 puntos)

- **[4 pts]** Flujo narrativo claro que guía al usuario por las secciones
- **[4 pts]** Estructura de contenido que cuenta tu historia como ilustrador/a

---

## Estándares profesionales web: checklist antes de entregar

Antes de entregar, verifica **cada ítem** de esta checklist. Las personas profesionales no publican trabajo sin un pase mínimo de calidad.

### Repositorio y control de versiones

- [ ] El repositorio tiene un nombre claro y descriptivo
- [ ] Existe `README.md` con el enlace de despliegue en la parte superior
- [ ] El README incluye instrucciones de instalación (si corresponde) y stack tecnológico
- [ ] `.gitignore` es completo y adecuado
- [ ] El historial de commits es limpio, con mensajes significativos
- [ ] Tag `v1.0.0` creado
- [ ] GitHub Release creado con notas de versión
- [ ] No hay información sensible en el repo

### Verificación del despliegue

- [ ] El sitio está en vivo en GitHub Pages en una URL pública
- [ ] Todas las páginas cargan sin errores (mira la consola del navegador)
- [ ] Todas las imágenes cargan correctamente desde ImageKit
- [ ] No hay enlaces rotos (internos ni externos)
- [ ] La página 404 personalizada funciona y permite volver al inicio
- [ ] HTTPS está activado (automático en GitHub Pages)
- [ ] El sitio funciona en modo incógnito/privado

### Comportamiento responsive

- [ ] Móvil (320px): el layout es usable, sin scroll horizontal
- [ ] Móvil (480px): todo el contenido es legible y accesible
- [ ] Tablet (768px): el layout se adapta correctamente
- [ ] Escritorio (1024px): el layout completo se ve como se espera
- [ ] Escritorio grande (1920px): sin huecos absurdos ni estiramientos raros
- [ ] Cambios de orientación (vertical/horizontal) gestionados con gracia

### Calidad de código

- [ ] HTML valida (usa [W3C Validator](https://validator.w3.org/))
- [ ] CSS está organizado y sigue un sistema de nombres coherente
- [ ] JavaScript no produce errores de consola en producción
- [ ] Código formateado con Prettier
- [ ] Código linteado (ESLint para JS)
- [ ] Los comentarios explican el «por qué», no el «qué»

### HTML semántico y estructura

- [ ] Elementos HTML5 semánticos usados correctamente
- [ ] Un solo `<h1>` por página, jerarquía de encabezados lógica
- [ ] Todas las imágenes tienen atributos `alt` descriptivos
- [ ] Los formularios tienen `<label>` correctamente asociados (si aplica)
- [ ] La estructura de directorios es lógica y limpia

### Diseño y animaciones

- [ ] Sistema tipográfico fluido implementado con `clamp()`
- [ ] Al menos 2 tendencias de diseño modernas implementadas
- [ ] Animaciones CSS suaves (idealmente 60fps, sin _jank_)
- [ ] `prefers-reduced-motion` desactiva animaciones cuando procede
- [ ] Estados hover en elementos interactivos
- [ ] Scroll reveal funcional con Intersection Observer

### Metadatos e identidad visual

- [ ] `<title>` descriptivo y único
- [ ] Meta descripción existe y es convincente (150–160 caracteres)
- [ ] Etiquetas Open Graph completas (`og:title`, `og:description`, `og:image`, `og:url`)
- [ ] Etiquetas Twitter Card completas
- [ ] Favicon existe y se ve correctamente (múltiples tamaños)
- [ ] Meta viewport configurada: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] Meta theme-color configurada

### Rendimiento

- [ ] Imágenes via CDN
- [ ] CSS minificado (para nivel `programación`)
- [ ] Sin CSS o JS no utilizados
- [ ] Fuentes cargadas eficientemente (`font-display: swap`). (para nivel `programación`)
- [ ] La página carga en menos de 3 segundos en 3G

### Accesibilidad (básica)

- [ ] Contraste de color cumple WCAG AA (4.5:1 para texto de cuerpo)
- [ ] Todos los elementos interactivos son navegables con teclado
- [ ] `prefers-reduced-motion` implementado
- [ ] Los estados de foco son visibles en elementos interactivos
- [ ] No hay información que dependa solo del color

### Contenidos

- [ ] `project-brief.md` completado al 100%
- [ ] Mínimo 6 proyectos de ilustración en la galería
- [ ] Todas las secciones obligatorias implementadas
- [ ] Bio, tagline y contenidos revisados y sin errores
- [ ] Alt text descriptivo en todas las imágenes

### Vanilla JS específico

- [ ] Todas las dependencias vía CDN (sin pasos de build)
- [ ] JavaScript en vanilla, sin jQuery ni frameworks
- [ ] Uso de custom properties de CSS para tematización
- [ ] Intersection Observer para scroll reveal
- [ ] Event listeners bien organizados

---

## Plan de desarrollo en cuatro sesiones

Este proyecto se desarrolla durante las 4 sesiones del track, con apoyo del profesor, colaboración entre pares y uso de agentes de IA (documentando siempre la planificación).

### Sesión 1 (S1): Preparación y base

**Objetivo:** Establecer contenidos, estructura del proyecto y despliegue inicial

#### Tareas:

1. **Preparación de contenidos** (CRÍTICO)
   - Completar `project-brief.md` al 100%
   - Definir paleta de colores y tipografías
   - Verificar contraste con WebAIM
   - Preparar bio, tagline, estadísticas
   - Seleccionar y subir mínimo 6 proyectos a ImageKit
   - Probar URLs de ImageKit con transformaciones

2. **Configuración del repositorio**
   - Crear repositorio en GitHub con nombre claro
   - Inicializar con README
   - Crear `.gitignore`
   - Preparar entorno de desarrollo local

3. **Estructura del proyecto**
   - Crear estructura de directorios (assets/css, assets/js, docs)
   - Montar `index.html` con esqueleto semántico
   - Crear página `404.html`

4. **Arquitectura CSS**
   - Definir custom properties para colores, espaciado y tipografía
   - Crear reset/normalize CSS
   - Configurar estilos tipográficos base
   - Cargar Google Fonts

5. **Despliegue inicial**
   - Configurar GitHub Pages
   - Desplegar la primera versión
   - Verificar que el despliegue funciona

**Entregable:** `project-brief.md` completado + sitio en vivo con estructura básica

---

### Sesión 2 (S2): Layout responsive y secciones principales

**Objetivo:** Construir el layout principal con diseño responsive y fluido

#### Tareas:

1. **Sistema tipográfico fluido**
   - Implementar una escala tipográfica basada en `clamp()`
   - Probar la escala en distintos breakpoints
   - Garantizar legibilidad en todos los tamaños

2. **HTML de secciones principales**
   - Construir sección hero con CTA
   - Crear la estructura de la sección About
   - Montar sección My Work (3 especialidades)
   - Añadir sección Timeline (proceso creativo)
   - Crear sección Skills (herramientas)
   - Añadir sección de contacto
   - Crear el footer

3. **Layout responsive**
   - Implementar CSS mobile-first
   - Añadir media queries para tablet y escritorio
   - Probar el layout en todos los breakpoints
   - Asegurar ausencia de scroll horizontal en móvil

4. **Layouts con Grid/Flexbox**
   - CSS Grid para especialidades y skills
   - Flexbox para navegación y componentes más pequeños
   - Asegurar comportamiento intrínseco

**Entregable:** Layout completamente responsive con todas las secciones (excepto galería)

---

### Sesión 3 (S3): Navegación, animaciones e interactividad

**Objetivo:** Añadir capa de pulido con navegación, animaciones y componentes interactivos

#### Tareas:

1. **Navegación sticky responsive**
   - Implementar navegación con menú hamburguesa en móvil
   - Scroll suave a secciones
   - Indicación de estado activo
   - Posicionamiento fijo/pegajoso
   - Usar ejemplo de navegación como referencia

2. **Animaciones CSS**
   - Transiciones para estados hover (botones, cards, enlaces)
   - Animaciones con `@keyframes` para la entrada del hero
   - Efectos de parallax con CSS `transform`

3. **JavaScript vanilla**
   - Toggle de menú responsive
   - Smooth scroll a secciones
   - Scroll reveal con Intersection Observer
   - Parallax con JavaScript

4. **Accesibilidad del movimiento**
   - Implementar media query `prefers-reduced-motion`
   - Probar con la preferencia de movimiento reducida activada
   - Garantizar que la funcionalidad principal no depende de las animaciones

5. **Pruebas de rendimiento**
   - Verificar que las animaciones corren a 60fps
   - Optimizar animaciones con _jank_
   - Asegurar rendimiento suave en móvil

**Entregable:** Sitio con navegación funcional, animaciones pulidas y buena UX

---

### Sesión 4 (S4): Galería, metadatos y pulido final

**Objetivo:** Completar galería de proyectos, metadatos y preparar entrega

#### Tareas:

1. **Galería de proyectos** (CRÍTICO)
   - Implementar grid responsive con CSS Grid
   - Integrar mínimo 6 proyectos con ImageKit
   - Lightbox funcional (opcional pero recomendado)
   - Lazy loading de imágenes
   - Alt text descriptivo en todas las imágenes

2. **Implementación de metadatos**
   - Completar todas las etiquetas meta en `<head>`
   - Crear imagen Open Graph (1200×630px)
   - Configurar etiquetas Twitter Card
   - Añadir meta theme-color

3. **Favicon e identidad visual**
   - Diseñar y generar paquete de favicon (múltiples tamaños)
   - Crear `manifest.json` (opcional)
   - Asegurar identidad visual consistente en todas las secciones

4. **Implementación de tendencias de diseño**
   - Escoger e implementar 2–3 tendencias modernas
   - Glassmorphism, parallax, gradientes, etc.
   - Asegurarse de que las tendencias suman y no distraen

5. **Revisión completa con checklist**
   - Pasar por toda la checklist de pre‑entrega
   - Corregir cualquier problema detectado
   - Documentar limitaciones conocidas

6. **Pase de calidad de código**
   - Ejecutar Prettier en todos los archivos
   - Ejecutar ESLint y corregir issues
   - Eliminar `console.log` y código comentado
   - Verificar que los comentarios restantes son útiles

7. **Pruebas cross‑browser**
   - Probar en Chrome, Firefox, Safari, Edge
   - Móvil: Safari en iOS y Chrome en Android
   - Corregir problemas específicos de cada navegador

8. **Optimización de rendimiento**
   - Verificar optimización de imágenes con ImageKit
   - Minificar CSS y JS (opcional)
   - Medir velocidad de carga con DevTools
   - Objetivo: < 3 segundos en 3G

9. **Documentación final**
   - Actualizar README con detalles finales
   - Añadir capturas de pantalla o GIF de demo
   - Documentar instrucciones con claridad
   - Añadir información de licencia

10. **Control de versiones y entrega**
    - Commit final con mensaje «Release v1.0.0»
    - Crear tag: `git tag -a v1.0.0 -m "Final submission"`
    - Hacer push del tag: `git push origin v1.0.0`
    - Crear GitHub Release a partir del tag con notas

**Entregable:** Portfolio profesional completo y listo para entrega

---

## Requisitos de entrega

### Cuando estés listo para entregar:

1. **Verifica el despliegue**
   - Confirma que el sitio está en vivo en tu URL de GitHub Pages
   - Prueba en modo incógnito/privado para evitar problemas de caché
   - Revisa la consola por errores

2. **Crea el tag de Git** (opcional hacerlo en la consola)

Si no haces este paso en la terminal, podrás hacer el `tag` cuando vayas a hacer el `release`en Github (paso 3).

```bash
git tag -a v1.0.0 -m "Portfolio de ilustración v1.0.0"
git push origin v1.0.0
```

3. **Crea la GitHub Release**
   - Ve al repositorio en GitHub
   - Haz clic en «Releases» → «Create a new release»
   - Elige el tag `v1.0.0` si lo has creado en el paso 2, o créalo ahora.
   - Título: «Portfolio de Ilustración v1.0.0»
   - Descripción: notas breves de la release (qué incluye, features clave)
   - Publica la release

4. **Confirmación de entrega**
   - Verifica que tu GitHub Release es pública
   - Asegúrate de que el README tiene el enlace de despliegue bien visible arriba
   - Revisa por última vez toda la checklist

---

## Recursos y referencias

### Lecciones esenciales

- [Responsive (canónica)]({{ '/lessons/es/responsive/' | relative_url }}) — Diseño fluido, elástico e intrínseco
- [Animaciones CSS]({{ '/lessons/es/web-animations/css/' | relative_url }}) — Transiciones, keyframes, scroll‑driven
- [Tipografía y Color]({{ '/lessons/es/tipografia-color/' | relative_url }}) — Tipografía fluida y sistemas de color
- [Tendencias Modernas de Diseño Web]({{ '/lessons/es/modern-web-design-trends/' | relative_url }}) — Glassmorphism, parallax, dark mode
- [Metadatos e Identidad Visual]({{ '/lessons/es/metadata-visual-identity-web/' | relative_url }}) — Guía completa de metadatos
- [Linting y Formateo]({{ '/lessons/es/linting-and-formatting/' | relative_url }}) — Estándares de calidad de código
- [Metodología de trabajo con IA]({{ '/methodology/es/ai-practical-guide/' | relative_url }}) — Flujo en dos fases

### Plantillas y ejemplos

- [Plantilla project-brief.md](/student-project-template/project-brief.md) — Contenidos preparados
- [Plantilla project-inspiration.md](/student-project-template/project-inspiration.md) — Referencias visuales
- [Ejemplo de navegación](/student-project-template/docs/ejemplo-navegacion.md) — 3 opciones de navegación

### Herramientas externas

- [W3C HTML Validator](https://validator.w3.org/) — Validar HTML
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — Comprobar contraste de color
- [PageSpeed Insights](https://pagespeed.web.dev/) — Probar rendimiento
- [ImageKit.io](https://imagekit.io/) — CDN para optimizar imágenes (OBLIGATORIO)
- [Formspree](https://formspree.io/) — Backend para formularios de contacto (plan gratuito)
- [Google Fonts](https://fonts.google.com/) — Tipografías web gratuitas
- [Coolors](https://coolors.co/) — Generador de paletas de color
- [Lucide Icons](https://lucide.dev/) — Iconos consistentes y bonitos

---

## FAQ y resolución de problemas

### «Mi sitio en GitHub Pages muestra un error 404»

**Comprueba:**

- En _Settings → Pages_: ¿Está activado Pages y apunta a la rama/carpeta correcta?
- ¿Has hecho push de tus commits y esperado 1–2 minutos al despliegue?
- ¿Tu `index.html` está en la raíz?

### «Mis imágenes de ImageKit no cargan»

**Comprueba:**

- ¿Las URLs de ImageKit son correctas y públicas?
- ¿Has probado las URLs directamente en el navegador?
- ¿Las transformaciones son correctas? (`tr=w-400,h-300,q-80,f-auto`)
- Mira la consola del navegador para localizar errores 404 concretos

### «Las animaciones van a tirones en móvil»

**Optimiza:**

- Usa `transform` y `opacity` para animar (aprovecha la GPU)
- Evita animar `width`, `height`, `top`, `left`
- Añade `will-change` en elementos que vayan a animarse (con moderación)
- Prueba en un dispositivo móvil real, no solo en DevTools
- Reduce la complejidad de animaciones o respeta `prefers-reduced-motion`

### «Mi sitio es demasiado lento»

**Optimiza:**

- Verifica que todas las imágenes usan ImageKit con transformaciones
- Reduce el tamaño de las transformaciones si es necesario
- Carga fuentes de forma eficiente (`font-display: swap`)
- Defer scripts no críticos
- Usa lazy loading para imágenes

### «Estoy atascado y no sé por dónde empezar»

**Estrategias:**

- Revisa el plan de sesiones — síguelo paso a paso
- Empieza por la Sesión 1 aunque parezca básico
- **COMPLETA `project-brief.md` ANTES de programar**
- Mira el ejemplo de navegación para inspirarte
- Pregunta en clase — es muy probable que tus compañeras tengan dudas parecidas
- Si usas IA: sigue el enfoque en dos fases — pide un plan primero (documéntalo en `docs/plan1.md`, `plan2.md`, etc.), luego implementa poco a poco

### «¿Puedo usar jQuery o Bootstrap?»

Para este proyecto, **NO**. El objetivo es demostrar dominio de vanilla JavaScript y CSS moderno. Esto te obliga a entender de verdad la plataforma web y te prepara para cualquier framework futuro.

### «¿Puedo usar un framework de animaciones como GSAP?»

Para este proyecto, **NO**. Usa animaciones CSS y JavaScript vanilla con Intersection Observer. Esto demuestra que entiendes los fundamentos antes de usar librerías.

### «¿Y si quiero ir más allá?»

Si ya dominas los conceptos básicos y cumples la checklist, ¡puedes explorar todo lo que quieras!

- ¿Quieres trabajar con herramientas modernas (Vite, SASS, PostCSS, ES Modules, etc.)? Adelante.
- ¿Te interesa experimentar con algún framework (React, Vue, Svelte) solo por probar? Haz un fork y juégatela (aunque recuerda que para la entrega pedida, la versión base debe ser vanilla JS).
- Puedes añadir animaciones avanzadas (WebGL, SVG, Three.js), integración con APIs, componentes personalizados, lo que desees.
- Documenta estos extras en tu README: explica qué usas, cómo lo implementas y para qué sirve.

Lo importante es que se note **tu intención, aprendizaje y documentación del proceso**—las herramientas son un medio, no el objetivo.

¡Diviértete y presume tu portfolio avanzado si llegaste hasta aquí!

---

## Sobre el perfeccionismo y la iteración

Un poco de realidad (y ánimo): este portfolio **no será perfecto**. Ese no es el objetivo. El desarrollo profesional va de publicar trabajo **suficientemente bueno**, aprender de él e iterar.

Probablemente te veas a las 3 de la mañana ajustando una animación hover 50 milisegundos. Esa es la señal para hacer commit y apagar el ordenador. El portfolio puede —y debe— evolucionar después de la entrega. Los portfolios reales son documentos vivos, que se actualizan a medida que tú creces.

Construye algo de lo que puedas sentirte orgullosa, cumple los requisitos y recuerda: un portfolio entregado gana por goleada a uno perfecto que nunca sale de borradores.

Tu yo futuro —y tus futuros clientes— te lo agradecerán por haber construido bien esta base. Ahora ve y crea algo excelente.

---

## Conclusión

Este proyecto final sintetiza todo lo que has aprendido en el track de Ilustración Aplicada: HTML semántico, CSS responsive, galerias, layouts, frameworks y UX/UI. Más importante aún, estás construyendo **tu portfolio profesional real**: una herramienta que vas a usar para conseguir clientes, oportunidades y trabajo.

Aborda este proyecto con intención. Documenta tus decisiones. Colabora con tus compañeras. Haz preguntas. Usa la IA con cabeza (y con planes). Y, sobre todo, **entrégalo**. La web necesita más portfolios de ilustración hechos con cariño, y estás a punto de añadir uno más al ecosistema.

---

**¿Dudas o necesitas aclaración?**
Revisa las lecciones enlazadas, consulta al profesor en clase, colabora con tus compañeras y documenta tu proceso. Nos vemos en la meta con tu release `v1.0.0`.
