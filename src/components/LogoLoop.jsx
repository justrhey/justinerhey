import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react'
import './LogoLoop.css'

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 }

const useResizeObserver = (callback, elements, dependencies) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback()
      window.addEventListener('resize', handleResize)
      callback()
      return () => window.removeEventListener('resize', handleResize)
    }
    const observers = elements.map((ref) => {
      if (!ref.current) return null
      const observer = new ResizeObserver(callback)
      observer.observe(ref.current)
      return observer
    })
    callback()
    return () => observers.forEach((o) => o?.disconnect())
  }, [callback, elements, dependencies])
}

const useAnimationLoop = (trackRef, targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical) => {
  const rafRef = useRef(null)
  const lastTimestampRef = useRef(null)
  const offsetRef = useRef(0)
  const velocityRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const seqSize = isVertical ? seqHeight : seqWidth

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`
    }

    const animate = (timestamp) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp
      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000
      lastTimestampRef.current = timestamp

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU)
      velocityRef.current += (target - velocityRef.current) * easingFactor

      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize
        offsetRef.current = nextOffset
        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      lastTimestampRef.current = null
    }
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef])
}

export const LogoLoop = memo(
  ({
    logos,
    speed = 120,
    direction = 'left',
    gap = 32,
    pauseOnHover = true,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    className = '',
    style,
  }) => {
    const containerRef = useRef(null)
    const trackRef = useRef(null)
    const seqRef = useRef(null)

    const [seqWidth, setSeqWidth] = useState(0)
    const [seqHeight, setSeqHeight] = useState(0)
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES)
    const [isHovered, setIsHovered] = useState(false)

    const effectiveHoverSpeed = useMemo(() => {
      if (hoverSpeed !== undefined) return hoverSpeed
      if (pauseOnHover === true) return 0
      if (pauseOnHover === false) return undefined
      return 0
    }, [hoverSpeed, pauseOnHover])

    const isVertical = direction === 'up' || direction === 'down'
    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed)
      let directionMultiplier
      if (isVertical) {
        directionMultiplier = direction === 'up' ? 1 : -1
      } else {
        directionMultiplier = direction === 'left' ? 1 : -1
      }
      const speedMultiplier = speed < 0 ? -1 : 1
      return magnitude * directionMultiplier * speedMultiplier
    }, [speed, direction, isVertical])

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0
      const sequenceRect = seqRef.current?.getBoundingClientRect?.()
      const sequenceWidth = sequenceRect?.width ?? 0
      const sequenceHeight = sequenceRect?.height ?? 0
      if (isVertical) {
        const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0
        if (containerRef.current && parentHeight > 0) {
          const targetHeight = Math.ceil(parentHeight)
          if (containerRef.current.style.height !== `${targetHeight}px`)
            containerRef.current.style.height = `${targetHeight}px`
        }
        if (sequenceHeight > 0) {
          setSeqHeight(Math.ceil(sequenceHeight))
          const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight
          const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded))
        }
      } else if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth))
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded))
      }
    }, [isVertical])

    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, isVertical])

    useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical)

    const cssVariables = useMemo(
      () => ({
        '--logoloop-gap': `${gap}px`,
        ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor }),
      }),
      [gap, fadeOutColor]
    )

    const rootClassName = useMemo(
      () =>
        ['logoloop', isVertical ? 'logoloop--vertical' : 'logoloop--horizontal', fadeOut && 'logoloop--fade', className]
          .filter(Boolean)
          .join(' '),
      [isVertical, fadeOut, className]
    )

    const handleMouseEnter = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(true)
    }, [effectiveHoverSpeed])
    const handleMouseLeave = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(false)
    }, [effectiveHoverSpeed])

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className="logoloop__list"
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) => (
              <li className="logoloop__item" key={`${copyIndex}-${itemIndex}`}>
                {item.node}
              </li>
            ))}
          </ul>
        )),
      [copyCount, logos]
    )

    return (
      <div ref={containerRef} className={rootClassName} style={{ ...cssVariables, ...style }}>
        <div className="logoloop__track" ref={trackRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {logoLists}
        </div>
      </div>
    )
  }
)

LogoLoop.displayName = 'LogoLoop'
