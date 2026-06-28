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
      transition={{ duration: 0.2 }}
      className="modal-backdrop"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={project.name}
      >
        {/* Close button */}
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={16} weight="bold" />
        </button>

        {/* Image viewer */}
        {hasImages && (
          <div className="modal-image-wrap">
            {imgLoading && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-faint)',
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
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                display: 'block',
                opacity: imgLoading ? 0 : 1,
                transition: 'opacity 0.25s ease',
              }}
            />
            {images.length > 1 && (
              <>
                <button className="modal-image-nav" style={{ left: 0 }} onClick={prevImg}>
                  <CaretLeft size={18} weight="bold" />
                </button>
                <button className="modal-image-nav" style={{ right: 0 }} onClick={nextImg}>
                  <CaretRight size={18} weight="bold" />
                </button>
                <span className="modal-image-counter">{imgIndex + 1} / {images.length}</span>
              </>
            )}
          </div>
        )}

        {/* Body */}
        <div style={{ padding: '0 28px 28px' }}>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.9rem', letterSpacing: '2px',
            marginBottom: 4, paddingRight: 28,
          }}>
            {project.problem}
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem', letterSpacing: '1px',
            color: 'var(--text-muted)',
            marginBottom: 14,
          }}>
            {project.name}
          </p>

          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {project.tech.map((t) => (
              <span key={t} className="project-tech-tag">{t}</span>
            ))}
          </div>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.5rem', letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--text-faint)',
            marginBottom: 10,
          }}>
            Overview
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem', letterSpacing: '0.5px',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
          }}>
            {project.description}
          </p>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link-btn"
              >
                <ArrowUpRight size={16} weight="bold" />
                GitHub
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link-btn"
              >
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
