import { useRef, useState, type FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

const springConfig = {
  type: 'spring' as const,
  stiffness: 110,
  damping: 18,
  mass: 0.9,
}

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

export function RevealingFooter({
  podcastName,
  tagline = 'New episodes every fortnight. Crafted with care.',
  navLinks = [],
  socialLinks = [],
  legalLinks = [],
  contactEmail,
  year = new Date().getFullYear(),
  newsletterHeading = 'Never miss an episode',
}: RevealingFooterProps) {
  const footerRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const isInView = useInView(footerRef, { once: true, margin: '-10% 0px' })
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

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
      className="relative overflow-hidden bg-bronze px-6 pb-12 pt-24 text-cream md:px-12 lg:px-20"
    >
      {/* Giant wordmark — spring mask reveal */}
      <div className="mb-20 flex justify-center overflow-hidden">
        <div className="flex" aria-label={podcastName}>
          {letters.map((letter, i) => (
            <div key={`${letter}-${i}`} className="overflow-hidden">
              <motion.span
                className="block font-serif text-[18vw] leading-none tracking-tighter md:text-[14vw]"
                initial={{ y: reducedMotion ? '0%' : '110%' }}
                animate={isInView ? { y: '0%' } : { y: reducedMotion ? '0%' : '110%' }}
                transition={{
                  ...springConfig,
                  delay: reducedMotion ? 0 : i * 0.06,
                }}
              >
                {letter}
              </motion.span>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column: links + newsletter */}
      <div className="mx-auto grid max-w-7xl gap-12 border-t border-cream/15 pt-12 md:grid-cols-2">
        <div className="space-y-8">
          {navLinks.length > 0 && (
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-cream/70 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {socialLinks.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.2em] text-cream/50 transition-colors hover:text-cream"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          <p className="text-sm text-cream/60">{tagline}</p>

          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              className="border-cream/30 text-cream hover:bg-cream/10"
            >
              Apple Podcasts
            </Button>
            <Button
              variant="outline"
              className="border-cream/30 text-cream hover:bg-cream/10"
            >
              Spotify
            </Button>
            <Button className="bg-cream text-bronze hover:bg-cream/90">
              Subscribe
            </Button>
          </div>
        </div>

        <div>
          {submitted ? (
            <p className="font-serif text-2xl text-cream md:text-3xl">
              You&apos;re on the list. See you in your inbox.
            </p>
          ) : (
            <>
              <h3 className="mb-4 font-serif text-2xl text-cream md:text-3xl">
                {newsletterHeading}
              </h3>
              <form onSubmit={handleNewsletter} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={cn(
                    'h-11 flex-1 border border-cream/25 bg-transparent px-4 text-sm text-cream',
                    'placeholder:text-cream/40 focus:border-cream/50 focus:outline-none',
                  )}
                  aria-label="Email address"
                />
                <Button
                  type="submit"
                  className="bg-cream text-bronze hover:bg-cream/90"
                >
                  Join
                </Button>
              </form>
              {error && (
                <p className="mt-2 text-xs text-red-300">{error}</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 md:flex-row">
        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
          {legalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.2em] text-cream/35 transition-colors hover:text-cream/60"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.4em] text-cream/30">
          {contactEmail && <span className="mr-4">{contactEmail}</span>}
          © {year} {podcastName}
        </p>
      </div>
    </footer>
  )
}

/** Alias for sections/Footer spec — same component, no duplication */
export const Footer = RevealingFooter
