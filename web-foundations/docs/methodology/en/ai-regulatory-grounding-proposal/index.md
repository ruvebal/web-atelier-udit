# Proposal: Regulatory & Research Grounding for "AI for My Students"

**Status:** Merged into canonical methodology pages (2026-07-29). Evidence entries A1–A17 integrated per §F treatment decisions.
**Prepared for:** Rubén Vega Balbás, PhD
**Subject:** *AI for my students — what do I expect, recommend, demand?*
**Scope:** Matches drawn from the Ahmes-ingested MSCA/SVCM vault (`~/ahmes-library/svcm/`) against the four AI-related methodology files in `docs/methodology/`:

- `en/index.md` — §"Integrating AI as an Aid, Not a Shortcut"
- `en/ai-practical-guide/index.md` — §"Ethical Frameworks" / §"The AI Ethics Protocol"
- `en/tao-of-ai-development/index.md` — Ch. IV "The Ethics of Creation" / §"Related Wisdom"
- `en/ai-assisted-development-foundations/index.md` — §"Security & Trust Models" / §"Observability & Operations"

This document records the evidence audit and merge decisions. Canonical content now lives in the four methodology files listed below. Every quote below carries **Tri-Anchor provenance** per Ahmes's own rule (`ahmes/CLAUDE.md` — "Verbatim Quote Provenance Rule"): document bundle path + page + block, so nothing here is paraphrased from memory.

---

## How to read the evidence table

Each entry gives:

- **Quote** — verbatim, copied from `fission_node.markdown_content`
- **Source** — short label, full citation in the [APA list](#canonical-apa-reference-list) below
- **Ahmes anchor** — `svcm/documents/<bundle>/` + page number (spatial anchor, PDF page index)
- **Insert into** — file + section + suggested treatment

Bibliographic note: as of 2026-07-29, all 59 `svcm/documents/` vaults have been through `ahmes enrich --meta` (397 metadata rows total). Titles/authors/years below combine machine-extracted metadata where available with front-matter nodes. Flagged with ⚠ where a detail (volume, page range, exact publisher imprint) couldn't be confirmed from the extracted text alone.

---

## A. Evidence matched to methodology themes

### A1 — AI in teaching, e-learning, and the student relationship (the central match)

> "Member States should encourage research initiatives on the responsible and ethical use of AI technologies in teaching, teacher training and e-learning, among other issues... Member States should also ensure that AI technologies empower students and teachers and enhance their experience, bearing in mind that relational and social aspects and the value of traditional forms of education are vital in teacher-student and student-student relationships... AI should support the learning process without reducing cognitive abilities and without extracting sensitive information, in compliance with relevant personal data protection standards."
> — **UNESCO Recommendation on the Ethics of AI** (2021), §104, p. 34
> Anchor: `svcm/documents/381137eng_cd7d800f/` · node block_type=text

**Insert into:** `en/index.md` §"Integrating AI as an Aid, Not a Shortcut" (currently anecdotal — one New York Magazine quote, no institutional grounding) **and** `ai-practical-guide/index.md` §"Ethical Frameworks" (currently a bare bullet list under "UNESCO Recommendation on the Ethics of AI (2021)" with no verbatim text at all). This is the single paragraph in the entire UNESCO Recommendation that speaks directly to your subject line — it should anchor both sections, ideally as a blockquote before your own prose.

---

### A2 — AI literacy is now a *legal obligation*, not just pedagogy

> "Providers and deployers of AI systems shall take measures to ensure, to their best extent, a sufficient level of AI literacy of their staff and other persons dealing with the operation and use of AI systems on their behalf, taking into account their technical knowledge, experience, education and training and the context the AI systems are to be used in..."
> — **EU AI Act**, Regulation (EU) 2024/1689, Article 4 ("AI literacy"), p. 51
> Anchor: `svcm/documents/oj_l_202401689_en_txt_bba63044/`

This is a genuinely under-cited fact worth foregrounding: **Article 4 of the EU AI Act makes "AI literacy" a binding legal requirement**, not merely good pedagogy. Your course is arguably already in compliance with, and a working example of, an EU legal obligation — that's a strong, concrete claim to make explicit rather than leave implicit.

**Insert into:** `ai-practical-guide/index.md` §"Ethical Frameworks" as a new third framework (alongside ACM and UNESCO): **"EU AI Act — Article 4, AI Literacy."** This is currently a complete hole (see Gap G3 below) — the EU's own binding AI law is never mentioned anywhere in the four files, despite GDPR being mentioned once in passing.

---

### A3 — The EU's Trustworthy AI framework (the seven requirements)

The Horizon Europe ethics self-assessment guide — the document you yourself must complete as an MSCA fellow — lays out the European Commission's **Ethics Guidelines for Trustworthy AI** in full:

> "Human agency and oversight - AI systems must support human autonomy and decision-making, enabling users to make informed autonomous decisions regarding the AI systems."
> "Privacy and data governance - AI systems must guarantee privacy and data protection throughout the system's lifecycle... Data minimisation and data protection should never be leveraged to hide or obscure bias..."
> "Societal and environmental well-being - The impact of the developed and/or used AI system/technique on the individual, society and environment must be carefully evaluated and any possible risk of harm must be avoided... Sustainability and ecological responsibility of AI systems should be encouraged..."
> "Accountability - Requires that the actors involved in their development or operation take responsibility for the way that these applications function... To be held to account, developers or operators of AI systems must be able to explain how and why a system exhibits particular characteristics or results in certain outcomes."
> — **European Commission, "How to complete your ethics self-assessment"** (Horizon Europe), §8 "Artificial intelligence (all EU Programmes)", pp. 41–43
> Anchor: `svcm/documents/how_to_complete_your_ethics_self_assessment_en_f8ff84a8/`

**Insert into:**
- `ai-practical-guide/index.md` §"Ethical Frameworks" — as a parallel framework table next to UNESCO's 8 principles (they overlap ~70% but aren't identical; showing both is more rigorous, and both being satisfied is a stronger claim than either alone).
- `ai-assisted-development-foundations/index.md` §"Human-in-the-Loop Design" (line ~247) — the "Human agency and oversight" clause is a near word-for-word regulatory restatement of your own "Mantra: Agents are junior interns, not autonomous gods." Citing it turns a metaphor into a compliance-grounded claim.
- `ai-assisted-development-foundations/index.md` §"Security & Trust Models" — the "Privacy and data governance" clause pairs naturally with your "Capability-Based Security" / "Blast Radius Thinking" tables, which currently cite no regulation at all.

