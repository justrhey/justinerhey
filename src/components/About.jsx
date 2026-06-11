import useScrollReveal from '../hooks/useScrollReveal.js'

const styles = {
  intro: {
    color: '#aaa',
    fontSize: '0.95rem',
    lineHeight: 1.9,
    marginBottom: 36,
    maxWidth: 600,
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
  const ref = useScrollReveal()
  return (
    <section id="about" ref={ref}>
      <div className="container">
        <p className="section-label">About</p>
        <h2 className="section-title">About Me</h2>

        <p style={styles.intro}>
          I got into tech the practical way. During my IT degree I interned at CallHounds Global as a Network Engineer. They asked if I knew how to code so I tried Java. What started as a small DNS tool turned into a ticketing system the team actually used. I also handled remote servers, Active Directory, and a Linux CLI tool for outbound/inbound calls where I was the last escalation point. I also worked at Deutsche Business Solutions as a Service Desk and Field Support Intern handling enterprise support with ServiceNow and maintaining POS systems for Caltex.
        </p>
        <p style={{ ...styles.intro, marginBottom: 48 }}>
          Those experiences showed me I like building things more than just maintaining them. Now I am looking for a junior developer role where I can keep learning, work on real problems, and build software that people actually use.
        </p>

        <div className="grid-2">
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
                <span style={styles.highlight}>Network Engineer Intern</span> at CallHounds Global &mdash; Built DNS automation SDK, managed remote servers, Active Directory, and a Linux CLI script for call routing: exe = ../../route_call.sh extension/destination
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'flex-start' }}>
              <IconBriefcase />
              <p style={styles.text}>
                <span style={styles.highlight}>Service Desk and Field Support Intern</span> at Deutsche Business Solutions &mdash; Assisted technical support, remote troubleshooting, ServiceNow, maintained POS systems for Caltex
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <IconWrench />
              <p style={styles.text}>
                <span style={styles.highlight}>Tech Stack:</span> Java &middot; Spring Boot &middot; REST API &middot; Android &middot; Kotlin &middot; PHP &middot; Rust &middot; ServiceNow &middot; Linux &middot; Active Directory
              </p>
            </div>
          </div>
          <div className="info-grid">
            <div className="info-row">
              <span style={styles.label}>Name</span>
              <span style={styles.value}>Justine Rhey M. Tambong</span>
            </div>
            <div className="info-row">
              <span style={styles.label}>Location</span>
              <span style={styles.value}>Metro Manila, Philippines</span>
            </div>
            <div className="info-row">
              <span style={styles.label}>Degree</span>
              <span style={styles.value}>BS Information Technology</span>
            </div>
            <div className="info-row">
              <span style={styles.label}>School</span>
              <span style={styles.value}>Jesus Reigns Christian College</span>
            </div>
            <div className="info-row">
              <span style={styles.label}>Email</span>
              <span style={styles.value}>justrhey.tambong@gmail.com</span>
            </div>
            <div className="info-row">
              <span style={styles.label}>GitHub</span>
              <span style={styles.value}>github.com/justrhey</span>
            </div>
            <div className="info-row">
              <span style={styles.label}>LinkedIn</span>
              <span style={styles.value}>
                <a href="https://linkedin.com/in/justrhey" target="_blank" rel="noopener noreferrer" style={{ color: '#bbb', textDecoration: 'none' }}
                   onMouseEnter={(e) => e.target.style.color = '#fff'}
                   onMouseLeave={(e) => e.target.style.color = '#bbb'}>
                  linkedin.com/in/justrhey
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
