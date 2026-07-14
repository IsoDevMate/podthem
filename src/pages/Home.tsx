import { Hero } from '@/components/sections/Hero'
import { AsHeardOn } from '@/components/sections/AsHeardOn'
import { AboutSection } from '@/components/sections/AboutSection'
import { EpisodeWaterfall } from '@/components/EpisodeWaterfall'
import { HorizontalGallery } from '@/components/sections/HorizontalGallery'
import { HostSection } from '@/components/sections/HostSection'
import { TeamSection } from '@/components/sections/TeamSection'
import { BehindScenesSection } from '@/components/sections/BehindScenesSection'
import { TimelineSection } from '@/components/sections/TimelineSection'
import { FeaturedGuestsSection } from '@/components/sections/FeaturedGuestsSection'
import { CategoriesSection } from '@/components/sections/CategoriesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ManifestoSection } from '@/components/ManifestoSection'
import { CommunitySection, FAQSection } from '@/components/sections/CommunityFAQ'
import { RevealingFooter } from '@/components/RevealingFooter'
import { HashScrollHandler } from '@/motion/HashScrollHandler'
import { MANIFESTO_TEXT, PODCAST_NAME } from '@/data/episodes'
import {
  categories,
  defaultHero,
  galleryItems,
  hostContent,
  placeholderLogos,
} from '@/data/site'

export function Home() {
  return (
    <main className="relative bg-[#f6f0e4]">
      <HashScrollHandler />
      <Hero {...defaultHero} />
      <AsHeardOn logos={placeholderLogos} />
      <AboutSection />
      <EpisodeWaterfall />
      <HorizontalGallery items={galleryItems} />
      <HostSection {...hostContent} />
      <TeamSection />
      <BehindScenesSection />
      <TimelineSection />
      <FeaturedGuestsSection />
      <CategoriesSection categories={categories} />
      <TestimonialsSection />
      <ManifestoSection text={MANIFESTO_TEXT} />
      <CommunitySection />
      <FAQSection />
      <RevealingFooter
        podcastName={PODCAST_NAME}
        tagline="Stories are never finished."
        newsletterHeading="Your inbox deserves slower stories."
        navLinks={[
          { label: 'About', href: '/about' },
          { label: 'Episodes', href: '#episodes' },
          { label: 'Team', href: '/team' },
          { label: 'Contact', href: '/contact' },
          { label: 'Manifesto', href: '#manifesto' },
        ]}
        socialLinks={[
          { label: 'Spotify', href: '#' },
          { label: 'Apple Podcasts', href: '#' },
          { label: 'YouTube', href: '#' },
          { label: 'Instagram', href: '#' },
        ]}
        legalLinks={[
          { label: 'Press Kit', href: '#' },
          { label: 'Terms', href: '#' },
          { label: 'Privacy', href: '#' },
        ]}
        contactEmail="hello@podthem.com"
      />
    </main>
  )
}
