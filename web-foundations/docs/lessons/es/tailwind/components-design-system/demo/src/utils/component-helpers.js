/**
 * utils/component-helpers.js — Helper functions for using components
 * Matches the lesson approach
 */

const templateCache = new Set();

async function ensureTemplateAvailable(templateId, templateUrl) {
	if (document.getElementById(templateId)) return;
	if (templateCache.has(templateId)) return;

	const res = await fetch(templateUrl, { credentials: 'same-origin' });
	if (!res.ok) throw new Error(`Failed to load template: ${templateUrl}`);
	const html = await res.text();

	const doc = new DOMParser().parseFromString(html, 'text/html');
	const fetchedTemplate = doc.querySelector('template');
	if (!fetchedTemplate || !fetchedTemplate.id) {
		throw new Error(`No <template id="..."> found in ${templateUrl}`);
	}
	document.body.appendChild(fetchedTemplate);
	templateCache.add(fetchedTemplate.id);
}

export async function useComponent(templateId, templateUrl, container, config = {}) {
	await ensureTemplateAvailable(templateId, templateUrl);

	const template = document.getElementById(templateId);
	if (!template) throw new Error(`Template ${templateId} not found`);

	const clone = template.content.cloneNode(true);
	
	// Get the first element child from the clone (the actual component element)
	const element = clone.firstElementChild;
	if (!element) {
		throw new Error(`Template ${templateId} has no element child`);
	}

	// Configurar texto si se proporciona
	if (config.text) {
		element.textContent = config.text;
	}

	// Añadir event listener si se proporciona
	if (config.onClick) {
		element.addEventListener('click', config.onClick);
	}

	// Añadir clases adicionales si se proporcionan
	if (config.classes) {
		element.classList.add(...config.classes.split(' '));
	}

	// Añadir atributos si se proporcionan
	if (config.attributes) {
		Object.entries(config.attributes).forEach(([key, value]) => {
			if (value === '') {
				element.setAttribute(key, '');
			} else {
				element.setAttribute(key, value);
			}
		});
	}

	container.appendChild(clone);
	return element;
}

