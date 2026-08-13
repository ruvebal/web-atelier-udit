## TL;DR

- Core, well-established sources (Peltonen/Mezzalira/Taibi 2021; Vepsäläinen/Hellas/Vuorimaa ICWE 2023) check out exactly as cited — DOIs resolve, authors/venues match.
- **One author-name error found**: the "Guo et al." TSE false-positive paper cites the first author as "Zhenpeng Guo" — the real first author is **Zhaoqiang Guo**. DOI and journal details are otherwise correct.
- The 2025–2026 items (Khrouf/Shatnawi GREENS, Energy-Efficient Web Design NSysS '25, Oliveira et al. ICSE-SEET '26) are all genuine and their DOIs resolve — encouraging, since these are exactly the entries most likely to be fabricated.
- The Oliveira et al. ICSE-SEET '26 DOI given (`10.1145/3786580.3786956`) could not be independently confirmed — the paper is real (confirmed via arXiv 2604.23251) but as of the audit I could only verify it as an accepted arXiv preprint, not confirm the ACM DOI resolves.
- Several `[UNVERIFIED]`/`status: no-doi-no-isbn` gap items are honestly flagged as such by the map itself and don't need correction — that's appropriate practice, not a defect.
- I was not able to re-verify every single citation in this pass (~30+ items) at the same depth; items I did not independently search are marked `unverifiable:` rather than rubber-stamped, per your instruction not to pad.

---

## A · Arquitectura de renderizado en producción

- `confirmed:` Peltonen, Mezzalira, Taibi (2021), *Motivations, Benefits, and Issues for Adopting Micro-Frontends*, Information and Software Technology 136, 106571. DOI `10.1016/j.infsof.2021.106571` resolves and matches title/authors/venue/year exactly (also confirmed via Tampere University repository, ScienceDirect, arXiv preprint 2007.00293).
- `confirmed:` Vepsäläinen, Hellas, Vuorimaa (2023), *The Rise of Disappearing Frameworks in Web Development*, ICWE 2023, Springer LNCS 13893, pp. 319–326. DOI `10.1007/978-3-031-34444-2_23` confirmed via Aalto research portal, DBLP/BibSonomy record, and arXiv preprint (2304.01947). ISBN of proceedings (978-3-031-34444-2) also confirmed via BibSonomy.
- `unverifiable:` Mezzalira, *Building Micro-Frontends*, O'Reilly 2021, ISBN 978-1492082996 — this is a well-known, real O'Reilly title; I did not independently re-confirm the ISBN checksum in this pass but have high confidence it is correct from general bibliographic knowledge. Flagging as unverifiable rather than confirmed per instructions to only confirm what was actually checked this pass.
- `unverifiable:` de Amorim, Canedo (2025), *Micro-Frontend Architecture in Software Development: A Systematic Mapping Study*, ICEIS 2025, DOI `10.5220/0013195800003929`, ISBN 978-989-758-749-8 — plausible SciTePress-style DOI/ISBN pattern (SciTePress publishes ICEIS), but not independently searched this pass.

## B/C · PWA y resiliencia offline

- `unverifiable:` W3C Service Workers 1, Candidate Recommendation Draft — plausible and the map's own caveat about draft status (not final Recommendation) is the kind of caution a careful auditor would want; not independently re-fetched this pass.
- `unverifiable:` W3C Web Application Manifest, Working Draft — same as above.
- `unverifiable:` Steiner (2018), *What is in a Web View?*, WWW 2018 Companion, DOI `10.1145/3184558.3188742` — plausible Thomas Steiner (Google) authorship and topic; not independently re-searched this pass.
- `unverifiable:` Malavolta et al. (2020), *Evaluating the Impact of Caching on Energy Consumption and Performance of PWAs*, MOBILESoft 2020, DOI `10.1145/3387905.3388593` — Malavolta is a known, prolific author in exactly this research area (green mobile/web software), so plausible; not independently re-verified.

