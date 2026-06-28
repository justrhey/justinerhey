import { personal } from '../data/personal'
import { skillCategories } from '../data/skills'

export default function ControlPanel() {
  const totalSkills = skillCategories.reduce((a, c) => a + c.skills.length, 0)
  const avgLevel = Math.round(
    skillCategories.reduce((a, c) => a + c.skills.reduce((s, sk) => s + sk.level, 0), 0) / totalSkills
  )

  return (
    <aside className="control-panel">
      {/* System Status */}
      <div className="panel-section">
        <p className="panel-title">System Status</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="status-indicator">
            <span className="status-dot status-dot-on" />
            <span className="status-label">Available</span>
          </div>
          <div className="status-indicator">
            <span className="status-dot status-dot-on" />
            <span className="status-label">Accepting Projects</span>
          </div>
          <div className="status-indicator">
            <span className="status-dot status-dot-off" />
            <span className="status-label">Deep Focus</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="panel-section">
        <p className="panel-title">Metrics</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="data-readout">
            <span className="data-readout-value">{personal.experience.length}</span>
            <span className="data-readout-label">Positions Held</span>
          </div>
          <div className="data-readout">
            <span className="data-readout-value">{personal.projectsTotal || '07'}</span>
            <span className="data-readout-label">Projects Shipped</span>
          </div>
          <div className="data-readout">
            <span className="data-readout-value">{avgLevel}%</span>
            <span className="data-readout-label">Avg Proficiency</span>
          </div>
        </div>
      </div>

      {/* Quick Connect */}
      <div className="panel-section">
        <p className="panel-title">Connect</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <a href="mailto:justrhey.tambong@gmail.com" className="panel-link">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Email
          </a>
          <a href="https://github.com/justrhey" target="_blank" rel="noopener noreferrer" className="panel-link">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            GitHub
          </a>
          <a href="https://linkedin.com/in/justrhey" target="_blank" rel="noopener noreferrer" className="panel-link">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      {/* System Info */}
      <div className="panel-section" style={{ marginTop: 'auto' }}>
        <p className="panel-title">System</p>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.5rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--text-faint)',
          lineHeight: 1.8,
        }}>
          <div>STATUS: ONLINE</div>
          <div>UPTIME: {new Date().getHours().toString().padStart(2,'0')}:{new Date().getMinutes().toString().padStart(2,'0')}</div>
          <div>MODE: PORTFOLIO v6</div>
        </div>
      </div>
    </aside>
  )
}
