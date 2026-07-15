import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { merchItems } from '@/data/merch'
import { EditorialReveal } from '@/components/shared/EditorialReveal'
import { OptimizedImage } from '@/components/shared/OptimizedImage'
import { onMorphNavigate } from '@/motion/morphNavigation'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export function MerchPage() {
  const gridRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !gridRef.current) return
    const cards = gridRef.current.querySelectorAll('[data-merch-card]')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 48, opacity: 0, rotateX: 8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
          },
        },
      )
    }, gridRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-28">
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
          Shop
        </span>
        <EditorialReveal
          as="h1"
          className="mt-3 font-hand text-5xl font-semibold tracking-tight text-bronze md:text-7xl"
        >
          Merch
        </EditorialReveal>
        <p className="mt-4 max-w-xl text-bronze-muted">
          Objects made for the same attention the podcast asks of you — soft cotton,
          letterpress, and studio-hour rituals.
        </p>

        <div
          ref={gridRef}
          className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: '1200px' }}
        >
          {merchItems.map((item, i) => (
            <Link
              key={item.id}
              to={`/merch/${item.id}`}
              data-merch-card
              data-cursor="view"
              data-cursor-label="View"
              className={cn('group block', i % 3 === 1 && 'lg:mt-10')}
              onClick={(e) => onMorphNavigate(e, 'card', item.imageUrl)}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
                <OptimizedImage
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {item.limited && (
                  <span className="absolute top-3 left-3 border border-cream/40 bg-bronze/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
                    Limited
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h2 className="font-hand text-2xl font-semibold text-bronze group-hover:underline">
                  {item.name}
                </h2>
                <span className="shrink-0 font-mono text-sm text-bronze-muted">
                  {item.price}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-bronze-muted">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
