import { motion } from 'framer-motion'
import { testimonials } from '@/data/site'
import { OptimizedImage } from '@/components/shared/OptimizedImage'

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative bg-gradient-to-b from-[#4a3728] via-[#ebe3d2] to-[#f6f0e4] px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
          Testimonials
        </span>
        <h2 className="mt-3 font-serif text-4xl text-bronze md:text-5xl">What listeners say</h2>

        <div className="mt-16 space-y-16">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col gap-8 md:flex-row md:items-center ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="shrink-0">
                <OptimizedImage
                  src={t.imageUrl}
                  alt={t.author}
                  className="h-20 w-20 rounded-full object-cover md:h-24 md:w-24"
                />
              </div>
              <div className="max-w-3xl">
                <p className="font-serif text-2xl leading-snug text-bronze md:text-3xl">
                  "{t.quote}"
                </p>
                <footer className="mt-4">
                  <cite className="not-italic font-medium text-bronze">{t.author}</cite>
                  <span className="text-bronze-muted"> — {t.role}</span>
                </footer>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
