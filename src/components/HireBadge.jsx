import { personal } from '../data/personal'

export function HireBadge({ pulse = true }) {
  if (!personal.availability) return null

  return (
    <div
      role="status"
      aria-label="Currently available for work opportunities"
      className="fixed bottom-6 right-6 z-40 hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#333] bg-[#0a0a0a]/80 backdrop-blur-sm transition-all hover:border-[#555]"
    >
      <span
        className={`w-1.5 h-1.5 rounded-full bg-white ${pulse ? 'animate-pulse' : ''}`}
        aria-hidden="true"
      />
      <span className="text-[#888] text-xs font-mono">Available</span>
    </div>
  )
}
