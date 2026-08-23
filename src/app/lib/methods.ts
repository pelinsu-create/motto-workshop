export interface Method {
  id: string;
  icon: string;
  name: string;
  desc: string;
  source: string;
}

export const METHODS: Method[] = [
  {
    id: "thematic",
    icon: "🔬",
    name: "Thematic Analysis",
    desc: "Braun & Clarke 6-phase: familiarize → initial codes → search themes → review → define → report",
    source: "Braun & Clarke, 2006",
  },
  {
    id: "affinity",
    icon: "🗂️",
    name: "Affinity Mapping",
    desc: "Cluster insights bottom-up into groups. Reveal hidden connections across participants.",
    source: "Beyer & Holtzblatt",
  },
  {
    id: "jtbd",
    icon: "⚡",
    name: "Jobs to Be Done",
    desc: "Extract job stories, four forces (push/pull/anxiety/habit), struggling moments, hiring criteria.",
    source: "Christensen / Moesta & Spiek",
  },
  {
    id: "quotes",
    icon: "💬",
    name: "Quote Mining",
    desc: "Key quotes tagged by participant ID, theme, and emotional valence. Presentation-ready.",
    source: "Direct evidence extraction",
  },
  {
    id: "contradictions",
    icon: "⚔️",
    name: "Contradiction Flagging",
    desc: "Where participants disagree or hold conflicting mental models. Tensions = insights.",
    source: "Divergent analysis",
  },
  {
    id: "patterns",
    icon: "🔗",
    name: "Cross-Interview Patterns",
    desc: "Behaviors, pain points, and workarounds appearing across 3+ participants. Frequency counted.",
    source: "Cross-case pattern matching",
  },
  {
    id: "gaps",
    icon: "🕳️",
    name: "Gap Analysis",
    desc: "Unanswered questions, insufficient data areas, recommended follow-up research.",
    source: "Research planning",
  },
];

export const METHOD_IDS = METHODS.map((m) => m.id);
