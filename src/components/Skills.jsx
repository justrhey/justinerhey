import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SectionWrapper } from '../helpers/SectionWrapper'
import { AnimateOnScroll } from '../helpers/AnimateOnScroll'
import { skillCategories } from '../data/skills'

/* ─── Circular skill ring ─── */
function SkillRing({ name, level, color = 'var(--accent)', delay = 0 }) {
  const radius = 24
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (level / 100) * circumference
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'relative', width: 60, height: 60 }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          {/* Background ring */}
          <circle
            cx="30" cy="30" r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth="4"
          />
          {/* Progress ring */}
          <motion.circle
            cx="30" cy="30" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay, ease: 'easeOut' }}
            transform="rotate(-90 30 30)"
          />
        </svg>
        {/* Level text */}
        <span style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          color: hovered ? 'var(--text-primary)' : 'var(--text-muted)',
          transition: 'color 0.2s',
        }}>
          {hovered ? `${level}%` : name.slice(0, 2)}
        </span>
      </div>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
        color: 'var(--text-dim)', textAlign: 'center',
        lineHeight: 1.3, maxWidth: 70,
        transition: 'color 0.2s',
      }}>
        {name}
      </span>
    </div>
  )
}

/* ─── Category card with expandable skills ─── */
function SkillCategory({ cat, index }) {
  const [expanded, setExpanded] = useState(false)
  const accentColor = cat.accent === 'accent-2' ? 'var(--accent-2)' : 'var(--accent)'
  const borderAccent = cat.accent === 'accent-2' ? 'rgba(6,182,212,0.15)' : 'rgba(94,106,210,0.15)'
  const displayCount = 6

  const visibleSkills = expanded ? cat.skills : cat.skills.slice(0, displayCount)
  const hasMore = cat.skills.length > displayCount

  return (
    <AnimateOnScroll direction="up" delay={index * 0.08}>
      <motion.div layout className="glow-card" style={{
        padding: 28,
        border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--bg-card)',
        height: '100%',
      }}>
        {/* Category header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
        }}>
          <div style={{
            width: 3, height: 24, borderRadius: 2,
            background: accentColor,
            boxShadow: `0 0 8px ${borderAccent}`,
          }} />
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.95rem', fontWeight: 600,
            color: 'var(--text-primary)',
          }}>
            {cat.name}
          </h3>
        </div>

        {/* Skills grid */}
        <motion.div layout style={{
          display: 'flex', flexWrap: 'wrap', gap: 8,
          justifyContent: 'flex-start',
        }}>
          <AnimatePresence>
            {visibleSkills.map((skill, i) => (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                className={`tag ${cat.accent === 'accent-2' ? 'tag-cyan' : ''}`}
                style={{
                  fontSize: '0.72rem', padding: '5px 14px',
                  borderColor: 'var(--border-light)',
                }}
              >
                {skill.name}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show more */}
        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              marginTop: 16,
              background: 'none', border: 'none',
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              color: accentColor, cursor: 'pointer',
              padding: '4px 0', transition: 'opacity 0.2s',
              opacity: 0.7,
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.7'}
          >
            {expanded ? '− Show less' : `+ ${cat.skills.length - displayCount} more`}
          </button>
        )}
      </motion.div>
    </AnimateOnScroll>
  )
}

/* ─── Main Skills Section ─── */
export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <AnimateOnScroll direction="up">
        <p className="section-label">skills</p>
        <h2 className="section-title">Tech Stack</h2>
      </AnimateOnScroll>

      {/* Skill rings preview */}
      <AnimateOnScroll direction="up" delay={0.1}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center',
          marginBottom: 48,
          padding: '24px 20px',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-elevated)',
        }}>
          {skillCategories.flatMap(cat =>
            cat.skills.slice(0, 3).map((skill, i) => (
              <SkillRing
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={cat.accent === 'accent-2' ? 'var(--accent-2)' : 'var(--accent)'}
                delay={i * 0.1}
              />
            ))
          )}
        </div>
      </AnimateOnScroll>

      {/* Category cards */}
      <div className="grid-3" style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 20,
      }}>
        {skillCategories.map((cat, i) => (
          <SkillCategory key={cat.name} cat={cat} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
