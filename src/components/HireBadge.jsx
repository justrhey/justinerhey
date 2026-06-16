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
        padding: '6px 14px', border: '1px solid #333',
        background: 'rgba(10,10,10,0.8)', borderRadius: 999,
        backdropFilter: 'blur(8px)', transition: 'border-color 0.2s',
      }}
      className="hire-badge"
      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#555'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#333'}
    >
      <span
        style={{
          width: 6, height: 6, borderRadius: '50%', background: '#fff',
          animation: 'pulse 2s ease-in-out infinite',
        }}
        aria-hidden="true"
      />
      <span style={{ color: '#888', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
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
