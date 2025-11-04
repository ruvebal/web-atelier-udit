/**
 * main.js — Entry point for inline demo
 */

import { SimpleRouter } from './router.js';
import { views } from './views/index.js';

document.addEventListener('DOMContentLoaded', () => {
	new SimpleRouter(views);
	console.log('✨ Inline Demo initialized');
});


