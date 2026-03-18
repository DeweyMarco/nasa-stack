---
name: nasa-ms-compliance
version: 1.0.0
description: |
  NASA-STD-7009B Models and Simulations compliance skills package. Covers all 43 "shall"
  requirements across Programmatics (Section 4.1), Development (Section 4.2), Use
  (Section 4.3), and Reporting (Section 4.3.8). Python M&S projects. Report + fix workflow:
  flags non-compliance and generates missing artifact templates.
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

# NASA-STD-7009B M&S Compliance Skills

A set of 7 skills for assessing and achieving compliance with NASA-STD-7009B ("Standard for Models and Simulations", March 2024) for Python M&S projects.

---

## Available Skills

### `/ms-audit` — Master Compliance Audit (Start here)
Full sweep of all **43 "shall" requirements** across all 4 phases. Produces a Requirements Identification Matrix and offers to generate missing artifacts.

```
/ms-audit
```

### `/ms-programmatics` — Section 4.1 (8 requirements)
Checks intended use, criticality, life cycle plan, metrics, acceptance criteria, reporting info, technical reviews, and defect tracking.

### `/ms-development` — Section 4.2 (15 requirements)
Checks data pedigree, units, assumptions, governing equations, limits, permissible uses, V&V, uncertainty, and usage guidance. Python-specific scans.

### `/ms-use` — Section 4.3 (11 requirements)
Checks use records, appropriateness assessment, input pedigree, setup rationale, domain compliance, error logging, uncertainty characterization, sensitivity analysis, and risk assessment.

### `/ms-reporting` — Section 4.3.8 (9 requirements)
Checks results reports for all required elements: 8-category warnings, uncertainty estimates, capability/results assessment outcomes, qualifications, and Appendix A records.

### `/ms-credibility` — Appendix E Scoring
Interactive 11-factor credibility scoring (5 capability + 6 results) on a 0–4 scale. Produces a scored assessment with gap analysis vs. acceptance thresholds.

### `/ms-criticality` — Appendix D Criticality Matrix
Interactive 3×3 criticality matrix (Decision Consequence × M&S Influence). Produces a criticality level (Low/Medium/High/Safety-Critical) that calibrates required rigor for all other requirements.

---

## Recommended Workflow

**New project (no compliance artifacts yet):**
1. `/ms-criticality` — Establish criticality level (determines required rigor)
2. `/ms-audit` — Full sweep: see where you stand on all 43 requirements
3. Accept generated artifacts → fill in project-specific details
4. `/ms-credibility` — Score Appendix E factors; identify gaps
5. Close gaps → re-run `/ms-audit` to confirm compliance

**Existing project (preparing for review):**
1. `/ms-audit` — Current status check
2. Run specific phase skills for deep dives on failing areas
3. `/ms-credibility` — Score for results report (required by M&S 50, 35)
4. `/ms-reporting` — Verify results reports include all required elements

---

## Standard Summary: NASA-STD-7009B

| Phase | Section | Requirements |
|-------|---------|-------------|
| Programmatics | 4.1 | M&S 40, 6, 41, 42, 43, 44, 9, 51 (8 total) |
| Development | 4.2 | M&S 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 45, 46, 47, 48 (15 total) |
| Use | 4.3 | M&S 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 49 (11 total) |
| Reporting | 4.3.8 | M&S 32, 33, 34, 35, 36, 37, 38, 39, 50 (9 total) |
| **Total** | | **43 requirements** |

The standard also includes:
- **Appendix D** — Criticality Matrix (`/ms-criticality`)
- **Appendix E** — Credibility Assessment Framework (`/ms-credibility`)

---

## Python Code Scanning

Skills scan these artifact types for compliance evidence:

| Artifact | Requirements covered |
|----------|---------------------|
| Module docstrings | M&S 11, 12, 40 |
| `pint`/`astropy` unit annotations | M&S 46 |
| `assert`/`raise`/bounds checks | M&S 13, 26 |
| `logging.*` calls | M&S 27 |
| `test_*.py` / `*_test.py` | M&S 15, 17 |
| `data/` manifests | M&S 10, 24, 45 |
| `requirements.txt` / `pyproject.toml` | M&S 45 |
| `docs/*.md` | All |
| `*.ipynb` notebooks | M&S 22, 25 |
| `*.yaml` / `*.json` configs | M&S 24, 25 |
| `CHANGELOG.md` / `HISTORY.md` | M&S 51 |
