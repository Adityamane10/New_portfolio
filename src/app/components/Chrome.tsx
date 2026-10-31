import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react'
import { useEffect, useState } from 'react'

import { cx } from '../lib/cx'

type CursorMode = 'default' | 'link' | 'view' | 'copy' | 'hidden'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState<CursorMode>('default')
  const [label, setLabel] = useState('')
  const reduce = useReducedMotion()

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)
  const ringX = useSpring(rawX, { stiffness: 260, damping: 26, mass: 0.5 })
  const ringY = useSpring(rawY, { stiffness: 260, damping: 26, mass: 0.5 })
  const dotX = useSpring(rawX, { stiffness: 850, damping: 42, mass: 0.25 })
  const dotY = useSpring(rawY, { stiffness: 850, damping: 42, mass: 0.25 })

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (event: PointerEvent) => {
      rawX.set(event.clientX)
      rawY.set(event.clientY)
      setVisible(true)
    }

    const onOver = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (target.closest('input, textarea, select, [contenteditable="true"]')) {
        setMode('hidden')
        setLabel('')
        return
      }

      const holder = target.closest<HTMLElement>('[data-cursor]')
      const data = holder?.dataset.cursor
      if (data === 'view' || data === 'copy' || data === 'link' || data === 'native') {
        setMode(data === 'native' ? 'hidden' : data)
        setLabel(data === 'view' ? (holder?.dataset.cursorLabel ?? 'VIEW') : data === 'copy' ? 'COPY' : '')
        return
      }

      if (target.closest('a, button, [role="button"]')) {
        setMode('link')
        setLabel('')
        return
      }

      setMode('default')
      setLabel('')
    }

    const hide = () => setVisible(false)
    const show = () => setVisible(true)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)
    document.documentElement.addEventListener('mouseenter', show)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('mouseleave', hide)
      document.documentElement.removeEventListener('mouseenter', show)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [rawX, rawY, reduce])

  if (!enabled) return null

  return (
    <div
      className={cx(
        'cursor',
        visible && 'cursor--visible',
        `cursor--${mode}`,
      )}
      aria-hidden="true"
    >
      <motion.div className="cursor__ring" style={{ x: ringX, y: ringY }}>
        <span>{label}</span>
      </motion.div>
      <motion.div className="cursor__dot" style={{ x: dotX, y: dotY }} />
    </div>
  )
}

export function Ambient() {
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const smoothX = useSpring(x, { stiffness: 70, damping: 24, mass: 0.8 })
  const smoothY = useSpring(y, { stiffness: 70, damping: 24, mass: 0.8 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y])

  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__grid" />
      <div className="ambient__glow ambient__glow--lime" />
      <div className="ambient__glow ambient__glow--violet" />
      <div className="ambient__glow ambient__glow--warm" />
      <motion.div className="ambient__spotlight" style={{ x: smoothX, y: smoothY }} />
      <div className="ambient__grain" />
    </div>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}
