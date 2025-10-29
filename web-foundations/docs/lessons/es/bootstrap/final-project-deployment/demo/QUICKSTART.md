# 🚀 Guía Rápida de Inicio

## 📦 ¿Qué es esto?

Este es un **portafolio completo y funcional** construido con Bootstrap 5, listo para que lo personalices y despliegues en GitHub Pages.

## ⚡ Inicio Rápido (5 minutos)

### 1. Abre el Demo

```bash
# Opción A: Abre directamente en el navegador
open index.html

# Opción B: Usa un servidor local (recomendado)
python -m http.server 8000
# Luego visita: http://localhost:8000
```

### 2. Explora el Código

- **index.html** → Estructura HTML completa con comentarios
- **assets/css/custom.css** → Estilos personalizados explicados
- **assets/js/main.js** → Interacciones JavaScript comentadas

### 3. Prueba las Características

✅ Navbar responsiva (prueba en móvil)  
✅ Smooth scroll al hacer clic en menú  
✅ Cards de proyectos con hover effects  
✅ Formulario con validación  
✅ Botón scroll to top

## 🎯 Siguiente: Personaliza

### Paso 1: Información Personal

Busca y reemplaza en `index.html`:

```html
<!-- Buscar: -->
María García

<!-- Reemplazar con: -->
Tu Nombre Real
```

### Paso 2: Meta Tags

Actualiza líneas 14-19 en `index.html`:

```html
<title>Tu Nombre - Tu Título</title>
<meta name="description" content="Tu descripción única..." />
```

### Paso 3: Imágenes

Reemplaza los archivos en `assets/images/`:

- `profile-photo.jpg` → Tu foto (400x400px)
- `project-*.jpg` → Capturas de tus proyectos (800x600px)

### Paso 4: Colores

Edita variables en `assets/css/custom.css`:

```css
:root {
	--primary-color: #tu-color; /* Cambia aquí */
}
```

## 🚀 Despliegue a GitHub Pages

### Método Rápido

```bash
# 1. Crea repo en GitHub: tu-usuario.github.io

# 2. En tu terminal:
git init
git add .
git commit -m "feat: Initial portfolio"
git remote add origin https://github.com/tu-usuario/tu-usuario.github.io.git
git push -u origin main

# 3. Espera 1-2 minutos, luego visita:
# https://tu-usuario.github.io
```

## 📚 Archivos Importantes

| Archivo                 | Propósito             | ¿Editar?                  |
| ----------------------- | --------------------- | ------------------------- |
| `index.html`            | Contenido principal   | ✅ Sí                     |
| `assets/css/custom.css` | Estilos               | ✅ Sí                     |
| `assets/js/main.js`     | Interacciones         | ⚠️ Opcional               |
| `.gitignore`            | Archivos a ignorar    | ⚠️ Revisar                |
| `.nojekyll`             | Deshabilita Jekyll    | ❌ No tocar               |
| `CNAME`                 | Dominio personalizado | ⚠️ Solo si tienes dominio |

## ✅ Checklist Antes de Desplegar

- [ ] Información personal actualizada
- [ ] Meta tags personalizados
- [ ] Imágenes reemplazadas
- [ ] Proyectos reales añadidos
- [ ] Links funcionan correctamente
- [ ] Probado en móvil, tablet, desktop
- [ ] Sin errores en consola (F12)

## 🆘 Problemas Comunes

### Las imágenes no cargan

**Solución:** Verifica que las rutas sean relativas (`./assets/images/` no `/Users/...`)

### El sitio no aparece en GitHub Pages

**Solución:**

1. Verifica que el repo sea público
2. Settings > Pages > Source debe estar configurado
3. Espera 1-2 minutos después del push

### Los estilos no se aplican

**Solución:** Verifica que `custom.css` cargue DESPUÉS de Bootstrap

### JavaScript no funciona

**Solución:**

1. Abre consola (F12) y busca errores
2. Verifica que `main.js` esté al final del `<body>`

## 🎓 Recursos de Aprendizaje

### Videos Recomendados

- [Bootstrap 5 Crash Course](https://www.youtube.com/results?search_query=bootstrap+5+crash+course)
- [GitHub Pages Tutorial](https://www.youtube.com/results?search_query=github+pages+tutorial)

### Documentación

- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [MDN Web Docs](https://developer.mozilla.org/)

### Herramientas Útiles

- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Auditoría
- [TinyPNG](https://tinypng.com/) - Optimizar imágenes
- [W3C Validator](https://validator.w3.org/) - Validar HTML

## 💡 Tips Pro

1. **Commit frecuentemente**

   ```bash
   git add .
   git commit -m "feat: Add about section"
   git push
   ```

2. **Usa branches para experimentos**

   ```bash
   git checkout -b experiment/new-design
   # ... haz cambios ...
   git push -u origin experiment/new-design
   ```

3. **Mantén backup**

   - GitHub ES tu backup principal
   - Pero guarda copia local también

4. **Pide feedback**
   - Comparte con amigos/familia
   - Pide opinión en redes sociales
   - Itera basado en comentarios

## 🎯 Metas de Aprendizaje

Después de personalizar este demo, deberías poder:

✅ Explicar qué es HTML semántico  
✅ Describir cómo funcionan los meta tags  
✅ Optimizar imágenes para web  
✅ Desplegar un sitio a GitHub Pages  
✅ Usar Git para control de versiones  
✅ Entender básicos de SEO

## 🏆 Desafíos Opcionales

1. **Principiante**

   - Cambia todos los colores al tema de tu marca
   - Añade 5 proyectos reales
   - Alcanza score > 90 en Lighthouse

2. **Intermedio**

   - Añade una sección de testimonios
   - Implementa modo oscuro/claro
   - Integra Google Analytics

3. **Avanzado**
   - Conecta formulario a servicio backend (FormSpree)
   - Añade un blog con Jekyll
   - Implementa animaciones scroll-triggered

## 🤝 ¿Necesitas Ayuda?

- **Profesor:** Consulta en horas de laboratorio
- **Compañeros:** Pregunta en el foro del curso
- **Comunidad:** Stack Overflow, Reddit r/webdev

## 📝 Siguiente Paso

Lee el `README.md` completo para entender cada parte del código en detalle.

---

**¡Éxito con tu portafolio! 🎉**

Recuerda: Un portafolio es un trabajo en progreso. Actualízalo regularmente.
