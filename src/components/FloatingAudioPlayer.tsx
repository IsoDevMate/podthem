import { motion, AnimatePresence } from 'framer-motion'
import { Pause, Play, Volume2, X } from 'lucide-react'
import { useAudioPlayer } from '@/motion/AudioPlayerProvider'
import { OptimizedImage } from '@/components/shared/OptimizedImage'
import { cn } from '@/lib/utils'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

/** Bottom mini-player — thumb-reachable, Spotify-style dock */
export function FloatingAudioPlayer() {
  const {
    current,
    isPlaying,
    progress,
    duration,
    toggle,
    seek,
    volume,
    setVolume,
    stop,
  } = useAudioPlayer()

  if (!current) return null

  const ratio = duration > 0 ? progress / duration : 0

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed inset-x-0 bottom-0 z-[60]',
          'border-t border-cream/15 bg-bronze/90 text-cream shadow-[0_-12px_40px_rgba(26,21,16,0.35)] backdrop-blur-xl',
          'pb-[max(0.5rem,env(safe-area-inset-bottom))]',
        )}
      >
        {/* Seek strip */}
        <button
          type="button"
          className="block h-1 w-full overflow-hidden bg-cream/15"
          aria-label="Seek"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            seek((e.clientX - rect.left) / rect.width)
          }}
        >
          <motion.div
            className="h-full origin-left bg-cream"
            style={{ scaleX: ratio }}
          />
        </button>

        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:gap-4 md:px-8">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-bronze/40 md:h-14 md:w-14">
            <OptimizedImage
              src={current.imageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate font-hand text-lg font-semibold leading-tight md:text-xl">
              {current.title}
            </p>
            <p className="font-mono text-[10px] tracking-widest text-cream/50">
              EP {String(current.episodeNumber).padStart(2, '0')} · {formatTime(progress)} /{' '}
              {formatTime(duration)}
            </p>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Volume2 size={14} className="text-cream/50" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-20 accent-cream"
              aria-label="Volume"
            />
          </div>

          <motion.button
            type="button"
            onClick={toggle}
            whileTap={{ scale: 0.92 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-bronze"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" className="ml-0.5" />
            )}
          </motion.button>

          <button
            type="button"
            onClick={stop}
            className="flex h-10 w-10 items-center justify-center text-cream/45 transition-colors hover:text-cream"
            aria-label="Close player"
          >
            <X size={18} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
