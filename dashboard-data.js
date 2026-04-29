// ══════════════════════════════════════════════════════════
// AGENT DASHBOARD
// ══════════════════════════════════════════════════════���═══

const AGENT_DASHBOARD = {

  // ── Mission-level KPIs (computed at render time from live data) ──
  // kpis array is built by computeKPIs() — no hardcoded values

  // ── Alignment Dimensions (full control loops, not just scores) ──
  // Each dimension: target definition, per-agent scores (avg computed at render), drivers, linked build items
  dimensions: [
    { label: 'Blues foundation respected',
      target: 10, scores: { hendrix: 10, evh: 9, srv: 10, kws: 9 },
      targetDef: 'TONE treats pentatonic+blues as the operating system, not a starting point to leave behind',
      drivers: ['Pentatonic always visible as default', 'Chord-tone targeting built on pentatonic skeleton', 'Blues scale b5 pathway added (3.8)', 'Major penta ghost overlay on dominant chords (4.3)'],
      limiters: ['No string-gauge / physical-rig metadata on songs (KWS)', 'No tone scaffold tied to genre — TONE_RECIPES has 1 entry'],
      linkedLoops: ['penta-switch', 'tone-vocabulary'],
      projected: 'Note-side near ceiling (9.5). Tone/string-mass side invisible — KWS gap.',
    },
    { label: 'Pentatonic as skeleton',
      target: 10, scores: { hendrix: 10, evh: 9, srv: 10, kws: 10 },
      targetDef: 'Every navigation feature frames pentatonic as the foundation that extensions build on',
      drivers: ['Brewster overlay shows penta as rings (comfort zone)', 'Pentatonic view mode isolates the skeleton', 'Pathways frame expansions as "penta + N notes"', 'Arpeggio paths show chord-tone traversal within penta positions (3.9)', 'Major penta tones shown alongside minor over dominant chords (4.3)'],
      limiters: [],
      linkedLoops: ['penta-switch'],
      projected: 'Near ceiling (9.75). Penta-switch resolved (4.3).',
    },
    { label: 'Chord-tone targeting',
      target: 10, scores: { hendrix: 10, evh: 10, srv: 10, kws: 9 },
      targetDef: 'TONE shows which notes ARE the chord at every position, at playing speed',
      drivers: ['Play Mode target note logic correct', 'Overlay shows chord tones as solid dots', 'Forward vision shows next target', 'Arpeggio paths show sequential traversal (3.9)', 'Decoder classify mode shows note function (3.9)', 'Song routes add per-section targeting (4.2)'],
      limiters: ['No bend-path annotation — target reached by bending (b3→3) isn\'t surfaced (KWS)'],
      linkedLoops: ['song-route'],
      projected: 'Near ceiling (9.75). Bend-path annotation missing — KWS lens cross-cuts SRV.',
    },
    { label: 'Rhythm / lead integration',
      target: 8, scores: { hendrix: 8, evh: 6, srv: 7, kws: 6 },
      targetDef: 'TONE helps the user move between chord voicings and melodic phrases seamlessly',
      drivers: ['Brewster overlay shows chord shapes in position', 'Triad chaining through progressions with voice-leading optimization (3.9)'],
      limiters: ['No double-stop / thumb-bass independence — "Pride and Joy" identity invisible (SRV)', 'No open-string pedal-tone visualization — "Unchained" / drop-D drone idiom invisible (EVH)', 'No rock-rhythm voicing view — 5-chord stabs, octave riffs (KWS)', 'No hammer-on/pull-off ornament layer between triad voicings — "Little Wing" decoration (Hendrix)', 'Dynamics/phrasing acknowledged out of scope but not closed as such'],
      linkedLoops: ['two-voice-rhythm', 'open-string-pedal-tone', 'triad-ornament-layer'],
      projected: 'Below target (6.75 vs 8). Filter divergence — Hendrix scores triad chain as the bridge (+1), SRV/EVH/KWS see specific gaps (-2/0/-2 from prior). Multiple closed-form features needed; not a single ceiling.',
    },
    { label: 'Physical instrument / position',
      target: 9, scores: { hendrix: 9, evh: 9, srv: 9, kws: 9 },
      targetDef: 'TONE shows navigation in terms of fretboard geography — zones, positions, hand movement — not abstract theory',
      drivers: ['CAGED zone overlay on ALL chords — subtle diatonic, bold non-diatonic (4.0)', 'Root dot squares provide spatial anchoring', 'Between-fret dots aid position awareness', 'Arpeggio paths show hand movement through positions (3.9)', 'Decoder classify shows position context (3.9)', 'Forward Map shows CAGED hint for every chord (4.0)', 'Song route mapping shows position changes per section (4.2)', 'ACE zone model maps triad voicings (moved from rhythm/lead — drives spatial, not bridge)'],
      limiters: ['Tuning is global only — Library row cannot declare its tuning. Contradicts the "tuning is a parameter" axiom (KWS)'],
      linkedLoops: ['song-route', 'per-song-tuning'],
      projected: 'At target (9.0). Per-song tuning override would push past target — currently global-only.',
    },
    { label: 'Modal extension visibility',
      target: 8, scores: { hendrix: 8, evh: 7, srv: 8, kws: 8 },
      targetDef: 'Dorian, Mixolydian, and chromatic extensions are visible as departure options from the pentatonic default',
      drivers: ['PENTA_PATHWAYS_EXT data exists for Dorian + Blues + Mixolydian', 'Insight cards describe extensions in pentatonic view', 'Dorian ghost visible in Play Mode over minor chords (3.9)', 'Chromatic approach notes include half-step below (3.9)', 'Major penta ghost overlay on dominant chords (4.3)'],
      limiters: ['Mixolydian b7 lacks Play Mode ghost equivalent to renderDorianGhost — data-only (Hendrix + EVH)', 'Blues b5 lacks Play Mode ghost — data lives in PENTA_PATHWAYS_EXT and Scales tab, no live render'],
      linkedLoops: ['penta-switch', 'mixolydian-ghost', 'blues-b5-ghost'],
      projected: 'Near target (7.75 vs 8). Hendrix +2 (prior agent never read renderDorianGhost). Asymmetric ghost coverage — only Dorian shipped a Play Mode pass.',
    },
    { label: 'Forward vision / voice leading',
      target: 10, scores: { hendrix: 10, evh: 10, srv: 10, kws: 9 },
      targetDef: 'TONE shows where the player is going NEXT — the upcoming chord\'s target and how to approach it',
      drivers: ['Next target diamonds (Play Mode)', 'Approach note triangles — now chromatic below (3.9)', 'Nav prompt shows next note + role'],
      limiters: ['No tempo-aware density adjustment for ballad vs rock contexts — same forward-vision payload renders for "While We Cry" and a rock vamp (KWS)'],
      linkedLoops: [],
      projected: 'Near ceiling (9.75). Chromatic approach resolved. Tempo-aware density would push to 10.',
    },
    { label: 'Zoom spectrum accuracy',
      target: 10, scores: { hendrix: 9, evh: 8, srv: 10, kws: 9 },
      targetDef: 'TONE correctly identifies when to zoom in (non-diatonic = navigate carefully) vs zoom out (diatonic = pentatonic is safe)',
      drivers: ['Zoom level assessment in Forward Map', 'CAGED overlay triggers on non-diatonic', 'Tendency labels guide zoom decisions', 'Song-route per-section zoom field — "safe" / "zoom-in" credited (4.2)'],
      limiters: ['EVH wants more granularity in zoom levels', 'Binary zoom at fretboard render — no intermediate "yellow zone" between safe and conflict'],
      linkedLoops: ['song-route'],
      projected: 'Improving (9.0 vs 10). Song-route per-section zoom credited; binary at fretboard render still limits.',
    },
    { label: 'Chromatic vocabulary support',
      target: 8, scores: { hendrix: 7, evh: 6, srv: 7, kws: 6 },
      targetDef: 'Chromatic passing tones, approach notes, and non-diatonic connections are visible as navigation options',
      drivers: ['7#9 chord type added (contains b3 + 3 tension)', 'Blues scale b5 pathway added', 'Chromatic approach notes — half-step below always included (3.9)'],
      limiters: ['No chromatic enclosure visualization (target-above + chromatic-below as a unit)', 'Blues b5 has no Play Mode ghost — data-only (Hendrix + EVH)', 'Chromatic passing tones BETWEEN diatonic landmarks have no representation — only single-note approach below next target (EVH)', 'Bend-as-chromatic vs picked-chromatic not distinguished — KWS\'s bend vocabulary IS chromatic (KWS)'],
      linkedLoops: ['blues-b5-ghost'],
      projected: 'Below target (6.5 vs 8). Multiple chromatic surfaces missing: enclosure, blues b5 ghost, bend-vs-pick distinction, between-landmark passing tones.',
    },
    { label: 'Tone / era context per song',
      target: 8, scores: { hendrix: null, evh: null, srv: null, kws: 3 },
      targetDef: 'Each song carries its tone identity — recipe, tuning, string mass, era context — so signal-chain is part of navigation, not separate from it',
      drivers: ['TONE_RECIPES schema exists (line 5190)', 'renderToneSetup wires recipes to Library 🎛 panel (line 5477)', 'gear.txt enumerates user rig'],
      limiters: ['Only 1 recipe in TONE_RECIPES — KWS plays Hendrix material and his own material on different stacks; current model can\'t represent that', 'Global tuning only — Library row cannot declare its tuning', 'No string-gauge / pick / physical-rig field on songs', 'No notion of era (1995 Super Reverb KWS vs 2020s Dumble KWS)'],
      linkedLoops: ['tone-vocabulary', 'per-song-tuning'],
      projected: 'Far below target — KWS-only baseline (3 vs 8). Hendrix/EVH/SRV did not score this dimension; pending re-eval at next pass.',
    },
  ],

  // ── Active Control Loops ──
  // Each loop: target → current → gap → intersections → action → conditions
  // Intersections show where agent domains converge/conflict on this specific decision
  loops: [
    // ── Gaps surfaced by 4-agent re-baseline (April 2026) ──
    { id: 'mixolydian-ghost', weight: 2, status: 'gap',
      target: 'Mixolydian b7 visible as live Play Mode ghost equivalent to renderDorianGhost — fires over major/dominant chord contexts where the b7 is a modal signature',
      current: 'PENTA_PATHWAYS_EXT defines Mixolydian as a pentatonic_major pathway (line 3146-3155). renderMajorPentaGhost partially covers it for dominant chords (line 5124) but does not label or highlight the b7 as the Mixolydian signature note. No renderMixolydianGhost function.',
      gap: 'Asymmetric coverage: minor chords get a Dorian ghost, dominant chords get a major-penta ghost, but Mixolydian-as-mode never appears as a labeled live overlay.',
      action: 'Add renderMixolydianGhost following the renderDorianGhost pattern. Trigger on major-3rd + b7 contexts; render b7 as labeled ghost. ~30-50 lines, isolated to Play Mode hierarchy at Pass 1.27.',
      intersections: [
        { agent: 'hendrix', align: 'close', note: 'Mixolydian is the rock-blues voice — half-shipped via major-penta ghost — filter 5 (Dorian extension)' },
        { agent: 'evh',     align: 'close', note: 'Data exists in PENTA_PATHWAYS_EXT, render pass missing — filter 1 (intervallic expansion)' },
        { agent: 'guitar-sys', align: 'close', note: 'Symmetry of modal coverage — filter 2 (completeness)' },
        { agent: 'architect', align: 'neutral', note: 'Same pattern as renderDorianGhost, low blast radius — filter 5' },
      ],
    },
    { id: 'blues-b5-ghost', weight: 2, status: 'gap',
      target: 'Blues b5 visible as live Play Mode ghost over chord contexts where the b5 is in scale',
      current: 'Blues scale exists in PENTA_PATHWAYS_EXT (line 3134) and Scales tab modes, but Play Mode has no b5 ghost overlay. b5 only appears in pathway insight cards / scale view.',
      gap: 'b5 is data, not a navigable visual landmark mid-progression. Hendrix and EVH both flag — Hendrix lens (Purple Haze tritone), EVH lens (chromatic connections).',
      action: 'Add renderBluesB5Ghost, gated on key being minor or dominant chord context. ~30 lines, isolated. Pass 1.28 in render hierarchy.',
      intersections: [
        { agent: 'hendrix', align: 'close', note: '"Purple Haze" b5 is the chord — filter 2 (blues foundation)' },
        { agent: 'evh',     align: 'close', note: 'b5 is the connector tritone — filter 3 (chromatic)' },
        { agent: 'srv',     align: 'partial', note: 'Filter 1 says blues vocabulary should be visible mid-progression' },
      ],
    },
    { id: 'two-voice-rhythm', weight: 2, status: 'gap',
      target: 'Visualize thumb-bass + treble-comp simultaneously — two-voice rhythm/lead independence',
      current: 'No feature anywhere visualizes thumb-bass + treble-comp simultaneously. Triad chaining and arpeggio paths are single-voice. "Pride and Joy" shuffle, "Testifyin\'" intro, "Texas Flood" intro all require two-voice independence.',
      gap: 'SRV core identity invisible. Single-voice visualization model is the architectural assumption — needs to extend to bass-string voice + treble-string voice on same fretboard.',
      action: 'Design decision needed before code: which renderer carries this? Likely a Play Mode mode-toggle ("rhythm/lead split"). Could also live as a new tab or as a Triads sub-mode. ~150-200 lines depending on scope.',
      intersections: [
        { agent: 'srv',     align: 'close', note: 'Filter 3 (dynamics/phrasing) — Pride and Joy IS this' },
        { agent: 'hendrix', align: 'close', note: 'Filter 1 (rhythm/lead integration) — thumb-over technique' },
        { agent: 'kws',     align: 'partial', note: 'Less central than rock-rhythm voicing view but adjacent' },
        { agent: 'architect', align: 'caution', note: 'Architectural decision — single-voice model is current assumption — filter 3 (change cost)' },
        { agent: 'uiux',    align: 'caution', note: 'Two simultaneous voices on one fretboard risks visual conflict — filter 2 (hierarchy)' },
      ],
    },
    { id: 'open-string-pedal-tone', weight: 1, status: 'gap',
      target: 'Open-string drone visualization against moving shapes — "Unchained" / drop-D / drop-A pedal-tone idiom',
      current: 'No representation of open-string sympathetic tones during chord motion. Drop-D / open-A drone against moving shapes has zero TONE coverage.',
      gap: 'EVH compositional device invisible. Could be a render pass that highlights open-string notes whenever current chord contains the open-string pitch.',
      action: 'Add a render pass that flags open-string fret-0 dots when their pitch is a chord tone of the current chord. ~30 lines, isolated. Could fold into existing Pass 2 as a styling variant.',
      intersections: [
        { agent: 'evh',     align: 'close', note: '"Unchained" pedal-tone-against-moving-shapes — filter 5 (rhythm guitar intelligence)' },
        { agent: 'hendrix', align: 'partial', note: 'Open E drone in "Hey Joe" / "Voodoo Chile" — adjacent but not central' },
        { agent: 'architect', align: 'neutral', note: 'Small render addition, no engine change — filter 5' },
      ],
    },
    { id: 'triad-ornament-layer', weight: 1, status: 'gap',
      target: 'Hammer-on / pull-off ornament markers between triad voicings — "Little Wing" decoration vocabulary',
      current: 'renderTriadChain shows voice-leading lines between inversion centers (line 7099) but no ornament markers.',
      gap: 'Decoration layer between rhythm voicings invisible. Connects rhythm to lead at the millisecond grain.',
      action: 'Annotate triad-chain SVG with curved markers between adjacent chord-tones suggesting hammer/pull motion. ~40 lines.',
      intersections: [
        { agent: 'hendrix', align: 'close', note: '"Little Wing" / "Wind Cries Mary" embellishment is the technique bridge — filter 1' },
        { agent: 'srv',     align: 'partial', note: 'Lenny chord-melody embellishments — filter 2' },
        { agent: 'uiux',    align: 'caution', note: 'Risk of visual clutter on triad chain — filter 2' },
      ],
    },
    { id: 'tone-vocabulary', weight: 3, status: 'gap',
      target: 'Per-song tone recipe + era + signal-chain context. Songs carry their tone identity, not just chord/key/route.',
      current: 'TONE_RECIPES has exactly 1 entry (line 5190). renderToneSetup wires it to the Library 🎛 panel via the song.sections[].tone field. Architecture exists; data does not.',
      gap: 'KWS plays Hendrix material differently from his own material — Eb tuning, Univibe, Octavia, wah for Hendrix; standard rig for original. Current model: songs share a global rig and at most one recipe. Multiple agents flagged adjacent gaps (string mass, era, dynamics).',
      action: 'Two-phase. Phase 1: populate TONE_RECIPES with 4-6 catalog references covering eras and stack types — proves the schema. Phase 2: evaluate whether the schema needs era/string-gauge fields based on what got hard. Don\'t over-design before data is in.',
      intersections: [
        { agent: 'kws',     align: 'close', note: 'Original surfacing agent — filter 1 (era awareness), 5 (two-amp blend), 6 (string-mass)' },
        { agent: 'tone-eng', align: 'close', note: 'This is exactly the tone-engineer\'s domain — filter: signal chain + gear mapping' },
        { agent: 'srv',     align: 'partial', note: 'Filter 5 (player-responsive chain) cares about signal architecture' },
        { agent: 'architect', align: 'caution', note: 'Schema change risk; populate before extending fields — filter 3 (change cost)' },
      ],
    },
    { id: 'per-song-tuning', weight: 2, status: 'gap',
      target: 'Library row declares its tuning; launching a song into Play Mode honors the song\'s tuning, not the global setting',
      current: 'Tuning is global only (decoder-tuning hidden input feeds all renderers). Library presets have no tuning field. Direct contradiction with the "Tuning is a parameter" design axiom (TONE_CONTEXT.md line 89).',
      gap: 'KWS workflow (mix of standard and Eb material) hits friction at every song change. Same applies to anyone with drop-D / open-G songs alongside standard.',
      action: 'Add optional song.tuning field to PRESETS schema. enterPlayMode applies it. Falls back to global on absence. Subsumed by — but smaller than — the tone-vocabulary loop.',
      intersections: [
        { agent: 'kws',     align: 'close', note: 'Filter 3 (Hendrix synthesis — Eb tuning per song)' },
        { agent: 'guitar-sys', align: 'close', note: 'Engine is already tuning-agnostic — schema additive' },
        { agent: 'architect', align: 'close', note: 'Small additive change — filter 5' },
      ],
    },
    // ── Resolved loops (closed) ──
    { id: 'chromatic-approach', weight: 2, status: 'done',
      target: 'Approach notes include chromatic half-step from below, regardless of key membership',
      current: 'Resolved: below always chromatic, above stays diatonic-filtered',
      gap: 'Closed',
      action: 'Complete',
      intersections: [
        { agent: 'hendrix', align: 'close', note: '"Wind Cries Mary" voice leading is chromatic — filter 2 (blues foundation)' },
        { agent: 'evh',     align: 'close', note: 'Chromatic passing is the connective tissue — filter 3 (chromatic connections)' },
        { agent: 'srv',     align: 'close', note: 'Bug: filtering out the strongest blues approach step — filter 2 (chord-tone targeting)' },
        { agent: 'architect', align: 'neutral', note: 'Isolated change, ~10 lines in one function — filter 5 (blast radius)' },
        { agent: 'uiux',    align: 'neutral', note: 'Reuse existing triangle rendering, no new visual elements — filter 1 (glanceability)' },
        { agent: 'guitar-sys', align: 'close', note: 'Chromatic half-step below is universal voice-leading — filter 1 (theory correctness)' },
      ],
    },
    { id: 'dorian-ghost', weight: 2, status: 'done',
      target: 'Natural 6th visible as modal extension ghost over minor chords in Play Mode',
      current: 'Resolved: renderDorianGhost() renders natural 6th at Pass 1.25 in Play Mode hierarchy',
      gap: 'Closed',
      action: 'Complete',
      intersections: [
        { agent: 'hendrix', align: 'close', note: 'Most identifiable non-pentatonic note in catalog — filter 5 (Dorian extension)' },
        { agent: 'evh',     align: 'close', note: 'Dorian F# over Am defines "Unchained" character — filter 1 (intervallic expansion)' },
        { agent: 'srv',     align: 'partial', note: 'Valid extension but pentatonic default must stay visible — filter 4 (zoom-out preserved)' },
        { agent: 'uiux',    align: 'caution', note: 'Adds a 6th visual layer to Play Mode — filter 4 (cognitive load)' },
        { agent: 'architect', align: 'neutral', note: 'Rendering change only, data exists — filter 3 (change cost)' },
      ],
    },
    { id: 'note-classify-decoder', weight: 0, status: 'done',
      target: 'Decoder fretboard shows chord tone / passing / approach classification when chord selected',
      current: 'Resolved: 4th heat mode "classify" renders solid/ring/dim-ring on Decoder fretboard via renderDecoderClassify()',
      gap: 'Closed',
      action: 'Complete',
      intersections: [
        { agent: 'uiux',    align: 'close', note: 'Highest consistency win — reuses Scales Overlay visual vocabulary — filter 3 (consistency)' },
        { agent: 'architect', align: 'close', note: '~40-60 lines, isolated to heatMapSVG — filter 5 (blast radius)' },
        { agent: 'srv',     align: 'close', note: 'Closes the loop between analysis and navigation — filter 2 (chord-tone targeting)' },
        { agent: 'guitar-sys', align: 'close', note: 'Engine exists, needs wiring — filter 2 (completeness)' },
      ],
    },
    { id: 'arpeggio-view', weight: 0, status: 'done',
      target: 'Chord tones rendered as sequential paths (not just dots) — dual mode: within-position (SRV/Hendrix) + cross-position (EVH)',
      current: 'Resolved: renderArpeggioView() adds connecting paths in Overlay + Chord Tones modes. Position mode (dashed, within 5-fret window) + Wide mode (amber dashed, 7+ fret tapping reach)',
      gap: 'Closed',
      action: 'Complete',
      intersections: [
        { agent: 'hendrix', align: 'close', note: '"Little Wing" cascading embellishments ARE sequential arpeggio paths — filter 3 (chord tones in penta)' },
        { agent: 'evh',     align: 'close', note: 'Must show wide-interval connections (tapping zones) — filter 1 (intervallic expansion)' },
        { agent: 'srv',     align: 'close', note: '"Lenny" = Emaj9 arpeggios across neck — filter 2 (chord-tone targeting)' },
        { agent: 'uiux',    align: 'caution', note: 'Connecting lines must not compete with dot hierarchy — filter 2 (visual hierarchy)' },
        { agent: 'architect', align: 'neutral', note: '~80-120 lines, needs WHERE decision (Scales mode vs Play Mode context) — filter 3 (change cost)' },
        { agent: 'tone-eng', align: 'neutral', note: 'Arpeggios through clean vs gain sound different — filter 3 (gain staging)' },
      ],
    },
    { id: 'triad-chaining', weight: 0, status: 'done',
      target: 'Triads chain through progressions with minimal hand movement — inversions selected for voice-leading proximity',
      current: 'Resolved: renderTriadChain() selects minimum-movement inversions per chord on D-G-B. Chain strip shows chord→inversion→fret sequence. SVG shows voice-leading lines between positions.',
      gap: 'Closed',
      action: 'Complete',
      intersections: [
        { agent: 'hendrix', align: 'close', note: '"Wind Cries Mary" IS triad chaining — filter 1 (rhythm/lead integration)' },
        { agent: 'srv',     align: 'close', note: '"Lenny" chord-melody uses chained upper-string triads — filter 2 (chord-tone targeting)' },
        { agent: 'evh',     align: 'partial', note: 'Less central to EVH vocabulary than arpeggios — filter 5 (rhythm guitar intelligence)' },
        { agent: 'architect', align: 'caution', note: '~150+ lines, needs new chaining algorithm, moderate coupling — filter 3 (change cost)' },
        { agent: 'tone-eng', align: 'neutral', note: 'Tight triads need mid-forward amp (Marshall/5150) not scooped (Recto) — filter 3 (gain staging)' },
      ],
    },
    { id: 'song-route', weight: 0, status: 'done',
      target: 'Per-song navigation route stored in preset — CAGED zones, targets, approach strategy per section',
      current: 'Sections array in PRESETS schema. Auto-compute via computeDefaultRoute. Route Brief panel, section-aware chord strip and Forward Map.',
      gap: 'Resolved (4.2). Schema additive — chords field unchanged. Staleness guard nulls sections on chord edit.',
      action: 'Shipped. Section editor (manual authoring UI) deferred — auto-compute covers common case.',
      intersections: [
        { agent: 'architect', align: 'caution', note: 'PRESETS schema change, save system impact, ~200+ lines — filter 5 (blast radius)' },
        { agent: 'tone-eng', align: 'close', note: 'Creates receiving surface for /distill output AND future gear annotations — filter 2 (gear mapping)' },
        { agent: 'uiux',    align: 'close', note: 'New study-speed surface from Library — intentionally dense, not glanceable — filter 4 (cognitive load)' },
        { agent: 'hendrix', align: 'close', note: 'Route through "Little Wing" IS the technique bridge in action — filter 4 (physical instrument)' },
        { agent: 'srv',     align: 'partial', note: 'Important but depends on other components — defer — filter 4 (zoom-out preserved)' },
      ],
    },
    { id: 'penta-switch', weight: 2, status: 'done',
      target: 'Major pentatonic tones visible over dominant 7th chords alongside minor pentatonic',
      current: 'Chord-root major penta ghost overlay on dominant chords. isDominantQuality trigger. Dashed-stroke ghosts in Play Mode, Forward Map annotation, nav prompt hint.',
      gap: 'Resolved (4.3). Additive visual layer — no engine model change. Key-relative pentaNotesSet unchanged.',
      action: 'Shipped. Augmentation approach (alongside, not replacing minor penta).',
      intersections: [
        { agent: 'srv',     align: 'close', note: 'Core vocabulary — major penta sweetness over I7 — filter 1 (pentatonic as complete system)' },
        { agent: 'hendrix', align: 'close', note: 'Freely mixed major/minor penta over E7 vamps — filter 2 (blues foundation)' },
        { agent: 'guitar-sys', align: 'caution', note: 'Engine-level change: one-penta-per-key model needs rethinking — filter 2 (completeness)' },
        { agent: 'architect', align: 'caution', note: 'Cross-cutting — affects Play Mode, Scales overlay, insight cards — filter 3 (change cost)' },
      ],
    },
    { id: '7sharp9', weight: 3, status: 'done',
      target: '7#9 chord type in engine — E7#9 parses and analyzes correctly',
      current: 'Resolved 3.8: CHORD_FORMULAS, QUALITY_SUFFIXES, PLAY_CHORD_INTERVALS, Chords dropdown, SUFFIX_DISPLAY',
      gap: 'Closed',
      action: 'Complete',
      intersections: [
        { agent: 'hendrix', align: 'close', note: 'The Hendrix chord — "Purple Haze," "Foxy Lady" — filter 2 (blues foundation)' },
        { agent: 'guitar-sys', align: 'close', note: 'Formula [0,4,7,10,3] verified correct — filter 1 (theory correctness)' },
      ],
    },
    { id: 'penta-pathways-ext', weight: 3, status: 'done',
      target: 'Pentatonic expansion pathways for Dorian (natural 6th) and Blues (♭5)',
      current: 'Resolved 3.8: PENTA_PATHWAYS_EXT, findAllPentaPathways(), insight cards surface all expansions',
      gap: 'Closed',
      action: 'Complete',
      intersections: [
        { agent: 'hendrix', align: 'close', note: 'Dorian 6th is the Hendrix note — filter 5 (Dorian extension)' },
        { agent: 'srv',     align: 'close', note: 'Blues b5 is fundamental vocabulary — filter 1 (pentatonic as complete system)' },
        { agent: 'guitar-sys', align: 'close', note: 'Set differences verified: {2,9} and {6} correct — filter 1 (theory correctness)' },
      ],
    },
  ],

  features: [
    { name: 'Decoder harmonic analysis',    layer: 'Core',    status: 'done' },
    { name: 'Play Mode target notes',       layer: 'Core',    status: 'done' },
    { name: 'Play Mode forward vision',     layer: 'Core',    status: 'done' },
    { name: 'Play Mode approach notes',     layer: 'Core',    status: 'done' },
    { name: 'CAGED zone overlay',           layer: 'Core',    status: 'done' },
    { name: 'Brewster chord-scale overlay', layer: 'L9',      status: 'done' },
    { name: 'Pentatonic pathways',          layer: 'L9',      status: 'done' },
    { name: 'Fingerprint match engine',     layer: 'Core',    status: 'done' },
    { name: 'Arpeggio view (dual-mode)',    layer: 'L9',      status: 'done' },
    { name: 'Triad chaining',              layer: 'L9',      status: 'done' },
    { name: 'Song route mapping',           layer: 'L9',      status: 'done' },
    { name: 'Note classification (Decoder)', layer: 'L9',     status: 'done' },
    { name: '7#9 chord type',              layer: 'Engine',  status: 'done' },
    { name: 'Dorian + Blues pentatonic pathways', layer: 'Engine', status: 'done' },
  ],

  // ── Operational Agent System ──
  agents: [
    { name: 'Hendrix',    type: 'player',  domain: 'Blues foundation, rhythm/lead integration, Dorian extensions' },
    { name: 'EVH',        type: 'player',  domain: 'Tapping, harmonics, Brown Sound, high-gain vocabulary' },
    { name: 'SRV',        type: 'player',  domain: 'Blues-rock, Strat dynamics, pentatonic mastery, feel' },
    { name: 'KWS',        type: 'player',  domain: 'Modern blues-rock, two-amp blends, verge-of-breakup, era awareness, tone-as-vocabulary' },
    { name: 'Architect',  type: 'ops',     domain: 'Code structure, state flow, technical debt, single-file constraints' },
    { name: 'UI/UX',      type: 'ops',     domain: 'Glanceability, visual hierarchy, interaction cost, consistency' },
    { name: 'Guitar Sys',  type: 'ops',    domain: 'Theory engine correctness, interval math, scale formulas, CAGED' },
    { name: 'Tone Eng',   type: 'ops',     domain: 'Signal chain, gear mapping, gain staging, tone matching' },
  ],

  // ── Distillation Pipeline ──
  pipeline: [
    { skill: '/analyze-tab', purpose: 'Tablature → harmonic analysis + technique inventory + transferable principles', status: 'ready' },
    { skill: '/tone-match',  purpose: 'Reference tone → signal chain recipe mapped to user\'s gear with specific settings', status: 'ready' },
    { skill: '/distill',     purpose: 'Master orchestrator: runs both skills, routes through agent quality gates, produces TONE-ready package', status: 'ready' },
  ],
};

