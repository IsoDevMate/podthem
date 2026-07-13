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
    <main>
      <Hero {...defaultHero} />
      <AsHeardOn logos={placeholderLogos} />
      <EpisodeWaterfall />
      <HorizontalGallery items={galleryItems} />
      <HostSection {...hostContent} />
      <CategoriesSection categories={categories} />
      <ManifestoSection text={MANIFESTO_TEXT} />
      <RevealingFooter
        podcastName={PODCAST_NAME}
        navLinks={[
          { label: 'Episodes', href: '#episodes' },
          { label: 'Gallery', href: '#gallery' },
          { label: 'Host', href: '#host' },
          { label: 'Topics', href: '#topics' },
          { label: 'Manifesto', href: '#manifesto' },
        ]}
        socialLinks={[
          { label: 'Spotify', href: '#' },
          { label: 'Apple', href: '#' },
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
