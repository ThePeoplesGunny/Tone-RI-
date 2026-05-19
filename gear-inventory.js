// ══════════════════════════════════════════════════════════
// GEAR INVENTORY — TONE Gear Tab Phase 1
// ══════════════════════════════════════════════════════════
//
// Hand-maintained from gear.txt. Sibling file to dashboard-data.js;
// loaded via <script src="gear-inventory.js"> after dashboard-data.js.
//
// Schema source of truth: GEAR_TAB_DESIGN.md §3.1.
// Provenance taxonomy: §3.3 (assumed | inferred | verified | validated).
// Notation fidelity: §3.4 (authored notation is permanent per setting).
// Role index built at app load: §3.6 (buildRoleIndex(GEAR_INVENTORY)).
// Schema-level role assertion validation: §3.7 — every role asserted by a
// recipe MUST appear in the gear's roles[] array, or schema validation fails.
//
// SCOPE — guitar tone only. The following gear.txt items are intentionally
// excluded from this inventory because they are out of scope for guitar tone
// recipes (bass, drums, vocal, PA, recording mics):
//   - Schecter Omen Extreme-4 Bass Guitar
//   - Fender Rumble 100 Bass Combo Amp (bass amp; see gear.txt)
//   - Alesis Nitro Max Mesh Drum Set + Expansion Pack
//   - Casio CDP-S360 Digital Piano
//   - Fender Audio Passport Conference S2 PA System
//   - TC-Helicon VoiceTone C1 / E1 / R1 (vocal pedals)
//   - Shure SM57 / SM58 Bundle / MV88 (mics — see deferred note below)
//   - sE Electronics DM1 Dynamite (mic preamp)
//
// DEFERRED to v2:
//   - Microphones (SM57 is a classic guitar cab mic; recipe schema doesn't
//     yet model mic'ing chain — adding this is a future Helix-block-modeling
//     companion change).
//   - Helix per-block modeling (Helix entered as a single capability node;
//     individual block recipes are a v2 addition).
//
// ── Role tag vocabulary ────────────────────────────────────
// Roles serve two queries (per §3.6 and §3.7):
//   FORWARD:  ROLE_INDEX['univibe-modulation'] → list of gear that fills it
//   REVERSE:  recipe asserts gear fills role X → schema rejects unless X is
//             in gear.roles[] (the anti-hallucination guard)
//
// Vocabulary categories (illustrative; not exhaustive):
//
//   Circuit/voicing:    tube-screamer, klon-flavor, kot-flavor, plexi-voice,
//                       brown-sound, rectifier-voice, dumble-flavor,
//                       big-muff-flavor, univibe-modulation, phase-90,
//                       analog-chorus, vintage-wah, modern-wah, classic-wah,
//                       harmonist, drop-tune
//
//   Function:           tuner, noise-gate, compressor, aby-switch, fuzz,
//                       low-gain-overdrive, mid-gain-overdrive,
//                       high-gain-overdrive, transparent-boost,
//                       mid-push-boost, solo-boost, digital-delay,
//                       analog-delay-flavor, room-reverb, ambient-reverb,
//                       modeler, multi-fx, helix-fallback, frfr-cabinet,
//                       high-gain-cab, power-supply
//
//   Substitution role:  kws-1997-substitute, kws-modern-substitute,
//                       srv-substitute, evh-substitute
//
//   Player platform:    hendrix-platform, srv-platform, kws-platform,
//                       evh-platform, evh-brown-sound-platform,
//                       mayer-platform, mccready-platform, gilmour-platform,
//                       tremonti-platform
//
//   Pickup/guitar:      single-coil, humbucker, sss, hh, strat-territory,
//                       superstrat-territory, prs-territory
//
//   Amp character:      late-clean-headroom, mid-power-tweed-breakup,
//                       high-gain-cascading, rectifier-sag-switchable,
//                       fender-clean, marshall-crunch, modeling-amp
//
//   Cab / speaker:      v30-loaded, g12h-loaded, frfr-cabinet, irloader
//
// Add roles only when they're a substantive query target. Don't role-tag for
// description; description goes in `notes` or `typicalDeployment`.
//
// ──────────────────────────────────────────────────────────

const GEAR_INVENTORY_SCHEMA_VERSION = 1;

