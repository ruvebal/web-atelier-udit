---
layout: lesson
title: 'Interactividad con GSAP + UX Final'
title_alt: 'Interactividad con GSAP + UX Final'
slug: ilustracion-webapp-s4
date: 2026-01-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/ilustracion-webapp/s4-interactividad-ux-ui/
description: 'Cuarta sesión: animaciones profesionales con GSAP, micro-interacciones, testing de usabilidad y lanzamiento final del portfolio.'
tags: [gsap, animaciones, ux, interactividad, ilustracion, lanzamiento]
status: borrador
---

## ⏰ Duración estimada

**3,5 horas (1 sesión)**

**Fase de Producto**: Animation → UX Testing → Launch → Presentation

---

## 🎯 Objetivos

### Objetivos de Producto

- Transformar tu portfolio en una **experiencia interactiva** memorable
- Implementar **animaciones profesionales** que mejoren la narrativa visual
- Realizar **testing de usabilidad** con peers para validar la experiencia
- **Lanzar** el portfolio final con calidad de producción

### Objetivos Técnicos

- Dominar **GSAP** para animaciones profesionales
- Implementar **ScrollTrigger** para animaciones on-scroll
- Crear **micro-interacciones** que mejoren el feedback visual
- Optimizar **performance** de animaciones (60fps)

### Objetivos de UX

- Validar la experiencia con **testing rápido** entre peers
- Aplicar **principios de UX** para mejorar conversión
- Asegurar que animaciones **respetan prefers-reduced-motion**

---

## 🧭 Canon de Referencia

**GSAP**:
- [Dominio de Animaciones GSAP – De Cero a Producción]({{ '/lessons/es/web-animations/gsap/' | relative_url }})
- [Animaciones Web con CSS – De lo Básico a lo Avanzado]({{ '/lessons/es/web-animations/css/' | relative_url }})

**UX/UI**:
- [Metodología ATELIER]({{ '/methodology/es/' | relative_url }})

**Metodología**:
- [Guía Práctica de Desarrollo Asistido por IA]({{ '/methodology/es/ai-practical-guide/' | relative_url }})

---

## ⏱️ Desglose de Tiempo (3.5 horas)

| Parte | Duración | Fase | Actividad |
|-------|----------|------|-----------|
| **1** | 75 min | Animation | GSAP setup, scroll animations, micro-interacciones |
| **2** | 45 min | UX Testing | Testing con peers, iteración rápida |
| **3** | 45 min | Launch | Optimización final, deploy, documentación |
| **4** | 30 min | Presentation | Demo final, reflexión, celebración |

---

## Parte 1: GSAP Animations (75 min)

### 1.1 Setup GSAP (10 min)

En tu `<head>` o antes de `</body>`:

```html
<!-- GSAP Core -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<!-- ScrollTrigger Plugin -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

<script>
  // Registrar plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Respetar preferencias de usuario
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
</script>
```

### 1.2 Hero Animation (15 min)

**Animación de entrada del hero**:

```javascript
// Solo si el usuario no prefiere reduced motion
if (!prefersReducedMotion) {
  // Timeline para hero
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  heroTl
    .from('.hero-title', { 
      y: 60, 
      opacity: 0, 
      duration: 1 
    })
    .from('.hero-subtitle', { 
      y: 40, 
      opacity: 0, 
      duration: 0.8 
    }, '-=0.6')
    .from('.hero-cta', { 
      y: 30, 
      opacity: 0, 
      duration: 0.6 
    }, '-=0.4')
    .from('.hero-image', { 
      scale: 0.95, 
      opacity: 0, 
      duration: 1.2 
    }, '-=0.8');
}
```

### 1.3 Scroll Animations (25 min)

**Fade-in de secciones al scroll**:

```javascript
if (!prefersReducedMotion) {
  // Animación para cada sección
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section.querySelectorAll('.animate-on-scroll'), {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15
    });
  });
}
```

**Parallax sutil en hero**:

```javascript
if (!prefersReducedMotion) {
  gsap.to('.hero-image', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: 100,
    ease: 'none'
  });
}
```

**Animación de galería**:

