---
name: ms-development
version: 1.0.0
description: |
  NASA-STD-7009B Section 4.2 compliance check — 15 Development requirements covering
  V&V, data pedigree, units, assumptions, limits, validation, and uncertainty. Python-specific
  checks. Generates missing artifact templates.
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

# /ms-development: Section 4.2 Development Compliance

You are checking NASA-STD-7009B **Section 4.2 — M&S Development** requirements for this Python M&S project. There are **15 "shall" requirements**. This section covers all development-phase activities: data, assumptions, verification, validation, and uncertainty characterization.

---

## Step 0: Survey the Project

```bash
# All Python files
find . -name "*.py" -not -path "./.git/*" -not -path "./*env/*" | sort | head -50
# Documentation
find . -name "*.md" -not -path "./.git/*" | sort
# Tests
find . \( -name "test_*.py" -o -name "*_test.py" \) -not -path "./.git/*"
# Data
find . -path "*/data/*" -not -path "./.git/*" | head -20
```

---

## Step 1: M&S 10 — RWS Characteristics and Data Pedigree

*"The M&S developer shall maintain a record of relevant characteristics, including data, of the RWS to be modeled, including its pedigree."*

Note: M&S 10 is about characterizing the **Real World System (RWS) being modeled** — its relevant properties, behaviors, and the data describing it — along with the pedigree of that data. This is broader than just listing data files; it should capture what aspects of the RWS the M&S represents and how faithfully the characterization data reflects the actual system.

```bash
# Check for RWS characterization docs
find . \( -name "RWS*" -o -name "REAL_WORLD*" -o -name "SYSTEM_DESCRIPTION*" \
  -o -name "DATA_MANIFEST*" -o -name "data_manifest*" -o -name "DATA_SOURCES*" \
  -o -name "DATA_PROVENANCE*" \) -not -path "./.git/*" 2>/dev/null
find . -path "*/data/*" -name "*.md" -not -path "./.git/*" 2>/dev/null
# Check for RWS/data characterization in code or docs
grep -r "real.*world\|RWS\|system.*characteristic\|data.*source\|data.*origin\|provenance\|pedigree\|obtained from" \
  --include="*.py" --include="*.md" -i -l 2>/dev/null | head -10
```

**Compliant if:** Documentation exists describing the relevant characteristics of the real-world system being modeled AND the pedigree of data used to characterize it (source, date, version, uncertainty). A data manifest alone is partial if it doesn't address what RWS properties it characterizes.

---

## Step 2: M&S 45 — Data Sets and Supporting Software Maintained

*"The M&S developer shall maintain the data sets and supporting software used in M&S development."*

```bash
ls requirements*.txt pyproject.toml setup.py setup.cfg Pipfile 2>/dev/null
cat requirements*.txt 2>/dev/null | head -30
grep -r "\[tool.poetry\]\|\[project\]\|\[dependencies\]" pyproject.toml 2>/dev/null | head -10
```

**Compliant if:** A dependency manifest (requirements.txt, pyproject.toml, etc.) exists and is up to date. Data sets are version-controlled or referenced with version numbers.

---

## Step 3: M&S 46 — Units and Coordinate Frames Documented

*"The M&S developer shall document the units of measure and coordinate frames used in the M&S."*

```bash
# Check for unit libraries
grep -r "import pint\|from pint\|import astropy\|from astropy\|import quantities" \
  --include="*.py" -l 2>/dev/null | head -10
# Check for unit comments/annotations
grep -rn "# unit\|# units\|\[m\]\|\[kg\]\|\[s\]\|\[km\]\|\[rad\]\|units=" \
  --include="*.py" 2>/dev/null | head -20
# Check for coordinate frame docs
grep -r "coordinate.*frame\|reference frame\|ECI\|ECEF\|J2000\|ICRF\|inertial\|body.*frame" \
  --include="*.py" --include="*.md" -i -l 2>/dev/null | head -10
find . -name "UNITS*" -o -name "COORDINATES*" 2>/dev/null | grep -v .git
```

Read the main Python module(s) and assess whether physical quantities have units documented (inline, via pint/astropy, or in a units table).

