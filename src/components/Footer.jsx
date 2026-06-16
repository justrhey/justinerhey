import { GithubLogo, LinkedinLogo, Envelope } from '@phosphor-icons/react'
import { socials } from '../data/socials'

const iconMap = {
  github: GithubLogo,
  linkedin: LinkedinLogo,
  email: Envelope,
}

export default function Footer() {
  return (
    <footer role="contentinfo" className="py-10 border-t border-[#1a1a1a]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {socials.map((s) => {
            const Icon = iconMap[s.icon]
            return (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex items-center gap-2 text-[#666] hover:text-white transition-colors text-sm"
              >
                {Icon ? <Icon size={18} /> : <span className="text-xs font-mono">{s.name.slice(0, 2)}</span>}
              </a>
            )
          })}
        </div>
        <p className="text-[#555] text-xs">
          &copy; {new Date().getFullYear()} Justine Rhey M. Tambong
        </p>
      </div>
    </footer>
  )
}
