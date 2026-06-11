import { useState } from 'react'
import ProjectModal from './ProjectModal.jsx'

const projects = [
  {
    title: 'DNS Ping Automation SDK',
    tech: ['Java', 'Networking', 'DNS', 'CLI', 'File I/O'],
    role: 'Personal Project',
    intro: "Built a Java SDK that automates DNS ping monitoring with structured logging and sound notifications. Replaced manual CMD-based workflows. Uses OOP patterns. Deployed during internship at CallHounds Global.",
    url: 'https://github.com/justrhey/Pinger',
  },
  {
    title: 'Ticketing System (Spring Boot)',
    tech: ['Java', 'Spring Boot', 'REST API', 'DAO', 'Maven'],
    role: 'Personal Project',
    intro: "RESTful ticketing system with layered DAO/Service/Repository architecture. GET endpoints, toString representation, structured data handling. Built for the IT department at CallHounds Global with iterative feedback cycles.",
    url: 'https://github.com/justrhey/ticket-management-system',
  },
  {
    title: 'EHR Blockchain System',
    tech: ['Rust', 'Actix-web', 'PostgreSQL', 'Blockchain', 'Stellar', 'JWT'],
    role: 'Capstone Project',
    intro: 'Blockchain-based Electronic Health Record system in Rust. Features JWT auth, Stellar identity, AES-GCM encryption, TOTP 2FA, FHIR outbound, and PostgreSQL persistence. Capstone project for BS IT degree.',
    url: 'https://github.com/justrhey/capstone',
  },
  {
    title: 'Cassie',
    tech: ['Kotlin', 'Jetpack Compose', 'Android', 'Media Player', 'Room DB'],
    role: 'Personal Project',
    intro: 'Android music player with lyrics display, equalizer, playlist management, and grammar-based party mode. Built with Kotlin and Jetpack Compose.',
    url: 'https://github.com/justrhey/Cassie',
    images: ['albums.jpeg', 'artist.jpeg', 'home.jpeg', 'playlist.jpeg', 'top50.jpeg'],
  },
  {
    title: 'Usmentz',
    tech: ['Java', 'Android', 'Room DB', 'Firestore', 'Material Design'],
    role: 'Personal Project',
    intro: 'Date planning Android app with calendar, expense tracking, photo booth, and reviews. Local persistence with Room DB and cloud sync with Firestore.',
    url: 'https://github.com/justrhey/usmentz',
  },
  {
    title: 'POS System',
    tech: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript'],
    role: 'Personal Project',
    intro: 'Point-of-sale system for small business inventory and transaction management. Built with PHP and MySQL.',
    url: 'https://github.com/justrhey/pos-system',
  },
]

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: 20,
  },
  card: {
    border: '1px solid #1a1a1a',
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  title: {
    fontSize: '1.05rem',
    fontWeight: 600,
    marginBottom: 4,
  },
  role: {
    fontSize: '0.75rem',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: 14,
  },
  tech: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
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
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    marginTop: 'auto',
    transition: 'color 0.2s',
  },
}

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects">
      <div className="container">
        <p className="section-label">Projects</p>
        <h2 className="section-title">Things I've Built</h2>
        <div style={styles.grid}>
          {projects.map((p) => (
            <div
              key={p.title}
              style={styles.card}
              onClick={() => setSelected(p)}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#333' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a1a' }}
            >
              <h3 style={styles.title}>{p.title}</h3>
              <p style={styles.role}>{p.role}</p>
              <div style={styles.tech}>
                {p.tech.map((t) => (
                  <span key={t} style={styles.tag}>{t}</span>
                ))}
              </div>
              <span style={styles.link}>
                Details &rarr;
              </span>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
