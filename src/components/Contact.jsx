import { useRef, useState, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal.js'

const FORMSPREE_ID = 'xzdqajkr'
const RECAPTCHA_SITE_KEY = '6LcxIhktAAAAAJblepWiL2LThw3lT_WWVkz4iy3x'

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
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [captchaErr, setCaptchaErr] = useState('')
  const ref = useScrollReveal()
  const formRef = useRef(null)
  const captchaContainerRef = useRef(null)
  const widgetIdRef = useRef(null)

  // render captcha once API is ready
  useEffect(() => {
    const renderWidget = () => {
      if (!captchaContainerRef.current || widgetIdRef.current !== null) return
      if (typeof window.grecaptcha?.render !== 'function') return
      widgetIdRef.current = window.grecaptcha.render(captchaContainerRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        theme: 'dark',
      })
    }
    // Try now
    if (window.recaptchaApiReady) { renderWidget(); return }
    // Poll until ready
    const interval = setInterval(() => {
      if (window.recaptchaApiReady) { renderWidget(); clearInterval(interval) }
    }, 200)
    return () => clearInterval(interval)
  }, [])

  // rate limiter — first 3 tries free, then 1min wait stacking up
  const checkRateLimit = () => {
    const key = 'portfolio_submit_count'
    const hour = 60 * 60 * 1000
    const now = Date.now()
    let data
    try { data = JSON.parse(localStorage.getItem(key)) } catch { data = null }

    // Reset if more than an hour has passed
    if (!data || now - data.time > hour) {
      localStorage.setItem(key, JSON.stringify({ count: 1, time: now }))
      return { allowed: true }
    }

    data.count++
    localStorage.setItem(key, JSON.stringify(data))

    // First 3 tries — always allowed
    if (data.count <= 3) return { allowed: true }

    // After 3: wait time stacks (1min, 2min, 3min...)
    const waitMinutes = data.count - 3
    const nextAllowed = data.time + waitMinutes * 60 * 1000
    if (now < nextAllowed) {
      data.count-- // undo the increment since we're blocking
      localStorage.setItem(key, JSON.stringify(data))
      return { allowed: false, wait: waitMinutes }
    }

    return { allowed: true }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrMsg('')
    setCaptchaErr('')

    // Get captcha token directly from the rendered widget
    const token = typeof window.grecaptcha?.getResponse === 'function'
      ? window.grecaptcha.getResponse(widgetIdRef.current)
      : ''

    if (!token) {
      setCaptchaErr('Please complete the captcha.')
      return
    }

    const limit = checkRateLimit()
    if (!limit.allowed) {
      setCaptchaErr(`Too fast. Please wait ${limit.wait} minute${limit.wait > 1 ? 's' : ''} before trying again.`)
      return
    }

    setSubmitting(true)

    try {
      // Build form data and inject captcha token
      const formData = new FormData(formRef.current)
      formData.set('g-recaptcha-response', token)

      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setSent(true)
        formRef.current.reset()
        if (window.grecaptcha && widgetIdRef.current !== null) {
          window.grecaptcha.reset(widgetIdRef.current)
        }
      } else {
        let msg = 'Something went wrong. Please email me directly.'
        try {
          const data = await res.json()
          if (data?.error) msg = data.error + ' — please email me directly.'
        } catch {}
        setErrMsg(msg)
      }
    } catch {
      setErrMsg('Network error. Please email me directly.')
    } finally {
      setSubmitting(false)
    }
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
              <a href="mailto:justinerhey021@gmail.com" style={styles.link}
                 onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.querySelector('svg').style.color = '#bbb' }}
                 onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.querySelector('svg').style.color = '#555' }}>
                <IconMail />
                <span style={styles.linkLabel}>Email</span>
                justinerhey021@gmail.com
              </a>
              <a href="https://github.com/justrhey" target="_blank" rel="noopener noreferrer" style={styles.link}
                 onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.querySelector('svg').style.color = '#bbb' }}
                 onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.querySelector('svg').style.color = '#555' }}>
                <IconGitHub />
                <span style={styles.linkLabel}>GitHub</span>
                github.com/justrhey
              </a>
              <a href="https://linkedin.com/in/justrhey" target="_blank" rel="noopener noreferrer" style={styles.link}
                 onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.querySelector('svg').style.color = '#bbb' }}
                 onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.querySelector('svg').style.color = '#555' }}>
                <IconLinkedIn />
                <span style={styles.linkLabel}>LinkedIn</span>
                linkedin.com/in/justrhey
              </a>
            </div>
          </div>

          <form ref={formRef} className="contact-form" style={styles.form} onSubmit={onSubmit}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="name">Name</label>
              <input id="name" name="name" style={styles.input} required placeholder="Your name"
                     onFocus={(e) => { e.target.style.borderColor = '#555'; e.target.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.05)' }}
                     onBlur={(e) => { e.target.style.borderColor = '#1a1a1a'; e.target.style.boxShadow = 'none' }} />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="email">Email</label>
              <input id="email" type="email" name="email" style={styles.input} required placeholder="you@example.com"
                     onFocus={(e) => { e.target.style.borderColor = '#555'; e.target.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.05)' }}
                     onBlur={(e) => { e.target.style.borderColor = '#1a1a1a'; e.target.style.boxShadow = 'none' }} />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="message">Message</label>
              <textarea id="message" name="message" style={styles.textarea} required placeholder="What's on your mind?"
                        onFocus={(e) => { e.target.style.borderColor = '#555'; e.target.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.05)' }}
                        onBlur={(e) => { e.target.style.borderColor = '#1a1a1a'; e.target.style.boxShadow = 'none' }} />
            </div>

            {/* Formspree honeypot — must be empty for human submissions */}
            <input type="text" name="_gotcha" style={{ display: 'none' }} />

            {/* reCAPTCHA rendered here once API loads */}
            <div ref={captchaContainerRef} style={{ marginTop: 4, minHeight: 78 }} />

            <p style={{ color: '#555', fontSize: '0.75rem', marginBottom: 4 }}>
              Or email me directly: <a href="mailto:justinerhey021@gmail.com" style={{ color: '#888' }}>justinerhey021@gmail.com</a>
            </p>

            {sent ? (
              <div style={styles.successBox}>
                <p style={styles.successText}>Message sent!</p>
                <p style={styles.successSub}>Thanks for reaching out — I'll get back to you soon.</p>
              </div>
            ) : (
              <>
                {(captchaErr || errMsg) && (
                  <div>
                    <p style={{ color: '#e44', fontSize: '0.85rem' }}>{captchaErr || errMsg}</p>
                    {errMsg && (
                      <p style={styles.fallbackLink}>
                        <a href="mailto:justinerhey021@gmail.com" style={{ color: '#888' }}>justinerhey021@gmail.com</a>
                      </p>
                    )}
                  </div>
                )}
                <button type="submit" disabled={submitting}
                        style={{ ...styles.btn, opacity: submitting ? 0.5 : 1 }}
                        onMouseEnter={(e) => { if (!submitting) { e.target.style.background = '#1a1a1a'; e.target.style.color = '#fff'; e.target.style.borderColor = '#1a1a1a' } }}
                        onMouseLeave={(e) => { if (!submitting) { e.target.style.background = '#fff'; e.target.style.color = '#000'; e.target.style.borderColor = '#fff' } }}>
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
