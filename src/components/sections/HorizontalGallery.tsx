import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export interface GalleryItem {
  id: string
  title: string
  imageUrl: string
  href: string
}

export interface HorizontalGalleryProps {
  items: GalleryItem[]
  label?: string
  headline?: string
}

export function HorizontalGallery({
  items,
  label = 'Visual Essays',
  headline = 'Lookbook',
}: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !sectionRef.current || !trackRef.current) return

    const section = sectionRef.current
    const track = trackRef.current

    const ctx = gsap.context(() => {
      const getScroll = () => Math.max(0, track.scrollWidth - window.innerWidth)

      const tween = gsap.to(track, {
        x: () => -getScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScroll() + window.innerHeight * 0.4}`,
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      gsap.utils.toArray<HTMLElement>('[data-h-card]').forEach((card, i) => {
        gsap.fromTo(
          card,
          { rotateZ: i % 2 === 0 ? -3.5 : 2.8, y: 48 },
          {
            rotateZ: 0,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: 'left 95%',
              end: 'left 45%',
              scrub: true,
            },
          },
        )
      })

      gsap.to('[data-h-title]', {
        x: () => getScroll() * 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScroll()}`,
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [reduced, items.length])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream-dark"
    >
      <div className="flex h-screen flex-col justify-center">
        <div className="relative mb-10 px-6 md:px-12 lg:px-20">
          <span className="relative z-20 font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
            {label}
          </span>
          <h2
            data-h-title
            className="pointer-events-none absolute top-8 left-6 z-10 whitespace-nowrap font-serif text-[14vw] leading-none text-bronze/[0.08] md:left-12 lg:left-20"
          >
            {headline}
          </h2>
        </div>

        <div
          ref={trackRef}
          className="relative z-20 flex w-max items-center gap-8 px-6 will-change-transform md:gap-12 md:px-12 lg:px-20"
        >
          {items.map((item, i) => (
            <Link
              key={item.id}
              to={item.href}
              data-h-card
              data-cursor="view"
              data-cursor-label="View"
              className={cn(
                'group relative shrink-0 overflow-hidden shadow-2xl shadow-bronze/20',
                i % 3 === 0
                  ? 'h-[48vh] w-[70vw] md:w-[42vw]'
                  : i % 3 === 1
                    ? 'h-[40vh] w-[60vw] md:w-[34vw]'
                    : 'h-[52vh] w-[65vw] md:w-[38vw]',
              )}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bronze/55 to-transparent" />
              <p className="absolute bottom-5 left-5 max-w-[80%] font-serif text-xl text-cream md:text-2xl">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
