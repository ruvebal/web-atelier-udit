# Guía de Prompts: Portfolio de Ilustración con IA

## 📋 Tabla de Contenidos

- [Introducción](#introducción)
- [Metodología: Dos Fases Obligatorias](#metodología-dos-fases-obligatorias)
- [Preparación: Antes de Empezar](#preparación-antes-de-empezar)
- [Sesión 1: Base y Configuración](#sesión-1-base-y-configuración)
- [Sesión 2: Layout Responsive](#sesión-2-layout-responsive)
- [Sesión 3: Navegación y Animaciones](#sesión-3-navegación-y-animaciones)
- [Sesión 4: Galería y Pulido Final](#sesión-4-galería-y-pulido-final)
- [Prompts de Emergencia](#prompts-de-emergencia)
- [Errores Comunes y Cómo Evitarlos](#errores-comunes-y-cómo-evitarlos)

---

## Introducción

Esta guía te enseña a usar agentes de IA (Cursor, Claude, ChatGPT, GitHub Copilot) de forma **profesional y estructurada** para construir tu portfolio de ilustración siguiendo el challenge:

**📄 Challenge completo:** [Portfolio de Ilustración con Scrollytelling](/tracks/es/ilustracion-webapp/portfolio-challenge/)

### ⚠️ REGLA DE ORO: Metodología de Dos Fases

**TODA interacción con IA debe seguir este flujo:**

```
1. FASE 1: PLANIFICACIÓN
   ├─ Pides a la IA que genere un PLAN
   ├─ Revisas y ajustas el plan
   └─ Guardas en docs/plan1.md, plan2.md, etc.

2. FASE 2: IMPLEMENTACIÓN
   ├─ Commit pre-IA: "feat(nav): before AI planning"
   ├─ Pides a la IA que implemente EL PLAN
   └─ Revisas, pruebas y commiteas
```

**📚 Metodología completa:** [Guía de trabajo con agentes de IA](/lessons/es/ai-methodology/)

### ¿Por qué esta metodología?

- ✅ Evita código sin rumbo y arquitectura caótica
- ✅ Te obliga a entender ANTES de implementar
- ✅ Crea documentación automática de tus decisiones
- ✅ Facilita debugging y mejoras futuras
- ✅ Demuestra pensamiento profesional (se evalúa)

---

## Preparación: Antes de Empezar

### Paso 0: Completa tu project-brief.md

**🚨 CRÍTICO: NO empieces a programar sin esto.**

```markdown
# Prompt para completar project-brief.md

Necesito completar mi project-brief.md para mi portfolio de ilustración.

**Contexto:**
- Soy estudiante de ilustración aplicada
- Mi especialidad es: [editorial/digital/branding/etc.]
- Mi estilo visual es: [minimalista/colorido/conceptual/etc.]
- Tengo [X] proyectos listos para mostrar

**Ayúdame a:**
1. Definir mi concepto de portfolio (¿qué estoy construyendo? ¿para quién? ¿por qué importa?)
2. Crear una paleta de colores coherente (5 colores con hex codes)
3. Seleccionar tipografías de Google Fonts que funcionen con mi estilo
4. Redactar mi bio corta (2-3 párrafos) profesional pero personal
5. Crear un tagline impactante para mi hero
6. Definir 3 estadísticas personales relevantes
7. Describir mis 3 áreas de especialización
8. Documentar mi proceso creativo en 3 pasos
9. Listar mis herramientas y skills en 3 categorías

**Importante:**
- Usa un tono profesional pero accesible
- Los colores deben cumplir WCAG AA (contraste 4.5:1)
- Las tipografías deben ser legibles en móvil
- El contenido debe reflejar MI voz, no ser genérico

**Formato de salida:**
Completa la plantilla de project-brief.md con contenido específico para mi perfil.
```

**✅ Checklist antes de continuar:**
- [ ] `project-brief.md` completado al 100%
- [ ] Paleta verificada con [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ ] Tipografías probadas en [Google Fonts](https://fonts.google.com/)
- [ ] Mínimo 6 proyectos subidos a ImageKit
- [ ] URLs de ImageKit probadas con transformaciones

---

## Sesión 1: Base y Configuración

### 1.1 Configuración del Repositorio

#### FASE 1: Planificación

```markdown
# Prompt: Plan de configuración inicial

Voy a crear mi portfolio de ilustración siguiendo el challenge de WEB ATELIER (UDIT).

**Requisitos técnicos:**
- Stack: HTML5, CSS3, Vanilla JavaScript (ES6+)
- Sin frameworks (no jQuery, no Bootstrap)
- Despliegue en GitHub Pages
- Estructura de archivos profesional

**Necesito un PLAN (no código todavía) para:**
1. Estructura de directorios óptima
2. Archivos esenciales que debo crear
3. Configuración de .gitignore
4. Contenido inicial del README.md
5. Estrategia de commits (conventional commits)
6. Configuración de GitHub Pages

**Contexto del proyecto:**
- Nombre del repo: [tu-nombre-repo]
- Mi nombre: [Tu Nombre]
- GitHub username: @[tu-username]

**Formato de salida:**
Plan paso a paso con justificación de cada decisión.
Guarda esto en docs/plan1.md
```

**📝 Guarda la respuesta en:** `docs/plan1.md`

#### FASE 2: Implementación

```markdown
# Prompt: Implementar configuración inicial

Tengo el plan documentado en docs/plan1.md.

**Ahora implementa:**

1. **Estructura de directorios completa**
2. **README.md inicial** con:
   - Título del proyecto
   - Placeholder para enlace de despliegue
   - Descripción breve
   - Stack tecnológico
   - Instrucciones de instalación
   - Sección sobre uso de IA
3. **.gitignore** apropiado para proyecto web vanilla
4. **404.html** personalizado con navegación de vuelta
5. **LICENSE** (MIT)

**Archivos base HTML/CSS/JS:**
- `index.html` con estructura semántica vacía
- `assets/css/index.css` (barrel file)
- `assets/css/base.css` (reset + variables)
- `assets/js/main.js` (estructura básica)

**Importante:**
- Usa HTML5 semántico
- Incluye meta tags esenciales
- Configura custom properties en CSS
- Sigue las reglas de .cursorrules del proyecto
```

**✅ Después de implementar:**
```bash
git add .
git commit -m "feat: initial project setup with structure and base files"
git push origin main
```

---

### 1.2 Arquitectura CSS y Tipografía

#### FASE 1: Planificación

```markdown
# Prompt: Plan de sistema de diseño

Tengo mi project-brief.md completado con:
- Paleta de colores: [lista tus colores]
- Tipografías: [lista tus fuentes de Google Fonts]
- Estilo visual: [tus palabras clave]

**Necesito un PLAN para crear un sistema de diseño en CSS que incluya:**

1. **Custom Properties (CSS Variables):**
   - Colores (primario, secundario, acentos, texto, fondo)
   - Tipografía fluida con clamp() (5 tamaños: base, lg, xl, 2xl, 3xl)
   - Espaciado (escala de 8px: xs, sm, md, lg, xl, 2xl)
   - Sombras y efectos
   - Transiciones y animaciones

2. **Reset/Normalize CSS:**
   - Box-sizing border-box
   - Márgenes y paddings a 0
   - Tipografía base
   - Smooth scroll

3. **Arquitectura de archivos CSS:**
   - base.css (variables + reset)
   - layout.css (grid, flexbox, containers)
   - components.css (botones, cards, etc.)
   - index.css (imports todos)

4. **Estrategia responsive:**
   - Mobile-first
   - Breakpoints: 480px, 768px, 1024px, 1440px
   - Tipografía fluida que escala suavemente

5. **Accesibilidad:**
   - Contraste WCAG AA verificado
   - prefers-reduced-motion
   - prefers-color-scheme (opcional: dark mode)

**Formato de salida:**
Plan detallado con valores específicos para cada variable.
Guarda en docs/plan2.md
```

**📝 Guarda la respuesta en:** `docs/plan2.md`

#### FASE 2: Implementación

```markdown
# Prompt: Implementar sistema de diseño

Tengo el plan en docs/plan2.md.

**Implementa el sistema de diseño completo:**

**En assets/css/base.css:**
```css
/* Implementa:
- Custom properties con los valores del plan
- Reset CSS completo
- Tipografía base con font-display: swap
- Smooth scroll behavior
- prefers-reduced-motion
*/
```

**En assets/css/layout.css:**
```css
/* Implementa:
- Container con max-width y padding responsive
- Utilidades de Grid y Flexbox
- Clases de espaciado
*/
```

**En assets/css/components.css:**
```css
/* Implementa:
- Estilos de botones (.btn, .btn-primary, .btn-secondary)
- Cards básicas
- Skip link para accesibilidad
*/
```

**En assets/css/index.css:**
```css
/* Importa todos los archivos en orden correcto */
```

**En index.html:**
- Añade enlaces a Google Fonts desde project-brief.md
- Vincula index.css

**Importante:**
- Usa valores de custom properties, no hardcoded
- Comenta las secciones claramente
- Verifica contraste de colores
```

**✅ Después de implementar:**
```bash
git add assets/css/
git commit -m "feat(css): implement design system with custom properties and fluid typography"
git push
```

---

### 1.3 Despliegue en GitHub Pages

```markdown
# Prompt: Configurar GitHub Pages

**Tarea:**
Guíame paso a paso para configurar GitHub Pages para mi repositorio.

**Necesito:**
1. Instrucciones exactas en Settings → Pages
2. Qué rama y carpeta seleccionar
3. Cómo verificar que funciona
4. Cómo actualizar el README con el enlace de despliegue
5. Qué hacer si no funciona (troubleshooting)

**Formato:**
Checklist paso a paso con capturas mentales de dónde hacer click.
```

**✅ Después de configurar:**
- Espera 2-3 minutos
- Visita tu URL: `https://[tu-username].github.io/[repo-name]/`
- Actualiza README.md con el enlace
- Commit: `docs: add deployment URL to README`

---

## Sesión 2: Layout Responsive

### 2.1 Estructura HTML de Secciones

#### FASE 1: Planificación

```markdown
# Prompt: Plan de estructura HTML

Voy a construir todas las secciones de mi portfolio usando contenidos de project-brief.md.

**Secciones obligatorias:**
1. Hero (tagline + CTA)
2. About (bio + estadísticas)
3. My Work (3 especialidades)
4. Timeline (proceso creativo)
5. Skills (herramientas)
6. Contact (email + redes)
7. Footer

**Necesito un PLAN para:**
1. Estructura HTML5 semántica de cada sección
2. Jerarquía de encabezados (h1, h2, h3)
3. IDs para navegación con anclas
4. Clases CSS coherentes (metodología BEM opcional)
5. Atributos ARIA necesarios
6. Contenido placeholder vs. contenido real de project-brief.md

**Importante:**
- Un solo h1 por página (en Hero)
- Usar <section>, <article>, <header>, <footer> correctamente
- Preparar para navegación sticky (añadir después)

**Formato de salida:**
Plan con estructura HTML de cada sección explicada.
Guarda en docs/plan3.md
```

**📝 Guarda la respuesta en:** `docs/plan3.md`

#### FASE 2: Implementación

```markdown
# Prompt: Implementar estructura HTML

Tengo el plan en docs/plan3.md y contenidos en project-brief.md.

**Implementa en index.html:**

**Sección Hero:**
- h1 con mi nombre
- Tagline de project-brief.md
- Breve descripción
- Botón CTA "Ver mi trabajo" (scroll a #gallery)
- Indicador de scroll (opcional)

**Sección About (#about):**
- h2 "Sobre mí"
- Bio corta de project-brief.md (2-3 párrafos)
- Grid de 3 estadísticas (número + label)

**Sección My Work (#work):**
- h2 "Mi Trabajo"
- 3 cards con especialidades de project-brief.md
- Cada card: icono/emoji + título + descripción

**Sección Timeline (#process):**
- h2 "Mi Proceso"
- 3 pasos del proceso creativo de project-brief.md
- Visualización tipo timeline o steps numerados

**Sección Skills (#skills):**
- h2 "Herramientas"
- 3 cards con categorías de project-brief.md
- Cada card: título + lista de 4 items

**Sección Contact (#contact):**
- h2 "Contacto"
- Email de project-brief.md
- Enlaces a redes sociales con iconos
- CTA final de project-brief.md

**Footer:**
- Copyright con mi nombre y año
- Enlaces rápidos a secciones
- Enlace a GitHub repo

**Importante:**
- Usa contenido REAL de project-brief.md, no placeholders
- Añade alt text descriptivo (aunque no haya imágenes todavía)
- Incluye skip link al inicio: <a href="#main" class="skip-link">Skip to main content</a>
```

**✅ Después de implementar:**
```bash
git add index.html
git commit -m "feat(html): add all portfolio sections with semantic structure"
git push
```

---

### 2.2 Layout Responsive con CSS Grid y Flexbox

#### FASE 1: Planificación

```markdown
# Prompt: Plan de layouts responsive

Tengo todas las secciones HTML implementadas.

**Necesito un PLAN para layouts responsive mobile-first:**

1. **Estrategia general:**
   - Mobile (320px-767px): columna única, stack vertical
   - Tablet (768px-1023px): 2 columnas donde tenga sentido
   - Desktop (1024px+): layouts complejos con Grid

2. **Por cada sección, define:**
   - Hero: layout, alineación, tamaño de texto
   - About: grid de estadísticas (1 col → 3 cols)
   - My Work: cards (1 col → 2 cols → 3 cols)
   - Timeline: visualización (vertical → horizontal)
   - Skills: cards (1 col → 3 cols)
   - Contact: layout de contenido
   - Footer: organización de enlaces

3. **Técnicas CSS a usar:**
   - CSS Grid con auto-fit y minmax()
   - Flexbox para componentes
   - Container queries (si soportado)
   - Aspect ratio para cards
   - Gap para espaciado

4. **Espaciado y ritmo vertical:**
   - Padding de secciones
   - Margin entre elementos
   - Line-height responsive

**Formato de salida:**
Plan con breakpoints y técnicas específicas para cada sección.
Guarda en docs/plan4.md
```

**📝 Guarda la respuesta en:** `docs/plan4.md`

#### FASE 2: Implementación

```markdown
# Prompt: Implementar layouts responsive

Tengo el plan en docs/plan4.md.

**Implementa en assets/css/layout.css:**

**Layouts mobile-first para cada sección:**

```css
/* Hero: centrado, full viewport height */
/* About: grid de stats responsive */
/* My Work: grid de cards con auto-fit */
/* Timeline: flexbox vertical → horizontal */
/* Skills: grid de 3 columnas responsive */
/* Contact: centrado con max-width */
/* Footer: flexbox con wrap */
```

**Importante:**
- Mobile-first: estilos base sin media query
- Media queries: @media (min-width: 768px), (min-width: 1024px)
- Usa custom properties para breakpoints
- Usa gap en lugar de margin entre items
- Padding responsive con clamp()
- Sin scroll horizontal en ningún tamaño

**Prueba en DevTools:**
- 320px (iPhone SE)
- 375px (iPhone estándar)
- 768px (iPad vertical)
- 1024px (iPad horizontal)
- 1440px (laptop)
- 1920px (desktop)
```

**✅ Después de implementar:**
```bash
git add assets/css/layout.css
git commit -m "feat(css): implement responsive layouts with Grid and Flexbox"
git push
```

---

## Sesión 3: Navegación y Animaciones

### 3.1 Navegación Sticky Responsive

#### FASE 1: Planificación

```markdown
# Prompt: Plan de navegación sticky

Necesito una navegación sticky profesional.

**Referencia:** [Ejemplo de navegación](/student-project-template/docs/ejemplo-navegacion.md)

**Requisitos:**
1. **Desktop (768px+):**
   - Navegación horizontal siempre visible
   - Links a todas las secciones
   - Scroll suave al hacer click
   - Indicador de sección activa
   - Fondo semi-transparente con backdrop-filter blur
   - Sombra al hacer scroll

2. **Mobile (<768px):**
   - Menú hamburguesa (☰)
   - Overlay full-screen al abrir
   - Animación hamburguesa → X
   - Links grandes y espaciados
   - Cierra al hacer click en link

3. **Accesibilidad:**
   - Navegación por teclado (Tab, Enter, Escape)
   - aria-expanded en botón toggle
   - aria-controls vinculando botón y menú
   - Focus visible en todos los elementos

**Elige tu estilo de menú móvil:**
- Opción A: Hamburguesa Overlay (recomendado para 5-7 links)
- Opción B: Sidebar Deslizante (para 7-10 links)
- Opción C: Mega Menu (para 10+ links con categorías)

**Necesito un PLAN con:**
1. Estructura HTML de la navegación
2. Estrategia CSS (position: fixed, z-index, backdrop-filter)
3. JavaScript necesario (toggle, smooth scroll, active state)
4. Animaciones CSS para transiciones

**Formato de salida:**
Plan detallado paso a paso.
Guarda en docs/plan5.md
```

**📝 Guarda la respuesta en:** `docs/plan5.md`

#### FASE 2: Implementación

```markdown
# Prompt: Implementar navegación sticky

Tengo el plan en docs/plan5.md.

**Implementa:**

**1. HTML (en <header> al inicio de <body>):**
```html
<header class="site-header">
  <nav class="navbar" aria-label="Main navigation">
    <a href="#" class="navbar-brand">[Tu Nombre]</a>
    
    <button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu">
      <span class="sr-only">Toggle menu</span>
      <span class="hamburger"></span>
    </button>
    
    <ul id="nav-menu" class="nav-menu">
      <li><a href="#about">Sobre mí</a></li>
      <li><a href="#work">Mi Trabajo</a></li>
      <li><a href="#process">Proceso</a></li>
      <li><a href="#skills">Herramientas</a></li>
      <li><a href="#gallery">Galería</a></li>
      <li><a href="#contact">Contacto</a></li>
    </ul>
  </nav>
</header>
```

**2. CSS (en assets/css/components.css):**
- Navbar sticky con position: fixed
- Backdrop-filter: blur(10px) con fallback
- Animación de sombra al scroll
- Hamburguesa con 3 líneas que animan a X
- Overlay full-screen en móvil
- Media queries para desktop

**3. JavaScript (en assets/js/main.js):**
```javascript
// Toggle menú móvil
// Smooth scroll a secciones
// Detectar sección activa al hacer scroll
// Cerrar menú al hacer click en link
// Cerrar menú con tecla Escape
// Añadir sombra a navbar al hacer scroll
```

**Importante:**
- Usa event delegation para mejor performance
- Implementa debounce para scroll listener
- Respeta prefers-reduced-motion
- Prueba navegación con teclado (Tab, Enter, Escape)
```

**✅ Después de implementar:**
```bash
git add .
git commit -m "feat(nav): implement sticky responsive navigation with smooth scroll"
git push
```

---

### 3.2 Animaciones y Scroll Reveal

#### FASE 1: Planificación

```markdown
# Prompt: Plan de animaciones

Necesito animaciones profesionales y accesibles.

**Animaciones a implementar:**

1. **Hero:**
   - Fade in + slide up del contenido al cargar
   - Animación sutil del tagline (opcional)
   - Parallax suave del fondo (opcional)

2. **Scroll Reveal:**
   - Secciones hacen fade in + slide up al entrar en viewport
   - Cards en My Work, Skills aparecen con stagger (una tras otra)
   - Timeline se revela progresivamente

3. **Interacciones:**
   - Hover en botones (scale, color, sombra)
   - Hover en cards (lift, sombra)
   - Hover en links de navegación (underline animado)
   - Focus states visibles

4. **Parallax (opcional):**
   - Hero con parallax sutil
   - Elementos decorativos con diferentes velocidades

**Técnicas a usar:**
- CSS animations (@keyframes)
- CSS transitions
- Intersection Observer API para scroll reveal
- Transform y opacity (GPU-accelerated)
- prefers-reduced-motion para accesibilidad

**Necesito un PLAN con:**
1. Qué animar y cuándo
2. Duración y easing de cada animación
3. Cómo implementar scroll reveal con Intersection Observer
4. Estrategia de performance (will-change, transform, opacity)
5. Fallbacks para prefers-reduced-motion

**Formato de salida:**
Plan con timing y técnicas específicas.
Guarda en docs/plan6.md
```

**📝 Guarda la respuesta en:** `docs/plan6.md`

#### FASE 2: Implementación

```markdown
# Prompt: Implementar animaciones

Tengo el plan en docs/plan6.md.

**Implementa:**

**1. CSS Animations (nuevo archivo: assets/css/animations.css):**

```css
/* Keyframes para fade-in-up */
/* Keyframes para fade-in (sin movimiento) */
/* Animación de entrada del hero */
/* Transiciones de hover para botones y cards */
/* Underline animado para links de nav */

/* Respeto a prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  /* Desactiva todas las animaciones */
}
```

**2. JavaScript Scroll Reveal (en assets/js/main.js):**

```javascript
// Intersection Observer para scroll reveal
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // Opcional: unobserve después de animar
    }
  });
}, observerOptions);

// Observar todas las secciones y cards
document.querySelectorAll('section, .card').forEach(el => {
  observer.observe(el);
});
```

**3. HTML (añadir clases):**
- Añade clase `.fade-in-up` a secciones
- Añade clase `.stagger` a cards que deben aparecer con delay
- Añade data-attributes para parallax (opcional)

**Importante:**
- Animaciones sutiles (300-500ms)
- Usa transform y opacity (GPU)
- Evita animar width, height, top, left
- Prueba en móvil real (no solo DevTools)
- Verifica que funciona con prefers-reduced-motion
```

**✅ Después de implementar:**
```bash
git add .
git commit -m "feat(animations): implement scroll reveal and interactions with Intersection Observer"
git push
```

---

## Sesión 4: Galería y Pulido Final

### 4.1 Galería de Proyectos con ImageKit

#### FASE 1: Planificación

```markdown
# Prompt: Plan de galería de proyectos

Necesito una galería profesional para mis proyectos de ilustración.

**Requisitos:**
- Mínimo 6 proyectos de project-brief.md
- Imágenes optimizadas con ImageKit
- Grid responsive (1 col → 2 cols → 3 cols)
- Lightbox funcional (recomendado)
- Lazy loading de imágenes
- Alt text descriptivo en todas las imágenes

**Funcionalidad del lightbox:**
1. Click en thumbnail abre imagen full-size
2. Overlay oscuro con imagen centrada
3. Botón de cerrar (X) y cerrar con Escape
4. Navegación prev/next (opcional)
5. Cerrar al hacer click fuera de la imagen
6. Scroll bloqueado cuando está abierto

**ImageKit transformations:**
- Thumbnails: `?tr=w-400,h-300,q-80,f-auto`
- Full-size: `?tr=w-1200,q-85,f-auto`
- Lazy loading con loading="lazy"

**Necesito un PLAN para:**
1. Estructura HTML de la galería
2. Grid CSS responsive
3. JavaScript del lightbox (vanilla, sin librerías)
4. Integración con ImageKit
5. Accesibilidad (keyboard navigation, ARIA)
6. Performance (lazy loading, Intersection Observer)

**Formato de salida:**
Plan detallado con estructura y lógica del lightbox.
Guarda en docs/plan7.md
```

**📝 Guarda la respuesta en:** `docs/plan7.md`

#### FASE 2: Implementación

```markdown
# Prompt: Implementar galería con lightbox

Tengo el plan en docs/plan7.md y proyectos en project-brief.md.

**Implementa:**

**1. HTML (nueva sección antes de Contact):**

```html
<section id="gallery" class="gallery-section">
  <h2>Galería</h2>
  
  <div class="gallery-grid">
    <!-- Por cada proyecto de project-brief.md -->
    <article class="gallery-item">
      <img 
        src="[ImageKit URL]?tr=w-400,h-300,q-80,f-auto"
        data-full="[ImageKit URL]?tr=w-1200,q-85,f-auto"
        alt="[Alt text descriptivo de project-brief.md]"
        loading="lazy"
        width="400"
        height="300"
      >
      <div class="gallery-item-info">
        <h3>[Título del proyecto]</h3>
        <p>[Categoría]</p>
      </div>
    </article>
    <!-- Repetir para mínimo 6 proyectos -->
  </div>
  
  <!-- Lightbox modal -->
  <div id="lightbox" class="lightbox" aria-hidden="true">
    <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
    <div class="lightbox-content">
      <img src="" alt="" id="lightbox-img">
    </div>
  </div>
</section>
```

**2. CSS (en assets/css/components.css):**

```css
/* Gallery grid responsive */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-md);
}

/* Gallery items con hover effect */
.gallery-item {
  cursor: pointer;
  /* Hover: lift + shadow */
}

/* Lightbox modal */
.lightbox {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: none; /* Mostrar con .is-open */
  z-index: 9999;
  /* Centrar imagen */
}

.lightbox.is-open {
  display: flex;
}

/* Botón de cerrar */
/* Imagen del lightbox responsive */
```

**3. JavaScript (en assets/js/main.js):**

```javascript
// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryItems = document.querySelectorAll('.gallery-item img');

// Abrir lightbox
galleryItems.forEach(img => {
  img.addEventListener('click', () => {
    const fullSrc = img.dataset.full;
    const alt = img.alt;
    
    lightboxImg.src = fullSrc;
    lightboxImg.alt = alt;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Bloquear scroll
  });
});

// Cerrar lightbox
function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; // Restaurar scroll
}

// Cerrar con botón
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
    closeLightbox();
  }
});

