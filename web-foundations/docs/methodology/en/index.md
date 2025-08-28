# Practice-Oriented Web Design Education Through Incremental Projects

## Introduction and Rationale

Teaching web design and front-end development at the university level requires balancing theory and practice. A **project-based learning** approach can engage students with real-world, meaningful tasks and provide a more realistic, professional experience than lecture-only formats. By structuring the course around an incremental project – where each class builds on a single web project – students remain motivated and see the direct application of concepts. This approach aligns with active learning principles: students actively solve problems and integrate topics from various domains, which fosters autonomy and deeper understanding. It also addresses common challenges in technical courses. Traditional methods often present abstract concepts without context, leaving students anxious and convinced that “how to apply things” is unteachable or only for “geniuses”. In contrast, an incremental, practice-oriented methodology grounds each concept in the evolving project, demystifying abstract ideas and reducing the intimidation factor.

**One student, one repository, one project** – this motto captures our methodology. Each student works on a personal web project throughout the semester, using a private Git repository to track progress. Every week (roughly a 2-hour class session), the student learns new concepts, practices them in a guided exercise, and then completes a small practical assignment. By the end of the class, they commit their work to the repository with clear documentation of what was done. Over the term, these commits form a narrative of the project’s growth, resulting in a fully functional, responsive, accessible, and interactive website in their portfolio. This iterative build-up serves multiple purposes: it reinforces continuous learning, produces a tangible portfolio piece, and inherently documents the learning process for both students and instructors.

## Class Structure: Theory, Guided Practice, and Commits

Each class session is structured into three blocks to maximize learning by doing:

* **Brief Theoretical Introduction:** The instructor introduces a new concept or technique (e.g. a CSS layout method, a UI design principle, an accessibility guideline) in a concise lecture. This provides just enough theory to contextualize the day’s work without overwhelming students.
* **Guided Practical Exercise:** Students immediately apply the concept in a live-coding session or hands-on tutorial. The instructor walks through an example (such as implementing a responsive navigation bar or using a design system component), and students follow along, ask questions, and tweak the example. This guided practice bridges theory and independent work, building student confidence.
* **Independent Exercise and Commit:** At the end of the session, students work on a short assignment extending or applying the concept to their own project. This could be creating a new page section, improving usability, or adding an interactive feature related to that week’s topic. By the class’s end, **each student makes a Git commit** in their repository, pushing the updates. The commit message must briefly document what was achieved (e.g. “Added responsive gallery with grid layout and ARIA labels”). This ritual encourages students to reflect on their work and practice professional version-control habits.

Under this model, each week’s lesson is akin to a “sprint” in agile terminology – a short development cycle yielding a concrete increment of the project. By the next week, students have a new piece of a website to show for their effort. Over time, these increments accumulate into a complete project. This design mirrors how real-world software is built iteratively, which helps students **get acclimated to professional workflows** early. The regular cadence of sprints (with weekly deadlines) provides a drumbeat for progress, ensuring the project moves forward steadily rather than via last-minute cramming. It also makes the learning process less overwhelming by dividing it into manageable chunks.

## Updated Week‑by‑Week Teaching Schedule (First Five Weeks)

| Week  | Focus                                       | Git / Repo Task                                                                                   |
| ----- | ------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **1** | **Setup – VS Code, Git, GitHub**            | Create personal repo from the template, add & push `README.md` with student handle.               |
| **2** | **Project Definition Workshop**             | Commit `project‑brief.md` **and** start `project.yaml` (metadata).                                |
| **3** | **Styling – Typography & Colour**           | Implement brand identity in HTML/CSS; commit first design assets.                                 |
| **4** | **Publishing & Metadata Submission**        | Enable GitHub Pages; submit PR to `/2025‑fall/students.yaml` _or_ push validated `project.yaml`.  |
| **5** | **Design‑Trend Analysis & Showroom Launch** | Peer‑review session; CI script builds course showroom from `students.yaml` and live project URLs. |

> After Week 5 the course resumes the previously described sprint rhythm (accessibility, interaction, testing, etc.).

## Incremental Portfolio Development and Its Benefits

Building a single project incrementally offers several educational benefits. First, it **integrates knowledge continuously**: instead of learning topics in isolation, students immediately see how each new concept enhances their project. For example, a lesson on responsive design isn’t just theory – it results in the student actually making their project mobile-friendly that week. This contextual application reinforces why each concept matters, countering the tendency to view foundational topics as irrelevant or purely academic.

Second, the approach results in a **personal portfolio piece** for every student. By semester’s end, each student has a fully realized website they can demonstrate – one that they’ve built from scratch, step by step. This is valuable for their learning and career development; students perceive the project repository as a showcase of their work and skills. It also promotes a sense of ownership and pride in their work, which can be more motivating than a series of disconnected assignments.

Third, the **commit-after-each-class discipline** teaches good development habits. Students learn to document their progress and write meaningful commit messages, a practice that improves coding mindfulness and communication. The commit log effectively becomes a learning journal. Instructors can review this log to understand each student’s journey – seeing how they approached tasks and overcame challenges. Research in software education has noted the value of such version-control data; a centralized repository per student allows instructors to monitor progress, assess contributions, and even derive metrics of engagement or problem-solving approaches from commit histories. For instance, consistent weekly commits demonstrate steady effort, while irregular activity might flag a student who needs additional support.

