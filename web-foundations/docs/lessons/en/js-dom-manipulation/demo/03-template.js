const products = [
	{ id: 1, name: 'Safe Mug', price: 19.99, description: 'Durable, everyday mug.' },
	{ id: 2, name: 'Travel Bottle', price: 29.5, description: 'Keeps drinks cold.' },
	// Same untrusted payload as demo 1: here it stays plain text.
	{
		id: 3,
		name: '<img src=x onerror="document.body.style.outline = \'8px solid red\'">Mug of Doom',
		price: 9.99,
		description: 'Try to break the DOM!',
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

// Batch every card in one DocumentFragment, then insert once.
const batch = document.createDocumentFragment();
products.forEach((product) => batch.append(renderCard(product)));
list.replaceChildren(batch);
