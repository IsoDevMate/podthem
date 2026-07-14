import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SPRING } from '@/motion/easings'

function labelFor(kind: string | undefined, custom?: string) {
  if (custom) return custom
  if (kind === 'listen' || kind === 'play') return 'Listen'
  if (kind === 'read') return 'Read'
  return 'View'
}

export function CustomCursor() {
  const reduced = useReducedMotion()
  const [label, setLabel] = useState('')
  const [expanded, setExpanded] = useState(false)

  const visible = useMotionValue(0)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, SPRING.magnetic)
  const sy = useSpring(y, SPRING.magnetic)
  const scaleX = useSpring(1, SPRING.soft)
  const scaleY = useSpring(1, SPRING.soft)

  useEffect(() => {
    if (reduced) return
    document.documentElement.classList.add('has-custom-cursor')

    let lastX = 0
    let lastY = 0
    let lastT = performance.now()

    const onMove = (e: MouseEvent) => {
      const now = performance.now()
      const dt = Math.max(now - lastT, 8)
      const speed = Math.hypot(e.clientX - lastX, e.clientY - lastY) / dt
      lastX = e.clientX
      lastY = e.clientY
      lastT = now

      x.set(e.clientX)
      y.set(e.clientY)
      visible.set(1)

      const stretch = Math.min(speed * 0.1, 0.6)
      scaleX.set(1 + stretch)
      scaleY.set(1 - stretch * 0.35)

      const target = (e.target as HTMLElement | null)?.closest(
        '[data-cursor]',
      ) as HTMLElement | null

      if (target) {
        setLabel(labelFor(target.dataset.cursor, target.dataset.cursorLabel))
        setExpanded(true)
      } else {
        setLabel('')
        setExpanded(false)
      }
    }

    const onLeave = () => visible.set(0)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced, x, y, scaleX, scaleY, visible])

  if (reduced) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
      style={{
        x: sx,
        y: sy,
        scaleX,
        scaleY,
        opacity: visible,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <div
        className={
          expanded
            ? 'flex items-center justify-center rounded-full bg-cream px-4 py-2'
            : 'h-3.5 w-3.5 rounded-full bg-cream'
        }
      >
        {label ? (
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-bronze">
            {label}
          </span>
        ) : null}
      </div>
    </motion.div>
  )
}
