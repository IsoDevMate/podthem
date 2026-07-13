import { useEffect, useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type MotionValue,
} from 'framer-motion'
import { AnimatedFadeIn, AnimatedText } from '@/components/shared/AnimatedText'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SPRING } from '@/motion/easings'
import { cn } from '@/lib/utils'

const DEFAULT_VIDEO =
  'https://cdn.coverr.co/videos/coverr-close-up-of-a-person-spreading-butter-on-bread-9766/1080p.mp4'

const DEFAULT_POSTER =
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1920&q=80'

export interface HeroProps {
  headline: string | string[]
  subheadline: string
  ctaLabel: string
  ctaHref: string
  backgroundSrc?: string
  posterSrc?: string
}

function CurvedMask({ progress }: { progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], ['100%', '-5%'])
  const smoothY = useSpring(y, { stiffness: 80, damping: 28, mass: 0.8 })

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[55vh]"
      style={{ y: smoothY }}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,120 Q720,280 1440,120 L1440,600 L0,600 Z"
          fill="var(--color-cream)"
        />
      </svg>
    </motion.div>
  )
}

function headlineWordCount(headline: string | string[]) {
  const lines = Array.isArray(headline) ? headline : [headline]
  return lines.reduce((sum, line) => sum + line.split(' ').length, 0)
}

export function Hero({
  headline,
  subheadline,
  ctaLabel,
  ctaHref,
  backgroundSrc = DEFAULT_VIDEO,
  posterSrc = DEFAULT_POSTER,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -80])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.25, 0.55])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const parallaxX = useSpring(mouseX, SPRING.soft)
  const parallaxY = useSpring(mouseY, SPRING.soft)

  useEffect(() => {
    if (reducedMotion) return
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      mouseX.set(nx * 28)
      mouseY.set(ny * 18)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [reducedMotion, mouseX, mouseY])

  const wordCount = headlineWordCount(headline)
  const headlineDuration = wordCount * 0.08 + 0.6
  const subDelay = reducedMotion ? 0.1 : headlineDuration * 0.3
  const ctaDelay = reducedMotion ? 0.2 : subDelay + 0.35

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute inset-[-4%]"
          style={{ scale: videoScale, x: parallaxX, y: parallaxY }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            poster={posterSrc}
          >
            <source src={backgroundSrc} type="video/mp4" />
          </video>
          <motion.div
            className="absolute inset-0 bg-bronze"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-[1] film-grain opacity-[0.35]" />

        <motion.div
          className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 pt-28 md:px-12 lg:px-20"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <AnimatedText
              as="h1"
              lines={headline}
              className="font-serif text-5xl leading-[0.95] text-cream md:text-7xl lg:text-8xl"
              stagger={0.08}
              duration={0.6}
            />

            <div className="flex flex-col items-start gap-6 md:items-end md:text-right">
              <AnimatedFadeIn delay={subDelay}>
                <p className="max-w-xs text-sm leading-relaxed tracking-wide text-cream/80">
                  {subheadline}
                </p>
              </AnimatedFadeIn>

              <AnimatedFadeIn delay={ctaDelay}>
                <motion.a
                  href={ctaHref}
                  className={cn(
                    'inline-flex h-11 items-center border border-cream/40 px-6 text-sm text-cream',
                    'transition-colors hover:bg-cream/10',
                  )}
                  whileHover={reducedMotion ? undefined : { scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {ctaLabel}
                </motion.a>
              </AnimatedFadeIn>
            </div>
          </div>
        </motion.div>

        <CurvedMask progress={scrollYProgress} />
      </div>
    </section>
  )
}

/** @deprecated Use Hero from @/components/sections/Hero */
export const HeroReveal = Hero
