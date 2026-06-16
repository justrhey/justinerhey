import { projects } from '../data/projects'
import { SectionWrapper } from '../helpers/SectionWrapper'
import { AnimateOnScroll } from '../helpers/AnimateOnScroll'
import { LogoLoop } from './LogoLoop'
import { ProjectCard } from './ProjectCard'

const loopItems = projects.map((p) => ({
  node: (
    <div className="w-[340px]">
      <ProjectCard project={p} />
    </div>
  ),
}))

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <AnimateOnScroll direction="up">
        <p className="text-[#666] text-xs uppercase tracking-[3px] mb-3 font-mono">Projects</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          Featured Projects
        </h2>
        <p className="text-[#888] text-base mb-12 max-w-[45ch]">
          Production tools, real problems solved. Each project has its own story.
        </p>
      </AnimateOnScroll>

      {/* Mobile: stacked */}
      <div className="md:hidden flex flex-col gap-6">
        {projects.map((project) => (
          <AnimateOnScroll key={project.id} direction="up">
            <ProjectCard project={project} />
          </AnimateOnScroll>
        ))}
      </div>

      {/* Desktop: LogoLoop carousel */}
      <div
        className="hidden md:block"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <LogoLoop
          logos={loopItems}
          speed={35}
          direction="left"
          gap={24}
          pauseOnHover={true}
          fadeOut={false}
        />
      </div>
    </SectionWrapper>
  )
}
