import { useState } from 'react'
import { projects } from '../data/projects'
import { SectionWrapper } from '../helpers/SectionWrapper'
import { AnimateOnScroll } from '../helpers/AnimateOnScroll'
import { ProjectCard } from './ProjectCard'
import ProjectModal from './ProjectModal'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <SectionWrapper id="projects">
      <AnimateOnScroll direction="up">
        <p className="section-label">Projects</p>
        <h2 className="section-title">Things I've Built</h2>
      </AnimateOnScroll>

      {/* All projects — equal grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 20,
      }}>
        {projects.map((p, i) => (
          <AnimateOnScroll key={p.id} direction="up" delay={i * 0.06}>
            <ProjectCard project={p} onClick={setSelectedProject} />
          </AnimateOnScroll>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </SectionWrapper>
  )
}
