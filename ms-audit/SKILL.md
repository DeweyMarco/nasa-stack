---
name: ms-audit
version: 1.0.0
description: |
  Master NASA-STD-7009B compliance audit. Full sweep of all 43 "shall" requirements
  across all 4 phases (Programmatics, Development, Use, Reporting). Produces a
  Requirements Identification Matrix and offers to generate missing artifact templates.
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

# /ms-audit: Master NASA-STD-7009B Compliance Audit

You are running a full NASA-STD-7009B ("Standard for Models and Simulations", March 2024) compliance audit of this Python M&S project. This standard has **43 "shall" requirements** across 4 phases. Your job is to check every one, report findings, and offer to generate any missing artifact templates.

This is a **report + fix** workflow. Flag every non-compliance AND offer to generate the missing artifact. Do not skip requirements.

---

## Step 1: Detect Project Structure

Survey the repository to understand what exists:

```bash
# Python source files
find . -name "*.py" -not -path "./.git/*" -not -path "./node_modules/*" | head -50
# Documentation
find . -name "*.md" -not -path "./.git/*" | head -30
# Test files
find . -name "test_*.py" -o -name "*_test.py" | grep -v ".git" | head -20
# Data files and manifests
find . -path "*/data/*" -not -path "./.git/*" | head -20
# Config and notebooks
find . -name "*.yaml" -o -name "*.yml" -o -name "*.json" -o -name "*.ipynb" | grep -v ".git" | grep -v "node_modules" | head -30
# Dependency manifests
ls requirements*.txt pyproject.toml setup.py setup.cfg 2>/dev/null
```

Note the project structure. You will reference it throughout the audit.

---

## Step 2: Phase 1 — Programmatics (Section 4.1)

Check 8 requirements. For each, search for evidence then mark ✓ / ✗ / ⚠:

**M&S 40 — Intended Use Record**
```bash
find . -name "MS_INTENDED_USE*" -o -name "INTENDED_USE*" 2>/dev/null | grep -v .git
grep -r "intended use\|intended_use\|purpose of this model\|this simulation" --include="*.py" --include="*.md" -i -l 2>/dev/null | head -5
```
✓ if `docs/MS_INTENDED_USE.md` exists OR module docstrings describe intended use. ✗ if absent.

**M&S 6 — Criticality Assessment**
```bash
find . -name "MS_CRITICALITY*" -o -name "CRITICALITY*" 2>/dev/null | grep -v .git
```
✓ if `docs/MS_CRITICALITY_ASSESSMENT.md` exists. ✗ if absent.

**M&S 41 — Life Cycle Plan**
```bash
find . -name "MS_LIFE_CYCLE*" -o -name "LIFE_CYCLE*" 2>/dev/null | grep -v .git
```
✓ if `docs/MS_LIFE_CYCLE_PLAN.md` exists. ✗ if absent.

**M&S 42 — Programmatic and Technical Metrics**
```bash
grep -r "metric\|milestone\|schedule\|budget\|performance measure" --include="*.md" -i -l 2>/dev/null | head -5
```
⚠ if only mentioned in passing; ✗ if completely absent.

**M&S 43 — Acceptance Criteria**
```bash
find . -name "MS_ACCEPTANCE*" -o -name "ACCEPTANCE_CRITERIA*" 2>/dev/null | grep -v .git
grep -r "acceptance criteria\|threshold\|pass.*fail\|credibility" --include="*.md" -i -l 2>/dev/null | head -5
```
✓ if acceptance criteria for all 5 categories are defined (43a: Verification, 43b: Validation, 43c: Uncertainty, 43d: Sensitivity, 43e: M&S assessment level thresholds). ✗ if absent.

**M&S 44 — M&S-Unique Reporting Info**
```bash
grep -r "M&S\|model.*simulation\|simulation.*model" --include="*.md" -i -l 2>/dev/null | head -5
```
⚠ if reports exist but lack M&S-specific sections.

**M&S 9 — Technical Review Records**
```bash
find . -name "*review*" -o -name "*REVIEW*" 2>/dev/null | grep -v .git | grep -v "__pycache__"
grep -r "technical review\|peer review\|review board" --include="*.md" -i -l 2>/dev/null | head -5
```
✓ if review records exist. ✗ if absent.

**M&S 51 — Defect/Problem Tracking**
```bash
ls CHANGELOG.md HISTORY.md CHANGES.md 2>/dev/null
grep -r "bug\|defect\|issue\|problem\|fix\|resolved" --include="CHANGELOG*" --include="HISTORY*" -i -l 2>/dev/null | head -5
```
✓ if CHANGELOG or issue tracker refs exist. ✗ if absent.

