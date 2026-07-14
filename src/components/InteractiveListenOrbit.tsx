import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { communityStats } from '@/data/site'
import { cn } from '@/lib/utils'

const PLATFORMS = [
  { id: 'spotify', label: 'Spotify', href: '#', hue: '#1DB954' },
  { id: 'apple', label: 'Apple Podcasts', href: '#', hue: '#872EC4' },
  { id: 'youtube', label: 'YouTube', href: '#', hue: '#FF0033' },
  { id: 'rss', label: 'RSS', href: '#', hue: '#F26522' },
  { id: 'mail', label: 'Newsletter', href: '#footer', hue: '#8B7355' },
] as const

/**
 * Wordless listen playground — platforms as orbiting nodes.
 * Labels live in aria-label / title only; motion does the talking.
 */
export function InteractiveListenOrbit() {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return

    const nodes = root.querySelectorAll<HTMLElement>('[data-orbit-node]')
    const rings = root.querySelectorAll<HTMLElement>('[data-orbit-ring]')
    const bars = root.querySelectorAll<HTMLElement>('[data-stat-bar]')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rings,
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          stagger: 0.12,
          ease: 'power3.out',
        },
      )

      gsap.fromTo(
        nodes,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          delay: 0.25,
          ease: 'back.out(1.6)',
        },
      )

      gsap.fromTo(
        bars,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.1,
          stagger: 0.1,
          delay: 0.4,
          ease: 'power2.out',
          transformOrigin: 'bottom center',
        },
      )

      nodes.forEach((node, i) => {
        gsap.to(node, {
          y: i % 2 === 0 ? -10 : 12,
          duration: 2.4 + i * 0.25,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        })
      })

      rings.forEach((ring, i) => {
        gsap.to(ring, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 40 + i * 12,
          repeat: -1,
          ease: 'none',
        })
      })
    }, root)

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(nodes, {
        x: (i) => x * (18 + i * 6),
        y: (i) => y * (14 + i * 4) + (i % 2 === 0 ? -6 : 8),
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    root.addEventListener('pointermove', onMove)
    return () => {
      root.removeEventListener('pointermove', onMove)
      ctx.revert()
    }
  }, [reduced])

  const pulse = (el: HTMLElement) => {
    if (reduced) return
    gsap.fromTo(
      el,
      { scale: 1 },
      { scale: 1.18, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' },
    )
  }

  return (
    <div
      ref={rootRef}
      className="relative mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col items-center justify-center px-6 py-16"
    >
      {/* Stat bars — values only via aria */}
      <div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-end gap-3 md:gap-5"
        role="list"
        aria-label="Community reach"
      >
        {communityStats.map((stat) => {
          const height = Math.min(
            120,
            36 + parseFloat(stat.value.replace(/[^\d.]/g, '')) * 1.4,
          )
          return (
            <div
              key={stat.label}
              role="listitem"
              title={`${stat.value} ${stat.label}`}
              aria-label={`${stat.value} ${stat.label}`}
              className="flex w-8 flex-col items-center gap-2 md:w-10"
            >
              <div
                data-stat-bar
                className="w-full origin-bottom rounded-t-sm bg-bronze/80"
                style={{ height }}
              />
              <span className="sr-only">
                {stat.value} {stat.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Orbital rings */}
      <div className="relative flex h-[min(72vw,420px)] w-[min(72vw,420px)] items-center justify-center">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            data-orbit-ring
            aria-hidden
            className="pointer-events-none absolute rounded-full border border-bronze/15"
            style={{
              inset: `${(n - 1) * 14}%`,
            }}
          />
        ))}

        {/* Center pulse */}
        <div
          aria-hidden
          className="absolute h-16 w-16 rounded-full bg-bronze/10 md:h-20 md:w-20"
        >
          <div className="absolute inset-3 rounded-full bg-bronze/20" />
          <div className="absolute inset-[38%] rounded-full bg-bronze" />
        </div>

        {PLATFORMS.map((p, i) => {
          const angle = (i / PLATFORMS.length) * Math.PI * 2 - Math.PI / 2
          const radius = 38
          const left = 50 + Math.cos(angle) * radius
          const top = 50 + Math.sin(angle) * radius
          return (
            <a
              key={p.id}
              href={p.href}
              data-orbit-node
              aria-label={p.label}
              title={p.label}
              onPointerEnter={(e) => pulse(e.currentTarget)}
              className={cn(
                'absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full',
                'border border-bronze/20 bg-cream shadow-[0_8px_30px_rgba(44,33,24,0.12)]',
                'transition-shadow hover:shadow-[0_12px_40px_rgba(44,33,24,0.2)] md:h-16 md:w-16',
              )}
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <span
                className="h-3.5 w-3.5 rounded-full md:h-4 md:w-4"
                style={{ backgroundColor: p.hue }}
                aria-hidden
              />
            </a>
          )
        })}
      </div>
    </div>
  )
}
