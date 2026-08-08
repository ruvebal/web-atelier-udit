# UX/UI Boundary Scope Note — FE I Módulo 3

**Status:** Pending clarification from Rubén (2026-08-08)

## The Gap

Phase 1 audit identified no dedicated lesson covering the official CONTENIDOS requirement for "Módulo 3 UX/UI + accessibility" in the FE I syllabus (`desarrollo-web-front-end-i-2025-2026.json`).

## The Boundary Question

FE I shares the degree with a dedicated sibling course: "Introducción al Diseño de Interfaces y a la Experiencia de Usuario en Entornos Web: UX/UI."

**Clarification needed:**

1. Should FE I's Módulo 3 focus on **implementation-adjacent UX** (WCAG-in-practice, accessibility testing tools, heuristics applied to student's own code) while leaving deep UX theory/research methods to the sibling course?
2. Are there specific UX/UI topics explicitly taught in the sibling course that FE I should avoid duplicating?
3. Does the missing content already exist under a different lesson name, or should new content be created?

## Proposed Scope (pending confirmation)

If the boundary is implementation-adjacent UX, FE I's Módulo 3 could cover:

- WCAG 2.2 AA compliance in practice (contrast, focus management, ARIA attributes)
- Accessibility testing tools (axe DevTools, Lighthouse, screen reader testing basics)
- UX heuristics applied to the student's own code (Nielsen's heuristics, cognitive load in UI)
- Responsive design as accessibility (mobile-first, touch targets, readable text)
- Performance as UX (loading states, perceived performance, progressive enhancement)

**Not covered (reserved for sibling course):**
- Deep UX research methods (user interviews, persona creation, journey mapping)
- UX theory and frameworks (Jobs-to-be-Done, Service Blueprint, etc.)
- Visual design theory beyond implementation (color theory, typography systems)

## Resolution Plan

Once Rubén clarifies the boundary:
- If implementation-adjacent scope is confirmed: Create new lesson `accessibility-ux-practice` or split across existing lessons
- If gap is intentional: Document this as a cross-course dependency and remove from FE I requirements
- If content exists elsewhere: Link to existing lesson from FE I sequence

## Impact on Phase 1

This note unblocks Phase 1 by documenting the uncertainty. The tracks.yml sequence will proceed with existing confirmed lessons; Módulo 3 allocation will be adjusted once the boundary is resolved.
