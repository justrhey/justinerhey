import { useState, useEffect, useCallback } from 'react'

const navStyles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: 'var(--bg)',
    borderBottom: '1px solid #1a1a1a',
    transition: 'all 0.3s ease',
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    maxWidth: 1100,
    margin: '0 auto',
  },
  logo: {
    fontSize: '1.1rem',
    fontWeight: 700,
    letterSpacing: '-0.5px',
  },
  nav: {
    display: 'flex',
    gap: 32,
    listStyle: 'none',
  },
  link: {
    fontSize: '0.85rem',
    fontFamily: 'inherit',
  },
  hamburger: {
    background: 'none',
    border: '1px solid #333',
    color: 'var(--text)',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '8px 12px',
    fontFamily: 'inherit',
    lineHeight: 1,
  },
  mobileMenu: {
    display: 'none',
    flexDirection: 'column',
    gap: 8,
    padding: '12px 24px 20px',
    borderTop: '1px solid #1a1a1a',
  },
}

const sections = ['About', 'Skills', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('portfolio_theme') || 'dark' } catch { return 'dark' }
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem('portfolio_theme', next)
      document.documentElement.setAttribute('data-theme', next)
    } catch {}
  }, [theme])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header style={{ ...navStyles.header, opacity: scrolled ? 0.95 : 1 }}>
      <div style={navStyles.inner}>
        <div style={navStyles.logo}>
          &#9733;
        </div>
        <button
          className="hamburger"
          style={navStyles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '\u2715' : '\u2630'}
        </button>
        <nav className="desktop-nav">
          <ul style={navStyles.nav}>
            {sections.map((s) => (
              <li key={s}>
                <button
                  className="nav-link"
                  onClick={() => scrollTo(s)}>
                  {s}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={toggleTheme}
                className="nav-link"
                style={{ fontSize: '1.1rem', lineHeight: 1 }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '\u2600' : '\u263D'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mobile-menu" style={{ ...navStyles.mobileMenu, display: menuOpen ? 'flex' : 'none' }}>
        {sections.map((s) => (
          <button
            key={s}
            className="nav-link"
            style={{ textAlign: 'left', padding: '8px 0', fontSize: '0.95rem' }}
            onClick={() => scrollTo(s)}
          >
            {s}
          </button>
        ))}
        <button
          onClick={toggleTheme}
          className="nav-link"
          style={{ textAlign: 'left', padding: '8px 0', fontSize: '0.95rem' }}
        >
          {theme === 'dark' ? '\u2600 Light Mode' : '\u263D Dark Mode'}
        </button>
      </div>
    </header>
  )
}
