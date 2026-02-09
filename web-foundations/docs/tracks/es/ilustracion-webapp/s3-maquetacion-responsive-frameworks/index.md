---
layout: lesson
title: 'Personalización del Portfolio Scrollytelling'
title_alt: 'Personalización del Portfolio Scrollytelling'
slug: ilustracion-webapp-s3
date: 2026-01-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/ilustracion-webapp/s3-maquetacion-responsive-frameworks/
description: 'Tercera sesión: personaliza tu portfolio scrollytelling con tus contenidos preparados (imágenes, textos, colores, tipografías).'
tags: [responsive, scrollytelling, accesibilidad, diseno, ilustracion, componentes]
status: borrador
---

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

---

## ⏰ Duración estimada

**3,5 horas (1 sesión)**

---

## 🎯 Objetivos

- **Personalizar** tu portfolio scrollytelling con tus contenidos preparados
- **Adaptar** el sistema de diseño (colores, tipografías) a tu identidad
- **Integrar** tus imágenes de ImageKit en los componentes existentes
- **Verificar** responsive y accesibilidad en todos los breakpoints

---

## 🧭 Canon de Referencia

- [Tailwind CSS: Configuración y Fundamentos]({{ '/lessons/es/tailwind/setup-and-fundamentals/' | relative_url }})
- [Diseño Web: Responsive, Fluido e Intrínseco]({{ '/lessons/es/responsive/' | relative_url }})
- [Identidad Visual + Metadatos para Web]({{ '/lessons/es/metadata-visual-identity-web/' | relative_url }})

---

## 🎨 Componentes Ya Implementados en el Template

Tu template **YA TIENE** estos componentes listos para personalizar:

### 1. **Hero Section** 
- Animaciones fadeInUp y bounce
- Título, subtítulo y scroll indicator
- Background gradient personalizable

### 2. **Story Sections (Chapters)**
- Progressive reveal con Intersection Observer
- 3 temas de colores (chapter-1, chapter-2, chapter-3)
- Atributo `data-observe` para animaciones

### 3. **Statistics Display**
- Grid responsive con stagger animations
- Números grandes + labels
- Auto-anima al entrar en viewport

### 4. **Parallax Section**
- Background fixed con overlay
- Contenido centrado
- Se desactiva en móvil automáticamente

### 5. **Interactive Cards**
- Grid auto-fit responsive
- Hover effects incluidos
- Transiciones con stagger

### 6. **Timeline**
- Gradient line con dots
- Content boxes alternados (desktop) / left-aligned (móvil)
- Animaciones al scroll

### 7. **Final CTA**
- Call-to-action section
- Botón con hover effect
- Background gradient

### 8. **Info Overlay**
- Indicador de progreso de scroll
- Fixed bottom-right
- Actualización automática

---

## ⏱️ Desglose de Tiempo (3.5 horas)

| Parte | Duración | Actividad                                    |
| ----- | -------- | -------------------------------------------- |
| **1** | 20 min   | Revisión de contenidos y estructura template |
| **2** | 30 min   | Personalización del sistema de diseño        |
| **3** | 90 min   | Integración de contenidos personales         |
| **4** | 45 min   | Testing responsive y accesibilidad           |
| **5** | 25 min   | Commit y documentación                       |

---

## Parte 1: Revisión de Template y Contenidos (20 min)

### 1.1 Explorar la Estructura del Template

Abre tu proyecto y familiarízate con los archivos:

```
student-project-template/
├── index.html                 # Tu portfolio scrollytelling
├── assets/
│   ├── css/
│   │   ├── _variables.css     # 👈 AQUÍ personalizarás colores/fuentes
│   │   ├── _scrollytelling.css # Componentes ya listos
│   │   └── style.css
│   └── js/
│       └── main.js            # JavaScript ya funcionando
```

### 1.2 Checklist de Contenidos Preparados

Verifica que tienes listos:

- [ ] **Imágenes** en ImageKit (URLs copiadas)
- [ ] **Textos**: Bio, statement, lema hero, descripciones
- [ ] **Tipografías**: 2 fuentes de Google Fonts elegidas
- [ ] **Colores**: Paleta definida (primario, secundario, acentos)

### 1.3 Ver el Template en Acción

Abre `index.html` en el navegador local:

```bash
# Opción 1: Live Server (recomendado)
# Click derecho en index.html → Open with Live Server

# Opción 2: Servidor Python
python3 -m http.server 8000
# Abre http://localhost:8000
```

**Scroll por toda la página** para ver los componentes ya funcionando.

---

## Parte 2: Personalización del Sistema de Diseño (30 min)

### Prompt IA — Sistema de Diseño Personalizado

