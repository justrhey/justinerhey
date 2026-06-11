import { useState } from 'react'
import ProjectModal from './ProjectModal.jsx'

const projects = [
  {
    title: 'DNS Ping Automation SDK',
    tech: ['Java', 'Networking', 'DNS', 'CLI', 'File I/O'],
    role: 'Solo Developer',
    story: "During my internship at CallHounds Global, I noticed the team was manually pinging DNS servers through CMD - type ping, wait, check, repeat. I already knew Java, so I built a tool that automated the whole process: logging, sound alerts, background execution. It used OOP with some spaghetti code, but it got the job done. That was my first real programming project.",
    url: 'https://github.com/justrhey/Pinger',
  },
  {
    title: 'Ticketing System (Spring Boot)',
    tech: ['Java', 'Spring Boot', 'REST API', 'DAO', 'Maven'],
    role: 'Solo Developer',
    story: "After seeing the DNS tool, the IT department head asked if I could build a ticketing system for them. I said yes, then panicked because I had never built a web app before. I learned Spring Boot as I went, building one feature at a time. Every time I finished something, I would ask for a review: 'Is this what you had in mind?' Then they would tell me what to add next. Basically Agile without knowing what Agile was. It taught me how to turn someone else's requirements into working software, one iteration at a time.",
    url: 'https://github.com/justrhey/ticket-management-system',
  },
  {
    title: 'EHR Blockchain System',
    tech: ['Rust', 'Actix-web', 'PostgreSQL', 'Blockchain', 'Stellar', 'JWT'],
    role: 'Capstone Project',
    story: 'My college capstone, a blockchain-based Electronic Health Record system. Built in Rust. It has JWT authentication, Stellar identity integration, AES-GCM encryption, TOTP 2FA, FHIR outbound, and PostgreSQL persistence. Definitely the hardest thing I have attempted so far. I spent countless nights debugging Rust borrow checker errors and figuring out how blockchain actually works under the hood.',
    url: 'https://github.com/justrhey/capstone',
  },
  {
    title: 'Cassie',
    tech: ['Kotlin', 'Jetpack Compose', 'Android', 'Media Player', 'Room DB'],
    role: 'Solo Developer',
    story: 'I built this Android music player to learn Kotlin and Jetpack Compose from scratch. It has lyrics display, an equalizer, playlist management, and a party mode that generates song lines using grammar rules. Most of the code was written while watching tutorials at 2am.',
    url: 'https://github.com/justrhey/Cassie',
  },
  {
    title: 'Usmentz',
    tech: ['Java', 'Android', 'Room DB', 'Firestore', 'Material Design'],
    role: 'Solo Developer',
    story: 'A date planning Android app with calendar, expense tracking, photo booth, and reviews. I wanted to understand how to structure a full mobile app with local persistence (Room DB) and cloud sync (Firestore). My first experience with Material Design guidelines.',
    url: 'https://github.com/justrhey/usmentz',
  },
  {
    title: 'POS System',
    tech: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript'],
    role: 'Solo Developer',
    story: 'A simple point-of-sale system for small business inventory and transaction management. Built with PHP to understand how traditional LAMP stack web apps work end to end, from database schema design to rendering HTML.',
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
                Read the story &rarr;
              </span>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