Importantly, incremental development addresses the need for **frequent feedback and adjustment**. Because students produce work every week, instructors have regular checkpoints to intervene if misconceptions arise. This aligns with the idea that learning to code “is much like learning to write: \[students] need to understand the intention, receive detailed feedback, rewrite and receive more feedback”. The weekly cycle ensures that misunderstandings or bad practices don’t persist for long before correction. In a traditional course with only a midterm and final project, a student might go down the wrong path for weeks; here, the smaller cycles encourage continuous improvement.

Finally, the stage-by-stage project is **evaluable by stages**. Instead of one high-stakes final submission, the project is assessed in parts (formative assessment each week, possibly) and as a whole (summative assessment at the end). This staged evaluation can reduce student anxiety and provide a clearer picture of their development. It also discourages procrastination and academic dishonesty – a student would find it harder to plagiarize or cheat an entire multi-week project, especially since the commit log would reveal sudden unexplained progress. In fact, using a version-control approach with individual repos can help **mitigate cheating**: irregular or last-minute massive code additions stand out in the logs, and some studies have proposed analyzing commit patterns to detect anomalies and ensure academic integrity.

## Git  Summary


| Purpose                        | Repo                    | Method                                   |
| ------------------------------ | ----------------------- | ---------------------------------------- |
| Canonical lessons              | `web-foundations`       | Written in `docs/lessons/` as HTML or MD |
| Course-specific lesson plan    | `web-design`            | Redirector HTML files (`meta refresh`)   |
| Shared methodology & templates | `web-foundations/docs/` | Referenced by URL or included if needed  |
| Student projects               | Individual repos        | Cloned from template                     |
| Class schedule & index         | `web-design/2025-fall/` | YAML, HTML, or MD files                  |

---


## Managing Scale: Feasibility with 120+ Students

One practical concern is whether a commit-per-class model is sustainable for an instructor with large cohorts (e.g. 120 students each semester). Reviewing dozens of commits each week is non-trivial. However, there are strategies and tools to make this feasible:

* **GitHub Classroom & Automation:** We employ GitHub Classroom (or a similar platform) to manage student repositories. This tool automates repository setup and provides a dashboard for all student repos. Instructors can quickly see each student’s commit history in one place. Moreover, integration with continuous integration (CI) systems can provide automated feedback. For example, North Carolina State University ties a Jenkins CI server to student GitHub repos to run tests and provide immediate feedback on each commit. Such automation reduces manual grading load by catching common errors or verifying requirements automatically (e.g. checking if the HTML is valid or the site is deployed correctly to GitHub Pages).
* **Commit Triage with Metrics:** Instead of reading every line of code in every commit, the instructor can **triage** commits. By looking at commit messages and using commit statistics (diff sizes, test results), one can identify which submissions might need attention. If a commit message is unclear or the diff is huge (possibly indicating a big last-minute code dump), that repo can be flagged for closer review. Research suggests defining metrics from the repository’s activity log to support assessment – for instance, number of commits, consistency, test pass rates, etc.. These metrics can guide the instructor’s focus to outliers or struggling students.
* **Peer Review and Discussion:** To leverage the large class size as a resource rather than a burden, we incorporate peer involvement. Students can be grouped into small “peer review teams” that periodically look at each other’s work. For example, every two weeks, peers clone a teammate’s repo, try out the site, and give feedback or report issues (possibly via GitHub Issues or a class discussion forum). This not only distributes the feedback load but also fosters a collaborative learning community. It transforms the solo-project model into a shared experience where students learn from each other. (The instructor, of course, oversees this process and steps in as needed, but not all feedback relies solely on the teacher’s time.)
* **Teaching Assistant and AI Agents:** If available, teaching assistants can help review commits in rotation. Additionally, one forward-looking idea is to use AI agents to assist in reviewing commits. With advances in natural language processing and code analysis, an AI could potentially analyze each commit’s code and message, and generate a brief report or even preliminary comments. For instance, an AI bot could flag accessibility issues in a commit or suggest improvements to a naming convention. While this is experimental, it’s an intriguing possibility given the rise of AI coding assistants. At minimum, encouraging students to use tools like **GitHub Copilot** (available through GitHub’s student developer pack) can help them get instant suggestions as they code – though we must ensure this is used for learning, not as a cheating shortcut (more on that later).

Using these strategies, the one-commit-per-week per student model becomes much more viable. In fact, similar large-scale implementations of project-based courses report positive outcomes. In a program employing incremental project-based learning for hundreds of students, faculty noted that centralizing work in repositories allowed them to **showcase best projects and monitor all teams** efficiently. At our scale (120 students), with proper tooling and support, reviewing weekly commits is manageable – especially since not every commit demands in-depth critique. The focus can be on identifying patterns: who is falling behind, who might be copying code, and who produces exemplary work that could be highlighted.

## Agile Sprints in the Classroom

We borrow terminology from agile methodologies (like “sprints”) to frame each lesson’s work cycle. This alignment with professional practices is intentional: it acculturates students to the iterative rhythm common in industry projects. Each class sprint starts with a “planning” (the introduction of new tasks/concepts), moves through “execution” (guided and independent practice), and ends with a “review” (the commit and possibly a quick show-and-tell or recap). The next class effectively acts as the next sprint, possibly beginning with a brief retrospective (e.g. discussing challenges from last week’s task). Over the semester, students experience a simplified Scrum-like process on an individual scale.

