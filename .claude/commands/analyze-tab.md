# /analyze-tab — Tablature Analysis Skill

Analyze guitar tablature to extract chord voicings, harmonic function, technique instances, and scale/position data. Produces structured, TONE-ready output grounded in what is actually in the tab — not in what the label claims.

---

## What tablature is (primitives you need)

Six horizontal lines = six guitar strings. Top line = highest-pitched string (high E in standard tuning), bottom line = lowest (low E).

Numbers on the lines are fret positions. `0` = open string. `-` or blank = that string is not played on that column.

Reading direction: left to right = time. Numbers stacked vertically in the same column = played simultaneously (a chord voicing). Numbers spread horizontally = sequential notes (lead line or arpeggio).

### Technique glyphs interleaved with fret numbers

| Glyph | Meaning | Example |
|-------|---------|---------|
| `h` | hammer-on | `5h7` |
| `p` | pull-off | `7p5` |
| `/` | slide up | `5/7` |
| `\` | slide down | `7\5` |
| `b` | bend (often with target) | `7b9` (bend 7 to sound like 9) |
| `r` | release a bend | `7b9r7` |
| `~` | vibrato (single) | `7~` |
| `~~~~` (multiple tildes) | extended / held vibrato over sustained note | `9~~~~` |
| `x` | muted / dead / percussive | `x` |
| `t` | right-hand tap | `t12` |
| `()` | ghost note / tied | `(5)` |
| `PM` or dashed bracket over notes | palm mute span | — |
| `*`, `<>`, `NH`, `+` | natural harmonic (frets 5/7/12 commonly) — `+` often used mid-line, e.g. `12+` | `<12>`, `12+` |
| `AH`, `PH`, `[T]` | artificial / pinch / tap harmonic | — |
| `w/bar`, `dive`, free-text annotations | whammy bar techniques (dives, flutters, pitch manipulation) — often annotated in prose near the tab, not as glyphs | `*whammy bar dives` |
| `pb` | pre-bend (bend before picking) | `9pb11` |

**Compound bend expressions** — bends often chain with releases, pull-offs, and hammers in a single run. Parse each as a sequence:

- `7b9r7` — bend 7 to sound like 9, release back to 7
- `11pb13r11p9` — pre-bend 11 to 13, release to 11, pull off to 9
- `11b14r11` — bend 11 to 14, release to 11

Treat each glyph in sequence as its own event; represent in output as an ordered chain.

### Rhythm

ASCII tab encodes timing loosely. Horizontal spacing is only approximate unless the tab includes a rhythm line above with note-length symbols (`W H Q E S`) or standard notation alongside. Software formats (Guitar Pro `.gp*`, Power Tab, MuseScore, TuxGuitar) encode rhythm precisely. If rhythm is absent, flag it in the output — don't infer.

### Tuning

MUST be identified before extracting notes. Look for a header like `Tuning: EADGBE`, `Drop D`, `Eb Standard`, `Open G`, or a `Capo N` directive. If absent, assume standard `EADGBE` and **flag the assumption in output**. A capo shifts all fret numbers up by the capo fret (so `fret 3` with `Capo 2` sounds like `fret 5`).

**Sharp-vs-flat enharmonic aliases:** engraved transcriptions may write the same tuning either way. `D# G# C# F# A# D#` ≡ `Eb Ab Db Gb Bb Eb` (both are half-step-down standard). `D G C F A D` is *whole-step-down*, a different tuning — do not confuse with `D# G# C# F# A# D#`. A dropped `#` or `♭` during text extraction can silently change a half-step-down tuning into a whole-step-down — always verify against the rendered source when uncertain.

---

## Engraved notation — what professional transcriptions add

When the source is Tier 3 or 4, additional structured information is present that ASCII tab lacks. Capture it.

### Rhythm notation

Below the tab staff, professional engravings include note stems with beams:
- Quarter note = single stem, no beam
- Eighth note = single beam
- Sixteenth note = double beam
- Thirty-second = triple beam
- **Tuplet numbers** — "3" for triplet, "5" for quintuplet, "6" for sextuplet, "7" for septuplet, "11" for elevenlet (etc.), usually bracketed under the grouped notes. Tuplets fit N notes into the time of the base rhythm (e.g., a sextuplet fits 6 notes in the time of 4 sixteenths).
- **Rests** — notated above the staff (quarter rest, eighth rest, etc.) indicate silence or space, not notes.

