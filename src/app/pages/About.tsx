import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'

import { education, experience, nowItems, site } from '../../data/site'
import { IdentityCard } from '../components/IdentityCard'
import { Lines, Reveal } from '../components/motion'

function Subhead({ index, label, title }: { index: string; label: string; title: ReactNode }) {
  return (
    <header className="subhead">
      <div className="subhead__meta">
        <span>{index}</span>
        <span>{label}</span>
        <span className="subhead__rule" aria-hidden="true" />
      </div>
      <Lines as="h2" className="subhead__title" lines={[title]} />
    </header>
  )
}

export function About() {
  return (
    <article className="about-page">
      <section className="container about-hero">
        <div className="about-hero__meta">
          <span>About / Aditya Mane</span>
          <span>Kolhapur, IN — 16.70° N</span>
          <span className="status status--small">
            <i aria-hidden="true" />
            Open to work
          </span>
        </div>

        <Lines
          as="h1"
          className="about-hero__title"
          lines={[
            <>Engineer by training,</>,
            <>
              curious by <em>default.</em>
            </>,
          ]}
        />

        <div className="about-hero__grid">
          <Reveal className="about-hero__lede">
            <p>
              I’m a full-stack developer who likes the whole shape of a product: the data
              it keeps, the API that moves it, the interface that explains it, and the
              details that make it feel alive.
            </p>
          </Reveal>

          <Reveal className="about-hero__facts" delay={0.1}>
            <div>
              <span>Based</span>
              <p>{site.location}</p>
            </div>
            <div>
              <span>Currently</span>
              <p>Completed MCA, KIT College</p>
            </div>
            <div>
              <span>Focus</span>
              <p>Full-stack · AI systems · realtime</p>
            </div>
            <div>
              <span>Status</span>
              <p>Open to full-stack / AI roles</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container about-story">
        <Reveal className="about-story__card" y={34}>
          <IdentityCard />
        </Reveal>

        <div className="about-story__copy">
          <Reveal>
            <p className="about-story__lead">
              I got here by asking “but how does it actually work?” one layer too many
              times.
            </p>
          </Reveal>

          <Reveal delay={0.06} className="about-story__body">
            <p>
              My work sits across the stack. On the surface, that means React and Redux
              interfaces that stay predictable when the data gets messy. Underneath, it
              means FastAPI or Node services, PostgreSQL or MongoDB schemas, and REST
              contracts that are boring in the best way.
            </p>
            <p>
              I interned at Altair Online Services from January to June 2026, building
              responsive interfaces, REST APIs, and MongoDB schemas while working through
              Git-based reviews. Outside of that, I built an AI-enabled CRM workflow with
              LangGraph and Groq, a fuzzy-matching data pipeline with 27 tests, and a
              realtime chat app with private rooms and read receipts.
            </p>
            <p>
              I care about the unglamorous parts: the schema that prevents a bug, the
              loading state nobody forgot, the empty state that tells you what to do next.
              That’s usually where a product starts to feel trustworthy.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="about-story__quote">
            <p>The best code is the code that makes the next person’s job easier.</p>
            <span>That is the bar I work to.</span>
          </Reveal>

          <Reveal delay={0.12}>
            <Link to="/#work" className="text-link">
              See how it looks in practice
              <ArrowUpRight size={16} strokeWidth={1.7} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="container about-experience">
        <Subhead index="01" label="Experience" title={<>The road <em>so far.</em></>} />

        <div className="timeline">
          {experience.map((item) => (
            <Reveal key={item.role} className="timeline__item">
              <div className="timeline__period">{item.period}</div>
              <div className="timeline__main">
                <div className="timeline__heading">
                  <h3>{item.role}</h3>
                  <span>{item.place}</span>
                </div>
                <p className="timeline__org">{item.org}</p>
                <ul className="timeline__bullets">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="timeline__tags">
                  {item.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container about-education">
        <Subhead index="02" label="Education" title={<>The <em>foundations.</em></>} />

        <div className="education">
          {education.map((item) => (
            <Reveal key={item.degree} className="education__row">
              <span className="education__year">{item.year}</span>
              <span className="education__short">{item.short}</span>
              <div className="education__degree">
                <h3>{item.degree}</h3>
                <p>
                  {item.school} <i>—</i> {item.place}
                </p>
              </div>
              <span className="education__index">0{education.indexOf(item) + 1}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container about-now">
        <Subhead index="03" label="Currently" title={<>Right <em>now.</em></>} />
        <div className="now-grid">
          {nowItems.map((item, index) => (
            <Reveal key={item} className="now-card" delay={0.06 * index}>
              <span className="now-card__index">0{index + 1}</span>
              <span className="now-card__pulse" aria-hidden="true" />
              <p>{item}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </article>
  )
}
