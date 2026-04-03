# TONE — Project Context Document
*Source of truth for all development sessions. Read before building anything.*
*If this document conflicts with anything else, this document wins.*

---

## Mission Statement

**The hand doesn't know what the mind knows.**

TONE is the translation layer between the mind and the hand. A guitarist with 20+ years of deep listening can *hear* when a note is right. They *feel* harmonic arrivals. They *know* when something is wrong before they can say why. The ear is calibrated. The mind understands. But the hand — trained by decades of pentatonic muscle memory — does what it has always done unless the mind intervenes with a specific, timely, correct instruction.

TONE takes what the mind knows abstractly and compresses it into what the hand needs concretely: which note, where on the neck, at the moment the chord changes.

**The app succeeds when the guitarist no longer needs it** — when the hand has internalized what the mind already knew, and the translation happens without conscious intervention.

### The Precise User This Tool Serves

TONE addresses one specific user state — the most underserved state in all of guitar pedagogy:

> **A guitarist who can already hear the territory but has no vocabulary to navigate it consciously — and therefore cannot reproduce what they can hear.**

This is not a beginner. Beginners need ear training. This user's ear is already calibrated — thousands of hours of deep listening to emotionally affecting music have built an internal map of the territory. They hear when a note is right. They feel the arrival. They know when something is wrong before they can say why.

The failure is not the ear. The failure is the gap between recognition and reproduction — between the mind and the hand.

**TONE's specific job: name what the ear already knows, then show the hand where to go.**

### The Milestone Pivot (March 2026)

TONE is evolving from a theory engine into a full replacement for the previous TiddlyWiki-based knowledge management system. But this is NOT a data migration. The TiddlyWiki was a filing cabinet — 686 tiddlers organizing songs, artists, gear, tabs, and references. TONE must not become a filing cabinet.

**The distillation principle:** Curated content (tabs, transcriptions, instructional material, gear settings) is raw material. TONE's job is to extract the enduring principles from that material and present them in a form that transfers across songs. Tablature is GPS — it gets you to the destination, but you didn't learn the road. TONE builds the internal map so you can navigate any road.

Content earns its place in TONE only if it serves the translation mission. If it can't be distilled into a principle that transfers, it stays in the filing cabinet.

---

## Design Axioms — Non-Negotiable

1. **The guitar is a finite HMI.** 6 strings × 22 frets = 132 positions. The tuning is a parameter, not a rebuild — Eb, Drop D, Open G all run on the same engine. The theory is universal; only the labels on the open strings change.

2. **No practice/performance distinction.** The user plays along with music in real time. TONE must be usable at a glance without breaking flow. There is no separate "study mode."

3. **Tab is GPS. TONE is the internal map.** Tab tells you what fret to press. It doesn't tell you why. TONE distills the *why* so the player can navigate without the tab.

4. **TONE is not a filing cabinet.** Content is not stored for retrieval. Content is distilled into principles that transfer. Once internalized, the reference material can evolve — but the principle persists.

5. **Curated content is raw material.** A 10-year library of accuracy-verified tabs represents ground truth of what artists actually played. TONE extracts the harmonic decisions, navigation patterns, and protocol translations — the ore becomes metal, and you don't put ore in the airplane.

---

## The Knowledge Hierarchy — What TONE Actually Does

```
DATA          Raw, context-free symbols.
              A note is 440Hz. A chord is 1-♭3-5.
              Scale formulas. Interval names. Fret numbers from a tab.
              Inert. No relationships. No meaning.

INFORMATION   Data structured by relationships.
              "This ♭VI resolves deceptively because it substitutes
              for the expected IV."
              Shannon lives here — surprise, entropy, pattern-against-
              expectation. Data becomes meaningful only with a frame.

KNOWLEDGE     Information internalized through experience until it
              drives action without conscious retrieval.
              The guitarist who hears the ♭VI arriving and already
              knows where their hand goes.
```

**The problem this user faces:** Raw data (tab fret numbers, scale shapes) cannot become knowledge because there is no information layer connecting them. Every new song starts from zero. Memorized patterns don't transfer. The diagnosis is exact: **information without structure.**

**TONE operates at the data→information boundary.** It takes inert theory data and structures it through relationships, emotional tendency, harmonic context, and fretboard geography. But the information→knowledge transition only happens through playing — through reps with the guitar in hand.

**TONE cannot create knowledge directly.** It can compress the information layer so the experience-to-knowledge loop runs faster and — critically — runs CORRECTLY. A wrong calculation practiced a thousand times builds the wrong reflex. TONE ensures the calculation is right.

