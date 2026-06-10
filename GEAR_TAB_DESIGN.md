# Gear Tab — Design Document

*Status: v0.2 — agent-reviewed. Architect, UI/UX, Tone Engineer, and Guitar Systems Engineer have produced reviews; user has resolved the three contested decisions. v0.2 integrates all four reviews and the resolutions. Ready for Phase 1 once user signs off.*

*This document supersedes nothing — it scopes a new capability. When implemented, it will integrate with: PRESETS (Library tab), the four player agents (Hendrix / EVH / SRV / KWS), the Tone Engineer agent, and the `tone-vocabulary` W3 gap loop in ROADMAP.*

*v0.2 changes from v0.1 are summarized in Section 9 (Decision Log).*

---

## 0. Status & Purpose

**Why this exists.** The user requested a Gear tab during work on the Tone Engineer agent. Triggers:

1. The agent hallucinated a tonal gap (Univibe substitute) when the user owned a direct match (MXR M68 Uni-Vibe). Root cause: gear inventory existed as flat text + agent-internal prose, with no queryable role index. Hallucinated gaps are systemic until inventory is structured data **and** recipe assertions are validated against the inventory's role tags.
2. Tone recipes — the output of `/tone-match` and the four player agents — currently have no first-class rendering surface. They live in chat transcripts (e.g., `engineer_KWS agent interview.txt`) and never reach the user during play preparation.
3. The `tone-vocabulary` W3 gap loop in ROADMAP needs a target. This is it.

**What this is.** A new tab in the TONE single-file HTML app — same architectural slot as Decoder / Chords / Scales / Theory / Library / Dashboard — that:

1. **Holds gear inventory as structured data** (knob ranges, circuit type, role tags) — the canonical source of truth that gear.txt and `tone-engineer.md` currently split.
2. **Holds tonal presets per song** as first-class data — guitar + amp(s) + pedal chain + settings + provenance + song-specific deployment notes.
3. **Renders a visual signal chain** for any song's tone preset — pedalboard-style layout with knob positions, on/off state, amp settings, annotations, citations.
4. **Authors and edits tonal presets** in-tab via text-based editing, with anti-hallucination scaffolding (mandatory role-index traversal AND schema-level role assertion validation) for any agent-generated content.

**What this is NOT.**

- **Not coupled to Play Mode.** Play Mode is *how it's played*; Gear tab is *how it's received*. Linked by preset, not coupled in UI. Two distinct activities. The Library row gains two distinct entry points: existing ▶ button (Play Mode) and new tone badge (Gear tab).
- Not a gear catalog or shopping interface. The user's inventory is the universe; new gear is out of scope unless explicitly invoked via the Tone Engineer agent's Workflow B (acquisition mode, gap-fill only).
- Not a tone simulation engine. TONE doesn't synthesize audio. Settings are *displayed* for the user to dial in on real hardware.
- Not a replacement for tab/notation. It complements: tab tells the hand what to play; the Gear tab tells the hands and ears what tone to play it through.

**Design principles inherited from TONE_CONTEXT.**

- *Distillation, not filing.* Tone presets must capture transferable principles (era discrimination, two-amp blend logic, pedal-role substitution method) — not just settings dumps. Schema enforces this with a first-class `principles[]` field per recipe (Tone Engineer R6).
- *Compress decision cycle at the moment of [tonal] change.* The visual signal chain is a pre-flight reference: glanceable, complete, accurate. The user studies it before picking up the guitar.
- *Single-file architecture is load-bearing.* All gear data, recipe data, and rendering live in the HTML or in a sibling `.js` file loaded by it.
- *Tab is GPS, TONE is the internal map.* Settings are GPS. The annotations layer (the *why* per setting, the substitution rationale, the era constraint, the distillation principles) is the map.
- *Tuning is a parameter.* Recipe tuning is authoritative for the recipe's own renders; global tuning remains authoritative for Decoder/Chords/Scales/Theory tabs (Guitar Systems R1).

---

## 1. Mission & Scope

### 1.1 In scope (v1)

- Gear inventory schema covering all categories present in `gear.txt` (guitars, amps, amp-in-a-box pedals, drives, modulation, time-based, wahs, utility, FRFR/cabs, modeler).
- Per-song tonal preset schema with field-level provenance (4-tier: assumed / inferred / verified / validated), notation fidelity per setting, era discrimination, and substitution traceability.
- Role-to-gear inverse index, derived from inventory at runtime.
- **Schema-level role assertion validation** — any recipe asserting that gear X fills role Y is rejected unless Y appears in X.roles[]. Anti-hallucination guard structural, not procedural.
- Visual signal chain renderer — pedalboard layout, knob graphics, amp panels, two-amp routing, annotation overlay.
- Recipe authoring/edit UI in-tab (text-based editing; no knob drag — see 4.3).
- Library tab integration — each song row gains a tone-recipe affordance distinct from the existing ▶ Play Mode button.
- Tone Engineer agent updates to read inventory, query the role index, validate against role assertions, and emit tone presets in the schema.
- Player agent handoff via the existing TONE TARGETS contract (no schema change for player agents).
- Migration of existing `TONE_RECIPES` prototype (line 5095 of HTML) and `tone-setup-card` Decoder pre-flight surface.

### 1.2 Out of scope

- **Play Mode integration.** Gear tab and Play Mode are independent activities. Linked by preset, not by UI surface.
- **Knob drag editing.** Settings are authored via text entry to preserve notation fidelity (see 4.3 and Conflict 1 resolution in Section 9).
- Audio playback, MIDI, or amp-modeler integration. The Helix can be *referenced* in a recipe as a routing target ("Helix patch X with IR Y") but TONE does not load Helix patches.
- Real-time gear inventory sync from external systems. Inventory is hand-maintained.
- Multi-user accounts, sharing, cloud sync. Single-file, single-user, download-to-save.
- Mobile/touch authoring gestures. v1 is desktop-first; click-only fallbacks for any non-drag interactions.
- Block-level Helix signal-chain modeling (deferred to v2; v1 references Helix patches by name + IR).

### 1.3 Reliability targets

This is end-user-facing for a 20+ year guitarist. Reliability bars:

| Concern | Target |
|---|---|
| Inventory accuracy | 100% — every item in `gear.txt` represented; no items invented |
| Role assertion correctness | Structurally enforced. Recipe schema validation rejects role assertions not backed by gear's `roles[]` tag |
| Substitution honesty | No hallucinated gaps. Role index queryable. Direct matches always preferred over substitutes |
| Era discrimination | Universal. Every recipe locked to a specific recording with citation |
| Notation fidelity | Authored notation (numeric vs clock-face) preserved per setting; never silently converted |
| Provenance | 4-tier (assumed / inferred / verified / validated) at the field level, with source quote per verified setting |
| Schema durability | Recipes authored against v1 schema must remain readable as schema evolves; additive changes only; never rename, never tighten constraints |
| Render fidelity | Knob positions accurate to the source's authored notation, with normalized representation as secondary tooltip |

---

## 2. Architectural Context

### 2.1 Where the Gear tab fits

```
Existing tabs:    Decoder / Chords / Scales / Theory / Library / Dashboard
New tab:          GEAR  (positioned: Library → Gear → Dashboard)
Existing modes:   Play Mode (full-screen overlay), Settings panel
Modes affected:   None — Play Mode does NOT receive a gear panel
```

### 2.2 What the Gear tab depends on

- `GEAR_INVENTORY` constant — new, defined in sibling `gear-inventory.js` file (Architect R9 / Q1)
- `TONE_RECIPES` data — new; **inline in HTML between marker pair `/*@@TONE_RECIPES_START@@*/` ... `/*@@TONE_RECIPES_END@@*/`** so the existing download-to-save mechanism round-trips recipes without introducing localStorage (Architect R3 / Q2)
- `_activeRecipe = { recipeId: null, songId: null }` — **new global state, separate from `_activeContext`** (Architect R2). Decoder remains sole writer of `_activeContext`. Library row click and Gear tab navigation are the only writers of `_activeRecipe`.
- The existing prototype `TONE_RECIPES` constant + `renderToneSetup()` function + `tone-setup-card` CSS at HTML lines 1255 / 5095 / 5382 (UI/UX R13) — to be migrated, not abandoned.

**Field-name corrections from v0.1:** the actual `_activeContext` shape is `{ keyRoot, keyMode, source, activeChordQuality, activeChordRoot, chords }` (HTML line 5700). v0.1 incorrectly referenced `activeKey` / `activeMode`. v0.2 uses correct names throughout.

### 2.3 What touches the Gear tab

- **Library tab** — each row gains a "tone" badge if the song has any recipes. Click on the badge enters the Gear tab with that song's recipes loaded. The existing ▶ button continues to enter Play Mode unchanged. Two distinct entry points per row.
- **Tone Engineer agent** — reads `GEAR_INVENTORY`, queries `ROLE_INDEX`, validates role assertions, writes tone presets in v1 schema.
- **Player agents (Hendrix / EVH / SRV / KWS)** — emit `TONE TARGETS` blocks per existing tone-engineer.md contract; downstream of Gear tab, no contract change.
- **Save/download** — recipes serialize into the HTML via the generalized `serializeDataBlocks()` mechanism (formerly `serializePresets()`) processing both PRESETS and TONE_RECIPES marker pairs in one pass. No localStorage.
- **Decoder tab — existing `tone-setup-card` to be retired** (UI/UX R13). Decoder is harmonic; tone has no business there. The visual vocabulary (compact monospace table, amber title) is reused inside the Gear tab as the chrome for amp panels and substitution audit.
- **Play Mode** — no integration. (Conflict 2 resolution.)
- **Decoder, Chords, Scales, Theory** — no changes to existing behavior. Gear tab does not write `_activeContext`; tuning precedence rules (Section 5.4) keep these tabs on global tuning regardless of recipe presence.

### 2.4 ROADMAP / open architectural questions affected

- `tone-vocabulary` W3 — directly served. This tab is the rendering surface.
- `per-song-tuning` W2 — partially served by `recipe.guitar.tuning` (object-typed; round-trips engine string). Per Guitar Systems R1, recipe tuning does NOT propagate to other tabs — it is authoritative only within Gear tab and is read-only from Library.
- "Tone Engineer panel" mentioned in TONE_CONTEXT as "don't refactor yet" — the Gear tab IS the Tone Engineer panel. Reframes the deferral; does not violate it.
- "Data strategy: single file vs external data files" open question — v0.2 commits: GEAR_INVENTORY in sibling `gear-inventory.js`; TONE_RECIPES inline in HTML between markers. Tripwire: when inline TONE_RECIPES exceeds ~3,000 lines (~50 recipes), evaluate moving to sibling `tone-recipes.js`.

