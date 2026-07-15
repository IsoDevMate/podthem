import { Hero } from '@/components/sections/Hero'
import { UpcomingEpisodeStrip } from '@/components/sections/UpcomingEpisodeStrip'
import { EpisodeWaterfall } from '@/components/EpisodeWaterfall'
import { MissedEpisodesSection } from '@/components/sections/MissedEpisodesSection'
import { HorizontalGallery } from '@/components/sections/HorizontalGallery'
import { HostSection } from '@/components/sections/HostSection'
import { CategoriesSection } from '@/components/sections/CategoriesSection'
import { ManifestoSection } from '@/components/ManifestoSection'
import { HashScrollHandler } from '@/motion/HashScrollHandler'
import { MANIFESTO_TEXT, upcomingEpisode } from '@/data/episodes'
import {
  categories,
  defaultHero,
  galleryItems,
  hostContent,
} from '@/data/site'

export function Home() {
  return (
    <main className="relative overflow-x-clip bg-[#f6f0e4]">
      <HashScrollHandler />
      <Hero {...defaultHero} />
      <UpcomingEpisodeStrip upcoming={upcomingEpisode} />
      <EpisodeWaterfall label="What's new" headline="Latest episodes" />
      <MissedEpisodesSection />
      <HorizontalGallery
        items={galleryItems}
        label="What have I missed?"
        headline="Lookbook"
      />
      <HostSection {...hostContent} />
      <CategoriesSection categories={categories} label="What will I learn?" />
      <ManifestoSection text={MANIFESTO_TEXT} />
    </main>
  )
}
