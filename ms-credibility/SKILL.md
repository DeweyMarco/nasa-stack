---
name: ms-credibility
version: 1.0.0
description: |
  NASA-STD-7009B Appendix E credibility scoring. Interactively walks through all 11
  factors (5 capability + 6 results) on a 0–4 scale. Produces a scored assessment
  table with gap analysis vs. acceptance thresholds. Generates MS_CREDIBILITY_ASSESSMENT.md.
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

# /ms-credibility: Appendix E Credibility Scoring

You are running the NASA-STD-7009B **Appendix E Credibility Assessment** for this Python M&S project. This assessment scores 11 factors across two dimensions — Capability Assessment (developer perspective) and Results Assessment (user perspective) — on a 0–4 scale.

The result tells reviewers how much to trust both the M&S itself and a specific use of it.

---

## Step 0: Read Existing Evidence

Before asking any questions, survey the project for evidence:

```bash
find . -name "*.md" -not -path "./.git/*" | sort
find . \( -name "test_*.py" -o -name "*_test.py" \) -not -path "./.git/*" | wc -l
find . -path "*/data/*" -not -path "./.git/*" | head -10
find . \( -name "VALIDATION*" -o -name "ASSUMPTIONS*" -o -name "MS_LIMITS*" \) \
  -not -path "./.git/*" 2>/dev/null
ls CHANGELOG.md 2>/dev/null
```

Use this evidence to inform your scoring questions and to auto-score factors where evidence is conclusive.

---

## Step 1: Check for Existing Assessment

```bash
find . \( -name "MS_CREDIBILITY*" -o -name "CREDIBILITY_ASSESSMENT*" \) \
  -not -path "./.git/*" 2>/dev/null
```

If a credibility assessment exists: read it, display the current scores, and ask:

Use AskUserQuestion:
- "A credibility assessment already exists. What would you like to do?"
- Options: A) Update scores for specific factors  B) Re-score all factors from scratch  C) Just display the current assessment

---

## Step 2: Read Acceptance Thresholds

```bash
grep -r "acceptance.*threshold\|credibility.*threshold\|minimum.*score\|M&S 43e" \
  --include="*.md" -i -A 10 2>/dev/null | head -30
```

If thresholds are defined in `docs/MS_ACCEPTANCE_CRITERIA.md` or similar, load them now. These are the target scores the project must meet. If not defined, note this as a gap (M&S 43e non-compliance).

---

## Step 3: Score Capability Assessment Factors (1–5)

Score each factor 0–4. For each factor, first look for evidence in the project, then ask the user to confirm or adjust.

### Scale Reference (applies to all factors):
- **0 — Not performed:** No evidence this activity was done
- **1 — Informally performed:** Done but not documented or inconsistently applied
- **2 — Planned and tracked:** Documented, planned, some gaps remain
- **3 — Well-defined:** Complete, documented, consistently applied
- **4 — Quantitatively controlled:** Measured, metrics-driven, fully rigorous

---

**Factor 1: Data Pedigree**
Evidence from M&S 10: Does a data manifest exist? Are data sources documented with version and uncertainty?

Use AskUserQuestion:
- "Factor 1: Data Pedigree — How well documented are the real-world system data and inputs used to develop the M&S?"
- Show what you found (data/ directory, manifest files, etc.)
- RECOMMENDATION: Based on evidence found
- Options: 0 (Not performed), 1 (Informal), 2 (Planned), 3 (Well-defined), 4 (Quantitative) — plus a brief description of what this means for their project

---

**Factor 2: Verification**
Evidence from M&S 15, 16: Number of test files, test coverage, domain-of-verification docs.

Use AskUserQuestion:
- "Factor 2: Verification — How rigorously has the M&S been verified (unit tests, integration tests, code comparisons)?"
- Show test file count and any verification records found
- RECOMMENDATION: Based on test file count and documentation
- Options: 0–4 (with descriptions)

---

**Factor 3: Validation**
Evidence from M&S 17, 18, 19: Validation datasets, comparison scripts, validation domain docs.

Use AskUserQuestion:
- "Factor 3: Validation — How well has the M&S been validated against real-world data or higher-fidelity referents?"
- Show validation artifacts found
- RECOMMENDATION: Based on evidence
- Options: 0–4 (with descriptions)

---

**Factor 4: Development Technical Review**
Evidence from M&S 9: Review records found.

Use AskUserQuestion:
- "Factor 4: Development Technical Review — How formally has the M&S been reviewed by qualified independent reviewers during development?"
- Show review records found (or none)
- RECOMMENDATION: Based on evidence
- Options: 0–4 (with descriptions)

---

**Factor 5: Development Process/Product Management**
Evidence from M&S 40–51: Life cycle plan, acceptance criteria, defect tracking, versioning.

Use AskUserQuestion:
- "Factor 5: Development Process/Product Management — How well managed is the M&S development process (life cycle plan, configuration management, issue tracking)?"
- Show management artifacts found
- RECOMMENDATION: Based on evidence
- Options: 0–4 (with descriptions)

