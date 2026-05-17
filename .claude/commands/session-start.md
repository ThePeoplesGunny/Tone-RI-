# /session-start — TONE RI State Verification

Run at the beginning of every session to verify project state before work begins.

## Gather state (all in parallel)

1. **Read CLAUDE.md** — extract current implementation target, version, operational rules
2. **Read ROADMAP.md** — extract current target, version log, open tech debt
3. **Read TONE_CONTEXT.md** — extract mission statement (first 20 lines), current feature state header
4. **Check main file** — `ls TONE__BETA_v*.html` (what version is on disk?)
5. **Check data files** — `ls dashboard-data.js gear-inventory.js` (both must exist)
6. **Git status** — `git status` (uncommitted changes?), `git log --oneline -3` (recent work)

## Cross-reference checks

### Check 1: Version alignment
Does the filename on disk (e.g., `v4_4`) match CLAUDE.md "Current implementation target" section? Does ROADMAP version log show this as the current beta?

### Check 2: Implementation target coherence
Does CLAUDE.md "Current implementation target" match ROADMAP's "next target"? If they diverge, ROADMAP takes precedence (it's the version log).

### Check 3: Data file presence
`dashboard-data.js` and `gear-inventory.js` must both exist in repo root. If either is missing, report immediately — the app won't load without them.

### Check 4: TONE_CONTEXT mission integrity
Grep TONE_CONTEXT.md for the mission phrase **"The hand doesn't know what the mind knows"** (currently lives at line 9, formatted as a bolded line). If the phrase is not found or has been altered, flag for review — the mission statement is load-bearing per CLAUDE.md "IS" section and should not silently drift.

### Check 5: Uncommitted changes
If uncommitted changes exist, describe what files are modified. These may be work-in-progress from a prior session that didn't close properly (P5 violation).

## Report format

```
SESSION START — <date>
Version: v<X_Y> (filename: <actual filename>)
Target: <current implementation target from CLAUDE.md>
ROADMAP alignment: MATCH | MISMATCH — <detail>
Data files: PRESENT | MISSING — <which>
Uncommitted: NONE | <file list>
Alignment: CLEAN | <discrepancies>
```

If discrepancies found: fix on authority of evidence (per global P4). Report what was fixed.
