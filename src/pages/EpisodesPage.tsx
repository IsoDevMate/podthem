import { Link } from 'react-router-dom'
import { episodes } from '@/data/episodes'
import { EditorialReveal } from '@/components/shared/EditorialReveal'
import { OptimizedImage } from '@/components/shared/OptimizedImage'
import { onMorphNavigate } from '@/motion/morphNavigation'

export function EpisodesPage() {
  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-28">
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">Archive</span>
        <EditorialReveal as="h1" className="mt-3 font-serif text-5xl text-bronze md:text-7xl">
          All Episodes
        </EditorialReveal>
        <p className="mt-4 max-w-xl text-bronze-muted">
          Six seasons of slow stories — each one crafted with the patience of print journalism.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {episodes.map((ep) => (
            <Link
              key={ep.id}
              to={`/episode/${ep.id}`}
              className="group"
              onClick={(e) => onMorphNavigate(e, 'card', ep.imageUrl)}
            >
              <div className="aspect-[4/5] overflow-hidden bg-cream-dark">
                <OptimizedImage
                  src={ep.imageUrl}
                  alt={ep.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 font-mono text-[10px] tracking-widest text-bronze-muted">
                EP {String(ep.episodeNumber).padStart(2, '0')}
              </p>
              <h2 className="mt-1 font-serif text-2xl text-bronze group-hover:underline">{ep.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm text-bronze-muted">{ep.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
