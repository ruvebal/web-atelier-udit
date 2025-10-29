# 📸 Imágenes del Portafolio

Esta carpeta debe contener todas las imágenes de tu portafolio.

## 🎯 Imágenes Requeridas

### 1. Foto de Perfil

- **Archivo**: `profile-photo.jpg`
- **Tamaño recomendado**: 400x400px
- **Formato**: JPG o WebP
- **Peso máximo**: 50KB
- **Uso**: Sección hero del portafolio

**Tips**:

- Usa una foto profesional
- Fondo limpio y sin distracciones
- Buena iluminación
- Encuadre desde los hombros hacia arriba
- Sonríe naturalmente

### 2. Imágenes de Proyectos

- **Archivos**:
  - `project-ecommerce.jpg`
  - `project-dashboard.jpg`
  - `project-landing.jpg`
- **Tamaño recomendado**: 800x600px (ratio 4:3)
- **Formato**: JPG o WebP
- **Peso máximo**: 150KB cada una
- **Uso**: Cards de proyectos

**Tips**:

- Usa capturas de pantalla reales de tus proyectos
- Incluye la vista completa del sitio
- Usa herramientas como [Screely](https://screely.com/) para mockups bonitos
- Considera usar [Browser Frame](https://browserframe.com/) para añadir un marco de navegador

### 3. Open Graph Image

- **Archivo**: `og-preview.jpg`
- **Tamaño exacto**: 1200x630px
- **Formato**: JPG
- **Peso máximo**: 200KB
- **Uso**: Vista previa al compartir en Facebook, LinkedIn, WhatsApp

**Contenido sugerido**:

```
┌──────────────────────────────┐
│                              │
│   Tu Nombre                  │
│   Desarrollador Web          │
│                              │
│   [Tu foto o logo]           │
│                              │
└──────────────────────────────┘
```

**Herramientas para crear**:

- [Canva](https://www.canva.com/create/facebook-posts/) - Plantillas gratis
- [Figma](https://www.figma.com/) - Diseño profesional
- Photoshop/GIMP - Editores de imagen

### 4. Twitter Card Image

- **Archivo**: `twitter-card.jpg`
- **Tamaño exacto**: 1200x600px (ratio 2:1)
- **Formato**: JPG
- **Peso máximo**: 200KB
- **Uso**: Vista previa al compartir en Twitter/X

Similar a Open Graph pero con ratio diferente.

### 5. Favicons (Opcional pero recomendado)

- **Archivos**:
  - `favicon.ico` (16x16, 32x32)
  - `favicon-16x16.png`
  - `favicon-32x32.png`
  - `apple-touch-icon.png` (180x180)
- **Formato**: ICO para favicon.ico, PNG para el resto
- **Uso**: Icono en pestaña del navegador

**Herramientas para generar**:

- [Favicon.io](https://favicon.io/) - Generador desde texto, emoji o imagen
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Generador completo

## 🎨 Creación de Placeholders

Si aún no tienes imágenes reales, usa placeholders temporales:

### Opciones de Placeholder

1. **Placeholder.com**

   ```
   https://via.placeholder.com/400x400
   https://via.placeholder.com/800x600
   https://via.placeholder.com/1200x630
   ```

2. **Unsplash (fotos reales gratis)**

   ```
   https://source.unsplash.com/400x400/?portrait
   https://source.unsplash.com/800x600/?technology
   ```

3. **Picsum (Lorem Ipsum de imágenes)**
   ```
   https://picsum.photos/400/400
   https://picsum.photos/800/600
   ```

## 🔧 Optimización de Imágenes

Antes de subir imágenes, optimízalas:

### Herramientas Online

1. **TinyPNG** (https://tinypng.com/)

   - Comprime PNG y JPG sin pérdida visible
   - Reduce tamaño 50-80%

2. **Squoosh** (https://squoosh.app/)

   - Convierte a WebP
   - Control total de calidad

3. **ImageOptim** (Mac app)
   - Arrastra y suelta
   - Optimización automática

### Comandos de Terminal

```bash
# Instalar ImageMagick
brew install imagemagick  # macOS
apt install imagemagick   # Linux

# Redimensionar imagen
convert input.jpg -resize 800x600 output.jpg

# Comprimir JPG
convert input.jpg -quality 85 output.jpg

# Convertir a WebP
cwebp -q 80 input.jpg -o output.webp
```

### Usando Node.js

```bash
# Instalar sharp (optimizador de imágenes)
npm install sharp

# Script de optimización (optimize.js)
const sharp = require('sharp');

sharp('input.jpg')
  .resize(800, 600)
  .jpeg({ quality: 85 })
  .toFile('output.jpg');
```

## 📏 Tamaños de Referencia

| Tipo          | Tamaño   | Ratio  | Uso                   |
| ------------- | -------- | ------ | --------------------- |
| Profile Photo | 400x400  | 1:1    | Avatar circular       |
| Project Card  | 800x600  | 4:3    | Vista previa proyecto |
| Open Graph    | 1200x630 | 1.91:1 | Facebook, LinkedIn    |
| Twitter Card  | 1200x600 | 2:1    | Twitter/X             |
| Favicon       | 32x32    | 1:1    | Pestaña navegador     |
| Apple Touch   | 180x180  | 1:1    | Home screen iOS       |

## ✅ Checklist de Imágenes

Antes de desplegar, verifica:

- [ ] Todas las imágenes están optimizadas (< 200KB)
- [ ] Los nombres de archivo no tienen espacios ni caracteres especiales
- [ ] Todas las imágenes tienen atributo `alt` en HTML
- [ ] Las imágenes usan formato WebP cuando sea posible (o JPG como fallback)
- [ ] Las imágenes "above the fold" no tienen `loading="lazy"`
- [ ] Las imágenes "below the fold" tienen `loading="lazy"`
- [ ] Las rutas son relativas (`./assets/images/` no `/Users/...`)
- [ ] Las imágenes se ven bien en móvil, tablet y desktop

## 🎯 Atributos ALT Correctos

Ejemplos de buenos textos alternativos:

### ✅ Buenos

```html
<img src="profile-photo.jpg" alt="María García, desarrolladora web front-end, sonriendo" />
<img src="project-ecommerce.jpg" alt="Captura de pantalla de tienda online con productos de moda" />
<img src="project-dashboard.jpg" alt="Panel de control administrativo mostrando gráficos de ventas" />
```

### ❌ Malos

```html
<img src="profile-photo.jpg" alt="foto" />
<img src="project-1.jpg" alt="proyecto" />
<img src="dashboard.jpg" alt="imagen" />
```

## 🚀 Imágenes Responsive

Para imágenes que cambian según el tamaño de pantalla:

```html
<picture>
	<source media="(min-width: 1200px)" srcset="hero-large.webp" />
	<source media="(min-width: 768px)" srcset="hero-medium.webp" />
	<img src="hero-small.webp" alt="Descripción" class="img-fluid" />
</picture>
```

## 📝 Notas Importantes

1. **Copyright**: Solo usa imágenes que tengas derecho a usar

   - Tus propias fotos ✅
   - Fotos con licencia Creative Commons ✅
   - Fotos de stock gratuitas (Unsplash, Pexels) ✅
   - Fotos de Google Images ❌ (a menos que tengas permiso)

2. **Privacidad**:

   - No subas fotos de otras personas sin permiso
   - No incluyas información sensible en capturas de pantalla

3. **Rendimiento**:

   - Imágenes grandes = sitio lento
   - Objetivo: todas las imágenes bajo 200KB
   - Usa WebP para mejor compresión

4. **Accesibilidad**:
   - Siempre incluye atributo `alt`
   - Describe el contenido, no digas "imagen de..."
   - Para imágenes decorativas, usa `alt=""`

## 🔗 Recursos Útiles

### Bancos de Imágenes Gratis

- [Unsplash](https://unsplash.com/) - Fotos de alta calidad
- [Pexels](https://www.pexels.com/) - Fotos y videos gratis
- [Pixabay](https://pixabay.com/) - Imágenes libres de derechos

### Herramientas de Edición

- [Photopea](https://www.photopea.com/) - Photoshop online gratis
- [Remove.bg](https://www.remove.bg/) - Eliminar fondos
- [Canva](https://www.canva.com/) - Diseño gráfico simple

### Testing

- [Responsive Image Tester](https://responsivedesignchecker.com/)
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

**¿Necesitas ayuda con las imágenes? Consulta al profesor en las horas de laboratorio.**
