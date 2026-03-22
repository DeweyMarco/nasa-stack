---
name: ms-use
version: 1.0.0
description: |
  NASA-STD-7009B Section 4.3 compliance check — 11 Use requirements covering proposed use,
  input pedigree, uncertainty characterization, sensitivity analysis, results assessment,
  and risk assessment. Scans Python scripts, notebooks, and config files.
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

# /ms-use: Section 4.3 Use Compliance

You are checking NASA-STD-7009B **Section 4.3 — M&S Use** requirements for this Python M&S project. There are **11 "shall" requirements**. The Use phase covers every time the M&S is run to support a decision. Each use instance should be documented.

---

## Step 0: Survey Use Artifacts

```bash
# Run scripts, notebooks, config files
find . \( -name "run_*.py" -o -name "execute_*.py" -o -name "*.ipynb" \
  -o -name "*.yaml" -o -name "*.yml" -o -name "*.json" \) \
  -not -path "./.git/*" -not -path "./node_modules/*" | head -30
# Use records
find . \( -name "MS_USE_RECORD*" -o -name "USE_RECORD*" -o -name "RUN_LOG*" \) \
  -not -path "./.git/*" 2>/dev/null
# Risk and assessment docs
find . \( -name "MS_RISK*" -o -name "RISK*" -o -name "MS_RESULTS*" \) \
  -not -path "./.git/*" -name "*.md" 2>/dev/null | head -10
```

---

## Step 1: M&S 22 — Proposed Use Record Maintained

*"The M&S user shall maintain a record of the proposed use of the M&S."*

```bash
find . \( -name "MS_USE_RECORD*" -o -name "USE_RECORD*" -o -name "PROPOSED_USE*" \) \
  -not -path "./.git/*" 2>/dev/null
# Check notebooks for purpose descriptions
find . -name "*.ipynb" -not -path "./.git/*" 2>/dev/null | head -5
```

If any notebooks exist, read the first cell of each and check for a stated purpose.

**Compliant if:** A `docs/MS_USE_RECORD.md` exists, OR each run notebook/script begins with a clear statement of the decision it supports and the question being answered.

---

## Step 2: M&S 23 — Use Appropriateness Assessment

*"The M&S user shall assess the appropriateness of M&S use for the proposed application."*

```bash
grep -r "appropriateness\|within.*domain\|outside.*domain\|use.*appropriate\|proposed.*use.*vs\|permissible.*use" \
  --include="*.md" --include="*.ipynb" --include="*.py" -i -l 2>/dev/null | head -5
find . \( -name "PERMISSIBLE*" -o -name "MS_LIMITS*" \) -not -path "./.git/*" 2>/dev/null
```

**Compliant if:** Evidence exists that the proposed use was compared against the permissible uses (M&S 14) and the V&V domains (M&S 16, 18) before running.

---

## Step 3: M&S 24 — Inputs and Their Pedigrees Recorded

*"The M&S user shall record the inputs to the M&S and their pedigrees."*

```bash
# Config files that might contain inputs
find . \( -name "*.yaml" -o -name "*.yml" -o -name "*.json" -o -name "*.cfg" -o -name "*.ini" \) \
  -not -path "./.git/*" -not -path "./node_modules/*" | head -20
# Check for input documentation
grep -r "input.*pedigree\|input.*source\|input.*provenance\|parameter.*source\|where.*this.*value" \
  --include="*.md" --include="*.yaml" --include="*.py" -i -l 2>/dev/null | head -5
```

Read any config/input files found. Check whether they document the source and uncertainty of each input value.

**Compliant if:** Input files or run records document the source, date, and uncertainty of each input parameter.
**Partial if:** Inputs are recorded but provenance is missing.

---

## Step 4: M&S 25 — Setup and Execution Rationale Recorded

*"The M&S user shall record the setup and execution rationale for each use."*

