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
}
