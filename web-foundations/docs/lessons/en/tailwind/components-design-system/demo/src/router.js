/**
 * router.js — Routes and template-based view rendering
 * Uses HTML <template> elements to safely render views
 */

import { buttonsView, cardsView, formsView, homeView, notFoundView, tokensView } from './views/index.js';

// Route definitions with template-based views
const routes = {
	'/': homeView,
	'/buttons': buttonsView,
	'/cards': cardsView,
	'/forms': formsView,
	'/tokens': tokensView,
};

/**
 * Renders a view into the #app container by cloning its template
 * @param {Function} viewFn - Function that returns the template ID or creates content
 */
function renderView(viewFn) {
	const app = document.getElementById('app');
	if (!app) return;

	// Clear current content
	app.innerHTML = '';

	// Get the template ID from the view function
	const templateId = viewFn();

	// Find and clone the template
	const template = document.getElementById(templateId);
	if (!template) {
		console.error(`Template #${templateId} not found`);
		const notFoundTemplate = document.getElementById(notFoundView());
		if (notFoundTemplate) {
			const clone = notFoundTemplate.content.cloneNode(true);
			app.appendChild(clone);
		}
		return;
	}

	// Clone and append the template content
	const clone = template.content.cloneNode(true);
	app.appendChild(clone);

	// Update active navigation link
	updateActiveNav();
}

/**
 * Updates the active state of navigation links
 */
function updateActiveNav() {
	const hash = window.location.hash.slice(1) || '/';
	const links = document.querySelectorAll('.nav-link');

	links.forEach((link) => {
		const href = link.getAttribute('href').slice(1);
		if (href === hash) {
			link.classList.add('active');
			link.setAttribute('aria-current', 'page');
		} else {
			link.classList.remove('active');
			link.removeAttribute('aria-current');
		}
	});
}

/**
 * Handles route changes
 */
function handleRoute() {
	const hash = window.location.hash.slice(1) || '/';
	const viewFn = routes[hash] || notFoundView;
	renderView(viewFn);
}

/**
 * Initializes the router
 */
export function initRouter() {
	// Handle initial load
	handleRoute();

	// Listen for hash changes
	window.addEventListener('hashchange', handleRoute);

	// Handle browser back/forward
	window.addEventListener('popstate', handleRoute);
}
