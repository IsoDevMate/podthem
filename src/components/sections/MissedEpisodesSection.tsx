import { Link } from 'react-router-dom'
import { episodes } from '@/data/episodes'
import { OptimizedImage } from '@/components/shared/OptimizedImage'
import { onMorphNavigate } from '@/motion/morphNavigation'
import { useAudioPlayer } from '@/motion/AudioPlayerProvider'
import { cn } from '@/lib/utils'

/** Two curated FOMO picks — not a full archive dump */
const CATCH_UP = [
  {
    id: 'ep-01',
    badge: 'Most discussed',
    why: 'The episode that started the Discord threads — silence as architecture.',
    listeners: '2.4k listened this week',
  },
  {
    id: 'ep-03',
    badge: "Editor's pick",
    why: 'City at 3am — the one listeners say they replay on insomnia nights.',
    listeners: 'Trending on Spotify',
  },
] as const

export function MissedEpisodesSection() {
  const { playEpisode } = useAudioPlayer()

  return (
    <section
      id="catch-up"
      className="relative border-y border-bronze/10 bg-[#ebe3d2]/50 px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
          Don&apos;t miss these
        </span>
        <h2 className="mt-2 font-hand text-4xl font-semibold tracking-tight text-bronze md:text-5xl">
          Still unheard
        </h2>
        <p className="mt-3 max-w-lg text-sm text-bronze-muted">
          Two episodes the community keeps returning to — worth your next slow listen.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {CATCH_UP.map((pick, i) => {
            const ep = episodes.find((e) => e.id === pick.id)
            if (!ep) return null
            return (
              <article
                key={pick.id}
                className={cn(
                  'group relative flex flex-col overflow-hidden bg-[#f6f0e4] sm:flex-row',
                  i === 1 && 'md:translate-y-6',
                )}
              >
                <Link
                  to={`/episode/${ep.id}`}
                  onClick={(e) => onMorphNavigate(e, 'card', ep.imageUrl)}
                  className="relative aspect-[4/5] w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-44 md:w-52"
                >
                  <OptimizedImage
                    src={ep.imageUrl}
                    alt={ep.title}
                    className="h-full w-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <span className="absolute top-3 left-3 border border-cream/50 bg-bronze/75 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-cream backdrop-blur-sm">
                    {pick.badge}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col justify-center p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-900/70">
                    {pick.listeners}
                  </p>
                  <h3 className="mt-2 font-hand text-2xl font-semibold text-bronze md:text-3xl">
                    {ep.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-bronze-muted">{pick.why}</p>
                  <p className="mt-2 font-mono text-[10px] tracking-widest text-bronze-muted">
                    {ep.readingTime}
                  </p>
                  <div className="mt-5 flex gap-5">
                    <button
                      type="button"
                      onClick={() => playEpisode(ep)}
                      className="text-[10px] uppercase tracking-[0.22em] text-bronze"
                    >
                      Play now →
                    </button>
                    <Link
                      to={`/episode/${ep.id}`}
                      onClick={(e) => onMorphNavigate(e, 'link', ep.imageUrl)}
                      className="text-[10px] uppercase tracking-[0.22em] text-bronze-muted"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
