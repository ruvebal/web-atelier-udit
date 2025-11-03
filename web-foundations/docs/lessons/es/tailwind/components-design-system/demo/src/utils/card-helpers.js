/**
 * utils/card-helpers.js — Helper functions for Card component
 */

async function ensureTemplateAvailable(templateId, templateUrl) {
	if (document.getElementById(templateId)) return;

	const res = await fetch(templateUrl, { credentials: 'same-origin' });
	if (!res.ok) throw new Error(`Failed to load template: ${templateUrl}`);
	const html = await res.text();

	const doc = new DOMParser().parseFromString(html, 'text/html');
	const fetchedTemplate = doc.querySelector('template');
	if (!fetchedTemplate || !fetchedTemplate.id) {
		throw new Error(`No <template id="..."> found in ${templateUrl}`);
	}
	document.body.appendChild(fetchedTemplate);
}

export async function createCard(container, { image, title, description, tags = [], hover = false }) {
	await ensureTemplateAvailable('card', './src/components/card.html');

	const template = document.getElementById('card');
	const clone = template.content.cloneNode(true);
	const card = clone.querySelector('article');

	if (hover) {
		card.classList.add('card-hover');
	}

	// Insertar imagen si existe (antes del card-header)
	if (image) {
		const img = document.createElement('img');
		img.src = image;
		img.alt = title || 'Imagen del proyecto';
		img.className = 'w-full h-48 object-cover rounded-t-lg';
		card.insertBefore(img, card.firstChild);
	}

	// Actualizar título
	const titleEl = card.querySelector('.card-title');
	if (titleEl && title) {
		titleEl.textContent = title;
	}

	// Actualizar descripción
	const cardBody = card.querySelector('.card-body');
	if (cardBody) {
		const descEl = cardBody.querySelector('p');
		if (descEl && description) {
			descEl.textContent = description;
		} else if (description && !descEl) {
			const p = document.createElement('p');
			p.className = 'text-gray-600';
			p.textContent = description;
			cardBody.appendChild(p);
		}
	}

	// Insertar tags si existen
	if (tags.length > 0) {
		const tagsContainer = document.createElement('div');
		tagsContainer.className = 'flex flex-wrap gap-2';
		tags.forEach((tag) => {
			const tagSpan = document.createElement('span');
			tagSpan.className =
				'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800';
			tagSpan.textContent = tag;
			tagsContainer.appendChild(tagSpan);
		});
		if (cardBody) {
			cardBody.appendChild(tagsContainer);
		}
	}

	container.appendChild(clone);
	return card;
}


