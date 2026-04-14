---
layout: lesson
title: 'Backend Integration: React Query, Mutations & GraphQL'
slug: react-backend-integration
category: react
tags: [react, fetch, react-query, tanstack-query, mutations, graphql, hygraph, mock-api, tailwind]
week: 9
phase: 3
sprint: 9
date: 2026-03-17
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/react-backend-integration/
status: published
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents

{: .no_toc }

- TOC
{:toc}
<!-- prettier-ignore-end -->

> _"A frontend without a backend is a painting without a gallery — beautiful, but unseen."_

---

## Code conventions in this lesson

[https://codesandbox.io/p/devbox/fetch-project-79syrg](https://codesandbox.io/p/devbox/fetch-project-79syrg)

All examples live in **one permanent CodeSandbox**. The sandbox is set up once at the start of class. As each topic is introduced, you add one new file to `src/pages/` — nothing is ever replaced.

- **CodeSandbox-ready** — a complete, copy-paste file. Works once the scaffold below is in place.
- **Excerpt** — partial pattern, illustrative only. Does not run as-is.
- **Template** — copy and replace `[BRACKETED]` values before use.

### Project structure

```
src/
  main.jsx                    ← QueryClient + Router providers
  App.jsx                     ← NavBar + Routes (all examples wired)
  services/
    postsApi.js               ← REST helpers (fetch, create, delete)
    graphqlApi.js             ← gqlRequest + query/mutation strings
  components/
    PostCard.jsx              ← reusable card with optional delete button
    StatusMessage.jsx         ← Loading / ErrorMsg / Empty
  pages/
    Home.jsx                  ← lesson index with links
    Ex1Query.jsx              ← 1 · useQuery
    Ex2Mutation.jsx           ← 2 · useMutation (POST)
    Ex3Crud.jsx               ← 3 · Full CRUD + optimistic delete
    Ex4GraphQLQuery.jsx       ← 4 · GraphQL query
    Ex5GraphQLMutation.jsx    ← 5 · GraphQL mutation
```

---

### Sandbox setup (do this once at the start of class)

**Step 1 — Create sandbox**

On [codesandbox.io](https://codesandbox.io) choose the **React** template (Vite, JavaScript — files are `.jsx`, no TypeScript).

**Step 2 — Add dependencies** via the **Dependencies panel** (sidebar `+`):

```
tailwindcss
@tailwindcss/vite
react-router-dom
@tanstack/react-query
@tanstack/react-query-devtools
```

**Step 3 — Wire Tailwind into Vite**

Replace `vite.config.js` with:

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [react(), tailwindcss()],
});
```

**Step 4 — Enable Tailwind in CSS**

Replace the contents of `src/index.css` with:

```css
@import 'tailwindcss';
```

**Step 5 — Build the scaffold** (Section 2 below) and verify the preview shows the home page with nav links.

> This is the **Tailwind v4** setup (single plugin, no `tailwind.config.js` needed). All examples in this lesson assume this environment.

---

## 🎯 Learning Objectives

By the end of this lesson, you will:

- [ ] Understand **server state** vs **UI state** — the fundamental distinction
- [ ] Use **React Query v5** (`useQuery`) to fetch, cache, and refetch data
- [ ] Handle **loading, error, and empty** states as first-class UI concerns
- [ ] Use **`useMutation`** to create, update, and delete data via a mock REST API
- [ ] Perform **cache invalidation** after mutations so the UI stays in sync
- [ ] Execute a **GraphQL query** against a real public API with React Query
- [ ] Connect to **Hygraph** (real CMS) with a GraphQL mutation

---

## 🧭 Position in the Journey

| Sprint            | Focus         | What changes in your app        |
| ----------------- | ------------- | ------------------------------- |
| 7 — Architecture  | Global state  | Features share state            |
| 8 — Routing       | Navigation    | Multi-page structure            |
| **→ 9 — Backend** | Data fetching | **Real data, real persistence** |
| 10 — Auth         | Security      | User identity                   |

---

## 1 — The Mental Model Shift

### UI state vs Server state

Before writing a single line of React Query, internalize this distinction:

|               | UI State                        | Server State                     |
| ------------- | ------------------------------- | -------------------------------- |
| **Lives**     | In the browser                  | On a remote server               |
| **Owner**     | Your React component            | The backend                      |
| **Freshness** | Always current                  | Can be stale                     |
| **Updates**   | Synchronous                     | Asynchronous                     |
| **Examples**  | `isOpen`, filters, selected tab | User profile, product list, cart |
| **Tooling**   | `useState`, `useReducer`        | **React Query**                  |

**Teaching moment:** Draw this on the board. Ask students: _"Is the list of items in a shopping cart UI state or server state?"_ Answer: it depends on whether the cart lives in the DB or only in the browser. This is a real design decision.

### The problem plain `fetch` creates

**Excerpt** — This is the pattern every student writes first. Point out its flaws.

```jsx
// ❌ What students write before React Query
function ProductList() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		fetch('/api/products')
			.then((r) => r.json())
			.then((data) => {
				setProducts(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	}, []);
	// ...
}
```

**Ask the class:** What happens if this component unmounts before the fetch completes? What if the user navigates away and back — will it refetch? What about caching? Background updates?

React Query solves all of this with one hook.

---

## 2 — Foundation Scaffold (build once, keep forever)

This is the permanent base of the sandbox. Create every file below **before** the first example. After this, you only ever _add_ files to `src/pages/`.

### The QueryClientProvider

The `QueryClientProvider` wraps your entire tree and provides an **in-memory cache** shared across all components. The cache lives in the browser session only — it is not persisted to localStorage or cookies by default. All queries in the lesson share this single client, so switching routes never loses cached data.

**Teaching moment:** Open the DevTools panel as soon as you wire this up. Show students the empty cache. By the end of the lesson it will be full.

---

**CodeSandbox-ready** — `src/main.jsx` (replace the template file)

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
			{/* DevTools panel: bottom-right corner. Open it on day 1 and leave it open. */}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>
);
```

