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
        if (!app) return;
        app.textContent = '';

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

// Progressive version: no external template loading needed
