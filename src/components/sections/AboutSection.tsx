import { motion } from 'framer-motion'
import { aboutContent } from '@/data/site'

export function AboutSection() {
  const { label, headline, mission, philosophy, audience, stats } = aboutContent

  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-[#f6f0e4] via-[#f0ead8] to-[#ebe3d2] px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
            {label}
          </span>
          <h2 className="mt-3 font-hand text-4xl font-semibold leading-tight tracking-tight text-bronze md:text-6xl">
            {headline}
          </h2>
        </div>
        <div className="space-y-6 text-base leading-relaxed text-bronze-muted">
          <p>{mission}</p>
          <p>{philosophy}</p>
          <p>{audience}</p>
        </div>
      </div>

      <div className="mx-auto mt-20 grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="border-t border-bronze/15 pt-6"
          >
            <p className="font-serif text-4xl text-bronze md:text-5xl">{stat.value}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bronze-muted">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
