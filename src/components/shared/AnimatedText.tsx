import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

export interface AnimatedTextProps {
  /** Single string (split by words) or array of lines (each line split by words) */
  lines: string | string[]
  className?: string
  /** Delay between each word in seconds */
  stagger?: number
  /** Base delay before animation starts */
  delay?: number
  /** Duration per word */
  duration?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
}

export function AnimatedText({
  lines,
  className,
  stagger = 0.08,
  delay = 0,
  duration = 0.6,
  as: Tag = 'div',
}: AnimatedTextProps) {
  const reducedMotion = useReducedMotion()

  const lineArray = Array.isArray(lines) ? lines : [lines]

  let wordIndex = 0

  return (
    <Tag className={className}>
      {lineArray.map((line, lineIdx) => {
        const words = line.split(' ')
        return (
          <span key={lineIdx} className={cn(lineIdx > 0 && 'block')}>
            {words.map((word, i) => {
              const idx = wordIndex++
              return (
                <motion.span
                  key={`${lineIdx}-${i}-${word}`}
                  className="inline-block"
                  initial={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  animate={
                    reducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0 }
                  }
                  transition={{
                    duration: reducedMotion ? 0.2 : duration,
                    delay: reducedMotion ? 0 : delay + idx * stagger,
                    ease: easeOutExpo,
                  }}
                >
                  {word}
                  {i < words.length - 1 ? '\u00A0' : ''}
                </motion.span>
              )
            })}
          </span>
        )
      })}
    </Tag>
  )
}

/** Fade-in helper for subheadline / CTA after headline finishes */
export function AnimatedFadeIn({
  children,
  delay = 0,
  className,
  y = 12,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0.2 : 0.55,
        delay,
        ease: easeOutExpo,
      }}
    >
      {children}
    </motion.div>
  )
}
