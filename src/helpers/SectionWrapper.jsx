export function SectionWrapper({ children, id, className = '' }) {
  return (
    <section id={id} className={className}>
      <div className="container">
        {children}
      </div>
    </section>
  )
}