```javascript
if (!prefersReducedMotion) {
  gsap.from('.project-card', {
    scrollTrigger: {
      trigger: '.gallery',
      start: 'top 75%'
    },
    y: 80,
    opacity: 0,
    duration: 0.8,
    stagger: {
      amount: 0.6,
      from: 'start'
    }
  });
}
```

### 1.4 Micro-interacciones (25 min)

**Hover en project cards**:

```javascript
if (!prefersReducedMotion) {
  document.querySelectorAll('.project-card').forEach(card => {
    const image = card.querySelector('img');
    const overlay = card.querySelector('.overlay');
    
    card.addEventListener('mouseenter', () => {
      gsap.to(image, { scale: 1.05, duration: 0.4 });
      gsap.to(overlay, { opacity: 1, duration: 0.3 });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(image, { scale: 1, duration: 0.4 });
      gsap.to(overlay, { opacity: 0, duration: 0.3 });
    });
  });
}
```

**Magnetic button effect**:

```javascript
if (!prefersReducedMotion) {
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}
```

**Prompt IA - Animaciones GSAP**:

```markdown
Crea animaciones GSAP para mi portfolio de ilustrador.

Elementos a animar:
1. Hero (título, subtítulo, CTA, imagen)
2. Galería de proyectos (fade-in on scroll)
3. Sección About (parallax sutil)
4. Micro-interacciones en cards

Requisitos:
- Respetar prefers-reduced-motion
- Performance 60fps
- Timelines para secuencias
- ScrollTrigger para on-scroll
- Easing natural (power3, elastic)

Genera código JS completo y comentado.
```

---

## Parte 2: UX Testing (45 min)

### 2.1 Testing con Peers (25 min)

**Formato**: Parejas intercambian portfolios

**Tareas de testing** (5 min cada):

1. **Primera impresión**: ¿De qué trata este portfolio?
2. **Navegación**: Encuentra la sección About
3. **Contacto**: ¿Cómo contactarías a esta persona?
4. **Galería**: ¿Cuál es el proyecto destacado?
5. **Mobile**: Navega en móvil (emulador)

**Checklist de feedback**:

| Aspecto | Pregunta | Respuesta |
|---------|----------|-----------|
| Claridad | ¿Entendiste qué hace en 5 segundos? | Sí/No |
| Navegación | ¿Encontraste todo fácilmente? | Sí/No |
| Animaciones | ¿Mejoran o distraen? | Mejoran/Distraen |
| CTA | ¿El contacto es claro? | Sí/No |
| Mobile | ¿Funciona bien en móvil? | Sí/No |
| Sugerencia | 1 cosa a mejorar | [texto] |

### 2.2 Iteración Rápida (20 min)

**Priorizar fixes**:

1. **Crítico**: Bugs que impiden uso
2. **Alto**: Confusión en navegación/CTA
3. **Medio**: Mejoras de animación
4. **Bajo**: Polish visual

**Implementa 2-3 mejoras** basadas en feedback.

---

## Parte 3: Launch (45 min)

### 3.1 Checklist Pre-Launch (15 min)

**Funcionalidad**:
- [ ] Todas las secciones cargan
- [ ] Navegación funciona
- [ ] Links externos abren en nueva pestaña
- [ ] Formulario/email funciona
- [ ] Sin errores en consola

**Performance**:
- [ ] Lighthouse Performance 90+
- [ ] Imágenes optimizadas
- [ ] Animaciones 60fps
- [ ] First Contentful Paint < 2s

**Accesibilidad**:
- [ ] Lighthouse Accessibility 100
- [ ] Navegación por teclado
- [ ] prefers-reduced-motion respetado
- [ ] Alt text en todas las imágenes

**SEO**:
- [ ] Title y description únicos
- [ ] Open Graph meta tags
- [ ] URL amigable
- [ ] Favicon

### 3.2 Optimización Final (15 min)

**Meta tags para redes sociales**:

```html
<!-- Open Graph -->
<meta property="og:title" content="Tu Nombre - Ilustrador/a">
<meta property="og:description" content="Portfolio de ilustración...">
<meta property="og:image" content="https://tu-url/og-image.jpg">
<meta property="og:url" content="https://tu-url">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
```

### 3.3 Deploy Final (15 min)

**Commit final**:

