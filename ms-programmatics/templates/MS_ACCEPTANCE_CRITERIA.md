# M&S Acceptance Criteria
## Standard: NASA-STD-7009B, M&S 42, 43, 44
## Project: [PROJECT NAME]
## Version: 1.0
## Date: [DATE]
## Author: [AUTHOR]

---

## 1. Purpose

This document defines the acceptance criteria for [PROJECT NAME]. Per NASA-STD-7009B M&S 43, acceptance criteria must be defined for five categories (43a–e) before M&S results can be used for decisions.

---

## 2. M&S 43a — Verification Completeness Criteria

The M&S will be considered sufficiently verified when:

- [ ] Unit tests exist for all [X] primary functions (100% of functions with >5 lines of logic)
- [ ] All tests pass with no failures
- [ ] Test coverage is ≥ [X]% (measured by pytest-cov)
- [ ] Convergence study complete for [spatial/temporal/numerical parameter]
- [ ] Domain of verification documented (M&S 16)
- [ ] Technical review of verification results complete (M&S 9)

**Evidence required:** `test_*.py` suite, pytest output, `docs/VALIDATION_REPORT.md` (Verification section)

---

## 3. M&S 43b — Uncertainty Characterization Completeness Criteria

The M&S will be considered to have adequate uncertainty characterization when:

- [ ] All significant input uncertainties are identified and quantified (or explicitly noted as unknown)
- [ ] Uncertainty propagation method is documented (M&S 28)
- [ ] Output uncertainty estimates are computed and reported (M&S 29)
- [ ] Qualitative assessment provided for any uncertainty that cannot be quantified

**Minimum acceptable:** Qualitative description of each uncertainty source with order-of-magnitude estimates.
**Target:** Quantitative estimates (confidence intervals or standard deviations) for all primary inputs and outputs.

**Evidence required:** `docs/UNCERTAINTY_CHARACTERIZATION.md`

---

## 4. M&S 43c — Sensitivity Analysis Completeness Criteria

The M&S will be considered to have adequate sensitivity analysis when:

- [ ] All [X] primary input parameters are included in at least a 1-at-a-time (OAT) sensitivity study
- [ ] Results include: which parameters most influence which outputs, and by how much
- [ ] Any non-linear or coupled sensitivities are identified
- [ ] Results are documented with sufficient detail to support decisions

**Minimum acceptable:** OAT study varying each parameter ±[X]% from nominal.
**Target:** [Sobol indices / Morris method / polynomial chaos] for quantitative ranking.

**Evidence required:** `docs/SENSITIVITY_ANALYSIS.md`

---

## 5. M&S 43d — Results Assessment Completeness Criteria

An M&S results assessment is considered complete when it scores all 6 Appendix E results factors (Factors 6–11) and documents the basis for each score.

**Evidence required:** `docs/MS_RESULTS_ASSESSMENT.md` with all 6 factors scored.

---

## 6. M&S 43e — Minimum Credibility Thresholds (Appendix E)

The following minimum Appendix E scores must be met before M&S results are used for decisions. These thresholds are set based on the criticality level ([CRITICALITY LEVEL] — see `docs/MS_CRITICALITY_ASSESSMENT.md`).

### Capability Assessment (Developer Factors)

| Factor | Description | Minimum Score |
|--------|-------------|---------------|
| 1 | Data Pedigree | [0–4] |
| 2 | Verification | [0–4] |
| 3 | Validation | [0–4] |
| 4 | Development Technical Review | [0–4] |
| 5 | Development Process/Product Mgmt | [0–4] |

### Results Assessment (User Factors)

| Factor | Description | Minimum Score |
|--------|-------------|---------------|
| 6 | Use Assessment | [0–4] |
| 7 | Input Pedigree | [0–4] |
| 8 | Uncertainty Characterization | [0–4] |
| 9 | Results Robustness | [0–4] |
| 10 | Use/Analysis Technical Review | [0–4] |
| 11 | Use Process/Product Management | [0–4] |

If any factor scores below its minimum threshold, results **shall not be used** for the intended decision without:
1. A documented waiver approved by [APPROVER]
2. Explicit warnings in all results reports (M&S 32)
3. A risk assessment justifying acceptance of the gap (M&S 49)

---

## 7. M&S Unique Reporting Requirements (M&S 44)

All results reports for this M&S must include:

- [ ] Summary of V&V status (M&S 15–18 compliance)
- [ ] Credibility Assessment scores (M&S 50, 35)
- [ ] Uncertainty estimate or statement of unavailability (M&S 33)
- [ ] Sensitivity analysis summary (M&S 30)
- [ ] Explicit warnings for all 8 violation categories (M&S 32)
- [ ] Reference to this acceptance criteria document

---

## 8. Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [DATE] | [AUTHOR] | Initial document |
