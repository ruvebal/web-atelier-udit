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

**Prerequisito:** `fetch` devuelve una **Promise**; si aún no tienes claro qué es el **objeto** Promise (estados pending/fulfilled/rejected, `.then()` / `async/await`), conviene repasarlo antes: [Promise en MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Para escribir el código de forma secuencial con Promises usa la [función `async`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function) y el operador [await](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/await). En JS conviene distinguir: **objetos** nativos como `Promise` (representan un valor o una acción; tienen métodos como `.then()`), **funciones** como `async function` (declaran una función que devuelve una Promise), y **operadores** como `await` (pausan la ejecución hasta que la Promise se resuelve).

### Lo mínimo que necesitas saber

- **`fetch(url, options?)`** es una función global que devuelve una **Promise** que se resuelve con un objeto **Response** (aunque la petición falle con 404 o 500: la Promise no se rechaza por código HTTP de error).
- **Comprobar el estado:** hay que revisar `response.ok` (o `response.status`) antes de leer el cuerpo. Si no lo haces, tratarás errores HTTP como si fueran éxito.
- **Leer el cuerpo:** `response.json()` (o `.text()`, `.blob()`, etc.) devuelve otra Promise; el cuerpo solo se puede consumir una vez.
- **Cancelación:** para poder cancelar la petición (por ejemplo al desmontar el componente o al cambiar la URL), se usa **[WEB API's AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)**: pasas `signal: controller.signal` en las opciones de `fetch` y llamas a `controller.abort()` cuando quieras cancelar.

Ejemplo mínimo sin React (solo Fetch API):

```javascript
async function getData(url) {
	const controller = new AbortController();
	const response = await fetch(url, { signal: controller.signal });
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	return response.json();
}
```

Cuando construyas `useFetch`, estarás añadiendo alrededor de esto: estado (`data`, `loading`, `error`), cleanup en el unmount (abortar la petición) y manejo de **[Race Conditions](https://en.wikipedia.org/wiki/Race_condition)** (cuando lanzas varias peticiones y una antigua responde después que una reciente: si actualizas estado con la respuesta antigua, la UI muestra datos obsoletos; por eso se cancelan o se ignoran las respuestas de requests ya “superadas”). Para el detalle completo de la Fetch API (métodos, cabeceras, CORS, credenciales, etc.), consulta [Using the Fetch API en MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

---

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

Cuando trabajas con **useMemo**, **useCallback** y **React.memo**, es natural preguntarse: *¿por qué en React tenemos que preocuparnos tanto por las referencias?* Esta nota sitúa el diseño de React en contexto.

### Por qué React depende de la referencia

En JavaScript la igualdad es **por referencia** (`===`). Cada vez que el componente se re-renderiza, una función o un array creados en el render son **nuevos** en memoria: mismo comportamiento, distinta referencia. Para React (y para `React.memo`) eso cuenta como “props cambiadas”, así que el hijo se re-renderiza. Por eso usamos `useCallback` y `useMemo`: no para evitar que el padre re-renderice, sino para **mantener la misma referencia** cuando el valor lógico no ha cambiado, de modo que los hijos memoizados no reciban “nuevas” props y eviten trabajo innecesario.

### Cómo lo abordan otros lenguajes y frameworks

| Enfoque | Ejemplo | Idea clave |
|--------|---------|------------|
| **Igualdad estructural** | Clojure, Elm, Rust (con traits de igualdad) | Dos valores “iguales en contenido” se consideran iguales aunque sean referencias distintas. El framework puede decidir si recalcular o no sin que tú estabilices referencias a mano. |
| **Compilador o runtime que rastrea dependencias** | Svelte, Vue (`ref`/`computed`), SwiftUI | Svelte analiza qué variables usa cada bloque y genera código que solo se re-ejecuta cuando esas variables cambian; no escribes `useMemo` ni `useCallback`. Vue y SwiftUI encapsulan de forma similar la noción de “de qué depende esto”. |
| **Datos inmutables por defecto** | Elm, ClojureScript | Los datos no se mutan; la igualdad suele ser estructural. “¿Ha cambiado?” se resuelve por valor, no por referencia, y el problema de “misma función, otra referencia” no se plantea igual. |

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
