---
layout: lesson
title: 'Interactividad, UX Testing y Lanzamiento'
title_alt: 'Interactividad, UX Testing y Lanzamiento'
slug: ilustracion-webapp-s4
date: 2026-01-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/ilustracion-webapp/s4-interactividad-ux-ui/
description: 'Cuarta sesión: interactividad con JavaScript, testing de usabilidad con compañeros y lanzamiento final del portfolio.'
tags: [javascript, animaciones, ux, interactividad, ilustracion, lanzamiento]
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

---

## 🎯 Objetivos

- Añadir **interactividad** con JavaScript (animaciones scroll, menú móvil)
- Realizar **testing UX** con compañeros
- **Iterar** basándose en feedback
- **Lanzar** el portfolio final

---

## 🧭 Canon de Referencia

- [Animaciones Web con CSS]({{ '/lessons/es/web-animations/css/' | relative_url }})
- [Dominio de Animaciones GSAP]({{ '/lessons/es/web-animations/gsap/' | relative_url }}) _(opcional)_
- [Guía Práctica de Desarrollo Asistido por IA]({{ '/methodology/es/ai-practical-guide/' | relative_url }})

---

## ⏱️ Desglose de Tiempo

| Parte | Duración | Actividad                          |
| ----- | -------- | ---------------------------------- |
| **1** | 60 min   | Añadir interactividad (JavaScript) |
| **2** | 45 min   | Testing UX con compañeros          |
| **3** | 45 min   | Iteración y pulido final           |
| **4** | 45 min   | Lanzamiento y presentación         |

---

## Parte 1: Añadir Interactividad (60 min)

### 1.1 Animaciones al hacer scroll (25 min)

Hacer que elementos aparezcan con efecto fade-in al entrar en pantalla.

```javascript
// Intersection Observer para animaciones on-scroll
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
			}
		});
	},
	{ threshold: 0.1 }
);

// Observar elementos con clase .animate-on-scroll
document.querySelectorAll('.animate-on-scroll').forEach((el) => {
	observer.observe(el);
});
```

```css
/* CSS para la animación */
.animate-on-scroll {
	opacity: 0;
	transform: translateY(30px);
	transition:
		opacity 0.6s ease,
		transform 0.6s ease;
}

.animate-on-scroll.visible {
	opacity: 1;
	transform: translateY(0);
}
```

**Uso**: Añadir clase `animate-on-scroll` a elementos que quieras animar.

**Prompt IA — Animaciones On-Scroll**:

```markdown
Implementa animaciones suaves al hacer scroll usando Intersection Observer.

**Elementos a animar en mi portfolio:**
- Títulos de sección (h2)
- Cards de proyectos en galería
- Sección About
- Footer

**Requisitos técnicos:**
- Vanilla JavaScript (sin librerías)
- Intersection Observer API
- Fade-in + translateY
- Threshold configurable (0.1 recomendado)
- Respetar prefers-reduced-motion
- Performance: no causar reflows

**Implementación:**
1. Función observer que detecta elementos con clase .animate-on-scroll
2. Al entrar en viewport: añadir clase .visible
3. CSS con transition para opacity y transform
4. Duración: 0.6s, easing: ease

Genera JavaScript + CSS completo y comentado.
```

### 1.2 Menú responsive (20 min)

Si la navegación necesita un menú desplegable en móvil:

```html
<!-- Botón hamburguesa -->
<button id="menu-toggle" aria-label="Abrir menú" aria-expanded="false">☰</button>

<!-- Lista de navegación -->
<ul id="nav-menu" class="nav-menu">
	<li><a href="#work">Trabajo</a></li>
	<li><a href="#about">Sobre mí</a></li>
	<li><a href="#contact">Contacto</a></li>
</ul>
```

```javascript
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
	const isOpen = navMenu.classList.toggle('open');
	menuToggle.setAttribute('aria-expanded', isOpen);
});
```

```css
/* Móvil: menú oculto por defecto */
@media (max-width: 768px) {
	.nav-menu {
		display: none;
	}
	.nav-menu.open {
		display: flex;
		flex-direction: column;
	}
}

/* Desktop: menú siempre visible */
@media (min-width: 769px) {
	#menu-toggle {
		display: none;
	}
	.nav-menu {
		display: flex;
	}
}
```

**Prompt IA — Menú Hamburguesa Responsive**:

```markdown
Implementa un menú hamburguesa funcional para móvil.

**Estructura actual de mi navegación:**
[Describe tu nav: enlaces a #work, #about, #contact]

**Requisitos:**
- Desktop (>768px): navegación horizontal visible
- Móvil (≤768px): botón hamburguesa + menú desplegable
- Toggle con JavaScript vanilla
- Transición suave de apertura/cierre
- Cerrar al hacer clic en enlace
- Accesibilidad: aria-expanded, aria-label
- Overlay de fondo cuando está abierto (opcional)

**Funcionalidad:**
1. Botón hamburguesa con icono (☰)
2. Click: toggle clase .open en menú
3. Actualizar aria-expanded
4. Bloquear scroll de body cuando menú abierto

Genera HTML + CSS + JavaScript completo.
```

