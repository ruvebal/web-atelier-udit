# 🎨 Portafolio Bootstrap - Demo Completo

Este demo es un **ejemplo completo y funcional** de un portafolio profesional construido con Bootstrap 5, listo para desplegar en GitHub Pages.

## 📋 Contenido del Demo

```
demo/
├── index.html              # HTML principal con comentarios educativos
├── assets/
│   ├── css/
│   │   └── custom.css      # Estilos personalizados comentados
│   ├── js/
│   │   └── main.js         # JavaScript con interacciones comentadas
│   └── images/             # Carpeta para tus imágenes
│       ├── profile-photo.jpg
│       ├── project-*.jpg
│       └── og-preview.jpg
├── .github/
│   └── workflows/
│       └── deploy.yml      # Workflow de GitHub Actions
├── .gitignore              # Archivos a ignorar en Git
├── .nojekyll               # Deshabilita Jekyll en GitHub Pages
├── CNAME                   # Para dominio personalizado (opcional)
└── README.md               # Este archivo
```

## 🎯 Objetivos Pedagógicos

Este demo está diseñado para enseñarte:

### 1. Estructura HTML Semántica

- ✅ Uso correcto de `<header>`, `<main>`, `<section>`, `<footer>`
- ✅ Marcado schema.org para SEO
- ✅ Atributos de accesibilidad (ARIA)

### 2. Optimización SEO

- ✅ Meta tags completos (Open Graph, Twitter Cards)
- ✅ Datos estructurados JSON-LD
- ✅ Favicons y meta theme-color

### 3. Rendimiento Web

- ✅ Preconnect y preload de recursos
- ✅ Loading lazy para imágenes
- ✅ Archivos minificados de Bootstrap

### 4. Componentes Bootstrap

- ✅ Navbar responsiva con animaciones
- ✅ Cards de proyectos con hover effects
- ✅ Formularios con validación
- ✅ Grid system responsive

### 5. JavaScript Moderno

- ✅ Intersection Observer API
- ✅ Validación de formularios HTML5
- ✅ Smooth scrolling
- ✅ Event listeners optimizados

## 🚀 Cómo Usar Este Demo

### Opción 1: Explorar Localmente

1. **Descarga los archivos**

   ```bash
   # Si tienes el repositorio del curso:
   cd web-foundations/docs/lessons/es/bootstrap/final-project-deployment/demo/
   ```

2. **Abre en el navegador**

   - Puedes abrir `index.html` directamente en tu navegador
   - O usa un servidor local:

   ```bash
   # Con Python 3:
   python -m http.server 8000

   # Con Node.js (npx http-server):
   npx http-server -p 8000

   # Con PHP:
   php -S localhost:8000
   ```

3. **Abre DevTools (F12)**
   - Inspecciona el código
   - Lee los comentarios inline
   - Prueba el responsive design

### Opción 2: Usar como Plantilla

1. **Crea tu propio repositorio**

   ```bash
   # Crea un nuevo repositorio en GitHub: tu-usuario.github.io

   git clone https://github.com/tu-usuario/tu-usuario.github.io.git
   cd tu-usuario.github.io
   ```

2. **Copia los archivos del demo**

   ```bash
   # Copia todo excepto .git
   cp -r demo/* tu-usuario.github.io/
   ```

3. **Personaliza el contenido**

   - Edita `index.html` con tu información personal
   - Reemplaza las imágenes en `assets/images/`
   - Ajusta los colores en `assets/css/custom.css`
   - Modifica el contenido de cada sección

4. **Actualiza meta tags**

   - Cambia el `<title>` con tu nombre
   - Actualiza `<meta name="description">`
   - Modifica las URLs de Open Graph
   - Personaliza datos estructurados JSON-LD

5. **Commit y push**

   ```bash
   git add .
   git commit -m "feat: Initial portfolio setup"
   git push origin main
   ```

6. **Habilita GitHub Pages**
   - Ve a Settings > Pages
   - Source: GitHub Actions
   - ¡Tu sitio estará en `https://tu-usuario.github.io`!

## 🎨 Personalización

### Colores

Edita las variables CSS en `assets/css/custom.css`:

```css
:root {
	--primary-color: #0d6efd; /* Cambia tu color primario */
	--secondary-color: #6c757d; /* Color secundario */
	--success-color: #198754; /* Color de éxito */
}
```

### Imágenes

Reemplaza las imágenes placeholder:

