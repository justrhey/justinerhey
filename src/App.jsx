import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ControlPanel from './components/ControlPanel.jsx'

export default function App() {
  return (
    <>
      <Navbar />

      <div className="app-layout">
        <main className="app-main">
          <Hero />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <ControlPanel />
      </div>

      <Footer />
    </>
  )
}
