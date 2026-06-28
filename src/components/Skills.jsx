import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SectionWrapper } from '../helpers/SectionWrapper'
import { AnimateOnScroll } from '../helpers/AnimateOnScroll'
import { skillCategories } from '../data/skills'
import { IntersectSquare, ArrowsClockwise } from '@phosphor-icons/react'

/* ══════════════════════════════════════════════════════════════
   3D TECH GLOBE — skills arranged on a rotating sphere surface
   ══════════════════════════════════════════════════════════════ */

function SkillGlobe() {
  const rafRef = useRef(null)
  const [rotation, setRotation] = useState({ x: 0.3, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 })
  const [mouseAccum, setMouseAccum] = useState({ x: 0, y: 0 })
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const globeSkills = useMemo(() =>
    skillCategories.flatMap(cat =>
      cat.skills.slice(0, 4).map(s => ({ ...s }))
    ),
    []
  )

  const RADIUS = 150
  const DIAMETER = RADIUS * 2

  const spherePositions = useMemo(() => {
    const n = globeSkills.length
    return globeSkills.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / n)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      return {
        ...skill,
        x: RADIUS * Math.sin(phi) * Math.cos(theta),
        y: RADIUS * Math.cos(phi),
        z: RADIUS * Math.sin(phi) * Math.sin(theta),
      }
    })
  }, [globeSkills])

  // Auto-rotation
  useEffect(() => {
    if (isDragging) return
    let raf
    const tick = () => {
      setRotation(prev => ({ x: prev.x + 0.003, y: prev.y + 0.005 }))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isDragging])

  const handlePointerDown = useCallback((e) => {
    setIsDragging(true)
    setLastMouse({ x: e.clientX, y: e.clientY })
  }, [])

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return
    const dx = e.clientX - lastMouse.x
    const dy = e.clientY - lastMouse.y
    setMouseAccum(prev => ({ x: prev.x + dy * 0.006, y: prev.y + dx * 0.006 }))
    setLastMouse({ x: e.clientX, y: e.clientY })
  }, [isDragging, lastMouse])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
    setMouseAccum({ x: 0, y: 0 })
  }, [])

  const handleKeyDown = useCallback((e) => {
    const step = 0.2
    if (e.key === 'ArrowLeft') setRotation(p => ({ ...p, y: p.y - step }))
    if (e.key === 'ArrowRight') setRotation(p => ({ ...p, y: p.y + step }))
    if (e.key === 'ArrowUp') setRotation(p => ({ ...p, x: p.x + step }))
    if (e.key === 'ArrowDown') setRotation(p => ({ ...p, x: p.x - step }))
  }, [])

  const rot = { x: rotation.x + mouseAccum.x, y: rotation.y + mouseAccum.y }

  const cosX = Math.cos(rot.x), sinX = Math.sin(rot.x)
  const cosY = Math.cos(rot.y), sinY = Math.sin(rot.y)

  const items = spherePositions.map(item => {
    const z1 = item.y * sinX + item.z * cosX
    const x1 = item.x * cosY + z1 * sinY
    const y1 = item.y * cosX - item.z * sinX
    const z2 = -item.x * sinY + z1 * cosY
    const depth = (z2 + RADIUS) / (2 * RADIUS)
    return { ...item, x1, y1, z2, depth }
  })

  const sorted = [...items].sort((a, b) => b.z2 - a.z2)

  return (
    <div className="globe-wrapper">
      <div
        className="globe-container"
        tabIndex={0}
        role="application"
        aria-label="3D skill globe — drag or use arrow keys to rotate"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onKeyDown={handleKeyDown}
      >
        <div className="globe-ring" />
        <div className="globe-orbit" style={{ transform: 'rotateX(60deg)' }} />
        <div className="globe-orbit" style={{ transform: 'rotateX(0deg)' }} />
        <div className="globe-orbit" style={{ transform: 'rotateX(-60deg)' }} />
        <div className="globe-core" />

        {sorted.map((item) => {
          const isHovered = hoveredSkill === item.name
          const isFront = item.depth > 0.5
          const opacity = isFront
            ? 0.55 + 0.45 * ((item.depth - 0.5) * 2)
            : 0.05 + 0.2 * (item.depth * 2)
          const scale = isFront ? 1 : 0.75 + 0.25 * (item.depth * 2)

          return (
            <div
              key={item.name}
              className={`globe-item ${isHovered ? 'globe-item-hovered' : ''}`}
              onMouseEnter={() => setHoveredSkill(item.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              style={{
                transform: `translate3d(${item.x1}px, ${item.y1}px, ${item.z2}px) translate(-50%, -50%) scale(${isHovered ? 1.15 : scale})`,
                opacity,
                zIndex: isHovered ? 999 : Math.round(item.z2 + RADIUS),
                color: isHovered ? 'var(--green-bright)' : isFront ? 'var(--text-secondary)' : 'var(--text-faint)',
                background: isHovered
                  ? 'rgba(126,203,69,0.12)'
                  : `rgba(8,8,8,${isFront ? 0.25 + 0.3 * ((item.depth - 0.5) * 2) : 0.08})`,
                pointerEvents: isFront ? 'auto' : 'none',
                transition: isHovered
                  ? 'opacity 0.2s ease, color 0.2s ease, background 0.2s ease, border-color 0.2s ease, transform 0.2s ease'
                  : 'opacity 0.4s ease, color 0.4s ease, background 0.4s ease, border-color 0.4s ease, transform 0.4s ease',
              }}
            >
              {item.name}
            </div>
          )
        })}
      </div>

      {!isDragging && (
        <motion.div
          className="globe-hint"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowsClockwise size={13} weight="bold" />
          <span>Drag to explore</span>
        </motion.div>
      )}

      {/* Stats — inline with data-readout style */}
      <div style={{
        display: 'flex', gap: 16, justifyContent: 'center',
        marginTop: 20, flexWrap: 'wrap',
      }}>
        <div className="data-readout" style={{ alignItems: 'center' }}>
          <span className="data-readout-value">
            {skillCategories.reduce((a, c) => a + c.skills.length, 0)}
          </span>
          <span className="data-readout-label">Technologies</span>
        </div>
        <div className="data-readout" style={{ alignItems: 'center' }}>
          <span className="data-readout-value">{skillCategories.length}</span>
          <span className="data-readout-label">Categories</span>
        </div>
        <div className="data-readout" style={{ alignItems: 'center' }}>
          <span className="data-readout-value">
            {Math.round(
              skillCategories.reduce((a, c) => a + c.skills.reduce((s, sk) => s + sk.level, 0), 0) /
              skillCategories.reduce((a, c) => a + c.skills.length, 0)
            )}%
          </span>
          <span className="data-readout-label">Avg. Proficiency</span>
        </div>
      </div>
    </div>
  )
}


/* ══════════════════════════════════════════════════════════════
   CATEGORY CARD — dashboard flat style with expand/collapse
   ══════════════════════════════════════════════════════════════ */

function CategoryCard({ cat, index }) {
  const [expanded, setExpanded] = useState(false)
  const displayCount = 8
  const visibleSkills = expanded ? cat.skills : cat.skills.slice(0, displayCount)
  const hasMore = cat.skills.length > displayCount

  return (
    <AnimateOnScroll direction="up" delay={index * 0.08}>
      <div className="dash-card dash-card-hoverable">
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
        }}>
          <div style={{
            width: 12, height: 12, flexShrink: 0,
            background: 'var(--green-mid)',
            borderTop: '1px solid var(--green-bright)',
            borderBottom: '1px solid var(--green-shadow)',
            borderLeft: '1px solid var(--green-shadow)',
            borderRight: '1px solid var(--green-shadow)',
          }} />
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.75rem', letterSpacing: '2px',
          }}>{cat.name}</h3>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.5rem', letterSpacing: '1px',
            color: 'var(--text-faint)',
            marginLeft: 'auto',
            padding: '2px 6px',
            borderTop: '1px solid var(--border-left)',
            borderBottom: '1px solid var(--border-dark)',
            borderLeft: '1px solid var(--border-left)',
            borderRight: '1px solid var(--border-right)',
          }}>{cat.skills.length}</span>
        </div>

        {/* Skills cloud */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <AnimatePresence>
            {visibleSkills.map((skill, i) => (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.22, delay: i * 0.025 }}
                className="dash-tag"
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
              fontFamily: 'var(--font-body)',
              fontSize: '0.55rem', letterSpacing: '2px',
              color: 'var(--green-bright)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginTop: 12,
              padding: 0,
              textTransform: 'uppercase',
            }}
          >
            {expanded ? '[-] Show less' : `[+] ${cat.skills.length - displayCount} more`}
          </button>
        )}
      </div>
    </AnimateOnScroll>
  )
}


