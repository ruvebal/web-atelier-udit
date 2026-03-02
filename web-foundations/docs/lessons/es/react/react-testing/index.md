---
layout: lesson
title: 'Testing: construir confianza en tu código'
slug: react-testing
category: react
tags: [react, testing, vitest, rtl, cypress]
week: 10
phase: 3
sprint: 11
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/react/react-testing/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->


> *"Los tests no buscan bugs. Los tests construyen confianza para cambiar."*

---

## 🎯 Objetivo del sprint

**Al finalizar este sprint**: tu app tiene una base de testing—tests unitarios para lógica, tests de componentes para comportamiento UI y al menos un test E2E para un flujo crítico.

---

## 📍 Posición en el viaje

| Sprint | Enfoque | Tu app crece |
|--------|-------|----------------|
| 9. Backend | Data fetching | Datos reales, app real |
| 10. Auth | Seguridad | Sesiones de usuario |
| **→ 11. Testing** | Calidad | Codebase fiable |
| 12. Performance | Velocidad | Experiencia optimizada |

---

## 🧭 Objetivos de aprendizaje

Al final de esta lección:

- Escribirás tests unitarios para funciones puras y hooks
- Testearás componentes React con React Testing Library
- Mockearás llamadas API en tests de componentes
- Escribirás al menos un test E2E con Cypress
- Entenderás el Testing Trophy (qué testear más)
- Configurarás CI para ejecutar tests en cada push

---

## 🏗️ El Testing Trophy

```
                    ┌───────┐
                    │  E2E  │  ← Pocos, rutas críticas
                    └───┬───┘
                   ┌────┴────┐
                   │Integration│  ← La mayoría de tus tests
                   └────┬─────┘
                 ┌──────┴──────┐
                 │    Unit     │  ← Funciones puras, hooks
                 └──────┬──────┘

Foco: ¿El usuario logra su objetivo?
Evita: Testear detalles de implementación
```

---

## 🔧 Stack de testing

| Tipo | Herramienta | Testea qué |
|------|------|-----------|
| **Unit** | Vitest | Funciones puras, utilidades |
| **Component** | React Testing Library | Interacciones de usuario con UI |
| **Integration** | RTL + MSW | Componentes con APIs mockeadas |
| **E2E** | Cypress | Flujos completos en navegador |

---

## 🎓 Metodología: práctica atelier

### Ritmo del sprint

```
┌─────────────────────────────────────────────────────────┐
│ DÍA 1: Tests unitarios y de componentes                 │
│   • Configurar Vitest y React Testing Library           │
│   • Tests unitarios para funciones utility              │
│   • Testear un formulario (render, type, submit)        │
├─────────────────────────────────────────────────────────┤
│ DÍA 2: Integración y mocking                            │
│   • Configurar MSW (Mock Service Worker) para API       │
│   • Testear componente con data-fetching end-to-end     │
│   • Testear estados error y loading                     │
├─────────────────────────────────────────────────────────┤
│ DÍA 3: E2E y CI                                          │
│   • Test Cypress: login → dashboard                     │
│   • GitHub Actions para ejecutar tests en push          │
│   • Celebrar checkmarks verdes ✅                       │
└─────────────────────────────────────────────────────────┘
```

### Qué testear (orden de prioridad)

| Prioridad | Testea esto | Ejemplo |
|----------|-----------|---------|
| 🔴 Alta | Usuario completa flujo crítico | Login, checkout, crear post |
| 🟠 Media | Componente gestiona estados | Loading, error, empty, success |
| 🟡 Baja | Edge cases | Texto muy largo, caracteres especiales |
| ⚪ Omitir | Detalles de implementación | Forma del estado interno, clases CSS |

---

### Protocolo de desarrollo asistido por IA

| Tarea | Rol de la IA | Tu rol |
|------|---------|-----------|
| Generar casos de test | Scaffold de estructura | Añadir assertions que importan |
| Mockear APIs complejas | Crear handlers MSW | Verificar que coincidan con API real |
| Depurar tests fallidos | Explicar el error | Entender *por qué* falla |
| Aumentar cobertura | Sugerir edge cases | Priorizar rutas importantes |

---

## 📝 Entregables del sprint

- [ ] **5+ tests unitarios** para utilidades y funciones puras
- [ ] **3+ tests de componentes** con RTL
- [ ] **Setup MSW** para mockear API en tests
- [ ] **1 test E2E Cypress** para flujo crítico
- [ ] **GitHub Actions** ejecutando tests en push
- [ ] **Reporte de cobertura** (objetivo 60%+ en código core)
- [ ] **Reflexión**: ¿qué revelaron los tests sobre tu código?

---

## 💡 Ejemplos de tests

### Test unitario (Vitest)

```javascript
// src/utils/formatPrice.test.js
import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  it('formats whole numbers', () => {
    expect(formatPrice(1000)).toBe('$10.00');
  });

  it('handles zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });
});
```

### Test de componente (RTL)

```jsx
// src/components/LoginForm.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

test('submits email and password', async () => {
  const handleSubmit = vi.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
  await userEvent.type(screen.getByLabelText(/password/i), 'password123');
  await userEvent.click(screen.getByRole('button', { name: /login/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123'
  });
});
```

---

## 🔗 Navegación de la lección

| Anterior | Actual | Siguiente |
|----------|---------|------|
| [Autenticación](../react-authentication/) | **Testing** | [Performance](../react-performance/) |

---

## 📚 Vista previa: conceptos clave

*Contenido completo pendiente. Temas incluidos:*

1. Filosofía del testing
2. Configuración de Vitest
3. Fundamentos de React Testing Library
4. Testear interacciones de usuario
5. Mocking con MSW
6. Cypress E2E básico
7. Integración CI/CD
8. Cuándo NO testear

---

> *"Escribe tests. No demasiados. Sobre todo de integración."* — Guillermo Rauch
