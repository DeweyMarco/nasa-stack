import { describe, test, expect } from 'bun:test';
import { validateSkill } from './helpers/skill-parser';
import { ALL_COMMANDS, COMMAND_DESCRIPTIONS, READ_COMMANDS, WRITE_COMMANDS, META_COMMANDS } from '../browse/src/commands';
import { SNAPSHOT_FLAGS } from '../browse/src/snapshot';
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(import.meta.dir, '..');

// ─── Browse command validation ─────────────────────────────

describe('SKILL.md command validation', () => {
  test('all $B commands in SKILL.md are valid browse commands', () => {
    const result = validateSkill(path.join(ROOT, 'SKILL.md'));
    expect(result.invalid).toHaveLength(0);
  });

  test('all $B commands in browse/SKILL.md are valid browse commands', () => {
    const result = validateSkill(path.join(ROOT, 'browse', 'SKILL.md'));
    expect(result.invalid).toHaveLength(0);
    expect(result.valid.length).toBeGreaterThan(0);
  });

  test('all snapshot flags in browse/SKILL.md are valid', () => {
    const result = validateSkill(path.join(ROOT, 'browse', 'SKILL.md'));
    expect(result.snapshotFlagErrors).toHaveLength(0);
  });
});

// ─── Command registry consistency ──────────────────────────

describe('Command registry consistency', () => {
  test('COMMAND_DESCRIPTIONS covers all commands in sets', () => {
    const allCmds = new Set([...READ_COMMANDS, ...WRITE_COMMANDS, ...META_COMMANDS]);
    const descKeys = new Set(Object.keys(COMMAND_DESCRIPTIONS));
    for (const cmd of allCmds) {
      expect(descKeys.has(cmd)).toBe(true);
    }
  });

  test('COMMAND_DESCRIPTIONS has no extra commands not in sets', () => {
    const allCmds = new Set([...READ_COMMANDS, ...WRITE_COMMANDS, ...META_COMMANDS]);
    for (const key of Object.keys(COMMAND_DESCRIPTIONS)) {
      expect(allCmds.has(key)).toBe(true);
    }
  });

  test('ALL_COMMANDS matches union of all sets', () => {
    const union = new Set([...READ_COMMANDS, ...WRITE_COMMANDS, ...META_COMMANDS]);
    expect(ALL_COMMANDS.size).toBe(union.size);
    for (const cmd of union) {
      expect(ALL_COMMANDS.has(cmd)).toBe(true);
    }
  });

  test('SNAPSHOT_FLAGS option keys are valid SnapshotOptions fields', () => {
    const validKeys = new Set([
      'interactive', 'compact', 'depth', 'selector',
      'diff', 'annotate', 'outputPath', 'cursorInteractive',
    ]);
    for (const flag of SNAPSHOT_FLAGS) {
      expect(validKeys.has(flag.optionKey)).toBe(true);
    }
  });
});

// ─── Usage string consistency ───────────────────────────────

