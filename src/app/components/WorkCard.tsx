import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

import type { Project } from '../../data/site'
import { cx } from '../lib/cx'
import { ProjectVisual } from './ProjectVisual'

export function WorkCard({ project }: { project: Project }) {
  const visibleStack = project.stack.slice(0, 4)
  const extra = project.stack.length - visibleStack.length

  return (
    <Link
      to={`/work/${project.slug}`}
      className={cx('work-card', project.featured && 'work-card--featured')}
      data-cursor="view"
      data-cursor-label="VIEW CASE"
      aria-label={`${project.title} — ${project.category}. Read the case study.`}
    >
      <div className="work-card__visual">
        <ProjectVisual project={project} />
        <span className="work-card__type">{project.type}</span>
      </div>

      <div className="work-card__content">
        <div className="work-card__meta">
          <span className="work-card__index">{project.index}</span>
          <span className="work-card__category">{project.category}</span>
          <span className="work-card__arrow" aria-hidden="true">
            <ArrowUpRight size={17} strokeWidth={1.7} />
          </span>
        </div>

        <h3 className="work-card__title">{project.title}</h3>
        <p className="work-card__summary">{project.summary}</p>

        <div className="work-card__tags" aria-hidden="true">
          {visibleStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
          {extra > 0 && <span className="work-card__more">+{extra}</span>}
        </div>

        <span className="work-card__foot">
          <span>Read the case study</span>
          <span className="work-card__line" aria-hidden="true" />
          <ArrowRight size={16} strokeWidth={1.7} />
        </span>
      </div>
    </Link>
  )
}
