// Wrap lessons for i18n: ensures ES/EN directories and stubs exist, syncs _data/lessons.yml.
// Source of truth: docs/lessons/*.md  (canonical, default lang = 'es').
//
// Creates/updates:
// - docs/lessons/es/<slug>.md  (copied or normalized from canonical)
// - docs/lessons/en/<slug>.md  (front matter prepared + TODO placeholder)
// - _data/lessons.yml entries (slug + titles per locale if available)

import fse from 'fs-extra';
import { glob } from 'glob';
import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';
import slugify from 'slugify';
import yaml from 'yaml';

const SRC_DIR = 'docs/lessons'; // canonical MD files here (root .md)
const ES_DIR = 'docs/lessons/es'; // output ES
const EN_DIR = 'docs/lessons/en'; // output EN
const DATA = '_data/lessons.yml'; // lessons index

fse.ensureDirSync(ES_DIR);
fse.ensureDirSync(EN_DIR);

// Load or init lessons index
let index = [];
if (fs.existsSync(DATA)) {
	try {
		index = yaml.parse(fs.readFileSync(DATA, 'utf8')) || [];
		if (!Array.isArray(index)) index = [];
	} catch {
		console.warn('Warning: _data/lessons.yml malformed; starting fresh.');
		index = [];
	}
}

// helper: find or create index entry by slug
const findOrCreate = (slug) => {
	let entry = index.find((e) => e.slug === slug);
	if (!entry) {
		entry = { slug, title: { es: '', en: '' }, path: { es: '', en: '' } };
		index.push(entry);
	}
	return entry;
};

// scan canonical lessons (md files directly under docs/lessons/, not in es/en)
const canonicalFiles = glob.sync(`${SRC_DIR}/*.md`, { ignore: ['**/es/*.md', '**/en/*.md'] });

let updates = 0;

for (const file of canonicalFiles) {
	const raw = fs.readFileSync(file, 'utf8');
	const parsed = matter(raw);
	const fm = parsed.data || {};
	const body = parsed.content || '';

	// derive slug: front matter slug | filename
	const baseName = path.basename(file, '.md');
	const slug = (fm.slug && String(fm.slug).trim()) || slugify(baseName, { lower: true, strict: true });

	// normalize front matter defaults
	if (!fm.lang) fm.lang = 'es'; // canonical assumed Spanish by default
	if (!fm.title) fm.title = baseName.replace(/[-_]/g, ' ');

	// --- Write ES file ---
	const esPath = path.join(ES_DIR, `${slug}.md`);
	const esFM = { ...fm, lang: 'es', slug };
	const esOut = matter.stringify(body, esFM);
	const needES = !fs.existsSync(esPath) || fs.readFileSync(esPath, 'utf8') !== esOut;
	if (needES) {
		fse.outputFileSync(esPath, esOut, 'utf8');
		updates++;
	}

	// --- Write EN stub ---
	const enPath = path.join(EN_DIR, `${slug}.md`);
	let enTitle = fm.title_en || fm.title; // optional title_en in canonical
	const enBodyHeader = `> **TODO (translate):** This is an English stub for “${fm.title}”.\n\n`;
	const enFM = {
		...fm,
		lang: 'en',
		slug,
		title: enTitle,
		// You can add original source pointer
		source: path.relative('.', file),
	};
	const enOut = matter.stringify(enBodyHeader + body, enFM);
	// Only create EN if missing, or update if title/slug changed
	if (!fs.existsSync(enPath)) {
		fse.outputFileSync(enPath, enOut, 'utf8');
		updates++;
	} else {
		// update front matter if key fields changed
		const prev = matter.read(enPath);
		const prevKey = JSON.stringify({ slug: prev.data.slug, title: prev.data.title });
		const nowKey = JSON.stringify({ slug: enFM.slug, title: enFM.title });
		if (prevKey !== nowKey) {
			fse.outputFileSync(enPath, matter.stringify(prev.content, enFM), 'utf8');
			updates++;
		}
	}

	// --- Update lessons index ---
	const entry = findOrCreate(slug);
	entry.title = entry.title || {};
	entry.path = entry.path || {};
	// Titles
	if (!entry.title.es) entry.title.es = String(fm.title || '');
	if (!entry.title.en && enTitle) entry.title.en = String(enTitle);
	// Paths
	entry.path.es = `/${ES_DIR}/${slug}.html`.replace(/^\//, '/');
	entry.path.en = `/${EN_DIR}/${slug}.html`.replace(/^\//, '/');
}

// Save lessons index (sorted by slug)
index.sort((a, b) => a.slug.localeCompare(b.slug));
const serialized = yaml.stringify(index);
if (!fs.existsSync(DATA) || fs.readFileSync(DATA, 'utf8') !== serialized) {
	fse.outputFileSync(DATA, serialized, 'utf8');
	updates++;
}

console.log(`Wrapped ${canonicalFiles.length} lesson(s). ${updates} file(s) updated.`);