---

## 3. Data Model

### 3.1 GEAR_INVENTORY schema

Schema location: sibling `gear-inventory.js`, loaded via `<script src="gear-inventory.js">` immediately after `dashboard-data.js`. Hand-maintained; not user-editable in-app.

Each item has stable `id`, display fields, structured controls, and role tags. Items recipes reference are looked up by `id`.

**Spec verifiability (v0.2, locked — see Section 9 / CLAUDE.md LD#9).** Every pedal entry carries:

- `power` — DC power requirement, modeled separately from amp wattage. Amp `power:` is wattage/tube type; pedal `power:` is the supply-allocation fact. Shape: `{ input, voltageV, currentDrawMa, polarity, connector, batteryCapable, batteryType }`. This makes "does the Voodoo Lab MONDO have a free compatible output for this board?" a queryable fact rather than tribal knowledge.
- `specProvenance` — **one per-item stamp** (not per-field): `{ source, status, checked }`. Gear specs come from a single manufacturer document per item (manual / spec page), unlike recipe settings which come from heterogeneous per-knob sources — so per-item is the correct granularity. `status` uses the same axis as recipe provenance (`confirmed` once cross-checked against the manufacturer doc; `unconfirmed` until then). "100% verifiable" = every pedal's control complement, ranges, switches, and power trace to a cited source.
- `default` knob values are **author-inferred starting points, never manufacturer spec**, and are explicitly *excluded* from the `specProvenance` claim. They are retained for Tone Engineer convenience but must never be read as verified. The `specProvenance` stamp covers only the verifiable spec surface: control complement, ranges, switches, power.

```js
const GEAR_INVENTORY = {
  guitars: [
    {
      id: 'fender-ultra-luxe-strat',
      name: 'Fender American Ultra Luxe Vintage \'60s Stratocaster',
      shortName: 'Ultra Luxe Strat',
      finish: 'Ice Blue Metallic, Heirloom Lacquer',
      pickupConfig: 'SSS',
      pickups: [
        { position: 'neck',   type: 'noiseless single-coil', voicing: 'warm, articulate' },
        { position: 'middle', type: 'noiseless single-coil', voicing: 'glassy, hollow' },
        { position: 'bridge', type: 'noiseless single-coil', voicing: 'cutting, present' },
      ],
      // STRUCTURED switching, not prose (Guitar Systems R3)
      switching: {
        primary:   { type: '5-way blade', positions: 5 },
        secondary: [
          { id: 's1', type: 'push-pull', engaged: 'positions 2 and 4 → series', default: 'parallel' },
        ],
      },
      controls: [
        { id: 'volume',     type: 'knob', range: [0, 10] },
        { id: 'tone-neck',  type: 'knob', range: [0, 10] },
        { id: 'tone-bridge',type: 'knob', range: [0, 10] },
      ],
      roles: ['single-coil', 'strat-territory', 'hendrix-platform', 'srv-platform', 'kws-platform', 'mayer-platform'],
      defaultTuning: 'standard',
      notes: 'Primary guitar for Hendrix/SRV/KWS lineage and Eb-tuning work',
    },
    // ... wolfgang-special, prs-tremonti
  ],

  amps: [
    {
      id: 'evh-5150-iconic-80w',
      name: 'EVH 5150 Iconic Series EL34 80W Head',
      shortName: '5150 Iconic',
      type: 'tube head',
      power: 80,
      tubes: {
        power: 'EL34',
        preamp: '12AX7',
        rectifier: null,                    // null = not rectifier-switchable (Tone Engineer R8)
      },
      cabinetPaired: 'evh-5150-4x12',
      cabinetCompatibleOhms: [4, 8, 16],   // Tone Engineer R8
      breakupBehavior: 'high-gain-cascading',  // (Tone Engineer R5: 'late-clean-headroom' | 'mid-power-tweed-breakup' | 'high-gain-cascading' | 'rectifier-sag-switchable')
      channels: [
        { name: 'clean',  controls: ['gain','volume','low','mid','high'],                     voicing: 'clear with some spank' },
        { name: 'crunch', controls: ['gain','volume','low','mid','high'],                     voicing: 'classic Marshall-adjacent crunch' },
        { name: 'lead',   controls: ['gain','volume','low','mid','high','presence','resonance'], voicing: 'high-gain, EL34-British aggression' },
      ],
      globalControls: ['presence', 'resonance', 'master'],
      effectsLoop: true,
      roles: ['high-gain', '5150-voice', 'evh-platform', 'rock-rhythm', 'rock-lead'],
    },
    {
      id: 'mesa-dual-rectifier-100w',
      name: 'Mesa/Boogie Dual Rectifier 100W Head',
      type: 'tube head',
      power: 100,
      tubes: {
        power: '6L6',
        preamp: '12AX7',
        rectifier: 'switchable',           // silicon | tube | switchable | null
      },
      cabinetPaired: 'mesa-rectifier-4x12',
      cabinetCompatibleOhms: [4, 8, 16],
      breakupBehavior: 'rectifier-sag-switchable',
      // ...
    },
    // ... tone-master-twin, blues-deluxe
  ],

  ampInABox: [
    {
      id: 'uafx-lion-68',
      name: 'Universal Audio UAFX Lion \'68 Super Lead',
      shortName: 'Lion \'68',
      type: 'amp emulation pedal',
      modelsAmp: '1968 Marshall Super Lead Plexi',
      controls: [
        { id: 'volume',   type: 'knob',  range: [0, 10], default: 5 },
        { id: 'gain',     type: 'knob',  range: [0, 10], default: 5 },
        { id: 'bass',     type: 'knob',  range: [0, 10], default: 5 },
        { id: 'middle',   type: 'knob',  range: [0, 10], default: 5 },
        { id: 'treble',   type: 'knob',  range: [0, 10], default: 5 },
        { id: 'presence', type: 'knob',  range: [0, 10], default: 5 },
      ],
      switches: [
        { id: 'mode',    type: 'multi-position', positions: ['AMP', 'AMP+CAB', 'AMP+CAB+ROOM'] },
        { id: 'cab-sim', type: 'multi-position', positions: ['Greenback 4x12', 'V30 4x12', 'Off'] },
        { id: 'voice',   type: 'multi-position', positions: ['Stock', 'Brown', 'Super Bass'] },
      ],
      // Replaces v0.1's `requiresFrfr: true` with the fuller modes (Tone Engineer R8):
      outputModes: ['frfr-direct', 'into-power-amp', 'into-front-of-amp-as-drive'],
      compatibleOutputs: ['line-6-powercab-212-plus', 'headrush-frfr-112', 'di-to-interface'],
      roles: ['plexi-voice', 'brown-sound', 'hendrix-platform', 'mccready-platform', 'evh-brown-sound-platform'],
    },
    // ... uafx-anti-1992, tonex-one-brown-sound
  ],

  drives: [
    {
      id: 'ibanez-ts808-35th',
      name: 'Ibanez TS808 35th Anniversary Overdrive',
      shortName: 'TS808',
      circuit: 'JRC4558D op-amp tube screamer topology',
      controls: [
        // `default` = author-inferred starting point, NOT manufacturer spec; excluded from specProvenance
        { id: 'drive', type: 'knob', range: [0, 10], default: 3 },
        { id: 'tone',  type: 'knob', range: [0, 10], default: 5 },
        { id: 'level', type: 'knob', range: [0, 10], default: 7 },
      ],
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 8, polarity: 'center-negative',
               connector: '2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'Ibanez official TS808 spec page (ibanez.com)',
                        status: 'unconfirmed', checked: '2026-05-18',
                        note: 'Spec from std TS808 page; no 35th-specific page exists (same circuit). status stays unconfirmed until a 35th-Anniversary source is found — illustrates the confirmed/unconfirmed axis.' },
      roles: ['tube-screamer', 'mid-push-boost', 'srv-boost', 'kws-boost', 'low-gain-overdrive'],
      typicalDeployment: 'low drive + high level into a clean or lightly broken-up amp; pushes the front end into mid-forward saturation',
    },
    {
      id: 'king-tone-duellist',
      name: 'King Tone Duellist Dual Overdrive',
      shortName: 'Duellist',
      circuit: 'two independent overdrives in one enclosure',
      sides: [
        {
          sideId: 'string-singer',
          name: 'String Singer',
          voicing: 'low-gain, transparent, Klon-flavored boost',
          controls: [
            { id: 'drive',  type: 'knob', range: [0, 10], default: 2 },
            { id: 'tone',   type: 'knob', range: [0, 10], default: 5 },
            { id: 'volume', type: 'knob', range: [0, 10], default: 6 },
          ],
          roles: ['klon-flavor', 'transparent-boost', 'kws-1997-substitute'],
        },
        {
          sideId: 'heavy-hand',
          name: 'Heavy Hand',
          voicing: 'aggressive, mid-forward, King-of-Tone territory',
          controls: [
            { id: 'drive',  type: 'knob', range: [0, 10], default: 5 },
            { id: 'tone',   type: 'knob', range: [0, 10], default: 4 },
            { id: 'volume', type: 'knob', range: [0, 10], default: 6 },
          ],
          roles: ['kot-flavor', 'kws-modern-substitute', 'solo-boost'],
        },
      ],
      stackable: true,
    },
    // ... maxon-od808, evh-5150-od, wampler-plexi-drive, wampler-euphoria, ehx-green-russian-big-muff
  ],

  modulation: [
    {
      id: 'mxr-m68-univibe',
      name: 'MXR M68 Uni-Vibe Chorus/Vibrato',
      shortName: 'M68 Uni-Vibe',
      circuit: 'photocell-based optical phase shifter (Univibe topology)',
      controls: [
        { id: 'level', type: 'knob', range: [0, 10], default: 5 },
        { id: 'speed', type: 'knob', range: [0, 10], default: 5 },
        { id: 'depth', type: 'knob', range: [0, 10], default: 5 },
      ],
      switches: [
        { id: 'mode', type: 'two-position', positions: ['Chorus', 'Vibrato'] },
      ],
      roles: ['univibe-modulation', 'watery-modulation', 'hendrix-rhythm-texture', 'kws-1997-substitute', 'kws-modern-substitute'],
      typicalDeployment: 'placed before drive for classic Hendrix Machine Gun rhythm; chorus mode for KWS Voodoo Child funk break (DIRECT MATCH for Univibe role — preferred over Phase 90 substitution)',
    },
    {
      id: 'mxr-evh-phase-90',
      name: 'MXR EVH Phase 90',
      shortName: 'EVH Phase 90',
      circuit: 'four-stage phase shifter',
      controls: [
        { id: 'speed', type: 'knob', range: [0, 10], default: 3 },
      ],
      switches: [
        { id: 'voicing', type: 'two-position', positions: ['Script', 'Block'] },
      ],
      roles: ['phase-90', 'evh-eruption-swirl', 'evh-rhythm-shimmer'],
      typicalDeployment: 'Script mode for vintage EVH solo swirl; Block mode for post-1980 EVH territory. NOT PREFERRED as Univibe substitute when M68 Uni-Vibe is available.',
    },
    // ... mxr-analog-chorus, boss-ps-6
  ],

  timeBased: [ /* boss-sde-3, tc-flashback, tc-hall-of-fame-2, wampler-faux-spring */ ],
  wahs:      [ /* dunlop-mc404, fulltone-supa-wah, vox-v847a */ ],

  utility: [
    {
      id: 'tc-polytune-3',
      name: 'TC Electronic PolyTune 3',
      type: 'tuner',
      controls: [],
      placementConstraint: 'always-first',  // Tone Engineer R8: structural constraint, not prose
      roles: ['tuner'],
    },
    {
      id: 'mxr-smartgate',
      name: 'MXR Smartgate Noise Gate',
      type: 'noise gate',
      controls: [{ id: 'threshold', type: 'knob', range: [0, 10] }],
      placementConstraint: 'post-high-gain-amp',  // expected after 5150/Mesa, before time-based loop
      roles: ['noise-gate'],
    },
    // ... boss-cs-3, digitech-drop, radial-bigshot-aby, voodoo-lab-mondo
  ],

  cabinets: [ /* evh-5150-4x12, mesa-rectifier-4x12, line-6-powercab-212-plus, headrush-frfr-112 */ ],
  modeler:  [ /* line-6-helix */ ],
};
```

**Key design decisions:**

- **Stable `id` per item.** Tone presets reference items by id, not by name. Renaming the display name doesn't break recipes.
- **Structured controls** with explicit `type` (`knob` | `two-position` | `multi-position` | `footswitch` | etc.). This drives the rendering layer's choice between dial graphic, two-state switch, segmented selector, etc.
- **Multi-side pedals** (Duellist) have `sides[]` with their own controls and roles. Recipes can engage one or both sides with independent settings.
- **`roles[]`** is the inverse index. Drives both forward query (find gear for a role) and reverse validation (recipe asserting gear fills role X is rejected unless X ∈ gear.roles).
- **`outputModes[]`** on amp-in-a-box pedals replaces v0.1's binary `requiresFrfr` flag (Tone Engineer R8).
- **`tubes.rectifier`** on tube heads (Tone Engineer R8); Mesa Dual Rec is `'switchable'`, EVH 5150 is `null`.
- **`breakupBehavior`** as enumerated category enables the recipe `targetState` field to be cross-referenced (an amp with `breakupBehavior: 'late-clean-headroom'` can target `'pristine-clean'` or `'edge-of-breakup'` but not `'grinding'`).
- **`placementConstraint`** on utility pedals (Tone Engineer R8) — `'always-first' | 'always-last' | 'pre-drive' | 'post-drive' | 'fx-loop-only' | 'post-high-gain-amp' | null`.
- **`typicalDeployment` prose field** captures distillation principles per item, surfaces in tooltips and is read by the Tone Engineer agent for context.

### 3.2 TONE_RECIPES schema

Schema location: inline in HTML between marker pair `/*@@TONE_RECIPES_START@@*/` ... `/*@@TONE_RECIPES_END@@*/` (Architect R3). Round-trips through generalized `serializeDataBlocks()` save flow (replaces `serializePresets()`).

Per-song tonal preset, keyed by `<artist>-<song>-<era>` to allow multiple recipes per song.

```js
const TONE_RECIPES = {
  'kws-while-we-cry-1995': {
    songId: 'kws-while-we-cry',
    artistId: 'kenny-wayne-shepherd',
    era: '1995 Ledbetter Heights',
    sourceRecording: 'Ledbetter Heights (1995, Giant Records) — KWS at 17-18',
    sourceDescription: 'Conversational lyrical lead in Hendrix Little Wing / SRV Lenny lineage',

    // First-class transferable principles (Tone Engineer R6)
    principles: [
      'String mass is load-bearing — going from .010s to .011s with .058 low E is the single biggest physical change toward this tone.',
      'Tone serves the touch, not the reverse. This song lives or dies on picking dynamics and vibrato.',
      'Verge of breakup is the target. Numeric settings are starting points; calibrate by ear.',
      'When stacking amps, normal channel only — vibrato channel is out of phase when blended.',
    ],

    guitar: {
      gearId: 'fender-ultra-luxe-strat',
      // Pickup as object, not bare string (Guitar Systems R3)
      pickup: { selector: 1, s1: 'parallel', volume: 10, toneNeck: 8, toneBridge: 10 },
      pickupOverrides: 'middle position (selector 3) for some passages',
      // Tuning as object with engine round-trip (Guitar Systems R2)
      tuning: { id: 'standard', open: 'E A D G B E', notation: 'concert' },
      // Capo moved from PRESETS to recipe (Guitar Systems R5)
      capo: { fret: 0, partial: false },
      stringGauge: { gauge: '.011-.058 (KWS published, Ernie Ball)', loadBearing: true },
      pick: 'Dunlop heavy celluloid',
      provenance: 'verified',
      sourceQuote: 'KWS string set per Premier Guitar 2023 rig rundown',
    },

    routing: {
      topology: 'two-amp-aby',
      abySplit: { leftAmpId: 'tone-master-twin', rightAmpId: 'blues-deluxe' },
      pan: {
        left:  { authored: { value: '10 o\'clock', notation: 'clock' }, normalizedValue: 4 },
        right: { authored: { value: '2 o\'clock',  notation: 'clock' }, normalizedValue: 8 },
      },
      effectsLoopRouting: 'shared',                // 'shared' | 'per-amp' | 'wet-amp-only' (Tone Engineer R2)
      provenance: 'verified',
      sourceQuote: '"...you get a spread and it\'s a nice sound because you get a blend of a cleaner tone sound with a slightly dirtier sound." — KWS, MusicRadar 2018',
    },

    amps: [
      {
        gearId: 'tone-master-twin',
        role: 'clean-platform',
        pan: 'left',
        channel: 'normal',
        channelReason: 'phase coherence with the crunch amp; Vibrato channel out-of-phase when blended',
        targetState: 'pristine-clean',           // (Tone Engineer R5)
        settingsAreStartingPoints: true,
        // Each setting carries authored notation + normalized value + provenance + source quote (Conflict 1)
        settings: {
          volume:   { authored: { value: 5.5, notation: 'numeric' }, normalizedValue: 5.5, provenance: 'inferred' },
          treble:   { authored: { value: 6,   notation: 'numeric' }, normalizedValue: 6,   provenance: 'inferred' },
          bass:     { authored: { value: 5,   notation: 'numeric' }, normalizedValue: 5,   provenance: 'inferred' },
          mid:      { authored: { value: 6,   notation: 'numeric' }, normalizedValue: 6,   provenance: 'inferred' },
          presence: { authored: { value: 4,   notation: 'numeric' }, normalizedValue: 4,   provenance: 'inferred' },
          reverb:   { authored: { value: 3.5, notation: 'numeric' }, normalizedValue: 3.5, provenance: 'inferred' },
          bright:   { authored: { value: 'off', notation: 'switch' }, normalizedValue: null, provenance: 'inferred' },
        },
        provenanceNote: 'Settings inferred from KWS\'s published Bassman starting points scaled to Twin context.',
      },
      {
        gearId: 'blues-deluxe',
        role: 'crunch-platform',
        pan: 'right',
        channel: 'normal',
        targetState: 'edge-of-breakup',
        settingsAreStartingPoints: true,
        settings: {
          volume:   { authored: { value: 6.5, notation: 'numeric' }, normalizedValue: 6.5, provenance: 'inferred' },
          master:   { authored: { value: 5.5, notation: 'numeric' }, normalizedValue: 5.5, provenance: 'inferred' },
          treble:   { authored: { value: 6,   notation: 'numeric' }, normalizedValue: 6,   provenance: 'inferred' },
          mid:      { authored: { value: 6.5, notation: 'numeric' }, normalizedValue: 6.5, provenance: 'verified',
                      sourceQuote: 'KWS Bassman published settings: middle 6.5' },
          bass:     { authored: { value: 5,   notation: 'numeric' }, normalizedValue: 5,   provenance: 'verified' },
          presence: { authored: { value: 4,   notation: 'numeric' }, normalizedValue: 4,   provenance: 'verified' },
          reverb:   { authored: { value: 2.5, notation: 'numeric' }, normalizedValue: 2.5, provenance: 'inferred' },
        },
        substitution: {
          original: 'Fender Super Reverb (KWS used a pair on Ledbetter Heights sessions)',
          method: 'role-fill',                 // enumerated taxonomy — see Section 3.5
          quality: 'closest available analog',
          rationale: 'Both are 6L6 mid-power Fenders that break up earlier than a Twin. Blues Deluxe is harsher when pushed; stop short of fizz.',
        },
      },
    ],

    pedalChain: [
      { position: 1, gearId: 'tc-polytune-3',      engaged: 'always',              notes: 'tuner first (placementConstraint enforced)' },
      { position: 2, gearId: 'dunlop-mc404',       engaged: 'off',                 notes: 'not used on this song' },
      { position: 3, gearId: 'mxr-m68-univibe',    engaged: 'off',                 notes: 'not used on this song; engaged on Voodoo Child' },
      { position: 4, gearId: 'king-tone-duellist',
                     side: 'string-singer',
                     engaged: 'lead-passages-only',
                     role: 'klon-flavor',          // MUST appear in Duellist String Singer's roles[]; otherwise schema rejects
                     settings: {
                       drive:  { authored: { value: '9 o\'clock',  notation: 'clock' }, normalizedValue: 3, provenance: 'inferred' },
                       tone:   { authored: { value: '12 o\'clock', notation: 'clock' }, normalizedValue: 5, provenance: 'inferred' },
                       volume: { authored: { value: '1 o\'clock',  notation: 'clock' }, normalizedValue: 7, provenance: 'inferred' },
                     },
                     notes: 'Stacked on top of TS808 for the climbing solo' },
      { position: 5, gearId: 'ibanez-ts808-35th',
                     engaged: 'lead-passages-only',
                     role: 'mid-push-boost',
                     settings: {
                       drive:  { authored: { value: '9 o\'clock',  notation: 'clock' }, normalizedValue: 3, provenance: 'verified',
                                 sourceQuote: 'KWS published low-drive recipe: drive at 9 o\'clock' },
                       tone:   { authored: { value: '12 o\'clock', notation: 'clock' }, normalizedValue: 5, provenance: 'inferred' },
                       level:  { authored: { value: '2 o\'clock',  notation: 'clock' }, normalizedValue: 8, provenance: 'verified' },
                     },
                     notes: 'Main lead color. Low drive, high level — pushing not adding' },
      // ...
    ],

    // Effects loop separate from front-of-amp chain (Tone Engineer R2)
    effectsLoopChain: [
      { position: 1, gearId: 'tc-hall-of-fame-2', engaged: 'always',
                     role: 'reverb',
                     settings: {
                       decay: { authored: { value: '11 o\'clock', notation: 'clock' }, normalizedValue: 4, provenance: 'inferred' },
                       tone:  { authored: { value: '12 o\'clock', notation: 'clock' }, normalizedValue: 5, provenance: 'inferred' },
                       level: { authored: { value: '12 o\'clock', notation: 'clock' }, normalizedValue: 5, provenance: 'inferred' },
                     },
                     notes: 'Light room ambience; song uses amp reverb primarily' },
    ],

    songDeployment: {
      summary: 'Twin doing 70% of the work for the clean sustained voice. TS808 only on lead passages.',
      // Sub-section deployment (Tone Engineer R7)
      sections: [
        { sectionLabel: 'verse',                     pedalsEngaged: ['tc-polytune-3'],                    note: 'clean both amps',
          subsections: [] },
        { sectionLabel: 'lead',                      pedalsEngaged: ['tc-polytune-3', 'ibanez-ts808-35th'], note: 'TS808 only',
          subsections: [] },
        { sectionLabel: 'climbing-solo',             pedalsEngaged: ['tc-polytune-3', 'king-tone-duellist:string-singer', 'ibanez-ts808-35th'],
          note: 'add Duellist on top of TS808',
          subsections: [
            { label: 'climbing-solo / sustain peak', pedalsEngaged: ['tc-polytune-3', 'king-tone-duellist:string-singer', 'ibanez-ts808-35th'],
              note: 'high-register sustain notes' },
          ] },
      ],
      character: 'Lyrical, sustained, conversational. Lives or dies on picking dynamics and vibrato. Tone serves the touch, not the reverse.',
    },

    sources: {
      primary: [
        { url: 'https://www.musicradar.com/news/rig-tour-kenny-wayne-shepherd', title: 'MusicRadar — Rig tour: Kenny Wayne Shepherd', cited: 'amp settings, two-amp pan, normal-channel-when-blending rule' },
        { url: 'https://themusicuniverse.com/kenny-wayne-shepherd-re-records-trouble/', title: 'Music Universe — KWS re-records Trouble Is...', cited: '1997 rig confirmation' },
      ],
      secondary: [
        { url: 'https://www.songfacts.com/facts/kenny-wayne-shepherd/while-we-cry', title: 'Songfacts — While We Cry', cited: 'Hendrix Little Wing / SRV Lenny lineage' },
      ],
      tertiary: [
        { url: 'https://www.analogman.com/graphics/kws/kws.htm', title: 'Analog Man — KWS Band', cited: 'TS9/808 modification history' },
      ],
    },

    substitutionAudit: [
      { artistGear: 'Fender Super Reverb reissue (pair)', userGearId: 'tone-master-twin + blues-deluxe', method: 'role-fill',           quality: 'closest available analog', source: 'role-index lookup: 6L6-fender-clean / 6L6-fender-crunch slots' },
      { artistGear: 'Ibanez TS808',                       userGearId: 'ibanez-ts808-35th',                method: 'direct-match',       quality: 'direct',                  source: 'role-index lookup: tube-screamer slot' },
      { artistGear: 'Univibe',                            userGearId: 'mxr-m68-univibe',                  method: 'direct-match',       quality: 'direct',                  source: 'role-index lookup: univibe-modulation slot — DIRECT MATCH (not Phase 90)' },
      // ...
    ],

    flaggedGaps: [
      // Each entry: roleName, dispositon: 'explicit-skip' | 'flagged-gap', rationale (Tone Engineer R10)
      // explicit-skip = brief or accepted loss; flagged-gap = surface to user, may invoke Workflow B
    ],

    schemaVersion: 1,
    authoredBy: 'tone-engineer-agent',
    authoredAt: '2026-05-02',
    lastValidatedBy: null,
    lastValidatedAt: null,
  },

  // ... additional recipes (e.g., 'kws-voodoo-child-1997' showing Eb tuning + Univibe DIRECT match + Octavia explicit-skip)
};
```

### 3.3 Provenance taxonomy (4-tier — Tone Engineer R3)

| Tier | Meaning | Authored by | Required fields |
|---|---|---|---|
| `assumed` | Best-guess from circuit philosophy; no source | Agent | `authored.value`, `authored.notation` |
| `inferred` | Derived from analogous published source | Agent | `authored.value`, `authored.notation`, `sourceQuote` (recommended) |
| `verified` | Sourced quote / published number | Agent | `authored.value`, `authored.notation`, `sourceQuote` (required) |
| `validated` | User has dialed and confirmed against the actual recording with their real rig | User (in edit mode) | `authored.value`, `authored.notation`, `lastValidatedAt` timestamp |

`validated` is the lifecycle endpoint and is the only tier the user authors. Promotion path: agent emits at `assumed/inferred/verified` → user dials in → user confirms in edit mode → field's provenance auto-promotes to `validated` with timestamp.

### 3.4 Notation fidelity (Conflict 1 resolution)

Settings come from sources in two distinct authored forms — both are sources of truth, neither is interchangeable with the other:

- **Numeric**: "Volume 7" → store as `{ value: 7, notation: 'numeric' }`
- **Clock-face**: "treble at 3 o'clock" → store as `{ value: '3 o\'clock', notation: 'clock' }`

Schema discipline:

1. **Authored notation is permanent.** Stored verbatim per setting. Never silently converted at write time.
2. **Render in authored notation by default.** A setting authored as "3 o'clock" renders as 3 o'clock; a setting authored as 7 renders as 7. The two coexist in the same recipe, even on the same pedal.
3. **`normalizedValue` field is for analysis only.** Computed from authored value at write time. Used for cross-recipe queries ("show all recipes where TS808 drive < 10 o'clock") and for visual dial position rendering. Never the authoritative display.
4. **No conversion on edit.** When the user edits a setting in text mode, the parser detects notation from the input ("3" vs "3 o'clock" vs "noon") and stores accordingly. The user can change a setting's notation by editing it (e.g., delete "3 o'clock" and type "7" — the field's notation becomes 'numeric').

This prevents the documented failure mode where Mark Tremonti's Mesa settings have been mistranslated across forums by readers conflating "treble at 3" (3 o'clock, ~8 of 10) with "treble at 3" (3 of 10). See tracked follow-up in Section 10 for a research event on Tremonti settings specifically.