---

## The Fretboard Is Finite — The Instrument as HMI

A standard guitar: 6 strings × 22 frets = 132 positions. Not infinite. The *perception* of infinity comes from combinatorial explosion — how many ways can you select and sequence from 132 positions. But the positions themselves are fixed, physical, countable.

The tuning (EADGBE) is a deliberate compromise. Strings are tuned in perfect fourths except ONE asymmetry: the G→B interval is a major third, not a fourth. That single break in the pattern is why every scale shape shifts one fret on the B string. It's not a quirk to memorize — it's a design consequence. The tuning was optimized for open chord harmony at the cost of geometric consistency.

The guitar's unique property: the same pitch exists in multiple locations. A440 lives at fret 5/string 1, fret 10/string 2, fret 14/string 3. This redundancy is both why the fretboard feels overwhelming and why CAGED works — the same chord exists in five physical locations.

Every "weird" shape on the fretboard traces back to one asymmetry + pitch redundancy. Understand those two facts and the instrument becomes a system, not a mystery.

Tuning is a parameter of the HMI layer. Eb tuning is a one-fret mathematical shift — the engine handles it, the theory doesn't change. Every feature must respect this: if a feature breaks under alternate tuning, the abstraction is wrong.

---

## The Three Structural Skills — TONE's Backbone

Three foundational skills carry most of the weight across all styles. They are not TONE's invention — they are established professional frameworks (Nashville Number System since the 1950s, CAGED since the 1970s, pentatonic shapes as old as the instrument). TONE's job is to **curate and connect** them — apply them to specific songs with emotional context and failure-point identification. No branding. No gatekeeping. No gimmicks.

### NUMBER SYSTEM (harmonic relationships)
What chords are in a key and how they relate to each other.
- TONE's Decoder already owns this layer
- Chord function analysis, tendency labels, borrowed/secondary detection
- The "why" behind chord choices

### CAGED (spatial geography)
Where every chord lives in every position on the neck.
- The bridge between harmonic understanding and physical execution
- Three practical shape pairs (A/G, E, D/C) — not five theoretical shapes
- Triads tab is the entry point; forward mapping deepens it
- The "where" that makes chord tones visible during soloing

### LANDMARK PENTATONIC (navigational framework)
Two shapes (Shape 1: root on E string, Shape 4: root on A string) plus diagonal extensions. Not five boxes — two landmarks.
- Play Mode already targets the decisive note per chord
- The "what to play" compressed to the minimum actionable instruction

### The Spiral

These three skills form a **spiral, not a sequence.** Getting better at CAGED improves pentatonic playing (chord tones become visible inside scale positions). Getting better at the Number System makes CAGED meaningful across songs (shapes connect to function, not just position). Each reinforces the others. TONE's architecture must reflect this interconnection.

**The corrected mapping:** All three skills must be co-present at the point of action, not siloed to separate tabs.

```
At any moment of fretboard navigation, the guitarist needs:
  NUMBER SYSTEM    — why (what is this chord doing, what tendency)
  CAGED            — where (what shape contains the target, what zone am I in)
  PENTATONIC       — what (which notes are available, which is the target)

These are not three overlays. They are three components of one instruction.
The CAGED shape is the map. The number system labels the territory.
The pentatonic landmarks show what the hand already knows.
The target note collapses the choices to one.
```

### Song Lifecycle — The Distillation Pipeline

A song moves through TONE in stages. Each stage builds the internal map:

1. **Analyze** — Decoder breaks down the progression (harmonic function, tendency, zoom points)
2. **Map** — Route plotted through CAGED territory (which zone, which register, per section)
3. **Brief** — Study the route before picking up the guitar (the pre-flight)
4. **Play** — Reps with the guitar in hand. The ear calibrates the hand to the route.
5. **Internalize** — The route becomes muscle memory. TONE is no longer needed for this song.
6. **Transfer** — Pattern vocabulary built from this song applies to the next one.

The song is fixed. The route through it is fixed. Song by song, route by route, the pattern vocabulary builds until the ear and the hand close the gap without conscious intervention. This is the information→knowledge transition that TONE compresses but cannot replace.

---

## The Three New Layers — March 2026 Expansion

These layers extend the spiral into territory the theory engine alone cannot reach.

### TECHNIQUE BRIDGE (chord-scale overlay + melodic navigation)