---

## Step 4: Score Results Assessment Factors (6–11)

These apply to a specific USE of the M&S, not the M&S itself.

Use AskUserQuestion (one question for context):
- "The next 6 factors assess a specific use of this M&S. Describe the specific decision or analysis this M&S is supporting right now (or the most recent use)."
- This description will be embedded in the generated assessment document.

---

**Factor 6: Use Assessment**
Evidence from M&S 22, 23: Use records, appropriateness assessment.

Use AskUserQuestion:
- "Factor 6: Use Assessment — How well documented and assessed is the appropriateness of this specific use?"
- RECOMMENDATION: Based on evidence from M&S 22/23 check
- Options: 0–4 (with descriptions)

---

**Factor 7: Input Pedigree**
Evidence from M&S 24: Input config files, provenance documentation.

Use AskUserQuestion:
- "Factor 7: Input Pedigree — How well documented are the inputs to this specific run (source, uncertainty, date)?"
- RECOMMENDATION: Based on config files and input records found
- Options: 0–4 (with descriptions)

---

**Factor 8: Uncertainty Characterization**
Evidence from M&S 28, 29: UQ method docs, uncertainty outputs.

Use AskUserQuestion:
- "Factor 8: Uncertainty Characterization — How rigorously are input and output uncertainties quantified for this use?"
- RECOMMENDATION: Based on UQ evidence found
- Options: 0–4 (with descriptions)

---

**Factor 9: Results Robustness**
Evidence from M&S 30: Sensitivity analysis, parameter studies.

Use AskUserQuestion:
- "Factor 9: Results Robustness — How extensively have the results been tested for sensitivity to inputs and assumptions?"
- RECOMMENDATION: Based on sensitivity analysis evidence
- Options: 0–4 (with descriptions)

---

**Factor 10: Use/Analysis Technical Review**
Use AskUserQuestion:
- "Factor 10: Use/Analysis Technical Review — Has this specific use and its results been reviewed by qualified independent reviewers?"
- Options: 0–4 (with descriptions)

---

**Factor 11: Use Process/Product Management**
Evidence from M&S 25, 49: Run records, risk assessment.

Use AskUserQuestion:
- "Factor 11: Use Process/Product Management — How well managed is this specific use (run records, risk assessment, execution rationale)?"
- RECOMMENDATION: Based on use records found
- Options: 0–4 (with descriptions)

---

## Step 5: Generate and Display the Assessment

Create `docs/MS_CREDIBILITY_ASSESSMENT.md` with:

```markdown
# M&S Credibility Assessment
## Project: [name]
## Date: [today]
## Assessed by: [user / Claude]

## Capability Assessment (Developer Factors)

| Factor | Description                            | Score (0–4) | Threshold | Status |
|--------|----------------------------------------|-------------|-----------|--------|
| 1      | Data Pedigree                          | X           | [threshold]| ✓/✗/⚠ |
| 2      | Verification                           | X           | [threshold]| ✓/✗/⚠ |
| 3      | Validation                             | X           | [threshold]| ✓/✗/⚠ |
| 4      | Development Technical Review           | X           | [threshold]| ✓/✗/⚠ |
| 5      | Development Process/Product Mgmt       | X           | [threshold]| ✓/✗/⚠ |

**Capability Score: [average or composite] / 4**

## Results Assessment (User Factors)

| Factor | Description                            | Score (0–4) | Threshold | Status |
|--------|----------------------------------------|-------------|-----------|--------|
| 6      | Use Assessment                         | X           | [threshold]| ✓/✗/⚠ |
| 7      | Input Pedigree                         | X           | [threshold]| ✓/✗/⚠ |
| 8      | Uncertainty Characterization           | X           | [threshold]| ✓/✗/⚠ |
| 9      | Results Robustness                     | X           | [threshold]| ✓/✗/⚠ |
| 10     | Use/Analysis Technical Review          | X           | [threshold]| ✓/✗/⚠ |
| 11     | Use Process/Product Management         | X           | [threshold]| ✓/✗/⚠ |

**Results Score: [average or composite] / 4**

## Gap Analysis

[For each factor below threshold:]
- Factor N ([name]): Score X, Threshold Y. Gap: [description of what's needed to close the gap]

## Improvement Roadmap

[Prioritized list of actions to raise each below-threshold factor]
```

---

## Step 6: Summary

Output a brief summary:

```
## Credibility Assessment Complete

Capability Assessment: X.X/4 (N/5 factors at or above threshold)
Results Assessment: X.X/4 (N/6 factors at or above threshold)

Gaps requiring action: [list]

Assessment saved to: docs/MS_CREDIBILITY_ASSESSMENT.md

Next steps:
- Address Factor [N] gaps to meet acceptance thresholds (M&S 43e)
- Include this assessment in results reports (M&S 50, 35)
- Rerun /ms-credibility after closing gaps
```
