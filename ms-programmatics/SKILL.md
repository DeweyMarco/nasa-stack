---
name: ms-programmatics
version: 1.0.0
description: |
  NASA-STD-7009B Section 4.1 compliance check — 8 Programmatics requirements.
  Checks intended use, criticality, life cycle plan, metrics, acceptance criteria,
  reporting info, technical reviews, and defect tracking. Generates missing artifacts.
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
---
<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Preamble (run first)

```bash
_UPD=$(~/.claude/skills/gstack/bin/gstack-update-check 2>/dev/null || .claude/skills/gstack/bin/gstack-update-check 2>/dev/null || true)
[ -n "$_UPD" ] && echo "$_UPD" || true
mkdir -p ~/.gstack/sessions
touch ~/.gstack/sessions/"$PPID"
_SESSIONS=$(find ~/.gstack/sessions -mmin -120 -type f 2>/dev/null | wc -l | tr -d ' ')
find ~/.gstack/sessions -mmin +120 -type f -delete 2>/dev/null || true
_CONTRIB=$(~/.claude/skills/gstack/bin/gstack-config get gstack_contributor 2>/dev/null || true)
_BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
echo "BRANCH: $_BRANCH"
_LAKE_SEEN=$([ -f ~/.gstack/.completeness-intro-seen ] && echo "yes" || echo "no")
echo "LAKE_INTRO: $_LAKE_SEEN"
```

If output shows `UPGRADE_AVAILABLE <old> <new>`: read `~/.claude/skills/gstack/gstack-upgrade/SKILL.md` and follow the "Inline upgrade flow" (auto-upgrade if configured, otherwise AskUserQuestion with 4 options, write snooze state if declined). If `JUST_UPGRADED <from> <to>`: tell user "Running gstack v{to} (just updated!)" and continue.

If `LAKE_INTRO` is `no`: Before continuing, introduce the Completeness Principle.
Tell the user: "gstack follows the **Boil the Lake** principle — always do the complete
thing when AI makes the marginal cost near-zero. Read more: https://garryslist.org/posts/boil-the-ocean"
Then offer to open the essay in their default browser:

```bash
open https://garryslist.org/posts/boil-the-ocean
touch ~/.gstack/.completeness-intro-seen
```

Only run `open` if the user says yes. Always run `touch` to mark as seen. This only happens once.

## AskUserQuestion Format

**ALWAYS follow this structure for every AskUserQuestion call:**
1. **Re-ground:** State the project, the current branch (use the `_BRANCH` value printed by the preamble — NOT any branch from conversation history or gitStatus), and the current plan/task. (1-2 sentences)
2. **Simplify:** Explain the problem in plain English a smart 16-year-old could follow. No raw function names, no internal jargon, no implementation details. Use concrete examples and analogies. Say what it DOES, not what it's called.
3. **Recommend:** `RECOMMENDATION: Choose [X] because [one-line reason]` — always prefer the complete option over shortcuts (see Completeness Principle). Include `Completeness: X/10` for each option. Calibration: 10 = complete implementation (all edge cases, full coverage), 7 = covers happy path but skips some edges, 3 = shortcut that defers significant work. If both options are 8+, pick the higher; if one is ≤5, flag it.
4. **Options:** Lettered options: `A) ... B) ... C) ...` — when an option involves effort, show both scales: `(human: ~X / CC: ~Y)`

Assume the user hasn't looked at this window in 20 minutes and doesn't have the code open. If you'd need to read the source to understand your own explanation, it's too complex.

Per-skill instructions may add additional formatting rules on top of this baseline.

## Completeness Principle — Boil the Lake

AI-assisted coding makes the marginal cost of completeness near-zero. When you present options:

- If Option A is the complete implementation (full parity, all edge cases, 100% coverage) and Option B is a shortcut that saves modest effort — **always recommend A**. The delta between 80 lines and 150 lines is meaningless with CC+gstack. "Good enough" is the wrong instinct when "complete" costs minutes more.
- **Lake vs. ocean:** A "lake" is boilable — 100% test coverage for a module, full feature implementation, handling all edge cases, complete error paths. An "ocean" is not — rewriting an entire system from scratch, adding features to dependencies you don't control, multi-quarter platform migrations. Recommend boiling lakes. Flag oceans as out of scope.
- **When estimating effort**, always show both scales: human team time and CC+gstack time. The compression ratio varies by task type — use this reference:

| Task type | Human team | CC+gstack | Compression |
|-----------|-----------|-----------|-------------|
| Boilerplate / scaffolding | 2 days | 15 min | ~100x |
| Test writing | 1 day | 15 min | ~50x |
| Feature implementation | 1 week | 30 min | ~30x |
| Bug fix + regression test | 4 hours | 15 min | ~20x |
| Architecture / design | 2 days | 4 hours | ~5x |
| Research / exploration | 1 day | 3 hours | ~3x |

- This principle applies to test coverage, error handling, documentation, edge cases, and feature completeness. Don't skip the last 10% to "save time" — with AI, that 10% costs seconds.

