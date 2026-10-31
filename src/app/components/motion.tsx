import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import { useRef, type ReactNode } from 'react'

import { cx } from '../lib/cx'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Lines of text that rise out of a mask, one after another. The wrapper is
 * observed: a line translated out of its mask has no visible area, so the line
 * itself would never trigger the observer.
 */
export function Lines({
  lines,
  className,
  delay = 0,
  as: Tag = 'h1',
}: {
  lines: ReactNode[]
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'p'
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' })

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, index) => (
        <span key={index} className="line-mask">
          <motion.span
            className="line-mask__inner"
            initial={{ y: '112%' }}
            animate={inView ? { y: 0 } : { y: '112%' }}
            transition={{ duration: 1.05, delay: delay + index * 0.09, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export function Reveal({
  children,
  delay = 0,
  className,
  y = 26,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/** A button or small object that leans toward the cursor. */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={cx('magnetic', className)}
      onPointerMove={(event) => {
        if (reduce) return
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        x.set((event.clientX - rect.left - rect.width / 2) * strength)
        y.set((event.clientY - rect.top - rect.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/** A card that tilts gently in 3D toward the pointer. */
export function Tilt({
  children,
  className,
  max = 5,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={cx('tilt', className)}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={(event) => {
        if (reduce || event.pointerType !== 'mouse') return
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        const px = (event.clientX - rect.left) / rect.width - 0.5
        const py = (event.clientY - rect.top) / rect.height - 0.5
        rotateY.set(px * max * 2)
        rotateX.set(py * -max * 2)
      }}
      onPointerLeave={() => {
        rotateX.set(0)
        rotateY.set(0)
      }}
      onPointerUp={() => {
        rotateX.set(0)
        rotateY.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
