import { personal } from '../data/personal'

export function HireBadge() {
  if (!personal.availability) return null

  return (
    <div
      role="status"
      aria-label="Currently available for work opportunities"
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 40,
        display: 'none', alignItems: 'center', gap: 8,
        padding: '7px 14px', border: '1px solid var(--accent-dim)',
        background: 'rgba(14,18,23,0.85)', borderRadius: 999,
        backdropFilter: 'blur(8px)', transition: 'border-color 0.2s',
      }}
      className="hire-badge"
      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--accent-dim)'}
    >
      <span
        style={{
          width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)',
          boxShadow: '0 0 8px var(--accent-glow)',
          animation: 'pulse 2s ease-in-out infinite',
        }}
        aria-hidden="true"
      />
      <span style={{ color: 'var(--accent)', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
        Available
      </span>

      {/* Show on md+ via inline @media */}
      <style>{`
        @media (min-width: 768px) {
          .hire-badge { display: inline-flex !important; }
        }
      `}</style>
    </div>
  )
}
