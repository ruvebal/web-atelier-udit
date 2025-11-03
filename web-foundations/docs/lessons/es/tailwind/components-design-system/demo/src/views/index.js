/**
 * views/index.js — View registry
 * Matches the lesson approach: templateId, templateUrl, and onMount
 */

import { mountButtons } from './buttons.js';
import { mountCards } from './cards.js';
import { mountForms } from './forms.js';

export const views = {
	'/': {
		templateId: 'view-home',
		templateUrl: './src/views/home.html',
	},
	'/buttons': {
		templateId: 'view-buttons',
		templateUrl: './src/views/buttons.html',
		onMount: mountButtons,
	},
	'/cards': {
		templateId: 'view-cards',
		templateUrl: './src/views/cards.html',
		onMount: mountCards,
	},
	'/forms': {
		templateId: 'view-forms',
		templateUrl: './src/views/forms.html',
		onMount: mountForms,
	},
	'/tokens': {
		templateId: 'view-tokens',
		templateUrl: './src/views/tokens.html',
	},
	404: {
		templateId: 'view-404',
		templateUrl: './src/views/404.html',
	},
};