---

**CodeSandbox-ready** — `src/App.jsx` (replace the template file)

```jsx
// src/App.jsx
// Navigation shell + route map.
// All 5 examples are pre-wired — add the page file and the link just works.
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Ex1Query from './pages/Ex1Query';
import Ex2Mutation from './pages/Ex2Mutation';
import Ex3Crud from './pages/Ex3Crud';
import Ex4GraphQLQuery from './pages/Ex4GraphQLQuery';
import Ex5GraphQLMutation from './pages/Ex5GraphQLMutation';

const NAV = [
	{ to: '/', label: '🏠 Home' },
	{ to: '/ex1', label: '1 · useQuery' },
	{ to: '/ex2', label: '2 · useMutation' },
	{ to: '/ex3', label: '3 · CRUD' },
	{ to: '/ex4', label: '4 · GraphQL Query' },
	{ to: '/ex5', label: '5 · GraphQL Mutation' },
];

export default function App() {
	return (
		<div className="min-h-screen bg-slate-50 font-sans">
			<nav className="bg-white border-b border-slate-200 px-4 py-3">
				<ul className="flex flex-wrap gap-2">
					{NAV.map(({ to, label }) => (
						<li key={to}>
							<NavLink
								to={to}
								end
								className={({ isActive }) =>
									`text-sm px-3 py-1.5 rounded-lg transition-colors ${
										isActive ? 'bg-blue-500 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
									}`
								}>
								{label}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
			<main className="max-w-2xl mx-auto px-4 py-10">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/ex1" element={<Ex1Query />} />
					<Route path="/ex2" element={<Ex2Mutation />} />
					<Route path="/ex3" element={<Ex3Crud />} />
					<Route path="/ex4" element={<Ex4GraphQLQuery />} />
					<Route path="/ex5" element={<Ex5GraphQLMutation />} />
				</Routes>
			</main>
		</div>
	);
}
```

> **Why pre-wire all routes?** It avoids editing `App.jsx` mid-lesson. Students see the nav bar first and understand the lesson structure before writing any query code.

---

**CodeSandbox-ready** — `src/services/postsApi.js` (create new file)

```js
// src/services/postsApi.js
// All REST calls are isolated here. Components import functions, not fetch().
// This is the separation of concerns we teach: UI ≠ data fetching.

const BASE = 'https://jsonplaceholder.typicode.com';

export async function fetchPosts(limit = 8) {
	const res = await fetch(`${BASE}/posts?_limit=${limit}`);
	if (!res.ok) throw new Error(`Server error: ${res.status}`);
	return res.json();
}

export async function createPost(post) {
	const res = await fetch(`${BASE}/posts`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(post),
	});
	if (!res.ok) throw new Error(`Server error: ${res.status}`);
	return res.json(); // returns { id: 101, title, body, userId }
}

export async function deletePost(id) {
	const res = await fetch(`${BASE}/posts/${id}`, { method: 'DELETE' });
	if (!res.ok) throw new Error(`Server error: ${res.status}`);
	return id; // return the id so mutations can use it in onMutate
}
```

---

**CodeSandbox-ready** — `src/services/graphqlApi.js` (create new file)