Adopting agile principles in education has documented benefits. Students often **value working with agile frameworks** (like eduScrum) on real projects; it gives them practical experience and shifts the instructor’s role more toward a coach or facilitator. The time-boxed nature of sprints can prevent students from gold-plating or procrastinating, as they have to deliver something functional each week. It also trains them in time management and scoping – skills that are crucial in professional environments.

However, we also **adapt and critique agile practices** to suit an educational context. One must remember that students are in a learning process, not a product delivery environment. For example, in industry agile, not delivering a feature by the end of a sprint is considered a failure of planning, but in a class, it might simply indicate a topic that needs more time to master. We therefore use the sprint structure flexibly: if many students struggle with a concept, the “next sprint” might include additional review or a smaller scope. In other words, we welcome changing requirements – in this case, adjusting to student learning needs – just as the Agile Manifesto suggests responding to change in projects.

We also acknowledge that **design and creative work** sometimes need breathing room beyond strict sprint cycles. In professional Agile teams, one critique (especially from designers) is that the rush of continuous sprints can *“reduce the designer’s autonomy and creativity, leading to stress and lack of fulfillment”*. Rigidly forcing all design ideation, coding, and testing into a one-week cycle can result in shallow work or technical debt, as one industry anecdote vividly described: *“Design was rushed and ill-conceived as a result of time pressure; development was equally rushed... Each Sprint \[ended up] trying to fix the mess from the Sprint before”*. We share such insights with students to critically examine agile methods. Thus, while we emulate sprints for structure, we also **encourage a critical perspective**: students discuss when a methodology like Scrum aids the creative process versus when it might hinder thoughtful design. This critical discourse is part of the course’s learning outcomes, tying into our broader aim of producing reflective practitioners, not just technically competent ones.

Each content module of the course roughly corresponds to a “sprint” deliverable. For example, a module on accessibility might culminate in an accessibility audit and improvements in that week’s commit; a module on UX patterns might end with a usability test report on the student’s site. By mapping content blocks to sprints, we ensure coverage of all key topics in a structured timeline. Yet we remain **conscious of the human aspect** – students’ well-being and creative satisfaction are prioritized over rigid adherence to process. If needed, we build in a buffer week (an “innovation sprint” or a catch-up sprint) where students can revisit and improve past work without new material, simulating the agile idea of an iteration dedicated to refactoring or exploration.

## Critical Reflections on Creativity, Well-Being, and Productivity

An important component of this course design is integrating **critical perspectives on the nature of creative work** in the web industry. We don't want to simply train students to be cogs in the tech industry; we want them to question and understand the context of their work. Throughout the course, we weave in discussions about the broader implications of design and development methodologies. This includes examining how market pressures and the drive for productivity (in “late-stage capitalist” tech environments) can impact personal well-being and creativity.

For instance, when introducing agile workflows, we pair it with a reading on the human side of Agile. Students reflect on arguments that in some companies, **performance metrics and rapid cycles might alienate workers from the creative joy of design**. We discuss Marx’s concept of alienation in the context of design jobs – how designers can feel disconnected from the outcomes of their labor when speed and output are over-emphasized. The goal here is not to reject industry practices wholesale, but to cultivate a nuanced mindset: students learn *how* to work in sprints, but also *when* to step back and ensure the work aligns with human-centered values and ethical considerations.

Topics like **ethics in UX/UI, sustainable design, and inclusive design** are thus framed not only as technical or aesthetic topics, but as socio-cultural ones. For example, as students work on making their projects accessible, we delve into why accessibility is a human right and how technology can marginalize people when profit is the only motive. We examine case studies of design decisions driven by profit vs. those driven by social good, and how the resulting user experiences differ. These conversations allow students (and faculty colleagues) to see the course as not just skills training, but also an exploration of the designer’s role in society.

In terms of course mechanics, this critical angle might manifest as a **dedicated seminar-style session** or an online forum where students post short reflections relating course practices to concepts like digital well-being, the attention economy, or open-source collaboration as an alternative to proprietary development. By including a self-contained module on critical perspectives, we signal to both students and fellow educators that productivity and agile efficiency are not the sole aims; creative education should also foster critical thinking about why we create, who benefits, and how to balance innovation with well-being. This critical module is brief yet impactful, helping contextualize the otherwise practice-heavy curriculum in a framework of humane and ethical consideration.

## Encouraging Collaboration and Overcoming Barriers

While each student works on an individual project (to ensure everyone tangibly learns the skills), we intentionally cultivate a **community of collaboration** within the class. Learning to design and code is often a team sport in industry, and peer learning can greatly enhance understanding. To this end, we implement several strategies:

