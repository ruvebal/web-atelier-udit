---
layout: lesson
title: 'Fundamentos de React: bloques de construcción de UI moderna'
slug: react-fundamentals
category: react
tags: [react, componentes, estado, principiante, todo]
week: 4
phase: 2
sprint: 5
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/react/react-fundamentals/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> _"Un componente es un compromiso: dados estos props, renderizaré esta UI."_

---

## 🎯 Objetivo de la sesión (2 horas)

**Al final de esta sesión**: Construir una aplicación de lista de tareas que demuestre:

1. **Componentes**: Dividir la UI en piezas reutilizables
2. **Estado**: Hacer que tu aplicación recuerde y actualice datos
3. **Keys**: Ayudar a React a rastrear elementos de lista eficientemente

**Lo que construirás**: Una aplicación de tareas donde puedes añadir, eliminar y marcar tareas como completadas.

---

## 🧭 Requisitos previos

- Conocimientos básicos de HTML/CSS/JavaScript
- Node.js instalado (para Vite)
- Un editor de código (VS Code recomendado)
- Tailwind CSS (lo configuraremos juntos)

---

## 🚀 Configuración (10 minutos)

### Paso 1: Crear proyecto React con Vite

```bash
# Crear nuevo proyecto
npm create vite@latest my-app-repo -- --template react

# Navegar al proyecto
cd my-app-repo

# Instalar dependencias
npm install

# Instalar Tailwind CSS v4 using Vite

npm install tailwindcss @tailwindcss/vite

```

### Paso 2: Configurar Vite para Tailwind v4

Edita `vite.config.js`:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [react(), tailwindcss()],
});
```

### Paso 3: Añadir Tailwind al CSS

Edita `src/index.css` (reemplaza todo el contenido):

```css
@import 'tailwindcss';
```

### Paso 4: Crear directorio de componentes

```bash
mkdir src/components
```

### Paso 5: Iniciar servidor de desarrollo

```bash
npm run dev
```

Visita `http://localhost:5173` — deberías ver la pantalla de bienvenida de Vite.

---

## 📦 La aplicación de tareas completa

### Estructura de archivos final

```
src/
├── components/
│   ├── TaskList.jsx     (muestra todas las tareas)
│   ├── TaskItem.jsx     (componente de tarea individual)
│   └── AddTaskInput.jsx (input para añadir nuevas tareas)
├── App.jsx          (componente principal con estado)
└── main.jsx         (punto de entrada)
```

### Crear directorio de componentes

```bash
mkdir src/components
```

---

## 🧱 Construyendo bloque por bloque

### 1. Entendiendo los componentes (Concepto)

**¿Qué es un componente?**

Un componente es una **función que devuelve JSX** (sintaxis similar a HTML). Piensa en él como una etiqueta HTML personalizada.

```jsx
// Esto es un componente
function Greeting() {
	return <h1>¡Hola, Mundo!</h1>;
}

// Lo usas así:
<Greeting />;
```

**¿Por qué componentes?**

- **Reutilización**: Escribe una vez, usa muchas veces
- **Organización**: Cada componente tiene un trabajo
- **Mantenibilidad**: Fácil de encontrar y corregir errores

---

### 2. El componente App principal

**Archivo: `src/App.jsx`**

Este es el "cerebro" de nuestra aplicación. Contiene el **estado** (los datos) y los pasa a los componentes hijos.

```jsx
import { useState } from 'react';
import TaskList from './components/TaskList';
import AddTaskInput from './components/AddTaskInput';

function App() {
	// ESTADO: La lista de tareas (esta es la memoria de nuestra app)
	const [tasks, setTasks] = useState([
		{ id: 1, text: 'Aprender fundamentos de React', completed: false },
		{ id: 2, text: 'Construir una app de tareas', completed: false },
	]);

	// FUNCIÓN: Añadir una nueva tarea
	const addTask = (text) => {
		const newTask = {
			id: Date.now(), // ID único simple
			text: text,
			completed: false,
		};
		setTasks([...tasks, newTask]); // Añadir a las tareas existentes
	};

	// FUNCIÓN: Eliminar una tarea
	const removeTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	// FUNCIÓN: Alternar completado de tarea
	const toggleTask = (id) => {
		setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">📝 Mi lista de tareas</h1>

				<AddTaskInput onAdd={addTask} />

				<TaskList tasks={tasks} onRemove={removeTask} onToggle={toggleTask} />

				<div className="mt-6 text-center text-sm text-gray-600">
					Total: {tasks.length} tareas | Completadas: {tasks.filter((t) => t.completed).length}
				</div>
			</div>
		</div>
	);
}

export default App;
```

