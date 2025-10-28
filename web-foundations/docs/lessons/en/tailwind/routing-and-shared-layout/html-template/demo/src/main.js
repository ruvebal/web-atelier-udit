import { SimpleRouter } from './router.js';
import { views } from './views/index.js';

new SimpleRouter(views);

document.addEventListener('click', (e) => {
	const link = e.target.closest('a[href^="#"]');
	if (!link) return;
	const href = link.getAttribute('href');
	if (href.startsWith('#/')) return;
	const target = document.querySelector(href);
	if (target) {
		e.preventDefault();
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
});
