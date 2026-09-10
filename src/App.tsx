import { useEffect, useState, type PointerEvent, type ReactNode } from 'react'
import { about, profile, projects, sections, socials, stack } from './content'

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

/** Cycles a mono-typed role line under the headline. */
function useTyped(words: readonly string[]) {
  const [text, setText] = useState(words[0])
  useEffect(() => {
    if (reduced()) return
    let word = 0
    let cut = 0
    let erasing = false
    let timer = 0
    const tick = () => {
      const current = words[word]
      setText(current.slice(0, cut))
      if (!erasing && cut === current.length) {
        erasing = true
        timer = setTimeout(tick, 1800)
        return
      }
      if (erasing && cut === 0) {
        erasing = false
        word = (word + 1) % words.length
      }
      cut += erasing ? -1 : 1
      timer = setTimeout(tick, erasing ? 26 : 60)
    }
    tick()
    return () => clearTimeout(timer)
  }, [words])
  return text
}

const sectionIds = sections.map((s) => s.id)

/** Marks the section currently crossing the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState(sectionIds[0])
  useEffect(() => {
    const pick = () => {
      const mid = innerHeight / 2
      let current = sectionIds[0]
      for (const id of sectionIds) {
        const top = document.getElementById(id)?.getBoundingClientRect().top
        if (top !== undefined && top <= mid) current = id
      }
      setActive(current)
    }
    pick()
    addEventListener('scroll', pick, { passive: true })
    return () => removeEventListener('scroll', pick)
  }, [])
  return active
}

/** Feeds pointer position to CSS for the ambient spotlight. */
function usePointerLight() {
  useEffect(() => {
    const move = (e: globalThis.PointerEvent) => {
      document.body.style.setProperty('--px', `${e.clientX}px`)
      document.body.style.setProperty('--py', `${e.clientY}px`)
    }
    addEventListener('pointermove', move, { passive: true })
    return () => removeEventListener('pointermove', move)
  }, [])
}

/** Renders **bold** spans without pulling in a markdown parser. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) => (i % 2 ? <b key={i}>{part}</b> : part))}
    </>
  )
}

function Section({ id, num, title, children }: { id: string; num: string; title: string; children: ReactNode }) {
  return (
    <section id={id}>
      <h2 className="reveal">
        <span className="num">{num}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function spotlight(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

export default function App() {
  const typed = useTyped(profile.roles)
  const active = useActiveSection()
  usePointerLight()

  return (
    <>
      <div className="canvas" aria-hidden>
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
        <span className="grid" />
        <span className="spot" />
      </div>

      <header className="nav">
        <a className="brand" href="#top">
          <span className="mark">F</span>
          <span>Fadhila Ikhsani</span>
        </a>
        <nav>
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} aria-current={active === s.id || undefined}>
              {s.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-sm" href="https://github.com/m-fadil" target="_blank" rel="noopener">
          GitHub <span aria-hidden>↗</span>
        </a>
      </header>

      <aside className="rail" aria-hidden>
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'on' : undefined} tabIndex={-1}>
            <i />
            {s.num}
          </a>
        ))}
      </aside>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="kicker">
              <span className="dot" /> Available for backend &amp; platform work
            </p>
            <h1>
              <span className="line-1">{profile.first}</span>
              <span className="line-2">{profile.last}</span>
            </h1>
            <p className="role">
              {typed}
              <span className="caret" />
            </p>
            <p className="lede">{profile.lede}</p>
            <div className="cta">
              <a className="btn btn-primary" href="#work">
                See the work
              </a>
              <a className="btn" href={`mailto:${profile.email}`}>
                Start a conversation
              </a>
            </div>
            <ul className="stats">
              {profile.stats.map((s) => (
                <li key={s.label}>
                  <b>{s.value}</b>
                  {s.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-photo">
            <img src={profile.avatar} width={340} height={340} alt={`Portrait of ${profile.first} ${profile.last}`} />
          </div>
        </section>

        <div className="marquee" aria-hidden>
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <span key={copy}>
                {['Frappe / ERPNext', 'Docker', 'TypeScript', 'Fastify', 'NixOS', 'PostgreSQL', 'Qdrant', 'GitHub Actions', 'React'].map(
                  (w) => (
                    <em key={w}>{w}</em>
                  ),
                )}
              </span>
            ))}
          </div>
        </div>

        <Section id="about" num="01" title="About">
          <div className="two-col">
            <div className="prose reveal">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>
                  <Rich text={p} />
                </p>
              ))}
              <p className="quote">{about.quote}</p>
            </div>
            <ul className="facts reveal">
              {about.facts.map((f) => (
                <li key={f.k}>
                  <span>{f.k}</span>
                  {f.v}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="stack" num="02" title="Stack">
          <div className="grid-cards">
            {stack.map((group) => (
              <article key={group.title} className="card reveal" onPointerMove={spotlight}>
                <h3>{group.title}</h3>
                <ul className="chips">
                  {group.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="work" num="03" title="Selected work">
          <div className="grid-cards work">
            {projects.map((p, i) => (
              <article key={p.name} className="card project reveal" onPointerMove={spotlight}>
                <span className="index">{String(i + 1).padStart(2, '0')}</span>
                <header>
                  <h3>{p.name}</h3>
                  <span className="tag">{p.tag}</span>
                </header>
                <p>{p.blurb}</p>
                <ul className="chips">
                  {p.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <a className="link" href={p.href} target="_blank" rel="noopener">
                  Read the source <span aria-hidden>↗</span>
                </a>
              </article>
            ))}
          </div>
          <p className="more">
            <a className="link" href="https://github.com/m-fadil?tab=repositories" target="_blank" rel="noopener">
              All repositories <span aria-hidden>↗</span>
            </a>
          </p>
        </Section>

        <Section id="contact" num="04" title="Contact">
          <div className="contact reveal">
            <p className="lede">
              Got a product, a role, or an ERP that refuses to deploy? Mail lands in one inbox and I read all of it.
            </p>
            <a className="mail" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <ul className="socials">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} Mukhammad Fadhila Ikhsani</span>
        <span>Vite · React · TypeScript — deployed by GitHub Actions</span>
      </footer>
    </>
  )
}
