import { AnimatePresence, animate, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import { site } from '../../data/site'
import { Mark } from './Mark'

// One short signal check per tab. It is skippable, skipped for reduced motion,
// and never traps the page behind it.
export function Preloader() {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return !window.sessionStorage.getItem('am-preloaded')
  })
  const [count, setCount] = useState(0)

  function dismiss() {
    setShow(false)
    try {
      window.sessionStorage.setItem('am-preloaded', '1')
    } catch {
      // Storage can be blocked; the intro is optional either way.
    }
  }

  useEffect(() => {
    if (!show) return
    document.body.classList.add('is-loading')
    const controls = animate(0, 100, {
      duration: 1.05,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (value) => setCount(Math.round(value)),
    })
    const timer = window.setTimeout(dismiss, 1350)
    return () => {
      controls.stop()
      window.clearTimeout(timer)
      document.body.classList.remove('is-loading')
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader"
          role="dialog"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader__noise" aria-hidden="true" />
          <div className="preloader__top">
            <span>ADITYA MANE / PORTFOLIO</span>
            <span>SIGNAL CHECK — 2026</span>
          </div>

          <div className="preloader__center">
            <motion.div
              initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="preloader__mark"
            >
              <Mark size={72} />
            </motion.div>
            <div className="preloader__name">
              <span>{site.firstName}</span>
              <em>{site.lastName}</em>
            </div>
          </div>

          <div className="preloader__bottom">
            <div className="preloader__track" aria-hidden="true">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
            <span className="preloader__count">{String(count).padStart(3, '0')}</span>
            <button type="button" className="preloader__skip" onClick={dismiss}>
              Skip intro
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
