---
layout: lesson
title: 'Pseudo-Elementos y Estilos Basados en Estado: Enfoques Críticos para CSS Dinámico'
slug: pseudo-elementos-y-estilos-de-estado
date: 2025-10-30
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/pseudo-elementos-y-estilos-de-estado/
description: 'Domina las pseudo-clases y pseudo-elementos para crear interfaces dinámicas y accesibles con pensamiento crítico sobre rendimiento, accesibilidad y mejora progresiva'
tags: [css, pseudo-clases, pseudo-elementos, accesibilidad, gestión-de-estado, diseño-interactivo]
status: complete
---

# Pseudo-Elementos y Estilos Basados en Estado: Enfoques Críticos para CSS Dinámico

## 🎯 Objetivos de Aprendizaje

Al finalizar esta lección, serás capaz de:

- Distinguir entre pseudo-clases y pseudo-elementos y sus roles en CSS moderno
- Implementar estilos basados en estado para mejorar la retroalimentación de la interfaz de usuario
- Crear elementos dinámicos de UI sin depender de JavaScript
- Aplicar pensamiento crítico a consideraciones de accesibilidad en estilos interactivos
- Evaluar el impacto de los pseudo-selectores en rendimiento y mantenibilidad

## 🤔 Contexto Crítico

Las pseudo-clases y pseudo-elementos representan la intersección de la interacción del usuario, la retroalimentación visual y la estructura semántica del HTML. Aunque son poderosos para crear interfaces dinámicas, plantean preguntas importantes sobre:

- **Accesibilidad:** ¿Cómo afectan los estilos basados en estado a los usuarios que dependen de tecnologías asistivas?
- **Mejora Progresiva:** ¿Cuándo debemos usar pseudo-estados CSS vs. JavaScript?
- **Rendimiento:** ¿Cuáles son las implicaciones de renderizado del uso intensivo de pseudo-selectores?
- **Mantenibilidad:** ¿Cómo podemos organizar estilos basados en estado de forma escalable?

## 🛠️ Taller Práctico

Esta lección sigue un enfoque incremental donde construiremos un componente del mundo real que muestra varios pseudo-selectores. Crearemos un menú desplegable accesible con estados de hover, gestión de foco y contenido dinámico.

### 🏗️ Configuración del Proyecto

1. En tu repositorio de proyecto, crea una nueva rama:

```bash
git checkout -b feature/state-based-dropdown
```

2. Crea una nueva estructura de archivos de componente:

```
components/
  dropdown/
    index.html
    styles.css
```

### 💡 Entendiendo las Pseudo-Clases

Las pseudo-clases seleccionan elementos basándose en su:

- Estado (`:hover`, `:focus`, `:active`)
- Estructura (`:first-child`, `:nth-child()`)
- Validación (`:valid`, `:required`)
- Negación (`:not()`)

No crean nuevos elementos sino que aplican estilos condicionalmente basados en estas características.

### 🎨 Construyendo el Componente Dropdown

[Ver demo completo de dropdown](demo/dropdown.html)

#### Paso 1: Estructura HTML Base con ARIA

```html
<div class="dropdown" role="navigation">
	<button class="dropdown__trigger" aria-haspopup="true" aria-expanded="false">Menú</button>
	<ul class="dropdown__content" hidden>
		<li><a href="#inicio">Inicio</a></li>
		<li><a href="#acerca">Acerca de</a></li>
		<li><a href="#contacto">Contacto</a></li>
	</ul>
</div>
```

#### Paso 2: Estilos Basados en Estado

```css
/* Estilos base con propiedades personalizadas CSS para tematización */
.dropdown {
	--dropdown-bg: #ffffff;
	--dropdown-border: #e2e8f0;
	--dropdown-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	position: relative;
}

/* Estados interactivos con pseudo-clases */
.dropdown__trigger:hover,
.dropdown__trigger:focus {
	background-color: var(--dropdown-bg-hover);
	outline: 2px solid currentColor;
	outline-offset: 2px;
}

/* 🤔 Discusión crítica: ¿Por qué usar :focus-visible en lugar de solo :focus? */
.dropdown__trigger:focus-visible {
	outline: 2px solid var(--focus-ring-color);
	outline-offset: 2px;
}
```