```js
// src/services/graphqlApi.js
// Minimal GraphQL client — no Apollo, no urql, just fetch().
// Shows students that GraphQL is just a POST request with a query string.

const ENDPOINT = 'https://graphqlzero.almansi.me/api';

export async function gqlRequest(query, variables = {}) {
	const res = await fetch(ENDPOINT, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query, variables }),
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const { data, errors } = await res.json();
	if (errors) throw new Error(errors[0].message);
	return data;
}

// ── Queries and mutations live here — not in components ────────────────────

export const POSTS_QUERY = `
  query GetPosts {
    posts(options: { paginate: { limit: 8 } }) {
      data {
        id title body
        user { name }
      }
    }
  }
`;

export const CREATE_POST_MUTATION = `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id title body
    }
  }
`;
```

---

**CodeSandbox-ready** — `src/components/PostCard.jsx` (create new file)

```jsx
// src/components/PostCard.jsx
// Reusable post card. Pass onDelete to enable the delete button.

export default function PostCard({ post, onDelete, isDeleting }) {
	return (
		<li className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm text-sm">
			<span className="flex-1">
				<span className="font-bold text-blue-500">#{post.id}</span> {post.title}
			</span>
			{onDelete && (
				<button
					onClick={() => onDelete(post.id)}
					disabled={isDeleting}
					className="text-gray-300 hover:text-red-500 transition-colors text-lg leading-none disabled:opacity-30 cursor-pointer bg-transparent border-none"
					title="Delete post">
					🗑
				</button>
			)}
		</li>
	);
}
```

---

**CodeSandbox-ready** — `src/components/StatusMessage.jsx` (create new file)

```jsx
// src/components/StatusMessage.jsx
// Three named exports for loading / error / empty — keeps page components clean.

export function Loading({ text = 'Loading…' }) {
	return <p className="text-gray-400 py-4">⏳ {text}</p>;
}

export function ErrorMsg({ message }) {
	return <p className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-3">❌ {message}</p>;
}

export function Empty({ text = 'No items found.' }) {
	return <p className="text-gray-400">{text}</p>;
}
```

---

**CodeSandbox-ready** — `src/pages/Home.jsx` (create new file)

```jsx
// src/pages/Home.jsx
// Lesson index — one card per example. Students see the full lesson arc up front.
import { Link } from 'react-router-dom';

const EXAMPLES = [
	{ path: '/ex1', title: '1 · useQuery', desc: 'Fetch and cache a post list. staleTime, loading, error states.' },
	{ path: '/ex2', title: '2 · useMutation (POST)', desc: 'Create a post. isPending, onSuccess, cache invalidation.' },
	{ path: '/ex3', title: '3 · Full CRUD', desc: 'Create + optimistic delete. onMutate, rollback on error.' },
	{ path: '/ex4', title: '4 · GraphQL Query', desc: 'Fetch posts + user names in one request. No Apollo needed.' },
	{ path: '/ex5', title: '5 · GraphQL Mutation', desc: 'Create a post via GraphQL mutation with typed variables.' },
];

export default function Home() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-2">React Query — Sprint 9</h1>
			<p className="text-slate-500 mb-8 text-sm">Backend Integration · Mock APIs · GraphQL</p>
			<ul className="space-y-3">
				{EXAMPLES.map(({ path, title, desc }) => (
					<li key={path}>
						<Link
							to={path}
							className="block p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-blue-300 transition-colors">
							<p className="font-semibold text-blue-600">{title}</p>
							<p className="text-sm text-slate-500 mt-1">{desc}</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
```

> **Verify the scaffold:** After adding these 7 files the preview should show a nav bar with 6 links and a home page with 5 cards. Pages 1–5 will error until you add their files — that is expected.

---

## 3 — useQuery: Fetching Data

### The core pattern

**Excerpt** — Anatomy of `useQuery`. Explain each field.

```jsx
const { data, isLoading, isError, error, refetch } = useQuery({
	queryKey: ['posts'], // cache key — array of strings/values
	queryFn: fetchPosts, // async function that returns data
	staleTime: 1000 * 60 * 5, // 5 min: don't refetch if data is fresh
});
```

### CodeSandbox Example 1: Fetching posts with React Query