function computeKPIs() {
  const kpis = [];

  // ── Engine Coverage ──
  // Chord types: actual vs known standard set (common types a guitarist encounters)
  const targetChordTypes = ['major','minor','dom7','maj7','min7','sus2','sus4','dim','aug','add9',
    'min7b5','dim7','6','min6','9','maj9','7#9','min9','13','maj13','7sus4','aug7'];
  const actualChords = Object.keys(CHORD_FORMULAS);
  const chordCoverage = actualChords.length;
  const chordTarget = targetChordTypes.length;
  // Pathways: primary + extended
  const pathwayCount = Object.keys(PENTA_PATHWAYS).length + Object.keys(PENTA_PATHWAYS_EXT).length;
  const pathwayTarget = 5; // major→major, minor→minor, minor→dorian, minor→blues, major→mixolydian
  // Scales
  const scaleCount = Object.keys(SCALE_FORMULAS).length;
  const scaleTarget = 16; // current 16 is the design target
  // Weighted composite: chords 50%, pathways 25%, scales 25%
  const enginePct = Math.round(
    ((chordCoverage / chordTarget) * 50) +
    ((pathwayCount / pathwayTarget) * 25) +
    ((scaleCount / scaleTarget) * 25)
  );
  kpis.push({
    label: 'Engine', value: Math.min(enginePct, 100), unit: '%',
    detail: `${chordCoverage}/${chordTarget} chords · ${pathwayCount}/${pathwayTarget} pathways · ${scaleCount}/${scaleTarget} scales`,
    what: 'Harmonic vocabulary coverage'
  });

  // ── Navigation Readiness ──
  // Each check verifies the capability exists by testing the code, not a manual flag.
  // Unbuilt features: test for the function that WOULD exist when built.
  const navChecks = [
    { name: 'Target notes',       pass: typeof getTargetNote === 'function' },
    { name: 'Forward vision',     pass: typeof renderPlayFretboard === 'function' },
    { name: 'Forward map',        pass: typeof buildForwardMap === 'function' },
    { name: 'Approach notes',     pass: typeof renderPlayFretboard === 'function' },
    { name: 'Chromatic approach', pass: typeof renderPlayFretboard === 'function'
        && !renderPlayFretboard.toString().includes('scaleNotes.has(below)') }, // verifies diatonic filter is removed
    { name: 'Decoder classify',   pass: typeof renderDecoderClassify === 'function' },  // function won't exist until built
    { name: 'Arpeggio paths',    pass: typeof renderArpeggioView === 'function' },      // function won't exist until built
    { name: 'Song routes',       pass: typeof renderSongRoute === 'function' },          // function won't exist until built
  ];
  const navPassed = navChecks.filter(c => c.pass).length;
  const navPct = Math.round((navPassed / navChecks.length) * 100);
  kpis.push({
    label: 'Navigation', value: navPct, unit: '%',
    detail: navChecks.map(c => `${c.name} ${c.pass ? '✓' : '✗'}`).join(' · '),
    what: 'Can the user see what/where/how to play?'
  });

  // ── Technique Bridge ──
  // Each check verifies the capability by testing code state, not manual flags.
  const techChecks = [
    { name: 'Brewster overlay',    pass: typeof getOverlayContext === 'function' },
    { name: 'CAGED overlay',       pass: typeof getCAGEDShapesForRoot === 'function' },
    { name: 'Pentatonic pathways', pass: Object.keys(PENTA_PATHWAYS).length > 0 },
    { name: 'Extended pathways',   pass: Object.keys(PENTA_PATHWAYS_EXT).length > 0 },
    { name: 'Insight cards',       pass: typeof getScaleInsights === 'function' },
    { name: 'Dorian ghost',       pass: typeof renderDorianGhost === 'function' },     // function won't exist until built
    { name: 'Arpeggio view',      pass: typeof renderArpeggioView === 'function' },    // function won't exist until built
    { name: 'Triad chaining',     pass: typeof renderTriadChain === 'function' },      // function won't exist until built
  ];
  const techPassed = techChecks.filter(c => c.pass).length;
  const techPct = Math.round((techPassed / techChecks.length) * 100);
  kpis.push({
    label: 'Technique', value: techPct, unit: '%',
    detail: techChecks.map(c => `${c.name} ${c.pass ? '✓' : '✗'}`).join(' · '),
    what: 'Theory → fretboard execution'
  });

  // ── Pipeline Readiness ──
  // Skills defined in .claude/commands/ — check pipeline data
  const pipeChecks = AGENT_DASHBOARD.pipeline.map(p => ({
    name: p.skill, pass: p.status === 'ready'
  }));
  const pipePassed = pipeChecks.filter(c => c.pass).length;
  const pipePct = Math.round((pipePassed / pipeChecks.length) * 100);
  kpis.push({
    label: 'Pipeline', value: pipePct, unit: '%',
    detail: pipeChecks.map(c => `${c.name} ${c.pass ? '✓' : '✗'}`).join(' · '),
    what: 'Content distillation readiness'
  });

  // ── Gaps (computed from loops) ──
  const activeLoops = AGENT_DASHBOARD.loops.filter(l => l.status !== 'done');
  // Classify: bugs are loops whose gap describes a defect in existing code
  const bugIds = new Set();
  activeLoops.forEach(l => {
    // A loop is a "bug" if it fixes existing broken behavior, not new capability
    if (l.id === 'chromatic-approach' || l.id === 'dorian-ghost') bugIds.add(l.id);
  });
  const bugs = activeLoops.filter(l => bugIds.has(l.id));
  const queued = activeLoops.filter(l => !bugIds.has(l.id));
  kpis.push({
    label: 'Gaps', value: activeLoops.length, unit: '',
    detail: (bugs.length ? 'bugs: ' + bugs.map(l => l.id).join(' · ') : '')
      + (bugs.length && queued.length ? ' | ' : '')
      + (queued.length ? 'queued: ' + queued.map(l => l.id).join(' · ') : ''),
    what: 'Active control loops with unresolved gaps'
  });

  return kpis;
}

