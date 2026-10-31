import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { PointerEvent as ReactPointerEvent } from 'react'

import { Mark } from './Mark'

const nodes = [
  { label: 'React', className: 'orb__node--a' },
  { label: 'FastAPI', className: 'orb__node--b' },
  { label: 'LangGraph', className: 'orb__node--c' },
  { label: 'PostgreSQL', className: 'orb__node--d' },
]

export function Orb() {
  const reduce = useReducedMotion()
  const rotateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18, mass: 0.6 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18, mass: 0.6 })

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(x * 10)
    rotateX.set(y * -10)
  }

  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div
      className="orb-wrap"
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      aria-hidden="true"
    >
      <div className="orb">
        <div className="orb__aura" />
        <motion.div
          className="orb__scene"
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
        >
          <div className="orb__hud">
            <span className="orb__hud-dot" />
            SIGNAL / 01
            <span className="orb__hud-static">LIVE</span>
          </div>

          <svg className="orb__guide" viewBox="0 0 440 440" fill="none">
            <circle cx="220" cy="220" r="208" stroke="currentColor" strokeOpacity="0.22" />
            <circle
              cx="220"
              cy="220"
              r="190"
              stroke="currentColor"
              strokeOpacity="0.55"
              strokeDasharray="1 11"
            />
            <circle
              cx="220"
              cy="220"
              r="146"
              stroke="currentColor"
              strokeOpacity="0.18"
              strokeDasharray="2 8"
            />
            <circle cx="220" cy="220" r="104" stroke="currentColor" strokeOpacity="0.14" />
            <path d="M220 12V34M220 406V428M12 220H34M406 220H428" stroke="currentColor" strokeOpacity="0.5" />
          </svg>

          <div className="orb__ring orb__ring--a" />
          <div className="orb__ring orb__ring--b" />
          <div className="orb__ring orb__ring--c" />
          <span className="orb__satellite orb__satellite--a" />
          <span className="orb__satellite orb__satellite--b" />

          {nodes.map((node) => (
            <span key={node.label} className={`orb__node ${node.className}`}>
              <i />
              {node.label}
            </span>
          ))}

          <div className="orb__core">
            <div className="orb__core-ring" />
            <div className="orb__core-light" />
            <Mark className="orb__mark" size={42} />
            <span className="orb__core-label">AM / 2026</span>
            <span className="orb__core-meta">
              Full-stack
              <br />
              AI systems
            </span>
          </div>
        </motion.div>
      </div>

      <div className="orb__caption">
        <span>Interface → inference</span>
        <span>One loop, whole stack</span>
      </div>
    </div>
  )
}
