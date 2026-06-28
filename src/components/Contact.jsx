import { useState, useEffect, useRef } from 'react'
import { useForm } from '@formspree/react'
import { SectionWrapper } from '../helpers/SectionWrapper'
import { AnimateOnScroll } from '../helpers/AnimateOnScroll'

const FORMSPREE_ID = 'xzdqajkr'

const getErrors = (data) => {
  const errors = {}
  if (!data.name || data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters'
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Please enter a valid email'
  if (!data.message || data.message.trim().length < 10) errors.message = 'Message must be at least 10 characters'
  return errors
}

export default function Contact() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [formErr, setFormErr] = useState('')
  const formRef = useRef(null)
  const [cooldownSecs, setCooldownSecs] = useState(0)

  const getCooldownRemaining = () => {
    try {
      const data = JSON.parse(localStorage.getItem('portfolio_cooldown'))
      if (!data) return 0
      return Math.max(0, Math.ceil((data.time + data.count * 60 * 1000 - Date.now()) / 1000))
    } catch { return 0 }
  }

  useEffect(() => {
    if (cooldownSecs <= 0) return
    const interval = setInterval(() => {
      const r = getCooldownRemaining()
      if (r <= 0) { setCooldownSecs(0); clearInterval(interval) }
      else setCooldownSecs(r)
    }, 1000)
    return () => clearInterval(interval)
  }, [cooldownSecs])

  useEffect(() => { setCooldownSecs(getCooldownRemaining()) }, [])

  // Restore draft
  useEffect(() => {
    try {
      const draft = localStorage.getItem('portfolio_contactDraft')
      if (draft) setFormData(JSON.parse(draft))
    } catch {}
  }, [])

  // Save draft
  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    try { localStorage.setItem('portfolio_contactDraft', JSON.stringify(formData)) } catch {}
  }, [formData])

  useEffect(() => {
    if (state.succeeded) {
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
      try { localStorage.removeItem('portfolio_contactDraft') } catch {}
    }
  }, [state.succeeded])

  useEffect(() => {
    if (state.errors?.getFormErrors?.()?.length > 0) {
      setFormErr('Something went wrong. Please email me directly.')
    } else { setFormErr('') }
  }, [state.errors])

  const startCooldown = () => {
    const now = Date.now()
    let data
    try { data = JSON.parse(localStorage.getItem('portfolio_cooldown')) } catch { data = null }
    if (!data) data = { count: 1, time: now }
    else { data.count += 1; data.time = now }
    localStorage.setItem('portfolio_cooldown', JSON.stringify(data))
    setCooldownSecs(data.count * 60)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = getErrors(formData)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    if (cooldownSecs > 0) return
    startCooldown()
    handleSubmit(e)
  }

  const updateField = (field, value) => {
    setFormData(p => ({ ...p, [field]: value }))
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }))
  }

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  return (
    <SectionWrapper id="contact">
      <AnimateOnScroll direction="up">
        <h2 className="section-title">Let's Work Together</h2>
      </AnimateOnScroll>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="contact-layout">
        <AnimateOnScroll direction="left">
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem', letterSpacing: '0.5px',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            marginBottom: 28,
          }}>
            I'm always open to interesting work — whether it's a full-stack role,
            AI automation project, or something that needs a backend engineer who can
            figure things out from scratch. Let's talk.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="mailto:justrhey.tambong@gmail.com" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem', letterSpacing: '1px',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              padding: '8px 12px',
              background: 'var(--bg-deep)',
              borderTop: '1px solid var(--border-left)',
              borderBottom: '1px solid var(--border-dark)',
              borderLeft: '1px solid var(--border-left)',
              borderRight: '1px solid var(--border-right)',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" style={{ flexShrink: 0 }}>
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>justrhey.tambong@gmail.com</span>
            </a>
            <a href="https://github.com/justrhey" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem', letterSpacing: '1px',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              padding: '8px 12px',
              background: 'var(--bg-deep)',
              borderTop: '1px solid var(--border-left)',
              borderBottom: '1px solid var(--border-dark)',
              borderLeft: '1px solid var(--border-left)',
              borderRight: '1px solid var(--border-right)',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" style={{ flexShrink: 0 }}>
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <span>github.com/justrhey</span>
            </a>
            <a href="https://linkedin.com/in/justrhey" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem', letterSpacing: '1px',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              padding: '8px 12px',
              background: 'var(--bg-deep)',
              borderTop: '1px solid var(--border-left)',
              borderBottom: '1px solid var(--border-dark)',
              borderLeft: '1px solid var(--border-left)',
              borderRight: '1px solid var(--border-right)',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" style={{ flexShrink: 0 }}>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
              </svg>
              <span>linkedin.com/in/justrhey</span>
            </a>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll direction="right" delay={0.15}>
          {state.succeeded ? (
            <div className="dash-card">
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem', letterSpacing: '2px',
                marginBottom: 6,
              }}>Message sent!</p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem', letterSpacing: '0.5px',
                color: 'var(--text-muted)',
              }}>Thanks for reaching out — I'll get back to you soon.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} style={{
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div>
                <label className="dash-label" htmlFor="name">Name</label>
                <input
                  id="name" value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="dash-input"
                  placeholder="Your name"
                />
                {errors.name && <p style={{ color: 'var(--warn)', fontSize: '0.65rem', marginTop: 4 }}>{errors.name}</p>}
              </div>
              <div>
                <label className="dash-label" htmlFor="email">Email</label>
                <input
                  id="email" type="email" value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="dash-input"
                  placeholder="you@example.com"
                />
                {errors.email && <p style={{ color: 'var(--warn)', fontSize: '0.65rem', marginTop: 4 }}>{errors.email}</p>}
              </div>
              <div>
                <label className="dash-label" htmlFor="message">Message</label>
                <textarea
                  id="message" value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className="dash-textarea"
                  placeholder="What's on your mind?"
                />
                {errors.message && <p style={{ color: 'var(--warn)', fontSize: '0.65rem', marginTop: 4 }}>{errors.message}</p>}
              </div>

              <input type="text" name="_gotcha" style={{ display: 'none' }} />

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem', letterSpacing: '1px',
                color: 'var(--text-faint)',
              }}>
                Or email me directly:{' '}
                <a href="mailto:justrhey.tambong@gmail.com" style={{ color: 'var(--text-muted)' }}>
                  justrhey.tambong@gmail.com
                </a>
              </p>

              {cooldownSecs > 0 ? (
                <p style={{ color: 'var(--warn)', fontSize: '0.75rem' }}>
                  Wait {formatTime(cooldownSecs)} before sending again
                </p>
              ) : formErr ? (
                <div>
                  <p style={{ color: 'var(--warn)', fontSize: '0.75rem' }}>{formErr}</p>
                  <p style={{ marginTop: 4 }}>
                    <a href="mailto:justrhey.tambong@gmail.com" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      justrhey.tambong@gmail.com
                    </a>
                  </p>
                </div>
              ) : null}

              <button type="submit" disabled={state.submitting || cooldownSecs > 0} className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                {state.submitting ? 'Sending...' : cooldownSecs > 0 ? `Wait ${formatTime(cooldownSecs)}` : 'Send Message'}
              </button>
            </form>
          )}
        </AnimateOnScroll>
      </div>
    </SectionWrapper>
  )
}