const GEAR_INVENTORY = {

  // ── GUITARS ─────────────────────────────────────────────
  guitars: [
    {
      id: 'fender-ultra-luxe-strat',
      name: 'Fender American Ultra Luxe Vintage \'60s Stratocaster',
      shortName: 'Ultra Luxe Strat',
      finish: 'Ice Blue Metallic, Heirloom Lacquer',
      serial: 'US24017708',
      pickupConfig: 'SSS',
      pickups: [
        { position: 'neck',   type: 'noiseless single-coil', voicing: 'warm, articulate' },
        { position: 'middle', type: 'noiseless single-coil', voicing: 'glassy, hollow' },
        { position: 'bridge', type: 'noiseless single-coil', voicing: 'cutting, present' },
      ],
      switching: {
        primary:   { type: '5-way blade', positions: 5 },
        secondary: [
          { id: 's1', type: 'push-pull', engaged: 'positions 2 and 4 → series', default: 'parallel' },
        ],
      },
      controls: [
        { id: 'volume',      type: 'knob', range: [0, 10] },
        { id: 'tone-neck',   type: 'knob', range: [0, 10] },
        { id: 'tone-bridge', type: 'knob', range: [0, 10] },
      ],
      roles: ['single-coil', 'sss', 'strat-territory', 'hendrix-platform', 'srv-platform', 'kws-platform', 'mayer-platform'],
      defaultTuning: 'standard',
      notes: 'Primary guitar for Hendrix/SRV/KWS lineage and Eb-tuning work',
    },
    {
      id: 'evh-wolfgang-special',
      name: 'EVH Wolfgang Special',
      shortName: 'Wolfgang Special',
      finish: "Pharaoh's Gold",
      serial: 'WGM232546',
      pickupConfig: 'HH',
      pickups: [
        { position: 'neck',   type: 'EVH Wolfgang humbucker (alnico 2)', voicing: 'open, vocal' },
        { position: 'bridge', type: 'EVH Wolfgang humbucker (alnico 2)', voicing: 'tight, focused, brown-sound-ready' },
      ],
      switching: {
        primary: { type: '3-way toggle', positions: 3 },
      },
      controls: [
        { id: 'volume', type: 'knob', range: [0, 10] },
        { id: 'tone',   type: 'knob', range: [0, 10] },
      ],
      tremolo: { type: 'EVH-licensed Floyd Rose', locking: true },
      roles: ['humbucker', 'hh', 'superstrat-territory', 'evh-platform', 'evh-brown-sound-platform'],
      defaultTuning: 'standard',
      notes: 'Floyd-equipped HH superstrat. Brown-sound delivery vehicle.',
    },
    {
      id: 'prs-mark-tremonti-sig',
      name: 'PRS Mark Tremonti Signature with Tremolo',
      shortName: 'Tremonti Sig',
      finish: 'Charcoal Contour Burst',
      serial: '204264',
      pickupConfig: 'HH',
      pickups: [
        { position: 'neck',   type: 'PRS Tremonti Treble (calibrated set)', voicing: 'thick, articulate' },
        { position: 'bridge', type: 'PRS Tremonti Bass (calibrated set)',   voicing: 'aggressive, mid-forward, modern high-gain ready' },
      ],
      switching: {
        primary: { type: '3-way toggle', positions: 3 },
      },
      controls: [
        { id: 'volume', type: 'knob', range: [0, 10] },
        { id: 'tone',   type: 'knob', range: [0, 10] },
      ],
      tremolo: { type: 'PRS non-locking tremolo', locking: false },
      roles: ['humbucker', 'hh', 'prs-territory', 'tremonti-platform'],
      defaultTuning: 'standard',
      notes: 'Tremonti-platform delivery vehicle for Mesa Dual Rec / UAFX Anti 1992 territory.',
    },
  ],

  // ── AMPS ────────────────────────────────────────────────
  amps: [
    {
      id: 'evh-5150-iconic-80w',
      name: 'EVH 5150 Iconic Series EL34 80W Head',
      shortName: '5150 Iconic',
      type: 'tube head',
      power: 80,
      tubes: { power: 'EL34', preamp: '12AX7', rectifier: null },
      cabinetPaired: 'evh-5150-iconic-4x12',
      cabinetCompatibleOhms: [4, 8, 16],
      breakupBehavior: 'high-gain-cascading',
      channels: [
        { name: 'clean',  controls: ['gain','volume','low','mid','high'],                                voicing: 'clear with some spank' },
        { name: 'crunch', controls: ['gain','volume','low','mid','high'],                                voicing: 'classic Marshall-adjacent crunch' },
        { name: 'lead',   controls: ['gain','volume','low','mid','high','presence','resonance'],         voicing: 'high-gain, EL34-British aggression' },
      ],
      globalControls: ['presence', 'resonance', 'master'],
      effectsLoop: true,
      roles: ['high-gain', '5150-voice', 'evh-platform', 'evh-brown-sound-platform'],
    },
    {
      id: 'mesa-dual-rectifier-100w',
      name: 'Mesa/Boogie Dual Rectifier 100W Head (Diamond Faceplate)',
      shortName: 'Dual Rec',
      type: 'tube head',
      power: 100,
      tubes: { power: '6L6', preamp: '12AX7', rectifier: 'switchable' },
      cabinetPaired: 'mesa-rectifier-4x12',
      cabinetCompatibleOhms: [4, 8, 16],
      breakupBehavior: 'rectifier-sag-switchable',
      channels: [
        { name: 'clean',    controls: ['gain','treble','mid','bass','master'],                               voicing: 'thick clean / pushed-clean' },
        { name: 'vintage',  controls: ['gain','treble','mid','bass','master'],                               voicing: 'mid-gain Mesa crunch' },
        { name: 'modern',   controls: ['gain','treble','mid','bass','presence','master'],                    voicing: 'scooped high-gain — the rectifier voice' },
      ],
      globalControls: ['presence', 'output'],
      switches: [
        { id: 'rectifier-mode', type: 'two-position', positions: ['silicon (tighter)', 'tube (saggy)'] },
        { id: 'power-mode',     type: 'two-position', positions: ['100W', '50W (spongy)'] },
      ],
      effectsLoop: true,
      roles: ['high-gain', 'rectifier-voice', 'modern-high-gain', 'tremonti-platform'],
    },
    {
      id: 'fender-tone-master-twin-reverb',
      name: 'Fender Tone Master Twin Reverb 2x12 200W Combo',
      shortName: 'Tone Master Twin',
      type: 'modeling combo',
      power: 200,
      tubes: { power: null, preamp: null, rectifier: null },
      combo: true,
      internalSpeakers: '2x 12" Jensen-style (Tone Master cab)',
      breakupBehavior: 'late-clean-headroom',
      channels: [
        { name: 'normal',   controls: ['volume','treble','mid','bass'],                          voicing: 'classic Twin clean' },
        { name: 'vibrato',  controls: ['volume','treble','mid','bass','reverb','speed','intensity'], voicing: 'Twin clean + on-board tremolo & reverb' },
      ],
      globalControls: ['presence', 'master-volume', 'output-power-attenuator'],
      switches: [
        { id: 'bright',     type: 'two-position', positions: ['off', 'on'], notes: 'normal-channel bright switch' },
        { id: 'cab-sim',    type: 'multi-position', positions: ['Stock', 'Vintage', 'Vibroverb', 'Bassman'], notes: 'on-board IR / cab models' },
      ],
      effectsLoop: false,
      roles: ['modeling-amp', 'fender-clean', 'late-clean-headroom', 'kws-platform', 'kws-1997-substitute', 'srv-platform'],
      notes: 'Digital modeling of Blackface Twin Reverb. Verified direct match for Twin reissue role in KWS 1997 era.',
    },
    {
      id: 'fender-blues-deluxe',
      name: 'Fender Blues Deluxe 1x12 40W Tube Combo (Tweed)',
      shortName: 'Blues Deluxe',
      type: 'tube combo',
      power: 40,
      tubes: { power: '6L6', preamp: '12AX7', rectifier: null },
      combo: true,
      internalSpeakers: '1x 12" Eminence Special Design',
      breakupBehavior: 'mid-power-tweed-breakup',
      channels: [
        { name: 'normal', controls: ['volume','treble','mid','bass','reverb','presence'],                       voicing: 'tweed-flavored clean breaking up at higher volumes' },
        { name: 'drive',  controls: ['drive','master','treble','mid','bass','reverb','presence'],               voicing: 'on-board drive — gritty, fizz-prone past noon' },
      ],
      globalControls: ['presence'],
      switches: [
        { id: 'bright', type: 'two-position', positions: ['off', 'on'] },
      ],
      effectsLoop: false,
      roles: ['fender-clean', 'mid-power-tweed-breakup', 'srv-platform', 'kws-platform'],
      notes: 'Role-fill for Vibro-King in two-amp KWS 1997 setups. Stop short of fizz; back the volume off.',
    },
  ],

  // ── CABINETS ────────────────────────────────────────────
  cabinets: [
    {
      id: 'evh-5150-iconic-4x12',
      name: 'EVH 5150 Iconic Series EL34 4x12 160W Cabinet',
      shortName: '5150 Iconic 4x12',
      type: 'guitar cab',
      configuration: '4x12 straight',
      speakers: '4x Celestion-style EL34-voiced 12"',
      power: 160,
      ohms: [4, 8, 16],
      roles: ['high-gain-cab'],
      notes: 'Paired with EVH 5150 Iconic 80W head.',
    },
    {
      id: 'mesa-rectifier-4x12',
      name: 'Mesa/Boogie Rectifier Standard 4x12 240W Straight Cabinet',
      shortName: 'Mesa 4x12',
      type: 'guitar cab',
      configuration: '4x12 straight',
      speakers: '4x Celestion Vintage 30',
      power: 240,
      ohms: [4, 8, 16],
      roles: ['high-gain-cab', 'v30-loaded'],
      notes: 'Paired with Mesa Dual Rectifier head. Classic V30 high-gain voice.',
    },
    {
      id: 'line-6-powercab-212-plus',
      name: 'Line 6 Powercab 212 Plus Active Guitar Speaker',
      shortName: 'Powercab 212+',
      type: 'powered FRFR + speaker modeling cab',
      configuration: '2x12 active',
      speakers: '2x 12" coaxial (FRFR)',
      power: 250,
      ohms: null,
      modes: ['FRFR', 'Speaker Models', 'IR Loader'],
      roles: ['frfr-cabinet', 'irloader'],
      notes: 'Pairs with UAFX amp-in-a-box pedals and Helix for cab modeling. Per engineer_emulation.txt: Lion \'68 + Powercab is the canonical pairing for the user\'s Marshall lineage.',
    },
    {
      id: 'headrush-frfr-112',
      name: 'Headrush FRFR-112 1x12 2000W Powered Cabinet',
      shortName: 'Headrush 112',
      type: 'powered FRFR cab',
      configuration: '1x12 active',
      speakers: '1x 12" with horn (FRFR)',
      power: 2000,
      ohms: null,
      modes: ['FRFR'],
      roles: ['frfr-cabinet'],
      notes: 'Pure FRFR; no on-board cab modeling. Use upstream IR or pedal cab-sim.',
    },
  ],

  // ── AMP-IN-A-BOX ────────────────────────────────────────
  ampInABox: [
    {
      id: 'uafx-lion-68',
      name: 'Universal Audio UAFX Lion \'68 Super Lead',
      shortName: 'Lion \'68',
      type: 'amp emulation pedal',
      modelsAmp: '1968 Marshall Super Lead Plexi',
      controls: [
        { id: 'volume',   type: 'knob', range: [0, 10], default: 5 },
        { id: 'gain',     type: 'knob', range: [0, 10], default: 5 },
        { id: 'bass',     type: 'knob', range: [0, 10], default: 5 },
        { id: 'middle',   type: 'knob', range: [0, 10], default: 5 },
        { id: 'treble',   type: 'knob', range: [0, 10], default: 5 },
        { id: 'presence', type: 'knob', range: [0, 10], default: 5 },
      ],
      switches: [
        { id: 'mode',    type: 'multi-position', positions: ['AMP', 'AMP+CAB', 'AMP+CAB+ROOM'] },
        { id: 'cab-sim', type: 'multi-position', positions: ['Greenback 4x12', 'V30 4x12', 'Off'] },
        { id: 'voice',   type: 'multi-position', positions: ['Stock', 'Brown', 'Super Bass'] },
      ],
      outputModes: ['frfr-direct', 'into-power-amp', 'into-front-of-amp-as-drive'],
      compatibleOutputs: ['line-6-powercab-212-plus', 'headrush-frfr-112', 'di-to-interface'],
      power: { input: 'dc-9v-isolated', voltageV: 9, currentDrawMa: 400, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: false, batteryType: null },
      specProvenance: { source: 'Universal Audio official Lion \'68 product page + UAFX manual (uaudio.com)', status: 'confirmed', checked: '2026-05-18', note: 'Digital pedal: requires isolated 9V DC, 400mA, center-negative, 2.1×5.5mm. NOT battery-capable; isolated supply mandatory. 400mA is a hard minimum.' },
      roles: ['plexi-voice', 'brown-sound', 'hendrix-platform', 'mccready-platform', 'evh-brown-sound-platform'],
      notes: 'Voice switch determines role: Stock/Super Bass = plexi-voice; Brown = brown-sound. Per engineer_emulation.txt, Lion \'68 + Powercab 212 Plus is the canonical pairing.',
    },
    {
      id: 'uafx-anti-1992',
      name: 'Universal Audio UAFX Anti 1992 High Gain Amp',
      shortName: 'Anti 1992',
      type: 'amp emulation pedal',
      modelsAmp: '1992-vintage Mesa/Boogie Dual Rectifier',
      controls: [
        { id: 'volume',   type: 'knob', range: [0, 10], default: 5 },
        { id: 'gain',     type: 'knob', range: [0, 10], default: 6 },
        { id: 'bass',     type: 'knob', range: [0, 10], default: 5 },
        { id: 'middle',   type: 'knob', range: [0, 10], default: 4 },
        { id: 'treble',   type: 'knob', range: [0, 10], default: 6 },
        { id: 'presence', type: 'knob', range: [0, 10], default: 6 },
      ],
      switches: [
        { id: 'mode',     type: 'multi-position', positions: ['AMP', 'AMP+CAB', 'AMP+CAB+ROOM'] },
        { id: 'cab-sim',  type: 'multi-position', positions: ['V30 4x12', 'Greenback 4x12', 'Off'] },
        { id: 'voice',    type: 'multi-position', positions: ['Vintage', 'Modern', 'Mid-Cut'] },
      ],
      outputModes: ['frfr-direct', 'into-power-amp', 'into-front-of-amp-as-drive'],
      compatibleOutputs: ['line-6-powercab-212-plus', 'headrush-frfr-112', 'di-to-interface'],
      power: { input: 'dc-9v-isolated', voltageV: 9, currentDrawMa: 400, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: false, batteryType: null },
      specProvenance: { source: 'Universal Audio official Anti 1992 product page + UAFX manual (uaudio.com)', status: 'confirmed', checked: '2026-05-18', note: 'Same UAFX power architecture as Lion \'68: isolated 9V DC, 400mA, center-negative, 2.1×5.5mm. Digital, not battery-capable, isolated supply mandatory.' },
      roles: ['rectifier-voice', 'modern-high-gain', 'tremonti-platform', 'high-gain-overdrive'],
      notes: 'Direct-match emulation of the 1992 Dual Rectifier era. Pairs with Tremonti-platform recipes.',
    },
    {
      id: 'tonex-one-brown-sound',
      name: 'IK Multimedia TONEX ONE Brown Sound LE',
      shortName: 'TONEX Brown Sound',
      type: 'amp/cab/effect modeling pedal (capture-based)',
      modelsAmp: 'EVH Brown Sound rig (capture)',
      captureSource: 'EVH brown sound — Limited Edition profile',
      controls: [
        { id: 'gain',   type: 'knob', range: [0, 10], default: 6 },
        { id: 'volume', type: 'knob', range: [0, 10], default: 5 },
        { id: 'tone',   type: 'knob', range: [0, 10], default: 5 },
      ],
      switches: [
        { id: 'preset-select', type: 'multi-position', positions: ['A', 'B', 'C'] },
      ],
      outputModes: ['frfr-direct', 'into-power-amp', 'into-front-of-amp-as-drive'],
      compatibleOutputs: ['line-6-powercab-212-plus', 'headrush-frfr-112', 'di-to-interface'],
      power: { input: 'dc-9v-or-usb-c', voltageV: 9, currentDrawMa: 120, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: false, batteryType: null },
      specProvenance: { source: 'IK Multimedia official TONEX ONE specs page (ikmultimedia.com)', status: 'confirmed', checked: '2026-05-18', note: '9V DC 120mA or USB-C powered. Brown Sound LE is identical hardware to standard TONEX ONE so spec applies directly. Not battery-capable.' },
      roles: ['brown-sound', 'evh-brown-sound-platform', 'evh-platform'],
      notes: 'Capture profile, not topology emulation. Paired with the Wolfgang Special is the most direct EVH delivery in the user\'s rig.',
    },
  ],

  // ── DRIVES (overdrives, distortions, fuzzes) ────────────
  drives: [
    {
      id: 'ibanez-ts808-35th',
      name: 'Ibanez TS808 35th Anniversary Overdrive',
      shortName: 'TS808',
      circuit: 'JRC4558D op-amp tube screamer topology',
      controls: [
        { id: 'drive', type: 'knob', range: [0, 10], default: 3 },
        { id: 'tone',  type: 'knob', range: [0, 10], default: 5 },
        { id: 'level', type: 'knob', range: [0, 10], default: 7 },
      ],
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 8, polarity: 'center-negative', connector: '1/8" (3.5mm) jack', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'User-attested 2026-05-18 (owner)', status: 'confirmed', checked: '2026-05-18', note: 'Owner-attested: 9V DC center-negative, 8mA max, 9V battery. CONNECTOR CORRECTION (P14): NOT a 2.1mm barrel (prior inferred value was wrong) — the 35th faithfully recreates the 1979 circuit and uses the older 1/8" (3.5mm) power jack. Power-budget impact: needs a 3.5mm adapter cable off a standard barrel supply (e.g. the MONDO).' },
      roles: ['tube-screamer', 'mid-push-boost', 'srv-boost', 'kws-boost', 'low-gain-overdrive'],
      typicalDeployment: 'low drive + high level into a clean or lightly broken-up amp; pushes the front end into mid-forward saturation',
    },
    {
      id: 'maxon-od808',
      name: 'Maxon OD808 Reissue Overdrive',
      shortName: 'OD808',
      circuit: 'JRC4558 op-amp tube screamer topology (Maxon-built original)',
      controls: [
        { id: 'drive', type: 'knob', range: [0, 10], default: 3 },
        { id: 'tone',  type: 'knob', range: [0, 10], default: 5 },
        { id: 'level', type: 'knob', range: [0, 10], default: 7 },
      ],
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 5, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'Maxon official product page (maxonfx.com OD808)', status: 'confirmed', checked: '2026-05-18', note: '5mA@9V battery; runs DC10V/6mA on the optional AC210N adaptor. Center-negative per Maxon spec.' },
      roles: ['tube-screamer', 'mid-push-boost', 'low-gain-overdrive'],
      typicalDeployment: 'sibling of TS808; same circuit lineage. Use either interchangeably for tube-screamer role.',
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
          roles: ['klon-flavor', 'transparent-boost', 'kws-1997-substitute', 'mayer-platform'],
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
          roles: ['kot-flavor', 'kws-modern-substitute', 'solo-boost', 'mid-gain-overdrive'],
        },
      ],
      power: { input: 'dc-9-18v', voltageV: 9, currentDrawMa: 10, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: true, batteryType: '9V', recommendedSupplyMa: 100, recommendedSupplyIsolated: true },
      specProvenance: { source: 'User-attested 2026-05-18 (owner)', status: 'confirmed', checked: '2026-05-18', note: 'Owner-attested: 9V–18V DC, 2.1mm center-negative, ~10mA draw. Recommends an isolated supply delivering ≥100mA. Safe across 9V–18V; voltage is a deliberate tone control (see notes).' },
      stackable: true,
      notes: 'Two independent sides; either or both can be engaged. Heavy Hand stacks well after TS808 for solo lift (KWS recipe). VOLTAGE AS A TONE CONTROL (owner-attested): 9V = classic compressed overdrive; 12V/18V = more headroom, tighter low-end, open hi-fi tube-like response. Recipes may specify supply voltage as a deliberate voicing parameter.',
    },
    {
      id: 'wampler-plexi-drive',
      name: 'Wampler Plexi-Drive British Overdrive',
      shortName: 'Plexi-Drive',
      circuit: 'Marshall Plexi-flavored overdrive',
      controls: [
        { id: 'drive',  type: 'knob', range: [0, 10], default: 5 },
        { id: 'volume', type: 'knob', range: [0, 10], default: 5 },
        { id: 'bass',   type: 'knob', range: [0, 10], default: 5 },
        { id: 'treble', type: 'knob', range: [0, 10], default: 5 },
      ],
      switches: [
        { id: 'bright', type: 'two-position', positions: ['off', 'on'] },
      ],
      power: { input: 'dc-9-18v', voltageV: 9, currentDrawMa: 4, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'Wampler Plexi-Drive official manual PDF (wamplerpedals.com)', status: 'confirmed', checked: '2026-05-18', note: 'Standard Plexi-Drive (British Overdrive): 4mA@9V (~10mA@18V), center pin negative, ≤18V, no center-positive. Deluxe/Mini are different pedals, not this one.' },
      roles: ['plexi-voice', 'mid-gain-overdrive', 'marshall-crunch', 'hendrix-platform'],
      typicalDeployment: 'pedal-platform alternative to Lion \'68 when amp-in-a-box pedal is impractical; runs into a clean amp.',
    },
    {
      id: 'wampler-euphoria',
      name: 'Wampler Euphoria Overdrive',
      shortName: 'Euphoria',
      circuit: 'Dumble-style smooth overdrive',
      controls: [
        { id: 'drive',  type: 'knob', range: [0, 10], default: 4 },
        { id: 'volume', type: 'knob', range: [0, 10], default: 5 },
        { id: 'tone',   type: 'knob', range: [0, 10], default: 5 },
      ],
      switches: [
        { id: 'voicing', type: 'multi-position', positions: ['Smooth', 'Open', 'Crunch'] },
      ],
      power: { input: 'dc-9-18v', voltageV: 9, currentDrawMa: 8, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'Wampler official Euphoria product page (wamplerpedals.com)', status: 'confirmed', checked: '2026-05-18', note: '8mA@9V to 15mA@18V; runs 9V or 18V; top-mounted jack; battery with low-battery LED. Polarity is Wampler house standard (center-negative, confirmed on sister Plexi-Drive manual).' },
      roles: ['dumble-flavor', 'transparent-boost', 'low-gain-overdrive', 'mayer-platform'],
      typicalDeployment: 'smooth, vocal overdrive — Mayer territory. Sits between Klon-flavor and tube-screamer in voicing.',
    },
    {
      id: 'evh-5150-od',
      name: 'EVH 5150 Overdrive',
      shortName: '5150 OD',
      circuit: '5150-flavored high-gain overdrive in pedal form',
      controls: [
        { id: 'gain',   type: 'knob', range: [0, 10], default: 6 },
        { id: 'volume', type: 'knob', range: [0, 10], default: 5 },
        { id: 'low',    type: 'knob', range: [0, 10], default: 5 },
        { id: 'mid',    type: 'knob', range: [0, 10], default: 5 },
        { id: 'high',   type: 'knob', range: [0, 10], default: 5 },
      ],
      switches: [
        { id: 'noise-gate', type: 'two-position', positions: ['off', 'on'] },
      ],
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 14, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'User-attested 2026-05-18 (owner): "9V DC power supply or one 9V battery"', status: 'confirmed', checked: '2026-05-18', note: 'Power method (9V DC supply OR 9V battery) is owner-attested — top provenance tier. currentDrawMa 14 is NOT attested: it remains secondary-source only (Dunlop publishes no mA; 12.5mA bypass / 14.5mA effect-on per retailers). Treat the mA as the one soft field.' },
      roles: ['high-gain-overdrive', 'evh-platform', '5150-voice'],
      typicalDeployment: '5150 voice without the head. Pairs with clean platform amp.',
    },
    {
      id: 'ehx-green-russian-big-muff',
      name: 'Electro-Harmonix Green Russian Big Muff Pi',
      shortName: 'Green Russian Muff',
      circuit: 'Sovtek-era Big Muff topology',
      controls: [
        { id: 'volume',  type: 'knob', range: [0, 10], default: 5 },
        { id: 'tone',    type: 'knob', range: [0, 10], default: 5 },
        { id: 'sustain', type: 'knob', range: [0, 10], default: 5 },
      ],
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 3, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'EHX official Green Russian Big Muff page + Big Muff Pi manual PDF (ehx.com)', status: 'confirmed', checked: '2026-05-18', note: 'CONFLICT: EHX product page states 3mA; EHX manual states 2.2mA. 3mA used (product page is the more authoritative EHX source). Max 14VDC; optional EHX 9.6VDC-200mA adapter.' },
      roles: ['fuzz', 'big-muff-flavor', 'gilmour-platform'],
      typicalDeployment: 'thick, mid-scooped fuzz; Gilmour / stoner / doom territory.',
    },
  ],

  // ── MODULATION ──────────────────────────────────────────
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
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 5, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'Jim Dunlop official M68 manual PDF (jimdunlop.com/content/manuals/M68.pdf)', status: 'confirmed', checked: '2026-05-18', note: 'Manual spec block: 5mA / 9V DC. Battery via bottom plate or ECB003. Polarity/connector = MXR/Dunlop ECB003 standard (center-negative 2.1mm).' },
      roles: ['univibe-modulation', 'watery-modulation', 'hendrix-rhythm-texture', 'kws-1997-substitute', 'kws-modern-substitute'],
      typicalDeployment: 'placed before drive for classic Hendrix Machine Gun rhythm; Chorus mode for KWS Voodoo Child funk break (DIRECT MATCH for univibe-modulation role — preferred over Phase 90 substitution).',
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
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 8, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'Jim Dunlop official EVH90 manual PDF (jimdunlop.com/content/manuals/EVH90.pdf)', status: 'confirmed', checked: '2026-05-18', note: 'Manual spec block: 8.2mA / 9V DC (recorded as integer 8). Battery via bottom plate or ECB003. Center-negative 2.1mm MXR/Dunlop standard.' },
      roles: ['phase-90', 'evh-eruption-swirl', 'evh-rhythm-shimmer', 'evh-platform'],
      typicalDeployment: 'Script mode for vintage EVH solo swirl; Block mode for post-1980 EVH territory. NOT preferred as Univibe substitute when M68 Uni-Vibe is available.',
    },
    {
      id: 'mxr-analog-chorus',
      name: 'MXR Analog Chorus',
      shortName: 'MXR Chorus',
      circuit: 'BBD analog chorus',
      controls: [
        { id: 'rate',     type: 'knob', range: [0, 10], default: 4 },
        { id: 'depth',    type: 'knob', range: [0, 10], default: 5 },
        { id: 'level',    type: 'knob', range: [0, 10], default: 5 },
        { id: 'low-cut',  type: 'knob', range: [0, 10], default: 5 },
        { id: 'high-cut', type: 'knob', range: [0, 10], default: 5 },
      ],
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 13, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'Jim Dunlop official M234 manual PDF (jimdunlop.com/content/manuals/M234.pdf)', status: 'confirmed', checked: '2026-05-18', note: 'Manual spec block: 13mA / 9V DC. Battery via bottom plate or ECB003. Center-negative 2.1mm MXR/Dunlop standard.' },
      roles: ['analog-chorus', 'lush-modulation'],
      typicalDeployment: 'classic 80s analog chorus voice. Use sparingly; mix-friendly with low depth + low level.',
    },
    {
      id: 'boss-ps-6-harmonist',
      name: 'Boss PS-6 Harmonist',
      shortName: 'PS-6',
      circuit: 'digital pitch-shift / harmonist',
      controls: [
        { id: 'voice',    type: 'knob', range: [0, 10], default: 5 },
        { id: 'shift',    type: 'knob', range: [0, 10], default: 5 },
        { id: 'feedback', type: 'knob', range: [0, 10], default: 0 },
        { id: 'balance',  type: 'knob', range: [0, 10], default: 5 },
      ],
      switches: [
        { id: 'mode', type: 'multi-position', positions: ['Harmony', 'Detune', 'Super Bend', 'Pitch Shifter'] },
      ],
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 65, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'Boss/Roland official PS-6 specifications page (boss.info/us/products/ps-6)', status: 'confirmed', checked: '2026-05-18', note: 'CONFLICT: official Boss spec 65mA vs many retailers 45mA. Manufacturer figure (65mA) used. Boss-standard 9V DC center-negative 2.1mm, PSA adapter, 9V battery.' },
      roles: ['harmonist', 'pitch-shift'],
      typicalDeployment: 'lead-line harmonization in a key. Detune mode for thickening. Super Bend for divebomb-like whammy.',
    },
  ],

  // ── TIME-BASED (delays + reverbs) ───────────────────────
  timeBased: [
    {
      id: 'tc-hall-of-fame-2',
      name: 'TC Electronic Hall of Fame 2 Reverb',
      shortName: 'HoF 2',
      type: 'reverb',
      circuit: 'digital reverb with TonePrint',
      controls: [
        { id: 'decay', type: 'knob', range: [0, 10], default: 3 },
        { id: 'tone',  type: 'knob', range: [0, 10], default: 5 },
        { id: 'level', type: 'knob', range: [0, 10], default: 3 },
      ],
      switches: [
        { id: 'type', type: 'multi-position', positions: ['Hall', 'Spring', 'Plate', 'Church', 'Ambient', 'Mod', 'Lo-Fi', 'Tile', 'Room', 'Shimmer', 'TonePrint'] },
      ],
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 100, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'TC Electronic official HoF2 manual (tcelectronic.com)', status: 'confirmed', checked: '2026-05-18', note: 'Manual states "9V DC providing 100mA or more" — recorded as 100 (manual\'s stated supply requirement; TC publishes no separate measured draw). Confirmed per user directive 2026-05-18: manual is source of truth. Same manual-phrasing family as Flashback 2.' },
      roles: ['room-reverb', 'ambient-reverb', 'spring-reverb-substitute'],
      typicalDeployment: 'always-on light room ambience for amp-reverb-forward songs. Decay 9 o\'clock / Level 9-10 o\'clock is the KWS-style fill-in setting.',
    },
    {
      id: 'tc-flashback-delay',
      name: 'TC Electronic Flashback 2 Delay and Looper',
      shortName: 'Flashback 2',
      type: 'delay',
      circuit: 'digital delay with TonePrint, includes looper',
      controls: [
        { id: 'delay-time', type: 'knob', range: [0, 10], default: 5 },
        { id: 'feedback',   type: 'knob', range: [0, 10], default: 4 },
        { id: 'level',      type: 'knob', range: [0, 10], default: 4 },
      ],
      switches: [
        { id: 'type',         type: 'multi-position', positions: ['2290', 'Analog', 'Tape', 'Lofi', 'Dynamic', 'Reverse', 'Slap', 'Ping-Pong', 'Mod', 'Space', 'TonePrint'] },
        { id: 'subdivision',  type: 'multi-position', positions: ['quarter', 'eighth', 'dotted-eighth', 'triplet'] },
      ],
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 300, polarity: 'center-negative', connector: '5.5/2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'Official TC Electronic Flashback 2 Delay user manual (verbatim, ©MUSIC Group 2017); product page modelCode 0709-AGB', status: 'confirmed', checked: '2026-05-18', note: 'User-attested: unit is the Flashback 2 (not original). MANUAL INTERNAL DISCREPANCY (P14): §4.1 body says "100 mA or more"; §9 spec table says ">300 mA". Both are supply minimums, no measured draw published. Conservative ≥300 mA stored for power-budget safety. Battery-capable explicitly confirmed (§7.2/§9). Connector 5.5/2.1mm center-negative per §4.1.' },
      roles: ['digital-delay', 'analog-delay-flavor', 'tape-delay-flavor', 'ambient-time'],
      typicalDeployment: 'engaged sparingly for solo accents (KWS recipe); set to short slap for rockabilly territory.',
    },
    {
      id: 'boss-sde-3',
      name: 'Boss SDE-3 Dual Digital Delay',
      shortName: 'SDE-3',
      type: 'delay',
      circuit: 'digital dual-delay (SDE-3000 lineage)',
      controls: [
        { id: 'time-a',     type: 'knob', range: [0, 10], default: 4 },
        { id: 'time-b',     type: 'knob', range: [0, 10], default: 6 },
        { id: 'feedback',   type: 'knob', range: [0, 10], default: 3 },
        { id: 'level',      type: 'knob', range: [0, 10], default: 4 },
        { id: 'modulation', type: 'knob', range: [0, 10], default: 2 },
      ],
      switches: [
        { id: 'mode', type: 'multi-position', positions: ['Single', 'Dual', 'Stereo Pan', 'Modulation'] },
      ],
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 75, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'Boss official SDE-3 global specifications page (boss.info/global/products/sde-3)', status: 'confirmed', checked: '2026-05-18', note: 'The 2023 SDE-3 Dual Digital Delay compact pedal (NOT the SDE-3000 rack): 75mA, 9V, PSA adapter, 9V battery. Boss-standard center-negative 2.1mm.' },
      roles: ['digital-delay', 'dual-delay'],
      typicalDeployment: 'studio-grade dual-delay. Pan two delay lines for wide stereo image (Stereo Pan mode).',
    },
  ],

  // ── WAHS ────────────────────────────────────────────────
  wahs: [
    {
      id: 'dunlop-mc404-cae-wah',
      name: 'Dunlop MC404 CAE Wah',
      shortName: 'MC404 Wah',
      circuit: 'Custom Audio Electronics — switchable inductors + Q + boost',
      controls: [
        { id: 'treadle', type: 'expression-pedal', range: [0, 10] },
      ],
      switches: [
        { id: 'inductor',     type: 'two-position', positions: ['Yellow (Vintage)', 'Red (Modern)'] },
        { id: 'q',            type: 'two-position', positions: ['Vintage (lower Q)', 'Modern (higher Q)'] },
        { id: 'boost',        type: 'two-position', positions: ['off', 'on (+20dB)'] },
      ],
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 7, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'Jim Dunlop official MC404 manual PDF (jimdunlop.com)', status: 'confirmed', checked: '2026-05-18', note: 'Manual: current draw "less than 6.3mA" (recorded as integer 7). Battery / ECB003 / DC Brick. Boost label corrected +15dB→+20dB per Dunlop manual (user directive 2026-05-18: manual is source of truth; resolved the prior contention).' },
      roles: ['modern-wah', 'vintage-wah', 'cae-circuit'],
      typicalDeployment: 'flexible wah — Yellow inductor + Vintage Q for Hendrix-tradition voicings; Red + Modern Q for tighter modern wah territory.',
    },
    {
      id: 'fulltone-supa-wah',
      name: 'Fulltone Custom Shop Supa-Wah',
      shortName: 'Supa-Wah',
      circuit: 'multi-wah with extensive voicing controls',
      controls: [
        { id: 'treadle',  type: 'expression-pedal', range: [0, 10] },
        { id: 'contour',  type: 'knob', range: [0, 10], default: 5 },
        { id: 'level',    type: 'knob', range: [0, 10], default: 5 },
      ],
      switches: [
        { id: 'voicing', type: 'multi-position', positions: ['Vocal', 'Wide', 'Sharp'] },
      ],
      power: { input: 'dc-9-18v', voltageV: 9, currentDrawMa: 11, polarity: 'center-negative', connector: '5.5/2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'User-attested 2026-05-18 (owner)', status: 'confirmed', checked: '2026-05-18', note: 'Owner-attested: 9V or 18V DC, center-negative, 5.5/2.1mm barrel, 11mA max draw, accepts standard 9V battery. Resolves the prior null (Fulltone never published the draw). Fulltone warns against unregulated supplies. Voltage is a tone control — see typicalDeployment.' },
      roles: ['vintage-wah', 'modern-wah', 'studio-wah'],
      typicalDeployment: 'studio-tier wah; voicing switch covers wide territory. More refined than standard Cry Baby family. VOLTAGE AS A TONE CONTROL (owner-attested): 9V = classic compressed vintage tone; 18V = wider dynamic range, more headroom. Recipes may specify supply voltage as a deliberate voicing parameter.',
    },
    {
      id: 'vox-v847a',
      name: 'Vox V847-A Classic Reissue Wah',
      shortName: 'Vox V847-A',
      circuit: 'classic Vox/Clyde McCoy wah lineage',
      controls: [
        { id: 'treadle', type: 'expression-pedal', range: [0, 10] },
      ],
      switches: [],
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 1, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'Vox official V847 page + Vox owner\'s manual (voxamps.com, via ElectroSmash analysis)', status: 'confirmed', checked: '2026-05-18', note: 'Confirmed BOTH battery AND DC-capable: the V847-A reissue ADDED a DC jack vs the battery-only original V847. True draw 0.54mA (540µA) per Vox manual, recorded as integer 1mA.' },
      roles: ['classic-wah', 'vintage-wah', 'hendrix-wah'],
      typicalDeployment: 'classic Hendrix-lineage wah voice. Vintage sweep, vocal mids.',
    },
  ],

  // ── UTILITY ─────────────────────────────────────────────
  utility: [
    {
      id: 'tc-polytune-3',
      name: 'TC Electronic PolyTune 3',
      shortName: 'PolyTune 3',
      type: 'tuner',
      controls: [],
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 100, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: false, batteryType: null },
      specProvenance: { source: 'TC Electronic official PolyTune 3 product page + manual (tcelectronic.com)', status: 'confirmed', checked: '2026-05-18', note: 'Official spec: 9V, ≥100mA (full-pedal incl. onboard BonaFide buffer; TC publishes no buffer-only figure). Full-size PolyTune 3 is DC-only — no battery compartment.' },
      placementConstraint: 'always-first',
      roles: ['tuner'],
      notes: 'Polyphonic + chromatic tuner with built-in buffer (defeatable).',
    },
    {
      id: 'mxr-smartgate',
      name: 'MXR Smartgate Noise Gate',
      shortName: 'Smartgate',
      type: 'noise gate',
      controls: [
        { id: 'threshold', type: 'knob', range: [0, 10], default: 4 },
      ],
      switches: [
        { id: 'mode', type: 'multi-position', positions: ['Hiss', 'Mid', 'Full'] },
      ],
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 15, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'Jim Dunlop official M135 manual + retailer-mirrored spec (Perfect Circuit / Music Store Live)', status: 'confirmed', checked: '2026-05-18', note: '15mA rests on retailer-mirror consensus of the Dunlop M135 manual (PDF not directly extractable in research env); 9V + battery + ECB003 confirmed by Dunlop. Center-negative 2.1mm MXR standard.' },
      placementConstraint: 'post-high-gain-amp',
      roles: ['noise-gate'],
      notes: 'Place in fx-loop after high-gain amp. Mode selects frequency emphasis of the gate.',
    },
    {
      id: 'boss-cs-3',
      name: 'Boss CS-3 Compression Sustainer',
      shortName: 'CS-3',
      type: 'compressor',
      controls: [
        { id: 'level',     type: 'knob', range: [0, 10], default: 5 },
        { id: 'tone',      type: 'knob', range: [0, 10], default: 5 },
        { id: 'attack',    type: 'knob', range: [0, 10], default: 5 },
        { id: 'sustain',   type: 'knob', range: [0, 10], default: 4 },
      ],
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 20, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: true, batteryType: '9V' },
      specProvenance: { source: 'Boss/Roland official CS-3 specifications page (boss.info/us/products/cs-3)', status: 'confirmed', checked: '2026-05-18', note: 'CONFLICT: current official Boss spec 20mA vs legacy ACA-era listings 10/11mA. Current official figure (20mA) used. Boss-standard center-negative 2.1mm PSA adapter, 9V battery.' },
      placementConstraint: 'pre-drive',
      roles: ['compressor'],
      typicalDeployment: 'place before drive for sustain + level evening. Country/funk clean-comp territory.',
    },
    {
      id: 'radial-bigshot-aby',
      name: 'Radial BigShot ABY True-Bypass Switch',
      shortName: 'BigShot ABY',
      type: 'A/B-Y switcher',
      controls: [],
      switches: [
        { id: 'output-select', type: 'multi-position', positions: ['A', 'B', 'A+Y'] },
        { id: 'phase',         type: 'two-position',   positions: ['normal', 'inverted'] },
        { id: 'isolation',     type: 'two-position',   positions: ['off', 'on (transformer)'] },
      ],
      power: { input: 'passive', voltageV: null, currentDrawMa: null, polarity: 'n/a', connector: null, batteryCapable: false, batteryType: null },
      specProvenance: { source: 'Radial Engineering official BigShot ABY page + datasheet PDF (radialeng.com)', status: 'confirmed', checked: '2026-05-18', note: 'PASSIVE — 100% passive transformer-isolated true-bypass audio path; requires NO power. An optional 9V (2.1mm) input powers ONLY the front-panel status LEDs; audio is unaffected without it.' },
      placementConstraint: 'post-drive',
      roles: ['aby-switch', 'two-amp-routing'],
      notes: 'Routes signal to two amps simultaneously (A+Y mode). Phase invert + transformer isolation handle ground-loop / phase issues. Required for KWS two-amp recipes.',
    },
    {
      id: 'digitech-drop',
      name: 'DigiTech Drop Polyphonic Drop-Tune Pitch-Shift',
      shortName: 'Drop',
      type: 'pitch-shift / drop-tune',
      controls: [
        { id: 'drop-amount', type: 'knob', range: [0, 7], default: 1, notes: '1=half-step down through 7=full octave + dry-blend modes' },
      ],
      switches: [
        { id: 'mode', type: 'two-position', positions: ['Drop only', 'Drop + Dry'] },
      ],
      power: { input: 'dc-9v', voltageV: 9, currentDrawMa: 250, polarity: 'center-negative', connector: '2.1mm barrel', batteryCapable: false, batteryType: null },
      specProvenance: { source: 'DigiTech official power-supply list + Drop manual PDF (digitech.com)', status: 'confirmed', checked: '2026-05-18', note: 'Manual: pedal consumption "<250mA @ 9VDC" (2.3W) — 250mA = documented max. Included PS0913DC supply is rated higher for headroom. Digital, no battery option. Center-negative confirmed by DigiTech power list.' },
      placementConstraint: 'always-first',
      roles: ['drop-tune', 'pitch-shift'],
      notes: 'Polyphonic real-time drop-tuner. Place first in chain (before tuner if needed for re-tune-on-the-fly).',
    },
    {
      id: 'voodoo-lab-mondo',
      name: 'Voodoo Lab Pedal Power MONDO 12-output Isolated Power Supply',
      shortName: 'MONDO',
      type: 'power supply',
      controls: [],
      // SPECIAL CASE: this IS the supply, not a pedal drawing from one. `power` documents
      // its AC input + isolated-output capacity (additive fields; per LD#9 additive-only rule).
      power: { input: 'ac-mains', voltageV: null, currentDrawMa: null, polarity: 'center-negative', connector: 'IEC mains',
               batteryCapable: false, batteryType: null,
               mains: 'region-specific, NOT auto-switching (120V/100V/230V variants)',
               supplyCapacity: '12 fully isolated 5.5x2.1mm center-negative outputs: 2x 9V/400mA, 2x dual 9V|12V/400mA, 2x 9V/250mA, 4x 9V/100mA (12V/60mA), 2x 9V/100mA SAG-variable (4-9V). 18V/24V via optional voltage-doubling cables.' },
      specProvenance: { source: 'Voodoo Lab official Pedal Power MONDO page + manual PDF (voodoolab.com)', status: 'confirmed', checked: '2026-05-18', note: 'Capacity figures are the meaningful spec (it sources current, does not draw a pedal-style figure). Region-specific mains — not auto-switching.' },
      placementConstraint: null,
      roles: ['power-supply'],
      notes: 'Powers the pedalboard. Not in signal chain. Total capacity per power.supplyCapacity — use for board power-budget validation.',
    },
  ],

  // ── MODELER ─────────────────────────────────────────────
  modeler: [
    {
      id: 'line-6-helix',
      name: 'Line 6 Helix Guitar Multi-effects Floor Processor',
      shortName: 'Helix',
      type: 'multi-effects modeler',
      // v1: enumerated as a single capability node; per-block recipes deferred to v2
      // (per ROADMAP "Helix block-level modeling (v2 of Gear tab)").
      capabilities: ['amp-models', 'cab-models', 'ir-loader', 'drives', 'modulation', 'time-based', 'pitch', 'wah', 'compressor', 'eq'],
      outputModes: ['frfr-direct', 'four-cable-method', 'into-power-amp', 'di-to-interface'],
      compatibleOutputs: ['line-6-powercab-212-plus', 'headrush-frfr-112', 'di-to-interface'],
      power: { input: 'ac-mains', voltageV: null, currentDrawMa: null, polarity: 'n/a', connector: 'IEC mains', batteryCapable: false, batteryType: null },
      specProvenance: { source: 'User-attested 2026-05-18 (owner): "standard IEC AC cable"', status: 'confirmed', checked: '2026-05-18', note: 'CORRECTION (P14): Helix Floor has an INTERNAL universal PSU fed by a standard IEC AC mains cable — NOT a DC pedal. Prior secondary-research entry (external DC-3 9V/3A brick) was the HX Stomp/LT pattern, wrong for the Floor unit. Corrected on owner attestation. Not powered from the pedalboard supply.' },
      roles: ['modeler', 'multi-fx', 'helix-fallback'],
      notes: 'Catch-all fallback per substitution-method taxonomy (§3.5 helix-fallback). Used when no other owned gear fills a role.',
    },
  ],

};

// Expose globals for the HTML runtime (loaded via plain <script>).
if (typeof window !== 'undefined') {
  window.GEAR_INVENTORY = GEAR_INVENTORY;
  window.GEAR_INVENTORY_SCHEMA_VERSION = GEAR_INVENTORY_SCHEMA_VERSION;
}
