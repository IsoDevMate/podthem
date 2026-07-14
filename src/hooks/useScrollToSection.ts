import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLenis } from '@/motion/SmoothScrollProvider'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function useScrollToSection() {
  const lenis = useLenis()
  const reduced = useReducedMotion()
  const location = useLocation()
  const navigate = useNavigate()

  return useCallback(
    (hash: string, offset = -72) => {
      const id = hash.startsWith('#') ? hash : `#${hash}`

      if (location.pathname !== '/') {
        navigate(`/${id}`)
        return
      }

      const el = document.getElementById(id.replace('#', ''))
      if (!el) return

      if (lenis && !reduced) {
        lenis.scrollTo(el, { offset, duration: 1.4 })
      } else {
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
      }
    },
    [lenis, reduced, location.pathname, navigate],
  )
}
