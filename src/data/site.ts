import type { NavLink } from '@/components/sections/Nav'
import type { HeroProps } from '@/components/sections/Hero'
import { episodes } from '@/data/episodes'

export const defaultNavLinks: NavLink[] = [
  { label: 'Episodes', href: '#episodes' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Host', href: '#host' },
  { label: 'Topics', href: '#topics' },
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Subscribe', href: '#footer' },
]

export const defaultHero: HeroProps = {
  headline: ['Stories worth', 'slowing down for.'],
  subheadline:
    'A premium audio series exploring craft, culture, and the textures of everyday life.',
  ctaLabel: 'Listen — Now',
  ctaHref: '#episodes',
}

export const placeholderLogos = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png',
    alt: 'Spotify',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Podcasts_%28iOS%29.svg/120px-Podcasts_%28iOS%29.svg.png',
    alt: 'Apple Podcasts',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/NPR_logo.svg/120px-NPR_logo.svg.png',
    alt: 'NPR',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Overcast_logo.svg/120px-Overcast_logo.svg.png',
    alt: 'Overcast',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Pocket_Casts_logo.svg/120px-Pocket_Casts_logo.svg.png',
    alt: 'Pocket Casts',
  },
]

export const galleryItems = episodes.map((ep) => ({
  id: ep.id,
  title: ep.title,
  imageUrl: ep.imageUrl,
  href: `/episode/${ep.id}`,
}))

export const hostContent = {
  name: 'Amelia Voss',
  role: 'Host & Executive Producer',
  portrait:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1400&q=80',
  bio: [
    'Amelia has spent a decade collecting quiet stories — from field recordings to late-night interviews.',
    'She believes audio is architecture: every pause a load-bearing wall, every breath a doorway.',
  ],
  signature: '— A.V.',
}

export const categories = [
  {
    id: 'craft',
    label: 'Craft',
    preview:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80',
  },
  {
    id: 'culture',
    label: 'Culture',
    preview:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80',
  },
  {
    id: 'sound',
    label: 'Sound Design',
    preview:
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=80',
  },
  {
    id: 'letters',
    label: 'Letters',
    preview:
      'https://images.unsplash.com/photo-1589903308904-0e09654a379d?w=600&q=80',
  },
]
