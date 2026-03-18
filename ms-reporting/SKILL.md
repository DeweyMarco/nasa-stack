---
name: ms-reporting
version: 1.0.0
description: |
  NASA-STD-7009B Section 4.3.8 compliance check — 9 Reporting requirements. Checks
  that results reports include all required warnings, uncertainty estimates, capability
  and results assessments, qualifications, and Appendix A records. Generates a complete
  report template pre-filled with project-specific information.
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

# /ms-reporting: Section 4.3.8 Results Reporting Compliance

You are checking NASA-STD-7009B **Section 4.3.8 — M&S Results Reporting** requirements for this Python M&S project. There are **9 "shall" requirements** (M&S 32–39, 50). Every report that communicates M&S results to support a decision must satisfy all 9.

---

## Step 0: Find Existing Reports

```bash
# Look for results reports
find . \( -name "*report*" -o -name "*REPORT*" -o -name "MS_RESULTS*" -o -name "results_*" \) \
  -not -path "./.git/*" \
  \( -name "*.md" -o -name "*.pdf" -o -name "*.docx" -o -name "*.txt" -o -name "*.rst" \) 2>/dev/null
# Notebooks that may serve as reports
find . -name "*.ipynb" -not -path "./.git/*" 2>/dev/null | head -10
# Documentation folder
ls docs/ 2>/dev/null
```

If no reports exist: all 9 requirements are ✗ by default. Skip to Step 10 to generate the template.

If reports exist: read each one and check it against the 9 requirements below.

---

## Step 1: M&S 32 — Explicit Warnings for All 8 Violation Categories

*"The results report shall include explicit warnings for violations of any of the following:"*

The standard requires explicit warnings (not just omission) for all **8 categories**:

1. Unachieved acceptance criteria (M&S 43 thresholds not met)
2. Assumption violations (model used outside its stated assumptions)
3. Limit violations (inputs or conditions outside M&S 13 limits)
4. Error/warning messages generated during the run
5. Unfavorable use appropriateness assessment (M&S 23 found issues)
6. Setup or execution issues (unexpected behavior, convergence problems)
7. Waivers or deviations from the M&S plan
8. Outstanding defects or known problems (M&S 51)

For each report found, check whether these 8 categories are addressed:

```bash
grep -r "warning\|violation\|limit.*exceeded\|outside.*domain\|assumption.*violated\|error.*message\|waiver\|known.*issue\|defect" \
  --include="*.md" --include="*.txt" -i -l 2>/dev/null | head -10
```

**Compliant if:** The report has a "Warnings" or "Caveats" section that explicitly addresses all 8 categories (even if the entry is "None observed").

---

## Step 2: M&S 33 — Uncertainty Estimate

*"The results report shall include an uncertainty estimate for the M&S results, or an explicit statement that an uncertainty estimate is not available."*

```bash
grep -r "uncertainty.*estimate\|uncertainty.*quantif\|confidence interval\|error bound\|±\|not available\|could not.*quantif" \
  --include="*.md" --include="*.txt" --include="*.ipynb" -i -l 2>/dev/null | head -5
```

**Compliant if:** The report contains a numeric uncertainty estimate (e.g., "±5% at 95% confidence") OR an explicit statement that quantitative uncertainty is not available with the reason why.
**Non-compliant if:** Results are reported without any uncertainty statement.

---

## Step 3: M&S 34 — Uncertainty Process Description

*"The results report shall describe the uncertainty characterization process."*

```bash
grep -r "uncertainty.*method\|Monte Carlo\|uncertainty.*approach\|how.*uncertainty.*was\|propagation.*method" \
  --include="*.md" --include="*.txt" -i -l 2>/dev/null | head -5
```

**Compliant if:** The report briefly describes HOW the uncertainty was estimated (Monte Carlo, analytical propagation, expert elicitation, etc.).

---

## Step 4: M&S 50 — M&S Capability Assessment Outcome Included

*"The results report shall include the outcome of the M&S capability assessment."*

```bash
find . \( -name "MS_CAPABILITY*" -o -name "CAPABILITY_ASSESSMENT*" \) \
  -not -path "./.git/*" 2>/dev/null
grep -r "capability.*assessment\|developer.*factor\|data pedigree.*score\|verification.*score\|validation.*score" \
  --include="*.md" -i -l 2>/dev/null | head -5
```

