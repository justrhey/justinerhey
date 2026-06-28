import { useState, useEffect } from 'react'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { motion, AnimatePresence } from 'motion/react'

const sections = ['Experience', 'Skills', 'Projects', 'Contact']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useScrollSpy(sections.map(s => s.toLowerCase()), 60)

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="navbar-logo"
        >
          <span className="navbar-logo-dot" />
          justrhey
        </button>

        {/* Desktop nav pill */}
        <nav className="nav-pill">
          {sections.map((s) => {
            const isActive = activeId === s.toLowerCase()
            return (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`nav-btn ${isActive ? 'nav-btn-active' : ''}`}
              >
                {isActive ? '▸ ' : ''}{s}
              </button>
            )
          })}
        </nav>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="mobile-menu"
          >
            {sections.map((s) => {
              const isActive = activeId === s.toLowerCase()
              return (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className={`mobile-nav-btn ${isActive ? 'mobile-nav-btn-active' : ''}`}
                >
                  {isActive ? '▸ ' : ''}{s}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