**Compliant if:** All physical quantities have documented units (via library, comments, or a units reference document) AND coordinate frames are identified.
**Partial if:** Some quantities have units, others don't.
**Non-compliant if:** No unit information anywhere.

If missing: Identify the top-level functions/classes and output a stub annotation block for each one showing where units need to be added.

---

## Step 4: M&S 11 — Assumptions and Abstractions Recorded

*"The M&S developer shall record the assumptions and abstractions used in the M&S."*

```bash
find . \( -name "ASSUMPTIONS*" -o -name "assumptions*" \) -not -path "./.git/*" 2>/dev/null
# Check Python docstrings for Assumptions sections
grep -rn "Assumptions:\|assumptions:\|Assumes\|Note:.*assume\|# Assumption" \
  --include="*.py" 2>/dev/null | head -20
grep -r "assumption\|abstraction\|simplification\|approximation" \
  --include="*.py" --include="*.md" -i -l 2>/dev/null | head -10
```

**Compliant if:** `docs/ASSUMPTIONS.md` exists listing each assumption with justification, OR all significant assumptions are documented in docstrings with explicit `Assumptions:` sections.

---

## Step 5: M&S 12 — Concepts, Structures, Mathematics Documented

*"The M&S developer shall document the physical and mathematical concepts, governing equations, and structures used in the M&S."*

```bash
find . \( -name "THEORY*" -o -name "MATH*" -o -name "EQUATIONS*" -o -name "CONCEPTS*" \
  -o -name "MODEL_DESCRIPTION*" \) -not -path "./.git/*" 2>/dev/null
grep -r "equation\|governing\|formula\|derivation\|LaTeX\|math::" \
  --include="*.py" --include="*.md" -i -l 2>/dev/null | head -10
```

Read the main simulation module(s) and check whether the governing equations are explained. Look for docstrings that describe the mathematics implemented.

**Compliant if:** A conceptual model document exists, OR module/function docstrings explain the governing equations and references (e.g., "Implements Eq. 4.12 from [Author, Year]").

---

## Step 6: M&S 13 — M&S Limits Documented

*"The M&S developer shall document the limits of applicability of the M&S."*

```bash
find . \( -name "MS_LIMITS*" -o -name "LIMITS*" \) -not -path "./.git/*" 2>/dev/null
# Check for bounds/limit enforcement in code
grep -rn "assert\|raise ValueError\|raise.*Error\|if.*<.*:\|if.*>.*:\|np.clip\|np.where" \
  --include="*.py" 2>/dev/null | head -20
grep -r "valid.*range\|input.*bound\|limit\|maximum\|minimum\|not.*valid.*for" \
  --include="*.py" --include="*.md" -i -l 2>/dev/null | head -10
```

**Compliant if:** `docs/MS_LIMITS.md` explicitly states input/output limits and conditions under which the model is NOT valid, AND the code enforces these limits (asserts, raises, or warnings).

---

## Step 7: M&S 14 — Permissible Uses Recorded

*"The M&S developer shall record the permissible uses of the M&S."*

```bash
find . \( -name "PERMISSIBLE*" -o -name "MS_PERMISSIBLE*" \) -not -path "./.git/*" 2>/dev/null
grep -r "permissible\|not intended\|do not use\|inappropriate\|approved.*for\|cleared.*for" \
  --include="*.md" --include="*.py" -i -l 2>/dev/null | head -10
```

**Compliant if:** `docs/PERMISSIBLE_USES.md` exists, listing what the M&S may and may NOT be used for. This is distinct from intended use — it enumerates explicit use cases that have been approved.

---

## Step 8: M&S 15 — M&S Verified (Test Existence)

*"The M&S developer shall verify the M&S."*

```bash
find . \( -name "test_*.py" -o -name "*_test.py" \) -not -path "./.git/*" -not -path "./*env/*"
echo "---"
# Count test functions
grep -r "def test_" --include="*.py" --include="test_*.py" 2>/dev/null | wc -l
echo "test functions found"
# Check test runner config
ls pytest.ini setup.cfg tox.ini pyproject.toml 2>/dev/null | xargs grep -l "pytest\|unittest" 2>/dev/null
```

**Compliant if:** Test files exist with meaningful test coverage of the M&S logic (not just import tests).
**Non-compliant if:** No test files found.

