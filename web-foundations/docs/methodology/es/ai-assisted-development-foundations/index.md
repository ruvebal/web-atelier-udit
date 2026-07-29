---
layout: lesson
title: 'Fundamentos de Desarrollo Asistido por IA'
title_alt: 'AI-Assisted Development Foundations'
slug: ai-assisted-development-foundations
date: 2026-07-29
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /methodology/es/ai-assisted-development-foundations/
description: 'Marco teórico para desarrollo asistido por IA: contratos, descomposición funcional, seguridad, observabilidad, RAG y conexión con MVC/MVVM.'
tags: [ia, arquitectura, contratos, seguridad, mcp, rag, observabilidad]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

# 🤖 Fundamentos de Desarrollo Asistido por IA

> *"Los LLM no son funcionalidades. Son motores de razonamiento probabilístico que operan dentro de sistemas."*

> **Nota práctica:** Para specs y arquitectura en el prompt del día a día, ver también [Uso de la IA: specs y arquitectura](../uso-ia-specs-arquitectura/). Para marcos éticos y regulatorios (UNESCO, Ley de IA, Directrices ERA), ver la [Guía práctica](../ai-practical-guide/) §Marcos Éticos.

---

## Reencuadre mental

### El prerrequisito antes de los prerrequisitos

Antes de cualquier detalle técnico, interioriza este cambio:

```
┌─────────────────────────────────────────────────────────┐
│              LA INSIGHT FUNDAMENTAL                      │
│                                                          │
│   Los LLM son MOTORES DE RAZONAMIENTO PROBABILÍSTICO     │
│   que operan DENTRO DE SISTEMAS                          │
│                                                          │
│   Todo lo demás existe para:                             │
│   • Restringir ese razonamiento                          │
│   • Guiar ese razonamiento                               │
│   • Verificar ese razonamiento                           │
│   • Auditar ese razonamiento                             │
└─────────────────────────────────────────────────────────┘
```

Si omites este reencuadre, la IA parecerá «mágica» e incontrolable.

---

## La pila de fundamentos

Estos son los **fundamentos que ya debes dominar** antes de que el desarrollo asistido por IA tenga sentido:

```
┌─────────────────────────────────────────────────────────┐
│ 8. AGENTES, RAG, MCP ◄── Hacia dónde vamos              │
├─────────────────────────────────────────────────────────┤
│ 7. Recuperación y curación de contexto                  │
│ 6. Observabilidad y trazas de auditoría                 │
│ 5. Seguridad basada en capacidades                      │
│ 4. Descomposición funcional                             │
│ 3. Determinismo vs probabilismo                         │
│ 2. Modelado de datos y semántica                        │
│ 1. Contratos e interfaces de software ◄── Empieza aquí  │
└─────────────────────────────────────────────────────────┘
```

---

## Arquitectura de software clásica

### 1.1 Modelos cliente-servidor y RPC (Remote Procedure Call)

Debes dominar:

| Concepto | Qué saber |
|---------|--------------|
| **Request/Response** | Ciclo de vida HTTP, cabeceras, códigos de estado |
| **RPC vs REST** | Cuándo usar cada uno, trade-offs |
| **Stateless vs Stateful** | Gestión de sesión, implicaciones de escalado |

**Por qué importa para la IA**:
- MCP es *JSON-RPC con esquemas*
- Las llamadas a herramientas son llamadas RPC con un invocador probabilístico

### 1.2 Contratos e interfaces

| Concepto | Implementación |
|---------|----------------|
| Segregación de interfaces | Contratos pequeños y enfocados |
| Contratos entrada/salida | Formas definidas, validación |
| Versionado | Compatibilidad hacia atrás |

**Insight crítico**:
```
Los prompts en texto NO son contratos
Los esquemas (JSON Schema, OpenAPI, Zod, Pydantic) SÍ son contratos
```

---

## Modelado de datos y semántica

Los sistemas de IA modernos colapsan sin esta capa.

### 2.1 Estructurado vs no estructurado

| Tipo | Ejemplos | Tratamiento por IA |
|------|----------|-------------|
| **No estructurado** | Texto libre, notas | Requiere parsing/extracción |
| **Semi-estructurado** | JSON, Markdown | Navegable con guía |
| **Estructurado** | Esquemas tipados, enums | Procesamiento directo |

> **Insight**: Los LLM razonan mejor cuando los datos no estructurados están *envueltos en estructura*.

### 2.2 Información vs conocimiento

