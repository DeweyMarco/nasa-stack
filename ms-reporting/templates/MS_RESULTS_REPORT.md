# M&S Results Report
## Standard: NASA-STD-7009B, M&S 32–39, 50
## Project: [PROJECT NAME]
## Use Instance ID: [USE-001]
## Report Version: 1.0
## Date: [DATE]
## Author: [AUTHOR]
## Reviewer: [REVIEWER NAME, DATE]

---

## 1. Executive Summary

**Decision supported:** [What decision does this report support?]

**M&S used:** [PROJECT NAME] v[VERSION]

**Key result:** [1–2 sentences stating the primary quantitative result]

**Uncertainty:** [State the uncertainty bound — e.g., "±X% at 95% confidence" — or explicitly state "Quantitative uncertainty estimate not available due to [reason]." Do NOT omit this. (M&S 33)]

**Overall assessment:** [Credible for intended use / Credible with caveats / Not recommended — brief rationale]

---

## 2. Warnings and Caveats (M&S 32)

> **Per NASA-STD-7009B M&S 32, explicit statements are required for all 8 violation categories. "None" is an acceptable entry only after deliberate verification.**

| Category | Status | Details |
|----------|--------|---------|
| 1. Unachieved acceptance criteria | [None / WARNING: ...] | [If warning: which M&S 43 thresholds were not met and by how much] |
| 2. Assumption violations | [None / WARNING: ...] | [If warning: which assumption was violated and impact on results] |
| 3. Limit violations (M&S 13) | [None / WARNING: ...] | [If warning: which input or condition was outside defined limits] |
| 4. Error/warning messages | [None / WARNING: ...] | [If warning: paste message text and disposition] |
| 5. Unfavorable use appropriateness | [None / WARNING: ...] | [If warning: what was unfavorable and what mitigations are in place] |
| 6. Setup or execution issues | [None / WARNING: ...] | [If warning: convergence problems, unexpected behavior, etc.] |
| 7. Waivers or deviations | [None / WARNING: ...] | [If warning: cite waiver, approved by, date] |
| 8. Outstanding defects (M&S 51) | [None / WARNING: ...] | [If warning: CHANGELOG entry, defect ID, severity, impact on these results] |

---

## 3. Uncertainty Estimate (M&S 33, 34)

### 3.1 Uncertainty Estimate

| Output | Result | Uncertainty | Confidence level | Method |
|--------|--------|-------------|-----------------|--------|
| [Primary output] | [value ± units] | [±X or X%] | [95%] | [reference method] |

> *If quantitative estimate is not available:* "A quantitative uncertainty estimate for [output] is not available because [reason]. Based on [qualitative analysis], uncertainty is expected to be [Low / Moderate / High]. This limitation is acknowledged and should be considered in decision-making."

### 3.2 Uncertainty Process (M&S 34)

[Describe how uncertainty was estimated. Reference `docs/UNCERTAINTY_CHARACTERIZATION.md` for full details.]

**Method:** [e.g., Monte Carlo with N=10,000 samples, Latin Hypercube sampling]
**Key uncertainty drivers:** [List 2–3 dominant sources]

---

## 4. M&S Capability Assessment Outcome (M&S 50)

Full assessment: `docs/MS_CAPABILITY_ASSESSMENT.md`

| Factor | Score (0–4) | Threshold | Status |
|--------|-------------|-----------|--------|
| 1. Data Pedigree | [score] | [threshold] | ✓/✗ |
| 2. Verification | [score] | [threshold] | ✓/✗ |
| 3. Validation | [score] | [threshold] | ✓/✗ |
| 4. Development Technical Review | [score] | [threshold] | ✓/✗ |
| 5. Development Process/Product Mgmt | [score] | [threshold] | ✓/✗ |

**Capability Score: [X.X] / 4**

---

## 5. M&S Results Assessment Outcome (M&S 35)

Full assessment: `docs/MS_RESULTS_ASSESSMENT.md` (USE-001)

