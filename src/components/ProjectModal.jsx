import { useState } from 'react'
import { motion } from 'motion/react'
import { CaretLeft, CaretRight, X, ArrowUpRight } from '@phosphor-icons/react'

const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.88)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backdropFilter: 'blur(4px)',
  },
  modal: {
    background: '#0a0a0a',
    border: '1px solid #222',
    maxWidth: 'min(94vw, 720px)',
    maxHeight: '90vh',
    width: '100%',
    overflowY: 'auto',
    position: 'relative',
  },
  close: {
    position: 'absolute',
    top: 12,
    right: 12,
    background: 'rgba(0,0,0,0.7)',
    border: '1px solid #333',
    color: '#bbb',
    fontSize: '1rem',
    cursor: 'pointer',
    fontFamily: 'inherit',
    lineHeight: 1,
    zIndex: 20,
    padding: '6px 12px',
    transition: 'color 0.2s, border-color 0.2s',
  },
  body: {
    padding: '0 28px 28px',
  },
  problem: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'var(--text)',
    marginBottom: 4,
    paddingRight: 28,
  },
  name: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.75rem',
    color: '#bbb',
    marginBottom: 14,
  },
  techWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 20,
  },
  tag: {
    fontSize: '0.65rem',
    padding: '2px 8px',
    border: '1px solid #2a2a2a',
    color: '#bbb',
    fontFamily: "'JetBrains Mono', monospace",
  },
  viewerWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#050505',
    borderBottom: '1px solid #1a1a1a',
    height: 'clamp(200px, 50vw, 400px)',
    overflow: 'hidden',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    display: 'block',
  },
  navBtn: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 48,
    background: 'rgba(0,0,0,0.5)',
    border: 'none',
    color: '#bbb',
    fontSize: '1.1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s, color 0.2s',
    fontFamily: 'inherit',
    lineHeight: 1,
    zIndex: 2,
  },
  counter: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    fontSize: '0.65rem',
    color: '#999',
    background: 'rgba(0,0,0,0.7)',
    padding: '2px 10px',
    fontFamily: "'JetBrains Mono', monospace",
  },
  sectionLabel: {
    fontSize: '0.6rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#999',
    marginBottom: 10,
    fontFamily: "'JetBrains Mono', monospace",
  },
  description: {
    color: '#ccc',
    fontSize: '0.85rem',
    lineHeight: 1.8,
    margin: 0,
  },
  actions: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
    marginTop: 20,
  },
  linkBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 20px',
    border: '1px solid #555',
    color: '#bbb',
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
    background: 'transparent',
    fontFamily: 'inherit',
  },
  loader: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#555',
  },
}

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
      style={styles.backdrop} onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={project.name}
      >
        {hasImages && (
          <div style={styles.viewerWrap}>
            {imgLoading && (
              <div style={styles.loader}>
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
                ...styles.image,
                opacity: imgLoading ? 0 : 1,
                transition: 'opacity 0.25s ease',
              }}
            />
            {images.length > 1 && (
              <>
                <button
                  style={{ ...styles.navBtn, left: 0 }}
                  onClick={prevImg}
                  onMouseEnter={(e) => { e.target.style.background = 'rgba(0,0,0,0.75)'; e.target.style.color = '#fff' }}
                  onMouseLeave={(e) => { e.target.style.background = 'rgba(0,0,0,0.5)'; e.target.style.color = '#bbb' }}
                >
                  <CaretLeft size={18} weight="bold" />
                </button>
                <button
                  style={{ ...styles.navBtn, right: 0 }}
                  onClick={nextImg}
                  onMouseEnter={(e) => { e.target.style.background = 'rgba(0,0,0,0.75)'; e.target.style.color = '#fff' }}
                  onMouseLeave={(e) => { e.target.style.background = 'rgba(0,0,0,0.5)'; e.target.style.color = '#bbb' }}
                >
                  <CaretRight size={18} weight="bold" />
                </button>
                <span style={styles.counter}>{imgIndex + 1} / {images.length}</span>
              </>
            )}
          </div>
        )}
          <button
            style={styles.close}
            onClick={onClose}
            aria-label="Close modal"
            onMouseEnter={(e) => { e.target.style.color = '#fff'; e.target.style.borderColor = '#666' }}
            onMouseLeave={(e) => { e.target.style.color = '#bbb'; e.target.style.borderColor = '#333' }}
          >
            <X size={16} weight="bold" />
          </button>

        <div style={styles.body}>

          <p style={styles.problem}>{project.problem}</p>
          <p style={styles.name}>{project.name}</p>

          <div style={styles.techWrap}>
            {project.tech.map((t) => (
              <span key={t} style={styles.tag}>{t}</span>
            ))}
          </div>

          <p style={styles.sectionLabel}>Overview</p>
          <p style={styles.description}>{project.description}</p>

          <div style={styles.actions}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.linkBtn}
                onMouseEnter={(e) => { e.target.style.borderColor = '#777'; e.target.style.color = '#fff' }}
                onMouseLeave={(e) => { e.target.style.borderColor = '#555'; e.target.style.color = '#bbb' }}
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
                style={{ ...styles.linkBtn, borderColor: '#555' }}
                onMouseEnter={(e) => { e.target.style.borderColor = '#fff'; e.target.style.color = '#fff' }}
                onMouseLeave={(e) => { e.target.style.color = '#bbb' }}
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
