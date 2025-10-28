export class SimpleRouter {
	constructor(routes) {
		this.routes = routes; // { '/': { templateId, templateUrl, onMount? }, ... }
		this.currentView = null;
		window.addEventListener('hashchange', () => this.handleRoute());
		window.addEventListener('load', () => this.handleRoute());
	}

	async handleRoute() {
		const hash = window.location.hash.slice(1) || '/';
		const route = this.routes[hash] || this.routes[404];
		if (route !== this.currentView) {
			await this.renderView(route);
			this.updateActiveNav(hash);
			this.currentView = route;
		}
	}

	async renderView(route) {
		const app = document.getElementById('app');
		app.textContent = '';

		await ensureTemplateAvailable(route.templateId, route.templateUrl);

		const tpl = document.getElementById(route.templateId);
		if (!tpl) {
			app.textContent = 'Template not found';
			return;
		}

		app.appendChild(tpl.content.cloneNode(true));
		if (typeof route.onMount === 'function') route.onMount(app);
	}

	updateActiveNav(currentHash) {
		document.querySelectorAll('nav a[href^="#/"]').forEach((link) => {
			link.removeAttribute('aria-current');
		});
		const activeLink = document.querySelector(`nav a[href="#${currentHash}"]`);
		if (activeLink) activeLink.setAttribute('aria-current', 'page');
	}
}

const templateCache = new Set();

async function ensureTemplateAvailable(templateId, templateUrl) {
	if (document.getElementById(templateId)) return;
	if (!templateUrl || templateCache.has(templateId)) return;

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