Fetches from [JSONPlaceholder](https://jsonplaceholder.typicode.com) — the free, public REST mock used throughout this lesson.

**CodeSandbox-ready** — Create `src/pages/Ex1Query.jsx`.

```jsx
// src/pages/Ex1Query.jsx
// Demonstrates:
//   - useQuery with loading / error / empty states
//   - queryKey as cache identifier
//   - staleTime: suppress refetch if data is still fresh
//   - fetchPosts imported from services (separation of concerns)

import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../services/postsApi';
import PostCard from '../components/PostCard';
import { Loading, ErrorMsg, Empty } from '../components/StatusMessage';

export default function Ex1Query() {
	const {
		data: posts,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['posts'],
		queryFn: () => fetchPosts(10),
		staleTime: 1000 * 30, // 30 s — won't refetch if data is still fresh
	});

	if (isLoading) return <Loading text="Fetching posts…" />;
	if (isError) return <ErrorMsg message={error.message} />;
	if (!posts?.length) return <Empty />;

	return (
		<div>
			<h1 className="text-2xl font-bold mb-2">📰 Posts (useQuery)</h1>
			<p className="text-sm text-slate-400 mb-6">
				staleTime: 30 s — switch tabs and come back to see background refetch in DevTools
			</p>
			<ul className="space-y-2">
				{posts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</ul>
		</div>
	);
}
```

**Classroom exercise — do this live with students:**

1. Open Network DevTools → watch the request happen once.
2. Switch to another tab and come back → React Query refetches in the background.
3. Change `staleTime` to `Infinity` → the network request stops happening.

---

## 4 — useMutation: Writing Data

### The mock API for mutations

**JSONPlaceholder** accepts POST, PUT, and DELETE requests and returns realistic responses — the data is _not_ actually persisted, but the response is a valid 201/200. Perfect for teaching without a real backend.

| Method | URL        | Returns                                            |
| ------ | ---------- | -------------------------------------------------- |
| POST   | `/posts`   | `{ id: 101, title, body, userId }` — `201 Created` |
| PUT    | `/posts/1` | Updated resource — `200 OK`                        |
| DELETE | `/posts/1` | `{}` — `200 OK`                                    |

### The mutation pattern

**Excerpt** — Anatomy of `useMutation`. Explain the lifecycle.

```jsx
const mutation = useMutation({
	mutationFn: (newPost) => createPost(newPost), // async function
	onSuccess: (data) => {
		// data = what the server returned
		queryClient.invalidateQueries({ queryKey: ['posts'] }); // refresh list
	},
	onError: (error) => {
		console.error('Mutation failed:', error);
	},
});

// Trigger: mutation.mutate({ title: '...', body: '...' })
// States:  mutation.isPending | mutation.isError | mutation.isSuccess
```

**Teaching moment:** Draw the mutation lifecycle on the board:

```
mutate() called
    ↓
isPending = true  ← disable button, show spinner
    ↓
Server responds
    ↓
onSuccess → invalidateQueries → useQuery refetches automatically
    ↓
isPending = false, isSuccess = true
```

### CodeSandbox Example 2: Creating a post with useMutation

**CodeSandbox-ready** — Create `src/pages/Ex2Mutation.jsx`.

```jsx
// src/pages/Ex2Mutation.jsx
// Demonstrates:
//   - useMutation with POST to JSONPlaceholder mock API
//   - isPending: disables inputs and changes button label
//   - onSuccess: invalidateQueries → useQuery list refreshes automatically
//   - onError: inline error message in the form
//   - Controlled form with useState

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, createPost } from '../services/postsApi';
import PostCard from '../components/PostCard';
import { Loading } from '../components/StatusMessage';

function CreatePostForm() {
	const queryClient = useQueryClient();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const mutation = useMutation({
		mutationFn: createPost,
		onSuccess: (newPost) => {
			// invalidateQueries marks ['posts'] as stale → triggers a refetch
			queryClient.invalidateQueries({ queryKey: ['posts'] });
			setTitle('');
			setBody('');
			alert(`✅ Created post #${newPost.id}: "${newPost.title}"`);
		},
		onError: (error) => {
			console.error('Failed:', error.message);
		},
	});

	const inputClass =
		'w-full mb-3 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50';

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				if (title.trim()) mutation.mutate({ title, body, userId: 1 });
			}}
			className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
			<h2 className="text-lg font-semibold mb-4 mt-0">New Post</h2>
			<input
				className={inputClass}
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				disabled={mutation.isPending}
			/>
			<textarea
				className={`${inputClass} min-h-[80px] resize-y`}
				placeholder="Body"
				value={body}
				onChange={(e) => setBody(e.target.value)}
				disabled={mutation.isPending}
			/>
			<button
				type="submit"
				disabled={mutation.isPending}
				className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-sm disabled:opacity-50 cursor-pointer transition-colors">
				{mutation.isPending ? '⏳ Posting…' : '📤 Create Post'}
			</button>
			{mutation.isError && <p className="mt-3 text-sm text-red-500">❌ {mutation.error.message}</p>}
		</form>
	);
}

