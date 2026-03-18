# M&S Limits of Applicability
## Standard: NASA-STD-7009B, M&S 13
## Project: [PROJECT NAME]
## Version: 1.0
## Date: [DATE]
## Author: [AUTHOR]

---

## 1. Purpose

This document records the limits of applicability of [PROJECT NAME]. Per M&S 13, the M&S must explicitly state the conditions under which it is NOT valid. Users who operate the M&S outside these limits must either (a) obtain additional V&V evidence, or (b) placard results with explicit warnings (M&S 26).

---

## 2. Input Parameter Limits

For each input, state the valid range and what happens outside it.

| Parameter | Description | Units | Min Valid | Max Valid | Code enforcement | Behavior outside range |
|-----------|-------------|-------|-----------|-----------|-----------------|----------------------|
| [param_name] | [Description] | [units] | [value] | [value] | [assert/raise/warn/none] | [What result to expect] |

**Note:** "Code enforcement" refers to how the M&S responds to out-of-range inputs:
- `raise` — ValueError or similar exception raised
- `warn` — UserWarning issued, execution continues
- `assert` — AssertionError raised (note: assertions can be disabled with -O flag)
- `none` — No enforcement; user must check manually

---

## 3. Environmental / Condition Limits

Limits that are not single-parameter but apply to the overall operating condition:

| Condition | Valid Regime | Invalid Regime | Rationale |
|-----------|-------------|----------------|-----------|
| [e.g., Mach number] | [0.1 – 0.9 subsonic] | [M > 0.9 (transonic/supersonic effects not modeled)] | [No compressibility terms] |

---

## 4. Verification Domain Limits (M&S 16)

The M&S has been verified (tested against known solutions) for:

| Domain | Range/Condition | Verification method |
|--------|----------------|---------------------|
| [e.g., Time step] | [0.001 – 1.0 s] | [Convergence study] |
| [e.g., Grid resolution] | [≥ 100 cells/m] | [Grid refinement study] |

**Outside the verification domain:** Results may be incorrect in non-obvious ways. Independent verification required before use.

---

## 5. Validation Domain Limits (M&S 18)

The M&S has been validated (compared to real-world data or higher-fidelity model) for:

| Parameter/Condition | Validated Range | Referent data source |
|--------------------|-----------------|---------------------|
| [e.g., Altitude] | [0 – 100 km] | [NRLMSISE-00 atmosphere model] |

**Outside the validation domain:** Results are extrapolations. Explicit warning required in any results report (M&S 32, item 3).

---

## 6. Known Failure Modes

Specific conditions known to produce incorrect results:

| Condition | Result | Mitigation |
|-----------|--------|------------|
| [e.g., Very small time step (< 1e-6 s)] | [Numerical instability] | [Minimum time step check in code] |
| [e.g., Zero input velocity] | [Division by zero] | [Guards in normalize() function] |

---

## 7. Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [DATE] | [AUTHOR] | Initial document |