If non-compliant: Note that verification requires systematic testing against known solutions, convergence studies, or code comparisons.

---

## Step 9: M&S 16 — Domain of Verification Recorded

*"The M&S developer shall record the domain of verification for the M&S."*

```bash
grep -r "domain of verification\|verification domain\|verified for\|verified.*range\|verified.*condition" \
  --include="*.md" -i -l 2>/dev/null | head -5
find . -name "VERIFICATION*" -o -name "V_AND_V*" -o -name "VV_*" 2>/dev/null | grep -v .git | head -5
```

**Compliant if:** A document explicitly states what conditions, parameter ranges, and code modules have been verified (and tested). Often this is a section in VALIDATION_REPORT.md.

---

## Step 10: M&S 17 — M&S Validated

*"The M&S developer shall validate the M&S."*

```bash
find . \( -name "VALIDATION*" -o -name "*validation*" \) -not -path "./.git/*" \
  -not -path "./*__pycache__*" | head -10
# Check for comparison scripts or notebooks
grep -r "comparison\|referent\|experimental.*data\|measured.*data\|benchmark\|analytical.*solution" \
  --include="*.py" --include="*.ipynb" --include="*.md" -i -l 2>/dev/null | head -10
```

**Compliant if:** Validation data (experimental measurements, analytical solutions, or higher-fidelity model outputs) exists and comparison scripts/notebooks exist.

---

## Step 11: M&S 18 — Domain of Validation Recorded

*"The M&S developer shall record the domain of validation for the M&S."*

```bash
grep -r "domain of validation\|validation domain\|validated for\|valid.*for.*range\|applicable.*to" \
  --include="*.md" -i -l 2>/dev/null | head -5
```

**Compliant if:** A document states the parameter ranges and conditions for which the M&S has been validated against real-world data or higher-fidelity referents.

---

## Step 12: M&S 19 — Uncertainty Characterization Process for Referent Data Recorded

*"The M&S developer shall maintain a record of the processes and rationale for characterizing uncertainty in the referent data."*

The requirement is to document **how and why** uncertainty in the referent data was characterized — not just that it was done. Look for process documentation, not just uncertainty values.

```bash
grep -r "referent.*uncertainty\|measurement.*uncertainty\|experimental.*uncertainty\|data.*error\|sensor.*error" \
  --include="*.md" --include="*.py" -i -l 2>/dev/null | head -5
grep -r "uncertainty.*process\|uncertainty.*method\|uncertainty.*rationale\|how.*uncertainty.*was\|approach.*to.*uncertainty" \
  --include="*.md" -i -l 2>/dev/null | head -5
```

**Compliant if:** A document describes the process and rationale used to characterize referent data uncertainty (e.g., "measurement uncertainty was estimated using instrument spec sheets; ±2σ bounds applied"). Values alone without process description are ⚠ partial.

---

## Step 13: M&S 21 — Uncertainties in M&S Output Recorded

*"The M&S developer shall record qualitative and quantitative uncertainties in the M&S."*

```bash
grep -r "uncertainty\|confidence\|error.*propagat\|monte.*carlo\|UQ\|epistemic\|aleatoric" \
  --include="*.py" --include="*.md" -i -l 2>/dev/null | head -10
# Check for UQ libraries
grep -r "import uncertainties\|from uncertainties\|import chaospy\|import openturns\|import SALib" \
  --include="*.py" -l 2>/dev/null | head -5
```

**Compliant if:** Both numerical/model-form uncertainties AND input uncertainties are characterized and documented.

---

## Step 14: M&S 47 — Usage Guidance Maintained

*"The M&S developer shall maintain guidance on how to use the M&S."*

The standard (§4.2.1.9) requires usage guidance to cover all of the following:
- **a. Appropriate practices for:** (1) Setup, (2) Execution, (3) Interfaces with other models when used in a linked or coupled model, (4) Analysis of results
- **b. Obsolescence criteria** — conditions under which changes to the real system invalidate the M&S
- **c. Parameter calibrations**
- **d. Computational requirements** (hardware/software versions, memory, disk, processor, compilation options)

