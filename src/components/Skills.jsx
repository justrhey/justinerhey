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
  const ref = useRef(null)
  const rafRef = useRef(null)
  const [rotation, setRotation] = useState({ x: 0.3, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 })
  const [mouseFactor, setMouseFactor] = useState({ x: 0, y: 0 })
  const [hoveredSkill, setHoveredSkill] = useState(null)

  // Collect top skills per category for the globe
  const globeSkills = useMemo(() =>
    skillCategories.flatMap(cat =>
      cat.skills.slice(0, 4).map(s => ({ ...s, accent: cat.accent }))
    ),
    []
  )

  // Fibonacci sphere distribution
  const spherePositions = useMemo(() => {
    const n = globeSkills.length
    const radius = 170
    return globeSkills.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / n)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      return {
        ...skill,
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta),
        phi,
        theta,
        radius,
      }
    })
  }, [globeSkills])

  // Auto-rotation
  useEffect(() => {
    if (isDragging) return

    const animate = () => {
      setRotation(prev => ({
        x: prev.x + 0.004,
        y: prev.y + 0.006,
      }))
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [isDragging])

  // Mouse interactivity
  const handlePointerDown = useCallback((e) => {
    setIsDragging(true)
    setLastMouse({ x: e.clientX, y: e.clientY })
  }, [])

  const handlePointerMove = useCallback((e) => {
    if (isDragging) {
      const dx = e.clientX - lastMouse.x
      const dy = e.clientY - lastMouse.y
      setMouseFactor(prev => ({ x: prev.x + dy * 0.005, y: prev.y + dx * 0.005 }))
      setLastMouse({ x: e.clientX, y: e.clientY })
    }
  }, [isDragging, lastMouse])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
    setMouseFactor({ x: 0, y: 0 })
  }, [])

  // Keyboard rotation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') setRotation(prev => ({ ...prev, y: prev.y - 0.15 }))
    if (e.key === 'ArrowRight') setRotation(prev => ({ ...prev, y: prev.y + 0.15 }))
    if (e.key === 'ArrowUp') setRotation(prev => ({ ...prev, x: prev.x + 0.15 }))
    if (e.key === 'ArrowDown') setRotation(prev => ({ ...prev, x: prev.x - 0.15 }))
  }, [])

  const combinedRotation = {
    x: rotation.x + mouseFactor.x,
    y: rotation.y + mouseFactor.y,
  }

  // Compute which items are "visible" (in front) for depth shading
  const visibleItems = spherePositions.map(item => {
    // Apply rotation to position to get effective z-depth
    const cosX = Math.cos(combinedRotation.x)
    const sinX = Math.sin(combinedRotation.x)
    const cosY = Math.cos(combinedRotation.y)
    const sinY = Math.sin(combinedRotation.y)
    // Rotated position (simplified — apply Y rotation then X rotation)
    const y1 = item.y * cosX - item.z * sinX
    const z1 = item.y * sinX + item.z * cosX
    const x1 = item.x * cosY + z1 * sinY
    const z2 = -item.x * sinY + z1 * cosY
    // z2 is the depth coordinate (positive = toward viewer)
    const depthFactor = (z2 + item.radius) / (2 * item.radius)
    return { ...item, depthFactor, x1, y1, z2 }
  })

  // Sort by depth so items in front render on top
  visibleItems.sort((a, b) => b.z2 - a.z2)

  return (
    <div
      ref={ref}
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
      {/* Glow ring behind globe */}
      <div className="globe-ring" />

      {/* Orbital ring lines */}
      <div className="globe-orbit" style={{ transform: 'rotateX(60deg)' }} />
      <div className="globe-orbit" style={{ transform: 'rotateX(0deg)' }} />
      <div className="globe-orbit" style={{ transform: 'rotateX(-60deg)' }} />

      {/* Skill items on sphere surface */}
      {visibleItems.map((item) => {
        const isHovered = hoveredSkill === item.name
        const accent = item.accent === 'accent-2' ? 'var(--accent-2)' : 'var(--accent)'

        return (
          <div
            key={item.name}
            className={`globe-item ${isHovered ? 'globe-item-hovered' : ''}`}
            onMouseEnter={() => setHoveredSkill(item.name)}
            onMouseLeave={() => setHoveredSkill(null)}
            style={{
              transform: `translate3d(${item.x1}px, ${item.y1}px, ${item.z2}px) translate(-50%, -50%)`,
              opacity: Math.max(0.25, item.depthFactor),
              zIndex: Math.round(item.z2 + item.radius),
              borderColor: isHovered ? accent : 'var(--border-light)',
              color: isHovered ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: isHovered
                ? `rgba(94,106,210,0.12)`
                : `rgba(10,10,12,${0.2 + 0.3 * item.depthFactor})`,
              transformOrigin: 'center center',
            }}
          >
            {item.name}
          </div>
        )
      })}

      {/* Center core glow */}
      <div className="globe-core" />

      {/* Drag hint */}
      {!isDragging && (
        <motion.div
          className="globe-hint"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowsClockwise size={14} weight="bold" />
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

  // Skill proficiency bars (circular rings placed below each skill tag)
  const skillMap = useMemo(() => {
    const map = {}
    cat.skills.forEach(s => { map[s.name] = s.level })
    return map
  }, [cat.skills])

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
    transform: isHover ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px)` : 'perspective(1000px) rotateX(0) rotateY(0)',
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
        {/* 3D accent bar — floats with depth */}
        <div
          className="card-accent-bar"
          style={{
            background: `linear-gradient(180deg, ${accent}, transparent)`,
            boxShadow: isHover ? `0 0 16px ${borderAccent}` : 'none',
          }}
        />

        {/* Header with 3D depth effect */}
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

          {/* Skill count badge */}
          <span className="card-count-badge">{cat.skills.length}</span>
        </div>

        {/* Skills cloud — 3D floating tags */}
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
                style={{
                  fontSize: '0.72rem', padding: '5px 14px',
                }}
              >
                {skill.name}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show more / less */}
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
  const [view, setView] = useState('globe') // 'globe' | 'grid'

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

      {/* Content area with animated switch */}
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

            {/* Quick stats under globe */}
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
                  {Math.round(skillCategories.reduce((a, c) => a + c.skills.reduce((s, sk) => s + sk.level, 0), 0) / skillCategories.reduce((a, c) => a + c.skills.length, 0))}%
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
            {/* Category cards — 3D style */}
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