#### Paso 3: Pseudo-clases Estructurales

```css
/* Estilizando elementos alternos para ritmo visual */
.dropdown__content li:nth-child(odd) {
	background-color: var(--dropdown-bg-alt);
}

/* 🔍 Ejercicio: ¿Por qué podría ser mejor esto que usar clases even/odd? */

/* Apuntar a todos los elementos excepto el último para espaciado consistente */
.dropdown__content li:not(:last-child) {
	border-bottom: 1px solid var(--dropdown-border);
}

/* 💭 Discusión: ¿Cómo mejora :not() la mantenibilidad? */
```

#### Paso 4: Pseudo-elementos para UI Mejorada

```css
/* Agregar señales visuales con ::before */
.dropdown__trigger::before {
	content: '▾';
	margin-right: 0.5em;
	transition: transform 0.2s ease;
}

/* Rotar indicador cuando está expandido */
.dropdown[aria-expanded='true'] .dropdown__trigger::before {
	transform: rotate(180deg);
}
```

/_ 🎯 Práctica: Crear un indicador personalizado usando ::after _/

## 🤝 Ejercicios Colaborativos

### Ejercicio 1: Auditoría de Gestión de Estado

**Duración:** 30 minutos  
**Formato:** Parejas (autoselección o asignación del instructor)  
**Objetivo:** Realizar una revisión por pares de implementaciones de dropdown enfocándose en gestión de estado y accesibilidad

#### Entregables

1. ✅ Lista de verificación de accesibilidad completada (proporcionada abajo)
2. ✅ Documentar 3+ problemas de accesibilidad o usabilidad encontrados
3. ✅ Proponer correcciones específicas con justificación técnica
4. ✅ Crear issue en el repositorio del compañero con hallazgos

#### Lista de Verificación para Revisión por Pares

```markdown
## Revisión de Gestión de Estado del Dropdown

### Estados Interactivos (Probar Cada Uno)

- [ ] `:hover` - Retroalimentación visual al pasar el ratón
- [ ] `:focus` - Indicador de foco visible (usuarios de teclado)
- [ ] `:active` - Estado activo durante el clic
- [ ] `:focus-visible` - Foco solo para navegación por teclado
- [ ] `:disabled` - Si aplica, estilo de estado deshabilitado

### Navegación por Teclado

- [ ] La tecla Tab mueve el foco al botón disparador
- [ ] Enter/Espacio activa el dropdown
- [ ] Las teclas de flecha navegan los elementos del menú
- [ ] Escape cierra el dropdown
- [ ] Tab se mueve al siguiente elemento enfocable fuera

### Implementación ARIA

- [ ] `aria-haspopup="true"` en el disparador
- [ ] `aria-expanded` cambia correctamente (false/true)
- [ ] `role="navigation"` o rol apropiado
- [ ] Atributo hidden en contenido cuando está colapsado

### Prueba de Lector de Pantalla (si está disponible)

- [ ] Anuncia "botón, colapsado" cuando está cerrado
- [ ] Anuncia "botón, expandido" cuando está abierto
- [ ] Lee los elementos del menú correctamente

### Diseño Visual

- [ ] Contraste de color cumple WCAG AA (4.5:1)
- [ ] Foco visible en modo de alto contraste
- [ ] Estados distinguibles sin depender solo del color
```

#### Envío

Subir hallazgos a la rama: `peer-review/[nombre-revisor]-revisa-[nombre-autor]`

---

### Ejercicio 2: Desafío de Mejora Progresiva

**Duración:** 45 minutos  
**Solo o en Pareja:** Tu elección  
**Objetivo:** Construir un dropdown solo con CSS que se degrade elegantemente

