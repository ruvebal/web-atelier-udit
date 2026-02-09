---
layout: lesson
title: 'Galería de Proyectos, UX Testing y Lanzamiento'
title_alt: 'Galería de Proyectos, UX Testing y Lanzamiento'
slug: ilustracion-webapp-s4
date: 2026-01-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/ilustracion-webapp/s4-interactividad-ux-ui/
description: 'Cuarta sesión: añadir galería de proyectos con imágenes de ImageKit, testing de usabilidad con compañeros y lanzamiento final.'
tags: [javascript, galeria, ux, imagekit, ilustracion, lanzamiento]
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

- Añadir **galería de proyectos** con tus imágenes de ImageKit
- Implementar **lightbox** para ver imágenes ampliadas (opcional)
- Realizar **testing UX** con compañeros
- **Iterar** basándose en feedback
- **Lanzar** el portfolio final

---

## 🧭 Canon de Referencia

- [Media: Images y optimización]({{ '/lessons/es/media/images/' | relative_url }})
- [Guía Práctica de Desarrollo Asistido por IA]({{ '/methodology/es/ai-practical-guide/' | relative_url }})

---

## ⏱️ Desglose de Tiempo

| Parte | Duración | Actividad                                   |
| ----- | -------- | ------------------------------------------- |
| **1** | 60 min   | Añadir galería de proyectos con ImageKit   |
| **2** | 45 min   | Testing UX con compañeros                   |
| **3** | 45 min   | Iteración y pulido basado en feedback       |
| **4** | 45 min   | Lanzamiento y presentación                  |

---

## Parte 1: Añadir Galería de Proyectos (60 min)

### 1.1 Preparar Imágenes en ImageKit (si no está hecho)

**Checklist:**
- [ ] Imágenes subidas a ImageKit
- [ ] URLs copiadas y organizadas
- [ ] Nombres descriptivos para alt text

### 1.2 Crear Sección de Proyectos

**Prompt IA — Galería de Proyectos con ImageKit:**

**Metodología docs-first:**
1. Guarda como `docs/prompt-galeria-proyectos.md`
2. Envía a IA
3. Implementa en index.html

```markdown
Crea una galería de proyectos usando mis imágenes de ImageKit.

## Ubicación en el Portfolio

Añadir DESPUÉS del parallax section (línea ~60 de index.html), ANTES de "My Work" chapter-2.

## Contenidos

**Título de sección:** [Ej. "Proyectos Destacados", "Mi Portfolio", "Trabajos Recientes"]

**Proyectos (mínimo 6):**

### Proyecto 1
- Imagen: [URL de ImageKit]
- Título: [Nombre del proyecto]
- Descripción corta: [1 frase]
- Categoría: [Ej. Editorial, Digital, Branding]

### Proyecto 2
- Imagen: [URL]
- Título: [Nombre]
- Descripción: [1 frase]
- Categoría: [...]

[Repetir para cada proyecto - mínimo 6]

## Implementación

Añade esta nueva sección en `index.html`:

```html
<!-- Añadir después del parallax-section, antes de chapter-2 -->
<section class="story-section chapter-1" data-observe>
  <div class="story-content">
    <h2>[Tu título de galería]</h2>
    <p class="text-large mb-lg">[Intro opcional a tu trabajo]</p>

    <div class="interactive-cards">
      <!-- Card de Proyecto 1 -->
      <div class="card project-card" data-category="[categoría]">
        <img 
          src="[URL de ImageKit]" 
          alt="[Descripción accesible del proyecto]"
          loading="lazy"
          style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
        <h4>[Título del proyecto]</h4>
        <p>[Descripción corta]</p>
        <span class="project-tag">[Categoría]</span>
      </div>

      <!-- Repetir para proyectos 2-6+ -->
    </div>
  </div>
</section>
```

## Estilos Adicionales

Añadir en `assets/css/_scrollytelling.css` o crear nuevo archivo:

```css
/* Project cards específicos */
.project-card img {
  transition: transform 0.3s ease;
  cursor: pointer;
}