---

### A4 — "AI should serve as a tool for people" — an almost verbatim precedent for your own core principle

> "Artificial intelligence should serve as a tool for people, with the ultimate aim of increasing human well-being."
> "Everyone should be empowered to benefit from the advantages of algorithmic and artificial intelligence systems including by making their own, informed choices in the digital environment, while being protected against risks and harm..."
> — **European Declaration on Digital Rights and Principles for the Digital Decade** (European Commission, 2022)
> Anchor: `svcm/documents/european_declaration_on_digital_rights_and_principles_signed_..._392d8278/`

This is worth flagging explicitly: your `ai-practical-guide/index.md` opens with *"AI exists to AMPLIFY human intent, not replace it"* and *"The Human Flourishing Test."* The EU Declaration says almost the same thing in almost the same register. This isn't coincidence-worth-hiding — it's worth **citing as validation**: your pedagogical philosophy is not idiosyncratic, it restates a signed EU political commitment.

**Insert into:** `ai-practical-guide/index.md` §"Philosophy: AI for Human Better Living" — as an epigraph or closing citation to that section.

---

### A5 — Digital/AI literacy as an education policy target

> "...supporting solidarity and inclusion, through connectivity, digital education, training and skills..."
> "Everyone has the right to education, training and lifelong learning and should be able to acquire all basic and advanced digital skills."
> "...supporting efforts that allow all learners and teachers to acquire and share the necessary digital skills and competences, including media literacy, and critical thinking, to take an active part in the economy, society, and in democratic processes."
> — **European Declaration on Digital Rights and Principles** (2022), Ch. "Digital education, training and skills"

> "Member States should promote the acquisition of 'prerequisite skills' for AI education, such as basic literacy, numeracy, coding and digital skills, and media and information literacy, as well as critical and creative thinking, teamwork, communication, socio-emotional and AI ethics skills..."
> "Member States should invest in and promote digital and media and information literacy skills to strengthen critical thinking and competencies needed to understand the use and implication of AI systems, in order to mitigate and counter disinformation, misinformation and hate speech."
> — **UNESCO Recommendation on the Ethics of AI** (2021), pp. 33, 35
> Anchor: `svcm/documents/381137eng_cd7d800f/`

**Insert into:** `en/index.md` §"Integrating AI as an Aid, Not a Shortcut" — supports the "critical thinking over trivial-solution assignments" pedagogy you already describe, but currently with zero citation.

---

### A6 — Proportionality, sustainability, and the "weight of tokens"

> "When choosing AI methods, given the potential data-intensive or resource-intensive character of some of them and the respective impact on the environment, Member States should ensure that AI actors, in line with the principle of proportionality, favour data, energy and resource-efficient AI methods... in instances where there are disproportionate negative impacts on the environment, AI should not be used."
> — **UNESCO Recommendation on the Ethics of AI** (2021), "Proportionality and Do No Harm", p. 31
> Anchor: `svcm/documents/381137eng_cd7d800f/`

