import type { Episode } from '@/types/episode'

export const PODCAST_NAME = 'Podthem'

export const episodes: Episode[] = [
  {
    id: 'ep-01',
    episodeNumber: 1,
    title: 'The Architecture of Silence',
    description:
      'How negative space shapes narrative. A conversation on restraint, pacing, and the power of what you leave unsaid in long-form audio.',
    audioUrl: '/audio/ep-01.mp3',
    imageUrl:
      'https://images.unsplash.com/photo-1478737270239-2f02ca77fc66?w=800&q=80',
  },
  {
    id: 'ep-02',
    episodeNumber: 2,
    title: 'Velvet Frequencies',
    description:
      'Inside the studio with a mastering engineer who treats every waveform like a sculpture — warm, tactile, and impossibly precise.',
    audioUrl: '/audio/ep-02.mp3',
    imageUrl:
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
  },
  {
    id: 'ep-03',
    episodeNumber: 3,
    title: 'Midnight Field Recordings',
    description:
      'Capturing the city after dark: rain on cobblestones, distant trains, and the hum of a world that refuses to sleep.',
    audioUrl: '/audio/ep-03.mp3',
    imageUrl:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80',
  },
  {
    id: 'ep-04',
    episodeNumber: 4,
    title: 'The Guest Who Never Arrived',
    description:
      'A meta-episode about absence — what happens when the interviewee cancels, and the story writes itself anyway.',
    audioUrl: '/audio/ep-04.mp3',
    imageUrl:
      'https://images.unsplash.com/photo-1589903308904-0e09654a379d?w=800&q=80',
  },
  {
    id: 'ep-05',
    episodeNumber: 5,
    title: 'Analog Warmth in a Digital Age',
    description:
      'Vinyl collectors, tape hiss enthusiasts, and the enduring romance of imperfection in pristine production.',
    audioUrl: '/audio/ep-05.mp3',
    imageUrl:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
  },
  {
    id: 'ep-06',
    episodeNumber: 6,
    title: 'Letters From Listeners',
    description:
      'Voicemails, handwritten notes, and the intimate feedback loop that turns a broadcast into a correspondence.',
    audioUrl: '/audio/ep-06.mp3',
    imageUrl:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
  },
]

export const MANIFESTO_TEXT =
  'We believe stories should feel like silk against skin — slow, deliberate, and impossible to rush. Every episode is crafted with the patience of a letter written by candlelight. This is not background noise. This is the foreground of your attention.'
