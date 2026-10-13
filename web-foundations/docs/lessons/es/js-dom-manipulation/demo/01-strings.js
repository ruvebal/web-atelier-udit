const products = [
	{ id: 1, name: 'Taza segura', price: 19.99, description: 'Resistente, para el día a día.' },
	{ id: 2, name: 'Botella de viaje', price: 29.5, description: 'Mantiene las bebidas frías.' },
	// Entrada no confiable simulada (un campo de formulario, un parámetro de URL, una respuesta de API).
	// Las etiquetas <script> inyectadas con innerHTML no se ejecutan, pero los atributos de evento sí.
	{
		id: 3,
		name: '<img src=x onerror="document.getElementById(\'xss-banner\').hidden = false">Taza del caos',
		price: 9.99,
		description: '¡Intenta romper el DOM!',
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

	// map() convierte cada producto en una cadena HTML; join('') las une en un solo bloque.
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
