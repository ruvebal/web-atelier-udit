/**
 * main.js — Application entry point
 * Initializes the router and handles the SPA lifecycle
 */

import { SimpleRouter } from './router.js';
import { views } from './views/index.js';

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
	new SimpleRouter(views);
	console.log('✨ Components & Design System Demo initialized');
});
