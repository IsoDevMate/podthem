import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '@/motion/SmoothScrollProvider'
import { useLayoutReady } from '@/motion/AppReadyProvider'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Scrolls to hash target after home load / route morph */
export function HashScrollHandler() {
  const { hash, pathname } = useLocation()
  const lenis = useLenis()
  const layoutReady = useLayoutReady()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (pathname !== '/' || !hash || !layoutReady) return

    const id = hash.replace('#', '')
    const timer = window.setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      if (lenis && !reduced) {
        lenis.scrollTo(el, { offset: -72, duration: 1.2 })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 400)

    return () => window.clearTimeout(timer)
  }, [hash, pathname, lenis, layoutReady, reduced])

  return null
}