---

## Step 3: Phase 2 — Development (Section 4.2)

Check 15 requirements:

**M&S 10 — RWS Data with Pedigree**
```bash
find . -path "*/data/*" -not -path "./.git/*" | head -20
find . -name "DATA_MANIFEST*" -o -name "data_manifest*" -o -name "DATA_SOURCES*" 2>/dev/null | grep -v .git
```
✓ if `data/` directory has provenance documentation. ✗ if data exists with no pedigree.

**M&S 45 — Data Sets and Supporting Software**
```bash
ls requirements*.txt pyproject.toml setup.py setup.cfg 2>/dev/null
```
✓ if dependency manifest exists. ✗ if absent.

**M&S 46 — Units and Coordinate Frames**
```bash
grep -r "pint\|astropy\|unit\|units\|coordinate\|frame\|reference frame" --include="*.py" -i -l 2>/dev/null | head -10
grep -r "# units:\|# unit:\|\[m\]\|\[kg\]\|\[s\]\|\[km/s\]" --include="*.py" -l 2>/dev/null | head -10
```
⚠ if some unit annotations exist; ✗ if none.

**M&S 11 — Assumptions and Abstractions**
```bash
find . -name "ASSUMPTIONS*" 2>/dev/null | grep -v .git
grep -r "Assumptions:\|assumptions:\|assume\|abstraction" --include="*.py" --include="*.md" -i -l 2>/dev/null | head -10
```
✓ if `docs/ASSUMPTIONS.md` or dedicated `Assumptions:` docstring sections exist. ✗ if absent.

**M&S 12 — Concepts, Structures, Mathematics**
```bash
grep -r "math\|equation\|algorithm\|formula\|derivation" --include="*.py" --include="*.md" -i -l 2>/dev/null | head -10
find . -name "THEORY*" -o -name "MATH*" -o -name "CONCEPTS*" 2>/dev/null | grep -v .git
```
⚠ if math appears inline but is not documented; ✗ if undocumented.

**M&S 13 — M&S Limits**
```bash
find . -name "MS_LIMITS*" -o -name "LIMITS*" 2>/dev/null | grep -v .git
grep -r "assert\|raise.*ValueError\|valid.*range\|min.*max\|limits\|bound" --include="*.py" -l 2>/dev/null | head -10
```
✓ if `docs/MS_LIMITS.md` or input bounds are in code + documented. ✗ if absent.

**M&S 14 — Permissible Uses**
```bash
find . -name "PERMISSIBLE*" -o -name "MS_USE*" 2>/dev/null | grep -v .git
grep -r "permissible\|not intended\|do not use\|warning.*use" --include="*.md" --include="*.py" -i -l 2>/dev/null | head -5
```
✓ if `docs/PERMISSIBLE_USES.md` exists. ✗ if absent.

**M&S 15 — M&S Verified (test existence)**
```bash
find . -name "test_*.py" -o -name "*_test.py" | grep -v ".git" | wc -l
find . -name "test_*.py" -o -name "*_test.py" | grep -v ".git" | head -10
```
✓ if test files exist. ✗ if no test files found.

**M&S 16 — Domain of Verification**
```bash
grep -r "domain of verification\|verification domain\|verified for\|v&v domain" --include="*.md" -i -l 2>/dev/null | head -5
find . -name "VERIFICATION*" -o -name "V_AND_V*" -o -name "VV_*" 2>/dev/null | grep -v .git
```
✓ if domain is explicitly stated. ✗ if absent.

**M&S 17 — M&S Validated**
```bash
find . -name "VALIDATION*" -o -name "*validation*" 2>/dev/null | grep -v ".git" | grep -v "__pycache__" | head -10
grep -r "validation\|referent\|benchmark\|comparison.*data" --include="*.py" --include="*.md" -i -l 2>/dev/null | head -5
```
✓ if validation datasets or comparison scripts exist. ✗ if absent.

**M&S 18 — Domain of Validation**
```bash
grep -r "domain of validation\|validation domain\|validated for\|applicable.*range" --include="*.md" -i -l 2>/dev/null | head -5
```
✓ if validation domain is stated. ✗ if absent.

**M&S 19 — Uncertainty in Referent Data**
```bash
grep -r "referent.*uncertainty\|data.*uncertainty\|measurement.*uncertainty\|experimental.*error" --include="*.md" --include="*.py" -i -l 2>/dev/null | head -5
```
⚠ if mentioned; ✗ if absent.

