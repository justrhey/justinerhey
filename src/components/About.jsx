import { personal } from '../data/personal'
import { SectionWrapper } from '../helpers/SectionWrapper'
import { AnimateOnScroll } from '../helpers/AnimateOnScroll'

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-20 items-start">
        {/* Bio */}
        <AnimateOnScroll direction="left">
          <p className="text-[#666] text-xs uppercase tracking-[3px] mb-3 font-mono">About</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-8">
            About Me
          </h2>

          {personal.bio.map((paragraph, index) => (
            <p key={index} className="text-[#999] mb-4 leading-relaxed max-w-[65ch] text-sm md:text-base">
              {paragraph}
            </p>
          ))}

          {personal.currentWork && (
            <div className="mt-8 border-t border-[#1a1a1a] pt-8">
              <h3 className="text-lg font-semibold text-white mb-4 tracking-tight">
                Right now
              </h3>
              <ul className="space-y-2">
                {personal.currentWork.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-[#999] text-sm leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-white mt-2 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-2">
            {personal.workingStyle.map((style) => (
              <span
                key={style}
                className="inline-flex px-3 py-1 rounded-full border border-[#333] text-[#999] text-sm"
              >
                {style}
              </span>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Photo */}
        <AnimateOnScroll direction="right" delay={0.2}>
          <picture>
            <img
              src={personal.photoPath}
              alt={personal.photoAlt}
              className="rounded-[2rem] w-full max-w-[360px] mx-auto border border-[#222] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] grayscale"
              width="360"
              height="360"
              loading="lazy"
            />
          </picture>
        </AnimateOnScroll>
      </div>
    </SectionWrapper>
  )
}
