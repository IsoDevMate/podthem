export interface EpisodeChapter {
  title: string
  startSeconds: number
}

export interface Episode {
  id: string
  episodeNumber: number
  title: string
  description: string
  audioUrl: string
  imageUrl: string
  publishedAt?: string
  readingTime?: string
  transcript?: string
  pullQuote?: string
  chapters?: EpisodeChapter[]
  authorNotes?: string
  /** Category ids: craft | culture | sound | letters */
  topics?: string[]
}

export interface UpcomingEpisode {
  guest: string
  guestTitle?: string
  topic: string
  startsAt: string
  timezoneLabel: string
  notifyHref?: string
}