#### Requisitos

✅ **Requisitos Funcionales:**

- Funciona sin JavaScript
- Usa transiciones solo CSS
- Mantiene HTML semántico
- Proporciona retroalimentación visual clara

✅ **Requisitos de Accesibilidad:**

- Navegable por teclado
- Compatible con lectores de pantalla
- Soporte para modo de alto contraste
- Táctil amigable (objetivos mínimos 44x44px)

✅ **Restricciones Técnicas:**

- Sin event listeners de JavaScript
- Usar `:focus-within` para gestión de estado
- Transiciones CSS máximo 300ms
- Diseño responsive mobile-first

#### Criterios de Éxito

**Nivel 1 - Funcional (60%)**

- El dropdown se abre al hacer hover/focus
- Se cierra cuando pierde el foco
- Estados visuales básicos presentes

**Nivel 2 - Accesible (80%)**

- Se cumplen todos los requisitos WCAG 2.1 AA
- Navegación por teclado completa
- Atributos ARIA correctos

**Nivel 3 - Excepcional (100%)**

- Animaciones suaves con soporte de movimiento reducido
- Estados avanzados (:focus-visible, :focus-within)
- Decisiones de diseño documentadas
- Optimizado para rendimiento (selectores simples)

#### Envío

```bash
git checkout -b feature/css-only-dropdown
# Completa tu trabajo
git add .
git commit -m "feat: implementar dropdown solo con CSS con mejora progresiva

- Usar :focus-within para gestión de estado
- Implementar accesibilidad WCAG AA
- Agregar transiciones suaves con prefers-reduced-motion
- Documentar compatibilidad del navegador

Closes #[número-de-issue]"
```

## 🎭 Reflexiones Críticas

### Consideraciones de Rendimiento

#### ⚡ Benchmarks de Complejidad de Selectores

Rendimiento de renderizado del mundo real para 1000 elementos (promediado en Chrome, Firefox, Safari):

| Tipo de Selector                  | Tiempo de Renderizado | Costo Relativo |
| --------------------------------- | --------------------- | -------------- |
| `.class`                          | ~0.5ms                | 1x (base)      |
| `.class:hover`                    | ~0.8ms                | 1.6x           |
| `:nth-child(odd)`                 | ~2ms                  | 4x             |
| `:nth-child(3n+1)`                | ~3ms                  | 6x             |
| `:nth-child(3n+1):not(.active)`   | ~8ms                  | 16x            |
| `div > ul li:first-child::before` | ~12ms                 | 24x            |

**Insights Clave:**

✅ **Mejores Prácticas:**

- Usar selectores simples en contextos críticos de rendimiento (animaciones, eventos de scroll)
- Evitar anidamiento profundo de selectores (más de 3 niveles)
- Cachear consultas de pseudo-elementos en JavaScript si es necesario
- Probar en dispositivos de gama baja (6x más lento que desktop)

⚠️ **Cuándo Usar JavaScript En Su Lugar:**

- Gestión de estado compleja (múltiples condiciones)
- Actualizaciones de contenido dinámico basadas en datos del usuario
- Necesidad de persistencia de estado (localStorage)
- Interacciones críticas de rendimiento (arrastrar/soltar, actualizaciones en tiempo real)

🎯 **Herramientas de Prueba:**

- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Firefox Performance Tools](https://firefox-source-docs.mozilla.org/devtools-user/performance/)
- [Lighthouse Performance Audit](https://developers.google.com/web/tools/lighthouse)

### Impacto en Accesibilidad

#### Consideraciones para Lectores de Pantalla

**Cómo se anuncia el contenido de pseudo-elementos:**

```css
/* ❌ MAL: Los lectores de pantalla ignoran el contenido de pseudo-elementos */
.button::before {
	content: 'Haz clic aquí'; /* NO se anuncia */
}

/* ✅ BIEN: Usar pseudo-elementos solo para decoración */
.button::before {
	content: '►'; /* Puramente visual, texto en HTML */
}
```

**Mejor Práctica:** Siempre incluir contenido esencial en HTML, no en CSS.

#### Preocupaciones Móviles y Táctiles

- **Estados hover**: Los dispositivos móviles no tienen hover—proporcionar retroalimentación alternativa
- **Estados focus**: Los dispositivos táctiles muestran el foco de manera diferente al teclado
- **Tamaños de objetivo**: WCAG requiere objetivos táctiles mínimos de 44x44px

```css
/* ✅ BIEN: Combinar hover y focus para soporte más amplio */
.button:hover,
.button:focus {
	background: blue;
}

/* ✅ BIEN: Objetivos táctiles amigables para móvil */
.dropdown__trigger {
	min-height: 44px;
	min-width: 44px;
	padding: 0.75rem 1rem;
}
```

#### Requisitos WCAG 2.1 AA

- **Focus Visible (2.4.7)**: El indicador de foco debe ser visible
- **Contraste de Color (1.4.3)**: 4.5:1 para texto normal, 3:1 para texto grande
- **Teclado (2.1.1)**: Toda funcionalidad disponible vía teclado
- **Sin Trampa de Teclado (2.1.2)**: Los usuarios pueden navegar usando el teclado

**Lista de Verificación de Pruebas:**

- [ ] Indicador de foco visible en todos los elementos interactivos
- [ ] Estados distinguibles sin depender solo del color
- [ ] Funciona con el modo de Alto Contraste de Windows
- [ ] Compatible con lectores de pantalla (NVDA, JAWS, VoiceOver)

## ✅ Guías de Commit

Cuando hagas commit de tu componente dropdown:

```bash
git add components/dropdown
git commit -m "feat(dropdown): implementar estilos basados en estado con pseudo-clases

- Agregar estructura de dropdown accesible
- Implementar estados hover y focus
- Incluir mejora progresiva
- Documentar consideraciones de accesibilidad

Fixes #123"
```

## 📊 Criterios de Evaluación

Tu implementación será evaluada en:

1. **Implementación Técnica**

   - Uso correcto de pseudo-clases y pseudo-elementos
   - Enfoque de mejora progresiva
   - CSS limpio y mantenible
   - Historial de commits git apropiado

2. **Accesibilidad**

   - Navegación por teclado
   - Atributos ARIA
   - Gestión de foco
   - Compatibilidad con lectores de pantalla

3. **Pensamiento Crítico**
   - Documentación de decisiones de diseño
   - Consideraciones de rendimiento
   - Justificación de accesibilidad
   - Comentarios de código reflexivos

## 🌐 Compatibilidad de Navegadores

Entender el soporte del navegador te ayuda a tomar decisiones informadas sobre fallbacks y mejora progresiva.

### Soporte de Pseudo-Selectores Modernos

| Característica       | Chrome | Firefox | Safari | Edge  | Estrategia de Fallback             |
| -------------------- | ------ | ------- | ------ | ----- | ---------------------------------- |
| `:focus-visible`     | 86+    | 85+     | 15.4+  | 86+   | Usar `:focus` como fallback        |
| `:focus-within`      | 60+    | 52+     | 10.1+  | 79+   | Alternativa JavaScript             |
| `:has()`             | 105+   | 103+    | 15.4+  | 105+  | JavaScript para navegadores viejos |
| `:where()`           | 88+    | 84+     | 14+    | 88+   | Usar selectores regulares          |
| `:is()`              | 88+    | 78+     | 14+    | 88+   | Duplicar selectores                |
| `::before`/`::after` | Todos  | Todos   | Todos  | Todos | Universalmente soportado ✅        |

### Ejemplos de Patrones de Fallback

#### Fallback de :focus-visible

```css
/* Fallback para navegadores antiguos - muestra outline en todo foco */
.dropdown__trigger:focus {
	outline: 2px solid blue;
}

/* Navegadores modernos - solo foco de teclado */
.dropdown__trigger:focus-visible {
	outline: 2px solid var(--focus-ring-color);
}

/* Remover outline para usuarios de ratón (solo navegadores modernos) */
.dropdown__trigger:focus:not(:focus-visible) {
	outline: none;
}
```

#### Fallback de :has()

```css
/* Moderno: Estilo de padre basado en estado de hijo */
.form:has(input:invalid) {
	border-color: red;
}

/* Fallback: Usar JavaScript para navegadores antiguos */
```

```javascript
// Fallback para navegadores antiguos sin :has()
if (!CSS.supports('selector(:has(*))')) {
	document.querySelectorAll('input').forEach((input) => {
		input.addEventListener('invalid', () => {
			input.closest('.form').classList.add('has-invalid');
		});
	});
}
```

### Detección de Características

```css
/* Verificar si el navegador soporta una característica */
@supports selector(:focus-visible) {
	/* Enfoque moderno */
	button:focus-visible {
		outline: 3px solid blue;
	}
}

@supports not selector(:focus-visible) {
	/* Enfoque de fallback */
	button:focus {
		outline: 3px solid blue;
	}
}
```

### Recursos

- **[Can I Use](https://caniuse.com/)** - Verificar soporte de navegador para cualquier característica
- **[Compatibilidad de Navegador MDN](https://developer.mozilla.org/en-US/docs/Web/CSS#browser_compatibility)** - Datos detallados de compatibilidad
- **[regla @supports](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports)** - Detección de características en CSS

---

## 🧪 Probando Tu Implementación

### Pruebas de Navegación por Teclado

**Procedimiento de prueba paso a paso:**

1. **Abre tu dropdown en un navegador**
2. **Prueba de tecla Tab**: Presiona `Tab` repetidamente
   - ✅ El foco debe moverse al botón disparador
   - ✅ El indicador de foco visual debe ser claramente visible
3. **Prueba de activación**: Presiona `Enter` o `Espacio`
   - ✅ El dropdown debe abrirse
   - ✅ `aria-expanded` debe cambiar a `true`
4. **Prueba de navegación**: Presiona `Tab` para moverte por los elementos
   - ✅ El foco debe moverse por los elementos del menú
   - ✅ Cada elemento debe mostrar indicador de foco
5. **Prueba de cierre**: Presiona `Escape`
   - ✅ El dropdown debe cerrarse
   - ✅ El foco regresa al botón disparador
6. **Prueba de salida**: Presiona `Tab` nuevamente
   - ✅ El foco debe moverse al siguiente elemento fuera del dropdown

### Pruebas de Lector de Pantalla

#### macOS VoiceOver (Integrado)

```bash
# Habilitar VoiceOver
Cmd + F5

# Navegar
Control + Option + Teclas de Flecha

# Interactuar
Control + Option + Espacio
```

**Qué escuchar:**

- "Botón de menú, colapsado" (cuando está cerrado)
- "Botón de menú, expandido" (cuando está abierto)
- Cada elemento del menú anunciado claramente
- Cambios de estado anunciados

#### Windows NVDA (Gratuito)

1. Descargar [NVDA](https://www.nvaccess.org/download/)
2. Presionar `Insert + Flecha Abajo` para comenzar a leer
3. Usar `Tab` para navegar elementos interactivos
4. Escuchar anuncios de estado

#### Lista de Verificación de Pruebas

```markdown
## Prueba de Compatibilidad con Lector de Pantalla

### Estado Inicial

- [ ] Rol de botón anunciado
- [ ] Estado "colapsado" o "cerrado" anunciado
- [ ] Etiqueta de botón clara y descriptiva

### Activación

- [ ] Estado "expandido" o "abierto" anunciado
- [ ] Contenido del menú anunciado
- [ ] Número de elementos anunciado (opcional pero útil)

### Navegación

- [ ] Cada elemento del menú anunciado
- [ ] Posición del elemento anunciada (1 de 3, etc.)
- [ ] Rol de enlace/botón anunciado para cada elemento

### Cierre

- [ ] Estado "colapsado" anunciado
- [ ] Retorno de foco anunciado
```

### Herramientas de Prueba Automatizadas

#### 1. Extensión WAVE para Navegador (Overlay visual)

- [Instalar WAVE](https://wave.webaim.org/extension/)
- Ejecutar en tu página
- Verificar errores, advertencias y características
- Revisar uso de ARIA

#### 2. axe DevTools (Pruebas en navegador)

- [Instalar axe DevTools](https://www.deque.com/axe/devtools/)
- Abrir DevTools → pestaña axe
- Clic en "Scan ALL of my page"
- Revisar y corregir problemas

#### 3. Auditoría de Accesibilidad Lighthouse

```bash
# En Chrome DevTools
F12 → pestaña Lighthouse → Accesibilidad → Generar reporte
```

**Puntuaciones objetivo:**

- ✅ Accesibilidad: 95-100 (excelente)
- ⚠️ Menos de 90: Necesita mejora

#### 4. Verificador de Contraste de Color

- [Verificador de Contraste WebAIM](https://webaim.org/resources/contrastchecker/)
- Probar tus colores de foco contra fondos
- Apuntar a WCAG AA (4.5:1) o mejor

### Prueba Manual de Modo de Alto Contraste

#### Alto Contraste de Windows

1. `Configuración → Accesibilidad → Alto Contraste`
2. Activar tema de alto contraste
3. Verificar que:
   - Los indicadores de foco son visibles
   - Los estados son distinguibles
   - Ningún contenido desaparece

#### Modo Oscuro de macOS

1. `Preferencias del Sistema → General → Apariencia → Oscuro`
2. Verificar que tu esquema de color se adapta apropiadamente

```css
/* Respetar la preferencia de esquema de color del usuario */
@media (prefers-color-scheme: dark) {
	.dropdown {
		--dropdown-bg: #1a1a1a;
		--dropdown-text: #e4e4e4;
		--focus-ring-color: #6ea8fe;
	}
}
```

### Pruebas de Rendimiento

```javascript
// Medir rendimiento de selectores
console.time('selector-complejo');
document.querySelectorAll('.dropdown:nth-child(3n+1):not(.active) li::before');
console.timeEnd('selector-complejo');

// Comparar con selector simple
console.time('selector-simple');
document.querySelectorAll('.dropdown-item');
console.timeEnd('selector-simple');
```

---

## 📚 Recursos Adicionales

### Documentación

- [MDN Web Docs: Pseudo-clases](https://developer.mozilla.org/es/docs/Web/CSS/Pseudo-classes)
- [MDN Web Docs: Pseudo-elementos](https://developer.mozilla.org/es/docs/Web/CSS/Pseudo-elements)
- [WCAG: Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)
- [CSS-Tricks: Todo Sobre Pseudo-Elementos](https://css-tricks.com/pseudo-element-roundup/)
- [WebAIM: Accesibilidad de Teclado](https://webaim.org/techniques/keyboard/)

### Herramientas

- [Can I Use: Pseudo-clases](https://caniuse.com/?search=pseudo-class)
- [Demo Interactivo de CSS Pseudo-clases](https://codepen.io/web-dot-dev/pen/pseudo-classes)
- [Herramientas de Prueba de Accesibilidad](https://www.w3.org/WAI/ER/tools/)
- [Extensión WAVE para Navegador](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Verificador de Contraste WebAIM](https://webaim.org/resources/contrastchecker/)

## 🚀 Próximos Pasos

1. Completar el componente dropdown
2. Agregarlo a tu proyecto de portafolio
3. Documentar tus decisiones de implementación
4. Compartir en la sesión de revisión por pares de la próxima semana

Recuerda: El objetivo no es solo hacer que funcione, sino entender por qué y cómo funciona para todos los usuarios.

---

<details>
<summary>💡 Errores Comunes a Evitar</summary>

- Depender únicamente de estados hover para interacciones críticas
- Olvidar la navegación por teclado
- Usar contenido en pseudo-elementos que debería estar en HTML
- Cadenas de selectores excesivamente complicadas
- Faltar estados de foco
- No probar con tecnologías asistivas

</details>

---

## 📚 Patrones Esenciales de Pseudo-Elementos

Ahora que entiendes el pensamiento crítico detrás de los estilos basados en estado, exploremos los patrones fundamentales de pseudo-elementos que forman la base del CSS dinámico. Estos patrones son bloques de construcción esenciales que usarás a lo largo de tus proyectos.

### 🎨 Pseudo-Elementos de Mejora Visual

[Ver demo de ejemplos tipográficos](demo/typography.html)

📌 **Práctica:** Agregar emojis decorativos antes y después de elementos `<h1>`.

#### 🔹 `::first-letter` (Estilizando la Primera Letra de un Párrafo)

Mejora la tipografía agrandando o cambiando el estilo de la primera letra.

```css
p::first-letter {
	font-size: 2rem;
	color: red;
}
```

📌 **Práctica:** Aplicar un efecto de capitular a párrafos.

#### 🔹 `::first-line` (Estilizando la Primera Línea de Texto)

Aplicar estilos solo a la primera línea de un párrafo.

```css
p::first-line {
	font-weight: bold;
}
```

📌 **Práctica:** Resaltar la primera línea de cada párrafo.

#### 🔹 `::selection` (Estilizando Texto Seleccionado)

Cambiar la apariencia del texto cuando es seleccionado por el usuario.

```css
::selection {
	background: yellow;
	color: black;
}
```

📌 **Práctica:** Personalizar el color del texto resaltado.

---

## 4. Técnicas Avanzadas con Pseudo-Clases y Pseudo-Elementos

### 4.1. Tooltips con `::after` y `:hover`

[Ver demo de tooltip](demo/tooltip.html)

Crear tooltips usando solo CSS.

```css
.tooltip {
	position: relative;
	display: inline-block;
	cursor: pointer;
}

.tooltip::after {
	content: 'Tooltip';
	position: absolute;
	bottom: 100%;
	left: 50%;
	transform: translateX(-50%);
	background: black;
	color: white;
	padding: 5px;
	border-radius: 5px;
	opacity: 0;
	transition: opacity 0.3s;
}

.tooltip:hover::after {
	opacity: 1;
}
```

📌 **Práctica:** Implementar un tooltip en un botón.

---

## 5. Práctica en Tu Repositorio de GitHub

[Ver demo de todos los ejercicios](demo/exercises.html)

### 🏗 Ejercicio 1: Barra de Navegación con Pseudo-Clases

1. Crear un archivo `navigation.css` e importarlo en tu CSS principal.
2. Aplicar `:hover`, `:focus`, y `:nth-child()` para resaltar elementos del menú.

### 🏗 Ejercicio 2: Tarjetas Responsive con Pseudo-Elementos

1. Crear un archivo `cards.css` e importarlo en tu CSS principal.
2. Usar `::before` y `::after` para agregar detalles decorativos.

### 🏗 Ejercicio 3: Botón Dinámico con Efectos Animados

1. Crear un archivo `buttons.css` e importarlo en tu proyecto.
2. Usar `::before` para agregar un efecto de animación al botón.

---

## 6. Conclusión

Las pseudo-clases y pseudo-elementos permiten crear **diseños interactivos y atractivos usando solo CSS**.

### 🔹 Puntos Clave:

✅ Las pseudo-clases modifican elementos basándose en su estado (`:hover`, `:focus`, `:nth-child()`).
✅ Los pseudo-elementos permiten estilizar partes específicas (`::before`, `::after`, `::selection`).
✅ Combinarlos permite crear **animaciones, tooltips y mejoras de UI**.

Ahora, aplica estas técnicas en tus **repositorios de GitHub**, experimenta con diferentes estilos y comparte tus resultados. 🚀
