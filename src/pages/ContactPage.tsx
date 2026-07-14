import { Link } from 'react-router-dom'
import { contactInfo } from '@/data/site'
import { EditorialReveal } from '@/components/shared/EditorialReveal'
import { Button } from '@/components/ui/button'
import { onMorphNavigate } from '@/motion/morphNavigation'

export function ContactPage() {
  const channels = [
    { label: 'General enquiries', email: contactInfo.email },
    { label: 'Booking & speaking', email: contactInfo.booking },
    { label: 'Press & media', email: contactInfo.press },
    { label: 'Sponsorships', email: contactInfo.sponsors },
  ]

  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-28">
      <div className="mx-auto max-w-3xl px-6 pb-24 md:px-12">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">Contact</span>
        <EditorialReveal as="h1" className="mt-3 font-hand text-5xl font-semibold tracking-tight text-bronze md:text-7xl">
          Let's talk
        </EditorialReveal>
        <p className="mt-6 text-lg text-bronze-muted">
          Booking, partnerships, press, or just a hello — we read every message.
        </p>

        <div className="mt-12 space-y-8">
          {channels.map((c) => (
            <div key={c.email} className="border-t border-bronze/15 pt-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-bronze-muted">{c.label}</p>
              <a href={`mailto:${c.email}`} className="mt-2 block font-hand text-2xl font-semibold text-bronze hover:underline">
                {c.email}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm text-bronze-muted">{contactInfo.address}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button>Download media kit</Button>
          <Button variant="outline">Book Amelia</Button>
        </div>

        <Link to="/" className="mt-16 inline-block text-sm uppercase tracking-widest text-bronze-muted" onClick={(e) => onMorphNavigate(e, 'link')}>
          ← Back home
        </Link>
      </div>
    </main>
  )
}
