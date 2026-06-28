import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { projects } from '../data/projects'
import { SectionWrapper } from '../helpers/SectionWrapper'
import { AnimateOnScroll } from '../helpers/AnimateOnScroll'
import { ProjectCard } from './ProjectCard'
import ProjectModal from './ProjectModal'

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'ai', label: 'AI / Automation' },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredId, setHoveredId] = useState(null)

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  const allFeatured = filtered.filter(p => p.featured)
  const featured = allFeatured.slice(0, 3)
  const rest = [...allFeatured.slice(3), ...filtered.filter(p => !p.featured)]

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <SectionWrapper id="projects">
      <AnimateOnScroll direction="up">
        <h2 className="section-title">Things I've Built</h2>
      </AnimateOnScroll>

      {/* Filter pills */}
      <AnimateOnScroll direction="up" delay={0.06}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28 }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`filter-pill ${activeCategory === cat.id ? 'filter-pill-active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </AnimateOnScroll>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {featured.length > 0 && (
            <div className="projects-grid-aero" style={{ marginBottom: 20 }}>
              {featured.map((p, i) => {
                const isWide = i === 0
                return (
                  <div key={p.id} className={isWide ? 'wide' : ''}>
                    <ProjectCard
                      project={p}
                      onClick={setSelectedProject}
                      featured={isWide}
                      isHovered={hoveredId === p.id}
                      onHover={setHoveredId}
                      index={i}
                    />
                  </div>
                )
              })}
            </div>
          )}

          {rest.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 20,
            }}>
              {rest.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onClick={setSelectedProject}
                  featured={false}
                  isHovered={hoveredId === p.id}
                  onHover={setHoveredId}
                  index={i}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
