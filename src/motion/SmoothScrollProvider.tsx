import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type LenisInstance = InstanceType<typeof Lenis>

interface ScrollContextValue {
  lenis: LenisInstance | null
  ready: boolean
  refreshScroll: () => void
}

const ScrollContext = createContext<ScrollContextValue>({
  lenis: null,
  ready: false,
  refreshScroll: () => {},
})

export function useLenis() {
  return useContext(ScrollContext).lenis
}

export function useScrollReady() {
  return useContext(ScrollContext).ready
}

export function useScrollRefresh() {
  return useContext(ScrollContext).refreshScroll
}

/** Call after layout/images settle — fixes first-load pin miscalculations */
export function refreshAllScroll() {
  ScrollTrigger.refresh(true)
  requestAnimationFrame(() => ScrollTrigger.update())
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<LenisInstance | null>(null)
  const [ready, setReady] = useState(false)
  const reducedMotion = useReducedMotion()

  const refreshScroll = useCallback(() => {
    refreshAllScroll()
    lenis?.resize()
  }, [lenis])

  useEffect(() => {
    if (reducedMotion) {
      setReady(true)
      return
    }

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    setLenis(instance)

    // Critical: Lenis virtual scroll must proxy to ScrollTrigger
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === 'number') {
          instance.scrollTo(value, { immediate: true })
        }
        return instance.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: 'transform',
    })

    instance.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      instance.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)
    document.documentElement.classList.add('lenis')

    const onLoad = () => {
      refreshAllScroll()
      instance.resize()
      setReady(true)
    }

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    const delayed = window.setTimeout(() => {
      refreshAllScroll()
      instance.resize()
      setReady(true)
    }, 600)

    return () => {
      window.clearTimeout(delayed)
      window.removeEventListener('load', onLoad)
      gsap.ticker.remove(ticker)
      instance.destroy()
      setLenis(null)
      setReady(false)
      document.documentElement.classList.remove('lenis')
      ScrollTrigger.scrollerProxy(document.documentElement, {})
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [reducedMotion])

  return (
    <ScrollContext.Provider value={{ lenis, ready, refreshScroll }}>
      {children}
    </ScrollContext.Provider>
  )
}
