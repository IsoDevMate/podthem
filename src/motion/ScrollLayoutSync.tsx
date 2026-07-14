import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { refreshAllScroll, useScrollRefresh } from '@/motion/SmoothScrollProvider'
import { useLayoutReady } from '@/motion/AppReadyProvider'

/**
 * Re-measures ScrollTrigger after first paint, preloader, and images.
 * Fixes sections disappearing on initial home load.
 */
export function ScrollLayoutSync() {
  const refreshScroll = useScrollRefresh()
  const layoutReady = useLayoutReady()

  useEffect(() => {
    if (!layoutReady) return

    const run = () => {
      refreshAllScroll()
      refreshScroll()
    }

    run()
    const t1 = window.setTimeout(run, 100)
    const t2 = window.setTimeout(run, 400)
    const t3 = window.setTimeout(run, 1200)

    const onResize = () => ScrollTrigger.refresh(true)
    window.addEventListener('resize', onResize)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
      window.removeEventListener('resize', onResize)
    }
  }, [refreshScroll, layoutReady])

  return null
}
