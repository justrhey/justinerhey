import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { personal } from '../data/personal'

const heroStyles = {
  section: { display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' },
  gradient: {
    position: 'absolute', top: '-30%', left: '-10%', width: '60%', height: '80%',
    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 60%)',
    pointerEvents: 'none', zIndex: 0,
  },
  greeting: { fontSize: '0.8rem', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 14 },
  name: { fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.15, marginBottom: 4 },
  highlight: { color: 'var(--text-dim)' },
  tagline: { fontSize: '1rem', color: 'var(--text-faint)', marginBottom: 20, fontWeight: 400 },
  subtitle: { fontSize: '1rem', color: 'var(--text-muted)', maxWidth: 540, marginBottom: 36, lineHeight: 1.8 },
  cta: { display: 'flex', gap: 14, flexWrap: 'wrap' },
}

function Wrapper({ anim, children, ...props }) {
  if (!anim) return <>{children}</>
  return <motion.div {...props}>{children}</motion.div>
}

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
  const spring = { type: 'spring', stiffness: 100, damping: 20 }

  return (
    <section id="hero" style={heroStyles.section}>
      <div style={heroStyles.gradient} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-wrap" style={isMobile ? { flexDirection: 'column', gap: '32px', textAlign: 'center', alignItems: 'center' } : {}}>
          <Wrapper anim={anim} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...spring, delay: 0.1 }}>
            <div className={`hero-avatar${!imgLoaded ? ' skeleton skeleton-circle' : ''}`}>
              <img
                src={personal.photoPath}
                alt={personal.photoAlt}
                draggable={false}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgLoaded(true)}
                style={imgLoaded ? {} : { display: 'none' }}
              />
            </div>
          </Wrapper>
          <div className="hero-text">
            {personal.availability && (
              <Wrapper anim={anim} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.15 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', border: '1px solid #333', marginBottom: 16, fontSize: '0.65rem', letterSpacing: '1px', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                  Available
                </div>
              </Wrapper>
            )}

            <Wrapper anim={anim} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.2 }}>
              <p style={heroStyles.greeting}>Software Developer</p>
            </Wrapper>
            <Wrapper anim={anim} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.25 }}>
              <h1 style={heroStyles.name}>
                {personal.name.split(' ').slice(0, -1).join(' ')} <span style={heroStyles.highlight}>{personal.name.split(' ').pop()}</span>
              </h1>
            </Wrapper>
            <Wrapper anim={anim} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.3 }}>
              <p style={heroStyles.tagline}>{personal.tagline}</p>
            </Wrapper>
            <Wrapper anim={anim} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.35 }}>
              <p style={heroStyles.subtitle}>{personal.subtitle}</p>
            </Wrapper>
            <Wrapper anim={anim} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.4 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
                {['Java', 'Spring Boot', 'PHP', 'PostgreSQL', 'MySQL', 'JavaScript', 'Docker', 'Linux', 'Laravel', 'Android'].map(t => (
                  <span key={t} style={{ padding: '3px 10px', border: '1px solid #222', fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                ))}
              </div>
            </Wrapper>
            <Wrapper anim={anim} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.45 }}>
              <div className="hero-cta" style={heroStyles.cta}>
                <button className="btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  See What I've Built
                </button>
                <a className="btn-resume" href={personal.resumePath} target="_blank" rel="noopener noreferrer">
                  Resume &darr;
                </a>
              </div>
            </Wrapper>
          </div>
        </div>
      </div>
    </section>
  )
}
