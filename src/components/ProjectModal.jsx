import { useState } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

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
    position: 'sticky',
    float: 'right',
    top: 12,
    right: 12,
    background: 'rgba(0,0,0,0.7)',
    border: '1px solid #333',
    color: '#888',
    fontSize: '1rem',
    cursor: 'pointer',
    fontFamily: 'inherit',
    lineHeight: 1,
    zIndex: 10,
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
    color: '#666',
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
    color: '#777',
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
    color: '#888',
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
    color: '#666',
    background: 'rgba(0,0,0,0.7)',
    padding: '2px 10px',
    fontFamily: "'JetBrains Mono', monospace",
  },
  sectionLabel: {
    fontSize: '0.6rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#555',
    marginBottom: 10,
    fontFamily: "'JetBrains Mono', monospace",
  },
  description: {
    color: '#999',
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
    border: '1px solid #444',
    color: '#888',
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
    background: 'transparent',
    fontFamily: 'inherit',
  },
}

export default function ProjectModal({ project, onClose }) {
  const [imgIndex, setImgIndex] = useState(0)

  if (!project) return null

  const images = project.images || []
  const hasImages = images.length > 0

  const prevImg = (e) => {
    e.stopPropagation()
    setImgIndex((i) => (i > 0 ? i - 1 : images.length - 1))
  }
  const nextImg = (e) => {
    e.stopPropagation()
    setImgIndex((i) => (i < images.length - 1 ? i + 1 : 0))
  }

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div
        className="modal-enter"
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={project.name}
      >
        {hasImages && (
          <div style={styles.viewerWrap}>
            <img
              key={imgIndex}
              src={`./images/${project.id}/${images[imgIndex]}`}
              alt={`${project.name} screenshot ${imgIndex + 1}`}
              loading="lazy"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              style={{
                ...styles.image,
                transition: 'opacity 0.25s ease',
              }}
            />
            {images.length > 1 && (
              <>
                <button
                  style={{ ...styles.navBtn, left: 0 }}
                  onClick={prevImg}
                  onMouseEnter={(e) => { e.target.style.background = 'rgba(0,0,0,0.75)'; e.target.style.color = '#fff' }}
                  onMouseLeave={(e) => { e.target.style.background = 'rgba(0,0,0,0.5)'; e.target.style.color = '#888' }}
                >
                  <CaretLeft size={18} weight="bold" />
                </button>
                <button
                  style={{ ...styles.navBtn, right: 0 }}
                  onClick={nextImg}
                  onMouseEnter={(e) => { e.target.style.background = 'rgba(0,0,0,0.75)'; e.target.style.color = '#fff' }}
                  onMouseLeave={(e) => { e.target.style.background = 'rgba(0,0,0,0.5)'; e.target.style.color = '#888' }}
                >
                  <CaretRight size={18} weight="bold" />
                </button>
                <span style={styles.counter}>{imgIndex + 1} / {images.length}</span>
              </>
            )}
          </div>
        )}

        <div style={styles.body}>
          <button
            style={styles.close}
            onClick={onClose}
            onMouseEnter={(e) => { e.target.style.color = '#fff'; e.target.style.borderColor = '#666' }}
            onMouseLeave={(e) => { e.target.style.color = '#888'; e.target.style.borderColor = '#333' }}
          >
            ✕
          </button>

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
                onMouseLeave={(e) => { e.target.style.borderColor = '#444'; e.target.style.color = '#888' }}
              >
                GitHub →
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styles.linkBtn, borderColor: '#555' }}
                onMouseEnter={(e) => { e.target.style.borderColor = '#fff'; e.target.style.color = '#fff' }}
                onMouseLeave={(e) => { e.target.style.borderColor = '#555'; e.target.style.color = '#888' }}
              >
                Live Demo →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
