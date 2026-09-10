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
    'Fullstack when it is needed',
  ],
  lede:
    'I build backends and the deployment plumbing around them. Most of that work is Frappe/ERPNext right now: immutable images, rollouts that do not drop requests, and an AI layer running beside it.',
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
    'I am a backend-leaning engineer who enjoys the unglamorous parts: schema design, deployment reliability, and making a system boring enough to sleep through the night. Most of my recent work sits around **Frappe/ERPNext**: packaging it into immutable container images, shipping zero-downtime rollouts, and wiring it to AI services.',
    'Before that I shipped internal HR and recruitment tools at **PT INKA (Persero)**, an OTA firmware update system for ESP8266 devices, and a handful of Laravel and Next.js applications. I like learning by building the whole thing.',
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
    name: 'PKWT Workforce Tracking',
    tag: 'PT INKA',
    blurb:
      'Internal dashboard tracking contract periods of PKWT employees, with reminders before contracts expire and role-scoped access for HR.',
    tech: ['Laravel', 'Tailwind CSS', 'Alpine.js', 'MySQL'],
    href: 'https://github.com/m-fadil/Project-SDM_Tracking-PKWT',
  },
  {
    name: 'OTA Firmware Update',
    tag: 'IoT',
    blurb:
      'Over-the-air firmware delivery for ESP8266 fleets: a server that versions builds, and devices that pull and flash updates themselves.',
    tech: ['Python', 'Node.js', 'ESP8266'],
    href: 'https://github.com/m-fadil/OTAUpdate-Firmware-ESP8266',
  },
  {
    name: 'dot-nix',
    tag: 'Dotfiles',
    blurb:
      'My NixOS configuration as a flake, split by function (system, shell, editors, dev runtimes, apps) so a laptop rebuild is one command instead of one weekend.',
    tech: ['Nix', 'Flakes', 'Home Manager'],
    href: 'https://github.com/m-fadil/dot-nix',
  },
  {
    name: 'frappe-builder',
    tag: 'Platform',
    blurb:
      'Production build harness for custom Frappe/ERPNext images: BuildKit secret mounts so credentials never land in layers, accumulating shared assets so a mid-rollout request never 404s, dynamic DNS resolution in Nginx, and multi-arch releases with build provenance.',
    tech: ['Docker', 'Shell', 'Nginx', 'GitHub Actions'],
    href: 'https://github.com/m-fadil/frappe-builder',
  },
  {
    name: 'retrieval-service',
    tag: 'AI',
    blurb:
      'AI gateway for Frappe: RAG on top of Qdrant, MCP tool calling into Frappe, and an LLM as the reasoning layer. Frappe itself runs no models, so no embeddings and no GPU.',
    tech: ['TypeScript', 'Fastify', 'Qdrant', 'Zod', 'Docker'],
    href: 'https://github.com/m-fadil/retrieval-service',
  },
  {
    name: 'frappe-executable',
    tag: 'Tooling',
    blurb:
      'Five shell scripts for the Frappe chores nobody wants to retype: bootstrapping a bench, cloning production into dev without spamming customers, and minting API users. No hardcoded hosts or passwords, every knob is an env var.',
    tech: ['Shell', 'Frappe', 'Bench'],
    href: 'https://github.com/m-fadil/frappe-executable',
  },
]

export const socials = [
  { label: 'GitHub', href: 'https://github.com/m-fadil' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/fadhila-ikhsani/' },
  { label: 'Twitter', href: 'https://twitter.com/FadhilaIkhsani' },
  { label: 'Instagram', href: 'https://www.instagram.com/fadhila_ikhsani/' },
] as const
