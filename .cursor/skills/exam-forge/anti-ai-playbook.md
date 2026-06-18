# Anti-AI Playbook — ChatGPT-Resistant Exam Design

> **Portability:** `PORTABILITY.md` — copy this pack to another course repo.
> **Git:** Author banks in `private/exams/`; exports in `private/exams-out/` (gitignored).

Techniques to make exam questions resistant to AI-assisted cheating while
remaining fair to honest students. Every technique here has been validated
against the research on LLM response patterns (IRT analysis, NLP vulnerability
studies, statistical fingerprinting).

---

## 1. Defeating Longest-Answer Bias

### The problem

In poorly designed MCQs, the correct answer tends to be the longest because the
author adds qualifiers and precision to make it unambiguously correct. Students
(and LLMs) learn to exploit this: **pick the longest option**.

### The fix: four strategies (apply at least one per question)

#### Strategy A — Pad distractors

Add plausible technical detail to wrong answers. The detail sounds right but
contains a subtle error.

```yaml
# BAD — correct answer is obviously longest
answers:
  - text: '<nav>'
    fraction: 100
  - text: '<div>'
    fraction: 0
  - text: '<span>'
    fraction: 0
  - text: '<section>'
    fraction: 0

# GOOD — distractors have comparable length
answers:
  - text: '<nav>'
    fraction: 100
    feedback: 'Correct — semantic landmark for navigation.'
  - text: '<div class="nav"> with role="navigation" added via JavaScript at runtime'
    fraction: 0
    feedback: 'Redundant ARIA — use the native element.'
  - text: '<header> containing an unordered list of anchor elements without any landmark wrapper'
    fraction: 0
    feedback: '<header> alone lacks navigation semantics.'
  - text: '<section aria-label="navigation"> using explicit ARIA instead of the native element'
    fraction: 0
    feedback: 'ARIA workaround — native <nav> is preferred.'
```

#### Strategy B — Trim the correct answer

Use the most concise accurate phrasing for the correct option.

```yaml
# Correct answer is deliberately SHORT
answers:
  - text: 'Returns a new array'
    fraction: 100
  - text: 'Modifies the original array in place and returns undefined to signal mutation'
    fraction: 0
  - text: 'Returns the original array after sorting all elements by their Unicode code points'
    fraction: 0
  - text: 'Creates a shallow copy of the array and then applies the callback to each element of the copy'
    fraction: 0
```

#### Strategy C — Equalize length

All options within ±15% character count. Use a word-count check during authoring.

#### Strategy D — Invert the pattern deliberately

In ~25% of questions, make the correct answer the shortest. This destroys any
statistical pattern students might rely on.

### Validation rule

After drafting an MCQ, count characters per option. If the correct answer is
the longest by >20%, apply strategy A, B, or D before finalizing.

---

## 2. Honeypot Techniques (ChatGPT Traps)

These techniques create questions where the AI-generated answer is predictably
wrong in a specific, detectable way.

### 2.1 — The Fabricated Authority

Invent a plausible but nonexistent method, API, or standard. GPT will treat it
as real because it pattern-matches authoritative language.

```yaml
- id: q015
  type: multichoice
  name: 'React Router navigation'
  question: |
    <p>Which hook from React Router v7 should you use to programmatically
    navigate after a form submission?</p>
  answers:
    - text: 'useNavigate()'
      fraction: 100
      feedback: 'Correct — useNavigate returns a function for imperative navigation.'
    - text: 'useHistory()'
      fraction: 0
      feedback: 'useHistory was React Router v5. Removed in v6+.'
    - text: 'useRouterTransition()'
      fraction: 0
      feedback: 'This hook does not exist. It sounds plausible but was never part of React Router.'
    - text: 'useRedirect()'
      fraction: 0
      feedback: 'No such hook exists in React Router.'
```

**Why it works**: GPT often "recognizes" fabricated names that follow naming
conventions and assigns them moderate confidence. Students who used the library
know it does not exist.

### 2.2 — The Version-Specific Trap

Use syntax or API from the exact version taught in class. GPT defaults to the
most common version in its training data.

```yaml
- id: q022
  type: multichoice
  name: 'React Query v5 cache'
  question: |
    <p>In TanStack Query v5, what is the correct property name for the time
    after which unused cache entries are garbage-collected?</p>
  answers:
    - text: 'gcTime'
      fraction: 100
      feedback: 'Correct — renamed from cacheTime in v5.'
    - text: 'cacheTime'
      fraction: 0
      feedback: 'This was the v3/v4 name. Renamed to gcTime in v5.'
    - text: 'garbageCollectionTime'
      fraction: 0
      feedback: 'Plausible but not the actual property name.'
    - text: 'staleTime'
      fraction: 0
      feedback: 'staleTime controls freshness, not garbage collection.'
```

