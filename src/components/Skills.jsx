import useScrollReveal from '../hooks/useScrollReveal.js'

const skillCategories = [
  {
    title: 'Backend',
    skills: ['Java', 'Spring Boot', 'REST API', 'Swagger', 'Maven'],
  },
  {
    title: 'Mobile',
    skills: ['Android', 'Android Studio', 'Room DB', 'Glide', 'Material Design'],
  },
  {
    title: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Astro'],
  },
  {
    title: 'Database',
    skills: ['MySQL', 'PostgreSQL', 'H2 Database'],
  },
  {
      title: 'Languages',
      skills: ['Java', 'Rust', 'Python', 'PHP', 'JavaScript', 'Kotlin', 'C++', 'C#'],
  },
  {
    title: 'Tools & OS',
    skills: ['Git', 'Arch Linux', 'Hyprland', 'Ubuntu', 'Fedora', 'Linux Mint', 'GNOME', 'KDE Plasma'],
  },
]

const certificates = [
  {
    title: 'Windows Server 2016 Fundamentals Training',
    issuer: 'Microsoft',
    type: 'Certificate of Participation',
    image: './images/certificates/certificate.png',
  },
]

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 24,
  },
  card: {
    padding: 32,
  },
  category: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#666',
    marginBottom: 20,
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    listStyle: 'none',
  },
  tag: {
    padding: '6px 14px',
    fontSize: '0.85rem',
  },
  certSubtitle: {
    fontSize: '0.8rem',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginTop: 56,
    marginBottom: 24,
  },
}

export default function Skills() {
  const ref = useScrollReveal()
  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <p className="section-label">Skills</p>
        <h2 className="section-title">Technologies I Work With</h2>
        <div className="fade-in-children" style={styles.grid}>
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="skill-card card-hover"
              style={styles.card}
            >
              <p style={styles.category}>{cat.title}</p>
              <ul style={styles.list}>
                {cat.skills.map((s) => (
                  <li
                    key={s}
                    className="skill-tag"
                    style={styles.tag}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p style={styles.certSubtitle}>Certifications</p>
        <div className="fade-in-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {certificates.map((cert) => (
            <div key={cert.title} className="cert-card card-hover" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="cert-image">
                <img src={cert.image} alt={cert.title} draggable={false} onDragStart={(e) => e.preventDefault()} />
              </div>
              <div style={{ padding: 24 }}>
                <p style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>{cert.type}</p>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 6 }}>{cert.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#888' }}>{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
