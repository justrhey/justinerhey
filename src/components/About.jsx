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
  sectionHeader: {
    color: '#555',
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: 12,
  },
  detailList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  detailItem: {
    color: '#777',
    fontSize: '0.85rem',
    lineHeight: 1.6,
    paddingLeft: 0,
  },
  dot: {
    color: '#555',
    marginRight: 8,
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
          I work at the intersection of software development and networking. I repurposed an old laptop as a personal server and tried SSH over it to test connectivity. Foundational stuff, but it gives me a better sense of how systems communicate.
        </p>
        <p style={{ ...styles.intro, marginBottom: 48 }}>
          On the security side, I have captured wireless handshakes with aircrack-ng and tried my hand at Nmap. I am also drawn to what happens beneath the interface. How a DNS query resolves, what a packet looks like on the wire, and how a Linux desktop behaves when customized beyond the defaults. Still building experience, but I find these areas worth the time.
        </p>

        <div className="grid-2">
          <div>
            <div style={{ marginBottom: 32 }}>
              <p style={styles.sectionHeader}>Education</p>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <IconGraduation />
                <div>
                  <p style={styles.text}>
                    <span style={styles.highlight}>BS Information Technology</span>
                  </p>
                  <p style={{ color: '#777', fontSize: '0.85rem', marginTop: 2 }}>Jesus Reigns Christian College</p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <p style={styles.sectionHeader}>Experience</p>

              <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'flex-start' }}>
                <IconBriefcase />
                <div>
                  <p style={styles.text}>
                    <span style={styles.highlight}>Network and System Engineer Intern</span>
                  </p>
                  <p style={{ color: '#777', fontSize: '0.85rem', marginTop: 2, marginBottom: 10 }}>CallHounds Global</p>
                  <div style={styles.detailList}>
                    <p style={styles.detailItem}><span style={styles.dot}>&#8226;</span> Built DNS automation SDK with Java Swing for ICMP/TCP monitoring</p>
                    <p style={styles.detailItem}><span style={styles.dot}>&#8226;</span> Managed remote servers and Active Directory</p>
                    <p style={styles.detailItem}><span style={styles.dot}>&#8226;</span> Used a Linux CLI application for outbound/inbound call routing</p>
                    <p style={styles.detailItem}><span style={styles.dot}>&#8226;</span> Escalation pipeline: L1 &#8594; L2 (me) &#8594; escalation if unresolved</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <IconBriefcase />
                <div>
                  <p style={styles.text}>
                    <span style={styles.highlight}>Service Desk and Field Support Intern</span>
                  </p>
                  <p style={{ color: '#777', fontSize: '0.85rem', marginTop: 2, marginBottom: 10 }}>Deutsche Business Solutions</p>
                  <div style={styles.detailList}>
                    <p style={styles.detailItem}><span style={styles.dot}>&#8226;</span> Enterprise IT support and remote troubleshooting for 200+ users via ServiceNow</p>
                    <p style={styles.detailItem}><span style={styles.dot}>&#8226;</span> QA'd POS systems for data handling compliance and Wamos sync verification</p>
                    <p style={styles.detailItem}><span style={styles.dot}>&#8226;</span> Daily XML backups for critical configuration and transaction data</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p style={styles.sectionHeader}>Tech Stack</p>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <IconWrench />
                <p style={styles.text}>
                  Java &middot; Spring Boot &middot; REST API &middot; Android &middot; Kotlin &middot; PHP &middot; Rust &middot; ServiceNow &middot; Linux &middot; Active Directory
                </p>
              </div>
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
              <span style={styles.value}>justinerhey021@gmail.com</span>
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
