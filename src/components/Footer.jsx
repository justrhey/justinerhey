import { socials } from '../data/socials'

export default function Footer() {
  return (
    <footer style={{
      padding: '48px 0',
      borderTop: '1px solid var(--border)',
      textAlign: 'center',
    }}>
      <div className="container">
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 20,
        }}>
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              {s.name}
            </a>
          ))}
        </div>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--text-faint)',
        }}>
          <span style={{ color: 'var(--accent)' }}>$</span> built by{' '}
          <span style={{ color: 'var(--text-muted)' }}>justrhey</span>
          {' · '} {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
