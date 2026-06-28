import { personal } from '../data/personal'
import { SectionWrapper } from '../helpers/SectionWrapper'
import { AnimateOnScroll } from '../helpers/AnimateOnScroll'
import { motion } from 'motion/react'

/* ─── Timeline bullet ─── */
function BulletIcon({ active }) {
  return (
    <div className={`timeline-aero-bullet ${active ? 'timeline-aero-bullet-active' : ''}`} />
  )
}

/* ─── Connector line ─── */
function Connector() {
  return <div className="timeline-aero-connector" />
}

/* ─── Timeline item ─── */
function TimelineItem({ exp, index }) {
  const isFirst = index === 0

  return (
    <AnimateOnScroll direction="up" delay={index * 0.1}>
      <div className="timeline-aero-item">
        {/* Rail */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <BulletIcon active={isFirst} />
          {index < personal.experience.length - 1 && <Connector />}
        </div>

        {/* Card */}
        <div className="glass-card" style={{ flex: 1, marginBottom: 28 }}>
          {/* Header row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', flexWrap: 'wrap', gap: 8,
            marginBottom: 14,
          }}>
            <div>
              <h3 style={{
                fontSize: '1.05rem', fontWeight: 600,
                marginBottom: 2,
              }}>
                {exp.role}
                <span className="badge-aero badge-info" style={{ marginLeft: 10, verticalAlign: 'middle' }}>
                  {exp.location}
                </span>
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--deep-aqua)' }}>
                {exp.company}
              </p>
            </div>
            <span style={{
              fontSize: '0.78rem', color: 'var(--light-text)', whiteSpace: 'nowrap',
            }}>
              {exp.period}
            </span>
          </div>

          {/* Highlights */}
          {exp.highlights.length > 0 && (
            <ul style={{
              listStyle: 'none',
              display: 'flex', flexDirection: 'column', gap: 8,
              marginBottom: exp.clientWork ? 18 : 0,
            }}>
              {exp.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.3 }}
                  style={{
                    display: 'flex', gap: 10, alignItems: 'flex-start',
                    fontSize: '0.88rem',
                    color: 'var(--dark-text)',
                    lineHeight: 1.7,
                  }}
                >
                  <span style={{
                    display: 'inline-block', width: 6, height: 6,
                    borderRadius: '50%', background: 'var(--aqua-mid)',
                    flexShrink: 0, marginTop: 9,
                  }} />
                  {h}
                </motion.li>
              ))}
            </ul>
          )}

          {/* Client work */}
          {exp.clientWork && exp.clientWork.length > 0 && (
            <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid rgba(90,180,220,0.2)' }}>
              <p style={{
                fontSize: '0.72rem', fontWeight: 600, color: 'var(--nature-green)',
                textTransform: 'uppercase', letterSpacing: '0.5px',
                marginBottom: 12,
              }}>
                Notable client projects
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {exp.clientWork.map((client, i) => (
                  <div key={i} style={{
                    padding: '14px 16px',
                    background: 'rgba(255,255,255,0.5)',
                    borderRadius: 12,
                    border: '1px solid rgba(90,180,220,0.15)',
                  }}>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 4 }}>
                      {client.name}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--mid-text)', lineHeight: 1.6 }}>
                      {client.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimateOnScroll>
  )
}

/* ─── Section ─── */
export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <AnimateOnScroll direction="up">
        <h2 className="section-title">Where I Work</h2>
      </AnimateOnScroll>

      <AnimateOnScroll direction="up" delay={0.1}>
        <div className="glass-card" style={{ marginBottom: 36 }}>
          {personal.bio.map((p, i) => (
            <p key={i} style={{
              fontSize: '0.92rem',
              color: 'var(--dark-text)',
              lineHeight: 1.8,
              marginBottom: i < personal.bio.length - 1 ? 12 : 0,
            }}>{p}</p>
          ))}
        </div>
      </AnimateOnScroll>

      <div style={{ marginTop: 8 }}>
        {personal.experience.map((exp, i) => (
          <TimelineItem key={i} exp={exp} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
