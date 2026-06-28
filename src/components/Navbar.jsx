import { useState, useEffect } from 'react'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { motion, AnimatePresence } from 'motion/react'

const sections = ['Experience', 'Skills', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useScrollSpy(sections.map(s => s.toLowerCase()), 80)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(2,2,3,0.82)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px) saturate(1.5)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(1.5)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      transition: 'background 0.4s ease, border-color 0.4s ease',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 24px', maxWidth: 1200, margin: '0 auto',
        height: 'var(--nav-height)',
      }}>
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em',
            cursor: 'pointer', background: 'none', border: 'none', color: 'var(--text-primary)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
            display: 'inline-block',
          }} />
          justrhey
          <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>.dev</span>
        </button>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {sections.map((s) => {
            const isActive = activeId === s.toLowerCase()
            return (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  background: isActive ? 'var(--accent-dim)' : 'transparent',
                  border: 'none',
                  color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => { if (!isActive) e.target.style.color = 'var(--text-primary)' }}
                onMouseLeave={(e) => { if (!isActive) e.target.style.color = 'var(--text-muted)' }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    style={{
                      position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
                      width: 16, height: 2, borderRadius: 1,
                      background: 'var(--accent)',
                    }}
                  />
                )}
                {s}
              </button>
            )
          })}
        </nav>

        {/* Hamburger */}
        <button
          className="hamburger"
          style={{
            background: 'none', border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
            fontSize: '1.1rem', cursor: 'pointer', padding: '8px 10px',
            fontFamily: 'inherit', lineHeight: 1, display: 'none',
          }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', borderTop: '1px solid var(--border)' }}
          >
            <div style={{ padding: '8px 24px 16px', background: 'rgba(2,2,3,0.95)' }}>
              {sections.map((s) => (
                <button
                  key={s}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '10px 0', background: 'none', border: 'none',
                    fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
                    color: activeId === s.toLowerCase() ? 'var(--accent)' : 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                  onClick={() => scrollTo(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