// Cerrar al hacer click fuera de la imagen
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});
```

**Importante:**
- Usa URLs reales de ImageKit de project-brief.md
- Alt text descriptivo y único para cada imagen
- Lazy loading en todos los thumbnails
- Especifica width y height para evitar layout shift
- Prueba navegación con teclado
```

**✅ Después de implementar:**
```bash
git add .
git commit -m "feat(gallery): implement responsive gallery with lightbox and ImageKit integration"
git push
```

---

### 4.2 Metadatos y SEO

#### FASE 1: Planificación

```markdown
# Prompt: Plan de metadatos

Necesito metadatos completos para SEO y redes sociales.

**Necesito un PLAN para:**

1. **Meta tags básicos:**
   - Title (60 caracteres max)
   - Description (150-160 caracteres)
   - Keywords (opcional)
   - Author
   - Viewport (ya tengo)

2. **Open Graph (Facebook/LinkedIn):**
   - og:title
   - og:description
   - og:image (1200x630px)
   - og:url
   - og:type
   - og:site_name

3. **Twitter Card:**
   - twitter:card
   - twitter:title
   - twitter:description
   - twitter:image
   - twitter:creator (opcional)

4. **Otros:**
   - theme-color
   - Canonical URL
   - Favicon (múltiples tamaños)
   - Apple touch icon

**Necesito:**
- Redacción de title y description optimizados
- Especificaciones para imagen Open Graph
- Lista completa de favicons necesarios

**Formato de salida:**
Plan con todos los meta tags y valores específicos.
Guarda en docs/plan8.md
```

