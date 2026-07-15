import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type CursorMode = 'full' | 'reduced' | 'off'

const STORAGE_KEY = 'podthem-cursor-mode'

function readStored(): CursorMode {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'full' || v === 'reduced' || v === 'off') return v
  } catch {
    /* ignore */
  }
  return 'full'
}

interface CursorPrefs {
  mode: CursorMode
  setMode: (mode: CursorMode) => void
  /** True when custom cursor should render */
  enabled: boolean
  /** Softer springs / less stickiness */
  reducedEffects: boolean
}

const CursorPrefsContext = createContext<CursorPrefs | null>(null)

export function CursorPrefsProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<CursorMode>(() =>
    typeof window !== 'undefined' ? readStored() : 'full',
  )
  const [systemReduced, setSystemReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setSystemReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const setMode = useCallback((next: CursorMode) => {
    setModeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo<CursorPrefs>(() => {
    const forceOff = systemReduced || mode === 'off'
    return {
      mode,
      setMode,
      enabled: !forceOff,
      reducedEffects: mode === 'reduced' || systemReduced,
    }
  }, [mode, setMode, systemReduced])

  return (
    <CursorPrefsContext.Provider value={value}>{children}</CursorPrefsContext.Provider>
  )
}

export function useCursorPrefs() {
  const ctx = useContext(CursorPrefsContext)
  if (!ctx) {
    throw new Error('useCursorPrefs must be used within CursorPrefsProvider')
  }
  return ctx
}
