import type { Episode, UpcomingEpisode } from '@/types/episode'

export const PODCAST_NAME = 'Podthem'

const DEMO_AUDIO = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

/** Next recording — fills “Who’s next?” without replacing existing episode UI */
export const upcomingEpisode: UpcomingEpisode = {
  guest: 'Dr. Jane Smith',
  guestTitle: 'AI Researcher',
  topic: 'AI in Africa',
  startsAt: '2026-07-18T20:00:00+03:00',
  timezoneLabel: 'EAT',
  notifyHref: '#community',
}

/** Topic ids match homepage Categories (Craft, Culture, Sound Design, Letters) */
export const episodes: Episode[] = [
  {
    id: 'ep-01',
    episodeNumber: 1,
    title: 'The Architecture of Silence',
    description:
      'How negative space shapes narrative. A conversation on restraint, pacing, and the power of what you leave unsaid in long-form audio.',
    audioUrl: DEMO_AUDIO,
    imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02ca77fc66?w=800&q=80',
    publishedAt: 'January 9, 2025',
    readingTime: '38 min listen',
    pullQuote: 'Silence is not empty — it is full of answers.',
    authorNotes:
      'This episode began as a failed interview. The guest cancelled. What emerged was something more honest.',
    topics: ['craft', 'sound'],
  },
  {
    id: 'ep-02',
    episodeNumber: 2,
    title: 'Velvet Frequencies',
    description:
      'Inside the studio with a mastering engineer who treats every waveform like a sculpture — warm, tactile, and impossibly precise.',
    audioUrl: DEMO_AUDIO,
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
    publishedAt: 'January 23, 2025',
    readingTime: '44 min listen',
    pullQuote: 'Every waveform tells you how it wants to be shaped.',
    topics: ['sound', 'craft'],
  },
  {
    id: 'ep-03',
    episodeNumber: 3,
    title: 'Midnight Field Recordings',
    description:
      'Capturing the city after dark: rain on cobblestones, distant trains, and the hum of a world that refuses to sleep.',
    audioUrl: DEMO_AUDIO,
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80',
    publishedAt: 'February 6, 2025',
    readingTime: '52 min listen',
    pullQuote: 'The city speaks at 3am if you know how to listen.',
    topics: ['culture', 'sound'],
  },
  {
    id: 'ep-04',
    episodeNumber: 4,
    title: 'The Guest Who Never Arrived',
    description:
      'A meta-episode about absence — what happens when the interviewee cancels, and the story writes itself anyway.',
    audioUrl: DEMO_AUDIO,
    imageUrl: 'https://images.unsplash.com/photo-1589903308904-0e09654a379d?w=800&q=80',
    publishedAt: 'February 20, 2025',
    readingTime: '36 min listen',
    topics: ['craft', 'letters'],
  },
  {
    id: 'ep-05',
    episodeNumber: 5,
    title: 'Analog Warmth in a Digital Age',
    description:
      'Vinyl collectors, tape hiss enthusiasts, and the enduring romance of imperfection in pristine production.',
    audioUrl: DEMO_AUDIO,
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    publishedAt: 'March 6, 2025',
    readingTime: '41 min listen',
    topics: ['craft', 'culture'],
  },
  {
    id: 'ep-06',
    episodeNumber: 6,
    title: 'Letters From Listeners',
    description:
      'Voicemails, handwritten notes, and the intimate feedback loop that turns a broadcast into a correspondence.',
    audioUrl: DEMO_AUDIO,
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
    publishedAt: 'March 20, 2025',
    readingTime: '47 min listen',
    topics: ['letters', 'culture'],
  },
]

export const MANIFESTO_TEXT =
  'We believe stories should feel like silk against skin — slow, deliberate, and impossible to rush. Every episode is crafted with the patience of a letter written by candlelight. This is not background noise. This is the foreground of your attention.'
