import { useState } from 'react'
import { motion } from 'motion/react'
import { GithubLogo, Globe } from '@phosphor-icons/react'

export function ProjectCard({ project, onClick, featured = false, isHovered, onHover, index = 0 }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const hasImage = project.images && project.images.length > 0 && project.id
  const imgSrc = hasImage ? `./images/${project.id}/${project.images[0]}` : null
  const maxTags = featured ? 6 : 4

  const handleClick = () => { if (onClick) onClick(project) }

  const content = (
    <div
      role="article"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick() }}
      className="project-card-aero"
      style={{
        display: 'flex',
        flexDirection: featured ? 'row' : 'column',
      }}
      onMouseEnter={() => onHover && onHover(project.id)}
      onMouseLeave={() => onHover && onHover(null)}
    >
      {/* Image */}
      {imgSrc ? (
        <div style={{
          width: featured ? '45%' : '100%',
          minHeight: featured ? 220 : 160,
          aspectRatio: featured ? 'auto' : '16/9',
          overflow: 'hidden', position: 'relative',
          background: 'rgba(200,232,248,0.3)',
          borderRight: featured ? '1px solid rgba(90,180,220,0.15)' : 'none',
          borderBottom: featured ? 'none' : '1px solid rgba(90,180,220,0.15)',
          flexShrink: 0,
        }}>
          {!imgLoaded && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, #d4eef8, #b8dce8)',
              animation: 'pulse-soft 1.5s ease-in-out infinite',
            }} />
          )}
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
              transition: 'opacity 0.35s ease',
            }}
          />
        </div>
      ) : (
        <div style={{
          width: featured ? '45%' : '100%',
          minHeight: featured ? 220 : 120,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(90,184,212,0.06), rgba(74,158,106,0.06))',
          borderRight: featured ? '1px solid rgba(90,180,220,0.15)' : 'none',
          borderBottom: featured ? 'none' : '1px solid rgba(90,180,220,0.15)',
          flexShrink: 0,
        }}>
          <GithubLogo size={36} weight="light" color="var(--aqua-mid)" opacity={0.35} />
        </div>
      )}

      {/* Body */}
      <div style={{
        padding: 20, flex: 1,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Category */}
        {project.category && (
          <span className={`badge-aero ${project.category === 'ai' ? 'badge-success' : 'badge-info'}`}
            style={{ alignSelf: 'flex-start', marginBottom: 8 }}
          >
            {project.category === 'fullstack' ? 'Full-Stack' :
             project.category === 'backend' ? 'Backend' :
             project.category === 'frontend' ? 'Frontend' :
             project.category === 'ai' ? 'AI / Automation' : project.category}
          </span>
        )}

        <h3 style={{
          fontSize: '1rem', fontWeight: 600,
          marginBottom: 4,
        }}>
          {project.name}
        </h3>

        <p style={{
          fontSize: '0.82rem', color: 'var(--mid-text)',
          lineHeight: 1.5, marginBottom: 10,
        }}>
          {project.problem}
        </p>

        {featured && (
          <p style={{
            fontSize: '0.85rem', color: 'var(--dark-text)',
            lineHeight: 1.7, marginBottom: 12, flex: 1,
          }}>
            {project.description.length > 180
              ? project.description.slice(0, 180) + '...'
              : project.description}
          </p>
        )}

        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
            {project.tech.slice(0, maxTags).map((t) => (
              <span key={t} className="tag-aero tag-aero-filled" style={{ fontSize: '0.68rem', padding: '3px 10px' }}>{t}</span>
            ))}
            {project.tech.length > maxTags && (
              <span className="tag-aero tag-aero-filled" style={{ fontSize: '0.68rem', padding: '3px 10px' }}>
                +{project.tech.length - maxTags}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: 14 }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontSize: '0.78rem', color: 'var(--mid-text)',
                  textDecoration: 'none', fontWeight: 500,
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--deep-aqua)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--mid-text)'}
              >
                <GithubLogo size={14} weight="duotone" />
                Code
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontSize: '0.78rem', color: 'var(--mid-text)',
                  textDecoration: 'none', fontWeight: 500,
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--deep-aqua)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--mid-text)'}
              >
                <Globe size={14} weight="duotone" />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        type: 'spring', stiffness: 80, damping: 18,
        delay: index * 0.05,
      }}
      style={{ height: '100%' }}
    >
      {content}
    </motion.div>
  )
}
