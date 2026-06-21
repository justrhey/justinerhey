import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { TargetCursor } from './components/TargetCursor.jsx'
import { HireBadge } from './components/HireBadge.jsx'

export default function App() {
  return (
    <>
      <TargetCursor targetSelector=".cursor-target" />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
      <HireBadge />
    </>
  )
}