```bash
# Run scripts
find . \( -name "run_*.py" -o -name "execute_*.py" -o -name "main.py" \) \
  -not -path "./.git/*" 2>/dev/null | head -10
# Check notebooks for rationale
find . -name "*.ipynb" -not -path "./.git/*" 2>/dev/null | head -5
grep -r "rationale\|reason.*for.*setting\|why.*this.*configuration\|because\|in order to" \
  --include="*.py" --include="*.md" -i -l 2>/dev/null | head -5
# Check MS_USE_RECORD.md Inputs section for [PLACEHOLDER]
grep -n "\[PLACEHOLDER\]" docs/MS_USE_RECORD.md 2>/dev/null | head -5
```

If MS_USE_RECORD.md exists but its "Inputs" section contains [PLACEHOLDER] values, treat as ⚠ (stub generated but not filled in).

If MS_USE_RECORD.md is absent: when generating the stub, scan run scripts and notebooks for config variables and pre-fill the Inputs table with detected parameter names and values. Look for patterns like:
```bash
grep -rn "=\s*[0-9]\|config\['\|params\['\|args\." \
  --include="run_*.py" --include="execute_*.py" --include="main.py" 2>/dev/null | head -20
```

**Compliant if:** Run scripts or notebooks include comments or prose explaining why specific parameter values, boundary conditions, or time steps were chosen.

---

## Step 5: M&S 26 — Used Within V&V Domains or Placarded

*"The M&S user shall use the M&S within its verification and validation domains, or placard results with warnings."*

```bash
grep -r "domain.*check\|within.*valid\|outside.*valid\|warning.*beyond\|placard\|extrapolation.*warning" \
  --include="*.py" --include="*.md" -i -l 2>/dev/null | head -5
# Check for runtime domain checks in code
grep -rn "if.*outside\|if.*beyond\|warn.*domain\|warn.*range\|UserWarning\|validate_inputs\|assert\|raise ValueError\|raise RuntimeError\|np\.clip\|warnings\.warn" \
  --include="*.py" 2>/dev/null | head -20
```

After running bounds/enforcement grep, perform enforcement analysis:

1. Classify each match found:
   - HARD: `raise ValueError` / `raise RuntimeError` — stops execution. Best.
   - SOFT: `warnings.warn` — non-fatal, may go unnoticed in automated pipelines.
   - ASSERT: `assert` — disabled by Python's `-O` flag. Risky for production M&S.
   - SILENT: `np.clip` / `np.where` — silently modifies values without notifying
     the caller. Non-compliant with M&S 13 (limit shall be documented AND enforced
     visibly).

2. For each ASSERT match: read the matching file at the reported line. Output:
   - The existing assert line (verbatim from the file)
   - The recommended replacement with the parameter name already substituted:
     ```python
     # CURRENT (risky — disabled with python -O):
     assert velocity >= 0, "velocity must be non-negative"
     # RECOMMENDED (NASA M&S 13 compliant):
     if velocity < 0:
         raise ValueError(
             f"velocity={velocity} outside valid range [0, ∞). "
             f"See docs/MS_LIMITS.md for applicability domain."
         )
     ```

3. For each SILENT (`np.clip`/`np.where`) match: flag it with:
   "np.clip silently modifies values — callers receive no warning. Consider
   raising ValueError before clipping OR issuing warnings.warn after."

4. Cross-reference with MS_LIMITS.md (if it exists):
   a. Check if MS_LIMITS.md contains [PLACEHOLDER] values — if yes, treat as ⚠
      not ✓ (stub generated but not filled in).
   b. Read the parameter names from column 1 of the limits table.
   c. For each documented parameter, search for its name in the bounds grep hits.
   d. If a documented parameter has no matching enforcement: flag as "documented
      but not enforced in code."
   e. If names don't match between docs and code, explicitly note: "Parameter name
      mismatch possible — confirm whether [doc_name] corresponds to [code_name]."
      Do NOT report ✗ on a name mismatch alone.

5. If MS_LIMITS.md is missing OR empty: scan Python files for function signatures
   and type annotations (`def func(param: float, ...)`) to extract candidate
   parameter names. Pre-fill the limits table in the generated MS_LIMITS.md with
   these names and types, leaving Min/Max/Units/Justification blank for the human.
   Also scan for `.ipynb` files with the same grep patterns.

