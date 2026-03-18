# NASA M&S Compliance Skills Development

This repository implements a NASA-STD-7009B ("Standard for Models and Simulations", March 2024) compliance skills package for Python M&S projects. It is built on the gstack infrastructure (browse binary, gen-skill-docs pipeline, SKILL.md.tmpl system).

## Commands

```bash
bun install          # install dependencies
bun test             # run free tests (browse + snapshot + skill validation)
bun run test:evals   # run paid evals: LLM judge + E2E (diff-based, ~$4/run max)
bun run test:evals:all  # run ALL paid evals regardless of diff
bun run test:e2e     # run E2E tests only (diff-based, ~$3.85/run max)
bun run test:e2e:all # run ALL E2E tests regardless of diff
bun run eval:select  # show which tests would run based on current diff
bun run dev <cmd>    # run CLI in dev mode, e.g. bun run dev goto https://example.com
bun run build        # gen docs + compile binaries
bun run gen:skill-docs  # regenerate SKILL.md files from templates
bun run skill:check  # health dashboard for all skills
bun run dev:skill    # watch mode: auto-regen + validate on change
bun run eval:list    # list all eval runs from ~/.gstack-dev/evals/
bun run eval:compare # compare two eval runs (auto-picks most recent)
bun run eval:summary # aggregate stats across all eval runs
```

`test:evals` requires `ANTHROPIC_API_KEY`. E2E tests stream progress in real-time
(tool-by-tool via `--output-format stream-json --verbose`). Results are persisted
to `~/.gstack-dev/evals/` with auto-comparison against the previous run.

**Diff-based test selection:** `test:evals` and `test:e2e` auto-select tests based
on `git diff` against the base branch. Each test declares its file dependencies in
`test/helpers/touchfiles.ts`. Changes to global touchfiles (session-runner, eval-store,
llm-judge, gen-skill-docs) trigger all tests. Use `EVALS_ALL=1` or the `:all` script
variants to force all tests. Run `eval:select` to preview which tests would run.

## Project structure

```
nasa-stack/
├── ms-audit/            # /ms-audit skill — master compliance audit (all 43 requirements)
│   ├── SKILL.md.tmpl
│   └── SKILL.md
├── ms-programmatics/    # /ms-programmatics skill — Section 4.1 (8 requirements)
│   ├── SKILL.md.tmpl
│   ├── templates/       # MS_INTENDED_USE.md, MS_CRITICALITY_ASSESSMENT.md, etc.
│   └── SKILL.md
├── ms-development/      # /ms-development skill — Section 4.2 (15 requirements)
│   ├── SKILL.md.tmpl
│   ├── templates/       # ASSUMPTIONS.md, MS_LIMITS.md, VALIDATION_REPORT.md, etc.
│   └── SKILL.md
├── ms-use/              # /ms-use skill — Section 4.3 (11 requirements)
│   ├── SKILL.md.tmpl
│   ├── templates/       # MS_USE_RECORD.md, SENSITIVITY_ANALYSIS.md, etc.
│   └── SKILL.md
├── ms-reporting/        # /ms-reporting skill — Section 4.3.8 (9 requirements)
│   ├── SKILL.md.tmpl
│   ├── templates/       # MS_RESULTS_REPORT.md
│   └── SKILL.md
├── ms-credibility/      # /ms-credibility skill — Appendix E (11 factors)
│   ├── SKILL.md.tmpl
│   ├── templates/       # MS_CREDIBILITY_ASSESSMENT.md
│   └── SKILL.md
├── ms-criticality/      # /ms-criticality skill — Appendix D (3x3 matrix)
│   ├── SKILL.md.tmpl
│   └── SKILL.md
├── browse/              # Headless browser CLI (Playwright) — kept as-is
│   ├── src/             # CLI + server + commands
│   │   ├── commands.ts  # Command registry
│   │   └── snapshot.ts  # SNAPSHOT_FLAGS metadata
│   ├── test/
│   └── dist/
├── scripts/             # Build + DX tooling
│   ├── gen-skill-docs.ts  # Template → SKILL.md generator (updated for new skills)
│   ├── skill-check.ts
│   └── dev-skill.ts
├── test/                # Skill validation + eval tests
│   ├── helpers/         # session-runner, llm-judge, eval-store, touchfiles.ts
│   ├── fixtures/
│   ├── skill-validation.test.ts
│   └── skill-e2e.test.ts
├── SKILL.md.tmpl        # Root: NASA M&S package description
├── SKILL.md             # Generated
├── CLAUDE.md            # This file
└── package.json
```

## Skills overview

| Skill | Standard section | Requirements |
|-------|-----------------|-------------|
| `/ms-audit` | All | All 43 (entry point) |
| `/ms-programmatics` | Section 4.1 | M&S 40, 6, 41, 42, 43, 44, 9, 51 |
| `/ms-development` | Section 4.2 | M&S 10, 11–19, 21, 45–48 |
| `/ms-use` | Section 4.3 | M&S 22–31, 49 |
| `/ms-reporting` | Section 4.3.8 | M&S 32–39, 50 |
| `/ms-credibility` | Appendix E | 11 credibility factors |
| `/ms-criticality` | Appendix D | 3×3 criticality matrix |

## SKILL.md workflow

SKILL.md files are **generated** from `.tmpl` templates. To update docs:

1. Edit the `.tmpl` file (e.g. `ms-audit/SKILL.md.tmpl`)
2. Run `bun run gen:skill-docs` (or `bun run build` which does it automatically)
3. Commit both the `.tmpl` and generated `.md` files

## Writing SKILL templates

SKILL.md.tmpl files are **prompt templates read by Claude**, not bash scripts.
Each bash code block runs in a separate shell — variables do not persist between blocks.

Rules:
- **Use natural language for logic and state.** Don't use shell variables to pass
  state between code blocks. Instead, tell Claude what to remember and reference
  it in prose.
- **Keep bash blocks self-contained.** Each code block should work independently.
  If a block needs context from a previous step, restate it in the prose above.
- **Express conditionals as English.** Instead of nested `if/elif/else` in bash,
  write numbered decision steps: "1. If X, do Y. 2. Otherwise, do Z."
- **Python-specific scanning:** Skills scan `.py` files for compliance evidence
  (docstrings, unit annotations, logging calls, test files, bounds checks).

## Artifact templates

Each skill's `templates/` directory contains pre-structured markdown templates for
the compliance artifacts that skill generates. When a skill finds a missing artifact,
it should read the corresponding template, adapt placeholders to the project's actual
content, and write it to `docs/` in the target project.

## NASA-STD-7009B quick reference

**43 "shall" requirements across 4 phases:**
- Programmatics (4.1): M&S 40, 6, 41, 42, 43, 44, 9, 51
- Development (4.2): M&S 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 45, 46, 47, 48
- Use (4.3): M&S 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 49
- Reporting (4.3.8): M&S 32, 33, 34, 35, 36, 37, 38, 39, 50

**Appendix D:** Criticality Matrix (Decision Consequence × M&S Influence → Low/Medium/High/Safety-Critical)
**Appendix E:** Credibility Assessment (11 factors, 0–4 scale each)

## Browser interaction

When you need to interact with a browser, use the `/browse` skill or run the browse
binary directly via `$B <command>`. NEVER use `mcp__claude-in-chrome__*` tools.

## Deploying to the active skill

The active skill lives at `~/.claude/skills/nasa-stack/`. After making changes:

1. Push your branch
2. Fetch and reset: `cd ~/.claude/skills/nasa-stack && git fetch origin && git reset --hard origin/main`
3. Rebuild: `cd ~/.claude/skills/nasa-stack && bun run build`
