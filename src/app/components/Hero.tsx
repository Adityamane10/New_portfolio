import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

import { site, stats } from '../../data/site'
import { Magnetic } from './motion'
import { Mark } from './Mark'
import { Orb } from './Orb'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  const reveal = (delay: number) => ({
    initial: reduce ? false : { y: '112%' },
    animate: { y: 0 },
    transition: { duration: 1.1, delay, ease },
  })

  return (
    <section className="hero" id="top">
      <div className="container hero__meta">
        <span>Portfolio / 2026</span>
        <span className="hero__meta-center">
          Full-stack developer <i>✳</i> AI systems
        </span>
        <span className="status status--small">
          <i aria-hidden="true" />
          Open to opportunities
        </span>
      </div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 className="hero__name">
            <span className="hero__name-mask">
              <motion.span {...reveal(0.15)}>{site.firstName}</motion.span>
            </span>
            <span className="hero__name-mask hero__name-mask--serif">
              <motion.span {...reveal(0.26)}>
                {site.lastName}
                <Mark className="hero__name-mark" size={36} />
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="hero__statement"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
          >
            <span className="hero__statement-lead">I build</span>
            interfaces that <em>think.</em>
          </motion.p>

          <motion.p
            className="hero__intro"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.68, ease }}
          >
            {site.shortIntro}
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease }}
          >
            <Magnetic>
              <Link
                to="/#work"
                className="btn btn--primary"
                data-cursor="view"
                data-cursor-label="SEE WORK"
              >
                Explore the work
                <ArrowUpRight size={18} strokeWidth={1.8} />
              </Link>
            </Magnetic>
            <Link to="/about" className="btn btn--ghost">
              More about me
              <ArrowRight size={17} strokeWidth={1.7} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.35, ease }}
        >
          <Orb />
        </motion.div>
      </div>

      <div className="container hero__foot">
        <div className="hero__stats">
          {stats.map((stat) => (
            <div className="hero__stat" key={stat.label}>
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        <a href="#work" className="hero__scroll" aria-label="Scroll to selected work">
          <span className="hero__scroll-line" aria-hidden="true" />
          <span>Scroll to explore</span>
          <ArrowDown size={14} strokeWidth={1.6} />
        </a>

        <p className="hero__now">
          <span>Now</span>
          Finishing MCA · open to full-stack roles
        </p>
      </div>
    </section>
  )
}