6. Output the enforcement analysis result explicitly (even on clean pass):
   - Issues found: "Enforcement analysis: 3 assert-only checks found (see
     recommended replacements below). 1 documented limit has no code enforcement."
   - Clean pass: "Enforcement analysis: found N hard enforcement checks
     (raise ValueError/RuntimeError). All documented limits in MS_LIMITS.md
     have corresponding code enforcement. No action needed."

If no `validate_inputs()` function or guard clause is found before model execution, output this recommended pre-execution validation pattern (adapt parameter names to those detected in the scanned run scripts):

```python
# RECOMMENDED pre-execution validation pattern (NASA-STD-7009B M&S 26):
def validate_inputs(params: dict, limits_path: str = "docs/MS_LIMITS.md") -> None:
    """Verify inputs are within the V&V domain before model execution.
    Raises ValueError if any parameter is outside its documented valid range.
    See NASA-STD-7009B M&S 26.
    """
    if params["altitude_km"] > 100:
        raise ValueError(
            f"altitude_km={params['altitude_km']} exceeds V&V domain (0–100 km). "
            f"Results beyond this range are extrapolations. See {limits_path}."
        )
```

**Compliant if:** Code checks input parameters against the V&V domain at runtime using HARD enforcement (`raise ValueError`/`raise RuntimeError`) and raises errors when outside, OR run records explicitly confirm the use was within the validated domain.
**Partial if:** Only SOFT (`warnings.warn`) or ASSERT enforcement found, or domain check exists but is incomplete.
**Non-compliant if:** No domain check at runtime and no run record confirming domain compliance.

---

## Step 6: M&S 27 — Warning/Error Messages Observed and Recorded

*"The M&S user shall observe and record all M&S-generated warning and error messages."*

```bash
# Logging setup
grep -r "import logging\|logging\.basicConfig\|logger\s*=" --include="*.py" -l 2>/dev/null | head -10
# Warning/error handling
grep -rn "logging\.warning\|logging\.error\|warnings\.warn\|print.*WARNING\|print.*ERROR" \
  --include="*.py" 2>/dev/null | head -15
# Check if run logs are captured
find . \( -name "*.log" -o -name "run_*.txt" -o -name "output_*.txt" \) \
  -not -path "./.git/*" 2>/dev/null | head -5
```

**Compliant if:** The M&S uses Python's `logging` module (not bare `print`), log files are captured during runs, and run records note any warnings observed.

---

## Step 7: M&S 28 — Uncertainty Characterization Processes Recorded

*"The M&S user shall record the uncertainty characterization processes for inputs and results."*

```bash
find . \( -name "UNCERTAINTY*" -o -name "UQ*" \) -not -path "./.git/*" -name "*.md" 2>/dev/null
grep -r "uncertainty.*method\|uncertainty.*process\|how.*uncertainty\|UQ.*approach\|Monte Carlo.*approach\|sensitivity.*approach" \
  --include="*.md" --include="*.py" -i -l 2>/dev/null | head -5
```

**Compliant if:** A document describes the method used to characterize input and output uncertainties (e.g., Monte Carlo, interval analysis, polynomial chaos, expert elicitation).

---

## Step 8: M&S 29 — Quantified Uncertainties in Inputs, Results, and Derived Quantities

*"The M&S user shall quantify the uncertainties in inputs, results, and derived quantities."*

```bash
# UQ libraries
grep -r "import uncertainties\|from uncertainties\|import chaospy\|import SALib\|scipy.stats" \
  --include="*.py" -l 2>/dev/null | head -5
# Statistical output
grep -rn "std\(\|var\(\|confidence_interval\|percentile\|quantile\|std_dev\|±\|+/-" \
  --include="*.py" 2>/dev/null | head -15
```

**Compliant if:** Uncertainty estimates (with values and units) are computed and appear in results outputs or run records.
**Non-compliant if:** Results are reported as point values with no uncertainty bounds.

---

