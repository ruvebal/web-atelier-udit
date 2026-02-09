---
layout: lesson
title: 'Personalización del Portfolio Scrollytelling'
title_alt: 'Personalización del Portfolio Scrollytelling'
slug: ilustracion-webapp-s3
date: 2026-01-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/ilustracion-webapp/s3-maquetacion-responsive-frameworks/
description: 'Tercera sesión: personaliza tu portfolio scrollytelling con tus contenidos de project-brief.md.'
tags: [responsive, scrollytelling, accesibilidad, diseno, ilustracion, componentes]
status: borrador
---
<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->
---

## ⏰ Duración estimada

**3,5 horas (1 sesión)**

---

## 🎯 Objetivos

- **Completar** `project-brief.md` con todos tus contenidos preparados
- **Personalizar** el sistema de diseño (colores, tipografías) usando el brief
- **Integrar** tus textos en los componentes scrollytelling existentes
- **Verificar** responsive y accesibilidad

---

## 📁 Archivos Clave de esta Sesión

**Archivos de Contexto (mantener actualizados):**
- `project-brief.md` - Tu fuente de verdad para contenidos
- `project-inspiration.md` - Referencias visuales

**Archivos a Modificar:**
- `assets/css/_variables.css` - Sistema de diseño
- `index.html` - Contenidos de cada sección

**Archivos a Crear:**
- `docs/prompt-*.md` - Cada prompt guardado
- Reports de implementación en cada prompt

---

## ⏱️ Desglose de Tiempo

| Parte | Duración | Actividad                                   |
| ----- | -------- | ------------------------------------------- |
| **1** | 30 min   | Completar project-brief.md                  |
| **2** | 30 min   | Personalizar sistema de diseño              |
| **3** | 80 min   | Integrar contenidos en 5 secciones          |
| **4** | 30 min   | Testing responsive y accesibilidad          |
| **5** | 20 min   | Commit y documentación                      |

---

## Parte 1: Completar Project Brief (30 min)

### 1.1 Abrir y Revisar el Template

**Acción:** Abre `project-brief.md` en tu editor

### 1.2 Completar Todas las Secciones

**Checklist - Completa cada sección:**

- [ ] **Concepto del Portfolio** (quién eres, para quién, por qué)
- [ ] **Identidad Visual - Paleta de Colores** (primario, secundario, 3 acentos con hex)
- [ ] **Identidad Visual - Tipografías** (heading + body + URLs Google Fonts)
- [ ] **Contenidos Preparados - Bio** (2-3 párrafos)
- [ ] **Contenidos Preparados - Lema Hero** (1 frase impactante)
- [ ] **Contenidos Preparados - Estadísticas** (3 números + labels)
- [ ] **Áreas de Especialización** (3 especialidades con descripciones)
- [ ] **Proceso Creativo** (3 pasos de tu workflow)
- [ ] **Herramientas y Skills** (Digital, Tradicional, Especialidades)

**Tiempo:** 20-25 minutos para rellenar todo

### 1.3 Guardar y Committear el Brief

```bash
git add project-brief.md
git commit -m "docs: completado project-brief con contenidos personales

- Identidad visual: paleta + tipografías definidas
- Bio y statement redactados
- Lema hero, stats, especialidades
- Proceso creativo documentado
- Skills y herramientas listadas"
```

**Por qué es importante:** `project-brief.md` es ahora tu fuente de verdad. Los prompts IA lo leerán para NO duplicar información.

---

## Parte 2: Personalizar Sistema de Diseño (30 min)

### Prompt IA — Sistema de Diseño

**Metodología docs-first + Contexto:**
1. Guarda este prompt como `docs/prompt-sistema-diseno.md`
2. **Adjunta estos archivos:**
   - `project-brief.md`
   - `assets/css/_variables.css`
3. Envía a la IA (la IA leerá los archivos adjuntos)
4. Implementa los cambios generados