* **Studio Culture and Peer Critique:** We borrow from design studio pedagogy by having periodic pin-up sessions or code walkthroughs. Students volunteer or are selected to show their current project status to the class, discussing their design choices and challenges. Peers and the instructor provide constructive feedback. This not only gives students fresh perspectives on their work but also normalizes the practice of receiving and acting on critique – a crucial skill in UX/UI work.
* **Pair Programming & Design Jams:** In some classes, especially when introducing a tricky technical concept or new tool, we have students pair up. For instance, when learning a command-line tool or a CSS framework, two students can work together on one machine/repo for that class’s task. Pair programming has been shown to improve confidence and skill transfer among students, as the “driver” and “navigator” can help each other think through problems. We occasionally mix design-major students with more code-savvy students in pairs so they can learn from each other, fostering mentorship dynamics.
* **Online Collaboration Tools:** We utilize discussion boards (or Slack/Teams channels) where students can ask questions outside of class and share resources. The instructor and TAs monitor these, but often students answer each other’s questions. For example, a student struggling with a Git merge conflict might post about it and another student who encountered the same issue can chime in with a solution. Creating this space reduces the fear of asking “stupid questions” and builds a supportive learning community. It also scales the support system beyond what one instructor could do individually for 120 students.
* **Teacher-Student Engagement in Repos:** The instructor actively engages with student repositories. This can be through lightweight interactions like “starring” a well-done commit or leaving a comment on a commit or issue. Even if not every commit gets comments (which would be impractical at scale), a rotating focus where each week the instructor deep-dives into a subset of student repos keeps everyone on their toes (knowing their work might be reviewed) and gives each student detailed feedback at least a few times in the semester. In effect, the instructor acts like a project lead or senior code reviewer for the class, modeling the collaborative relationship seen in real dev teams.

These collaborative practices also help diminish the **“panic to code” barrier**, especially for students coming from pure design backgrounds. Often, such students feel isolated in their struggle with technical tasks. Seeing peers grapple with and overcome similar issues reassures them that difficulty is a normal part of learning, not a personal failing. It shifts the culture from competitive to cooperative.

Regarding the **fear of coding and command-line tools** (e.g. using Git or npm), we take a gradual and design-friendly approach. Early in the course, we provide user-friendly tools and UI alternatives: for instance, using Visual Studio Code with a Git extension or GitHub Desktop, so that students can commit and push with buttons rather than commands. We emphasize conceptual understanding (what a commit is, what version control does) over memorizing command syntax. As the semester progresses, we gently introduce the terminal for those interested, but always alongside GUI options. The idea is to show that the **command-line is just another tool** – powerful, but not the only pathway. Over time, as students gain confidence from successfully building parts of their project, their intimidation with coding decreases naturally. The continuous project growth is itself a confidence booster: a student can look back at week 1 versus week 8 and tangibly see their progress in the repository, which builds a growth mindset.

We also openly address the “tendency to rely on templates” issue. Many design students, when afraid to code from scratch, seek out templates or snippets to copy-paste. In our methodology, using external resources is not banned (since in real work, developers do rely on libraries and examples), but we require attribution and understanding. If a student incorporated a template for, say, a carousel, they must note it in their commit or project journal and be able to explain in class how it works and how they modified it. This policy turns template-usage into a learning opportunity rather than a shortcut. It also dovetails with the topic of **AI assistance** – if a student used an AI tool to generate code, we encourage them to treat it like any other tool: helpful for ideas or boilerplate, but something to review critically. By having them document such uses, we remove the stigma (reducing secret cheating) and instead discuss pros and cons openly.

## Integrating AI as an Aid, Not a Shortcut

Given the rise of generative AI, an important modern consideration is how to incorporate AI tools into the web design curriculum. Students today have access to systems like ChatGPT and GitHub Copilot which can produce code snippets or design suggestions. Completely banning these would be counterproductive – these tools are becoming part of professional workflows – but uncritical use can undermine learning. Our approach is to **integrate AI as a learning aid while maintaining academic integrity**.

We inform students that they may use AI-based assistants for inspiration, debugging, or to get hints when stuck, much as they would use Google or Stack Overflow. However, they must **cite or acknowledge significant AI-generated contributions** in their commit documentation. For example, a commit message might state, “Used ChatGPT to help refactor the form validation script, then tested and adjusted the output.” This transparency ensures that both the student and instructor are aware of how AI was used. It opens up a dialog about the quality of AI suggestions and the importance of the student’s own critical thinking in accepting or rejecting them.

To keep the focus on learning, we design assignments that are less about arriving at a trivial solution (which an AI could easily provide) and more about the process or customization. Since each student’s project is unique in content and style, an AI might assist with generic code (e.g. a function to filter an array), but the student still has to integrate it into their specific context. This mitigates the scenario of students handing in boilerplate AI-generated websites with no personal touch.

We also highlight the professional reality: AI is a tool that developers use, but over-reliance can lead to skill atrophy. Students read or discuss short pieces on this topic – for instance, the observation that **“college is \[becoming] just how well I can use ChatGPT at this point,”** as one student quipped, noting how common it is for peers to use AI to *“sail through... coding and debugging assignments”*. By acknowledging this trend, we can candidly talk about the ethical and practical implications. Is using AI to do one’s homework fundamentally different from past generations copying code from the internet? How can we ensure our use of AI is augmenting our learning rather than bypassing it?

On the instructor’s side, we remain vigilant for AI misuse. The commit history is again a valuable tool – if a student suddenly commits a large chunk of sophisticated code that they cannot explain, it raises red flags. We might schedule a short viva (oral check-in) for that student to walk through their thought process. The Moodle-based exam at semester’s end also acts as a safeguard: the exam asks students to explain how key concepts from the course manifest in their own project. For instance, a question might be, “In your project repository, identify an example of progressive enhancement and describe how it improves accessibility.” A student who cheated through the project with AI or templates would struggle on such questions, whereas a student who engaged with their work can answer confidently. In this way, the **final exam’s reflective application of concepts to the student’s project** helps ensure that students truly learned from the practice, AI or not.

