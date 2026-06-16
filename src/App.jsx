import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { TargetCursor } from './components/TargetCursor.jsx'
import { HireBadge } from './components/HireBadge.jsx'

export default function App() {
  return (
    <>
      <TargetCursor targetSelector=".cursor-target" spinDuration={3.5} hoverDuration={0.45} />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <HireBadge />
    </>
  )
}