```bash
git add .
git commit -m "feat(s4): portfolio completo con GSAP y UX polish

- Animaciones GSAP profesionales
- ScrollTrigger para on-scroll effects
- Micro-interacciones en galería
- Testing de usabilidad completado
- Fixes basados en feedback
- Optimización de performance
- Meta tags para redes sociales
- Accesibilidad verificada

LAUNCH: Portfolio listo para producción 🚀"

git push origin main
```

---

## Parte 4: Presentation (30 min)

### 4.1 Demo Final (15 min)

**Formato**: 2-3 min por persona

1. **Muestra tu portfolio live**
2. **Destaca 1 animación** que te enorgullece
3. **Comparte 1 aprendizaje** del proceso
4. **URL pública** para que todos la guarden

### 4.2 Reflexión Final (15 min)

```markdown
## Reflexión S4 - Final

### Producto
1. ¿Estás orgulloso/a de tu portfolio?
2. ¿Qué te gustaría mejorar con más tiempo?
3. ¿Lo usarías para buscar trabajo/clientes?

### Técnica
1. ¿GSAP fue más fácil o difícil de lo esperado?
2. ¿Qué animación fue la más compleja?
3. ¿Qué aprendiste sobre performance?

### Proceso
1. ¿El testing con peers fue útil?
2. ¿Qué cambió basado en feedback?
3. ¿Docs-first funcionó para ti?

### Futuro
1. ¿Qué features añadirías?
2. ¿Qué tecnología quieres aprender?
3. ¿Cómo mantendrás el portfolio actualizado?
```

---

## ✅ Checklist de Entregables S4

### Animaciones
- [ ] **GSAP integrado** y funcionando
- [ ] **Hero animation** con timeline
- [ ] **Scroll animations** en secciones
- [ ] **Micro-interacciones** en galería
- [ ] **prefers-reduced-motion** respetado

### UX
- [ ] **Testing con peers** completado
- [ ] **Feedback documentado**
- [ ] **2-3 mejoras** implementadas

### Launch
- [ ] **Lighthouse 90+** en todas las métricas
- [ ] **Sin errores** en consola
- [ ] **Meta tags** para redes sociales
- [ ] **URL pública** funcionando

### Documentación
- [ ] **README** actualizado con URL final
- [ ] **Reflexión S4** documentada
- [ ] **Commit final** con mensaje descriptivo

---

## 🎯 Criterios de Éxito S4

✅ **Animaciones profesionales** que mejoran la experiencia  
✅ **Performance 60fps** en todas las animaciones  
✅ **Accesibilidad** con reduced-motion respetado  
✅ **Testing validado** con feedback incorporado  
✅ **Portfolio publicado** y funcionando  

---

## 🏆 Criterios de Evaluación Final

### Componente Técnico (40%)
- HTML semántico y válido
- CSS/Tailwind bien estructurado
- JavaScript/GSAP funcional
- Responsive en todos los breakpoints
- Lighthouse 90+ en todas las métricas

### Componente Creativo (40%)
- Diseño visual coherente con tu estilo
- Animaciones que mejoran la narrativa
- UX clara y efectiva
- Presentación profesional del trabajo

### Componente Procesual (20%)
- Commits significativos por sesión
- Documentación (plans, reflexiones)
- Uso ético de IA
- Participación en testing de peers

---

## 🎉 ¡Felicidades!

Has completado el track **Ilustración Aplicada: Productos Digitales Web-App**.

Tu portfolio es ahora:
- ✅ Un producto digital profesional
- ✅ Una demostración de tus habilidades técnicas
- ✅ Una herramienta para conseguir trabajo/clientes
- ✅ Una base para seguir iterando

**Próximos pasos sugeridos**:
1. Comparte tu portfolio en redes profesionales
2. Añade nuevos proyectos regularmente
3. Explora frameworks como React/Vue
4. Considera un blog para mostrar proceso

---

<table style="width: 100%; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
  <tr>
    <td style="text-align: left;">
      ← Anterior: <a href="{{ '/tracks/es/ilustracion-webapp/s3-maquetacion-responsive-frameworks/' | relative_url }}">S3: Tailwind CSS</a>
    </td>
    <td style="text-align: right;">
      <a href="{{ '/tracks/es/ilustracion-webapp/' | relative_url }}">Volver al Track</a>
    </td>
  </tr>
</table>
