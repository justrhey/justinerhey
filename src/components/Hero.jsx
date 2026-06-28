import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { personal } from '../data/personal'
import { skillCategories } from '../data/skills'

/* ─── Animated gradient blobs ─── */
function BgGradient({ prefersReduced }) {
  if (prefersReduced) return null
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', top: '5%', left: '-5%',
          width: '50%', height: '70%',
          background: 'radial-gradient(ellipse at center, rgba(94,106,210,0.08) 0%, transparent 60%)',
        }}
      />
      <motion.div
        animate={{ x: [0, -60, 50, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', bottom: '10%', right: '-10%',
          width: '45%', height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.06) 0%, transparent 50%)',
        }}
      />
    </div>
  )
}

/* ─── Animated code typing ─── */
const codeLines = [
  { text: 'const engineer = {', delay: 0 },
  { text: '  role: "Backend + AI Full-Stack",', delay: 0.4 },
  { text: '  stack: ["Java", "Rust", "React", "n8n"],', delay: 0.7 },
  { text: '  ships: true,', delay: 1.0 },
  { text: '  status: "available"', delay: 1.3 },
  { text: '}', delay: 1.6 },
]

function TypewriterCode({ anim }) {
  const [visibleLines, setVisibleLines] = useState(anim ? 0 : codeLines.length)

  useEffect(() => {
    if (!anim) return
    const timers = codeLines.map((line, i) =>
      setTimeout(() => setVisibleLines((p) => Math.max(p, i + 1)), (line.delay + 0.3) * 1000)
    )
    return () => timers.forEach(clearTimeout)
  }, [anim])

  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 'clamp(0.7rem, 1.3vw, 0.85rem)',
      lineHeight: 1.8,
      color: 'var(--text-muted)',
      padding: '16px 20px',
      border: '1px solid var(--border-light)',
      borderRadius: 'var(--radius)',
      background: 'var(--bg-elevated)',
      minWidth: 320,
    }}>
      {codeLines.map((line, i) => (
        <motion.div
          key={i}
          initial={anim ? { opacity: 0, x: -8 } : undefined}
          animate={i < visibleLines ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <span style={{ color: 'var(--text-faint)', marginRight: 12 }}>{String(i + 1).padStart(2, '0')}</span>
          <span style={{ color: i === 0 || i === codeLines.length - 1 ? 'var(--accent-2)' : 'var(--text-secondary)' }}>
            {line.text}
          </span>
          {i === visibleLines - 1 && i < codeLines.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              style={{ background: 'var(--accent)', width: 7, height: 14, display: 'inline-block', marginLeft: 2, verticalAlign: 'middle' }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Floating skill cloud ─── */
const floatingSkills = ['Java', 'Rust', 'React', 'Spring Boot', 'PostgreSQL', 'n8n', 'Docker', 'Claude Code', 'Linux', 'Blockchain']

function SkillCloud({ prefersReduced }) {
  if (prefersReduced) return null
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {floatingSkills.map((skill, i) => {
        const x = 15 + (i * 37) % 70
        const y = 10 + (i * 23) % 80
        const duration = 6 + (i % 3) * 2
        const delay = i * 1.2
        return (
          <motion.span
            key={skill}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.3, 0.6, 0] }}
            transition={{ duration, repeat: Infinity, delay, ease: 'linear' }}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: i % 2 === 0 ? 'var(--accent)' : 'var(--accent-2)',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-surface)',
              whiteSpace: 'nowrap',
            }}
          >
            {skill}
          </motion.span>
        )
      })}
    </div>
  )
}

/* ─── Main Hero Component ─── */
export default function Hero() {
  const prefersReduced = useReducedMotion()
  const [imgLoaded, setImgLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const anim = !prefersReduced

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  }

  return (
    <section id="hero" style={{
      display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden',
      minHeight: '100dvh',
    }}>
      <BgGradient prefersReduced={prefersReduced} />
      <SkillCloud prefersReduced={prefersReduced} />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{
            display: 'flex',
            gap: isMobile ? 32 : 64,
            alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          {/* ─── Left: Avatar ─── */}
          <motion.div variants={itemVariants} style={{ flexShrink: 0 }}>
            <div style={{
              position: 'relative',
              width: isMobile ? 160 : 240,
              height: isMobile ? 160 : 240,
            }}>
              <div style={{
                position: 'absolute', inset: -3, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent), var(--accent-2), var(--accent))',
                backgroundSize: '200% 200%',
                animation: anim ? 'gradient-shift 4s ease infinite' : undefined,
                opacity: 0.6,
              }} />
              <div style={{
                width: '100%', height: '100%',
                borderRadius: '50%', overflow: 'hidden',
                background: 'var(--bg-elevated)',
                border: '2px solid var(--bg-deep)',
                position: 'relative',
              }}>
                {!imgLoaded && <div className="skeleton skeleton-circle" style={{ width: '100%', height: '100%' }} />}
                <img
                  src={personal.photoPath}
                  alt={personal.photoAlt}
                  draggable={false}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgLoaded(true)}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center',
                    opacity: imgLoaded ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* ─── Right: Content ─── */}
          <div style={{ flex: 1, minWidth: 0, textAlign: isMobile ? 'center' : 'left' }}>
            {/* Availability badge */}
            {personal.availability && (
              <motion.div variants={itemVariants} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '5px 14px',
                border: '1px solid rgba(34,197,94,0.25)',
                borderRadius: 20,
                background: 'rgba(34,197,94,0.08)',
                marginBottom: 20,
                fontSize: '0.68rem',
                letterSpacing: '1px',
                color: '#22C55E',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#22C55E',
                  boxShadow: '0 0 8px rgba(34,197,94,0.5)',
                }} />
                Available for work
              </motion.div>
            )}

            {/* Name */}
            <motion.h1 variants={itemVariants} style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 12,
            }}>
              {personal.name.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-gradient">{personal.name.split(' ').pop()}</span>
            </motion.h1>

            {/* Tagline with icon */}
            <motion.p variants={itemVariants} style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              marginBottom: 8,
              fontWeight: 500,
            }}>
              <span style={{ color: 'var(--accent)' }}>✦</span> {personal.tagline}
            </motion.p>

            {/* Subtitle */}
            <motion.p variants={itemVariants} style={{
              fontSize: '0.92rem',
              color: 'var(--text-muted)',
              maxWidth: 520,
              lineHeight: 1.7,
              marginBottom: 32,
              marginLeft: isMobile ? 'auto' : undefined,
              marginRight: isMobile ? 'auto' : undefined,
            }}>
              {personal.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} style={{
              display: 'flex', gap: 12, flexWrap: 'wrap',
              justifyContent: isMobile ? 'center' : 'flex-start',
              marginBottom: 40,
            }}>
              <button
                className="btn-primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                </svg>
                See My Work
              </button>
              <a className="btn-secondary" href={personal.resumePath} target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                Resume &darr;
              </a>
            </motion.div>

            {/* Animated Code Block */}
            <motion.div
              variants={itemVariants}
              style={{
                display: isMobile ? 'none' : 'block',
                maxWidth: 480,
              }}
            >
              <TypewriterCode anim={anim} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          style={{
            position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            letterSpacing: '2px', textTransform: 'uppercase',
          }}
        >
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 1, height: 20, background: 'var(--text-faint)' }}
          />
        </motion.div>
      )}

      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  )
}
