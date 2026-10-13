const products = [
	{ id: 1, name: 'Taza segura', price: 19.99, description: 'Resistente, para el día a día.' },
	{ id: 2, name: 'Botella de viaje', price: 29.5, description: 'Mantiene las bebidas frías.' },
	// El mismo payload no confiable de la demo 1: aquí se queda en texto plano.
	{
		id: 3,
		name: '<img src=x onerror="document.body.style.outline = \'8px solid red\'">Taza del caos',
		price: 9.99,
		description: '¡Intenta romper el DOM!',
	},
];

const template = document.getElementById('card-template');
const list = document.getElementById('list');

function renderCard(product) {
	const fragment = document.importNode(template.content, true);
	fragment.querySelector('.card').dataset.id = String(product.id);
	fragment.querySelector('.title').textContent = product.name;
	fragment.querySelector('.desc').textContent = product.description;
	fragment.querySelector('.price').textContent = `$${product.price.toFixed(2)}`;
	return fragment;
}

// Agrupa todas las tarjetas en un DocumentFragment e inserta una sola vez.
const batch = document.createDocumentFragment();
products.forEach((product) => batch.append(renderCard(product)));
list.replaceChildren(batch);
