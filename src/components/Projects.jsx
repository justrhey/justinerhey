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

  const featured = filtered.filter(p => p.featured)
  const rest = filtered.filter(p => !p.featured)

  // Keyboard navigation
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
      <AnimateOnScroll direction="up" delay={0.08}>
        <div style={{
          display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36,
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                padding: '7px 18px',
                borderRadius: 20,
                border: '1px solid',
                borderColor: activeCategory === cat.id ? 'var(--accent)' : 'var(--border-light)',
                background: activeCategory === cat.id ? 'var(--accent-dim)' : 'transparent',
                color: activeCategory === cat.id ? 'var(--accent)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.3px',
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat.id) {
                  e.target.style.borderColor = 'var(--text-dim)'
                  e.target.style.color = 'var(--text-secondary)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat.id) {
                  e.target.style.borderColor = 'var(--border-light)'
                  e.target.style.color = 'var(--text-muted)'
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </AnimateOnScroll>

      {/* Bento grid: featured projects */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Featured — 2-col bento layout */}
          {featured.length > 0 && (
            <div className="bento-grid" style={{ marginBottom: 20 }}>
              {featured.map((p, i) => {
                // First card spans full width; rest in 2-col
                const isWide = i === 0
                return (
                  <div
                    key={p.id}
                    className={isWide ? 'bento-wide' : ''}
                    style={{
                      height: '100%',
                    }}
                  >
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

          {/* Rest — compact grid */}
          {rest.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16,
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

      {/* Modal */}
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
