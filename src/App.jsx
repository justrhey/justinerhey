import { useReducedMotion } from './hooks/useReducedMotion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { HireBadge } from './components/HireBadge.jsx'

export default function App() {
  const prefersReduced = useReducedMotion()

  return (
    <>
      <Navbar />
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <HireBadge />

      {/* Subtle CRT scanline overlay — retro texture */}
      {!prefersReduced && <div className="crt-overlay" />}
    </>
  )
}
