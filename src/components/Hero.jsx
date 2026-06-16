import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { personal } from '../data/personal'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { ArrowRight, Download } from '@phosphor-icons/react'

function Wrap({ anim, children, ...props }) {
  if (!anim) return <>{children}</>
  return <motion.div {...props}>{children}</motion.div>
}

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const [imgLoaded, setImgLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const anim = !prefersReduced
  const spring = { type: 'spring', stiffness: 100, damping: 20 }

  return (
    <section
      id="hero"
      className="min-h-screen min-h-dvh flex items-center relative overflow-hidden"
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10">
        <div className={`flex ${isMobile ? 'flex-col gap-8 text-center items-center' : 'flex-row gap-16 items-start'}`}>
          {/* Avatar */}
          <Wrap anim={anim} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...spring, delay: 0.1 }} className="flex-shrink-0">
            <div className={`w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden border border-[#222] ${!imgLoaded ? 'bg-[#111] animate-pulse' : ''}`}>
              <img
                src={personal.photoPath}
                alt={personal.photoAlt}
                draggable={false}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgLoaded(true)}
                className={`w-full h-full object-cover object-center ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ transition: 'opacity 0.3s ease, border-color 0.3s ease' }}
              />
            </div>
          </Wrap>

          {/* Text */}
          <div className="flex-1 min-w-0">
            {personal.availability && (
              <Wrap anim={anim} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.15 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#333] bg-[#0a0a0a] mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                  <span className="text-[#888] text-xs font-mono tracking-wide">AVAILABLE FOR WORK</span>
                </div>
              </Wrap>
            )}

            <Wrap anim={anim} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.2 }}>
              <p className="text-[#666] text-xs uppercase tracking-[3px] mb-3 font-mono">Shipped production tools before graduation</p>
            </Wrap>

            <Wrap anim={anim} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.25 }}>
              <h1 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold tracking-[-1px] leading-[1.1] mb-3">
                {personal.name.split(' ').slice(0, -1).join(' ')} <span className="text-[#666]">{personal.name.split(' ').pop()}</span>
              </h1>
            </Wrap>

            <Wrap anim={anim} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.3 }}>
              <p className="text-[#999] text-base mb-2 font-mono">{personal.tagline}</p>
            </Wrap>

            <Wrap anim={anim} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.35 }}>
              <p className="text-[#777] text-sm md:text-base leading-relaxed max-w-[540px] mb-8">
                {personal.subtitle}
              </p>
            </Wrap>

            <Wrap anim={anim} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.4 }}>
              {/* Tech badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Java', 'Spring Boot', 'PHP', 'PostgreSQL', 'MySQL', 'JavaScript', 'Docker', 'Linux', 'Laravel', 'Android'].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md border border-[#222] bg-[#0a0a0a] text-[#888] text-[0.65rem] font-mono"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </Wrap>

            <Wrap anim={anim} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.45 }}>
              <div className={`flex gap-3 flex-wrap ${isMobile ? 'justify-center' : ''}`}>
                <button
                  onClick={() => {
                    const el = document.getElementById('projects')
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.scrollY - 80
                      window.scrollTo({ top, behavior: 'smooth' })
                    }
                  }}
                  className="cursor-target inline-flex items-center gap-2 px-6 py-3 border border-white bg-white text-black text-sm font-semibold transition-all hover:bg-[#ccc] hover:border-[#ccc]"
                >
                  See What I've Built <ArrowRight size={16} weight="bold" />
                </button>
                <a
                  href={personal.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-target inline-flex items-center gap-2 px-6 py-3 border border-[#333] text-[#aaa] text-sm font-semibold transition-all hover:border-[#777] hover:text-white"
                >
                  Resume <Download size={16} />
                </a>
              </div>
            </Wrap>
          </div>
        </div>
      </div>
    </section>
  )
}
