import type { ReactNode } from 'react'

import { Lines, Reveal } from './motion'

export function SectionHead({
  index,
  label,
  title,
  note,
}: {
  index: string
  label: string
  title: ReactNode[]
  note?: ReactNode
}) {
  return (
    <header className="section-head">
      <div className="section-head__meta">
        <span className="section-head__index">{index}</span>
        <span className="section-head__label">{label}</span>
        <span className="section-head__rule" aria-hidden="true" />
      </div>

      <div className="section-head__body">
        <Lines as="h2" className="section-head__title" lines={title} />
        {note && (
          <Reveal className="section-head__note" delay={0.12}>
            {note}
          </Reveal>
        )}
      </div>
    </header>
  )
}
