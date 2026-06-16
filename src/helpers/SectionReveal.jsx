import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function SectionReveal({ children, className = '' }) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, { amount: 0.15, margin: '-5% 0px -5% 0px' })

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 40,
        scale: isInView ? 1 : 0.97,
        filter: isInView ? 'blur(0px)' : 'blur(6px)',
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
