import { motion } from 'framer-motion'
import { teamMembers } from '@/data/site'
import { OptimizedImage } from '@/components/shared/OptimizedImage'

export function TeamSection() {
  return (
    <section
      id="team"
      className="relative bg-gradient-to-b from-[#e0d4c0] via-[#d4c4ad] to-[#c9b89a] px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
          The Team
        </span>
        <h2 className="mt-3 max-w-2xl font-serif text-4xl text-bronze md:text-5xl">
          The people behind the sound
        </h2>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, i) => (
            <motion.article
              key={member.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ delay: i * 0.06, duration: 0.65 }}
              className="group"
            >
              <div className="aspect-[4/5] overflow-hidden bg-bronze/10">
                <OptimizedImage
                  src={member.portrait}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-bronze-muted">
                {member.role}
              </p>
              <h3 className="mt-1 font-serif text-2xl text-bronze">{member.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bronze-muted">{member.bio}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
