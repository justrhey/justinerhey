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

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 32,
  },
  card: {
    border: '1px solid #1a1a1a',
    padding: 32,
    transition: 'border-color 0.2s',
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
    border: '1px solid #333',
    fontSize: '0.85rem',
    color: '#ccc',
    transition: 'all 0.2s',
    cursor: 'default',
  },
}

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <p className="section-label">Skills</p>
        <h2 className="section-title">Technologies I Work With</h2>
        <div style={styles.grid}>
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              style={styles.card}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#444')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1a1a1a')}
            >
              <p style={styles.category}>{cat.title}</p>
              <ul style={styles.list}>
                {cat.skills.map((s) => (
                  <li
                    key={s}
                    style={styles.tag}
                    onMouseEnter={(e) => { e.target.style.borderColor = '#fff'; e.target.style.color = '#fff' }}
                    onMouseLeave={(e) => { e.target.style.borderColor = '#333'; e.target.style.color = '#ccc' }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