The engine already knows chord tones in every CAGED zone and scale positions across the neck. What's missing is presenting this data as **melodic navigation patterns** — the view that shows how to *move through* a chord, not just grab it.

This is the Brewster principle: take a chord shape and a pentatonic scale in the same position, overlay them, then use the combined tones for melodic movement. Arpeggios, chord-scale overlay, triad chaining through progressions — all use data TONE already computes. The gap is the view, not the engine.

Arpeggios are not a separate data type. They are chord tones rendered for sequential playing rather than simultaneous strumming. This may be a new sub-view on existing tabs, a Play Mode enhancement, or both — the concrete shape is TBD.

**Note classification within the scale:** Between chord changes, the guitarist moves through scale tones. Three categories matter:

| Category | Function | Visual treatment |
|----------|----------|-----------------|
| Chord tones | Landing points. Safe to rest on. Belong to the current chord. | Full prominence — interval colors, clear dots |
| Passing tones | Movement. Connect one landing to the next. Scale tones that aren't chord tones. | Present but reduced — connective tissue |
| Approach notes | The last step before the next chord change. Pulls the ear toward the new target. | Highlighted with directional signal — the note that leads into the next chord |

Approach notes are the missing element. TONE currently shows the target but not the path that leads to it. Voice leading — smooth movement from one chord's notes to the next — is what makes transitions musical rather than mechanical.

**The fretboard standard:** Every fretboard in TONE that serves a playing or navigation function must include: (1) CAGED base map — the zone(s) relevant to current context, always on; (2) note classification — chord tones, passing tones, and approach notes visually distinguished; (3) target note — amber prominence; (4) pentatonic landmarks — Shape 1 and Shape 4 as reference. Reference fretboards (Chords tab, Scales tab) may show the complete system. Playing fretboards (Play Mode) must filter to what matters now.

### PROTOCOL TRANSLATOR (harmonic language identification)

Different artists run different harmonic protocols on the same finite instrument. McCready (Pearl Jam) = SRV protocol — pentatonic/blues foundation, feel-driven, vocal phrasing. Cantrell (Alice in Chains) = EVH protocol — modal, chromatic, structured. The user's hand speaks SRV fluently.

TONE's job: when a song's harmonic language departs from the user's native protocol, identify the departure and provide the specific translation — not a new system, just the delta. "Your pentatonic works over these chords. Over *this* chord, here's what changes."

The influence tree (Hendrix → SRV → McCready / Hendrix → EVH → Cantrell) is context, not content. TONE doesn't store music history — it identifies protocol forks so the player knows which translation to apply.

### PRESENTATION LAYER (gear and signal chain context)

The theory is the transport layer (universal). The fretboard is the physical layer (finite HMI). The gear is the presentation layer — how the signal actually sounds when it reaches the listener.

Scope is TBD. The gear inventory exists (gear.txt). The connection to songs/artists exists conceptually. The concrete features have not been designed.

---

## Zoom In / Zoom Out — The Navigation Spectrum

Playing the changes is not binary. It is a spectrum:

| Mode | What it means | When it works |
|------|---------------|---------------|
| **ZOOMED OUT** | Pentatonic default. Treat the whole progression as one tonal center. Playing from the gut. | Diatonic chords (I, IV, V) where pentatonic fits naturally. |
| **ZOOMED IN** | Targeting chord tones. Visualizing CAGED shapes and picking notes from them as each chord arrives. | Non-diatonic chords where pentatonic default fails. |

Most great solos live somewhere in between — moving along the spectrum within the same solo. TONE's failure-point analysis identifies WHERE on the spectrum the guitarist needs to be for each chord in a progression:

- Diatonic chord → pentatonic survives → zoom out is safe
- Non-diatonic chord → pentatonic fails → zoom in required → TONE shows the CAGED shape and the target note

This is the operational application of TONE's tendency system.

The technique bridge layer adds a **middle ground**: chord-scale overlay, where you're not purely pentatonic (zoomed out) or purely targeting chord tones (zoomed in), but blending both — the Brewster/Hendrix R&B approach. This is the vocabulary that lives between the extremes.

---

## Primary Directive

**The chain:** Notes → Relationships → Emotion → Fretboard execution

Every feature must serve this chain. If it does not help the guitarist understand which relationships between notes produce which emotional responses, and how to find them on the instrument, it does not belong in the app.

**The navigation north star:** Every feature either compresses the guitarist's decision cycle at the moment of chord change, or it doesn't. This is the metric for every build decision.

**The distillation north star:** Every piece of content either teaches a principle that transfers across songs, or it doesn't. Content that only works for one song is GPS. Content that reveals the underlying pattern is the map.