**Metodología docs-first:**
1. Guarda este prompt como `docs/prompt-sistema-diseno.md`
2. Envía a la IA
3. Implementa cambios en `assets/css/_variables.css`
4. Actualiza documento con report

```markdown
Personaliza el sistema de diseño del portfolio scrollytelling con mi identidad visual.

## Mi Identidad Visual

**Tipografías (Google Fonts):**
- Heading: [Tu fuente para títulos]
- Body: [Tu fuente para texto]

**Paleta de Colores:**
- Primario: #[hex] (para CTAs, enlaces destacados)
- Secundario: #[hex] (para acentos)
- Acento 1: #[hex] (para chapter-1, stats azules)
- Acento 2: #[hex] (para chapter-2, timeline)
- Acento 3: #[hex] (para chapter-3, success states)

## Archivos a Modificar

**1. assets/css/_variables.css:**

Actualiza estas variables:

```css
:root {
  /* Fuentes */
  --font-family-heading: '[Tu fuente heading]', var(--font-family-base);
  
  /* Colores principales */
  --color-primary: #[tu hex];
  --color-primary-hover: #[variación más oscura];
  
  /* Gradientes scrollytelling */
  --gradient-hero: linear-gradient(135deg, #[color1] 0%, #[color2] 100%);
  --gradient-chapter-1: linear-gradient(135deg, #[color1], #[color2]);
  --gradient-chapter-2: linear-gradient(135deg, #[color1], #[color2]);
  --gradient-chapter-3: linear-gradient(135deg, #[color1], #[color2]);
  
  /* Acentos */
  --color-accent-blue: #[tu hex para chapter-1];
  --color-accent-red: #[tu hex para chapter-2];
  --color-accent-green: #[tu hex para chapter-3];
}
```

**2. index.html `<head>`:**

Añade las Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=[TU_FUENTE_HEADING]&family=[TU_FUENTE_BODY]&display=swap" rel="stylesheet">
```

## Verificación de Accesibilidad

Verifica contraste con WebAIM Contrast Checker:
- Texto sobre fondo: mínimo 4.5:1 (WCAG AA)
- UI elements: mínimo 3:1
- Títulos grandes: mínimo 3:1

## Report de Implementación

1. **Fuentes aplicadas:** [Heading font] en h1-h6, [Body font] en p/li
2. **Colores actualizados:** Primario, gradientes, acentos
3. **Contraste verificado:** [Lista ratios de contraste principales]
4. **Testing visual:** Hero, chapters, cards, timeline tienen nuevos colores
5. **Próximos pasos:** Integrar contenidos personales

[La IA completará esta sección]
```

---

## Parte 3: Integración de Contenidos Personales (90 min)

### 3.1 Hero Section (15 min)

**Componente ya listo en** `index.html` líneas 16-22

**Prompt IA — Personalizar Hero:**

**Metodología docs-first:**
1. Guarda como `docs/prompt-hero.md`
2. Envía a IA
3. Implementa cambios

```markdown
Personaliza la Hero Section con mis contenidos.

## Contenidos

**Título principal:** [Tu nombre o marca personal]
**Subtítulo/Tagline:** [Tu lema preparado del email]
**Scroll indicator:** [Mensaje personalizado o mantener "Scroll para descubrir..."]

## Cambios en index.html

Actualiza líneas 18-20 del hero:

```html
<h1>📜 [Tu Nombre]</h1>
<p>[Tu tagline / especialización]<br />[Frase de impacto]</p>
<div class="scroll-indicator">↓ [Tu mensaje de scroll] ↓</div>
```

**Opcional - Cambiar emoji:**
- 🎨 Arte
- ✏️ Ilustración
- 🖌️ Diseño
- 📐 Arquitectura visual
- ⚡ Creatividad

## Report

1. **Contenido actualizado:** Nombre, tagline, scroll message
2. **Emoji elegido:** [emoji] por [razón]
3. **Longitud del tagline:** [N caracteres] - responsive verificado
4. **Preview:** Texto legible en móvil y desktop ✓

[La IA completará]
```

### 3.2 About Section (Chapter 1) (20 min)

**Componente en** `index.html` líneas 27-53

**Prompt IA — About con Estadísticas:**

```markdown
Personaliza la sección "Sobre Mí" (chapter-1) con mi bio y stats.

## Contenidos

**Título de sección:** [Ej. "Sobre Mí", "Mi Historia", "Quién Soy"]

**Bio (2-3 párrafos):**
[Pega tu bio preparada]

**Estadísticas (3 números + labels):**
1. [Número]+: [Label] (Ej. "3+ Años de Experiencia")
2. [Número]+: [Label] (Ej. "50+ Proyectos")
3. [Número]+: [Label] (Ej. "10+ Clientes")

## Implementación

En `index.html`, actualiza:

**Título y bio (líneas 29-35):**
```html
<h2>[Tu título]</h2>
<p class="text-large">
  [Primer párrafo de tu bio]
</p>
```

**Stats (líneas 37-49):**
```html
<div class="stat-item">
  <span class="stat-number">[Tu número]</span>
  <span class="stat-label">[Tu label]</span>
</div>
```

## Report

1. **Bio integrada:** [N palabras] - legibilidad verificada
2. **Stats personalizadas:** [3 métricas relevantes a tu carrera]
3. **Animaciones:** Stats aparecen con stagger al scroll ✓
4. **Responsive:** Text-large legible en todos los breakpoints ✓

[La IA completará]
```

### 3.3 My Work Section (Chapter 2) (25 min)

**Componente en** `index.html` líneas 62-87

**Prompt IA — Sección de Trabajo:**

```markdown
Personaliza la sección "Mi Trabajo" con mis áreas de especialización.

## Contenidos

**Título:** [Ej. "Mi Trabajo", "Especialidades", "Lo Que Hago"]

**Introducción:**
[1-2 frases describiendo tu enfoque]

**3 Cards de Especialidades:**

1. **Card 1:**
   - Título: [Ej. "Editorial"]
   - Descripción: [1-2 frases sobre esta área]

2. **Card 2:**
   - Título: [Ej. "Branding"]
   - Descripción: [1-2 frases]

3. **Card 3:**
   - Título: [Ej. "Digital"]
   - Descripción: [1-2 frases]

## Implementación

Actualiza en `index.html` (líneas 64-84):

```html
<h2>[Tu título]</h2>
<p class="text-large mb-lg">[Tu introducción]</p>

<div class="interactive-cards">
  <div class="card">
    <h4>[Especialidad 1]</h4>
    <p>[Descripción 1]</p>
  </div>
  <!-- Repetir para card 2 y 3 -->
</div>
```

## Report

1. **Especialidades definidas:** [3 áreas de tu trabajo]
2. **Descripciones:** Concisas, [N palabras promedio por card]
3. **Hover effects:** Funcionando en las 3 cards ✓
4. **Grid responsive:** 1 col móvil, 2-3 desktop ✓

[La IA completará]
```

### 3.4 Timeline / Process (15 min)

**Componente en** `index.html` líneas 91-121

**Prompt IA — Timeline de Proceso:**

```markdown
Personaliza el Timeline con mi proceso creativo.

## Mi Proceso (3 pasos)

1. **Paso 1:**
   - Título: [Ej. "Investigación y Concepto"]
   - Descripción: [Qué haces en esta fase]

2. **Paso 2:**
   - Título: [Ej. "Bocetos y Exploración"]
   - Descripción: [Qué haces aquí]

3. **Paso 3:**
   - Título: [Ej. "Refinamiento y Entrega"]
   - Descripción: [Fase final]

## Implementación

Actualiza timeline-items (líneas 97-119):

```html
<div class="timeline-item">
  <div class="timeline-dot"></div>
  <div class="timeline-content">
    <h4>[Título paso 1]</h4>
    <p>[Descripción paso 1]</p>
  </div>
</div>
```

## Report

1. **Proceso documentado:** [3 fases de tu workflow]
2. **Timeline visual:** Línea gradient + dots funcionando ✓
3. **Responsive:** Left-aligned en móvil, centered en desktop ✓
4. **Animaciones:** Items aparecen con stagger al scroll ✓

[La IA completará]
```

### 3.5 Skills Section (Chapter 3) (15 min)

**Componente en** `index.html` líneas 125-151

**Prompt IA — Herramientas y Skills:**

```markdown
Personaliza la sección de Skills con mis herramientas.

## Mis Herramientas

**Card 1 - Digital:**
- [Lista 4 herramientas digitales que usas]

**Card 2 - Tradicional:**
- [Lista 4 técnicas tradicionales]

**Card 3 - Especialidades:**
- [Lista 4 áreas donde destacas]

## Implementación

Actualiza cards (líneas 131-149):

```html
<div class="card">
  <h4>🎨 Digital</h4>
  <p>• [Herramienta 1]<br />• [Herramienta 2]<br />...</p>
</div>
```

## Report

1. **Skills documentadas:** [Categorías: Digital, Tradicional, Especialidades]
2. **Emojis elegidos:** [Emojis para cada card]
3. **Hover effects:** Funcionando ✓
4. **Responsive:** Grid adaptativo ✓

[La IA completará]
```

---

## Parte 4: Testing Responsive y Accesibilidad (45 min)

### 4.1 Testing Responsive (25 min)

**Checklist por Breakpoint:**

| Breakpoint   | Verificar                                                |
| ------------ | -------------------------------------------------------- |
| **320px**    | Texto legible, stats en 1 col, timeline left-aligned    |
| **768px**    | Cards en 2 col, timeline centrado empieza              |
| **1024px+**  | Cards en 3 col, timeline full centrado, parallax activo |

**Herramientas:**
- DevTools → Device Mode
- Probar en móvil real

### 4.2 Checklist de Accesibilidad (20 min)

- [ ] **Contraste:** Verificar todos los textos (WebAIM)
- [ ] **Headings:** Jerarquía h1 > h2 > h3 > h4 correcta
- [ ] **Alt text:** (No hay imágenes de contenido aún - S4)
- [ ] **Navegación teclado:** Tab funciona, skip-link presente
- [ ] **Focus visible:** Se ve qué está enfocado
- [ ] **Reduced motion:** Probar con preferencia activada
- [ ] **Scroll progress:** Indicador funcionando

**Probar Reduced Motion:**
```bash
# macOS: System Preferences → Accessibility → Display → Reduce motion
# Windows: Settings → Ease of Access → Display → Show animations
# DevTools: Rendering → Emulate CSS media feature prefers-reduced-motion
```

---

## Parte 5: Commit y Documentación (25 min)

### 5.1 Commit

```bash
git add .
git commit -m "feat(s3): personalizado portfolio scrollytelling

- Sistema de diseño: colores [primario] + fuentes [heading/body]
- Hero: [tu nombre] + tagline personalizado
- About: bio + stats ([N] años, [N] proyectos, [N] clientes)
- Work: especialidades en [área1], [área2], [área3]
- Timeline: proceso de [N] pasos documentado
- Skills: herramientas digitales/tradicionales listadas
- Testing: responsive 320px-1440px ✓
- Accesibilidad: contraste WCAG AA verificado ✓"
```

### 5.2 Verificar GitHub Pages

Asegurar que el deploy muestra los cambios:
- URL: `https://[tu-usuario].github.io/[tu-repo]/`
- Scroll completo funcionando
- Animaciones activas

---

## ✅ Checklist de Entregables S3

- [ ] **Sistema de diseño personalizado** (colores + fuentes en _variables.css)
- [ ] **Hero con contenido propio** (nombre, tagline)
- [ ] **About con bio y stats** reales
- [ ] **Work con especialidades** definidas
- [ ] **Timeline con proceso** personal
- [ ] **Skills con herramientas** que usas
- [ ] **Responsive verificado** (320px, 768px, 1024px+)
- [ ] **Accesibilidad comprobada** (contraste, headings, keyboard nav)
- [ ] **1 commit significativo** con mensaje descriptivo

---

## 🎯 Al finalizar la sesión

Cada estudiante debe tener:

1. ✅ Portfolio scrollytelling **personalizado** con su identidad
2. ✅ Todos los textos **reales** integrados (no placeholder)
3. ✅ Sistema de colores **propio** aplicado
4. ✅ Componentes funcionando en **todos los breakpoints**

---

## 🚀 Preparación para S4

En la próxima sesión añadiremos:
- **Imágenes** de tus proyectos (ImageKit)
- **Galería** de trabajos
- **Lightbox** para ver imágenes ampliadas
- **Interacciones** adicionales
- **Testing UX** con compañeros

---

## Reflexión ATELIER

```markdown
## Reflexión S3

### Personalización
1. ¿Tu portfolio refleja tu identidad visual?
2. ¿Los colores elegidos comunican tu estilo?

### Contenidos
1. ¿Tu bio es clara y atractiva?
2. ¿Las estadísticas representan bien tu experiencia?

### Experiencia Técnica
1. ¿Fue fácil personalizar los componentes existentes?
2. ¿Qué componente te gustó más y por qué?

### Preparación S4
1. ¿Qué imágenes quieres destacar en la galería?
2. ¿Qué interacciones adicionales te gustaría añadir?
```

---

<table style="width: 100%; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
  <tr>
    <td style="text-align: left;">
      ← Anterior: <a href="{{ '/tracks/es/ilustracion-webapp/s2-galerias-layouts-media/' | relative_url }}">S2: Galerías y layouts</a>
    </td>
    <td style="text-align: right;">
      Siguiente →: <a href="{{ '/tracks/es/ilustracion-webapp/s4-interactividad-ux-ui/' | relative_url }}">S4: Galería e Interactividad</a>
    </td>
  </tr>
</table>
