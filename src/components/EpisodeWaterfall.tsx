import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Episode } from '@/types/episode'
import { episodes } from '@/data/episodes'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useAudioPlayer } from '@/motion/AudioPlayerProvider'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

/**
 * 3D Twisting Image Stack — editorial prints in perspective.
 * Scroll scrub drives Y-twist / X-tilt / scale / depth.
 * Idle float lives on the inner face so it never fights scroll poses.
 */
export function EpisodeWaterfall() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const facesRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const reduced = useReducedMotion()
  const mouseRef = useRef({ x: 0, y: 0 })
  const progressRef = useRef(0)

  useEffect(() => {
    if (reduced || !sectionRef.current || !stageRef.current) return

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    const faces = facesRef.current.filter(Boolean) as HTMLDivElement[]
    const n = cards.length
    if (!n) return

    const scatter = cards.map((_, i) => ({
      x: ((i % 3) - 1) * 36 + (i % 2 === 0 ? -22 : 30),
      yBase: (i - (n - 1) / 2) * 12,
    }))

    const paint = (progress: number) => {
      progressRef.current = progress
      const active = Math.min(n - 1, Math.max(0, progress * (n - 0.001)))
      const rounded = Math.round(active)
      setActiveIndex((prev) => (prev === rounded ? prev : rounded))

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      cards.forEach((card, i) => {
        const dist = i - active
        const abs = Math.abs(dist)
        const side = dist === 0 ? 0 : dist < 0 ? -1 : 1
        const influence = abs < 0.55 ? 1 : 0.2

        const rotateY = gsap.utils.clamp(-40, 40, dist * 30) + mx * 8 * influence
        const rotateX = gsap.utils.clamp(-14, 14, dist * -7) + -my * 6 * influence
        const scale = gsap.utils.interpolate(1, 0.76, Math.min(abs, 1.75) / 1.75)
        const z = gsap.utils.interpolate(140, -260, Math.min(abs, 2.2) / 2.2)
        const x = scatter[i].x * 0.4 + side * Math.min(abs, 1.5) * 95
        const y = scatter[i].yBase + dist * 32

        gsap.set(card, {
          x,
          y,
          z,
          rotateY,
          rotateX,
          scale,
          transformOrigin: '50% 50%',
          force3D: true,
        })

        const face = faces[i]
        if (face) {
          const blur = 18 + abs * 26
          const opacity = 0.16 + Math.min(abs, 1.5) * 0.14
          face.style.boxShadow = `0 ${10 + abs * 12}px ${blur}px rgba(61,43,31,${opacity})`
          face.style.filter =
            abs < 0.4 ? 'brightness(1)' : `brightness(${Math.max(0.82, 1 - abs * 0.1)})`
        }
      })
    }

    paint(0)

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * n * 0.9)}`,
      pin: true,
      scrub: 1.15,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => paint(self.progress),
    })

    // Idle gallery float on faces only — cards keep scrub poses
    const floats = faces.map((face, i) =>
      gsap.to(face, {
        y: 6 + (i % 3) * 2,
        rotateZ: i % 2 === 0 ? 1.2 : -1.4,
        duration: 6 + (i % 4),
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: i * 0.4,
      }),
    )

    const onMove = (e: MouseEvent) => {
      const stage = stageRef.current
      if (!stage) return
      const rect = stage.getBoundingClientRect()
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      }
      paint(progressRef.current)
    }

    const onLeave = () => {
      mouseRef.current = { x: 0, y: 0 }
      paint(progressRef.current)
    }

    const stage = stageRef.current
    stage.addEventListener('mousemove', onMove)
    stage.addEventListener('mouseleave', onLeave)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      trigger.kill()
      floats.forEach((t) => t.kill())
      stage.removeEventListener('mousemove', onMove)
      stage.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [reduced])

  return (
    <section id="episodes" ref={sectionRef} className="relative bg-cream">
      <div className="relative flex min-h-screen flex-col px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto mb-8 w-full max-w-7xl shrink-0">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
            The Series
          </span>
          <h2 className="mt-2 font-serif text-4xl text-bronze md:text-5xl">
            Episode Gallery
          </h2>
        </div>

        <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.2fr] lg:gap-16">
          <div className="relative h-[42vh] lg:h-[min(70vh,560px)]">
            {episodes.map((episode, i) => (
              <EpisodeCopy
                key={episode.id}
                episode={episode}
                isActive={activeIndex === i}
              />
            ))}
          </div>

          <div
            ref={stageRef}
            className="relative h-[55vh] w-full lg:h-[75vh]"
            style={{
              perspective: '1800px',
              perspectiveOrigin: '50% 42%',
            }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {episodes.map((episode, i) => (
                <div
                  key={episode.id}
                  ref={(el) => {
                    cardsRef.current[i] = el
                  }}
                  className="absolute"
                  style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                >
                  <Link
                    to={`/episode/${episode.id}`}
                    data-cursor="listen"
                    data-cursor-label="Listen"
                    className="block"
                  >
                    <div
                      ref={(el) => {
                        facesRef.current[i] = el
                      }}
                      data-card-face
                      className="relative aspect-[4/5] w-[min(58vw,280px)] overflow-hidden bg-bronze/5 md:w-[300px] lg:w-[320px]"
                    >
                      <img
                        src={episode.imageUrl}
                        alt={episode.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        draggable={false}
                      />
                      <span className="absolute bottom-3 left-3 font-mono text-[10px] tracking-widest text-cream/90">
                        EP {String(episode.episodeNumber).padStart(2, '0')}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function EpisodeCopy({
  episode,
  isActive,
}: {
  episode: Episode
  isActive: boolean
}) {
  const { playEpisode } = useAudioPlayer()

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out',
        isActive
          ? 'translate-y-0 opacity-100 blur-0'
          : 'pointer-events-none translate-y-5 opacity-30 blur-[8px]',
      )}
      aria-hidden={!isActive}
    >
      <span className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
        Episode {String(episode.episodeNumber).padStart(2, '0')}
      </span>
      <h3 className="mb-4 font-serif text-3xl leading-tight text-bronze md:text-4xl lg:text-5xl">
        {episode.title}
      </h3>
      <p className="max-w-md text-sm leading-relaxed text-bronze-muted md:text-base">
        {episode.description}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-5">
        <button
          type="button"
          onClick={() => playEpisode(episode)}
          className="inline-flex text-xs uppercase tracking-[0.2em] text-bronze"
          tabIndex={isActive ? 0 : -1}
          data-cursor="listen"
          data-cursor-label="Listen"
        >
          Play episode →
        </button>
        <Link
          to={`/episode/${episode.id}`}
          className="inline-flex text-xs uppercase tracking-[0.2em] text-bronze-muted"
          tabIndex={isActive ? 0 : -1}
        >
          Details
        </Link>
      </div>
    </div>
  )
}
