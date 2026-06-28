import { personal } from '../data/personal'
import { SectionWrapper } from '../helpers/SectionWrapper'
import { AnimateOnScroll } from '../helpers/AnimateOnScroll'
import { motion } from 'motion/react'

/* ─── Timeline bullet ─── */
function BulletIcon({ active = false }) {
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 14, height: 14 }}>
      <div
        className={`timeline-bullet ${active ? 'timeline-bullet-active' : ''}`}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

/* ─── Timeline connector ─── */
function Connector() {
  return <div className="timeline-connector" />
}

/* ─── Timeline item ─── */
function TimelineItem({ exp, index }) {
  const isFirst = index === 0

  return (
    <AnimateOnScroll direction="up" delay={index * 0.1}>
      <div style={{ position: 'relative', display: 'flex', gap: 20, paddingLeft: 0 }}>
        {/* Timeline rail */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <BulletIcon active={isFirst} />
          {index < personal.experience.length - 1 && <Connector />}
        </div>

        {/* Content card */}
        <div className="dash-card" style={{ flex: 1, marginBottom: 32 }}>
          {/* Header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', flexWrap: 'wrap', gap: 8,
            marginBottom: 16,
          }}>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem', letterSpacing: '2px',
                marginBottom: 4,
              }}>
                {exp.role}
                <span style={{
                  display: 'inline-block', marginLeft: 10,
                  fontSize: '0.55rem', letterSpacing: '1px',
                  color: 'var(--green-bright)',
                  fontFamily: 'var(--font-body)',
                  background: 'var(--green-dark)',
                  padding: '2px 8px',
                  verticalAlign: 'middle',
                  textTransform: 'uppercase',
                }}>
                  {exp.location}
                </span>
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem', letterSpacing: '1px',
                color: 'var(--text-muted)',
              }}>
                {exp.company}
              </p>
            </div>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.55rem', letterSpacing: '2px',
              color: 'var(--text-dim)',
              padding: '4px 10px', whiteSpace: 'nowrap',
              borderTop: '1px solid var(--border-left)',
              borderBottom: '1px solid var(--border-dark)',
              borderLeft: '1px solid var(--border-left)',
              borderRight: '1px solid var(--border-right)',
            }}>
              {exp.period}
            </span>
          </div>

          {/* Highlights */}
          <ul style={{
            listStyle: 'none',
            display: 'flex', flexDirection: 'column', gap: 8,
            marginBottom: exp.clientWork ? 20 : 0,
          }}>
            {exp.highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.35 }}
                style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem', letterSpacing: '0.5px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                }}
              >
                <span style={{ color: 'var(--green-bright)', flexShrink: 0, marginTop: 1 }}>›</span>
                {h}
              </motion.li>
            ))}
          </ul>

          {/* Client work */}
          {exp.clientWork && exp.clientWork.length > 0 && (
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border-mid)' }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.5rem', letterSpacing: '3px',
                color: 'var(--green-bright)',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}>
                Notable Client Projects
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {exp.clientWork.map((client, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.35 }}
                    style={{
                      padding: '14px 18px',
                      background: 'var(--bg-deep)',
                      borderTop: '2px solid var(--border-light)',
                      borderBottom: '2px solid var(--border-dark)',
                      borderLeft: '1px solid var(--border-left)',
                      borderRight: '1px solid var(--border-right)',
                    }}
                  >
                    <p style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.8rem', letterSpacing: '2px',
                      marginBottom: 4,
                    }}>
                      {client.name}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.7rem', letterSpacing: '0.5px',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                    }}>
                      {client.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimateOnScroll>
  )
}

/* ─── Experience Section ─── */
export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <AnimateOnScroll direction="up">
        <h2 className="section-title">Where I Work</h2>
      </AnimateOnScroll>

      <div style={{ maxWidth: 780 }}>
        {/* Bio teaser */}
        <AnimateOnScroll direction="up" delay={0.1}>
          <div className="dash-card" style={{ marginBottom: 48 }}>
            {personal.bio.map((p, i) => (
              <p key={i} style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem', letterSpacing: '0.5px',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: i < personal.bio.length - 1 ? 12 : 0,
              }}>{p}</p>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Timeline */}
        {personal.experience.map((exp, i) => (
          <TimelineItem key={i} exp={exp} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
