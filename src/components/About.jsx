const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 48,
    alignItems: 'start',
  },
  text: {
    color: '#aaa',
    fontSize: '0.95rem',
    lineHeight: 1.8,
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

const IconGraduation = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 5 }}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
  </svg>
)

const IconBriefcase = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 5 }}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
)

const IconWrench = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 5 }}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
)

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <p className="section-label">About</p>
        <h2 className="section-title">Highlights</h2>
        <div style={styles.grid}>
          <div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'flex-start' }}>
              <IconGraduation />
              <p style={styles.text}>
                <span style={styles.highlight}>BS Information Technology</span> at Jesus Reigns Christian College
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'flex-start' }}>
              <IconBriefcase />
              <p style={styles.text}>
                <span style={styles.highlight}>Network Engineer Intern</span> at CallHounds Global &mdash; Built DNS automation SDK &amp; designed Ticketing System
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <IconWrench />
              <p style={styles.text}>
                <span style={styles.highlight}>Tech Stack:</span> Java &middot; Spring Boot &middot; REST API &middot; Android &middot; Kotlin &middot; PHP &middot; Rust
              </p>
            </div>
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