### 3.5 Substitution method taxonomy (Tone Engineer R4)

Enumerated values for `substitution.method` and `substitutionAudit[].method`:

| Method | Definition | Example |
|---|---|---|
| `direct-match` | Gear is the artist's exact item or the manufacturer's direct successor | TS808 35th for original TS808; Tone Master Twin for Blackface Twin reissue |
| `circuit-philosophy` | Same circuit lineage / topology, different unit | Maxon OD808 for Ibanez TS808 |
| `role-fill` | Same tonal role via different circuit | Blues Deluxe for Vibro-King — both 6L6 mid-power Fenders |
| `tonal-adjacent` | Adjacent function in same family; explicitly weaker than role-fill | Phase 90 for Univibe **only when no Univibe-tagged gear exists** |
| `internal-side-selection` | Owned multi-side pedal where one side fills the role | Duellist String Singer side as Klon Centaur analog |
| `amp-in-a-box-emulation` | Pedal that emulates an amp circuit | UAFX Lion '68 for Plexi |
| `capture` | AI/tone-capture profile of a specific source amp | TONEX ONE Brown Sound LE |
| `helix-fallback` | Helix model used when no other owned gear fills the role | Helix patch for JCM800 voice |
| `explicit-skip` | No substitute; role intentionally absent from recipe | Octavia in KWS Voodoo Child funk break — agent and user agreed brief section can omit |
| `flagged-gap` | No substitute; recipe incomplete; surface to user (Workflow B trigger) | (typically rare in v1; reserved for future use) |

