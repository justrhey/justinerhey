import { personal } from '../data/personal'
import { SectionWrapper } from '../helpers/SectionWrapper'
import { AnimateOnScroll } from '../helpers/AnimateOnScroll'
import { motion } from 'motion/react'

/* ─── Bullet icon ─── */
function BulletIcon({ active = false }) {
  return (
    <div style={{
      position: 'relative', flexShrink: 0,
      width: 32, height: 32,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: 12, height: 12, borderRadius: '50%',
        background: active ? 'var(--accent)' : 'var(--text-faint)',
        boxShadow: active ? '0 0 12px var(--accent-glow)' : 'none',
        transition: 'all 0.3s ease',
      }} />
    </div>
  )
}

/* ─── Timeline connector ─── */
function Connector() {
  return (
    <div style={{
      position: 'absolute', top: 32, left: 15,
      width: 2, height: 'calc(100% - 32px)',
      background: 'linear-gradient(180deg, var(--accent-dim) 0%, var(--border) 100%)',
    }} />
  )
}

/* ─── Timeline item ─── */
function TimelineItem({ exp, index }) {
  const isFirst = index === 0

  return (
    <AnimateOnScroll direction="up" delay={index * 0.1}>
      <div style={{
        position: 'relative',
        display: 'flex', gap: 20,
        paddingLeft: 0,
      }}>
        {/* Timeline rail */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          position: 'relative',
        }}>
          <BulletIcon active={isFirst} />
          {index < personal.experience.length - 1 && <Connector />}
        </div>

        {/* Content card */}
        <div className="glow-card" style={{
          flex: 1, padding: 28, marginBottom: 32,
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-card)',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', flexWrap: 'wrap', gap: 8,
            marginBottom: 16,
          }}>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem', fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: 4,
              }}>
                {exp.role}
                <span style={{
                  display: 'inline-block',
                  marginLeft: 10,
                  fontSize: '0.72rem',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)',
                  background: 'var(--accent-dim)',
                  padding: '2px 10px',
                  borderRadius: 'var(--radius-sm)',
                  verticalAlign: 'middle',
                }}>
                  {exp.location}
                </span>
              </h3>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
              }}>
                {exp.company}
              </p>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-dim)',
              padding: '4px 12px',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              whiteSpace: 'nowrap',
            }}>
              {exp.period}
            </span>
          </div>

          {/* Highlights */}
          <ul style={{
            listStyle: 'none',
            display: 'flex', flexDirection: 'column', gap: 10,
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
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                }}
              >
                <span style={{
                  display: 'inline-block',
                  width: 5, height: 5, borderRadius: '50%',
                  background: 'var(--accent-2)', flexShrink: 0,
                  marginTop: 9, opacity: 0.7,
                }} />
                {h}
              </motion.li>
            ))}
          </ul>

          {/* Client work */}
          {exp.clientWork && exp.clientWork.length > 0 && (
            <div style={{
              marginTop: 20, paddingTop: 20,
              borderTop: '1px solid var(--border)',
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--accent-2)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: 14,
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
                      padding: '16px 20px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                      background: 'var(--bg-elevated)',
                    }}
                  >
                    <p style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: 4,
                    }}>
                      {client.name}
                    </p>
                    <p style={{
                      fontSize: '0.82rem',
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
        <p className="section-label">experience</p>
        <h2 className="section-title">Where I Work</h2>
      </AnimateOnScroll>

      <div style={{ maxWidth: 780 }}>
        {/* Bio teaser */}
        <AnimateOnScroll direction="up" delay={0.1}>
          <div style={{
            fontSize: '0.92rem', color: 'var(--text-muted)',
            lineHeight: 1.8, marginBottom: 48,
            padding: '20px 24px',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            background: 'var(--bg-elevated)',
          }}>
            {personal.bio.map((p, i) => (
              <p key={i} style={{ marginBottom: i < personal.bio.length - 1 ? 12 : 0 }}>{p}</p>
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
