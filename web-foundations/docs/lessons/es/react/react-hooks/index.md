---
layout: lesson
title: 'Dominio de hooks: el motor de la interactividad'
slug: react-hooks
category: react
tags: [react, hooks, useState, useEffect, useMemo, useCallback, custom-hooks, fetch-api]
week: 5
phase: 2
sprint: 6
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/react/react-hooks/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> _"Un hook es un portal entre el mundo declarativo de React y el mundo imperativo de los efectos."_

---

## 🎯 Objetivo del sprint

**Al finalizar este sprint**: transformar tus componentes estáticos en elementos interactivos “vivos” con estado, efectos y patrones de lógica reutilizable.

---

## 📍 Posición en el viaje

| Sprint          | Enfoque                 | Tu app crece                         |
| --------------- | ----------------------- | ------------------------------------ |
| 5. Fundamentos  | Componentes, JSX, Props | Esqueleto de librería de componentes |
| **→ 6. Hooks**  | Estado y efectos        | Componentes interactivos             |
| 7. Arquitectura | Estado global           | Features conectadas                  |
| 8. Routing      | Navegación              | Estructura multipágina               |

---

## 🧭 Objetivos de aprendizaje

Al final de esta lección:

- Habrás repasado (o tendrás a mano) el concepto de **Promise** ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)) como base de `fetch` y `async/await`
- Conocerás la **Fetch API** del navegador (`fetch`, `Response`, `AbortController`) como base de las peticiones HTTP en el hook `useFetch`
- Usarás `useState` para estado local
- Dominarás `useEffect` para side effects y cleanup
- Aplicarás `useRef` para acceso al DOM y valores mutables
- Optimizarás con `useMemo` y `useCallback`
- Extraerás lógica reutilizable en **custom hooks**
- Evitarás pitfalls típicos (closures obsoletos, bucles infinitos)

---

## 🏗️ Qué construiremos este sprint

### Custom hooks para tu app

```javascript
// Hooks que crearás en este sprint:

useFetch(url); // → { data, loading, error }
useLocalStorage(key); // → [value, setValue]
useDebounce(value, delay); // → debouncedValue
useToggle(initial); // → [state, toggle, setTrue, setFalse]
useForm(initialValues); // → { values, handleChange, reset }
```

Estos hooks **impulsarán toda tu aplicación**.

---

## 🔧 Puntos de integración

| Fuente de datos   | Uso del hook                                             |
| ----------------- | -------------------------------------------------------- |
| **Laravel API**   | `useFetch` para GET, `useMutation` custom para POST      |
| **Hygraph CMS**   | Patrón `useQuery` para GraphQL (Apollo o custom)         |
| **Local Storage** | `useLocalStorage` para persistencia (tema, preferencias) |

### Preview: patrón de integración con API

```javascript
// Hook de este sprint...
const { data, loading, error } = useFetch('/api/products');

// ...te prepara para el próximo sprint con React Query
const { data, isLoading, error } = useQuery(['products'], fetchProducts);
```

---

## ⏭️ Adelanto: React Query (TanStack Query) para datos remotos

En esta lección aprendemos el “motor” (hooks + efectos). En el siguiente sprint daremos el salto a **React Query** (TanStack Query) para estandarizar el fetching en apps reales.

### Qué mejora frente a `useFetch`

- **Caché** automática por `queryKey` (no vuelves a pedir lo mismo si ya está fresco).
- **Reintentos** configurables y estado de error consistente.
- **Deduplicación**: si 2 componentes piden lo mismo, comparte la petición.
- **Background refresh**: refetch al volver al tab, al reconectar, etc.
- **Estados más ricos**: `isLoading`, `isFetching`, `isError`, `isSuccess`, `status`.

> Idea clave: `useFetch` te enseña el patrón. React Query lo convierte en una “infra” estable.

### Setup mínimo (cuando lo usemos)

En tu entrypoint (`main.jsx` / `index.jsx`) envuelves la app con `QueryClientProvider`.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 2,
			staleTime: 30_000,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);
```

### Patrón recomendado: `useQuery` consume un servicio (no `fetch` directo)

Igual que en `useFetch`, separaremos responsabilidades:

- **Servicio**: “cómo” se llama a la API (URL, headers, validación, parseo).
- **Hook** (`useQuery`): “cuándo” se llama, caché, reintentos, estados.
- **Componente**: UI.

```jsx
// services/posts.js
export async function fetchPosts(signal) {
	const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', { signal });
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json();
}
```

```jsx
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from './services/posts';

