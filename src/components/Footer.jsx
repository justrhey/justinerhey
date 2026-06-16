import { socials } from '../data/socials'

const styles = {
  footer: { padding: '40px 0', borderTop: '1px solid var(--border)', textAlign: 'center' },
  text: { color: 'var(--text-faint)', fontSize: '0.85rem' },
}

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 16 }}>
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)', fontSize: '0.85rem', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              {s.name}
            </a>
          ))}
        </div>
        <p style={styles.text}>
          Built with <span style={{ color: 'var(--text-faint)' }}>♥</span> by Justine Rhey &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
