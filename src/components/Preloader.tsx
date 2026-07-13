import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { PODCAST_NAME } from '@/data/episodes'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface PreloaderProps {
  onComplete?: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [done, setDone] = useState(false)
  const [count, setCount] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      setDone(true)
      onComplete?.()
      return
    }

    document.body.style.overflow = 'hidden'
    const letters = gsap.utils.toArray<HTMLElement>('[data-preloader-letter]')
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setDone(true)
          document.body.style.overflow = ''
          onComplete?.()
        }, 200)
      },
    })

    tl.fromTo(
      letters,
      { y: '110%', opacity: 0, rotateX: -40 },
      {
        y: '0%',
        opacity: 1,
        rotateX: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: 'power4.out',
      },
    )

    const counter = { v: 0 }
    tl.to(
      counter,
      {
        v: 100,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: () => setCount(Math.round(counter.v)),
      },
      0.2,
    )

    tl.to(
      '[data-preloader-panel]',
      {
        y: '-105%',
        duration: 1.05,
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
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-bronze"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            data-preloader-panel
            className="absolute inset-0 flex flex-col items-center justify-center bg-bronze"
          >
            <div
              className="flex overflow-hidden font-serif text-[12vw] leading-none tracking-tighter text-cream md:text-[8vw]"
              style={{ perspective: 800 }}
            >
              {PODCAST_NAME.toUpperCase()
                .split('')
                .map((letter, i) => (
                  <span
                    key={`${letter}-${i}`}
                    data-preloader-letter
                    className="inline-block"
                  >
                    {letter}
                  </span>
                ))}
            </div>
            <p className="mt-8 font-mono text-xs tracking-[0.4em] text-cream/50">
              {String(count).padStart(3, '0')}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