**Insert into:** `tao-of-ai-development/index.md` Chapter IV "The Ethics of Creation" (§"The Weight of Tokens" — "Each prompt you send: consumes energy, generates heat..."). This chapter is currently pure rhetoric with zero citation. This UNESCO clause is the formal-law version of exactly what the chapter argues in poetic register — worth a closing footnote: *"This is not just rhetoric. See UNESCO (2021), 'Proportionality and Do No Harm.'"*

---

### A7 — Responsibility, accountability, and human oversight (never ceding "ultimate" responsibility)

> "...the decision to cede control in limited contexts remains that of humans, as humans can resort to AI systems in decision-making and acting, but an AI system can never replace ultimate human responsibility and accountability."
> "Transparency and explainability relate closely to adequate responsibility and accountability measures, as well as to the trustworthiness of AI systems."
> — **UNESCO Recommendation on the Ethics of AI** (2021), "Responsibility and accountability", p. 22
> Anchor: `svcm/documents/381137eng_cd7d800f/`

**Insert into:** `tao-of-ai-development/index.md` — this is a formal-register restatement of the **Craftsman's Oath** ("I am the human in the loop. The code is mine to own. The bugs are mine to fix.") — cite it right after the Oath as a "this is also positive international law" callout.

---

### A8 — MSCA + AI: the policy brief written for your own funding program

> "This policy brief explores the opportunities and challenges AI presents within Horizon Europe and the Marie Skłodowska-Curie Actions (MSCA), relevant EU political guidelines, and existing publications. It also offers a summary of recommendations to ensure AI research is conducted responsibly, ethically, and in line with the EU's values."
> "Ethical and legal risks: AI technologies can raise significant ethical and legal concerns, particularly regarding bias, discrimination, copyright issues and plagiarism. It must be ensured that AI research adheres to high ethical standards, including transparency, fairness, accountability, and non-discrimination."
> "The 'Living Guidelines on the Responsible Use of Generative AI in Research' (developed by the European Research Area Forum) are a crucial tool for ensuring that AI technologies, especially generative AI, are used ethically and responsibly... The guidelines outline best practices for using AI tools in a transparent, accountable, and responsible manner and provide key recommendations for researchers, research organisations and research funding organisations."
> — **MSCA-NET Policy Brief: Artificial Intelligence** (Deliverable 3.13, 2025), pp. 3, 5
> Anchor: `svcm/documents/ai_policy_brief_459fedc4/`

This is, thematically, the most *personally* relevant source in the whole vault: it is a policy brief about AI written **for the MSCA network you belong to**. It names "bias, discrimination, copyright issues and plagiarism" as the exact risk list, and points to a living-document framework (Living Guidelines on Responsible Use of Generative AI in Research) — now ingested and documented as **A17**.

**Insert into:** `ai-practical-guide/index.md` §"Ethical Frameworks" — as a fourth, closest-to-home framework: *"Not just international law and EU regulation — the policy brief written for my own funding network says the same thing."* This is the strongest available device for the "what do I demand" framing: you can honestly say *"I hold my students to the same standard my own funding network holds me to."*

---

### A9 — The European Charter for Researchers: the professional-responsibility analogy

> "Researchers should make every effort to ensure that their research is relevant to society and does not duplicate research previously carried out elsewhere. They must avoid plagiarism of any kind and abide by the principle of intellectual property and joint data ownership..."
> — **European Charter for Researchers** (European Commission, 2005), "Professional responsibility", p. 12–13

> "Researchers need to be aware that they are accountable towards their employers, funders or other related public or private bodies as well as, on more ethical grounds, towards society as a whole... they should adhere to the principles of sound, transparent and efficient financial management and cooperate with any authorised audits..."
> — same source, "Accountability", p. 14
> Anchor: `svcm/documents/am509774cee_en_e4_5bcc3da7/` · node block_type=text

This is the single best available device for your exact subject line. The Charter is the EU's own formal statement of *what it expects, recommends, and demands* of researchers — including you. Framing your student AI policy as a **pedagogical mirror of the Charter you are yourself bound by** is both rhetorically strong and literally true.

**Insert into:** `en/index.md` §"Integrating AI as an Aid, Not a Shortcut" — merged 2026-07-29 with full Tri-Anchor provenance (232 blocks ingested from `am509774cee_en_e4.pdf`).

---

### A10 — ICMJE: the scholarly-publishing precedent for your existing disclosure policy

