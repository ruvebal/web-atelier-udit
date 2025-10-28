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
├── index.html          # HTML principal con todas las plantillas
├── src/
│   ├── main.js         # Punto de entrada de la aplicación
│   ├── router.js       # Lógica de ruteo SPA
│   ├── style.css       # Tailwind + estilos personalizados
│   └── views/
│       └── index.js    # Registro de vistas
└── README.md           # Este archivo
```

## Conceptos Clave

- **Vistas basadas en plantillas**: Cada vista se define como un elemento HTML `<template>`
- **Clonar y anexar**: El router clona el contenido de la plantilla en el contenedor `#app`
- **Patrones de componentes**: Clases CSS reutilizables definidas en `style.css`
- **Tokens de diseño**: Configuración extendida de Tailwind (colores, espaciado, etc.)

## Lección Relacionada

Ve la lección completa en `/lessons/es/tailwind/components-design-system/`
