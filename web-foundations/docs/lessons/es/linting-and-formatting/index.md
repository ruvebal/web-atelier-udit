---
layout: lesson
title: 'El Propósito del Formateo y Linting en el Desarrollo'
title_alt: 'The Purpose of Formatting and Linting in Development'
slug: linting-and-formatting
date: 2025-09-10
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/linting-and-formatting/
---

<aside class="lesson-framing" aria-label="Idea maestra y lente de campo">
<p><strong>Idea maestra:</strong> Las herramientas de calidad codifican decisiones de equipo; no sustituyen el criterio.</p>
<p><strong>Lente de campo:</strong> **Ancla de práctica:** formateo, linting y comprobaciones automáticas mejoran la legibilidad compartida. **Señal de frontera:** autofix y revisión con IA escalan comprobaciones y también la falsa confianza.</p>
</aside>

> **Prueba de estudio:** Rechaza o revisa una regla con una justificación escrita.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## Para quién es / Para quién no

**Para:** Front-End I **Sesión 10** — añadir Prettier + ESLint (y opcionalmente Stylelint/HTMLHint) a tu repo para formateo y comprobaciones básicas de JS.

**No para:** imponer debates de estilo sin acuerdo, ni sustituir revisión humana por lint verde.

**Al terminar esta sesión tendrás:** archivos de config en el repo, un fix de lint documentado y format-on-save (o script npm) funcionando.

---

## Antes de empezar

| Requisito | ¿Obligatorio? |
| --- | --- |
| Sesión 9 completa (módulos ES) | Sí |
| Node.js instalado | Sí |
| VS Code con extensiones ESLint + Prettier | Recomendado |

**Tiempo oficial:** 1,5 h de clase + 0,5 h de laboratorio.

---

## Sigue este camino

| Paso | Acción | Sección |
| --- | --- | --- |
| 1 | Lee por qué formateo ≠ linting | Propósito (abajo) |
| 2 | Elige Ruta A (solo VS Code) o B (npm) | Elige tu camino |
| 3 | Añade `.editorconfig` + Prettier | Guía paso a paso |
| 4 | Añade ESLint; corrige un warning con justificación | Prompts críticos |
| 5 | Ejecuta format/lint antes del commit | Inicio rápido |
| 6 | Commit | Entrega |

---

## Comprueba antes de salir

- [ ] `npm run lint` o panel ESLint sin errores de config
- [ ] Prettier formatea un archivo desordenado de forma consistente
- [ ] Entiendes al menos una regla ESLint (no desactivada a ciegas)
- [ ] Configs commiteadas; sin secretos
- [ ] Commit subido

---

## Fallos frecuentes

| Síntoma | Causa probable | Qué hacer |
| --- | --- | --- |
| ESLint vs Prettier en conflicto | Falta `eslint-config-prettier` | Instala el resolvedor de la guía |
| No formatea al guardar | Formateador por defecto incorrecto | Prettier como formateador en VS Code |
| `npm` no encontrado | Node no instalado | Instala Node LTS |
| Miles de warnings | Lint sobre plantilla legacy | Lint solo `assets/js/` al principio |
| Reglas todas desactivadas | Evitar aprender | Rehabilita; documenta una excepción |

---

## Entrega (evidencia Sesión 10)

- Commit con `.prettierrc` / `eslint.config.*`
- Nota: una regla que mantuviste, una que ajustaste y por qué

---

# El Propósito del Formateo y Linting en el Desarrollo

En el desarrollo web moderno, el **formateo** y el **linting** desempeñan roles complementarios para mantener código limpio, consistente y libre de errores. Estas prácticas son esenciales para mejorar la calidad del código, la colaboración y la mantenibilidad.

#### ¿Qué es el Formateo?

El formateo se refiere a organizar y estructurar el código de manera consistente y visualmente atractiva. Asegura que el código sea fácil de leer, escribir y entender, tanto para el desarrollador original como para otros que trabajen en el mismo proyecto.

##### Beneficios Clave del Formateo:

- **Legibilidad**:
  - El código correctamente formateado es más fácil de navegar, reduciendo la carga cognitiva en los desarrolladores.
- **Consistencia**:
  - El estilo uniforme ayuda a los equipos a mantener los mismos estándares de codificación en todos los archivos.
- **Automatización**:
  - Las herramientas de formateo automático ahorran tiempo eliminando la necesidad de formateo manual.

##### Ejemplos de Formateo:

