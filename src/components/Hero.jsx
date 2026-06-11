const heroStyles = {
  section: {
    display: 'flex',
    alignItems: 'center',
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
  return (
    <section id="hero" style={heroStyles.section}>
      <div className="container">
        <div className="hero-wrap">
          <div className="hero-avatar">JR</div>
          <div className="hero-text">
            <p style={heroStyles.greeting}>Hi, I'm</p>
            <h1 style={heroStyles.name}>
              Justine Rhey <span style={heroStyles.highlight}>M. Tambong</span>
            </h1>
            <p style={heroStyles.tagline}>IT Graduate &middot; Java Developer &middot; Problem Solver</p>
            <p style={heroStyles.subtitle}>
              BS Information Technology &middot; Java &middot; Spring Boot &middot; Backend Development &middot; Android
            </p>
            <div className="hero-cta" style={heroStyles.cta}>
              <button
                className="btn-primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See What I've Built
              </button>
              <button
                className="btn-outline"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Say Hello
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
