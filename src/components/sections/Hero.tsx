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
  'https://cdn.coverr.co/videos/coverr-a-man-recording-a-podcast-4695/1080p.mp4'

const DEFAULT_POSTER =
  'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1920&q=80'

export interface HeroProps {
  headline: string | string[]
  subheadline: string
  ctaLabel: string
  ctaHref: string
  backgroundSrc?: string
  posterSrc?: string
}

function CurvedMask({ progress }: { progress: MotionValue<number> }) {
  // Mask only covers the lower portion — never paints a full empty viewport
  const y = useTransform(progress, [0, 0.85], ['85%', '-15%'])
  const smoothY = useSpring(y, { stiffness: 70, damping: 26, mass: 0.95 })
  const opacity = useTransform(progress, [0.75, 1], [1, 0])

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[42vh]"
      style={{ y: smoothY, opacity }}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,80 Q720,200 1440,80 L1440,420 L0,420 Z"
          fill="#f6f0e4"
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

  const textOpacity = useTransform(scrollYProgress, [0, 0.55, 0.85], [1, 1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.85], [0, -48])
  // Slow cinematic camera push into the scene
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.85], [0.22, 0.45])
  const rayOpacity = useTransform(scrollYProgress, [0, 0.7], [0.45, 0.15])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const parallaxX = useSpring(mouseX, SPRING.heavy)
  const parallaxY = useSpring(mouseY, SPRING.heavy)
  const tiltX = useSpring(0, SPRING.soft)
  const tiltY = useSpring(0, SPRING.soft)

  useEffect(() => {
    if (reducedMotion) return
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      mouseX.set(nx * 36)
      mouseY.set(ny * 22)
      tiltY.set(nx * 2.5)
      tiltX.set(-ny * 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [reducedMotion, mouseX, mouseY, tiltX, tiltY])

  const wordCount = headlineWordCount(headline)
  // Slower reveal — pause for the world to land
  const headlineDuration = wordCount * 0.12 + 0.9
  const subDelay = reducedMotion ? 0.1 : headlineDuration * 0.55
  const ctaDelay = reducedMotion ? 0.2 : subDelay + 0.55

  return (
    <section ref={containerRef} className="relative h-[115vh] md:h-[145vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden md:h-screen">
        <motion.div
          className="absolute inset-0"
          style={{
            scale: videoScale,
            x: parallaxX,
            y: parallaxY,
            rotateX: tiltX,
            rotateY: tiltY,
            transformPerspective: 1400,
          }}
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

        {/* Light rays */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{ opacity: rayOpacity }}
          aria-hidden
        >
          <div className="absolute top-[-20%] left-[15%] h-[140%] w-[28%] rotate-12 bg-gradient-to-b from-cream/25 via-cream/5 to-transparent blur-2xl" />
          <div className="absolute top-[-10%] right-[20%] h-[120%] w-[18%] -rotate-6 bg-gradient-to-b from-cream/15 via-transparent to-transparent blur-3xl" />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-[3] film-grain opacity-[0.4]" />

        <motion.div
          className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 pt-24 md:px-12 md:pb-16 md:pt-28 lg:px-20"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <AnimatedText
              as="h1"
              lines={headline}
              className="font-hand text-4xl font-semibold leading-[0.95] tracking-tight text-cream sm:text-5xl md:text-7xl lg:text-8xl"
              stagger={0.12}
              duration={0.85}
            />

            <div className="flex flex-col items-start gap-6 md:items-end md:text-right">
              <AnimatedFadeIn delay={subDelay} y={28}>
                <p className="max-w-xs text-sm leading-relaxed tracking-wide text-cream/80">
                  {subheadline}
                </p>
              </AnimatedFadeIn>

              <AnimatedFadeIn delay={ctaDelay} y={22}>
                <motion.a
                  href={ctaHref}
                  data-cursor="listen"
                  data-cursor-label="Listen"
                  className={cn(
                    'inline-flex h-11 items-center border border-cream/40 px-6 text-sm text-cream',
                    'transition-colors hover:bg-cream/10',
                  )}
                  whileHover={reducedMotion ? undefined : { scale: 1.04, y: -2 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.96 }}
                  transition={{ type: 'spring', ...SPRING.button }}
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

export const HeroReveal = Hero
