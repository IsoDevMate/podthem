import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

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

  useEffect(() => {
    if (reduced || !sectionRef.current) return
    const section = sectionRef.current

    const ctx = gsap.context(() => {
      gsap.to('[data-host-portrait]', {
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

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

      gsap.fromTo(
        '[data-host-name-line]',
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 55%',
            end: 'top 25%',
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
  }, [reduced])

  const nameLines = name.split(' ')

  return (
    <section
      id="host"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-bronze text-cream"
    >
      <p
        data-host-bg-text
        className="pointer-events-none absolute top-1/4 left-0 w-full text-center font-serif text-[22vw] leading-none text-cream/[0.06]"
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
        <div className="relative aspect-[3/4] w-full max-w-xl overflow-hidden justify-self-center lg:justify-self-start">
          <img
            data-host-portrait
            src={portrait}
            alt={name}
            className="h-full w-full origin-center scale-100 object-cover"
          />
        </div>

        <div className="relative pb-8 lg:pb-0">
          <p
            data-host-fg
            className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-cream/50"
          >
            {role}
          </p>
          <h2 className="mb-8 font-serif text-5xl leading-[0.95] md:text-7xl">
            {nameLines.map((line) => (
              <span key={line} className="block overflow-hidden">
                <span data-host-name-line className="inline-block">
                  {line}
                </span>
              </span>
            ))}
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
            className="mt-10 font-serif text-2xl italic text-cream/80"
          >
            {signature}
          </p>
        </div>
      </div>
    </section>
  )
}
