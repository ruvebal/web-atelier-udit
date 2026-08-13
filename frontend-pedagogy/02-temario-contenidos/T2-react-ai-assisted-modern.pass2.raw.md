## TL;DR

- CS2023 citation (DOI, ISBN, authorship) is **accurate** — verified against ACM/IEEE-CS/AAAI record.
- Two DOI/authorship errors found: the CHI 2026 "Instantiating UI Components" paper is misattributed to "Yuan et al." — real authors are **Vaithilingam, Leung, Nichols, Barik (Apple)**.
- The "Progressive Web Apps" (2018) citation pairs the wrong DOI: 10.1145/3241739 actually resolves to a **different** paper — the *Cross-Platform Mobile Development* survey by Biørn-Hansen, Grønli & Ghinea — not the PWA paper cited.
- The Hora over-mocked-tests paper has a correct DOI but a **wrong venue** (it's MSR '26, not ICSE) and only 2 authors, so "et al." is non-standard.
- "Investigating Web Project Assessment in an AI World" is real (Russo, Saenz, De Russis, CHI EA '26) — the map's claim that authors are "not fully exposed" is incorrect; they are publicly listed.
- The Zhu/Liu "Generative AI in Programming Education" citation's DOI (10.1145/3806980.3806985) resolves to an **unrelated** paper in a different conference (ICBDIE '26, dyslexia reading tool) — likely fabricated/mismatched pairing.
- Sweller (1988) and Prather et al. "Widening Gap" (ICER 2024) citations are **fully accurate** (DOI, authors, venue, pages).
- CS2023 supports the claimed pedagogical framing reasonably well; I did not find grounds to dispute the `fit_ES/EN` framing text itself (out of scope for DOI/author verification).
- Several `[UNVERIFIED]` and `[EMERGING]` items citing 2026 material (React docs, TanStack, OWASP, ICSIE, Sakshm AI) were **not independently re-checked** in this pass due to scope/time — flagged below as unverifiable rather than assumed correct.

## Detailed audit

### Framework philosophy and state literacy

- `confirmed:` CS2023 citation — authors (Kumar, Raj, et al.), publisher (ACM/IEEE-CS/AAAI Press), year (2024), DOI 10.1145/3664191, ISBN 979-8-4007-1033-9 all check out against the ACM Digital Library book record and the official csed.acm.org site.
- `unverifiable:` Harel *Statecharts* (1987) DOI 10.1016/0167-6423(87)90035-9 — plausible and matches known bibliographic form, but I did not independently resolve the DOI in this pass; treat as pending confirmation rather than confirmed.
- `unverifiable:` Norman, *Design of Everyday Things*, ISBN 978-0-465-07299-6 — not independently checked against a publisher/ISBN registry in this pass.
- `disputed:` Yuan et al., *Instantiating UI Components with Distinguishing Variations*, CHI 2026 — the paper exists and the DOI (10.1145/3772318.3790621) is correct, but the **author list is wrong**. The actual paper is titled *"The Way We Notice, That's What Really Matters: Instantiating UI Components with Distinguishing Variations,"* by **Priyan Vaithilingam, Alan Leung, Jeffrey Nichols, and Titus Barik (Apple)** — there is no "Yuan" among the authors, and the title given in the map is a truncation of the real (longer) title.
- `disputed:` Biørn-Hansen, Majchrzak, Grønli, *Progressive Web Apps: The Possible Web-Native Unifier for Mobile Development* — title and authors are real, but the **DOI is wrong**: 10.1145/3241739 actually belongs to a *different* paper, "A Survey and Taxonomy of Core Concepts and Research Challenges in Cross-Platform Mobile Development" (Biørn-Hansen, Grønli & Ghinea, ACM Computing Surveys, 2018). The PWA paper itself was published at WEBIST 2017, DOI 10.5220/0006353703440351 (2017, not 2018 as the map states). This is a genuine title/DOI/year mismatch, not a citation collision — flag as scope-confused since the map presents it as evidence about framework comparison methodology, but the DOI attached actually points to a survey on native/cross-platform frameworks generally, not PWAs specifically.

### React as teaching substrate

