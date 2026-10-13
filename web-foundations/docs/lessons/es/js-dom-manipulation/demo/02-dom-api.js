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

function createCard(product) {
	const article = document.createElement('article');
	article.className = 'card';
	article.dataset.id = String(product.id);

	const h3 = document.createElement('h3');
	h3.textContent = product.name; // texto, nunca se interpreta como HTML

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
list.replaceChildren(frag); // una inserción, un repintado