- Asegurar indentación y espaciado consistentes.
- Hacer cumplir un estándar para saltos de línea, llaves y comillas.
- Alinear elementos en HTML o propiedades en CSS para mejor estructura visual.

---

#### ¿Qué es el Linting?

El linting implica analizar código para detectar errores potenciales, hacer cumplir estándares de codificación y fomentar mejores prácticas. Un linter revisa la base de código y resalta patrones problemáticos o violaciones, asegurando que se adhiera a pautas predefinidas.

##### Beneficios Clave del Linting:

- **Prevención de Errores**:
  - Identifica errores comunes como etiquetas de cierre faltantes, variables no utilizadas o sintaxis inválida.
- **Cumplimiento de Estándares**:
  - Fomenta la adhesión a convenciones de codificación y reglas específicas del proyecto.
- **Calidad del Código**:
  - Mejora la confiabilidad general y mantenibilidad del código.

##### Ejemplos de Linting:

- Resaltar atributos o etiquetas HTML inválidas.
- Detectar errores de sintaxis en JavaScript, como variables no declaradas.
- Hacer cumplir mejores prácticas en CSS, como evitar selectores duplicados.

---

#### Cómo el Formateo y Linting se Complementan

Mientras que el formateo asegura que el código se vea consistente y sea fácil de leer, el linting asegura que el código funcione correctamente y se adhiera a los estándares.

- **El Formateo se Enfoca en**:

  - **Cómo se ve el código.**
  - Ej., Indentación, saltos de línea y espaciado.

- **El Linting se Enfoca en**:
  - **Qué hace el código.**
  - Ej., Corrección, validez y mejores prácticas.

---

### ¿Por Qué Usar Formateo y Linting Juntos?

Al combinar herramientas de formateo y linting, los desarrolladores pueden asegurar que su código sea tanto limpio como funcional:

- **Mejora la Colaboración**:
  - El formateo consistente y la adhesión a estándares facilitan que los equipos trabajen juntos.
- **Reduce el Tiempo de Depuración**:
  - La detección temprana de problemas a través del linting previene que los errores pasen desapercibidos.
- **Aumenta la Productividad**:
  - Las herramientas automatizadas manejan tareas repetitivas, permitiendo a los desarrolladores enfocarse en problemas más complejos.

---

# Guía Paso a Paso para Estudiantes: Instalación y Configuración de Herramientas

Instrucciones para configurar herramientas usando tanto **extensiones de Visual Studio Code (VS Code)** como **comandos npx CLI**. De esta manera, los estudiantes pueden elegir su método preferido según su nivel de comodidad.

---

### Instalar Prettier

**Prettier** es un formateador de código que asegura estilo consistente en toda tu base de código automáticamente.

#### Definición y Propósito de Prettier

- **Definición**: Prettier es un formateador de código con opiniones que hace cumplir un estilo consistente analizando tu código y reimprimiéndolo con sus propias reglas, considerando la longitud máxima de línea y otras configuraciones.
- **Propósito**:
  - **Consistencia**: Asegura que todos los archivos en un proyecto sigan el mismo estilo.
  - **Legibilidad**: Hace el código más fácil de leer y entender.
  - **Automatización**: Elimina el formateo manual, ahorrando tiempo y esfuerzo.

#### Opción 1: Configurar Prettier Usando VS Code

1. Instalar la extensión **Prettier - Code formatter**:

   - Abrir **VS Code**.
   - Ir al Marketplace de Extensiones (`Ctrl + Shift + X` / `Cmd + Shift + X`).
   - Buscar **"Prettier - Code formatter"** y hacer clic en **Instalar**.

2. Configurar Prettier:

   - Abrir **Configuración** (`Ctrl + ,` / `Cmd + ,`).
   - Buscar `Editor: Default Formatter`.
   - Establecer el valor en **"esbenp.prettier-vscode"**.
   - Habilitar **Format on Save**:
     - Buscar `Editor: Format On Save` y marcar la casilla.

3. Probar Prettier:
   - Abrir un archivo con formateo inconsistente.
   - Guardar el archivo y verificar que Prettier lo formatee automáticamente.

#### Opción 2: Configurar Prettier Usando npx CLI

1. Instalar Prettier:

   - Ejecutar el siguiente comando para instalar Prettier localmente:
     ```bash
     npm install prettier --save-dev
     ```

