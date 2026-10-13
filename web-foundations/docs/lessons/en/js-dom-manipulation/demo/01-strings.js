const products = [
	{ id: 1, name: 'Safe Mug', price: 19.99, description: 'Durable, everyday mug.' },
	{ id: 2, name: 'Travel Bottle', price: 29.5, description: 'Keeps drinks cold.' },
	// Simulated untrusted input (a form field, a URL parameter, an API response).
	// Injected <script> tags do not run through innerHTML, but event-handler attributes do.
	{
		id: 3,
		name: '<img src=x onerror="document.getElementById(\'xss-banner\').hidden = false">Mug of Doom',
		price: 9.99,
		description: 'Try to break the DOM!',
	},
];

function escapeHtml(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function render(products, unsafe) {
	const list = document.getElementById('list');
	const clean = unsafe ? (value) => String(value) : escapeHtml;

	// map() turns each product into an HTML string; join('') glues them into one block.
	const html = `
		<div class="grid">
			${products
				.map(
					(p) => `
						<article class="card" data-id="${p.id}">
							<h3>${clean(p.name)}</h3>
							<p class="desc">${clean(p.description)}</p>
							<p class="price">$${p.price.toFixed(2)}</p>
						</article>
					`
				)
				.join('')}
		</div>
	`;
	document.getElementById('xss-banner').hidden = true;
	list.innerHTML = html;
}

const toggle = document.getElementById('unsafe');
toggle.addEventListener('change', () => render(products, toggle.checked));
render(products, toggle.checked);