## Assessment Strategy: Continuous and Final Evaluation

Our assessment strategy is designed to evaluate not just the final product but the learning process throughout the course. It combines **continuous assessment** (through the weekly commits and possibly mid-term milestones) with a **final assessment** (both the finished project and a written exam or presentation).

**Continuous Assessment:** Each week’s commit is checked for completeness and quality. Rather than assigning a heavy grade to every single commit, we use them formatively: students get credit for submitting their work and brief feedback on what to improve. For instance, a student might get a quick note in their repo like, “Good job implementing flexbox for layout. Note that the navigation isn’t keyboard-accessible yet – consider that for next time.” These small feedback loops guide students before the next class. Some weeks, we might have a more formal checkpoint (e.g. end of a larger module) where we grade that portion of the project with a rubric – evaluating criteria such as code quality, design aesthetics, responsiveness, etc. The fact that the project is cumulative means each checkpoint builds on the previous, so earlier feedback can be acted on continuously.

**Final Project Evaluation:** At the end of the term, each student’s repository contains the full project and its history. The final website is deployed (we use GitHub Pages or a similar service, so every project is live for demonstration). We grade the final product on a comprehensive rubric: visual design, user experience, code quality, responsiveness, accessibility compliance, creativity, and completeness of requirements. But unlike a black-box final submission, the commit log and documentation are also reviewed to inform grading. Did the student consistently contribute? Does the history show growth and iteration (a positive sign) or does it all appear in one last push (indicating possible last-minute work or external help)? This **process transparency** can be factored into grades or at least used to provide qualitative feedback. It also helps in identifying any academic integrity issues – e.g., if a student’s project suddenly included a library or code that was never discussed, we can inquire about it.

**Reflective Exam (Moodle-based):** We conduct a written exam on our Moodle platform focusing on conceptual understanding. However, instead of abstract questions, many are tailored to the student’s own project experience. As mentioned, students might be asked to analyze their project: “Which lesson’s content did you find most challenging to apply in your project, and how did you overcome it? Provide an example from your code.” or “Describe how the principle of progressive enhancement is demonstrated in your project’s codebase (give file and line references).” By tying exam questions to their personal work, we ensure they can’t prepare generic answers without having engaged in their project. It also encourages them to review their whole semester’s work and consolidate their learning. The exam serves as a reflective exercise, prompting them to articulate the *why* and *how* of the techniques they used, solidifying their knowledge.

**Final Review and Feedback:** After the final evaluation, we dedicate a session to debrief. We showcase a few exemplary projects (with student permission) to celebrate good work – this is inspiring for the class and reinforces standards. We also discuss common pitfalls observed (for example, “Many projects had accessibility issues with color contrast – this is an area to watch in future”). Students are given an opportunity to self-assess and share feedback on the course structure. Notably, since this methodology is somewhat unconventional (commit-after-each-class is not typical in all courses), we gather student input on how it affected their learning and workload.

The results from similar approaches elsewhere are encouraging: for example, an incremental project-based model implemented over several years saw **failure rates drop by 50%, significant increases in student satisfaction, and improved average grades**. Our own iterative course design expects to yield likewise positive outcomes. The weekly sprint format should produce graduates who are not only skilled in web design and front-end coding, but also comfortable with modern workflows, capable of continuous learning, and mindful of the broader context of their work.

## Conclusion

In sum, this practice-oriented, class-by-class methodology for web design education integrates technical skill-building with professional practice and critical reflection. By structuring each lesson as a mini-project sprint (with theory, practice, and a commit), students progressively build a complete web project that serves as a portfolio artifact and learning scaffold. This approach encourages consistent engagement, provides immediate context for theoretical concepts, and mirrors real-world development processes. Through careful management (leveraging tools like GitHub Classroom, CI for feedback, and peer collaboration), the model scales to large classes, making it feasible for an instructor to handle 100+ individual projects without being overwhelmed.

Moreover, the methodology is not adopted uncritically – we blend agile techniques with an understanding of their limitations in creative education. Students are thus not only **trained in industry-standard practices** but also learn to question and adapt those practices for human-centric and creative outcomes. Issues of anxiety around coding and tools are addressed via community support, gradual skill ramp-up, and an ethos that frames coding as a design tool rather than an arcane art. The inclusion of discussions on well-being, ethics, and the political economy of design work ensures that our course speaks to the formation of designers who care about more than just pushing code – they care about the impact of that code on people and society.

By the end of the course, each student has a repository of commits telling the story of their learning journey, a deployed website showcasing their abilities, and a nuanced understanding of how disciplined practice and critical thinking combine to inform good web design. This methodology not only produces competent front-end designers and developers, but also self-reflective practitioners prepared for the collaborative, ever-evolving nature of the web industry. The hope is that our approach can serve as a model for other web design educators seeking to integrate practical skill development with deeper pedagogical goals, thereby aligning educational practice with both professional standards and academic inquiry.

**Sources:**

