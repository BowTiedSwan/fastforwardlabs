export type Service = {
  slug: string;
  number: string;
  name: string;
  prompt: string;
  summary: string;
  formats: string;
  headline: string;
  introduction: string;
  audience: string;
  outcomes: string[];
  tiers: { name: string; format: string; description: string; deliverables: string[] }[];
  examplesTitle: string;
  examples: { title: string; description: string }[];
  steps: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "ai-audit-advisory",
    number: "01",
    name: "AI Audit & Advisory",
    prompt: "Find your starting point.",
    summary: "Identify where AI can help, make a plan, and get the guidance to follow through.",
    formats: "Audit call · Roadmap · Fractional Chief AI Officer",
    headline: "Know where AI belongs in your business.",
    introduction: "You have ideas, tools, and plenty of advice. What you need is a clear view of what will make a difference in your business. We help you choose the right priorities and turn them into a plan you can act on.",
    audience: "Founders, executives, and operations leaders deciding where to invest in AI, or looking for an experienced partner to lead the work.",
    outcomes: ["A clear next step tied to a real business problem", "Priorities based on value, feasibility, and the way your team works", "The right level of guidance, from a single call to embedded leadership"],
    tiers: [
      {
        name: "AI audit call",
        format: "Start here",
        description: "Bring the process, bottleneck, or AI question you want to work through. We look at the situation together and identify the most useful next step.",
        deliverables: ["Discuss your goals, current tools, and where work gets stuck", "Explore practical opportunities and constraints", "Decide whether you need a deeper audit, a build, or training"],
      },
      {
        name: "Operational audit & roadmap",
        format: "Focused engagement",
        description: "A deeper review of the workflows and systems in scope, with a prioritized plan for implementation.",
        deliverables: ["Workflow mapping with the people doing the work", "Opportunity assessment, tool choices, and dependencies", "Sequenced roadmap with owners and success measures"],
      },
      {
        name: "Ongoing AI advisory",
        format: "Recurring guidance",
        description: "A business-specific sounding board as tools change, projects progress, and new decisions come up.",
        deliverables: ["Strategy calls and briefings relevant to your business", "Tool and vendor evaluation", "Roadmap reviews and implementation guidance"],
      },
      {
        name: "Fractional Chief AI Officer",
        format: "Embedded leadership",
        description: "Senior AI leadership without a full-time hire. We work with your leadership team to connect strategy, implementation, and adoption.",
        deliverables: ["AI investment priorities and leadership-team support", "Vendor decisions and implementation oversight", "Adoption planning, outcome reviews, and internal hiring guidance"],
      },
    ],
    examplesTitle: "The questions we help you answer",
    examples: [
      { title: "Where do we start?", description: "Find the workflow worth improving first, with the likely value and effort made explicit." },
      { title: "Should we buy or build?", description: "Compare off-the-shelf tools, integrations, and custom systems against what your business needs." },
      { title: "Who owns this?", description: "Give AI initiatives clear decision-makers, delivery responsibilities, and a way to measure progress." },
    ],
    steps: [
      { title: "Understand the business", description: "Start with your goals, constraints, and the work taking too much time." },
      { title: "Choose the priorities", description: "Assess where AI is useful, what needs fixing first, and how to sequence the work." },
      { title: "Put the plan to work", description: "Take the roadmap to your team, engage us to build, or keep us involved as your AI lead." },
    ],
    faqs: [
      { question: "Is the audit call a full business audit?", answer: "The call is a focused starting conversation. A deeper operational audit is a separate, scoped engagement with workflow mapping and a written roadmap." },
      { question: "Does advisory include implementation?", answer: "Advisory covers decisions and guidance. Hands-on builds are scoped separately. A fractional leadership engagement can coordinate that delivery, with responsibilities and capacity agreed upfront." },
      { question: "Do we have to go through every level?", answer: "No. Start with the engagement that fits your situation. If you already have a clear build or training brief, we can discuss it directly." },
    ],
  },
  {
    slug: "business-automation",
    number: "02",
    name: "Business Automation",
    prompt: "Get the busywork handled.",
    summary: "Connect your tools and automate the repetitive processes slowing down your business.",
    formats: "One-time build · Build + ongoing support",
    headline: "Get repetitive work off your team’s plate.",
    introduction: "Leads waiting for a reply. Documents chased by email. The same data entered twice. We build AI-powered workflows around your operations so work moves forward without someone having to remember every step.",
    audience: "Business owners and operations teams with a recurring bottleneck, disconnected tools, or too many manual handoffs.",
    outcomes: ["A working system connected to the tools your team uses", "Clear rules for routine tasks, exceptions, and human handoffs", "A choice between owning the system yourself and keeping us involved"],
    tiers: [
      {
        name: "Build & handover",
        format: "One-time engagement",
        description: "We design, build, and test the workflow, then hand it over with the documentation and training your team needs to run it.",
        deliverables: ["Workflow discovery and agreed project scope", "AI configuration and integrations with your existing tools", "Testing with real scenarios and exception handling", "Documentation, access handover, and operator training"],
      },
      {
        name: "Build + ongoing support",
        format: "Setup + recurring support",
        description: "The same complete build, with continued help keeping it running as your tools, processes, and business change.",
        deliverables: ["Everything in Build & handover", "Agreed monitoring and troubleshooting", "Maintenance of integrations and AI configurations", "Performance reviews and a scoped improvement backlog"],
      },
    ],
    examplesTitle: "Start with the work that keeps piling up",
    examples: [
      { title: "Lead intake & follow-up", description: "Capture inquiries, qualify them against your criteria, route them to the right person, and trigger follow-up." },
      { title: "Documents & data entry", description: "Request missing documents, extract the information you need, and move it into the right system." },
      { title: "Reporting & updates", description: "Pull information from your tools and prepare recurring reports or client updates for review." },
      { title: "Support & service requests", description: "Handle routine questions, classify incoming requests, and pass exceptions to your team." },
    ],
    steps: [
      { title: "Map one bottleneck", description: "Understand the inputs, tools, handoffs, and what a successful result looks like." },
      { title: "Build and test", description: "Connect the workflow and test normal cases, failures, and human escalation before handover." },
      { title: "Hand over or stay involved", description: "Train your operator and document the system, or add ongoing support with clear responsibilities." },
    ],
    faqs: [
      { question: "Can this be a one-time project?", answer: "Yes. Build & handover is designed for that. Your team takes over day-to-day operation after the agreed acceptance and handover. We document how the system works and what needs attention." },
      { question: "Will we still need to maintain it?", answer: "Software, APIs, and business processes change. A one-time build does not mean zero maintenance forever. Your team can own that work, or we can provide ongoing support." },
      { question: "Are software and AI usage costs included?", answer: "We identify hosting, software licenses, and model usage costs in the proposal so you can see the ongoing cost of running the system alongside the engagement fee." },
      { question: "Does support include new automations?", answer: "Support covers the maintenance and improvements agreed in your scope. New workflows or significant changes are scoped separately, so both teams know what is included." },
    ],
  },
  {
    slug: "ai-training",
    number: "03",
    name: "AI Training",
    prompt: "Bring your people with you.",
    summary: "Practical training for executives making decisions and staff putting AI to use every day.",
    formats: "C-suite sessions · Staff workshops · Team programs",
    headline: "Give your people the skills to put AI to use.",
    introduction: "A tool license is only the beginning. We help leaders understand what to invest in and help staff build repeatable ways to use AI in their own work. Sessions are shaped around your team, its tools, and its day-to-day tasks.",
    audience: "C-suite teams, department heads, and staff who need practical AI skills they can apply inside the business.",
    outcomes: ["Leaders who can evaluate opportunities and make informed AI decisions", "Staff who can use AI for real tasks and check the results", "Reusable workflows and materials your team can keep using"],
    tiers: [
      {
        name: "Executive AI sessions",
        format: "For the C-suite & leadership",
        description: "A focused briefing or workshop to build a shared understanding of AI and the decisions ahead for your business.",
        deliverables: ["Relevant capabilities, limitations, and business use cases", "Frameworks for evaluating tools and investments", "Hands-on exploration of leadership tasks", "An action plan for priorities and next steps"],
      },
      {
        name: "Practical staff workshops",
        format: "For the people doing the work",
        description: "Hands-on sessions using the tasks your team already does, so useful habits carry over into the working week.",
        deliverables: ["Exercises tailored to roles and existing tools", "Research, drafting, analysis, and workflow practice", "Output checking and appropriate use of company information", "Reusable examples and take-home reference materials"],
      },
      {
        name: "Team adoption program",
        format: "Training + follow-through",
        description: "A series of sessions and follow-up support for organizations that want AI use to become an everyday capability.",
        deliverables: ["Role-specific learning plan and workshop series", "Practice between sessions and office hours", "Support for internal champions", "Adoption reviews and refined team workflows"],
      },
    ],
    examplesTitle: "Different roles. Different skills.",
    examples: [
      { title: "Executives", description: "Evaluate an AI proposal, compare vendors, prioritize investment, and understand where human judgment belongs." },
      { title: "Operations & customer teams", description: "Work through documents, summarize requests, improve handoffs, and check AI-assisted responses." },
      { title: "Marketing & knowledge teams", description: "Research, draft, analyze, and repurpose work with a consistent review process." },
    ],
    steps: [
      { title: "Understand the team", description: "Agree on participants, current experience, tools, and the work they want to improve." },
      { title: "Learn by doing", description: "Run practical sessions around relevant tasks, with room to experiment and ask questions." },
      { title: "Make it repeatable", description: "Leave with reusable workflows and materials, with follow-up sessions if you need them." },
    ],
    faqs: [
      { question: "Can executives and staff attend different sessions?", answer: "Yes. Leadership sessions focus on decisions, investment, and adoption. Staff workshops focus on the tasks people perform. We can deliver either track independently or combine them into a program." },
      { question: "Does the team need technical experience?", answer: "No. We shape the sessions around participants' current experience. The goal is to help people use AI well in their role, not to turn every employee into an engineer." },
      { question: "Can training be part of a system build?", answer: "Yes. Operator handover is part of our build engagements. Broader staff workshops or executive training can be added when you want adoption across a department or the whole business." },
    ],
  },
  {
    slug: "ai-content-systems",
    number: "04",
    name: "AI Content Systems",
    prompt: "Build your publishing engine.",
    summary: "Turn research and expertise into a repeatable content pipeline, with your editorial standards built in.",
    formats: "System setup · Setup + ongoing support",
    headline: "A content engine built around your expertise.",
    introduction: "Connect the work between finding a story and publishing it. We build AI-managed systems for research, drafting, editorial review, publishing, and performance tracking, with your sources, voice, and standards at the center.",
    audience: "B2B marketing teams, nuclear and energy communicators, and publishers building an owned-media or intelligence operation.",
    outcomes: ["One connected workflow from sources to reviewed, published content", "Editorial control, source context, and brand voice built into the process", "A foundation for search visibility and structured data products"],
    tiers: [
      {
        name: "System setup & handover",
        format: "One-time engagement",
        description: "A content pipeline built for your publication or business, handed over to the editor or team who will operate it.",
        deliverables: ["Source intake, editorial scope, and brand-voice setup", "Research, drafting, verification, and approval workflows", "CMS or publishing integrations and search metadata", "Measurement setup, documentation, and operator training"],
      },
      {
        name: "Setup + ongoing support",
        format: "Build + continued involvement",
        description: "The complete setup, with ongoing technical support and iteration as your coverage, channels, and content needs evolve.",
        deliverables: ["Everything in System setup & handover", "Source and publishing-integration maintenance", "Quality reviews and workflow refinements", "Search and AI-visibility reviews, with scoped improvements"],
      },
    ],
    examplesTitle: "More than a queue of AI-written articles",
    examples: [
      { title: "Research → publication", description: "Monitor sources, triage developments, prepare drafts, and route them through editorial review into your CMS." },
      { title: "Search & AI discoverability", description: "Build clear structure, metadata, source context, and measurement for visibility in search engines and AI answers." },
      { title: "Coverage → data products", description: "Turn information you collect into trackers, directories, or structured datasets with JSON/CSV exports and APIs. Scoped as an extension to either package." },
      { title: "One idea → multiple formats", description: "Adapt approved material for your website, newsletter, or social channels with a shared source of truth." },
    ],
    steps: [
      { title: "Define the editorial system", description: "Agree on the audience, sources, voice, formats, review roles, and what is worth publishing." },
      { title: "Connect the pipeline", description: "Build and test research, production, approval, publishing, and measurement as one workflow." },
      { title: "Run it and improve it", description: "Train your operator, document the system, and choose whether to retain ongoing technical support." },
    ],
    faqs: [
      { question: "Does the system replace our editor?", answer: "Your team keeps editorial judgment and approval. The system handles the production work around that judgment: gathering sources, preparing drafts, checking structure, and moving approved work into publishing." },
      { question: "What do you mean by GEO?", answer: "Generative engine optimization means making content easier for AI answer engines to find, understand, and cite. We work on content structure, source context, technical accessibility, and measurement alongside SEO. Rankings and citations are not guaranteed." },
      { question: "Can we operate it ourselves after setup?", answer: "Yes. The one-time package includes documentation and operator training. Your team owns the ongoing operation and maintenance. Choose continued support if you want us to maintain the technical system and help refine it." },
      { question: "Is a tracker or API included in every build?", answer: "No. Data products are scoped around the information you collect and how you want to use or distribute it. We can include a tracker, dataset, or API in the initial brief or add it later." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
