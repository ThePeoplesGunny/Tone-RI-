# Universal Agent Evaluation Protocol

Every agent in this project follows this evaluation structure. The domain content differs — a player agent evaluates through musical principles, an operational agent evaluates through engineering principles — but the PROCESS is identical. This makes agent outputs comparable, synthesizable, and traceable.

## Evaluation Structure

When consulted on any decision, every agent produces:

```
[AGENT NAME] EVALUATION
═══════════════════════

1. TARGET
   What is the desired state for this decision?
   (What should be true when this is done right?)

2. CURRENT STATE
   What does the evidence show now?
   (Cite specific code lines, data, measurements — not opinions)

3. GAP
   What is the delta between target and current?
   (The gap IS the signal. No gap = no action needed.)

4. DOMAIN ASSESSMENT
   [Agent applies its domain-specific filters here]
   Each filter produces a finding. Each finding cites evidence.

5. RECOMMENDATION
   Proposed action to close the gap.
   (Specific, actionable — not "consider" or "might want to")

6. CONDITIONS
   What constraints, dependencies, or conflicts affect this?
   (Other agents' domains, architectural limits, user decisions)

7. PROVENANCE
   - Which domain filter produced this recommendation?
   - What evidence supports it?
   - What is the confidence level? (Known/Known, Known/Unknown, etc.)
   - Where does this intersect with other agents' domains?
```

## Why This Structure

- **Traceability:** The user can start at any recommendation and trace it back to the target it serves, the evidence it's based on, and the filter that produced it.
- **Comparability:** When multiple agents evaluate the same decision, their outputs align structurally — targets can be compared, gaps can be compared, recommendations can be synthesized.
- **Diagnostics:** If a recommendation is wrong, the user can identify WHERE it went wrong: wrong target? wrong evidence? wrong filter? wrong conditions?
- **Provenance:** No recommendation exists without visible lineage. "The agent said so" is never sufficient — the user can always ask "which filter, based on what evidence?"

## Domain-Specific Filters

Each agent's domain expertise lives in Section 4 (Domain Assessment). The filters are defined in each agent's own file. Examples:

- **Hendrix agent:** "Does this respect the blues foundation? Does this show chord tones within pentatonic? Does this account for the Dorian extension?"
- **Architect agent:** "Does this respect the single-file constraint? What's the blast radius? Does this create or resolve technical debt?"
- **UI/UX agent:** "Does this pass the glanceability test? Is the visual hierarchy correct? Is this consistent with established patterns?"

The filters are the agent's expertise. The structure is the process that ensures that expertise is applied consistently and traceably.

## What This Protocol Does NOT Do

- Does not replace domain expertise — it structures how expertise is expressed
- Does not make decisions — it makes recommendations inspectable
- Does not flatten agent perspectives — disagreements between agents are surfaced as conflicting gaps or conflicting recommendations, not suppressed
- Does not add bureaucracy — the structure should sharpen output, not lengthen it. If an agent has nothing to say about a section, skip it.
