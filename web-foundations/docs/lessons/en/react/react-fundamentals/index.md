---
layout: lesson
title: 'React Fundamentals: Your First Interactive App'
slug: react-fundamentals-simplified
category: react
tags: [react, components, state, beginner, todo]
week: 4
phase: 2
sprint: 5
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/react-fundamentals-simplified/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> _"A component is a promise: given these props, I will render this UI."_

---

## 🎯 Session Goal (2 hours)

**By the end of this session**: Build a working todo list app that demonstrates:

1. **Components**: Breaking UI into reusable pieces
2. **State**: Making your app remember and update data
3. **Keys**: Helping React track list items efficiently

**What you'll build**: A todo app where you can add, remove, and toggle tasks as completed.

---

## 🧭 Prerequisites

- Basic HTML/CSS/JavaScript knowledge
- Node.js installed (for Vite)
- A code editor (VS Code recommended)
- Tailwind CSS (we'll set it up together)

---

## 🚀 Setup (10 minutes)

### Step 1: Create React Project with Vite

```bash
# Create new project
npm create vite@latest my-todo-app -- --template react

# Navigate into project
cd my-todo-app

# Install dependencies
npm install

# Install Tailwind CSS v4
npm install tailwindcss@next @tailwindcss/vite@next
```

### Step 2: Configure Vite for Tailwind v4

Edit `vite.config.js`:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [react(), tailwindcss()],
});
```

### Step 3: Add Tailwind to CSS

Edit `src/index.css` (replace all content):

```css
@import 'tailwindcss';
```

### Step 4: Create Components Directory

```bash
mkdir src/components
```

### Step 5: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` — you should see the Vite welcome screen.

---

## 📦 The Complete Todo App

### Final File Structure

```
src/
├── components/
│   ├── TaskList.jsx     (displays all tasks)
│   ├── TaskItem.jsx     (single task component)
│   └── AddTaskInput.jsx (input to add new tasks)
├── App.jsx          (main component with state)
└── main.jsx         (entry point)
```

### Create Components Directory

```bash
mkdir src/components
```

---

## 🧱 Building Block by Block

### 1. Understanding Components (Concept)

**What is a component?**

A component is a **function that returns JSX** (HTML-like syntax). Think of it as a custom HTML tag.

```jsx
// This is a component
function Greeting() {
	return <h1>Hello, World!</h1>;
}

// You use it like this:
<Greeting />;
```

**Why components?**

- **Reusability**: Write once, use many times
- **Organization**: Each component has one job
- **Maintainability**: Easy to find and fix bugs

---

### 2. The Main App Component

**File: `src/App.jsx`**

This is the "brain" of our app. It holds the **state** (the data) and passes it to child components.

```jsx
import { useState } from 'react';
import TaskList from './components/TaskList';
import AddTaskInput from './components/AddTaskInput';

function App() {
	// STATE: The list of tasks (this is our app's memory)
	const [tasks, setTasks] = useState([
		{ id: 1, text: 'Learn React basics', completed: false },
		{ id: 2, text: 'Build a todo app', completed: false },
	]);

	// FUNCTION: Add a new task
	const addTask = (text) => {
		const newTask = {
			id: Date.now(), // Simple unique ID
			text: text,
			completed: false,
		};
		setTasks([...tasks, newTask]); // Add to existing tasks
	};

	// FUNCTION: Remove a task
	const removeTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	// FUNCTION: Toggle task completion
	const toggleTask = (id) => {
		setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">📝 My Todo List</h1>

				<AddTaskInput onAdd={addTask} />

				<TaskList tasks={tasks} onRemove={removeTask} onToggle={toggleTask} />

				<div className="mt-6 text-center text-sm text-gray-600">
					Total: {tasks.length} tasks | Completed: {tasks.filter((t) => t.completed).length}
				</div>
			</div>
		</div>
	);
}

export default App;
```

**🔑 Key Concepts Here:**

1. **`useState`**: Creates a piece of state (data that can change)
   - `tasks` = current value
   - `setTasks` = function to update it
