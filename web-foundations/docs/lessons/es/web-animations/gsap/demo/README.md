# Demos de Animaciones GSAP

Esta carpeta contiene demos interactivas para la lección de GSAP.

## 📂 Catálogo de Demos

| Archivo | Descripción | Nivel | Conceptos Clave |
|---------|-------------|-------|-----------------|
| `01-tweens-and-timelines.html` | Tutorial interactivo sobre tweens básicos, timelines, defaults, labels | Principiante | `gsap.to()`, `timeline()`, posicionamiento relativo |
| `02-easing-visualizer.html` | Comparación visual de funciones de easing | Principiante | Easing, curvas de tiempo |
| `03-stagger-effects.html` | Animaciones escalonadas en grids y listas | Intermedio | `stagger`, `from`, configuración de grid |
| `04-scrolltrigger-intro.html` | ScrollTrigger completo con parallax, pinning, scrubbing | Intermedio | ScrollTrigger, pin, scrub, marcadores |
| `05-svg-animations.html` | Dibujo de paths SVG, transformaciones, animaciones de atributos | Avanzado | SVG, `attr`, `transformOrigin` |
| `06-interactive-animations.html` | Seguimiento de mouse, hover, efectos drag | Avanzado | `quickTo()`, Draggable, interactividad |
| `07-design-patterns.html` | Micro-interacciones, transiciones de página, secuencias de carga | Avanzado | Patrones, mejores prácticas |
| `npm-setup-example/` | Configuración completa de proyecto moderno con npm y Vite | Intermedio | npm, ES modules, Vite |

## 🚀 Ejecutar las Demos

### Método 1: Abrir Directamente (Demos CDN)

La mayoría de las demos (01-07) usan CDN y pueden abrirse directamente:

```bash
# En macOS
open 01-tweens-and-timelines.html

# O simplemente haz doble clic en el archivo
```

### Método 2: Servidor Local (Recomendado)

Para mejor experiencia y evitar problemas CORS:

```bash
# Usando Python
python3 -m http.server 8000

# Usando Node.js (si tienes npx)
npx serve .

# Usando PHP
php -S localhost:8000
```

Luego abre `http://localhost:8000/01-tweens-and-timelines.html`

### Método 3: Ejemplo npm

Para el ejemplo de configuración moderna:

```bash
cd npm-setup-example
npm install
npm run dev
```

## 📖 Ruta de Aprendizaje

### Semana 1: Fundamentos
1. ✅ `01-tweens-and-timelines.html` — Entiende tweens y timelines
2. ✅ `02-easing-visualizer.html` — Experimenta con easing
3. ✅ `03-stagger-effects.html` — Domina stagger

### Semana 2: Scroll e Interactividad
4. ✅ `04-scrolltrigger-intro.html` — Aprende ScrollTrigger
5. ✅ `06-interactive-animations.html` — Añade interactividad

### Semana 3: Avanzado
6. ✅ `05-svg-animations.html` — Anima SVG
7. ✅ `07-design-patterns.html` — Aplica patrones profesionales
8. ✅ `npm-setup-example/` — Configura flujo de trabajo moderno

## 💡 Ideas de Ejercicios

### Para Principiantes
- Modifica los valores de duration y ease en `01-tweens-and-timelines.html`
- Crea tu propia secuencia de timeline con 5+ animaciones
- Experimenta con diferentes valores de stagger en `03-stagger-effects.html`

### Para Nivel Intermedio
- Añade más secciones a `04-scrolltrigger-intro.html` con diferentes efectos
- Crea un cursor personalizado usando técnicas de `06-interactive-animations.html`
- Combina stagger con ScrollTrigger para revelar contenido al hacer scroll

### Para Nivel Avanzado
- Recrea una animación de un sitio de Awwwards usando GSAP
- Construye una página de historia con scroll horizontal usando ScrollTrigger
- Integra GSAP con un framework (React/Vue) basándote en el ejemplo npm

## 🐛 Debugging

### Problema: "GSAP is not defined"
**Solución:** Asegúrate de que el script de GSAP se carga antes de tu código:
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script>
  // Tu código aquí
</script>
```

### Problema: "ScrollTrigger is not a function"
**Solución:** Registra el plugin después de cargarlo:
```javascript
gsap.registerPlugin(ScrollTrigger);
```

### Problema: La animación no se activa
**Solución:** Abre DevTools y verifica:
1. ¿Hay errores de consola?
2. ¿Los selectores coinciden con tus elementos HTML?
3. ¿Los marcadores de ScrollTrigger están en la posición correcta? (añade `markers: true`)

### Problema: La animación es entrecortada
**Solución:**
- Usa `transform` y `opacity` en lugar de `top`/`left`/`width`
- Añade `will-change: transform` a elementos animados
- Verifica el rendimiento con DevTools Performance tab

## 🔗 Recursos Adicionales

- [Documentación oficial de GSAP](https://greensock.com/docs/)
- [Foros GreenSock](https://greensock.com/forums/)
- [Colección CodePen de GSAP](https://codepen.io/collection/DYqKXQ)
- [Visualizador de Easing](https://greensock.com/ease-visualizer/)

---

**Nota:** Las demos usan GSAP 3.12.5 desde CDN. Para proyectos de producción, considera usar npm e importar solo los plugins que necesitas para bundles más pequeños.

