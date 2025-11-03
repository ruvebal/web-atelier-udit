/**
 * views/forms.js — onMount function for forms view
 */

export async function mountForms(app) {
	const form = app.querySelector('#demo-form');
	if (!form) return;

	// Por ahora, los formularios se muestran directamente en el HTML
	// En una implementación más avanzada, podrías crear componentes de input
	console.log('Forms view mounted');
}

