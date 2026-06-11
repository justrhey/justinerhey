const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 64,
    alignItems: 'start',
  },
  text: {
    color: '#aaa',
    fontSize: '1rem',
    lineHeight: 1.9,
  },
  highlight: {
    color: '#fff',
    fontWeight: 500,
  },
  info: {
    display: 'grid',
    gap: 16,
  },
  row: {
    display: 'flex',
    gap: 12,
    padding: '14px 0',
    borderBottom: '1px solid #1a1a1a',
  },
  label: {
    color: '#666',
    minWidth: 100,
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  value: {
    color: '#bbb',
    fontSize: '0.95rem',
  },
}

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <p className="section-label">About</p>
        <h2 className="section-title">Background</h2>
        <div style={styles.grid}>
          <div>
            <p style={styles.text}>
              BS Information Technology graduate from <span style={styles.highlight}>Jesus Reigns Christian College</span>.
            </p>
            <br />
            <p style={styles.text}>
              Completed a <span style={styles.highlight}>Network Engineer internship</span> at CallHounds Global
              where I built a Java DNS ping automation tool and designed a Spring Boot ticketing system
              in collaboration with the IT department head.
            </p>
            <br />
            <p style={styles.text}>
              Java and <span style={styles.highlight}>Spring Boot</span> for backend development,
              with experience in Android, networking, and database management.
              Looking for a junior developer role.
            </p>
          </div>
          <div style={styles.info}>
            <div style={styles.row}>
              <span style={styles.label}>Name</span>
              <span style={styles.value}>Justine Rhey M. Tambong</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Location</span>
              <span style={styles.value}>Metro Manila, Philippines</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Degree</span>
              <span style={styles.value}>BS Information Technology</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>School</span>
              <span style={styles.value}>Jesus Reigns Christian College</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Email</span>
              <span style={styles.value}>justrhey.tambong021@gmail.com</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>GitHub</span>
              <span style={styles.value}>github.com/justrhey</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