| Información | Conocimiento |
|-------------|-----------|
| Hechos almacenados | Contextualizado, recuperable |
| Datos en bruto | Información con propósito |

Esta distinción explica:
- Por qué existe **RAG**
- Por qué las ventanas de contexto se *curan*, no se *vuelcan*

---

## Más allá del prompting

El prompting importa — pero se apoya en conceptos más profundos.

### 3.1 Determinismo vs probabilismo

| Código tradicional | Salida LLM |
|------------------|------------|
| Misma entrada → Misma salida | Misma entrada → Distribución de salidas |
| Test de igualdad | Test de rango aceptable |
| Debug paso a paso | Evaluación probabilística |

**Implicaciones**:
- Diseña **barandillas**, no solo instrucciones
- La validación ocurre *después* de la generación
- Acepta el no-determinismo, planifica para él

### 3.2 Contexto de sistema vs usuario vs herramienta

```
┌─────────────────────────────────────────────────────────┐
│               CAPAS DE CONTEXTO                          │
├─────────────────────────────────────────────────────────┤
│ SYSTEM PROMPT (máxima autoridad)                         │
│   └── Define persona, restricciones, capacidades         │
│                                                          │
│ USER MESSAGE (variable, no confiable)                    │
│   └── La petición, potencialmente adversarial            │
│                                                          │
│ TOOL CONTEXT (estructurado, acotado)                     │
│   └── Datos de herramientas, con esquemas                │
└─────────────────────────────────────────────────────────┘
```

Comprende:
- Niveles de autoridad
- Reglas de precedencia
- **Riesgos de inyección** (prompt injection es real)

---

## Descomposición funcional

Si practicas buena descomposición, los agentes parecerán obvios.

### 4.1 Funciones pequeñas y componibles

| Principio | Por qué importa para la IA |
|-----------|----------------------|
| Una responsabilidad | Las herramientas deben ser *aburridas* |
| Efectos secundarios claros | Resultados predecibles |
| Idempotencia | Seguro reintentar |

```
El razonamiento ocurre en el modelo
La ejecución ocurre en las herramientas
```

### 4.2 Separación lectura vs escritura

| Operación | Característica | Mapeo MCP |
|-----------|----------------|-------------|
| **Read** | Consultas, fetches | Resources |
| **Write** | Crear, actualizar, desplegar | Tools |

No es solo buena práctica — es requisito para sistemas de IA seguros.

---

## Modelos de seguridad y confianza

Si la seguridad es un añadido tardío, la IA **amplificará el daño**.

### 5.1 Seguridad basada en capacidades

En lugar de «¿quién eres?», pregunta: **«¿Qué se te permite hacer *ahora*?»**

Esto sustenta:
- Raíces MCP
- Listas blancas de herramientas
- Agentes con alcance por rol

Las *Ethics Guidelines for Trustworthy AI* de la UE (Horizonte Europa) exigen que los sistemas de IA garanticen privacidad y protección de datos a lo largo de todo su ciclo de vida — y que la minimización de datos nunca se use para ocultar u oscurecer sesgos. La seguridad basada en capacidades y el pensamiento de radio de explosión (*blast radius*) son implementaciones prácticas de ese requisito.

### 5.2 Pensamiento de radio de explosión

| Principio | Aplicación |
|-----------|-------------|
| Mínimo privilegio | Conceder solo permisos necesarios |
| Aislamiento de entornos | Separación dev/staging/prod |
| Escalada explícita | Rutas claras para acceso elevado |

> **Insight clave**: Los agentes no eliminan estos requisitos — **te obligan a formalizarlos**.

---

## Observabilidad y operaciones

Los sistemas de IA sin observabilidad son imposibles de depurar.

### 6.1 Pensamiento en eventos

En lugar de «la IA hizo algo», registra:

```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "tool_call": "create_file",
  "inputs": { "path": "/src/component.tsx" },
  "outputs": { "success": true },
  "decision_context": "User requested new component",
  "model": "claude-3",
  "tokens_used": 1234
}
```

Esto permite:
- Auditoría de llamadas a herramientas
- Reproducibilidad
- Postmortems

### 6.2 Diseño human-in-the-loop

| Concepto | Implementación |
|---------|----------------|
| Checkpoints | Pausa antes de acciones destructivas |
| Umbrales de confianza | Aprobación requerida bajo umbral |
| Puertas de aprobación | Confirmación humana explícita |

> **Mantra**: Los agentes son *becarios junior*, no dioses autónomos.

