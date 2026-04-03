# /distill — Content Distillation Skill

The master pipeline skill. Takes a song and all available source material, orchestrates analysis through `/analyze-tab` and `/tone-match`, routes output through agent quality gates, and produces a complete TONE-ready package for user approval.

## Input

The user provides:
- A song name + artist
- Optionally: specific source material to include (tab file path, notes, gear reference)

## Process

This skill follows Solution Engineering phases. Investigation completes before intervention begins.

### ═══ INVESTIGATION PHASE ═══

### Step 1: Inventory Available Source Material

Search for all available material related to this song:

**In the repo (`Tone (RI)/`):**
- Existing Library entry (check if song is already in PRESETS)
- gear.txt for user's equipment

**In the TiddlyWiki (`C:\Users\miken\OneDrive\Desktop\TW\TONE\`):**
- Audio reference (`audio/` — search for artist/song name in MP3 filenames)
- Video reference (`video/` — search in artist subdirectories)
- Tablature PDFs (`pubs/` — search for song/artist name)
- Gear settings images (`img/settings/` — search for relevant amp/pedal settings)
- Artist gear reference images (`img/gear/artist/` — search for artist)
- Analysis notes (`_ToSort/` — search for existing analysis text files)
- Lesson material (`lesson/` — check if relevant)

**Report what was found and what's missing.** The user may need to provide additional material before proceeding.

### Step 2: Run Tab Analysis

If tablature is available, invoke `/analyze-tab` process:
- Extract harmonic analysis, technique inventory, scale/position map
- Identify transferable principles
- Flag TONE engine gaps

If no tablature exists, perform harmonic analysis from:
- Known chord progressions (research or user-provided)
- Audio reference (describe what's heard — this is approximate, flag it as such)

### Step 3: Run Tone Match

Invoke `/tone-match` process:
- Identify the reference tone from the recording
- Research the original signal chain
- Map to user's gear with specific settings
- Document compromises

### Step 4: Agent Quality Gates

Route the combined analysis through relevant agents:

**Guitar Systems Engineer** (mandatory):
- Verify all chord formulas and function assignments
- Verify scale identifications
- Verify key detection matches what TONE's `detectKey()` would produce
- Flag any chord types or scales not in TONE's engine

**Tone Engineer** (mandatory):
- Verify signal chain order and gain staging
- Verify settings are realistic and reproducible
- Verify gear mapping against actual inventory

**Relevant Player Agent** (if applicable):
- Hendrix agent: if song is blues, psychedelic, or Hendrix-adjacent
- EVH agent: if song is Van Halen, hard rock with tapping/harmonics
- SRV agent: if song is blues-rock, Strat-driven, SRV-adjacent
- Consult the agent for stylistic context, technique verification, and catalog-specific insight

**Architect** (if engine gaps found):
- Assess impact of any identified engine gaps
- Determine if gaps are blocking (can't represent this song) or informational (song works but some nuance is lost)

### ═══ PHASE BOUNDARY — Investigation complete. Switching to intervention. ═══

### ═══ INTERVENTION PHASE ═══

### Step 5: Compile TONE-Ready Package

Produce the complete distillation:

**A. Library Entry Data**
All fields needed for a TONE Library entry:
- Title, Artist, Key, Mode, Chords (progression notation), Genre, Year, Tempo, Capo, Tags, Notes
- Flag if DEF-17 affects this song (modal songs can't have accurate mode field)

**B. Harmonic Profile**
- Functional analysis of the progression
- Harmonic fingerprint for pattern matching
- Key harmonic decision points (where the interesting choices are)

**C. Technique Profile**
- Techniques used, ranked by prominence
- Which techniques TONE can surface vs which are beyond current scope

**D. Tone Recipe**
- Complete signal chain with settings
- Which topology, which guitar, which amp
- Playing notes (dynamics, pick attack, volume knob usage)

**E. Transferable Principles**
- The distilled knowledge — what transfers beyond this specific song
- Framed as rules, not descriptions
- Mapped to TONE's mission: "which note, where on the neck, at the moment the chord changes"

**F. Engine Gap Report**
- Missing chord types, pathways, scales, or features
- Severity: blocking vs informational
- Recommendation: fix now vs defer

### Step 6: Present for User Approval

Present the complete package. The user decides:
- **Approve** — add the Library entry, file the tone recipe, log the principles
- **Revise** — adjust specific sections based on user knowledge
- **Defer** — song analyzed but not added yet (useful for batch analysis)

Do NOT add anything to TONE until the user approves.

## Output Format

```
DISTILLATION: [Song Title] — [Artist]
══════════════════════════════════════

SOURCE MATERIAL FOUND
─────────────────────
[✓/✗] Tablature: [source]
[✓/✗] Audio reference: [filename]
[✓/✗] Video reference: [filename]
[✓/✗] Gear settings: [source]
[✓/✗] Existing analysis: [source]
[✓/✗] Existing Library entry: [yes/no]

HARMONIC ANALYSIS (from /analyze-tab)
─────────────────────────────────────
Key: [key/mode] | Tuning: [tuning] | Tempo: [bpm]
Progression: [functional analysis]
Fingerprint: [harmonic fingerprint]
Decision points: [where the interesting harmonic choices are]

TECHNIQUE INVENTORY (from /analyze-tab)
───────────────────────────────────────
[Ranked list of techniques with frequency and context]

TONE RECIPE (from /tone-match)
──────────────────────────────
[Complete signal chain with settings]

TRANSFERABLE PRINCIPLES
───────────────────────
1. [Principle — actionable rule, not description]
2. ...

AGENT VERIFICATION
──────────────────
Guitar Systems Engineer: [pass/issues]
Tone Engineer: [pass/issues]
[Player Agent]: [stylistic notes]
Architect: [engine gap assessment if applicable]

LIBRARY ENTRY (pending approval)
────────────────────────────────
Title: [value]
Artist: [value]
Key: [value]
Mode: [value — flag if DEF-17 limits accuracy]
Chords: [progression notation for TONE]
Genre: [value]
Year: [value]
Tempo: [value]
Capo: [value]
Tags: [value]
Notes: [value]

ENGINE GAPS
───────────
[List of gaps with severity and recommendation]

STATUS: Awaiting user approval
```

## What This Skill Does NOT Do
- Does not add Library entries without user approval
- Does not modify TONE's engine or code — identifies gaps for the user to prioritize
- Does not analyze audio waveforms — works from tablature, documentation, and research
- Does not replace the user's musical judgment — presents analysis for the user to validate against their ear
- Does not process multiple songs in batch — one song at a time, methodically
