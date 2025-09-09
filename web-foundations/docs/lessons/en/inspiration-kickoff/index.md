---
layout: lesson
title: 'Inspiration & Kickoff'
title_en: 'Inspiration & Kickoff'
slug: inspiration-kickoff
date: 2025-09-10
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/inspiration-kickoff/
---

> Session Objective (2h)
>
> 1. Start your inspiration journal and define your project direction.
> 2. Draft the first version of your project brief (audience, theme, scope).
> 3. Practice accessibility-by-default and cite sources (critical coding ethos).

---

## Prerequisite

Complete the previous lesson: Development Environment. Your repo should be live on GitHub Pages and contain the student template scaffold.

- Student template reference: https://github.com/ruvebal/web-atelier-udit/tree/main/student-project-template
- Files you will edit today:
  - `project-brief.md` (project definition)
  - `project-inspiration.md` (inspiration log)

---

## Outcomes

By the end of the session you will have:

- A documented inspiration journal with sources and image credits
- A first project brief (problem, audience, values, success criteria)
- A small accessible gallery or list on `index.html` linking to inspirations
- One graded commit that evidences progress (process over perfection)

---

## Step 1 — Read the brief and set a direction

Open `project-brief.md` and complete these sections with short, concrete statements:

- What are you building? (1–2 sentences)
- Who is it for? (primary audience, at least one accessibility need)
- Why does it matter? (value, care, well-being, ethics)
- Success criteria (3–5 measurable outcomes)

Tip: Align with the course motto “Critical Coding for a Better Living”. Choose a topic that benefits people, respects time/attention, and is inclusive.

---

## Step 2 — Create your inspiration journal

Open `project-inspiration.md` and add:

- 5–8 links to high-quality references (sites, articles, visuals)
- 1–2 lightweight moodboards (as simple lists/sections or a small gallery)
- Notes on visual language (type, color, rhythm, motion) and tone of voice

Image handling best practice:

- Prefer small, optimized images and add meaningful `alt` text
- Add captions with source and license; do not hotlink heavy originals
- Optional CDN: upload to ImageKit and use width/quality transforms (`?tr=w-800,q-80`)

---

## Step 3 — Accessibility-by-default (practice now)

Apply these to your current pages:

- Ensure `<html lang="en">` and a logical heading hierarchy (one `<h1>`)
- Provide `alt` text or `alt=""` for decorative images
- Maintain color contrast ≥ 4.5:1 for body text; avoid text in images
- Ensure keyboard focus is visible and reachable (links, skip link)
- Write link text that makes sense out of context (not just “here”)

---

## Step 4 — Small public artifact

On `index.html`, add a short “Inspiration” section:

- A list of 3–5 links you found and why each matters (1 line)
- Optional: a tiny gallery (optimized images with `alt` and credits)

Keep it simple; this is a public trace of your thinking, not a final design.

---

## Commit and rubric

Required commit at end of class:

```bash
git add .
git commit -m "feat: inspiration kickoff · brief v1 + credits + a11y"
git push
```

Quick rubric (0–2):

- 0 — No commit / missing sources
- 1 — Commit present but weak a11y/credits
- 2 — Clear brief v1, a11y applied, sources credited, small public artifact

---

## Checklist (copy into your PR/issue/notes)

- [ ] `project-brief.md` v1 completed
- [ ] `project-inspiration.md` with 5–8 sources and notes
- [ ] `index.html` includes an inspiration section
- [ ] All images have `alt` and credits; colors meet contrast
- [ ] Commit pushed; Pages updated

---

## Critical Coding reflection

Write 3–5 sentences in `project-brief.md` on how your project serves people (care, access, multilingual support), avoids extractive patterns, and values sustainable attention. Tie at least one decision to accessibility (e.g., type size, contrast, motion reduction).