Read the rhythm group by group. For each event, pair the fret content with the rhythmic duration. Output should reflect actual timing.

### Tempo and modulation

- `♩ = N` above the staff specifies beats-per-minute. Usually at the start of a piece.
- Tempo can MODULATE across sections. Re-scan each section header for tempo changes.
- "Free Time" / "rubato" / "ad lib" markers indicate unmetered passages — capture the notes but flag timing as non-measurable.

### Section labels

Professional engravings label sections explicitly: `Intro`, `Verse 1`, `Verse 2`, `Verse 3`, `Pre-Chorus`, `Chorus`, `Bridge`, `Solo`, `Outro`, `Free Time`, etc. Numbered verses matter — the same song often has subtle variations across verses, and the section label preserves the progression through the piece.

### Dynamics and expression

- `f`, `p`, `mf`, `mp`, `ff`, `pp` — forte/piano markings under the staff
- `cresc.` / `decresc.` / `dim.` — crescendo / decrescendo
- `let ring` with a dashed duration bracket — specifies *how long* a note rings
- `P.M.` with a dashed duration bracket — palm mute extent
- Legato curves (arcs) joining note pairs — indicate phrased grouping (hammer/pull chain or tied notes)

### Microtonal bend grades

Engraved transcriptions distinguish bend depth precisely:
- `¼` — quarter bend (microtonal)
- `½` — half bend (1 semitone)
- `1` — full bend (whole step, 2 semitones)
- `1½` — bend-and-a-half (3 semitones, minor third)
- `2` — full tone-and-a-half (whole step plus whole step)

ASCII tab typically reduces these to `b` with an optional target fret (`7b9` = bend to fret 9 = whole step). Engraved bends are much more precise; preserve the grade in output.

### Harmonics

Natural harmonics appear as `<n>` (diamond-shaped notehead in engraved form) at fret `n` (usually 5, 7, 12 for common natural harmonics). Artificial/pinch harmonics usually shown with a circle above the note or `[n]` brackets. Tapped harmonics use tapped-note glyphs (T inside circle, or `n(n)` notation).

### Bar numbers

Every 4 measures or so, engraved transcriptions label bar numbers (usually italicized, above the leftmost measure in a line). Capture bar numbers when present — they let output claims reference specific bars. Without bar numbers, do NOT estimate bar counts aggressively — rough guesses can be off by 3× or more.

---

## Source quality tiers — output quality scales with input

The information density of a tab source varies enormously. Match claims to the source tier — do not assert rhythm analysis from a source that does not carry rhythm.

| Tier | Source | Carries |
|------|--------|---------|
| 1 | Community ASCII tab (Ultimate Guitar free, tab-archive forum posts) | Fret positions, technique glyphs, section labels sometimes. No rhythm. Tuning sometimes specified, sometimes assumed. Quality varies wildly — often wrong notes or chord mis-labels. |
| 2 | Community ASCII tab with rhythm line | Tier 1 plus an explicit rhythm line above the notation (W/H/Q/E/S letters or ASCII rhythm glyphs). Rare. |
| 3 | Professional engraved transcription (published book PDF, Ultimate Guitar Official, Songsterr software format, Guitar Pro export) | Full rhythm notation (beamed stems, tuplet numbers, rests), bar numbers, section labels (Verse 1/2/3, Chorus, Free Time), tempo markings (BPM, with modulations across sections), dynamics (f, p, cresc.), microtonal bend grades (¼, ½, 1, 1½), "let ring" and "P.M." duration brackets, legato curves. This is the reference tier. |
| 4 | Software-native file (Guitar Pro `.gp*`, MuseScore `.mscz`, TuxGuitar `.tg`) with audio playback | Tier 3 plus precise timing, multiple tracks, tempo events, playback for ear-verification. Cannot be parsed directly without tooling — request an export. |

**When multiple sources exist for the same song, prefer the higher tier.** Cite which source each claim came from in the output (see Output Format below). Do not merge claims across tiers silently — flag conflicts.

**Community tabs (Tier 1) are the most common input but the least trustworthy.** Fret numbers are usually reliable; chord symbols, key indications, tuning headers, and rhythm claims are not. Verify the fret positions sound-right by checking chord spellings; do not trust community metadata without corroboration.

---

## Input

Accept any of:

1. **ASCII tab pasted directly** — most common case. Plain text.
2. **File path** to a tab file (`.txt`, `.tab`, `.tabs`, or embedded in `.md`) — read and treat as ASCII.
3. **PDF path** — professional transcriptions are usually engraved graphics, not selectable text. Procedure:
   - Try `pdftotext -layout` first; if extracted text is only the header (title, artist, tuning), the notation itself is image-based.
   - Render pages to images using `pdftoppm` (poppler) or equivalent, then read each page visually.
   - **Render-and-verify rule:** never trust text-extraction output alone for tab content or even tuning headers. Text extraction frequently drops `#`/`♭` symbols, microtonal markers, tuplet numbers, and engraved glyphs. Always cross-check the rendered image for anything metadata-critical (tuning is the prime offender — `D# G# C# F# A# D#` can extract as `D G C F A D`, which is a whole-step-down tuning vs the actual half-step-down).
   - If the system lacks a PDF renderer, report the limitation and ask the user to export pages to images or provide the tab in another form.
4. **Guitar Pro binary (`.gp3`/`.gp4`/`.gp5`/`.gpx`)** — cannot be parsed directly. Ask user for an ASCII export.
5. **Song name + artist** — look up in the TiddlyWiki at `C:\Users\miken\OneDrive\Desktop\TW\TONE\`. Find the relevant tiddler; extract the tab section; parse as ASCII.

If input is ambiguous, ask the user which mode and which source. Do not guess.

---

## Extraction — how to actually read the tab

### Step 1: Identify format and metadata

- Detect ASCII vs software-format binary vs mixed content.
- Extract metadata from header lines: tuning, capo, tempo, time signature, key signature (if stated), artist, song title.
- If tuning is absent, default to standard `EADGBE` and flag.

### Step 2: Parse tab blocks

Tabs are usually split into sections by blank lines or section labels like `[Intro]`, `[Verse]`, `[Pre-Chorus]`, `[Chorus]`, `[Solo]`, `[Bridge]`, `[Outro]`. Preserve section labels — they matter for progression analysis.

**Multi-part tabs.** Many tabs split into multiple guitar parts labeled `(Guitar 1)`, `(Guitar 2)`, `(Guitar 3)`, or `Rhythm`, `Lead`, `Solo`, `Acoustic`, etc. When labeled parts appear:
- Parse each part as its own independent stream of events.
- Tag every extracted event with the part it came from.
- Analyze each part separately first (voicings, techniques, position).
- Then combine parts by aligning on section labels: the rhythm part usually reveals the underlying harmony (bass pattern, chord shapes), while the lead part operates against that harmony. The combined analysis produces the progression and function assignments.
- If multiple parts play the same section simultaneously, reconcile their note contents — consonances are the chord, dissonances are either voice-leading passing tones or part-specific decoration.

**Lyric lines.** Community tabs often place lyrics under the low-E line, offset with spaces to align with the tab notation. Identify lyric lines by: no leading string letter, no `|` separator, mostly alphabetic characters. Skip lyric lines for note extraction — preserve them only if the user wants lyric-aligned output.

**Annotation lines.** Free-text annotations above or below the tab ("*whammy bar dives", "G3 enters for solo", "sustain through") are context notes, not notation. Preserve them as flags on the nearest event or section.

For each parsed section:
- Identify the six string lines. They are usually prefixed with the string's open-pitch letter (`e|`, `B|`, `G|`, `D|`, `A|`, `E|`) or a plain `|`. If only five or four lines are present, the tab covers a subset of strings — handle accordingly.
- Read left to right, grouping each vertical slice into an event:
  - **Single-note event** — only one string has a fret number in that column.
  - **Chord event** — two or more strings have fret numbers in that column.
  - **Rest** — all strings are `-`.

### Step 3: Convert fret positions to notes

Using the tuning, map each `(string, fret)` to a concrete pitch.

Standard `EADGBE` open pitches (from low string to high string):
- String 6 (low E) open = E2
- String 5 (A) open = A2
- String 4 (D) open = D3
- String 3 (G) open = G3
- String 2 (B) open = B3
- String 1 (high E) open = E4

Fret `N` on any string = the open pitch + `N` semitones. Apply capo offset if present.

For non-standard tunings, substitute the open pitches accordingly (e.g., Drop D = `DADGBE`, Eb standard = all strings down a half step, DADGAD, Open G = `DGDGBD`).

### Step 4: Identify chord voicings

Two cases — handle whichever matches the tab.

**Case A — stacked voicings (clear chord columns).** For each chord event where two or more strings have fret numbers in the same column, collect the note set (pitch-class only, ignoring octave for chord identification — but keep octaves for voicing analysis).

Leverage TONE's engine: use the logic in `identifyChord()` (defined in the current HTML file under `Tone (RI)/`). It reverse-looks-up a note set against `CHORD_REGISTRY` formulas and returns the best-matching chord name (root + quality).

If `identifyChord()` returns no match or low confidence:
- List the note set explicitly.
- Flag as "unknown voicing" in the output.
- Do not guess a chord name.

For voicing analysis (which strings were used, open vs fretted, inversion), keep the raw `(string, fret)` data alongside the chord name.

**Case B — arpeggiated passages (no stacked columns, harmony is implied by note grouping).** Most fingerpicked, plucked, or broken-chord passages will have mostly single-note events. Identifying the implied chord requires pooling notes across a time window.

Strategy:
- Group notes within one bar (or one measure's worth of the arpeggio pattern — use the repeat cycle of the bass note as the window).
- Collect the full pitch-class set across that window.
- Run the pooled set through `identifyChord()` as if it were a stacked voicing.
- Weight the bass string (strings 5 and 6) more heavily — the lowest sustained note usually reveals the chord root.
- Discard clearly-passing tones: hammer-on/pull-off grace notes are melodic, not harmonic; they should not drive the chord identification if they're brief decorations over a sustained bass.

When a rhythm part runs in parallel (multi-part tab), use the rhythm part's chord shape to anchor the arpeggio part's harmony — the rhythm is the ground truth for the underlying chord, and the arpeggio decorates it.

If the window approach still yields an ambiguous set (e.g., notes spelling multiple plausible chords), surface the ambiguity rather than picking.

### Step 5: Identify key and mode

Use TONE's engine: `detectKey()` takes a chord progression and returns the most likely key. Run it on the extracted chord sequence.

If detection produces multiple candidates with similar confidence, surface all candidates in the output. Do not pick silently.

### Step 6: Classify each chord's function

For each chord, given the detected key, classify using TONE's engine logic:
- **Diatonic** — I, ii, iii, IV, V, vi, vii° (or modal equivalents)
- **Borrowed** — from parallel minor / major / modal source
- **Secondary dominant** — V/V, V/vi, etc.
- **Chromatic** — no clear diatonic or borrowed source

Record the function assignment with the chord in the progression output.

### Step 7: Technique inventory

Scan the tab for every technique glyph listed in the primitives table. For each instance:
- **Technique type** — bend, slide, hammer-on, pull-off, vibrato, harmonic, tap, palm mute, etc.
- **Where** — section, approximate bar/beat if rhythm is available
- **Harmonic context** — which chord is active
- **Scale degree** — what degree is the technique applied to, relative to the current chord root AND to the key root

Group techniques by type and by section. Count occurrences.

### Step 8: Scale and position analysis

For single-note passages (solos, fills, melodic lines):
- Map each note to CAGED pentatonic positions using TONE's CAGED logic.
- Identify extensions beyond pentatonic — specific non-pentatonic notes and what they imply:
  - Natural 6th over minor → Dorian
  - ♭7 over major → Mixolydian
  - ♭5 over pentatonic → blues
  - Chromatic passing tones
  - Major penta tones over a dominant chord
- Note position shifts across the neck (does the player stay in a box, slide between boxes, or jump registers?).
- For each chord change in the lead, check whether the first note on the new chord is a chord tone (targeting) or a tension.
- Count chord-tone-targeting rate: N target hits / M chord changes = P%.

---

## Output Format

```
TAB ANALYSIS: [Song Title] — [Artist]
══════════════════════════════════════