**Anti-patterns — DON'T do this:**
- BAD: "Choose B — it covers 90% of the value with less code." (If A is only 70 lines more, choose A.)
- BAD: "We can skip edge case handling to save time." (Edge case handling costs minutes with CC.)
- BAD: "Let's defer test coverage to a follow-up PR." (Tests are the cheapest lake to boil.)
- BAD: Quoting only human-team effort: "This would take 2 weeks." (Say: "2 weeks human / ~1 hour CC.")

## Contributor Mode

If `_CONTRIB` is `true`: you are in **contributor mode**. You're a gstack user who also helps make it better.

**At the end of each major workflow step** (not after every single command), reflect on the gstack tooling you used. Rate your experience 0 to 10. If it wasn't a 10, think about why. If there is an obvious, actionable bug OR an insightful, interesting thing that could have been done better by gstack code or skill markdown — file a field report. Maybe our contributor will help make us better!

**Calibration — this is the bar:** For example, `$B js "await fetch(...)"` used to fail with `SyntaxError: await is only valid in async functions` because gstack didn't wrap expressions in async context. Small, but the input was reasonable and gstack should have handled it — that's the kind of thing worth filing. Things less consequential than this, ignore.

**NOT worth filing:** user's app bugs, network errors to user's URL, auth failures on user's site, user's own JS logic bugs.

**To file:** write `~/.gstack/contributor-logs/{slug}.md` with **all sections below** (do not truncate — include every section through the Date/Version footer):

```
# {Title}

Hey gstack team — ran into this while using /{skill-name}:

**What I was trying to do:** {what the user/agent was attempting}
**What happened instead:** {what actually happened}
**My rating:** {0-10} — {one sentence on why it wasn't a 10}

## Steps to reproduce
1. {step}

## Raw output
```
{paste the actual error or unexpected output here}
```

## What would make this a 10
{one sentence: what gstack should have done differently}

**Date:** {YYYY-MM-DD} | **Version:** {gstack version} | **Skill:** /{skill}
```

Slug: lowercase, hyphens, max 60 chars (e.g. `browse-js-no-await`). Skip if file already exists. Max 3 reports per session. File inline and continue — don't stop the workflow. Tell user: "Filed gstack field report: {title}"

# /ms-programmatics: Section 4.1 Programmatics Compliance

You are checking NASA-STD-7009B **Section 4.1 — M&S Programmatics** requirements for this Python M&S project. There are **8 "shall" requirements**. Check each one, report findings, and offer to generate any missing artifacts.

---

## Step 0: Survey the Project

```bash
ls -la
find . -name "*.md" -not -path "./.git/*" | sort
find . -name "*.py" -not -path "./.git/*" | head -20
```

Note the project name (from README or directory name) and existing documentation structure.

---

## Step 1: M&S 40 — Intended Use Record

*"The M&S developer shall maintain a record of the intended use of the M&S."*

```bash
# Check for dedicated file
find . \( -name "MS_INTENDED_USE*" -o -name "INTENDED_USE*" \) -not -path "./.git/*" 2>/dev/null

# Check module-level docstrings
grep -r "intended use\|intended_use\|this model\|this simulation\|purpose:" \
  --include="*.py" --include="*.md" -i -l 2>/dev/null | head -10

# Check README for purpose description
grep -r "purpose\|intended\|designed to\|this tool\|what this" \
  --include="README*" -i -A 3 2>/dev/null | head -20
```

**Compliant if:** A dedicated `docs/MS_INTENDED_USE.md` exists, OR the primary module docstring contains a clear statement of intended use (what the model does, what questions it answers, what phenomena it represents).

---

## Step 2: M&S 6 — Criticality Assessment

*"The M&S developer shall maintain a criticality assessment of the M&S."*

```bash
find . \( -name "MS_CRITICALITY*" -o -name "CRITICALITY*" \) -not -path "./.git/*" 2>/dev/null
grep -r "criticality\|safety.critical\|decision.*consequence\|mission.*critical" \
  --include="*.md" -i -l 2>/dev/null | head -5
```

**Compliant if:** `docs/MS_CRITICALITY_ASSESSMENT.md` exists with a completed Appendix D matrix (Decision Consequence × M&S Influence). Run `/ms-criticality` for interactive assessment.

---

## Step 3: M&S 41 — Life Cycle Plan

*"The M&S developer shall maintain an M&S life cycle plan."*

```bash
find . \( -name "MS_LIFE_CYCLE*" -o -name "LIFE_CYCLE*" \) -not -path "./.git/*" 2>/dev/null
grep -r "life cycle\|lifecycle\|development plan\|maintenance plan\|versioning strategy" \
  --include="*.md" -i -l 2>/dev/null | head -5
```

**Compliant if:** A life cycle plan exists describing development, V&V, maintenance, and retirement phases.

---

## Step 4: M&S 42 — Programmatic and Technical Metrics

*"The M&S developer shall record programmatic and technical metrics for each phase of the M&S life cycle."*

```bash
grep -r "metric\|milestone\|schedule\|deliverable\|status\|progress\|performance measure" \
  --include="*.md" -i -l 2>/dev/null | head -10
find . -name "MS_ACCEPTANCE*" -o -name "ACCEPTANCE_CRITERIA*" 2>/dev/null | grep -v .git
```

