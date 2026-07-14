import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollReady, useScrollRefresh } from '@/motion/SmoothScrollProvider'
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
  const scrollReady = useScrollReady()
  const refreshScroll = useScrollRefresh()

  useEffect(() => {
    if (!scrollReady || reduced || !sectionRef.current || !trackRef.current) return
    if (sectionRef.current.closest('[data-outgoing-page]')) return

    const section = sectionRef.current
    const track = trackRef.current

    const ctx = gsap.context(() => {
      const getScroll = () => Math.max(0, track.scrollWidth - window.innerWidth)

      gsap.to(track, {
        x: () => -getScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(getScroll(), window.innerHeight * 0.8)}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true)
      refreshScroll()
    })

    return () => ctx.revert()
  }, [reduced, scrollReady, refreshScroll, items.length])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#f6f0e4] via-[#ebe3d2] to-[#e0d4c0]"
    >
      <div className="flex h-screen flex-col justify-center">
        <div className="relative z-20 mb-8 px-6 md:px-12 lg:px-20">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
            {label}
          </span>
          <h2 className="mt-2 font-serif text-4xl text-bronze md:text-5xl">
            {headline}
          </h2>
        </div>

        <div
          ref={trackRef}
          className="relative z-20 flex w-max items-center gap-6 px-6 will-change-transform md:gap-8 md:px-12 lg:px-20"
        >
          {items.map((item, i) => (
            <Link
              key={item.id}
              to={item.href}
              data-h-card
              data-cursor="view"
              data-cursor-label="View"
              className={cn(
                'group relative shrink-0 overflow-hidden bg-cream-dark shadow-xl shadow-bronze/15',
                i % 2 === 0
                  ? 'h-[52vh] w-[78vw] md:h-[58vh] md:w-[38vw]'
                  : 'mt-8 h-[46vh] w-[72vw] md:mt-12 md:h-[52vh] md:w-[34vw]',
              )}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bronze/60 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 max-w-[85%] font-serif text-xl text-cream md:text-2xl">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