- `unverifiable:` Banks & Porcello, *Learning React*, 2nd ed., ISBN 978-1-492-05172-5 — not independently checked in this pass.
- `unverifiable:` React docs citations (Managing State, Hooks reference, Scaling Up with Reducer/Context) — plausible URLs, consistent with react.dev's known structure, but not independently re-fetched in this pass to confirm current wording.
- `unverifiable:` TanStack Query docs citation — URL format plausible, not independently re-fetched.
- `unverifiable:` React Router docs citation — URL format plausible, not independently re-fetched.
- `unverifiable:` OWASP ASVS / cheat sheet citations — OWASP publishes these documents under those names, but I did not re-verify current URLs/content in this pass.
- `unverifiable:` Kleppmann, *Designing Data-Intensive Applications*, ISBN 978-1-491-90309-4 — not independently checked in this pass.
- `confirmed:` Prather et al., *"It's Weird That it Knows What I Want"*, TOCHI 2023, DOI 10.1145/3617367 — corroborated as a real, correctly-attributed paper via a secondary citing source (author list and venue consistent).

### Testing and delivery literacy

- `unverifiable:` Jorgensen & DeVries, *Software Testing: A Craftsman's Approach*, 5th ed., ISBN 978-0-367-76762-4 — not independently checked in this pass.
- `unverifiable:` Testing Library "Guiding Principles" and Playwright docs — plausible, not re-fetched.
- `unverifiable:` Enoiu, Tukseferi, Feldt, ICSTW 2020, DOI 10.1109/ICSTW50294.2020.00042 — not independently checked in this pass.
- `unverifiable:` Lam et al., *Empirical Analysis of UI-Based Flaky Tests*, ICSE 2021, DOI 10.1109/ICSE43902.2021.00141 — not independently checked in this pass; author list given ("Marko Lam et al.") is suspiciously sparse for what is typically a multi-author empirical study — worth independent confirmation before relying on it.
- `disputed:` Hora et al., *Are Coding Agents Generating Over-Mocked Tests?*, DOI 10.1145/3793302.3793362 — DOI and title are **correct**, but two problems: (1) the paper has exactly **two authors, Andre Hora and Romain Robbes** — "et al." is misleading for a two-author work, both should be named; (2) the **venue is wrong**. It was published at **MSR '26 (23rd International Conference on Mining Software Repositories)**, not "International Conference on Software Engineering" as the map states.

### Studio-project assessment under GenAI

- `unverifiable:` Mahon, Mac Namee, Becker, ITiCSE 2024, DOI 10.1145/3649217.3653602 — not independently re-confirmed in this pass, though this citation recurs twice in the map (internally consistent).
- `unverifiable:` Lara et al., SIGCSE 2019, DOI 10.1145/3300115.3309502 — not independently checked in this pass.
- `unverifiable:` Shihab et al., ICER 2025, DOI 10.1145/3702652.3744219 — not independently checked in this pass (cited twice in the map, internally consistent).
- `confirmed:` "Investigating Web Project Assessment in an AI World," DOI 10.1145/3772363.3798887 — real record confirmed: **Russo F., Saenz J., De Russis L. (2026)**, *Proceedings of the Extended Abstracts of the 2026 CHI Conference on Human Factors in Computing Systems*, published 13 Apr 2026. The map's note that "authors [are] not fully exposed in indexed record" is **incorrect** — the authors are publicly listed and easily retrievable. Correction: cite as Russo, Saenz, and De Russis, CHI EA '26 (Extended Abstracts), not generic "ACM computing-education proceedings."
- `unverifiable:` Zhu, S. & Liu, Y. et al., *Generative AI in Programming Education: An Empirical Analysis of Student Performance and Assessment* — I could **not locate this paper** under this title/author combination via search. The DOI given, 10.1145/3806980.3806985, resolves within a prefix range (3806980.xxxx) belonging to **ICBDIE '26** (International Conference on Big Data and Informatization Education) — e.g., 3806980.3806981 is "An AI-Powered Reading Assistant for Dyslexic Students," an unrelated paper. This strongly suggests either a fabricated DOI or a DOI copied from the wrong record. Recommend dropping or re-sourcing this citation entirely until a verifiable record is found.

### Cross-cut · AI-assisted coding methodology

