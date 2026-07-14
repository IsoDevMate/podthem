import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface AppReadyContextValue {
  /** True only after preloader + fonts have settled */
  layoutReady: boolean
}

const AppReadyContext = createContext<AppReadyContextValue>({
  layoutReady: false,
})

export function useLayoutReady() {
  return useContext(AppReadyContext).layoutReady
}

/**
 * Gates ScrollTrigger init until preloader finishes.
 * Prevents pin miscalculations on first home load.
 */
export function AppReadyProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [layoutReady, setLayoutReady] = useState(reduced)

  useEffect(() => {
    if (reduced) {
      setLayoutReady(true)
      return
    }

    const markReady = () => {
      // Wait two frames so DOM/layout settles after preloader unmount
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setLayoutReady(true))
      })
    }

    const onPreload = () => markReady()
    window.addEventListener('podthem:preloader-complete', onPreload)

    // Safety fallback if preloader event never fires
    const fallback = window.setTimeout(markReady, 8000)

    return () => {
      window.clearTimeout(fallback)
      window.removeEventListener('podthem:preloader-complete', onPreload)
    }
  }, [reduced])

  return (
    <AppReadyContext.Provider value={{ layoutReady }}>
      {children}
    </AppReadyContext.Provider>
  )
}
