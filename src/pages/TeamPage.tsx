import { Link } from 'react-router-dom'
import { teamMembers } from '@/data/site'
import { EditorialReveal } from '@/components/shared/EditorialReveal'
import { HostPortraitReveal } from '@/components/shared/HostPortraitReveal'
import { onMorphNavigate } from '@/motion/morphNavigation'

export function TeamPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#ebe3d2] to-[#f6f0e4] pt-24 md:pt-28">
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
          The Team
        </span>
        <EditorialReveal
          as="h1"
          className="mt-3 font-hand text-5xl font-semibold tracking-tight text-bronze md:text-7xl"
        >
          People behind Podthem
        </EditorialReveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((m) => (
            <HostPortraitReveal
              key={m.id}
              name={m.name}
              role={m.role}
              portrait={m.portrait}
              description={m.bio}
              profileHref="/team"
              episodesHref="/episodes"
              className="max-w-none"
            />
          ))}
        </div>

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
