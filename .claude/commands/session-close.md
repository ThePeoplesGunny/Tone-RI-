# /session-close — TONE RI Session Close

Execute after completing a unit of work. Enforces the close protocol to prevent state drift.

## Required argument

$ARGUMENTS should contain: `<version> <summary>`
Example: `/session-close v4_5 gear tab phase 2 — buildRoleIndex runtime + role tag audit`

If $ARGUMENTS is empty, check git diff and recent work to infer the delivery context, then confirm with the user.

## Phase 1: Gather current state

Run in parallel:
1. `ls TONE__BETA_v*.html` — what's the current filename?
2. `git diff --stat` — what changed?
3. `git log --oneline -3` — recent commits
4. Read ROADMAP.md — current version log entry

## Phase 2: Execute close checklist

### Step 1: Version bump (if shipping a new beta)
If the delivery warrants a version bump:
1. Confirm new filename with user (e.g., `TONE__BETA_v4_5_.html`)
2. Previous file stays in root unless user directs archival

### Step 2: Update ROADMAP.md
- Append version log entry: version, date, layer status, notes
- Update "next target" if the current target is complete

### Step 3: Update TONE_CONTEXT.md
- Update "Current Feature State" header if feature state changed
- Update affected design decision entries if any decisions were made

### Step 4: Update README.md
- Update "Current Version" line

### Step 5: Update dashboard-data.js (if agent evaluations occurred)
- Only if subagents were consulted during this session

### Step 6: Verification gate (P9 — REQUIRED, blocks commit)

**Do not stage or commit until this gate passes.** This is the precondition the global framework (P9, §VI) requires; absence of it is a verification gap. Run both classes:

**6a — Behavior floor (automated, always run):**
- Open `TONE__BETA_v*.html?selftest` in a browser (a green banner = pass; red = open the console for the failing case), **or** type `runSelfTests()` in the console and confirm `failed: 0`.
- The harness covers the pure-function core (CHORD_REGISTRY SSOT, `rotateScale`, `harmonizeScale`, `identifyChord`, `computeNumeral`, `scaleSetDifference`, role index). It must be **all green** before commit. If you added engine behavior, add an assertion for it to `runSelfTests` (banner anchor `SELF-TEST HARNESS`) in the same commit.

**6b — Change-type manual checks (run the rows that apply):**
- **Engine changes** → exercise Decoder + Play Mode against the affected path.
- **Render changes** → cycle all fretboard surfaces — Chords / Scales / Theory / Decoder (heat map) / Play Mode **and Triads** (the Triads pair `triadMiniSVG`/`triadFullNeckSVG` are not yet routed through the shared chrome helpers, so they need their own look). Confirm string-thickness gradient, low-E-at-bottom, and rounded-square (not circle) root dots on every one.
- **Cross-tab state** → click a Decoder prog-card, confirm Chords/Scales/Theory pick up the active chord+key.
- **Tuning parameter** → switch to Eb or Drop D, verify the affected feature still works.
- **Data file changes** → reload app in browser, confirm no console errors.

State explicitly in the close report **what was verified and what was not** (global §V).

### Step 7: Git commit
Stage all changed files **only after Step 6 is green**. Commit message format:
```
v<X.Y>: <summary>
```
Push immediately (project convention — no local accumulation).

## Phase 3: Verification report

Report:
- Version: what it was → what it is now
- Files modified
- ROADMAP entry added
- **Self-tests: N/N green** (or the failing cases, if the gate was overridden with explicit user sign-off)
- Manual checks run vs skipped
- Any discrepancies found and resolved