| Factor | Score (0–4) | Threshold | Status |
|--------|-------------|-----------|--------|
| 6. Use Assessment | [score] | [threshold] | ✓/✗ |
| 7. Input Pedigree | [score] | [threshold] | ✓/✗ |
| 8. Uncertainty Characterization | [score] | [threshold] | ✓/✗ |
| 9. Results Robustness | [score] | [threshold] | ✓/✗ |
| 10. Use/Analysis Technical Review | [score] | [threshold] | ✓/✗ |
| 11. Use Process/Product Management | [score] | [threshold] | ✓/✗ |

**Results Score: [X.X] / 4**

---

## 6. Technical Review Findings (M&S 36)

| Reviewer | Role | Date | Forum | Finding | Disposition |
|----------|------|------|-------|---------|-------------|
| [Name] | [Role] | [DATE] | [e.g., peer review, IPR] | [Summary of finding] | [Accepted / Fixed / Waived] |

[ ] No issues identified in technical review.

---

## 7. Developer and Operator Qualifications (M&S 37)

### M&S Developer
**Name:** [Name]
**Role:** [Title/Role]
**Relevant qualifications:** [Education, years of experience in domain, specific training relevant to this M&S]

### M&S Operator (for this use)
**Name:** [Name]
**Role:** [Title/Role]
**Relevant qualifications:** [Education, experience, training in operating this M&S or similar tools]

---

## 8. Records (M&S 38 — Appendix A)

Per Appendix A of NASA-STD-7009B, the following records exist for this M&S and use instance:

| Record | Location | Status |
|--------|----------|--------|
| Intended Use Record (M&S 40) | `docs/MS_INTENDED_USE.md` | ✓/✗ |
| Criticality Assessment (M&S 6) | `docs/MS_CRITICALITY_ASSESSMENT.md` | ✓/✗ |
| Life Cycle Plan (M&S 41) | `docs/MS_LIFE_CYCLE_PLAN.md` | ✓/✗ |
| Acceptance Criteria (M&S 43) | `docs/MS_ACCEPTANCE_CRITERIA.md` | ✓/✗ |
| Assumptions (M&S 11) | `docs/ASSUMPTIONS.md` | ✓/✗ |
| M&S Limits (M&S 13) | `docs/MS_LIMITS.md` | ✓/✗ |
| Permissible Uses (M&S 14) | `docs/PERMISSIBLE_USES.md` | ✓/✗ |
| V&V Report (M&S 15–19, 21) | `docs/VALIDATION_REPORT.md` | ✓/✗ |
| Capability Assessment (M&S 48) | `docs/MS_CAPABILITY_ASSESSMENT.md` | ✓/✗ |
| Use Record (M&S 22) | `docs/MS_USE_RECORD.md` | ✓/✗ |
| Uncertainty Characterization (M&S 28) | `docs/UNCERTAINTY_CHARACTERIZATION.md` | ✓/✗ |
| Sensitivity Analysis (M&S 30) | `docs/SENSITIVITY_ANALYSIS.md` | ✓/✗ |
| Results Assessment (M&S 31) | `docs/MS_RESULTS_ASSESSMENT.md` | ✓/✗ |
| Risk Assessment (M&S 49) | `docs/MS_RISK_ASSESSMENT.md` | ✓/✗ |

---

## 9. Risk Assessment Rationale (M&S 39)

Full risk assessment: `docs/MS_RISK_ASSESSMENT.md` (USE-001)

**Summary:** [1–3 sentences explaining why the level of credibility achieved (Sections 4 and 5) is acceptable for this specific decision given its consequence level and the available decision margin]

**Risk acceptance decision:** [ACCEPTABLE / ACCEPTABLE WITH MITIGATIONS]
**Approved by:** [Name, role, date]

---

## 10. Detailed Results

[Present the primary results here: tables, key values, plots. Reference output files.]

**Output files:**
- [path/to/output_file.csv]
- [path/to/results_plot.png]

---

## 11. Conclusions and Recommendations

[State the conclusion that directly answers the decision question. Include any recommendations for follow-on analysis.]

---

## 12. Report Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Author / M&S Operator | | | |
| Technical Reviewer | | | |
| Approving Authority | | | |
