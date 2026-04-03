# /analyze-tab — Tablature Analysis Skill

Analyze guitar tablature to extract harmonic decisions, technique inventory, and TONE-ready data.

## Input

The user provides tablature in one of these forms:
- A PDF file path containing tablature
- Text-based tablature pasted directly
- A song name + artist (for which tablature is available in the TiddlyWiki at `C:\Users\miken\OneDrive\Desktop\TW\TONE\`)

## Process

This skill follows Solution Engineering phases. Investigation completes before intervention begins.

### ═══ INVESTIGATION PHASE ═══

### Step 1: Extract the Raw Data

Read the tablature and identify:
- **Every chord voicing** — not just the chord name, but the actual fret positions played. The voicing choice IS data.
- **The key and mode** — determine from the progression, not from a label. Verify: does the progression fit the detected key, or is there modal ambiguity?
- **The tuning** — standard, Eb, drop D, etc. This determines all fret-to-note mapping.

### Step 2: Harmonic Analysis

For each chord in the progression:
- **Chord quality** — major, minor, dom7, sus4, add9, etc. Use the actual notes from the voicing, not just the chord symbol (tabs often have wrong labels but correct frets).
- **Diatonic function** — I through VII, or identify as borrowed, secondary dominant, or chromatic.
- **Tendency** — what emotional/directional role does this chord play? (tension, resolution, departure, arrival, float, pivot)

For the full progression:
- **Harmonic fingerprint** — the functional sequence (e.g., I-V-vi-IV, i-bVI-bVII-i)
- **Harmonic rhythm** — how often do chords change? Every bar? Every 2 beats? Irregular?
- **Key modulations or modal shifts** — does the song stay in one key or move?

### Step 3: Technique Inventory

Scan the tablature for:
- **Bends** — half step, whole step, pre-bends. Where in the progression do they occur? On which scale degree?
- **Hammer-ons / pull-offs** — legato passages. Which positions? Pentatonic box or outside?
- **Slides** — position shifts. Horizontal movement patterns.
- **Tapping** — two-hand technique passages. What intervals are being tapped?
- **Harmonics** — natural (12th, 7th, 5th fret) or pinch harmonics. Where and why?
- **Vibrato** — notated or implied. On which notes?
- **Palm muting** — rhythmic technique. Which sections?
- **Whammy bar** — dive bombs, flutter, subtle pitch bending
- **Rhythm patterns** — strumming patterns, arpeggiated picking, alternate picking, hybrid picking
- **Double stops** — two-note combinations. What intervals?
- **Chord embellishments** — hammer-ons onto chord voicings, grace notes, sus→resolve patterns

### Step 4: Scale/Position Analysis

- **Which pentatonic boxes are used?** Map the solo/lead notes to CAGED pentatonic positions.
- **What extensions beyond pentatonic?** Dorian 6th? Mixolydian b7? Chromatic passing tones? Blues b5?
- **Position shifts** — does the player stay in one box or move across the neck?
- **Chord tone targeting** — on chord changes, does the melody land on a chord tone or a tension?
- **Approach notes** — how does the player navigate INTO chord changes? Chromatic? Scalar? Leap?

### ═══ PHASE BOUNDARY — Investigation complete. Switching to intervention. ═══

### ═══ INTERVENTION PHASE ═══

### Step 5: Principle Extraction

This is the most important step. For each technique or harmonic decision identified:
- **Is this transferable?** Does this principle apply to other songs in the same key/mode/genre?
- **What's the rule?** State it as a principle, not a description. Not "the solo uses the Dorian mode" but "over minor chord vamps in rock context, adding the natural 6th (Dorian) creates bittersweet tension that resolves to the b7."
- **What does TONE need to know?** Which engine features would surface this principle? Does TONE's current engine support it?

### Step 6: TONE Engine Gap Check

Compare the analysis against TONE's current capabilities:
- **Chord types found** — are all of them in TONE's chord formula table? Flag any missing types.
- **Scale/mode used** — is this scale in TONE's 16 scale types? If modal, does DEF-17 (major/minor only in Library) affect this song?
- **Pentatonic pathways** — are the extensions used in this song covered by `PENTA_PATHWAYS`? Flag missing pathways.
- **Technique features** — does TONE have any way to surface the techniques found? If not, is this a future feature candidate?

## Output Format

```
TAB ANALYSIS: [Song Title] — [Artist]
══════════════════════════════════════

Key: [detected key/mode] | Tuning: [tuning] | Tempo: [if determinable]

PROGRESSION
───────────
[Chord] ([function]) → [Chord] ([function]) → ...
Harmonic fingerprint: [functional sequence]
Harmonic rhythm: [description]

TECHNIQUE INVENTORY
───────────────────
[Technique]: [where it occurs, on what scale degree, frequency]
...

SCALE/POSITION MAP
──────────────────
Primary position(s): [CAGED box(es)]
Extensions beyond pentatonic: [specific notes and their function]
Chord tone targeting: [how the player navigates chord changes]

TRANSFERABLE PRINCIPLES
───────────────────────
1. [Principle statement — actionable, not descriptive]
2. ...

TONE ENGINE COMPATIBILITY
─────────────────────────
Supported: [what TONE can already handle]
Gaps: [what's missing — specific chord types, pathways, features]
Library entry ready: [yes/no — and what fields can be populated]
```

## Quality Gates

Before presenting output:
- **Consult Guitar Systems Engineer** — verify all chord formulas, scale identifications, and function assignments are theoretically correct.
- **Cross-reference with player agents** — if the song is in a player agent's catalog (Hendrix/EVH/SRV), consult that agent for stylistic context and technique verification.
- **Flag uncertainty** — if the tab quality is poor, if chord symbols conflict with actual fret positions, or if the key is ambiguous, say so explicitly. Don't guess and present as fact.

## What This Skill Does NOT Do
- Does not create Library entries directly — presents the data for user approval first
- Does not modify TONE's engine or code — identifies gaps for the user to prioritize
- Does not analyze audio or video — works from tablature only (audio analysis is a separate future capability)
- Does not evaluate tone or gear — that's `/tone-match`
