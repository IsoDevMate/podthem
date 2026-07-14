import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ReturnToBeginning } from '@/components/ScrollProgress'
import { useAudioPlayer } from '@/motion/AudioPlayerProvider'
import { episodes } from '@/data/episodes'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SPRING } from '@/motion/easings'
import { cn } from '@/lib/utils'

export interface FooterLink {
  label: string
  href: string
}

export interface RevealingFooterProps {
  podcastName: string
  tagline?: string
  navLinks?: FooterLink[]
  socialLinks?: FooterLink[]
  legalLinks?: FooterLink[]
  contactEmail?: string
  year?: number
  newsletterHeading?: string
}

/**
 * Cinematic ending — not a link dump.
 * Slow wordmark, latest episode, newsletter glow, return-to-beginning rewind.
 */
export function RevealingFooter({
  podcastName,
  tagline = 'Stories are never finished.',
  navLinks = [],
  socialLinks = [],
  legalLinks = [],
  contactEmail,
  year = new Date().getFullYear(),
  newsletterHeading = 'Your inbox deserves slower stories.',
}: RevealingFooterProps) {
  const footerRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const isInView = useInView(footerRef, { once: true, margin: '-8% 0px' })
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const { playEpisode, current } = useAudioPlayer()
  const latest = current ?? episodes[0]

  const letters = podcastName.toUpperCase().split('')

  function handleNewsletter(e: FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative overflow-hidden bg-[#1a1510] px-6 pb-16 pt-28 text-cream md:px-12 lg:px-20"
    >
      {/* Slow zoom artwork */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        animate={
          reducedMotion
            ? undefined
            : { scale: [1, 1.08], rotate: [0, 0.4] }
        }
        transition={{ duration: 28, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      >
        <img
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1800&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1510] via-[#1a1510]/70 to-[#1a1510]" />
      </motion.div>

      <div className="film-grain pointer-events-none absolute inset-0 opacity-25" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.p
          className="mb-10 text-center font-hand text-2xl font-semibold tracking-tight text-cream/80 md:text-4xl"
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : undefined
          }
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {tagline}
        </motion.p>

        {/* Giant wordmark with mass */}
        <div className="mb-16 flex justify-center overflow-hidden">
          <div className="flex" aria-label={podcastName}>
            {letters.map((letter, i) => (
              <div key={`${letter}-${i}`} className="overflow-hidden">
                <motion.span
                  className="block font-serif text-[18vw] leading-none tracking-tighter md:text-[12vw]"
                  initial={{ y: reducedMotion ? '0%' : '115%' }}
                  animate={isInView ? { y: '0%' } : undefined}
                  transition={{
                    type: 'spring',
                    ...SPRING.heavy,
                    delay: reducedMotion ? 0 : i * 0.05,
                  }}
                >
                  {letter}
                </motion.span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-14 border-t border-cream/15 pt-14 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Latest episode */}
          {latest && (
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-cream/40">
                Latest Episode
              </p>
              <div className="flex gap-5">
                <img
                  src={latest.imageUrl}
                  alt=""
                  className="h-24 w-20 object-cover md:h-28 md:w-24"
                />
                <div>
                  <h3 className="font-hand text-2xl font-semibold md:text-3xl">{latest.title}</h3>
                  <p className="mt-1 font-mono text-[10px] tracking-widest text-cream/40">
                    EP {String(latest.episodeNumber).padStart(2, '0')} · ~42 min
                  </p>
                  <button
                    type="button"
                    onClick={() => playEpisode(latest)}
                    className="mt-4 text-xs uppercase tracking-[0.25em] text-cream underline-offset-4 transition-all hover:underline"
                    data-cursor="listen"
                  >
                    Listen →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Newsletter */}
          <div>
            <h3 className="mb-3 font-hand text-2xl font-semibold md:text-3xl">{newsletterHeading}</h3>
            {submitted ? (
              <p className="font-serif text-xl text-cream/80">
                You&apos;re on the list. We write rarely, and carefully.
              </p>
            ) : (
              <form
                onSubmit={handleNewsletter}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={cn(
                    'h-12 flex-1 border border-cream/25 bg-transparent px-4 text-sm text-cream',
                    'placeholder:text-cream/35 focus:border-cream/60 focus:shadow-[0_0_24px_rgba(246,240,228,0.12)] focus:outline-none',
                    'transition-shadow duration-500',
                  )}
                  aria-label="Email address"
                />
                <Button
                  type="submit"
                  className="h-12 bg-cream text-bronze hover:bg-cream/90"
                >
                  Join
                </Button>
              </form>
            )}
            {error && <p className="mt-2 text-xs text-red-300">{error}</p>}

            <div className="mt-8 flex flex-wrap gap-5">
              {socialLinks.map((link) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/45 transition-colors hover:text-cream"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-cream/10 pt-10 md:flex-row md:items-end">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) =>
              link.href.startsWith('#') ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-cream/55 transition-colors hover:text-cream"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-cream/55 transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="text-right">
            <ReturnToBeginning />
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.35em] text-cream/30">
              {contactEmail && <span className="mr-3">{contactEmail}</span>}
              © {year} {podcastName}
            </p>
            {legalLinks.length > 0 && (
              <div className="mt-3 flex flex-wrap justify-end gap-4">
                {legalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[10px] uppercase tracking-[0.2em] text-cream/25 hover:text-cream/50"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
            <motion.p
              className="mt-8 font-serif text-xl italic text-cream/40"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : undefined}
              transition={{ delay: 0.8, duration: 1.2 }}
            >
              — crafted slowly
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export const Footer = RevealingFooter
