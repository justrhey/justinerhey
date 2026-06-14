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
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(true)}
              style={imgLoaded ? {} : { display: 'none' }}
            />
          </div>
          <div className="hero-text">
            <p style={heroStyles.greeting}>Learning Java, one project at a time</p>
            <h1 style={heroStyles.name}>
              Justine Rhey <span style={heroStyles.highlight}>M. Tambong</span>
            </h1>
            <p style={heroStyles.tagline}>IT Graduate &middot; Java Developer &middot; Problem Solver</p>
            <p style={heroStyles.subtitle}>
              Building small things to learn the craft. Currently exploring Java, Spring Boot, PHP, and backend development.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
              <span style={{ padding: '4px 12px', fontSize: '0.75rem', fontWeight: 500, background: '#111', color: '#999', borderRadius: 4, border: '1px solid #222', display: 'inline-flex', alignItems: 'center', gap: 6 }}><i className="devicon-java-plain" style={{ fontSize: '0.9rem' }}/> Java</span>
              <span style={{ padding: '4px 12px', fontSize: '0.75rem', fontWeight: 500, background: '#111', color: '#999', borderRadius: 4, border: '1px solid #222', display: 'inline-flex', alignItems: 'center', gap: 6 }}><i className="devicon-spring-plain" style={{ fontSize: '0.9rem' }}/> Spring Boot</span>
              <span style={{ padding: '4px 12px', fontSize: '0.75rem', fontWeight: 500, background: '#111', color: '#999', borderRadius: 4, border: '1px solid #222', display: 'inline-flex', alignItems: 'center', gap: 6 }}><i className="devicon-php-plain" style={{ fontSize: '0.9rem' }}/> PHP</span>
              <span style={{ padding: '4px 12px', fontSize: '0.75rem', fontWeight: 500, background: '#111', color: '#999', borderRadius: 4, border: '1px solid #222', display: 'inline-flex', alignItems: 'center', gap: 6 }}><i className="devicon-postgresql-plain" style={{ fontSize: '0.9rem' }}/> PostgreSQL</span>
              <span style={{ padding: '4px 12px', fontSize: '0.75rem', fontWeight: 500, background: '#111', color: '#999', borderRadius: 4, border: '1px solid #222', display: 'inline-flex', alignItems: 'center', gap: 6 }}><i className="devicon-mysql-plain" style={{ fontSize: '0.9rem' }}/> MySQL</span>
              <span style={{ padding: '4px 12px', fontSize: '0.75rem', fontWeight: 500, background: '#111', color: '#999', borderRadius: 4, border: '1px solid #222', display: 'inline-flex', alignItems: 'center', gap: 6 }}><i className="devicon-docker-plain" style={{ fontSize: '0.9rem' }}/> Docker</span>
              <span style={{ padding: '4px 12px', fontSize: '0.75rem', fontWeight: 500, background: '#111', color: '#999', borderRadius: 4, border: '1px solid #222', display: 'inline-flex', alignItems: 'center', gap: 6 }}><i className="devicon-linux-plain" style={{ fontSize: '0.9rem' }}/> Linux</span>
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