* Nelson, M. A., & Ponciano, L. (2021). *Experiences and insights from using GitHub Classroom to support Project-Based Courses*. *IEEE Global Engineering Education Conference.* (arXiv preprint)
* Vega, C., Jiménez, C., & Villalobos, J. (2012). *Implementing an Incremental Project-Based Learning Solution for CS1/CS2 Courses*. *Proc. of CSEDU 2012*. (Cupi2 Project)
* Bas Wallet (2025). *It’s not you: your UX design job is frustrating and unfulfilling – Marx’s concept of alienation applied to today’s design industry*. *UX Collective, Medium.*
* Colfelt, A. (2010). *Bringing User-Centered Design to the Agile Environment*. *Boxes and Arrows.*
* Ycombinator Discussion (2020). *GitHub Classroom* – comment by tsumnia on automated feedback with Jenkins.
* New York Magazine (2023). *Everyone Is Cheating Their Way Through College* – use of AI by students in assignments.
* EduScrum case study (2021). *Agile Methods in Higher Education: Adapting and Using eduScrum*.
* Nelson et al. (2021). *Github Classroom approach* – student feedback and metrics.

---

<!-- Appendix (verbatim patch) -->

# Practice‑Oriented Web Design Education Through Incremental Projects

> **This revision retains the full argumentation of the original article while integrating the newly‑agreed course schedule (Weeks 1–5) and the shared‑repository architecture outlined in our follow‑up discussion.**

---

## Introduction and Rationale

_(unchanged text)_

## Class Structure: Theory, Guided Practice, and Commits

_(unchanged text)_

## Updated Week‑by‑Week Teaching Schedule (First Five Weeks)

| Week  | Focus                                       | Git / Repo Task                                                                                   |
| ----- | ------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **1** | **Setup – VS Code, Git, GitHub**            | Create personal repo from the template, add & push `README.md` with student handle.               |
| **2** | **Project Definition Workshop**             | Commit `project‑brief.md` **and** start `project.yaml` (metadata).                                |
| **3** | **Styling – Typography & Colour**           | Implement brand identity in HTML/CSS; commit first design assets.                                 |
| **4** | **Publishing & Metadata Submission**        | Enable GitHub Pages; submit PR to `/2025‑fall/students.yaml` _or_ push validated `project.yaml`.  |
| **5** | **Design‑Trend Analysis & Showroom Launch** | Peer‑review session; CI script builds course showroom from `students.yaml` and live project URLs. |

> After Week 5 the course resumes the previously described sprint rhythm (accessibility, interaction, testing, etc.). All later weeks remain exactly as in the original article.

## Repository Architecture and Content Flow (New Section)

```
web‑foundations/          ← canonical repo (shared lessons, templates, pedagogy)
└── docs/
    ├── lessons/          ← single source of truth, rendered on GH Pages
    ├── methodology/
    └── templates/

web‑design/               ← course instance repo
└── 2025‑fall/
    ├── lessons/          ← HTML redirectors → web‑foundations/docs/lessons/
    ├── students.yaml     ← PRs land here in Week 4
    ├── examples/         ← course‑specific demos
    └── index.html        ← showroom generated Week 5

student‑project‑template/ ← bare starter each learner forks/clones
└── project.yaml          ← their metadata (same keys as students.yaml)
```

- **Lesson re‑use:** Each file in `web‑design/2025‑fall/lessons/` is a minimal HTML auto‑forwarder (meta‑refresh) pointing to the canonical lesson URL. No duplication, no symlinks.
- **Privacy:** `students.yaml` stores only anonymous handles, repo URL, live URL, emoji icon, and short abstract.
- **Automation:** A GitHub Action rebuilds the showroom when `students.yaml` changes; it also lints YAML and pings broken live links.

_(All other sections — Benefits, Agile Critique, AI Ethics, Assessment Strategy, Conclusion, and References — remain verbatim from the original article.)_

---

## Key Challenges & Mitigations

| Challenge                              | Why it happens                                 | Mitigation in this course                                                                                                                                            |
| -------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Open‑ended brief causes paralysis      | Too many options; weak abstraction skills      | Constrained domains + in‑class **Project Definition Workshop**; provide `project‑brief.md` template, moodboard time, and peer micro‑crit before committing (Week 2). |
| Fear of coding/CLI                     | Design‑first backgrounds; terminal anxiety     | **GUI‑first Git** (VS Code Source Control / GitHub Desktop) in Week 1; gradual CLI intro; weekly “Git tip”; pair programming on tricky weeks.                        |
| YAML/metadata errors                   | Indentation/syntax pitfalls; abstract thinking | Provide a **validated template** and an optional web form that **generates YAML**; CI YAML lint; exemplar `project.yaml` in the student template (Weeks 2–4).        |
| Irregular commit cadence               | Procrastination; time management               | “**Commit‑after‑class**” policy; CI reminder badges; lightweight dashboard of last‑push timestamps; gentle nudges in lab time.                                       |
| Over‑reliance on templates/AI          | Shortcut temptation                            | **Attribution & explanation** requirement; code walkthroughs; periodic 5‑minute viva; Moodle exam questions tied to each student’s repo history.                     |
| Accessibility deprioritized            | Visual polish eclipses usability               | Dedicated **a11y sprint** with automated checks (axe/Pa11y/Lighthouse); rubric points for keyboard nav, contrast, semantics.                                         |
| Sprint time pressure vs design quality | Creative work needs exploration                | Flexible scope; one **buffer/critique week**; encourage refactoring over feature creep; reflect on agile limits in creative contexts.                                |
| Tooling/setup friction                 | Diverse machines & configs                     | Full **Setup Week 1** with checklists; lab assistants/office hours; known‑good starter template; fallback instructions.                                              |
| Deployment failures                    | Pages config, build paths                      | Week 4 **GitHub Pages** walkthrough + CI link checks; documented fallback host; step‑by‑step troubleshooting guide.                                                  |
| Large‑cohort feedback load             | 120 students × weekly commits                  | Automate lint/a11y/link tests; **peer review** cycles; **rotating deep‑dives** by instructor/TA; rubricized comments.                                                |

