import { useRef, useState, useEffect } from 'react'
import { useForm } from '@formspree/react'
import useScrollReveal from '../hooks/useScrollReveal.js'

const FORMSPREE_ID = 'xzdqajkr'

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  intro: {
    color: '#999',
    fontSize: '0.95rem',
    lineHeight: 1.8,
    marginBottom: 28,
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  linkIcon: {
    width: 20,
    height: 20,
    flexShrink: 0,
  },
  linkLabel: {
    color: '#555',
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    minWidth: 56,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontSize: '0.7rem',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
  },
  input: {
    fontSize: '0.9rem',
    fontFamily: 'inherit',
  },
  textarea: {
    fontSize: '0.9rem',
    fontFamily: 'inherit',
  },
  successBox: {
    padding: 24,
    border: '1px solid #1a3a1a',
    background: '#0a1a0a',
    borderRadius: 4,
    marginBottom: 16,
  },
  successText: {
    color: '#69f0ae',
    fontSize: '1rem',
    fontWeight: 500,
    marginBottom: 6,
  },
  successSub: {
    color: '#666',
    fontSize: '0.85rem',
  },
  fallbackLink: {
    color: '#888',
    fontSize: '0.85rem',
    marginTop: 4,
  },
}

const IconMail = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const IconGitHub = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const IconLinkedIn = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export default function Contact() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID)
  const [formErr, setFormErr] = useState('')
  const [cooldownSecs, setCooldownSecs] = useState(0)
  const ref = useScrollReveal()
  const formRef = useRef(null)

  // Check for active cooldown on mount and after each tick
  const getCooldownRemaining = () => {
    const key = 'portfolio_cooldown'
    try {
      const data = JSON.parse(localStorage.getItem(key))
      if (!data) return 0
      const remaining = Math.ceil((data.time + data.count * 60 * 1000 - Date.now()) / 1000)
      return remaining > 0 ? remaining : 0
    } catch {
      return 0
    }
  }

  // Live countdown ticker
  useEffect(() => {
    if (cooldownSecs <= 0) return
    const interval = setInterval(() => {
      const remaining = getCooldownRemaining()
      if (remaining <= 0) {
        setCooldownSecs(0)
        clearInterval(interval)
      } else {
        setCooldownSecs(remaining)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [cooldownSecs])

  // Initialize cooldown on page load
  useEffect(() => {
    setCooldownSecs(getCooldownRemaining())
  }, [])

  // Reset form on success
  useEffect(() => {
    if (state.succeeded) {
      formRef.current?.reset()
    }
  }, [state.succeeded])

  // Map Formspree errors
  useEffect(() => {
    if (state.errors && state.errors.getFormErrors) {
      const formErrors = state.errors.getFormErrors()
      if (formErrors.length > 0) {
        const err = formErrors[0]
        let msg = 'Something went wrong. Please email me directly.'
        if (err?.message) msg = err.message + ' - please email me directly.'
        setFormErr(msg)
      }
    } else {
      setFormErr('')
    }
  }, [state.errors])

  const startCooldown = () => {
    const key = 'portfolio_cooldown'
    const now = Date.now()
    let data
    try { data = JSON.parse(localStorage.getItem(key)) } catch { data = null }

    if (!data) {
      data = { count: 1, time: now }
    } else {
      data.count = data.count + 1
      data.time = now
    }
    localStorage.setItem(key, JSON.stringify(data))
    setCooldownSecs(data.count * 60)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setFormErr('')

    if (cooldownSecs > 0) return

    startCooldown()
    handleSubmit(e)
  }

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <section id="contact" ref={ref}>
      <div className="container">
        <p className="section-label">Contact</p>
        <h2 className="section-title">Let's Work Together</h2>
        <div className="grid-2">
          <div>
            <p style={styles.intro}>
              I'm ready to build and ship. If you're hiring a junior developer
              who delivers — Java, Spring Boot, Android, or backend — let's talk.
            </p>
            <div style={styles.links}>
              <a href="mailto:justrhey.tambong@gmail.com" className="contact-link">
                <IconMail className="contact-link-icon" />
                <span style={styles.linkLabel}>Email</span>
                justrhey.tambong@gmail.com
              </a>
              <a href="https://github.com/justrhey" target="_blank" rel="noopener noreferrer" className="contact-link">
                <IconGitHub className="contact-link-icon" />
                <span style={styles.linkLabel}>GitHub</span>
                github.com/justrhey
              </a>
              <a href="https://linkedin.com/in/justrhey" target="_blank" rel="noopener noreferrer" className="contact-link">
                <IconLinkedIn className="contact-link-icon" />
                <span style={styles.linkLabel}>LinkedIn</span>
                linkedin.com/in/justrhey
              </a>
            </div>
          </div>

          <form ref={formRef} className="contact-form" style={styles.form} onSubmit={onSubmit}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="name">Name</label>
              <input id="name" name="name" className="contact-input" style={styles.input} required placeholder="Your name" />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="email">Email</label>
              <input id="email" type="email" name="email" className="contact-input" style={styles.input} required placeholder="you@example.com" />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="message">Message</label>
              <textarea id="message" name="message" className="contact-textarea" style={styles.textarea} required placeholder="What's on your mind?" />
            </div>

            {/* Formspree honeypot — must be empty for human submissions */}
            <input type="text" name="_gotcha" style={{ display: 'none' }} />

            <p style={{ color: '#555', fontSize: '0.75rem', marginBottom: 4 }}>
              Or email me directly: <a href="mailto:justrhey.tambong@gmail.com" style={{ color: '#888' }}>justrhey.tambong@gmail.com</a>
            </p>

            {state.succeeded ? (
              <div style={styles.successBox}>
                <p style={styles.successText}>Message sent!</p>
                <p style={styles.successSub}>Thanks for reaching out — I'll get back to you soon.</p>
              </div>
            ) : (
              <>
                {cooldownSecs > 0 ? (
                  <p style={{ color: '#e44', fontSize: '0.85rem' }}>
                    Wait {formatTime(cooldownSecs)} before sending again
                  </p>
                ) : formErr ? (
                  <div>
                    <p style={{ color: '#e44', fontSize: '0.85rem' }}>{formErr}</p>
                    <p style={styles.fallbackLink}>
                      <a href="mailto:justrhey.tambong@gmail.com" style={{ color: '#888' }}>justrhey.tambong@gmail.com</a>
                    </p>
                  </div>
                ) : null}
                <button type="submit" disabled={state.submitting || cooldownSecs > 0}
                        className="btn-submit">
                  {state.submitting ? 'Sending...' : cooldownSecs > 0 ? `Wait ${formatTime(cooldownSecs)}` : 'Send Message'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
