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
    lineHeight: 2,
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
        <h2 className="section-title">Highlights</h2>
        <div style={styles.grid}>
          <div>
            <p style={styles.text}>
              BS Information Technology &bull; Jesus Reigns Christian College
            </p>
            <br />
            <p style={styles.text}>
              CallHounds Global &bull; Network Engineer Intern &bull; Built DNS automation SDK &bull; Designed Ticketing System
            </p>
            <br />
            <p style={styles.text}>
              Java &bull; Spring Boot &bull; REST API &bull; Android &bull; Kotlin &bull; PHP &bull; Rust
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
