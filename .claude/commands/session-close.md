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

### Step 6: Git commit
Stage all changed files. Commit message format:
```
v<X.Y>: <summary>
```
Push immediately (project convention — no local accumulation).

## Phase 3: Verification

Report:
- Version: what it was → what it is now
- Files modified
- ROADMAP entry added
- Any discrepancies found and resolved

## Verification by change type (P9)

- **Engine changes** → exercise Decoder + Play Mode against affected path before commit
- **Render changes** → cycle all 5 tabs, confirm string gradient + low-E-bottom + rounded-square roots
- **Cross-tab state** → click Decoder prog-card, confirm propagation
- **Tuning parameter** → switch to Eb or Drop D, verify feature still works
- **Data file changes** → reload app in browser, confirm no console errors