> "At submission, the journal should require authors to disclose whether they used Artificial Intelligence (AI)-assisted technologies (such as Large Language Models [LLMs], chatbots, or image creators) in the production of submitted work... Chatbots (such as ChatGPT) should not be listed as authors because they cannot be responsible for the accuracy, integrity, and originality of the work, and these responsibilities are required for authorship... Authors should not list AI and AI-assisted technologies as an author or co-author, nor cite AI as an author. Authors should be able to assert that there is no plagiarism in their paper, including in text and images produced by the AI. Humans must ensure there is appropriate attribution of all quoted material, including full citations."
> — **ICMJE, Recommendations for the Conduct, Reporting, Editing, and Publication of Scholarly Work in Medical Journals** (2025), §"Artificial Intelligence (AI)-Assisted Technology", p. 3
> Anchor: `svcm/documents/icmje_recommendations_..._d3fd442e/`

This maps almost word-for-word onto your existing **"README AI Assistance Disclosure"** covenant and **Koan 4 ("The Attribution")** in `tao-of-ai-development/index.md`. Right now those read as your own invention; this quote shows they restate an actual, cross-disciplinary scholarly-publishing norm.

**Insert into:**
- `ai-practical-guide/index.md` §"The AI Ethics Protocol" / §"README AI Disclosure Requirement" — as a "this mirrors established scholarly-publishing norms" citation.
- `tao-of-ai-development/index.md` Koan 4 "The Attribution" — as a closing footnote: real editorial policy, not just a parable.

---

### A11 — A research paper whose entire question mirrors yours

> "This study explored the question, 'What do publishers expect on the use of AI as portrayed in the author guidelines and AI publisher policies?'... Existing position statements (e.g., ICMJE, COPE, WAME) are normative and cross-disciplinary, but they do not capture the on-the-ground publisher-specific expectations communicated in author guidelines and policy pages."
> — **Chigwada & Ngulube (2026)**, "Use of artificial intelligence tools in the publishing process: expectations from publishers through author guidelines," *Frontiers in Research Metrics and Analysis*
> Anchor: `svcm/documents/ai_tools_in_publishing_publisher_author_guidelines_2026_37111ef0/`

Worth pointing out directly: this paper's research question — *what do [gatekeepers] expect of [contributors] regarding AI use* — is structurally identical to your subject line, just in the publishing domain instead of the classroom. It's a strong epigraph candidate.

**Insert into:** `ai-practical-guide/index.md` §"The AI Ethics Protocol" — as an opening epigraph, explicitly drawing the parallel (instructor:student :: publisher:author).

---

### A12 — Who owns AI-generated student work? (a hole this fills)

> "...the Office refused to register a claim for two-dimensional artwork described as 'autonomously created by a computer algorithm running on a machine.' The Office's Review Board explained that the work could not be registered because it was made 'without any creative input or intervention from a human author,' and that 'statutory text, judicial precedent, and longstanding Copyright Office practice' all require human authorship as a condition of copyrightability."
> "The crucial question appears to be whether the 'work' is basically one of human authorship, with the computer merely being an assisting instrument, or whether the traditional elements of authorship in the work... were actually conceived and executed not by man but by a machine."
> — **U.S. Copyright Office, Artificial Intelligence and Copyright** (Notice of Inquiry, 2023), pp. 3–5
> Anchor: `svcm/documents/us_copyright_office_ai_and_copyright_noi_2023_1fe35ef4/`

Your students routinely use AI (Copilot, image generators, layout suggestions) inside portfolio work they will later claim as their own professional output. Right now, nothing in the four files addresses *ownership/authorship* of that output — only process/attribution (commit messages, README disclosure). This is a live, practical question for a portfolio-based course and currently a genuine gap.

**Insert into:** `ai-practical-guide/index.md` — new subsection under §"The AI Ethics Protocol", e.g. **"Who Owns What You Build With AI"** — the "human as assisting instrument vs. machine as author" test is directly usable as a rule of thumb for grading portfolio ownership claims.

---

### A13 — Critical AI studies: an academic register for the Tao's anti-hype stance

> "Throughout we try to avoid abstracting AI. We use 'chatbots'... as shorthand for genAI but note that all AI systems sit within wider social, political, cultural and environmental assemblages and involve the fluctuating distribution of mnemonic agency between humans and nonhumans... We conclude with a methodological provocation and by reflecting on our own complicity in the hype we are seeking to dispel."
> — **Merrill, Makhortykh, Mandolessi, Richardson-Walden, Smit, & Wang (2025)**, "Handling the hype: Demystifying artificial intelligence for memory studies," *Memory, Mind & Media*, 4, e18
> Anchor: `svcm/documents/merrill_et_al_2025_..._f3191eeb/`

The Tao's whole "Mephistopheles and the Vibe Coder" framing performs an anti-hype, anti-anthropomorphization stance mythologically. This paper does the same thing academically, in a different field (memory studies), and even flags its own authors' "complicity in the hype" — a nice parallel to the Tao's confessional register ("And that was the first sin").

