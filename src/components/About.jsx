import useScrollReveal from '../hooks/useScrollReveal.js'

const styles = {
  intro: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    lineHeight: 1.9,
    marginBottom: 36,
    maxWidth: 600,
  },
  text: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    lineHeight: 1.8,
  },
  highlight: {
    color: 'var(--text)',
    fontWeight: 500,
  },
  label: {
    color: 'var(--text-faint)',
    minWidth: 100,
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  value: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
  },
  sectionHeader: {
    color: 'var(--text-faint)',
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
    color: 'var(--text-dim)',
    fontSize: '0.85rem',
    lineHeight: 1.6,
    paddingLeft: 0,
    marginBottom: 12,
  },

  dot: {
    color: 'var(--text-faint)',
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
          I am a backend developer with an interest in what happens between the server and the wire. I build APIs and services with <strong style={{ color: 'var(--text)' }}>Java</strong> and <strong style={{ color: 'var(--text)' }}>Spring Boot</strong>, and I have spent time learning Linux server basics, remote access, and foundational network security concepts like wireless handshake capture and Nmap reconnaissance.
        </p>
        <p style={{ ...styles.intro, marginBottom: 48 }}>
          I am still early in my career, but I tend to dig deeper than I need to. I like understanding how DNS works, what packets actually look like, and how a Linux system behaves when you push it beyond its default setup. I do not have all the answers yet, but I enjoy figuring them out.
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
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: 2 }}>Jesus Reigns Christian College</p>
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
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: 2, marginBottom: 10 }}>CallHounds Global and Virspacio Co Working Space</p>
                  <div style={styles.detailList}>
                    <p style={styles.detailItem}>• Built a DNS automation SDK with Java Swing for ICMP/TCP monitoring, developing a real-time network monitoring tool that automated DNS health checks across the infrastructure.</p>
                    <p style={styles.detailItem}>• Managed remote servers and Active Directory, handling server administration and user access management to maintain secure and reliable infrastructure operations.</p>
                    <p style={styles.detailItem}>• Used a Linux CLI application for outbound/inbound call routing, managing call flow configurations to enable efficient outbound and inbound call routing operations.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <IconBriefcase />
                <div>
                  <p style={styles.text}>
                    <span style={styles.highlight}>Field Support and Desk Support Intern</span>
                  </p>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: 2, marginBottom: 10 }}>Deutsche Business Solutions</p>
                  <div style={styles.detailList}>
                    <p style={styles.detailItem}>• Provided enterprise IT support and remote troubleshooting, diagnosing and resolving end-user technical issues to minimize downtime and restore operations quickly.</p>
                    <p style={styles.detailItem}>• Performed QA, setup, and maintenance of POS systems across Caltex fuel stations, ensuring hardware and software functioned correctly for reliable transaction processing.</p>
                    <p style={styles.detailItem}>• Administered daily XML backup routines for critical configuration and transaction data, managing automated backup processes to ensure disaster recovery readiness with consistent backups.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p style={styles.sectionHeader}>Tech Stack</p>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <IconWrench />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }} dangerouslySetInnerHTML={{
                  __html: [
                    '<img src="https://img.shields.io/badge/Java-007396?logo=java&logoColor=white&style=for-the-badge" alt="Java" />',
                    '<img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?logo=springboot&logoColor=white&style=for-the-badge" alt="Spring Boot" />',
                    '<img src="https://img.shields.io/badge/PHP-777BB4?logo=php&logoColor=white&style=for-the-badge" alt="PHP" />',
                    '<img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=for-the-badge" alt="PostgreSQL" />',
                    '<img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white&style=for-the-badge" alt="MySQL" />',
                    '<img src="https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white&style=for-the-badge" alt="Android" />',
                    '<img src="https://img.shields.io/badge/Kotlin-7F52FF?logo=kotlin&logoColor=white&style=for-the-badge" alt="Kotlin" />',
                    '<img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge" alt="JavaScript" />',
                    '<img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge" alt="Docker" />',
                    '<img src="https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=black&style=for-the-badge" alt="Linux" />',
                    '<img src="https://img.shields.io/badge/Laravel-FF2D20?logo=laravel&logoColor=white&style=for-the-badge" alt="Laravel" />',
                    '<img src="https://img.shields.io/badge/.NET-512BD4?logo=dotnet&logoColor=white&style=for-the-badge" alt=".NET" />'
                  ].join(' ')
                }} />
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
              <span style={styles.value}>justrhey.tambong@gmail.com</span>
            </div>
            <div className="info-row">
              <span style={styles.label}>GitHub</span>
              <span style={styles.value}>github.com/justrhey</span>
            </div>
            <div className="info-row">
              <span style={styles.label}>LinkedIn</span>
              <span style={styles.value}>
                <a href="https://linkedin.com/in/justrhey" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                   onMouseEnter={(e) => e.target.style.color = 'var(--text)'}
                   onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
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