2. Crear un archivo de configuración de Prettier:

   - Añadir un archivo `.prettierrc` a tu proyecto con configuraciones personalizadas, ej.:
     ```json
     {
     	"semi": true,
     	"singleQuote": true,
     	"tabWidth": 2
     }
     ```

3. Añadir un archivo `.prettierignore`:

   - Especificar archivos o carpetas a excluir del formateo, ej.:
     ```plaintext
     node_modules/
     dist/
     ```

4. Probar Prettier:
   - Formatear archivos directamente desde la terminal:
     ```bash
     npx prettier --write "src/**/*.js"
     ```

---

### Instalar HTMLHint

**HTMLHint** es una herramienta de análisis de código estático específicamente para archivos HTML.

#### Definición y Propósito de HTMLHint

- **Definición**: HTMLHint es un linter para HTML que identifica errores de sintaxis, hace cumplir estándares de codificación y ayuda a mejorar la calidad del código HTML.
- **Propósito**:
  - **Detección de Errores**: Señala problemas como etiquetas faltantes, atributos inválidos o IDs duplicados.
  - **Cumplimiento de Estándares**: Asegura que el HTML se adhiera a mejores prácticas y estándares de codificación.
  - **Accesibilidad**: Fomenta prácticas como usar atributos `alt` para imágenes.

#### Opción 1: Configurar HTMLHint Usando VS Code

1. Instalar la extensión **HTMLHint**:

   - Abrir **VS Code**.
   - Ir al Marketplace de Extensiones y buscar **"HTMLHint"**.
   - Hacer clic en **Instalar**.

2. Configurar HTMLHint:

   - Usar las reglas por defecto proporcionadas por la extensión o crear un archivo `.htmlhintrc` en la raíz de tu proyecto (ver Opción 2 abajo).

3. Probar HTMLHint:
   - Abrir un archivo HTML con problemas y verificar que la pestaña Problemas en VS Code muestre advertencias o errores.

#### Opción 2: Configurar HTMLHint Usando npx CLI

1. Instalar HTMLHint localmente:

   - Ejecutar el siguiente comando:
     ```bash
     npm install htmlhint --save-dev
     ```

2. Crear un archivo de configuración de HTMLHint:

   - Añadir un archivo `.htmlhintrc` a la raíz de tu proyecto:
     ```json
     {
     	"tagname-lowercase": true,
     	"attr-lowercase": true,
     	"attr-value-double-quotes": true,
     	"doctype-first": true,
     	"id-unique": true,
     	"src-not-empty": true,
     	"tag-pair": true
     }
     ```

3. Probar HTMLHint:
   - Usar la terminal para hacer linting de un archivo HTML:
     ```bash
     npx htmlhint src/index.html
     ```

---

### Instalar Stylelint

**Stylelint** es un linter de CSS que hace cumplir estilo consistente y detecta errores en hojas de estilo.

#### Definición y Propósito de Stylelint

- **Definición**: Stylelint es un linter moderno de CSS que hace cumplir estilo consistente y detecta errores en tus hojas de estilo.
- **Propósito**:
  - **Detección de Errores**: Identifica propiedades CSS inválidas y errores de sintaxis.
  - **Estilo Consistente**: Asegura que el CSS se adhiera a un formato consistente.
  - **Mantenibilidad**: Promueve CSS limpio y estructurado.

#### Opción 1: Configurar Stylelint Usando VS Code

1. Instalar la extensión **Stylelint**:

   - Abrir **VS Code**.
   - Ir al Marketplace de Extensiones y buscar **"Stylelint"**.
   - Hacer clic en **Instalar**.

2. Usar la configuración por defecto de la extensión o crear un archivo de configuración (ver Opción 2 abajo).

#### Opción 2: Configurar Stylelint Usando npx CLI

1. Instalar Stylelint:

   ```bash
   npm install stylelint stylelint-config-standard stylelint-config-prettier --save-dev
   ```

2. Crear un archivo `.stylelintrc.json`:

   ```json
   {
   	"extends": ["stylelint-config-standard", "stylelint-config-prettier"],
   	"rules": {
   		"indentation": 2,
   		"string-quotes": "double"
   	}
   }
   ```

3. Probar Stylelint:
   - Ejecutar Stylelint para verificar tus archivos CSS:
     ```bash
     npx stylelint "src/**/*.css"
     ```
   - Corregir problemas automáticamente:
     ```bash
     npx stylelint "src/**/*.css" --fix
     ```

---

### Instalar ESLint

**ESLint** es un linter de JavaScript que hace cumplir convenciones de codificación y detecta errores.

