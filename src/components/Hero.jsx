const heroStyles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #1a1a1a',
  },
  content: {
    maxWidth: 800,
  },
  greeting: {
    fontSize: '0.85rem',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    marginBottom: 20,
  },
  name: {
    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
    fontWeight: 800,
    letterSpacing: '-2px',
    lineHeight: 1.1,
    marginBottom: 8,
  },
  highlight: {
    color: '#888',
  },
  tagline: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: 28,
    fontWeight: 400,
  },
  subtitle: {
    fontSize: '1.05rem',
    color: '#888',
    maxWidth: 620,
    marginBottom: 40,
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
          <p style={heroStyles.greeting}>Hi, I'm</p>
          <h1 style={heroStyles.name}>
            Justine <span style={heroStyles.highlight}>Rhey</span>
          </h1>
          <p style={heroStyles.tagline}>IT Graduate &bull; Learning Java &amp; Spring Boot</p>
          <p style={heroStyles.subtitle}>
            During my Network Engineer internship at CallHounds Global, I noticed the team was doing manual DNS
            pings through CMD. I thought there might be a better way, so I used my Java knowledge to build
            a small automation tool. That first project led me to discover Spring Boot, and before I knew it,
            I was designing a ticketing system with the IT department head.
            <br /><br />
            I'm still early in my journey, but I love solving problems through code.
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
    </section>
  )
}
