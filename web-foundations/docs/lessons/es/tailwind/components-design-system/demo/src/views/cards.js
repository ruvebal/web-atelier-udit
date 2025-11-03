/**
 * views/cards.js — onMount function for cards view
 */

import { createCard } from '../utils/card-helpers.js';

export async function mountCards(app) {
	const cardsContainer = app.querySelector('#cards-container');
	const projectCardContainer = app.querySelector('#project-card-container');

	if (cardsContainer) {
		// Tarjetas básicas usando componentes modulares
		await createCard(cardsContainer, {
			title: 'Tarjeta Básica',
			description: 'Esta es una tarjeta básica con secciones de encabezado, cuerpo y pie.',
		});

		await createCard(cardsContainer, {
			title: 'Tarjeta Interactiva',
			description: 'Esta tarjeta tiene efectos hover para mejor interactividad.',
			hover: true,
		});
	}

	if (projectCardContainer) {
		// Tarjeta de proyecto con imagen y tags
		await createCard(projectCardContainer, {
			image: 'https://via.placeholder.com/600x300',
			title: 'Sitio Web Portfolio',
			description: 'Un sitio web portfolio moderno construido con Tailwind CSS y JavaScript vanilla.',
			tags: ['HTML', 'CSS', 'JavaScript'],
			hover: true,
		});
	}
}

