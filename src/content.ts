export const profile = {
  first: 'Mukhammad',
  last: 'Fadhila Ikhsani',
  avatar: 'https://avatars.githubusercontent.com/u/72676727?v=4',
  email: 'wrk.fadil@gmail.com',
  location: 'Malang, Indonesia',
  roles: [
    'Backend & Platform Engineer',
    'Frappe / ERPNext specialist',
    'Docker, Nix & CI plumbing',
    'Fullstack when the job asks',
  ],
  lede:
    'I work on the unglamorous layer everything else stands on — schemas that survive migrations, deploys that survive Fridays, and ERP systems boring enough to sleep through.',
  stats: [
    { value: '5+', label: 'years writing code' },
    { value: '29', label: 'public repositories' },
    { value: 'UTC+7', label: 'Malang, Indonesia' },
  ],
} as const

export const sections = [
  { id: 'about', num: '01', label: 'About' },
  { id: 'stack', num: '02', label: 'Stack' },
  { id: 'work', num: '03', label: 'Work' },
  { id: 'contact', num: '04', label: 'Contact' },
] as const

export const about = {
  paragraphs: [
    'I am a backend-leaning engineer with a taste for the parts nobody demos: schema design, rollout mechanics, and shaving the sharp edges off systems until an incident becomes a non-event. Most of my recent hours go to **Frappe/ERPNext** — packing it into immutable images, rolling it out without dropping a request, and giving it an AI layer it does not have to host itself.',
    'Before that: internal HR and recruitment tooling at **PT INKA (Persero)**, an over-the-air firmware pipeline for ESP8266 fleets, and a run of Laravel and Next.js applications. The pattern is constant — I learn a system by building the whole of it, then deleting the half that turned out unnecessary.',
  ],
  quote: 'Build things, break things, learn things.',
  facts: [
    { k: 'Focus', v: 'Backend · DevOps · Platform' },
    { k: 'Domain', v: 'ERP (Frappe/ERPNext), internal tools, AI gateways' },
    { k: 'Education', v: 'B.Eng. Computer Engineering, Universitas Brawijaya' },
    { k: 'Daily driver', v: 'NixOS, Helix, Docker/Podman' },
    { k: 'Open to', v: 'Backend / Platform roles & freelance' },
  ],
} as const

export const stack = [
  { title: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'Shell', 'C++', 'Nix'] },
  {
    title: 'Backend & Data',
    items: ['Fastify', 'NestJS', 'Express', 'Laravel', 'Frappe', 'Prisma', 'PostgreSQL', 'MariaDB', 'MongoDB', 'Qdrant', 'Redis'],
  },
  { title: 'Frontend', items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Alpine.js', 'Livewire'] },
  { title: 'Infra & Tooling', items: ['Docker', 'Podman', 'Nginx', 'GitHub Actions', 'NixOS', 'Git', 'MCP / RAG'] },
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
    name: 'frappe-builder',
    tag: 'Platform',
    blurb:
      'Production build harness for custom Frappe/ERPNext images: BuildKit secret mounts so credentials never land in a layer, accumulated shared assets so a mid-rollout request never 404s, runtime DNS resolution in Nginx, multi-arch releases with build provenance.',
    tech: ['Docker', 'Shell', 'Nginx', 'GitHub Actions'],
    href: 'https://github.com/m-fadil/frappe-builder',
  },
  {
    name: 'retrieval-service',
    tag: 'AI',
    blurb:
      'An AI gateway that sits beside Frappe instead of inside it: RAG over Qdrant, MCP tool calls back into Frappe, an LLM as the reasoning layer. Frappe runs no models — no embeddings, no GPU, no bench restart to ship a prompt.',
    tech: ['TypeScript', 'Fastify', 'Qdrant', 'Zod', 'Docker'],
    href: 'https://github.com/m-fadil/retrieval-service',
  },
  {
    name: 'frappe-executable',
    tag: 'Tooling',
    blurb:
      'Five shell scripts for the Frappe chores nobody wants to retype: bootstrapping a bench, cloning production into dev without emailing the customer list, minting API users. No hardcoded host, no hardcoded password — every knob is an env var.',
    tech: ['Shell', 'Frappe', 'Bench'],
    href: 'https://github.com/m-fadil/frappe-executable',
  },
  {
    name: 'PKWT Workforce Tracking',
    tag: 'PT INKA',
    blurb:
      'Internal dashboard tracking fixed-term employment contracts: expiry reminders that fire before HR notices, role-scoped access, and an audit trail for every extension.',
    tech: ['Laravel', 'Tailwind CSS', 'Alpine.js', 'MySQL'],
    href: 'https://github.com/m-fadil/Project-SDM_Tracking-PKWT',
  },
  {
    name: 'OTA Firmware Update',
    tag: 'IoT',
    blurb:
      'Over-the-air firmware delivery for ESP8266 fleets — a server that versions builds, devices that pull and flash themselves, and a rollback path for the build that should not have shipped.',
    tech: ['Python', 'Node.js', 'ESP8266'],
    href: 'https://github.com/m-fadil/OTAUpdate-Firmware-ESP8266',
  },
  {
    name: 'dot-nix',
    tag: 'Dotfiles',
    blurb:
      'My NixOS configuration as a flake, split by function — system, shell, editors, runtimes, apps — so rebuilding a laptop costs one command instead of one weekend.',
    tech: ['Nix', 'Flakes', 'Home Manager'],
    href: 'https://github.com/m-fadil/dot-nix',
  },
]

export const socials = [
  { label: 'GitHub', href: 'https://github.com/m-fadil' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/fadhila-ikhsani/' },
  { label: 'Twitter', href: 'https://twitter.com/FadhilaIkhsani' },
  { label: 'Instagram', href: 'https://www.instagram.com/fadhila_ikhsani/' },
] as const
