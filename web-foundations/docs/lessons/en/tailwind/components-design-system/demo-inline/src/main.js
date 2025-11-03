/**
 * main.js — Entry point for inline demo (EN)
 */

import { SimpleRouter } from './router.js';
import { views } from './views/index.js';

document.addEventListener('DOMContentLoaded', () => {
	new SimpleRouter(views);
	console.log('✨ Inline Demo (EN) initialized');
});


