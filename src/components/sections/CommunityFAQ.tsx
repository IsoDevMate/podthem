import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { faqItems, communityStats } from '@/data/site'
import { cn } from '@/lib/utils'

export function CommunitySection() {
  return (
    <section
      id="community"
      className="relative bg-[#f6f0e4] px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
          Community
        </span>
        <h2 className="mt-3 font-serif text-4xl text-bronze md:text-5xl">Join the conversation</h2>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {communityStats.map((s) => (
            <div key={s.label} className="border-t border-bronze/15 pt-4">
              <p className="font-serif text-3xl text-bronze">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-bronze-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          {['Spotify', 'Apple Podcasts', 'YouTube', 'Instagram', 'Discord'].map((p) => (
            <a
              key={p}
              href="#"
              className="border border-bronze/20 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-bronze transition-colors hover:bg-bronze hover:text-cream"
            >
              {p}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-gradient-to-b from-[#f6f0e4] to-[#ebe3d2] px-6 py-28 md:px-12 lg:px-20">
      <div className="mx-auto max-w-3xl">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
          FAQ
        </span>
        <h2 className="mt-3 font-serif text-4xl text-bronze md:text-5xl">Common questions</h2>

        <div className="mt-12 divide-y divide-bronze/15">
          {faqItems.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="py-5">
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-xl text-bronze md:text-2xl">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      'mt-1 shrink-0 transition-transform duration-300',
                      isOpen && 'rotate-180',
                    )}
                    size={20}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pt-3 text-sm leading-relaxed text-bronze-muted"
                    >
                      {item.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
