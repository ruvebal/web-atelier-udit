const VIEWS_BASE = new URL('../views/', import.meta.url);
const viewUrl = (name) => new URL(name, VIEWS_BASE).toString();

export const views = {
	'/': { templateId: 'view-home', templateUrl: viewUrl('home.html') },
	'/about': { templateId: 'view-about', templateUrl: viewUrl('about.html') },
	'/projects': { templateId: 'view-projects', templateUrl: viewUrl('projects.html') },
	'/contact': { templateId: 'view-contact', templateUrl: viewUrl('contact.html') },
	404: { templateId: 'view-404', templateUrl: viewUrl('404.html') },
};
