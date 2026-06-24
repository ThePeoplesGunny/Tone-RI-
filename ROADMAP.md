# TONE — Roadmap
*Version history, future direction, and open questions.*
*For full project context, architecture, and feature state, see TONE_CONTEXT.md.*

---

## Next Target

**Gear tab — Phase 4** (per `GEAR_TAB_DESIGN.md` v0.2). Design doc is agent-reviewed (Architect, UI/UX, Tone Engineer, Guitar Systems) and user-approved. Three contested decisions resolved (notation fidelity per setting, Gear tab is standalone from Play Mode, edit mode is text-only / no knob drag). Phases 1–3 shipped. Phase 4 is the `TONE_RECIPES` schema: marker pair `@@TONE_RECIPES_START@@`/`@@TONE_RECIPES_END@@` in the HTML, first two hand-authored recipes (KWS While We Cry 1995, KWS Voodoo Child 1997) from verified interview data, `'be-here-now-rhythm'` prototype migrated to v1 schema. The Phase 3 rerun output is seed material for the Voodoo Child recipe (role mappings + substitutionAudit validated 2026-06-09); Phase 4 adds full per-setting provenance + authored notation.

Implementation order from the design doc:
1. ~~**Phase 1**~~ — `gear-inventory.js` shipped 2026-05-03. 38 in-scope guitar-tone items across 10 categories; 81 distinct role tags; `ROLE_INDEX['univibe-modulation'] = ['mxr-m68-univibe']` confirmed (Univibe DIRECT MATCH available, Phase 90 no longer asserts that role).
2. ~~**Phase 2**~~ — `buildRoleIndex()` runtime + role tag audit shipped 2026-05-17. `<script src="gear-inventory.js">` added (Phase 1 leftover); `window.ROLE_INDEX` built at load with `resolveRole()`/`roleIndexGaps()` helpers; 81 roles / 38 items / 2 side-units verified via Node. Spot-check: Univibe/Klon/Plexi/Brown Sound/5150/Mesa Rec COVERED; JCM800/Hiwatt → `helix-fallback`; Octavia → §3.5 `explicit-skip` (all expected). Consistency fix: `high-gain-overdrive` removed from two amp heads (was polluting the OD-pedal role).
3. ~~**Phase 3**~~ — shipped 2026-06-09. (a) §3.7 reverse guard implemented: `validateRecipeRoles()` in the HTML next to the role index + `validate-recipe-roles.js` CLI (extracts the shipped validator — no drift) + 6 new self-test assertions (Phase 90 ↦ univibe-modulation REJECTED is now a permanent regression). (b) Tone Engineer agent updated: Recipe Mode — Role Index Protocol with the §5.1 mandatory traversal, emit-time validation, LD#8 quality-ordering reconciliation. (c) Role-vocabulary review resolved (81 → 74 roles): deleted description-only tags (`evh-eruption-swirl`, `evh-rhythm-shimmer`, `hendrix-rhythm-texture`, `watery-modulation`, `lush-modulation`, `studio-wah`), kept `cae-circuit` (legitimate circuit query target, now documented), renamed `srv-boost`→`srv-substitute`, `kws-boost`→`kws-1997-substitute`. (d) KWS Voodoo Child 1997 acceptance rerun through the corrected agent: Univibe DIRECT MATCH (`mxr-m68-univibe`), era-locked, recipe VALID; negative test (Phase 90 asserting univibe-modulation) REJECTED exit 1. (e) Hardening from live evidence: first rerun emitted invented audit methods (`role-analog`) — validator now also rejects `substitutionAudit[].method` outside the §3.5 enumeration (`SUBSTITUTION_METHODS`); rerun corrected, Octavia restored to `explicit-skip` per the documented user agreement (P6). Self-tests 29/29 green (headless Edge run — see CLAUDE.md verify section for the command).
4. **Phase 4** — `TONE_RECIPES` schema + first two hand-authored recipes (KWS While We Cry 1995, KWS Voodoo Child 1997) ← **next**. **Includes a §3.7 validator hardening requirement (P13 / G-VAL-1 below): when the entry-key set is defined, `validateRecipeRoles()` must reject *unrecognized* chain-entry keys, not only mismatched role values.**
5. **Phase 4.5** — `serializePresets → serializeDataBlocks` generalization. **Minimum-viable stopping point.** Phases 5+ are incremental rendering improvements and can ship as separate betas.

Beta 4.4 baseline holds. Zero open defects.

