import { useRef, useState, useEffect } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import useScrollReveal from '../hooks/useScrollReveal.js'

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
  const [state, handleSubmit] = useForm('xzdqajkr')
  const [captchaErr, setCaptchaErr] = useState('')
  const [recaptchaReady, setRecaptchaReady] = useState(window._recaptchaReady || false)
  const ref = useScrollReveal()
  const captchaInputRef = useRef(null)
  const captchaContainerRef = useRef(null)
  const captchaRendered = useRef(false)
  const formRef = useRef(null)

  // listen for reCAPTCHA API ready event
  useEffect(() => {
    const onReady = () => setRecaptchaReady(true)
    window.addEventListener('recaptcha-ready', onReady)
    if (window._recaptchaReady) setRecaptchaReady(true)
    return () => window.removeEventListener('recaptcha-ready', onReady)
  }, [])

  // render the captcha widget once the API is ready and the container exists
  useEffect(() => {
    if (recaptchaReady && captchaContainerRef.current && !captchaRendered.current) {
      captchaRendered.current = true
      window.grecaptcha.render(captchaContainerRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        theme: 'dark',
      })
    }
  }, [recaptchaReady])

  // native submit listener — fires before React's onSubmit
  // sets the captcha token so Formspree picks it up
  useEffect(() => {
    const form = formRef.current
    if (!form || form.dataset.captchaReady) return
    form.dataset.captchaReady = '1'
    const handler = () => {
      const token = window.grecaptcha ? window.grecaptcha.getResponse() : ''
      if (captchaInputRef.current) {
        captchaInputRef.current.value = token
      }
    }
    form.addEventListener('submit', handler)
    return () => form.removeEventListener('submit', handler)
  }, [])

  const onSubmit = (e) => {
    const token = window.grecaptcha ? window.grecaptcha.getResponse() : ''
    if (!token) {
      e.preventDefault()
      setCaptchaErr('Please complete the captcha.')
      return
    }
    setCaptchaErr('')
    // token already set by the native listener — just let Formspree handle it
    handleSubmit(e)
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
              <a href="mailto:justrhey.tambong@gmail.com" style={styles.link}
                 onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.querySelector('svg').style.color = '#bbb' }}
                 onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.querySelector('svg').style.color = '#555' }}>
                <IconMail />
                <span style={styles.linkLabel}>Email</span>
                justrhey.tambong@gmail.com
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
              <ValidationError field="name" errors={state.errors} />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="email">Email</label>
              <input id="email" type="email" name="email" style={styles.input} required placeholder="you@example.com"
                     onFocus={(e) => { e.target.style.borderColor = '#555'; e.target.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.05)' }}
                     onBlur={(e) => { e.target.style.borderColor = '#1a1a1a'; e.target.style.boxShadow = 'none' }} />
              <ValidationError field="email" errors={state.errors} />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="message">Message</label>
              <textarea id="message" name="message" style={styles.textarea} required placeholder="What's on your mind?"
                        onFocus={(e) => { e.target.style.borderColor = '#555'; e.target.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.05)' }}
                        onBlur={(e) => { e.target.style.borderColor = '#1a1a1a'; e.target.style.boxShadow = 'none' }} />
              <ValidationError field="message" errors={state.errors} />
            </div>

            {/* hidden captcha token — value set by native submit listener */}
            <input type="hidden" name="g-recaptcha-response" ref={captchaInputRef} />

            {/* reCAPTCHA rendered here once API loads */}
            <div ref={captchaContainerRef} style={{ marginTop: 4, minHeight: 78 }} />

            {state.succeeded ? (
              <div style={styles.successBox}>
                <p style={styles.successText}>Message sent!</p>
                <p style={styles.successSub}>Thanks for reaching out — I'll get back to you soon.</p>
              </div>
            ) : (
              <>
                {(captchaErr || state.errors?.length > 0) && (
                  <div>
                    {captchaErr && <p style={{ color: '#e44', fontSize: '0.85rem' }}>{captchaErr}</p>}
                    {!captchaErr && state.errors?.length > 0 && (
                      <p style={{ color: '#e44', fontSize: '0.85rem' }}>Something went wrong. Email me directly instead.</p>
                    )}
                    <p style={styles.fallbackLink}>
                      <a href="mailto:justrhey.tambong@gmail.com" style={{ color: '#888' }}>justrhey.tambong@gmail.com</a>
                    </p>
                  </div>
                )}
                <button type="submit" disabled={state.submitting}
                        style={{ ...styles.btn, opacity: state.submitting ? 0.5 : 1 }}
                        onMouseEnter={(e) => { if (!state.submitting) { e.target.style.background = '#1a1a1a'; e.target.style.color = '#fff'; e.target.style.borderColor = '#1a1a1a' } }}
                        onMouseLeave={(e) => { if (!state.submitting) { e.target.style.background = '#fff'; e.target.style.color = '#000'; e.target.style.borderColor = '#fff' } }}>
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
