import { Hero } from '@/components/sections/Hero'
import { AsHeardOn } from '@/components/sections/AsHeardOn'
import { EpisodeWaterfall } from '@/components/EpisodeWaterfall'
import { HorizontalGallery } from '@/components/sections/HorizontalGallery'
import { HostSection } from '@/components/sections/HostSection'
import { CategoriesSection } from '@/components/sections/CategoriesSection'
import { ManifestoSection } from '@/components/ManifestoSection'
import { RevealingFooter } from '@/components/RevealingFooter'
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
      <Hero {...defaultHero} />
      <AsHeardOn logos={placeholderLogos} />
      <EpisodeWaterfall />
      <HorizontalGallery items={galleryItems} />
      <HostSection {...hostContent} />
      <CategoriesSection categories={categories} />
      <ManifestoSection text={MANIFESTO_TEXT} />
      <RevealingFooter
        podcastName={PODCAST_NAME}
        tagline="Stories are never finished."
        newsletterHeading="Your inbox deserves slower stories."
        navLinks={[
          { label: 'Episodes', href: '#episodes' },
          { label: 'Gallery', href: '#gallery' },
          { label: 'Host', href: '#host' },
          { label: 'Topics', href: '#topics' },
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