**📝 Guarda la respuesta en:** `docs/plan8.md`

#### FASE 2: Implementación

```markdown
# Prompt: Implementar metadatos

Tengo el plan en docs/plan8.md.

**Implementa en <head> de index.html:**

```html
<!-- Meta tags básicos -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="[Descripción optimizada de 150-160 caracteres]">
<meta name="author" content="[Tu Nombre]">
<meta name="keywords" content="ilustración, portfolio, diseño, [tus especialidades]">

<!-- Open Graph -->
<meta property="og:title" content="[Tu Nombre] - Portfolio de Ilustración">
<meta property="og:description" content="[Descripción]">
<meta property="og:image" content="[URL de imagen 1200x630px]">
<meta property="og:url" content="[Tu URL de GitHub Pages]">
<meta property="og:type" content="website">
<meta property="og:site_name" content="[Tu Nombre] Portfolio">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Tu Nombre] - Portfolio de Ilustración">
<meta name="twitter:description" content="[Descripción]">
<meta name="twitter:image" content="[URL de imagen]">

<!-- Theme color -->
<meta name="theme-color" content="[Tu color primario]">

<!-- Canonical -->
<link rel="canonical" href="[Tu URL de GitHub Pages]">

<!-- Favicons -->
<link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="./assets/images/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="./assets/images/apple-touch-icon.png">