**Why it works**: GPT's training data is dominated by v3/v4 content. Students
who followed the course material know v5 renamed it.

### 2.3 — The Local Anchor

Reference specific course artifacts: slide numbers, exercise names, repo paths,
class demos.

```yaml
- id: q033
  type: multichoice
  name: 'Service layer pattern'
  question: |
    <p>In the Geophysical Aggregator project (as structured in the course
    template at <code>src/services/</code>), what is the primary reason for
    isolating API calls into service functions rather than calling
    <code>fetch()</code> directly inside components?</p>
  answers:
    - text: 'Separation of concerns — components handle UI, services handle data access, making both independently testable'
      fraction: 100
    - text: 'Performance — service functions are automatically memoized by React'
      fraction: 0
      feedback: 'Services are plain functions, not hooks. React does not memoize them.'
    - text: 'Security — service functions hide the API key from the browser'
      fraction: 0
      feedback: 'Client-side services still run in the browser. API keys in frontend code are exposed regardless.'
    - text: 'Requirement — React Router v7 requires all data fetching to go through service functions'
      fraction: 0
      feedback: 'React Router has no such requirement.'
```

**Why it works**: GPT cannot access the course repo or slides. It gives a
generic answer. Students recognize the specific project context.

### 2.4 — The Negation Trap

"Which is NOT..." questions exploit GPT's tendency to select the first
correct-sounding option rather than the one that breaks the pattern.

```yaml
- id: q041
  type: multichoice
  name: 'Web APIs vs React'
  question: |
    <p>Which of the following is <strong>NOT</strong> a Web API provided by the browser?</p>
  answers:
    - text: 'useState'
      fraction: 100
      feedback: 'Correct — useState is a React hook, not a browser Web API.'
    - text: 'fetch'
      fraction: 0
      feedback: 'fetch is a Web API (Fetch API).'
    - text: 'localStorage'
      fraction: 0
      feedback: 'localStorage is a Web API (Web Storage API).'
    - text: 'IntersectionObserver'
      fraction: 0
      feedback: 'IntersectionObserver is a Web API.'
```

**Design rule**: Place the correct answer (the "NOT" item) at a random position,
not first. GPT tends to pick the first option that matches the positive pattern.

### 2.5 — Code with a Subtle Bug

Present code that looks correct on quick reading but has a specific, common error.

```yaml
- id: q048
  type: multichoice
  name: 'Spot the bug'
  question: |
    <p>What is wrong with this React component?</p>
    <pre><code>function Counter() {
      const [count, setCount] = useState(0);
      const increment = () => {
        setCount(count + 1);
        setCount(count + 1);
      };
      return &lt;button onClick={increment}&gt;{count}&lt;/button&gt;;
    }</code></pre>
  answers:
    - text: 'Both setCount calls use the stale closure value of count, so clicking increments by 1 instead of 2'
      fraction: 100
      feedback: 'Correct — both calls read the same count from the closure. Use functional update: setCount(c => c + 1).'
    - text: 'useState cannot be called with a number argument'
      fraction: 0
      feedback: 'useState accepts any value as initial state.'
    - text: 'onClick should use an arrow function wrapper: onClick={() => increment()}'
      fraction: 0
      feedback: 'Passing the function reference directly is valid and equivalent.'
    - text: 'The component will cause an infinite re-render loop'
      fraction: 0
      feedback: 'State updates inside an event handler do not cause loops — only updates inside the render body do.'
```

**Why it works**: GPT often identifies the code as "correct" or flags the wrong
issue. Students who debugged similar patterns in class recognize the stale
closure immediately.

### 2.6 — The Contradictory Cluster

Design two questions in the same exam whose "surface-level obvious" answers
contradict each other. A student who understands the nuance answers both
correctly. GPT picks the surface match in both, producing an inconsistent pair.

**Question A**: "Is `useEffect` called before or after the browser paints?"
- Correct: **After** (useEffect is asynchronous, runs after paint)

**Question B**: "When you need to measure DOM layout before the browser paints,
which hook should you use?"
- Correct: **useLayoutEffect** (synchronous, runs before paint)

GPT tends to answer "after paint" for both or conflate them. A student who
ran both in the course lab answers correctly.

**Post-exam check**: Flag submissions that got both wrong in the same direction.

---

## 3. Question Design Checklist

Before finalizing any MCQ, verify:

