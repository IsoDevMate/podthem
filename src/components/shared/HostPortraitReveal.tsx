import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SPRING } from '@/motion/easings'
import { cn } from '@/lib/utils'
import { onMorphNavigate } from '@/motion/morphNavigation'

export interface HostPortraitRevealProps {
  name: string
  role: string
  portrait: string
  description: string
  profileHref?: string
  episodesHref?: string
  className?: string
}

/**
 * Editorial portrait reveal — clip from the side + calm parallax.
 * Hover / focus / tap. Respects reduced motion.
 */
export function HostPortraitReveal({
  name,
  role,
  portrait,
  description,
  profileHref = '/about',
  episodesHref = '/episodes',
  className,
}: HostPortraitRevealProps) {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, SPRING.soft)
  const sy = useSpring(my, SPRING.soft)
  const imgX = useTransform(sx, [-0.5, 0.5], [-12, 12])
  const imgY = useTransform(sy, [-0.5, 0.5], [-8, 8])

  const onMove = (e: ReactPointerEvent) => {
    if (reduced || !wrapRef.current) return
    const r = wrapRef.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
    // desktop hover close; leave open for touch until toggle
    if (window.matchMedia('(hover: hover)').matches) setOpen(false)
  }

  return (
    <div
      ref={wrapRef}
      className={cn(
        'group relative aspect-[3/4] w-full max-w-xl overflow-hidden bg-bronze/30 outline-none',
        'ring-0 transition-[box-shadow] duration-500 focus-visible:ring-2 focus-visible:ring-cream/40',
        open && 'ring-1 ring-cream/25',
        className,
      )}
      tabIndex={0}
      role="button"
      aria-expanded={open}
      aria-label={`${name}, ${role}. Activate to reveal profile.`}
      onMouseEnter={() => {
        if (window.matchMedia('(hover: hover)').matches) setOpen(true)
      }}
      onMouseLeave={onLeave}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
      }}
      onClick={() => {
        if (!window.matchMedia('(hover: hover)').matches) setOpen((v) => !v)
      }}
      onPointerMove={onMove}
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={
          reduced
            ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }
            : open
              ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1.04 }
              : { clipPath: 'inset(0% 100% 0% 0%)', scale: 1.02 }
        }
        transition={{ duration: reduced ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={portrait}
          alt=""
          className="h-full w-full object-cover"
          style={reduced ? undefined : { x: imgX, y: imgY, scale: 1.08 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bronze/85 via-bronze/20 to-transparent" />
      </motion.div>

      {/* Resting state hint */}
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
          <p className="mt-2 text-xs text-cream/45">Hover or tap to reveal</p>
        </div>
      </div>

      {/* Overlay content */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8"
        initial={false}
        animate={
          open
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 16 }
        }
        transition={{ duration: 0.5, delay: open ? 0.15 : 0, ease: [0.16, 1, 0.3, 1] }}
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
