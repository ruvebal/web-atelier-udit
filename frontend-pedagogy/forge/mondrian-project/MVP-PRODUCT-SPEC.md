<!--
Mondrian Project — executable MVP product definition.
Author: Rubén Vega Balbás, PhD · amended 25 October 2026
This is an instructor/product-owner contract, not the student brief.
-->

# Liquid Mondrian — MVP product specification

**Status:** adopted product definition. This file wins over earlier descriptions of
the game in `PITCH.md`, `MONDRIAN-RATIONALE.md`, and the phase files.

## 1. Product sentence

A touch-first web application lets a visitor place a measured Mondrian composition
inside a chosen physical or digital canvas, reshape its inner frame, transform its
grid and colours, save the result, and print it—while the interface exposes the
ratios that turn art into a mathematical pattern and the pattern back into a new
artwork.

The works may be called **textures** inside the interface, meaning selectable
mathematical compositions. They are Mondrian / Neoplasticism studies, not Kandinsky
works. Public copy uses “composition” or “texture after Mondrian”; internal code
uses `work`.

## 2. Primary journey

`choose surface → choose texture → start from original → transform → compare/reset → save → print`

1. Choose a surface:
   - print: A4 first (`210 × 297 mm`), then A3, A5, Letter;
   - digital presets: square `1:1`, portrait `4:5`, landscape `16:9`, story `9:16`;
   - custom width and height, with unit (`mm` for print, `px` for digital).
2. Choose one measured composition. It appears at its original aspect ratio,
   centred inside the printable area.
3. Drag a corner or edge of the inner frame. The frame cannot leave the selected
   surface or cross its minimum size. The grid stretches inside it.
4. Transform the composition:
   - hue rotation `0–360°`;
   - palette inversion through the explicit involution in §4, not the
     browser's opaque `filter: invert()`;
   - horizontal and vertical figure reflection;
   - grid position: translate the composition inside the frame, clipped at its
     bounds;
   - relative line weight: multiplier over the analyzer's measured baseline;
   - reset to the measured original.
5. Compare with the original in a press-and-hold overlay.
6. Save:
   - a shareable URL containing the deterministic state;
   - an SVG download (vector, print-preferred);
   - a PNG preview (raster export, secondary).
7. Print through the browser with the chosen physical page size, explicit margins,
   crop marks optional, chrome hidden. A calibration page prints a 100 mm rule
   before the first exhibition.

The application never overwrites the measured source data. A visitor's state is a
separate `CompositionState`.

## 3. Coordinate model

Three nested rectangles prevent “size” from becoming ambiguous:

```text
surface              physical paper or digital canvas
└── printableArea    surface minus user/printer margins
    └── frame         draggable/resizable output rectangle
        └── work      measured grid, transformed inside the frame
```

- `SurfaceSpec`: `{ preset, width, height, unit, orientation, margins }`.
- `CompositionState`: `{ workId, frame: { x, y, width, height },
  theta, paletteMode, reflectX, reflectY, offsetX, offsetY,
  lineWeightScale }`.
- `Recipe`: `{ surface, compositionState }`. The URL and export metadata always
  serialize the complete recipe, never composition state alone.
- Bounds and margins are normalized to `[0,1]` in URLs and saved recipes.
  Physical dimensions and units remain in `SurfaceSpec`; millimetres are used at
  the print boundary. This makes the same recipe reproducible on kiosk and phone.
- The frame starts with the work's original aspect ratio, maximized within the
  printable area.
- Dragging changes frame geometry; it never mutates `work.yml`.

## 4. Rendering contract

The visible editor is semantic HTML + CSS Grid. JavaScript only:

- validates canonical work primitives and derives the render plan;
- creates overlapping plane and line grid items;
- handles Pointer Events and state;
- writes CSS custom properties;
- serializes URLs and exports;
- calls `window.print()`.

CSS owns layout and colour:

- normalized rectangle bounds, line extents and line edges
  `center ± thickness/2` become sorted boundaries; adjacent deltas become `fr`
  track weights;
- coloured/black rectangles are plane grid items; explicit black lines are
  higher-z grid items, preserving Andrzejewski et al.'s source distinction;
- JS clamps `lineWeightScale`, rederives line edges/tracks, and exposes the
  applied value as `--line-weight-scale`; CSS consumes the resulting tracks but
  does not multiply thickness again; black planes never change;
- `--theta` drives relative HSL colour;
- `transform: scaleX()/scaleY()` reflects the figure;
- container queries adapt controls to the editor, not the viewport;
- `@page` and print media rules produce the physical output.

