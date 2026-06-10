const styles = {
  wrapper: {
    maxWidth: 500,
  },
  text: {
    color: '#888',
    fontSize: '1rem',
    lineHeight: 1.8,
    marginBottom: 36,
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 20px',
    border: '1px solid #1a1a1a',
    color: '#bbb',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
  },
  linkLabel: {
    color: '#555',
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    minWidth: 60,
  },
}

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <p className="section-label">Contact</p>
        <h2 className="section-title">Reach Out</h2>
        <div style={styles.wrapper}>
          <p style={styles.text}>
            I'm looking for a junior developer role where I can learn and contribute.
            If you'd like to chat, I'd love to hear from you.
          </p>
          <div style={styles.links}>
            <a
              href="mailto:justrhey.tambong021@gmail.com"
              style={styles.link}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#444' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a1a' }}
            >
              <span style={styles.linkLabel}>Email</span>
              justrhey.tambong021@gmail.com
            </a>
            <a
              href="https://github.com/justrhey"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#444' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a1a' }}
            >
              <span style={styles.linkLabel}>GitHub</span>
              github.com/justrhey
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