.project-card:hover img {
  transform: scale(1.05);
}

.project-tag {
  display: inline-block;
  background: var(--color-card-bg);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  color: var(--color-accent-blue);
  margin-top: 0.5rem;
}
```

## Optimización de Imágenes con ImageKit

Usa transformaciones de ImageKit en las URLs:

```
Original: https://ik.imagekit.io/tu-id/proyecto.jpg
Optimizado: https://ik.imagekit.io/tu-id/tr:w-400,h-300,q-80/proyecto.jpg
```

Parámetros:
- `w-400`: ancho 400px
- `h-300`: alto 300px
- `q-80`: calidad 80%
- `f-auto`: formato automático (WebP si soportado)

## Report de Implementación

1. **Proyectos añadidos:** [N proyectos] con imágenes de ImageKit
2. **Categorías:** [Lista categorías usadas]
3. **Alt text:** Descriptivo y accesible en todas las imágenes ✓
4. **Optimización:** URLs de ImageKit con transformaciones ✓
5. **Lazy loading:** `loading="lazy"` en todas las imágenes ✓
6. **Responsive:** Grid adapta a 1/2/3 columnas según viewport ✓
7. **Performance:** Imágenes optimizadas, carga rápida

[La IA completará esta sección]
```

### 1.3 Lightbox Opcional (15 min)

**Prompt IA — Lightbox Simple:**

**Metodología docs-first:**
1. Guarda como `docs/prompt-lightbox.md` (opcional)
2. Solo si tienes tiempo

```markdown
Añade un lightbox simple para ampliar imágenes de la galería.

## Funcionalidad

Al hacer click en una imagen de proyecto:
1. Se abre un modal/lightbox
2. Muestra la imagen a tamaño completo
3. Overlay oscuro de fondo
4. Botón X para cerrar
5. ESC key para cerrar
6. Click fuera de imagen para cerrar

## Implementación JavaScript

Añadir al final de `assets/js/main.js`:

```javascript
// ===== LIGHTBOX PARA GALERÍA =====

// Crear elemento lightbox (solo una vez)
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <div class="lightbox-content">
    <button class="lightbox-close" aria-label="Cerrar">&times;</button>
    <img src="" alt="" class="lightbox-image">
  </div>
`;
document.body.appendChild(lightbox);

// Añadir event listeners a imágenes de proyectos
document.querySelectorAll('.project-card img').forEach(img => {
  img.addEventListener('click', () => {
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    lightboxImg.src = img.src.replace('/tr:w-400,h-300', '/tr:w-1200'); // Imagen más grande
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Bloquear scroll
  });
});

// Cerrar lightbox
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = ''; // Restaurar scroll
}

lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox(); // Click fuera
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    closeLightbox();
  }
});
```

## Estilos CSS

Añadir a `assets/css/_scrollytelling.css`:

```css
/* ===== LIGHTBOX ===== */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.lightbox.active {
  opacity: 1;
  visibility: visible;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.lightbox-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: var(--radius-md);
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  transition: transform 0.2s ease;
}

.lightbox-close:hover {
  transform: scale(1.2);
}
```

## Report

1. **Lightbox implementado:** Click en imagen → modal ✓
2. **Cierre múltiple:** X, ESC, click fuera ✓
3. **Imágenes optimizadas:** ImageKit tr:w-1200 para lightbox ✓
4. **Accesibilidad:** aria-label, focus trap básico ✓
5. **UX:** Scroll bloqueado cuando lightbox abierto ✓

