import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'

import { Ambient, CustomCursor, ScrollProgress } from './components/Chrome'
import { CommandPalette } from './components/CommandPalette'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { Preloader } from './components/Preloader'
import { bySlug } from '../data/site'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Work } from './pages/Work'

const ease = [0.22, 1, 0.36, 1] as const

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    const id = hash.slice(1)
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth'
    let attempts = 0
    let timer = 0

    const tryScroll = () => {
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ behavior, block: 'start' })
        return
      }
      if (attempts < 12) {
        attempts += 1
        timer = window.setTimeout(tryScroll, 80)
      }
    }

    timer = window.setTimeout(tryScroll, 120)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return null
}

function DocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/') {
      document.title = 'Aditya Mane — Full-stack Developer & AI Systems'
      return
    }
    if (pathname === '/about') {
      document.title = 'About — Aditya Mane'
      return
    }
    const project = pathname.startsWith('/work/') ? bySlug(pathname.split('/')[2] ?? '') : undefined
    document.title = project ? `${project.title} — Case study — Aditya Mane` : 'Aditya Mane'
  }, [pathname])

  return null
}

function Pages() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        id="main-content"
        key={location.pathname}
        className="page"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease }}
      >
        <Routes location={location}>
          <Route index element={<Home />} />
          <Route path="work/:slug" element={<Work />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  )
}

export function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const closePalette = useCallback(() => setPaletteOpen(false), [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Preloader />
        <Ambient />
        <ScrollProgress />
        <CustomCursor />
        <Nav onOpenPalette={() => setPaletteOpen(true)} />
        <CommandPalette open={paletteOpen} onClose={closePalette} />
        <ScrollManager />
        <DocumentTitle />
        <Pages />
        <Footer />
      </BrowserRouter>
    </MotionConfig>
  )
}