Pipeline testing on real TiddlyWiki content remains queued (separate from Gear tab work).

---

## Open Technical Debt

**G-VAL-1 (P13 / Pattern D — surfaced by 2026-06-24 framework-audit).** `validateRecipeRoles()` (HTML §3.7 guard + `validate-recipe-roles.js` CLI) is an **allowlist of role *values* but not of entry *keys*** — line `if (entry.role != null && ...)` means a chain entry with a *mistyped* key (e.g. `roleAssertion` instead of `role`) carries no `role`, so the assertion is silently skipped and the recipe validates VALID/exit 0. Confirmed live: a recipe entry asserting `roleAssertion: 'univibe-modulation'` passes the guard. **Why it matters:** the guard exists to make the KWS Phase-90 miss class impossible; a typo'd key is a hole in exactly that guard, directly in Phase 4's recipe-authoring path. **Owner:** Phase 4 (the legal entry-key set — settings/provenance/notation per §3.3/§3.4 — is what the `TONE_RECIPES` schema defines, so the fix belongs with the schema, not a blind pre-Phase-4 patch). **Behavior check (must go green in Phase 4 close):** a recipe with `roleAssertion` in place of `role` exits 1, AND a new self-test assertion locks it (the regression cannot silently return). **Doc gap (closed 2026-06-24):** exact chain-entry keys now stated in `tone-engineer.md` §Recipe Mode step 4.

No open defects in shipped behavior.

**7 active gap loops** (surfaced by April 2026 re-baseline, see TONE_CONTEXT "Re-baseline event"). Two are now in active service via the Gear tab build path:

| ID | W | Source | Summary | Status |
|----|---|--------|---------|--------|
| `tone-vocabulary` | 3 | KWS | Per-song tone recipe + era + signal-chain. | **In active service via Gear tab Phase 4+** |
| `per-song-tuning` | 2 | KWS | Library row cannot declare tuning; contradicts "tuning is a parameter" axiom. | **In active service via `recipe.guitar.tuning` (Gear tab Phase 4)** — note: per Guitar Systems R1, recipe tuning is authoritative for Gear tab only and does NOT propagate to Decoder/Chords/Scales/Theory |
| `mixolydian-ghost` | 2 | Hendrix + EVH | Mixolydian b7 has data in PENTA_PATHWAYS_EXT but no live Play Mode ghost. Asymmetric with renderDorianGhost. | Queued |
| `blues-b5-ghost` | 2 | Hendrix + EVH | Blues b5 lives in pathway data and Scales tab; no live render in Play Mode. | Queued |
| `two-voice-rhythm` | 2 | SRV | Thumb-bass + treble-comp simultaneity. "Pride and Joy" identity. Single-voice render model is current assumption. | Queued |
| `open-string-pedal-tone` | 1 | EVH | Drop-D / open-A drone against moving shapes ("Unchained" idiom). | Queued |
| `triad-ornament-layer` | 1 | Hendrix | Hammer-on/pull-off ornaments between triad voicings ("Little Wing" decoration). | Queued |

**Tracked follow-ups from Gear tab v0.2 (not Beta gap loops):**
- ~~**Role-vocabulary review (Phase 3, Tone Engineer agent).**~~ RESOLVED 2026-06-09 via Tone Engineer agent ruling (see Phase 3 entry above): 6 description-only tags deleted, `cae-circuit` kept and documented, `srv-boost`/`kws-boost` normalized to the `*-substitute` pattern. 74 roles in the live index post-review.
- **LD#9 power/provenance — residual unconfirmed (2026-05-18 pass).** 26 pedals + MONDO stamped; **COMPLETE — all 27 `confirmed`, 0 `unconfirmed` (100%, 2026-05-18).** Owner attestation (top P2 tier) resolved every residual: `line-6-helix` corrected (internal PSU + standard IEC AC mains; prior DC-3-brick research was wrong), `king-tone-duellist` (9–18V, 2.1mm center-neg, ~10mA, ≥100mA isolated rec.), `evh-5150-od` (9V DC or 9V battery; mA still secondary, flagged in note), `fulltone-supa-wah` (9/18V, 5.5/2.1mm center-neg, 11mA max, 9V battery), `ibanez-ts808-35th` (9V/8mA center-neg, 9V battery — connector corrected to 1/8" 3.5mm jack per the faithful-to-1979 circuit, not a 2.1mm barrel). Duellist + Supa-Wah carry owner-attested voltage-as-tone-control behavior in notes/typicalDeployment. Via manual earlier: Flashback 2 (renamed, verbatim manual; §4.1/§9 self-conflict, conservative ≥300mA, P14), HoF2, MC404 boost `+15dB`→`+20dB`. No open items. Via manual: `tc-flashback-delay` → attested **Flashback 2** (renamed; verbatim TC manual; §4.1 "100mA" vs §9 ">300mA" self-conflict — conservative ≥300mA stored, P14 noted); `tc-hall-of-fame-2` confirmed; MC404 boost `+15dB`→`+20dB`. Resolve remaining 2 opportunistically.
- Tremonti Mesa settings research event (before authoring Tremonti recipe in Phase 9 of Gear tab build)
- TUNING_PRESETS constant unification (small refactor; eliminates dropdown/recipe-id drift)
- Helix block-level modeling (v2 of Gear tab)

