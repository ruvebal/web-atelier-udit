/**
 * views/buttons.js — onMount function for buttons view
 * Demonstrates using modular components from src/components/
 */

import { useComponent } from '../utils/component-helpers.js';

export async function mountButtons(app) {
	// Cargar componentes
	const primaryContainer = app.querySelector('#buttons-primary-container');
	const secondaryContainer = app.querySelector('#buttons-secondary-container');
	const sizesContainer = app.querySelector('#buttons-sizes-container');

	if (primaryContainer) {
		// Botones primarios usando componentes modulares
		await useComponent('button-primary', './src/components/button-primary.html', primaryContainer, {
			text: 'Botón Primario',
		});

		await useComponent('button-primary', './src/components/button-primary.html', primaryContainer, {
			text: 'Deshabilitado',
			attributes: { disabled: '' },
		});
	}

	if (secondaryContainer) {
		// Botones secundarios usando componentes modulares
		await useComponent('button-secondary', './src/components/button-secondary.html', secondaryContainer, {
			text: 'Botón Secundario',
		});

		await useComponent('button-secondary', './src/components/button-secondary.html', secondaryContainer, {
			text: 'Deshabilitado',
			attributes: { disabled: '' },
		});
	}

	if (sizesContainer) {
		// Diferentes tamaños
		await useComponent('button-primary', './src/components/button-primary.html', sizesContainer, {
			text: 'Pequeño',
			classes: 'text-sm px-4 py-2',
		});

		await useComponent('button-primary', './src/components/button-primary.html', sizesContainer, {
			text: 'Mediano (Por defecto)',
		});

		await useComponent('button-primary', './src/components/button-primary.html', sizesContainer, {
			text: 'Grande',
			classes: 'text-lg px-8 py-4',
		});
	}
}

