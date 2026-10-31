# Portfolio

React, TypeScript, and Vite portfolio hosted on GitHub Pages.

## Content

The portfolio focuses on Node.js/TypeScript, NestJS, and custom application development with Frappe Framework. `src/content.ts` owns the profile, skills, AI-assisted development workflow (Claude Code, Codex, OpenCode, and Pi), and selected public projects. Configuration repositories and private source links are excluded; organization-hosted NestJS work is described without publishing internal project details. Go is presented as an interest, not an established skill.

The public `frappe-api` project highlights endpoint decorators, request validation, configurable API logging, and runtime access controls. It is listed separately from the archived `frappe-backend-v1` toolkit.

Keep the static role in sync with the title/social metadata in `index.html` and the preview image in `public/og.png`. Structured data derives the role and introduction from the profile at build time.


## Development and production

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run build
npm run preview
```

Deploy the generated `dist/` directory. Use `npm run build`, not `vite build` directly: the npm command also prerenders the homepage. The existing GitHub Actions workflow already uses this command and deploys on `v*` tags or manual dispatch.

## SEO rendering

- `index.html` owns the title, description, canonical URL, and social metadata.
- `src/entry-server.tsx` renders the same `App` used by the browser and generates `ProfilePage`/`Person` JSON-LD from `src/content.ts`.
- `scripts/prerender.mjs` inserts that markup and structured data into `dist/index.html` after the Vite build. It reads the canonical URL from the built HTML and fails if the canonical or root placeholder is missing.
- Production hydrates the existing markup; the development server renders on the client. Keep browser-only APIs inside effects or event handlers so build-time rendering remains safe, and keep initial render state deterministic for hydration.
- No application server is required in production. Content and links remain available with JavaScript disabled.

When changing the production domain, update the canonical/social URLs in `index.html`, `public/sitemap.xml`, and the sitemap URL in `public/robots.txt` together. Structured data derives its URLs from the canonical.

Before deployment, preview the production build, disable JavaScript to check the profile/projects/contact, then enable it to check animation, section navigation, and hydration errors. Verify indexing with Google Search Console after deployment; local audits cannot establish indexing or real-user Core Web Vitals.