```markdown
Personaliza el sistema de diseño del portfolio scrollytelling.

## 📎 CONTEXTO - Lee estos archivos adjuntos

1. **project-brief.md** → Sección "Identidad Visual"
   - Obtén: paleta de colores, tipografías, URLs Google Fonts

2. **assets/css/_variables.css** → Variables actuales
   - Identifica: qué variables actualizar

## INSTRUCCIÓN

Extrae de `project-brief.md` sección "Identidad Visual":
- Color primario, secundario, acentos 1-3 (hex codes)
- Fuente heading y body (nombres + URLs Google Fonts)
- Verificación de contraste (debe estar documentada)

## TAREAS

1. **Actualizar _variables.css:**
   ```css
   :root {
     /* Fuentes - usar las del brief */
     --font-family-heading: '[Fuente del brief]', var(--font-family-base);

     /* Colores - usar hex del brief */
     --color-primary: #[del brief];
     --color-primary-hover: #[generar variación oscura 10%];

     /* Gradientes - crear coherentes con la paleta */
     --gradient-hero: linear-gradient(135deg, #[primario] 0%, #[secundario] 100%);
     --gradient-chapter-1: linear-gradient(135deg, #[acento1], #[variación]);
     --gradient-chapter-2: linear-gradient(135deg, #[acento2], #[variación]);
     --gradient-chapter-3: linear-gradient(135deg, #[acento3], #[variación]);

     /* Acentos - usar del brief */
     --color-accent-blue: #[acento1 del brief];
     --color-accent-red: #[acento2 del brief];
     --color-accent-green: #[acento3 del brief];
   }
   ```

2. **Generar código <link> para Google Fonts:**
   - Usar URLs del brief
   - Incluir preconnect para performance
   - Código listo para pegar en <head> de index.html

3. **Verificar contraste:**
   - Testear cada combinación color/fondo
   - Documentar ratios WCAG
   - Sugerir ajustes si no cumple AA (4.5:1 texto, 3:1 UI)

## REPORT DE IMPLEMENTACIÓN

Documenta en este archivo:

1. **Archivos leídos:**
   - project-brief.md ✓ → Paleta y fuentes extraídas
   - _variables.css ✓ → [N] variables actualizadas

2. **Cambios en _variables.css:**
   - Fuentes: [Heading font] y [Body font]
   - Colores: Primario #[hex], Secundario #[hex], Acentos #[hex, hex, hex]
   - Gradientes: 4 gradientes generados coherentes con paleta

3. **Código Google Fonts generado:**
   ```html
   [Código <link> completo aquí]
   ```

4. **Contraste verificado:**
   - Texto primario/fondo: [ratio] ✓/✗
   - CTAs: [ratio] ✓/✗
   - Títulos hero: [ratio] ✓/✗
   - [Lista todos los pares importantes]

5. **Preview visual:**
   - Hero con nuevo gradient: [descripción]
   - Chapters con nuevos colores: [descripción]
   - Cards con acentos aplicados: [descripción]

6. **Issues encontrados:**
   - [Lista problemas y soluciones]

7. **Próximos pasos:**
   - Integrar contenidos de bio y stats en About section

[La IA completará al implementar]
```

---

## Parte 3: Integración de Contenidos (80 min)

### 3.1 Hero Section (10 min)

**Ubicación:** `index.html` líneas 17-21

**Prompt IA:**

```markdown
Personaliza Hero Section.

## 📎 CONTEXTO
Adjunta: `project-brief.md`

Lee sección "Contenidos Preparados" → "Lema/Tagline para Hero"

## TAREA

Actualiza en `index.html` (líneas 18-20):

```html
<h1>[Emoji + Tu Nombre del brief]</h1>
<p>[Tu tagline del brief]<br />[Línea 2 opcional]</p>
<div class="scroll-indicator">↓ [Mensaje personalizado] ↓</div>
```

**Emojis sugeridos:** 🎨 ✏️ 🖌️ 📐 ⚡

## REPORT
1. Nombre extraído del brief: [...]
2. Tagline integrado: [...]
3. Emoji elegido: [...] por [razón]
4. Responsive: Verificado en 320px y 1440px ✓

[La IA completará]
```

### 3.2 About + Stats (15 min)

**Ubicación:** `index.html` líneas 27-53

**Prompt IA:**

```markdown
Personaliza About Section con bio y estadísticas.

## 📎 CONTEXTO
Adjunta: `project-brief.md`

Lee secciones:
- "Contenidos Preparados" → "Bio Corta"
- "Contenidos Preparados" → "Estadísticas Personales"

## TAREA

Actualiza en `index.html`:

**Bio (líneas 29-34):** Reemplaza con tu bio del brief (2-3 párrafos)

**Stats (líneas 37-49):** Reemplaza con tus 3 estadísticas del brief

NO dupliques información - extráela directamente del brief.

## REPORT
1. Bio extraída: [N palabras] de project-brief.md
2. Stats actualizadas: [stat1, stat2, stat3]
3. Legibilidad: Text-large responsive ✓
4. Animaciones: Stagger funciona al scroll ✓

[La IA completará]
```

### 3.3 My Work / Especialidades (15 min)

**Ubicación:** `index.html` líneas 62-87

**Prompt IA:**

```markdown
Personaliza My Work con especialidades.

## 📎 CONTEXTO
Adjunta: `project-brief.md`

Lee sección "Áreas de Especialización" (3 especialidades)

## TAREA

Actualiza las 3 cards en `index.html` (líneas 70-86) con:
- Títulos de especialidades del brief
- Descripciones del brief

NO reinventes - usa exactamente lo documentado en el brief.

## REPORT
1. Especialidades extraídas: [Esp1, Esp2, Esp3]
2. Descripciones: [N palabras promedio]
3. Cards responsive: 1/2/3 columnas según viewport ✓
4. Hover effects: Funcionando ✓

[La IA completará]
```

### 3.4 Timeline / Proceso (15 min)

**Ubicación:** `index.html` líneas 91-121

**Prompt IA:**

```markdown
Personaliza Timeline con proceso creativo.

## 📎 CONTEXTO
Adjunta: `project-brief.md`

Lee sección "Proceso Creativo" (3 pasos)

## TAREA

Actualiza los 3 timeline-items con:
- Títulos de cada paso (del brief)
- Descripciones (del brief)

## REPORT
1. Proceso extraído: [Paso1, Paso2, Paso3]
2. Timeline visual: Gradient line + dots ✓
3. Responsive: Centrado desktop, left-aligned móvil ✓
4. Animaciones: Stagger al scroll ✓

[La IA completará]
```

### 3.5 Skills Section (15 min)

**Ubicación:** `index.html` líneas 125-151

**Prompt IA:**

```markdown
Personaliza Skills con herramientas.

## 📎 CONTEXTO
Adjunta: `project-brief.md`

Lee sección "Herramientas y Skills" (Digital, Tradicional, Especialidades)

## TAREA

Actualiza las 3 cards con listas del brief.

## REPORT
1. Herramientas extraídas: [N digitales, N tradicionales, N especialidades]
2. Emojis: [Elegidos para cada card]
3. Grid responsive: Auto-fit funcionando ✓

[La IA completará]
```

---

## Parte 4: Testing (30 min)

### 4.1 Testing Responsive

| Breakpoint | Verificar                                 |
| ---------- | ----------------------------------------- |
| **320px**  | Stats 1 col, timeline left, texto legible |
| **768px**  | Cards 2 col, timeline centrado empieza    |
| **1024px** | Cards 3 col, timeline full, parallax on   |

### 4.2 Accesibilidad

- [ ] Contraste verificado (WebAIM)
- [ ] Headings jerárquicos
- [ ] Navegación teclado
- [ ] Reduced motion (DevTools)

---

## Parte 5: Commit (20 min)

```bash
git add .
git commit -m "feat(s3): personalizado con contenidos de project-brief

- Sistema de diseño: [fuentes] + [colores] de brief
- Hero: [nombre] + [tagline] integrados
- About: bio + stats del brief
- Work: [3 especialidades] del brief
- Timeline: [proceso] del brief
- Skills: herramientas del brief
- Responsive: 320px-1440px ✓
- Accesibilidad: WCAG AA ✓"
```

---

## ✅ Entregables S3

- [ ] `project-brief.md` completado al 100%
- [ ] Sistema de diseño personalizado
- [ ] Todos los componentes con contenido real (no placeholder)
- [ ] Responsive verificado
- [ ] 1 commit significativo

---

<table style="width: 100%; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
  <tr>
    <td style="text-align: left;">
      ← Anterior: <a href="{{ '/tracks/es/ilustracion-webapp/s2-galerias-layouts-media/' | relative_url }}">S2: Galerías</a>
    </td>
    <td style="text-align: right;">
      Siguiente →: <a href="{{ '/tracks/es/ilustracion-webapp/s4-interactividad-ux-ui/' | relative_url }}">S4: Galería y Lanzamiento</a>
    </td>
  </tr>
</table>