## Necessary Side Knowledge (Tools & Concepts)

| Area                        | Minimum competency                                                                       | How/when we cover it                                        |
| --------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **VS Code**                 | Open folder, use Source Control, integrated terminal, extensions (Prettier, Live Server) | Week 1 setup; tips sprinkled weekly.                        |
| **Git & GitHub**            | clone/add/commit/push; read diffs; basic branching; open a PR                            | Week 1 (basics), Week 4 (PR); weekly “Git tip.”             |
| **GitHub Pages**            | Enable Pages; choose branch/folder; understand build timing                              | Week 4 publishing; CI status badge shown in showroom.       |
| **CLI basics**              | `pwd/ls/cd`; run `npm` scripts; read errors                                              | Week 1 optional CLI; reinforced when running linters/tests. |
| **Markdown**                | Write README, brief, issues; headings/lists/links                                        | Week 1 README; Week 2 project‑brief; ongoing in PRs.        |
| **YAML / JSON**             | Key‑value, lists, nesting; common lint rules                                             | Week 2–4 metadata; CI lint with clear error messages.       |
| **Browser DevTools**        | Inspect, responsive mode, Network, Lighthouse                                            | Week 3 styling; a11y/testing sprints later.                 |
| **Accessibility**           | Keyboard nav, alt text, landmarks/ARIA basics, contrast                                  | Dedicated a11y sprint (post‑Week 5); rubricized checks.     |
| **HTML/CSS**                | Semantic structure; box model; responsive layout (flex/grid); typography & color systems | Weeks 2–3 identity & layout; reinforced throughout.         |
| **JavaScript (light)**      | DOM selection, events; progressive enhancement mindset                                   | Introduced after Week 5; applied to interactions.           |
| **Linting/Formatting**      | Prettier; (ESLint if JS used)                                                            | Enabled in template; auto‑format on save from Week 1.       |
| **Assets & Performance**    | Image compression (Squoosh), SVG hygiene, basic perf budgeting                           | Ongoing; checklist before final submission.                 |
| **CI/CD basics**            | What a workflow is; reading job logs; fixing failing checks                              | Week 4 onward; students see Actions on showroom PRs.        |
| **Licensing & Attribution** | CC licenses; citing libraries/templates/AI assistance                                    | Stated in syllabus; required in README and commits.         |
| **Academic integrity & AI** | Disclosure norms; limits; reflective justification                                       | Policy in Week 1; enforced via viva + Moodle exam.          |

---

## Appendix: CI Automation for Course Showroom (GitHub Actions)

> Minimal, working setup to: (1) lint `students.yaml`, (2) build `index.html` showroom, (3) check links, (4) run basic accessibility scans. Designed to run on PRs and on pushes to `/2025-fall/`.

### 1) Workflow: `.github/workflows/showroom.yml`

```yaml
name: Course Showroom

on:
 push:
  paths:
   - '2025-fall/students.yaml'
   - 'scripts/**'
   - '.github/workflows/**'
 pull_request:
  paths:
   - '2025-fall/students.yaml'
   - 'scripts/**'
   - '.github/workflows/**'
 workflow_dispatch:

jobs:
 build:
  runs-on: ubuntu-latest
  steps:
   - name: Checkout
     uses: actions/checkout@v4

   - name: Setup Node
     uses: actions/setup-node@v4
     with:
      node-version: '20'

   - name: Install deps
     run: npm install

   - name: Lint YAML metadata
     run: npm run lint:yaml

   - name: Build showroom (index.html)
     run: npm run build:showroom

   - name: Check links
     run: npm run check:links

   - name: Prepare pa11y config from URLs
     run: node scripts/pa11y-config.mjs

   - name: Accessibility audit (pa11y-ci)
     run: npm run check:a11y

   - name: Auto-commit built index.html (push events only)
     if: github.event_name == 'push'
     uses: stefanzweifel/git-auto-commit-action@v5
     with:
      commit_message: 'chore(showroom): rebuild index.html'
      file_pattern: 2025-fall/index.html
```

### 2) `package.json`

```json
{
	"name": "course-automation",
	"private": true,
	"type": "module",
	"scripts": {
		"build:showroom": "node scripts/build-showroom.mjs",
		"lint:yaml": "node scripts/lint-yaml.mjs",
		"check:links": "node scripts/check-links.mjs",
		"check:a11y": "pa11y-ci"
	},
	"dependencies": {
		"js-yaml": "^4.1.0",
		"node-fetch": "^3.3.2",
		"pa11y-ci": "^3.1.0"
	}
}
```