<!-- Title -->
<title>[Tu Nombre] - Portfolio de Ilustración | WEB ATELIER (UDIT)</title>
```

**Tareas adicionales:**
1. Crear imagen Open Graph (1200x630px) con tu branding
2. Generar favicons en múltiples tamaños (usa https://realfavicongenerator.net/)
3. Crear manifest.json (opcional pero recomendado)

**Importante:**
- Title único y descriptivo
- Description convincente que invite a visitar
- URLs absolutas para Open Graph images
- Imagen Open Graph con texto legible y branding
```

**✅ Después de implementar:**
```bash
git add .
git commit -m "feat(seo): add complete meta tags and Open Graph for social sharing"
git push
```

---

### 4.3 Pulido Final y QA

```markdown
# Prompt: Checklist de calidad final

Voy a entregar mi portfolio. Necesito una revisión completa.

**Revisa y genera un informe con:**

1. **HTML:**
   - ¿Valida en W3C Validator?
   - ¿Jerarquía de encabezados correcta?
   - ¿Todos los img tienen alt text?
   - ¿Estructura semántica correcta?

2. **CSS:**
   - ¿Código organizado y comentado?
   - ¿Sin !important innecesarios?
   - ¿Custom properties usadas consistentemente?
   - ¿Responsive en todos los breakpoints?

3. **JavaScript:**
   - ¿Sin errores en consola?
   - ¿Event listeners bien implementados?
   - ¿Funciona sin JavaScript (progressive enhancement)?
   - ¿Código comentado?

4. **Accesibilidad:**
   - ¿Contraste WCAG AA cumplido?
   - ¿Navegación por teclado funcional?
   - ¿prefers-reduced-motion implementado?
   - ¿ARIA attributes correctos?

5. **Performance:**
   - ¿Imágenes optimizadas con ImageKit?
   - ¿Lazy loading implementado?
   - ¿CSS y JS minificados (opcional)?
   - ¿Carga en <3 segundos?

6. **Contenido:**
   - ¿project-brief.md completado?
   - ¿Mínimo 6 proyectos en galería?
   - ¿Contenido sin errores ortográficos?
   - ¿Enlaces funcionan?

7. **Despliegue:**
   - ¿GitHub Pages funciona?
   - ¿README actualizado con enlace?
   - ¿404.html personalizado funciona?
   - ¿Sin errores en consola en producción?

**Formato de salida:**
Checklist con ✅ o ❌ y lista de issues a corregir.
```

