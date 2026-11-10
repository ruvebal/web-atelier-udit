import { createHexField } from './hex-field.js?v=20261110-motion-4';
import { COMPOSITIONS, compositionOptions, getComposition } from './compositions.js';

export { COMPOSITIONS, getComposition };

/**
 * Full-viewport living cover for one composition id.
 */
export function mountComposition(canvas, id, overrides = {}) {
  const compo = getComposition(id);
  if (!compo) throw new Error(`Unknown composition: ${id}`);
  const opts = compositionOptions(compo, overrides);
  return {
    compo,
    field: createHexField(canvas, opts),
  };
}

/**
 * Small preview thumbs for the gallery (no pointer, lower budget).
 */
export function mountGalleryThumbs(root) {
  const cards = root.querySelectorAll('[data-compo]');
  const fields = [];
  for (const card of cards) {
    const id = card.getAttribute('data-compo');
    const canvas = card.querySelector('canvas');
    if (!canvas || !id) continue;
    const compo = getComposition(id);
    if (!compo) continue;
    const field = createHexField(
      canvas,
      compositionOptions(compo, {
        interactive: false,
        maxCells: Math.min(90, compo.options.maxCells || 90),
        dprCap: 1,
        velocity: Math.min(0.28, compo.options.velocity || 0.28),
        onSample: null,
      }),
    );
    fields.push(field);
  }
  return () => {
    for (const f of fields) f.destroy();
  };
}
