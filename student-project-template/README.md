# Portfolio Scrollytelling - Template para Estudiantes

## 🎯 Objetivo

Este template te proporciona un portfolio scrollytelling **completamente funcional** con componentes ya implementados. Tu tarea es **personalizarlo** con tus contenidos, no construirlo desde cero.

---

## 📁 Estructura del Proyecto

```
student-project-template/
├── index.html                      # Tu portfolio scrollytelling
├── project-brief.md                # 🔑 TU FUENTE DE VERDAD
├── project-inspiration.md          # Referencias visuales
├── assets/
│   ├── css/
│   │   ├── _variables.css          # 👈 Personalizar colores + tipografías
│   │   ├── _base.css
│   │   ├── _layout.css
│   │   ├── _components.css
│   │   ├── _scrollytelling.css     # Componentes ya listos
│   │   ├── _utilities.css
│   │   └── style.css               # Importa todos los módulos
│   └── js/
│       └── main.js                 # JavaScript ya funcionando
├── docs/
│   └── prompt-*.md                 # Tus prompts IA guardados
└── images/
    └── inspiration/                # Screenshots de inspiración
```

---

## 🧭 Metodología: Docs-First + Archivos de Contexto

### 1. `project-brief.md` es tu Fuente de Verdad

**IMPORTANTE:** Completa `project-brief.md` ANTES de empezar a personalizar el portfolio.

Este archivo contiene:
- ✅ Identidad Visual (colores, tipografías)
- ✅ Contenidos Preparados (bio, lema, stats)
- ✅ Áreas de Especialización
- ✅ Proceso Creativo
- ✅ Herramientas y Skills
- ✅ Proyectos para Galería (S4)

### 2. Usa Archivos de Contexto con IA

**Método ANTIGUO (malo):**
```markdown
# Prompt
Personaliza mi hero con:
- Nombre: Juan Pérez
- Lema: Ilustrador digital especializado en narrativas visuales
- Color primario: #FF6B6B
- Fuente heading: Montserrat
...
```
❌ Duplicas información  
❌ Si cambias algo, debes actualizar múltiples prompts  
❌ Prompts largos y confusos

**Método NUEVO (bueno):**
```markdown
# Prompt
Personaliza mi hero section.

## 📎 CONTEXTO
Adjunta: `project-brief.md`

Lee sección "Contenidos Preparados" → "Lema/Tagline para Hero"

## TAREA
Actualiza el hero con el nombre y lema del brief.
NO dupliques información - léela del archivo adjunto.
```
✅ Prompt corto y claro  
✅ Fuente única de verdad (DRY principle)  
✅ Cambias el brief, no 10 prompts  
✅ Metodología profesional

### 3. Workflow de Cada Prompt

Para CADA personalización:

1. **Asegúrate** que `project-brief.md` tiene la sección relevante completa
2. **Guarda el prompt** como `docs/prompt-[nombre].md`
3. **Adjunta** `project-brief.md` al prompt IA
4. **Envía** a la IA (ChatGPT, Claude, etc.)
5. **Implementa** el código generado
6. **Actualiza** el prompt con el report de implementación

**Ejemplo:**
```bash
# 1. Completas en project-brief.md la paleta de colores
# 2. Guardas el prompt
docs/prompt-sistema-diseno.md

# 3. En tu IA, adjuntas:
# - project-brief.md
# - assets/css/_variables.css

# 4. Envías prompt
# 5. IA lee el brief y genera código
# 6. Implementas cambios en _variables.css
# 7. Actualizas docs/prompt-sistema-diseno.md con report
```

---

## 🎨 Componentes Scrollytelling Incluidos

### ✅ Ya Implementados (Solo personalizar)

1. **Hero Section** - Título, subtítulo, scroll indicator con animaciones
2. **Story Sections** (Chapters 1-3) - About, Work, Process con progressive reveal
3. **Statistics Display** - 3 números + labels con stagger animations
4. **Parallax Section** - Background fijo con overlay
5. **Interactive Cards** - Grid auto-fit con hover effects
6. **Timeline** - Gradient line con dots y content boxes
7. **Final CTA** - Call-to-action con botón destacado
8. **Info Overlay** - Indicador de progreso de scroll

### 🆕 A Implementar en S4

9. **Navegación Sticky** - Navbar siempre visible con blur
10. **Menú Hamburguesa** - Responsive mobile con overlay full-screen

### JavaScript Funcional

- ✅ Intersection Observer para animaciones al scroll
- ✅ Scroll progress indicator
- ✅ Smooth scroll
- ✅ Prefers-reduced-motion detection
- 🆕 **S4:** Navbar toggle + keyboard navigation

---

## 🚀 Sesiones del Track

### Sesión 3 (S3) - Personalización
**Duración:** 3.5 horas

**Objetivos:**
1. Completar `project-brief.md` al 100%
2. Personalizar sistema de diseño (colores + tipografías)
3. Integrar contenidos en los 8 componentes
4. Testing responsive y accesibilidad

**Archivos a modificar:**
- `project-brief.md` (completar)
- `assets/css/_variables.css` (colores + fuentes)
- `index.html` (contenidos en cada sección)

