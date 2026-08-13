# PENDING procurement — `runs/frontend-pedagogy/01`

_Generated 2026-08-11 by `scripts/export-pending-procurement.py`._

Legitimate OA download only. ISBN monographs → campus library / purchase. Paywalled DOIs → Unpaywall retry later or institutional access — **no shadow libraries**.

## Already on disk (PDF)

`runs/frontend-pedagogy/01/pdfs/` — see `download-manifest.json` and `.ahmes/batch-manifest.json`.

## A · DOI with no OA (Unpaywall empty)

- DOI `10.1145/2700514` — An Analysis of HTML and CSS Syntax Errors in a Web Development Course
- DOI `10.1016/j.apergo.2019.102892` — User-centred web design, usability and user satisfaction: The case of online banking websites in Iran
- DOI `10.1145/97243.97281` — Heuristic evaluation of user interfaces
- DOI `10.1145/3772318.3790621` — The Way We Notice, That’s What Really Matters: Instantiating UI Components with Distinguishing Variations
- DOI `10.5220/0006353703440351` — Progressive Web Apps: The Possible Web-native Unifier for Mobile Development
- DOI `10.1145/3617367` — “It’s Weird That it Knows What I Want”: Usability and Interactions with Copilot for Novice Programmers
- DOI `10.1145/3793302.3793362` — Are Coding Agents Generating Over-Mocked Tests? An Empirical Study
- DOI `10.1145/3300115.3309502` — A Project-based Learning Experience in a Compilers Course
- DOI `10.1145/3772363.3798887` — Investigating Web Project Assessment in an AI World
- DOI `10.1016/B978-012109890-2/50031-7` — Attaining Self-Regulation
- DOI `10.1145/3632620.3671116` — The Widening Gap: The Benefits and Harms of Generative AI for Novice Programmers
- DOI `10.1007/978-3-031-34444-2_23` — The Rise of Disappearing Frameworks in Web Development
- DOI `10.1109/GREENS66463.2025.00012` — On the Energy Consumption of Web Applications: An Empirical Study of their Design Solutions
- DOI `10.1109/TSE.2023.3329667` — Mitigating False Positive Static Analysis Warnings: Progress, Challenges, and Opportunities

## B · DOI retrieve failed (403 / HTML / network)

- DOI `10.1207/s15516709cog1202_4` — HTTP Error 403: Forbidden
- DOI `10.1016/j.infsof.2021.106571` — HTTP Error 403: Forbidden
- DOI `10.1145/3777555.3777561` — HTTP Error 403: Forbidden

## C · ISBN-only (monographs — procurement)

- ISBN `978-0-321-96551-6` — Steve Krug, *Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability, 3rd Edition*, 2014, New Riders · _T1-durable-core-css-js-a11y.edited.md_
- ISBN `978-0-12-800646-7` — Jonathan Lazar, Daniel F. Goldstein, and Anne Taylor, *Ensuring Digital Accessibility through Process and Policy*, 2015, Morgan Kaufmann/Elsevier · _T1-durable-core-css-js-a11y.edited.md_
- ISBN `978-0-262-03888-1` — Kat Holmes, *Mismatch: How Inclusion Shapes Design*, 2018, MIT Press · _T1-durable-core-css-js-a11y.edited.md_

## Next commands

```bash
# Re-try OA for known DOIs (after campus VPN / new Unpaywall hits)
cd ~/src/profield && make retrieve-temario-fe

# Registry enrich (Crossref / Open Library) — no PDF download
cd ~/src/profield && make refcheck-temario-fe

# Coat + Athanor gate
cd ~/src/profield && make athanor-ready-fe
```