export default function Ex2Mutation() {
	const { data: posts, isLoading } = useQuery({
		queryKey: ['posts'],
		queryFn: () => fetchPosts(5),
	});

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">✍️ useMutation (POST)</h1>
			<CreatePostForm />
			<h2 className="text-lg font-semibold mb-3">Recent Posts</h2>
			{isLoading ? (
				<Loading />
			) : (
				<ul className="space-y-2">
					{posts?.map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</ul>
			)}
		</div>
	);
}
```

---

## 5 — Full CRUD with Optimistic Updates

### What is an optimistic update?

The term "optimistic update" comes from the idea of being optimistic about the outcome of a server request: you **optimistically** assume the server will succeed and update the UI **immediately**, before waiting for the server’s response. If the server later responds with an error, you then roll back the change. This approach improves perceived responsiveness, and is especially popular in interactive UIs where waiting for confirmation would create noticeable latency.

**When to use it:** Delete, like/unlike, quick toggles. Low-risk, where latency hurts UX.

**When not to use it:** Payment flows, form submissions where the server assigns important IDs, anything where showing fake data is misleading.

> 💭 _"Optimistic update is a bet. You are betting the server will agree with you. When is that bet unethical?"_ — Atelier reflection

### CodeSandbox Example 3: Full CRUD with optimistic delete

**CodeSandbox-ready** — Create `src/pages/Ex3Crud.jsx`.

```jsx
// src/pages/Ex3Crud.jsx
// Demonstrates:
//   - useMutation CREATE: POST → cache invalidation
//   - useMutation DELETE: optimistic update → rollback on error
//   - cancelQueries before optimistic update (prevents race conditions)
//   - useQueryClient.setQueryData for direct cache manipulation

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, createPost, deletePost } from '../services/postsApi';
import PostCard from '../components/PostCard';
import { Loading, ErrorMsg } from '../components/StatusMessage';

function CreatePostForm() {
	const queryClient = useQueryClient();
	const [title, setTitle] = useState('');

	const createMutation = useMutation({
		mutationFn: createPost,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] });
			setTitle('');
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				if (title.trim()) createMutation.mutate({ title, body: 'Created from form', userId: 1 });
			}}
			className="flex gap-2 mb-6">
			<input
				className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
				placeholder="New post title…"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				disabled={createMutation.isPending}
			/>
			<button
				type="submit"
				disabled={createMutation.isPending}
				className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm disabled:opacity-50 cursor-pointer whitespace-nowrap transition-colors">
				{createMutation.isPending ? '…' : '+ Add'}
			</button>
		</form>
	);
}

function PostListWithDelete() {
	const queryClient = useQueryClient();
	const {
		data: posts,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['posts'],
		queryFn: () => fetchPosts(8),
	});

	const deleteMutation = useMutation({
		mutationFn: deletePost,

		// Step 1 — Optimistically remove before the server responds
		onMutate: async (deletedId) => {
			await queryClient.cancelQueries({ queryKey: ['posts'] }); // prevent race
			const previousPosts = queryClient.getQueryData(['posts']); // snapshot
			queryClient.setQueryData(['posts'], (old) => old?.filter((p) => p.id !== deletedId));
			return { previousPosts }; // passed to onError as context
		},

		// Step 2 — Server failed: restore snapshot
		onError: (_err, _id, context) => {
			if (context?.previousPosts) queryClient.setQueryData(['posts'], context.previousPosts);
			alert('❌ Delete failed — changes reverted');
		},

		// Step 3 — Always sync with server truth once settled
		onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
	});

	if (isLoading) return <Loading />;
	if (isError) return <ErrorMsg message="Failed to load posts" />;

	return (
		<ul className="space-y-2">
			{posts?.map((post) => (
				<PostCard
					key={post.id}
					post={post}
					onDelete={(id) => deleteMutation.mutate(id)}
					isDeleting={deleteMutation.isPending}
				/>
			))}
		</ul>
	);
}

