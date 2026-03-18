# M&S Assumptions and Abstractions
## Standard: NASA-STD-7009B, M&S 11, 12
## Project: [PROJECT NAME]
## Version: 1.0
## Date: [DATE]
## Author: [AUTHOR]

---

## 1. Purpose

This document records the assumptions and abstractions used in [PROJECT NAME]. Per M&S 11, these must be maintained to ensure users understand the conditions under which M&S results are valid.

---

## 2. Physical/Conceptual Model Description (M&S 12)

Describe the physical system and the conceptual model:

[DESCRIBE: What physical phenomena are being modeled? What governing equations are implemented? What is the overall model architecture?]

### 2.1 Governing Equations

| Equation | Description | Reference |
|----------|-------------|-----------|
| [Equation name or LaTeX] | [What it models] | [Source: textbook, paper, standard] |

### 2.2 Model Structure

[Describe major subsystems/modules and how they interact]

---

## 3. Assumptions

For each assumption, state: what is assumed, why the assumption was made, and the conditions under which it breaks down.

### 3.1 Physical Assumptions

**A-01: [Assumption name]**
- **Statement:** [What is assumed to be true]
- **Justification:** [Why this simplification is acceptable for the intended use]
- **Validity limits:** [When does this assumption fail? What parameter ranges invalidate it?]
- **Impact if violated:** [What happens to results if this assumption is wrong?]
- **References:** [Supporting analysis or literature]

**A-02: [Assumption name]**
- **Statement:**
- **Justification:**
- **Validity limits:**
- **Impact if violated:**
- **References:**

### 3.2 Numerical/Algorithmic Assumptions

**A-0X: [Assumption name]** (e.g., "Time step is sufficiently small for numerical stability")
- **Statement:**
- **Justification:**
- **Validity limits:**
- **Impact if violated:**

### 3.3 Data Assumptions

**A-0X: [Assumption name]** (e.g., "Input data is normally distributed")
- **Statement:**
- **Justification:**
- **Validity limits:**
- **Impact if violated:**

---

## 4. Abstractions

Abstractions are simplifications of the real world that are deliberately included by design.

| ID | Abstraction | Real-world phenomenon omitted | Impact on results | Justified because |
|----|-------------|-------------------------------|-------------------|-------------------|
| AB-01 | [e.g., Flat Earth] | [Curvature effects] | [<0.1% for ranges <100km] | [Intended use is <100km] |
| AB-02 | | | | |

---

## 5. Assumptions Review Log

| Date | Reviewer | Finding | Disposition |
|------|----------|---------|-------------|
| [DATE] | [NAME] | [Finding] | [Accepted/Modified/Rejected] |

---

## 6. Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [DATE] | [AUTHOR] | Initial document |