export function Posts() {
	const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
		queryKey: ['posts', { limit: 5 }],
		queryFn: ({ signal }) => fetchPosts(signal),
	});

	if (isLoading) return <p>Cargando…</p>;
	if (isError) return <p>Error: {error.message}</p>;

	return (
		<section>
			<button onClick={() => refetch()} disabled={isFetching}>
				{isFetching ? 'Actualizando…' : 'Refetch'}
			</button>
			<ul>
				{data.map((p) => (
					<li key={p.id}>{p.title}</li>
				))}
			</ul>
		</section>
	);
}
```

### Pruébalo en StackBlitz (React Query)

**Sandbox:** **[→ Nuevo proyecto React en StackBlitz](https://stackblitz.com/fork/react)**

1. Añade la dependencia `@tanstack/react-query` (en StackBlitz: “Dependencies” → busca y añade).
2. En `main.jsx` pega el setup de `QueryClientProvider`.
3. Crea `src/services/posts.js` y pega `fetchPosts`.
4. En `App.jsx` renderiza el componente `Posts`.

> Si el objetivo es docencia: compara el render al cambiar de pestaña / refrescar. Verás que la caché reduce peticiones y el estado `isFetching` diferencia “cargando por primera vez” de “actualizando en background”.

## 🔑 Conceptos clave: useRef y cleanup en useEffect

Antes de construir custom hooks, conviene tener claros dos patrones que usarás una y otra vez.

### useRef: acceso al DOM y valores que no disparan re-render

**useRef** devuelve un objeto `{ current: valor }` que se conserva entre renders.

- **Acceso al DOM:** puedes guardar una referencia a un nodo (por ejemplo el `<input>` de “nueva tarea”) y usarla de forma imperativa: por ejemplo `inputRef.current.focus()` (`.current` es la propiedad donde useRef guarda el valor—aquí, el nodo DOM) para devolver el foco después de enviar un formulario. No necesitas estado para eso: leer o escribir `.current` **no** provoca un re-render.

- **Valores que no disparan re-render:** si guardas en `.current` algo que debe persistir entre renders pero no debe redibujar la UI (por ejemplo el último `AbortController` de un fetch, un id de timer o un flag “¿es la primera vez?”), React no re-renderiza cuando cambias `.current`. Por eso useRef sirve para “valores mutables que no son parte de la UI”.

En resumen: **useRef** = referencia estable al DOM o a un valor que debe vivir entre renders sin provocar re-render.

[Diferencias entre useRef y useEffect – React Dev](https://react.dev/learn/referencing-values-with-refs#differences-between-refs-and-state)

### useEffect con cleanup (timers, suscripciones)

**useEffect** puede devolver una función. Esa función es el **cleanup**: React la ejecuta cuando el componente se desmonta o antes de volver a ejecutar el efecto (por cambio de dependencias).

- **Timers:** si en un efecto usas `setTimeout` o `setInterval`, sin cleanup el timer sigue activo aunque el componente ya no esté en pantalla → memory leaks y posibles actualizaciones de estado en un componente desmontado. Por eso en hooks como `useDebounce` verás `return () => clearTimeout(handler);` para cancelar el timer al desmontar o cuando cambian las dependencias.

- **Suscripciones:** lo mismo con suscripciones (eventos, WebSockets, observables): el cleanup debe “darse de baja” (`removeEventListener`, `unsubscribe`, etc.) para no dejar listeners activos.

En una frase: **cleanup** = “deshacer” lo que hizo el efecto (cancelar timers, desuscribirse) para no dejar trabajo colgado ni actualizar estado en componentes desmontados.

---

## 🌐 La Fetch API: base de useFetch

Antes de encapsular la lógica en un hook, conviene entender **qué hace el navegador** cuando pedimos datos por HTTP. El hook `useFetch` que construirás usa por debajo la [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch): la interfaz nativa del navegador para hacer peticiones y leer respuestas.

**Prerequisito: Entender Promises**

`fetch` devuelve una **Promise**. Si necesitas repasar este concepto antes de continuar, aquí tienes los fundamentos:

**¿Qué es una Promise?**

Una Promise es un **objeto nativo de JavaScript** que representa una operación asíncrona. Puede estar en tres estados:

- `pending` (pendiente): la operación aún no ha terminado
- `fulfilled` (cumplida): la operación terminó con éxito
- `rejected` (rechazada): la operación falló

**Tres conceptos que debes distinguir:**

1. **Objeto Promise**: representa un valor futuro; tiene métodos como `.then()` y `.catch()`
2. **Función `async`**: declara una función que siempre devuelve una Promise
3. **Operador `await`**: pausa la ejecución hasta que la Promise se resuelve (solo funciona dentro de funciones `async`)

**Dos formas de trabajar con Promises:**

```javascript
// Forma 1: Usando .then() (estilo tradicional)
fetch('/api/data')
	.then((response) => response.json())
	.then((data) => console.log(data))
	.catch((error) => console.error(error)); // Captura errores

