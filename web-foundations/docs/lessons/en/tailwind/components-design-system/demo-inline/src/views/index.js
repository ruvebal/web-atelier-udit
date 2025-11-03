/**
 * views/index.js — View registry (inline demo, EN)
 * No onMount functions; templates contain full markup
 */

export const views = {
	'/': {
		templateId: 'view-home',
		templateUrl: './src/views/home.html',
	},
	'/buttons': {
		templateId: 'view-buttons',
		templateUrl: './src/views/buttons.html',
	},
	'/cards': {
		templateId: 'view-cards',
		templateUrl: './src/views/cards.html',
	},
	'/forms': {
		templateId: 'view-forms',
		templateUrl: './src/views/forms.html',
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


