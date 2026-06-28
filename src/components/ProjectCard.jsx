import { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { Code, GithubLogo, Globe } from '@phosphor-icons/react'

/* ─── Interactive 3D Tilt Card ─── */
function TiltCard({ children, className, style, onHover, isHovered }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleMouseMove = (e) => {
    if (isMobile || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -8, y: x * 8 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    if (onHover) onHover(null)
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover && onHover(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? 'transform 0.1s ease' : 'transform 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {children}
    </div>
  )
}

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
      className="glow-card"
      style={{
        display: 'flex',
        flexDirection: featured ? 'row' : 'column',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        height: '100%',
        transition: 'all 0.3s var(--ease-out)',
      }}
    >
      {/* Image / placeholder section */}
      {imgSrc ? (
        <div style={{
          width: featured ? '40%' : '100%',
          minHeight: featured ? 240 : 180,
          aspectRatio: featured ? 'auto' : '16/9',
          overflow: 'hidden', position: 'relative',
          background: 'var(--bg-deep)',
          borderRight: featured ? '1px solid var(--border)' : 'none',
          borderBottom: featured ? 'none' : '1px solid var(--border)',
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
          {/* Overlay gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, transparent 50%, rgba(2,2,3,0.4) 100%)',
            pointerEvents: 'none',
          }} />
        </div>
      ) : (
        <div style={{
          width: featured ? '40%' : '100%',
          minHeight: featured ? 240 : 150,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg-elevated)',
          borderRight: featured ? '1px solid var(--border)' : 'none',
          borderBottom: featured ? 'none' : '1px solid var(--border)',
          flexShrink: 0,
        }}>
          <Code size={36} color="var(--text-faint)" opacity={0.3} weight="light" />
        </div>
      )}

      {/* Body */}
      <div style={{
        padding: 22, flex: 1,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Category badge */}
        {project.category && (
          <div style={{
            display: 'inline-flex', alignSelf: 'flex-start',
            marginBottom: 10,
            fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
            letterSpacing: '1px', textTransform: 'uppercase',
            padding: '2px 10px', borderRadius: 20,
            background: project.category === 'ai'
              ? 'var(--accent-2-dim)'
              : 'var(--accent-dim)',
            color: project.category === 'ai'
              ? 'var(--accent-2)'
              : 'var(--accent)',
          }}>
            {project.category === 'fullstack' ? 'Full-Stack' :
             project.category === 'backend' ? 'Backend' :
             project.category === 'frontend' ? 'Frontend' :
             project.category === 'ai' ? 'AI / Automation' : project.category}
          </div>
        )}

        {/* Name */}
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.05rem', fontWeight: 600,
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em',
          marginBottom: 4,
        }}>
          {project.name}
        </h3>

        {/* Problem statement */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
          marginBottom: 12,
        }}>
          {project.problem}
        </p>

        {/* Description (featured only) */}
        {featured && (
          <p style={{
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: 14,
            flex: 1,
          }}>
            {project.description.length > 200
              ? project.description.slice(0, 200) + '...'
              : project.description}
          </p>
        )}

        {/* Spacer + Tags at bottom */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14,
          }}>
            {project.tech.slice(0, maxTags).map((t) => (
              <span key={t} className="tag" style={{ fontSize: '0.58rem', padding: '2px 8px' }}>{t}</span>
            ))}
            {project.tech.length > maxTags && (
              <span className="tag" style={{ fontSize: '0.58rem', padding: '2px 8px' }}>
                +{project.tech.length - maxTags}
              </span>
            )}
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 12 }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  color: 'var(--text-dim)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--text-secondary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-dim)'}
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
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  color: 'var(--text-dim)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-dim)'}
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

  // Wrap in tilt for non-featured cards only (tilt on big wide cards feels odd)
  if (!featured) {
    return (
      <TiltCard onHover={onHover} isHovered={isHovered}>
        {cardContent}
      </TiltCard>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18, delay: index * 0.06 }}
      style={{ height: '100%' }}
    >
      {cardContent}
    </motion.div>
  )
}