**✅ Correcciones finales:**
```bash
# Por cada corrección
git add .
git commit -m "fix: [descripción del fix]"
git push
```

---

### 4.4 Release y Entrega

```markdown
# Prompt: Preparar release v1.0.0

Voy a crear la release final de mi portfolio.

**Guíame paso a paso para:**

1. **Commit final:**
   - Mensaje apropiado
   - Verificar que todo está pusheado

2. **Crear tag:**
   - Comando git tag correcto
   - Mensaje del tag
   - Push del tag

3. **GitHub Release:**
   - Cómo crear release en GitHub
   - Qué poner en el título
   - Qué incluir en las notas de versión

4. **Actualizar README:**
   - Badge de release
   - Enlace a release
   - Capturas de pantalla

**Formato de salida:**
Comandos exactos y pasos en GitHub UI.
```

**✅ Comandos finales:**
```bash
# Commit final
git add .
git commit -m "chore: prepare release v1.0.0"
git push

# Crear tag
git tag -a v1.0.0 -m "Portfolio de Ilustración v1.0.0 - Entrega final WEB ATELIER (UDIT)"
git push origin v1.0.0

# Luego crear Release en GitHub UI
```

---

## Prompts de Emergencia

### "Mi sitio no se ve en GitHub Pages"

```markdown
# Prompt: Troubleshooting GitHub Pages

Mi sitio no carga en GitHub Pages.

**Información:**
- URL esperada: [tu URL]
- Rama configurada: [main/gh-pages]
- Carpeta configurada: [/ o /docs]
- Error que veo: [404 / página en blanco / CSS no carga]

**Necesito:**
1. Checklist de verificación paso a paso
2. Comandos para verificar configuración
3. Soluciones a problemas comunes
4. Cómo verificar que los archivos están en la rama correcta

**Formato:**
Troubleshooting guide con comandos específicos.
```

