const heroStyles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    maxWidth: 800,
    display: 'flex',
    gap: 48,
    alignItems: 'center',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: '50%',
    background: '#111',
    border: '2px solid #222',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#444',
    letterSpacing: '-1px',
    flexShrink: 0,
  },
  textWrap: {
    flex: 1,
  },
  greeting: {
    fontSize: '0.85rem',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    marginBottom: 16,
  },
  name: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 800,
    letterSpacing: '-1.5px',
    lineHeight: 1.15,
    marginBottom: 6,
  },
  highlight: {
    color: '#888',
  },
  tagline: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: 24,
    fontWeight: 400,
  },
  subtitle: {
    fontSize: '1rem',
    color: '#888',
    maxWidth: 580,
    marginBottom: 32,
    lineHeight: 1.8,
  },
  cta: {
    display: 'inline-flex',
    gap: 16,
  },
  btn: {
    padding: '14px 36px',
    border: '1px solid #fff',
    background: '#fff',
    color: '#000',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    letterSpacing: '0.5px',
  },
  btnOutlined: {
    padding: '14px 36px',
    border: '1px solid #333',
    background: 'transparent',
    color: '#fff',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    letterSpacing: '0.5px',
  },
}

export default function Hero() {
  return (
    <section id="hero" style={heroStyles.section}>
      <div className="container">
        <div style={heroStyles.content}>
          <div style={heroStyles.avatar}>JR</div>
          <div style={heroStyles.textWrap}>
            <p style={heroStyles.greeting}>Hi, I'm</p>
            <h1 style={heroStyles.name}>
              Justine Rhey <span style={heroStyles.highlight}>M. Tambong</span>
            </h1>
            <p style={heroStyles.tagline}>IT Graduate — Learning Java &amp; Spring Boot</p>
            <p style={heroStyles.subtitle}>
              BS Information Technology &middot; Java &middot; Spring Boot &middot; Backend Development &middot; Android
            </p>
            <div style={heroStyles.cta}>
              <button
                style={heroStyles.btn}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                onMouseEnter={(e) => { e.target.style.background = '#1a1a1a'; e.target.style.color = '#fff'; e.target.style.borderColor = '#1a1a1a' }}
                onMouseLeave={(e) => { e.target.style.background = '#fff'; e.target.style.color = '#000'; e.target.style.borderColor = '#fff' }}
              >
                See What I've Built
              </button>
              <button
                style={heroStyles.btnOutlined}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                onMouseEnter={(e) => { e.target.style.borderColor = '#fff' }}
                onMouseLeave={(e) => { e.target.style.borderColor = '#333' }}
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
