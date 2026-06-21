import { useEffect, useRef, useMemo } from 'react'
import './TargetCursor.css'

export function TargetCursor({
  targetSelector = '.cursor-target',
  hideDefaultCursor = true,
}) {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isSmallScreen = window.innerWidth <= 768
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
    const isMobileUserAgent = mobileRegex.test(navigator.userAgent.toLowerCase())
    return (hasTouchScreen && isSmallScreen) || isMobileUserAgent
  }, [])

  useEffect(() => {
    if (isMobile) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const originalCursor = document.body.style.cursor
    document.documentElement.classList.add('custom-cursor')
    if (hideDefaultCursor) document.body.style.cursor = 'none'

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let rafId = null
    let activeTarget = null

    const follow = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      if (!rafId) rafId = requestAnimationFrame(tick)
    }

    const tick = () => {
      rafId = null
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      const clampedX = Math.max(0, Math.min(window.innerWidth - 16, ringX))
      const clampedY = Math.max(0, Math.min(window.innerHeight - 16, ringY))
      ring.style.transform = `translate(${clampedX}px, ${clampedY}px)`
    }

    window.addEventListener('mousemove', follow, { passive: true })

    // Hover: dot/ring disappear → element illuminates
    const enterTarget = (target) => {
      if (activeTarget === target) return
      leaveTarget()
      activeTarget = target
      dot.classList.add('cursor-hidden')
      ring.classList.add('cursor-hidden')
      target.classList.add('cursor-illuminated')
    }

    const leaveTarget = () => {
      if (activeTarget) {
        activeTarget.classList.remove('cursor-illuminated')
        activeTarget = null
      }
      dot.classList.remove('cursor-hidden')
      ring.classList.remove('cursor-hidden')
    }

    const handleOver = (e) => {
      const t = e.target.closest(targetSelector)
      if (t) enterTarget(t)
      else leaveTarget()
    }

    window.addEventListener('mouseover', handleOver, { passive: true })

    // Click pulse
    const mousedown = () => ring.classList.add('cursor-click')
    const mouseup = () => ring.classList.remove('cursor-click')
    window.addEventListener('mousedown', mousedown)
    window.addEventListener('mouseup', mouseup)

    return () => {
      window.removeEventListener('mousemove', follow)
      window.removeEventListener('mouseover', handleOver)
      window.removeEventListener('mousedown', mousedown)
      window.removeEventListener('mouseup', mouseup)
      if (rafId) cancelAnimationFrame(rafId)
      if (activeTarget) activeTarget.classList.remove('cursor-illuminated')
      document.documentElement.classList.remove('custom-cursor')
      document.body.style.cursor = originalCursor
    }
  }, [targetSelector, hideDefaultCursor, isMobile])

  if (isMobile) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
