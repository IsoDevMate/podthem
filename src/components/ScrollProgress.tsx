import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useLenis } from '@/motion/SmoothScrollProvider'

gsap.registerPlugin(ScrollTrigger)

/** Brand scroll progress — thin bronze filament, not a generic bar */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !barRef.current) return
    const bar = barRef.current
    gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        gsap.to(bar, {
          scaleX: self.progress,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: true,
        })
      },
    })

    return () => st.kill()
  }, [reduced])

  if (reduced) return null

  return (
    <div
      className="pointer-events-none fixed top-0 right-0 left-0 z-[80] h-[2px]"
      aria-hidden
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-bronze/70"
      />
    </div>
  )
}

export function ReturnToBeginning() {
  const lenis = useLenis()
  const reduced = useReducedMotion()

  return (
    <button
      type="button"
      className="group mt-10 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-cream/50 transition-colors hover:text-cream"
      onClick={() => {
        if (lenis && !reduced) {
          lenis.scrollTo(0, { duration: 2.4, easing: (t) => 1 - Math.pow(1 - t, 4) })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }}
    >
      <span className="inline-block transition-transform group-hover:-translate-y-1">↑</span>
      Return to beginning
    </button>
  )
}
