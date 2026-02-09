# Ejemplo Visual: Navegación Sticky con Menú Hamburguesa

## 🎯 Objetivo

Añadir navegación sticky profesional con menú hamburguesa responsive usando **vanilla CSS y JavaScript** (sin frameworks).

---

## 📱 Vista Desktop (768px+)

```
┌─────────────────────────────────────────────────────────────┐
│  Tu Nombre         Inicio  Portfolio  Sobre  Proceso  Contacto │ ← Sticky navbar
│                                                 ___              │
└─────────────────────────────────────────────────────────────┘
                                             Underline animado

Características Desktop:
✓ Navbar siempre visible (position: fixed)
✓ Fondo semi-transparente con blur (backdrop-filter)
✓ Sombra aparece al hacer scroll
✓ Links horizontales con hover underline animado
✓ Smooth scroll a secciones con anclas
```

---

## 📱 Vista Mobile (<768px)

### Estado Inicial (Menú Cerrado)

```
┌─────────────────────────────────────┐
│  Tu Nombre                    ☰     │ ← Hamburger icon
└─────────────────────────────────────┘

Icono hamburguesa (☰):
┌──────┐
│  ━━━  │  ← 3 líneas horizontales
│  ━━━  │
│  ━━━  │
└──────┘
```

### Estado Abierto (Menú Overlay)

```
┌─────────────────────────────────────┐
│                                  ✕  │ ← Close button
│                                     │
│            Inicio                   │
│                                     │
│          Portfolio                  │
│                                     │
│          Sobre Mí                   │
│                                     │
│          Proceso                    │
│                                     │
│          Contacto                   │
│                                     │
└─────────────────────────────────────┘
    Full-screen overlay

Animación hamburger → X:
☰  →  ✕
━━━     ╱╲  (líneas rotan 45° y -45°)
━━━     ╲╱
━━━     
```

---

## 🎨 Estados Visuales

### 1. Navbar Normal (sin scroll)

```css
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(10px);
box-shadow: none;
```

Visual:
```
┌────────────────────────────────────┐
│ Navbar (sin sombra)                 │ ← Fondo blur, sin sombra
└────────────────────────────────────┘
   ↓ scroll...
```

### 2. Navbar con Scroll (scrolled)

```css
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
```

Visual:
```
┌────────────────────────────────────┐
│ Navbar (con sombra)                 │ ← Sombra aparece
└────────────────────────────────────┘
   ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁  Sombra sutil
```

### 3. Link Hover (Desktop)

```
Estado normal:    Inicio
                  
Estado hover:     Inicio
                  ━━━━━  ← Underline animado (color primario)
```

CSS:
```css
.navbar-links a::after {
  width: 0;                    /* inicial */
  transition: width 0.3s ease;
}

.navbar-links a:hover::after {
  width: 100%;                 /* hover */
}
```

---

## 🔄 Animaciones

### 1. Hamburger → X (Mobile)

**Inicial (☰):**
```
  ━━━━━━  ← Línea superior
  ━━━━━━  ← Línea media
  ━━━━━━  ← Línea inferior
```

**Abierto (✕):**
```
  ╱╲      ← Superior rota 45° y baja
  (transparente) ← Media invisible
  ╲╱      ← Inferior rota -45° y sube
```

CSS:
```css
/* Media desaparece */
.navbar-toggle[aria-expanded="true"] .hamburger {
  background: transparent;
}

/* Superior y inferior rotan */
.hamburger::before {
  transform: rotate(45deg) translate(5px, 6px);
}
.hamburger::after {
  transform: rotate(-45deg) translate(5px, -6px);
}
```

### 2. Menú Slide-in (Mobile)

**Cerrado:**
```
                              │
                              │
      Viewport               │   [Menú fuera]
                              │   transform: translateX(100%)
                              │
```

**Abierto:**
```
┌──────────────────────────┐
│                          │
│    Menú                  │
│    Visible               │
│    transform:            │
│    translateX(0)         │
└──────────────────────────┘
```

Transición:
```css
.navbar-menu {
  transform: translateX(100%);  /* fuera */
  transition: transform 0.3s ease;
}

.navbar-menu.active {
  transform: translateX(0);     /* dentro */
}
```

---

## ⌨️ Interacciones

### Desktop

| Acción | Resultado |
|--------|-----------|
| Scroll | Sombra aparece después de 50px |
| Hover link | Underline animado |
| Click link | Smooth scroll a sección |
| Tab | Focus visible en links |

### Mobile

| Acción | Resultado |
|--------|-----------|
| Click ☰ | Menú slide-in, ☰→✕, body scroll bloqueado |
| Click ✕ | Menú slide-out, ✕→☰, body scroll restaurado |
| Click link | Cierra menú + scroll a sección |
| ESC | Cierra menú |
| Tab | Focus en toggle/close/links |

---

## 🎯 Anclas y Secciones

### IDs a Añadir en index.html

```html
<!-- Hero (ya existe, añadir ID si no tiene) -->
<div class="hero" id="inicio">

<!-- About -->
<section class="story-section chapter-1" id="about">

<!-- Portfolio (galería nueva de S4) -->
<section class="story-section chapter-1" id="portfolio">

<!-- Proceso (timeline) -->
<section class="timeline-section chapter-3" id="process">

<!-- Contacto (final CTA) -->
<section class="final-section" id="contact">
```

### Links de Navegación

```html
<ul class="navbar-links">
  <li><a href="#inicio">Inicio</a></li>
  <li><a href="#portfolio">Portfolio</a></li>
  <li><a href="#about">Sobre Mí</a></li>
  <li><a href="#process">Proceso</a></li>
  <li><a href="#contact">Contacto</a></li>
</ul>
```