#### Definición y Propósito de ESLint

- **Definición**: ESLint es una herramienta de análisis estático para JavaScript que identifica patrones problemáticos y hace cumplir estándares de codificación.
- **Propósito**:
  - **Detección de Errores**: Resalta errores de sintaxis y errores potenciales.
  - **Consistencia**: Asegura que el código JavaScript se adhiera a estándares.
  - **Personalización**: Proporciona configuración flexible para necesidades específicas del proyecto.

#### Opción 1: Configurar ESLint Usando VS Code

1. Instalar la extensión **ESLint**:

   - Abrir **VS Code**.
   - Ir al Marketplace de Extensiones y buscar **"ESLint"**.
   - Hacer clic en **Instalar**.

2. Usar la configuración por defecto proporcionada por la extensión o configurar ESLint (ver Opción 2 abajo).

#### Opción 2: Configurar ESLint Usando npx CLI

1. Instalar ESLint:

   ```bash
   npm install eslint --save-dev
   ```

2. Inicializar ESLint:

   - Ejecutar el siguiente comando para crear un archivo de configuración:
     ```bash
     npx eslint --init
     ```
   - Seguir las indicaciones para configurar ESLint para tu proyecto.

3. Crear un archivo `.eslintrc.json`:

   ```json
   {
   	"env": {
   		"browser": true,
   		"es2021": true
   	},
   	"extends": "eslint:recommended",
   	"parserOptions": {
   		"ecmaVersion": 12,
   		"sourceType": "module"
   	},
   	"rules": {
   		"semi": ["error", "always"],
   		"quotes": ["error", "single"]
   	}
   }
   ```

4. Probar ESLint:
   - Usar la terminal para hacer linting de archivos JavaScript:
     ```bash
     npx eslint "src/**/*.js"
     ```
   - Corregir problemas automáticamente:
     ```bash
     npx eslint "src/**/*.js" --fix
     ```

---

### Probar la Configuración

- Crear archivos de muestra para HTML, CSS y JavaScript con errores intencionales.
- Probar cada herramienta para asegurar que funcione como se espera:
  - Prettier debe formatear código.
  - HTMLHint debe señalar problemas de HTML.
  - Stylelint debe detectar errores de CSS.
  - ESLint debe resaltar problemas de JavaScript.

---

### Solución de Problemas

1. Asegurar que las extensiones estén instaladas en Visual Studio Code.
2. Verificar que los archivos de configuración (`.prettierrc`, `.htmlhintrc`, `.stylelintrc.json`, `.eslintrc.json`) estén configurados correctamente.
3. Reiniciar Visual Studio Code para aplicar cambios.
4. Ejecutar comandos CLI para mensajes de error detallados (ej., `npx eslint`, `npx stylelint`).

---

## 🚀 Inicio Rápido: ¿Qué Necesito Instalar?

**Elige UNA ruta según tu configuración:**

### Ruta A: Solo VS Code (No se necesita Node.js)

**Instala estas extensiones de VS Code:**

- Prettier – Code formatter
- HTMLHint
- Stylelint
- ESLint
- Markdownlint
- YAML (Red Hat)

**Habilita Format on Save** en la configuración de VS Code.

### Ruta B: Node.js + Herramientas CLI

**Instala Node.js, luego ejecuta:**

```bash
npm init -y
npm i -D prettier eslint htmlhint stylelint markdownlint-cli
```

**Añade archivos de configuración** (copia de los ejemplos abajo).

---

## Elige Tu Ruta (Dos Configuraciones)

Elige la configuración que coincida con tu máquina y nivel de comodidad. Puedes cambiar más tarde.

- **A) Sin configuración Node (Solo editor):** Usar extensiones de Visual Studio Code para formatear y hacer linting localmente sin instalar Node.js o dependencias del proyecto.
- **B) Configuración Node (CLI + scripts):** Instalar herramientas vía npm y ejecutarlas con comandos y CI.

Ambas rutas apuntan a cubrir HTML, CSS, JS, Markdown, YAML y JSON.

---

### A) Sin Configuración Node (Solo editor)

Instala estas extensiones de VS Code y habilita Format on Save. Esto cubre formateo y linting para la mayoría de archivos sin una cadena de herramientas Node.

