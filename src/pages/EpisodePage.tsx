import { useParams, Link } from 'react-router-dom'
import { episodes } from '@/data/episodes'
import { Button } from '@/components/ui/button'
import { EditorialReveal } from '@/components/shared/EditorialReveal'
import { onMorphNavigate } from '@/motion/morphNavigation'

export function EpisodePage() {
  const { id } = useParams<{ id: string }>()
  const episode = episodes.find((ep) => ep.id === id)

  if (!episode) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6">
        <h1 className="font-serif text-4xl text-bronze">Episode not found</h1>
        <Link
          to="/"
          className="mt-6 text-sm uppercase tracking-widest text-bronze-muted"
          onClick={(e) => onMorphNavigate(e, 'link')}
        >
          ← Back home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-24 md:px-12 md:pt-28">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
          Episode {String(episode.episodeNumber).padStart(2, '0')}
        </span>
        <EditorialReveal
          as="h1"
          className="mt-4 font-serif text-5xl leading-tight text-bronze md:text-7xl"
          lineStagger={0.09}
        >
          {episode.title}
        </EditorialReveal>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-bronze-muted">
          {episode.description}
        </p>

        <div className="mt-12 overflow-hidden shadow-2xl shadow-bronze/10">
          <img
            src={episode.imageUrl}
            alt={episode.title}
            className="aspect-video w-full object-cover"
          />
        </div>

        <div className="mt-12 rounded-none border border-bronze/15 bg-cream-dark p-8">
          <audio controls className="w-full" src={episode.audioUrl}>
            Your browser does not support the audio element.
          </audio>
          <p className="mt-4 text-xs text-bronze-muted">
            Audio file: {episode.audioUrl}
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <Button>Download</Button>
          <Button variant="outline">Share</Button>
        </div>
      </main>
    </div>
  )
}
