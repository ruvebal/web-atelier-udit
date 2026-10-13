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

function createCard(product) {
	const article = document.createElement('article');
	article.className = 'card';
	article.dataset.id = String(product.id);

	const h3 = document.createElement('h3');
	h3.textContent = product.name; // text, never parsed as HTML

	const pDesc = document.createElement('p');
	pDesc.className = 'desc';
	pDesc.textContent = product.description;

	const pPrice = document.createElement('p');
	pPrice.className = 'price';
	pPrice.textContent = `$${product.price.toFixed(2)}`;

	article.append(h3, pDesc, pPrice);
	return article;
}

const list = document.getElementById('list');
const frag = document.createDocumentFragment();
products.forEach((p) => frag.append(createCard(p)));
list.replaceChildren(frag); // one insertion, one repaint
