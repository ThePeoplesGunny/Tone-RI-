# TONE — Session Checklist
*Run this at the start of every session, in order, before writing any code.*

---

## Step 1 — Load Context
- [ ] Search project knowledge for `TONE_CONTEXT` and read it fully
- [ ] Confirm current beta filename matches what TONE_CONTEXT.md states
- [ ] Re-read: Mission Statement ("the hand doesn't know what the mind knows")
- [ ] Re-read: The Knowledge Hierarchy (data → information → knowledge — TONE operates at the data→information boundary)
- [ ] Re-read: The Three Structural Skills (Number System, CAGED, Landmark Pentatonic — the spiral)
- [ ] Re-read: Zoom In / Zoom Out (the navigation spectrum — diatonic = safe, non-diatonic = zoom in)
- [ ] Re-read: Core Axiom (base tendency, not absolute identity)
- [ ] **Debt scan:** Review open DEFs in ROADMAP.md *Open Technical Debt* section. For each open DEF, determine whether it affects any function the requested feature reads from. If yes, classify as blocking — it must be resolved before building begins.

## Step 2 — Load Source
- [ ] Read the current beta HTML file before touching anything
- [ ] Confirm JS functions relevant to the requested change are located and understood
- [ ] Do not assume function names or structure from memory — verify in source

## Step 3 — Validate the Request
- [ ] Does the requested feature serve the chain: Notes → Relationships → Emotion → Fretboard execution?
- [ ] Does it compress the guitarist's decision cycle at the moment of chord change?
- [ ] Does it connect the three structural skills (Number System, CAGED, Landmark Pentatonic) or serve one of them?
- [ ] Does it make the zoom-in/zoom-out decision clearer for the player?
- [ ] If it introduces emotional labels: do they express tendency, not identity?
- [ ] Does it curate and connect universal principles — no branding, no gatekeeping, no gimmicks?
- [ ] Is it blocked by an incomplete lower layer? Check the building block map in TONE_CONTEXT.md.
- [ ] Is it explicitly requested this session? If not, do not build it.

## Step 4 — Plan Before Code
- [ ] State what functions will be added or modified
- [ ] State what CSS will be added or modified
- [ ] State what HTML will be added or modified
- [ ] Identify any risk of breaking existing functionality
- [ ] If adding emotional labels: confirm the full label set is defined before writing any code

## Step 5 — Build
- [ ] Make changes surgically — touch only what is required
- [ ] Do not reorganize, rename, or refactor adjacent code
- [ ] Do not add features beyond what was requested

## Step 6 — Validate
- [ ] Extract script block and run `node --check` on JS
- [ ] Confirm all modified functions are present in output
- [ ] Confirm no accidental deletions
- [ ] If emotional labels added: verify all function types are covered (tonic / subdominant / dominant / borrowed / secondary / chromatic)

## Step 7 — Deliver
- [ ] Copy final file to `/mnt/user-data/outputs/`
- [ ] Present file to user
- [ ] State exactly what was changed and what was not
- [ ] Do not describe future work unless asked

## Step 8 — Update Project Files (REQUIRED — not optional)
*Triggered when user confirms a beta is good. Produce these before the session closes.*

- [ ] ROADMAP.md — add version log entry, mark completed layer/stage done, mark next target active
- [ ] ROADMAP.md *Open Technical Debt* — close any DEFs resolved this session; add any newly discovered DEFs
- [ ] TONE_CONTEXT.md — update feature state for affected tabs, close resolved gaps, add new design decisions
- [ ] **Workflow overlay** (inside HTML source) — update tab feature lists, engine items, layer badges, and pillar status to reflect current build
- [ ] **Vision overlay** (inside HTML source) — update "What's Built" checkmarks and "What's Next" section if the next target has changed
- [ ] SESSION_CHECKLIST.md — update only if build protocol or hard stop rules changed
- [ ] Memory entries — update beta version and any changed state
- [ ] Inform user: "Here are the updated project files. Replace the existing versions in the project."

*If a beta is confirmed and Step 8 is not completed, the session is not done.*

---

## Hard Stops — Stop and ask the user before proceeding

- Requested feature requires a new external dependency
- Requested feature would break the single-file architecture
- Requested feature skips a layer in the building block map
- Requested feature has already been built and is being asked again (regression risk)
- Conflicting instructions exist between the request and TONE_CONTEXT.md
- Emotional label uses identity framing ("means X") instead of tendency framing ("tends toward X")
- Feature presents five CAGED shapes as equal (use three practical pairs: A/G, E, D/C)
- Feature presents five pentatonic boxes (use two landmarks: Shape 1, Shape 4)
- Feature adds branding, proprietary framing, or commercial language to universal principles
- **Open blocking debt found** — a DEF in the open list touches a function the requested feature reads from; resolve the debt before building
- Session is closing after a confirmed beta and Step 8 has not been completed
