# DRAFT — unapproved proposal for the FE methodology page

> **Status: DRAFT, NOT PUBLISHED, NOT APPROVED.** This file lives in
> `frontend-pedagogy/` (the non-published pedagogy side of this repo) on
> purpose — per `~/src/profield/.cursor/skills/curriculum-publication-head/SKILL.md`
> rule 5, student-facing prose is never published automatically; it requires
> the content owner's (Rubén's) explicit approval. **Do not copy this text
> into `web-foundations/docs/methodology/en/index.md` without that
> approval.**
>
> **Target file:** `web-foundations/docs/methodology/en/index.md`
> **Proposed insertion point:** immediately after the existing "Whose better
> living?" subsection (the paragraph ending "...that is what _critical_
> means.", followed by the current `**Sources**` line), before the
> `---` horizontal rule that opens "## Introduction and Rationale".
>
> **Why there:** that subsection already carries the doc's grounding for two
> of the five diagnostic lenses this proposal names (Material/Planetary via
> the UNESCO energy passage; Democratic/Equity via the accessibility
> literature) — this draft extends the same register rather than opening a
> disconnected new section, and keeps the file's existing "Sources" citation
> convention.

---

## Diff-style summary of what would change

- **No existing text is removed or altered.**
- **One new subsection is added**, titled `### Where this is taught, not just stated` (H3, nested under the existing "🎭 Critical Coding Approach" H2 the "Whose better living?" subsection already belongs to).
- **One new `**Sources**` line is added** at the end of the new subsection, following the exact citation-listing convention the existing "Whose better living?" subsection already uses (named, dated, `(Author Year)` inline, full list at the end).
- Net addition: ~350 words, 6 new citations, 0 deletions.

---

## Proposed new subsection (verbatim text, pending approval)

### Where this is taught, not just stated

