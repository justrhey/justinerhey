import { useState, useEffect } from 'react'

const sections = ['About', 'Skills', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(0,0,0,0.95)' : 'var(--bg)',
      borderBottom: '1px solid var(--border)',
      transition: 'background 0.3s ease, border-color 0.3s ease',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 24px', maxWidth: 1100, margin: '0 auto',
      }}>
        <div style={{
          fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.5px',
          cursor: 'pointer', background: 'none', border: 'none', color: 'var(--text)',
        }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          &#9733;
        </div>
        <button
          className="hamburger"
          style={{
            background: 'none', border: '1px solid #333', color: 'var(--text)',
            fontSize: '1.2rem', cursor: 'pointer', padding: '8px 12px',
            fontFamily: 'inherit', lineHeight: 1,
          }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
        <nav className="desktop-nav">
          <ul style={{ display: 'flex', gap: 32, listStyle: 'none' }}>
            {sections.map((s) => (
              <li key={s}>
                <button className="nav-link" onClick={() => scrollTo(s)}>{s}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div style={{
        display: menuOpen ? 'flex' : 'none', flexDirection: 'column', gap: 8,
        padding: '12px 24px 20px', borderTop: '1px solid var(--border)',
      }}>
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
      </div>
    </header>
  )
}
