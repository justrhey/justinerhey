import { useState } from 'react'
import { motion } from 'motion/react'
import { CaretLeft, CaretRight, X, ArrowUpRight } from '@phosphor-icons/react'

export default function ProjectModal({ project, onClose }) {
  const [imgIndex, setImgIndex] = useState(0)
  const [imgLoading, setImgLoading] = useState(true)

  if (!project) return null

  const images = project.images || []
  const hasImages = images.length > 0

  const prevImg = (e) => {
    e.stopPropagation()
    setImgLoading(true)
    setImgIndex((i) => (i > 0 ? i - 1 : images.length - 1))
  }
  const nextImg = (e) => {
    e.stopPropagation()
    setImgLoading(true)
    setImgIndex((i) => (i < images.length - 1 ? i + 1 : 0))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="modal-aero-backdrop"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 16 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className="modal-aero"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={project.name}
      >
        {/* Close */}
        <button className="modal-aero-close" onClick={onClose} aria-label="Close">
          <X size={16} weight="bold" />
        </button>

        {/* Images */}
        {hasImages && (
          <div style={{
            position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(200,232,248,0.2)',
            borderBottom: '1px solid rgba(90,180,220,0.15)',
            height: 'clamp(160px, 45vw, 340px)',
            overflow: 'hidden',
          }}>
            {imgLoading && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--aqua-mid)',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.2" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
                  </path>
                </svg>
              </div>
            )}
            <img
              key={imgIndex}
              src={`./images/${project.id}/${images[imgIndex]}`}
              alt={`${project.name} screenshot ${imgIndex + 1}`}
              loading="lazy"
              draggable={false}
              onLoad={() => setImgLoading(false)}
              onError={() => setImgLoading(false)}
              onDragStart={(e) => e.preventDefault()}
              style={{
                maxWidth: '100%', maxHeight: '100%',
                objectFit: 'contain', display: 'block',
                opacity: imgLoading ? 0 : 1,
                transition: 'opacity 0.25s ease',
              }}
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  style={{
                    position: 'absolute', left: 8, top: 0, bottom: 0,
                    width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.5)', border: 'none',
                    color: 'var(--deep-aqua)', cursor: 'pointer',
                    borderRadius: 8, fontFamily: 'var(--font-stack)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.5)'}
                >
                  <CaretLeft size={18} weight="bold" />
                </button>
                <button
                  onClick={nextImg}
                  style={{
                    position: 'absolute', right: 8, top: 0, bottom: 0,
                    width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.5)', border: 'none',
                    color: 'var(--deep-aqua)', cursor: 'pointer',
                    borderRadius: 8, fontFamily: 'var(--font-stack)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.5)'}
                >
                  <CaretRight size={18} weight="bold" />
                </button>
                <span style={{
                  position: 'absolute', bottom: 10, right: 12,
                  fontSize: '0.72rem', color: 'var(--light-text)',
                  background: 'rgba(255,255,255,0.7)',
                  padding: '2px 10px', borderRadius: 12,
                }}>
                  {imgIndex + 1} / {images.length}
                </span>
              </>
            )}
          </div>
        )}

        {/* Body */}
        <div style={{ padding: '0 24px 24px' }}>
          <p style={{
            fontSize: '1.05rem', fontWeight: 600,
            marginBottom: 4, paddingRight: 24,
          }}>
            {project.problem}
          </p>
          <p style={{
            fontSize: '0.82rem', color: 'var(--deep-aqua)',
            marginBottom: 12,
          }}>
            {project.name}
          </p>

          {/* Tech */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {project.tech.map((t) => (
              <span key={t} className="tag-aero tag-aero-filled" style={{ fontSize: '0.7rem' }}>{t}</span>
            ))}
          </div>

          <p style={{
            fontSize: '0.72rem', fontWeight: 600, color: 'var(--mid-text)',
            textTransform: 'uppercase', letterSpacing: '0.5px',
            marginBottom: 8,
          }}>
            Overview
          </p>
          <p style={{
            fontSize: '0.88rem', color: 'var(--dark-text)',
            lineHeight: 1.8,
          }}>
            {project.description}
          </p>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-glass">
                <ArrowUpRight size={16} weight="bold" />
                GitHub
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-glass">
                <ArrowUpRight size={16} weight="bold" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