[La IA completará]
```

---

## Parte 2: Testing UX con Compañeros (45 min)

### 2.1 Dinámica de Testing (25 min)

**Formato:** Parejas intercambian portfolios

**Proceso:**
1. Estudiante A abre el portfolio de B en su dispositivo
2. A navega **sin indicaciones** mientras B observa y toma notas
3. A completa las tareas de testing (abajo)
4. Intercambiar roles

**Tareas de Testing (dar a quien prueba):**

| # | Tarea | Tiempo | Notas |
|---|-------|--------|-------|
| 1 | Primera impresión: ¿De qué trata este portfolio? | 30s | |
| 2 | Scroll hasta el final: ¿Qué secciones viste? | 2min | |
| 3 | Encuentra la información de contacto | 30s | |
| 4 | ¿Cuál es la especialidad principal del autor/a? | 30s | |
| 5 | Abre el portfolio en móvil (o emulador) | 2min | |

### 2.2 Feedback Estructurado

**Tabla de Feedback** (imprimir o compartir digitalmente):

| Aspecto | Pregunta | ✓/✗ | Comentario |
|---------|----------|-----|------------|
| **Claridad** | ¿Entendiste qué hace en 5 segundos? | | |
| **Navegación** | ¿El scroll fue fluido y fácil de seguir? | | |
| **Contenido** | ¿La bio y stats son creíbles/interesantes? | | |
| **Proyectos** | ¿Las imágenes cargan rápido y se ven bien? | | |
| **Contacto** | ¿El CTA de contacto es claro? | | |
| **Móvil** | ¿Funciona bien en móvil? | | |
| **Velocidad** | ¿Carga rápido? ¿Algo se siente lento? | | |
| **Animaciones** | ¿Las animaciones mejoran o distraen? | | |

**1 sugerencia concreta de mejora:** _________________

### 2.3 Discusión Grupal (20 min)

**Formato:** Ronda de compartir

Cada pareja comparte:
1. **1 cosa que funcionó muy bien** en el portfolio del compañero
2. **1 mejora crítica** detectada
3. **1 idea** que te inspiró para tu propio portfolio

**Profesor facilita:**
- Patrones comunes (ej. "3 personas reportaron carga lenta de imágenes")
- Soluciones rápidas (ej. "Usar transformaciones ImageKit")
- Priorización: Crítico vs Nice-to-have

---

## Parte 3: Iteración y Pulido (45 min)

### 3.1 Priorizar Mejoras del Feedback (10 min)

**Matriz de Priorización:**

| Prioridad | Criterio | Ejemplos |
|-----------|----------|----------|
| **🔴 Crítico** | Impide uso básico | Imágenes no cargan, texto ilegible, nav rota |
| **🟡 Alto** | Confunde usuario | Bio muy larga, CTA no claro, stats confusas |
| **🟢 Medio** | Mejora experiencia | Animaciones demasiado lentas, colores poco contrastados |
| **⚪ Bajo** | Polish visual | Espaciados, pequeños ajustes tipográficos |

**Acción:** Escoge **2-3 mejoras** de prioridad Alta/Crítica para implementar ahora.

### 3.2 Implementar Mejoras (25 min)

**Ejemplos de Mejoras Comunes:**

**Problema:** "Imágenes cargan muy lento"
```markdown
Solución: Optimizar URLs de ImageKit

Cambiar:
https://ik.imagekit.io/tu-id/proyecto.jpg

Por:
https://ik.imagekit.io/tu-id/tr:w-400,h-300,q-80,f-auto/proyecto.jpg
```

**Problema:** "Bio muy larga, no la leo completa"
```markdown
Solución: Acortar a 2-3 párrafos máximo

Antes: 5 párrafos, 300 palabras
Después: 2 párrafos, 120 palabras + link "Saber más"
```

**Problema:** "Botón de contacto no se ve"
```markdown
Solución: Aumentar contraste del CTA