---

## The Three-Layer Model — How Music Actually Works

```
PHYSICAL LAYER
  The guitar as constrained HMI
  Six strings, fixed intervals, finite frets, four fingers
  132 positions. One tuning asymmetry (G→B). Pitch redundancy.
  Tuning is a parameter. The constraint system that must become invisible.

        ↕ bridged by the human ↕

LOGICAL LAYER
  Relationships between notes
  Intervals, chords, scales, keys, modes
  Harmonic function: tendency and direction
  The math that is universal and belongs to no one

        ↕ bridged by the human ↕

EMOTIONAL LAYER
  What the relationships produce in the listener
  Not housed in individual chords — emergent from context
  Tempo, melody, rhythm, progression, voicing all modify tendency
  The destination the guitarist is navigating toward

        ↕ presented through ↕

PRESENTATION LAYER
  Gear and signal chain
  How the physical execution reaches the listener's ear
  Amp, effects, speaker — the timbre dimension
  (Scope TBD — acknowledged, not yet designed)
```

**The human is not incidental to this model — they are the active bridge between layers.**

---

## Core Axiom — Non-Negotiable

A chord has **base tendency, not absolute identity.** Context (tempo, melody, rhythm, progression, voicing) modifies tendency → emergent meaning.

"Is it REALLY the same chord?" — A C major at the nut and a C major at the 8th fret contain the same pitch classes but different voicings, bass notes, timbres, registers. Functionally equivalent. Experientially distinct.

Labels mean "tends toward X," not "is X."
Minor ≠ sad. The proof: "Little Dreamer" (Van Halen, 1978).

---

## Values — Truth, Accuracy, Consistency

TONE's charter is to **curate and connect** — not to sell, gatekeep, or brand.

The principles underneath are not secrets and they're not proprietary. They are verified by decades of professional use. TONE's value is applying them with higher fidelity than any other channel: song-specific, personalized, no commercial noise, no personality cult.

- Instructional correctness is non-negotiable. Teaching wrong lessons compromises the entire project. Validate all harmonic content before shipping.
- Every emotional label must use tendency framing. No absolute claims.
- Every feature must serve the chain: Notes → Relationships → Emotion → Fretboard execution
- Every feature must compress the guitarist's decision cycle at the moment of chord change, or it doesn't belong.
- Every piece of content must distill into a transferable principle, or it's GPS.

---

## The Core Diagnosis — Why This User Is Stuck

The failure is specific: SRV forgives pentatonic default because 1-4-5 blues gravity is circular. Van Halen exposes it because VH progressions create directional gravity toward defined arrival points.

**The specific mechanical problem:** Minor pentatonic gives you the minor 3rd (♭3). Every major chord wants the major 3rd (3). One semitone flat, structurally, every chord change. The ear hears "almost" — not "wrong," not "right." This is not a knowledge gap. It is a navigation gap.

**The fix is not more scales.** It is: when the chord changes, command transfers. Find the target note for the new commander.

**The protocol dimension:** The problem compounds when songs run a different harmonic protocol than the user's SRV-trained default. McCready (Pearl Jam) and Shepherd (Kenny Wayne Shepherd) speak the same blues dialect — Yellow Ledbetter and While We Cry are SRV-compatible. Cantrell (Alice in Chains), Tremonti (Alter Bridge), and EVH run a different protocol. The hand needs a translator, not a replacement language.

**The stagnation cycle:** Pick up guitar → attempt song beyond pentatonic comfort zone → pentatonic default fails → feel like a beginner → lose inspiration → put guitar down → stagnate. This is not laziness — it is a rational response to a negative feedback loop caused by the missing information layer between raw data (tab numbers) and knowledge (embodied fretboard navigation).

---

## The C2 Navigation Frame (mental model, not UI vocabulary)

This frame maps cleanly to harmonic navigation and is useful to hold while playing:

- **Note attributes:** Every note has a fixed identity (frequency, interval name) AND a contextual role (current chord function). G# is always G#. What changes is who it's reporting to.
- **OPCON (I chord):** Full authority. Resolution is reporting to OPCON.
- **TACON (V chord):** Temporary authority. Directs motion toward I. Cannot authorize you to stay.
- **Direct Support (IV chord):** Supports harmonic motion. Prepares the dominant.
- **Augmentation (borrowed chords):** Forces from outside the normal chain. ♭VII, ♭VI. Powerful, temporary.
- **Three body problem (tritone):** Competing gravitational centers. Maximum instability. Resolution = one commander assumes authority.
- **Stale orders:** Your current problem. The chord changed, command transferred, your hand is still reporting to the old commander (low E root).