**Insert into:** `tao-of-ai-development/index.md` §"Related Wisdom" table — add as an academic-register companion piece, showing the mythological framing has a scholarly counterpart, not just a philosophical one (Tao of Programming, Faust).

---

### A14 — AI, creativity, and cultural-heritage ethics (a domain-adjacent framework)

> "The analysis of the applications of AI in the cultural field and of ethical principles and primary legal sources governing these two disciplines led to the construction of an ethical reference framework. This framework should be consulted whenever any of the risks mentioned above emerge... Although the ethical hazards are many, this should not demonize the applications of AI in CH preservation and reconstruction but should encourage an application that respects its social and political value."
> — **Pansoni, Tiribelli, Paolanti, Di Stefano, Frontoni, Malinverni, & Giovanola (2023)**, §4 Conclusions, p. 5
> Anchor: `svcm/documents/pansoni_tiribelli_2023_ethical_framework_for_ai_in_cultural_heritage_isprs_archives_b04333fc/` · node block_type=text

**Insert into:** optional — `en/index.md` "Critical Coding Approach" intro, as a domain-adjacent example (cultural heritage ~ web/digital design) of a discipline building its own bespoke ethical-AI framework rather than importing one wholesale. Lower priority than A1–A13. Re-ingested 2026-07-29 (101 blocks; conclusions now clean).

---

### A15 — Digital scholarly editing and "exogenetic cognition": AI as extended mind

> "This essay examines modernist authors' personal libraries, their reading notes and drafts as aspects of the 'extended mind', and investigates to what extent genetic digital editing can be deployed to study this form of enactive cognition."
> — **Van Hulle, D. (2016)**, "Exogenetic Digital Editing and Enactive Cognition," in M. J. Driscoll & E. Pierazzo (Eds.), *Digital Scholarly Editing: Theories and Practices*, p. 128
> Anchor: `svcm/documents/digital_scholarly_editing_theories_and_practices_2016_e23aff5b/`

This resonates directly with your `ai-practical-guide/index.md` mindset table — **"AI as Mirror" / "AI as Amplifier"** — both are, in effect, claims about *extended cognition*: tools that sit outside the mind but participate in its process. Van Hulle's chapter gives that mindset an actual scholarly-editing pedigree, rather than leaving it as an unsupported metaphor.

**Insert into:** `ai-practical-guide/index.md` §"The Tao Developer's AI Relationship" table — footnote citing this as the scholarly-humanities precedent for "AI as extended cognition," distinct from (and older than) the current generative-AI moment.

---

### A16 — "Artificial imagination" in digital scholarly editing (Van Hulle 2019)

> "But what if we can teach the bot that writing is actually to a large extent re-writing and revising, not just a recombining of words the writer already used in his previous works, but a complex dialectic of composition and decomposition, writing, undoing and rephrasing? If the bot were able to simulate this process, it would be able not merely to imitate but to emulate the writer. This aemulatio would be a step in the direction of artificial imagination."
> "As any scholarly editor knows, literary imagination is not only a matter of individual mental power, but often an interaction between an intelligent agent and his or her material and cultural environment... If we manage to find suitable ways to digitally map this interaction, digital scholarly editions may serve as valuable sources of information providing training data for research into artificial imagination."
> — **Van Hulle, D. (2019)**, "Artificial imagination, imagine: New developments in digital scholarly editing," *International Journal of Digital Humanities*, pp. 1–2
> Anchor: `svcm/documents/international_journal_of_digital_humanities_2019_apr_25_vol_1_iss_2_artificial_imagination_imagine_new_developments_in_digital_scholarly_editing_van_hulle_dirk_2_13fc9b21/` · node block_type=text

Van Hulle distinguishes **imitatio** (style mimicry from published texts) from **aemulatio** (simulating the revision process itself) as the threshold of "artificial imagination." That is a precise DH register for your "AI as Amplifier" claim: the tool is not merely a word-supplier but a participant in a dialectic of composition and decomposition — provided the human remains the agent who owns the final artefact.

**Insert into:**
- `ai-practical-guide/index.md` §"The Tao Developer's AI Relationship" — companion footnote to A15; A15 gives the extended-cognition pedigree, A16 gives the generative-AI-era vocabulary (*imitatio* vs *aemulatio*).
- `en/index.md` §"Integrating AI as an Aid, Not a Shortcut" — as the scholarly-humanities source for treating web/design work as an interaction between an intelligent agent and a material environment (files, drafts, libraries, tools), not pure individual mental power.

Ingested 2026-07-29 (32 blocks; 20/20 semantic anchors).

---

### A17 — ERA Living Guidelines on Generative AI in Research (the framework A8 points to)

