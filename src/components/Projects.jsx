import { useState } from 'react'
import ProjectModal from './ProjectModal.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'

const roleColors = {
  'Internship Project': '#4a9eff',
  'Capstone Project': '#b388ff',
  'Personal Project': '#69f0ae',
  'School Project': '#ffab40',
}

const projects = [
  {
    title: 'DNS Ping Automation SDK',
    slug: 'dns-ping',
    role: 'Internship Project',
    tech: ['Java', 'Java Swing', 'Networking', 'DNS', 'ICMP/TCP', 'File I/O'],
    url: 'https://github.com/justrhey/Pinger',
    intro: 'During my internship as a Network and System Intern, I was asked if I could code. I chose Java and delivered a production-grade DNS monitoring tool built with Java Swing — handling ICMP/TCP pings, uptime tracking, latency analysis, packet loss detection, and automated report exports. Every feature solved a real problem I encountered on the job.',
    images: ['main.png']
  },
  {
    title: 'Ticketing System (Spring Boot)',
    slug: 'ticketing-system',
    role: 'Internship Project',
    tech: ['Java', 'Spring Boot', 'REST API', 'DAO', 'Maven'],
    url: 'https://github.com/justrhey/ticket-management-system',
    demoUrl: 'https://ticket-management-system-9wr1.onrender.com',
    intro: 'Spring Boot ticketing system built iteratively with real stakeholder feedback for IT department workflow management. Note: demo may take ~50s to load on first visit (free Render tier).',
    images: ['screenshot1.png', 'screenshot2.png']
  },
  {
    title: 'Usmentz',
    role: 'Personal Project',
    tech: ['Java', 'Android', 'Room DB', 'Firestore', 'Material Design'],
    url: 'https://github.com/justrhey/usmentz',
    intro: 'Date planning Android app with calendar, expense tracking, photo booth, and reviews. Local persistence with Room DB and cloud sync via Firestore.',
    images: null
  },
  {
    title: 'Cassie',
    slug: 'cassie',
    role: 'Personal Project',
    tech: ['Kotlin', 'Jetpack Compose', 'Media3', 'ExoPlayer', 'MVVM'],
    url: 'https://github.com/justrhey/Cassie',
    intro: 'Music player app built with Kotlin and Jetpack Compose. Features album browsing, artist view, playlist management, and media playback using Media3 ExoPlayer with MVVM architecture.',
    images: ['home.jpeg', 'albums.jpeg', 'artist.jpeg', 'playlist.jpeg', 'top50.jpeg']
  },
  {
    title: 'POS System',
    slug: 'pos-system',
    role: 'School Project',
    tech: ['Java', 'JavaFX', 'SQLite', 'JDBC', 'MVC'],
    url: 'https://github.com/justrhey/POS-System',
    intro: 'Point-of-Sale system with inventory management, sales tracking, receipt generation, and reporting. Built with JavaFX for the UI layer and SQLite for local persistence.',
    images: null
  }
]

const cardStyles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 16,
  },
  card: (role) => ({
    borderLeft: `3px solid ${roleColors[role] || 'var(--border-light)'}`,
  }),
  imageWrap: {
    width: '100%',
    height: 160,
    overflow: 'hidden',
    background: 'var(--bg-card)',
    marginBottom: 16,
    position: 'relative',
    border: '1px solid var(--border)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.4s ease',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-faint)',
    fontSize: '0.75rem',
    border: '1px dashed var(--border-card)',
    boxSizing: 'border-box',
  },
  role: {
    fontSize: '0.65rem',
    color: 'var(--text-faint)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: 10,
  },
  roleDot: {
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: '50%',
    marginRight: 8,
    verticalAlign: 'middle',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: 14,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 'auto',
  },
  tag: {
    fontSize: '0.7rem',
    padding: '3px 10px',
    border: '1px solid #2a2a2a',
    color: 'var(--text-dim)',
  },
  link: {
    fontSize: '0.8rem',
    marginTop: 16,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  },
}

function ProjectCard({ project, onClick }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const hasImage = project.images && project.images.length > 0 && project.slug
  const imgSrc = hasImage ? `./images/${project.slug}/${project.images[0]}` : null

  return (
    <div
      className="project-card card-hover"
      style={cardStyles.card(project.role)}
      onClick={onClick}
    >
      {imgSrc ? (
        <div style={cardStyles.imageWrap}
          onMouseEnter={(e) => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1.05)' }}
          onMouseLeave={(e) => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1)' }}
        >
          {!imgLoaded && <div className="skeleton" style={{ position: 'absolute', inset: 0 }} />}
          <img
            src={imgSrc}
            alt={`${project.title} screenshot`}
            loading="lazy"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            style={{
              ...cardStyles.image,
              opacity: imgLoaded ? 1 : 0,
            }}
            onLoad={() => setImgLoaded(true)}
          />
        </div>
      ) : (
        <div style={{ ...cardStyles.imageWrap, ...cardStyles.imagePlaceholder }}>
          No screenshot available
        </div>
      )}
      <p style={cardStyles.role}>
        <span style={{ ...cardStyles.roleDot, background: roleColors[project.role] || 'var(--text-faint)' }} />
        {project.role}
      </p>
      <h3 style={cardStyles.title}>{project.title}</h3>
      <div style={cardStyles.tags}>
        {project.tech.map((tag) => (
          <span key={tag} style={cardStyles.tag}>{tag}</span>
        ))}
      </div>
      <span className="card-link" style={cardStyles.link}>Read the story &rarr;</span>
    </div>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const ref = useScrollReveal()

  return (
    <section id="projects" ref={ref}>
      <div className="container">
        <p className="section-label">Projects</p>
        <h2 className="section-title">Things I've Built</h2>
          <div className="project-grid" style={cardStyles.grid}>
          {projects.map((project) => (
            <ProjectCard
              key={project.slug || project.title}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  )
}