---

## ♿ Accesibilidad

### ARIA Attributes

```html
<!-- Toggle hamburger -->
<button 
  class="navbar-toggle" 
  id="navbar-toggle" 
  aria-label="Abrir menú de navegación"   ← Descripción para screen readers
  aria-expanded="false">                   ← Estado (cambia con JS)
  <span class="hamburger"></span>
</button>

<!-- Close button -->
<button 
  class="navbar-close" 
  id="navbar-close" 
  aria-label="Cerrar menú">               ← Descripción clara
  ✕
</button>
```

### Navegación por Teclado

```
Tab       → Siguiente elemento (logo → links → toggle)
Enter     → Activar link/botón
ESC       → Cerrar menú (si está abierto)
Shift+Tab → Elemento anterior
```

### Bloqueo de Scroll

Cuando menú móvil está abierto:
```javascript
// Bloquear scroll del body
document.body.style.overflow = 'hidden';

// Restaurar al cerrar
document.body.style.overflow = '';
```

**Por qué:** Evita que el usuario scrollee el contenido mientras el menú overlay está abierto (mejor UX).

---

## 🧪 Testing Checklist

### Desktop (768px+)

- [ ] Navbar sticky (siempre visible al scroll)
- [ ] Sombra aparece después de scroll >50px
- [ ] Links horizontales visibles
- [ ] Hover underline animado funciona
- [ ] Click link → smooth scroll a sección
- [ ] Tab → focus visible en todos los links
- [ ] Logo link funciona (vuelve arriba)

### Mobile (<768px)

- [ ] Solo logo y hamburger visible
- [ ] Click hamburger → menú overlay aparece
- [ ] Animación ☰ → ✕ funciona
- [ ] Menú slide-in suave (0.3s)
- [ ] Links centrados verticalmente
- [ ] Click link → cierra menú + scroll a sección
- [ ] Click ✕ → cierra menú
- [ ] ESC → cierra menú
- [ ] Body scroll bloqueado cuando menú abierto
- [ ] Tap/touch funciona en dispositivo real

### Accesibilidad

- [ ] `aria-expanded` cambia correctamente (true/false)
- [ ] `aria-label` en botones toggle y close
- [ ] Navegación completa por teclado
- [ ] Focus visible en todos los elementos interactivos
- [ ] Screen reader anuncia estado del menú
- [ ] Contraste de texto cumple WCAG AA

### Performance

- [ ] Animaciones suaves (60fps)
- [ ] Sin jank al abrir/cerrar menú
- [ ] Backdrop-filter funciona (o fallback en navegadores antiguos)
- [ ] Smooth scroll funciona en todos los navegadores

---

## 💡 Personalización

### Cambiar Colores

En `_variables.css`:
```css
:root {
  --navbar-bg: rgba(255, 255, 255, 0.95);  /* Fondo navbar */
  --navbar-shadow: rgba(0, 0, 0, 0.1);     /* Sombra */
}
```

En `_components.css`:
```css
.navbar {
  background: var(--navbar-bg);
}

.navbar.scrolled {
  box-shadow: 0 2px 10px var(--navbar-shadow);
}
```

### Cambiar Links

Edita en `index.html` sección `<nav>`:
```html
<ul class="navbar-links">
  <li><a href="#tu-seccion">Tu Link</a></li>
  <!-- Añade más según necesites -->
</ul>
```

### Añadir Logo/Imagen

Reemplaza texto con imagen:
```html
<a href="#" class="navbar-logo">
  <img src="./images/logo.svg" alt="Tu Nombre" height="40">
</a>
```

---

## 🐛 Problemas Comunes

### 1. Menú no se abre

**Causa:** JavaScript no está cargado o hay error
**Solución:** 
- Abre DevTools (F12) → Console
- Verifica mensaje: "✓ Navbar sticky inicializado"
- Si no aparece, revisa que `<script src="./assets/js/main.js">` esté antes de `</body>`

### 2. Smooth scroll no funciona

**Causa:** Navegador antiguo o CSS no aplicado
**Solución:**
```css
html {
  scroll-behavior: smooth;
}
```

### 3. Backdrop-filter no funciona

**Causa:** Firefox o Safari antiguo
**Solución:** Añadir fallback:
```css
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* Safari */
  
  /* Fallback si no soporta blur */
  @supports not (backdrop-filter: blur(10px)) {
    background: rgba(255, 255, 255, 1);
  }
}
```

### 4. Menú no cierra con ESC

**Causa:** Listener no registrado
**Solución:** Verifica que este código esté en `main.js`:
```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
    toggleMenu();
  }
});
```

### 5. Z-index conflictos

**Causa:** Otros elementos solapan la navbar
**Solución:**
```css
.navbar {
  z-index: 1000;  /* Navbar */
}

.navbar-menu {
  z-index: 1001;  /* Menú móvil */
}

.navbar-toggle {
  z-index: 1002;  /* Toggle siempre encima */
}
```

---

## 📚 Recursos

### Documentación
- [MDN: position: fixed](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
- [MDN: backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [MDN: ARIA expanded](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)

### Inspiración
- [Awwwards: Navigation Examples](https://www.awwwards.com/websites/navigation/)
- [CodePen: Hamburger Menus](https://codepen.io/search/pens?q=hamburger+menu)

---

**¡Tu navegación está lista! 🎉**

Testea en diferentes dispositivos y tamaños de pantalla para asegurar que todo funciona perfectamente.
