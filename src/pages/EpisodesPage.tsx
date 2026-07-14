import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { episodes } from '@/data/episodes'
import { categories } from '@/data/site'
import { EditorialReveal } from '@/components/shared/EditorialReveal'
import { OptimizedImage } from '@/components/shared/OptimizedImage'
import { onMorphNavigate } from '@/motion/morphNavigation'
import { cn } from '@/lib/utils'

export function EpisodesPage() {
  const [params, setParams] = useSearchParams()
  const topic = params.get('topic')

  const filtered = useMemo(() => {
    if (!topic) return episodes
    return episodes.filter((ep) => ep.topics?.includes(topic))
  }, [topic])

  const topicLabel =
    categories.find((c) => c.id === topic)?.label ?? topic

  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-28">
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
          Archive
        </span>
        <EditorialReveal
          as="h1"
          className="mt-3 font-hand text-5xl font-semibold tracking-tight text-bronze md:text-7xl"
        >
          {topic ? topicLabel : 'All Episodes'}
        </EditorialReveal>
        <p className="mt-4 max-w-xl text-bronze-muted">
          {topic
            ? `Episodes tagged with ${topicLabel}. Clear the filter to see the full archive.`
            : 'Six seasons of slow stories — each one crafted with the patience of print journalism.'}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setParams({})}
            className={cn(
              'border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em]',
              !topic
                ? 'border-bronze bg-bronze text-cream'
                : 'border-bronze/20 text-bronze-muted hover:border-bronze/40',
            )}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setParams({ topic: c.id })}
              className={cn(
                'border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em]',
                topic === c.id
                  ? 'border-bronze bg-bronze text-cream'
                  : 'border-bronze/20 text-bronze-muted hover:border-bronze/40',
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ep) => (
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
              <h2 className="mt-1 font-hand text-2xl font-semibold text-bronze group-hover:underline">
                {ep.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-bronze-muted">
                {ep.description}
              </p>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-bronze-muted">No episodes in this topic yet.</p>
        )}
      </div>
    </main>
  )
}
