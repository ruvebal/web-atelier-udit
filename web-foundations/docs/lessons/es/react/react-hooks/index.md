---
layout: lesson
title: 'Dominio de hooks: el motor de la interactividad'
slug: react-hooks
category: react
tags: [react, hooks, useState, useEffect, custom-hooks]
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


> *"Un hook es un portal entre el mundo declarativo de React y el mundo imperativo de los efectos."*

---

## 🎯 Objetivo del sprint

**Al finalizar este sprint**: transformar tus componentes estáticos en elementos interactivos “vivos” con estado, efectos y patrones de lógica reutilizable.

---

## 📍 Posición en el viaje

| Sprint | Enfoque | Tu app crece |
|--------|---------|--------------|
| 5. Fundamentos | Componentes, JSX, Props | Esqueleto de librería de componentes |
| **→ 6. Hooks** | Estado y efectos | Componentes interactivos |
| 7. Arquitectura | Estado global | Features conectadas |
| 8. Routing | Navegación | Estructura multipágina |

---

## 🧭 Objetivos de aprendizaje

Al final de esta lección:

- Usarás `useState` para estado local
- Dominarás `useEffect` para side effects y cleanup
- Aplicarás `useRef` para acceso al DOM y valores mutables
- Optimizarás con `useMemo` y `useCallback`
- Extraerás lógica reutilizable en **custom hooks**
- Evitarás pitfalls típicos (closures obsoletos, bucles infinitos)

---

## 🏗️ Qué construiremos este sprint

### Custom hooks para tu app

```typescript
// Hooks que crearás en este sprint:

useFetch<T>(url: string)            // → { data, loading, error }
useLocalStorage<T>(key: string)     // → [value, setValue]
useDebounce<T>(value: T, delay: ms) // → debouncedValue
useToggle(initial: boolean)         // → [state, toggle, setTrue, setFalse]
useForm<T>(initialValues: T)        // → { values, handleChange, reset }
```

Estos hooks **impulsarán toda tu aplicación**.

---

## 🔧 Puntos de integración

| Fuente de datos | Uso del hook |
|-------------|------------|
| **Laravel API** | `useFetch` para GET, `useMutation` custom para POST |
| **Hygraph CMS** | Patrón `useQuery` para GraphQL (Apollo o custom) |
| **Local Storage** | `useLocalStorage` para persistencia (tema, preferencias) |

### Preview: patrón de integración con API

```typescript
// Hook de este sprint...
const { data, loading, error } = useFetch<Product[]>('/api/products');

// ...te prepara para el próximo sprint con React Query
const { data, isLoading, error } = useQuery(['products'], fetchProducts);
```

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
5. Use genéricos TypeScript para type safety"

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

| Tarea | Rol de la IA | Tu rol |
|------|---------|-----------|
| Depurar dependencias en useEffect | Explicar el warning | Entender el *por qué* |
| Generar esqueleto de hook | Scaffold de estructura | Añadir manejo de errores |
| Escribir tests de hooks | Borrador de casos | Verificar edge cases |
| Optimizar re-renders | Sugerir memoización | Perfilar antes/después |

---

## 💡 Custom hooks listos para producción

### Ejemplo 1: useFetch (buenas prácticas)

```typescript
// hooks/useFetch.ts
import { useState, useEffect, useRef } from 'react';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseFetchReturn<T> extends UseFetchState<T> {
  refetch: () => void;
}

export function useFetch<T = unknown>(
  url: string,
  options?: RequestInit
): UseFetchReturn<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  // Tracking del último request para manejar race conditions
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = async () => {
    // Cancelar request anterior si sigue pendiente
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Crear nuevo abort controller para este request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setState(prev => ({ ...prev, loading: true, error: null }));

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

```typescript
function ProductList() {
  const { data, loading, error, refetch } = useFetch<Product[]>('/api/products');

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;
  if (!data) return null;

  return (
    <div>
      <button onClick={refetch}>Actualizar</button>
      {data.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Ejemplo 2: useLocalStorage

```typescript
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  // Lee de localStorage o usa initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Setter que persiste en localStorage
  const setValue: SetValue<T> = (value) => {
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

```typescript
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      Actual: {theme}
    </button>
  );
}
```

### Ejemplo 3: useDebounce

```typescript
// hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

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

```typescript
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchAPI(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Buscar..."
    />
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
> - ¿Es señal de que tu effect hace demasiado?
> - ¿Cuándo conviene separar un efecto en varios?
> - ¿Cómo decides entre `useCallback` y aceptar el re-run?
> - ¿Qué revela esto del modelo mental de React?

> 💭 **Pregunta 2: abstracción de custom hooks**
> 
> Has extraído `useFetch` pero ahora cada componente necesita algo distinto:
> - A necesita caché
> - B necesita reintentos
> - C necesita cancelación
> 
> **Reflexiona:**
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
> - ¿Cuándo useEffect es la herramienta equivocada?
> - ¿Qué puede hacerse durante el render?
> - ¿Cómo distingues estado derivado vs sincronizado?
> - ¿Por qué React desincentiva efectos?

### Sobre desarrollo asistido por IA

> 💭 **Pregunta 4: la trampa de la stale closure**
> 
> La IA generó este código:
> 
> ```typescript
> useEffect(() => {
>   const interval = setInterval(() => {
>     setCount(count + 1); // BUG: count está obsoleto
>   }, 1000);
>   return () => clearInterval(interval);
> }, []);
> ```
> 
> Parece correcto pero falla.
> 
> **Reflexiona:**
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
> - ¿Es optimización o ofuscación?
> - ¿Cómo mides si la memoización ayudó?
> - ¿Cuál es el coste de memoizar?
> - ¿Cuándo perfilar antes de optimizar?

### Sobre colaboración en atelier

> 💭 **Pregunta 6: divergencia de patrones de hooks**
> 
> Tu equipo tiene 3 hooks de fetch distintos:
> - `useFetch` (tuyo)
> - `useAPI` (compañera A)
> - `useData` (compañera B)
> 
> Todos hacen cosas parecidas, diferente.
> 
> **Reflexiona:**
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
> - ¿Cómo lo explicas sin condescendencia?
> - ¿Cuál es el valor pedagógico de este comportamiento?
> - ¿Debería empezar por hooks o por clases?
> - ¿Cómo enseñas el “por qué”, no solo el “cómo”? 

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

| Anterior | Actual | Siguiente |
|----------|---------|------|
| [Fundamentos de React](../react-fundamentals/) | **Dominio de hooks** | [Arquitectura de estado](../react-state-architecture/) |

---

## 📚 Vista previa: conceptos clave

*Contenido completo pendiente. Temas incluidos:*

1. Reglas de los hooks (y por qué existen)
2. Patrones y pitfalls de useState
3. useEffect: modelo mental
4. Cleanup y memory leaks
5. useRef más allá del DOM
6. Rendimiento: useMemo y useCallback
7. Construir custom hooks
8. Testing de hooks

---

> *"Cada custom hook es una pieza de sabiduría reutilizable, extraída del caos de un componente."*
