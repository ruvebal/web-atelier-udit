const products = [
	{ id: 1, name: 'Safe Mug', price: 19.99, description: 'Durable, everyday mug.' },
	{ id: 2, name: 'Travel Bottle', price: 29.5, description: 'Keeps drinks cold.' },
	{ id: 3, name: '<img onerror=alert("XSS") src=x>', price: 9.99, description: 'Harden your code!' },
];

function createCard(product) {
	const article = document.createElement('article');
	article.className = 'card';
	article.dataset.id = String(product.id);

	const h3 = document.createElement('h3');
	h3.textContent = product.name;

	const pDesc = document.createElement('p');
	pDesc.className = 'desc';
	pDesc.textContent = product.description;

	const pPrice = document.createElement('p');
	pPrice.className = 'price';
	pPrice.textContent = `$${product.price.toFixed(2)}`;

	article.append(h3, pDesc, pPrice);
	return article;
}

function render(products) {
	const list = document.getElementById('list');
	const grid = document.createElement('div');
	grid.className = 'grid';

	const frag = document.createDocumentFragment();
	products.forEach((p) => frag.appendChild(createCard(p)));
	grid.appendChild(frag);

	list.textContent = '';
	list.appendChild(grid);
}

render(products);