---

### "Las animaciones van a tirones en móvil"

```markdown
# Prompt: Optimizar performance de animaciones

Mis animaciones van lentas/a tirones en móvil.

**Problemas:**
- [Describe qué animaciones van mal]
- [En qué dispositivo/navegador]

**Necesito:**
1. Diagnóstico de qué puede estar causando el problema
2. Técnicas de optimización (transform, opacity, will-change)
3. Cómo usar DevTools para medir performance
4. Alternativas más ligeras si es necesario

**Importante:**
- Mantener funcionalidad
- Respetar prefers-reduced-motion
- Solución que funcione en móviles reales
```

---

### "Mi código no pasa el validador"

```markdown
# Prompt: Corregir errores de validación

Mi HTML no valida en W3C Validator.

**Errores que veo:**
[Pega los errores del validador]

**Necesito:**
1. Explicación de cada error
2. Cómo corregirlos
3. Verificar que la corrección no rompe funcionalidad
4. Best practices para evitar estos errores en el futuro

**Formato:**
Error por error con solución específica.
```

---

### "No sé cómo implementar X feature"

```markdown
# Prompt: Ayuda con feature específica

Necesito implementar [feature] pero no sé cómo.

**Contexto:**
- Qué quiero lograr: [descripción]
- Qué he intentado: [lo que has probado]
- Qué no funciona: [el problema]

**Restricciones:**
- Vanilla JavaScript (sin jQuery)
- Sin frameworks
- Debe ser accesible
- Debe funcionar en móvil

**Necesito:**
1. PRIMERO: Un plan de cómo implementarlo
2. DESPUÉS: Código específico con comentarios
3. Explicación de cómo funciona
4. Cómo probarlo

**Formato:**
Plan → Implementación → Testing
```