### 3) `scripts/lint-yaml.mjs`

```js
import fs from 'node:fs';
import yaml from 'js-yaml';

const path = '2025-fall/students.yaml';
const text = fs.readFileSync(path, 'utf8');
let data;
try {
	data = yaml.load(text);
} catch (err) {
	console.error('YAML parse error in students.yaml:', err.message);
	process.exit(1);
}
if (!Array.isArray(data)) {
	console.error('students.yaml must be a YAML list (array)');
	process.exit(1);
}
const required = ['handle', 'project_title', 'repo', 'site'];
let ok = true;
for (const [i, item] of data.entries()) {
	for (const key of required) {
		if (!item[key]) {
			console.error(`Entry #${i} missing required key: ${key}`);
			ok = false;
		}
	}
}
if (!ok) process.exit(1);
console.log('students.yaml looks good ✔');
```

### 4) `scripts/build-showroom.mjs`

```js
import fs from 'node:fs';
import yaml from 'js-yaml';

const studentsPath = '2025-fall/students.yaml';
const outPath = '2025-fall/index.html';
const list = yaml.load(fs.readFileSync(studentsPath, 'utf8')) || [];

const card = (s) => `
  <article class="card">
    <h3>${s.emoji ?? '🌐'} ${s.project_title ?? '(Untitled)'}</h3>
    <p class="handle">@${s.handle}</p>
    <p class="abstract">${s.abstract ?? ''}</p>
    <p class="links">
      <a href="${s.site}" target="_blank" rel="noopener">Live</a>
      · <a href="${s.repo}" target="_blank" rel="noopener">Repo</a>
    </p>
  </article>`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>2025 Fall – Course Showroom</title>
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Helvetica,Arial,sans-serif;margin:0;padding:2rem;}
    header{max-width:960px;margin:0 auto 1.5rem;}
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem;max-width:1200px;margin:0 auto;}
    .card{border:1px solid #e5e7eb;border-radius:12px;padding:1rem;}
    .handle{opacity:.7;font-size:.9rem;margin:.25rem 0 .5rem}
    .links a{text-decoration:none}
  </style>
</head>
<body>
  <header>
    <h1>2025 Fall · Course Showroom</h1>
    <p>Public projects submitted by anonymous handles. No personal data stored.</p>
  </header>
  <section class="grid">
    ${list.map(card).join('
')}
  </section>
</body>
</html>`;

fs.mkdirSync('2025-fall', { recursive: true });
fs.writeFileSync(outPath, html);
console.log('Built', outPath);

// Also write a temp URL list for other checks
const urls = list.flatMap((s) => [s.site, s.repo]).filter(Boolean);
fs.mkdirSync('tmp', { recursive: true });
fs.writeFileSync('tmp/urls.txt', urls.join('
'));
```

### 5) `scripts/check-links.mjs`

```js
import fs from 'node:fs';
import fetch from 'node-fetch';

const urls = fs.readFileSync('tmp/urls.txt', 'utf8').split(/
?
/).filter(Boolean);

let failed = false;
const headOrGet = async (url) => {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (res.status >= 400 || res.status === 405) {
      const res2 = await fetch(url, { method: 'GET' });
      return res2.status;
    }
    return res.status;
  } catch (e) {
    return 599; // network error pseudo-code
  }
};

const run = async () => {
  for (const url of urls) {
    const status = await headOrGet(url);
    const ok = status > 0 && status < 400;
    console.log(`${ok ? '✔' : '✖'} ${status} ${url}`);
    if (!ok) failed = true;
  }
  if (failed) process.exit(1);
};

run();
```

### 6) `scripts/pa11y-config.mjs`

```js
import fs from 'node:fs';

const urls = fs.readFileSync('tmp/urls.txt', 'utf8')
  .split(/
?
/)
  .filter((u) => u && !u.includes('github.com/')) // a11y on live sites only
  .map((u) => u.trim());

const cfg = {
  defaults: {
    standard: 'WCAG2AA',
    timeout: 30000
  },
  urls
};
fs.writeFileSync('.pa11yci.json', JSON.stringify(cfg, null, 2));
console.log('Wrote .pa11yci.json with', urls.length, 'urls');
```

### 7) `2025-fall/students.yaml` (example schema)

```yaml
- handle: pixelrita
  project_title: Magic Mirror
  repo: https://github.com/pixelrita/magic-mirror
  site: https://pixelrita.github.io/magic-mirror/
  emoji: '🪞'
  abstract: 'Exploring reflection and duality through interactive visuals.'
```

> **Privacy note:** Use only anonymous handles and public project URLs. Do not store names, emails, or personal identifiers.

---

**Badges for README** (optional):

```md
![Showroom](https://github.com/YOUR-ORG/web-design/actions/workflows/showroom.yml/badge.svg)
```

This appendix can be dropped into the course repo as-is. Replace `YOUR-ORG` with your namespace and adjust the semester path.

---

**Authorship:** Rubén Vega Balbás, PhD (UDIT, University of Design, Innovation and Technology) · ORCID: <https://orcid.org/0000-0001-6862-9081> · <https://www.udit.es>
**Licenses:** Code MIT · Content CC BY-NC 4.0

*Critical Coding for a Better Living.*
