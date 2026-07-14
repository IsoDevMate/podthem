import { useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SPRING } from '@/motion/easings'

export interface EditorialRevealProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  /** ms between lines */
  lineStagger?: number
  delay?: number
}

/**
 * Editorial mask reveal — curtain passes, letters settle with slight overshoot.
 * Not a typewriter; a clipped upward reveal with blur dissolve.
 */
export function EditorialReveal({
  children,
  as: Tag = 'h1',
  className,
  lineStagger = 0.1,
  delay = 0.15,
}: EditorialRevealProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduced || !ref.current) return
  }, [reduced])

  const text = String(children)
  const lines = text.includes('\n') ? text.split('\n') : [text]

  if (reduced) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Tag className={className} ref={ref as never}>
      {lines.map((line, li) => (
        <span key={li} className={li > 0 ? 'block overflow-hidden' : 'block overflow-hidden'}>
          {line.split(' ').map((word, wi) => (
            <span key={`${li}-${wi}`} className="mr-[0.28em] inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: '110%', opacity: 0, filter: 'blur(6px)' }}
                animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  type: 'spring',
                  ...SPRING.heavy,
                  delay: delay + (li * line.split(' ').length + wi) * lineStagger,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
