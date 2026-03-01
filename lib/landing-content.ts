/**
 * Landing page content – structured for future DB/CMS integration.
 * Replace with API calls or server-side data when ready.
 */

export interface CommunityIdentityBlock {
  id: string;
  title: string;
  description: string;
  icon: "roadmap" | "mic" | "podcast" | "users";
}

export interface TimelinePhase {
  id: string;
  day: number;
  label: string;
  description: string;
}

export interface DomainCard {
  id: string;
  title: string;
  missionDescription: string;
  skillsOutcome: string[];
  industryAlignment: string;
}

export interface CommunityStat {
  id: string;
  value: string | number;
  label: string;
}

export interface OutcomeItem {
  id: string;
  title: string;
  description: string;
}

export const communityIdentityBlocks: CommunityIdentityBlock[] = [
  {
    id: "structured",
    title: "Structured Growth",
    description:
      "A clear 60-day roadmap that builds day by day—no guesswork, no overwhelm. Every step is designed to move you from foundations to industry-level readiness.",
    icon: "roadmap",
  },
  {
    id: "industry",
    title: "Industry Exposure",
    description:
      "Webinars and guest sessions with professionals who ship real products. Learn from people who've walked the path and hear what hiring managers actually look for.",
    icon: "mic",
  },
  {
    id: "conversations",
    title: "Real Conversations",
    description:
      "Our podcast brings you honest talks with builders—engineers, researchers, and leaders. No fluff; just how they think, build, and grow.",
    icon: "podcast",
  },
  {
    id: "network",
    title: "Network & Accountability",
    description:
      "A community ecosystem where progress is shared, questions get real answers, and accountability comes from peers who are on the same journey.",
    icon: "users",
  },
];

export const timelinePhases: TimelinePhase[] = [
  {
    id: "foundations",
    day: 1,
    label: "Foundations",
    description: "Core concepts, patterns, and problem-solving habits.",
  },
  {
    id: "applied",
    day: 20,
    label: "Applied Thinking",
    description: "Connecting theory to practice with structured challenges.",
  },
  {
    id: "realworld",
    day: 40,
    label: "Real-World Problems",
    description: "Scenarios that mirror actual industry problems and systems.",
  },
  {
    id: "readiness",
    day: 60,
    label: "Industry-Level Readiness",
    description: "Confidence to discuss, design, and deliver at interview and portfolio level.",
  },
];

export const domainCards: DomainCard[] = [
  {
    id: "se",
    title: "Software Engineering",
    missionDescription:
      "Data structures, algorithms, systems thinking, and production patterns. Backend-heavy challenges and architecture discussions that mirror real product work.",
    skillsOutcome: ["DSA fluency", "System design basics", "Clean code habits"],
    industryAlignment: "Aligned with SWE and backend roles at product companies.",
  },
  {
    id: "ml",
    title: "Machine Learning",
    missionDescription:
      "From regression and trees to model evaluation and deployment. Build intuition around data, features, and metrics so you can talk about ML like an engineer.",
    skillsOutcome: ["ML pipeline thinking", "Metrics & evaluation", "Deployment awareness"],
    industryAlignment: "Maps to ML engineer and applied scientist roles.",
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    missionDescription:
      "Deep learning, sequence models, and modern transformer-based systems. Translate concepts into how modern AI products are built and shipped.",
    skillsOutcome: ["DL fundamentals", "Transformer literacy", "AI product mindset"],
    industryAlignment: "Relevant for AI/ML and research-oriented engineering roles.",
  },
];

export const communityStats: CommunityStat[] = [
  { id: "members", value: "—", label: "Active members" },
  { id: "challenges", value: "—", label: "Challenges completed" },
  { id: "sessions", value: "—", label: "Sessions conducted" },
];

export const outcomeItems: OutcomeItem[] = [
  {
    id: "thinking",
    title: "Structured Thinking",
    description:
      "You learn to break down problems, prioritize, and communicate your approach—the same skills that matter in interviews and on teams.",
  },
  {
    id: "confidence",
    title: "Interview-Ready Confidence",
    description:
      "Practice with industry-aligned challenges and conversations so you can walk into discussions about systems, ML, and AI with clarity.",
  },
  {
    id: "portfolio",
    title: "Portfolio-Level Skill",
    description:
      "Projects and problem-solving evidence that demonstrate what you can do, not just what you've studied.",
  },
  {
    id: "mindset",
    title: "Industry Mindset",
    description:
      "An understanding of how real teams ship: trade-offs, collaboration, and continuous learning as the norm.",
  },
];
