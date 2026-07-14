import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { episodes } from '@/data/episodes'
import { EditorialReveal } from '@/components/shared/EditorialReveal'
import { OptimizedImage } from '@/components/shared/OptimizedImage'
import { CustomAudioPlayer } from '@/components/shared/CustomAudioPlayer'
import { onMorphNavigate } from '@/motion/morphNavigation'

const DEFAULT_CHAPTERS = [
  { title: 'Cold open', startSeconds: 0 },
  { title: 'The conversation', startSeconds: 120 },
  { title: 'Reflection', startSeconds: 480 },
  { title: 'Closing thoughts', startSeconds: 720 },
]

const DEFAULT_TRANSCRIPT = `AMELIA: Welcome back to Podthem. Today we're exploring something I've been thinking about for months — the spaces between words.

GUEST: That's where the real story lives. In radio, we call it negative space — but it's never empty.

AMELIA: Exactly. Every pause is a decision. Every silence is architecture.

[Music fades]

AMELIA: Let's begin.`

export function EpisodePage() {
  const { id } = useParams<{ id: string }>()
  const episode = episodes.find((ep) => ep.id === id)
  const [copied, setCopied] = useState(false)
  const { scrollYProgress } = useScroll()
  const readProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(t)
    }
  }, [copied])

  if (!episode) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6">
        <h1 className="font-serif text-4xl text-bronze">Episode not found</h1>
        <Link to="/" className="mt-6 text-sm uppercase tracking-widest text-bronze-muted" onClick={(e) => onMorphNavigate(e, 'link')}>
          ← Back home
        </Link>
      </div>
    )
  }

  const related = episodes.filter((e) => e.id !== episode.id).slice(0, 3)
  const chapters = episode.chapters ?? DEFAULT_CHAPTERS
  const transcript = episode.transcript ?? DEFAULT_TRANSCRIPT
  const pullQuote = episode.pullQuote ?? episode.description

  return (
    <div className="min-h-screen bg-cream">
      {/* Reading progress */}
      <motion.div
        className="fixed top-0 left-0 z-[60] h-0.5 origin-left bg-bronze"
        style={{ scaleX: readProgress, width: '100%' }}
      />

      {/* Hero */}
      <header className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <OptimizedImage src={episode.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bronze/80 via-bronze/30 to-transparent" />
        <div className="relative flex h-full flex-col justify-end px-6 pb-12 pt-28 md:px-12 lg:px-20">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-cream/70">
            Episode {String(episode.episodeNumber).padStart(2, '0')} · {episode.readingTime ?? '42 min listen'}
          </span>
          <EditorialReveal as="h1" className="mt-3 max-w-4xl font-serif text-4xl leading-tight text-cream md:text-6xl lg:text-7xl">
            {episode.title}
          </EditorialReveal>
          <p className="mt-4 font-mono text-xs text-cream/60">
            Published {episode.publishedAt ?? 'March 14, 2025'}
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1fr_280px] md:px-12 lg:gap-20">
        <article>
          <p className="text-lg leading-relaxed text-bronze-muted">{episode.description}</p>

          <blockquote className="my-12 border-l-2 border-bronze/30 py-2 pl-6 font-serif text-2xl italic leading-snug text-bronze md:text-3xl">
            {pullQuote}
          </blockquote>

          <CustomAudioPlayer episode={episode} chapters={chapters} className="sticky top-24 z-10 md:static" />

          {episode.authorNotes && (
            <div className="mt-12 rounded-none border border-bronze/10 bg-cream-dark/50 p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-bronze-muted">Author's note</p>
              <p className="mt-3 text-bronze-muted">{episode.authorNotes}</p>
            </div>
          )}

          <section id="transcript" className="mt-16">
            <h2 className="font-serif text-3xl text-bronze">Transcript</h2>
            <div className="mt-6 whitespace-pre-line text-sm leading-loose text-bronze-muted md:text-base">
              {transcript}
            </div>
          </section>

          <div className="mt-12 flex flex-wrap gap-4">
            <button
              type="button"
              className="border border-bronze/20 px-6 py-2.5 text-xs uppercase tracking-widest text-bronze hover:bg-bronze hover:text-cream"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href)
                setCopied(true)
              }}
            >
              {copied ? 'Link copied' : 'Share episode'}
            </button>
            <button type="button" className="border border-bronze/20 px-6 py-2.5 text-xs uppercase tracking-widest text-bronze">
              Download
            </button>
          </div>

          <section className="mt-20">
            <h2 className="font-serif text-3xl text-bronze">Related episodes</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {related.map((ep) => (
                <Link
                  key={ep.id}
                  to={`/episode/${ep.id}`}
                  className="group"
                  onClick={(e) => onMorphNavigate(e, 'card', ep.imageUrl)}
                >
                  <OptimizedImage src={ep.imageUrl} alt={ep.title} className="aspect-square w-full object-cover" />
                  <p className="mt-2 font-serif text-lg text-bronze group-hover:underline">{ep.title}</p>
                </Link>
              ))}
            </div>
          </section>

          <Link to="/" className="mt-16 inline-block text-sm uppercase tracking-widest text-bronze-muted" onClick={(e) => onMorphNavigate(e, 'link')}>
            ← Back home
          </Link>
        </article>

        {/* Floating TOC */}
        <aside className="hidden md:block">
          <nav className="sticky top-28 space-y-3 border-l border-bronze/15 pl-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-bronze-muted">On this page</p>
            {['Overview', 'Listen', 'Transcript', 'Related'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm text-bronze-muted hover:text-bronze">
                {item}
              </a>
            ))}
          </nav>
        </aside>
      </main>
    </div>
  )
}
