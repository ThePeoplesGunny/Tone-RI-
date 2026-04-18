# TONE — Roadmap
*Layer order is enforced. A layer cannot be built until all layers beneath it are complete.*
*This document defines what "done" means at each layer.*

---

## The Mission in One Sentence

**The hand doesn't know what the mind knows.** TONE is the translation layer — not a filing cabinet.

---

## The Three-Layer Model — What Every Layer Is Building Toward

```
PHYSICAL LAYER       The guitar as constrained HMI
                     132 positions. One tuning asymmetry. Pitch redundancy.
                     Tuning is a parameter, not a rebuild.
                           ↕ bridged by the human ↕
LOGICAL LAYER        Relationships between notes
                     Intervals, chords, scales, keys, modes, harmonic function
                           ↕ bridged by the human ↕
EMOTIONAL LAYER      What the relationships tend to produce
                     Not housed in chords — emergent from context
                           ↕ presented through ↕
PRESENTATION LAYER   Gear and signal chain
                     How physical execution reaches the listener's ear
```

Layers 0–3 built the logical layer. Layers 4–6 connect it to the emotional and physical layers. Layers 7–8 make the human the seamless bridge. Layers 9–11 extend into technique, protocol translation, and gear context.

## The Three Structural Skills — What Every Feature Serves

```
NUMBER SYSTEM          → Decoder (what function, what tendency)
CAGED                  → Chords tab: Voicings (CAGED zone voicings) + Triads (ACE zone model)
LANDMARK PENTATONIC    → Play Mode (what to play, compressed to one instruction)
```

These three form a spiral, not a sequence. Each reinforces the others.

---

## Completed Layers

### Layer 0 — Foundation ✓
- 12-note chromatic math engine
- Interval color system (12 colors, one per semitone, consistent across entire app)
- noteIndex, noteAt, intervalInfo, intervalBetween functions

### Layer 1 — Reference Surfaces ✓
- Chord voicing engine with SVG diagrams
- Scale fretboard visualization
- Theory reference — upgraded to unified interval color language
- Multiple tunings, global settings, 5 color schemes

### Layer 2 — Harmonic Analysis ✓
- Key detection algorithm (AUTO mode)
- Chord function analysis: diatonic / borrowed / secondary dominant / chromatic
- Fretboard heat map (interval color + frequency opacity)
- Manual key selection, source labels (Diatonic / Auto-detected / Preset)

### Layer 3 — Pattern Recognition ✓
- Harmonic fingerprint engine (Roman numeral sequence computation)
- Match panel (compare fingerprints across songs in library)
- Compare modal
- Library: add/edit/delete presets, song-first view, dual filter, colored fingerprint chips
- Save system: serialize PRESETS back into HTML source, download timestamped file

---

## Completed Layer 4 — Emotional Tendency (Pillar 1) ✓

#### Beta 2.6 — Play Mode + Triads + Theory Rebuild ✓ CONFIRMED
- Play Mode full-screen overlay with chord strip, nav prompt, 3-level fretboard
- Triads tab with three inversions, CAGED shape labels
- Theory tab rebuilt with interval color vocabulary, Nashville progressions, Modes parallel view, Diatonic Pattern

#### Beta 2.7 — Forward Mapping Panel ✓ CONFIRMED
- Tendency labels on prog-cards via `getTendencyLabel()`
- `TENDENCY_MAP` covering all major and minor key diatonic numerals
- Navigation Map panel: per-chord zoom indicator, tendency, target note, CAGED shape hint
- Pentatonic landmark positions: Shape 1 and Shape 4 via `getPentaLandmarks()`
- `getZoomLevel()`, `getNearestCAGED()` functions

---

## Completed Layer 5 — Scale Context (Pillar 2) ✓

#### Beta 2.8 — Scale Relationships ✓ CONFIRMED
- `findScaleNeighbors()`: finds all scales differing by exactly one interval (same cardinality only)
- `NEIGHBOR_TENDENCIES`: 12 curated tendency descriptions for interval transitions
- Rendered as clickable cards below scale fretboard
- `findPentaPathway()` + `PENTA_PATHWAYS`: bidirectional pentatonic ↔ parent scale toggle

---

## Completed Layer 6 — Physical Validation (Pillar 3) ✓

