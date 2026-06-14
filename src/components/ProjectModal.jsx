import { useState } from 'react'

const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.85)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backdropFilter: 'blur(4px)',
  },
  modal: {
    background: '#0d0d0d',
    border: '1px solid #222',
    maxWidth: 'min(90vw, 740px)',
    width: '100%',
    padding: 32,
    position: 'relative',
  },
  close: {
    position: 'absolute',
    top: 16,
    right: 20,
    background: 'none',
    border: 'none',
    color: '#555',
    fontSize: '1.3rem',
    cursor: 'pointer',
    fontFamily: 'inherit',
    lineHeight: 1,
    zIndex: 10,
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 600,
    marginBottom: 2,
    paddingRight: 28,
  },
  role: {
    fontSize: '0.65rem',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: 10,
  },
  techWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  tag: {
    fontSize: '0.65rem',
    padding: '2px 8px',
    border: '1px solid #2a2a2a',
    color: '#777',
  },
  divider: {
    height: '1px',
    background: '#1a1a1a',
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: '0.6rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#555',
    marginBottom: 10,
  },
  story: {
    color: '#999',
    fontSize: '0.85rem',
    lineHeight: 1.7,
    margin: 0,
  },
  viewerWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#080808',
    border: '1px solid #1a1a1a',
    marginBottom: 16,
    height: 340,
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
    width: 56,
    background: 'rgba(0,0,0,0.4)',
    border: 'none',
    color: '#aaa',
    fontSize: '1.4rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
    fontFamily: 'inherit',
    lineHeight: 1,
  },
  counter: {
    position: 'absolute',
    bottom: 10,
    right: 14,
    fontSize: '0.7rem',
    color: '#666',
    background: 'rgba(0,0,0,0.6)',
    padding: '2px 10px',
  },
  actions: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
    marginTop: 16,
  },
  linkBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 20px',
    border: '1px solid #555',
    color: '#ccc',
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
  },
}

export default function ProjectModal({ project, onClose }) {
  const [imgIndex, setImgIndex] = useState(0)
  const [imgLoaded, setImgLoaded] = useState(false)

  if (!project) return null

  const images = project.images || []
  const hasImages = images.length > 0

  const prevImg = () => {
    setImgIndex((i) => (i > 0 ? i - 1 : images.length - 1))
    setImgLoaded(false)
  }
  const nextImg = () => {
    setImgIndex((i) => (i < images.length - 1 ? i + 1 : 0))
    setImgLoaded(false)
  }

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div className="modal-enter" style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.close} onClick={onClose}>&#10005;</button>

        <h3 style={styles.title}>{project.title}</h3>
        <p style={styles.role}>{project.role}</p>
        <div style={styles.techWrap}>
          {project.tech.map((t) => (
            <span key={t} style={styles.tag}>{t}</span>
          ))}
        </div>

        <div style={styles.divider} />

        {hasImages && (
          <div style={styles.viewerWrap}>
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {!imgLoaded && <div className="skeleton skeleton-image" />}
              <img
                key={imgIndex}
                src={`./images/${project.slug || project.title.toLowerCase()}/${images[imgIndex]}`}
                alt={`${project.title} screenshot ${imgIndex + 1}`}
                loading="lazy"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className={imgLoaded ? 'modal-image loaded' : 'modal-image'}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgLoaded(true)}
              />
            </div>
            {images.length > 1 && (
              <>
                <button
                  style={{ ...styles.navBtn, left: 0 }}
                  onClick={prevImg}
                  onMouseEnter={(e) => { e.target.style.background = 'rgba(0,0,0,0.7)' }}
                  onMouseLeave={(e) => { e.target.style.background = 'rgba(0,0,0,0.4)' }}
                >
                  &#10094;
                </button>
                <button
                  style={{ ...styles.navBtn, right: 0 }}
                  onClick={nextImg}
                  onMouseEnter={(e) => { e.target.style.background = 'rgba(0,0,0,0.7)' }}
                  onMouseLeave={(e) => { e.target.style.background = 'rgba(0,0,0,0.4)' }}
                >
                  &#10095;
                </button>
                <span style={styles.counter}>{imgIndex + 1} / {images.length}</span>
              </>
            )}
          </div>
        )}

        <p style={styles.sectionLabel}>Overview</p>
        <p style={styles.story}>{project.intro}</p>

        <div style={styles.actions}>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.linkBtn, border: '1px solid #2563eb', color: '#60a5fa' }}
              onMouseEnter={(e) => { e.target.style.background = '#1e3a5f'; e.target.style.color = '#fff' }}
              onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#60a5fa' }}
            >
              Live Demo &rarr;
            </a>
          )}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.linkBtn}
            onMouseEnter={(e) => { e.target.style.borderColor = '#888'; e.target.style.color = '#fff' }}
            onMouseLeave={(e) => { e.target.style.borderColor = '#555'; e.target.style.color = '#ccc' }}
          >
            View on GitHub &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}