**Compliant if:** The report includes (or references) the 5-factor capability assessment scores from Appendix E. Run `/ms-credibility` to generate these scores.

---

## Step 5: M&S 35 — M&S Results Assessment Outcome

*"The results report shall include the outcome of the M&S results assessment."*

```bash
find . \( -name "MS_RESULTS_ASSESSMENT*" -o -name "RESULTS_ASSESSMENT*" \) \
  -not -path "./.git/*" 2>/dev/null
grep -r "results.*assessment\|use.*assessment.*score\|appendix.*E.*results\|6.*factor" \
  --include="*.md" -i -l 2>/dev/null | head -5
```

**Compliant if:** The report includes (or references) the 6-factor results assessment scores from Appendix E.

---

## Step 6: M&S 36 — Technical Review Findings

*"The results report shall include the technical review findings."*

```bash
find . \( -name "*review*" -o -name "*REVIEW*" \) -not -path "./.git/*" -name "*.md" 2>/dev/null | head -5
grep -r "technical review\|peer review\|reviewer.*finding\|review.*comment\|review.*disposition" \
  --include="*.md" -i -l 2>/dev/null | head -5
```

**Compliant if:** The report documents who reviewed it, when, what they found, and how findings were dispositioned (accepted, waived, corrected).

---

## Step 7: M&S 37 — Developer and Operator Qualifications

*"The results report shall include the qualifications of the M&S developer and operator."*

```bash
grep -r "qualification\|credentials\|experience\|expertise\|trained\|certified\|background" \
  --include="*.md" -i -l 2>/dev/null | head -5
```

**Compliant if:** The report includes a section listing the relevant qualifications (education, experience, training) of both the M&S developer and the operator who ran the M&S for this specific use.

---

## Step 8: M&S 38 — Full Records per Appendix A

*"The results report shall include full records per Appendix A."*

Appendix A of NASA-STD-7009B defines the minimum records for the Requirements Identification Matrix. The report must reference or include these records.

```bash
grep -r "appendix.*A\|requirements identification matrix\|RIM\|full.*record" \
  --include="*.md" -i -l 2>/dev/null | head -5
```

**Compliant if:** The report references a completed Requirements Identification Matrix or includes all Appendix A records as attachments.

---

## Step 9: M&S 39 — Risk Assessment Rationale

*"The results report shall include the risk assessment rationale for M&S use."*

```bash
find . \( -name "MS_RISK*" -o -name "RISK_ASSESSMENT*" \) -not -path "./.git/*" 2>/dev/null
grep -r "risk.*rationale\|risk.*assessment\|risk.*accept\|risk.*mitig" \
  --include="*.md" -i -l 2>/dev/null | head -5
```

**Compliant if:** The report references or includes the risk assessment (M&S 49), explaining why the level of M&S credibility achieved is acceptable for the decision being made.

---

## Step 10: Report and Generate the Results Report Template

### Compliance Summary

```
## Section 4.3.8 — Reporting Compliance

| Req    | Requirement                                | Status | Evidence |
|--------|--------------------------------------------|--------|----------|
| M&S 32 | Explicit warnings (all 8 categories)       | ✓/✗/⚠ | [location] |
| M&S 33 | Uncertainty estimate (or unavailability)   | ✓/✗/⚠ | [location] |
| M&S 34 | Uncertainty process described              | ✓/✗/⚠ | [location] |
| M&S 50 | Capability assessment outcome included     | ✓/✗/⚠ | [location] |
| M&S 35 | Results assessment outcome included        | ✓/✗/⚠ | [location] |
| M&S 36 | Technical review findings included         | ✓/✗/⚠ | [location] |
| M&S 37 | Developer/operator qualifications          | ✓/✗/⚠ | [location] |
| M&S 38 | Full records per Appendix A               | ✓/✗/⚠ | [location] |
| M&S 39 | Risk assessment rationale                  | ✓/✗/⚠ | [location] |

Score: X/9 (Y%)
```

### Generate the Results Report Template

Use AskUserQuestion:
- If no report exists: RECOMMENDATION: Generate the template now — it contains all 9 required sections pre-structured
- If a partial report exists: RECOMMENDATION: Generate the template and use it to identify gaps in the existing report
- Options: A) Generate `docs/MS_RESULTS_REPORT.md`  B) Show what's missing but don't create file

When generating, read all detected artifacts (capability assessment, results assessment, risk assessment, use record) to pre-fill as much information as possible.
