import { useState } from 'react'

const heroStyles = {
  section: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
    top: '-30%',
    left: '-10%',
    width: '60%',
    height: '80%',
    background: 'radial-gradient(ellipse at center, rgba(74,158,255,0.08) 0%, rgba(179,136,255,0.04) 50%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  greeting: {
    fontSize: '0.8rem',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    marginBottom: 14,
  },
  name: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 800,
    letterSpacing: '-1.5px',
    lineHeight: 1.15,
    marginBottom: 4,
  },
  highlight: {
    color: '#777',
  },
  tagline: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: 20,
    fontWeight: 400,
  },
  subtitle: {
    fontSize: '1rem',
    color: '#888',
    maxWidth: 540,
    marginBottom: 36,
    lineHeight: 1.8,
  },
  cta: {
    display: 'flex',
    gap: 14,
    flexWrap: 'wrap',
  },
}

export default function Hero() {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <section id="hero" style={heroStyles.section}>
      <div style={heroStyles.gradient} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-wrap">
          <div className={`hero-avatar${!imgLoaded ? ' skeleton skeleton-circle' : ''}`}>
            <img
              src="./images/new_profike.png"
              alt="Justine Rhey M. Tambong"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(true)}
              style={imgLoaded ? {} : { display: 'none' }}
            />
          </div>
          <div className="hero-text">
            <p style={heroStyles.greeting}>I build tools that teams actually use</p>
            <h1 style={heroStyles.name}>
              Justine Rhey <span style={heroStyles.highlight}>M. Tambong</span>
            </h1>
            <p style={heroStyles.tagline}>IT Graduate &middot; Java Developer &middot; Problem Solver</p>
            <p style={heroStyles.subtitle}>
              Java developer who ships real features — from DNS monitoring tools to production ticketing systems
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
              <span style={{ padding: '4px 12px', fontSize: '0.75rem', fontWeight: 500, background: 'rgba(59,130,246,0.15)', color: '#93c5fd', borderRadius: 4, border: '1px solid rgba(59,130,246,0.3)' }}>Java</span>
              <span style={{ padding: '4px 12px', fontSize: '0.75rem', fontWeight: 500, background: 'rgba(34,197,94,0.15)', color: '#86efac', borderRadius: 4, border: '1px solid rgba(34,197,94,0.3)' }}>Spring Boot</span>
              <span style={{ padding: '4px 12px', fontSize: '0.75rem', fontWeight: 500, background: 'rgba(249,115,22,0.15)', color: '#fdba74', borderRadius: 4, border: '1px solid rgba(249,115,22,0.3)' }}>REST APIs</span>
              <span style={{ padding: '4px 12px', fontSize: '0.75rem', fontWeight: 500, background: 'rgba(14,165,233,0.15)', color: '#7dd3fc', borderRadius: 4, border: '1px solid rgba(14,165,233,0.3)' }}>Docker</span>
              <span style={{ padding: '4px 12px', fontSize: '0.75rem', fontWeight: 500, background: 'rgba(234,179,8,0.15)', color: '#fde047', borderRadius: 4, border: '1px solid rgba(234,179,8,0.3)' }}>Linux</span>
              <span style={{ padding: '4px 12px', fontSize: '0.75rem', fontWeight: 500, background: 'rgba(168,85,247,0.15)', color: '#d8b4fe', borderRadius: 4, border: '1px solid rgba(168,85,247,0.3)' }}>Networking</span>
            </div>
            <div className="hero-cta" style={heroStyles.cta}>
              <button
                className="btn-primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See What I've Built
              </button>
              <a
                className="btn-resume"
                href="./resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume &darr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
