import { skills } from '../data/skills'
import { SectionWrapper } from '../helpers/SectionWrapper'
import { AnimateOnScroll } from '../helpers/AnimateOnScroll'

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <AnimateOnScroll direction="up">
        <p className="text-[#666] text-xs uppercase tracking-[3px] mb-3 font-mono">Skills</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-12">
          Stack
        </h2>
      </AnimateOnScroll>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {skills.map((skill, index) => (
          <AnimateOnScroll key={skill.name} direction="up" delay={index * 0.08}>
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a]/50 transition-all hover:border-[#444] hover:bg-[#0a0a0a]">
              <div
                role="progressbar"
                aria-valuenow={skill.proficiency}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.name} proficiency`}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(#fff ${skill.proficiency}%, rgba(255,255,255,0.04) 0)`,
                }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black">
                  <span className="font-mono text-xs text-[#888]">
                    {skill.proficiency}%
                  </span>
                </div>
              </div>
              <span className="font-mono text-sm text-white text-center">
                {skill.name}
              </span>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </SectionWrapper>
  )
}