`explicit-skip` and `flagged-gap` are different: skip is accepted-loss, gap surfaces to user and is the only `substitution.method` value that opens a Workflow B (acquisition) discussion path.

*(Phase 3 hardening: `validateRecipeRoles()` structurally rejects any `substitutionAudit[].method` outside this enumeration — added after the Phase 3 acceptance rerun emitted invented methods (`role-analog`), proving prompt-layer discipline alone doesn't bind.)*

### 3.6 Role index — derived view of GEAR_INVENTORY

Built at app load by walking `GEAR_INVENTORY` and inverting `roles[]`:

```js
const ROLE_INDEX = buildRoleIndex(GEAR_INVENTORY);
// Result:
// {
//   'univibe-modulation':       [{ gearId: 'mxr-m68-univibe', quality: 'direct' }],
//   'klon-flavor':              [{ gearId: 'king-tone-duellist', side: 'string-singer', quality: 'closest-analog' }],
//   'plexi-voice':              [{ gearId: 'uafx-lion-68', quality: 'amp-in-a-box' }],
//   'brown-sound':              [{ gearId: 'uafx-lion-68', quality: 'amp-in-a-box', voicing: 'Brown' },
//                                { gearId: 'tonex-one-brown-sound', quality: 'capture' }],
//   'jcm800-voice':             [],   // empty — flagged gap
//   ...
// }
```

### 3.7 Schema-level role assertion validation (Tone Engineer R1 — closes the GAP-1 critical finding)

**The structural anti-hallucination guard.** This is the load-bearing change from v0.1.

For every entry in `pedalChain[]`, `effectsLoopChain[]`, and `amps[]` of a recipe:

```
Let G = lookup gearId in GEAR_INVENTORY (or sides[sideId] if side specified)
Let R = entry.role (if present)
ASSERT: R is in G.roles[]
If not: schema validation FAILS, recipe is invalid
```

This is enforced at:

- **Recipe load time** (when `TONE_RECIPES` parses on app boot)
- **Recipe save time** (when user-authored or agent-authored recipe is committed)
- **Agent emit time** (Tone Engineer agent's recipe-output validator)

A recipe asserting `{ gearId: 'mxr-evh-phase-90', role: 'univibe-modulation' }` is **rejected** because `'univibe-modulation'` does not appear in `mxr-evh-phase-90.roles[]`. The schema makes the Univibe miss structurally impossible; the agent cannot drift past the role index without producing an invalid recipe.

The two-sided guard:

| Direction | Mechanism | Effect |
|---|---|---|
| **Forward** | Query `ROLE_INDEX[role]` before substituting | Find the direct match if it exists |
| **Reverse** | Schema rejects role assertions not backed by gear's `roles[]` | Prevent assertion drift |

### 3.8 Schema integration with PRESETS

**Decision: parallel keyed collection (`TONE_RECIPES`), recipes inline in HTML between markers.**

PRESETS rows gain optional `recipeIds: ['kws-while-we-cry-1995']` field — additive, backward-compatible. Library row click on the tone badge looks up `PRESETS[i].recipeIds[0]` by default; if `recipeIds.length > 1`, a recipe selector appears in the Gear tab header.

**Capo migration (Guitar Systems R5):** `recipe.guitar.capo` is authoritative when the Gear tab is showing a recipe. `PRESETS[i].capo` remains for backward compat but is deprecated; recipes win when present. PRESETS.capo is unused by the engine today, so this change is forward-looking only.

### 3.9 Schema durability contract (Architect R12)

Every recipe carries `schemaVersion`. The schema evolves only by these rules:

1. **New fields are additive.** Renderers default-fill missing fields with documented defaults (default-fill table maintained alongside the schema).
2. **Field types never change.** If a field's structure needs to change, ship as a new field name; old field stays readable.
3. **Field semantics never tighten.** Optional fields never become required. Enum values are added, never removed or renamed.
4. **`schemaVersion` is mandatory** on every recipe object. v1 readers ignore unknown v2 fields; v2 readers default-fill missing v1 fields.

---

## 4. Tab Layout & UX

### 4.1 Visual signal chain rendering

**Single renderer: `renderRecipeFull(recipe, sectionId)`.** Mid-rich pedalboard with knob graphics, on/off color coding, amp panels with knob faces, two-amp routing visible, annotation overlay.

Per Conflict 2 resolution, there is **no** Play Mode panel; thus no minimal-strip variant is needed.

**Layout (left-to-right signal flow):**

```
┌─────────────┐    ┌─────┐  ┌─────┐  ┌─────────────┐  ┌──────┐    ┌──── ABY ────┐
│   GUITAR    │ ─→ │TUNER│→│ WAH │→│   DUELLIST   │→│TS808 │ ─→ │  Twin  | BD │
│  Ultra Luxe │    │ on  │  │ off │  │ String Singer│  │  on  │    │  ←pan→     │
│  selector 1 │    │     │  │     │  │     on       │  │      │    │             │
│  S-1 par    │    │     │  │     │  │  ●           │  │      │    │             │
│  std tuning │    │     │  │     │  │ ┌─┘ ┌─┘ ┌─┘ │  │ ┌┐ ┌┐│    │             │
└─────────────┘    └─────┘  └─────┘  └─────────────┘  └──────┘    └─────────────┘
```

Each block:

- Pedal/amp name + short id
- Engaged state visible: `var(--amber)` outline + full opacity for engaged; `var(--text-dim)` outline + ~25% opacity for disengaged (matches `play-chord-btn.active` convention — UI/UX R12)
- Knob graphics: SVG dials. **Authored notation drives display** (per Section 3.4): knob authored as "3 o'clock" renders the indicator at 3 o'clock with the label "3 o'clock"; knob authored as 7 renders at the same dial position with the label "7". Hover reveals the alternate representation + provenance + source quote.
- Switches render as two-position or multi-position selector graphics, NOT as knobs (Tone Engineer R9).
- Side selector for multi-side pedals (Duellist String Singer / Heavy Hand) — radio toggle
- Provenance dot in corner of each unit block: `var(--c-IV)` (verified), `var(--amber)` (inferred), `var(--text-dim)` (assumed), small white-ringed dot (validated). Aggregation rule: **worst-of-knobs** (a unit with one assumed setting shows the assumed dot regardless of other settings — flags the eye to investigate).

**Two-amp ABY rendering:** explicit split visible after the chain end, each amp panel rendered side-by-side with pan position indicated.

**Effects loop rendering:** if `effectsLoopChain[]` is populated, render as a visually distinct strip looping back from the amp post-position to the pre-power-amp position (curved arrow OR labeled "FX LOOP" callout box).

**SVG-based**, consistent with the existing render layer.

### 4.2 Annotations layer (UI/UX R9 — collapsed from 3-mode toggle to zero modes)

Three previously-toggleable modes collapse into always-on inline affordances:

1. **Setting reasoning** — per-knob hover/click tooltip. Shows authored value + alternate notation + provenance badge + source quote if any. Always available; no toggle.
2. **Substitution traceability** — per-pedal/amp badge, always visible if substitution exists. Click to expand. Shows original artist gear + method + quality + rationale.
3. **Section deployment** — promoted out of annotations entirely. Becomes the **section selector** primary control (4.3 below).

Result: zero annotation toggles. Information surfaces inline at the unit it concerns.

### 4.3 Section selector + read/edit modes

#### Section selector (UI/UX R3)

If `recipe.songDeployment.sections[]` is populated, a section selector renders immediately below the song title — **largest interactive element above the fold**. Buttons styled like Play Mode's chord strip (`play-chord-btn`). Clicking a section selects it.

**Default selection:** first section if no other context. **Never default to "all combined"** — that is a comparison view, not a primary view.

When a section is active, pedals not engaged in that section dim to ~25% opacity (preserves chain shape so the eye sees what *isn't* on). Engaged pedals retain full opacity + amber outline.

If sub-sections are present (`section.subsections[]`), they appear as nested chips below the section selector.

If `sections[]` is empty (recipe has no per-section deployment), the section selector is hidden; chain renders with `pedalChain[i].engaged` literal values.

#### Read mode (default)

Full visual signal chain, annotations on hover/click, citations expandable at bottom. No editing affordances visible.

#### Edit mode (Conflict 3 resolution)

**v1.0 IN scope:**

- Pedal toggle on/off — single click on pedal block
- Settings text edit per field — notation-aware input. User types `7` or `3 o'clock` or `noon`; parser detects notation from input and stores `authored.notation` accordingly. Schema preserves what user types.
- Side selection on multi-side pedals — radio toggle
- Provenance dropdown per field — select from `assumed | inferred | verified | validated`. Selecting `validated` auto-stamps `lastValidatedAt`.
- Source quote text field per setting (required when provenance = `verified`)
- Chain reorder via drag-and-drop OR ↑/↓ buttons (positions only; no value editing during drag)
- Recipe JSON paste affordance — for agent-output intake. Paste into textarea, click "Validate & Insert"; schema validation runs (including 3.7 role assertion guard); errors surface inline; valid recipe inserted into TONE_RECIPES on save.
- Schema validation on save — enforces Section 3.7 role assertion guard plus all field-type and required-field rules; rejects invalid recipes with field-level error indicators.
- Pending-change tracking — recipe edits flow through the same green "unsaved" pill as PRESETS edits (Architect R3 / GAP-6). One save = HTML download with PRESETS + TONE_RECIPES blocks both updated.

**DEFERRED indefinitely:**

- **Knob drag interactions** — hostile to notation fidelity. A drag through pixel space cannot represent "the source said 3 o'clock specifically." Text entry preserves authored notation; drag erases it. Even validated-tier edits (user dialing in against actual rig) read better as text entry from the user's hardware knob position than as a drag on the app's representation. Not a v1.1 candidate; not expected to ship.

**DEFERRED to v2:**

- Mobile/touch authoring gestures. v1 is desktop-first; touch falls back to click-only with no hover affordances (tooltips become click-to-reveal on touch).

### 4.4 Cross-tab integration

| Surface | Integration | Status |
|---|---|---|
| **Library tab** | Each row gains a "tone" badge if recipes exist. Badge = small mono pill, `var(--amber)` color, between key column and progression chips (UI/UX R14). Solid pill = single recipe; pill + count when multiple. Click → enters Gear tab with recipe loaded. | v1 in scope |
| **Library tab — ▶ button** | Existing entry to Play Mode. Unchanged. Two distinct affordances per Library row. | No change |
| **Play Mode** | No integration. (Conflict 2 resolution.) | Out of scope |
| **Decoder tab — `tone-setup-card`** | Existing pre-flight card retired. Decoder is harmonic; tone has no business there. Visual vocabulary (compact monospace table, amber title) reused inside Gear tab amp panels. | Migrated in Phase 4.5 |
| **Decoder tab — recipe authoring** | Light "+ Author tone recipe" link near preset selector when active preset has no recipe. Click → opens Gear tab in edit mode with stub recipe scaffolded (UI/UX R15). | Deferred to v1.1 |
| **Decoder, Chords, Scales, Theory** | No changes to existing behavior. Recipe tuning does NOT propagate (Section 5.4). | No change |

### 4.5 Cross-recipe operations

**v1 in scope:**

- Side-by-side compare (two recipes shown in split panel) — same Gear tab structure, recipe-A on left half, recipe-B on right half. Section selectors independent. Pedal blocks render at compressed width. No annotations until hover (compare view is high cognitive load already). Useful for era variants of the same song (KWS While We Cry 1995 vs KWS While We Cry modern Dumble) or different artists with similar vocabulary (Hendrix vs SRV blues-rock pentatonic vocabulary).

**v1 out of scope (future):**

- Copy recipe as starting point
- Merge / diff recipes
- Recipe templates ("KWS 1997 chassis" as starting point for new KWS-1997-era songs)
- Tone search ("find all recipes using the EVH 5150 head")

### 4.6 Visual language codification (UI/UX R12)

| Element | Treatment |
|---|---|
| Engaged state | `var(--amber)` outline, full opacity (matches `play-chord-btn.active`) |
| Disengaged state | `var(--text-dim)` outline, ~25% opacity |
| Active section | Same amber-outline pattern |
| Headers | `var(--sans)` font-weight 700 (matches `play-song-name`) |
| Data values (knob numbers, settings text) | `var(--mono)` (matches `play-route-table`, `lib-fp-chip`) |
| Surfaces | `var(--bg2)` for cards (matches `tone-setup-card`), `var(--bg)` for canvas, `var(--bg3)` for inset elements |
| Borders | `var(--border)`, 1px |
| Provenance dots | `var(--c-IV)` verified, `var(--amber)` inferred, `var(--text-dim)` assumed, white-ringed amber for validated |
| Knob graphic | SVG circle, outer ring `var(--border)`, indicator line stroke `var(--text)`, fill `var(--bg3)`. Engaged pedal's knobs render at full opacity; disengaged at ~25%. |
| Section-label headers within tab | Reuse existing `.section-label` chrome |
| Controls strip | Match `.controls` chrome from existing tabs (recipe selector + section selector + read/edit toggle) |

### 4.7 Layout (top to bottom, UI/UX R11)

```
[Song title  —  Artist  ·  Era]                    ← single line, mono, amber accent
[Section selector: V1 | Pre-Chorus | Chorus | Solo | Outro]
─────────────────────────────────────────
[Signal chain — engaged for selected section]
[provenance dots per unit in corner]
─────────────────────────────────────────
[ Source notes ▼ ]   ← collapsed by default
[ Substitution audit ▼ ]   ← collapsed
[ Sources & citations ▼ ]   ← collapsed
[ Flagged gaps ▼ ]   ← only renders if non-empty
```

### 4.8 Horizontal scroll for long chains (UI/UX R17)

Pedal chains of 7+ units at mid-rich tier won't fit a typical viewport. Resolution:

- **Gear tab full chain:** horizontal scroll with sticky guitar block on the left and amp(s) on the right; pedal chain scrolls between them. Scroll-snap to pedal boundaries.
- **Compare view:** compressed pedal block widths (hide knob labels, show only knob graphics + state) when chain length exceeds threshold.

---

## 5. Agent Integration

### 5.1 Tone Engineer agent — read/write protocol

The Tone Engineer agent reads `GEAR_INVENTORY` and `ROLE_INDEX` at the start of every recipe-mode invocation. It writes `TONE_RECIPES` entries in the v1 schema. The agent's recipe-emit pipeline must pass schema validation (Section 3.7) before output.

**Mandatory steps before emitting a recipe:**

1. Resolve every artist-rig item to a role (e.g., "Univibe" → role `univibe-modulation`).
2. Query `ROLE_INDEX[role]`. If non-empty, use the highest-quality match. *(LD#8 reconciliation: the index emits only structural qualities — `direct` > `amp-in-a-box` > `capture` > `fallback`. Judgment grades like `closest-analog` are agent reasoning per §3.5, layered on top, never emitted by the index.)*
3. If `ROLE_INDEX[role]` is empty: classify as `explicit-skip` (acceptable loss) or `flagged-gap` (surface to user); never invent a substitute.
4. For each entry in `pedalChain`, `effectsLoopChain`, `amps`: assert `entry.role ∈ GEAR_INVENTORY[entry.gearId].roles[]`. **If assertion fails, the agent must regenerate, not emit.**
5. Populate `substitutionAudit[]` with one row per artist-rig item.
6. Populate `flaggedGaps[]` with anything classified as flagged-gap (not skip).
7. Provenance per setting: `assumed` / `inferred` / `verified` (agent never authors `validated` — that tier is user-only).
8. Authored notation per setting: preserve whatever the source published (`numeric` for "Volume 7"; `clock` for "treble at 3 o'clock"). Do NOT silently convert.
9. `sources` ranked primary / secondary / tertiary with what each contributed.
10. `principles[]` — one or more transferable statements distilled from the source material.

**Error mode the v0.2 schema makes structurally impossible:** the Univibe miss. The agent cannot output a recipe with `mxr-evh-phase-90` filling the `univibe-modulation` role because the role index has `mxr-m68-univibe` directly available, AND the schema validates that `univibe-modulation ∈ mxr-evh-phase-90.roles[]` — which it does not.

### 5.2 Anti-hallucination guard summary

| Failure mode | Pre-Gear-tab risk | v0.2 guard |
|---|---|---|
| Hallucinated gap when direct match exists (Univibe miss) | High — agent reaches for priors when narrative gear list is loose | **Eliminated structurally** — role index queryable + recipe schema rejects role assertions not backed by gear's `roles[]` |
| Era confusion (Brown Sound = 5150) | High — narrative fact only | Reduced — recipe schema requires `era` + `sourceRecording`; agent prompt instructs era-locking |
| Settings drift between sources | Medium — no provenance tracking | Eliminated — field-level provenance with source quotes; authored notation preserved per setting |
| Notation conflation (treble at 3 = numeric 3 vs clock 3) | High — single value field | **Eliminated** — `authored.notation` per setting; never silently converted |
| Unprompted purchase recommendations | Medium — agent in narrative mode might suggest gear | Eliminated — recipe schema has no purchase field; acquisition mode is separate Workflow B; only `flagged-gap` substitution method opens that path |
| Substitution recommendations diverging from circuit philosophy | Medium | Reduced — `substitution.method` enumerated; "Klon-ish vibe" is not an acceptable value |

### 5.3 Player agent handoff (unchanged)

Player agents (KWS, EVH, Hendrix, SRV) emit `TONE TARGETS` blocks per the existing `tone-engineer.md` contract (line 286). No schema change for player agents — their domain is the *what* (sonic target), Tone Engineer's domain is the *how* (reproduction on this rig). The Gear tab is downstream of both.

### 5.4 Tuning precedence rules (Guitar Systems R1)

**Tuning is a parameter (Axiom 1) — but recipe tuning is scoped to the recipe view, not propagated globally.**

| Surface | Tuning source |
|---|---|
| Gear tab signal-chain header | `recipe.guitar.tuning` (authoritative for recipe display) |
| Decoder, Chords, Scales, Theory tabs | Global tuning (`decoder-tuning` hidden input). **Never altered by recipe presence.** |
| Play Mode | Global tuning (Play Mode does not consume recipe). |

**Mismatch handling:** if the user has a recipe-bearing song selected in Library AND global tuning differs from `recipe.guitar.tuning`, the Gear tab renders a non-blocking banner: *"This song is recorded in Eb standard. Your global tuning is Standard. [Switch global to Eb] [Stay in Standard]."* User retains control. No silent global-state mutation.

**On global tuning change while recipe loaded:** the Gear tab continues to display the recipe's authored tuning unchanged (the recipe is a frozen artifact). The banner persists with mismatch state.

### 5.5 Workflow B interface (Tone Engineer R10)

Workflow B (acquisition mode) is **user-initiated only**. It is never auto-invoked from recipe authoring.

- Read mode: `flaggedGaps[]` renders as a small expandable list at the bottom of the recipe panel, labeled "Roles not covered on current rig." Read-only. No call to action.
- User-initiated path: a "Discuss with Tone Engineer" affordance in the gap panel opens an agent invocation in Workflow B with the gap pre-populated. This is the **only** path from gap to acquisition discussion.
- Substitution method `flagged-gap` is the only value that triggers the "Discuss" affordance; `explicit-skip` does not (skips are accepted loss).

---

## 6. Implementation Phases

Each phase is independently shippable; do not start phase N+1 until N is verified.

| Phase | Scope | Dependencies | Verify by |
|---|---|---|---|
| **0** | This document approved | v0.1 + 4 agent reviews + user resolutions | Sign-off |
| **1** | `GEAR_INVENTORY` constant authored in `gear-inventory.js`; covers 100% of `gear.txt`. `<script src="gear-inventory.js">` added to HTML after dashboard-data.js. | Phase 0 | Manual diff: every gear.txt item present; every category populated; role tags audited |
| **2** | `buildRoleIndex()` function; role tags audited across all items; spot-check that every "tonal role" mentioned in `tone-engineer.md` and the four `engineer_*.txt` files resolves to a non-empty `ROLE_INDEX[role]` OR is explicitly an empty gap | Phase 1 | Code review; spot-check Univibe, Klon, Plexi, JCM800, Brown Sound, 5150, Mesa Rec, Hiwatt, Octavia |
| **3** | Tone Engineer agent updated: reads inventory + role index; mandatory traversal enforced; **schema-level role assertion validator implemented** | Phase 2 | Re-run KWS recipe through corrected agent; verify Univibe DIRECT MATCH replaces Phase 90 substitute; agent attempt to assert `phase-90.role = univibe-modulation` is REJECTED at validation |
| **4** | `TONE_RECIPES` schema authored; marker pair `@@TONE_RECIPES_START@@` / `@@TONE_RECIPES_END@@` added to HTML; first two recipes (KWS While We Cry 1995, KWS Voodoo Child 1997) hand-authored using verified KWS interview data; existing prototype `'be-here-now-rhythm'` migrated to v1 schema | Phase 3 | Both KWS recipes pass schema validation; provenance fields populated; substitutionAudit complete; existing prototype renders correctly under new schema |
| **4.5** | `serializePresets()` generalized to `serializeDataBlocks()` processing both PRESETS and TONE_RECIPES marker pairs; existing PRESETS save flow regression-tested | Phase 4 | Edit a preset, save, reload, edit persists. Edit a recipe via direct HTML edit, save, reload, recipe persists. Both blocks round-trip independently. **Phase 4.5 is the minimum-viable stopping point — Phases 1-4.5 prove the inventory→role-index→recipe→save loop end-to-end without shipping any new UI surface; all subsequent phases are incremental rendering improvements that can ship independently or be deferred.** (Architect R8) |
| **5** | Gear tab markup; minimal `renderRecipeFull()` (block diagram + text labels, no knob graphics yet); read-only; KWS recipes display; Library tone badge appears | Phase 4.5 | Visual smoke test; Library badge click navigates to Gear tab with recipe loaded; section selector works |
| **6** | Knob graphics + amp panels + annotations layer (per-knob hover, per-unit substitution badges, provenance dots) | Phase 5 | UI/UX agent review of glanceability and visual hierarchy against `play-chord-btn.active` chrome |
| **7** | Edit mode v1: pedal toggle, settings text edit (notation-aware), side selection, provenance dropdown, source quote field, chain reorder, recipe JSON paste affordance, schema validation on save, pending-change pill integration | Phase 6 | User can author a new recipe end-to-end without editing HTML directly |
| **8** | Existing `tone-setup-card` retired from Decoder; visual vocabulary preserved in Gear tab amp panels; `'be-here-now-rhythm'` accessible only via Gear tab | Phase 7 | Decoder no longer renders tone-setup-card; original recipe still displays correctly via Gear tab |
| **9** | Author second-tier recipes (Marshall lineage from `engineer_claude desktop Q&A.txt`): Hendrix, EVH Brown Sound, EVH 5150-era, McCready, Tremonti recipes | Phase 8 | Five new recipes covering distinct lineage rows; substitution audits validate; recipes render correctly |
| **10** | Side-by-side compare view; substitution audit / flagged-gaps panels | Phase 9 | Compare panel renders; gap panel shows correctly when populated |

**Estimated context cost per phase:** Phases 1-4.5 are conversational/agent-heavy (data + agent updates + schema validation). Phases 5-8 are code-heavy with light per-phase agent involvement (Architect for blast radius, UI/UX for glanceability). Phases 9-10 are content + polish.

**Scale tripwire (Architect R6):** when inline TONE_RECIPES exceeds ~3,000 lines (~50 recipes), evaluate moving recipes to a sibling `tone-recipes.js`. Schema unchanged; migration path clean.

---

## 7. Open Questions — Resolved

| # | Question | Owner | Resolution in v0.2 |
|---|---|---|---|
| Q1 | Inline `GEAR_INVENTORY` vs sibling `gear-inventory.js`? | Architect | **Sibling `gear-inventory.js`.** Mirrors dashboard-data.js precedent; inventory hand-maintained. |
| Q2 | TONE_RECIPES embedded in PRESETS vs parallel keyed collection? | Architect + Tone Engineer | **Parallel keyed, inline in HTML between markers.** Multiple recipes per song (Voodoo Child case); inline keeps user-editable round-trip via existing save mechanism. |
| Q3 | Visual signal chain rendering tier? | UI/UX | **Mid-rich pedalboard** with knob/switch/selector graphics. Single renderer (no Play Mode strip — Conflict 2). |
| Q4 | Knob value notation? | UI/UX + Tone Engineer | **Authored notation per setting.** Numeric and clock-face are both sources of truth; never converted; `normalizedValue` for analysis only (Conflict 1). |
| Q5 | Section selector vs whole-song view? | UI/UX + Tone Engineer | **Section selector defaults to first section, never to "all combined."** Sub-sections supported via `subsections[]`. |
| Q6 | Tab position? | UI/UX | **Library → Gear → Dashboard.** |
| Q7 | Edit mode v1 scope? | UI/UX + Architect | **Text-based authoring only; no knob drag (deferred indefinitely).** See 4.3 (Conflict 3). |
| ~~Q8~~ | ~~Play Mode pre-flight panel default?~~ | ~~UI/UX~~ | **REMOVED.** No Play Mode integration (Conflict 2). |
| Q9 | Recipe JSON paste affordance? | Architect + UI/UX | **Textarea with validation + scaffold for new-recipe creation.** |
| Q10 | Schema version migration? | Architect | **Additive-only contract** (Section 3.9). Four discipline rules locked. |
| Q11 | Tuning interaction with Decoder/Play Mode? | Guitar Systems | **Recipe tuning authoritative for Gear tab only; global tuning authoritative for Decoder/Chords/Scales/Theory/Play Mode regardless of recipe.** Mismatch banner (Section 5.4). |
| Q12 | Effects loop modeled separately? | Tone Engineer | **Yes.** `effectsLoopChain[]` separate from `pedalChain`. `routing.effectsLoopRouting` field for `'shared'` / `'per-amp'` / `'wet-amp-only'`. |
| Q13 | Two-amp ABY routing schema? | Tone Engineer + UI/UX | **`routing.topology = 'two-amp-aby'`** with `abySplit` + `pan` (authored notation per pan). Render shows both amp panels post-chain. |
| Q14 | Helix integration depth? | Tone Engineer + Architect | **Named patch + IR reference, single block.** Block-level Helix modeling deferred to v2. |
| Q15 | Where does role index live? | Architect | **Derived at runtime from `GEAR_INVENTORY.roles[]`.** No `gear_roles.md` file; eliminates dual-maintenance drift. |
| **Q16 (NEW)** | Schema-level role assertion validation? | Architect + Tone Engineer | **Required.** Recipe load, save, and agent emit all validate `entry.role ∈ GEAR_INVENTORY[entry.gearId].roles[]`. (Tone Engineer R1 — closes the load-bearing GAP.) |
| **Q17 (NEW)** | Provenance taxonomy granularity? | Tone Engineer + UI/UX + Architect | **4 tiers: assumed / inferred / verified / validated.** Validated is user-authored only; auto-stamped `lastValidatedAt` on edit-mode confirmation. |
| **Q18 (NEW)** | Sub-section deployment? | Tone Engineer + UI/UX | **One level of nesting** (`section.subsections[]`). Renders as nested chips below section selector. |

---

## 8. Agent Review Sections

*The full agent reviews are preserved in conversation transcripts. Section 8.X contains each agent's TARGET → CURRENT STATE → GAP summary plus the recommendations integrated into v0.2 and those deferred or rejected.*

### 8.1 Architect agent review

**Target.** A Gear tab that adds one new tab section, one new sibling .js data file, one new renderer family, and one new state field, with everything else in the app unchanged. Inventory and recipes are pure data; role index computed never authored; recipes serialize through the existing marker-based save mechanism; cross-tab integrations are read-only consumers.

**Gaps identified vs v0.1 (16 findings):**

- GAP-1: doc references `activeKey/activeMode`; actual `_activeContext` shape is `keyRoot/keyMode` (HTML 5700) ✓ **Fixed in v0.2 Section 2.2**
- GAP-2: lookup direction from Library → recipe undefined ✓ **Fixed: `PRESETS[i].recipeIds[0]` default; selector when length > 1 (Section 3.8)**
- GAP-3: `serializePresets()` is regex-anchored for ONE block; recipes need own marker pair + generalized function ✓ **Fixed: Phase 4.5 generalizes to `serializeDataBlocks()`**
- GAP-4: TONE_RECIPES location (inline HTML vs sibling .js) — must commit. ✓ **Fixed: inline HTML between markers (round-trips through save flow)**
- GAP-5: `_activeContext` writers — recommend `_activeRecipe` separate global ✓ **Fixed in Section 2.2**
- GAP-6: edit-mode persistence + pending-change tracking ✓ **Fixed: Section 4.3 routes recipe edits through existing pending-change pill**
- GAP-7: Phase 1 said "in HTML" but Q1 default said sibling .js ✓ **Fixed: Phase 1 now says `gear-inventory.js`**
- GAP-8: missing phase for serialization generalization ✓ **Fixed: Phase 4.5 added**
- GAP-9: identify minimum-viable stopping point ✓ **Fixed: Phase 4.5 marked as such**
- GAP-10: schema discipline contract needs explicit rules ✓ **Fixed: Section 3.9, four rules**

**Recommendations integrated:** R1, R2, R3, R5, R6 (split out as Phase 4.5), R7, R8, R9, R10, R11, R12, R13.

**Deferred:** none — all architect findings integrated into v0.2.

### 8.2 UI/UX agent review

**Target.** A Gear tab passing two distinct tests: pre-flight study (richness acceptable) AND in-flight glanceability (<1s scan). v0.1 collapsed both into one rendering tier — but per Conflict 2 resolution, the Gear tab is purely pre-flight and there is no in-flight surface. This simplification removes the dual-renderer problem at the source.

**Gaps identified vs v0.1 (19 findings):**

- G1: existing `TONE_RECIPES` prototype + `renderToneSetup()` + `tone-setup-card` not acknowledged ✓ **Fixed: explicit migration in Phase 8 + Section 2.3**
- G2: rendering tier conflated study and play views ✓ **Resolved by Conflict 2 — single renderer; no Play Mode strip needed**
- G3, G4, G9: provenance ribbon + 3-mode annotations toggle competing with primary signal ✓ **Fixed: 3-mode toggle collapsed to zero modes (R9); ribbon demoted to per-unit dots (R10); section deployment promoted to primary control (R3)**
- G5: edit mode v1 lumped knob drag with low-friction edits ✓ **Resolved by Conflict 3 — knob drag removed indefinitely**
- G6: section selector default "all combined" ✓ **Fixed: defaults to first section; never "all combined"**
- G7: knob notation split (clock for pedals, numeric for amps) ✓ **Resolved by Conflict 1 — authored notation per setting**
- G14: color palette undefined ✓ **Fixed: Section 4.6 codifies visual language using existing CSS variables**
- G15: Library tone badge underspecified ✓ **Fixed: Section 4.4 specifies pill style + states**
- G17: per-knob provenance noise without per-unit aggregation ✓ **Fixed: Section 4.1 worst-of-knobs aggregation rule**
- G12: horizontal scroll behavior ✓ **Fixed: Section 4.8**
- G13: "two-amp ABY but one amp engaged for section" rendering ✓ **Implicit in Section 4.1 + 4.3 dim-when-not-engaged convention**

**Recommendations integrated:** R1 (single renderer), R3 (section default), R4 (tab position), R8 (hierarchy invert), R9 (annotations collapse), R10 (provenance dots), R11 (layout), R12 (visual language), R13 (existing prototype migration), R14 (badge spec), R17 (horizontal scroll), R18 (compare view), R19 (JSON validation).

**Deferred:** R7 (Play Mode auto-expand) — moot per Conflict 2; R15 (Decoder "+ Author" link) — deferred to v1.1 per UI/UX's own recommendation.

**Rejected:** R2 (clock-face for amps too) — superseded by Conflict 1 resolution which preserves authored notation; UI/UX recommendation was correct in spirit but the schema solution is more accurate than uniform display.

### 8.3 Tone Engineer agent review

**Target.** A data model where every owned piece of gear is queryable by tonal role with no role-to-gear miss possible when a direct match exists; every per-song recipe captures the full distillation produced by a corrected research pass; provenance is field-level and auditable; schema is loss-free against the canonical KWS interview transcript.

**Critical finding (GAP-1).** v0.1's role index is queryable but the recipe schema does not validate role assertions against the index. An agent could still assert `{ gearId: 'mxr-evh-phase-90', role: 'univibe-modulation' }` and the schema would accept it — same Univibe-class failure the doc was triggered to prevent. This is the load-bearing finding.

✓ **Fixed: Section 3.7 adds schema-level role assertion validation. Recipe load, save, and agent emit all validate `entry.role ∈ GEAR_INVENTORY[entry.gearId].roles[]`. Univibe miss now structurally impossible.**

**Other gaps identified (5 additional):**

- GAP-2: effects loop schema not sketched ✓ **Fixed: Section 3.2 `effectsLoopChain[]` + `routing.effectsLoopRouting`**
- GAP-3: provenance taxonomy missing user-validated tier ✓ **Fixed: 4-tier taxonomy (Section 3.3)**
- GAP-4: substitution method enum incomplete ✓ **Fixed: 10-category taxonomy (Section 3.5)**
- GAP-5: amp `targetState` missing — "verge of breakup" not modeled ✓ **Fixed: Section 3.1 `breakupBehavior`; Section 3.2 `targetState` + `settingsAreStartingPoints`**
- GAP-6: Helix block-level fidelity ⏸ **Deferred to v2 (Q14 default confirmed)**

**Recommendations integrated:** R1 (structural guard — critical), R2 (effects loop), R3 (validated tier), R4 (substitution taxonomy), R5 (amp state language), R6 (principles[] first-class), R7 (sub-sections), R8 (inventory completeness — rectifier, cabinet ohms, output modes, switches, placement), R9 (non-rotary control types), R10 (Workflow B interface).

**Deferred:** R11 (Helix block-level) to v2.

### 8.4 Guitar Systems Engineer review

**Target.** A Gear tab whose recipe schema treats tuning as a parameter consistent with Axiom 1, preserves the engine's invariant that chord-symbol analysis is independent of tuning while fretboard rendering is dependent, carries enough information for cross-tab rendering correctness, and does not introduce theory-engine couplings forcing changes to CHORD_REGISTRY / SCALE_SEEDS / harmonizeScale / identifyChord. Pickup/control modeling correct enough to represent the Ultra Luxe Strat's actual switching topology.

**Gaps identified (7 findings):**

- a, b: tuning parameter mapping + recipe-tuning override semantics ✓ **Fixed: Section 5.4 precedence rules; Section 3.2 tuning as object with engine string round-trip**
- c: pickup modeling depth (Ultra Luxe S-1 switch) ✓ **Fixed: Section 3.1 structured switching/controls**
- d: concert-pitch vs played-pitch ambiguity for chord symbols ✓ **Fixed: `recipe.guitar.tuning.notation` field; default `'concert'`**
- e: capo + recipe tuning interaction ✓ **Fixed: capo moved to recipe (Section 3.2 + 3.8); PRESETS.capo deprecated**
- f: `_activeContext` extension surface ✓ **Fixed: `_activeRecipe` separate; tuning never propagates**
- g: string gauge orthogonality ✓ **Confirmed clean; no schema change**

**Recommendations integrated:** R1 (precedence rules), R2 (tuning as object), R3 (pickup/control structured), R4 (concert-pitch convention), R5 (capo move), R6 (`_activeContext` minimal change).

**Deferred:** R8 (TUNING_PRESETS constant unification with dropdown) to a separate small refactor; not blocking v0.2.

---

## 9. Decision Log

### v0.2 changes from v0.1

**User-resolved conflicts (decisive):**

| Conflict | v0.1 position | v0.2 resolution |
|---|---|---|
| Knob notation for pedals vs amps | Clock-face for pedals, numeric for amps | **Authored notation per setting**; both numeric and clock-face are sources of truth; never silently converted; `normalizedValue` for analysis only. (Section 3.4) |
| Gear-inventory spec verifiability | No power data; control specs carried no provenance; `default` looked like spec | **`power` block + per-item `specProvenance` stamp added (additive, §3.1).** Per-item granularity (gear specs = one manufacturer doc per item). `default` retained but explicitly author-inferred, excluded from the provenance claim. CLAUDE.md LD#9, 2026-05-18. |
| Play Mode integration | Collapsed pre-flight panel | **No integration.** Gear tab and Play Mode are independent activities linked by preset, not by UI. Library row gets two distinct entry points. (Section 2.3, 4.4) |
| Edit mode v1 scope | Knob drag + toggle + reorder + text + provenance | **Text-based only.** Knob drag deferred indefinitely (notation fidelity). Pedal toggle, side selection, settings text, provenance dropdown, source quote, chain reorder, JSON paste, schema validation, pending-change pill all in v1.0. (Section 4.3) |

**Critical structural change:**

- **Schema-level role assertion validation** added (Section 3.7). Recipe schema rejects any `entry.role` not in `GEAR_INVENTORY[entry.gearId].roles[]`. Closes the load-bearing GAP-1 from Tone Engineer review. The Univibe miss is now structurally impossible.

**Schema enrichments:**

- Authored notation per setting (Conflict 1)
- 4-tier provenance taxonomy (validated added)
- 10-category substitution method enum
- Amp `breakupBehavior` + `targetState` + `settingsAreStartingPoints`
- First-class `principles[]` array
- `effectsLoopChain[]` separate from `pedalChain`
- Sub-section deployment (`section.subsections[]`)
- Tuning as object: `{ id, open, notation }`
- Capo moved from PRESETS to `recipe.guitar.capo`
- Structured guitar switching/controls (S-1 etc.)
- Tube `rectifier` field; `cabinetCompatibleOhms`; `outputModes` on amp-in-a-box
- Utility `placementConstraint`
- Control `type` enumerated (knob / two-position / multi-position / footswitch)

**Architectural commitments:**

- GEAR_INVENTORY in sibling `gear-inventory.js` (Q1)
- TONE_RECIPES inline in HTML between marker pair (Q2)
- `_activeRecipe` separate from `_activeContext` (Architect R2)
- `serializePresets` → `serializeDataBlocks` generalization (Phase 4.5)
- Field-name corrections: `keyRoot/keyMode` (not `activeKey/activeMode`)

**UX commitments:**

- Single renderer (`renderRecipeFull`); no Play Mode strip
- Section selector defaults to first section, never "all combined"
- Annotations collapsed from 3-mode toggle to zero modes
- Provenance dots per unit (not ribbon at top)
- Visual language codified using existing CSS variables
- Library tone badge between key column and progression chips
- Existing `tone-setup-card` retired in Phase 8; visual vocabulary preserved

**Phase changes:**

- Phase 1 corrected: `gear-inventory.js` (not "in HTML")
- Phase 4.5 added: serialization generalization (minimum-viable stopping point)
- Phase 8 (Play Mode pre-flight panel) REMOVED
- Phases renumbered: existing prototype migration becomes Phase 8

**New questions answered:** Q16 (schema validation), Q17 (4-tier provenance), Q18 (sub-sections).

---

## 10. Tracked Follow-ups

These are not blocking v0.2 sign-off but are flagged for scheduling.

### 10.1 Tremonti Mesa settings research event

**Trigger:** Conflict 1 resolution noted that Mark Tremonti's Mesa Boogie amp settings have been mistranslated across Reddit, guitar sites, and YouTube. Internet sources for Tremonti tone are heavily noise-contaminated.

**Scope:** before authoring any Tremonti recipe row from the Marshall lineage table (Phase 9), conduct a research event triangulating:
- Tremonti's own published quotes (Premier Guitar rig rundowns, official interviews)
- Mesa Boogie official artist documentation if available
- Cross-reference settings claims that disagree across sources
- Flag specifically which settings have notation conflation (numeric vs clock-face) in different sources

**Deliverable:** a verified-tier source set for the Tremonti recipe, with notation explicit per setting.

**Owner:** Tone Engineer agent + user.

### 10.2 TUNING_PRESETS constant unification

Per Guitar Systems R8 (deferred). Currently the tuning dropdown options are hand-maintained at HTML lines 1780-1791 and recipe `tuning.id` values would be hand-maintained alongside. Unify into a single `TUNING_PRESETS` constant generating both the dropdown options and the recipe tuning id whitelist. Eliminates drift. Not blocking; small refactor.

### 10.3 Helix block-level modeling (v2)

Per Tone Engineer GAP-6 (deferred). Recipes referencing Helix patches by name + IR are sufficient for v1 (Topology C from `tone-engineer.md`). v2 may add block-level Helix signal-chain representation for full self-containment of Helix-only recipes. Schema migration would be additive; v1 recipes referencing Helix by name remain readable.

### 10.4 Recipe templates and merge/diff (v2)

Per Section 4.5. Cross-recipe operations beyond side-by-side compare are deferred to v2. Schema does not need changes to support these.

---

## Appendix A — Glossary

| Term | Definition |
|---|---|
| Recipe | A single TONE_RECIPES entry; one tonal preset for one song-era pair |
| Role | A tonal function (e.g., "Univibe modulation," "Klon-flavor boost") that gear can fill |
| Role index | Inverse mapping from role to the list of owned gear items that can fill it; built at runtime from `GEAR_INVENTORY` |
| Direct match | A piece of gear that exactly fills the artist's original gear's role |
| Closest analog | A piece of gear that fills the role via circuit philosophy or category |
| Amp-in-a-box | A pedal that emulates an amp circuit |
| Capture | A pedal-modeled snapshot of a specific amp |
| Helix-fallback | An amp/effect not physically owned but reachable through the Line 6 Helix |
| Authored notation | The form a setting was originally specified in (numeric or clock-face); permanent on a setting; never silently converted |
| Normalized value | Computed numeric representation of a setting; for analysis and dial-position rendering only; never authoritative for display |
| Verified | Provenance tier: setting sourced from a quote, published number, or rig rundown |
| Inferred | Provenance tier: setting derived from an analogous published source |
| Assumed | Provenance tier: setting with no specific source; best-guess from circuit philosophy |
| Validated | Provenance tier: user has dialed and confirmed against the actual recording with their real rig |
| Substitution audit | Mandatory traversal proving every artist-rig item was checked against the inventory |
| Flagged gap | Unfixable role miss; explicitly documented; opens Workflow B (acquisition mode) only when user-initiated |
| Explicit skip | Accepted-loss role omission; recipe is complete without it; does NOT open Workflow B |
| Target state | An amp's intended operating mode (`pristine-clean` / `edge-of-breakup` / `breaking-up` / `grinding` / `saturated` / `compressed-saturation`) — the actual goal; numeric settings are starting points |
| Distillation principle | A short transferable statement captured in `recipe.principles[]`; the "why" that survives translation across songs |
| Workflow A | Tone Engineer recipe mode — given target, produce reproduction on owned rig |
| Workflow B | Tone Engineer acquisition mode — given a stated gap, evaluate prospective gear; user-initiated only |
| Structural guard | Schema-level validation that prevents the Univibe-class failure: recipe role assertions must appear in gear's `roles[]` |
