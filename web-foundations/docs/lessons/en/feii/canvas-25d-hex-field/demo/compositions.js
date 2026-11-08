/**
 * Living Hexaform compositions — one preset per archive hub endpoint (UDIT).
 * Mirrors the published archive-cover manifest's seeds and families.
 *
 * Visual grammar (archive-lessons-en.svg):
 *   solid soft hex fills · double-depth grid · chaotic closer/bigger centre cluster
 */

export const FAMILIES = {
  'fe-i': {
    paper: '#101827',
    paperDeep: '#070A11',
    palette: [
      { r: 243, g: 201, b: 105 }, // accent3 gold
      { r: 255, g: 122, b: 89 }, // accent coral
      { r: 84, g: 214, b: 190 }, // accent2 teal
    ],
  },
  'fe-ii': {
    paper: '#191128',
    paperDeep: '#0c0814',
    palette: [
      { r: 182, g: 161, b: 255 }, // accent3 lilac
      { r: 255, g: 107, b: 61 }, // accent
      { r: 166, g: 244, b: 212 }, // accent2 mint
    ],
  },
};

/** @typedef {'stroke' | 'solid' | 'mixed'} FillMode */

/**
 * @type {Array<{
 *   id: string,
 *   title: string,
 *   endpoint: string,
 *   family: keyof typeof FAMILIES,
 *   seed: number,
 *   svg: string,
 *   blurb: string,
 *   options: Record<string, unknown>
 * }>}
 */
