import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '@/motion/SmoothScrollProvider'

/** Reset scroll on every route change (Lenis + native fallback). */
export function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, lenis])

  return null
}
