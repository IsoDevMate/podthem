import { Link } from 'react-router-dom'
import { events } from '@/data/events'
import { EditorialReveal } from '@/components/shared/EditorialReveal'
import { OptimizedImage } from '@/components/shared/OptimizedImage'
import { onMorphNavigate } from '@/motion/morphNavigation'
import { cn } from '@/lib/utils'

const typeLabel = {
  meetup: 'Meetup',
  live: 'Live recording',
  workshop: 'Workshop',
} as const

export function EventsPage() {
  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-28">
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
          Community
        </span>
        <EditorialReveal
          as="h1"
          className="mt-3 font-hand text-5xl font-semibold tracking-tight text-bronze md:text-7xl"
        >
          Podthem Gang
        </EditorialReveal>
        <p className="mt-4 max-w-xl text-bronze-muted">
          Meetups, live recordings, and workshops — places where slow listening leaves
          the headphones and enters the room.
        </p>

        <div className="mt-16 space-y-16">
          {events.map((event, i) => (
            <article
              key={event.id}
              className={cn(
                'grid gap-8 border-t border-bronze/10 pt-12 lg:grid-cols-2 lg:items-center',
                i % 2 === 1 && 'lg:[&>*:first-child]:order-2',
              )}
            >
              <div className="aspect-[16/10] overflow-hidden bg-cream-dark">
                <OptimizedImage
                  src={event.imageUrl}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-bronze-muted">
                  {typeLabel[event.type]} · {event.city}
                </p>
                <h2 className="mt-3 font-hand text-3xl font-semibold text-bronze md:text-4xl">
                  {event.title}
                </h2>
                <p className="mt-2 font-serif text-lg text-bronze">
                  {event.date} · {event.time}
                </p>
                <p className="mt-1 text-sm text-bronze-muted">{event.venue}</p>
                <p className="mt-5 leading-relaxed text-bronze-muted">{event.description}</p>
                {typeof event.spotsLeft === 'number' && (
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-800/80">
                    {event.spotsLeft} seats left
                  </p>
                )}
                <a
                  href={event.ctaHref}
                  className="mt-6 inline-flex h-11 items-center border border-bronze/25 px-6 text-xs uppercase tracking-[0.22em] text-bronze transition-colors hover:bg-bronze hover:text-cream"
                >
                  {event.ctaLabel}
                </a>
              </div>
            </article>
          ))}
        </div>

        <Link
          to="/contact"
          className="mt-20 inline-block text-sm uppercase tracking-widest text-bronze-muted"
          onClick={(e) => onMorphNavigate(e, 'link')}
        >
          Host a meetup in your city →
        </Link>
      </div>
    </main>
  )
}