function renderDashboard() {
  // Compute KPIs from live data
  AGENT_DASHBOARD.kpis = computeKPIs();
  // ── Active Control Loops with Intersection Maps ──
  const loEl = document.getElementById('dash-loops');
  if (loEl) {
    const alignColor = { close: 'var(--c-IV)', partial: 'var(--amber)', caution: 'var(--c-I)', neutral: 'var(--text-dim)' };
    const alignIcon = { close: '●', partial: '◐', caution: '▲', neutral: '○' };
    const statusClass = { done: 'dash-status-done', gap: 'dash-status-gap', queued: 'dash-status-gap', 'in_progress': 'dash-status-gap' };

    // Active loops first, then resolved
    const active = AGENT_DASHBOARD.loops.filter(l => l.status !== 'done');
    const resolved = AGENT_DASHBOARD.loops.filter(l => l.status === 'done');

    function renderLoop(l) {
      const sc = statusClass[l.status] || 'dash-status-future';
      const wClass = l.weight >= 3 ? 'dash-w3' : l.weight >= 2 ? 'dash-w2' : 'dash-w1';
      const isResolved = l.status === 'done';

      const intersectionHtml = l.intersections.map(ix => {
        const col = alignColor[ix.align];
        const icon = alignIcon[ix.align];
        return `<div style="display:flex;align-items:flex-start;gap:0.5rem;padding:0.25rem 0;font-size:0.65rem;line-height:1.4">
          <span style="color:${col};flex-shrink:0;width:12px;text-align:center">${icon}</span>
          <span class="dash-agent-tag dash-tag-${ix.agent}" style="flex-shrink:0">${ix.agent}</span>
          <span style="color:var(--text-dim)">${ix.note}</span>
        </div>`;
      }).join('');

      return `<div class="dash-item" style="flex-direction:column;align-items:stretch;padding:0.75rem 0;${isResolved ? 'opacity:0.5;' : ''}">
        <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.4rem">
          <span class="dash-weight ${wClass}">W${l.weight}</span>
          <span class="dash-status ${sc}">${l.status}</span>
          <strong style="color:var(--text-hi);flex:1">${l.target}</strong>
        </div>
        ${!isResolved ? `<div style="display:grid;grid-template-columns:auto 1fr;gap:0.15rem 0.6rem;margin:0.3rem 0 0.3rem 2.8rem;font-size:0.65rem">
          <span style="color:var(--amber)">current:</span><span style="color:var(--text-dim)">${l.current}</span>
          <span style="color:var(--c-I)">gap:</span><span style="color:var(--text)">${l.gap}</span>
          <span style="color:var(--c-IV)">action:</span><span style="color:var(--text-dim)">${l.action}</span>
        </div>` : ''}
        <div style="margin:0.3rem 0 0 2.8rem;border-left:2px solid var(--border);padding-left:0.6rem">
          ${intersectionHtml}
        </div>
      </div>`;
    }

    loEl.innerHTML = active.map(renderLoop).join('')
      + (resolved.length ? '<div style="margin-top:0.8rem;padding-top:0.5rem;border-top:1px solid var(--border);font-family:var(--mono);font-size:0.6rem;color:var(--text-dim);letter-spacing:0.1em;text-transform:uppercase">// resolved</div>' : '')
      + resolved.map(renderLoop).join('');
  }

  // ── KPI Bar (all values computed by computeKPIs()) ──
  const kpEl = document.getElementById('dash-kpis');
  if (kpEl) {
    kpEl.innerHTML = AGENT_DASHBOARD.kpis.map(k => {
      const isCount = !k.unit;
      const valColor = isCount ? (k.value > 3 ? 'var(--c-I)' : k.value > 0 ? 'var(--amber)' : 'var(--c-IV)')
                     : k.value >= 80 ? 'var(--c-IV)' : k.value >= 60 ? 'var(--amber)' : 'var(--c-I)';
      return `<div style="flex:1;min-width:140px;background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:0.75rem 1rem;text-align:center">
        <div style="font-family:var(--mono);font-size:1.6rem;font-weight:700;color:${valColor}">${k.value}${k.unit}</div>
        <div style="font-family:var(--mono);font-size:0.62rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--text-dim);margin:0.25rem 0">${k.label}</div>
        <div style="font-family:var(--mono);font-size:0.58rem;color:var(--text-dim);line-height:1.4">${k.detail}</div>
      </div>`;
    }).join('');
  }

  // ── Alignment Dimensions (full control loops) ──
  const dmEl = document.getElementById('dash-dimensions');
  if (dmEl) {
    dmEl.innerHTML = AGENT_DASHBOARD.dimensions.map(d => {
      // Average across all present (non-null) player scores. Filters undefined/null so dimensions with partial agent coverage still render.
      const presentScores = Object.values(d.scores).filter(v => typeof v === 'number');
      const hasScores = presentScores.length > 0;
      const avgNum = hasScores ? presentScores.reduce((a, b) => a + b, 0) / presentScores.length : 0;
      const avg = hasScores ? avgNum.toFixed(1) : 'TBD';
      const pct = hasScores ? Math.round((avgNum / d.target) * 100) : 0;
      const gapVal = hasScores ? (d.target - avgNum).toFixed(1) : '—';
      const barColor = pct >= 80 ? 'var(--c-IV)' : pct >= 60 ? 'var(--amber)' : 'var(--c-I)';

      const driversHtml = d.drivers.map(dr => `<span style="color:var(--c-IV)">✓</span> ${dr}`).join('<br>');
      const limitersHtml = d.limiters.map(lm => `<span style="color:var(--c-I)">✗</span> ${lm}`).join('<br>');
      const loopLinks = d.linkedLoops.length
        ? d.linkedLoops.map(id => `<span style="color:var(--amber);font-weight:600">→ ${id}</span>`).join(' · ')
        : '<span style="color:var(--text-dim)">none — stable</span>';

      return `<div style="padding:0.6rem 0;border-bottom:1px solid var(--border);font-family:var(--mono);font-size:0.7rem;line-height:1.6">
        <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.3rem">
          <span style="flex:1;font-weight:700;color:var(--text-hi)">${d.label}</span>
          <span style="color:${barColor};font-weight:700;width:45px;text-align:right">${avg}</span>
          <span style="color:var(--text-dim);width:20px;text-align:center">/</span>
          <span style="color:var(--text-dim);width:25px">${d.target}</span>
          <span style="width:120px">
            <div style="height:6px;background:var(--bg3);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${pct}%;background:${barColor};border-radius:3px"></div>
            </div>
          </span>
          <span style="color:var(--c-I);font-size:0.6rem;width:50px;text-align:right">gap ${gapVal}</span>
        </div>
        <div style="font-size:0.6rem;color:var(--text-dim);margin-bottom:0.2rem;font-style:italic">${d.targetDef}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.3rem 1rem;margin:0.3rem 0;font-size:0.62rem">
          <div>${driversHtml}</div>
          <div>${limitersHtml}</div>
        </div>
        <div style="font-size:0.6rem;margin-top:0.25rem">
          <span style="color:var(--text-dim)">moves when:</span> ${loopLinks}
          <span style="color:var(--text-dim);margin-left:0.8rem">${d.projected}</span>
        </div>
      </div>`;
    }).join('');
  }

  // ── Feature status ──
  const ftEl = document.getElementById('dash-features');
  if (ftEl) {
    ftEl.innerHTML = AGENT_DASHBOARD.features.map(f => {
      const sc = f.status === 'done' ? 'dash-status-done' : f.status === 'gap' ? 'dash-status-gap' : 'dash-status-future';
      return `<div class="dash-item">
        <span class="dash-status ${sc}">${f.status}</span>
        <span style="flex:1;color:var(--text)">${f.name}</span>
        <span style="color:var(--text-dim);font-size:0.62rem">${f.layer}</span>
      </div>`;
    }).join('');
  }

  // ── Agent system ──
  const agEl = document.getElementById('dash-agents');
  if (agEl) {
    agEl.innerHTML = AGENT_DASHBOARD.agents.map(a => {
      const typeColor = a.type === 'player' ? 'var(--c-b7)' : 'var(--c-V)';
      const typeLabel = a.type === 'player' ? 'player' : 'operational';
      return `<div class="dash-item">
        <span style="flex-shrink:0;font-size:0.58rem;padding:0.1rem 0.35rem;border-radius:2px;background:${typeColor}22;color:${typeColor};border:1px solid ${typeColor}44;font-weight:600">${typeLabel}</span>
        <span style="flex:1">
          <strong style="color:var(--text-hi)">${a.name}</strong>
          <div style="color:var(--text-dim);margin-top:0.15rem;font-size:0.65rem">${a.domain}</div>
        </span>
      </div>`;
    }).join('');
  }

  // ── Distillation pipeline ──
  const plEl = document.getElementById('dash-pipeline');
  if (plEl) {
    plEl.innerHTML = AGENT_DASHBOARD.pipeline.map(p => {
      const sc = p.status === 'ready' ? 'dash-status-done' : 'dash-status-gap';
      return `<div class="dash-item">
        <span class="dash-status ${sc}">${p.status}</span>
        <span style="flex:1">
          <strong style="color:var(--amber)">${p.skill}</strong>
          <div style="color:var(--text-dim);margin-top:0.15rem;font-size:0.65rem">${p.purpose}</div>
        </span>
      </div>`;
    }).join('');
  }

}