En _variables.css:
.cta-button {
  background: white; /* Ya está */
  color: #667eea;
  /* Añadir borde para más visibilidad */
  box-shadow: 0 0 0 2px rgba(255,255,255,0.3);
}
```

### 3.3 Checklist Final (10 min)

**Pre-Lanzamiento:**

- [ ] **Funcionalidad**
  - [ ] Todas las secciones cargan
  - [ ] Scroll suave funciona
  - [ ] Animaciones activas
  - [ ] Lightbox funciona (si implementado)
  - [ ] Links externos con target="_blank"
  - [ ] Sin errores en consola

- [ ] **Performance**
  - [ ] Imágenes optimizadas (ImageKit transformations)
  - [ ] Lazy loading en imágenes
  - [ ] Scroll progress funcionando

- [ ] **Accesibilidad**
  - [ ] Contraste WCAG AA en todos los textos
  - [ ] Alt text en todas las imágenes
  - [ ] Navegación por teclado
  - [ ] Reduced motion respetado
  - [ ] Skip link funciona

- [ ] **SEO**
  - [ ] Title único y descriptivo
  - [ ] Meta description relevante
  - [ ] Open Graph meta tags (opcional)

---

## Parte 4: Lanzamiento y Presentación (45 min)

### 4.1 Meta Tags para Compartir (10 min)

Añadir en `<head>` de index.html:

```html
<!-- Open Graph para redes sociales -->
<meta property="og:title" content="[Tu Nombre] - Portfolio de Ilustración">
<meta property="og:description" content="[Tu tagline de 1 frase]">
<meta property="og:image" content="[URL imagen destacada de ImageKit]">
<meta property="og:url" content="https://[tu-usuario].github.io/[tu-repo]/">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Tu Nombre] - Portfolio">
<meta name="twitter:description" content="[Tu tagline]">
<meta name="twitter:image" content="[URL imagen]">
```

### 4.2 Commit Final (10 min)

```bash
git add .
git commit -m "feat(s4): galería de proyectos y lanzamiento final

GALERÍA:
- Añadida sección de proyectos con [N] trabajos
- Imágenes de ImageKit optimizadas (tr:w-400,h-300,q-80,f-auto)
- Lightbox implementado para vista ampliada [si aplica]
- Lazy loading en todas las imágenes

MEJORAS UX (FEEDBACK):
- [Mejora 1 implementada]
- [Mejora 2 implementada]
- [Mejora 3 implementada]

OPTIMIZACIONES:
- Meta tags Open Graph para compartir
- Performance: imágenes optimizadas, lazy loading
- Accesibilidad: alt text en [N] imágenes, contraste verificado

TESTING:
- Responsive verificado: 320px, 768px, 1024px, 1440px ✓
- UX testing con compañero: feedback integrado ✓
- Sin errores en consola ✓

LANZAMIENTO: Portfolio listo para producción 🚀"

git push origin main
```

### 4.3 Case Study (10 min)

Crear `case-study.md` en el repo:

```markdown
# Portfolio Scrollytelling - Case Study

## Objetivo
[1 párrafo: qué querías lograr con este portfolio]

## Inspiración
[Referencias de diseño, estilos que te inspiraron]

## Proceso de Desarrollo (4 Sesiones)

### S1: Foundation
[Breve resumen]

### S2: Content Strategy
[Breve resumen]

### S3: Personalización
[Breve resumen]

### S4: Galería y Lanzamiento
[Breve resumen]

## Desafíos Técnicos y Soluciones

1. **Desafío:** [Problema que enfrentaste]
   **Solución:** [Cómo lo resolviste]

2. **Desafío:** [Otro problema]
   **Solución:** [Tu solución]

## Tecnologías Usadas

- HTML5 Semántico
- CSS modular (Variables, Scrollytelling module)
- JavaScript (Intersection Observer, Lightbox)
- ImageKit para optimización de imágenes
- GitHub Pages para deployment

## Métricas de Éxito

- **Performance:** [Score Lighthouse / tiempo de carga]
- **Accessibility:** [Score / features implementadas]
- **Proyectos mostrados:** [N]
- **Componentes scrollytelling:** [N]

## Aprendizajes Clave

1. [Aprendizaje 1]
2. [Aprendizaje 2]
3. [Aprendizaje 3]

## Próximas Iteraciones

- [ ] [Mejora futura 1]
- [ ] [Mejora futura 2]
- [ ] [Mejora futura 3]

## URL Final

https://[tu-usuario].github.io/[tu-repo]/

