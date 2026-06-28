import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { personal } from '../data/personal'
import FaultyTerminal from './FaultyTerminal'

/* ─── Animated code lines ─── */
const codeLines = [
  { text: 'const engineer = {', delay: 0 },
  { text: '  role: "Backend + AI Full-Stack",', delay: 0.4 },
  { text: '  stack: ["Java", "Rust", "React", "n8n"],', delay: 0.7 },
  { text: '  ships: true,', delay: 1.0 },
  { text: '  status: "available"', delay: 1.3 },
  { text: '}', delay: 1.6 },
]

function TypewriterCode({ anim }) {
  const [visibleLines, setVisibleLines] = useState(anim ? 0 : codeLines.length)

  useEffect(() => {
    if (!anim) return
    const timers = codeLines.map((line, i) =>
      setTimeout(() => setVisibleLines((p) => Math.max(p, i + 1)), (line.delay + 0.3) * 1000)
    )
    return () => timers.forEach(clearTimeout)
  }, [anim])

  return (
    <div className="data-readout" style={{ minWidth: 280 }}>
      {codeLines.map((line, i) => (
        <div
          key={i}
          style={{
            opacity: i < visibleLines ? 1 : 0,
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            lineHeight: 1.8,
            color: i < visibleLines ? 'var(--text-secondary)' : 'transparent',
            transition: 'opacity 0.25s ease',
          }}
        >
          <span style={{ color: 'var(--text-faint)', marginRight: 10 }}>{String(i + 1).padStart(2, '0')}</span>
          <span style={{ color: i === 0 || i === codeLines.length - 1 ? 'var(--green-bright)' : 'var(--text-secondary)' }}>
            {line.text}
          </span>
          {i === visibleLines - 1 && i < codeLines.length && (
            <span style={{
              background: 'var(--green-bright)',
              width: 6,
              height: 12,
              display: 'inline-block',
              marginLeft: 3,
              verticalAlign: 'middle',
              animation: anim ? 'blink 0.8s step-end infinite' : 'none',
            }} />
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── Main Hero ─── */
export default function Hero() {
  const prefersReduced = useReducedMotion()
  const [imgLoaded, setImgLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const anim = !prefersReduced

  return (
    <section id="hero" style={{
      position: 'relative', overflow: 'hidden',
      minHeight: 'calc(100dvh - var(--nav-height))',
      display: 'flex', alignItems: 'center',
    }}>
      {/* Retro terminal background */}
      {!prefersReduced && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          opacity: 0.15, mixBlendMode: 'screen',
        }}>
          <FaultyTerminal
            tint="#7ecb45"
            scale={2}
            gridMul={[3, 2]}
            digitSize={1}
            timeScale={0.12}
            scanlineIntensity={0.2}
            glitchAmount={0.4}
            flickerAmount={0.2}
            noiseAmp={0.05}
            curvature={0.1}
            chromaticAberration={0.2}
            mouseStrength={0.4}
            brightness={0.6}
          />
        </div>
      )}

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{
          display: 'flex',
          gap: isMobile ? 24 : 48,
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
        }}>
          {/* Avatar */}
          <div style={{ flexShrink: 0 }}>
            <div style={{
              width: isMobile ? 120 : 180,
              height: isMobile ? 120 : 180,
              background: 'var(--bg-deep)',
              borderTop: '2px solid var(--border-light)',
              borderBottom: '2px solid var(--border-dark)',
              borderLeft: '1px solid var(--border-left)',
              borderRight: '1px solid var(--border-right)',
              overflow: 'hidden',
            }}>
              {!imgLoaded && (
                <div style={{
                  width: '100%', height: '100%',
                  background: 'var(--green-dark)',
                  animation: anim ? 'blink 1.5s step-end infinite' : 'none',
                }} />
              )}
              <img
                src={personal.photoPath}
                alt={personal.photoAlt}
                draggable={false}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgLoaded(true)}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  opacity: imgLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
              />
            </div>

            {/* Badge under avatar */}
            {personal.availability && (
              <div className="status-indicator" style={{ marginTop: 12, justifyContent: 'center' }}>
                <span className="status-dot status-dot-on" />
                <span className="status-label" style={{ color: 'var(--green-bright)' }}>Available</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0, textAlign: isMobile ? 'center' : 'left' }}>
            {/* Name */}
            <h1 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
              letterSpacing: '4px',
              marginBottom: 8,
              lineHeight: 1.1,
            }}>
              {personal.name.split(' ').slice(0, -1).join(' ')}{' '}
              <span style={{ color: 'var(--green-bright)' }}>{personal.name.split(' ').pop()}</span>
            </h1>

            {/* Tagline */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
              letterSpacing: '2px',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              maxWidth: 500,
              marginBottom: 28,
              marginLeft: isMobile ? 'auto' : undefined,
              marginRight: isMobile ? 'auto' : undefined,
              lineHeight: 1.6,
            }}>
              <span style={{ color: 'var(--green-bright)' }}>&gt;&nbsp;</span>
              {personal.tagline}. {personal.subtitle}
            </p>

            {/* CTAs */}
            <div style={{
              display: 'flex', gap: 10, flexWrap: 'wrap',
              justifyContent: isMobile ? 'center' : 'flex-start',
              marginBottom: 32,
            }}>
              <button
                className="btn-primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                ▣ See Work
              </button>
              <a
                className="btn-secondary"
                href={personal.resumePath}
                target="_blank"
                rel="noopener noreferrer"
              >
                ⎆ Resume
              </a>
            </div>

            {/* Code block */}
            {!isMobile && (
              <TypewriterCode anim={anim} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
