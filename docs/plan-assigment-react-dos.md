# 🎓 **Pitch final: Geo‑Physical WebApp – Proyecto colaborativo en React**

¡Hola equipo! 🌍💻

Vamos a construir una **aplicación React** sobre el **estado geofísico global**, integrando:

- **Rutas independientes por estudiante** con **React Router v7**
- **Tailwind v4** y **Shadcn** o **Ark UI** para UI consistente y accesible
- **React Query** para fetch de APIs REST, grafos y datos en tiempo real (WebSockets)
- **Servicios centralizados** con **HttpRequest** (GET, POST, PUT, DELETE) y **HttpErrors** para mensajes genéricos
- **Hook de notificaciones (`useNotifications`)** para feedback animado al usuario
- **Flujo Git seguro y profesional**, con ramas, commits estandarizados y merges controlados

Cada estudiante desarrollará **su propia ruta**, usando **APIs distintas**, mientras que todos compartimos:

- Componentes comunes
- Hooks reutilizables
- Estilos consistentes

---

## 🔹 1️⃣ Estructura de carpetas

```plaintext id="folder-structure-final"
src/
 ├─ pages/                     <-- Rutas por estudiante
 │   ├─ ClimaPage/
 │   │   ├─ ClimaPage.jsx       <-- Contenedor + React Query
 │   │   ├─ components/         <-- Componentes específicos de esta ruta
 │   │   │   ├─ ClimaCard.jsx
 │   │   │   └─ ClimaCardList.jsx
 │   │   └─ hooks/
 │   │       └─ useClimaFetch.js
 │   └─ SensoresPage/
 │       └─ ...
 ├─ components/                 <-- Componentes UI compartidos (Loader, ErrorMessage, Button, Modal, Notification)
 ├─ hooks/                      <-- Hooks globales
 │   ├─ useFetch.js
 │   ├─ useWebSocket.js
 │   └─ useNotifications.js     <-- Hook para mostrar notificaciones animadas
 ├─ services/                   <-- Servicios centralizados
 │   ├─ HttpRequest.js          <-- GET, POST, PUT, DELETE con React Query
 │   └─ HttpErrors.js           <-- Mensajes de error genéricos
 ├─ utils/                      <-- Helpers, constantes, URLs
 └─ App.jsx                      <-- Rutas principales
```

---

## 🔹 2️⃣ `useNotifications` – Hook global de notificaciones

### Comportamiento:

- Pastillas de texto animadas sobre la app
- Colores según tipo:
  - **success** → verde
  - **error** → rojo
  - **warning** → amarillo
  - **info** → azul

- Aparece y desaparece con animación suave
- Se puede usar desde cualquier componente

### Ejemplo de hook:

```javascript id="use-notifications"
import { useState, useCallback } from 'react';

export const useNotifications = () => {
	const [notifications, setNotifications] = useState([]);

	const addNotification = useCallback((message, type = 'info', duration = 3000) => {
		const id = Date.now();
		setNotifications((prev) => [...prev, { id, message, type }]);
		setTimeout(() => {
			setNotifications((prev) => prev.filter((n) => n.id !== id));
		}, duration);
	}, []);

	return { notifications, addNotification };
};
```

### Componente de renderizado:

```javascript id="notification-component"
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

export const Notifications = ({ notifications }) => (
	<div className="fixed top-5 right-5 space-y-2 z-50">
		<AnimatePresence>
			{notifications.map(({ id, message, type }) => (
				<motion.div
					key={id}
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					className={clsx('px-4 py-2 rounded shadow text-white font-medium', {
						'bg-green-500': type === 'success',
						'bg-red-500': type === 'error',
						'bg-yellow-500': type === 'warning',
						'bg-blue-500': type === 'info',
					})}>
					{message}
				</motion.div>
			))}
		</AnimatePresence>
	</div>
);
```

- **Uso en cualquier ruta o componente:**

```javascript id="use-notifications-example"
const { notifications, addNotification } = useNotifications();

addNotification('Datos cargados correctamente', 'success');
```

---

## 🔹 3️⃣ Fetch con React Query y servicios

- **HttpRequest.js** → centraliza GET/POST/PUT/DELETE
- **HttpErrors.js** → mensajes genéricos de error por código

Ejemplo de hook con React Query:

```javascript id="react-query-hook"
import { useQuery } from '@tanstack/react-query';
import { HttpRequest } from '../services/HttpRequest';
import { HttpErrors } from '../services/HttpErrors';

export const useClimaFetch = () => {
	return useQuery(['clima'], () => HttpRequest.get('/clima'), {
		onError: (err) => {
			console.error(HttpErrors(err.status));
		},
	});
};
```

- Todos los **loaders** y estados de error usan **componentes comunes** (`Loader`, `ErrorMessage`) con Shadcn + Tailwind.

---

## 🔹 4️⃣ Buenas prácticas de componetización

1. **Separar lógica y presentación** → page/container vs UI
2. **Custom hooks reutilizables** → `useClimaFetch`, `useWebSocket`, `useNotifications`
3. **Componentes comunes UI** → Loader, ErrorMessage, Button, Modal, Notification
4. **Props down / events up** → flujo de datos consistente
5. **Consistencia de UI** → Tailwind + Shadcn en todos los componentes comunes

---

## 🔹 5️⃣ Flujo de trabajo Git

### Creación de rama

```bash id="git-create-branch"
git checkout main
git pull origin main
git checkout -b feature/<nombre-alumno>
```

### Commits estandarizados

- Pequeños y concretos, ejemplo:

```text id="commit-examples"
feat: add new route
feat: add new menu option
fix: new error messages on getting route data
```

- Si olvidas añadir algo al último commit:

```bash id="git-amend"
git add .
git commit --amend --no-edit
```

### Merge seguro a main

1. Añadir cambios al commit:

```bash id="git-add-commit"
git add .
git commit -m "feat: add loader and notifications"
```

2. Traer cambios de main:

```bash id="git-pull-main"
git checkout main
git pull origin main
```

3. Mezclar main en tu rama:

```bash id="git-merge-main"
git checkout feature/<nombre-alumno>
git merge main
```

- Resolver conflictos si surgen
- Probar localmente
- Crear **Pull Request** hacia main
- Merge aprobado solo si todo funciona y no rompe la app

---

## 🔹 6️⃣ Aprendizajes pedagógicos

1. **React Router v7** → modularidad, rutas independientes por estudiante
2. **Componetización profesional** → separación lógica/UI, custom hooks
3. **React Query + HttpRequest/HttpErrors** → fetch eficiente, errores consistentes
4. **Loaders y Notificaciones** → UX consistente con animaciones y colores
5. **Git colaborativo** → ramas, commits estandarizados, pull + merge seguro
6. **Arquitectura escalable** → módulos independientes, componentes compartidos, UI consistente

---

💡 **Tip final:**

Cada ruta es **un módulo autónomo**. Trabaja sobre tu rama, usa hooks y componentes comunes, muestra loaders y notificaciones de manera consistente, y al mergear tu PR, tu ruta encajará perfectamente en la app global. Al final tendremos un **dashboard geofísico completo**, modular, escalable y con UX de calidad profesional.

---
