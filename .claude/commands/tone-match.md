# /tone-match — Tone Matching Skill

Map a reference tone to the user's actual gear, producing a reproducible signal chain recipe with specific settings.

## Input

The user provides one or more of:
- A song name + artist (the target tone)
- A description of the desired tone characteristics
- A reference to an existing analysis (from `/analyze-tab` or project notes)
- A specific gear question ("how do I get the Amsterdam tone with my rig?")

## Process

This skill follows Solution Engineering phases. Investigation completes before intervention begins.

### ═══ INVESTIGATION PHASE ═══

### Step 1: Identify the Reference Tone

Characterize the target tone along these dimensions:
- **Gain level** — clean, edge-of-breakup, crunch, high-gain, saturated
- **EQ profile** — scooped mids, mid-forward, bass-heavy, treble-bright, neutral
- **Compression/sag** — tight and percussive, or loose and saggy
- **Effects** — what's audible? Delay, reverb, modulation, wah, pitch effects?
- **Era/context** — what was the original recorded with? (research the actual signal chain used on the recording)
- **Guitar type** — single-coil or humbucker? What pickup position?

### Step 2: Research the Original Signal Chain

Before mapping to user's gear, establish what was actually used on the recording:
- **Guitar**: model, pickups, tuning
- **Amp**: model, channel, approximate settings if documented
- **Effects**: what pedals/rack effects, in what order
- **Studio factors**: mic choice, room, production techniques that affect perceived tone

Sources: player agent knowledge bases (Hendrix/EVH/SRV agents have detailed signal chain documentation), project analysis notes (TiddlyWiki `_ToSort/` contains analysis files), gear manuals in `pubs/` directory, and web research.

### Step 3: Map to User's Gear

Read `gear.txt` from the repo for current inventory. For each element of the original chain:

**Guitar selection:**
| Original | User's Equivalent | Notes |
|----------|------------------|-------|
| Strat / single-coil | Fender Ultra Luxe '60s Strat | Direct match for Hendrix/SRV/Mayer tones |
| EVH Wolfgang / humbucker (rock) | EVH Wolfgang Special | Direct match for Van Halen tones |
| Les Paul / PRS / modern humbucker | PRS Tremonti Signature | Best match for Alter Bridge, modern rock, articulate high-gain |

**Amp selection:**
| Original | User's Equivalent | Notes |
|----------|------------------|-------|
| Marshall Plexi/Super Lead | UAFX Lion '68 (pedal) or Helix model | Lion '68 for dedicated use, Helix for flexibility |
| EVH 5150 / high-gain Marshall | EVH 5150 Iconic EL34 | Direct match |
| Mesa Rectifier | Mesa Dual Rectifier | Direct match |
| Fender clean | Helix model or EVH clean channel | No dedicated Fender amp — Helix fills this gap |
| Vox AC30 | Helix model | No physical Vox — Helix or TONEX capture |
| Any amp (practice/recording) | TONEX ONE with matching capture | Surgical tone matching via AI capture profiles |

**Effects mapping:**
Map each effect in the original chain to the user's equivalent. Flag any gaps (effects the user doesn't own).

### ═══ PHASE BOUNDARY — Investigation complete. Switching to intervention. ═══

### ═══ INTERVENTION PHASE ═══

### Step 4: Build the Signal Chain

Specify the complete chain from guitar to speaker:
1. **Guitar** — which one, which pickup position, volume/tone knob starting position
2. **Pedal order** — every pedal in sequence, with justification for placement
3. **Amp** — which amp (or amp-in-a-box), which channel, which topology (A-E from Tone Engineer agent)
4. **Effects loop** — what goes in the loop vs front of amp
5. **Speaker/cab** — which cab, or FRFR with which speaker emulation

### Step 5: Dial the Settings

For every piece of gear in the chain, provide specific numbered settings:
- Pedal knob positions (clock positions: 9:00, 12:00, 3:00, or numbered 0-10)
- Amp channel, gain, EQ (bass/mid/treble), presence, resonance, master volume
- Effects parameters (delay time, modulation speed/depth, reverb mix)
- Guitar controls (pickup selector position, volume, tone)

**Start from the reference and subtract.** If the original chain used everything cranked, start there and cut what doesn't fit the user's room/volume situation.

### Step 6: Document Compromises

No tone match is perfect. Document:
- **What's close** — where the user's gear directly matches the original
- **What's approximate** — where the user's gear gets in the neighborhood but isn't identical
- **What's missing** — where the user doesn't have an equivalent (but might solve with Helix or TONEX)
- **Volume factor** — many reference tones were recorded at stage volume. The user's practice volume changes the character. Note what changes at lower volumes and how to compensate.

## Output Format

```
TONE MATCH: [Song Title] — [Artist]
════════════════════════════════════

Reference tone: [1-2 sentence description of the target sound]
Original chain: [what was used on the recording]

USER'S SIGNAL CHAIN
────────────────────
Guitar: [specific guitar + pickup position + volume/tone settings]
  ↓
[Pedal 1]: [specific settings — knob positions]
  ↓
[Pedal 2]: [specific settings]
  ↓
...
  ↓
Amp: [specific amp + channel + all EQ/gain settings]
  ↓ (effects loop)
[Loop pedal 1]: [specific settings]
  ↓
[Loop pedal 2]: [specific settings]
  ↓
Cabinet: [specific cab or FRFR + speaker emulation]

Topology: [A/B/C/D/E — which rig configuration]

SETTINGS SUMMARY
────────────────
[Table format: Gear | Control | Setting]

COMPROMISES
───────────
Close: [what matches well]
Approximate: [what's in the neighborhood]
Gap: [what's missing and how to work around it]
Volume note: [how this changes at practice volume vs stage volume]

PLAYING NOTES
─────────────
[Technique-specific advice: pick attack, dynamics, volume knob usage, etc.
that contribute to the tone beyond gear settings]
```

## Quality Gates

Before presenting output:
- **Consult Tone Engineer agent** — verify signal chain order, gain staging logic, and impedance considerations
- **Consult relevant player agent** — if the song is in Hendrix/EVH/SRV catalog, verify the original chain against the agent's documented knowledge
- **Verify gear against gear.txt** — every piece of gear named must exist in the user's inventory. If it doesn't, flag it.
- **Settings must be specific** — "turn up the mids" is not acceptable. "Mids: 7 (2:00 position)" is the standard.

## What This Skill Does NOT Do
- Does not analyze tablature or harmonic content — that's `/analyze-tab`
- Does not modify TONE's engine or code
- Does not recommend gear purchases unless explicitly asked
- Does not analyze audio files directly — works from documented knowledge and research
- Does not produce Library entries — that's `/distill`
