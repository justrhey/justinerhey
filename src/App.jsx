import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { TargetCursor } from './components/TargetCursor.jsx'
import { HireBadge } from './components/HireBadge.jsx'
import { SectionReveal } from './helpers/SectionReveal.jsx'

export default function App() {
  return (
    <div className="overflow-x-clip bg-black text-white">
      <TargetCursor targetSelector=".cursor-target" spinDuration={3.5} hoverDuration={0.45} />
      <Navbar />
      <main id="main-content">
        <SectionReveal><Hero /></SectionReveal>
        <SectionReveal><About /></SectionReveal>
        <SectionReveal><Skills /></SectionReveal>
        <SectionReveal><Projects /></SectionReveal>
        <SectionReveal><Testimonials /></SectionReveal>
        <SectionReveal><Contact /></SectionReveal>
      </main>
      <SectionReveal><Footer /></SectionReveal>
      <HireBadge />
    </div>
  )
}