METADATA
────────
Source tier: [1 community ASCII / 2 ASCII with rhythm / 3 engraved transcription / 4 software-native]
Source: [URL, filename, or description]
Tuning: [detected or "standard EADGBE (assumed)"]
Capo: [fret or none]
Tempo: [bpm if known — note modulations if any, else "not specified"]
Time signature: [e.g., 4/4 or "4/4 with 2/4 changes at bars X, Y" or "not specified"]
Bar count: [N bars if numbered in source, else "~N bars estimated from visual count" with uncertainty flag]

PROGRESSION
───────────
Detected key: [root + mode]  (confidence: [high/medium/low])
Alternative key candidates (if confidence < high): [...]
Harmonic rhythm: [chord changes per bar, or "variable / see sections"]

[Section Name]
  [Chord] ([function]) — voicing: strings/frets: [(6,3)(5,2)(4,0)(3,0)(2,3)(1,3)] — [duration]
  [Chord] ([function]) — ...
  ...

Harmonic fingerprint: [functional sequence, e.g., i-♭VII-♭VI-V]

If multi-part tab, tag each part's role:
  Guitar 1 (arpeggiated lead / melodic figure)
  Guitar 2 (rhythm / bass-shape anchor)
  Guitar 3 (solo / lead fills)
Attribution: the underlying harmony is anchored by [which part]; the other parts decorate/extend.

