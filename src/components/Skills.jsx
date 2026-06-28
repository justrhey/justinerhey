import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SectionWrapper } from '../helpers/SectionWrapper'
import { AnimateOnScroll } from '../helpers/AnimateOnScroll'
import { skillCategories } from '../data/skills'

/* ─── Glass category card ─── */
function CategoryCard({ cat, index }) {
  const [expanded, setExpanded] = useState(false)
  const displayCount = 8
  const visibleSkills = expanded ? cat.skills : cat.skills.slice(0, displayCount)
  const hasMore = cat.skills.length > displayCount

  return (
    <AnimateOnScroll direction="up" delay={index * 0.06}>
      <div className="glass-card" style={{ height: '100%' }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18,
        }}>
          <div style={{
            width: 10, height: 10, flexShrink: 0, borderRadius: '50%',
            background: 'var(--aqua-mid)',
          }} />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, flex: 1 }}>
            {cat.name}
          </h3>
          <span className="badge-aero badge-info">{cat.skills.length}</span>
        </div>

        {/* Skills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <AnimatePresence>
            {visibleSkills.map((skill, i) => (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.18, delay: i * 0.025 }}
                className="tag-aero"
              >
                {skill.name}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Show more */}
        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              fontFamily: 'var(--font-stack)',
              fontSize: '0.78rem', color: 'var(--deep-aqua)',
              background: 'none', border: 'none',
              cursor: 'pointer', marginTop: 12, padding: 0,
              fontWeight: 500,
            }}
          >
            {expanded ? '− Show less' : `+ ${cat.skills.length - displayCount} more`}
          </button>
        )}
      </div>
    </AnimateOnScroll>
  )
}

/* ─── Section ─── */
export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <AnimateOnScroll direction="up">
        <h2 className="section-title">Tech Stack</h2>
      </AnimateOnScroll>

      <div className="skills-grid-aero">
        {skillCategories.map((cat, i) => (
          <CategoryCard key={cat.name} cat={cat} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