This vocabulary stays in the player's head — TONE's UI uses tendency/gravity/target language.

---

## Key Instructional References

These sources inform TONE's approach — they are not content to reproduce, but principles to distill:

- **David Brewster "Chordplay" series** — Primary instructional influence. Hendrix R&B chord-scale overlay (combining chord shape + pentatonic in same position, legato movement between chord tones and scale tones). Reggae triad navigation (compact inversions on upper strings, minimal position movement through progressions, chaining triads). The G-B string highway concept.
- **Ricky Comiskey "Ultimate Guitar Lesson Compilation"** — Paid reference, 80 lessons covering CAGED, pentatonic, theory, and fretboard navigation. Validates TONE's structural skill coverage.
- **Fretboard Roadmaps (Fred Sokolow)** — CAGED spatial geography, the "where" layer.
- **Music Theory for Musicians and Normal People (Toby Rush)** — Visual theory reference approach. TONE's Theory tab covers this computationally.
- **Steve Vai 10-Hour Practice Routine** — Structured methodology. Informs sequencing, not content.

---

## Current Feature State — Beta 3.7 (current baseline)

### How Features Map to the Structural Skills + New Layers

| Structural Skill | TONE Feature | Status |
|-----------------|-------------|--------|
| Number System | Decoder (analysis, function, tendency, forward map) | **Strong** — most mature layer |
| Landmark Pentatonic | Play Mode (target note, forward vision, approach notes) + Forward Map (landmark positions) | **Strong** |
| CAGED | Chords tab: Voicings (CAGED zone voicing map) + Triads (ACE zone model) + Forward Map (nearest shape hint) + Play Mode CAGED overlay | **Strong** |
| Technique Bridge | Scales tab: Brewster overlay + universal interval colors + Play Mode: CAGED overlay, forward vision, approach notes, root dot shapes | **Partial** — arpeggio view/triad chaining remaining |
| Protocol Translator | *Not yet built* — Decoder identifies non-diatonic chords, but doesn't frame departures relative to user's SRV protocol | **Gap** |
| Presentation Layer | *Not yet built* — gear inventory exists (gear.txt), no in-app features | **Gap** |

**The spiral is connected through Layer 7 + Layer 8.** `_activeContext` propagates Decoder key/mode/chord to Chords, Scales, and Theory tabs.

### Decoder Tab (updated in 3.3)
- Three input modes: Manual key / AUTO / PRESET
- Chord analysis: diatonic / borrowed / secondary dominant / chromatic
- **Tendency labels on prog-cards**: emotional tendency language via `getTendencyLabel()`
- **Prog-card click** (updated in 3.5): `selectActiveChord()` writes `activeChordQuality` and `activeChordRoot` to `_activeContext`; toggle behavior; amber outline on selected card
- **Navigation Map panel**: per-chord zoom indicator, tendency, target note, CAGED shape hint
- **Color legend** (new in 3.3): collapsible "Color Key" button → 12 interval chips
- **Fretboard heat map** (updated in 3.6): interval/frequency/both toggle via `switchHeatMode()`, low E at bottom orientation fixed
- Harmonic fingerprint, match engine (unchanged)

### Play Mode (updated in 3.6 — CAGED overlay + forward vision + approach notes)
- Full-screen overlay: enter from Library ▶ button or Decoder ▶ PLAY button
- Chord strip: all song chords as large tap targets
- **Nav prompt bar:** styled with CSS classes, single line between chord strip and fretboard
  - Conflict: "navigate to: [note] · [role] · [CAGED shape] fret [N] → next: [note] ([role])"
  - Safe: "✓ anchor: [note] · root · pentatonic fits this chord → next: [note] ([role])"
- **Fretboard — 5-level visual hierarchy (low E at bottom):**
  - CAGED zone: translucent rectangle + shape label (non-diatonic chords only)
  - Pass 0: next target diamonds (r=8, dim amber, opacity 0.25) — where you're going next
  - Pass 1: pentatonic ghost dots (r=7, opacity 0.18) — safe background zone
  - Pass 1.5: approach note triangles (violet, opacity 0.45) — voice leading into next chord
  - Pass 2: other chord tones (r=12, muted blue) — present, not competing. Root = rounded square.
  - Pass 3: TARGET note (r=17, amber + white ring) — the one thing to find. Root = rounded square.
