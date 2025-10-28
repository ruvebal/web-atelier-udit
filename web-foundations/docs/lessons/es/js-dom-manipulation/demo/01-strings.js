const products = [
	{ id: 1, name: 'Safe Mug', price: 19.99, description: 'Durable, everyday mug.' },
	{ id: 2, name: 'Travel Bottle', price: 29.5, description: 'Keeps drinks cold.' },
	// Simulate a malicious payload coming from user input or external API
	{
		id: 3,
		name: '<img src=x onerror="alert(`XSS`);document.body.innerHTML=`<h1>Pwned</h1>`">',
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

function render(products) {
	const list = document.getElementById('list');
	/*
	We use a "template literal" (also called a template string) in JavaScript, denoted by backticks (`).
	This allows us to embed variables and expressions directly inside the string using ${...}.

	Example:

		const name = "World";
		console.log(`Hello, ${name}!`); // Output: Hello, World!

	We use the map() method of Array instances "Array.prototype.map" here
	to transform each product object `p` into an HTML string using the function `(p) => ...`.
	For every product, we return a string containing its HTML card layout.
	Using "Array.prototype.map(fn)" creates a new array where each element is the string for one product card.
	After mapping, we call "Array.prototype.join('')" to combine all of the card strings into one big block of HTML.
	*/
	/*
	Ref. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array for more details.
	Ref. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach for more details.
	Ref. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map for more details.
	Ref. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join for more details.
	*/
	const html = `
		<div class="grid">
			${products
				.map(
					(p) => `
						<article class="card" data-id="${p.id}">
							<h3>${escapeHtml(p.name)}</h3>
							<p class="desc">${escapeHtml(p.description)}</p>
							<p class="price">$${p.price.toFixed(2)}</p>
						</article>
					`
				)
				.join('')}
		</div>
	`;
	list.innerHTML = html;
}
render(products);
