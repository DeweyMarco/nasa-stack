# M&S Permissible Uses
## Standard: NASA-STD-7009B, M&S 14
## Project: [PROJECT NAME]
## Version: 1.0
## Date: [DATE]
## Author: [AUTHOR]

---

## 1. Purpose

This document records the permissible uses of [PROJECT NAME]. Per M&S 14, this list is established by the M&S developer and defines which applications have been reviewed and approved. Users proposing a new use must compare against this list (M&S 23) and obtain approval if the proposed use is not listed.

---

## 2. Approved Permissible Uses

Each entry represents a class of use that has been reviewed and approved.

### PU-01: [Name of approved use]

**Description:** [What this use entails — what decision it supports, what question it answers]

**Applicable domain:**
- Input parameter ranges: [specific values or ranges]
- Time horizon: [e.g., up to 24 hours]
- Fidelity required: [e.g., 10% accuracy sufficient]

**Required pre-conditions:**
- [ ] Inputs must be within limits defined in `docs/MS_LIMITS.md`
- [ ] [Additional condition]

**Minimum credibility requirements:**
- Minimum Appendix E capability score: [value]
- Minimum Appendix E results score: [value]
- Reference: `docs/MS_ACCEPTANCE_CRITERIA.md`

**Approved by:** [Name, role, date]

---

### PU-02: [Name of approved use]

**Description:**

**Applicable domain:**

**Required pre-conditions:**

**Minimum credibility requirements:**

**Approved by:**

---

## 3. Explicitly Non-Permissible Uses

These applications are explicitly prohibited, regardless of user request:

| Use | Reason prohibited | Alternatives |
|-----|-------------------|--------------|
| [e.g., Real-time flight guidance] | [Computational latency exceeds 1s; not real-time certified] | [Use [higher-fidelity certified model]] |
| [e.g., Extrapolation beyond 200 km altitude] | [Atmospheric model not validated above 100 km] | [Use NRLMSISE-00 directly] |

---

## 4. Uses Requiring Additional Review

Uses in this category may be permissible but require case-by-case review before proceeding:

| Use | Additional review required |
|-----|---------------------------|
| [e.g., Safety-critical decisions] | [Additional V&V evidence required; review by chief engineer] |
| [e.g., Use outside validated parameter range] | [Extended validation study required] |

---

## 5. Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [DATE] | [AUTHOR] | Initial document |