**Compliant if:** Metrics are recorded somewhere (life cycle plan, project plan, or acceptance criteria document) with V&V and uncertainty metrics defined.

---

## Step 5: M&S 43 — Acceptance Criteria

*"The M&S developer shall define acceptance criteria for the M&S."*

The standard requires acceptance criteria for **5 categories** (43a–e):
- 43a: Criteria for Verification
- 43b: Criteria for Validation
- 43c: Criteria for Uncertainty
- 43d: Criteria for Sensitivity
- 43e: M&S assessment level thresholds (for the M&S capability assessment and M&S results assessment)

```bash
find . \( -name "MS_ACCEPTANCE*" -o -name "ACCEPTANCE_CRITERIA*" \) -not -path "./.git/*" 2>/dev/null
grep -r "acceptance criteria\|acceptance threshold\|credibility threshold\|minimum.*score" \
  --include="*.md" -i -A 5 2>/dev/null | head -30
```

**Compliant if:** All 5 categories (43a–e) have defined thresholds or criteria — specifically: Verification criteria (43a), Validation criteria (43b), Uncertainty criteria (43c), Sensitivity criteria (43d), and M&S assessment level thresholds (43e).

---

## Step 6: M&S 44 — M&S-Unique Reporting Information

*"The M&S developer shall maintain information unique to M&S reporting."*

```bash
grep -r "V&V\|verification.*validation\|uncertainty.*quantif\|sensitivity analysis\|credibility" \
  --include="*.md" -i -l 2>/dev/null | head -10
find . -name "MS_RESULTS_REPORT*" 2>/dev/null | grep -v .git
```

**Compliant if:** Any results reports include M&S-specific sections (V&V status, uncertainty, credibility assessment). Run `/ms-reporting` for a deep check.

---

## Step 7: M&S 9 — Technical Review Records

*"The M&S developer shall maintain technical review records."*

```bash
find . \( -name "*review*" -o -name "*REVIEW*" \) -not -path "./.git/*" \
  -name "*.md" 2>/dev/null | head -10
grep -r "technical review\|peer review\|review board\|IPR\|CDR\|PDR\|SRR" \
  --include="*.md" -i -l 2>/dev/null | head -5
```

**Compliant if:** Records of one or more technical reviews exist (peer review, design review, IPR, CDR, etc.) with reviewers, date, findings, and disposition.

---

## Step 8: M&S 51 — Defect and Problem Tracking

*"The M&S developer shall track all defects and problems from discovery to closure."*

```bash
ls CHANGELOG.md HISTORY.md CHANGES.md 2>/dev/null
grep -r "bug\|defect\|issue\|problem\|fix\|resolved\|closed\|known.*issue" \
  --include="CHANGELOG*" --include="HISTORY*" --include="*.md" -i -l 2>/dev/null | head -10
# Check for issue tracker references
grep -r "github.com.*issue\|jira\|bugzilla\|tracker" --include="*.md" -i -l 2>/dev/null | head -5
```

**Compliant if:** CHANGELOG.md, HISTORY.md, or issue tracker references exist documenting defects from discovery to resolution.

---

## Step 9: Report and Generate Artifacts

### Compliance Summary

Output:

```
## Section 4.1 — Programmatics Compliance

| Req  | Requirement                    | Status | Evidence |
|------|-------------------------------|--------|----------|
| M&S 40 | Intended use record          | ✓/✗/⚠ | [location] |
| M&S 6  | Criticality assessment       | ✓/✗/⚠ | [location] |
| M&S 41 | Life cycle plan              | ✓/✗/⚠ | [location] |
| M&S 42 | Programmatic/technical metrics | ✓/✗/⚠ | [location] |
| M&S 43 | Acceptance criteria (a–e)    | ✓/✗/⚠ | [location] |
| M&S 44 | M&S-unique reporting info    | ✓/✗/⚠ | [location] |
| M&S 9  | Technical review records     | ✓/✗/⚠ | [location] |
| M&S 51 | Defect/problem tracking      | ✓/✗/⚠ | [location] |

Score: X/8 (Y%)
```

### Generate Missing Artifacts

For each ✗ requirement with a generatable artifact, ask the user:

Use AskUserQuestion:
- List all missing artifacts
- RECOMMENDATION: Generate all missing artifacts (stubs take 2 minutes to fill in, non-compliance takes hours to explain to reviewers)
- Options: A) Generate all  B) Select specific  C) Report only

**Available templates to generate:**
- `docs/MS_INTENDED_USE.md` (M&S 40)
- `docs/MS_CRITICALITY_ASSESSMENT.md` (M&S 6) — or run `/ms-criticality` for interactive scoring
- `docs/MS_LIFE_CYCLE_PLAN.md` (M&S 41)
- `docs/MS_ACCEPTANCE_CRITERIA.md` (M&S 42, 43, 44)

When generating, read the project's README and main Python files to pre-fill as much project-specific information as possible. Do not generate generic placeholders when you can infer actual content from the codebase.