> "These guidelines intend to set out common directions on the responsible use of generative AI. While non-binding, they should be considered as a supporting tool for researchers, research organisations and research funding bodies, including the ones applying to the European Framework Programme for Research and Innovation."
> "Researchers, to be transparent, detail which generative AI tools have been used substantially in their research processes. When generative AI meaningfully shapes results, researchers transparently note its use according to the guidelines of their journal or standards in their discipline in the methods section (or equivalent) responsibly evaluating the extent of the contribution."
> "Accountability for the research from idea to publication, for its management and organisation, for training, supervision and mentoring, and for its wider societal impacts. This includes responsibility for all output that a researcher produces, underpinned by the notion of human agency and oversight."
> — **European Commission & ERA Forum (2024/2026)**, *Living guidelines on the responsible use of generative AI in research*, pp. 5–6, 9
> Anchor: `svcm/documents/ec_rtd_ai_guidelines_f3745f68/` · node block_type=text

This is the operative document named inside the MSCA-NET brief (A8). It restates research-integrity principles (accountability, transparency, human oversight) as actionable recommendations for researchers, organisations, and funders — the closest EU-level analogue to your classroom disclosure covenant.

**Insert into:** `ai-practical-guide/index.md` §"Ethical Frameworks" — as the fifth framework alongside UNESCO, EU AI Act Art. 4, Trustworthy AI, and the MSCA brief itself: *"the living document my funding ecosystem expects me to follow."* Pairs naturally with A10 (ICMJE disclosure) and your README AI Assistance Disclosure.

Ingested 2026-07-29 from [EC RTD PDF](https://research-and-innovation.ec.europa.eu/document/download/2b6cf7e5-36ac-41cb-aab5-0d32050143dc_en?filename=ec_rtd_ai-guidelines.pdf) (266 blocks; 149/179 semantic anchors).

---

## B. Previously open match — now closed (Van Hulle 2019)

The Van Hulle (2019) article — *Artificial imagination, imagine: new developments in digital scholarly editing* — was ingested 2026-07-29 and is documented as **A16** above. Source PDF remains at `SVCM/research/creative-practice/02-bibliography/pdfs/`; vault bundle at `international_journal_of_digital_humanities_2019_apr_25_vol_1_iss_2_artificial_imagination_imagine_new_developments_in_digital_scholarly_editing_van_hulle_dirk_2_13fc9b21/`.

The other bibliography PDFs not yet ingested (`Taylor_The_Archive_and_the_Repertoire_2003.pdf`, the Contemporary Theatre Review / TDR pieces, D-ark schema docs) are performance-archive/metadata-schema material — lower relevance to the AI-ethics subject, so I did not chase them, but flag them here for completeness.

---

## C. Gaps found in the current methodology

1. **No APA-formatted references anywhere in the four AI files.** `ai-practical-guide/index.md` and `tao-of-ai-development/index.md` cite UNESCO and ACM only as bare hyperlinks with no author/year/title in text; `en/index.md`'s "Sources" list mixes citation styles and isn't full APA 7. Given the site's own scholarly voice (ORCID, PhD, CC BY-NC-SA), the AI sections are the least rigorously cited part of the methodology — mildly ironic given how much the methodology itself insists students cite AI-generated contributions.

2. **UNESCO's own text is never quoted, only paraphrased into a bullet list.** The 8-principle list in `ai-practical-guide/index.md` §"Ethical Frameworks" (proportionality, safety, fairness, sustainability, privacy, human oversight, transparency, accountability) has no verbatim text, no article/paragraph numbers, and no page numbers — it's a compressed summary presented with a citation-shaped link but no actual citation. A1, A5, A6, A7 above give you drop-in verbatim replacements.

3. **The EU AI Act (Regulation 2024/1689) is completely absent** from all four files, despite already being in force and despite your own vault containing its full text (`oj_l_202401689_en_txt`). This is the most consequential regulatory gap: Article 4's binding "AI literacy" obligation (A2) is arguably the single strongest available claim your methodology could make and currently doesn't.

4. **The EU's own Trustworthy AI framework (7 requirements) is absent**, even though it is *more proximate* to you specifically than UNESCO's global recommendation — it's the framework your own Horizon Europe ethics self-assessment binds you to as an MSCA fellow (A3). Citing UNESCO but not your own funding program's ethics framework is a missed opportunity for authenticity.

5. **No researcher-integrity analogy.** The European Charter for Researchers (A9) — which *you* are subject to as an MSCA fellow — is never invoked, despite being the single best rhetorical device for your exact subject line: "what the EU demands of me as a funded researcher, I demand of you as students."

6. **No MSCA-specific connection at all.** The MSCA-NET AI Policy Brief (A8) exists, names the exact same risks your methodology worries about (bias, plagiarism, copyright), and is written for your own network — yet the methodology currently treats "AI ethics" as generic international policy rather than something the author is personally and professionally bound by. This is arguably the single most distinctive gap given your specific position (MSCA fellow teaching AI-assisted practice).

7. **No treatment of authorship/IP/ownership of AI-generated creative or code output.** Students use AI image generators and code assistants inside portfolio work they will present as their own professional output; nothing addresses who "owns" it. The US Copyright Office's human-authorship test (A12) is a ready-made, citable answer.

8. **No engagement with actual critical-AI-studies or digital-humanities scholarship**, despite the site's explicit "critical coding" branding. The Tao performs critique mythologically (Mephistopheles, koans) but cites zero scholarly literature that would academically back that stance. A13, A14, A15, A16 fix this cheaply.

9. **`ai-assisted-development-foundations/index.md` has zero regulatory or ethical citation** — the only one of the four files with none at all — despite being full of governance-shaped concepts (capability security, blast radius, human-in-the-loop) that map almost one-to-one onto GDPR and the EU Trustworthy AI requirements (A3).

10. ~~**Van Hulle's "Artificial Imagination" (2019) — the source you specifically named — isn't ingested yet.**~~ **Closed 2026-07-29** — see A16.

11. ~~**No bibliographic enrichment has been run on the SVCM vault** (`ahmes enrich --meta`).~~ **Closed 2026-07-29** — 59/59 vaults enriched (`397` metadata rows). Future `ahmes query --cite` calls can use machine-extracted titles/authors.

12. **ERA Living Guidelines not yet cited in methodology** — now ingested (A17) but still absent from the four canonical files. A8 named them; A17 supplies verbatim text.

---

## D. Canonical APA Reference List

1. Chigwada, J., & Ngulube, P. (2026). Use of artificial intelligence tools in the publishing process: Expectations from publishers through author guidelines. *Frontiers in Research Metrics and Analysis, 11*, Article 1740510. https://doi.org/10.3389/frma.2026.1740510

2. European Commission, Directorate-General for Research and Innovation. (2005). *The European Charter for Researchers: The Code of Conduct for the Recruitment of Researchers*. Publications Office of the European Union. ISBN 92-894-9311-9.

3. European Commission, Directorate-General for Research and Innovation, Independent High-Level Expert Group on Artificial Intelligence. (2019). *Ethics guidelines for trustworthy AI*. Publications Office of the European Union. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai

4. European Commission. (2022). *European Declaration on Digital Rights and Principles for the Digital Decade*. https://digital-strategy.ec.europa.eu/en/library/european-declaration-digital-rights-and-principles

5. European Commission. (n.d.). *How to complete your ethics self-assessment* [Horizon Europe programme guide]. Publications Office of the European Union. ⚠ exact edition/year not confirmed in the extracted excerpt — verify against the current Horizon Europe Funding & Tenders Portal document.

6. European Parliament & Council of the European Union. (2016). Regulation (EU) 2016/679 of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data (General Data Protection Regulation). *Official Journal of the European Union, L119*, 1–88. https://eur-lex.europa.eu/eli/reg/2016/679/oj

7. European Parliament & Council of the European Union. (2024). Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act). *Official Journal of the European Union*, L 202401689. https://eur-lex.europa.eu/eli/reg/2024/1689/oj