---

**Atelier Reflection:** [Reflexión personal sobre el proceso]
```

### 4.4 Presentación al Grupo (15 min)

**Formato:** 2-3 min por persona

**Estructura de presentación:**
1. **Abrir URL live** y hacer scroll completo
2. **Destacar 1 componente** que te enorgullece
3. **Compartir 1 desafío** superado
4. **1 aprendizaje** del proceso de 4 sesiones

**Todos guardan las URLs** para explorar después.

---

## ✅ Checklist de Entregables S4

### Galería
- [ ] **Sección de proyectos** añadida con mínimo 6 trabajos
- [ ] **Imágenes de ImageKit** optimizadas
- [ ] **Alt text descriptivo** en todas las imágenes
- [ ] **Lazy loading** implementado
- [ ] **Lightbox** funcional (opcional)

### UX Testing
- [ ] **Testing con compañero** completado
- [ ] **Feedback documentado** en tabla
- [ ] **2-3 mejoras críticas** implementadas

### Lanzamiento
- [ ] **Meta tags** Open Graph añadidos
- [ ] **Sin errores** en consola
- [ ] **Case study** documentado
- [ ] **URL pública** funcionando
- [ ] **Commit final** con mensaje descriptivo

---

## 🎯 Criterios de Evaluación Final

### Técnico (40%)
- HTML semántico y válido
- CSS modular bien organizado
- JavaScript funcional (Intersection Observer, Lightbox)
- Responsive en todos los breakpoints
- Imágenes optimizadas con ImageKit

### Creativo (40%)
- Diseño visual coherente con estilo personal
- Galería muestra trabajos reales y atractivos
- UX clara y efectiva
- Presentación profesional

### Proceso (20%)
- 4 commits significativos (1 por sesión)
- Documentación (case study, reflexiones)
- Participación en testing con compañero
- Feedback integrado

---

## 🎉 ¡Felicidades!

Has completado el track **Ilustración Aplicada: Productos Digitales Web-App**.

Tu portfolio scrollytelling es ahora:
- ✅ Un producto digital profesional
- ✅ Una demostración de tus habilidades técnicas y creativas
- ✅ Una herramienta para conseguir trabajo/clientes
- ✅ Una base para seguir iterando

**Próximos pasos sugeridos:**
1. Comparte tu portfolio en redes profesionales
2. Añade nuevos proyectos regularmente
3. Experimenta con nuevas animaciones/componentes
4. Considera añadir un blog para mostrar tu proceso

---

## Reflexión Final ATELIER

```markdown
## Reflexión S4 - Final

### Producto
1. ¿Estás orgulloso/a de tu portfolio?
2. ¿Lo usarías profesionalmente?
3. ¿Qué es lo que más te gusta?

### Galería
1. ¿Tus proyectos se presentan de forma atractiva?
2. ¿Las imágenes cargan rápido?
3. ¿El lightbox mejora la experiencia?

### Testing UX
1. ¿El feedback de tu compañero fue útil?
2. ¿Qué mejoraste basándote en ese feedback?
3. ¿Qué aprendiste probando el portfolio de otro/a?

### Aprendizaje
1. ¿Qué fue lo más difícil de estas 4 sesiones?
2. ¿Qué componente te gustó más implementar?
3. ¿Qué te gustaría aprender a continuación?

### Scrollytelling
1. ¿La narrativa progresiva funciona para tu portfolio?
2. ¿Las animaciones mejoran la experiencia?
3. ¿Qué ajustarías si tuvieras más tiempo?
```

---

<table style="width: 100%; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
  <tr>
    <td style="text-align: left;">
      ← Anterior: <a href="{{ '/tracks/es/ilustracion-webapp/s3-maquetacion-responsive-frameworks/' | relative_url }}">S3: Personalización</a>
    </td>
    <td style="text-align: right;">
      <a href="{{ '/tracks/es/ilustracion-webapp/' | relative_url }}">Volver al Track</a>
    </td>
  </tr>
</table>