---

## Errores Comunes y Cómo Evitarlos

### ❌ Error 1: Implementar sin planificar

**Síntoma:** Código caótico, difícil de mantener, sin documentación.

**Solución:**
```markdown
SIEMPRE sigue las dos fases:
1. FASE 1: Pide un PLAN, guárdalo en docs/planX.md
2. FASE 2: Implementa EL PLAN

Nunca saltes la fase 1.
```

---

### ❌ Error 2: No hacer commit antes de usar IA

**Síntoma:** No puedes revertir cambios malos de la IA.

**Solución:**
```bash
# ANTES de pedir implementación a la IA
git add .
git commit -m "feat(section): before AI implementation"

# Ahora sí, pide a la IA que implemente
```

---

### ❌ Error 3: Copiar código sin entender

**Síntoma:** No puedes explicar tu código, no puedes debuggearlo.

**Solución:**
```markdown
Después de cada implementación de IA, pregunta:

"Explícame este código línea por línea:
[pega el código]

¿Por qué se usa X en lugar de Y?
¿Qué pasaría si cambio Z?"
```

---

### ❌ Error 4: No probar en móvil real

**Síntoma:** Se ve bien en DevTools pero mal en móvil real.

**Solución:**
```markdown
Después de cada feature:
1. Prueba en DevTools (320px, 375px, 768px)
2. Prueba en móvil real (tu teléfono)
3. Prueba en tablet si tienes
4. Prueba en diferentes navegadores
```

