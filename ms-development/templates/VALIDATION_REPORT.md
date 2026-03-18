# M&S Verification and Validation Report
## Standard: NASA-STD-7009B, M&S 15–19, 21
## Project: [PROJECT NAME]
## Version: 1.0
## Date: [DATE]
## Author: [AUTHOR]

---

## 1. Executive Summary

[2–3 sentences: What was verified and validated, what domains were covered, what the key findings are]

---

## 2. Verification (M&S 15, 16)

### 2.1 Verification Approach

[Describe the verification methodology used: unit testing, integration testing, code comparison with independent implementation, analytical solutions, convergence studies, etc.]

### 2.2 Test Suite Summary

| Test file | Functions tested | Pass/Fail | Date run |
|-----------|-----------------|-----------|----------|
| `test_[module].py` | [list] | PASS | [DATE] |

Run verification tests:
```bash
python -m pytest test_*.py -v --tb=short
```

Current test status: [PASS / FAIL — N failures]
Current coverage: [X]% (per pytest-cov)

### 2.3 Convergence Study

[If applicable: describe convergence parameter, results at multiple resolutions, and evidence of convergence]

| Resolution | Result | Relative change |
|-----------|--------|-----------------|
| Coarse | | |
| Medium | | |
| Fine | | |
| Extra-fine | | |

**Converged resolution selected:** [value] — Rationale: [why this resolution is sufficient]

### 2.4 Domain of Verification (M&S 16)

The M&S has been verified over the following domain:

| Parameter | Verified range | Verification method |
|-----------|---------------|---------------------|
| [param] | [range] | [method] |

**Verification boundary:** Results outside the verified domain may contain undetected coding errors.

---

## 3. Validation (M&S 17, 18, 19)

### 3.1 Validation Approach

[Describe the validation methodology: What referent data was used? Is it experimental data, analytical solution, or higher-fidelity model output? How were M&S results compared to the referent?]

### 3.2 Referent Data Description (M&S 10)

| Dataset | Source | Date | Version/DOI | Uncertainty |
|---------|--------|------|-------------|-------------|
| [name] | [source] | [date] | [ref] | [±X% or description] |

### 3.3 Uncertainty in Referent Data (M&S 19)

[Characterize the uncertainty in each referent dataset. Include measurement uncertainty, systematic biases, and any known issues with the data.]

| Dataset | Uncertainty source | Magnitude | Type |
|---------|-------------------|-----------|------|
| [name] | [e.g., measurement noise] | [±X] | [Random / Systematic] |

### 3.4 Validation Results

**Comparison method:** [e.g., RMS error, maximum error, R² coefficient, visual comparison of plots]

| Output quantity | Units | M&S result | Referent | Error | Within acceptance? |
|----------------|-------|-----------|----------|-------|-------------------|
| [quantity] | [units] | [value] | [value] | [%] | Yes/No |

**Acceptance criteria:** [State criterion from M&S 43b — e.g., "Error < 5% for all primary outputs"]

**Overall validation result:** [PASS / FAIL / CONDITIONAL — with explanation]

### 3.5 Domain of Validation (M&S 18)

The M&S has been validated over the following domain:

| Parameter | Validated range | Referent source |
|-----------|----------------|-----------------|
| [param] | [range] | [source] |

**Validation boundary:** Results outside the validated domain are extrapolations. All such uses must be placarded with explicit warnings (M&S 32, violation category 3).

---

## 4. Uncertainty in M&S Output (M&S 21)

### 4.1 Uncertainty Sources

| Source | Type | Magnitude | Quantification method |
|--------|------|-----------|----------------------|
| Input uncertainty (from M&S 10) | Aleatoric | [range] | [method] |
| Model-form uncertainty | Epistemic | [range] | [method] |
| Numerical discretization | Numerical | [range] | [convergence study] |
| Parameter uncertainty | Both | [range] | [method] |

### 4.2 Combined Output Uncertainty

[Report combined output uncertainty, e.g., "Total output uncertainty is ±X% at 95% confidence, computed via [method]."]

---

## 5. Findings and Limitations

| Finding | Type | Impact | Disposition |
|---------|------|--------|-------------|
| [Finding] | [V&V gap / Known limit] | [Low/Med/High] | [Accepted/Planned for fix/Waived] |

---

## 6. Reviewer Sign-off

| Role | Name | Date | Findings |
|------|------|------|---------|
| Reviewer 1 | | | |
| Reviewer 2 | | | |

---

## 7. Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [DATE] | [AUTHOR] | Initial document |