#### Beta 2.9 — Playability Engine ✓ CONFIRMED
- DEF-05 resolved: inner string muting now works
- DEF-10 resolved: span limit is position-aware
- `countMinFingers()`: barre-aware finger counting
- `assessPlayability()`: composite score + flags
- Voicing sort overhauled: strings played > contiguity > coverage > span
- All 8 CAGED open shapes verified

**Three Pillars COMPLETE** (Emotional Tendency + Scale Context + Physical Validation)

---

## Completed Layer 7 — Cross-Tab Continuity ✓

#### Beta 3.0–3.2 — UI Refactor + Fretboard Unification ✓ CONFIRMED
- `_activeContext` propagates Decoder state to all tabs
- Tab reorder: Decoder → Chords → Scales → Theory → Library
- Chords + Triads merged with Voicings/Triads toggle
- Fretboard orientation fixed (low E bottom, all renderers)
- Between-fret dot placement
- CAGED skeleton system (5 shapes, verified from actual fingerings)

---

## Completed Layer 8 — Theory Tab Activation ✓

#### Beta 3.3 — Theory Activation ✓ CONFIRMED
- DEF-14 resolved: chromatic spectrum reads `_activeContext.keyRoot`
- Theory tab fully context-aware
- Interval spectrum highlighting, active chord formula highlight
- Color legend on Decoder, Chords, Scales tabs
- `SCALE_TENDENCIES`: 16 curated tendency descriptions
- Nashville examples transposed to active key
- Mode-aware diatonic pattern

#### Beta 3.4 — Chords Tab Restructure ✓ CONFIRMED
- Triads → ACE zone model (D-G-B hardcoded, bass/chord/melody zones, source-neutral)
- Voicings → CAGED voicing map (one playable voicing per zone, interval colors, open chord tagging)
- Dead controls and static HTML removed
- Defect cleanup: preset dropdown bake-in fixed, preset area visibility fixed, 3 dead functions removed

---

## Active Layer 9 — Technique Bridge (in progress)

#### Beta 3.5 — Brewster Chord-Scale Overlay ✓ CONFIRMED
- Scales tab: 4-mode view toggle (Scale / Overlay / Chord Tones / Pentatonic)
- Overlay mode: solid filled dots for chord tones (root=red, 3rd=amber, 5th=green), blue rings for pentatonic non-chord tones, gray rings for passing scale tones
- Chord Tones mode: only chord tones on fretboard (landing pads)
- Pentatonic mode: only pentatonic tones on fretboard (comfort zone)
- CAGED zone dashed outline around nearest shape zone for active chord
- Chord context: reads `_activeContext` from Decoder prog-card click; falls back to I chord
- `_activeContext` extended with `activeChordRoot` field
- Overlay legend swaps per view mode, replaces standard interval color legend
- Dynamic insight cards via `getScaleInsights()` — pentatonic +2 tendency descriptions folded in
- Pentatonic Core and One-Note Neighbors card rendering removed from Scales tab (engine functions retained)
- Workflow and Vision overlays updated to reflect Technique Bridge as Layer 9

#### Beta 3.6 — Play Mode Navigation + Debt Cleanup ✓ CONFIRMED
- Play Mode: CAGED shape overlay on non-diatonic chords (translucent zone rectangle + shape label)
- Play Mode: forward vision — next chord's target note as diamond shapes, nav prompt forward cue
- Play Mode: approach notes — scale tones 1 semitone from next target as violet triangles (voice leading)
- Play Mode: reads global tuning setting (was hardcoded to standard EADGBE)
- Root dot distinct shape: rounded squares across all 7 fretboard renderers (rootDotSVG/rootRingSVG helpers)
- Nav prompt properly styled with CSS classes (play-nav-target, play-nav-role, play-nav-safe, play-nav-caged, play-nav-next)
- Play Mode legend: conditional items for CAGED zone, next target, approach note
- DEF-11 resolved: heat map mode toggle (interval / frequency / both) with UI buttons
- DEF-19 resolved: Eb/half-step-down and D standard/full-step-down tunings added
- DEF-20 resolved: root dot distinct shape across all renderers
- Heat map string orientation fixed (low E at bottom, matching all other renderers)
- Dead code removed: legacy VOICINGS constant, unused renderScaleRelationships()
- Workflow and Vision overlays updated to reflect 3.6 state

