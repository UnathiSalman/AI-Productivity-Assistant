export function mockDelay(ms = 1200) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export const mockEmail = (purpose: string, recipient: string, tone: string) =>
  `Subject: ${purpose ? purpose.slice(0, 60) : "Quick note"}

Hi ${recipient || "there"},

I hope this message finds you well. I wanted to reach out regarding ${purpose || "an opportunity I think you'd find interesting"}. Given your work and priorities, I believe there's strong alignment here worth a brief conversation.

A few quick points:
• Context: This builds on recent discussions our teams have had.
• Value: It directly addresses the outcomes you mentioned caring about.
• Next step: A 20-minute call this week to walk through the details.

Would Thursday or Friday afternoon work? Happy to adjust to your schedule.

${tone === "formal" ? "Kind regards" : tone === "casual" ? "Cheers" : tone === "persuasive" ? "Looking forward to it" : "Best"},
Alex`;

export const mockMeeting = () => ({
  summary:
    "The product, design, and engineering teams aligned on the Q4 launch scope. Core priorities were narrowed to onboarding redesign, billing overhaul, and a new analytics dashboard. The team agreed to ship in two phases with a public beta starting in week 6.",
  decisions: [
    "Launch in two phases: internal alpha (week 4), public beta (week 6).",
    "Defer mobile redesign to Q1 to protect launch timeline.",
    "Adopt the new pricing tiers proposed by the growth team.",
    "Engineering owns the analytics rebuild end-to-end.",
  ],
  actions: [
    { who: "Maya", task: "Finalize onboarding spec by Friday." },
    { who: "Diego", task: "Migrate billing schema and write data backfill." },
    { who: "Priya", task: "Draft beta launch comms and outreach list." },
    { who: "Alex", task: "Schedule weekly cross-functional sync." },
  ],
  next: [
    "Kickoff sync next Monday at 10am.",
    "Design review of onboarding flows on Wednesday.",
    "Status update shared in #launch channel every Friday.",
  ],
});

export const mockPlan = (goal: string) => ({
  goal: goal || "Achieve your objective",
  tasks: [
    { priority: "P0", title: "Define success metrics and constraints", eta: "Day 1-2" },
    { priority: "P0", title: "Audit existing assets and resources", eta: "Day 2-4" },
    { priority: "P1", title: "Draft an initial strategy document", eta: "Day 4-6" },
    { priority: "P1", title: "Validate with three stakeholders", eta: "Week 2" },
    { priority: "P2", title: "Build execution roadmap with owners", eta: "Week 2-3" },
    { priority: "P2", title: "Launch first measurable initiative", eta: "Week 3-4" },
  ],
  timeline: [
    { phase: "Discovery", range: "Week 1", focus: "Research, alignment, baseline metrics." },
    { phase: "Planning", range: "Week 2", focus: "Strategy doc, stakeholder reviews, scope lock." },
    { phase: "Execution", range: "Weeks 3-5", focus: "Build, measure, iterate weekly." },
    { phase: "Review", range: "Week 6", focus: "Retro, adjust roadmap for next quarter." },
  ],
  milestones: [
    "Strategy approved by leadership (end of week 2).",
    "First measurable initiative live (end of week 3).",
    "Mid-cycle review with KPI delta (end of week 4).",
    "Final retro and Q+1 plan (end of week 6).",
  ],
  risks: [
    "Stakeholder availability may slow validation.",
    "Scope creep around adjacent requests.",
    "Dependency on data infrastructure readiness.",
  ],
});

export const mockResearch = (topic: string) => ({
  summary: `Across recent sources, ${topic || "this topic"} is moving from early experimentation into operational adoption. Leaders are consolidating tooling, while challengers differentiate on workflow depth and integrations. Expect continued price compression and rising buyer expectations around reliability and governance.`,
  findings: [
    "Market growing at ~28% CAGR with strong enterprise pull.",
    "Top 3 vendors hold ~55% market share; long tail of vertical players.",
    "Procurement cycles shortening as ROI becomes clearer.",
    "Integration breadth is the #1 buyer evaluation criterion.",
  ],
  opportunities: [
    "Underserved mid-market segment with budget and urgency.",
    "Vertical-specific workflows (healthcare, legal, finance).",
    "Embedded experiences inside existing collaboration suites.",
  ],
  risks: [
    "Regulatory shifts around data residency and AI governance.",
    "Margin pressure from open-source alternatives.",
    "Talent scarcity for applied ML engineers.",
  ],
  references: [
    { title: "State of the Market 2025 Report", source: "Industry Insights" },
    { title: "Enterprise Buyer Survey Q2", source: "Forrester" },
    { title: "Vendor Landscape Analysis", source: "Gartner" },
    { title: "Practitioner Interviews (n=42)", source: "Internal Research" },
  ],
});