```
assets/images/
├── profile-photo.jpg     (400x400px, tu foto)
├── project-ecommerce.jpg (800x600px, captura de proyecto)
├── project-dashboard.jpg (800x600px, captura de proyecto)
├── project-landing.jpg   (800x600px, captura de proyecto)
├── og-preview.jpg        (1200x630px, para redes sociales)
└── twitter-card.jpg      (1200x600px, para Twitter)
```

**Tip**: Optimiza las imágenes antes de subirlas:

- Usa formato WebP cuando sea posible
- Mantén las imágenes bajo 200KB cada una
- Herramientas: TinyPNG, Squoosh.app

### Secciones

#### Agregar nueva sección

```html
<section id="nueva-seccion" class="py-5">
	<div class="container">
		<h2 class="text-center mb-5">Nueva Sección</h2>
		<p>Contenido de la nueva sección...</p>
	</div>
</section>
```

#### Agregar proyecto

Copia y pega este bloque en la sección de proyectos:

```html
<div class="col-lg-4 col-md-6">
	<article class="card h-100 shadow-sm project-card">
		<img src="./assets/images/nuevo-proyecto.jpg" class="card-img-top" alt="Descripción del proyecto" loading="lazy" />
		<div class="card-body">
			<h5 class="card-title">Nombre del Proyecto</h5>
			<p class="card-text">Descripción breve...</p>
			<div class="tech-stack mb-3">
				<span class="badge bg-primary">HTML</span>
				<span class="badge bg-info">CSS</span>
			</div>
		</div>
		<div class="card-footer bg-transparent border-top-0">
			<div class="d-flex gap-2">
				<a href="URL_DEMO" class="btn btn-primary btn-sm flex-grow-1">Ver Demo</a>
				<a href="URL_GITHUB" class="btn btn-outline-secondary btn-sm">Código</a>
			</div>
		</div>
	</article>
</div>
```

## 🔍 Puntos Clave del Código

### 1. Meta Tags para SEO (líneas 6-69)

```html
<!-- SEO básico -->
<title>Tu Nombre - Título | Subtítulo</title>
<meta name="description" content="Descripción de 150-160 caracteres..." />

<!-- Open Graph (redes sociales) -->
<meta property="og:title" content="Tu título" />
<meta property="og:image" content="URL de imagen 1200x630px" />
```

**Por qué es importante**: Estos tags controlan cómo aparece tu sitio en Google y al compartirlo en redes sociales.

### 2. Preconnect para Rendimiento (líneas 62-66)

```html
<link rel="preconnect" href="https://cdn.jsdelivr.net" />
<link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
```

**Por qué es importante**: Establece conexiones tempranas con CDNs, reduciendo tiempos de carga en ~100-200ms.

### 3. Schema.org Structured Data (líneas 826-851)

```html
<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "Tu Nombre",
		"jobTitle": "Tu Título"
	}
</script>
```

**Por qué es importante**: Ayuda a Google a entender quién eres, mejorando tu aparición en búsquedas.

### 4. Intersection Observer (main.js, líneas 140-180)

```javascript
const observer = new IntersectionObserver(callback, options);
observer.observe(element);
```

**Por qué es importante**: Detecta cuando elementos son visibles, permitiendo animaciones suaves y carga lazy eficiente.

### 5. Validación de Formularios (main.js, líneas 188-230)

```javascript
form.addEventListener('submit', function (event) {
	if (!form.checkValidity()) {
		event.preventDefault();
		event.stopPropagation();
	}
	form.classList.add('was-validated');
});
```

**Por qué es importante**: Proporciona feedback visual inmediato al usuario sobre errores en formularios.

## 📊 Checklist de Despliegue

Antes de desplegar, verifica:

### Contenido

- [ ] Todos los textos están personalizados (sin "María García")
- [ ] Imágenes reemplazadas (no placeholders)
- [ ] Links funcionan correctamente
- [ ] Información de contacto es real

### SEO

