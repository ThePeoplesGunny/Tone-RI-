# TONE — Roadmap
*Version history, future direction, and open questions.*
*For full project context, architecture, and feature state, see TONE_CONTEXT.md.*

---

## Next Target

**Gear tab — Phase 2** (per `GEAR_TAB_DESIGN.md` v0.2). Design doc is agent-reviewed (Architect, UI/UX, Tone Engineer, Guitar Systems) and user-approved. Three contested decisions resolved (notation fidelity per setting, Gear tab is standalone from Play Mode, edit mode is text-only / no knob drag). Schema-level role assertion validation (Section 3.7 of design doc) is the load-bearing structural change that makes the Univibe-class hallucination impossible.

Implementation order from the design doc:
1. ~~**Phase 1**~~ — `gear-inventory.js` shipped 2026-05-03. 38 in-scope guitar-tone items across 10 categories; 81 distinct role tags; `ROLE_INDEX['univibe-modulation'] = ['mxr-m68-univibe']` confirmed (Univibe DIRECT MATCH available, Phase 90 no longer asserts that role).
2. **Phase 2** — `buildRoleIndex()` runtime + role tag audit ← **next**
3. **Phase 3** — Tone Engineer agent updated with role-index lookup + structural validation; rerun KWS recipe to verify Univibe DIRECT MATCH replaces Phase 90 substitute
4. **Phase 4** — `TONE_RECIPES` schema + first two hand-authored recipes (KWS While We Cry 1995, KWS Voodoo Child 1997)
5. **Phase 4.5** — `serializePresets → serializeDataBlocks` generalization. **Minimum-viable stopping point.** Phases 5+ are incremental rendering improvements and can ship as separate betas.

Beta 4.4 baseline holds. Zero open defects.

Pipeline testing on real TiddlyWiki content remains queued (separate from Gear tab work).

---

## Open Technical Debt

No open defects.

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
- Tremonti Mesa settings research event (before authoring Tremonti recipe in Phase 9 of Gear tab build)
- TUNING_PRESETS constant unification (small refactor; eliminates dropdown/recipe-id drift)
- Helix block-level modeling (v2 of Gear tab)

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
