import { useState } from 'react'

const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 48,
    alignItems: 'start',
  },
  intro: {
    color: '#888',
    fontSize: '1rem',
    lineHeight: 1.8,
    maxWidth: 420,
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginTop: 28,
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontSize: '0.75rem',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  input: {
    padding: '12px 14px',
    background: '#0a0a0a',
    border: '1px solid #1a1a1a',
    color: '#fff',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  textarea: {
    padding: '12px 14px',
    background: '#0a0a0a',
    border: '1px solid #1a1a1a',
    color: '#fff',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
    resize: 'vertical',
    minHeight: 120,
    transition: 'border-color 0.2s',
  },
  btn: {
    padding: '12px 28px',
    border: '1px solid #fff',
    background: '#fff',
    color: '#000',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    alignSelf: 'flex-start',
  },
}

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailto = `mailto:justrhey.tambong021@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0A— ${encodeURIComponent(name)} (${encodeURIComponent(email)})`
    window.location.href = mailto
    setSent(true)
  }

  return (
    <section id="contact">
      <div className="container">
        <p className="section-label">Contact</p>
        <h2 className="section-title">Reach Out</h2>
        <div style={styles.wrapper}>
          <div>
            <p style={styles.intro}>
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
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="name">Name</label>
              <input
                id="name"
                style={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                onFocus={(e) => e.target.style.borderColor = '#555'}
                onBlur={(e) => e.target.style.borderColor = '#1a1a1a'}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                onFocus={(e) => e.target.style.borderColor = '#555'}
                onBlur={(e) => e.target.style.borderColor = '#1a1a1a'}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="message">Message</label>
              <textarea
                id="message"
                style={styles.textarea}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                onFocus={(e) => e.target.style.borderColor = '#555'}
                onBlur={(e) => e.target.style.borderColor = '#1a1a1a'}
              />
            </div>
            <button
              type="submit"
              style={styles.btn}
              onMouseEnter={(e) => { e.target.style.background = '#1a1a1a'; e.target.style.color = '#fff'; e.target.style.borderColor = '#1a1a1a' }}
              onMouseLeave={(e) => { e.target.style.background = '#fff'; e.target.style.color = '#000'; e.target.style.borderColor = '#fff' }}
            >
              {sent ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
