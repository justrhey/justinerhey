import { useState, useEffect, useRef } from 'react'
import useScrollReveal from '../hooks/useScrollReveal.js'

// -- reCAPTCHA -------------------------------------------------
// 1. Go to https://www.google.com/recaptcha/admin
//    (select reCAPTCHA v2 "I'm not a robot")
//    Domain: justrhey.github.io
// 2. In Formspree dashboard (Settings > Spam), add the secret key
// 3. Replace this test key with your actual site key:
const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

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
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 14,
    padding: '14px 20px',
    border: '1px solid #1a1a1a',
    color: '#bbb',
    fontSize: '0.88rem',
    cursor: 'pointer',
    transition: 'all 0.25s',
    textDecoration: 'none',
  },
  linkIcon: {
    width: 20,
    height: 20,
    flexShrink: 0,
    color: '#555',
    transition: 'color 0.25s',
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
    padding: '12px 14px',
    background: '#0a0a0a',
    border: '1px solid #1a1a1a',
    borderRadius: 4,
    color: '#fff',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
  },
  textarea: {
    padding: '12px 14px',
    background: '#0a0a0a',
    border: '1px solid #1a1a1a',
    borderRadius: 4,
    color: '#fff',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
    resize: 'vertical',
    minHeight: 120,
    transition: 'border-color 0.25s, box-shadow 0.25s',
  },
  captchaWrap: {
    marginTop: 4,
    minHeight: 78,
  },
  btn: {
    padding: '14px 32px',
    border: '1px solid #fff',
    background: '#fff',
    color: '#000',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.25s',
    alignSelf: 'flex-start',
    fontFamily: 'inherit',
    borderRadius: 4,
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

const IconMail = () => (
  <svg style={styles.linkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const IconGitHub = () => (
  <svg style={styles.linkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const IconLinkedIn = () => (
  <svg style={styles.linkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const ref = useScrollReveal()
  const captchaRef = useRef(null)
  const scriptLoaded = useRef(false)

  // load reCAPTCHA script once
  useEffect(() => {
    if (scriptLoaded.current || document.querySelector('.g-recaptcha')) return
    const el = document.createElement('script')
    el.src = `https://www.google.com/recaptcha/api.js?render=explicit`
    el.async = true
    el.defer = true
    el.onload = () => {
      if (window.grecaptcha && captchaRef.current) {
        window.grecaptcha.render(captchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: 'dark',
        })
      }
    }
    document.head.appendChild(el)
    scriptLoaded.current = true
  }, [])

  // render captcha if script already loaded (e.g. hot reload)
  useEffect(() => {
    if (window.grecaptcha && window.grecaptcha.render && captchaRef.current) {
      try {
        window.grecaptcha.render(captchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: 'dark',
        })
      } catch { /* already rendered */ }
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')

    const token = window.grecaptcha ? window.grecaptcha.getResponse() : ''
    if (!token) {
      setError('Please complete the captcha.')
      setSending(false)
      return
    }

    try {
      const fd = new FormData()
      fd.append('name', name)
      fd.append('email', email)
      fd.append('message', message)
      fd.append('g-recaptcha-response', token)

      const res = await fetch('https://formspree.io/f/xqapbqyo', {
        method: 'POST',
        body: fd,
        headers: { 'Accept': 'application/json' },
      })
      if (res.ok) {
        setSent(true)
        setName('')
        setEmail('')
        setMessage('')
        if (window.grecaptcha) window.grecaptcha.reset()
      } else {
        const text = await res.text()
        if (text.includes('captcha') || text.includes('CAPTCHA')) {
          setError('Captcha verification failed. Refresh and try again, or email me directly.')
          if (window.grecaptcha) window.grecaptcha.reset()
        } else {
          setError('Form submission failed. Please email me directly — I\'ll respond right away.')
        }
      }
    } catch {
      setError('Could not reach the form service. Drop me an email instead at justrhey.tambong@gmail.com')
    }
    setSending(false)
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
              <a
                href="mailto:justrhey.tambong@gmail.com"
                style={styles.link}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.querySelector('svg').style.color = '#bbb' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.querySelector('svg').style.color = '#555' }}
              >
                <IconMail />
                <span style={styles.linkLabel}>Email</span>
                justrhey.tambong@gmail.com
              </a>
              <a
                href="https://github.com/justrhey"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.querySelector('svg').style.color = '#bbb' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.querySelector('svg').style.color = '#555' }}
              >
                <IconGitHub />
                <span style={styles.linkLabel}>GitHub</span>
                github.com/justrhey
              </a>
              <a
                href="https://linkedin.com/in/justrhey"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.querySelector('svg').style.color = '#bbb' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.querySelector('svg').style.color = '#555' }}
              >
                <IconLinkedIn />
                <span style={styles.linkLabel}>LinkedIn</span>
                linkedin.com/in/justrhey
              </a>
            </div>
          </div>
          <form className="contact-form" style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="name">Name</label>
              <input
                id="name"
                style={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                onFocus={(e) => { e.target.style.borderColor = '#555'; e.target.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.05)' }}
                onBlur={(e) => { e.target.style.borderColor = '#1a1a1a'; e.target.style.boxShadow = 'none' }}
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
                placeholder="you@example.com"
                onFocus={(e) => { e.target.style.borderColor = '#555'; e.target.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.05)' }}
                onBlur={(e) => { e.target.style.borderColor = '#1a1a1a'; e.target.style.boxShadow = 'none' }}
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
                placeholder="What's on your mind?"
                onFocus={(e) => { e.target.style.borderColor = '#555'; e.target.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.05)' }}
                onBlur={(e) => { e.target.style.borderColor = '#1a1a1a'; e.target.style.boxShadow = 'none' }}
              />
            </div>
            <div style={styles.captchaWrap} ref={captchaRef} />

            {sent ? (
              <div style={styles.successBox}>
                <p style={styles.successText}>Message sent!</p>
                <p style={styles.successSub}>Thanks for reaching out — I'll get back to you soon.</p>
              </div>
            ) : (
              <>
                {error && (
                  <div>
                    <p style={{ color: '#e44', fontSize: '0.85rem' }}>{error}</p>
                    <p style={styles.fallbackLink}>
                      <a href="mailto:justrhey.tambong@gmail.com" style={{ color: '#888' }}>
                        justrhey.tambong@gmail.com
                      </a>
                    </p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  style={{ ...styles.btn, opacity: sending ? 0.5 : 1 }}
                  onMouseEnter={(e) => { if (!sending) { e.target.style.background = '#1a1a1a'; e.target.style.color = '#fff'; e.target.style.borderColor = '#1a1a1a' } }}
                  onMouseLeave={(e) => { if (!sending) { e.target.style.background = '#fff'; e.target.style.color = '#000'; e.target.style.borderColor = '#fff' } }}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
