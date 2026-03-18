# Sensitivity Analysis
## Standard: NASA-STD-7009B, M&S 30
## Project: [PROJECT NAME]
## Version: 1.0
## Date: [DATE]
## Author: [AUTHOR]

---

## 1. Purpose

This document records the extent and results of sensitivity analyses performed for [PROJECT NAME]. Per M&S 30, the extent and results must be recorded. This analysis identifies which input parameters most significantly affect M&S outputs and supports uncertainty characterization (M&S 28, 29).

---

## 2. Method

**Sensitivity analysis method:** [Select: One-at-a-time (OAT) / Morris method / Sobol indices / Polynomial chaos / Local gradient-based / Other]

**Rationale for method choice:** [Why this method is appropriate for this M&S]

**Outputs analyzed:**
- [Primary output 1: name, units]
- [Primary output 2: name, units]

**Reference (nominal) case:**
- [Describe the nominal input values used as the baseline]

---

## 3. Input Parameters Analyzed

| Parameter | Nominal value | Range analyzed | Units | Rationale for range |
|-----------|--------------|----------------|-------|---------------------|
| [param_1] | [value] | [min – max] | [units] | [e.g., ±10% from nominal; physical bounds] |
| [param_2] | [value] | [min – max] | [units] | |

---

## 4. Results

### 4.1 Sensitivity Summary Table

| Input parameter | Effect on [Output 1] | Effect on [Output 2] | Rank | Non-linear? |
|----------------|---------------------|---------------------|------|-------------|
| [param_1] | [±X% per ±10% change] | [±Y%] | [1st] | [Yes/No] |
| [param_2] | [±X%] | [±Y%] | [2nd] | |

### 4.2 Key Findings

1. **Most influential parameter:** [param_name] — a [X]% change in this parameter produces a [Y]% change in [output]. [Implication for uncertainty or design decisions]

2. **Non-linearities:** [Identify any parameters where the response is non-linear or interactions exist between parameters]

3. **Insensitive parameters:** [Parameters that have negligible effect — may simplify future analyses]

4. **Threshold effects:** [Any parameters where results change character at a specific value]

### 4.3 Plots and Supporting Analysis

[Reference plots or notebooks:]
- `results/sensitivity_tornado.png` — Tornado diagram of ±X% input perturbations
- `analysis/sensitivity_study.ipynb` — Full analysis notebook

---

## 5. Robustness Assessment

Based on this sensitivity analysis, how robust are the M&S results to input uncertainties?

**Overall robustness:** [Low / Moderate / High] — [Brief explanation]

**Critical parameters:** Parameters that drive result uncertainty and require tightly bounded inputs:
- [param_1]: Bounds required for intended use: [range]
- [param_2]: Bounds required for intended use: [range]

---

## 6. Limitations of This Analysis

- [e.g., OAT method does not capture parameter interactions]
- [e.g., Analysis was performed at a single operating condition — may not represent all use cases]
- [e.g., [param_3] was not varied due to computational cost — qualitative assessment only]

---

## 7. Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [DATE] | [AUTHOR] | Initial document |
