import { Link } from 'react-router-dom'
import { teamMembers } from '@/data/site'
import { EditorialReveal } from '@/components/shared/EditorialReveal'
import { OptimizedImage } from '@/components/shared/OptimizedImage'
import { onMorphNavigate } from '@/motion/morphNavigation'

export function TeamPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#ebe3d2] to-[#f6f0e4] pt-24 md:pt-28">
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">The Team</span>
        <EditorialReveal as="h1" className="mt-3 font-serif text-5xl text-bronze md:text-7xl">
          People behind Podthem
        </EditorialReveal>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((m) => (
            <article key={m.id}>
              <OptimizedImage src={m.portrait} alt={m.name} className="aspect-[4/5] w-full object-cover" />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-bronze-muted">{m.role}</p>
              <h2 className="mt-1 font-serif text-2xl text-bronze">{m.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-bronze-muted">{m.bio}</p>
            </article>
          ))}
        </div>

        <Link to="/" className="mt-16 inline-block text-sm uppercase tracking-widest text-bronze-muted" onClick={(e) => onMorphNavigate(e, 'link')}>
          ← Back home
        </Link>
      </div>
    </main>
  )
}
