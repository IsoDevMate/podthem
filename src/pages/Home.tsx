import { Hero } from '@/components/sections/Hero'
import { UpcomingEpisodeStrip } from '@/components/sections/UpcomingEpisodeStrip'
import { EpisodeWaterfall } from '@/components/EpisodeWaterfall'
import { HorizontalGallery } from '@/components/sections/HorizontalGallery'
import { HostSection } from '@/components/sections/HostSection'
import { CategoriesSection } from '@/components/sections/CategoriesSection'
import { ManifestoSection } from '@/components/ManifestoSection'
import { RevealingFooter } from '@/components/RevealingFooter'
import { HashScrollHandler } from '@/motion/HashScrollHandler'
import { MANIFESTO_TEXT, PODCAST_NAME, upcomingEpisode } from '@/data/episodes'
import {
  categories,
  defaultHero,
  galleryItems,
  hostContent,
} from '@/data/site'

export function Home() {
  return (
    <main className="relative bg-[#f6f0e4]">
      <HashScrollHandler />
      <Hero {...defaultHero} />
      <UpcomingEpisodeStrip upcoming={upcomingEpisode} />
      <EpisodeWaterfall label="What's new" headline="Latest episodes" />
      <HorizontalGallery
        items={galleryItems}
        label="What have I missed?"
        headline="Lookbook"
      />
      <HostSection {...hostContent} />
      <CategoriesSection categories={categories} label="What will I learn?" />
      <ManifestoSection text={MANIFESTO_TEXT} />
      <RevealingFooter
        podcastName={PODCAST_NAME}
        tagline="Stories are never finished."
        newsletterHeading="Your inbox deserves slower stories."
        navLinks={[
          { label: 'About', href: '/about' },
          { label: 'Episodes', href: '#episodes' },
          { label: 'Listen', href: '/listen' },
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
