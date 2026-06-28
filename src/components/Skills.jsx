import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SectionWrapper } from '../helpers/SectionWrapper'
import { AnimateOnScroll } from '../helpers/AnimateOnScroll'
import { skillCategories } from '../data/skills'
import { IntersectSquare, ArrowsClockwise } from '@phosphor-icons/react'

/* ══════════════════════════════════════════════════════════════
   3D TECH GLOBE — skills arranged on a rotating sphere surface
   Items behind the sphere fade to near-invisible so the globe
   stays clean — no text bleeding through the back.
   ══════════════════════════════════════════════════════════════ */

function SkillGlobe() {
  const rafRef = useRef(null)
  const [rotation, setRotation] = useState({ x: 0.3, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 })
  const [mouseAccum, setMouseAccum] = useState({ x: 0, y: 0 })
  const [hoveredSkill, setHoveredSkill] = useState(null)

  // Collect top skills per category
  const globeSkills = useMemo(() =>
    skillCategories.flatMap(cat =>
      cat.skills.slice(0, 4).map(s => ({ ...s, accent: cat.accent }))
    ),
    []
  )

  const RADIUS = 150
  const DIAMETER = RADIUS * 2

  // Fibonacci sphere — even distribution
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
        radius: RADIUS,
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

  // Drag
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

  // Keyboard
  const handleKeyDown = useCallback((e) => {
    const step = 0.2
    if (e.key === 'ArrowLeft') setRotation(p => ({ ...p, y: p.y - step }))
    if (e.key === 'ArrowRight') setRotation(p => ({ ...p, y: p.y + step }))
    if (e.key === 'ArrowUp') setRotation(p => ({ ...p, x: p.x + step }))
    if (e.key === 'ArrowDown') setRotation(p => ({ ...p, x: p.x - step }))
  }, [])

  const rot = {
    x: rotation.x + mouseAccum.x,
    y: rotation.y + mouseAccum.y,
  }

  // Compute rotated positions and depth
  const cosX = Math.cos(rot.x), sinX = Math.sin(rot.x)
  const cosY = Math.cos(rot.y), sinY = Math.sin(rot.y)

  const items = spherePositions.map(item => {
      const z1 = item.y * sinX + item.z * cosX
      const x1 = item.x * cosY + z1 * sinY
      const y1 = item.y * cosX - item.z * sinX
      const z2 = -item.x * sinY + z1 * cosY
      const depth = (z2 + RADIUS) / (2 * RADIUS) // 0 = back, 1 = front
      return { ...item, x1, y1, z2, depth }
    })

  // Sort: items in front render on top
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
        {/* Decorative rings — inside overflow:hidden but positioned centrally */}
        <div className="globe-ring" />
        <div className="globe-orbit" style={{ transform: 'rotateX(60deg)' }} />
        <div className="globe-orbit" style={{ transform: 'rotateX(0deg)' }} />
        <div className="globe-orbit" style={{ transform: 'rotateX(-60deg)' }} />
        <div className="globe-core" />

        {/* Skill items */}
        {sorted.map((item) => {
          const isHovered = hoveredSkill === item.name
          const accent = item.accent === 'accent-2' ? 'var(--accent-2)' : 'var(--accent)'

          // Front face vs back face
          const isFront = item.depth > 0.5

          // Opacity: front items 0.6→1, back items 0→0.25
          const opacity = isFront
            ? 0.55 + 0.45 * ((item.depth - 0.5) * 2) // 0.55→1.0
            : 0.05 + 0.2 * (item.depth * 2)            // 0.05→0.25

          // Scale: front items normal, back items slightly smaller for depth
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
                borderColor: isHovered ? accent : 'var(--border-light)',
                color: isHovered ? 'var(--text-primary)' : isFront ? 'var(--text-secondary)' : 'var(--text-faint)',
                background: isHovered
                  ? `rgba(94,106,210,0.15)`
                  : `rgba(10,10,12,${isFront ? 0.25 + 0.3 * ((item.depth - 0.5) * 2) : 0.08})`,
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

      {/* Drag hint — below the container */}
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
    </div>
  )
}


/* ══════════════════════════════════════════════════════════════
   3D CATEGORY CARD — isometric depth with perspective tilt
   ══════════════════════════════════════════════════════════════ */

function CategoryCard3D({ cat, index }) {
  const [expanded, setExpanded] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHover, setIsHover] = useState(false)
  const cardRef = useRef(null)

  const accent = cat.accent === 'accent-2' ? 'var(--accent-2)' : 'var(--accent)'
  const borderAccent = cat.accent === 'accent-2' ? 'rgba(6,182,212,0.18)' : 'rgba(94,106,210,0.18)'
  const displayCount = 8
  const visibleSkills = expanded ? cat.skills : cat.skills.slice(0, displayCount)
  const hasMore = cat.skills.length > displayCount

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -6, y: x * 6 })
  }

  const handleMouseEnter = () => setIsHover(true)
  const handleMouseLeave = () => { setIsHover(false); setTilt({ x: 0, y: 0 }) }

  const cardStyle = {
    transform: isHover
      ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px)`
      : 'perspective(1000px) rotateX(0) rotateY(0)',
    transition: isHover ? 'transform 0.12s ease, box-shadow 0.3s ease' : 'transform 0.4s ease, box-shadow 0.4s ease',
    padding: 28,
    border: '1px solid var(--border-card)',
    borderRadius: 'var(--radius-lg)',
    background: 'var(--bg-card)',
    height: '100%',
    position: 'relative',
    boxShadow: isHover
      ? `0 20px 60px rgba(0,0,0,0.35), 0 0 30px ${borderAccent}, inset 0 1px 0 rgba(255,255,255,0.04)`
      : `0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)`,
  }

  return (
    <AnimateOnScroll direction="up" delay={index * 0.08}>
      <motion.div
        layout
        ref={cardRef}
        className="glow-card"
        style={cardStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* 3D accent bar */}
        <div
          className="card-accent-bar"
          style={{
            background: `linear-gradient(180deg, ${accent}, transparent)`,
            boxShadow: isHover ? `0 0 16px ${borderAccent}` : 'none',
          }}
        />

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
          transform: isHover ? 'translateZ(8px)' : 'translateZ(0)',
          transition: 'transform 0.3s ease',
        }}>
          <div
            className="card-accent-block"
            style={{
              background: accent,
              boxShadow: isHover ? `0 0 12px ${borderAccent}` : 'none',
            }}
          />
          <h3 className="card-category-title">{cat.name}</h3>
          <span className="card-count-badge">{cat.skills.length}</span>
        </div>

        {/* Skills cloud */}
        <motion.div layout style={{
          display: 'flex', flexWrap: 'wrap', gap: 8,
          justifyContent: 'flex-start',
        }}>
          <AnimatePresence>
            {visibleSkills.map((skill, i) => (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.22, delay: i * 0.025 }}
                className={`card-skill-tag ${cat.accent === 'accent-2' ? 'tag-cyan' : ''}`}
                style={{ fontSize: '0.72rem', padding: '5px 14px' }}
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
            className="card-expand-btn"
            style={{ color: accent }}
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

      {/* View toggle */}
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

            {/* Stats */}
            <div className="globe-stats">
              <div className="globe-stat">
                <span className="globe-stat-value">
                  {skillCategories.reduce((a, c) => a + c.skills.length, 0)}
                </span>
                <span className="globe-stat-label">Technologies</span>
              </div>
              <div className="globe-stat">
                <span className="globe-stat-value">{skillCategories.length}</span>
                <span className="globe-stat-label">Categories</span>
              </div>
              <div className="globe-stat">
                <span className="globe-stat-value">
                  {Math.round(
                    skillCategories.reduce((a, c) => a + c.skills.reduce((s, sk) => s + sk.level, 0), 0) /
                    skillCategories.reduce((a, c) => a + c.skills.length, 0)
                  )}%
                </span>
                <span className="globe-stat-label">Avg. Proficiency</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="skills-grid-3d">
              {skillCategories.map((cat, i) => (
                <CategoryCard3D key={cat.name} cat={cat} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
