import { useState } from 'react'
import ProjectModal from './ProjectModal.jsx'

const projects = [
  {
    title: 'DNS Ping Automation SDK',
    role: 'Internship Project',
    tech: ['Java', 'Networking', 'DNS', 'CLI', 'File I/O'],
    url: 'https://github.com/justrhey/Pinger',
    intro: 'Java SDK for automated DNS ping monitoring with ICMP/TCP support. Tracks server availability, latency, and packet loss.',
    images: null
  },
  {
    title: 'Ticketing System (Spring Boot)',
    role: 'Internship Project',
    tech: ['Java', 'Spring Boot', 'REST API', 'DAO', 'Maven'],
    url: 'https://github.com/justrhey/ticket-management-system',
    intro: 'Spring Boot ticketing system built iteratively with real stakeholder feedback for IT department workflow management.',
    images: null
  },
  {
    title: 'EHR Blockchain System',
    role: 'Capstone Project',
    tech: ['Rust', 'Actix-web', 'PostgreSQL', 'Blockchain', 'Stellar', 'JWT'],
    url: 'https://github.com/justrhey/capstone',
    intro: 'Blockchain-based Electronic Health Record system in Rust with JWT auth, Stellar identity, AES-GCM encryption, and FHIR support.',
    images: null
  },
  {
    title: 'Cassie',
    role: 'Personal Project',
    tech: ['Kotlin', 'Jetpack Compose', 'Android', 'Media Player', 'Room DB'],
    url: 'https://github.com/justrhey/Cassie',
    intro: 'Android music player with Jetpack Compose UI. Features playlist management, equalizer, lyrics display, and grammar-based party mode.',
    images: ['albums.jpeg', 'artist.jpeg', 'home.jpeg', 'playlist.jpeg', 'top50.jpeg']
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
    title: 'POS System',
    role: 'School Project',
    tech: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript'],
    url: 'https://github.com/justrhey/pos-system',
    intro: 'Point-of-sale system for small business inventory and transaction management. Full LAMP stack from DB schema to rendered HTML.',
    images: null
  }
]

const cardStyles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 16,
  },
  card: {
    border: '1px solid #1a1a1a',
    padding: 24,
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    flexDirection: 'column',
  },
  role: {
    fontSize: '0.65rem',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: 10,
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
    color: '#777',
  },
  link: {
    fontSize: '0.8rem',
    color: '#555',
    marginTop: 16,
    transition: 'color 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
  },
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects">
      <div className="container">
        <p className="section-label">Projects</p>
        <h2 className="section-title">Things I've Built</h2>
        <div style={cardStyles.grid}>
          {projects.map((project, index) => (
            <div
              key={index}
              style={cardStyles.card}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#333'
                const link = e.currentTarget.querySelector('.card-link')
                if (link) { link.style.color = '#ccc' }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1a1a1a'
                const link = e.currentTarget.querySelector('.card-link')
                if (link) { link.style.color = '#555' }
              }}
            >
              <p style={cardStyles.role}>{project.role}</p>
              <h3 style={cardStyles.title}>{project.title}</h3>
              <div style={cardStyles.tags}>
                {project.tech.map((tag, i) => (
                  <span key={i} style={cardStyles.tag}>{tag}</span>
                ))}
              </div>
              <span className="card-link" style={cardStyles.link}>Read the story &rarr;</span>
            </div>
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