*Critical Coding for a Better Living* is not one week's topic. Two research
lineages ground how this course treats any technology it teaches or
requires students to use — a classical strand asking who holds access to
technical authority in a classroom (Postman & Weingartner), and a
contemporary strand treating algorithmic systems as political subjects
rather than neutral instructional assistants (Postman's *Technopoly*). Five
questions follow from the second strand for any tool a unit puts in a
student's hands: who owns the infrastructure and profits from it; what
counts as valid knowledge inside the tool; what the tool's physical supply
chain costs; how the interface shapes attention and habit; and who bears
the risk when the tool is wrong.

These questions are not answered once, in a preamble. They surface where
the unit's own technical content already implies them:

- **The AI code-review unit** (FE II, Unit 6) is already standing on the
  question of habit formation — does an AI reviewer's suggestion train a
  student's judgement, or replace it before it forms? Norman's account of
  *affordances* — "the relationship between the properties of an object and
  the capabilities of the agent that determine just how the object could
  possibly be used" (Norman 2013, 30) — names precisely the gap between
  what a review tool *permits* and what it *affords*; Tenner's *revenge
  effects* name what happens when an AI-suggested "fix" relocates a bug or
  a debugging burden rather than removing it (Tenner 1997, 8) — the
  ACCEPT/REJECT discipline this unit already requires exists to keep that
  relocation visible rather than silent.
- **Performance and bundle-weight units** are already standing on a
  material question this page states elsewhere in normative terms (UNESCO,
  above) — and on a design question this page has not yet stated: Norman's
  later research on emotional design records that "when people are anxious
  they tend to narrow their thought processes" (Norman 2004, 32) — a slow
  page under load is not only an energy and access cost, it measurably
  narrows what a stressed user can still think about, which is a cognitive
  cost this course also has a duty to name.
- **Any unit that has a student embed a third-party script, SDK, or share
  widget** puts a real authorship decision in that student's hands, not an
  abstract one: Orrange's distinction between operating as a *platform*
  and operating as a *publisher* — built around exactly this kind of
  embedded infrastructure — makes the point that whoever writes the
  embedding line has made an infrastructural choice, whether or not they
  meant to (Orrange 2020, 42).

**Where the evidence stands, stated plainly, as elsewhere on this page.**
The sources above are grounded — `evaluator_safe` in this course's own
research vault. The domain-specific question — *does teaching this lens
inside a front-end course, specifically, change what students build* — is
still an open research question for this course's own corpus: of the 17
sources gathered for its critical-pedagogy strand, 9 currently resolve to
a citable standard and 8 remain flagged pending further bibliographic
verification, including two claims currently in active dispute over which
paper a matched DOI actually names. Where a unit draws on one of those
still-open sources, the lesson says so rather than presenting the claim as
settled.

**Sources** (in addition to those already cited above on this page):
Norman, D. A. (2013), *The Design of Everyday Things* (Revised and
Expanded Edition), Basic Books · Norman, D. A. (2004), *Emotional Design:
Why We Love (or Hate) Everyday Things*, Basic Books · Postman, N. &
Weingartner, C. (2009 reissue; orig. 1969), *Teaching as a Subversive
Activity* · Postman, N. (1992), *Technopoly: The Surrender of Culture to
Technology* · Tenner, E. (1997 Vintage ed.; orig. 1996), *Why Things Bite
Back: Technology and the Revenge of Unintended Consequences* · Orrange,
R. M. (2020), *The Corporate State: Technopoly, Privatization and
Corporate Predation*, Routledge.

---

## Grounding ledger for this draft (Ahmes node + page + evaluator_safe)

Every quoted claim above was resolved directly against its `extraction.db`
this session, not from memory:

| Claim | Coat | Node | Page | `evaluator_safe` |
| --- | --- | --- | --- | --- |
| Affordances definition | `norman_donald_a_the_design_of_everyday_things_..._f31e7737` | `7eed103c-d32d-59a3-bdc4-fb4160536332` | 30 | yes (method=human, confidence=1.0) |
| Anxiety narrows thought | `norman_donald_a_emotional_design_..._f70b91b4` | `3ca6136c-a219-5950-a676-61b2a5cddaac` | 31 (cited as p.32 by `ahmes query --cite`) | yes (confidence=1.00) |
| Postman & Weingartner, schools passage | `teaching_as_a_subversive_activity_..._3f62f602` | `de5449a8-d7d1-579b-ab6a-34245a83629f` | 8 | yes (confidence 0.95) |
| Technopoly definition | `postman_neil_technopoly_..._01694c02` | `48ba02e5-d5a8-5111-9057-24976db87122` | 13 | yes (method=human, confidence=1.0) |
| Revenge effects definition | `edward_tenner_why_things_bite_back_..._87011c30` | `988b6c55-0184-5472-8962-4b3931030469` | 8 | yes (method=human, confidence=1.0) |
| Platform vs. publisher | `robert_m_orrange_the_corporate_state_..._14fcf2a0` | `c124e980-dbf9-5c5f-a8b8-65f62e32ac70` | 41 (cited as p.42) | yes (confidence=1.00) |

The "9 of 17, 8 pending, two disputed" sentence is drawn directly from
`~/src/profield/runs/frontend-pedagogy/03-temario-critica/reports/pipeline-report.md`
("Evaluator-safe coats: 9/17… Bibliographic gaps retained: 8/17") and
`digest.json`'s `counts` block (`disputed: 2`) — not asserted from memory.

## What this draft does NOT do

- It does not touch the existing accessibility/energy paragraph's own
  citations (Fisseler, Correa et al., Batista & Baluz, UNESCO) — those
  stand as published.
- It does not claim the FE C-strand corpus is fully grounded — it states
  the 9/17 figure honestly, in the same register the existing page already
  uses for its own accessibility evidence ("stated plainly").
- It does not publish itself. It is a proposal for Rubén to review, edit,
  reject, or approve before any copy moves into `docs/methodology/`.
