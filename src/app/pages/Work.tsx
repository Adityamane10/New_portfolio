import { motion } from 'motion/react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router'

import { bySlug, projects } from '../../data/site'
import { Lines, Reveal } from '../components/motion'
import { ProjectVisual } from '../components/ProjectVisual'

const ease = [0.22, 1, 0.36, 1] as const

export function Work() {
  const { slug } = useParams()
  const project = slug ? bySlug(slug) : undefined
  if (!project) return <Navigate to="/" replace />

  const position = projects.findIndex((item) => item.slug === project.slug)
  const next = projects[(position + 1) % projects.length]

  return (
    <article className="case">
      <div className="container case__top">
        <Link to="/#work" className="back-link">
          <ArrowLeft size={15} strokeWidth={1.7} />
          All work
        </Link>
        <div className="case__top-meta">
          <span>
            Case study {project.index} <i>/ 03</i>
          </span>
          <span>{project.type}</span>
        </div>
      </div>

      <header className="container case__head">
        <div>
          <p className="case__eyebrow">{project.category}</p>
          <Lines as="h1" className="case__title" lines={[project.title]} />
        </div>
        <Reveal className="case__summary" delay={0.15}>
          <p>{project.summary}</p>
        </Reveal>
      </header>

      <motion.div
        className="container case__visual"
        initial={{ opacity: 0, y: 30, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.15, ease }}
      >
        <ProjectVisual project={project} large />
      </motion.div>

      <div className="container case__body">
        <aside className="case__aside">
          <Reveal>
            <div className="case__aside-block">
              <span>Role</span>
              <ul>
                {project.role.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="case__aside-block">
              <span>Built with</span>
              <ul className="case__aside-stack">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="case__aside-block">
              <span>Type</span>
              <p>{project.type}</p>
            </div>
            <div className="case__aside-rule" />
            <p className="case__aside-note">
              Selected from Aditya’s resume. All interface schematics are bespoke
              illustrations, not screenshots.
            </p>
          </Reveal>
        </aside>

        <div className="case__prose">
          <Reveal>
            <span className="case__label">01 / The brief</span>
            <p className="case__lead">{project.brief}</p>
          </Reveal>

          <div className="case__section">
            <Reveal>
              <span className="case__label">02 / The build</span>
            </Reveal>
            {project.build.map((paragraph, index) => (
              <Reveal key={index} delay={0.04 * index}>
                <p className="case__paragraph">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <div className="case__section">
            <Reveal>
              <span className="case__label">03 / What it proves</span>
            </Reveal>
            <div className="case__highlights">
              {project.highlights.map((highlight, index) => (
                <Reveal key={highlight.label} delay={0.05 * index} className="case__highlight">
                  <span className="case__highlight-value">{highlight.value}</span>
                  <span className="case__highlight-label">{highlight.label}</span>
                  <p>{highlight.detail}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="case__notes">
            <div className="case__notes-head">
              <span>
                <i />
                system notes
              </span>
              <span>am / {project.index}</span>
            </div>
            <dl>
              {project.notes.map((note) => (
                <div key={note.label}>
                  <dt>{note.label}</dt>
                  <dd>{note.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <div className="container case__next-wrap">
        <Link to={`/work/${next.slug}`} className="case__next" data-cursor="view" data-cursor-label="NEXT">
          <div className="case__next-top">
            <span>Next case study</span>
            <span>
              {next.index} / 03
            </span>
          </div>
          <div className="case__next-title">
            <h2>{next.title}</h2>
            <span className="case__next-arrow" aria-hidden="true">
              <ArrowUpRight size={28} strokeWidth={1.4} />
            </span>
          </div>
          <p>{next.category}</p>
        </Link>
      </div>
    </article>
  )
}