export const COMPOSITIONS = [
  {
    id: 'archive-home',
    title: 'WEB ATELIER (UDIT)',
    endpoint: '/',
    family: 'fe-i',
    seed: 1101,
    svg: 'archive-home.svg',
    blurb: 'Home hub — balanced solid field, deep double grid, calm centre weight.',
    options: {
      mode: 'archive',
      fillMode: 'solid',
      doubleDepth: true,
      centerChaos: true,
      complexity: 0.42,
      energy: 0.58,
      density: 14,
      velocity: 0.32,
      zDepth: 420,
      maxCells: 150,
    },
  },
  {
    id: 'archive-lessons-en',
    title: 'Lessons (EN)',
    endpoint: '/lessons/en/',
    family: 'fe-i',
    seed: 769,
    svg: 'archive-lessons-en.svg',
    blurb: 'Reference stamp — solid hexes, double depth, chaotic closer/bigger centre cluster.',
    options: {
      mode: 'archive',
      fillMode: 'solid',
      doubleDepth: true,
      centerChaos: true,
      complexity: 0.48,
      energy: 0.62,
      density: 16,
      velocity: 0.34,
      zDepth: 440,
      maxCells: 160,
    },
  },
  {
    id: 'archive-lessons-es',
    title: 'Lecciones (ES)',
    endpoint: '/lessons/es/',
    family: 'fe-i',
    seed: 771,
    svg: 'archive-lessons-es.svg',
    blurb: 'ES twin — slightly cooler cull, denser centre spiral.',
    options: {
      mode: 'archive',
      fillMode: 'solid',
      doubleDepth: true,
      centerChaos: true,
      complexity: 0.5,
      energy: 0.64,
      density: 18,
      velocity: 0.3,
      zDepth: 430,
      maxCells: 160,
    },
  },
  {
    id: 'archive-tracks',
    title: 'Learning Tracks',
    endpoint: '/tracks/',
    family: 'fe-ii',
    seed: 880,
    svg: 'archive-tracks.svg',
    blurb: 'Tracks hub — FE II palette, wider far sheet, tight centre knot.',
    options: {
      mode: 'field',
      fillMode: 'solid',
      doubleDepth: true,
      centerChaos: true,
      complexity: 0.4,
      energy: 0.55,
      density: 15,
      velocity: 0.36,
      zDepth: 400,
      maxCells: 145,
    },
  },
  {
    id: 'archive-tracks-en',
    title: 'Learning Tracks (EN)',
    endpoint: '/tracks/en/',
    family: 'fe-ii',
    seed: 881,
    svg: 'archive-tracks-en.svg',
    blurb: 'EN tracks — mid density, soft solid fills.',
    options: {
      mode: 'field',
      fillMode: 'solid',
      doubleDepth: true,
      centerChaos: true,
      complexity: 0.38,
      energy: 0.52,
      density: 13,
      velocity: 0.33,
      zDepth: 410,
      maxCells: 140,
    },
  },
  {
    id: 'archive-tracks-es',
    title: 'Cursos de Aprendizaje (ES)',
    endpoint: '/tracks/es/',
    family: 'fe-ii',
    seed: 882,
    svg: 'archive-tracks-es.svg',
    blurb: 'ES tracks — slower drift, stronger near band.',
    options: {
      mode: 'spectrum',
      fillMode: 'solid',
      doubleDepth: true,
      centerChaos: true,
      complexity: 0.44,
      energy: 0.56,
      density: 14,
      velocity: 0.28,
      zDepth: 450,
      maxCells: 145,
    },
  },
  {
    id: 'archive-fei',
    title: 'Front-End I',
    endpoint: '/tracks/fei/',
    family: 'fe-i',
    seed: 501,
    svg: 'archive-fei.svg',
    blurb: 'FE I — coral-led solids, open lattice, modest centre.',
    options: {
      mode: 'lattice',
      fillMode: 'solid',
      doubleDepth: true,
      centerChaos: true,
      complexity: 0.35,
      energy: 0.5,
      density: 12,
      velocity: 0.35,
      zDepth: 380,
      maxCells: 130,
    },
  },
  {
    id: 'archive-feii',
    title: 'Front-End II',
    endpoint: '/tracks/feii/',
    family: 'fe-ii',
    seed: 502,
    svg: 'archive-feii.svg',
    blurb: 'FE II — mint/lilac solids, shader-ish frequency, busy centre.',
    options: {
      mode: 'shader',
      fillMode: 'solid',
      doubleDepth: true,
      centerChaos: true,
      complexity: 0.55,
      energy: 0.68,
      density: 18,
      velocity: 0.4,
      zDepth: 460,
      maxCells: 165,
    },
  },
  {
    id: 'archive-2627-fei',
    title: 'Front-End I · 2026–27',
    endpoint: '/tracks/en/udit/2627-fei/',
    family: 'fe-i',
    seed: 26271,
    svg: 'archive-2627-fei.svg',
    blurb: 'Cohort FE I — year stamp seed, calmer velocity.',
    options: {
      mode: 'contract',
      fillMode: 'solid',
      doubleDepth: true,
      centerChaos: true,
      complexity: 0.36,
      energy: 0.48,
      density: 11,
      velocity: 0.26,
      zDepth: 390,
      maxCells: 125,
    },
  },
  {
    id: 'archive-2627-feii',
    title: 'Front-End II · 2026–27',
    endpoint: '/tracks/en/udit/2627-feii/',
    family: 'fe-ii',
    seed: 26272,
    svg: 'archive-2627-feii.svg',
    blurb: 'Cohort FE II — denser double grid, hot centre cluster.',
    options: {
      mode: 'scene',
      fillMode: 'solid',
      doubleDepth: true,
      centerChaos: true,
      complexity: 0.52,
      energy: 0.66,
      density: 17,
      velocity: 0.31,
      zDepth: 470,
      maxCells: 160,
    },
  },
  {
    id: 'archive-methodology-en',
    title: 'Methodology (EN)',
    endpoint: '/methodology/en/',
    family: 'fe-ii',
    seed: 901,
    svg: 'archive-methodology-en.svg',
    blurb: 'Methodology — sparse solids, deep Z, quiet centre.',
    options: {
      mode: 'space',
      fillMode: 'mixed',
      doubleDepth: true,
      centerChaos: true,
      complexity: 0.3,
      energy: 0.44,
      density: 10,
      velocity: 0.24,
      zDepth: 480,
      maxCells: 110,
    },
  },
  {
    id: 'archive-methodology-es',
    title: 'Metodología (ES)',
    endpoint: '/methodology/es/',
    family: 'fe-ii',
    seed: 902,
    svg: 'archive-methodology-es.svg',
    blurb: 'Metodología — stroke+fill mix, slow drift.',
    options: {
      mode: 'constellation',
      fillMode: 'mixed',
      doubleDepth: true,
      centerChaos: true,
      complexity: 0.33,
      energy: 0.46,
      density: 11,
      velocity: 0.22,
      zDepth: 470,
      maxCells: 115,
    },
  },
];

export function getComposition(id) {
  return COMPOSITIONS.find((c) => c.id === id) || null;
}

export function compositionOptions(compo, overrides = {}) {
  const family = FAMILIES[compo.family] || FAMILIES['fe-i'];
  return {
    seed: compo.seed,
    palette: family.palette,
    paper: family.paper,
    paperDeep: family.paperDeep,
    dprCap: 1.15,
    ...compo.options,
    ...overrides,
  };
}
