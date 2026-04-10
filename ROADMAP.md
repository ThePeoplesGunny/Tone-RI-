# TONE — Roadmap
*Version history, future direction, and open questions.*
*For full project context, architecture, and feature state, see TONE_CONTEXT.md.*

---

## Next Target

Song-route mapping complete (Beta 4.2). Next candidates: penta-switch (4.3 — major/minor pentatonic context switching over dominant chords). Pipeline testing on real TiddlyWiki content. Section editor UI (manual route authoring) deferred — auto-compute covers common case.

---

## Open Technical Debt

*Deferred deficiencies. None are currently blocking. Reviewed before each new layer build.*

| DEF | Location | Severity | Issue | Status |
|-----|----------|----------|-------|--------|
| DEF-17 | Library mode field | LOW | Mode dropdown major/minor only — modal songs cannot be accurately recorded | **Closed (4.0)** — all 7 modes supported |

*All other DEFs resolved. See version log for resolution history.*

---

## Future Considerations (Not Scheduled)

**Play Mode — position density / heatmap view:** 5-fret window showing chord tone density rather than full 12-fret board. Reduces visual search area.

**Play Mode — double stop suggestions:** Given active chord, surface 3–4 specific double stops on adjacent strings that include a chord tone.

**Triads — drill mode:** Flashcard loop. Show a chord + string set, ask user to identify which inversion. The internalization mechanism.

**Pre-session briefing card:** One screen, one song, the single thing you need to know. Highest-value/lowest-effort move for actual playing improvement.

**Harmonic decision moment detector:** Decoder mode that identifies which chord in a progression is the pentatonic danger point and surfaces the correct scalar response.

**Library data verification:** Cross-reference user-entered progressions against established sources.

**Android packaging:** Capacitor wrapper. Only begins after feature-complete or explicitly scheduled.

**Marines' Hymn arrangement:** Personal arrangement goal. Tab exists but needs proper harmonic analysis and rendition development through TONE's engine.

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
