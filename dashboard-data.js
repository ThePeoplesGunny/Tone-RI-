// ══════════════════════════════════════════════════════════
// AGENT DASHBOARD
// ══════════════════════════════════════════════════════���═══

const AGENT_DASHBOARD = {

  // ── Mission-level KPIs (computed at render time from live data) ──
  // kpis array is built by computeKPIs() — no hardcoded values

  // ── Alignment Dimensions (full control loops, not just scores) ──
  // Each dimension: target definition, current score with evidence, drivers, linked build items
  dimensions: [
    { label: 'Blues foundation respected',
      target: 10, current: 8.7, scores: { hendrix: 9, evh: 8, srv: 9 },
      targetDef: 'TONE treats pentatonic+blues as the operating system, not a starting point to leave behind',
      drivers: ['Pentatonic always visible as default', 'Chord-tone targeting built on pentatonic skeleton', 'Blues scale b5 pathway added (3.8)'],
      limiters: ['Major/minor penta switching over dominant chords not yet implemented'],
      linkedLoops: ['penta-switch'],
      projected: '+0.5 when penta-switch resolved',
    },
    { label: 'Pentatonic as skeleton',
      target: 10, current: 8.8, scores: { hendrix: 9, evh: 8, srv: 9 },
      targetDef: 'Every navigation feature frames pentatonic as the foundation that extensions build on',
      drivers: ['Brewster overlay shows penta as rings (comfort zone)', 'Pentatonic view mode isolates the skeleton', 'Pathways frame expansions as "penta + N notes"', 'Arpeggio paths show chord-tone traversal within penta positions (3.9)'],
      limiters: ['Penta-switch over dominant chords not yet implemented'],
      linkedLoops: ['penta-switch'],
      projected: '+0.5 when penta-switch resolved',
    },
    { label: 'Chord-tone targeting',
      target: 10, current: 9.3, scores: { hendrix: 9, evh: 9, srv: 10 },
      targetDef: 'TONE shows which notes ARE the chord at every position, at playing speed',
      drivers: ['Play Mode target note logic correct', 'Overlay shows chord tones as solid dots', 'Forward vision shows next target', 'Arpeggio paths show sequential traversal (3.9)', 'Decoder classify mode shows note function (3.9)'],
      limiters: ['Song route mapping not yet implemented'],
      linkedLoops: ['song-route'],
      projected: 'Near ceiling. Song routes add per-section targeting.',
    },
    { label: 'Rhythm / lead integration',
      target: 8, current: 7.5, scores: { hendrix: 7, evh: 6, srv: 9 },
      targetDef: 'TONE helps the user move between chord voicings and melodic phrases seamlessly',
      drivers: ['Brewster overlay shows chord shapes in position', 'ACE zone model maps triad voicings', 'Triad chaining through progressions with voice-leading optimization (3.9)'],
      limiters: ['No voicing-to-melody transition paths', 'Ceiling may be ~8 — dynamics/phrasing require the guitar in hand'],
      linkedLoops: [],
      projected: 'Near ceiling at 8. Remaining gap is phrasing/dynamics — beyond visualization.',
    },
    { label: 'Physical instrument / position',
      target: 9, current: 6.8, scores: { hendrix: 6, evh: 7, srv: 7 },
      targetDef: 'TONE shows navigation in terms of fretboard geography — zones, positions, hand movement — not abstract theory',
      drivers: ['CAGED zone overlay exists', 'Root dot squares provide spatial anchoring', 'Between-fret dots aid position awareness', 'Arpeggio paths show hand movement through positions (3.9)', 'Decoder classify shows position context (3.9)'],
      limiters: ['CAGED zone not shown on diatonic chords (decided to add — trust Stevie, not yet built)', 'No song route mapping showing position changes per section'],
      linkedLoops: ['song-route'],
      projected: '+1.0 from CAGED-on-diatonic. +1.5 if song routes added.',
    },
    { label: 'Modal extension visibility',
      target: 8, current: 6.0, scores: { hendrix: 5, evh: 6, srv: 7 },
      targetDef: 'Dorian, Mixolydian, and chromatic extensions are visible as departure options from the pentatonic default',
      drivers: ['PENTA_PATHWAYS_EXT data exists for Dorian + Blues + Mixolydian', 'Insight cards describe extensions in pentatonic view', 'Dorian ghost visible in Play Mode over minor chords (3.9)', 'Chromatic approach notes include half-step below (3.9)'],
      limiters: ['Major penta tones over dominant chords not surfaced'],
      linkedLoops: ['penta-switch'],
      projected: '+1.0 when penta-switch resolved.',
    },
    { label: 'Forward vision / voice leading',
      target: 10, current: 9.5, scores: { hendrix: 10, evh: 9, srv: 10 },
      targetDef: 'TONE shows where the player is going NEXT — the upcoming chord\'s target and how to approach it',
      drivers: ['Next target diamonds (Play Mode)', 'Approach note triangles — now chromatic below (3.9)', 'Nav prompt shows next note + role'],
      limiters: [],
      linkedLoops: [],
      projected: 'At ceiling. Chromatic approach resolved.',
    },
    { label: 'Zoom spectrum accuracy',
      target: 10, current: 8.0, scores: { hendrix: 8, evh: 7, srv: 9 },
      targetDef: 'TONE correctly identifies when to zoom in (non-diatonic = navigate carefully) vs zoom out (diatonic = pentatonic is safe)',
      drivers: ['Zoom level assessment in Forward Map', 'CAGED overlay triggers on non-diatonic', 'Tendency labels guide zoom decisions'],
      limiters: ['EVH wants more granularity in zoom levels', 'Binary zoom decided as correct for current phase'],
      linkedLoops: [],
      projected: 'Stable. Binary zoom is the resolved design decision.',
    },
    { label: 'Chromatic vocabulary support',
      target: 8, current: 6.0, scores: { hendrix: 6, evh: 5, srv: 7 },
      targetDef: 'Chromatic passing tones, approach notes, and non-diatonic connections are visible as navigation options',
      drivers: ['7#9 chord type added (contains b3 + 3 tension)', 'Blues scale b5 pathway added', 'Chromatic approach notes — half-step below always included (3.9)'],
      limiters: ['No chromatic enclosure visualization', 'EVH-specific chromatic passing patterns not surfaced — Layer 10 scope'],
      linkedLoops: [],
      projected: 'Further gains require Layer 10 (Protocol Translator).',
    },
    { label: 'Protocol translator readiness',
      target: 4, current: 2.0, scores: { hendrix: 2, evh: 2, srv: 2 },
      targetDef: 'TONE can identify which harmonic protocol a song uses and frame departures relative to the user\'s native protocol',
      drivers: ['Chord function analysis identifies non-diatonic chords', 'Tendency labels provide directional context'],
      limiters: ['No protocol identification (blues OS vs modal OS)', 'No user-protocol baseline defined', 'This is Layer 10+ scope — not expected to score high yet'],
      linkedLoops: [],
      projected: 'Target is 4 for now — acknowledging the gap exists. Scores will improve when Layer 10 work begins.',
    },
  ],

  // ── Active Control Loops ──
  // Each loop is a Performance Control cycle: target → current → gap → intersections → action → conditions
  // Intersections show where agent domains converge/conflict on this specific decision
  loops: [
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
        { agent: 'tone-eng', align: 'neutral', note: 'Arpeggios through clean vs gain sound different — future Layer 11 annotation — filter 3 (gain staging)' },
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
    { id: 'song-route', weight: 0, status: 'queued',
      target: 'Per-song navigation route stored in preset — CAGED zones, targets, approach strategy per section',
      current: 'Forward Map computes per-chord hints but no persistent route, no section-level aggregation',
      gap: 'Route is computed but not storable. /distill pipeline has no receiving surface in TONE.',
      action: 'Priority 7 (last). Depends on items 4-6. Touches PRESETS data model — irreversible.',
      intersections: [
        { agent: 'architect', align: 'caution', note: 'PRESETS schema change, save system impact, ~200+ lines — filter 5 (blast radius)' },
        { agent: 'tone-eng', align: 'close', note: 'Creates receiving surface for /distill output AND future gear annotations — filter 2 (gear mapping)' },
        { agent: 'uiux',    align: 'close', note: 'New study-speed surface from Library — intentionally dense, not glanceable — filter 4 (cognitive load)' },
        { agent: 'hendrix', align: 'close', note: 'Route through "Little Wing" IS the technique bridge in action — filter 4 (physical instrument)' },
        { agent: 'srv',     align: 'partial', note: 'Important but depends on other components — defer — filter 4 (zoom-out preserved)' },
      ],
    },
    { id: 'penta-switch', weight: 2, status: 'gap',
      target: 'Major pentatonic tones visible over dominant 7th chords alongside minor pentatonic',
      current: 'Single pentatonic set per key — major penta tones over I7 invisible',
      gap: 'SRV/Albert King major pentatonic vocabulary over dominant vamps not surfaced',
      action: 'W2 priority — not yet scheduled in build sequence',
      intersections: [
        { agent: 'srv',     align: 'close', note: 'Core vocabulary — major penta sweetness over I7 — filter 1 (pentatonic as complete system)' },
        { agent: 'hendrix', align: 'close', note: 'Freely mixed major/minor penta over E7 vamps — filter 2 (blues foundation)' },
        { agent: 'guitar-sys', align: 'caution', note: 'Engine-level change: one-penta-per-key model needs rethinking — filter 2 (completeness)' },
        { agent: 'architect', align: 'caution', note: 'Cross-cutting — affects Play Mode, Scales overlay, insight cards — filter 3 (change cost)' },
      ],
    },
    // ── Resolved loops (closed) ──
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
    { name: 'Song route mapping',           layer: 'L9',      status: 'gap' },
    { name: 'Note classification (Decoder)', layer: 'L9',     status: 'done' },
    { name: '7#9 chord type',              layer: 'Engine',  status: 'done' },
    { name: 'Dorian + Blues pentatonic pathways', layer: 'Engine', status: 'done' },
    { name: 'Protocol Translator',          layer: 'L10',     status: 'future' },
    { name: 'Presentation Layer (gear)',    layer: 'L11',     status: 'future' },
  ],

  // ── Operational Agent System ──
  agents: [
    { name: 'Hendrix',    type: 'player',  domain: 'Blues foundation, rhythm/lead integration, Dorian extensions' },
    { name: 'EVH',        type: 'player',  domain: 'Tapping, harmonics, Brown Sound, high-gain vocabulary' },
    { name: 'SRV',        type: 'player',  domain: 'Blues-rock, Strat dynamics, pentatonic mastery, feel' },
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

  future: [
    { item: 'Tapping interval mapping', agent: 'evh', layer: 'L9+',
      detail: 'Given left-hand position at fret N, show intervals available via tap at N+12, N+7, N+5' },
    { item: 'Rhythm guitar dynamics / muting spectrum', agent: 'evh', layer: 'L11',
      detail: 'Palm-mute-to-open transitions as compositional element. Voicing-to-voicing movement.' },
    { item: 'Dynamics / phrasing encoding', agent: 'srv', layer: 'Out of scope',
      detail: 'Acknowledged gap: "which note" is solvable, "how to play it" requires the guitar in hand.' },
    { item: 'Position-specific vocabulary awareness', agent: 'hendrix', layer: 'L10',
      detail: 'Frets 0-4 = chord-melody zone. Frets 12-15 = lead zone. Different vocabularies by register.' },
    { item: 'Protocol Translator', agent: 'all', layer: 'L10',
      detail: 'Identify whether a song runs blues OS (SRV/McCready) or modal OS (EVH/Cantrell). Frame departures relative to user\'s native protocol.' },
    { item: 'Double-stop (3rds/6ths) navigation', agent: 'hendrix', layer: 'L9+',
      detail: 'Two-note simultaneous concept requires different rendering paradigm than single-note targeting.' },
  ]
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
      const avg = ((d.scores.hendrix + d.scores.evh + d.scores.srv) / 3).toFixed(1);
      const pct = Math.round((avg / d.target) * 100);
      const gapVal = (d.target - parseFloat(avg)).toFixed(1);
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

  // ── Future layer items ──
  const fuEl = document.getElementById('dash-future');
  if (fuEl) {
    fuEl.innerHTML = AGENT_DASHBOARD.future.map(f => {
      const tag = f.agent === 'all'
        ? '<span class="dash-agent-tag dash-tag-hendrix">H</span><span class="dash-agent-tag dash-tag-evh">E</span><span class="dash-agent-tag dash-tag-srv">S</span>'
        : `<span class="dash-agent-tag dash-tag-${f.agent}">${f.agent}</span>`;
      return `<div class="dash-item">
        <span style="color:var(--text-dim);font-size:0.62rem;width:50px;flex-shrink:0">${f.layer}</span>
        <span style="flex:1">
          <strong style="color:var(--text-hi)">${f.item}</strong> ${tag}
          <div style="color:var(--text-dim);margin-top:0.2rem;font-size:0.65rem">${f.detail}</div>
        </span>
      </div>`;
    }).join('');
  }
}
