# Demos de Personalización de Bootstrap

Esta carpeta contiene demos interactivos que muestran diferentes métodos para personalizar Bootstrap.

## 📁 Contenido

### 1. Anulaciones CSS Básicas

**Archivo**: [01-css-overrides.html](01-css-overrides.html)

- ✅ **Sin herramientas de construcción**
- ✅ Abre directamente en el navegador
- ✅ Perfecto para principiantes

**Qué aprenderás:**

- Cómo anular estilos de Bootstrap con CSS personalizado
- Uso de variables CSS personalizadas
- Ventajas y desventajas de este método

**Cómo usar:**

```bash
# Simplemente abre el archivo en tu navegador
open 01-css-overrides.html
```

---

### 2. Personalización Profesional con Sass

**Carpeta**: [02-sass-customization/](02-sass-customization/)

- ⚠️ **Requiere Node.js y npm**
- ⚠️ Necesita instalación de dependencias
- ✅ Enfoque profesional y escalable

**Qué aprenderás:**

- Cómo configurar un proyecto con Vite
- Personalización de variables Sass de Bootstrap
- Compilación de Sass a CSS
- Creación de sistemas de diseño completos

**Cómo usar:**

```bash
# 1. Navegar a la carpeta
cd 02-sass-customization/

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador (generalmente http://localhost:5173)
```

**Archivos incluidos:**

- `_custom.scss` - Variables y estilos personalizados
- `index.html` - Página de demostración
- `package.json` - Configuración de dependencias
- `vite.config.js` - Configuración de Vite
- `README.md` - Documentación detallada

---

### 3. Template Personalizable Completo

**Archivo**: [03-template-customizable.html](03-template-customizable.html)

- ✅ **Sin herramientas de construcción**
- ✅ Abre directamente en el navegador
- ✅ Sistema completo de diseño

**Qué incluye:**

- 🎨 Sistema de colores completo
- 📏 Escalas de tamaños de texto
- 📐 Sistema de espaciado
- 🧩 Componentes estilizados
- 📝 Guía de personalización

**Qué aprenderás:**

- Uso completo de variables CSS
- Creación de sistemas de diseño
- Organización de tokens de diseño
- Documentación de sistemas de diseño

**Cómo usar:**

```bash
# Simplemente abre el archivo en tu navegador
open 03-template-customizable.html

# Luego, edita las variables CSS en el archivo para personalizar
```

**Personalización:**

1. Abre el archivo en tu editor de código
2. Busca la sección `:root` en el `<style>`
3. Modifica las variables CSS
4. Guarda y recarga el navegador

---

## 🎯 Recomendaciones de Uso

### Para Principiantes

1. Comienza con **01-css-overrides.html**
2. Experimenta modificando colores y estilos
3. Luego explora **03-template-customizable.html**

### Para Desarrolladores Intermedios

1. Revisa **01-css-overrides.html** y **03-template-customizable.html**
2. Después pasa a **02-sass-customization/**
3. Configura tu propio proyecto con Vite

### Para Desarrolladores Avanzados

1. Dirígete directamente a **02-sass-customization/**
2. Estudia el archivo `_custom.scss`
3. Adapta el sistema a tus necesidades

---

## 🛠️ Requisitos

### Para Demos 1 y 3

- Navegador web moderno
- Editor de código (opcional, para modificar)

### Para Demo 2

- Node.js 16 o superior
- npm o pnpm
- Editor de código

---

## 📚 Recursos Adicionales

### Documentación

- [Bootstrap Customization](https://getbootstrap.com/docs/5.3/customize/overview/)
- [Sass Documentation](https://sass-lang.com/documentation)
- [Vite Documentation](https://vitejs.dev/)

### Herramientas Útiles

- [Bootstrap Color Palette Generator](https://bootstrap.build/)
- [Coolors - Color Scheme Generator](https://coolors.co/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## 💡 Tips y Trucos

### CSS Overrides

```css
/* Usa variables CSS para fácil mantenimiento */
:root {
	--mi-color: #ff6b35;
}

.btn-primary {
	background-color: var(--mi-color);
}
```

### Sass Variables

```scss
// Define variables ANTES de importar Bootstrap
$primary: #ff6b35;

@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/bootstrap';
```

### Depuración

```javascript
// Ver todas las variables CSS en la consola
const styles = getComputedStyle(document.documentElement);
console.log(styles.getPropertyValue('--bs-primary'));
```

---

## ❓ Preguntas Frecuentes

### ¿Puedo combinar CSS overrides con Sass?

Sí, pero es mejor elegir uno u otro para mantener la consistencia.

### ¿Necesito saber Sass para personalizar Bootstrap?

No, puedes usar CSS overrides (Demo 1 y 3) sin conocer Sass.

### ¿Vite es obligatorio?

No, puedes usar Webpack, Parcel, o el compilador Sass directamente.

### ¿Cómo exporto mi tema?

Con Sass, el CSS compilado está en la carpeta `dist/` después de ejecutar `npm run build`.

---

## 🐛 Solución de Problemas

### Demo 2 no inicia

```bash
# Limpia node_modules e intenta de nuevo
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Cambios no se reflejan

- Limpia la caché del navegador (Cmd+Shift+R / Ctrl+Shift+F5)
- Verifica que guardaste el archivo
- Revisa la consola del navegador por errores

### Error de compilación Sass

- Verifica el orden de imports en `_custom.scss`
- Asegúrate de que las variables estén definidas antes de usarlas
- Revisa la sintaxis Sass

---

## 📧 Soporte

Si tienes preguntas o encuentras problemas:

1. Revisa la documentación oficial de Bootstrap
2. Consulta los comentarios en el código
3. Revisa la lección completa en el material del curso

---

**¡Feliz personalización!** 🎨
