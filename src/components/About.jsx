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
        <h2 className="section-title">How I Got Here</h2>
        <div style={styles.grid}>
          <div>
            <p style={styles.text}>
              I studied <span style={styles.highlight}>BS Information Technology</span> at Jesus Reigns Christian College.
              Honestly, a lot of it felt theoretical, until my internship at CallHounds Global.
            </p>
            <br />
            <p style={styles.text}>
              I was hired as a <span style={styles.highlight}>Network Engineer Intern</span>, and one of my tasks was
              monitoring DNS servers. The team did it through CMD - ping, wait, check, repeat. I kept thinking,
              'There has to be a way to automate this.' So I went home, opened YouTube, and started learning Java.
            </p>
            <br />
            <p style={styles.text}>
              A few weeks later, I had a working Java tool that logged results, played sound alerts, and did the
              monitoring for us. I showed it to the team. That conversation turned into a discussion about building
              a proper <span style={styles.highlight}>Ticketing System</span> with the IT department head,
              my first real taste of software design.
            </p>
            <br />
            <p style={styles.text}>
              I'm still learning every day. Right now I'm focused on <span style={styles.highlight}>Java</span> and{' '}
              <span style={styles.highlight}>Spring Boot</span>, and I'm looking for a junior role where I can
              keep growing and contribute to real projects.
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
