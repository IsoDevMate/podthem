import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { PODCAST_NAME } from '@/data/episodes'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface PreloaderProps {
  onComplete?: () => void
}

/** First-load curtain only — intentionally shorter so the site lands fast. */
export function Preloader({ onComplete }: PreloaderProps) {
  const [done, setDone] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      setDone(true)
      onComplete?.()
      window.dispatchEvent(new Event('podthem:preloader-complete'))
      return
    }

    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setDone(true)
          document.body.style.overflow = ''
          onComplete?.()
          window.dispatchEvent(new Event('podthem:preloader-complete'))
          gsap.fromTo(
            'main',
            { opacity: 0 },
            { opacity: 1, duration: 0.45, ease: 'power2.out' },
          )
        }, 40)
      },
    })

    tl.fromTo(
      '[data-preload-grain]',
      { opacity: 0 },
      { opacity: 0.35, duration: 0.45, ease: 'power2.out' },
      0,
    )

    tl.fromTo(
      '[data-preload-stroke]',
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' },
      0.05,
    )

    tl.fromTo(
      '[data-preload-word]',
      { opacity: 0, letterSpacing: '0.35em', y: 10 },
      { opacity: 1, letterSpacing: '0.12em', y: 0, duration: 0.45, ease: 'power3.out' },
      0.25,
    )

    tl.to(
      '[data-preload-panel]',
      {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.5,
        ease: 'power4.inOut',
      },
      '+=0.15',
    )

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [reduced, onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            data-preload-panel
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1510]"
            style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          >
            <div
              data-preload-grain
              className="film-grain pointer-events-none absolute inset-0 opacity-0"
            />

            <svg
              viewBox="0 0 200 60"
              className="h-16 w-[min(70vw,320px)]"
              fill="none"
              aria-hidden
            >
              <path
                data-preload-stroke
                d="M10 45 C40 10, 70 10, 100 30 S160 55, 190 20"
                stroke="rgba(246,240,228,0.85)"
                strokeWidth="1.2"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
              />
            </svg>

            <p
              data-preload-word
              className="mt-8 font-serif text-sm uppercase tracking-[0.4em] text-cream/70"
            >
              {PODCAST_NAME}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
