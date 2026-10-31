import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Briefcase,
  Check,
  Code2,
  Copy,
  CornerDownLeft,
  FolderOpen,
  Layers,
  Mail,
  Search,
  UserRound,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { projects, site, skillGroups } from '../../data/site'
import { copyText } from '../lib/clipboard'
import { cx } from '../lib/cx'
import { Mark } from './Mark'

interface Command {
  id: string
  label: string
  hint: string
  keywords?: string
  icon: ReactNode
  run: () => void
}

interface Group {
  label: string
  items: Command[]
}

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const goToSection = (id: string) => {
    onClose()
    if (pathname === '/') {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth'
      document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
      window.history.replaceState(null, '', `/#${id}`)
    } else {
      navigate(`/#${id}`)
    }
  }

  const goToPage = (path: string) => {
    onClose()
    navigate(path)
  }

  const copyEmail = async () => {
    const ok = await copyText(site.email)
    if (!ok) {
      window.location.href = `mailto:${site.email}`
      return
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const groups: Group[] = [
    {
      label: 'Navigate',
      items: [
        {
          id: 'work',
          label: 'Selected work',
          hint: '03 builds',
          keywords: 'projects case studies portfolio',
          icon: <FolderOpen size={17} />,
          run: () => goToSection('work'),
        },
        {
          id: 'about',
          label: 'About Aditya',
          hint: 'The story',
          keywords: 'profile experience education',
          icon: <UserRound size={17} />,
          run: () => goToPage('/about'),
        },
        {
          id: 'stack',
          label: 'The stack',
          hint: `${skillGroups.length} categories`,
          keywords: 'skills tools technologies frontend backend data ai',
          icon: <Layers size={17} />,
          run: () => goToSection('stack'),
        },
        {
          id: 'contact',
          label: 'Get in touch',
          hint: 'Contact',
          keywords: 'email hire work',
          icon: <Mail size={17} />,
          run: () => goToSection('contact'),
        },
      ],
    },
    {
      label: 'Case studies',
      items: projects.map((project) => ({
        id: project.slug,
        label: project.title,
        hint: project.category,
        keywords: `${project.stack.join(' ')} ${project.summary}`,
        icon: <ArrowRight size={17} />,
        run: () => goToPage(`/work/${project.slug}`),
      })),
    },
    {
      label: 'Actions',
      items: [
        {
          id: 'copy-email',
          label: copied ? 'Email copied' : 'Copy email address',
          hint: site.email,
          keywords: 'clipboard contact',
          icon: copied ? <Check size={17} /> : <Copy size={17} />,
          run: copyEmail,
        },
        {
          id: 'email',
          label: 'Open email app',
          hint: 'Say hello',
          keywords: 'mail mailto contact',
          icon: <Mail size={17} />,
          run: () => {
            onClose()
            window.location.href = `mailto:${site.email}`
          },
        },
        {
          id: 'github',
          label: 'GitHub',
          hint: '@Adityamane10',
          keywords: 'code source repositories',
          icon: <Code2 size={17} />,
          run: () => {
            onClose()
            window.open(site.github, '_blank', 'noopener,noreferrer')
          },
        },
        {
          id: 'linkedin',
          label: 'LinkedIn',
          hint: 'in/aditya-mane',
          keywords: 'professional social',
          icon: <Briefcase size={17} />,
          run: () => {
            onClose()
            window.open(site.linkedin, '_blank', 'noopener,noreferrer')
          },
        },
      ],
    },
  ]

  const needle = query.trim().toLowerCase()
  let offset = 0
  const filteredGroups = groups
    .map((group) => {
      const items = group.items
        .filter((item) => {
          if (!needle) return true
          return `${item.label} ${item.hint} ${item.keywords ?? ''}`.toLowerCase().includes(needle)
        })
        .map((item, index) => ({ item, index: offset + index }))
      offset += items.length
      return { ...group, items }
    })
    .filter((group) => group.items.length > 0)

  const flat = filteredGroups.flatMap((group) => group.items.map((entry) => entry.item))

  useEffect(() => {
    if (!open) return
    setQuery('')
    setSelected(0)
    setCopied(false)
    document.body.classList.add('palette-open')
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('palette-open')
    }
  }, [open, onClose])

  useEffect(() => {
    setSelected(0)
  }, [query])

  useEffect(() => {
    if (!open) return
    document.getElementById(`palette-item-${selected}`)?.scrollIntoView({ block: 'nearest' })
  }, [selected, open])

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelected((current) => (flat.length ? (current + 1) % flat.length : 0))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelected((current) => (flat.length ? (current - 1 + flat.length) % flat.length : 0))
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      flat[selected]?.run()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onMouseDown={onClose}
          role="presentation"
        >
          <motion.div
            className="palette__panel"
            role="dialog"
            aria-modal="true"
            aria-label="Quick navigation"
            initial={{ opacity: 0, y: -14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="palette__search">
              <Search size={19} strokeWidth={1.8} />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Jump to a project, section, or link…"
                aria-label="Search"
                autoComplete="off"
                spellCheck={false}
              />
              <button type="button" className="palette__close" onClick={onClose} aria-label="Close">
                <X size={17} />
              </button>
            </div>

            <div className="palette__results">
              {filteredGroups.length === 0 && (
                <div className="palette__empty">
                  <Mark size={22} />
                  <p>No matches for “{query}”.</p>
                  <span>Try “work”, “React”, or “contact”.</span>
                </div>
              )}

              {filteredGroups.map((group) => (
                <div className="palette__group" key={group.label}>
                  <p className="palette__group-label">{group.label}</p>
                  {group.items.map(({ item, index }) => (
                    <button
                      type="button"
                      key={item.id}
                      id={`palette-item-${index}`}
                      className={cx('palette__item', selected === index && 'is-selected')}
                      onMouseEnter={() => setSelected(index)}
                      onClick={item.run}
                    >
                      <span className="palette__item-icon">{item.icon}</span>
                      <span className="palette__item-label">{item.label}</span>
                      <span className="palette__item-hint">{item.hint}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <div className="palette__foot">
              <span>
                <kbd><ArrowUp size={11} /></kbd>
                <kbd><ArrowDown size={11} /></kbd>
                to move
              </span>
              <span>
                <kbd><CornerDownLeft size={11} /></kbd>
                to open
              </span>
              <span>
                <kbd>ESC</kbd>
                to close
              </span>
              <span className="palette__mark"><Mark size={14} /> AM / 2026</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
