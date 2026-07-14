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
import { useReducedMotion } from '@/hooks/useReducedMotion'

type SoundKind = 'paper' | 'wood' | 'cloth' | 'hover'

interface SoundApi {
  enabled: boolean
  setEnabled: (v: boolean) => void
  play: (kind: SoundKind) => void
}

const SoundCtx = createContext<SoundApi | null>(null)

export function useSound() {
  const ctx = useContext(SoundCtx)
  if (!ctx) throw new Error('useSound requires SoundProvider')
  return ctx
}

/** Extremely subtle procedural UI sounds via Web Audio — no asset pack required */
export function SoundProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (reduced) return
    const unlock = () => {
      if (!ctxRef.current) {
        ctxRef.current = new AudioContext()
      }
      void ctxRef.current.resume()
      setEnabled(true)
      window.removeEventListener('pointerdown', unlock)
    }
    window.addEventListener('pointerdown', unlock, { once: true })
    return () => window.removeEventListener('pointerdown', unlock)
  }, [reduced])

  const play = useCallback(
    (kind: SoundKind) => {
      if (!enabled || reduced) return
      const ctx = ctxRef.current
      if (!ctx) return

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      filter.type = 'lowpass'

      if (kind === 'paper') {
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(420, now)
        filter.frequency.value = 900
        gain.gain.setValueAtTime(0.0001, now)
        gain.gain.exponentialRampToValueAtTime(0.012, now + 0.01)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08)
        osc.start(now)
        osc.stop(now + 0.09)
      } else if (kind === 'wood') {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(180, now)
        filter.frequency.value = 600
        gain.gain.setValueAtTime(0.0001, now)
        gain.gain.exponentialRampToValueAtTime(0.02, now + 0.008)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)
        osc.start(now)
        osc.stop(now + 0.13)
      } else if (kind === 'cloth') {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(90, now)
        filter.frequency.value = 300
        gain.gain.setValueAtTime(0.0001, now)
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2)
        osc.start(now)
        osc.stop(now + 0.22)
      } else {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(640, now)
        filter.frequency.value = 1200
        gain.gain.setValueAtTime(0.0001, now)
        gain.gain.exponentialRampToValueAtTime(0.008, now + 0.006)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05)
        osc.start(now)
        osc.stop(now + 0.06)
      }
    },
    [enabled, reduced],
  )

  const value = useMemo(
    () => ({ enabled, setEnabled, play }),
    [enabled, play],
  )

  return <SoundCtx.Provider value={value}>{children}</SoundCtx.Provider>
}

export function SoundToggle() {
  const { enabled, setEnabled } = useSound()
  return (
    <button
      type="button"
      onClick={() => setEnabled(!enabled)}
      className="fixed bottom-4 left-4 z-[70] hidden font-mono text-[10px] uppercase tracking-[0.25em] text-bronze/40 transition-colors hover:text-bronze md:block"
      aria-label={enabled ? 'Mute UI sounds' : 'Enable UI sounds'}
    >
      {enabled ? 'Sound on' : 'Sound'}
    </button>
  )
}
