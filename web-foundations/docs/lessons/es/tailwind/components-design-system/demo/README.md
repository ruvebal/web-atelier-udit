# Demo de Componentes y Sistema de Diseño

Esta demo muestra un sistema de diseño completo construido con Tailwind CSS usando el enfoque de `<template>` para ruteo SPA.

## Características

- **Elementos HTML `<template>`** para renderizado limpio y seguro
- **Tokens de diseño** (colores, espaciado, tipografía)
- **Biblioteca de componentes** (botones, tarjetas, formularios)
- **Enfoque de accesibilidad primero** con atributos ARIA
- **Diseño responsivo** con breakpoints mobile-first

## Ejecutando la Demo

1. Abre `index.html` en un navegador con un servidor local
2. Navega usando el menú superior o URLs hash:
   - `#/` - Inicio
   - `#/buttons` - Componentes de botones
   - `#/cards` - Componentes de tarjetas
   - `#/forms` - Componentes de formularios
   - `#/tokens` - Tokens de diseño

## Estructura de Archivos

```
demo/
├── index.html          # HTML principal (layout compartido)
├── src/
│   ├── main.js         # Punto de entrada de la aplicación
│   ├── router.js       # Router con carga dinámica de templates
│   ├── style.css       # Tailwind + estilos personalizados
│   ├── components/      # Componentes modulares reutilizables
│   │   ├── button-primary.html
│   │   ├── button-secondary.html
│   │   └── card.html
│   ├── utils/          # Funciones helper para componentes
│   │   ├── component-helpers.js
│   │   └── card-helpers.js
│   └── views/          # Vistas con templates separados
│       ├── index.js    # Registro de vistas
│       ├── home.html
│       ├── buttons.html
│       ├── buttons.js  # onMount para buttons
│       ├── cards.html
│       ├── cards.js   # onMount para cards
│       ├── forms.html
│       ├── forms.js
│       ├── tokens.html
│       └── 404.html
└── README.md           # Este archivo
```

## Conceptos Clave

- **Vistas basadas en plantillas**: Cada vista se define como un archivo HTML `<template>` separado
- **Carga dinámica**: El router carga templates desde archivos cuando se necesitan
- **Componentes modulares**: Componentes reutilizables en `src/components/` que se clonan dinámicamente
- **onMount functions**: Funciones JavaScript que se ejecutan después de renderizar cada vista
- **Helper functions**: Utilidades en `src/utils/` para simplificar el uso de componentes
- **Tokens de diseño**: Configuración extendida de Tailwind (colores, espaciado, etc.)

## Lección Relacionada

Ve la lección completa en `/lessons/es/tailwind/components-design-system/`
