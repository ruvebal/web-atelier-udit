#!/usr/bin/env node

const base = (process.env.SITE_BASE_URL || 'http://127.0.0.1:4000/web-atelier-udit').replace(/\/$/, '');
const routes = [
	'/tracks/fei/',
	'/tracks/feii/',
	'/tracks/en/fei/',
	'/tracks/en/feii/',
	'/tracks/fei/how-to-pass-this-track/',
	'/tracks/feii/how-to-pass-this-track/',
	'/tracks/en/fei/how-to-pass-this-track/',
	'/tracks/en/feii/how-to-pass-this-track/',
];
const companions = [
	'/lessons/en/feii/unit-5-testing-strategy/deck-outline.md',
	'/lessons/en/feii/unit-5-testing-strategy/exercises.md',
	'/lessons/en/feii/unit-6-ai-code-review/deck-outline.md',
	'/lessons/en/feii/unit-6-ai-code-review/exercises.md',
];

const failures = [];

async function check(path) {
	let response;
	try {
		response = await fetch(`${base}${path}`);
	} catch (error) {
		failures.push(`${path}: server unavailable at ${base} (${error.cause?.code || error.message})`);
		return '';
	}
	if (!response.ok) {
		failures.push(`${path}: HTTP ${response.status}`);
		return '';
	}
	const html = await response.text();
	if (path.includes('how-to-pass-this-track')) {
		for (const marker of ['class="reveal"', 'pass-track-deck.js', 'data-content-url=', 'data-lang-switch-en=']) {
			if (!html.includes(marker)) failures.push(`${path}: missing slideshow marker ${marker}`);
		}
		const contentMatch = html.match(/data-content-url="([^"]+)"/);
		if (contentMatch) {
			try {
				const contentResponse = await fetch(`${base}${new URL(contentMatch[1], `${base}/`).pathname.replace(/^\/web-atelier-udit/, '')}`);
				if (!contentResponse.ok) failures.push(`${path}: slideshow content JSON HTTP ${contentResponse.status}`);
				else {
					const content = await contentResponse.json();
					if (!Array.isArray(content.slides) || content.slides.length === 0) failures.push(`${path}: slideshow content has no slides`);
				}
			} catch (error) {
				failures.push(`${path}: slideshow content JSON invalid (${error.cause?.code || error.message})`);
			}
		}
	}
	return html;
}

for (const route of routes) {
	const html = await check(route);
	if (!html) continue;
	for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
		const asset = match[1];
		if (!asset.startsWith(`${base}/`)) continue;
		let response;
		try {
			response = await fetch(asset);
		} catch (error) {
			failures.push(`${route} -> ${asset}: asset request failed (${error.cause?.code || error.message})`);
			continue;
		}
		if (!response.ok) failures.push(`${route} -> ${asset}: HTTP ${response.status}`);
	}
}

for (const companion of companions) {
	let response;
	try {
		response = await fetch(`${base}${companion}`);
	} catch (error) {
		failures.push(`${companion}: companion request failed (${error.cause?.code || error.message})`);
		continue;
	}
	if (!response.ok) failures.push(`${companion}: HTTP ${response.status}`);
}

if (failures.length) {
	console.error(`Local route smoke test failed (${failures.length} finding(s)):`);
	console.error(failures.join('\n'));
	process.exit(1);
}

console.log(`Local route smoke test passed: ${routes.length} routes and their same-site assets are reachable at ${base}.`);