### 1.3 Extras opcionales (15 min)

Para estudiantes que vayan más rápido:

**Lightbox para galería**:

```javascript
// Abrir imagen en modal al hacer clic
document.querySelectorAll('.gallery img').forEach((img) => {
	img.addEventListener('click', () => {
		// Crear modal con imagen ampliada
	});
});
```

**Smooth scroll**:

```css
html {
	scroll-behavior: smooth;
}
```

### Progressive Enhancement

**Importante**: La página debe funcionar sin JavaScript.

- Los enlaces de navegación deben existir en HTML
- El contenido debe ser visible aunque no cargue el JS
- Las animaciones son mejoras, no requisitos

**Prompt IA — Lightbox para Galería (Opcional)**:

```markdown
Crea un lightbox simple para ampliar imágenes de la galería.

**Galería actual:**
[Describe tu grid de proyectos con imágenes]

**Requisitos:**
- Click en imagen de galería: abrir lightbox
- Lightbox: imagen ampliada + overlay oscuro
- Botón cerrar (X) visible
- Click fuera de imagen: cerrar
- ESC key: cerrar
- Navegación previa/siguiente (opcional)
- Accesibilidad: focus trap, aria-label

**Implementación:**
- Modal con position: fixed
- Imagen centrada con max-width/height
- Overlay rgba(0,0,0,0.8)
- Transición fade-in/out
- Bloquear scroll de body cuando abierto

Genera HTML + CSS + JavaScript vanilla.
```

---

## Parte 2: Testing UX con Compañeros (45 min)

### 2.1 Dinámica de testing (25 min)

**Formato**: Parejas o tríos intercambian portfolios.

**Proceso**:

1. Estudiante A abre el portfolio de B en su dispositivo
2. A navega **sin indicaciones** mientras B observa
3. A toma notas de qué funcionó y qué no
4. Intercambiar roles

**Tareas de testing** (dar a quien prueba):

1. ¿De qué trata este portfolio? (primera impresión)
2. Encuentra la sección "Sobre mí"
3. ¿Cómo contactarías a esta persona?
4. Navega en móvil (emulador o dispositivo real)

### 2.2 Feedback estructurado

| Aspecto    | Pregunta                            | ✓/✗ |
| ---------- | ----------------------------------- | --- |
| Claridad   | ¿Entendiste qué hace en 5 segundos? |     |
| Navegación | ¿Encontraste todo fácilmente?       |     |
| Contacto   | ¿El email/redes son claros?         |     |
| Móvil      | ¿Funciona bien en móvil?            |     |
| Velocidad  | ¿Carga rápido?                      |     |

**1 sugerencia concreta de mejora**: **\*\*\*\***\_**\*\*\*\***

### 2.3 Discusión grupal (20 min)

Compartir en grupo:

- ¿Qué problemas comunes aparecieron?
- ¿Qué soluciones encontraron?
- Cada estudiante identifica **1-2 mejoras** a implementar

---

## Parte 3: Iteración y Pulido Final (45 min)

### 3.1 Implementar mejoras del feedback (25 min)

Ejemplos comunes:

- "El texto de mi bio era muy largo" → Resumir
- "El botón de contacto no se veía" → Más contraste
- "La animación era lenta" → Ajustar duración
- "En móvil el menú no funcionaba" → Revisar JS

### 3.2 Checklist de accesibilidad final (10 min)

- [ ] **Contraste** de texto legible (4.5:1 mínimo)
- [ ] **Alt text** en todas las imágenes
- [ ] **Focus visible** al navegar con Tab
- [ ] **Tamaños de letra** legibles (mínimo 16px body)
- [ ] **Touch targets** de 44px+ en móvil

### 3.3 Optimización (10 min)

- [ ] Sin errores en consola del navegador
- [ ] Imágenes optimizadas (no gigantes)
- [ ] Lighthouse Performance > 80

---

## Parte 4: Lanzamiento y Presentación (45 min)

### 4.1 Deploy final (15 min)

**Verificar GitHub Pages**:

```bash
git add .
git commit -m "feat(s4): portfolio final con interactividad

- Animaciones on-scroll
- Menú responsive
- Mejoras de feedback UX
- Accesibilidad verificada"

git push origin main
```

Comprobar que la URL pública funciona correctamente.

### 4.2 Preparar presentación (10 min)

Cada estudiante prepara:

- **URL pública** del portfolio
- **1-2 frases** explicando el concepto
- **1 desafío** superado durante el proceso
- **1 cosa** de la que está orgulloso/a

### 4.3 Ronda de presentaciones (20 min)

**Formato**: 2-3 minutos por persona

1. Mostrar portfolio en vivo
2. Explicar brevemente el concepto/inspiración
3. Compartir un aprendizaje del proceso

**Celebrar el trabajo realizado.**

---

## ✅ Checklist de Entregables S4

### Interactividad

