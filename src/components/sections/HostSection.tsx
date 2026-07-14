import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePinReady } from '@/hooks/usePinReady'
import { HostPortraitReveal } from '@/components/shared/HostPortraitReveal'

gsap.registerPlugin(ScrollTrigger)

export interface HostSectionProps {
  name: string
  role: string
  portrait: string
  bio: string[]
  signature: string
}

export function HostSection({
  name,
  role,
  portrait,
  bio,
  signature,
}: HostSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const pinReady = usePinReady()

  useEffect(() => {
    if (!pinReady || reduced || !sectionRef.current) return
    const section = sectionRef.current

    const ctx = gsap.context(() => {
      gsap.to('[data-host-bg-text]', {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.fromTo(
        '[data-host-fg]',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 1,
          },
        },
      )

      gsap.to('[data-host-orbit]', {
        rotate: 360,
        duration: 48,
        ease: 'none',
        repeat: -1,
      })
    }, section)

    return () => ctx.revert()
  }, [pinReady, reduced])

  return (
    <section
      id="host"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-bronze text-cream"
    >
      <p
        data-host-bg-text
        className="pointer-events-none absolute top-1/4 left-0 w-full text-center font-hand text-[22vw] font-semibold leading-none text-cream/[0.06]"
        aria-hidden
      >
        HOST
      </p>

      <div
        data-host-orbit
        className="pointer-events-none absolute top-[15%] right-[8%] h-40 w-40 rounded-full border border-cream/15 md:h-56 md:w-56"
        aria-hidden
      >
        <span className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cream/40" />
      </div>

      <div className="relative grid min-h-screen grid-cols-1 items-end gap-10 px-6 py-24 md:px-12 lg:grid-cols-2 lg:items-center lg:px-20">
        <HostPortraitReveal
          name={name}
          role={role}
          portrait={portrait}
          description={bio[0] ?? ''}
          profileHref="/about"
          episodesHref="/episodes"
          className="justify-self-center lg:justify-self-start"
        />

        <div className="relative pb-8 lg:pb-0">
          <p
            data-host-fg
            className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-cream/50"
          >
            Our host
          </p>
          <h2
            data-host-fg
            className="mb-8 font-hand text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl"
          >
            {name}
          </h2>
          <div className="space-y-4">
            {bio.map((line) => (
              <p
                key={line}
                data-host-fg
                className="max-w-md text-sm leading-relaxed text-cream/70 md:text-base"
              >
                {line}
              </p>
            ))}
          </div>
          <p
            data-host-fg
            className="mt-10 font-hand text-2xl font-semibold italic text-cream/80"
          >
            {signature}
          </p>
        </div>
      </div>
    </section>
  )
}