export default function Ex3Crud() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">📋 Full CRUD + Optimistic Delete</h1>
			<CreatePostForm />
			<PostListWithDelete />
		</div>
	);
}
```

**Walk through the optimistic update flow live in class:**

1. Click 🗑 on any post — it disappears **instantly** (optimistic).
2. Open Network tab — the DELETE request fires in parallel.
3. JSONPlaceholder returns 200 OK → `onSettled` triggers a refetch → item reappears (because JSONPlaceholder doesn't actually delete it).
4. _"In a real app, it would be gone on the server too. Here we see the refetch because the mock doesn't persist."_

---

## 6 — GraphQL with React Query

### Why GraphQL?

REST has one endpoint per resource. GraphQL has one endpoint for everything — you describe _exactly_ what you want.

|                    | REST                           | GraphQL                    |
| ------------------ | ------------------------------ | -------------------------- |
| **Endpoint**       | `/posts`, `/posts/1`, `/users` | `/graphql`                 |
| **Response shape** | Fixed by server                | Defined by client query    |
| **Over-fetching**  | Common                         | Eliminated                 |
| **Under-fetching** | Common (N+1)                   | Solved with nested queries |
| **Used by**        | Laravel, most APIs             | Hygraph, GitHub, Shopify…  |

### GraphQL request shape

**Excerpt** — How a GraphQL POST request looks. Always `POST` to a single endpoint.

```javascript
fetch('https://your-endpoint.com/api', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
		query: `
      query GetPosts {
        posts { id title body }
      }
    `,
		variables: {}, // optional — for parameterized queries
	}),
});
```

### The classroom mock: graphqlzero.almansi.me

For classroom use we use [GraphQL Zero](https://graphqlzero.almansi.me) — a free, public GraphQL API mirroring JSONPlaceholder. No account, no key, no setup needed.

```text
Endpoint: https://graphqlzero.almansi.me/api
```

### CodeSandbox Example 4: GraphQL query with React Query

**CodeSandbox-ready** — Create `src/pages/Ex4GraphQLQuery.jsx`.

```jsx
// src/pages/Ex4GraphQLQuery.jsx
// Demonstrates:
//   - GraphQL requests with plain fetch (no Apollo, no urql needed)
//   - useQuery with a GraphQL queryFn
//   - Nested query: posts + user names in ONE request (no N+1)
//   - queryKey namespaced by source ['gql', 'posts']
//   - POSTS_QUERY imported from services (query strings don't belong in components)

import { useQuery } from '@tanstack/react-query';
import { gqlRequest, POSTS_QUERY } from '../services/graphqlApi';
import { Loading, ErrorMsg, Empty } from '../components/StatusMessage';

export default function Ex4GraphQLQuery() {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['gql', 'posts'], // 'gql' namespace keeps REST/GQL keys separate
		queryFn: () => gqlRequest(POSTS_QUERY),
	});

	if (isLoading) return <Loading text="Fetching via GraphQL…" />;
	if (isError) return <ErrorMsg message={error.message} />;

	const posts = data?.posts?.data ?? [];
	if (!posts.length) return <Empty />;

	return (
		<div>
			<h1 className="text-2xl font-bold mb-2">🔷 GraphQL Query</h1>
			<p className="text-sm text-slate-400 mb-6">
				Source: <code className="bg-slate-100 px-1 rounded">graphqlzero.almansi.me</code> — public mirror of JSONPlaceholder
			</p>
			<ul className="space-y-3">
				{posts.map((post) => (
					<li key={post.id} className="p-4 bg-white rounded-xl shadow-sm border-l-4 border-indigo-400">
						<p className="font-semibold text-indigo-600 mb-1">{post.title}</p>
						<p className="text-xs text-slate-400 mb-2">
							by {post.user?.name ?? '—'} · #{post.id}
						</p>
						<p className="text-sm text-slate-600">{post.body.slice(0, 90)}…</p>
					</li>
				))}
			</ul>
		</div>
	);
}
```

**Classroom exercise — open the [GraphQL Zero playground](https://graphqlzero.almansi.me):**

1. Run the query manually — students see the raw JSON shape.
2. Add a field that doesn't exist — observe the error.
3. Remove `user { name }` — show you only get what you ask for.
4. _"What would the REST equivalent of this nested query look like?"_ Answer: two requests — GET `/posts` then GET `/users/:id` for each.

### CodeSandbox Example 5: GraphQL mutation (create a post)

**CodeSandbox-ready** — Create `src/pages/Ex5GraphQLMutation.jsx`.

```jsx
// src/pages/Ex5GraphQLMutation.jsx
// Demonstrates:
//   - GraphQL mutation with typed variables ($input: CreatePostInput!)
//   - mutationFn receives the object passed to mutation.mutate()
//   - CREATE_POST_MUTATION imported from services (not hardcoded here)
//   - Success state renders the server response as formatted JSON

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { gqlRequest, CREATE_POST_MUTATION } from '../services/graphqlApi';

