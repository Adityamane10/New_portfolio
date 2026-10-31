import { projects } from '../../data/site'
import { SectionHead } from './SectionHead'
import { WorkCard } from './WorkCard'

export function WorkSection() {
  return (
    <section id="work" className="section container work-section">
      <SectionHead
        index="01"
        label="Selected work"
        title={[
          <>
            Work that <em>ships.</em>
          </>,
        ]}
        note="Three builds, three different problems. Open one to see how the pieces fit together — no stock screenshots."
      />

      <div className="work-grid">
        {projects.map((project) => (
          <WorkCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
