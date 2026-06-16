export function SectionWrapper({ children, id, className = '' }) {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 lg:py-36 ${className}`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {children}
      </div>
    </section>
  )
}
