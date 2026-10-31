// The whole site reads from here. Facts come from Aditya's resume; the copy
// around them is written for the portfolio.

export const site = {
  name: 'Aditya Mane',
  firstName: 'Aditya',
  lastName: 'Mane',
  role: 'Full-stack developer',
  focus: 'AI systems & realtime products',
  location: 'Kolhapur, India',
  city: 'Kolhapur, IN',
  timezone: 'Asia/Kolkata',
  coords: '16.7050° N / 74.2433° E',
  email: 'adityamane4650@gmail.com',
  phone: '+91 96735 94650',
  github: 'https://github.com/Adityamane10',
  linkedin: 'https://linkedin.com/in/aditya-mane-374b1b264',
  available: true,
  availability: 'Open to full-stack & AI engineering roles',
  intro:
    'Full-stack developer building responsive web apps, REST APIs, database-driven systems, and realtime products — with a growing focus on LLM-powered workflows.',
  shortIntro:
    'I turn complicated workflows into clear, fast products. React on the surface, Node or FastAPI underneath, and occasionally a language model doing the tedious part.',
  marquee: [
    'React.js',
    'TypeScript',
    'Node.js',
    'FastAPI',
    'PostgreSQL',
    'LangGraph',
    'Socket.IO',
    'MongoDB',
  ],
}

export const socials = [
  {
    label: 'GitHub',
    handle: '@Adityamane10',
    href: site.github,
  },
  {
    label: 'LinkedIn',
    handle: 'in/aditya-mane',
    href: site.linkedin,
  },
  {
    label: 'Email',
    handle: site.email,
    href: `mailto:${site.email}`,
  },
]

export const stats = [
  { value: '03', label: 'selected builds' },
  { value: '06', label: 'AI agent tools' },
  { value: '27', label: 'backend tests' },
]

export const principles = [
  {
    title: 'Clarity is a feature',
    body: 'The best interface makes the next step obvious. I care about hierarchy, empty states, and the unglamorous edge cases that decide whether a product feels solid.',
  },
  {
    title: 'Own the whole loop',
    body: 'Schema, API, interface, deployment. I would rather understand the seam between layers than throw work over a wall and hope the next person catches it.',
  },
  {
    title: 'Make it feel alive',
    body: 'Motion, feedback, and realtime details — just enough to make software feel human, never enough to get between you and the thing you came to do.',
  },
]

export type VisualKind = 'crm' | 'soccer' | 'chat'

export interface Highlight {
  value: string
  label: string
  detail: string
}

export interface Project {
  slug: string
  index: string
  title: string
  category: string
  summary: string
  type: string
  accent: string
  visual: VisualKind
  featured?: boolean
  stack: string[]
  role: string[]
  highlights: Highlight[]
  brief: string
  build: string[]
  notes: { label: string; value: string }[]
}

export const projects: Project[] = [
  {
    slug: 'crm-hcp',
    index: '01',
    title: 'CRM HCP',
    category: 'AI systems / Full-stack',
    summary:
      'An AI-assisted CRM module that turns free-form healthcare notes into structured, compliance-checked records — with a human still on the save button.',
    type: 'AI-enabled workflow',
    accent: '#D6FF45',
    visual: 'crm',
    featured: true,
    stack: ['React.js', 'Redux', 'FastAPI', 'PostgreSQL', 'LangGraph', 'Groq', 'Docker'],
    role: ['Full-stack development', 'Agent workflow', 'Data modelling'],
    highlights: [
      {
        value: '06',
        label: 'agent tools',
        detail: 'Extraction, validation, classification, linking, summarising, and drafting.',
      },
      {
        value: '01',
        label: 'human checkpoint',
        detail: 'Every generated record is reviewed before anything is persisted.',
      },
      {
        value: '02',
        label: 'layers of trust',
        detail: 'Compliance validation runs alongside the LLM extraction, not after it.',
      },
    ],
    brief:
      'Healthcare professional interactions rarely arrive as clean data. They arrive as a paragraph of notes — context, products, follow-ups, all tangled together. The module needed to turn that into a record a team could actually trust.',
    build: [
      'I designed the flow around one loop: capture the note, let the agent extract structured fields, show its work, and put a human in front of the save button. React and Redux hold the interaction layer; FastAPI and PostgreSQL hold the contract underneath.',
      'LangGraph orchestrates six tools against a Groq-hosted model for extraction and guided record creation. Compliance validation runs alongside extraction, and nothing is persisted until the draft has been reviewed. Docker keeps the environment consistent from development to handoff.',
    ],
    notes: [
      { label: 'Surface', value: 'React / Redux' },
      { label: 'Engine', value: 'FastAPI / PostgreSQL' },
      { label: 'Intelligence', value: 'LangGraph / Groq' },
      { label: 'Agent tools', value: '06' },
    ],
  },
  {
    slug: 'soccer-solver',
    index: '02',
    title: 'Soccer Solver',
    category: 'Data / Algorithms',
    summary:
      'Making three disagreeing football datasets line up — one player, one identity, one explainable ranking.',
    type: 'Independent build',
    accent: '#FFB05C',
    visual: 'soccer',
    stack: ['Data integration', 'Fuzzy matching', 'Ranking', 'Testing'],
    role: ['Data engineering', 'Algorithm design', 'Test coverage'],
    highlights: [
      {
        value: '03',
        label: 'datasets unified',
        detail: 'Different names, fields, and identifiers normalized into one view.',
      },
      {
        value: '27',
        label: 'backend tests',
        detail: 'Matching, ranking, confidence scoring, and the edge cases in between.',
      },
      {
        value: '01',
        label: 'main idea',
        detail: 'If the identity is wrong, the ranking is noise. Fix the match first.',
      },
    ],
    brief:
      'Three datasets, three naming conventions, three definitions of what a player record is. Before any ranking could be trusted, the same human had to be recognized across all of them.',
    build: [
      'I built a pipeline that merged and normalized the datasets, then used fuzzy matching to reconcile player identities without flattening genuinely different people. Weighted ranking and confidence scoring made the output comparable and, importantly, explainable.',
      'Twenty-seven backend tests cover the parts that are easy to get subtly wrong: name matching, ranking math, confidence thresholds, and edge cases. The goal was not just a leaderboard — it was a result you could defend.',
    ],
    notes: [
      { label: 'Input', value: '3 raw datasets' },
      { label: 'Matching', value: 'Fuzzy + weighted' },
      { label: 'Coverage', value: '27 tests' },
      { label: 'Output', value: 'Ranked players' },
    ],
  },
  {
    slug: 'realtime-chat',
    index: '03',
    title: 'RealTime Chat',
    category: 'Realtime / Full-stack',
    summary:
      'A messaging app where the tiny signals — typing, delivered, read — do the heavy lifting.',
    type: 'Independent build',
    accent: '#AEB7FF',
    visual: 'chat',
    stack: ['React.js', 'Node.js', 'Socket.IO', 'Testing'],
    role: ['Full-stack development', 'Realtime architecture', 'Testing'],
    highlights: [
      {
        value: '02',
        label: 'conversation modes',
        detail: 'Private one-to-one rooms and group chats, handled by the same event flow.',
      },
      {
        value: '04',
        label: 'live signals',
        detail: 'Messages, typing state, delivery receipts, and read receipts.',
      },
      {
        value: '01',
        label: 'shared state',
        detail: 'The React client and Node backend stay in sync across every open conversation.',
      },
    ],
    brief:
      'A chat app is simple to fake and surprisingly hard to make feel real. The brief: private conversations and group rooms that stay in sync, with the feedback loops that tell you another person is present.',
    build: [
      'The client is structured around conversation state that can survive rapid updates. The Node.js and Socket.IO layer carries messages, typing indicators, and delivery/read state. I kept event names and payloads deliberately boring — realtime gets complicated enough on its own.',
      'Application tests cover the message flow and the state transitions that make the interface trustworthy. The result is a complete conversation loop, not just a demo that sends a string into a box.',
    ],
    notes: [
      { label: 'Transport', value: 'Socket.IO' },
      { label: 'Client', value: 'React.js' },
      { label: 'Server', value: 'Node.js' },
      { label: 'Signals', value: 'Typing / receipts' },
    ],
  },
]