- `getTargetNote()`: major chord → major 3rd; minor → root; power → root
- Forward vision: next chord determined cyclically from chord strip, target computed via `getTargetNote()`
- Approach notes: scale tones 1 semitone from next target (diatonic approach within key)
- CAGED overlay: uses `getPentaLandmarks()` + `getNearestCAGED()` + `getCAGEDShapesForRoot()`, only on non-diatonic chords
- Reads global tuning setting (via `decoder-tuning` hidden input)
- Legend: conditional items for CAGED zone, next target, approach note
- ~~GAP (closed):~~ CAGED shape overlay — resolved in 3.6
- ~~GAP (closed):~~ Root dot distinct shape — resolved in 3.6 (DEF-20)
- ~~GAP (closed):~~ Forward vision — resolved in 3.6
- ~~GAP (closed):~~ Approach notes — resolved in 3.6

### Chords Tab (updated in 3.4 — Voicings + Triads restructure)
- Root + quality + Show (notes/intervals/degrees) — only three controls
- **Voicings/Triads sub-view toggle**

**Voicings subview (updated in 3.4)**:
- Full-neck fretboard with CAGED zone backgrounds (5 zones: C, A, G, E, D)
- `computeCAGEDVoicingMap()`: one best playable voicing per zone
- Dots use universal interval colors; zones provide spatial context via background color
- Open chord zone tagged with "(open)" in zone label
- **Color legend**: collapsible "Color Key" button → 12 interval chips
- **GAP:** CAGED zones are not song-contextual

**Triads subview (updated in 3.4 — ACE zone model)**:
- D-G-B hardcoded as chord voicing zone
- Three mini fretboard cards: one per inversion with ACE shape labels (E shape, C shape, A shape)
- Full-neck six-string zone fretboard (always visible):
  - Bass zone (E, A): root positions, dimmed gray
  - Chord zone (D, G, B): ACE inversions, full color with opacity by inversion type
  - Melody zone (high E): chord tones, subtle blue
- Zone legend below fretboard

### Scales Tab (updated in 3.7 — universal interval color system)
- 16 scale types, full fretboard SVG
- Interval/note/degree label modes, theme-aware colors
- **4-mode view toggle**: Scale (standard) / Overlay / Chord Tones / Pentatonic
- **Universal interval color system (3.7)**: all 4 view modes use `iv.color` (12-interval color palette). Color always means interval identity. Navigational role (chord tone, pentatonic, passing) conveyed through rendering: solid fill, ring, dim ring. No more hardcoded CAGED_COLORS.
- **Overlay mode (Brewster principle)**: solid filled dots for chord tones, rings for pentatonic non-chord tones, dim rings for passing scale tones. CAGED zone dashed outline around nearest shape zone.
- **Chord Tones mode**: only chord tones visible on fretboard — landing pads
- **Pentatonic mode**: only pentatonic tones visible — comfort zone
- **Chord context**: reads `_activeContext.activeChordRoot` + `activeChordQuality` from Decoder prog-card click; falls back to I chord of current scale root/mode when no Decoder context
- **Overlay legend**: swaps per view mode, replaces standard interval color legend in non-standard modes
- **Layout stability (3.7)**: chord context and overlay legend always occupy space — no vertical shift between view modes
- **Dynamic insight cards** via `getScaleInsights()`: 2-4 cards below info bar explaining current view's principle; pentatonic +2 tendency descriptions from `PENTA_PATHWAYS` folded in
- **Dead code removed (3.7)**: `NEIGHBOR_TENDENCIES` constant, `findScaleNeighbors()` function, `scale-neighbors` div removed. Redundant Color Key toggle removed (info bar already shows interval context).
- **GAP (closed):** Neighbor network fretboard visualization — superseded by overlay system which shows note classification directly on the fretboard

### Theory Tab (updated in 3.3 — Layer 8 activation)
- **Context bar**: shows active key/mode when propagated from Decoder
- **Interval Color Reference**: chromatic row rooted on active key, scale-tone highlighting
- **Chord Formulas**: highlights active chord quality when selected via Decoder
- **Scale Formulas**: tendency descriptions (16 curated)
- **Nashville Number System**: 13 progressions, transposed to active key
- **Modes — Parallel View**: ordered bright→dark
- **Diatonic Pattern**: mode-aware (major/minor), chord names from active key