```bash
ls README.md README.rst docs/index* docs/usage* docs/getting_started* 2>/dev/null
grep -r "setup\|installation\|how.*to.*run\|getting.*started\|usage\|running.*the\|execute" \
  --include="README*" --include="*.md" -i -l 2>/dev/null | head -5
grep -r "obsolescen\|coupled.*model\|linked.*model\|calibration\|computational.*requirement\|hardware.*requirement\|software.*requirement" \
  --include="README*" --include="*.md" -i -l 2>/dev/null | head -5
```

If README or usage docs exist, read them and check whether they cover all required items:
1. Setup practices
2. Execution practices
3. Interfaces with other linked/coupled models
4. Analysis of results
5. Obsolescence criteria
6. Parameter calibrations
7. Computational requirements

**Compliant if:** All 7 aspects are addressed (even briefly).
**Partial if:** Setup/execution are covered but interfaces, obsolescence, calibrations, or computational requirements are missing.
**Non-compliant if:** No usage guidance exists at all.

---

## Step 15: M&S 48 — M&S Capability Assessment Maintained

*"The M&S developer shall maintain an M&S capability assessment."*

```bash
find . \( -name "MS_CAPABILITY*" -o -name "CAPABILITY_ASSESSMENT*" \) \
  -not -path "./.git/*" 2>/dev/null
```

The capability assessment uses the 5 developer factors from Appendix E:
1. Data Pedigree (M&S 10, 19)
2. Verification (M&S 15, 16)
3. Validation (M&S 17, 18)
4. Development Technical Review (M&S 9)
5. Development Process/Product Management (M&S 41–51)

**Compliant if:** `docs/MS_CAPABILITY_ASSESSMENT.md` exists with scores for all 5 factors. Run `/ms-credibility` for interactive scoring.

---

## Step 16: Report and Generate Artifacts

### Compliance Summary

Output:

```
## Section 4.2 — Development Compliance

| Req    | Requirement                            | Status | Evidence |
|--------|----------------------------------------|--------|----------|
| M&S 10 | RWS characteristics and data pedigree  | ✓/✗/⚠ | [location] |
| M&S 45 | Data sets and software maintained      | ✓/✗/⚠ | [location] |
| M&S 46 | Units and coordinate frames            | ✓/✗/⚠ | [location] |
| M&S 11 | Assumptions and abstractions           | ✓/✗/⚠ | [location] |
| M&S 12 | Concepts, structures, mathematics      | ✓/✗/⚠ | [location] |
| M&S 13 | M&S limits documented                  | ✓/✗/⚠ | [location] |
| M&S 14 | Permissible uses recorded              | ✓/✗/⚠ | [location] |
| M&S 15 | M&S verified (tests exist)             | ✓/✗/⚠ | [location] |
| M&S 16 | Domain of verification recorded        | ✓/✗/⚠ | [location] |
| M&S 17 | M&S validated                          | ✓/✗/⚠ | [location] |
| M&S 18 | Domain of validation recorded          | ✓/✗/⚠ | [location] |
| M&S 19 | Uncertainty in referent data           | ✓/✗/⚠ | [location] |
| M&S 21 | Uncertainties in M&S output            | ✓/✗/⚠ | [location] |
| M&S 47 | Usage guidance maintained              | ✓/✗/⚠ | [location] |
| M&S 48 | M&S capability assessment              | ✓/✗/⚠ | [location] |

Score: X/15 (Y%)
```

### Generate Missing Artifacts

Use AskUserQuestion:
- List all ✗ requirements and their corresponding missing artifacts
- RECOMMENDATION: Generate all (each takes seconds, each one closes a compliance gap)
- Options: A) Generate all missing artifacts  B) Select specific  C) Report only

**Available artifacts:**
- `docs/ASSUMPTIONS.md` (M&S 11, 12)
- `docs/MS_LIMITS.md` (M&S 13)
- `docs/PERMISSIBLE_USES.md` (M&S 14)
- `docs/VALIDATION_REPORT.md` (M&S 17, 18, 19)
- `docs/MS_CAPABILITY_ASSESSMENT.md` (M&S 48)

When generating artifacts, read the main Python source files to pre-fill project-specific content (actual function names, parameter names, detected units, etc.).
