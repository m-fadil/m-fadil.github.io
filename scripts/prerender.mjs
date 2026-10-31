import { readFile, writeFile } from 'node:fs/promises'
import react from '@vitejs/plugin-react'
import { createServer } from 'vite'

const output = new URL('../dist/index.html', import.meta.url)
const template = await readFile(output, 'utf8')
const canonical = template.match(/<link rel="canonical" href="([^"]+)"\s*\/>/)?.[1]
const root = '<div id="root"></div>'

if (!canonical || !template.includes(root)) {
  throw new Error('Prerender requires a canonical URL and an empty #root in index.html')
}

// Transform TSX with the existing Vite/React toolchain; no runtime server is deployed.
const server = await createServer({
  configFile: false,
  plugins: [react()],
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const { render } = await server.ssrLoadModule('/src/entry-server.tsx')
  const { html, jsonLd } = render(canonical)
  const page = template
    .replace(root, () => `<div id="root">${html}</div>`)
    .replace('</head>', () => `  <script type="application/ld+json">${jsonLd}</script>\n  </head>`)
  await writeFile(output, page)
  console.log('Prerendered homepage and ProfilePage/Person structured data')
} finally {
  await server.close()
}
