# Uncertainty Characterization
## Standard: NASA-STD-7009B, M&S 28, 29
## Project: [PROJECT NAME]
## Version: 1.0
## Date: [DATE]
## Author: [AUTHOR]

---

## 1. Purpose

This document records the uncertainty characterization process and results for [PROJECT NAME]. Per M&S 28, the process must be documented. Per M&S 29, quantified uncertainties in inputs, results, and derived quantities must be recorded.

---

## 2. Uncertainty Characterization Process (M&S 28)

**Method:** [Select: Monte Carlo / Latin Hypercube Sampling / Analytical propagation / Interval analysis / Polynomial chaos expansion / Dempster-Shafer / Expert elicitation / Other]

**Rationale:** [Why this method is appropriate given the M&S complexity, available data, and criticality level]

**Number of samples (if Monte Carlo):** [N samples — justification for sufficiency]

**Tool/library used:** [e.g., numpy.random, SALib, uncertainties, OpenTURNS, chaospy]

**Reference:** [If following a standard or documented procedure, cite it]

---

## 3. Input Uncertainties (M&S 29 — Inputs)

For each significant input, document the uncertainty type, distribution, and source.

| Parameter | Nominal | Units | Type | Distribution | Parameters | Source |
|-----------|---------|-------|------|-------------|------------|--------|
| [param] | [value] | [units] | [Aleatoric/Epistemic] | [Normal/Uniform/Lognormal] | [μ=X, σ=Y] or [min,max] | [source of uncertainty estimate] |

**Uncertainty types:**
- *Aleatoric (irreducible):* Natural variability that cannot be reduced with more data
- *Epistemic (reducible):* Lack of knowledge; could be reduced with more data or better models

---

## 4. Model-Form Uncertainty

Uncertainty arising from the M&S assumptions and abstractions (documented in `docs/ASSUMPTIONS.md`):

| Assumption | Associated uncertainty | Type | Magnitude estimate |
|------------|----------------------|------|-------------------|
| [A-01: name] | [Description of model-form error] | Epistemic | [±X% or qualitative] |

---

## 5. Numerical Discretization Uncertainty

Uncertainty from discretization (time step, grid resolution, etc.):

[Reference convergence study in `docs/VALIDATION_REPORT.md` Section 2.3]

| Discretization parameter | Value used | Discretization error |
|-------------------------|------------|---------------------|
| [e.g., Time step] | [0.01 s] | [<0.5% based on convergence study] |

---

## 6. Output Uncertainties (M&S 29 — Results)

**Primary output uncertainties:**

| Output | Nominal result | Uncertainty | Confidence level | Method |
|--------|---------------|-------------|-----------------|--------|
| [output_1] | [value ± units] | [±X%] | [95%] | [Monte Carlo / propagation] |
| [output_2] | [value ± units] | [±X%] | [95%] | |

**If quantitative uncertainty is not available:**
> Quantitative uncertainty in [output] could not be determined due to [reason: insufficient referent data / computational constraints / no validated UQ method for this regime]. A qualitative assessment indicates uncertainty is expected to be [Low / Moderate / High] based on [justification].

---

## 7. Derived Quantity Uncertainties

Uncertainties in quantities derived from M&S outputs (e.g., integration of results, differences between runs):

| Derived quantity | Formula | Uncertainty | Notes |
|----------------|---------|-------------|-------|
| [e.g., Delta-V budget] | [sum of...] | [±X%] | [Dominated by [param] uncertainty] |

---

## 8. Comparison to Acceptance Criteria

**Per `docs/MS_ACCEPTANCE_CRITERIA.md` M&S 43b:**

| Criterion | Target | Achieved | Status |
|-----------|--------|----------|--------|
| Primary output uncertainty | [< X%] | [Y%] | ✓/✗ |
| Uncertainty method documented | Required | Complete | ✓ |

---

## 9. Limitations and Caveats

- [e.g., Model-form uncertainty is qualitative only — insufficient referent data to quantify]
- [e.g., Parameter correlations not modeled — may underestimate total uncertainty]

---

## 10. Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [DATE] | [AUTHOR] | Initial document |
