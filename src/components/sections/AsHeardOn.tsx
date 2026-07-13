import { useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface LogoItem {
  src: string
  alt: string
}

export interface AsHeardOnProps {
  logos: LogoItem[]
  label?: string
}

export function AsHeardOn({
  logos,
  label = 'As heard on',
}: AsHeardOnProps) {
  const controls = useAnimationControls()
  const trackRef = useRef<HTMLDivElement>(null)

  const duplicated = [...logos, ...logos]

  useEffect(() => {
    controls.start({
      x: ['0%', '-50%'],
      transition: { repeat: Infinity, ease: 'linear', duration: 28 },
    })
  }, [controls])

  return (
    <section className="relative bg-cream py-16 md:py-20">
      <p className="mb-10 text-center font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
        {label}
      </p>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() =>
          controls.start({
            x: ['0%', '-50%'],
            transition: { repeat: Infinity, ease: 'linear', duration: 28 },
          })
        }
      >
        <motion.div
          ref={trackRef}
          className="flex w-max items-center gap-16 px-8 md:gap-24"
          animate={controls}
        >
          {duplicated.map((logo, i) => (
            <img
              key={`${logo.alt}-${i}`}
              src={logo.src}
              alt={logo.alt}
              className={cn(
                'h-8 w-auto object-contain opacity-60 grayscale transition-all duration-300 md:h-10',
                'hover:opacity-100 hover:grayscale-0',
              )}
              loading="lazy"
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