**🔑 Conceptos clave aquí:**

1. **`useState`**: Crea una pieza de estado (datos que pueden cambiar)
   - `tasks` = valor actual
   - `setTasks` = función para actualizarlo
2. **Las actualizaciones de estado son inmutables**: Creamos nuevos arrays, no modificamos los existentes
3. **Props hacia abajo, eventos hacia arriba**: Pasamos datos hacia abajo y funciones hacia abajo (para ser llamadas por los hijos)

**📚 Métodos de arrays de JavaScript utilizados:**

- **Operador spread (`...`)**: Crea un nuevo array/objeto copiando valores existentes
  - `[...tasks, newTask]` → copia todas las tareas, luego añade una nueva
  - `{ ...task, completed: !task.completed }` → copia el objeto tarea, actualiza una propiedad
  - [MDN: Sintaxis spread](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

- **`.filter()`**: Crea un nuevo array con elementos que pasan una prueba
  - `tasks.filter(task => task.id !== id)` → mantiene solo las tareas que no coinciden con el ID
  - `tasks.filter(t => t.completed)` → mantiene solo las tareas completadas
  - [MDN: Array.filter()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

- **`.map()`**: Crea un nuevo array transformando cada elemento
  - `tasks.map(task => ...)` → crea nuevo array, puede modificar cada tarea
  - Devuelve un array de la misma longitud, pero los elementos pueden cambiar
  - [MDN: Array.map()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

---

### 3. El componente lista de tareas (Empezar simple: solo lectura)

**Archivo: `src/components/TaskList.jsx`**

Empecemos con el componente **más simple**: mostrar una lista. Sin edición todavía, solo mostrando tareas.

```jsx
import TaskItem from './TaskItem';

function TaskList({ tasks, onRemove, onToggle }) {
	// Si no hay tareas, mostrar un mensaje amigable
	if (tasks.length === 0) {
		return (
			<div className="text-center py-12 text-gray-500">
				<p className="text-lg">¡Aún no hay tareas. Añade una arriba! 👆</p>
			</div>
		);
	}

	// Renderizar cada tarea usando .map()
	return (
		<div className="space-y-2">
			{tasks.map((task) => (
				<TaskItem key={task.id} task={task} onRemove={onRemove} onToggle={onToggle} />
			))}
		</div>
	);
}

export default TaskList;
```

**🔑 Conceptos clave aquí:**

1. **Renderizado condicional**: Mostrar diferente UI según el estado
   - `if (tasks.length === 0)` comprueba si el array está vacío
   - Devuelve diferente JSX según la condición

2. **Listas con `.map()`**: Transforma array en elementos React
   - `tasks.map(task => ...)` transforma cada tarea en un componente `<TaskItem />`
   - Devuelve un array de elementos React que React renderiza
   - [MDN: Array.map()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

3. **Keys**: Cada `TaskItem` necesita un prop `key` único
   - `key={task.id}` usa el ID único de la tarea
   - Ayuda a React a rastrear qué elementos cambiaron (más sobre esto abajo)

---

### 4. El componente input de añadir tarea (Simplificado: sin formulario)

**Archivo: `src/components/AddTaskInput.jsx`**

Este componente maneja la entrada del usuario. Usaremos un input + botón simple (sin envoltorio `<form>`).

```jsx
import { useState } from 'react';

function AddTaskInput({ onAdd }) {
	const [inputValue, setInputValue] = useState('');

	const handleAdd = () => {
		if (inputValue.trim()) {
			onAdd(inputValue); // Llamar función del padre
			setInputValue(''); // Limpiar input
		}
	};

	const handleKeyDown = (e) => {
		// Permitir tecla Enter para añadir tarea (como haría un formulario)
		if (e.key === 'Enter') {
			handleAdd();
		}
	};

	return (
		<div className="mb-6 flex gap-2">
			{/* onChange: Se dispara cada vez que el usuario escribe
          e = objeto evento (contiene info sobre lo que pasó)
          e.target = el elemento DOM que disparó el evento (este input)
          e.target.value = el texto actual escrito en el input */}
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder="¿Qué necesitas hacer?"
				className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
			/>
			<button
				onClick={handleAdd}
				className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
				Añadir
			</button>
		</div>
	);
}

export default AddTaskInput;
```

**🔑 Conceptos clave aquí:**

1. **Input controlado**: React controla el valor del input (no el DOM)
   - El `value` del input viene del estado (`inputValue`)
   - Cada pulsación de tecla actualiza el estado vía `onChange`
   - React re-renderiza con el nuevo valor

2. **Manejadores de eventos**: `onChange`, `onClick`, y `onKeyDown`
   - **`onChange`**: Se dispara cada vez que el usuario escribe
     - `e` = el objeto evento (contiene información sobre lo que pasó)
     - `e.target` = el elemento DOM que disparó el evento (el campo input)
     - `e.target.value` = el texto actual en ese campo input
     - `(e) => setInputValue(e.target.value)` lee el texto actual del input y actualiza el estado
     - Actualiza el estado inmediatamente, creando una conexión "en vivo"
     - [MDN: Event.target](https://developer.mozilla.org/es/docs/Web/API/Event/target)
     - [MDN: Evento onChange](https://developer.mozilla.org/es/docs/Web/API/HTMLElement/change_event)
   - **`onClick`**: Se dispara cuando se hace clic en el botón
     - Más simple que `onSubmit` (no necesita `preventDefault()`)
     - [MDN: Evento click](https://developer.mozilla.org/es/docs/Web/API/Element/click_event)
   - **`onKeyDown`**: Se dispara cuando se presiona una tecla
     - `e.key === 'Enter'` comprueba si se presionó Enter
     - Permite interacción solo con teclado (¡accesibilidad!)
     - [MDN: Evento keydown](https://developer.mozilla.org/es/docs/Web/API/Element/keydown_event)

3. **Props**: `onAdd` es una función pasada desde el padre

---

### 5. El componente elemento de tarea (Simplificado: sin modo edición)

**Archivo: `src/components/TaskItem.jsx`**

Este componente representa una tarea individual. Lo mantenemos simple: solo mostrar, alternar y eliminar.

```jsx
function TaskItem({ task, onRemove, onToggle }) {
	return (
		<div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
			{/* Checkbox para alternar completado */}
			<input
				type="checkbox"
				checked={task.completed}
				onChange={() => onToggle(task.id)}
				className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
			/>

			{/* Texto de tarea (tachado si está completada) */}
			<span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.text}</span>

			{/* Botón eliminar */}
			<button
				onClick={() => onRemove(task.id)}
				className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
				Eliminar
			</button>
		</div>
	);
}

export default TaskItem;
```

**🔑 Conceptos clave aquí:**

1. **Componente simple**: No necesita estado local (más simple para principiantes)
2. **Estilos condicionales**: Usa template literals para aplicar diferentes clases
3. **Propagación de eventos**: Los botones llaman funciones del padre vía props (`onToggle`, `onRemove`)

---

## 🔑 Profundización: Por qué importan las keys

### El problema sin keys

Cuando React renderiza una lista, necesita saber qué elementos cambiaron. Sin keys, React usa el índice del array, lo que causa errores:

```jsx
// ❌ MAL: Usar índice como key
{
	tasks.map((task, index) => <TaskItem key={index} task={task} />);
}
```

**¿Qué sale mal?**

1. Eliminar elemento 2 → React piensa que el elemento 3 es ahora el elemento 2
2. Reordenar elementos → React se confunde sobre qué componente es cuál
3. El estado del input se mezcla entre elementos

### La solución: Keys únicas

```jsx
// ✅ BIEN: Usar ID único como key
{
	tasks.map((task) => <TaskItem key={task.id} task={task} />);
}
```

**Por qué funciona:**

- Cada tarea tiene un `id` estable y único
- React puede rastrear qué elemento es cuál, incluso si cambia el orden
- El estado del componente (como `isEditing`) permanece con el elemento correcto

**Regla general:** Usa un identificador único de tus datos, no el índice del array.

---

## 🧠 Entendiendo la gestión de estado

### ¿Qué es el estado?

El estado son **datos que cambian con el tiempo**. En nuestra app:

- Array `tasks` (en `App.jsx`) — compartido por múltiples componentes
- `inputValue` (en `AddTaskForm.jsx`) — local al formulario
- `isEditing` (en `TaskItem.jsx`) — local a cada tarea

### ¿Dónde debe vivir el estado?

**Regla:** Pon el estado en el **ancestro común más bajo** de los componentes que lo necesitan.

```
App (estado tasks aquí - tanto TaskList como stats lo necesitan)
├── AddTaskForm (inputValue aquí - solo el formulario lo necesita)
└── TaskList
    └── TaskItem (isEditing aquí - solo este elemento lo necesita)
```

### Cómo actualizar el estado

**Nunca mutes el estado directamente:**

```jsx
// ❌ MAL
tasks.push(newTask);
setTasks(tasks);

// ✅ BIEN
setTasks([...tasks, newTask]);
```

**¿Por qué?** React compara el estado antiguo y nuevo por referencia. Si mutas, React piensa que nada cambió.

**El operador spread (`...`) crea un nuevo array:**

- `[...tasks, newTask]` copia todas las tareas existentes en un nuevo array, luego añade la nueva tarea
- Esto crea una nueva referencia, así React sabe que el estado cambió
- [MDN: Sintaxis spread](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

---

## 🎨 Entendiendo la componentización

### ¿Por qué dividir en componentes?

Nuestra app tiene 4 componentes. Podríamos escribirlo todo en un archivo, pero:

1. **Responsabilidad única**: Cada componente hace una cosa
   - `App` → gestiona el estado
   - `AddTaskForm` → maneja la entrada
   - `TaskList` → muestra la lista
   - `TaskItem` → muestra una tarea

2. **Reutilización**: `TaskItem` se usa una vez por tarea

3. **Testabilidad**: Fácil de probar cada pieza independientemente

4. **Mantenibilidad**: ¿Error en la edición? Mira `TaskItem`.

### Props: La API del componente

Los props son cómo los componentes se comunican entre sí:

```jsx
// El padre pasa datos hacia abajo
<TaskItem
	task={task} // datos
	onRemove={removeTask} // función
/>;

// El hijo recibe vía props
function TaskItem({ task, onRemove }) {
	// Usa task.text, llama onRemove(task.id)
}
```

**Los props son de solo lectura.** El hijo no puede modificarlos.

---

## 💭 Preguntas de reflexión

> 💭 **Pregunta 1: Ubicación del estado**
>
> ¿Por qué está el estado `tasks` en `App.jsx` y no en `TaskList.jsx`?
>
> **Pista:** ¿Quién más necesita saber sobre las tareas?

> 💭 **Pregunta 2: Keys**
>
> ¿Qué pasaría si usaras `Math.random()` como key en lugar de `task.id`?
>
> **Pista:** Las keys deben ser estables entre renderizados.

> 💭 **Pregunta 3: Inmutabilidad**
>
> ¿Por qué escribimos `setTasks([...tasks, newTask])` en lugar de `tasks.push(newTask)`?
>
> **Pista:** React necesita detectar cambios.

---

## 🧪 Ejercicios (Opcional)

### Ejercicio 1: Añadir botón "Limpiar completadas"

Añade un botón que elimine todas las tareas completadas.

**Pista:**

```jsx
const clearCompleted = () => {
	setTasks(tasks.filter((task) => !task.completed));
};
```

### Ejercicio 2: Añadir prioridad de tarea

Añade un campo `priority` (baja, media, alta) y colorea las tareas según la prioridad.

### Ejercicio 3: Persistir en localStorage

Guarda las tareas en `localStorage` para que sobrevivan al refresco de página.

**Pista:** Usa `useEffect` para sincronizar el estado con localStorage.

---

## 📚 Conclusiones clave

### Componentes

- Funciones que devuelven JSX
- Dividen la UI en piezas reutilizables
- Reciben datos vía props

### Estado

- Datos que cambian con el tiempo
- Usa el hook `useState`
- Nunca mutes directamente — crea nuevos arrays/objetos
- Usa métodos de arrays: `.map()`, `.filter()`, y operador spread `...`
  - [MDN: Array.map()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
  - [MDN: Array.filter()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
  - [MDN: Sintaxis spread](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

### Keys

- Deben ser únicas y estables
- Ayudan a React a rastrear elementos de lista
- Usa IDs de datos, no índice del array

### Flujo de datos

- Los props fluyen hacia abajo (padre → hijo)
- Los eventos fluyen hacia arriba (hijo llama función del padre)
- El estado vive en el ancestro común

---

## 🔗 Próximos pasos

Después de dominar esto, estás listo para:

1. **Profundización en Hooks** (`useEffect`, `useRef`, hooks personalizados)
2. **Arquitectura de estado** (Context, reducers, Zustand)
3. **Enrutamiento** (React Router para apps multipágina)
4. **Integración con backend** (obtener datos de APIs)

---

## 🧘 Koan

> _"Un componente sin estado es una función pura. Un componente con estado es algo vivo."_

---

## 📖 Lecturas adicionales

- [Documentación React: Pensar en React](https://es.react.dev/learn/thinking-in-react)
- [Documentación React: El estado como una instantánea](https://es.react.dev/learn/state-as-a-snapshot)
- [Documentación React: Renderizar listas](https://es.react.dev/learn/rendering-lists)
