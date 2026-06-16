import { useState, useEffect, useRef } from 'react'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { List, X } from '@phosphor-icons/react'

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'contact']
const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const activeSection = useScrollSpy(SECTION_IDS)
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { setIsMenuOpen(false); return }
      if (e.key === 'Tab') {
        const focusable = menuRef.current?.querySelectorAll('a, button')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    menuRef.current?.querySelector('a, button')?.focus()
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const handleNavClick = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-black focus:font-semibold focus:text-sm"
      >
        Skip to main content
      </a>

      <nav
        role="navigation"
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${scrolled ? 'top-4' : 'top-6'}`}
      >
        <div className="flex items-center gap-1 px-2 py-2 rounded-full backdrop-blur-xl bg-white/[0.04] border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {/* Logo */}
          <button onClick={() => handleNavClick('hero')} className="cursor-target cursor-pointer bg-transparent border-none px-3 font-bold text-sm text-white">
            JR
          </button>

          {/* Desktop nav */}
          <div className="hidden md:block w-px h-5 bg-white/[0.08]" />
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                  className={`text-sm px-3 py-1.5 rounded-full bg-transparent border-none cursor-pointer transition-all ${
                    activeSection === link.id
                      ? 'text-white bg-white/[0.08]'
                      : 'text-[#888] hover:text-[#ccc] hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:block w-px h-5 bg-white/[0.08]" />
          <a
            href="./resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex px-4 py-1.5 rounded-full bg-white/[0.08] text-[#aaa] text-sm font-medium hover:bg-white/[0.12] hover:text-white transition-all"
          >
            Resume
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden flex items-center p-2.5 bg-transparent border-none cursor-pointer text-white"
          >
            {isMenuOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 md:hidden z-40" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Mobile panel */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 bottom-0 w-72 bg-[#0a0a0a]/95 backdrop-blur-xl border-l border-white/[0.06] z-50 md:hidden transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-8 pt-20 gap-2">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              aria-current={activeSection === link.id ? 'page' : undefined}
              className={`text-left py-3 px-4 rounded-xl text-base font-medium bg-transparent border-none cursor-pointer transition-colors ${
                activeSection === link.id
                  ? 'text-white bg-white/[0.06]'
                  : 'text-[#888] hover:text-[#ccc] hover:bg-white/[0.03]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href="./resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 py-3 px-4 rounded-xl bg-white text-black text-base font-semibold text-center hover:bg-[#ccc] transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </>
  )
}
