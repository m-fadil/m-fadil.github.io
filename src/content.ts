export const profile = {
  first: 'Mukhammad',
  last: 'Fadhila Ikhsani',
  avatar: '/avatar.webp',
  email: 'wrk.fadil@gmail.com',
  location: 'Malang, Indonesia',
  role: 'Backend Developer',
  lede:
    'I build backend applications with Node.js, TypeScript, and NestJS, and develop custom business applications with Frappe Framework. My focus is on APIs, integrations, and the business logic behind application workflows.',
  stats: [
    { value: '5+', label: 'years writing code' },
    { value: 'UTC+7', label: 'Malang, Indonesia' },
  ],
} as const

export const sections: readonly { id: string; num: string; label: string; title?: string }[] = [
  { id: 'about', num: '01', label: 'About' },
  { id: 'stack', num: '02', label: 'Stack' },
  { id: 'work', num: '03', label: 'Work', title: 'Selected work' },
  { id: 'contact', num: '04', label: 'Contact' },
]

export const marquee = ['Node.js', 'TypeScript', 'NestJS', 'Frappe Framework', 'Python', 'Fastify', 'PostgreSQL', 'Prisma', 'MongoDB']

export const about = {
  paragraphs: [
    'I focus on **backend development**: building APIs, integrating services, and translating business requirements into application logic. I work with **Node.js, TypeScript, and NestJS**, alongside Python and **Frappe Framework** for custom business applications. My NestJS work lives in organization repositories rather than on my personal GitHub.',
    'My projects span business workflows, service integrations, and developer tools. I also work with databases and deployment tooling to support the applications I build. I am interested in exploring **Go** for backend development.',
    'I use **AI coding agents** throughout my development workflow: code exploration, implementation, debugging, code review, and testing. My tools include **Claude Code, Codex, OpenCode, and Pi**. I review generated changes and validate the results rather than treating agent output as finished work.',
  ],
  quote: 'Build things, break things, learn things.',
  facts: [
    { k: 'Focus', v: 'Backend development · APIs · Integrations' },
    { k: 'Applications', v: 'Custom business apps · Internal tools · Service integrations' },
    { k: 'Education', v: 'B.Eng. Computer Engineering, Universitas Brawijaya' },
    { k: 'Workflow', v: 'AI-assisted development · Code review · Testing' },
    { k: 'Open to', v: 'Node.js / NestJS and Frappe roles & projects' },
  ],
} as const

export const stack = [
  { title: 'Backend', items: ['Node.js', 'TypeScript', 'NestJS', 'Python', 'Frappe Framework', 'Fastify'] },
  { title: 'Database & Data', items: ['PostgreSQL', 'MariaDB', 'MongoDB', 'Prisma', 'Redis', 'Qdrant'] },
  { title: 'Supporting Tools', items: ['Git', 'Docker', 'GitHub Actions'] },
  { title: 'AI-assisted Development', items: ['Claude Code', 'Codex', 'OpenCode', 'Pi'] },
] as const

export type Project = {
  name: string
  tag: string
  blurb: string
  tech: string[]
  href: string
}

export const projects: Project[] = [
  {
    name: 'WhatsApp Bot',
    tag: 'Node.js',
    blurb:
      'A TypeScript bot with command routing, MongoDB-backed group tags and membership management, and image-to-sticker processing through the Baileys WhatsApp integration.',
    tech: ['Node.js', 'TypeScript', 'Baileys', 'MongoDB', 'Mongoose'],
    href: 'https://github.com/m-fadil/baileys-whatsapp-bot',
  },
  {
    name: 'frappe-api',
    tag: 'Frappe',
    blurb:
      'A REST API toolkit for Frappe with endpoint decorators, DTO-based request handling and validation pipes, configurable API logging with sensitive-field masking, and runtime controls for API availability and guest access.',
    tech: ['Python', 'Frappe Framework', 'REST API', 'API Logging'],
    href: 'https://github.com/m-fadil/frappe-api',
  },
  {
    name: 'Frappe API Toolkit',
    tag: 'Frappe',
    blurb:
      'An earlier, now archived Frappe toolkit for DTO-based request validation, consistent API error responses, and database transaction handling.',
    tech: ['Python', 'Frappe Framework', 'API Validation'],
    href: 'https://github.com/m-fadil/frappe-backend-v1',
  },
  {
    name: 'PKWT Workforce Tracking',
    tag: 'Business App',
    blurb:
      'An internal application for tracking employee contract periods, with expiry reminders and role-scoped access for HR workflows.',
    tech: ['PHP', 'Laravel', 'MySQL', 'Alpine.js'],
    href: 'https://github.com/m-fadil/Project-SDM_Tracking-PKWT',
  },
  {
    name: 'frappe-executable',
    tag: 'Developer Tool',
    blurb:
      'A Rust CLI for recurring Frappe tasks: setting up a bench, restoring backups, disabling outbound integrations on development copies, and creating API users. Distributed as a standalone Linux binary.',
    tech: ['Rust', 'Frappe', 'CLI'],
    href: 'https://github.com/m-fadil/frappe-executable',
  },
]

export const socials = [
  { label: 'GitHub', href: 'https://github.com/m-fadil' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/fadhila-ikhsani/' },
  { label: 'X', href: 'https://x.com/FadhilaIkhsani' },
  { label: 'Instagram', href: 'https://www.instagram.com/fadhila_ikhsani/' },
] as const
