import { useState, useEffect, useRef } from 'react'
import { useForm } from '@formspree/react'
import { SectionWrapper } from '../helpers/SectionWrapper'
import { AnimateOnScroll } from '../helpers/AnimateOnScroll'
import { Envelope, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'

const FORMSPREE_ID = 'xzdqajkr'

const iconMap = {
  email: Envelope,
  github: GithubLogo,
  linkedin: LinkedinLogo,
}

const contactLinks = [
  { name: 'Email', url: 'mailto:justrhey.tambong@gmail.com', icon: 'email', value: 'justrhey.tambong@gmail.com' },
  { name: 'GitHub', url: 'https://github.com/justrhey', icon: 'github', value: 'github.com/justrhey' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/justrhey', icon: 'linkedin', value: 'linkedin.com/in/justrhey' },
]

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
  const formRef = useRef(null)
  const mounted = useRef(false)

  // Restore draft from localStorage
  useEffect(() => {
    try {
      const draft = localStorage.getItem('portfolio_contactDraft')
      if (draft) setFormData(JSON.parse(draft))
    } catch { /* ignore */ }
    mounted.current = true
  }, [])

  // Save draft on change
  useEffect(() => {
    if (!mounted.current) return
    try {
      localStorage.setItem('portfolio_contactDraft', JSON.stringify(formData))
    } catch { /* ignore */ }
  }, [formData])

  // Reset on success
  useEffect(() => {
    if (state.succeeded) {
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
      try { localStorage.removeItem('portfolio_contactDraft') } catch { /* ignore */ }
    }
  }, [state.succeeded])

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = getErrors(formData)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    handleSubmit(e)
  }

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  return (
    <SectionWrapper id="contact">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Info */}
        <AnimateOnScroll direction="left">
          <p className="text-[#666] text-xs uppercase tracking-[3px] mb-3 font-mono">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
            Let's Work Together
          </h2>
          <p className="text-[#888] text-sm md:text-base leading-relaxed mb-8">
            If you are hiring a junior developer who delivers — Java, Spring Boot, Android, or backend — let us talk.
          </p>

          <div className="flex flex-col gap-3">
            {contactLinks.map((link) => {
              const Icon = iconMap[link.icon]
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="cursor-target inline-flex items-center gap-3 px-4 py-3 border border-[#1a1a1a] text-[#888] text-sm transition-all hover:border-[#555] hover:text-white"
                >
                  {Icon && <Icon size={18} className="text-[#666]" />}
                  <span className="text-[0.6rem] uppercase tracking-[1px] text-[#555] min-w-[44px]">{link.name}</span>
                  {link.value}
                </a>
              )
            })}
          </div>
        </AnimateOnScroll>

        {/* Form */}
        <AnimateOnScroll direction="right" delay={0.15}>
          {state.succeeded ? (
            <div className="p-6 border border-[#1a1a1a] bg-[#0a0a0a]">
              <p className="text-white text-lg font-semibold mb-2">Message sent!</p>
              <p className="text-[#888] text-sm">Thanks for reaching out — I will get back to you soon.</p>
            </div>
          ) : (
            <form ref={formRef} className="flex flex-col gap-5" onSubmit={onSubmit}>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-[0.65rem] uppercase tracking-[1.5px] text-[#666]">Name</label>
                <input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="px-3 py-2.5 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-sm outline-none transition-colors focus:border-[#555]"
                />
                {errors.name && <p className="text-[#e44] text-xs mt-0.5">{errors.name}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-[0.65rem] uppercase tracking-[1.5px] text-[#666]">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="px-3 py-2.5 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-sm outline-none transition-colors focus:border-[#555]"
                />
                {errors.email && <p className="text-[#e44] text-xs mt-0.5">{errors.email}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[0.65rem] uppercase tracking-[1.5px] text-[#666]">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className="px-3 py-2.5 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-sm outline-none transition-colors focus:border-[#555] resize-vertical min-h-[120px]"
                />
                {errors.message && <p className="text-[#e44] text-xs mt-0.5">{errors.message}</p>}
              </div>

              <input type="text" name="_gotcha" style={{ display: 'none' }} />

              {state.errors?.getFormErrors?.().length > 0 && (
                <p className="text-[#e44] text-xs">Something went wrong. Please email me directly.</p>
              )}

              <button
                type="submit"
                disabled={state.submitting}
                className="self-start px-6 py-3 border border-white bg-white text-black text-sm font-semibold transition-all hover:bg-[#ccc] hover:border-[#ccc] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </AnimateOnScroll>
      </div>
    </SectionWrapper>
  )
}
