# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Intent & Boundaries

**IS:** Translation layer between harmonic understanding and fretboard execution for experienced guitarists. "The hand doesn't know what the mind knows."

**IS NOT:** A tab reader. A backing-track player. A general music theory encyclopedia. A multiplayer or social platform. A mobile app (file:// single-file architecture is permanent).

## What this project is

TONE is a single-file interactive web app for experienced guitarists — a translation layer between harmonic understanding and fretboard execution. Read `TONE_CONTEXT.md` before any non-trivial change; it is the source of truth and overrides anything else when in conflict. `ROADMAP.md` carries the version log, open tech debt, and current architectural sequencing. `GEAR_TAB_DESIGN.md` carries the v0.2 design for the Gear tab — the active implementation target.

The project is under git (first commit 2026-03-27). Older provenance — pre-repo betas and superseded docs — lives in `archive/`; treat git history as authoritative for anything from late March 2026 onward.

## Current implementation target

**Gear tab — Phase 2.** Phase 1 (gear-inventory.js authoring) shipped 2026-05-03 — 38 in-scope items across 10 categories, 81 distinct role tags, `ROLE_INDEX['univibe-modulation'] = ['mxr-m68-univibe']` confirmed (Univibe-class hallucination is now structurally impossible). Phase 2 is `buildRoleIndex()` runtime + role tag audit. Implementation phases are listed in Section 6 of `GEAR_TAB_DESIGN.md`; Phase 4.5 is the minimum-viable stopping point. Read Sections 0-3 before any code work — particularly Section 3.7 (schema-level role assertion validation) and Section 3.4 (notation fidelity per setting).

The five `engineer_*.txt` source files in the repo root inform the recipe authoring effort that follows Phase 4. The KWS interview (`engineer_KWS agent interview.txt`) is the canonical good-output example and the source for the first two TONE_RECIPES seed entries.

## Working directory note (Windows)

The path is `C:\claude\TONE RI` — contains a space. **Always double-quote the path** in Bash and PowerShell calls (e.g., `"C:/claude/TONE RI/TONE__BETA_v4_4_.html"`); unquoted spaces split the argument. Prior nested layout (`Tone (RI)/` subdirectory with literal parens) was collapsed 2026-05-17 — the two-layer structure was an artifact of the (incorrect) "agents resolve from parent of repo" belief that was debunked when the orphaned-agents bug was found and fixed.

## Build, run, test

There is no build step, no package manager, no test runner. The app is a single `.html` file with embedded CSS and JS plus two external data files: `dashboard-data.js` and `gear-inventory.js`.

- **Run:** open `TONE__BETA_v4_4_.html` in a browser (double-click on Windows). Local file:// is sufficient — no server needed.
- **"Save":** the user clicks the in-app save/download button to produce a new HTML snapshot. Persistence is download-to-file, not localStorage. Treat the HTML file *as* the database.
- **Verify changes (manual, no automation):**
  - *Engine changes* — exercise Decoder + Play Mode against a preset that hits the affected path. Examples: "Would?" for song-route per-section navigation; "Little Wing" or any minor-mode song for the Dorian ghost; a dominant-chord progression (I–IV–V in major) for the major-penta ghost on V; a 7#9 chord for the chord registry parser.
  - *Render changes* — cycle through Chords / Scales / Theory / Decoder (heat map) / Play Mode and confirm two invariants hold across all five: string-thickness gradient `[2.75, 2.4, 2.05, 1.7, 1.35, 1.0]` (low E thickest) and low E at the bottom of every fretboard. Confirm root dots are still rounded squares, not circles.
  - *Cross-tab state* — click a Decoder prog-card and confirm Chords / Scales / Theory pick up the active chord+key.
  - *Tuning parameter* — switch Settings → tuning to Eb or Drop D and re-exercise the affected feature. If it breaks under alternate tuning, the abstraction is wrong.

## Repository layout (what matters)

- `TONE__BETA_v4_4_.html` — the entire app. Current beta. Bump the filename when shipping a new beta (e.g., `v4_5`); the previous file moves to `archive/`.
- `dashboard-data.js` — `AGENT_DASHBOARD` constant powering the Dashboard tab. Loaded via `<script src="dashboard-data.js">` at the bottom of the HTML. Keep in sync when dimension/loop/agent changes ship.
- `gear-inventory.js` — `GEAR_INVENTORY` constant (Gear tab Phase 1). Hand-maintained from `gear.txt`; covers 38 in-scope guitar-tone items across 10 categories (guitars / amps / cabinets / ampInABox / drives / modulation / timeBased / wahs / utility / modeler) with structured controls, switches, sides, and role tags per `GEAR_TAB_DESIGN.md` §3.1. Roles[] feed the role-index lookup and the §3.7 schema validation guard. Hand-edit the file directly when gear changes; no in-app authoring path.
- `TONE_CONTEXT.md` — mission, design axioms, feature state, design decisions ledger.
- `ROADMAP.md` — version log, open gap loops, next target.
- `gear.txt` — user's actual gear inventory. The Tone Engineer agent and `/tone-match` skill map reference tones onto this list. Never invent gear that isn't here.
- `archive/` — prior beta HTMLs and pre-repo docs. Read-only history; don't edit.
- `GEAR_TAB_DESIGN.md` — v0.2 design doc for the Gear tab; agent-reviewed and user-approved; pre-implementation. Phase 1 is the next code action.
- `.claude/commands/` — five slash-skill definitions: `session-start.md`, `session-close.md` (universal, per global framework), and `analyze-tab.md`, `distill.md`, `tone-match.md` (TONE-specific).
- `.claude/agents/` — eight subagent definitions (`hendrix.md`, `evh.md`, `srv.md`, `kws.md`, `architect.md`, `uiux.md`, `guitar-systems.md`, `tone-engineer.md`) plus `_protocol.md` (universal evaluation structure all agents follow). Claude Code resolves subagents from `<project_root>/.claude/agents/` and `~/.claude/agents/` only — it does not walk parent directories. A prior session (cdd1def, 2026-04-29) moved them to the parent folder believing parent-resolution worked; that belief was wrong and the agents were orphaned for ~19 days until the 2026-05-17 audit relocated them here.
- `engineer_*.txt` (5 files in repo root) — research source material for the Gear tab recipe-authoring effort: `narrative.txt` (general tone-pedagogy priors), `claude desktop Q&A.txt` (Marshall lineage table), `KWS agent interview.txt` (canonical recipe source — first two recipes derive from this), `pedal companies.txt` (workhorse-tier validation for owned TC/MXR/Boss pedals), `emulation.txt` (Lion '68 + PowerCab 212 Plus pairing — cab-modeling configuration and mode-by-mode settings for the user's owned amp/cab emulation rig).
- `TONE_VISION.html` — North star interaction model prototype (signal → translation → execution). Not current build. Design target for post-Gear-tab UX evolution.
- `TONE_WORKFLOW.html` — Session orientation artifact showing current workflow and gap analysis. Gap tags may be stale relative to v4.4.
- `SRV_Parallel_Patch_Sheet.html` — SRV signal chain reference artifact.
- `Be Here Now (Lead).pdf`, `Be Here Now (Rhythm).pdf`, `Be Here Now.png` — Oasis "Be Here Now" reference tab + voicing diagram.
- `SRV - Little Wing.pdf` — SRV "Little Wing" reference tab.
- `theory.png` — fretboard theory reference image.
- `KWS_Voodoo_Child_Tone_Card.{html,pdf}` — **canonical printable tone-reference artifact**. Carries the section map (above the fold), single-line signal flow strip, two-amp panel, per-knob provenance dots (worst-of-knobs aggregation per pedal), dual-notation cross-check (authored value primary, alternate notation marked with ≈), and Test Notes panel. Restructured 2026-05-03 per UI/UX agent review of the v0–v5 chain artifacts (see archive note below). **Not a basis for the Gear tab schema** — informs print-companion design for Phase 9+ recipe authoring only.
- `archive/KWS_Voodoo_Child_Signal_Chain{,_v2..v5}.{html,pdf,png}` — superseded iteration record. v0–v5 attempted a visual pedalboard-photo metaphor; UI/UX review (2026-05-03) found the metaphor itself was the wrong artifact for the use case (size-as-prominence inverted importance, no section selector, all-annotations-always-on, five design-doc violations). Retained for history; do not iterate on these.

## Code architecture inside the HTML

The HTML file is divided by `// ═══` banner comments. **Locate regions by searching for the banner string, not by line number** — line numbers drift on every edit, the banner strings are stable. Major regions:

| Region | Banner anchor (Grep this) | What lives here |
|---|---|---|
| Markup (tabs) | `<!-- ══...═ CHORDS ══ -->` and siblings (`SCALES`, `THEORY`, `DECODER`, `LIBRARY`) | Tab DOM |
| Markup (Dashboard tab) | `<!-- AGENT DASHBOARD -->` (`<section id="view-dashboard">`) | Dashboard tab DOM; rendered from `dashboard-data.js` |
| **TONE Music Theory Engine** | `// TONE MUSIC THEORY ENGINE v1.0` | Pure functions: notes, intervals, chords, scales, voicings, CAGED, render helpers |
| **Song Decoder Engine** | `// SONG DECODER ENGINE` | Key detection, chord parsing, harmonic analysis |
| Preset data | `// PRESET DATA` | Built-in song presets |
| Forward Map | `// FORWARD MAPPING — Navigation Map (Beta 2.7)` | Per-chord zoom indicator, target note, CAGED hint |
| Fingerprint engine | `// FINGERPRINT ENGINE` | Match/compare across library |
| Save/download | `// PENDING CHANGE TRACKING + SAVE/DOWNLOAD` | Snapshot serialization back into the HTML |
| **Play Mode** | `// PLAY MODE` | Full-screen overlay, target-note logic, ghosts, approach notes |
| Triads | `// TRIADS TAB — ACE Zone Model` | Triads sub-view |

When asked to change behavior, Grep the banner first to land in the right region.

### The algorithmic core (Beta 4.1 onward)

The engine is **not** a lookup table. Treat these as the single sources of truth and derive everything else:

- `CHORD_REGISTRY` — every chord type (formula, suffix, display). `CHORD_FORMULAS`, `SUFFIX_DISPLAY`, `PLAY_CHORD_INTERVALS` are computed from it. Add new chord types here, not in four places.
- `SCALE_SEEDS` + `rotateScale()` — 10 seed scales; the 6 modes derive by rotation. `SCALE_FORMULAS` is built from these.
- `harmonizeScale()` — stacks thirds on any 7-note scale to derive diatonic degree tables.
- `scaleSetDifference()` — pentatonic→parent pathway intervals are computed, not hand-typed.
- `identifyChord(notes)` — reverse lookup; use this rather than re-implementing.

Suffix cascade in `computeNumeral` is known residual debt (see ROADMAP) — should be driven from `CHORD_REGISTRY[].suffix`.

### PRESETS schema and song routes (Beta 4.2 onward)

PRESETS rows have an **additive** schema — a per-section navigation route lives alongside the flat chord list, backward-compatible:

- `chords: [...]` — flat chord progression (legacy, still required).
- `sections: [{ label, chords, ... }]` — optional per-section navigation route. When absent, `computeDefaultRoute()` synthesizes sections from Forward Map logic at render time.
- Editing a preset's chords nulls `sections` (staleness guard) — the route gets recomputed on next render.

When adding song-aware features, prefer reading `sections` (computed or authored) over reasoning about the flat `chords` array.

### Render layer (Beta 4.4)

Five fretboard SVG renderers (`fretboardSVG`, `chordFretboardSVG`, `heatMapSVG`, `buildPlayFretboardSVG`, `renderDecoderClassify`) share three chrome helpers introduced in 4.4 (Grep the banner `// ── Shared fretboard chrome helpers ──`):

- `fretboardGeometry` — coordinate math
- `fretboardSVGOpen` — opens the `<svg>` shell
- `fretboardBaseLayers` — strings, frets, inlays, fret numbers

When adding a new fretboard view, route through these helpers. The shared string-thickness gradient is `[2.75, 2.4, 2.05, 1.7, 1.35, 1.0]` (low E thickest → high E thinnest); don't reinvent it. Root dots are rounded squares via `rootDotSVG()` / `rootRingSVG()` — never plain circles. Low E renders at the **bottom** in every fretboard.

### Cross-tab state

`_activeContext` is the propagation channel — Decoder writes `activeChordRoot`, `activeChordQuality`, `activeKey`, `activeMode`; Chords / Scales / Theory tabs read from it. Manual `getElementById` + manual re-render dispatch is current; collapsing the dispatch into one helper is queued tech debt (ROADMAP).

### Tuning is a parameter

The engine is tuning-agnostic. `decoder-tuning` (hidden input, global) supplies open-string notes; `noteFromStringFret(openNote, fret)` does the math. If a feature breaks under Eb / Drop D / Open G, the abstraction is wrong — fix the abstraction, not the feature.

## Operational rules (specific to this project, not in TONE_CONTEXT)

These are coding-time constraints. Philosophical and feature-design constraints (tendency framing, distillation principle, etc.) live in TONE_CONTEXT — read its "Design Decisions" table before changing established behavior.

- **Single-file architecture is load-bearing.** A full rewrite was considered and rejected (ROADMAP April 2026 review). Don't propose splitting the HTML into modules unless the user opens that question.
- **Edit existing renderers; don't add new ones.** Five fretboard renderers already exist and were just consolidated through shared chrome helpers in 4.4. Reuse them.
- **Add chord types in one place** (`CHORD_REGISTRY`). Adding to `CHORD_FORMULAS` directly will desync `SUFFIX_DISPLAY` / `PLAY_CHORD_INTERVALS`.
- **No localStorage, no service worker, no module imports.** Persistence is download-the-HTML; the file:// runtime forbids the rest. Don't introduce them as "small fixes."
- **No external runtime dependencies** beyond the Google Fonts import already present.

## Agents and skills

Eight subagents are defined at `.claude/agents/`. Use them proactively per their descriptions:

- **Player perspectives** (musical evaluation): `hendrix`, `evh`, `srv`, `kws`. Each produces an evaluation per `_protocol.md`.
- **Operational** (engineering evaluation): `architect` (single-file health, blast radius), `uiux` (glanceability, mid-song operability), `guitar-systems` (theory engine correctness), `tone-engineer` (signal chain mapped to `gear.txt`).

Five slash skills at `.claude/commands/` — two universal (per global framework) and three TONE-specific:

- `/session-start` — verify project state at session boundary (universal, P4)
- `/session-close` — close protocol + delivery mechanism (universal, P5)
- `/analyze-tab` — tab → harmonic analysis + technique inventory + transferable principles
- `/tone-match` — reference tone → signal chain recipe against user's gear
- `/distill` — orchestrator that routes through agent quality gates

All agents follow the universal evaluation structure in `_protocol.md` (Target → Current State → Gap → Domain Assessment → Recommendation → Conditions → Provenance). Agent outputs are designed to be comparable and synthesizable; preserve that structure when consulting them.

## Locked Decisions

Decisions made with deliberate analysis. Do not relitigate without new evidence (per global P6).

| # | Decision | Rationale | Date |
|---|----------|-----------|------|
| 1 | Single-file architecture is load-bearing | Full rewrite considered and rejected (ROADMAP April 2026 review). Performance acceptable, deploy simplicity critical. | 2026-04 |
| 2 | No localStorage, no service worker, no module imports | file:// runtime forbids them. Persistence = download-the-HTML. | 2026-03 |
| 3 | Edit existing renderers; don't add new ones | 5 fretboard renderers consolidated through shared chrome helpers in 4.4. Adding a 6th fragments the chrome layer. | 2026-05 |
| 4 | CHORD_REGISTRY is the single source for chord types | Adding to CHORD_FORMULAS directly desyncs SUFFIX_DISPLAY / PLAY_CHORD_INTERVALS. | 2026-04 |
| 5 | No external runtime dependencies | Beyond the existing Google Fonts import. Keeps file:// clean. | 2026-03 |
| 6 | Gear inventory hand-maintained, not in-app authored | gear-inventory.js edited directly from gear.txt. No CRUD UI. | 2026-05 |
| 7 | Single-layer project structure (no nested `Tone (RI)/` subdir) | Two-layer structure was an artifact of the (incorrect) "Claude Code resolves `.claude/agents/` from parent of repo" belief that drove commit `cdd1def` (2026-04-29). When that belief was debunked (2026-05-17 audit; GitHub #31179) and agents were relocated into the repo, the only remaining reason for the nesting was gone. Collapse executed 2026-05-17 — all inner contents (including .git) moved up to `C:\claude\TONE RI\`. Eliminates parens-in-path quoting friction and `../` references throughout CLAUDE.md and skills. | 2026-05 |

## Cross-Project Connections

- **wiki pipeline** → TONE RI: YouTube guitar transcript corpus feeds tone injection candidates and reference material.
- **Instructor** ← TONE RI: Guitar-domain knowledge (SRV/KWS lineage, fretboard interaction model) shared with Instructor's electric blues curriculum.

## Versioning convention

The current file is `TONE__BETA_v<major>_<minor>_.html`. When shipping a beta:

1. Save as new filename with bumped version (e.g., `v4_4_` → `v4_5_`).
2. Update `README.md` Current Version line.
3. Append a row to the ROADMAP Version Log with layer status and notes.
4. Update TONE_CONTEXT "Current Feature State" header and any affected sections.
5. Move the previous HTML to `archive/` only when explicitly directed — recent betas often stay in root for quick comparison.
