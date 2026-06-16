import { useState } from 'react'
import { Code } from '@phosphor-icons/react'

const styles = {
  card: (hover) => ({
    display: 'flex', flexDirection: 'column',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    transition: 'border-color 0.2s ease, transform 0.2s ease',
    cursor: 'pointer',
    height: '100%',
    borderColor: hover ? 'var(--border-light)' : 'var(--border-card)',
    transform: hover ? 'translateY(-2px)' : 'none',
  }),
  imageWrap: {
    width: '100%', aspectRatio: '16/10', overflow: 'hidden',
    position: 'relative',
    background: '#0a0a0a', borderBottom: '1px solid var(--border)',
  },
  placeholder: {
    width: '100%', aspectRatio: '16/10',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#0a0a0a', borderBottom: '1px solid var(--border)',
    color: 'var(--text-faint)',
  },
  body: {
    padding: 20, flex: 1,
    display: 'flex', flexDirection: 'column',
  },
  problem: {
    fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.4,
    color: 'var(--text)', marginBottom: 4,
  },
  name: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.7rem', color: '#555',
    textTransform: 'uppercase', letterSpacing: '0.5px',
    marginBottom: 'auto',
  },
  tagsWrap: {
    display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 12,
  },
  tag: {
    padding: '2px 7px', border: '1px solid var(--border-card)',
    fontSize: '0.6rem', color: '#666',
    fontFamily: "'JetBrains Mono', monospace",
  },
  clickHint: {
    fontSize: '0.6rem', color: '#444', textTransform: 'uppercase',
    letterSpacing: '1px', fontFamily: "'JetBrains Mono', monospace",
    marginTop: 10,
  },
}

export function ProjectCard({ project, onClick }) {
  const [hover, setHover] = useState(false)
  const hasImage = project.images && project.images.length > 0 && project.id
  const imgSrc = hasImage ? `./images/${project.id}/${project.images[0]}` : null

  const handleClick = () => {
    if (onClick) onClick(project)
  }

  return (
    <div
      role="article"
      className="cursor-target"
      style={styles.card(hover)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick() }}
    >
      {imgSrc ? (
        <div style={styles.imageWrap}>
          <img
            src={imgSrc}
            alt={`${project.name} screenshot`}
            loading="lazy"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
              transition: 'transform 0.4s ease',
              transform: hover ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        </div>
      ) : (
        <div style={styles.placeholder}>
          <Code size={24} opacity={0.25} />
        </div>
      )}

      <div style={styles.body}>
        <p style={styles.problem}>{project.problem}</p>
        <p style={styles.name}>{project.name}</p>

        <div style={styles.tagsWrap}>
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} style={styles.tag}>{t}</span>
          ))}
          {project.tech.length > 3 && (
            <span style={styles.tag}>+{project.tech.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  )
}
