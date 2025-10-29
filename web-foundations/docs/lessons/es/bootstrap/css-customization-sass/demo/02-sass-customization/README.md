# Demo 2: Personalización de Bootstrap con Sass

Este demo muestra cómo personalizar Bootstrap usando Sass con Vite como herramienta de construcción.

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar servidor de desarrollo

```bash
npm run dev
```

### 3. Construir para producción

```bash
npm run build
```

## 📁 Estructura de Archivos

```
02-sass-customization/
├── _custom.scss      # Variables Sass personalizadas y estilos
├── index.html        # Página HTML principal
├── package.json      # Dependencias y scripts
├── vite.config.js    # Configuración de Vite
└── README.md         # Este archivo
```

## 🎨 Cómo Personalizar

### Opción 1: Modificar Variables

Abre `_custom.scss` y modifica las variables:

```scss
// Cambiar color primario
$primary: #tu-color-aqui;

// Cambiar fuentes
$font-family-sans-serif: 'Tu Fuente', sans-serif;

// Cambiar espaciado
$spacer: 1.5rem;
```

### Opción 2: Agregar Colores Personalizados

```scss
$custom-colors: (
	'mi-color': #ff0000,
	'otro-color': #00ff00,
);
```

Luego úsalos en HTML:

```html
<button class="btn btn-mi-color">Mi Botón</button>
<div class="bg-otro-color">Fondo personalizado</div>
```

## 🛠️ Herramientas de Construcción Alternativas

### Con Webpack

```bash
npm install -D webpack webpack-cli sass-loader sass css-loader style-loader
```

### Con Parcel

```bash
npm install -D parcel sass
```

## 📚 Recursos

- [Documentación de Sass](https://sass-lang.com/)
- [Personalización de Bootstrap](https://getbootstrap.com/docs/5.3/customize/sass/)
- [Documentación de Vite](https://vitejs.dev/)