/* ══════════════════════════════════════════════════════════════
   MAIN SKILLS SECTION
   ══════════════════════════════════════════════════════════════ */

export default function Skills() {
  const [view, setView] = useState('globe')

  return (
    <SectionWrapper id="skills">
      <AnimateOnScroll direction="up">
        <h2 className="section-title">Tech Stack</h2>
      </AnimateOnScroll>

      <AnimateOnScroll direction="up" delay={0.06}>
        <div className="view-toggle">
          <button
            onClick={() => setView('globe')}
            className={`view-toggle-btn ${view === 'globe' ? 'active' : ''}`}
          >
            <ArrowsClockwise size={14} weight={view === 'globe' ? 'fill' : 'regular'} />
            3D Globe
          </button>
          <button
            onClick={() => setView('grid')}
            className={`view-toggle-btn ${view === 'grid' ? 'active' : ''}`}
          >
            <IntersectSquare size={14} weight={view === 'grid' ? 'fill' : 'regular'} />
            Grid
          </button>
        </div>
      </AnimateOnScroll>

      <AnimatePresence mode="wait">
        {view === 'globe' ? (
          <motion.div
            key="globe"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <SkillGlobe />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="skills-grid-3d" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 16,
            }}>
              {skillCategories.map((cat, i) => (
                <CategoryCard key={cat.name} cat={cat} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