The canonical state and printer output must not depend on `filter: invert()`.
`paletteMode=inverted` applies the same explicit HSL involution in every
renderer: chromatic `(h,s,l) → ((h + 180) mod 360,s,100 − l)`; achromatic
lightness `l → 100 − l` (black armature and white field exchange values).
Applying it twice restores the measured palette. The mode is stored in the URL.

## 5. Screens / sitemap

```text
/                    Start: choose surface and texture; “Create” enters the editor
/create/<work>/      The editor: surface, inner frame, transformations, compare,
                     undo/reset, save, print
/gallery/            Measured source compositions; open one in the editor
/about/              Scroll story: painting → measurement → ratios → CSS grid →
                     colour wheel → transformation → print
/about-us/           Professor's proposition, cohort roles and credits, research
                     framing, institutional communication, AI disclosure
/method/             Analyzer, schema, uncertainty, sources, rights, citations
/contribute/         Cohort workflow and contribution contract
/declaration/        Public/research/AI/data statement
/kiosk/              Attract loop → start → editor; idle reset; no browser controls
/calibrate-print/    100 mm rule and margin test; hidden from normal navigation
/es/…                Spanish prose mirror; editor state shared
```

The old `/studies/` route becomes `/gallery/`; `/play/` becomes `/create/`.

## 6. About: the story to scroll

The story has seven short scenes, each useful without animation:

1. **A painting is measured** — original canvas, points, rectangles and lines.
2. **Geometry becomes ratios** — coordinates and perpendicular line thickness
   become normalized values; derived boundary deltas become CSS tracks.
3. **Ratios become CSS** — the same deltas become `fr` tracks.
4. **A frame changes** — container queries reveal what remains and what bends.
5. **Colour becomes an angle** — HSL wheel, θ, directed Δ, and its perceptual limit.
6. **A pattern becomes yours** — frame, reflection, line weight, palette.
7. **The screen returns to paper** — SVG, millimetres, calibration, print.

**Motion decision:** no Framer Motion. Framer Motion is a React library and this is
a vanilla-JS course. The framework-independent `motion` package would still add a
dependency for effects the platform can perform. Use CSS scroll-driven animations
(`animation-timeline: view()`) as progressive enhancement and a small
`IntersectionObserver` fallback that toggles `data-visible`. With
`prefers-reduced-motion: reduce`, all scenes are immediately visible and static.

## 7. Kiosk and handheld

Kiosk is the primary exhibition mode; handheld is the take-home continuation.
They share routes, components, and URL state.

- Kiosk: A4 landscape is the initial surface; one-touch operation; targets ≥44 px;
  no required keyboard, mouse, browser back button, hover, or text entry; 60-second
  idle reset; wake lock; offline cache; QR to continue on a personal device.
- Handheld: the same editor with controls in a bottom sheet and the surface fitted
  to the available container; accessible presets provide a non-drag alternative.
- OS-level lockdown is separate from PWA fullscreen and documented in a runbook.

## 8. Save and print boundaries

- MVP save is local: URL, SVG, PNG. No account or server persistence.
- SVG is the source export. PNG is produced from that SVG in a transient canvas;
  canvas is never the editor.
- Print uses a same-origin generated SVG/HTML document, `@page { size: … }`,
  physical CSS units, and `window.print()`.
- Browser print dialogs and printer drivers can override scale. The app warns
  “Actual size / 100%” and provides `/calibrate-print/`; it never claims
  millimetre accuracy without calibration.
- A saved artefact embeds: source-work credit, transformation recipe, app version,
  and a short “study after” statement in SVG metadata; the visible print credit is
  optional but on by default.

## 9. MVP acceptance

The MVP is complete when a first-time kiosk visitor can, without instructions:

1. select A4 and a work;
2. resize the frame with touch while it stays inside the printable area;
3. rotate hue, reflect the figure, invert the palette, move the grid, and change
   line weight;
4. undo one action and reset to the original;
5. download a valid SVG;
6. print a calibrated A4 page;
7. scan a QR and recover the same state on a phone.

Automated gates cover state round-trips, bounds, accessibility, export validity,
print stylesheet, offline reload, and reduced motion. One real-printer and one
real-touch-device run are mandatory.

## 10. Explicitly not MVP

- Accounts, cloud saves, a public gallery of visitor creations.
- Live camera analysis at the kiosk.
- Generating fake Mondrian compositions.
- A neural “quality” or authenticity score.
- Framer Motion, React, WebGL, canvas rendering.
- Arbitrary free rotation or diagonal grid lines.
