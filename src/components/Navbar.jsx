import { useState, useEffect } from 'react'

const navStyles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: '#000',
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
    color: '#888',
    transition: 'color 0.2s',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontFamily: 'inherit',
  },
}

const sections = ['About', 'Skills', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header style={{ ...navStyles.header, opacity: scrolled ? 0.95 : 1 }}>
      <div style={navStyles.inner}>
        <div style={navStyles.logo}>
          JR<span style={{ color: '#666' }}>.</span>
        </div>
        <nav>
          <ul style={navStyles.nav}>
            {sections.map((s) => (
              <li key={s}>
                <button
                  style={navStyles.link}
                  onClick={() => scrollTo(s)}
                  onMouseEnter={(e) => (e.target.style.color = '#fff')}
                  onMouseLeave={(e) => (e.target.style.color = '#888')}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
