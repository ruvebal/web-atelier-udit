function h(type, props = {}, ...children) {
	const el = document.createElement(type);
	for (const [k, v] of Object.entries(props)) {
		if (k === 'className') el.className = v;
		else if (k.startsWith('on') && typeof v === 'function') {
			el.addEventListener(k.slice(2).toLowerCase(), v);
		} else {
			el.setAttribute(k, v);
		}
	}
	for (const child of children.flat()) {
		if (child == null) continue;
		if (typeof child === 'string' || typeof child === 'number') {
			el.appendChild(document.createTextNode(String(child)));
		} else {
			el.appendChild(child);
		}
	}
	return el;
}

const products = [
	{ id: 1, name: 'Safe Mug', price: 19.99, description: 'Durable, everyday mug.' },
	{ id: 2, name: 'Travel Bottle', price: 29.5, description: 'Keeps drinks cold.' },
	{ id: 3, name: '<img onerror=alert("XSS") src=x>', price: 9.99, description: 'Harden your code!' },
];

function Card({ id, name, description, price }) {
	return h(
		'article',
		{ className: 'card', 'data-id': String(id) },
		h('h3', {}, name),
		h('p', { className: 'desc' }, description),
		h('p', { className: 'price' }, `$${price.toFixed(2)}`)
	);
}

function App() {
	return h(
		'div',
		{ className: 'grid' },
		products.map((p) => Card(p))
	);
}

document.getElementById('app').appendChild(App());
