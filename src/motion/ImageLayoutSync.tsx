import { useEffect } from 'react'
import { useScrollRefresh } from '@/motion/SmoothScrollProvider'

/**
 * Refreshes ScrollTrigger whenever images finish loading or fail.
 * Critical for HorizontalGallery track width calculations.
 */
export function ImageLayoutSync() {
  const refreshScroll = useScrollRefresh()

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null

    const schedule = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => refreshScroll(), 80)
    }

    const onLoad = (e: Event) => {
      if (e.target instanceof HTMLImageElement) schedule()
    }

    document.addEventListener('load', onLoad, true)
    document.addEventListener('error', onLoad, true)

    // Fonts can shift layout after ScrollTrigger measures
    document.fonts?.ready.then(schedule).catch(() => {})

    return () => {
      if (timer) clearTimeout(timer)
      document.removeEventListener('load', onLoad, true)
      document.removeEventListener('error', onLoad, true)
    }
  }, [refreshScroll])

  return null
}
