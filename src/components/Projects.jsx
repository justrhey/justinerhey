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

/* ─── Dashboard filter pill ─── */
function FilterPill({ cat, activeCategory, setActiveCategory }) {
  const isActive = activeCategory === cat.id
  return (
    <button
      onClick={() => setActiveCategory(cat.id)}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.6rem', letterSpacing: '2px',
        textTransform: 'uppercase',
        padding: '6px 14px',
        cursor: 'pointer',
        background: isActive ? 'var(--green-mid)' : 'var(--bg-deep)',
        color: isActive ? '#080808' : 'var(--text-muted)',
        fontWeight: isActive ? 700 : 400,
        borderTop: `2px solid ${isActive ? 'var(--green-bright)' : 'var(--border-light)'}`,
        borderBottom: `2px solid ${isActive ? 'var(--green-shadow)' : 'var(--border-dark)'}`,
        borderLeft: `1px solid ${isActive ? 'var(--green-shadow)' : 'var(--border-left)'}`,
        borderRight: `1px solid ${isActive ? 'var(--green-shadow)' : 'var(--border-right)'}`,
        transition: 'none',
      }}
    >
      {cat.label}
    </button>
  )
}

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

  // Keyboard
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
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 36 }}>
          {CATEGORIES.map(cat => (
            <FilterPill
              key={cat.id}
              cat={cat}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          ))}
        </div>
      </AnimateOnScroll>

      {/* Bento grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {featured.length > 0 && (
            <div className="bento-grid" style={{ marginBottom: 20 }}>
              {featured.map((p, i) => {
                const isWide = i === 0
                return (
                  <div key={p.id} className={isWide ? 'bento-wide' : ''} style={{ height: '100%' }}>
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
