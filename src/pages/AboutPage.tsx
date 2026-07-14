import { Link } from 'react-router-dom'
import { aboutContent, hostContent } from '@/data/site'
import { EditorialReveal } from '@/components/shared/EditorialReveal'
import { OptimizedImage } from '@/components/shared/OptimizedImage'
import { onMorphNavigate } from '@/motion/morphNavigation'

export function AboutPage() {
  const { label, headline, mission, philosophy, audience, stats } = aboutContent

  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-28">
      <div className="mx-auto max-w-4xl px-6 pb-24 md:px-12">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">{label}</span>
        <EditorialReveal as="h1" className="mt-3 font-serif text-5xl text-bronze md:text-7xl">
          {headline}
        </EditorialReveal>
        <div className="mt-10 space-y-6 text-lg leading-relaxed text-bronze-muted">
          <p>{mission}</p>
          <p>{philosophy}</p>
          <p>{audience}</p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-4xl text-bronze">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-bronze-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <section className="mt-20 border-t border-bronze/15 pt-16">
          <h2 className="font-serif text-3xl text-bronze">Meet the host</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <OptimizedImage src={hostContent.portrait} alt={hostContent.name} className="aspect-[3/4] w-full object-cover" />
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-bronze-muted">{hostContent.role}</p>
              <h3 className="mt-2 font-serif text-4xl text-bronze">{hostContent.name}</h3>
              {hostContent.bio.map((p) => (
                <p key={p.slice(0, 24)} className="mt-4 text-bronze-muted">{p}</p>
              ))}
              <blockquote className="mt-6 border-l-2 border-bronze/30 pl-4 font-serif text-xl italic text-bronze">
                {hostContent.quote}
              </blockquote>
            </div>
          </div>
        </section>

        <Link
          to="/"
          className="mt-16 inline-block text-sm uppercase tracking-widest text-bronze-muted"
          onClick={(e) => onMorphNavigate(e, 'link')}
        >
          ← Back home
        </Link>
      </div>
    </main>
  )
}