2. **State updates are immutable**: We create new arrays, not modify existing ones
3. **Props down, events up**: We pass data down and functions down (to be called by children)

**📚 JavaScript Array Methods Used:**

- **Spread operator (`...`)**: Creates a new array/object by copying existing values
  - `[...tasks, newTask]` → copies all tasks, then adds new one
  - `{ ...task, completed: !task.completed }` → copies task object, updates one property
  - [MDN: Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

- **`.filter()`**: Creates a new array with items that pass a test
  - `tasks.filter(task => task.id !== id)` → keeps only tasks that don't match the ID
  - `tasks.filter(t => t.completed)` → keeps only completed tasks
  - [MDN: Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

- **`.map()`**: Creates a new array by transforming each item
  - `tasks.map(task => ...)` → creates new array, can modify each task
  - Returns same length array, but items can be changed
  - [MDN: Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

---

### 3. The Task List Component (Start Simple: Read-Only)

**File: `src/components/TaskList.jsx`**

Let's start with the **simplest** component: displaying a list. No editing yet, just showing tasks.

```jsx
import TaskItem from './TaskItem';

function TaskList({ tasks, onRemove, onToggle }) {
	// If no tasks, show a friendly message
	if (tasks.length === 0) {
		return (
			<div className="text-center py-12 text-gray-500">
				<p className="text-lg">No tasks yet. Add one above! 👆</p>
			</div>
		);
	}

	// Render each task using .map()
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

**🔑 Key Concepts Here:**

1. **Conditional rendering**: Show different UI based on state
   - `if (tasks.length === 0)` checks if array is empty
   - Return different JSX based on condition

2. **Lists with `.map()`**: Transform array into React elements
   - `tasks.map(task => ...)` transforms each task into a `<TaskItem />` component
   - Returns an array of React elements that React renders
   - [MDN: Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

3. **Keys**: Each `TaskItem` needs a unique `key` prop
   - `key={task.id}` uses the task's unique ID
   - Helps React track which items changed (more on this below)

---

### 4. The Add Task Input Component (Simplified: No Form)

**File: `src/components/AddTaskInput.jsx`**

This component handles user input. We'll use a simple input + button (no `<form>` wrapper).

```jsx
import { useState } from 'react';

function AddTaskInput({ onAdd }) {
	const [inputValue, setInputValue] = useState('');

	const handleAdd = () => {
		if (inputValue.trim()) {
			onAdd(inputValue); // Call parent function
			setInputValue(''); // Clear input
		}
	};

	const handleKeyDown = (e) => {
		// Allow Enter key to add task (like a form would)
		if (e.key === 'Enter') {
			handleAdd();
		}
	};

	return (
		<div className="mb-6 flex gap-2">
			{/* onChange: Fires every time the user types
          e = event object (contains info about what happened)
          e.target = the DOM element that triggered the event (this input)
          e.target.value = the current text typed in the input */}
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder="What needs to be done?"
				className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
			/>
			<button
				onClick={handleAdd}
				className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
				Add
			</button>
		</div>
	);
}

export default AddTaskInput;
```

**🔑 Key Concepts Here:**

1. **Controlled input**: React controls the input value (not the DOM)
   - The input's `value` comes from state (`inputValue`)
   - Every keystroke updates state via `onChange`
   - React re-renders with the new value

2. **Event handlers**: `onChange`, `onClick`, and `onKeyDown`
   - **`onChange`**: Fires every time the user types
     - `e` = the event object (contains information about what happened)
     - `e.target` = the DOM element that triggered the event (the input field)
     - `e.target.value` = the current text in that input field
     - `(e) => setInputValue(e.target.value)` reads the input's current text and updates state
     - Updates state immediately, creating a "live" connection
     - [MDN: Event.target](https://developer.mozilla.org/en-US/docs/Web/API/Event/target)
     - [MDN: onChange event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)
   - **`onClick`**: Fires when button is clicked
     - Simpler than `onSubmit` (no need for `preventDefault()`)
     - [MDN: click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event)
   - **`onKeyDown`**: Fires when a key is pressed
     - `e.key === 'Enter'` checks if Enter was pressed
     - Allows keyboard-only interaction (accessibility!)
     - [MDN: keydown event](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event)

3. **Props**: `onAdd` is a function passed from parent

---

### 5. The Task Item Component (Simplified: No Edit Mode)

**File: `src/components/TaskItem.jsx`**

This component represents a single task. Keep it simple: just display, toggle, and delete.

```jsx
function TaskItem({ task, onRemove, onToggle }) {
	return (
		<div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
			{/* Checkbox to toggle completion */}
			<input
				type="checkbox"
				checked={task.completed}
				onChange={() => onToggle(task.id)}
				className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
			/>

			{/* Task text (strikethrough if completed) */}
			<span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.text}</span>

			{/* Delete button */}
			<button
				onClick={() => onRemove(task.id)}
				className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
				Delete
			</button>
		</div>
	);
}

export default TaskItem;
```

**🔑 Key Concepts Here:**

1. **Simple component**: No local state needed (simpler for beginners)
2. **Conditional styling**: Use template literals to apply different classes
3. **Event propagation**: Buttons call parent functions via props (`onToggle`, `onRemove`)

---

## 🔑 Deep Dive: Why Keys Matter

### The Problem Without Keys

When React renders a list, it needs to know which items changed. Without keys, React uses the array index, which causes bugs:

```jsx
// ❌ BAD: Using index as key
{
	tasks.map((task, index) => <TaskItem key={index} task={task} />);
}
```

**What goes wrong?**

1. Delete item 2 → React thinks item 3 is now item 2
2. Reorder items → React gets confused about which component is which
3. Input state gets mixed up between items

### The Solution: Unique Keys

```jsx
// ✅ GOOD: Using unique ID as key
{
	tasks.map((task) => <TaskItem key={task.id} task={task} />);
}
```

**Why this works:**

- Each task has a stable, unique `id`
- React can track which item is which, even if order changes
- Component state (like `isEditing`) stays with the correct item

**Rule of thumb:** Use a unique identifier from your data, not array index.

---

## 🧠 Understanding State Management

### What is State?

State is **data that changes over time**. In our app:

- `tasks` array (in `App.jsx`) — shared by multiple components
- `inputValue` (in `AddTaskForm.jsx`) — local to form
- `isEditing` (in `TaskItem.jsx`) — local to each task

### Where Should State Live?

**Rule:** Put state in the **lowest common ancestor** of components that need it.

```
App (tasks state here - both TaskList and stats need it)
├── AddTaskForm (inputValue here - only form needs it)
└── TaskList
    └── TaskItem (isEditing here - only this item needs it)
```

### How to Update State

**Never mutate state directly:**

```jsx
// ❌ WRONG
tasks.push(newTask);
setTasks(tasks);

// ✅ RIGHT
setTasks([...tasks, newTask]);
```

**Why?** React compares old and new state by reference. If you mutate, React thinks nothing changed.

**The spread operator (`...`) creates a new array:**

- `[...tasks, newTask]` copies all existing tasks into a new array, then adds the new task
- This creates a new reference, so React knows state changed
- [MDN: Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

---

## 🎨 Understanding Componentization

### Why Break Into Components?

Our app has 4 components. We could write it all in one file, but:

1. **Single Responsibility**: Each component does one thing
   - `App` → manages state
   - `AddTaskForm` → handles input
   - `TaskList` → displays list
   - `TaskItem` → displays one task

2. **Reusability**: `TaskItem` is used once per task

3. **Testability**: Easy to test each piece independently

4. **Maintainability**: Bug in editing? Look at `TaskItem`.

### Props: The Component API

Props are how components talk to each other:

```jsx
// Parent passes data down
<TaskItem
	task={task} // data
	onRemove={removeTask} // function
/>;

// Child receives via props
function TaskItem({ task, onRemove }) {
	// Use task.text, call onRemove(task.id)
}
```

**Props are read-only.** Child cannot modify them.

---

## 💭 Reflection Questions

> 💭 **Question 1: State Location**
>
> Why is `tasks` state in `App.jsx` and not in `TaskList.jsx`?
>
> **Hint:** Who else needs to know about tasks?

> 💭 **Question 2: Keys**
>
> What would happen if you used `Math.random()` as the key instead of `task.id`?
>
> **Hint:** Keys must be stable across renders.

> 💭 **Question 3: Immutability**
>
> Why do we write `setTasks([...tasks, newTask])` instead of `tasks.push(newTask)`?
>
> **Hint:** React needs to detect changes.

---

## 🧪 Exercises (Optional)

### Exercise 1: Add a "Clear Completed" Button

Add a button that removes all completed tasks.

**Hint:**

```jsx
const clearCompleted = () => {
	setTasks(tasks.filter((task) => !task.completed));
};
```

### Exercise 2: Add Task Priority

Add a `priority` field (low, medium, high) and color-code tasks.

### Exercise 3: Persist to localStorage

Save tasks to `localStorage` so they survive page refresh.

**Hint:** Use `useEffect` to sync state with localStorage.

---

## 📚 Key Takeaways

### Components

- Functions that return JSX
- Break UI into reusable pieces
- Receive data via props

### State

- Data that changes over time
- Use `useState` hook
- Never mutate directly — create new arrays/objects
- Use array methods: `.map()`, `.filter()`, and spread operator `...`
  - [MDN: Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
  - [MDN: Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
  - [MDN: Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

### Keys

- Must be unique and stable
- Help React track list items
- Use data IDs, not array index

### Data Flow

- Props flow down (parent → child)
- Events flow up (child calls parent function)
- State lives in common ancestor

---

## 🔗 Next Steps

After mastering this, you're ready for:

1. **Hooks Deep Dive** (`useEffect`, `useRef`, custom hooks)
   - [Hooks Mastery: The Engine of Interactivity]({{ '/lessons/en/react/react-hooks/' | relative_url }})
2. **State Architecture** (Context, reducers, Zustand)
   - [State Architecture: Scaling Beyond Components]({{ '/lessons/en/react/react-state-architecture/' | relative_url }})
3. **Routing** (React Router for multi-page apps)
   - [Routing & Navigation: The Multi-Page SPA]({{ '/lessons/en/react/react-routing/' | relative_url }})
4. **Backend Integration** (fetching data from APIs)
   - [Backend Integration: Connecting to the Real World]({{ '/lessons/en/react/react-backend-integration/' | relative_url }})
5. **Authentication** (sessions, protected routes, security)
   - [Authentication: Securing Your Application]({{ '/lessons/en/react/react-authentication/' | relative_url }})
6. **Testing** (unit, integration, E2E)
   - [Testing: Building Confidence in Your Code]({{ '/lessons/en/react/react-testing/' | relative_url }})
7. **Performance** (profiling, memoization, code splitting)
   - [Performance: Speed as a Feature]({{ '/lessons/en/react/react-performance/' | relative_url }})
8. **Deployment** (build, CI/CD, hosting)
   - [Deployment: Shipping to the World]({{ '/lessons/en/react/react-deployment/' | relative_url }})

---

## 🔗 Lesson Navigation

| Previous                                                        | Current          | Next                   |
| --------------------------------------------------------------- | ---------------- | ---------------------- | --------------------------------------------------- | ---------------- |
| [Modern Frontend Intro]({{ '/lessons/en/react/modern-fe-intro/' | relative_url }}) | **React Fundamentals** | [Hooks Mastery]({{ '/lessons/en/react/react-hooks/' | relative_url }}) |

## 🧘 Koan

> _"A component without state is a pure function. A component with state is a living thing."_

---

## 📖 Further Reading

- [React Docs: Thinking in React](https://react.dev/learn/thinking-in-react)
- [React Docs: State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [React Docs: Rendering Lists](https://react.dev/learn/rendering-lists)
