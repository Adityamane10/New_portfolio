import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Menu, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'

import { site, socials } from '../../data/site'
import { cx } from '../lib/cx'
import { useLocalTime } from '../lib/useLocalTime'
import { Mark } from './Mark'

const navItems = [
  { id: 'work', label: 'Work', to: '/#work' },
  { id: 'about', label: 'About', to: '/about' },
  { id: 'stack', label: 'Stack', to: '/#stack' },
  { id: 'contact', label: 'Contact', to: '/#contact' },
]

export function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const time = useLocalTime()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [shortcut, setShortcut] = useState('Ctrl K')
  const menuPanel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setShortcut(/Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘ K' : 'Ctrl K')
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (pathname.startsWith('/work/')) {
      setActive('work')
      return
    }
    if (pathname === '/about') {
      setActive('about')
      return
    }
    if (pathname !== '/') {
      setActive('')
      return
    }

    const update = () => {
      const sections = ['work', 'stack', 'contact']
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section))
      if (!sections.length) return

      const line = window.innerHeight * 0.38
      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect()
        return rect.top <= line && rect.bottom > line
      })
      setActive(current?.id ?? '')
    }

    update()
    window.addEventListener('scroll', update, { passive: true })

    // The page transition keeps the new page out of the DOM for a moment, so
    // check again once it has mounted and after the hash scroll settles.
    const timers = [180, 380, 620, 900].map((delay) =>
      window.setTimeout(update, delay),
    )

    return () => {
      window.removeEventListener('scroll', update)
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    document.body.classList.add('menu-open')
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const timer = window.setTimeout(() => menuPanel.current?.focus(), 250)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('menu-open')
    }
  }, [menuOpen])

  return (
    <>
      <header className={cx('nav', scrolled && 'nav--scrolled', menuOpen && 'nav--menu-open')}>
        <div className="nav__bar">
          <Link to="/" className="brand" aria-label={`${site.name} — home`}>
            <span className="brand__mark">
              <Mark size={18} />
            </span>
            <span className="brand__name">Aditya Mane</span>
            <span className="brand__meta">Full-stack / AI</span>
          </Link>

          <nav className="nav__links" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className={cx('nav__link', active === item.id && 'is-active')}
                aria-current={active === item.id ? 'page' : undefined}
              >
                <span className="nav__link-dot" aria-hidden="true" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="nav__right">
            <span className="nav__time">
              {site.city} <b>{time}</b> IST
            </span>
            <button
              type="button"
              className="nav__search"
              onClick={onOpenPalette}
              aria-label="Open quick navigation"
            >
              <Search size={14} strokeWidth={1.8} />
              <span>{shortcut}</span>
            </button>
            <button
              type="button"
              className="nav__menu-button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div
              className="mobile-menu__inner"
              ref={menuPanel}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
            >
              <div className="mobile-menu__meta">
                <span>INDEX / 2026</span>
                <span className="status">
                  <i aria-hidden="true" />
                  {site.availability}
                </span>
              </div>

              <nav className="mobile-menu__links" aria-label="Mobile navigation">
                {navItems.map((item, index) => (
                  <Link
                    key={item.id}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="mobile-menu__link"
                  >
                    <span className="mobile-menu__number">0{index + 1}</span>
                    <span>{item.label}</span>
                    <ArrowUpRight size={26} strokeWidth={1.4} />
                  </Link>
                ))}
              </nav>

              <div className="mobile-menu__foot">
                <a href={`mailto:${site.email}`} className="mobile-menu__email">
                  {site.email}
                </a>
                <div className="mobile-menu__socials">
                  {socials.map((social) => (
                    <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                      {social.label}
                    </a>
                  ))}
                </div>
                <p className="mobile-menu__note">
                  {site.city} — {time} IST
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
