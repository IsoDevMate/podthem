import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { COLOR_STORY } from '@/motion/easings'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Colour evolves *behind* content — never as empty chapters.
 * Slow scrub on the document background only.
 */
export function ColorStory() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const colors = COLOR_STORY.map((c) => c.color)
    const proxy = { t: 0 }
    document.body.style.backgroundColor = colors[0]

    const tween = gsap.to(proxy, {
      t: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.4,
      },
      onUpdate: () => {
        const idx = proxy.t * (colors.length - 1)
        const i = Math.floor(idx)
        const f = idx - i
        const from = colors[Math.min(i, colors.length - 1)]
        const to = colors[Math.min(i + 1, colors.length - 1)]
        const mixed = gsap.utils.interpolate(from, to, f) as string
        document.documentElement.style.setProperty('--page-bg', mixed)
        document.body.style.backgroundColor = mixed
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced])

  return null
}