**M&S 21 — Uncertainties in M&S Output**
```bash
grep -r "uncertainty\|confidence interval\|error bar\|standard deviation\|monte carlo" --include="*.py" --include="*.md" -i -l 2>/dev/null | head -10
```
⚠ if present in code but not documented; ✗ if absent.

**M&S 47 — Usage Guidance**
```bash
ls README.md README.rst docs/README* 2>/dev/null
grep -r "setup\|installation\|how to run\|usage\|getting started" --include="README*" --include="*.md" -i -l 2>/dev/null | head -5
```
✓ if README with setup, execution, and analysis instructions exists. ✗ if absent.

**M&S 48 — M&S Capability Assessment**
```bash
find . -name "MS_CAPABILITY*" -o -name "CAPABILITY_ASSESSMENT*" 2>/dev/null | grep -v .git
```
✓ if `docs/MS_CAPABILITY_ASSESSMENT.md` exists. ✗ if absent.

---

## Step 4: Phase 3 — Use (Section 4.3)

Check 11 requirements:

**M&S 22 — Proposed Use Record**
```bash
find . -name "MS_USE_RECORD*" -o -name "USE_RECORD*" 2>/dev/null | grep -v .git
find . -name "*.ipynb" 2>/dev/null | grep -v .git | head -10
```
✓ if use records or run notebooks with purpose exist. ✗ if absent.

**M&S 23 — Use Appropriateness Assessment**
```bash
grep -r "use.*assessment\|appropriateness\|within.*domain\|outside.*domain" --include="*.md" -i -l 2>/dev/null | head -5
```
✗ if no evidence proposed use was compared to permissible use.

**M&S 24 — Inputs and Pedigrees**
```bash
find . -name "*.yaml" -o -name "*.json" -o -name "*.cfg" -o -name "*.ini" | grep -v ".git" | grep -v node_modules | head -10
grep -r "input.*pedigree\|data.*source\|data.*provenance" --include="*.md" --include="*.yaml" -i -l 2>/dev/null | head -5
```
⚠ if config files exist without provenance; ✗ if no input records at all.

**M&S 25 — Setup and Execution Rationale**
```bash
find . -name "*.ipynb" 2>/dev/null | grep -v .git | head -10
grep -r "rationale\|reason.*for\|justification\|why.*this" --include="*.md" --include="*.ipynb" -i -l 2>/dev/null | head -5
```
⚠ if execution scripts exist without rationale. ✗ if absent.

**M&S 26 — Used Within V&V Domains**
```bash
grep -r "within.*domain\|outside.*domain\|placard\|warning.*use.*outside" --include="*.md" --include="*.py" -i -l 2>/dev/null | head -5
```
⚠ if no domain check at runtime. ✗ if no mention anywhere.

**M&S 27 — Warning/Error Messages Observed**
```bash
grep -r "import logging\|logging\.\|log\.\(warn\|error\|info\)" --include="*.py" -l 2>/dev/null | head -10
grep -r "try:\|except\|raise" --include="*.py" -l 2>/dev/null | head -10
```
✓ if logging and exception handling exist. ✗ if bare code with no error capture.

**M&S 28 — Uncertainty Characterization Process**
```bash
find . -name "UNCERTAINTY*" 2>/dev/null | grep -v .git
grep -r "uncertainty.*process\|uncertainty.*method\|how.*uncertainty\|UQ\|uncertainty quantification" --include="*.md" --include="*.py" -i -l 2>/dev/null | head -5
```
✗ if no uncertainty characterization process documented.

**M&S 29 — Quantified Uncertainties in Results**
```bash
grep -r "std\|variance\|confidence\|bounds\|interval\|±\|+/-\|percent.*error\|relative.*error" --include="*.py" --include="*.md" -i -l 2>/dev/null | head -10
```
⚠ if computed in code but not reported; ✗ if absent.

**M&S 30 — Sensitivity Analysis**
```bash
find . -name "SENSITIVITY*" 2>/dev/null | grep -v .git
grep -r "sensitivity\|parameter.*sweep\|monte carlo\|sobol\|parameter.*study" --include="*.py" --include="*.md" -i -l 2>/dev/null | head -5
```
✓ if sensitivity analysis exists and is documented. ✗ if absent.

**M&S 31 — M&S Results Assessment**
```bash
find . -name "MS_RESULTS_ASSESSMENT*" -o -name "RESULTS_ASSESSMENT*" 2>/dev/null | grep -v .git
```
✓ if a results assessment per Appendix E exists. ✗ if absent.