#### Remaining for Layer 9 completion:
- Arpeggio view: chord tones rendered for sequential playing
- Triad chaining: progression as compact triad inversions with minimal position movement
- Song route mapping: per-chord CAGED zone + register stored in preset data
- Note classification deployed to Decoder fretboard

---

## Next Target

Layer 9 — Technique Bridge (continued). Play Mode navigation complete. Next candidates: arpeggio view, triad chaining, or note classification on Decoder.

---

## Queued Layers

### Layer 10 — Protocol Translator
**Definition of done:**
- Given a song's chord progression, identify which chords depart from the pentatonic/blues (SRV) protocol
- Frame departures as specific deltas: "your pentatonic works here; over *this* chord, here's what changes"
- Surface the influence-tree context: is this song running SRV-lineage vocabulary (McCready, Shepherd) or EVH-lineage vocabulary (Cantrell, Tremonti)?
- Not a music history feature — a navigation aid. The lineage tells you which translation to apply.
- Builds on Layer 4 (tendency), Layer 5 (scale context), and Layer 9 (technique bridge)

### Layer 11 — Presentation Layer
**Definition of done:**
- Gear and signal chain context connected to songs/artists
- Scope TBD — acknowledged as part of the architecture but not yet designed
- The OSI analogy: theory = transport, fretboard = physical, gear = presentation

### Layer 9 alt — Reverse Emotion Engine
**Definition of done:**
- Input: emotional tendency target from Layer 4 vocabulary
- Output: specific chords, scales, intervals, and fretboard positions tending toward that quality
- Results filtered through Layer 6 playability
- Context modifiers surfaced: tempo, mode, chord quality as tendency-shifting factors
- **Status:** Unblocked but deprioritized relative to Technique Bridge after March 2026 scope expansion

---

## Open Technical Debt

*Deferred deficiencies. None are currently blocking. Reviewed before each new layer build.*

| DEF | Location | Severity | Issue | Resolves in |
|-----|----------|----------|-------|-------------|
| ~~DEF-03~~ | ~~`analyzeChord()`~~ | ~~HIGH~~ | ~~func:'dominant' on secondary dominants~~ | ✓ resolved 2.6.9 |
| ~~DEF-04~~ | ~~`saveAndDownload()`~~ | ~~HIGH~~ | ~~Save regex vulnerable~~ | ✓ resolved 2.6.9 |
| ~~DEF-05~~ | ~~`computeVoicings` DFS~~ | ~~HIGH~~ | ~~Inner strings cannot be muted~~ | ✓ resolved 2.9 |
| ~~DEF-10~~ | ~~`computeVoicings` span~~ | ~~MEDIUM~~ | ~~Span filter position-naive~~ | ✓ resolved 2.9 |
| ~~DEF-11~~ | ~~`currentHeatMode`~~ | ~~MEDIUM~~ | ~~Heat map mode locked to `'both'` — no UI toggle~~ | ✓ resolved 3.6 |
| ~~DEF-14~~ | ~~`renderTheory`~~ | ~~MEDIUM~~ | ~~Chromatic Spectrum hardcoded to C~~ | ✓ resolved 3.3 |
| DEF-17 | Library mode field | LOW | Mode dropdown major/minor only — modal songs cannot be accurately recorded | Architectural |
| ~~DEF-18~~ | ~~`deletePreset()`~~ | ~~MEDIUM~~ | ~~Delete with no confirmation~~ | ✓ resolved 2.6.9 |
| ~~DEF-19~~ | ~~Global tuning dropdown~~ | ~~LOW~~ | ~~Missing Eb/half-step-down and D/full-step-down tunings~~ | ✓ resolved 3.6 |
| ~~DEF-20~~ | ~~All fretboard renderers~~ | ~~LOW~~ | ~~Root dot uses same circle shape as all other intervals~~ | ✓ resolved 3.6 |

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

## Open Architectural Questions (March 2026)

- **Data strategy:** Single file vs external data files. Content scale drives this decision. Undecided.
- **Content scale:** How many songs, how much per-song data. Undecided.
- **Distilled principles format:** What does "extract the principle from a tab" look like as a concrete feature? TBD.
- **Presentation layer scope:** Gear context exists conceptually but has no designed features. TBD.

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