- [ ] Correct answer is NOT the longest (or is deliberately the shortest)
- [ ] At least one distractor contains plausible technical detail
- [ ] At least one distractor is a "honeypot" (what GPT would likely pick)
- [ ] Question stem does not contain unintentional grammar cues (e.g., "an ___" revealing the answer starts with a vowel)
- [ ] Negation words ("NOT", "EXCEPT") are **bolded**
- [ ] Code snippets are syntactically valid (the bug is semantic, not a typo)
- [ ] For essay questions: prompt requires reference to personal project/code
- [ ] Category and difficulty are set

---

## 4. Statistical Fingerprinting (Post-Exam Detection)

### Method

Design 3–5 **canary clusters** per exam: groups of questions on the same topic
with predictable GPT response patterns.

#### Step 1 — Pre-test with GPT

Before the exam, feed each canary question to ChatGPT (or the latest available
model). Record its answer choices as the **GPT signature vector**.

```
Cluster "React Query":
  q001: GPT picks B (wrong)    → signature = [0, 1, 0, 0]
  q002: GPT picks A (correct)  → signature = [1, 0, 0, 0]
  q003: GPT picks C (wrong)    → signature = [0, 0, 1, 0]
```

#### Step 2 — Collect student responses

After the exam, extract each student's answers for the canary questions.

#### Step 3 — Compare

For each student, compute cosine similarity between their response vector and
the GPT signature. Flag students whose similarity exceeds a threshold (e.g.,
>0.85 across all clusters).

#### Step 4 — Human review

Statistical flags are NOT proof. They trigger a conversation with the student
about their reasoning. The goal is pedagogical, not punitive.

### Python sketch

```python
import numpy as np
from numpy.linalg import norm

def response_vector(answers: list[int], n_options: int = 4) -> np.ndarray:
    """One-hot encode a list of selected option indices."""
    vec = np.zeros(len(answers) * n_options)
    for i, a in enumerate(answers):
        vec[i * n_options + a] = 1
    return vec

def similarity(student: np.ndarray, gpt: np.ndarray) -> float:
    d = norm(student) * norm(gpt)
    return float(np.dot(student, gpt) / d) if d > 0 else 0.0

gpt_sig = response_vector([1, 0, 2])          # GPT answers: B, A, C
student  = response_vector([1, 0, 2])          # identical → sim ≈ 1.0
honest   = response_vector([0, 0, 0])          # different → sim < 0.5

print(similarity(student, gpt_sig))  # ~1.0 → flag
print(similarity(honest, gpt_sig))   # ~0.33 → normal
```

### Design tips for canary clusters

- Include at least one "easy" question GPT gets right (so innocent students
  also match partially — avoids false positives from pure difficulty).
- Include at least two "trap" questions GPT gets wrong in a characteristic way.
- Spread canaries across different sections so students do not notice a pattern.
- Rotate canary questions between exam versions/semesters.

---

## 5. Essay-Specific Anti-AI Techniques

For essay questions, detection is harder. Use these design patterns:

### 5.1 — Personal Code Requirement

> "Include at least two code snippets **from your own repository** (with file
> paths). Generic examples will receive zero credit."

Students must reference their actual implementation. GPT cannot access their
repos.

### 5.2 — Error Narration

> "Describe a specific bug you encountered during development. What was the
> error message? How did you debug it? What was the fix?"

GPT produces generic, plausible-sounding debugging narratives. Real students
describe messy, specific situations with exact error messages.

### 5.3 — Contradictory Prompt

> "Explain why you chose pattern X over pattern Y. Then argue the opposite:
> why Y might have been the better choice."

GPT tends to produce balanced, hedging prose. Real students show genuine
preference and struggle with the counter-argument.

### 5.4 — Temporal Anchor

> "Reference the specific class session or exercise where you first encountered
> this concept. What changed in your understanding between that session and the
> final project?"

GPT cannot reference specific class events. Students who attended can.

---

## 6. Exam Metadata for Detection

Add these fields to the YAML `metadata` to support post-exam analysis:

```yaml
metadata:
  # ... standard fields ...
  canary_clusters:
    - name: 'React Query traps'
      question_ids: [q001, q003, q007]
      gpt_signature: [1, 0, 2]    # GPT's predicted answers (0-indexed)
    - name: 'Auth pattern traps'
      question_ids: [q015, q018, q022]
      gpt_signature: [2, 1, 1]
  anti_ai_level: high              # low | medium | high
  honeypot_ids: [q015, q022, q033] # questions designed as GPT traps
```

This metadata is NOT exported to the LMS — it stays in the YAML for the
instructor's reference and post-exam analysis scripts.
