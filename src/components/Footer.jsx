import { GithubLogo, LinkedinLogo, At } from '@phosphor-icons/react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-aero">
      <div className="footer-aero-inner">
        <span>justrhey · backend &amp; ai full-stack</span>
        <span>&copy; {year}</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <a
            href="mailto:justrhey.tambong@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            style={{ color: 'var(--light-text)', textDecoration: 'none', display: 'flex' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--deep-aqua)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--light-text)'}
          >
            <At size={15} weight="duotone" />
          </a>
          <a
            href="https://github.com/justrhey"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{ color: 'var(--light-text)', textDecoration: 'none', display: 'flex' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--deep-aqua)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--light-text)'}
          >
            <GithubLogo size={15} weight="duotone" />
          </a>
          <a
            href="https://linkedin.com/in/justrhey"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ color: 'var(--light-text)', textDecoration: 'none', display: 'flex' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--deep-aqua)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--light-text)'}
          >
            <LinkedinLogo size={15} weight="duotone" />
          </a>
        </div>
      </div>
    </footer>
  )
}