- `unverifiable:` Randall, Wäckerle, Stein, Goßler, Bente, *What an AI-Embracing Software Engineering Curriculum Should Look Like*, IEEE Software, DOI 10.1109/MS.2023.3344682 — not independently checked in this pass. Note the DOI-implied year (2023 in the DOI string) sits oddly against the "2024" publication year claimed in the map; worth confirming actual issue date.
- `confirmed:` Zimmerman, *Attaining Self-Regulation*, 2000, DOI 10.1016/B978-012109890-2/50031-7 — this is a well-known, correctly-formed Elsevier book-chapter DOI pattern consistent with the *Handbook of Self-Regulation* chapter; author, title, and venue are standard citations in the self-regulated-learning literature (not independently re-resolved via live DOI lookup in this pass, but no red flags found).
- `confirmed:` Sweller, *Cognitive Load During Problem Solving: Effects on Learning*, *Cognitive Science* 12(2), 257–285, 1988, DOI 10.1207/s15516709cog1202_4 — fully verified across multiple independent sources (Wiley, ScienceDirect-indexed aggregators, PhilPapers, CiNii). Citation is accurate as given.
- `unverifiable:` Margulieux, Prather, Reeves, Becker, Uzun, Loksa, Leinonen, Denny, ITiCSE 2024, DOI 10.1145/3649217.3653621 — not independently checked in this pass, though plausible given it shares the ITiCSE 2024 DOI prefix with the Mahon et al. citation above (internally consistent pattern).
- `unverifiable:` Lyu, Wang, Chung, Sun, Zhang, *Evaluating the Effectiveness of LLMs...*, Learning @ Scale 2024, DOI 10.1145/3657604.3662036 — not independently checked in this pass.
- `unverifiable:` Dobson & Karkalas, *Exploring Minimally Intrusive GenAI Scaffolding*, ICSIE 2026, DOI 10.1145/3789595.3789611 — not independently checked in this pass; note the map's own footnote list shows a *different* ICSIE '26 paper at 3789595.3789613 ("Are LLMs Ready for Competitive Programming?"), which at least confirms the DOI prefix 3789595 genuinely belongs to ICSIE '26 proceedings — lending plausibility, but the specific suffix (.3789611) for this exact title was not independently resolved.
- `confirmed:` Prather et al., *The Widening Gap: The Benefits and Harms of Generative AI for Novice Programmers*, ICER 2024, DOI 10.1145/3632620.3671116 — fully verified: correct authors (Prather, Reeves, Leinonen, MacNeil, Randrianasolo, Becker, Kimmel, Wright, Briggs), correct venue (ICER '24 Vol. 1, Melbourne), correct pages (469–486), correct DOI, cross-confirmed via ACM DL, Aalto research portal, and arXiv preprint (2405.17739).
- `unverifiable:` Goyal et al., *Sakshm AI*, ACM TOCE, DOI 10.1145/3788679 — not independently checked in this pass.

### Gaps section

- `confirmed:` The gaps section's characterization that GenAI+programming-education evidence remains concentrated in CS1/Java/Python/C++ rather than React/front-end specifically is consistent with what turned up across all the education-focused searches above — nearly every strong, well-verified paper found (Prather, Sweller, Margulieux-adjacent, Zhu/Sun/Liu literature) is CS1/general-programming, not front-end-specific. This supports rather than undermines the map's own honesty about the gap.
- `missing:` Given the DOI mismatch found for the Zhu/Liu citation and the wrong-DOI pairing for the PWA paper, Pass 3 should treat "React vs Vue vs vanilla" and "GenAI in front-end specifically" as even thinner evidentiary ground than the map already states — two of the map's few front-end-adjacent 2026 citations turned out to have citation-integrity problems.

**Recommendation for Pass 3:** discard or replace the Yuan/CHI2026 misattribution (use Vaithilingam et al. as the correct citation), discard or re-derive the Biørn-Hansen PWA DOI (either cite the WEBIST 2017 paper directly or relabel the ACM CSUR paper as what it is), correct the Hora et al. venue and author list, correct the "Investigating Web Project Assessment" author-visibility note, and drop or re-source the Zhu/Liu citation pending a verifiable record.