## Step 9: M&S 30 — Sensitivity Analysis Extent and Results Recorded

*"The M&S user shall record the extent and results of sensitivity analyses."*

```bash
find . \( -name "SENSITIVITY*" -o -name "sensitivity_*" \) -not -path "./.git/*" | head -5
grep -r "sensitivity\|parameter.*sweep\|sobol\|one.*at.*a.*time\|OAT\|Morris.*method\|FAST" \
  --include="*.py" --include="*.md" -i -l 2>/dev/null | head -10
```

**Compliant if:** Sensitivity analysis results (which inputs most affect outputs, by how much) are documented and referenced in the use record.

---

## Step 10: M&S 31 — M&S Results Assessment Maintained

*"The M&S user shall maintain an M&S results assessment."*

The results assessment uses 6 factors from Appendix E:
1. Use Assessment (proposed vs. permissible)
2. Input Pedigree
3. Uncertainty Characterization
4. Results Robustness
5. Use/Analysis Technical Review
6. Use Process/Product Management

```bash
find . \( -name "MS_RESULTS_ASSESSMENT*" -o -name "RESULTS_ASSESSMENT*" \) \
  -not -path "./.git/*" 2>/dev/null
```

**Compliant if:** A results assessment document scoring all 6 factors exists. Run `/ms-credibility` for interactive scoring.

---

## Step 11: M&S 49 — Risk Assessment for M&S Use

*"The M&S user shall maintain a risk assessment for M&S use."*

```bash
find . \( -name "MS_RISK*" -o -name "RISK_ASSESSMENT*" \) -not -path "./.git/*" 2>/dev/null
grep -r "risk.*assess\|probability.*failure\|consequence.*if.*wrong\|decision.*risk\|risk.*mitigation" \
  --include="*.md" -i -l 2>/dev/null | head -5
```

**Compliant if:** A risk assessment exists identifying the risks of using this M&S for the proposed decision, consequences if the M&S produces incorrect results, and mitigations.

---

## Step 12: Report and Generate Artifacts

### Compliance Summary

Output:

```
## Section 4.3 — Use Compliance

| Req    | Requirement                                | Status | Evidence |
|--------|--------------------------------------------|--------|----------|
| M&S 22 | Proposed use record maintained             | ✓/✗/⚠ | [location] |
| M&S 23 | Use appropriateness assessed               | ✓/✗/⚠ | [location] |
| M&S 24 | Inputs and pedigrees recorded              | ✓/✗/⚠ | [location] |
| M&S 25 | Setup and execution rationale recorded     | ✓/✗/⚠ | [location] |
| M&S 26 | Used within V&V domain or placarded        | ✓/✗/⚠ | [location] |
| M&S 27 | Warning/error messages observed+recorded  | ✓/✗/⚠ | [location] |
| M&S 28 | Uncertainty characterization process       | ✓/✗/⚠ | [location] |
| M&S 29 | Quantified uncertainties in results        | ✓/✗/⚠ | [location] |
| M&S 30 | Sensitivity analysis recorded              | ✓/✗/⚠ | [location] |
| M&S 31 | M&S results assessment maintained         | ✓/✗/⚠ | [location] |
| M&S 49 | Risk assessment maintained                 | ✓/✗/⚠ | [location] |

Score: X/11 (Y%)
```

### Generate Missing Artifacts

Use AskUserQuestion:
- List all ✗ requirements and their corresponding missing artifacts
- RECOMMENDATION: Generate all missing artifacts
- Options: A) Generate all missing  B) Select specific  C) Report only

**Available artifacts:**
- `docs/MS_USE_RECORD.md` (M&S 22, 23, 25)
- `docs/UNCERTAINTY_CHARACTERIZATION.md` (M&S 28, 29)
- `docs/SENSITIVITY_ANALYSIS.md` (M&S 30)
- `docs/MS_RESULTS_ASSESSMENT.md` (M&S 31)
- `docs/MS_RISK_ASSESSMENT.md` (M&S 49)

When generating, pre-fill project-specific content by reading detected run scripts, notebooks, and config files.
