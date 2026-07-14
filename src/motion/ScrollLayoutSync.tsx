import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { refreshAllScroll, useScrollRefresh } from '@/motion/SmoothScrollProvider'

/**
 * Re-measures ScrollTrigger after first paint, preloader, and images.
 * Fixes sections disappearing on initial home load.
 */
export function ScrollLayoutSync() {
  const refreshScroll = useScrollRefresh()

  useEffect(() => {
    const run = () => {
      refreshAllScroll()
      refreshScroll()
    }

    run()
    const t1 = window.setTimeout(run, 150)
    const t2 = window.setTimeout(run, 900)
    const t3 = window.setTimeout(run, 2200)

    const onPreloadDone = () => run()
    window.addEventListener('podthem:preloader-complete', onPreloadDone)

    const onResize = () => ScrollTrigger.refresh(true)
    window.addEventListener('resize', onResize)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
      window.removeEventListener('podthem:preloader-complete', onPreloadDone)
      window.removeEventListener('resize', onResize)
    }
  }, [refreshScroll])

  return null
}
