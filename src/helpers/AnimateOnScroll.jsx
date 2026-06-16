import { motion } from 'motion/react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const variants = {
  up: { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  left: { hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  scale: { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
}

const spring = { type: 'spring', stiffness: 100, damping: 20 }

export function AnimateOnScroll({ children, direction = 'up', delay = 0, className = '' }) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={
        direction === 'fade'
          ? { duration: 0.6, delay, ease: 'easeOut' }
          : { ...spring, delay }
      }
      variants={variants[direction]}
      className={className}
    >
      {children}
    </motion.div>
  )
}
