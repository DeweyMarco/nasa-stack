---
name: ms-criticality
version: 1.0.0
description: |
  NASA-STD-7009B Appendix D criticality matrix assessment. Interactive 3x3 matrix
  scoring Decision Consequence × M&S Influence. Produces a criticality level
  (Low/Medium/High/Safety-Critical) with implications for required rigor.
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

# /ms-criticality: Appendix D Criticality Assessment

You are running the NASA-STD-7009B **Appendix D Criticality Matrix** assessment. This determines how rigorously all other requirements (M&S 6 through M&S 51) must be applied. A few minutes here calibrates the entire compliance effort.

The matrix has two axes. You will ask two questions and produce a 3×3 matrix result.

---

## Step 0: Read Project Context

```bash
cat README.md 2>/dev/null | head -50
find . \( -name "MS_INTENDED_USE*" -o -name "INTENDED_USE*" \) -not -path "./.git/*" 2>/dev/null | \
  xargs cat 2>/dev/null | head -50
find . -name "MS_CRITICALITY*" -not -path "./.git/*" 2>/dev/null | xargs cat 2>/dev/null | head -30
```

Use this context to inform your questions and pre-fill the criticality document.

---

## Step 1: Check for Existing Assessment

```bash
find . -name "MS_CRITICALITY*" -not -path "./.git/*" 2>/dev/null
```

If an assessment exists: read it, show the current score, and ask:

Use AskUserQuestion:
- "A criticality assessment already exists with [score]. What would you like to do?"
- Options: A) Update the assessment  B) Re-score from scratch  C) Just display current assessment

---

## Step 2: Axis 1 — Decision Consequence

*How bad is it if the M&S gives the wrong answer and a decision is made based on that wrong answer?*

Use AskUserQuestion:
- Show the axis description
- "What is the highest potential consequence of an incorrect M&S result being used for this decision?"
- RECOMMENDATION: Based on the project's stated purpose, recommend a level
- Options:
  - **A) Low** — Inconvenience, minor rework, or no material impact. Wrong answer detected before harm occurs. Examples: internal trade studies, academic research, preliminary design with many review gates.
  - **B) Moderate** — Schedule delay, cost overrun, or performance shortfall. Mission impact but not safety-critical. Examples: system performance predictions used in CDR, resource budgeting, non-safety-critical design decisions.
  - **C) High** — Significant mission failure, major cost/schedule impact, public harm, or safety risk. Examples: flight trajectory calculations, structural load predictions used for final design, operational decisions during a mission.
  - **D) Safety-Critical** — Risk of loss of life, loss of crew, loss of vehicle, or catastrophic public harm. Examples: abort system triggering, life support calculations, proximity operations.

---

## Step 3: Axis 2 — M&S Influence

*How much does this M&S actually influence the decision vs. other information sources?*

Use AskUserQuestion:
- "How much does this M&S influence the final decision (relative to testing, other analyses, expert judgment)?"
- RECOMMENDATION: Based on whether this appears to be a primary analysis or one of many
- Options:
  - **A) Low** — M&S is one of many inputs. Decision-makers have significant additional information (test data, multiple independent analyses, conservative margins). M&S result alone would not determine the outcome.
  - **B) Moderate** — M&S has notable influence. It may be the primary analysis for some aspects but is cross-checked against other data or uses conservative margins.
  - **C) High** — M&S is the primary or sole basis for the decision. Minimal independent verification. Results are used directly without significant conservatism or cross-checking.

---

## Step 4: Compute and Display the Criticality Level

Apply the Appendix D matrix:

```
                    Decision Consequence
                    Low        Moderate    High/Safety
M&S Influence
Low               | LOW      | LOW       | MEDIUM
Moderate          | LOW      | MEDIUM    | HIGH
High              | MEDIUM   | HIGH      | HIGH (Safety-Critical if D was chosen)
```

If the user selected Safety-Critical (D) for Decision Consequence, treat the result as **Safety-Critical** for High M&S Influence, **High** otherwise.

Display:

```
## Criticality Matrix Result

Decision Consequence: [user's choice and description]
M&S Influence:        [user's choice and description]

Criticality Level: [LOW / MEDIUM / HIGH / SAFETY-CRITICAL]
```

---

## Step 5: Explain the Implications

For each criticality level, explain what it means for the rigor required:

**LOW criticality:**
- Informal documentation is acceptable for most requirements
- Verification can be limited to basic unit tests
- Uncertainty quantification can be qualitative
- Single reviewer may be sufficient for technical reviews
- Streamlined reporting acceptable

**MEDIUM criticality:**
- All 43 requirements must be addressed, but depth can be proportionate
- Quantitative uncertainty preferred but qualitative with justification is acceptable
- Sensitivity analysis required; scope can be limited
- Formal technical review by at least one qualified independent reviewer
- Full Appendix E scoring required; minimum score thresholds apply

**HIGH criticality:**
- All 43 requirements must be fully addressed with rigorous documentation
- Quantitative uncertainty characterization required
- Comprehensive sensitivity analysis required
- Formal multi-person technical review board
- All Appendix E scores must meet or exceed defined thresholds
- Complete Appendix A records required

**SAFETY-CRITICAL:**
- Everything for HIGH, plus:
- Independent verification by a separate team
- Configuration-controlled artifacts required
- Formal review boards with documented disposition of all findings
- Risk assessment must demonstrate acceptable risk per project safety plan
- Additional NASA safety requirements (NPR 8715.3, etc.) may apply

---

## Step 6: Generate the Criticality Assessment Document

Create or update `docs/MS_CRITICALITY_ASSESSMENT.md`:

```markdown
# M&S Criticality Assessment
## Project: [name]
## Date: [today]
## Standard: NASA-STD-7009B Appendix D

## Assessment

**Decision Consequence:** [Low / Moderate / High / Safety-Critical]
> [User's description of the decision and its consequence]

**M&S Influence:** [Low / Moderate / High]
> [User's description of how much this M&S drives the decision]

## Criticality Level: [LOW / MEDIUM / HIGH / SAFETY-CRITICAL]

## Compliance Implications

[Paste the relevant implications section from Step 5]

## Required Rigor by Phase

| Phase            | Required Documentation Level |
|------------------|-------------------------------|
| Programmatics    | [implication for this level]  |
| Development      | [implication for this level]  |
| Use              | [implication for this level]  |
| Reporting        | [implication for this level]  |

## Appendix E Minimum Thresholds

Based on this criticality level, the following minimum scores are recommended:

| Factor | Minimum Score |
|--------|--------------|
| [list all 11 factors with level-appropriate minimums] |

## Review and Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| M&S Developer | | | |
| M&S User | | | |
| Technical Reviewer | | | |
```

---

## Step 7: Summary

Output:

```
## Criticality Assessment Complete

Criticality Level: [LEVEL]
Decision Consequence: [axis 1]
M&S Influence: [axis 2]

Implications:
- [2-3 bullet points of key implications]

Assessment saved to: docs/MS_CRITICALITY_ASSESSMENT.md

Next steps:
- Run /ms-audit for a full 43-requirement compliance sweep calibrated to this criticality level
- Define acceptance thresholds in docs/MS_ACCEPTANCE_CRITERIA.md based on the minimum scores above (M&S 43e)
```
