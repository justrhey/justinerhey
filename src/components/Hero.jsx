import { useState, useEffect } from 'react'
import { personal } from '../data/personal'
import { motion } from 'motion/react'

/* ─── Decorative water droplets ─── */
function Droplets() {
  return (
    <svg
      viewBox="0 0 200 200"
      style={{
        position: 'absolute', top: -40, right: -20,
        width: 200, height: 200,
        opacity: 0.1, pointerEvents: 'none',
      }}
      fill="none"
    >
      <path d="M100 20c0 0-30 40-30 70a30 30 0 0 0 60 0c0-30-30-70-30-70z" fill="#5bb8d4" />
      <path d="M160 60c0 0-16 22-16 38a16 16 0 0 0 32 0c0-16-16-38-16-38z" fill="#4a9e6a" opacity="0.6" />
      <path d="M40 100c0 0-12 16-12 28a12 12 0 0 0 24 0c0-12-12-28-12-28z" fill="#5bb8d4" opacity="0.7" />
    </svg>
  )
}

/* ─── Hero ─── */
export default function Hero() {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <section id="hero" style={{
      paddingTop: 120, paddingBottom: 60,
      position: 'relative',
    }}>
      <div className="container" style={{ position: 'relative' }}>
        <Droplets />

        <div style={{
          display: 'flex',
          gap: 40,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          {/* Avatar */}
          <div style={{ flexShrink: 0 }}>
            <div style={{
              width: 140, height: 140,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.6)',
              border: '3px solid rgba(255,255,255,0.9)',
              boxShadow: '0 4px 20px rgba(90,180,220,0.15), 0 1px 0 rgba(255,255,255,0.8) inset',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {!imgLoaded && (
                <div style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(135deg, #d4eef8, #b8dce8)',
                  animation: 'pulse-soft 1.5s ease-in-out infinite',
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

            {/* Availability badge */}
            {personal.availability && (
              <div style={{
                marginTop: 12, textAlign: 'center',
              }}>
                <span className="badge-aero badge-success">
                  Available for work
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <h1 style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
              marginBottom: 6,
              letterSpacing: '-0.02em',
            }}>
              {personal.name}
            </h1>

            <p style={{
              fontSize: '1rem',
              color: 'var(--deep-aqua)',
              fontWeight: 600,
              marginBottom: 12,
            }}>
              {personal.tagline}
            </p>

            <p style={{
              fontSize: '0.92rem',
              color: 'var(--mid-text)',
              lineHeight: 1.7,
              maxWidth: 560,
              marginBottom: 28,
            }}>
              {personal.subtitle}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                className="btn-aero"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See My Work
              </button>
              <a
                className="btn-glass"
                href={personal.resumePath}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
