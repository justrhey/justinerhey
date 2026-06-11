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
    maxWidth: 640,
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: 36,
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
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 600,
    marginBottom: 4,
  },
  role: {
    fontSize: '0.7rem',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: 12,
  },
  techWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 28,
  },
  tag: {
    fontSize: '0.7rem',
    padding: '3px 10px',
    border: '1px solid #2a2a2a',
    color: '#777',
  },
  divider: {
    height: '1px',
    background: '#1a1a1a',
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#555',
    marginBottom: 14,
  },
  story: {
    color: '#999',
    fontSize: '0.95rem',
    lineHeight: 1.9,
    marginBottom: 32,
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 12,
    marginBottom: 32,
  },
  image: {
    width: '100%',
    border: '1px solid #222',
    display: 'block',
  },
  actions: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  },
  linkBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 24px',
    border: '1px solid #555',
    color: '#ccc',
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
  },
}

export default function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.close} onClick={onClose}>&#10005;</button>

        <h3 style={styles.title}>{project.title}</h3>
        <p style={styles.role}>{project.role}</p>
        <div style={styles.techWrap}>
          {project.tech.map((t) => (
            <span key={t} style={styles.tag}>{t}</span>
          ))}
        </div>

        <div style={styles.divider} />

        <p style={styles.sectionLabel}>Overview</p>
        <p style={styles.story}>{project.intro}</p>

        {project.images && (
          <>
            <p style={styles.sectionLabel}>Screenshots</p>
            <div style={styles.imageGrid}>
              {project.images.map((img) => (
                <img
                  key={img}
                  src={`./images/${project.title.toLowerCase()}/${img}`}
                  alt={`${project.title} screenshot`}
                  style={styles.image}
                />
              ))}
            </div>
          </>
        )}

        <div style={styles.actions}>
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