**2026-06-06 — Trust-floor hardening (project review, P0 track on v4.4):**
- **Verification floor added.** `runSelfTests()` / `?selftest` harness in the HTML (banner `SELF-TEST HARNESS`) — 23 assertions over the pure-function core (CHORD_REGISTRY SSOT, `rotateScale`, `harmonizeScale`, `identifyChord`, `computeNumeral`, `scaleSetDifference`, role index). Browser-verified all green 2026-06-06.
- **`/session-close` now gates commit** on self-tests green + change-type manual checks (Triads tab added to the render checklist — it's the one fretboard surface the smoke test omitted).
- **Save path hardened (R1).** Versioned, collision-proof snapshot filename (`TONE__BETA_vX_Y__date_HHMM`); loud Dashboard load-guard replaces the silent throw when a relocated snapshot can't find `dashboard-data.js`.
- **Self-containment — loud-guard decision.** Full snapshot self-containment NOT pursued: gear/dashboard data are static git-backed (LD#6) so loss is recoverable; runtime inlining is infeasible under file:// (no `fetch`; `dashboard-data.js` carries functions). Revisit only if needed, with TONE_RECIPES (Phase 4) as the forcing function.
- **Residual from review (not yet done):** P1 UX — persistent context HUD, nav-prompt glance/study split. P2 — chrome consolidation of the 2 Triads renderers (docs + LD#3 still say "5 renderers"; actually **7**, 5 consolidated), `computeNumeral`→`CHORD_REGISTRY[].suffix` derivation, governance reconcile (`architect.md` DEF-17 stale vs disk). Feature track — NF1 tempo auto-advance (visual clock, no audio) → NF2 timed approach note → NF3 one-tap "why this note".

---

## Architectural Review (April 2026)

3R review (Refactor / Reengineer / Rewrite) completed:

- **Theory engine** — Refactor (light touch). 4.1 algorithmic core is real and load-bearing. Residual: `computeNumeral` suffix cascade should be driven from `CHORD_REGISTRY[].suffix`.
- **Render layer** — Reengineer. ~400 lines of duplicated fretboard chrome across 4 renderers (`fretboardSVG`, `chordFretboardSVG`, `heatMapSVG`, `buildPlayFretboardSVG`) plus partial duplicates in 4 more. Extract `fretboardChrome`, `dotLayer`, `decorations` helpers in place. No framework, no build step.
- **State / event wiring** — Refactor (small, opportunistic). 184 `getElementById` calls + manual re-render dispatch on `_activeContext` mutation. Collect dispatch into one helper.
- **Tone Engineer panel** — Don't refactor yet. Populate `TONE_RECIPES` first (covered by `tone-vocabulary` loop), then evaluate schema.
- **Full rewrite** — Rejected. Single-file architecture is load-bearing.

Sequencing: re-baseline (done) → fretboard chrome extraction → render-template cleanup → engine numeral fix → state dispatch helper.

---

## Future Considerations (Not Scheduled)

**Play Mode — position density / heatmap view:** 5-fret window showing chord tone density rather than full 12-fret board. Reduces visual search area.

---

## Open Architectural Questions (April 2026)

- **Data strategy:** Single file vs external data files. Content scale drives this decision. Undecided.
- **Content scale:** How many songs, how much per-song data. Undecided.
- ~~**Distilled principles format:**~~ Resolved — `/distill` skill defines the format: harmonic analysis + technique inventory + tone recipe + transferable principles, routed through agent quality gates.
- ~~**Presentation layer scope:**~~ Partially resolved — Tone Engineer agent + `/tone-match` skill provide gear-to-song mapping against user's rig. In-app UI features for gear context still TBD.

---

## Version Log

| Beta | Layers Complete | Notes |
|------|----------------|-------|
| 1.x  | 0, 1           | TiddlyWiki migration, native HTML, chord/scale/theory tabs |
| 2.0  | 2              | Decoder, key detection, chord analysis, heat map |
| 2.1  | 2 (extended)   | Manual key override, PRESETS architecture |
| 2.2  | 3              | Fingerprint engine, match panel, compare modal, library, save system |
| 2.3  | 3 (extended)   | Library edit mode |
| 2.4  | 3 (extended)   | Library song-first view, colored fingerprint chips |
| 2.5  | 3 (extended)   | Library dual filter |
| 2.5.1 | 3 (extended) | Pre-2.6 patch: DEF-03 secondary dominant func field, DEF-09 minor borrowing expanded, DEF-04 save regex anchored |
| 2.5.2 | 3 (extended) | Deficiency patch: DEF-01 baseFret SVG fix, DEF-06 detectKey minor tiebreaker, DEF-07 V/X chip color, DEF-08 slash chord parse, DEF-12 SVG theme colors, DEF-13 switchView re-render, DEF-15/16 dead code removed, DEF-18 delete confirmation |
| 2.6  | 4 (partial)    | Play Mode, Triads tab, Theory rebuild, target note navigation |
| 2.6.9 | 4 (partial)  | Deficiency patch: DEF-03 func:'secondary' fix, DEF-04 save regex anchored (@@PRESETS markers), DEF-18 delete confirmation restored |
| 2.7  | 4 (complete)   | Forward mapping panel — tendency labels, navigation map, zoom spectrum, CAGED hints, pentatonic landmarks. Layer 4 Pillar 1 COMPLETE. |
| 2.8  | 5 (complete)   | Scale relationships — one-note neighbor network, pentatonic expansion pathway. Layer 5 Pillar 2 COMPLETE. |
| 2.9  | 6 (complete)   | DEF-05 + DEF-10 resolved. Playability engine. Three Pillars COMPLETE. |
| 3.0  | 7 (complete)   | Cross-tab continuity (_activeContext), tab reorder, Chords+Triads merged, CAGED labels. |
| 3.1  | 7 (extended)   | Unified chord fretboard, inversion opacity, CAGED zone overlays. |
| 3.2  | 7 (extended)   | Fretboard orientation fix, between-fret dots, CAGED skeleton from actual fingerings. |
| 3.3  | 8 (complete)   | DEF-14 resolved. Theory activation: context-aware rendering, interval highlighting, active chord formula, color legend, scale tendencies, Nashville transposition, mode-aware diatonic pattern. Layer 8 COMPLETE. |
| 3.4  | 8 (extended)   | Chords tab restructure: ACE zone model + CAGED voicing map. Defect cleanup: preset dropdown bake-in, preset area visibility, 3 dead functions removed. |
| 3.5  | 9 (partial)    | Brewster chord-scale overlay on Scales tab. 4-mode view toggle, note classification (solid/ring), CAGED zone outline, chord context from Decoder, dynamic insight cards with pentatonic+2 folded in. Pentatonic Core + One-Note Neighbor cards removed from UI. Workflow/Vision overlays corrected to Technique Bridge. |
| 3.6  | 9 (extended)   | Play Mode: CAGED shape overlay (non-diatonic), forward vision (next target diamonds), approach notes (voice leading triangles). DEF-11/19/20 resolved. Root dot squares across all renderers. Heat map orientation fix. Eb + D standard tunings. Heat map mode toggle. Dead code cleanup. Nav prompt CSS. |
| 3.7  | 9 (extended)   | Scales tab: universal interval color system (all 4 view modes use iv.color, role conveyed by rendering not color). Redundant Color Key removed. Layout shift fix across view modes. Agent Dashboard tab: Hendrix/EVH/SRV evaluation framework with weighted priorities, consensus, conflicts. Project docs consolidated. |
| 3.8  | 9 (extended)   | Engine: 7#9 chord type (CHORD_FORMULAS, parser, Play Mode, Chords dropdown). PENTA_PATHWAYS_EXT: minor→Dorian (natural 6th) + minor→Blues (b5), findAllPentaPathways() surfaces all expansion options in insight cards. Dashboard: expanded to 7 agents (Architect, UI/UX, Guitar Systems Engineer, Tone Engineer) + 3-skill distillation pipeline (/analyze-tab, /tone-match, /distill). W3 priorities resolved. |
| 3.9  | 9 (near-complete) | Engine 100%: 5 chord types added (min9, 13, maj13, 7sus4, aug7) + Mixolydian pathway. Bug fixes: chromatic approach notes (half-step below always included), Dorian ghost in Play Mode. Features: Decoder classify mode (4th heat mode), arpeggio view (dual-mode: position + wide/tapping), triad chaining (voice-leading optimized inversions). Architecture: dashboard data extracted to dashboard-data.js, all KPIs computed from live data, SUFFIX_DISPLAY single source of truth, global methodology codified, universal agent evaluation protocol. |
| 4.0  | 9 (complete)      | MILESTONE. DEF-17 closed: Library + Decoder mode fields support all 7 modes (Major, Dorian, Phrygian, Lydian, Mixolydian, Minor, Locrian) with isModeMinor() helper for engine-wide mode-family routing. CAGED zone overlay on ALL chords (trust Stevie): subtle treatment on diatonic, bold on non-diatonic — spatial anchoring always present. Forward Map shows CAGED hint for every chord. Nav prompt includes position info on diatonic chords. Zero open defects. Orphaned v3.5 file removed. README updated. Layer 9 structurally complete. |
| 4.1  | 9 (algorithmic)   | Engine refactored from lookup tables to algorithmic core. CHORD_REGISTRY: single source of truth for all chord data (4 redundant structures → 1 + computed views). SCALE_SEEDS + rotateScale(): 10 seed scales, 6 modes derived by rotation. scaleSetDifference(): pentatonic pathway intervals computed, not hand-typed. harmonizeScale(): stacks thirds on any 7-note scale, derives diatonic degree tables. Modal borrowing detection uses label map. New capabilities: identifyChord(notes) reverse lookup, detectModulations() key center tracking, harmonizeScale() public API. Zero regression — snapshot verified. |
| 4.2  | 9 (song-route)    | Song-route mapping: per-section navigation routes stored in PRESETS. Schema: additive `sections` array alongside flat `chords` (backward-compatible). computeDefaultRoute() auto-computes sections from Forward Map logic. renderSongRoute() Route Brief panel in Play Mode (pre-flight study). Section-aware chord strip with dividers. Section-grouped Forward Map in Decoder. Staleness guard nulls sections on chord edit. Would? (Alice In Chains) hand-authored as test case. Navigation KPI 8/8 (100%). |
| 4.3  | 9 (penta-switch)  | Major pentatonic ghost overlay on dominant chords. isDominantQuality() triggers on chords with major 3rd + minor 7th. renderMajorPentaGhost() shows chord-root major penta tones not already visible (key penta and chord tones excluded). Dashed-stroke ghost dots in Play Mode (Pass 1.3), Forward Map "♦ major penta" annotation, nav prompt hint. Additive visual layer — no engine model change. All evaluation gaps closed. |
| 4.3.1 | 9 (patch) | Fix `\|\| 12` fret-0 collapse in CAGED anchoring. Five sites removed substitution that forced fret 0 → fret 12 when a chord root (or key landmark) matched an open-string note. Affects minor-key Shape 1/4 landmarks and E-shape/A-shape chord positions when the root matches a tuning open string (E chord in standard, A chord in standard, etc.). CAGED zones and landmark positions now anchor correctly in open position. |
| 4.4 | 9 (refactor + dashboard) | **Render-layer reengineer** — 5 fretboard SVG renderers (`fretboardSVG`, `chordFretboardSVG`, `heatMapSVG`, `buildPlayFretboardSVG`, `renderDecoderClassify`) consolidated through 3 shared chrome helpers (`fretboardGeometry`, `fretboardSVGOpen`, `fretboardBaseLayers`). Net −135 lines of inline duplication. **Play Mode thickness fix** — `buildPlayFretboardSVG` previously inverted the string-thickness gradient (low E thinnest, high E thickest); unification through the shared helper restores the correct `[2.75, 2.4, 2.05, 1.7, 1.35, 1.0]` gradient that matches the rest of the app. **Dashboard re-baseline** — 4 player agents (Hendrix, EVH, SRV, KWS) re-evaluated 9 dimensions against current code with file:line citations after discovering ~30-commit window where agent files were misfiled. 10th dimension added (Tone/era context per song, KWS lens). 7 new gap loops surfaced. KWS added to operational agents list. Render code averaging logic now tolerates partial agent coverage. |
