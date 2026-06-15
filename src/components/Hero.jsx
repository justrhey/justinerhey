import { useState, useEffect } from 'react'

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
    color: 'var(--text-faint)',
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
    color: 'var(--text-dim)',
  },
  tagline: {
    fontSize: '1rem',
    color: 'var(--text-faint)',
    marginBottom: 20,
    fontWeight: 400,
  },
  subtitle: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section id="hero" style={heroStyles.section}>
      <div style={heroStyles.gradient} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-wrap" style={isMobile ? { flexDirection: 'column', gap: '32px', textAlign: 'center' } : {}}>
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }} dangerouslySetInnerHTML={{
              __html: [
                '<img src="https://img.shields.io/badge/Java-007396?logo=java&logoColor=white&style=for-the-badge" alt="Java" />',
                '<img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?logo=springboot&logoColor=white&style=for-the-badge" alt="Spring Boot" />',
                '<img src="https://img.shields.io/badge/PHP-777BB4?logo=php&logoColor=white&style=for-the-badge" alt="PHP" />',
                '<img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=for-the-badge" alt="PostgreSQL" />',
                '<img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white&style=for-the-badge" alt="MySQL" />',
                '<img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge" alt="JavaScript" />',
                '<img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge" alt="Docker" />',
                '<img src="https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=black&style=for-the-badge" alt="Linux" />',
                '<img src="https://img.shields.io/badge/Laravel-FF2D20?logo=laravel&logoColor=white&style=for-the-badge" alt="Laravel" />',
                '<img src="https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white&style=for-the-badge" alt="Android" />'
              ].join(' ')
            }} />
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
console.log("HERO_SOURCE_READY")