TECHNIQUE INVENTORY
───────────────────
Bends (count: N)
  - [Section/bar]: on [chord], scale degree [N], [half/whole/pre-bend], target [pitch]
  ...
Hammer-ons / pull-offs (count: N)
  ...
Slides (count: N)
  ...
Vibrato, harmonics, palm mute, tap, etc. (each as its own group)

SCALE / POSITION MAP
────────────────────
Primary CAGED positions: [e.g., "E shape at fret 5, A shape at fret 12"]
Extensions used beyond pentatonic: [specific notes and their implied mode/function]
Chord-tone targeting rate: [N/M chord changes = P%]
Position shifts: [describe the navigation pattern — stays in one box, slides between, jumps, etc.]

TONE ENGINE COMPATIBILITY
─────────────────────────
Chord types present and supported by engine: [list]
Chord types NOT in CHORD_REGISTRY: [list — engine addition candidates]
Pentatonic pathways used: [minor→blues, minor→Dorian, etc.]
Techniques with no current TONE surface: [list — future engine work candidates]

UNCERTAIN / FLAGGED
───────────────────
- [Tab quality concerns: tuning assumed, fret/chord-label contradictions, ambiguous voicings, missing rhythm, parse issues]
- [Key ambiguity if multiple candidates]
- [Any places where identifyChord() returned no match]
```

---

## Quality Gates

Before presenting output:

- **Tuning assumptions** — if you defaulted to standard without a header, say so explicitly in `METADATA` and in `UNCERTAIN / FLAGGED`.
- **Tuning — render-and-verify for PDFs** — text extraction drops sharp/flat glyphs. If the source is a PDF, always verify the tuning header against the rendered image; never trust `pdftotext` output alone for tuning.
- **Recording-vs-tab tuning mismatch** — if the song is widely known to be played on a recording with a tuning that differs from the tab's notation (Yellow Ledbetter, Hey Joe, Little Wing, Cherub Rock, etc. often fall here), flag that the tab-based analysis may not match the audio. State tuning claims as "from tab header" rather than "matches recording" unless actually cross-checked.
- **Claim-to-source attribution** — when multiple sources for the same song are consulted (e.g., a community ASCII tab AND a professional PDF), cite which source each specific claim came from. Do not merge claims across tiers silently. When claims conflict, flag the conflict and prefer the higher-tier source.
- **Rhythm claims only from rhythm-carrying sources** — if the source is Tier 1 (no rhythm line), do NOT claim precise rhythm, tempo, or tuplet structure. Flag timing as "approximate — source carries no rhythm notation."
- **Bar-count claims only from numbered sources** — if bars are not numbered in the source, explicitly flag bar counts as visual estimates. A 100-bar piece can easily be miscounted by 3× from ASCII alone.
- **Ambiguous chord voicings** — if `identifyChord()` didn't produce a clean match, don't guess. List the note set and flag.
- **Key ambiguity** — if detection produced multiple candidates with similar confidence, list them all. Surface, don't pick.
- **Fret/chord-label contradictions** — if the tab writes "Am" above a voicing whose notes actually spell A minor 7 (or E major), flag the contradiction. Trust the frets over the label.
- **Missing rhythm** — if the tab has no rhythm indication, state that timing analysis is approximate.
- **Consult Guitar Systems agent** — if the chord/scale/function analysis has ambiguity the engine can't resolve, invoke `.claude/agents/guitar-systems.md` for a theory review.
- **Consult player agent if applicable** — if the song is in a known player's catalog (Hendrix, EVH, SRV), optionally invoke that agent for stylistic context and technique verification.

---

## What This Skill Does NOT Do

- Does not create Library entries — presents data for user approval first.
- Does not modify TONE's engine or code — identifies gaps only.
- Does not parse binary Guitar Pro files — asks for ASCII export.
- Does not analyze audio or video.
- Does not evaluate tone or gear — that's `/tone-match`.
- Does not guess when uncertain — flags and surfaces alternatives.
