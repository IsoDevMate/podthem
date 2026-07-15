import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SPRING } from '@/motion/easings'
import { cn } from '@/lib/utils'
import { onMorphNavigate } from '@/motion/morphNavigation'
import { OptimizedImage } from '@/components/shared/OptimizedImage'

export interface HostPortraitRevealProps {
  name: string
  role: string
  portrait: string
  description: string
  profileHref?: string
  episodesHref?: string
  className?: string
  /** Auto-reveal once when scrolled into view (mobile-friendly) */
  revealOnView?: boolean
}

/**
 * Editorial portrait reveal with organic clip mask.
 * Desktop: hover. Mobile / revealOnView: IntersectionObserver once.
 */
export function HostPortraitReveal({
  name,
  role,
  portrait,
  description,
  profileHref = '/about',
  episodesHref = '/episodes',
  className,
  revealOnView = true,
}: HostPortraitRevealProps) {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(reduced)
  const [hasRevealed, setHasRevealed] = useState(reduced)
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, { amount: 0.25, once: true, margin: '0px 0px -10% 0px' })
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, SPRING.soft)
  const sy = useSpring(my, SPRING.soft)
  const imgX = useTransform(sx, [-0.5, 0.5], [-10, 10])
  const imgY = useTransform(sy, [-0.5, 0.5], [-6, 6])

  useEffect(() => {
    if (!revealOnView || hasRevealed || reduced) return
    if (inView) {
      setOpen(true)
      setHasRevealed(true)
    }
  }, [inView, revealOnView, hasRevealed, reduced])

  const onMove = (e: ReactPointerEvent) => {
    if (reduced || !wrapRef.current) return
    const r = wrapRef.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const finePointer =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches

  return (
    <div
      ref={wrapRef}
      className={cn(
        'group relative aspect-[3/4] w-full max-w-xl outline-none',
        'transition-[box-shadow] duration-500 focus-visible:ring-2 focus-visible:ring-cream/40',
        open && 'ring-1 ring-cream/20',
        className,
      )}
      tabIndex={0}
      role="button"
      aria-expanded={open}
      aria-label={`${name}, ${role}`}
      onMouseEnter={() => {
        if (finePointer) setOpen(true)
      }}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
        if (finePointer && !hasRevealed) setOpen(false)
      }}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node) && finePointer && !hasRevealed) {
          setOpen(false)
        }
      }}
      onClick={() => {
        if (!finePointer) setOpen((v) => !v)
      }}
      onPointerMove={onMove}
      style={{
        // Organic editorial frame — not circle/square
        clipPath:
          'polygon(4% 2%, 96% 0%, 100% 8%, 98% 78%, 92% 100%, 8% 98%, 0% 88%, 2% 12%)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden bg-bronze/40">
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={
            reduced || open
              ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1.03 }
              : { clipPath: 'inset(8% 8% 8% 8%)', scale: 1.01 }
          }
          transition={{ duration: reduced ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="h-full w-full"
            style={reduced ? undefined : { x: imgX, y: imgY, scale: 1.06 }}
          >
            <OptimizedImage
              src={portrait}
              alt=""
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-bronze/90 via-bronze/25 to-transparent" />
        </motion.div>
      </div>

      <div
        className={cn(
          'absolute inset-0 flex items-end p-6 transition-opacity duration-500',
          open ? 'pointer-events-none opacity-0' : 'opacity-100',
        )}
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/50">
            {role}
          </p>
          <p className="mt-2 font-hand text-3xl font-semibold text-cream md:text-4xl">
            {name}
          </p>
        </div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8"
        initial={false}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.45, delay: open ? 0.12 : 0, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/55">
          {role}
        </p>
        <p className="mt-2 font-hand text-3xl font-semibold text-cream md:text-4xl">
          {name}
        </p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/75">
          {description}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to={profileHref}
            onClick={(e) => {
              e.stopPropagation()
              onMorphNavigate(e, 'link')
            }}
            className="border border-cream/35 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-cream transition-colors hover:bg-cream hover:text-bronze"
          >
            View profile
          </Link>
          <Link
            to={episodesHref}
            onClick={(e) => {
              e.stopPropagation()
              onMorphNavigate(e, 'link')
            }}
            className="border border-cream/20 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-cream/70 transition-colors hover:border-cream/50 hover:text-cream"
          >
            Listen to episodes
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
