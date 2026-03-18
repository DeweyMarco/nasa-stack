# M&S Criticality Assessment
## Standard: NASA-STD-7009B, M&S 6, Appendix D
## Project: [PROJECT NAME]
## Version: 1.0
## Date: [DATE]
## Author: [AUTHOR]

---

## 1. Criticality Matrix

Per NASA-STD-7009B Appendix D, criticality is determined by two axes:

### Axis 1: Decision Consequence

*What is the consequence if the M&S provides incorrect results and a decision is made based on those results?*

- [ ] **Low** — Inconvenience, minor rework, no material impact
- [ ] **Moderate** — Schedule delay, cost overrun, performance shortfall
- [ ] **High** — Significant mission failure, major cost/schedule impact, or public harm
- [ ] **Safety-Critical** — Risk of loss of life, loss of crew, vehicle, or catastrophic public harm

**Selected level:** [LEVEL]

**Rationale:** [Explain why this consequence level was selected. What is the specific decision being made? What happens if the answer is wrong?]

---

### Axis 2: M&S Influence

*How much does this M&S influence the final decision vs. other information sources?*

- [ ] **Low** — M&S is one of many inputs; significant additional independent information exists
- [ ] **Moderate** — M&S has notable influence but is cross-checked against other sources
- [ ] **High** — M&S is the primary or sole basis for the decision

**Selected level:** [LEVEL]

**Rationale:** [Explain why this influence level was selected. What other analyses, tests, or data sources inform the decision?]

---

## 2. Criticality Result

```
Decision Consequence: [Low / Moderate / High / Safety-Critical]
M&S Influence:        [Low / Moderate / High]
Criticality Level:    [LOW / MEDIUM / HIGH / SAFETY-CRITICAL]
```

### Appendix D Matrix:

```
                     Decision Consequence
                     Low      Moderate    High/Safety-Critical
M&S Influence Low  | LOW    | LOW       | MEDIUM
             Mod   | LOW    | MEDIUM    | HIGH
             High  | MEDIUM | HIGH      | HIGH (Safety-Critical)
```

---

## 3. Compliance Implications

Based on [CRITICALITY LEVEL] criticality, the following compliance rigor is required:

### Programmatics (Section 4.1)
[Describe required rigor for this criticality level]

### Development (Section 4.2)
[Describe required rigor for this criticality level]

### Use (Section 4.3)
[Describe required rigor for this criticality level]

### Reporting (Section 4.3.8)
[Describe required rigor for this criticality level]

---

## 4. Appendix E Minimum Score Thresholds (M&S 43e)

| Factor | Description | Minimum Score |
|--------|-------------|---------------|
| 1 | Data Pedigree | [0–4] |
| 2 | Verification | [0–4] |
| 3 | Validation | [0–4] |
| 4 | Development Technical Review | [0–4] |
| 5 | Development Process/Product Mgmt | [0–4] |
| 6 | Use Assessment | [0–4] |
| 7 | Input Pedigree | [0–4] |
| 8 | Uncertainty Characterization | [0–4] |
| 9 | Results Robustness | [0–4] |
| 10 | Use/Analysis Technical Review | [0–4] |
| 11 | Use Process/Product Management | [0–4] |

---

## 5. Review and Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| M&S Developer | | | |
| M&S User / Requester | | | |
| Technical Reviewer | | | |
| Program Manager (if Safety-Critical) | | | |