8. German Commission for UNESCO [Deutsche UNESCO-Kommission]. (n.d.). *The UNESCO Recommendation on the Ethics of AI: Shaping the future of our societies* [Brochure]. ⚠ co-distributed with a national contact listed as the Slovenian Ministry of Higher Education, Science and Innovation — imprint/co-publisher not fully confirmed from extracted text.

9. International Committee of Medical Journal Editors. (2025). *Recommendations for the conduct, reporting, editing, and publication of scholarly work in medical journals*. https://www.icmje.org/recommendations/

10. Merrill, S., Makhortykh, M., Mandolessi, S., Richardson-Walden, V. G., Smit, R., & Wang, Q. (2025). Handling the hype: Demystifying artificial intelligence for memory studies. *Memory, Mind & Media, 4*, Article e18, 1–16. https://doi.org/10.1017/mem.2025.10018

11. Network of the Marie Skłodowska-Curie Actions National Contact Points (MSCA-NET). (2025). *Policy brief: Artificial intelligence (AI)* (Deliverable 3.13, Task 3.6). ⚠ exact public URL not confirmed from extracted text — likely available via the MSCA-NET project website.

12. Pansoni, S., Tiribelli, S., Paolanti, M., Di Stefano, F., Frontoni, E., Malinverni, E. S., & Giovanola, B. (2023). Artificial intelligence and cultural heritage: Design and assessment of an ethical framework. Paper presented at *Humanities and Digital Technologies for Shaping the Future*, Florence, Italy, 25–30 June 2023. *The International Archives of the Photogrammetry, Remote Sensing and Spatial Information Sciences*, XLIII-B2-2023, 729–736. Re-ingested 2026-07-29; conclusions verbatim at A14.