**M&S 49 — Risk Assessment for M&S Use**
```bash
find . -name "MS_RISK*" -o -name "RISK_ASSESSMENT*" 2>/dev/null | grep -v .git
grep -r "risk\|consequence\|hazard\|mitigation" --include="*.md" -i -l 2>/dev/null | head -5
```
✗ if no risk assessment exists.

---

## Step 5: Phase 4 — Reporting (Section 4.3.8)

Check 9 requirements by scanning any existing reports:

```bash
find . -name "*report*" -o -name "*REPORT*" -o -name "MS_RESULTS*" 2>/dev/null | grep -v .git | grep "\.md\|\.pdf\|\.docx\|\.txt"
```

For each found report, check for:
- **M&S 32** — Explicit warnings for all 8 violation categories
- **M&S 33** — Uncertainty estimate (quantitative, qualitative, or "none available")
- **M&S 34** — Uncertainty process description
- **M&S 50** — M&S capability assessment outcome included
- **M&S 35** — M&S results assessment outcome
- **M&S 36** — Technical review findings
- **M&S 37** — Developer and operator qualifications
- **M&S 38** — Full records per Appendix A
- **M&S 39** — Risk assessment rationale

If no report exists: all 9 are ✗.

---

## Step 6: Build the Requirements Identification Matrix

Output a full compliance matrix in this format:

```
# NASA-STD-7009B Requirements Identification Matrix
## Project: [project name from README or directory name]
## Date: [today]

| Req ID | Phase        | Requirement Summary                         | Status | Evidence Location |
|--------|--------------|---------------------------------------------|--------|-------------------|
| M&S 40 | Programmatics| Intended use record                         | ✗      | Not found         |
| M&S 6  | Programmatics| Criticality assessment                      | ✓      | docs/MS_CRITICALITY_ASSESSMENT.md |
...
```

Use ✓ (compliant), ✗ (non-compliant), ⚠ (partial/unclear).

At the bottom, include:
- **Compliance score:** X of 43 requirements met (Y%)
- **Critical gaps:** List requirements that are ✗ and carry high risk
- **Recommended fix order:** Prioritize by phase (Programmatics → Development → Use → Reporting) and criticality

---

## Step 7: Offer to Generate Missing Artifacts

For each ✗ requirement that has a corresponding artifact template, offer to generate it.

Use AskUserQuestion:
- List all missing artifacts with their requirement IDs
- RECOMMENDATION: Generate all (it's fast and gives you compliant stubs to fill in)
- Options: A) Generate all missing artifacts  B) Select specific ones  C) Report only

If the user chooses A or B, create each missing artifact in the `docs/` directory using the corresponding template from the skill's templates/ directory. Adapt placeholders to the project's actual name, structure, and detected content.

**Artifact-to-requirement mapping:**
| Artifact | Requirements covered |
|----------|---------------------|
| `docs/MS_INTENDED_USE.md` | M&S 40 |
| `docs/MS_CRITICALITY_ASSESSMENT.md` | M&S 6 |
| `docs/MS_LIFE_CYCLE_PLAN.md` | M&S 41 |
| `docs/MS_ACCEPTANCE_CRITERIA.md` | M&S 42, 43, 44 |
| `docs/ASSUMPTIONS.md` | M&S 11, 12 |
| `docs/MS_LIMITS.md` | M&S 13 |
| `docs/PERMISSIBLE_USES.md` | M&S 14 |
| `docs/VALIDATION_REPORT.md` | M&S 17, 18, 19 |
| `docs/MS_CAPABILITY_ASSESSMENT.md` | M&S 48, M&S 50 |
| `docs/MS_USE_RECORD.md` | M&S 22, 23, 25 |
| `docs/UNCERTAINTY_CHARACTERIZATION.md` | M&S 28, 29 |
| `docs/SENSITIVITY_ANALYSIS.md` | M&S 30 |
| `docs/MS_RESULTS_ASSESSMENT.md` | M&S 31, 35 |
| `docs/MS_RISK_ASSESSMENT.md` | M&S 49 |
| `docs/MS_RESULTS_REPORT.md` | M&S 32–39, 50 |

---

## Output Format

End with a summary section:

```
## Audit Summary
- **Compliant:** X/43 requirements
- **Non-compliant:** Y requirements (listed)
- **Partial:** Z requirements (listed)
- **Artifacts generated:** N files created in docs/

### Next Steps (in priority order):
1. Run /ms-criticality to establish criticality level (M&S 6) — this affects rigor required for all other requirements
2. Run /ms-programmatics for deep dive on Section 4.1 gaps
3. Run /ms-development for Section 4.2 code-level analysis
4. Run /ms-credibility for Appendix E scoring
```
