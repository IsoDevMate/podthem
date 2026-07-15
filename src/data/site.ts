import type { NavLink } from '@/components/sections/Nav'
import type { HeroProps } from '@/components/sections/Hero'
import { episodes } from '@/data/episodes'

/** Podcast studio b-roll — warm, cinematic recording atmosphere */
export const PODCAST_HERO_VIDEO =
  'https://cdn.coverr.co/videos/coverr-a-man-recording-a-podcast-4695/1080p.mp4'

export const PODCAST_HERO_POSTER =
  'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1920&q=80'

/** Demo audio — replace with your own files in /public/audio/ */
export const DEMO_AUDIO =
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

export const defaultNavLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Episodes', href: '/episodes' },
  { label: 'Events', href: '/events' },
  { label: 'Merch', href: '/merch' },
  { label: 'About', href: '/about' },
]

export const defaultHero: HeroProps = {
  headline: ['Stories worth', 'slowing down for.'],
  subheadline:
    'A premium audio series exploring craft, culture, and the textures of everyday life — recorded in our studio in Copenhagen.',
  ctaLabel: 'Listen — Now',
  ctaHref: '#episodes',
  backgroundSrc: PODCAST_HERO_VIDEO,
  posterSrc: PODCAST_HERO_POSTER,
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

export const aboutContent = {
  label: 'About the Podcast',
  headline: 'Audio as architecture.',
  mission:
    'Podthem exists for listeners who treat attention as a gift. We publish long-form conversations, field recordings, and essays in sound — each episode designed to be heard once, remembered forever.',
  philosophy:
    'We reject the algorithmic rush. Every release is edited with the patience of print journalism and the warmth of late-night radio.',
  audience:
    'Our listeners are designers, writers, makers, and anyone who believes that slowing down is not retreating — it is choosing depth over noise.',
  stats: [
    { value: '6', label: 'Seasons planned' },
    { value: '48k+', label: 'Monthly listeners' },
    { value: '127', label: 'Countries reached' },
    { value: '2019', label: 'Founded' },
  ],
}

export const hostContent = {
  name: 'Amelia Voss',
  role: 'Host & Executive Producer',
  portrait:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1400&q=80',
  bio: [
    'Amelia has spent a decade collecting quiet stories — from field recordings in Lisbon to late-night interviews in Copenhagen.',
    'She believes audio is architecture: every pause a load-bearing wall, every breath a doorway.',
    'Before Podthem, she produced documentaries for NPR and BBC Radio 4. Her favourite microphone is a Neumann U87 passed down from her mentor.',
  ],
  signature: '— A.V.',
  quote:
    '"I don\'t interview guests — I build rooms for them to speak inside."',
  equipment: ['Neumann U87', 'Sound Devices MixPre-6', 'Pro Tools', 'Hindenburg Pro'],
  favouriteEpisodes: ['ep-01', 'ep-03', 'ep-06'],
}

export const teamMembers = [
  {
    id: 'producer',
    name: 'Marcus Chen',
    role: 'Producer',
    bio: 'Former radio journalist. Obsessed with narrative structure and the perfect cold open.',
    portrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    social: { twitter: '#', instagram: '#' },
  },
  {
    id: 'engineer',
    name: 'Sofia Lindström',
    role: 'Audio Engineer',
    bio: 'Mastering engineer by day, vinyl collector by night. Makes every episode feel tactile.',
    portrait: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: 'creative',
    name: 'James Okonkwo',
    role: 'Creative Director',
    bio: 'Designs the visual language of Podthem — from episode art to this very website.',
    portrait: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    social: { instagram: '#', behance: '#' },
  },
  {
    id: 'research',
    name: 'Elena Vasquez',
    role: 'Research',
    bio: 'Finds the stories nobody else is telling. Reads twelve newspapers before breakfast.',
    portrait: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80',
    social: { twitter: '#' },
  },
  {
    id: 'editor',
    name: 'Tomás Rivera',
    role: 'Editor',
    bio: 'Cuts 4-hour recordings into 45-minute journeys. Every second earns its place.',
    portrait: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    social: { linkedin: '#' },
  },
  {
    id: 'photo',
    name: 'Yuki Tanaka',
    role: 'Photographer',
    bio: 'Captures the studio, the road, and the quiet moments between takes.',
    portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
    social: { instagram: '#' },
  },
]

export const behindScenesPhotos = [
  {
    id: 'bts-1',
    title: 'Studio at dawn',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ceea?w=900&q=80',
  },
  {
    id: 'bts-2',
    title: 'Mic check',
    imageUrl: 'https://images.unsplash.com/photo-1485579149621-3123dd97980f?w=900&q=80',
  },
  {
    id: 'bts-3',
    title: 'Editing suite',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=900&q=80',
  },
  {
    id: 'bts-4',
    title: 'Coffee ritual',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80',
  },
  {
    id: 'bts-5',
    title: 'Field recording',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&q=80',
  },
  {
    id: 'bts-6',
    title: 'Notes & scripts',
    imageUrl: 'https://images.unsplash.com/photo-1589903308904-0e09654a379d?w=900&q=80',
  },
]

export const timelineEvents = [
  { year: '2019', title: 'Founded in Copenhagen', description: 'First episode recorded in a closet with borrowed gear.' },
  { year: '2020', title: 'Studio built', description: 'Custom acoustic treatment, Neumann mic, proper mixing desk.' },
  { year: '2021', title: '10k listeners', description: 'Featured on Apple Podcasts "New & Noteworthy".' },
  { year: '2022', title: 'Webby nomination', description: 'Best Individual Episode — "Midnight Field Recordings".' },
  { year: '2023', title: 'Live tour', description: 'Recorded episodes in Berlin, Tokyo, and New York.' },
  { year: '2024', title: 'Season 6', description: 'Expanded team, new studio, bigger stories.' },
  { year: '2025', title: 'Community launch', description: 'Discord, newsletter, and listener events worldwide.' },
]

export const featuredGuests = [
  {
    id: 'guest-1',
    name: 'Dr. Elena Morales',
    title: 'Architectural Acoustician',
    quote: 'Silence is not empty — it is full of answers.',
    portrait: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    episodeId: 'ep-01',
  },
  {
    id: 'guest-2',
    name: 'Kai Nakamura',
    title: 'Mastering Engineer',
    quote: 'Every waveform tells you how it wants to be shaped.',
    portrait: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
    episodeId: 'ep-02',
  },
  {
    id: 'guest-3',
    name: 'Rosa Mendez',
    title: 'Field Recordist',
    quote: 'The city speaks at 3am if you know how to listen.',
    portrait: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    episodeId: 'ep-03',
  },
]

export const testimonials = [
  {
    id: 't-1',
    quote: 'The most beautifully produced podcast I have ever heard. Every episode feels like opening a letter.',
    author: 'Sarah K.',
    role: 'Design Director, Kinfolk',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    id: 't-2',
    quote: 'Podthem changed how I think about audio. This is not background noise — it demands your full attention.',
    author: 'David L.',
    role: 'Writer, The Atlantic',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    id: 't-3',
    quote: 'Award-worthy production. The pacing, the sound design, the intimacy — nothing else comes close.',
    author: 'Maya R.',
    role: 'Podcast Critic',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
]

export const faqItems = [
  {
    q: 'How often do you release episodes?',
    a: 'We publish bi-weekly, every other Thursday at 6am CET. Quality over quantity — always.',
  },
  {
    q: 'Can I suggest a guest or topic?',
    a: 'Absolutely. Email hello@podthem.com with your idea. We read every submission.',
  },
  {
    q: 'Is there a transcript for each episode?',
    a: 'Yes. Full transcripts are available on every episode detail page, usually within 48 hours of release.',
  },
  {
    q: 'Do you accept sponsorships?',
    a: 'We work with a small number of aligned brands. See our Contact page for media kit and rates.',
  },
  {
    q: 'Where can I listen?',
    a: 'Spotify, Apple Podcasts, YouTube, and our website. Links in the footer.',
  },
]

export const communityStats = [
  { value: '12.4k', label: 'Newsletter subscribers' },
  { value: '3.2k', label: 'Discord members' },
  { value: '48k', label: 'Monthly listeners' },
  { value: '4.9', label: 'Average rating' },
]

export const categories = [
  {
    id: 'craft',
    label: 'Craft',
    blurb: 'How stories get built — editing, structure, and the patience behind the cut.',
    preview: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80',
  },
  {
    id: 'culture',
    label: 'Culture',
    blurb: 'Cities, rituals, and the textures of everyday life recorded in the field.',
    preview: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80',
  },
  {
    id: 'sound',
    label: 'Sound Design',
    blurb: 'Mic technique, mastering, and the architecture of silence.',
    preview: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=80',
  },
  {
    id: 'letters',
    label: 'Letters',
    blurb: 'Listener correspondence — voicemails, notes, and the feedback loop.',
    preview: 'https://images.unsplash.com/photo-1589903308904-0e09654a379d?w=600&q=80',
  },
]

export const contactInfo = {
  email: 'hello@podthem.com',
  booking: 'booking@podthem.com',
  press: 'press@podthem.com',
  sponsors: 'partners@podthem.com',
  address: 'Studio 4, Vesterbrogade 12, 1620 Copenhagen, Denmark',
}