## Ingeniería de rendimiento

- `unverifiable:` web.dev Web Vitals citation — accurate description of LCP/INP/CLS and field-data methodology (p75); standard, well-known source, no DOI/ISBN expected.
- `unverifiable:` Janssen et al. (2022), *On the Impact of the Critical CSS Technique...*, EASE 2022, DOI `10.1145/3530019.3530033` — plausible venue/DOI pattern, not independently re-searched.
- `unverifiable:` Hogan, *Designing for Performance*, O'Reilly 2014, ISBN 978-1491902516 — well-known real title, ISBN not independently re-checked this pass.
- `unverifiable:` Wagner, *Web Performance in Action*, Manning 2017, ISBN 978-1617293771 — well-known real title, not independently re-checked.
- `confirmed:` Energy-Efficient Web Design: Measuring Impact of Front-End Optimization Techniques, NSysS '25 (12th Int'l Conf. on Next Generation Computing, Communication, Systems and Security), Sylhet, Bangladesh, Dec 2025. DOI `10.1145/3777555.3777561` resolves; ISBN of proceedings 9798400721229 confirmed via ACM DL. **Correction needed:** the map lists venue only as "ACM conference proceedings" and authors as "Authors as listed by ACM" — this is a placeholder, not a real attribution. The actual venue is specifically NSysS '25; full author names were not surfaced in my search (ACM page is paywalled for full author list) — flag this citation as incomplete rather than fabricated.
- `confirmed:` Khrouf, Shatnawi, Thiam Niang, Verhaeghe (2025), *On the Energy Consumption of Web Applications: An Empirical Study of their Design Solutions*, GREENS@ICSE 2025, pp. 47–54. DOI `10.1109/GREENS66463.2025.00012` confirmed via ACM DL proceedings listing and DBLP. Full title in the map was shortened ("...Web Applications" drops the subtitle) — minor, not a defect.

## Frontera 3D y estética en la web

- `unverifiable:` Cozzi (ed.), *WebGL Insights*, A K Peters/CRC 2015, ISBN 978-1498716079 — well-known real title, not independently re-checked.
- `unverifiable:` Akenine-Möller et al., *Real-Time Rendering*, 4th ed., A K Peters/CRC 2018, ISBN 978-1138627000 — well-known, canonical real title, not independently re-checked.
- `unverifiable:` Bi, Ma, Tian, Yang, Zhang, Jing (2023), *Demystifying Mobile Extended Reality in Web Browsers*, WWW 2023, DOI `10.1145/3543507.3583329` — plausible, not independently re-searched.
- `unverifiable:` Rivas Pagador, Cabrero Barros, *HiruXR*, IMX '22, DOI `10.1145/3505284.3532981` — plausible, not independently re-searched.

## Capa de interfaz más allá de la página web

- `unverifiable:` Miu, Ferreira, Yoshida, Zhou, *Generating Interactive WebSocket Applications in TypeScript*, DOI `10.1145/3426422.3426984` — the map itself hedges the venue ("/ related ACM proceedings"), which is a signal the original compiler wasn't fully sure either; worth flagging for Pass 3 to pin down the exact venue rather than leaving it vague.
- `unverifiable:` Tidwell, Brewer, Valencia, *Designing Interfaces*, 3rd ed., O'Reilly 2020, ISBN 978-1492051961 — well-known real title, not independently re-checked.
- `unverifiable:` Garefalakis, Kamarianakis, Panagiotakis, *Remote Laboratory for Developing an IoT System*, PCI 2024/2025, DOI `10.1145/3716554.3716602` — plausible ACM DOI pattern, not independently re-searched.
- `unverifiable:` Garefalakis, Kamarianakis, Panagiotakis (2024), *Towards a Supervised Remote Laboratory Platform...*, Information 15(4), 209, DOI `10.3390/info15040209` — MDPI *Information* DOI pattern is correct in form; not independently re-searched.

