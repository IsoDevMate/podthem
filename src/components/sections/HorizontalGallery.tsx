import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePinReady } from '@/hooks/usePinReady'
import { useScrollRefresh } from '@/motion/SmoothScrollProvider'
import { OptimizedImage } from '@/components/shared/OptimizedImage'
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

function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < bp,
  )
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`)
    const sync = () => setMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [bp])
  return mobile
}

/**
 * Lookbook — desktop: GSAP pin scrub.
 * Mobile: native horizontal snap scroll (avoids pin-spacer overflow).
 */
export function HorizontalGallery({
  items,
  label = 'Visual Essays',
  headline = 'Lookbook',
}: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const pinReady = usePinReady()
  const refreshScroll = useScrollRefresh()
  const mobile = useIsMobile()

  useEffect(() => {
    if (mobile || reduced) return
    if (!pinReady || !sectionRef.current || !trackRef.current) return
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
  }, [pinReady, reduced, refreshScroll, items.length, mobile])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full overflow-x-clip bg-gradient-to-b from-[#f6f0e4] via-[#ebe3d2] to-[#e0d4c0]"
    >
      <div
        className={cn(
          'relative w-full overflow-x-clip',
          mobile || reduced ? 'py-16' : 'flex h-screen flex-col justify-center',
        )}
      >
        <div className="relative z-20 mb-6 px-6 md:mb-8 md:px-12 lg:px-20">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
            {label}
          </span>
          <h2 className="mt-2 font-hand text-4xl font-semibold tracking-tight text-bronze md:text-5xl">
            {headline}
          </h2>
        </div>

        {mobile || reduced ? (
          <div
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {items.map((item, i) => (
              <Link
                key={item.id}
                to={item.href}
                className={cn(
                  'relative shrink-0 snap-start overflow-hidden bg-cream-dark',
                  i % 2 === 0 ? 'h-[58vw] w-[75vw]' : 'mt-4 h-[52vw] w-[68vw]',
                )}
              >
                <OptimizedImage
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bronze/60 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 max-w-[85%] font-hand text-xl font-semibold text-cream">
                  {item.title}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="relative w-full overflow-hidden">
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
                      ? 'h-[52vh] w-[38vw]'
                      : 'mt-8 h-[46vh] w-[34vw] md:mt-12',
                  )}
                >
                  <OptimizedImage
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bronze/60 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-5 max-w-[85%] font-hand text-xl font-semibold text-cream md:text-2xl">
                    {item.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