---

### ❌ Error 5: Ignorar accesibilidad

**Síntoma:** No funciona con teclado, sin alt text, contraste bajo.

**Solución:**
```markdown
Después de cada sección, pregunta a la IA:

"Revisa la accesibilidad de esta sección:
[pega el código HTML]

Verifica:
- Contraste de colores WCAG AA
- Alt text descriptivo
- Navegación por teclado
- ARIA attributes
- Jerarquía de encabezados"
```

---

### ❌ Error 6: No documentar uso de IA

**Síntoma:** No tienes evidencia de tu proceso, pierdes puntos.

**Solución:**
```markdown
Por cada feature:
1. Guarda el plan en docs/planX.md
2. Actualiza README con sección "Uso de IA"
3. Menciona qué features usaron IA
4. Explica qué aprendiste del proceso
```

---

## Consejos Finales

### 💡 Trabaja en iteraciones pequeñas

```markdown
✅ BIEN:
- Implementa navegación
- Prueba, commitea
- Implementa hero
- Prueba, commitea
- Implementa about
- Prueba, commitea

❌ MAL:
- Implementa todo de golpe
- Intenta arreglar 50 bugs a la vez
- No sabes qué rompió qué
```

---

### 💡 Usa la IA como mentor, no como copiloto automático

```markdown
✅ BIEN:
"¿Por qué usaste flexbox aquí en lugar de grid?"
"¿Cuál es la diferencia entre display: none y visibility: hidden?"
"Explícame cómo funciona Intersection Observer"

❌ MAL:
"Dame todo el código del portfolio"
[Copiar y pegar sin leer]
```

---

### 💡 Documenta tu proceso

```markdown
En cada docs/planX.md, añade al final:

## Reflexión
- ¿Qué aprendí con esta feature?
- ¿Qué fue más difícil?
- ¿Qué haría diferente la próxima vez?
- ¿Qué preguntas tengo todavía?
```

---

### 💡 Pide feedback temprano

```markdown
# Prompt para feedback

He implementado [feature]. ¿Puedes revisar y darme feedback?

**Código:**
[pega tu código]

**Específicamente, revisa:**
1. ¿Sigue best practices?
2. ¿Es accesible?
3. ¿Es performante?
4. ¿Está bien documentado?
5. ¿Qué mejorarías?

**Formato:**
Lista de mejoras priorizadas (críticas → nice-to-have)
```

---

## Recursos Adicionales

### 📚 Documentación oficial

- [MDN Web Docs](https://developer.mozilla.org/) - Referencia de HTML, CSS, JS
- [Web.dev](https://web.dev/) - Best practices de Google
- [A11y Project](https://www.a11yproject.com/) - Accesibilidad

### 🛠️ Herramientas

- [W3C Validator](https://validator.w3.org/) - Validar HTML
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Contraste
- [PageSpeed Insights](https://pagespeed.web.dev/) - Performance
- [ImageKit](https://imagekit.io/) - Optimización de imágenes

### 📖 Guías del curso

- [Challenge completo](/tracks/es/ilustracion-webapp/portfolio-challenge/)
- [Metodología de IA](/lessons/es/ai-methodology/)
- [Ejemplo de navegación](/student-project-template/docs/ejemplo-navegacion.md)

---

## Conclusión

Esta guía te da las herramientas para usar IA de forma **profesional y efectiva**. Recuerda:

1. **Siempre planifica antes de implementar** (docs/planX.md)
2. **Commitea antes de usar IA** (para poder revertir)
3. **Entiende el código** (no copies ciegamente)
4. **Prueba en móvil real** (no solo DevTools)
5. **Documenta tu proceso** (se evalúa)

La IA es una herramienta poderosa, pero **tú eres quien toma las decisiones**. Usa esta guía como referencia, adapta los prompts a tu estilo, y construye un portfolio del que te sientas orgulloso/a.

**¡Mucha suerte con tu proyecto! 🚀**

---

**¿Dudas?**
Consulta al profesor en clase, colabora con tus compañeras y documenta tu proceso. Nos vemos en la meta con tu release `v1.0.0`.
