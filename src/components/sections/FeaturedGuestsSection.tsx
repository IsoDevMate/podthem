import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { featuredGuests } from '@/data/site'
import { OptimizedImage } from '@/components/shared/OptimizedImage'
import { onMorphNavigate } from '@/motion/morphNavigation'

export function FeaturedGuestsSection() {
  return (
    <section
      id="guests"
      className="relative bg-gradient-to-b from-[#2c2118] via-[#3d2b1f] to-[#4a3728] px-6 py-28 text-cream md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-cream/50">
          Featured Guests
        </span>
        <h2 className="mt-3 font-serif text-4xl md:text-5xl">Voices that shaped us</h2>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {featuredGuests.map((guest, i) => (
            <motion.article
              key={guest.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <OptimizedImage
                  src={guest.portrait}
                  alt={guest.name}
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
              </div>
              <blockquote className="mt-5 font-serif text-xl italic leading-snug text-cream/90">
                "{guest.quote}"
              </blockquote>
              <p className="mt-4 font-serif text-lg">{guest.name}</p>
              <p className="text-xs uppercase tracking-widest text-cream/50">{guest.title}</p>
              <Link
                to={`/episode/${guest.episodeId}`}
                className="mt-4 inline-block text-xs uppercase tracking-[0.2em] text-cream/70 hover:text-cream"
                onClick={(e) => onMorphNavigate(e, 'card', guest.portrait)}
              >
                Listen to episode →
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
