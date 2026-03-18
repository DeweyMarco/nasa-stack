# M&S Risk Assessment
## Standard: NASA-STD-7009B, M&S 49, 39
## Project: [PROJECT NAME]
## Use Instance ID: [USE-001]
## Date: [DATE]
## Author: [AUTHOR]

---

## 1. Purpose

This document assesses the risks of using [PROJECT NAME] to support [the decision described in docs/MS_USE_RECORD.md, USE-001]. Per M&S 49, a risk assessment must be maintained for each M&S use. The rationale must appear in results reports (M&S 39).

---

## 2. Risk Assessment Summary

**Criticality level:** [LOW / MEDIUM / HIGH / SAFETY-CRITICAL] (from `docs/MS_CRITICALITY_ASSESSMENT.md`)

**Overall risk acceptance decision:** [ACCEPTABLE / ACCEPTABLE WITH MITIGATIONS / NOT ACCEPTABLE]

**Decision authority:** [Name, role, date of approval]

---

## 3. Risk Identification

Identify risks associated with using this M&S for the intended decision:

| Risk ID | Risk description | Root cause | Probability | Consequence | Risk level |
|---------|-----------------|------------|-------------|-------------|------------|
| R-01 | [e.g., M&S produces incorrect result due to use outside validated domain] | [Input parameter X is outside validated range] | [Low/Med/High] | [Low/Med/High/Critical] | [L×C matrix result] |
| R-02 | [e.g., Uncertainty in results is larger than decision margin] | [Input data uncertainty ±20%, decision margin ±15%] | [Medium] | [High] | [High] |
| R-03 | | | | | |

**Risk matrix:**
```
             Consequence
             Low    Medium    High    Critical
Probability
High      | Med   | High   | High  | Critical
Medium    | Low   | Med    | High  | High
Low       | Low   | Low    | Med   | High
```

---

## 4. Risk Mitigations

For each Medium, High, or Critical risk:

**R-01: [Risk name]**
- **Mitigation:** [What will be done to reduce probability or consequence?]
- **Residual risk after mitigation:** [Low / Medium / High]
- **Verification of mitigation:** [How will you confirm the mitigation was effective?]
- **Owner:** [Name responsible]
- **Due date:** [DATE]

**R-02: [Risk name]**
- **Mitigation:**
- **Residual risk:**
- **Verification:**

---

## 5. Compliance Gaps and Waivers

Identify any NASA-STD-7009B requirements not fully met for this use:

| Requirement | Compliance status | Gap description | Waiver obtained? |
|------------|------------------|-----------------|-----------------|
| [M&S XX] | [Partial / Non-compliant] | [Description of gap] | [Yes — [approver, date] / No — Accepted risk] |

---

## 6. Risk Acceptance Rationale

[Explain why the residual risks are acceptable for the decision being supported. Address:
1. What is the consequence if the M&S result is wrong?
2. Are there independent verification opportunities (test data, other analyses, conservative margins)?
3. What is the fallback if M&S results are later found to be incorrect?
4. Is the credibility level (Appendix E scores) sufficient for the consequence level?]

---

## 7. Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| M&S Operator | | | |
| Technical Reviewer | | | |
| Program Manager (if High/Critical) | | | |
