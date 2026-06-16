import { useState, useEffect, useRef } from 'react'

export function ProjectCard({ project, onClick }) {
  const [canHover, setCanHover] = useState(true)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const cardRef = useRef(null)

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover)').matches)
  }, [])

  const handleMouseMove = (e) => {
    if (!cardRef.current || !canHover) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ rotateX: -y * 12, rotateY: x * 12 })
  }

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 })
  }

  return (
    <div
      ref={cardRef}
      role="article"
      className="cursor-target bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6 h-full transition-all duration-200 hover:border-[#444] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)]"
      style={{
        transform: canHover ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)` : 'none',
        transition: 'border-color 0.2s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <p className="text-lg font-semibold text-white leading-snug mb-2">
        {project.problem}
      </p>
      <p className="font-mono text-sm text-[#aaa] mb-3">
        {project.name}
      </p>
      <p className="text-sm text-[#888] mb-4 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded-md bg-[#111] border border-[#222] font-mono text-xs text-[#888]"
          >
            {tech}
          </span>
        ))}
      </div>
      {project.featured && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/60 text-[0.6rem] uppercase tracking-wider font-mono">
          Featured
        </span>
      )}
      {!project.featured && (
        <div className="flex gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo for ${project.name}`}
              className="text-sm text-white/70 font-medium hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo →
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View GitHub for ${project.name}`}
            className="text-sm text-white/70 font-medium hover:text-white transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            GitHub →
          </a>
        </div>
      )}
    </div>
  )
}
