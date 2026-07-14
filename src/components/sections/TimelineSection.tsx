import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { timelineEvents } from '@/data/site'

export function TimelineSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="timeline"
      ref={ref}
      className="relative bg-[#2c2118] px-6 py-28 text-cream md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-cream/50">
          Our Journey
        </span>
        <h2 className="mt-3 font-serif text-4xl md:text-5xl">Podcast timeline</h2>

        <div className="relative mt-16 overflow-x-auto pb-4">
          <motion.div
            className="absolute top-8 left-0 h-px origin-left bg-cream/30"
            style={{ scaleX: lineScale, width: '100%' }}
          />
          <div className="flex min-w-max gap-12 md:gap-16">
            {timelineEvents.map((event, i) => (
              <motion.article
                key={event.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="w-56 shrink-0 md:w-64"
              >
                <div className="mb-4 h-3 w-3 rounded-full bg-cream" />
                <p className="font-serif text-3xl">{event.year}</p>
                <h3 className="mt-2 font-serif text-lg">{event.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{event.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
