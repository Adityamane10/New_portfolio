import { motion } from 'motion/react'
import { useState, type KeyboardEvent } from 'react'

import { skillGroups } from '../../data/site'
import { cx } from '../lib/cx'
import { SectionHead } from './SectionHead'

const ease = [0.22, 1, 0.36, 1] as const

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
}

export function Stack() {
  const [activeId, setActiveId] = useState(skillGroups[0].id)
  const active = skillGroups.find((group) => group.id === activeId) ?? skillGroups[0]

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = skillGroups.findIndex((group) => group.id === activeId)
    let nextIndex = currentIndex
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = currentIndex + 1
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = currentIndex - 1
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = skillGroups.length - 1
    else return

    event.preventDefault()
    const next = skillGroups[(nextIndex + skillGroups.length) % skillGroups.length]
    setActiveId(next.id)
    document.getElementById(`stack-tab-${next.id}`)?.focus()
  }

  return (
    <section id="stack" className="section container stack-section">
      <SectionHead
        index="03"
        label="The stack"
        title={[
          <>
            Tools of the <em>trade.</em>
          </>,
        ]}
        note="A working set, not a checklist. Pick a layer — the list changes, the curiosity doesn't."
      />

      <div className="stack">
        <div
          className="stack__tabs"
          role="tablist"
          aria-label="Skill categories"
          aria-orientation="vertical"
          onKeyDown={onTabKeyDown}
        >
          {skillGroups.map((group, index) => {
            const isActive = group.id === activeId
            return (
              <button
                key={group.id}
                id={`stack-tab-${group.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="stack-panel"
                tabIndex={isActive ? 0 : -1}
                className={cx('stack__tab', isActive && 'is-active')}
                onClick={() => setActiveId(group.id)}
              >
                {isActive && (
                  <motion.span
                    layoutId="stack-active"
                    className="stack__tab-active"
                    transition={{ duration: 0.4, ease }}
                  />
                )}
                <span className="stack__tab-index">0{index + 1}</span>
                <span className="stack__tab-label">{group.label}</span>
                <span className="stack__tab-caption">{group.caption}</span>
                <span className="stack__tab-count">{group.count}</span>
              </button>
            )
          })}

          <div className="stack__active-copy">
            <p>{active.description}</p>
            <span>{`0${skillGroups.findIndex((group) => group.id === active.id) + 1} / 0${skillGroups.length} layers`}</span>
          </div>
        </div>

        <div
          id="stack-panel"
          className="stack__panel"
          role="tabpanel"
          aria-labelledby={`stack-tab-${active.id}`}
        >
          <motion.div
            key={active.id}
            className="stack__panel-inner"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="stack__panel-head">
              <span>
                {active.label} <i>/</i> {active.count}
              </span>
              <span>{active.caption}</span>
            </div>

            <span className="stack__ghost" aria-hidden="true">
              {active.label}
            </span>

            <motion.ul
              className="stack__items"
              variants={listVariants}
              initial="hidden"
              animate="show"
            >
              {active.items.map((item, index) => (
                <motion.li key={item} className="stack__item" variants={itemVariants}>
                  <span className="stack__item-dot" aria-hidden="true" />
                  <span className="stack__item-name">{item}</span>
                  <span className="stack__item-index">{String(index + 1).padStart(2, '0')}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="stack__now">
              <span className="stack__now-label">
                <i aria-hidden="true" />
                now exploring
              </span>
              <span>local-first agents, eval loops & interfaces that disappear</span>
              <span className="stack__cursor" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