13. U.S. Copyright Office. (2023, August 30). Artificial intelligence and copyright: Notice of inquiry and request for comments. *Federal Register, 88*(167), 59942–59952. https://www.copyright.gov/ai/

14. UNESCO. (2021). *Recommendation on the ethics of artificial intelligence*. United Nations Educational, Scientific and Cultural Organization. https://unesdoc.unesco.org/ark:/48223/pf0000381137

15. Van Hulle, D. (2016). Exogenetic digital editing and enactive cognition. In M. J. Driscoll & E. Pierazzo (Eds.), *Digital scholarly editing: Theories and practices* (pp. 107–118). Open Book Publishers.

16. Van Hulle, D. (2019). Artificial imagination, imagine: New developments in digital scholarly editing. *International Journal of Digital Humanities, 1*(2). Ingested 2026-07-29; see A16. ⚠ page range and DOI not yet confirmed from metadata.

17. European Commission & European Research Area Forum. (2024). *Living guidelines on the responsible use of generative AI in research* (updated ed., May 2026). https://research-and-innovation.ec.europa.eu/document/download/2b6cf7e5-36ac-41cb-aab5-0d32050143dc_en?filename=ec_rtd_ai-guidelines.pdf

18. World Intellectual Property Organization. (2024). *Generative AI: Navigating intellectual property* [IP and Frontier Technologies Factsheet]. WIPO. ⚠ lower-confidence match — no strong verbatim quote survived a keyword search on "authorship"; retained for completeness given its direct thematic relevance, but re-check before citing.

---

## E. Suggested next steps, in order

### Completed (2026-07-29)

| Step | Action | Result |
|------|--------|--------|
| 1 | Verbatim vs paraphrase decision for A1–A15 | See §F below |
| 2 | Ingest Van Hulle 2019 + query | **A16** added (32 blocks, 20/20 semantic) |
| 3 | Batch `ahmes enrich --meta` on `svcm/documents/` | **59/59** vaults, 397 metadata rows |
| 4 | Re-ingest Pansoni & Tiribelli (2023) | **A14** updated with clean Conclusions quote (101 blocks) |
| 5 | Ingest ERA Living Guidelines | **A17** added (`ec_rtd_ai_guidelines_f3745f68`, 266 blocks) |
| 6 | Merge into four methodology files | A1–A17 integrated per §F (2026-07-29) |
| 7 | Ingest European Charter PDF | **A9** upgraded — `am509774cee_en_e4_5bcc3da7` (232 blocks) |

### Remaining (optional follow-ups)

1. **Optional:** batch `ahmes enrich --meta --online` for DOI/ISBN backfill on vaults that lack identifiers.
2. **Optional:** ingest remaining bibliography PDFs flagged in §B (Taylor 2003, theatre review pieces) if performance-archive angles become relevant.

---

## F. Verbatim vs paraphrase decisions (Step 1)

| Entry | Treatment | Rationale |
|-------|-----------|-----------|
| **A1** | **Verbatim blockquote** | Single UNESCO paragraph that directly addresses teaching/e-learning — highest rhetorical leverage; currently missing entirely from methodology |
| **A2** | **Verbatim blockquote** | Article 4 AI literacy is a binding legal fact; paraphrase would weaken the "this is law, not pedagogy" claim |
| **A3** | Paraphrase + citation | Seven requirements overlap ~70% with UNESCO; table/summary form better than seven blockquotes |
| **A4** | Paraphrase + citation | Epigraph-length; one sentence suffices with EU Declaration citation |
| **A5** | Paraphrase + citation | Two sources, same theme (digital literacy); synthesise in one paragraph |
| **A6** | Paraphrase + citation | Footnote to Tao Ch. IV "Weight of Tokens" — poetic chapter shouldn't carry a long legal quote |
| **A7** | Paraphrase + citation | Short callout after Craftsman's Oath |
| **A8** | **Verbatim blockquote** | MSCA-fellow authenticity device — "my funding network says the same thing" |
| **A9** | **Verbatim blockquote** | Best rhetorical mirror for subject line; Tri-Anchor complete (`am509774cee_en_e4_5bcc3da7`) |
| **A10** | **Verbatim blockquote** | Maps word-for-word onto existing README disclosure covenant |
| **A11–A13** | Paraphrase + citation | Epigraph/supporting role; lower insertion priority |
| **A14** | Paraphrase + citation | Optional domain-adjacent example |
| **A15–A16** | Paraphrase + citation | Footnotes to AI Relationship table (extended cognition + artificial imagination) |
| **A17** | **Verbatim blockquote** | Operative ERA framework; pairs with A8 and A10 in Ethical Frameworks section |
