import { GithubLogo, LinkedinLogo, At } from '@phosphor-icons/react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        {/* Top section */}
        <div className="footer-top">
          {/* Left */}
          <div className="footer-brand">
            <span className="footer-logo-dot" />
            <div>
              <p className="footer-name">justrhey</p>
              <p className="footer-tagline">Backend Developer &amp; AI Full-Stack Engineer</p>
            </div>
          </div>

          {/* Right */}
          <div className="footer-socials">
            <a
              href="mailto:justrhey.tambong@gmail.com"
              className="footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <At size={16} weight="duotone" />
            </a>
            <a
              href="https://github.com/justrhey"
              className="footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GithubLogo size={16} weight="duotone" />
            </a>
            <a
              href="https://linkedin.com/in/justrhey"
              className="footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinLogo size={16} weight="duotone" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            <span className="footer-prompt">$</span> built by{' '}
            <span className="footer-author">justrhey</span>
          </p>
          <p className="footer-year">&copy; {year}</p>
        </div>
      </div>
    </footer>
  )
}
