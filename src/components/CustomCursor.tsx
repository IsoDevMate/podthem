import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SPRING } from '@/motion/easings'

export function CustomCursor() {
  const reduced = useReducedMotion()
  const [label, setLabel] = useState('')
  const [expanded, setExpanded] = useState(false)

  const visible = useMotionValue(0)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, SPRING.magnetic)
  const sy = useSpring(y, SPRING.magnetic)
  const scale = useSpring(1, SPRING.soft)

  useEffect(() => {
    if (reduced) return
    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      visible.set(1)

      const target = (e.target as HTMLElement | null)?.closest(
        '[data-cursor]',
      ) as HTMLElement | null

      if (target) {
        setLabel(
          target.dataset.cursorLabel ??
            (target.dataset.cursor === 'listen' ? 'Listen' : 'View'),
        )
        setExpanded(true)
        scale.set(1)
      } else {
        setLabel('')
        setExpanded(false)
        scale.set(1)
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
  }, [reduced, x, y, scale, visible])

  if (reduced) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
      style={{
        x: sx,
        y: sy,
        scale,
        opacity: visible,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <div
        className={
          expanded
            ? 'flex items-center justify-center rounded-full bg-cream px-4 py-2'
            : 'h-4 w-4 rounded-full bg-cream'
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
