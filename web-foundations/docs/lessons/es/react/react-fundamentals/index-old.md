---
layout: lesson
title: 'Fundamentos de React: bloques de construcción de UI moderna'
slug: react-fundamentals-old
category: react
tags: [react, components, jsx, props, events]
week: 4
phase: 2
sprint: 5
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/react/react-fundamentals/index-old
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->


> *"Un componente es una promesa: dadas estas props, renderizaré esta UI."*

---

## 🎯 Objetivo del sprint

**Al finalizar este sprint**: construir la librería base de componentes para tu proyecto del semestre: piezas reutilizables, tipadas y composables que funcionarán como átomos de tu aplicación.

---

## 📍 Posición en el viaje

| Sprint | Enfoque | Tu app crece |
|--------|---------|--------------|
| **→ 5. Fundamentos** | Componentes, JSX, Props | Esqueleto de librería de componentes |
| 6. Hooks | Estado y efectos | Componentes interactivos |
| 7. Arquitectura | Estado global | Features conectadas |
| 8. Routing | Navegación | Estructura multipágina |

---

## 🧭 Objetivos de aprendizaje

Al final de esta lección:

- Crearás componentes funcionales con TypeScript
- Entenderás JSX como Syntactic Sugar de `React.createElement`
- Pasarás y tiparás props correctamente
- Gestionarás eventos (click, change, submit)
- Renderizarás listas con keys correctas
- Aplicarás patrones de renderizado condicional

---

## 🏗️ Qué construiremos este sprint

### La librería de componentes

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx       ← Variantes, tamaños, estados
│   │   ├── Input.tsx        ← Text, email, password
│   │   ├── Card.tsx         ← Contenedor por slots
│   │   ├── Modal.tsx        ← Patrón overlay
│   │   └── Badge.tsx        ← Indicadores de estado
│   └── layout/
│       ├── Container.tsx    ← Max-width wrapper
│       ├── Stack.tsx        ← Espaciado vertical
│       └── Grid.tsx         ← Columnas responsive
```

Estos componentes se **reutilizarán durante todo tu proyecto del semestre**.

---

## 🔧 Puntos de integración

| Fuente de datos | Cómo conecta |
|-------------|-----------------|
| **Hardcoded** | Empieza con props estáticas para prototipado rápido |
| **Laravel API** | Más adelante, los componentes recibirán datos desde llamadas a la API |
| **Hygraph CMS** | Componentes “content-driven” (cards de blog, etc.) |

---

## 🎓 Metodología: práctica atelier

### Ritmo del sprint

```
┌─────────────────────────────────────────────────────────┐
│ DÍA 1: Aprender el patrón                                │
│   • Mini-lecture: modelo de componentes                  │
│   • Live coding: construir Button                        │
│   • Práctica IA: usar Copilot para variantes             │
├─────────────────────────────────────────────────────────┤
│ DÍA 2: Aplicar a tu proyecto                             │
│   • Trabajo en equipo: 3+ componentes para TU app        │
│   • Code review: pareja con otro equipo                  │
│   • Commit: subir librería a GitHub                      │
├─────────────────────────────────────────────────────────┤
│ DÍA 3: Integrar y reflexionar                            │
│   • Componer: combinar componentes en layout de página   │
│   • Documentar: JSDoc, Storybook opcional                │
│   • Reflexión: ¿qué patrones emergen? ¿qué fue difícil?  │
└─────────────────────────────────────────────────────────┘
```

### Protocolo de desarrollo asistido por IA

| Tarea | Rol de la IA | Tu rol |
|------|---------|-----------|
| Generar esqueleto de componente | Copilot sugiere | Tú validas tipos |
| Añadir attrs de accesibilidad | Preguntar a Claude/GPT | Tú verificas con axe |
| Crear estilos de variantes | IA propone opciones | Tú eliges con intención |
| Documentar props | IA redacta JSDoc | Tú garantizas precisión |

#### Prompts concretos para este sprint

```markdown
✅ BUEN PROMPT:
"Crea un componente Button en TypeScript con variantes (primary, secondary, danger),
tamaños (sm, md, lg) y estado disabled. Incluye atributos ARIA correctos y
maneja estado loading con un spinner. Usa Tailwind CSS para estilos."

❌ MAL PROMPT:
"Hazme un botón"

✅ PROMPT DE VALIDACIÓN:
"Revisa este componente Button para:
1. Problemas de accesibilidad (teclado, ARIA, focus states)
2. Seguridad de tipos en TypeScript (¿todas las props están bien tipadas?)
3. Rendimiento (¿re-renders innecesarios?)
4. Casos límite (¿qué pasa si onClick es undefined?)"

🔍 CUÁNDO NO USAR IA:
- Entender POR QUÉ un componente re-renderiza (usa React DevTools)
- Decidir el API de un componente (es una decisión arquitectónica TUYA)
- Elegir controlado vs no controlado (requiere conocimiento de dominio)
```

---

## 💡 Ejemplos de código listos para producción

### Ejemplo 1: Button (buenas prácticas)

```typescript
// components/ui/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils'; // util de classnames

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  ghost: 'bg-transparent hover:bg-gray-100 focus:ring-gray-500',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Estilos base
        'inline-flex items-center justify-center gap-2',
        'rounded-lg font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // Variante y tamaño
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner className="h-4 w-4" />
          <span>Cargando...</span>
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
}

// Componente spinner
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
```

**Uso:**

```typescript
// En tu página/componente
import { Button } from '@/components/ui/Button';
import { PlusIcon } from 'lucide-react';

function MyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await api.createItem(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
        Crear ítem
      </Button>

      <Button variant="secondary" leftIcon={<PlusIcon />}>
        Añadir nuevo
      </Button>

      <Button variant="danger" size="sm" disabled>
        Borrar
      </Button>
    </div>
  );
}
```

### Ejemplo 2: Card con patrón de slots

```typescript
// components/ui/Card.tsx
import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-white shadow-sm',
        'dark:border-gray-800 dark:bg-gray-950',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardTitle({ className, children, ...props }: CardProps) {
  return (
    <h3
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

function CardDescription({ className, children, ...props }: CardProps) {
  return (
    <p className={cn('text-sm text-gray-500 dark:text-gray-400', className)} {...props}>
      {children}
    </p>
  );
}

function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('flex items-center p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
```

**Uso:**

```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={product.image} alt={product.name} className="w-full rounded" />
        <p className="mt-4 text-gray-700">{product.description}</p>
        <p className="mt-2 text-2xl font-bold">${product.price}</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="primary" className="flex-1">
          Añadir al carrito
        </Button>
        <Button variant="ghost">
          Detalles
        </Button>
      </CardFooter>
    </Card>
  );
}
```

---

## 🎯 Preguntas críticas: metodología atelier

### Sobre diseño de componentes

> 💭 **Pregunta 1: el dilema de la abstracción**
>
> Has construido un componente `Button` con 5 variantes, 3 tamaños y varios estados.
> Una compañera te dice: “Esto es over-engineered. Solo usamos 2 variantes.”
>
> **Reflexiona:**
> - ¿Cuándo la abstracción se convierte en optimización prematura?
> - ¿Cómo equilibras “diseñar para el futuro” vs “YAGNI” (You Aren't Gonna Need It)?
> - ¿Qué evidencia te convencería de simplificar o ampliar el API del componente?

> 💭 **Pregunta 2: composición vs configuración**
>
> Compara estos dos enfoques:
>
> ```typescript
> // Enfoque A: configuración
> <Card variant="product" showImage showPrice showActions />
>
> // Enfoque B: composición
> <Card>
>   <CardImage src={...} />
>   <CardPrice value={...} />
>   <CardActions>{...}</CardActions>
> </Card>
> ```
>
> **Reflexiona:**
> - ¿Cuál es más flexible? ¿Cuál es más fácil de usar?
> - ¿Cuándo elegirías uno u otro?
> - ¿Cómo se relaciona con el principio del “pit of success”?

> 💭 **Pregunta 3: accesibilidad por defecto**
>
> Tu asistente de IA generó un modal precioso, pero le falta:
> - Focus trap
> - Cerrar con ESC
> - Atributos ARIA
> - Anuncios para lectores de pantalla
>
> **Reflexiona:**
> - ¿Por qué la IA no incluye esto por defecto?
> - ¿Qué revela esto sobre los datos de entrenamiento?
> - ¿Cómo construyes una “mentalidad checklist” para accesibilidad?
> - ¿A quién excluimos cuando omitimos accesibilidad?

### Sobre desarrollo asistido por IA

> 💭 **Pregunta 4: el límite de confianza**
>
> Pides a la IA que genere validación de formularios. Produce 200 líneas.
> No entiendes del todo las líneas 87-134 (regex y casos límite).
>
> **Reflexiona:**
> - ¿Lo entregas igualmente? ¿Por qué sí/no?
> - ¿Dónde está TU frontera de responsabilidad al usar IA?
> - ¿Cómo validas código que no escribiste?
> - ¿Qué pasa si ese código falla en producción a las 3 AM?

> 💭 **Pregunta 5: reconocer patrones vs entender**
>
> Tras usar IA para generar 10 componentes, notas que puedes predecir lo que sugerirá.
>
> **Reflexiona:**
> - ¿Significa que aprendiste React o solo “el patrón de la IA”?
> - ¿Cómo distingues entre “saber React” y “saber lo que genera la IA”?
> - ¿Qué ocurriría si mañana desaparecieran las herramientas de IA?

### Sobre colaboración en atelier

> 💭 **Pregunta 6: code review como aprendizaje**
>
> En revisión por pares, el componente `Input` de una compañera maneja validación distinto al tuyo.
> Ninguno está “mal”, pero son incompatibles.
>
> **Reflexiona:**
> - ¿Cómo decides qué patrón adopta el equipo?
> - ¿Qué papel juegan consistencia, DX y accesibilidad en esa decisión?
> - ¿Cómo conviertes el desacuerdo en aprendizaje colectivo?

> 💭 **Pregunta 7: la paradoja del portfolio**
>
> Tu portfolio incluye componentes generados con IA.
> Una reclutadora te pregunta: “¿Qué parte hiciste tú?”
>
> **Reflexiona:**
> - ¿Cómo documentas el uso de IA de forma ética?
> - ¿Qué significa “autoría” en 2026?
> - ¿Qué evidencias de comprensión puedes aportar (tests, diagramas, explicaciones)?

---

## 📝 Entregables del sprint

- [ ] **3+ componentes UI** (Button, Card, Input, Modal, Badge…)
- [ ] **1 página compuesta** usando varios componentes
- [ ] **Variantes y estados** al menos en `Button` (disabled, loading)
- [ ] **Audit de accesibilidad** con axe DevTools
- [ ] **Peer review** con feedback escrito
- [ ] **Reflexión**: responde al menos 3 preguntas críticas

---

## 🔗 Navegación de la lección

| Anterior | Actual | Siguiente |
|----------|---------|------|
| [Estado e IU](../state-and-ui/) | **Fundamentos de React** | [Hooks](../react-hooks/) |

---
