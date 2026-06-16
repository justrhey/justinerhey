import { testimonials } from '../data/testimonials'
import { SectionWrapper } from '../helpers/SectionWrapper'
import { AnimateOnScroll } from '../helpers/AnimateOnScroll'
import { LogoLoop } from './LogoLoop'
import { Quotes } from '@phosphor-icons/react'

function TestimonialCard({ testimonial }) {
  return (
    <div className="w-[320px] p-6 rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a]/50 flex flex-col gap-4">
      <Quotes size={24} weight="fill" className="text-white/20" />

      <p className="text-sm text-[#888] leading-relaxed flex-1">
        {testimonial.text}
      </p>

      <div className="flex items-center gap-3 pt-2 border-t border-[#1a1a1a]/50">
        <div className="w-9 h-9 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xs font-mono text-[#888]">
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-sm text-white font-medium leading-tight">
            {testimonial.name}
          </p>
          <p className="text-xs text-[#666] leading-tight">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  )
}

const loopItems = testimonials.map((t) => ({
  node: <TestimonialCard testimonial={t} />,
}))

export default function Testimonials() {
  return (
    <SectionWrapper id="testimonials">
      <AnimateOnScroll direction="up">
        <p className="text-[#666] text-xs uppercase tracking-[3px] mb-3 font-mono">Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          What people say
        </h2>
        <p className="text-[#888] text-base mb-12 max-w-[45ch]">
          From colleagues, mentors, and the teams I have worked with.
        </p>
      </AnimateOnScroll>

      {/* Mobile: stacked */}
      <div className="md:hidden flex flex-col gap-4">
        {testimonials.map((t) => (
          <AnimateOnScroll key={t.name} direction="up">
            <TestimonialCard testimonial={t} />
          </AnimateOnScroll>
        ))}
      </div>

      {/* Desktop: LogoLoop */}
      <div
        className="hidden md:block"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <LogoLoop
          logos={loopItems}
          speed={25}
          direction="right"
          gap={20}
          pauseOnHover={true}
          fadeOut={false}
        />
      </div>
    </SectionWrapper>
  )
}