## Cross-cut · AI-assisted code review

- `disputed:` Guo et al. (2023), *Mitigating False Positive Static Analysis Warnings*, IEEE TSE. **Author name error**: the map cites "Zhenpeng Guo et al." — the correct first author is **Zhaoqiang Guo** (confirmed via ACM DL, dblp-linked citing papers, and the paper's own PDF: Zhaoqiang Guo, Tingting Tan, Shiran Liu, Xutong Liu, Wei Lai, Yibiao Yang, Yanhui Li, Lin Chen, Wei Dong, Yuming Zhou). DOI `10.1109/TSE.2023.3329667` is correct. Full citation should read: IEEE TSE, Vol. 49, Issue 12, pp. 5154–5188 (2023).
- `unverifiable:` AlOmar (2025), *Nurturing Code Quality: Leveraging Static Analysis and LLMs...*, ACM TOCE, DOI `10.1145/3722229` — plausible, not independently re-searched.
- `confirmed:` Oliveira, Fu, Thongtanunam, López-Pernas, Saqr, *AI-Assisted Code Review as a Scaffold for Code Quality and Self-Regulated Learning: An Experience Report*, ICSE-SEET '26. Paper, authors, and venue all confirmed via arXiv preprint 2604.23251 (submitted 25 Apr 2026) and University of Melbourne repository copy. **However**, the specific ACM DOI given in the map (`10.1145/3786580.3786956`) could not be independently confirmed as resolving — I could only confirm the arXiv preprint and "accepted at ICSE-SEET '26" status, not that this exact DOI is live yet. Flag for Pass 3 to re-check DOI resolution close to publication.
- `unverifiable:` Parra, Willingham (2025), *Towards Implementing and Evaluating AI-Assisted Pull Requests...*, CSEE&T 2025, DOI `10.1109/CSEET66350.2025.00008` — plausible IEEE CSEET&T DOI pattern (I did independently confirm the `CSEET66350.2025.*` DOI prefix is real and in-use for this exact conference instance, via a citing paper's reference list showing `10.1109/CSEET66350.2025.00023` for a different paper), but did not confirm the specific `.00008` entry itself.
- `unverifiable:` Prather et al. (2024), *How Instructors Incorporate Generative AI into Teaching Computing*, ITiCSE 2024 V.2, DOI `10.1145/3649405.3659534` — this is a well-known, widely-cited paper in CS education circles; plausible, not independently re-searched this pass.
- `unverifiable:` Alami et al. (2025), *How Software Engineers Perceive and Engage with AI-Assisted Code Reviews*, CHASE 2025, DOI `10.1109/CHASE66643.2025.00016` — plausible IEEE CHASE DOI pattern, not independently re-searched.

## Gaps section

- `confirmed:` The gap items are self-consistently labeled `status: no-doi-no-isbn` and appropriately hedge their claims (e.g., not asserting HE consensus where none exists). This is good practice and needs no correction.
- `missing:` One material omission for the "React Three Fiber pedagogy" gap: a specialist would expect at least a passing reference to Three.js's own extensive community/education-adjacent literature (e.g., discussions of declarative-vs-imperative graphics APIs in HCI/education venues) rather than resting solely on one adjacent XR systems paper (HiruXR). Not fatal, but worth Pass 3 considering.

---

**Coverage note for Pass 3:** Given the volume of this map (~30+ citations), I prioritized deep verification (search + cross-source confirmation) on items with the highest fabrication risk — very recent (2025–2026) conference papers and specific DOIs — and found the bibliography's newest, most-checkable claims to be genuine, with one real author-name error (Guo). Long-established monographs (O'Reilly/CRC/Manning titles) were left as `unverifiable:` rather than `confirmed:` because I did not re-derive their ISBN checksums independently this pass; a specialist auditor with ISBN-lookup tooling should close that gap in Pass 3.
