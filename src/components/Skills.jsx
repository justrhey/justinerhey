import { useState } from 'react'
import { SectionWrapper } from '../helpers/SectionWrapper'
import { AnimateOnScroll } from '../helpers/AnimateOnScroll'
import { skills } from '../data/skills'

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 },
  card: { padding: 32 },
  category: { fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-faint)', marginBottom: 20 },
  list: { display: 'flex', flexWrap: 'wrap', gap: 8, listStyle: 'none' },
  tag: { padding: '6px 14px', fontSize: '0.85rem' },
  certSubtitle: { fontSize: '0.8rem', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: 56, marginBottom: 24 },
}

// Group by category
const categories = {}
skills.forEach(s => {
  if (!categories[s.category]) categories[s.category] = []
  categories[s.category].push(s)
})

const certs = [
  {
    title: 'Windows Server 2016 Fundamentals Training',
    issuer: 'Microsoft',
    type: 'Certificate of Participation',
    image: './images/certificates/certificate.png',
  },
]

export default function Skills() {
  const [certLoaded, setCertLoaded] = useState(false)

  return (
    <SectionWrapper id="skills">
      <AnimateOnScroll direction="up">
        <p className="section-label">Skills</p>
        <h2 className="section-title">Tech Stack</h2>
      </AnimateOnScroll>

      <div className="fade-in-children" style={styles.grid}>
        {Object.entries(categories).map(([category, catskills]) => (
          <div key={category} className="skill-card card-hover" style={styles.card}>
            <p style={styles.category}>{category}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {catskills.map(s => (
                <span
                  key={s.name}
                  className="skill-tag"
                  style={{ padding: '6px 14px', fontSize: '0.85rem', border: '1px solid var(--border-card)', color: 'var(--text-dim)', fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p style={styles.certSubtitle}>Certifications</p>
      <div className="fade-in-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
        {certs.map((cert) => (
          <div key={cert.title} className="cert-card card-hover" style={{ border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ aspectRatio: '3/2', background: '#0a0a0a', overflow: 'hidden', position: 'relative' }}>
              {!certLoaded && <div className="skeleton skeleton-image" />}
              <img
                src={cert.image} alt={cert.title} loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: certLoaded ? 1 : 0, transition: 'opacity 0.35s' }}
                onLoad={() => setCertLoaded(true)}
                onError={() => setCertLoaded(true)}
              />
            </div>
            <div style={{ padding: 24 }}>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>{cert.type}</p>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 6 }}>{cert.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{cert.issuer}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
