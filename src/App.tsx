import { useEffect, useRef, useState, type PointerEvent, type ReactNode, type RefObject } from 'react'
import { about, marquee, profile, projects, sections, socials, stack } from './content'

const sectionIds = sections.map((s) => s.id)

/** Marks the section crossing the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState(sectionIds[0])
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [])
  return active
}

/** Feeds pointer position to the spotlight element, at most once per frame. */
function usePointerLight(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let raf = 0
    const move = (e: globalThis.PointerEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        ref.current?.style.setProperty('--px', `${e.clientX}px`)
        ref.current?.style.setProperty('--py', `${e.clientY}px`)
      })
    }
    addEventListener('pointermove', move, { passive: true })
    return () => {
      removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [ref])
}

/** Renders **bold** spans without pulling in a markdown parser. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) => (i % 2 ? <b key={i}>{part}</b> : part))}
    </>
  )
}

function Section({ id, children }: { id: string; children: ReactNode }) {
  const s = sections.find((x) => x.id === id)!
  return (
    <section id={id}>
      <h2 className="reveal">
        <span className="num">{s.num}</span>
        {s.title ?? s.label}
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
  const active = useActiveSection()
  const spot = useRef<HTMLSpanElement>(null)
  usePointerLight(spot)

  return (
    <>
      <a className="skip" href="#top">
        Skip to content
      </a>
      <div className="canvas" aria-hidden>
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
        <span className="grid" />
        <span className="spot" ref={spot} />
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
              <span className="dot" /> Available for backend development
            </p>
            <h1>
              <span className="line-1">{profile.first}</span>
              <span className="line-2">{profile.last}</span>
            </h1>
            <p className="role">{profile.role}</p>
            <p className="lede">{profile.lede}</p>
            <div className="cta">
              <a className="btn btn-primary" href="#work">
                See my work
              </a>
              <a className="btn" href={`mailto:${profile.email}`}>
                Get in touch
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
                {marquee.map((w) => (
                  <em key={w}>{w}</em>
                ))}
              </span>
            ))}
          </div>
        </div>

        <Section id="about">
          <div className="two-col">
            <div className="prose reveal">
              {about.paragraphs.map((p, i) => (
                <p key={i}>
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

        <Section id="stack">
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

        <Section id="work">
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
                  Source <span aria-hidden>↗</span>
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

        <Section id="contact">
          <div className="contact reveal">
            <p className="lede">
              Looking for a backend developer for a Node.js, NestJS, or Frappe project? Let&apos;s talk.
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
        <span>Vite · React · TypeScript · deployed by GitHub Actions</span>
      </footer>
    </>
  )
}
