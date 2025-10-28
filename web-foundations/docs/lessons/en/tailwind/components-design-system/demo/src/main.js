/**
 * main.js — Application entry point
 * Initializes the router and handles the SPA lifecycle
 */

import { initRouter } from './router.js';

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
	initRouter();
	console.log('✨ Components & Design System Demo initialized');
});
