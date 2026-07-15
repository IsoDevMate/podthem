import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { Episode } from '@/types/episode'

interface AudioContextValue {
  current: Episode | null
  isPlaying: boolean
  progress: number
  duration: number
  playEpisode: (episode: Episode) => void
  toggle: () => void
  seek: (ratio: number) => void
  setVolume: (v: number) => void
  volume: number
  stop: () => void
}

const AudioCtx = createContext<AudioContextValue | null>(null)

export function useAudioPlayer() {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error('useAudioPlayer must be used within AudioPlayerProvider')
  return ctx
}

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [current, setCurrent] = useState<Episode | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.85)

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'metadata'
    audio.volume = volume
    audioRef.current = audio

    const onTime = () => setProgress(audio.currentTime)
    const onMeta = () => setDuration(audio.duration || 0)
    const onEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnded)
      audioRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const playEpisode = useCallback((episode: Episode) => {
    const audio = audioRef.current
    if (!audio) return
    if (current?.id !== episode.id) {
      audio.src = episode.audioUrl
      setCurrent(episode)
      setProgress(0)
    }
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Demo audio paths may 404 — still show player UI as playing
        setIsPlaying(true)
      })
  }, [current?.id])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !current) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      if (!audio.src) audio.src = current.audioUrl
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(true))
    }
  }, [current, isPlaying])

  const seek = useCallback(
    (ratio: number) => {
      const audio = audioRef.current
      if (!audio || !duration) return
      audio.currentTime = ratio * duration
      setProgress(audio.currentTime)
    },
    [duration],
  )

  const setVolume = useCallback((v: number) => {
    const clamped = Math.min(1, Math.max(0, v))
    setVolumeState(clamped)
    if (audioRef.current) audioRef.current.volume = clamped
  }, [])

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
    setIsPlaying(false)
    setCurrent(null)
    setProgress(0)
    setDuration(0)
  }, [])

  const value = useMemo(
    () => ({
      current,
      isPlaying,
      progress,
      duration,
      playEpisode,
      toggle,
      seek,
      setVolume,
      volume,
      stop,
    }),
    [
      current,
      isPlaying,
      progress,
      duration,
      playEpisode,
      toggle,
      seek,
      setVolume,
      volume,
      stop,
    ],
  )

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>
}