// Forma 2: Usando async/await (estilo moderno, más legible)
async function getData() {
	try {
		// Bloque try: código que puede fallar
		const response = await fetch('/api/data');
		const data = await response.json();
		console.log(data);
	} catch (error) {
		// Bloque catch: se ejecuta si hay algún error en try
		console.error(error);
	}
}
```

**¿Qué hace `try...catch`?**

Es una **estructura de control** para manejar errores:

- **`try { }`**: ejecuta el código que puede fallar (como una petición de red)
- **`catch (error) { }`**: captura cualquier error que ocurra en el bloque `try` y ejecuta código alternativo

**Equivalencia entre las dos formas:**

- `.catch()` en Promises ≈ `catch (error) { }` en async/await
- Ambas capturan errores, pero `try...catch` hace que el código se lea de forma más secuencial

**Recursos para profundizar:**

- [Promise en MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) - Documentación del objeto Promise
- [async function](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function) - Funciones asíncronas
- [await operator](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/await) - Operador de espera
- [.then() method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) - Método para encadenar acciones
- [try…catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#trystatements) – Declaración

### Lo mínimo que necesitas saber sobre `fetch`

Estos cuatro puntos son la base para usar la Fetch API correctamente (y luego construir un hook como `useFetch`).

---

**1. `fetch` devuelve una Promise que casi nunca "falla" por HTTP**

`fetch(url, options?)` es una función global. Devuelve una **Promise** que se resuelve con un objeto **Response** cuando la petición termina — **incluso si el servidor responde 404 o 500**. La Promise solo se rechaza por errores de red (sin conexión, CORS, etc.).

**Consecuencia:** no puedes confiar en que un error HTTP vaya al `.catch()`. Hay que comprobar el estado de la respuesta a mano.

---

**2. Siempre comprueba el estado antes de leer el cuerpo**

Antes de llamar a `response.json()` (o `.text()`, `.blob()`), revisa:

- **`response.ok`** — `true` si el código HTTP está entre 200 y 299
- **`response.status`** — el código numérico (200, 404, 500, etc.)

Si no compruebas y la respuesta es 404 o 500, estarás tratando un error como si fuera éxito (y `response.json()` puede fallar o devolver un cuerpo de error).

---

**3. El cuerpo de la respuesta se consume una sola vez**

`response.json()`, `response.text()` o `response.blob()` devuelven **otra Promise** y leen el cuerpo del Response. Ese cuerpo es un stream: **solo se puede leer una vez**. Si llamas dos veces a `response.json()`, la segunda fallará.

---

**4. Para cancelar la petición: AbortController**

Si el componente se desmonta o la URL cambia antes de que llegue la respuesta, querrás **cancelar** la petición para no actualizar estado en un componente ya desmontado. Para eso se usa la [Web API AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController):

- Creas `new AbortController()`
- Pasas `{ signal: controller.signal }` en las opciones de `fetch`
- Cuando quieras cancelar, llamas a `controller.abort()`

En un hook como `useFetch`, típicamente llamas a `abort()` en la función de cleanup de `useEffect`.

---

**Ejemplo mínimo (sin React)**

Todo lo anterior aplicado en una función reutilizable:

```javascript
async function getData(url) {
	const controller = new AbortController();
	const response = await fetch(url, { signal: controller.signal });

	// Importante: comprobar estado HTTP antes de leer el cuerpo
	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`);
	}

	return response.json(); // El cuerpo se consume una sola vez
}
```

**Nota:** En un componente React no usarías solo esto. Guardarías `controller` para llamar a `controller.abort()` en el cleanup cuando el componente se desmonte o cuando cambie la URL.

---

**Qué añade un hook `useFetch` sobre esto**

Al construir `useFetch` estarás envolviendo esta lógica y añadiendo:

| Concepto            | Qué aporta                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Estado**          | `data`, `loading`, `error` para que el componente pueda renderizar según el estado de la petición.                                                                                                                                                                                                                                                                                           |
| **Cleanup**         | En el unmount (o al cambiar dependencias), llamar a `controller.abort()` para cancelar la petición.                                                                                                                                                                                                                                                                                          |
| **Race conditions** | Si se lanzan varias peticiones (p. ej. el usuario cambia de página rápido), una respuesta antigua puede llegar después que una reciente. Si actualizas el estado con la respuesta antigua, la UI mostrará datos obsoletos. Por eso se cancelan peticiones anteriores o se ignoran respuestas de requests ya "superadas". Ver [Race condition](https://en.wikipedia.org/wiki/Race_condition). |

Para el detalle completo de la Fetch API (métodos, cabeceras, CORS, credenciales, etc.), consulta [Using the Fetch API en MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

---

### Pruébalo en StackBlitz con APIs gratuitas

Puedes practicar **fetch + useEffect** en un sandbox sin instalar nada. [https://stackblitz.com/edit/react-bf4ktrpu?file=src%2FApp.js](https://stackblitz.com/edit/react-bf4ktrpu?file=src%2FApp.js) ejecuta React en el navegador.

**Abre un proyecto React en StackBlitz:**

**[→ Nuevo proyecto React en StackBlitz](https://stackblitz.com/fork/react)**

En el proyecto que se abre, sustituye el contenido de `App.jsx` por el código del bloque siguiente. Después puedes cambiar la URL del `fetch` por cualquiera de las APIs de la tabla para probar distintos datos.

**APIs públicas que funcionan bien (sin API key, CORS permitido):**

| API                            | URL de ejemplo                                                                                 | Qué devuelve                      |
| ------------------------------ | ---------------------------------------------------------------------------------------------- | --------------------------------- |
| **JSONPlaceholder**            | `https://jsonplaceholder.typicode.com/posts?_limit=5`                                          | Lista de posts (título, body, id) |
| **JSONPlaceholder (usuarios)** | `https://jsonplaceholder.typicode.com/users`                                                   | Lista de usuarios                 |
| **ReqRes**                     | `https://reqres.in/api/users?page=1`                                                           | Usuarios con avatar (paginado)    |
| **PokéAPI**                    | `https://pokeapi.co/api/v2/pokemon/pikachu`                                                    | Objeto de un Pokémon              |
| **Open-Meteo**                 | `https://api.open-meteo.com/v1/forecast?latitude=40.42&longitude=-3.70&current=temperature_2m` | Clima actual (JSON)               |

**Código mínimo (pégalo en `App.jsx`):**

```jsx
import React from 'react';
import { useEffect, useState } from 'react';

export default function App() {
	const [data, setData] = useState(null);
	const [status, setStatus] = useState('idle'); // idle | loading | success | error
	const [error, setError] = useState(null);

	useEffect(() => {
		const controller = new AbortController();

		async function load() {
			try {
				setStatus('loading');
				setError(null);

				const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
					signal: controller.signal,
				});

				if (!res.ok) throw new Error(`HTTP ${res.status}`);

				const json = await res.json();
				setData(json);
				setStatus('success');
			} catch (e) {
				if (e?.name === 'AbortError') return;
				setError(e);
				setStatus('error');
			}
		}

		load();
		return () => controller.abort();
	}, []);

	if (status === 'loading') return <p>Cargando…</p>;
	if (status === 'error') return <p>Error: {error?.message ?? 'Error desconocido'}</p>;

	return (
		<main style={{ fontFamily: 'system-ui', padding: 16 }}>
			<h1>Fetch con useEffect</h1>
			<ul>
				{(data ?? []).map((post) => (
					<li key={post.id}>
						<strong>{post.title}</strong>
					</li>
				))}
			</ul>
		</main>
	);
}
```

**Qué hacer en el sandbox:**

1. Abre el enlace de StackBlitz de arriba (o crea un proyecto “React” en [stackblitz.com](https://stackblitz.com)).
2. Sustituye la URL del `fetch` por otra de la tabla (por ejemplo PokéAPI o ReqRes).
3. Ajusta el render: si la API devuelve un objeto (p. ej. Pokémon), muestra `data.name` en lugar de `data.map(...)`.
4. Comprueba estados: usa una URL errónea para ver el mensaje de error.

Así ves en vivo el ciclo **loading → success/error** y el uso de **cleanup** con `AbortController` antes de pasar al custom hook `useFetch`.

## 🎓 Metodología: práctica atelier

### Ritmo del sprint

```
┌─────────────────────────────────────────────────────────┐
│ DÍA 1: Deep dive en hooks core                           │
│   • Patrones useState: primitivos, objetos, arrays       │
│   • Ciclo de vida useEffect: mount, update, unmount      │
│   • Debug en vivo: React DevTools, consola               │
├─────────────────────────────────────────────────────────┤
│ DÍA 2: Taller de custom hooks                            │
│   • Construir `useFetch` paso a paso                     │
│   • Equipos crean 2-3 hooks para su app                  │
│   • Práctica IA: generar tests de hooks con Copilot      │
├─────────────────────────────────────────────────────────┤
│ DÍA 3: Integración y pulido                              │
│   • Conectar hooks a componentes del sprint 5            │
│   • Estados loading/error en la UI                       │
│   • Peer review: ¿hooks single-responsibility?           │
└─────────────────────────────────────────────────────────┘
```

### Protocolo de desarrollo asistido por IA

#### Prompts concretos para hooks

```markdown
✅ BUEN PROMPT:
"Crea un custom hook useFetch que:

1. Acepte una URL y opciones opcionales de fetch
2. Devuelva { data, loading, error, refetch }
3. Gestione race conditions (ignora requests antiguas)
4. Haga cleanup al desmontar
5. Devuelva un objeto con data, loading, error y refetch"

❌ MAL PROMPT:
"Haz un fetch hook"

✅ PROMPT DE VALIDACIÓN:
"Revisa este useEffect para:

1. Dependencias faltantes que puedan causar bugs
2. Memory leaks (falta cleanup)
3. Riesgo de bucle infinito
4. Race conditions en operaciones async"

🔍 CUÁNDO NO USAR IA:

- Depurar closures obsoletos (requiere comprensión profunda)
- Decidir entre useCallback y useMemo (hay que perfilar)
- Entender por qué useEffect corre dos veces en dev (React fundamentals)
```

| Tarea                             | Rol de la IA           | Tu rol                   |
| --------------------------------- | ---------------------- | ------------------------ |
| Depurar dependencias en useEffect | Explicar el warning    | Entender el _por qué_    |
| Generar esqueleto de hook         | Scaffold de estructura | Añadir manejo de errores |
| Escribir tests de hooks           | Borrador de casos      | Verificar edge cases     |
| Optimizar re-renders              | Sugerir memoización    | Perfilar antes/después   |

---

## 💡 Custom hooks listos para producción

### Ejemplo 1: useFetch (buenas prácticas)

El siguiente hook usa la [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) que vimos arriba y le añade estado de React, cleanup con `AbortController` y manejo de race conditions.

```javascript
// hooks/useFetch.js
import { useState, useEffect, useRef } from 'react';

export function useFetch(url, options) {
	const [state, setState] = useState({
		data: null,
		loading: true,
		error: null,
	});

	// Tracking del último request para manejar race conditions
	const abortControllerRef = useRef(null);

	const fetchData = async () => {
		// Cancelar request anterior si sigue pendiente
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}

		// El operador new crea nuevo abort controller para este request
		// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/new
		const abortController = new AbortController();
		abortControllerRef.current = abortController;

		// Estás pasando como Callback a setState una función anónima
		// donde prev es el parámetro que recibe el estado actual para poder
		// copiarlo y actualizarlo de forma segura con un Spread Operator:
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

		setState((prev) => ({ ...prev, loading: true, error: null }));

		try {
			const response = await fetch(url, {
				...options,
				signal: abortController.signal,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			// Solo actualiza si el request no fue abortado
			if (!abortController.signal.aborted) {
				setState({ data, loading: false, error: null });
			}
		} catch (error) {
			// Ignorar AbortError
			if (error instanceof Error && error.name === 'AbortError') {
				return;
			}

			setState({
				data: null,
				loading: false,
				error: error instanceof Error ? error : new Error('Unknown error'),
			});
		}
	};

	useEffect(() => {
		fetchData();

		// Cleanup: abortar al desmontar
		return () => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, [url]); // Re-fetch si cambia la URL

	return { ...state, refetch: fetchData };
}
```

**Uso:**

```javascript
function ProductList() {
	const { data, loading, error, refetch } = useFetch('/api/products');

	if (loading) return <Spinner />;
	if (error) return <ErrorMessage error={error} onRetry={refetch} />;
	if (!data) return null;

	return (
		<div>
			<button onClick={refetch}>Actualizar</button>
			{data.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}
```

#### Pruébalo en StackBlitz (useFetch)

**Sandbox:** **[https://stackblitz.com/edit/vitejs-vite-bcvzeelp?file=src%2FApp.jsx](https://stackblitz.com/edit/vitejs-vite-bcvzeelp?file=src%2FApp.jsx)**

En StackBlitz crea 2 archivos:

- `src/hooks/useFetch.js`
- `src/App.jsx` (reemplaza el contenido)

Pega este hook en `src/hooks/useFetch.js` (idéntico al de arriba):

```javascript
import { useEffect, useRef, useState } from 'react';

export function useFetch(url, options) {
	const [state, setState] = useState({
		data: null,
		loading: true,
		error: null,
	});

	const abortControllerRef = useRef(null);

	const fetchData = async () => {
		if (abortControllerRef.current) abortControllerRef.current.abort();

		const abortController = new AbortController();
		abortControllerRef.current = abortController;

		setState((prev) => ({ ...prev, loading: true, error: null }));

		try {
			const response = await fetch(url, {
				...options,
				signal: abortController.signal,
			});

			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

			const data = await response.json();

			if (!abortController.signal.aborted) {
				setState({ data, loading: false, error: null });
			}
		} catch (error) {
			if (error instanceof Error && error.name === 'AbortError') return;
			setState({
				data: null,
				loading: false,
				error: error instanceof Error ? error : new Error('Unknown error'),
			});
		}
	};

	useEffect(() => {
		fetchData();
		return () => abortControllerRef.current?.abort();
	}, [url]); // Re-fetch si cambia la URL

	return { ...state, refetch: fetchData };
}
```

Pega este demo en `src/App.jsx`:

```jsx
import { useState } from 'react';
import { useFetch } from './hooks/useFetch';

const ENDPOINTS = {
	posts: 'https://jsonplaceholder.typicode.com/posts?_limit=5',
	users: 'https://jsonplaceholder.typicode.com/users',
	reqres: 'https://reqres.in/api/users?page=1',
	pokemon: 'https://pokeapi.co/api/v2/pokemon/pikachu',
	meteo: 'https://api.open-meteo.com/v1/forecast?latitude=40.42&longitude=-3.70&current=temperature_2m',
};

export default function App() {
	const [key, setKey] = useState('posts');
	const { data, loading, error, refetch } = useFetch(ENDPOINTS[key]);

	return (
		<main style={{ fontFamily: 'system-ui', padding: 16 }}>
			<h1>Demo: useFetch</h1>

			<label>
				Endpoint:{' '}
				<select value={key} onChange={(e) => setKey(e.target.value)}>
					{Object.keys(ENDPOINTS).map((k) => (
						<option key={k} value={k}>
							{k}
						</option>
					))}
				</select>
			</label>

			<button style={{ marginLeft: 8 }} onClick={refetch}>
				Refetch
			</button>

			{loading && <p>Cargando…</p>}
			{error && <p>Error: {error.message}</p>}

			<pre style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
		</main>
	);
}
```

**Qué observar:** cambia el `<select>` varias veces (dispara nuevos fetch), usa “Refetch”, y mira cómo el cleanup evita actualizar estado desde requests abortados.

> **Mejoras de este sandbox (useFetch) frente al primer sandbox (fetch mínimo)**
>
> Este segundo sandbox es “más real” y se parece más a cómo trabajarás en una app:
>
> - **Reutilización**: extrae la lógica a un hook (`useFetch`) en lugar de repetir `useEffect + fetch` en cada componente.
> - **Cancelación y cleanup consistente**: aborta el request anterior al lanzar uno nuevo y al desmontar (evita warnings y estados “tarde”).
> - **Race conditions controladas**: al abortar requests anteriores, reduces el riesgo de que una respuesta antigua sobrescriba datos nuevos.
> - **API de consumo clara**: el componente solo usa `{ data, loading, error, refetch }` y se centra en UI.
>
> **¿Por qué usamos `useRef` aquí?**
>
> `useRef` nos da un contenedor estable (`abortControllerRef.current`) que **persiste entre renders** sin provocar re-render cuando cambia. Es ideal para guardar “cosas imperativas” como el `AbortController` del request en curso, para poder abortarlo desde:
>
> - el siguiente `fetchData()` (cuando cambia la URL o el usuario pulsa “Refetch”)
> - el cleanup del `useEffect` (cuando el componente se desmonta)
>
> Si esto fuese estado (`useState`), cada asignación del controller causaría renders innecesarios y complicaría el flujo.
>
> **¿Qué pinta `instanceof` en el `catch`?**
>
> En JS, `catch (error)` puede capturar **cualquier valor** (no siempre un `Error`). Por eso se usa:
>
> - `error instanceof Error`: para asegurarnos de que tiene propiedades estándar como `.name` y `.message`.
> - `error.name === 'AbortError'`: para **ignorar** el error esperado cuando cancelamos un fetch con `AbortController`.
>
> Así evitamos tratar una cancelación como “error real” en la UI.

> **Nota (arquitectura): servicios para el fetching**
>
> En el sandbox llamamos a `fetch` directamente para enfocarnos en hooks. En la app “real” del atelier, **no** mezclaremos URLs, headers y parsing dentro de componentes: crearemos una capa de **servicios** (por ejemplo `src/services/api/`) que exporte funciones tipo `getProducts()`, `getUsers()`, etc.
>
> - El **servicio** se encarga de lo “imperativo” y repetitivo: construir URL (baseURL + path), añadir headers (auth), validar `response.ok`, parsear JSON, normalizar errores y (si aplica) reintentos/timeouts.
> - El **hook** (`useFetch` / `useQuery`-like) se encarga de lo “reactivo”: `loading/error/data`, cancelación (AbortController) y coordinación con el ciclo de vida.
>
> Resultado: menos duplicación, errores consistentes y una API interna estable aunque cambie el backend.

### Ejemplo 2: useLocalStorage

```javascript
// hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
	// Lee de localStorage o usa initialValue
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	});

	// Setter que persiste en localStorage
	const setValue = (value) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;

			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(`Error setting localStorage key "${key}":`, error);
		}
	};

	return [storedValue, setValue];
}
```

**Uso:**

```jsx
function ThemeToggle() {
	const [theme, setTheme] = useLocalStorage('theme', 'light');

	return <button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>Actual: {theme}</button>;
}
```

#### Pruébalo en StackBlitz (useLocalStorage)

**Sandbox:** **[→ Nuevo proyecto React en StackBlitz](https://stackblitz.com/fork/react)**

En StackBlitz crea 2 archivos:

- `src/hooks/useLocalStorage.js`
- `src/App.jsx` (reemplaza el contenido)

Pega este hook en `src/hooks/useLocalStorage.js`:

```javascript
import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch {
			return initialValue;
		}
	});

	const setValue = (value) => {
		const valueToStore = value instanceof Function ? value(storedValue) : value;
		setStoredValue(valueToStore);
		window.localStorage.setItem(key, JSON.stringify(valueToStore));
	};

	return [storedValue, setValue];
}
```

Pega este demo en `src/App.jsx`:

```jsx
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
	const [theme, setTheme] = useLocalStorage('theme', 'light');
	const [count, setCount] = useLocalStorage('count', 0);

	return (
		<main style={{ fontFamily: 'system-ui', padding: 16 }}>
			<h1>Demo: useLocalStorage</h1>

			<section style={{ marginTop: 12 }}>
				<h2>Tema</h2>
				<button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>Actual: {theme}</button>
			</section>

			<section style={{ marginTop: 12 }}>
				<h2>Contador persistente</h2>
				<button onClick={() => setCount((c) => c + 1)}>+1</button>
				<button style={{ marginLeft: 8 }} onClick={() => setCount(0)}>
					Reset
				</button>
				<p>Valor: {count}</p>
				<p>
					Recarga la pestaña: el valor se mantiene porque está en <code>localStorage</code>.
				</p>
			</section>
		</main>
	);
}
```

**Qué observar:** recarga el sandbox y verás que `theme` y `count` se conservan; abre DevTools → Application/Storage para inspeccionar las keys.

### Ejemplo 3: useDebounce

```javascript
// hooks/useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}
```

**Uso:**

```jsx
function SearchInput() {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	useEffect(() => {
		if (debouncedSearchTerm) {
			searchAPI(debouncedSearchTerm);
		}
	}, [debouncedSearchTerm]);

	return (
		<input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar..." />
	);
}
```

---

## 🎯 Preguntas críticas: metodología atelier

### Sobre diseño de hooks

> 💭 **Pregunta 1: el dilema del array de dependencias**
>
> Tu `useEffect` tiene 5 dependencias. ESLint avisa de dependencias faltantes.
> Si las añades, creas bucles infinitos. Si las quitas, aparecen datos obsoletos.
>
> **Reflexiona:**
>
> - ¿Es señal de que tu effect hace demasiado?
> - ¿Cuándo conviene separar un efecto en varios?
> - ¿Cómo decides entre `useCallback` y aceptar el re-run?
> - ¿Qué revela esto del modelo mental de React?

> 💭 **Pregunta 2: abstracción de custom hooks**
>
> Has extraído `useFetch` pero ahora cada componente necesita algo distinto:
>
> - A necesita caché
> - B necesita reintentos
> - C necesita cancelación
>
> **Reflexiona:**
>
> - ¿Lo metes todo en un hook (bloat)?
> - ¿Creas 3 hooks (duplicación)?
> - ¿Compones hooks (hooks que llaman hooks)?
> - ¿Cuándo un hook se convierte en una librería?

> 💭 **Pregunta 3: el escape hatch de useEffect**
>
> La doc de React dice: “Quizá no necesitas un efecto”.
> Pero tu IA te sugiere useEffect para todo.
>
> **Reflexiona:**
>
> - ¿Cuándo useEffect es la herramienta equivocada?
> - ¿Qué puede hacerse durante el render?
> - ¿Cómo distingues estado derivado vs sincronizado?
> - ¿Por qué React desincentiva efectos?

### Sobre desarrollo asistido por IA

> 💭 **Pregunta 4: la trampa de la stale closure**
>
> La IA generó este código:
>
> ```javascript
> useEffect(() => {
> 	const interval = setInterval(() => {
> 		setCount(count + 1); // BUG: count está obsoleto
> 	}, 1000);
> 	return () => clearInterval(interval);
> }, []);
> ```
>
> Parece correcto pero falla.
>
> **Reflexiona:**
>
> - ¿Por qué la IA no vio el bug?
> - ¿Cómo desarrollas “intuición de closures”?
> - ¿Cuál es el fix? (pista: update funcional)
> - ¿Puedes fiarte de la IA en código async/closures?

> 💭 **Pregunta 5: optimización prematura**
>
> La IA sugiere envolver todo con `useMemo` y `useCallback`.
> Tu app tiene 50 memoizaciones sin problema real medido.
>
> **Reflexiona:**
>
> - ¿Es optimización o ofuscación?
> - ¿Cómo mides si la memoización ayudó?
> - ¿Cuál es el coste de memoizar?
> - ¿Cuándo perfilar antes de optimizar?

### Sobre colaboración en atelier

> 💭 **Pregunta 6: divergencia de patrones de hooks**
>
> Tu equipo tiene 3 hooks de fetch distintos:
>
> - `useFetch` (tuyo)
> - `useAPI` (compañera A)
> - `useData` (compañera B)
>
> Todos hacen cosas parecidas, diferente.
>
> **Reflexiona:**
>
> - ¿Cómo consolidar sin herir sensibilidades?
> - ¿Qué hace que un patrón sea “mejor”?
> - ¿Debe el equipo estandarizar o puede haber diversidad?
> - ¿Cómo se gestiona esto en equipos reales?

> 💭 **Pregunta 7: la curva de aprendizaje**
>
> Una compañera pregunta: “¿Por qué mi useEffect corre dos veces?”
> Sabes que es React Strict Mode, pero está frustrada.
>
> **Reflexiona:**
>
> - ¿Cómo lo explicas sin condescendencia?
> - ¿Cuál es el valor pedagógico de este comportamiento?
> - ¿Debería empezar por hooks o por clases?
> - ¿Cómo enseñas el “por qué”, no solo el “cómo”?

---

## 📌 Nota: Memoización en React frente a otros entornos

Cuando trabajas con **useMemo**, **useCallback** y **React.memo**, es natural preguntarse: _¿por qué en React tenemos que preocuparnos tanto por las referencias?_ Esta nota sitúa el diseño de React en contexto.

### Por qué React depende de la referencia

En JavaScript la igualdad es **por referencia** (`===`). Cada vez que el componente se re-renderiza, una función o un array creados en el render son **nuevos** en memoria: mismo comportamiento, distinta referencia. Para React (y para `React.memo`) eso cuenta como “props cambiadas”, así que el hijo se re-renderiza. Por eso usamos `useCallback` y `useMemo`: no para evitar que el padre re-renderice, sino para **mantener la misma referencia** cuando el valor lógico no ha cambiado, de modo que los hijos memoizados no reciban “nuevas” props y eviten trabajo innecesario.

### Cómo lo abordan otros lenguajes y frameworks

| Enfoque                                           | Ejemplo                                     | Idea clave                                                                                                                                                                                                                               |
| ------------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Igualdad estructural**                          | Clojure, Elm, Rust (con traits de igualdad) | Dos valores “iguales en contenido” se consideran iguales aunque sean referencias distintas. El framework puede decidir si recalcular o no sin que tú estabilices referencias a mano.                                                     |
| **Compilador o runtime que rastrea dependencias** | Svelte, Vue (`ref`/`computed`), SwiftUI     | Svelte analiza qué variables usa cada bloque y genera código que solo se re-ejecuta cuando esas variables cambian; no escribes `useMemo` ni `useCallback`. Vue y SwiftUI encapsulan de forma similar la noción de “de qué depende esto”. |
| **Datos inmutables por defecto**                  | Elm, ClojureScript                          | Los datos no se mutan; la igualdad suele ser estructural. “¿Ha cambiado?” se resuelve por valor, no por referencia, y el problema de “misma función, otra referencia” no se plantea igual.                                               |

### Conclusión

No es que “JavaScript sea así y haya que aceptarlo”: React eligió un modelo **explícito** en el que tú controlas la identidad (referencias) y cuándo optimizar. Eso hace el modelo muy enseñable y flexible, pero obliga a pensar en referencias y a usar `useCallback`/`useMemo`/`memo` cuando quieres evitar re-renders o trabajo redundante. En otros ecosistemas esa preocupación suele quedar oculta tras igualdad estructural o un compilador/runtime que infiere dependencias. Conocer ambos enfoques ayuda a explicar por qué en React la memoización es parte del diseño, no un capricho del lenguaje.

---

## 📝 Entregables del sprint

- [ ] **3+ custom hooks** (`useFetch`, `useLocalStorage`, `useDebounce`)
- [ ] **Feature interactiva** usando useState (p. ej., form, toggle)
- [ ] **Cleanup** en al menos un useEffect
- [ ] **Tests de hooks** al menos para `useFetch`
- [ ] **Reflexión** respondiendo 3+ preguntas críticas
- [ ] **Auditoría de dependencias** - documenta por qué cada dependencia es necesaria
- [ ] **Peer code review** enfocada en patrones de hooks y posibles bugs

---

## 🔗 Navegación de la lección

| Anterior                                       | Actual               | Siguiente                                              |
| ---------------------------------------------- | -------------------- | ------------------------------------------------------ |
| [Fundamentos de React](../react-fundamentals/) | **Dominio de hooks** | [Arquitectura de estado](../react-state-architecture/) |

---

## 📚 Vista previa: conceptos clave

_Contenido completo pendiente. Temas incluidos:_

1. Reglas de los hooks (y por qué existen)
2. Patrones y pitfalls de useState
3. useEffect: modelo mental
4. Cleanup y memory leaks
5. useRef más allá del DOM
6. Rendimiento: useMemo y useCallback (véase la [nota sobre memoización frente a otros entornos](#-nota-memoización-en-react-frente-a-otros-entornos))
7. Construir custom hooks
8. Testing de hooks

---

> _"Cada custom hook es una pieza de sabiduría reutilizable, extraída del caos de un componente."_
