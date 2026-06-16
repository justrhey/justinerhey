import { personal } from '../data/personal'
import { SectionWrapper } from '../helpers/SectionWrapper'
import { AnimateOnScroll } from '../helpers/AnimateOnScroll'

const styles = {
  intro: { color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: 36, maxWidth: 600 },
  sectionHeader: { color: 'var(--text-faint)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 12 },
  text: { color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8 },
  highlight: { color: 'var(--text)', fontWeight: 500 },
  label: { color: 'var(--text-faint)', minWidth: 100, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' },
  value: { color: 'var(--text-secondary)', fontSize: '0.95rem' },
  detailItem: { color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: 0, marginBottom: 12 },
  dot: { color: 'var(--text-faint)', marginRight: 8 },
}

const IconGraduation = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 5 }}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
  </svg>
)
const IconBriefcase = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 5 }}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
)

export default function About() {
  return (
    <SectionWrapper id="about">
      <AnimateOnScroll direction="up">
        <p className="section-label">About</p>
        <h2 className="section-title">About Me</h2>
      </AnimateOnScroll>

      <AnimateOnScroll direction="up" delay={0.1}>
        {personal.bio.map((p, i) => (
          <p key={i} style={styles.intro}>{p}</p>
        ))}
      </AnimateOnScroll>

      {personal.currentWork && (
        <AnimateOnScroll direction="up" delay={0.2}>
          <div style={{ marginBottom: 48 }}>
            <p style={styles.sectionHeader}>Right now</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {personal.currentWork.map((item, i) => (
                <p key={i} style={styles.detailItem}>
                  <span style={styles.dot}>•</span> {item}
                </p>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      )}

      <div className="grid-2">
        <AnimateOnScroll direction="left">
          <div style={{ marginBottom: 32 }}>
            <p style={styles.sectionHeader}>Education</p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <IconGraduation />
              <div>
                <p style={styles.text}><span style={styles.highlight}>BS Information Technology</span></p>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: 2 }}>Jesus Reigns Christian College</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <p style={styles.sectionHeader}>Experience</p>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'flex-start' }}>
              <IconBriefcase />
              <div>
                <p style={styles.text}><span style={styles.highlight}>Network and System Engineer Intern</span></p>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: 2, marginBottom: 10 }}>CallHounds Global and Virspacio Co Working Space</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={styles.detailItem}>• Built a DNS automation SDK with Java Swing for ICMP/TCP monitoring, developing a real-time network monitoring tool that automated DNS health checks across the infrastructure.</p>
                  <p style={styles.detailItem}>• Managed remote servers and Active Directory, handling server administration and user access management to maintain secure and reliable infrastructure operations.</p>
                  <p style={styles.detailItem}>• Used a Linux CLI application for outbound/inbound call routing, managing call flow configurations to enable efficient outbound and inbound call routing operations.</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <IconBriefcase />
              <div>
                <p style={styles.text}><span style={styles.highlight}>Field Support and Desk Support Intern</span></p>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: 2, marginBottom: 10 }}>Deutsche Business Solutions</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={styles.detailItem}>• Provided enterprise IT support and remote troubleshooting, diagnosing and resolving end-user technical issues to minimize downtime and restore operations quickly.</p>
                  <p style={styles.detailItem}>• Performed QA, setup, and maintenance of POS systems across Caltex fuel stations, ensuring hardware and software functioned correctly for reliable transaction processing.</p>
                  <p style={styles.detailItem}>• Administered daily XML backup routines for critical configuration and transaction data, managing automated backup processes to ensure disaster recovery readiness with consistent backups.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {personal.workingStyle && (
              <div style={{ marginBottom: 24 }}>
                <p style={styles.sectionHeader}>Working Style</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {personal.workingStyle.map((s) => (
                    <span key={s} style={{ padding: '6px 14px', border: '1px solid var(--border-light)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll direction="right" delay={0.2}>
          <div className="info-grid">
            <div className="info-row"><span style={styles.label}>Name</span><span style={styles.value}>Justine Rhey M. Tambong</span></div>
            <div className="info-row"><span style={styles.label}>Location</span><span style={styles.value}>Metro Manila, Philippines</span></div>
            <div className="info-row"><span style={styles.label}>Degree</span><span style={styles.value}>BS Information Technology</span></div>
            <div className="info-row"><span style={styles.label}>School</span><span style={styles.value}>Jesus Reigns Christian College</span></div>
            <div className="info-row"><span style={styles.label}>Email</span><span style={styles.value}>justrhey.tambong@gmail.com</span></div>
            <div className="info-row"><span style={styles.label}>GitHub</span><span style={styles.value}>github.com/justrhey</span></div>
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
        </AnimateOnScroll>
      </div>
    </SectionWrapper>
  )
}