describe('Usage string consistency', () => {
  function skeleton(usage: string): string {
    return usage
      .replace(/\(.*?\)/g, '')
      .replace(/<[^>]*>/g, '<>')
      .replace(/\[[^\]]*\]/g, '[]')
      .replace(/\s+/g, ' ')
      .trim();
  }

  test('implementation Usage: structural format matches COMMAND_DESCRIPTIONS', () => {
    const implFiles = [
      path.join(ROOT, 'browse', 'src', 'write-commands.ts'),
      path.join(ROOT, 'browse', 'src', 'read-commands.ts'),
      path.join(ROOT, 'browse', 'src', 'meta-commands.ts'),
    ];

    const usagePattern = /throw new Error\(['"`]Usage:\s*browse\s+(.+?)['"`]\)/g;
    const implUsages = new Map<string, string>();

    for (const file of implFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      let match;
      while ((match = usagePattern.exec(content)) !== null) {
        const usage = match[1].split('\\n')[0].trim();
        const cmd = usage.split(/\s/)[0];
        implUsages.set(cmd, usage);
      }
    }

    const mismatches: string[] = [];
    for (const [cmd, implUsage] of implUsages) {
      const desc = COMMAND_DESCRIPTIONS[cmd];
      if (!desc) continue;
      if (!desc.usage) continue;
      const descSkel = skeleton(desc.usage);
      const implSkel = skeleton(implUsage);
      if (descSkel !== implSkel) {
        mismatches.push(`${cmd}: docs "${desc.usage}" (${descSkel}) vs impl "${implUsage}" (${implSkel})`);
      }
    }

    expect(mismatches).toEqual([]);
  });
});

// ─── Generated SKILL.md freshness ──────────────────────────

describe('Generated SKILL.md freshness', () => {
  test('no unresolved {{placeholders}} in generated SKILL.md', () => {
    const content = fs.readFileSync(path.join(ROOT, 'SKILL.md'), 'utf-8');
    const unresolved = content.match(/\{\{\w+\}\}/g);
    expect(unresolved).toBeNull();
  });

  test('no unresolved {{placeholders}} in generated browse/SKILL.md', () => {
    const content = fs.readFileSync(path.join(ROOT, 'browse', 'SKILL.md'), 'utf-8');
    const unresolved = content.match(/\{\{\w+\}\}/g);
    expect(unresolved).toBeNull();
  });

  test('generated SKILL.md has AUTO-GENERATED header', () => {
    const content = fs.readFileSync(path.join(ROOT, 'SKILL.md'), 'utf-8');
    expect(content).toContain('AUTO-GENERATED');
  });

  // All 7 NASA skill SKILL.md files should be generated without unresolved placeholders
  const nasaSkills = [
    'ms-audit', 'ms-programmatics', 'ms-development',
    'ms-use', 'ms-reporting', 'ms-credibility', 'ms-criticality',
  ];

  for (const skill of nasaSkills) {
    test(`no unresolved {{placeholders}} in generated ${skill}/SKILL.md`, () => {
      const content = fs.readFileSync(path.join(ROOT, skill, 'SKILL.md'), 'utf-8');
      const unresolved = content.match(/\{\{\w+\}\}/g);
      expect(unresolved).toBeNull();
    });

    test(`${skill}/SKILL.md has AUTO-GENERATED header`, () => {
      const content = fs.readFileSync(path.join(ROOT, skill, 'SKILL.md'), 'utf-8');
      expect(content).toContain('AUTO-GENERATED');
    });
  }
});

// ─── Update check preamble validation ──────────────────────

describe('Update check preamble', () => {
  const skillsWithUpdateCheck = [
    'SKILL.md', 'browse/SKILL.md',
    'ms-audit/SKILL.md',
    'ms-programmatics/SKILL.md',
    'ms-development/SKILL.md',
    'ms-use/SKILL.md',
    'ms-reporting/SKILL.md',
    'ms-credibility/SKILL.md',
    'ms-criticality/SKILL.md',
  ];

  for (const skill of skillsWithUpdateCheck) {
    test(`${skill} update check line ends with || true`, () => {
      const content = fs.readFileSync(path.join(ROOT, skill), 'utf-8');
      const match = content.match(/\[ -n "\$_UPD" \].*$/m);
      expect(match).not.toBeNull();
      expect(match![0]).toContain('|| true');
    });
  }

  test('update check bash block exits 0 when up to date', () => {
    const result = Bun.spawnSync(['bash', '-c',
      '_UPD=$(echo "" || true); [ -n "$_UPD" ] && echo "$_UPD" || true'
    ], { stdout: 'pipe', stderr: 'pipe' });
    expect(result.exitCode).toBe(0);
  });

  test('update check bash block exits 0 when upgrade available', () => {
    const result = Bun.spawnSync(['bash', '-c',
      '_UPD=$(echo "UPGRADE_AVAILABLE 0.3.3 0.4.0" || true); [ -n "$_UPD" ] && echo "$_UPD" || true'
    ], { stdout: 'pipe', stderr: 'pipe' });
    expect(result.exitCode).toBe(0);
    expect(result.stdout.toString().trim()).toBe('UPGRADE_AVAILABLE 0.3.3 0.4.0');
  });
});

// ─── NASA M&S skill structure validation ───────────────────

describe('NASA M&S skill structure', () => {
  test('ms-audit/SKILL.md covers all 43 requirements', () => {
    const content = fs.readFileSync(path.join(ROOT, 'ms-audit', 'SKILL.md'), 'utf-8');
    // Spot-check a sampling of requirement IDs across all 4 phases
    const requirements = ['M&S 40', 'M&S 6', 'M&S 41', 'M&S 43', // Programmatics
      'M&S 10', 'M&S 15', 'M&S 17', 'M&S 21', 'M&S 46', // Development
      'M&S 22', 'M&S 27', 'M&S 29', 'M&S 30', 'M&S 31', // Use
      'M&S 32', 'M&S 33', 'M&S 35', 'M&S 39', 'M&S 50', // Reporting
    ];
    for (const req of requirements) {
      expect(content).toContain(req);
    }
  });

  test('ms-audit/SKILL.md produces compliance matrix', () => {
    const content = fs.readFileSync(path.join(ROOT, 'ms-audit', 'SKILL.md'), 'utf-8');
    expect(content).toContain('Requirements Identification Matrix');
    expect(content).toContain('✓');
    expect(content).toContain('✗');
    expect(content).toContain('⚠');
  });

  test('ms-programmatics/SKILL.md covers all 8 Section 4.1 requirements', () => {
    const content = fs.readFileSync(path.join(ROOT, 'ms-programmatics', 'SKILL.md'), 'utf-8');
    for (const req of ['M&S 40', 'M&S 6', 'M&S 41', 'M&S 42', 'M&S 43', 'M&S 44', 'M&S 9', 'M&S 51']) {
      expect(content).toContain(req);
    }
  });

  test('ms-development/SKILL.md covers all 15 Section 4.2 requirements', () => {
    const content = fs.readFileSync(path.join(ROOT, 'ms-development', 'SKILL.md'), 'utf-8');
    for (const req of ['M&S 10', 'M&S 11', 'M&S 12', 'M&S 13', 'M&S 14', 'M&S 15',
      'M&S 16', 'M&S 17', 'M&S 18', 'M&S 19', 'M&S 21', 'M&S 45', 'M&S 46', 'M&S 47', 'M&S 48']) {
      expect(content).toContain(req);
    }
  });

  test('ms-development/SKILL.md includes Python-specific scans', () => {
    const content = fs.readFileSync(path.join(ROOT, 'ms-development', 'SKILL.md'), 'utf-8');
    expect(content).toContain('.py');
    expect(content).toContain('pint');
    expect(content).toContain('test_');
    expect(content).toContain('uncertainty');
  });

  test('ms-use/SKILL.md covers all 11 Section 4.3 requirements', () => {
    const content = fs.readFileSync(path.join(ROOT, 'ms-use', 'SKILL.md'), 'utf-8');
    for (const req of ['M&S 22', 'M&S 23', 'M&S 24', 'M&S 25', 'M&S 26',
      'M&S 27', 'M&S 28', 'M&S 29', 'M&S 30', 'M&S 31', 'M&S 49']) {
      expect(content).toContain(req);
    }
  });

  test('ms-reporting/SKILL.md covers all 9 Section 4.3.8 requirements', () => {
    const content = fs.readFileSync(path.join(ROOT, 'ms-reporting', 'SKILL.md'), 'utf-8');
    for (const req of ['M&S 32', 'M&S 33', 'M&S 34', 'M&S 35', 'M&S 36',
      'M&S 37', 'M&S 38', 'M&S 39', 'M&S 50']) {
      expect(content).toContain(req);
    }
  });

  test('ms-reporting/SKILL.md checks all 8 M&S 32 warning categories', () => {
    const content = fs.readFileSync(path.join(ROOT, 'ms-reporting', 'SKILL.md'), 'utf-8');
    expect(content).toContain('Unachieved acceptance criteria');
    expect(content).toContain('Assumption violations');
    expect(content).toContain('Limit violations');
    expect(content).toContain('Waivers');
    expect(content).toContain('Outstanding defects');
  });

  test('ms-credibility/SKILL.md scores all 11 Appendix E factors', () => {
    const content = fs.readFileSync(path.join(ROOT, 'ms-credibility', 'SKILL.md'), 'utf-8');
    // 5 capability factors
    expect(content).toContain('Data Pedigree');
    expect(content).toContain('Verification');
    expect(content).toContain('Validation');
    expect(content).toContain('Development Technical Review');
    expect(content).toContain('Development Process');
    // 6 results factors
    expect(content).toContain('Use Assessment');
    expect(content).toContain('Input Pedigree');
    expect(content).toContain('Uncertainty Characterization');
    expect(content).toContain('Results Robustness');
    expect(content).toContain('Use/Analysis Technical Review');
    expect(content).toContain('Use Process');
  });

  test('ms-credibility/SKILL.md uses 0-4 scoring scale', () => {
    const content = fs.readFileSync(path.join(ROOT, 'ms-credibility', 'SKILL.md'), 'utf-8');
    expect(content).toContain('0–4');
    expect(content).toContain('Not performed');
    expect(content).toContain('Quantitatively controlled');
  });

  test('ms-criticality/SKILL.md implements Appendix D 3x3 matrix', () => {
    const content = fs.readFileSync(path.join(ROOT, 'ms-criticality', 'SKILL.md'), 'utf-8');
    expect(content).toContain('Decision Consequence');
    expect(content).toContain('M&S Influence');
    expect(content).toContain('LOW');
    expect(content).toContain('MEDIUM');
    expect(content).toContain('HIGH');
    expect(content).toContain('Safety-Critical');
  });
});

// ─── Artifact templates validation ─────────────────────────

describe('Artifact templates exist and have required structure', () => {
  test('ms-programmatics has all 4 artifact templates', () => {
    const templates = ['MS_INTENDED_USE.md', 'MS_CRITICALITY_ASSESSMENT.md',
      'MS_LIFE_CYCLE_PLAN.md', 'MS_ACCEPTANCE_CRITERIA.md'];
    for (const t of templates) {
      expect(fs.existsSync(path.join(ROOT, 'ms-programmatics', 'templates', t))).toBe(true);
    }
  });

  test('ms-development has all 5 artifact templates', () => {
    const templates = ['ASSUMPTIONS.md', 'MS_LIMITS.md', 'PERMISSIBLE_USES.md',
      'VALIDATION_REPORT.md', 'MS_CAPABILITY_ASSESSMENT.md'];
    for (const t of templates) {
      expect(fs.existsSync(path.join(ROOT, 'ms-development', 'templates', t))).toBe(true);
    }
  });

  test('ms-use has all 5 artifact templates', () => {
    const templates = ['MS_USE_RECORD.md', 'SENSITIVITY_ANALYSIS.md',
      'UNCERTAINTY_CHARACTERIZATION.md', 'MS_RESULTS_ASSESSMENT.md', 'MS_RISK_ASSESSMENT.md'];
    for (const t of templates) {
      expect(fs.existsSync(path.join(ROOT, 'ms-use', 'templates', t))).toBe(true);
    }
  });

  test('ms-reporting/templates/MS_RESULTS_REPORT.md exists', () => {
    expect(fs.existsSync(path.join(ROOT, 'ms-reporting', 'templates', 'MS_RESULTS_REPORT.md'))).toBe(true);
  });

  test('ms-credibility/templates/MS_CREDIBILITY_ASSESSMENT.md exists', () => {
    expect(fs.existsSync(path.join(ROOT, 'ms-credibility', 'templates', 'MS_CREDIBILITY_ASSESSMENT.md'))).toBe(true);
  });

  test('MS_RESULTS_REPORT.md template references all 9 reporting requirements', () => {
    const content = fs.readFileSync(path.join(ROOT, 'ms-reporting', 'templates', 'MS_RESULTS_REPORT.md'), 'utf-8');
    for (const req of ['M&S 32', 'M&S 33', 'M&S 34', 'M&S 35', 'M&S 36', 'M&S 37', 'M&S 38', 'M&S 39', 'M&S 50']) {
      expect(content).toContain(req);
    }
  });

  test('MS_ACCEPTANCE_CRITERIA.md template covers all 5 criterion categories (43a-e)', () => {
    const content = fs.readFileSync(path.join(ROOT, 'ms-programmatics', 'templates', 'MS_ACCEPTANCE_CRITERIA.md'), 'utf-8');
    expect(content).toContain('43a');
    expect(content).toContain('43b');
    expect(content).toContain('43c');
    expect(content).toContain('43d');
    expect(content).toContain('43e');
  });

  test('VALIDATION_REPORT.md template has verification AND validation sections', () => {
    const content = fs.readFileSync(path.join(ROOT, 'ms-development', 'templates', 'VALIDATION_REPORT.md'), 'utf-8');
    expect(content).toContain('## 2. Verification');
    expect(content).toContain('## 3. Validation');
    expect(content).toContain('Domain of Verification');
    expect(content).toContain('Domain of Validation');
  });
});

// ─── Preamble features ──────────────────────────────────────

describe('Preamble features in NASA skills', () => {
  const nasaSkills = [
    'SKILL.md', 'browse/SKILL.md',
    'ms-audit/SKILL.md', 'ms-programmatics/SKILL.md',
    'ms-development/SKILL.md', 'ms-use/SKILL.md',
    'ms-reporting/SKILL.md', 'ms-credibility/SKILL.md',
    'ms-criticality/SKILL.md',
  ];

  for (const skill of nasaSkills) {
    test(`${skill} contains RECOMMENDATION format`, () => {
      const content = fs.readFileSync(path.join(ROOT, skill), 'utf-8');
      expect(content).toContain('RECOMMENDATION');
      expect(content).toContain('AskUserQuestion');
    });

    test(`${skill} contains session awareness`, () => {
      const content = fs.readFileSync(path.join(ROOT, skill), 'utf-8');
      expect(content).toContain('_SESSIONS');
    });

    test(`${skill} contains Completeness Principle`, () => {
      const content = fs.readFileSync(path.join(ROOT, skill), 'utf-8');
      expect(content).toContain('Completeness Principle');
    });
  }
});

// ─── Root SKILL.md structure validation ────────────────────

describe('Root SKILL.md NASA package description', () => {
  test('describes all 7 NASA skills', () => {
    const content = fs.readFileSync(path.join(ROOT, 'SKILL.md'), 'utf-8');
    const skills = ['/ms-audit', '/ms-programmatics', '/ms-development',
      '/ms-use', '/ms-reporting', '/ms-credibility', '/ms-criticality'];
    for (const skill of skills) {
      expect(content).toContain(skill);
    }
  });

  test('describes the 4 standard phases', () => {
    const content = fs.readFileSync(path.join(ROOT, 'SKILL.md'), 'utf-8');
    expect(content).toContain('Programmatics');
    expect(content).toContain('Development');
    expect(content).toContain('Reporting');
  });

  test('mentions 43 requirements total', () => {
    const content = fs.readFileSync(path.join(ROOT, 'SKILL.md'), 'utf-8');
    expect(content).toContain('43');
  });
});

// ─── gstack-slug helper ─────────────────────────────────────

describe('gstack-slug', () => {
  const SLUG_BIN = path.join(ROOT, 'bin', 'gstack-slug');

  test('binary exists and is executable', () => {
    expect(fs.existsSync(SLUG_BIN)).toBe(true);
    const stat = fs.statSync(SLUG_BIN);
    expect(stat.mode & 0o111).toBeGreaterThan(0);
  });

  test('outputs SLUG and BRANCH lines in a git repo', () => {
    const result = Bun.spawnSync([SLUG_BIN], { cwd: ROOT, stdout: 'pipe', stderr: 'pipe' });
    expect(result.exitCode).toBe(0);
    const output = result.stdout.toString();
    expect(output).toContain('SLUG=');
    expect(output).toContain('BRANCH=');
  });

  test('SLUG does not contain forward slashes', () => {
    const result = Bun.spawnSync([SLUG_BIN], { cwd: ROOT, stdout: 'pipe', stderr: 'pipe' });
    const slug = result.stdout.toString().match(/SLUG=(.*)/)?.[1] ?? '';
    expect(slug).not.toContain('/');
    expect(slug.length).toBeGreaterThan(0);
  });

  test('output is eval-compatible (KEY=VALUE format)', () => {
    const result = Bun.spawnSync([SLUG_BIN], { cwd: ROOT, stdout: 'pipe', stderr: 'pipe' });
    const lines = result.stdout.toString().trim().split('\n');
    expect(lines.length).toBe(2);
    expect(lines[0]).toMatch(/^SLUG=.+/);
    expect(lines[1]).toMatch(/^BRANCH=.+/);
  });
});