- [ ] `<title>` es único y descriptivo
- [ ] `<meta name="description">` tiene 150-160 caracteres
- [ ] URLs de Open Graph son absolutas (https://...)
- [ ] Datos estructurados JSON-LD actualizados

### Rendimiento

- [ ] Imágenes optimizadas (< 200KB cada una)
- [ ] Usando versiones minificadas de Bootstrap
- [ ] Sin `console.log()` en JavaScript de producción
- [ ] Loading="lazy" en imágenes below the fold

### Accesibilidad

- [ ] Todas las imágenes tienen atributos `alt`
- [ ] Contraste de colores pasa WCAG AA
- [ ] Navegación funciona con teclado (Tab)
- [ ] Botones tienen `aria-label` cuando solo tienen iconos

### Git y GitHub

- [ ] `.gitignore` configurado correctamente
- [ ] Archivos sensibles no versionados
- [ ] Commit messages son descriptivos
- [ ] README.md personalizado

### GitHub Pages

- [ ] Repositorio es público
- [ ] GitHub Pages habilitado
- [ ] Workflow de GitHub Actions configurado (si usas)
- [ ] `.nojekyll` incluido

## 🐛 Solución de Problemas

### El sitio no se despliega

1. **Verifica que el repositorio sea público**

   - Settings > General > Visibility

2. **Verifica GitHub Pages**

   - Settings > Pages
   - Source debe ser "GitHub Actions" o "main branch"

3. **Revisa el workflow**
   - Actions > último workflow
   - Lee los logs de errores

### Las imágenes no cargan

1. **Rutas incorrectas**

   - Usa rutas relativas: `./assets/images/foto.jpg`
   - No uses rutas absolutas en local: `/Users/...`

2. **Nombres de archivo**
   - No uses espacios en nombres de archivo
   - Usa minúsculas: `proyecto-1.jpg` ✅ no `Proyecto 1.JPG` ❌

### Los estilos no se aplican

1. **Orden de carga**

   - Bootstrap CSS debe cargarse ANTES de custom.css

2. **Especificidad CSS**
   - Usa `!important` solo cuando sea necesario
   - Inspecciona en DevTools qué estilos están aplicándose

### JavaScript no funciona

1. **Revisa la consola**

   - F12 > Console
   - Lee los mensajes de error

2. **Orden de scripts**
   - Bootstrap JS debe cargarse ANTES de main.js
   - Scripts deben estar al final del `<body>`

## 📚 Recursos Adicionales

### Herramientas de Testing

- **Lighthouse**: Auditoría de rendimiento, SEO, accesibilidad

  - DevTools > Lighthouse > Generate report

- **PageSpeed Insights**: https://pagespeed.web.dev/

  - Mide rendimiento en desktop y móvil

- **W3C Validator**: https://validator.w3.org/

  - Valida HTML

- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
  - Verifica contraste de colores

### Documentación

- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [Schema.org](https://schema.org/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Optimización de Imágenes

- [TinyPNG](https://tinypng.com/) - Compresión PNG/JPG
- [Squoosh](https://squoosh.app/) - Conversión y optimización
- [ImageOptim](https://imageoptim.com/) - App para Mac

## 🎓 Ejercicio Práctico

1. **Crea tu fork**

   - Copia este demo a tu repositorio

2. **Personaliza 100%**

   - Cambia todos los textos a tu información
   - Añade tus proyectos reales
   - Ajusta colores a tu marca personal

3. **Despliega**

   - Sigue las instrucciones de "Opción 2"
   - Verifica que funciona en tu URL de GitHub Pages

4. **Optimiza**

   - Corre Lighthouse
   - Alcanza puntaje > 90 en todas las categorías
   - Captura pantalla y compártela con el profesor

5. **Dominio personalizado (opcional)**
   - Compra un dominio (.dev es popular)
   - Configura CNAME
   - Habilita HTTPS

## 💡 Tips Pro

1. **Mantén el código limpio**

   - Indentación consistente (2 o 4 espacios)
   - Comentarios donde sea necesario
   - Elimina código comentado no usado

2. **Commits frecuentes**

   ```bash
   git add .
   git commit -m "feat: Add projects section"
   git push
   ```

3. **Usa branches para experimentos**

   ```bash
   git checkout -b experiment/new-design
   # ... haz cambios ...
   git push -u origin experiment/new-design
   ```

4. **Backup regular**

   - GitHub es tu backup
   - Pero también guarda copia local

5. **Analytics (opcional)**
   - Añade Google Analytics
   - Mide visitas y engagement

## 🤝 Contribuciones

Si encuentras errores o tienes sugerencias:

1. Abre un Issue en el repositorio del curso
2. O habla con el profesor

## 📄 Licencia

Este demo es parte del curso de Web Foundations y está disponible para uso educativo.

---

**¡Éxito con tu portafolio! 🚀**

¿Preguntas? Consulta con el profesor o en las sesiones de laboratorio.