- [ ] **Animaciones on-scroll** funcionando
- [ ] **Menú responsive** (si aplica)
- [ ] **Progressive enhancement** (funciona sin JS)

### UX

- [ ] **Testing con compañeros** completado
- [ ] **Feedback documentado**
- [ ] **Mejoras implementadas** basadas en feedback

### Lanzamiento

- [ ] **Sin errores** en consola
- [ ] **Accesibilidad** verificada
- [ ] **URL pública** funcionando
- [ ] **Commit final** con mensaje descriptivo

---

## 🎯 Criterios de Evaluación Final

### Técnico (40%)

- HTML semántico y válido
- CSS bien estructurado
- JavaScript funcional
- Responsive en todos los breakpoints

### Creativo (40%)

- Diseño visual coherente con el estilo del ilustrador
- UX clara y efectiva
- Presentación profesional del trabajo

### Proceso (20%)

- Commits significativos por sesión
- Documentación (reflexiones)
- Participación en testing de peers

---

## 🎉 Cierre del Track

**Recapitulación**:

- En 4 sesiones han creado un portfolio profesional
- Han aplicado HTML semántico, CSS responsive, JavaScript
- Han seguido metodología docs-first con IA
- Han validado su trabajo con testing de usuarios

**Próximos pasos sugeridos**:

1. Compartir el portfolio en redes profesionales
2. Añadir nuevos proyectos regularmente
3. Seguir aprendiendo (React, animaciones avanzadas, etc.)

---

## 🚀 Prompt IA Master — Portfolio Final con Interactividad

**Para integrar todas las mejoras de S4:**

```markdown
Añade interactividad profesional a mi portfolio completado en S3.

## Portfolio Actual

[Describe brevemente tu portfolio: secciones, colores, estilo]
URL actual: [tu-github-pages-url]

## Interactividad a Añadir

### 1. Animaciones On-Scroll
**Elementos:**
- Fade-in en títulos de sección (h2)
- Stagger en cards de galería (aparecer una tras otra)
- Slide-in en sección About

**Implementación:**
- Intersection Observer API
- Clase .animate-on-scroll
- CSS transitions (opacity + translateY)
- Respetar prefers-reduced-motion

### 2. Menú Responsive
**Funcionalidad:**
- Desktop: navegación horizontal visible
- Móvil: botón hamburguesa + menú desplegable
- Toggle suave con JavaScript
- Cerrar al hacer click en enlace
- aria-expanded para accesibilidad

### 3. Micro-interacciones
**En galería:**
- Hover: scale sutil (1.05) + overlay
- Click: abrir lightbox (opcional)

**En navegación:**
- Smooth scroll a secciones
- Highlight del enlace activo según scroll

**En CTAs:**
- Hover con color primario
- Transform subtle

## Mejoras Basadas en Feedback UX

**Issues detectados en testing:**
[Lista problemas encontrados por compañeros]

Ejemplo:
- "Bio muy larga" → Reducir a 2 párrafos máximo
- "Botón contacto no se ve" → Aumentar contraste
- "Carga lenta" → Optimizar imágenes

**Cambios a implementar:**
1. [Mejora 1]
2. [Mejora 2]
3. [Mejora 3]

## Requisitos Técnicos

**JavaScript:**
- Vanilla JS (sin librerías)
- Progressive enhancement
- Sin errores en consola
- Performance 60fps en animaciones

**Accesibilidad:**
- Mantener navegación por teclado
- Focus visible en todos los interactivos
- prefers-reduced-motion respetado

**Performance:**
- Lighthouse > 80 en todas las métricas
- First Contentful Paint < 2s
- Imágenes lazy-load

## Entregables

1. **main.js** — Todo el JavaScript de interactividad
2. **Estilos actualizados** — Animaciones y micro-interacciones
3. **README.md actualizado** — Documentar cambios y features
4. **Case study** — Breve descripción del portfolio:
   - Objetivo
   - Inspiración de diseño
   - Desafíos superados
   - Tecnologías usadas
   - Próximos pasos

Genera código comentado y listo para producción.
```

---

## Reflexión Final ATELIER

```markdown
## Reflexión S4 - Final

### Producto

1. ¿Estás orgulloso/a de tu portfolio?
2. ¿Lo usarías para buscar trabajo/clientes?

### Proceso

1. ¿El testing con compañeros fue útil?
2. ¿Qué cambió basado en el feedback?

### Aprendizaje

1. ¿Qué fue lo más difícil de estas 4 sesiones?
2. ¿Qué te gustaría aprender a continuación?
```

---

<table style="width: 100%; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
  <tr>
    <td style="text-align: left;">
      ← Anterior: <a href="{{ '/tracks/es/ilustracion-webapp/s3-maquetacion-responsive-frameworks/' | relative_url }}">S3: Maquetación responsive</a>
    </td>
    <td style="text-align: right;">
      <a href="{{ '/tracks/es/ilustracion-webapp/' | relative_url }}">Volver al Track</a>
    </td>
  </tr>
</table>
