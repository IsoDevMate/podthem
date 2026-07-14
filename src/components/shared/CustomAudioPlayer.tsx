import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pause, Play, SkipBack, SkipForward, Gauge } from 'lucide-react'
import type { Episode, EpisodeChapter } from '@/types/episode'
import { useAudioPlayer } from '@/motion/AudioPlayerProvider'
import { OptimizedImage } from '@/components/shared/OptimizedImage'
import { cn } from '@/lib/utils'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 2]

export interface CustomAudioPlayerProps {
  episode: Episode
  chapters?: EpisodeChapter[]
  className?: string
}

export function CustomAudioPlayer({ episode, chapters, className }: CustomAudioPlayerProps) {
  const { isPlaying, progress, duration, toggle, seek, playEpisode, current } = useAudioPlayer()
  const [speedIdx, setSpeedIdx] = useState(1)
  const active = current?.id === episode.id
  const ratio = duration > 0 ? progress / duration : 0

  const handlePlay = () => {
    if (!active) playEpisode(episode)
    else toggle()
  }

  return (
    <div className={cn('rounded-none border border-bronze/15 bg-cream-dark/80 p-6 backdrop-blur-sm md:p-8', className)}>
      <div className="flex items-start gap-5">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden shadow-lg">
          <OptimizedImage src={episode.imageUrl} alt={episode.title} className="h-full w-full object-cover" />
          <motion.div
            className="absolute inset-0 bg-bronze/20"
            animate={{ opacity: isPlaying && active ? [0.2, 0.05, 0.2] : 0.2 }}
            transition={{ duration: 2, repeat: isPlaying && active ? Infinity : 0 }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-hand text-lg font-semibold text-bronze">{episode.title}</p>
          <p className="font-mono text-[10px] tracking-widest text-bronze-muted">
            EP {String(episode.episodeNumber).padStart(2, '0')}
          </p>

          {/* Waveform */}
          <div className="mt-4 flex h-8 items-end gap-[2px]" aria-hidden>
            {Array.from({ length: 48 }).map((_, i) => {
              const played = i / 48 <= ratio
              return (
                <motion.span
                  key={i}
                  className={cn('w-[3px] rounded-sm', played ? 'bg-bronze' : 'bg-bronze/20')}
                  animate={
                    isPlaying && active
                      ? { height: [4 + (i % 6), 8 + ((i * 2) % 12), 4 + (i % 5)] }
                      : { height: 4 + (i % 4) }
                  }
                  transition={{ duration: 0.5 + (i % 7) * 0.08, repeat: isPlaying && active ? Infinity : 0 }}
                />
              )
            })}
          </div>

          <button
            type="button"
            className="mt-3 block h-1.5 w-full overflow-hidden rounded-full bg-bronze/15"
            aria-label="Seek"
            onClick={(e) => {
              if (!active) playEpisode(episode)
              const rect = e.currentTarget.getBoundingClientRect()
              seek((e.clientX - rect.left) / rect.width)
            }}
          >
            <motion.div className="h-full origin-left bg-bronze" style={{ scaleX: active ? ratio : 0 }} />
          </button>

          <div className="mt-2 flex justify-between font-mono text-[10px] text-bronze-muted">
            <span>{formatTime(active ? progress : 0)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <motion.button
          type="button"
          onClick={handlePlay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-bronze text-cream"
          aria-label={isPlaying && active ? 'Pause' : 'Play'}
        >
          {isPlaying && active ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
        </motion.button>

        <button type="button" className="text-bronze-muted hover:text-bronze" aria-label="Skip back">
          <SkipBack size={18} />
        </button>
        <button type="button" className="text-bronze-muted hover:text-bronze" aria-label="Skip forward">
          <SkipForward size={18} />
        </button>

        <button
          type="button"
          className="ml-auto flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-bronze-muted"
          onClick={() => setSpeedIdx((i) => (i + 1) % SPEEDS.length)}
        >
          <Gauge size={14} />
          {SPEEDS[speedIdx]}×
        </button>
      </div>

      {chapters && chapters.length > 0 && (
        <div className="mt-6 border-t border-bronze/10 pt-5">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-bronze-muted">Chapters</p>
          <ul className="space-y-2">
            {chapters.map((ch) => (
              <li key={ch.title}>
                <button
                  type="button"
                  className="flex w-full justify-between text-left text-sm text-bronze hover:text-bronze-muted"
                  onClick={() => {
                    if (!active) playEpisode(episode)
                    if (duration) seek(ch.startSeconds / duration)
                  }}
                >
                  <span>{ch.title}</span>
                  <span className="font-mono text-xs text-bronze-muted">{formatTime(ch.startSeconds)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