El requisito de «human agency and oversight» del marco de IA Fiable establece que los sistemas de IA deben apoyar la autonomía y la toma de decisiones humanas, permitiendo decisiones autónomas informadas (Comisión Europea, *How to complete your ethics self-assessment*, §8). Este mantra es una reformulación con base normativa de ese principio.

---

## Recuperación de conocimiento antes de RAG

RAG solo tiene sentido si comprendes los conceptos subyacentes.

### 7.1 Indexación y recuperación

| Concepto | Qué significa |
|---------|---------------|
| Search ≠ Retrieval | Encontrar vs. extraer contexto relevante |
| Relevance ranking | No todos los resultados son iguales |
| Freshness vs authority | Datos nuevos vs. fuentes confiables |

### 7.2 Presupuesto de contexto

| Restricción | Estrategia |
|------------|----------|
| Límites de tokens | No cabe todo |
| Priorización | Lo más relevante primero |
| Resumen | Comprimir cuando haga falta |
| Truncado | Cortar cuando sea necesario |

> **RAG no es «adjuntar una vector DB» — es ingeniería de curación de contexto.**

---

## Conexión con MVC/MVVM

Los sistemas asistidos por IA son una **continuación** de los patrones MVC/MVVM, no una ruptura.

### La pregunta central (sin cambios)

> *¿Dónde vive el razonamiento y cómo afecta al estado y la presentación?*

Los sistemas de IA plantean la misma pregunta — con **razonamiento no determinista**.

### MVC con IA

| Componente MVC | Interpretación en era IA |
|---------------|----------------------|
| Model | Fuente de verdad (DB, CMS) |
| View | UI orientada al humano |
| Controller | **Controlador probabilístico (LLM)** |
| Services | Herramientas / servidores MCP |
| Validation | Esquemas + comprobaciones post-generación |

**Cambio crítico**: El Controller ya no *decide por código*, sino que **propone acciones** que deben validarse.

### MVVM con IA

| Componente MVVM | Interpretación en era IA |
|----------------|----------------------|
| Model | CMS / DB / APIs |
| View | Chat UI, dashboards |
| ViewModel | **Capa de razonamiento LLM** |
| Commands | Llamadas a herramientas |
| State | Contexto estructurado |

**Por qué funciona**: Un LLM:
- **No** renderiza UI
- **No** persiste datos
- **No** ejecuta efectos secundarios directamente

*Exactamente como un ViewModel.*

### MCP como comandos tipados

| Concepto MVVM | Equivalente MCP |
|--------------|----------------|
| Read-only bindings | MCP Resources |
| Commands | MCP Tools |
| Compile-time safety | Esquemas (runtime) |

---

## La escalera pedagógica

### Fase 1: Clásica

- MVC con controladores explícitos
- MVVM con bindings reactivos

### Fase 2: Híbrida

- Controladores/ViewModels que *sugieren* acciones
- Validación antes de ejecución

### Fase 3: Aumentada por IA

- LLM como Controller/ViewModel
- Herramientas como Services
- MCP como contratos de interfaz

### Fase 4: Gobernanza

- Logs de auditoría
- Aprobación humana
- Restricciones basadas en políticas

---

## La frase única

> **La IA no reemplaza MVC ni MVVM; hace su disciplina inevitable.**

Si omites la arquitectura, la IA se comportará como un dios.
Si respetas la arquitectura, la IA se comporta como un colaborador junior.

---

## 🔗 Navegación de lecciones

| Anterior | Actual | Siguiente |
|----------|--------|-----------|
| [Estado e IU]({{ site.url }}{{ site.baseurl }}/lessons/es/react/state-and-ui/) | **Fundamentos asistidos por IA** | [Fundamentos de React]({{ site.url }}{{ site.baseurl }}/lessons/es/react/react-fundamentals/) |

---

## 🔗 Recursos relacionados

| Recurso | Descripción |
|---------|-------------|
| [Guía práctica de IA](../ai-practical-guide/index.md) | Metodología docs-first, marcos éticos, protocolo de integridad |
| [Uso de la IA: specs y arquitectura](../uso-ia-specs-arquitectura/) | Nota breve: specs + arquitectura en el prompt |
| [El Tao del desarrollo con IA](../ai-practical-guide/tao-of-ai-development/index.md) | Addendum filosófico |
| [Metodología del curso](../index.md) | Pedagogía Web Atelier |

---

> *"Cada decisión técnica es una decisión ética. Cada elección arquitectónica es una decisión de confianza."*