- Prettier – Code formatter (`esbenp.prettier-vscode`)
- HTMLHint (`HTMLHint.HTMLHint`)
- Stylelint (`stylelint.vscode-stylelint`)
- ESLint (`dbaeumer.vscode-eslint`)
- Markdownlint (`davidanson.vscode-markdownlint`)
- YAML (Red Hat) (`redhat.vscode-yaml`)
- EditorConfig for VS Code (`EditorConfig.EditorConfig`)

Configuración recomendada de VS Code (Usuario o Espacio de trabajo):

```json
{
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.formatOnSave": true,
	"editor.codeActionsOnSave": {
		"source.fixAll": true,
		"source.fixAll.eslint": true,
		"source.fixAll.stylelint": true
	},
	"yaml.validate": true,
	"markdownlint.config": {
		"default": true,
		"MD013": false
	}
}
```

Archivos opcionales de la raíz del proyecto (crear una vez):

```ini
# .editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
```

```json
// .prettierrc
{
	"semi": true,
	"singleQuote": true,
	"tabWidth": 2,
	"trailingComma": "es5"
}
```

```plaintext
# .prettierignore
node_modules/
dist/
build/
.cache/
```

Con esto, Prettier manejará el formateo para HTML, CSS, JS/TS, JSON, YAML y Markdown. Las extensiones linter mostrarán problemas directamente en el panel de Problemas.

---

### B) Configuración Node (CLI + scripts)

Inicializar un proyecto e instalar formateadores/linters. Esta ruta es ideal para automatización, CI y flujos de trabajo en equipo.

```bash
npm init -y
npm i -D prettier eslint htmlhint stylelint markdownlint-cli
```

**Archivos de configuración esenciales** (copia estos a la raíz de tu proyecto):

```json
// .prettierrc
{
	"semi": true,
	"singleQuote": true,
	"tabWidth": 2
}
```

```json
// .eslintrc.json
{
	"env": { "browser": true, "es2021": true },
	"extends": "eslint:recommended",
	"rules": { "semi": ["error", "always"] }
}
```

```json
// .htmlhintrc
{
	"tagname-lowercase": true,
	"attr-lowercase": true,
	"doctype-first": true,
	"id-unique": true
}
```

**Añade estos scripts a package.json:**

```json
{
	"scripts": {
		"format": "prettier --write .",
		"lint": "htmlhint '**/*.html' && eslint '**/*.js' && stylelint '**/*.css'"
	}
}
```

**Prueba tu configuración:**

```bash
npm run format
npm run lint
```

---

### Prettier para HTML, CSS, JS, JSON, YAML, Markdown

Prettier soporta todos estos formatos de forma nativa. Usa la extensión de VS Code (Format on Save) o la CLI:

```bash
npx prettier --write "**/*.{html,css,js,ts,json,yml,yaml,md,markdown}"
```

---

## Preguntas Críticas de Codificación (Atelier)

Usa estas para reflexionar sobre por qué formateamos y hacemos linting – no solo cómo.

- **Exploración**: ¿Qué problemas solucionaron el auto-formateo y linting en tu código hoy? ¿Cuáles te sorprendieron?
- **Reflexión**: Prettier tiene opiniones. ¿Quién establece esas opiniones? ¿Cuándo es apropiado anular una regla y por qué?
- **Conceptualización**: ¿Cómo el formateo y linting moldean la colaboración y autoría en un equipo? ¿Qué valores codifican estas herramientas (ej., consistencia sobre estilo personal)?
- **Producción**: Documenta tus reglas elegidas (.prettierrc, linters). ¿Qué compensaciones hiciste (ej., longitud de línea, estilo de comillas)?
- **Exhibición**: Antes de publicar, ejecuta `npm run format:check && npm run lint`. ¿Qué problemas quedan y qué priorizarías corregir para tu audiencia?

---

## Secuenciación Sugerida para Estudiantes

1. **Comienza con la Ruta A** (extensiones de VS Code) para resultados inmediatos
2. **Muévete a la Ruta B** (Node.js) cuando necesites automatización o flujos de trabajo en equipo
3. **Mantén las configuraciones simples** - comienza con valores por defecto, personaliza solo cuando sea necesario
4. **Enfócate en una herramienta a la vez** - no trates de configurar todo de una vez

---

## Referencias

- Prettier: `https://prettier.io/`
- ESLint: `https://eslint.org/`
- Stylelint: `https://stylelint.io/`
- HTMLHint: `https://htmlhint.com/`
- markdownlint: `https://github.com/DavidAnson/markdownlint`
- YAML (Red Hat extension): `https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml`