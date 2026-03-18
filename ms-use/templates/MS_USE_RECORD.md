# M&S Use Record
## Standard: NASA-STD-7009B, M&S 22, 23, 25
## Project: [PROJECT NAME]
## Use Instance ID: [USE-001]
## Date of Use: [DATE]
## Operator: [NAME]

---

## 1. Proposed Use Description (M&S 22)

**Decision supported:** [What decision is this M&S run supporting? What is at stake?]

**Question being answered:** [What specific question will the M&S results answer?]

**Requestor:** [Who requested this analysis? Name, role, organization]

**Required completion date:** [DATE]

---

## 2. Use Appropriateness Assessment (M&S 23)

Compare the proposed use to the permissible uses list (`docs/PERMISSIBLE_USES.md`):

**Applicable permissible use entry:** [PU-0X: Name — or "None directly applicable"]

**Within validated domain?** [ ] Yes  [ ] No  [ ] Partially

**Within limits of applicability?** [ ] Yes  [ ] No  [ ] Partially

**Assessment:** [Compliant / Non-compliant — with explanation if non-compliant or partial]

If non-compliant or partial:
- [ ] Results will be placarded with explicit warnings (M&S 32)
- [ ] Additional V&V evidence obtained: [describe]
- [ ] Waiver obtained from: [name, date]

---

## 3. Inputs and Their Pedigrees (M&S 24)

For each input, document the source, date, uncertainty, and any known issues.

| Parameter | Value | Units | Source | Date obtained | Uncertainty | Issues |
|-----------|-------|-------|--------|---------------|-------------|--------|
| [param] | [value] | [units] | [source description] | [DATE] | [±X or N/A] | [None / describe] |

**Input files used:**
- `[path/to/config.yaml]` — [description, version/hash]
- `[path/to/data.csv]` — [description, source, date]

---

## 4. Setup and Execution Rationale (M&S 25)

### 4.1 Configuration Choices

| Parameter | Value chosen | Rationale |
|-----------|-------------|-----------|
| [e.g., Time step] | [0.01 s] | [CFL condition requires < 0.05 s; 0.01 s gives 5x margin] |
| [e.g., Grid resolution] | [1000 cells] | [Convergence study shows <1% error at 500+ cells] |

### 4.2 Execution Environment

| Item | Value |
|------|-------|
| Python version | [e.g., 3.11.4] |
| Key library versions | [numpy 1.24, scipy 1.11, etc.] |
| Machine / cluster | [e.g., MacBook Pro M2, or HPC cluster name] |
| Execution command | `python run_[analysis].py --config [config.yaml]` |
| Random seed (if applicable) | [value or N/A] |

### 4.3 Execution Log

```
[Paste key output lines, run time, warnings observed]
```

---

## 5. Warning and Error Messages Observed (M&S 27)

All warnings and errors generated during this run:

| Severity | Message | Timestamp | Disposition |
|----------|---------|-----------|-------------|
| [WARNING / ERROR] | [message text] | [time] | [Investigated; determined to be... / Fixed by...] |

[ ] No warnings or errors generated during this run.

---

## 6. Results Summary

**Primary result:** [Key output value(s) with units]

**Results files:** [Paths to output files, plots, notebooks]

**Uncertainty in results:** [Quantitative or qualitative — see `docs/UNCERTAINTY_CHARACTERIZATION.md`]

---

## 7. Operator Sign-off

I confirm that:
- [ ] The proposed use has been assessed for appropriateness (Section 2)
- [ ] All inputs are documented with pedigrees (Section 3)
- [ ] Configuration choices are justified (Section 4)
- [ ] All warnings and errors have been reviewed and dispositioned (Section 5)

**Operator:** [Name] **Date:** [DATE]

---

## 8. References

- `docs/MS_INTENDED_USE.md`
- `docs/PERMISSIBLE_USES.md`
- `docs/MS_LIMITS.md`
- `docs/MS_ACCEPTANCE_CRITERIA.md`
- Results report: [path if exists]
