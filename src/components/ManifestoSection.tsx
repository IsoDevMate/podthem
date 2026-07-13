import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export interface ManifestoSectionProps {
  label?: string
  text: string
}

function IlluminatedWord({
  word,
  index,
  total,
  progress,
}: {
  word: string
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = index / total
  const end = (index + 1.5) / total
  const opacity = useTransform(progress, [start, end], [0.2, 1])
  const color = useTransform(
    progress,
    [start, end],
    ['#c4b5a5', '#3d2b1f'],
  )

  return (
    <motion.span style={{ opacity, color }} className="mr-[0.3em] inline">
      {word}
    </motion.span>
  )
}

/**
 * Scroll-illuminated manifesto — word-by-word highlight tied to scroll progress.
 * Covers the "scroll-illuminated statement" spec; NOT a multi-step pinned reveal.
 * For pinned step crossfades, build PinnedReveal separately when needed.
 */
export function ManifestoSection({
  label = 'Our Manifesto',
  text,
}: ManifestoSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const words = text.split(' ')
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.3'],
  })

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative bg-cream-dark px-6 py-40 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-5xl">
        <span className="mb-8 block font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
          {label}
        </span>
        <p className="font-serif text-3xl leading-[1.4] md:text-5xl lg:text-6xl lg:leading-[1.35]">
          {words.map((word, i) => (
            <IlluminatedWord
              key={`${word}-${i}`}
              word={word}
              index={i}
              total={words.length}
              progress={scrollYProgress}
            />
          ))}
        </p>
      </div>
    </section>
  )
}