export const bySlug = (slug: string) => projects.find((project) => project.slug === slug)

export interface SkillGroup {
  id: string
  label: string
  count: string
  caption: string
  description: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    count: '07',
    caption: 'The surface',
    description: 'Fast, accessible interfaces with just enough motion to feel considered.',
    items: ['React.js', 'Next.js', 'Redux', 'HTML', 'CSS', 'Bootstrap', 'SASS'],
  },
  {
    id: 'backend',
    label: 'Backend',
    count: '05',
    caption: 'The plumbing',
    description: 'Predictable APIs and clear contracts between the client and the data.',
    items: ['Node.js', 'Express.js', 'NestJS', 'FastAPI', 'REST APIs'],
  },
  {
    id: 'data',
    label: 'Data',
    count: '03',
    caption: 'The memory',
    description: 'Schemas that make the right thing easy and the wrong thing obvious.',
    items: ['PostgreSQL', 'MongoDB', 'MySQL'],
  },
  {
    id: 'ai',
    label: 'AI / LLM',
    count: '07',
    caption: 'The new layer',
    description: 'Agents, tools, and structured extraction that earn their place in a product.',
    items: [
      'LangGraph',
      'Groq',
      'Ollama',
      'OpenRouter',
      'DeepSeek',
      'Local LLMs',
      'Prompt engineering',
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    count: '05',
    caption: 'The workshop',
    description: 'The everyday kit for shipping, debugging, and keeping the lights on.',
    items: ['Git', 'Docker', 'Postman', 'VS Code', 'Socket.IO'],
  },
]

export const experience = [
  {
    period: 'JAN 2026 — JUN 2026',
    role: 'Web Developer Intern',
    org: 'Altair Online Services',
    place: 'Kolhapur',
    bullets: [
      'Built responsive web interfaces with React.js and Bootstrap.',
      'Shipped RESTful APIs with Node.js and Express.js for client data and workflow processing.',
      'Designed and optimized MongoDB schemas for reliable storage and retrieval.',
      'Used AI-assisted development tools for generation, debugging, refactoring, and application logic.',
      'Worked in Git with code reviews and collaborative delivery.',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
  },
]

export const education = [
  {
    year: '2026',
    degree: 'Master of Computer Applications',
    short: 'MCA',
    school: 'KIT College',
    place: 'Kolhapur',
  },
  {
    year: '2024',
    degree: 'Bachelor of Computer Applications',
    short: 'BCA',
    school: 'Vivekanand College',
    place: 'Kolhapur',
  },
  {
    year: '2021',
    degree: 'Higher Secondary Certificate',
    short: 'HSC',
    school: 'The New Model Jr. College',
    place: 'Kolhapur',
  },
]

export const nowItems = [
  'Completed Master of Computer Applications (MCA) at KIT College, Kolhapur.',
  'Looking for full-stack and AI engineering roles.',
  'Going deeper on local LLMs, agent tooling, and evaluation loops.',
]