### Dashboard Tab (new in 3.7)
- Agent-based evaluation framework: Hendrix, EVH, SRV perspectives
- Alignment scores: each agent rates TONE against their player's principles
- Weighted priority actions (W1-W3): consolidated from all three agent evaluations
- Consensus areas: where all agents agree TONE is strong
- Conflict areas: where agents disagree on priorities or approach
- Future layer recommendations: agent-identified gaps for Layers 10-11
- Agent definitions stored in `.claude/agents/` (hendrix.md, evh.md, srv.md)

### Library Tab (unchanged)
- Form: title, artist, key, mode, chords, genre, year, tempo, capo, tags, notes
- Flat list sorted Artist A-Z → title, real-time dual filter
- Colored fingerprint chips, edit/delete per row, delete requires confirmation
- ▶ button per row launches Play Mode for that song
- **GAP:** Data accuracy depends on user entry

### Settings (unchanged)
- Global tuning (10 options — includes Eb/half-step-down, D standard/full-step-down)
- Global frets (5, 7, 12, 15)
- Color scheme (5 themes)
- App Workflow and Vision overlay links
- Save/download button

---

## Building Block Map — Layer Order Is Enforced

```
LAYER 0 — Foundation              Interval color system, 12-note math engine
LAYER 1 — Reference surfaces      Chord diagrams, scale fretboard, theory reference
LAYER 2 — Harmonic analysis       Key detection, chord function, heat map
LAYER 3 — Pattern recognition     Fingerprint engine, match system, library, compare
─────────────────────────────────────────────────────────────────────
LAYER 4 — Emotional tendency      Pillar 1 — COMPLETE (Beta 2.7)
LAYER 5 — Scale context           Pillar 2 — COMPLETE (Beta 2.8)
LAYER 6 — Physical validation     Pillar 3 — COMPLETE (Beta 2.9)
─────────────────────────────────────────────────────────────────────
LAYER 7 — Cross-tab continuity    COMPLETE (Beta 3.0-3.2)
LAYER 8 — Theory activation       COMPLETE (Beta 3.3-3.4)
─────────────────────────────────────────────────────────────────────
LAYER 9 — Technique bridge        IN PROGRESS (Beta 3.7) — overlay + Play Mode nav + interval color unification done
LAYER 10 — Protocol translator    Harmonic protocol identification, SRV-delta framing
LAYER 11 — Presentation layer     Gear/signal chain context (scope TBD)
```

Play Mode and Triads tab serve the navigation chain directly but are not layer-gated — they are UI modes that surface existing math. They can evolve across multiple betas without blocking layer progression.

---

## Technical Debt Protocol

Before writing any code for a new feature or layer, scan the open DEF list. Classify each as blocking or deferred relative to the current build target. If blocking debt is found, resolve it first.

**Open DEFs:**
- ~~DEF-05~~: resolved in 2.9
- ~~DEF-10~~: resolved in 2.9
- ~~DEF-14~~: resolved in 3.3
- ~~DEF-11~~: resolved in 3.6 (heat map mode toggle)
- DEF-17: Library mode field major/minor only — architectural fix needed
- ~~DEF-19~~: resolved in 3.6 (Eb + D standard tunings added)
- ~~DEF-20~~: resolved in 3.6 (root dot = rounded square across all renderers)

---

## Design Decisions — Do Not Revisit Without Cause