### Sesión 4 (S4) - Navegación + Galería y Lanzamiento
**Duración:** 3.5 horas

**Objetivos:**
1. Implementar navegación sticky con menú hamburguesa
2. Añadir galería de proyectos (6+ imágenes ImageKit)
3. Implementar lightbox (opcional)
4. Testing UX con compañeros
5. Iterar con feedback
6. Lanzar portfolio público

**Archivos a modificar:**
- `index.html` (navbar + galería)
- `assets/css/_components.css` (estilos navbar)
- `assets/js/main.js` (navbar toggle + lightbox)
- `project-brief.md` (sección "Proyectos para Galería")

---

## ✅ Checklist de Personalización

### S3 - Personalización

- [ ] `project-brief.md` completado (identidad, bio, stats, especialidades, proceso, skills)
- [ ] Paleta de colores personalizada en `_variables.css`
- [ ] Tipografías de Google Fonts aplicadas
- [ ] Hero con tu nombre y lema
- [ ] About con tu bio y estadísticas reales
- [ ] Work con tus 3 especialidades
- [ ] Timeline con tu proceso creativo
- [ ] Skills con tus herramientas
- [ ] Responsive verificado (320px-1440px)
- [ ] Contraste WCAG AA verificado
- [ ] Commit con mensaje significativo

### S4 - Navegación + Galería y Lanzamiento

- [ ] Navegación sticky implementada con backdrop-filter
- [ ] Menú hamburguesa responsive funcional (<768px)
- [ ] IDs añadidos a secciones (about, portfolio, process, contact)
- [ ] 6+ proyectos añadidos en `project-brief.md` sección "Proyectos para Galería"
- [ ] URLs de ImageKit optimizadas (tr:w-400,h-300,q-80,f-auto)
- [ ] Galería implementada en `index.html`
- [ ] Lightbox funcional (opcional)
- [ ] Testing UX con compañero realizado
- [ ] 2-3 mejoras críticas implementadas
- [ ] Meta tags Open Graph añadidos
- [ ] Case study documentado
- [ ] Portfolio desplegado y público
- [ ] Commit final

---

## 🛠️ Comandos Útiles

### Desarrollo Local

```bash
# Opción 1: Live Server (VS Code extension)
# Click derecho en index.html → Open with Live Server

# Opción 2: Servidor Python
python3 -m http.server 8000
# Abre http://localhost:8000
```

### Git

```bash
# Añadir cambios
git add .

# Commit con mensaje significativo
git commit -m "feat(s3): personalizado con contenidos de project-brief

- Sistema de diseño: Montserrat + Open Sans + paleta #FF6B6B
- Hero: Juan Pérez + tagline integrado
- About: bio + stats reales
- Work: 3 especialidades del brief
- Timeline: proceso creativo documentado
- Skills: herramientas actuales
- Responsive: 320px-1440px ✓
- Accesibilidad: WCAG AA ✓"

# Push a GitHub
git push origin main
```

---

## 📚 Recursos

### Documentación
- [Track completo](../web-foundations/docs/tracks/es/ilustracion-webapp/)
- [S3: Personalización](../web-foundations/docs/tracks/es/ilustracion-webapp/s3-maquetacion-responsive-frameworks/)
- [S4: Navegación + Galería y Lanzamiento](../web-foundations/docs/tracks/es/ilustracion-webapp/s4-interactividad-ux-ui/)

### Ejemplos Visuales
- [Metodología Archivos de Contexto](./docs/ejemplo-contexto-archivos.md)
- [Navegación Sticky - Guía Visual](./docs/ejemplo-navegacion.md)

### Herramientas
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Verificar contraste
- [Google Fonts](https://fonts.google.com/) - Tipografías
- [Coolors](https://coolors.co/) - Paletas de color
- [ImageKit](https://imagekit.io/) - Optimización de imágenes

---

## 💡 Tips

1. **Completa el brief primero** - Es tu fuente de verdad, no lo saltes
2. **Adjunta archivos** - La IA lee mejor archivos que prompts largos
3. **Guarda prompts** - Documenta en `docs/` para referencia futura
4. **Testing continuo** - Verifica responsive y accesibilidad frecuentemente
5. **Commits significativos** - Mensajes claros de lo que cambiaste

---

## 🆘 Problemas Comunes

### Estilos no se aplican
- ✅ Verifica que `style.css` importa todos los módulos
- ✅ Revisa la consola del navegador (F12) para errores

### Animaciones no funcionan
- ✅ Verifica que `main.js` está enlazado en `<script>`
- ✅ Usa `data-observe` en elementos que quieres animar

### Colores no cambian
- ✅ Usa variables CSS: `var(--color-primary)` en lugar de hex directos
- ✅ Actualiza `_variables.css`, no cada archivo CSS

### Imágenes lentas
- ✅ Usa transformaciones ImageKit: `tr:w-400,h-300,q-80,f-auto`
- ✅ Añade `loading="lazy"` en `<img>`

---

**¡A personalizar tu portfolio! 🎨**
