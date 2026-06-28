import { GithubLogo, LinkedinLogo, At } from '@phosphor-icons/react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="dash-footer">
      <div className="dash-footer-inner">
        <span>justrhey · backend &amp; ai full-stack</span>
        <span>&copy; {year}</span>
        <div style={{ display: 'flex', gap: 14 }}>
          <a
            href="mailto:justrhey.tambong@gmail.com"
            className="dash-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--green-bright)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <At size={14} weight="duotone" />
          </a>
          <a
            href="https://github.com/justrhey"
            className="dash-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--green-bright)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <GithubLogo size={14} weight="duotone" />
          </a>
          <a
            href="https://linkedin.com/in/justrhey"
            className="dash-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--green-bright)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <LinkedinLogo size={14} weight="duotone" />
          </a>
        </div>
      </div>
    </footer>
  )
}
