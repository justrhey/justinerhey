import { useState, useEffect } from 'react'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { motion, AnimatePresence } from 'motion/react'
import { Code } from '@phosphor-icons/react'

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

  // Nav button component
  function NavBtn({ s }) {
    const isActive = activeId === s.toLowerCase()
    return (
      <button
        onClick={() => scrollTo(s)}
        className={`nav-btn ${isActive ? 'nav-btn-active' : ''}`}
      >
        {isActive && (
          <motion.span
            layoutId="nav-indicator"
            className="nav-indicator"
          />
        )}
        <span className={`nav-btn-text ${isActive ? 'nav-btn-text-active' : ''}`}>
          {isActive && <span className="nav-arrow">&gt;</span>}
          {s}
        </span>
      </button>
    )
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      {/* Background layers */}
      <div className="navbar-bg" />
      <div className={`navbar-glow ${scrolled ? 'navbar-glow-visible' : ''}`} />

      <div className="navbar-inner">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="navbar-logo"
        >
          <span className="navbar-logo-dot" />
          <span className="navbar-logo-text">justrhey</span>
          <span className="navbar-logo-suffix">.dev</span>
        </button>

        {/* Desktop nav */}
        <nav className="desktop-nav">
          {sections.map((s) => (
            <NavBtn key={s} s={s} />
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={`hamburger-box ${menuOpen ? 'hamburger-open' : ''}`}>
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mobile-menu"
          >
            <div className="mobile-menu-inner">
              {sections.map((s) => {
                const isActive = activeId === s.toLowerCase()
                return (
                  <button
                    key={s}
                    onClick={() => scrollTo(s)}
                    className={`mobile-nav-btn ${isActive ? 'mobile-nav-btn-active' : ''}`}
                  >
                    <span className={`mobile-nav-dot ${isActive ? 'mobile-nav-dot-active' : ''}`} />
                    {s}
                    {isActive && <span className="mobile-nav-active-tag">current</span>}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
