import { useState, useEffect, useRef } from 'react'
import useScrollReveal from '../hooks/useScrollReveal.js'

// -- reCAPTCHA -------------------------------------------------
// 1. Get YOUR OWN free keys at https://www.google.com/recaptcha/admin
//    (select reCAPTCHA v2 "I'm not a robot")
// 2. In Formspree dashboard (Settings > Spam), add the secret key
// 3. Replace this test key with your actual site key:
const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

const styles = {
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
  captchaWrap: {
    marginTop: 4,
    minHeight: 78,
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
  fallbackLink: {
    color: '#888',
    fontSize: '0.85rem',
    marginTop: 4,
  },
}

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
        <h2 className="section-title">Reach Out</h2>
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
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#444' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a1a' }}
              >
                <span style={styles.linkLabel}>Email</span>
                justrhey.tambong@gmail.com
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
              <a
                href="https://linkedin.com/in/justrhey"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#444' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a1a' }}
              >
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
            <div style={styles.captchaWrap} ref={captchaRef} />

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
              style={{ ...styles.btn, opacity: sending ? 0.6 : 1 }}
              onMouseEnter={(e) => { if (!sending) { e.target.style.background = '#1a1a1a'; e.target.style.color = '#fff'; e.target.style.borderColor = '#1a1a1a' } }}
              onMouseLeave={(e) => { if (!sending) { e.target.style.background = '#fff'; e.target.style.color = '#000'; e.target.style.borderColor = '#fff' } }}
            >
              {sending ? 'Sending...' : sent ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