| Decision | Rationale |
|----------|-----------|
| Single-file HTML | Portability. File is the database. |
| Download-to-save | localStorage breaks cross-device portability. |
| Root-position voicings canonical | Established pedagogy. |
| Artist A-Z → title sort in Library | Natural browsing for 500+ song catalog. |
| Tendency labels not identity labels | Minor ≠ sad. Tendency + context = meaning. |
| No AI sound analysis | Contentious, pay-for-service, error-prone. Deferred. |
| Android deferred | HTML feature-complete first. |
| Play Mode target = major 3rd for major chords | The note minor pentatonic always misses. |
| Play Mode fretboard: 3-level hierarchy | Target must dominate. Everything else is context. |
| Triads: note names not interval symbols | Mid-play you navigate to a note, not a concept. |
| Theory: one interval vocabulary | W/H step patterns removed. Colored interval symbols throughout. |
| C2 frame as mental model only | OPCON/TACON language stays in the player's head — not in the UI. |
| Three CAGED shape pairs, not five | A/G, E, D/C — the practical shapes pros actually use. |
| Two landmark pentatonic shapes, not five boxes | Shape 1 (root on E) and Shape 4 (root on A) + diagonal extensions. |
| Curate and connect, not invent | Universal principles applied with fidelity. No branding, no gatekeeping. |
| Forward map zoom = diatonic status | Diatonic → "pentatonic safe"; everything else → "zoom in". |
| CAGED hint only on non-diatonic chords | Diatonic chords don't need CAGED navigation. |
| Tendency labels use TENDENCY_MAP | Keyed by numeral for diatonic; inferred for borrowed/secondary/chromatic. |
| One-note neighbors = same cardinality only | Comparing 5-note to 7-note scales is misleading. |
| Pentatonic pathway bidirectional | Expansion and contraction both serve the cognitive bridge. |
| Neighbor cards clickable | Navigate relationships organically, not from a table. |
| NEIGHBOR_TENDENCIES curated, not generated | Tendency framing is too important to auto-generate. |
| Finger count = consecutive-string barre groups | Non-consecutive strings at same fret each need a finger. |
| Open position = fret 0 + all fretted ≤ 4 + contiguous | Prevents hybrid voicings from masquerading as open chords. |
| Voicing sort: strings > contiguity > coverage > span | The HMI rewards shapes that feel like chords. |
| Five CAGED shapes on full neck | Full system visible. Three-pair model was for isolated boxes. |
| CAGED skeleton = fretted fingers only | The barre is implied by position. |
| Between-fret dot placement | Notes render where the finger presses, not on the wire. |
| Low E at bottom on all fretboards | Guitar-view orientation. |
| Note Names default for Chords tab | Chords tab serves navigation; Scales tab serves theory. |
| Active chord via Decoder prog-card only | Decoder is the natural entry point for chord analysis. |
| SCALE_TENDENCIES curated | 16 hand-written tendency descriptions. |
| Nashville examples transposed to active key | Concrete names are more useful than abstract numerals. |
| Diatonic pattern mode-aware | Minor key has different numerals, qualities, functions, tendencies. |
| Triads: D-G-B is the chord zone | ACE zone model — bass, chord, melody zones. |
| Triads: ACE shapes, not CAGED labels | Source-neutral — no attribution. |
| Voicings: one voicing per CAGED zone | Best playable voicing per zone. Works for any quality. |
| Voicings: interval colors on dots, zone colors on backgrounds | Two information layers without conflict. |
| Tab is GPS, not content | Tabs are not migrated. The principles they prove are distilled. |
| Root dot = rounded square | Color alone insufficient for at-a-glance navigation. Square via `rootDotSVG()`/`rootRingSVG()` helpers. |
| Tuning is a parameter | Engine is tuning-agnostic. Alternate tunings are option additions, not rebuilds. |
| Arpeggios are not a separate data type | Chord tones rendered for sequential playing. Same engine, different view. |
| buildPresetDropdown clears before appending | Prevents save-cycle bake-in duplication. |
| Play Mode CAGED only on non-diatonic | Diatonic chords don't need spatial navigation aid. `target.conflict` triggers the overlay. |
| Forward vision wraps cyclically | Last chord → first chord. Progressions repeat. |
| Approach notes = 1 semitone from next target, in key | Chromatic approach within the diatonic scale. Strongest voice leading step. |
| Visual vocabulary: shapes encode meaning | Square = root, circle = other notes, diamond = next target, triangle = approach note. |

---

## User Context

- Experienced guitarist, 20+ years of pentatonic default — the SRV foundation
- Target tonal references: 311 (Tim Mahoney), Alter Bridge (Mark Tremonti), Pearl Jam (Mike McCready), Alice in Chains (Jerry Cantrell)
- Emotional touchstones: Top Gun Anthem (Steve Stevens), Yellow Ledbetter (McCready), While We Cry (Kenny Wayne Shepherd) — lyrical, sustained, vocal-phrasing guitar where the player converses with the harmony
- Core rig: UAFX pedals into Line 6 PowerCab 212 Plus
- Thinks systematically — structured analysis, tables, processes
- Fluent in both guitar and information systems — C2/KMS background informs how he thinks about harmonic navigation
- The diagnosis is precise: minor pentatonic default, low E root as "resolution," stale orders when command transfers to a new chord
- The stagnation cycle is real: attempts beyond pentatonic → failure → feels like beginner → puts guitar down → no progress
- Guitar knowledge hierarchy: has DATA (20 years of scale shapes, fret numbers) and KNOWLEDGE (calibrated ear, muscle memory in pentatonic) but is missing the INFORMATION layer that connects them
- Personal arrangement goal: Marines' Hymn — wants to give it a proper rendition that respects what the song invokes
- Retired Marine
