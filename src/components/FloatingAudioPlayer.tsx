import { motion, AnimatePresence } from 'framer-motion'
import { Pause, Play, Volume2 } from 'lucide-react'
import { useAudioPlayer } from '@/motion/AudioPlayerProvider'
import { cn } from '@/lib/utils'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

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
  } = useAudioPlayer()

  if (!current) return null

  const ratio = duration > 0 ? progress / duration : 0

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          'fixed right-4 bottom-4 left-4 z-[60] md:right-8 md:bottom-6 md:left-auto md:w-[420px]',
          'rounded-2xl border border-cream/20 bg-bronze/70 text-cream shadow-2xl backdrop-blur-xl',
        )}
      >
        <div className="flex items-center gap-3 p-3 md:p-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
            <motion.img
              src={current.imageUrl}
              alt=""
              className="h-full w-full object-cover"
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                duration: 12,
                ease: 'linear',
                repeat: isPlaying ? Infinity : 0,
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-sm md:text-base">
              {current.title}
            </p>
            <p className="font-mono text-[10px] tracking-widest text-cream/50">
              EP {String(current.episodeNumber).padStart(2, '0')}
            </p>

            {/* Waveform bars */}
            <div className="mt-2 flex h-3 items-end gap-[2px]" aria-hidden>
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-sm bg-cream/50"
                  animate={
                    isPlaying
                      ? {
                          height: [
                            4 + (i % 5),
                            10 + ((i * 3) % 8),
                            4 + (i % 4),
                          ],
                        }
                      : { height: 4 + (i % 3) }
                  }
                  transition={{
                    duration: 0.6 + (i % 5) * 0.1,
                    repeat: isPlaying ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Progress */}
            <button
              type="button"
              className="mt-2 block h-1 w-full overflow-hidden rounded-full bg-cream/20"
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
            <div className="mt-1 flex justify-between font-mono text-[9px] text-cream/40">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <motion.button
              type="button"
              onClick={toggle}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-bronze"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={16} fill="currentColor" />
              ) : (
                <Play size={16} fill="currentColor" className="ml-0.5" />
              )}
            </motion.button>
            <div className="hidden items-center gap-1 md:flex">
              <Volume2 size={12} className="text-cream/50" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-14 accent-cream"
                aria-label="Volume"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
