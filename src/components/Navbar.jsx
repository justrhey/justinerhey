import { useState, useEffect } from 'react'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { motion, AnimatePresence } from 'motion/react'

const sections = ['Experience', 'Skills', 'Projects', 'Contact']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useScrollSpy(sections.map(s => s.toLowerCase()), 80)

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className="nav-glass">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="nav-logo"
      >
        justrhey
      </button>

      <div className="nav-glass-inner">
        {sections.map((s) => {
          const isActive = activeId === s.toLowerCase()
          return (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className={`nav-btn ${isActive ? 'nav-btn-active' : ''}`}
            >
              {s}
            </button>
          )
        })}
      </div>

      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className="nav-hamburger-line" />
        <span className="nav-hamburger-line" />
        <span className="nav-hamburger-line" />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.12 }}
            className="mobile-menu-glass"
          >
            {sections.map((s) => {
              const isActive = activeId === s.toLowerCase()
              return (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className={`mobile-nav-btn ${isActive ? 'mobile-nav-btn-active' : ''}`}
                >
                  {s}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
