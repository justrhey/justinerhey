import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { GithubLogo, Globe } from '@phosphor-icons/react'

/* ─── Project Card ─── */
export function ProjectCard({ project, onClick, featured = false, isHovered, onHover, index = 0 }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const hasImage = project.images && project.images.length > 0 && project.id
  const imgSrc = hasImage ? `./images/${project.id}/${project.images[0]}` : null
  const maxTags = featured ? 6 : 4

  const handleClick = () => { if (onClick) onClick(project) }

  const cardContent = (
    <div
      role="article"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick() }}
      className="project-card"
      style={{
        display: 'flex',
        flexDirection: featured ? 'row' : 'column',
        height: '100%',
      }}
    >
      {/* Image / placeholder */}
      {imgSrc ? (
        <div style={{
          width: featured ? '40%' : '100%',
          minHeight: featured ? 240 : 160,
          aspectRatio: featured ? 'auto' : '16/9',
          overflow: 'hidden', position: 'relative',
          background: 'var(--bg-deep)',
          borderRight: featured ? '1px solid var(--border-mid)' : 'none',
          borderBottom: featured ? 'none' : '1px solid var(--border-mid)',
          flexShrink: 0,
        }}>
          {!imgLoaded && <div className="skeleton" style={{ position: 'absolute', inset: 0 }} />}
          <img
            src={imgSrc}
            alt={`${project.name} screenshot`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(true)}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
              opacity: imgLoaded ? 1 : 0,
              transition: 'transform 0.5s ease, opacity 0.35s ease',
              transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            }}
          />
        </div>
      ) : (
        <div style={{
          width: featured ? '40%' : '100%',
          minHeight: featured ? 240 : 130,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg-deep)',
          borderRight: featured ? '1px solid var(--border-mid)' : 'none',
          borderBottom: featured ? 'none' : '1px solid var(--border-mid)',
          flexShrink: 0,
        }}>
          <GithubLogo size={28} weight="light" opacity={0.2} />
        </div>
      )}

      {/* Body */}
      <div style={{
        padding: 20, flex: 1,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Category badge */}
        {project.category && (
          <span className="project-category-badge" style={{ alignSelf: 'flex-start', marginBottom: 10 }}>
            {project.category === 'fullstack' ? 'Full-Stack' :
             project.category === 'backend' ? 'Backend' :
             project.category === 'frontend' ? 'Frontend' :
             project.category === 'ai' ? 'AI / Automation' : project.category}
          </span>
        )}

        {/* Name */}
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '0.85rem', letterSpacing: '2px',
          marginBottom: 4,
        }}>
          {project.name}
        </h3>

        {/* Problem */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem', letterSpacing: '0.5px',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
          marginBottom: 10,
        }}>
          {project.problem}
        </p>

        {/* Description (featured only) */}
        {featured && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem', letterSpacing: '0.5px',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: 12,
            flex: 1,
          }}>
            {project.description.length > 180
              ? project.description.slice(0, 180) + '...'
              : project.description}
          </p>
        )}

        {/* Tags + Links */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
            {project.tech.slice(0, maxTags).map((t) => (
              <span key={t} className="project-tech-tag">{t}</span>
            ))}
            {project.tech.length > maxTags && (
              <span className="project-tech-tag">+{project.tech.length - maxTags}</span>
            )}
          </div>

          <div style={{ display: 'flex', gap: 14 }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="dash-icon"
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontFamily: 'var(--font-body)', fontSize: '0.55rem',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--green-bright)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <GithubLogo size={12} weight="duotone" />
                Code
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="dash-icon"
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontFamily: 'var(--font-body)', fontSize: '0.55rem',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--green-bright)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <Globe size={12} weight="duotone" />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18, delay: index * 0.06 }}
        style={{ height: '100%' }}
        onMouseEnter={() => onHover && onHover(project.id)}
        onMouseLeave={() => onHover && onHover(null)}
      >
        {cardContent}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      style={{ height: '100%' }}
      onMouseEnter={() => onHover && onHover(project.id)}
      onMouseLeave={() => onHover && onHover(null)}
    >
      {cardContent}
    </motion.div>
  )
}