export default function Ex5GraphQLMutation() {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [created, setCreated] = useState(null);

	const mutation = useMutation({
		mutationFn: ({ title, body }) => gqlRequest(CREATE_POST_MUTATION, { input: { title, body } }),
		onSuccess: (data) => {
			setCreated(data.createPost);
			setTitle('');
			setBody('');
		},
	});

	const inputClass =
		'w-full mb-3 px-3 py-2 rounded-lg border border-violet-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 disabled:opacity-50';

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">🔷 GraphQL Mutation</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (title.trim()) mutation.mutate({ title, body });
				}}
				className="bg-violet-50 border border-violet-100 rounded-xl p-6 mb-6">
				<h2 className="text-lg font-semibold mb-4 mt-0 text-violet-800">Create Post via GraphQL</h2>
				<input
					className={inputClass}
					placeholder="Post title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					disabled={mutation.isPending}
				/>
				<textarea
					className={`${inputClass} min-h-[80px] resize-y`}
					placeholder="Post body"
					value={body}
					onChange={(e) => setBody(e.target.value)}
					disabled={mutation.isPending}
				/>
				<button
					type="submit"
					disabled={mutation.isPending}
					className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-lg font-semibold text-sm disabled:opacity-50 cursor-pointer transition-colors">
					{mutation.isPending ? '⏳ Creating…' : '🚀 Create via GraphQL'}
				</button>
				{mutation.isError && <p className="mt-3 text-sm text-red-500">❌ {mutation.error.message}</p>}
			</form>
			{created && (
				<div className="bg-green-50 border border-green-200 rounded-xl p-4">
					<p className="font-semibold text-green-700 mb-2">✅ Post created!</p>
					<pre className="text-xs bg-white rounded-lg p-3 overflow-x-auto border border-green-100">
						{JSON.stringify(created, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
}
```

---

## 7 — Hygraph: Real GraphQL CMS

> This section is for students ready to connect to a real backend. Requires a free Hygraph account.

### What Hygraph gives you

Hygraph (formerly GraphCMS) is a **headless CMS** — you model your content, and it auto-generates a GraphQL API. No backend code needed.

**Free tier:** 3 projects, unlimited reads, rate-limited writes. Perfect for student projects.

### Setup: 5 minutes

1. Create a free account at [hygraph.com](https://hygraph.com)
2. Create a project → choose any starter template (e.g. Blog)
3. Go to **Settings → API Access**
4. Copy your **Content API** endpoint (public reads)
5. For mutations: create a **Permanent Auth Token** with `MUTATION` permissions

### Hygraph integration template

**Template** — Replace `[YOUR_ENDPOINT]` and `[YOUR_TOKEN]` before use.

```jsx
// src/lib/hygraph.js — Template
// Replace [YOUR_ENDPOINT] and [YOUR_TOKEN] with values from
// Hygraph → Settings → API Access

const HYGRAPH_ENDPOINT = '[YOUR_ENDPOINT]';
// e.g. 'https://api-eu-central-1.hygraph.com/v2/clxxxxx/master'

const HYGRAPH_TOKEN = '[YOUR_TOKEN]';
// From Hygraph → Settings → API Access → Permanent Auth Tokens

export async function hygraphQuery(query, variables = {}) {
	const res = await fetch(HYGRAPH_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${HYGRAPH_TOKEN}`,
		},
		body: JSON.stringify({ query, variables }),
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const { data, errors } = await res.json();
	if (errors) throw new Error(errors[0].message);
	return data;
}
```

**Template** — Hygraph query + mutation for a Blog post model. Adjust field names to your schema.

```jsx
// src/hooks/usePosts.js — Template
// Requires: @tanstack/react-query@5
// Assumes your Hygraph schema has a "Post" model with title and content fields.

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hygraphQuery } from '../lib/hygraph';

const GET_POSTS = `
  query GetPosts {
    posts(first: 10, orderBy: createdAt_DESC) {
      id
      title
      content
      createdAt
    }
  }
`;

const CREATE_POST = `
  mutation CreatePost($title: String!, $content: String!) {
    createPost(data: { title: $title, content: $content }) {
      id
      title
    }
  }
`;

export function usePosts() {
	return useQuery({
		queryKey: ['hygraph', 'posts'],
		queryFn: () => hygraphQuery(GET_POSTS).then((d) => d.posts),
	});
}

export function useCreatePost() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ title, content }) => hygraphQuery(CREATE_POST, { title, content }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['hygraph', 'posts'] });
		},
	});
}
```

**Teaching note:** Walk students through the Hygraph schema builder. Model a `Post` with title and content fields. Then show how the API is auto-generated — the schema _is_ the API contract.

---

## 8 — Key Concepts Summary

### Query key design

The query key is the cache identifier. Think of it as an address.

**Excerpt** — Query key patterns. Shows naming strategy, not runnable as-is.

```javascript
// Single entity type
useQuery({ queryKey: ['posts'] });

// Parameterized — different keys = different cache entries
useQuery({ queryKey: ['posts', postId] });
useQuery({ queryKey: ['posts', { userId: 1, page: 2 }] });

// Namespaced by source
useQuery({ queryKey: ['rest', 'posts'] });
useQuery({ queryKey: ['gql', 'posts'] });
useQuery({ queryKey: ['hygraph', 'posts'] });

// Invalidate all posts regardless of params:
queryClient.invalidateQueries({ queryKey: ['posts'] }); // matches ['posts', ...]
```

### Cache times

**Excerpt** — React Query v5 cache configuration at the client level.

```javascript
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // Data "fresh" for 5 minutes
			gcTime: 1000 * 60 * 10, // Keep unused data in memory 10 min (v5: gcTime, not cacheTime)
			retry: 2, // Retry failed queries twice
			refetchOnWindowFocus: true, // Refetch when user returns to tab
		},
	},
});
```

### Error normalization at the boundary

**Excerpt** — Normalize errors in the API layer, not in components.

```javascript
// src/lib/apiClient.js
export async function apiGet(url, options = {}) {
	const res = await fetch(url, options);
	if (!res.ok) {
		// Normalize all HTTP errors into JavaScript Error objects.
		// Components receive Error instances, not raw Response objects.
		throw new Error(`${res.status}: ${res.statusText}`);
	}
	return res.json();
}

export async function apiPost(url, body) {
	return apiGet(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
}
```

---

## 9 — Sprint Deliverables

|          | Deliverable            | Pattern                                      |
| -------- | ---------------------- | -------------------------------------------- |
| ✅       | API client module      | `apiGet`, `apiPost` in `src/lib/`            |
| ✅       | 3+ `useQuery` hooks    | One per data type, with cache keys           |
| ✅       | Loading/error/empty UI | Every data view handles all three            |
| ✅       | 1 mutation             | Create, update, or delete with `useMutation` |
| ✅       | Cache invalidation     | `invalidateQueries` after mutation success   |
| 🎁 Bonus | Optimistic update      | For delete or toggle operations              |
| 🎁 Bonus | GraphQL query          | Against GraphQL Zero or Hygraph              |

---

## 10 — Atelier Reflections

> 💭 _"Where in your project did you mix UI state with server state? What bug appeared?"_

> 💭 _"Optimistic update is a lie. When is that lie acceptable? When is it unethical?"_

> 💭 _"Why might GraphQL be a worse choice than REST for your specific project? Name one case."_

> 💭 _"React Query caches data between page navigations. Does this change how users perceive your app's speed? Does it create any risks?"_

---

## 📚 Reference: React Query v5 Cheatsheet

**Excerpt** — Quick reference card for the APIs used in this lesson.

```javascript
// ─── INSTALLATION ────────────────────────────────────────
// npm install @tanstack/react-query@5
// Optional: npm install @tanstack/react-query-devtools

// ─── SETUP ───────────────────────────────────────────────
const queryClient = new QueryClient();
// Wrap app: <QueryClientProvider client={queryClient}>

// ─── useQuery ────────────────────────────────────────────
const {
	data, // the response data
	isLoading, // first load, no cached data
	isPending, // waiting (v5 preferred over isLoading)
	isFetching, // any fetch in progress (including background)
	isError, // request failed
	error, // Error object
	refetch, // manual trigger
} = useQuery({
	queryKey: ['key', param], // cache address
	queryFn: () => fetchData(), // async → data
	staleTime: 5 * 60 * 1000, // ms before data is "stale"
	enabled: !!someCondition, // conditional fetching
});

// ─── useMutation ─────────────────────────────────────────
const mutation = useMutation({
	mutationFn: (variables) => postData(variables),
	onSuccess: (data, variables, context) => {
		/* ... */
	},
	onError: (error, variables, context) => {
		/* ... */
	},
	onSettled: (data, error) => {
		/* always runs */
	},
});
mutation.mutate(variables); // fire and forget
mutation.mutateAsync(variables); // fire + returns Promise
// mutation.isPending | .isError | .isSuccess | .error

// ─── CACHE OPERATIONS ────────────────────────────────────
const queryClient = useQueryClient();
queryClient.invalidateQueries({ queryKey: ['posts'] }); // refetch
queryClient.setQueryData(['posts'], updaterFn); // optimistic
queryClient.cancelQueries({ queryKey: ['posts'] }); // cancel in-flight
queryClient.getQueryData(['posts']); // read sync

// ─── OPTIMISTIC UPDATE PATTERN ───────────────────────────
const mutation = useMutation({
	mutationFn: deleteItem,
	onMutate: async (id) => {
		await queryClient.cancelQueries({ queryKey: ['items'] });
		const prev = queryClient.getQueryData(['items']);
		queryClient.setQueryData(['items'], (old) => old.filter((i) => i.id !== id));
		return { prev }; // context for rollback
	},
	onError: (_err, _id, context) => {
		queryClient.setQueryData(['items'], context.prev); // rollback
	},
	onSettled: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
});
```

---

## 🔗 Lesson Navigation

| Previous                                                         | Current                 | Next                               |
| ---------------------------------------------------------------- | ----------------------- | ---------------------------------- |
| [State Architecture](../react-state-architecture/)             | **Backend Integration** | [Routing](../react-routing/)       |

---

> _"Real data is messy. Cache is memory. Your job is to make both feel clean."_
