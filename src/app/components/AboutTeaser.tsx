import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

import { principles, site } from '../../data/site'
import { IdentityCard } from './IdentityCard'
import { Reveal } from './motion'
import { SectionHead } from './SectionHead'

const ease = [0.22, 1, 0.36, 1] as const

export function AboutTeaser() {
  const [open, setOpen] = useState(0)

  return (
    <section id="about" className="section container about-section">
      <SectionHead
        index="02"
        label="About"
        title={[
          <>More engineer</>,
          <>
            than <em>magician.</em>
          </>,
        ]}
        note="The interesting work usually lives between the layers — data model, API, state, interface."
      />

      <div className="about-teaser">
        <Reveal className="about-teaser__card" y={36}>
          <IdentityCard />
          <p className="about-teaser__caption">
            <span>Profile / 001</span>
            <span>{site.coords}</span>
          </p>
        </Reveal>

        <div className="about-teaser__body">
          <Reveal>
            <p className="about-teaser__lede">
              I like the part where the messy thing becomes <em>obvious.</em>
            </p>
          </Reveal>

          <Reveal delay={0.08} className="about-teaser__copy">
            <p>
              I’m Aditya, a full-stack developer from {site.location}. I’ve built
              responsive interfaces, REST APIs, database-backed systems, and realtime
              applications — and lately I’ve been spending most of my curiosity on LLM
              workflows and agent tools.
            </p>
            <p>
              I’m finishing an MCA at KIT College and looking for a team where I can own
              the whole loop: the schema, the endpoint, the interaction, and the little
              details that make the product feel finished.
            </p>
          </Reveal>

          <div className="principles">
            {principles.map((principle, index) => {
              const isOpen = open === index
              return (
                <Reveal key={principle.title} delay={0.04 * index}>
                  <div className="principle">
                    <button
                      type="button"
                      className="principle__trigger"
                      onClick={() => setOpen(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                      aria-controls={`principle-${index}`}
                    >
                      <span className="principle__index">0{index + 1}</span>
                      <span className="principle__title">{principle.title}</span>
                      <span className="principle__icon" aria-hidden="true">
                        <Plus size={15} strokeWidth={1.8} />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`principle-${index}`}
                          className="principle__panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease }}
                        >
                          <p>{principle.body}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.1}>
            <Link to="/about" className="text-link">
              The longer story
              <ArrowUpRight size={16} strokeWidth={1.7} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
