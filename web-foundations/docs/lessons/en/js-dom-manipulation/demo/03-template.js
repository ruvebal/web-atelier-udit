const products = [
	{ id: 1, name: 'Safe Mug', price: 19.99, description: 'Durable, everyday mug.' },
	{ id: 2, name: 'Travel Bottle', price: 29.5, description: 'Keeps drinks cold.' },
	{ id: 3, name: '<img onerror=alert("XSS") src=x>', price: 9.99, description: 'Harden your code!' },
];

const template = document.getElementById('card-template');
const list = document.getElementById('list');

function renderCard(product) {
	const { id, name, description, price } = product;
	const fragment = template.content.cloneNode(true);
	const article = fragment.querySelector('.card');
	article.dataset.id = String(id);
	fragment.querySelector('.title').textContent = name;
	fragment.querySelector('.desc').textContent = description;
	fragment.querySelector('.price').textContent = `$${price.toFixed(2)}`;
	return fragment;
}

const batch = document.createDocumentFragment();
products.forEach((product) => batch.appendChild(renderCard(product)));
list.appendChild(batch);
