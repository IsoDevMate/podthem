import { Link } from 'react-router-dom'
import { FAQSection } from '@/components/sections/CommunityFAQ'
import { EditorialReveal } from '@/components/shared/EditorialReveal'
import { onMorphNavigate } from '@/motion/morphNavigation'

export function FAQPage() {
  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-28">
      <div className="mx-auto max-w-4xl px-6 pb-8 md:px-12">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
          Help
        </span>
        <EditorialReveal
          as="h1"
          className="mt-3 font-hand text-5xl font-semibold tracking-tight text-bronze md:text-7xl"
        >
          FAQ
        </EditorialReveal>
        <p className="mt-4 max-w-xl text-bronze-muted">
          Straight answers about releases, listening, sponsorships, and how to reach us.
        </p>
      </div>
      <FAQSection />
      <div className="mx-auto max-w-4xl px-6 pb-24 md:px-12">
        <Link
          to="/contact"
          className="inline-block text-sm uppercase tracking-widest text-bronze-muted"
          onClick={(e) => onMorphNavigate(e, 'link')}
        >
          Still stuck? Contact us →
        </Link>
      </div>
    </main>
  )
}
