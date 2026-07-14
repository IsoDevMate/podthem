import { createPortal } from 'react-dom'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useSound } from '@/motion/SoundDesign'
import { SPRING } from '@/motion/easings'
import { cn } from '@/lib/utils'
import { onMorphNavigate } from '@/motion/morphNavigation'

export interface CategoryItem {
  id: string
  label: string
  preview: string
}

export interface CategoriesSectionProps {
  categories: CategoryItem[]
  label?: string
}

/**
 * Topics list — hover shows a floating preview; click filters the archive.
 * Craft / Culture / Sound Design / Letters → /episodes?topic=<id>
 */
export function CategoriesSection({
  categories,
  label = 'Topics',
}: CategoriesSectionProps) {
  const [active, setActive] = useState<string | null>(null)
  const [bg, setBg] = useState('#f6f0e4')
  const reduced = useReducedMotion()
  const { play } = useSound()
  const previewX = useMotionValue(-200)
  const previewY = useMotionValue(-200)
  const sx = useSpring(previewX, SPRING.magnetic)
  const sy = useSpring(previewY, SPRING.magnetic)
  const sectionRef = useRef<HTMLElement>(null)

  const activeItem = categories.find((c) => c.id === active)

  const tint = (id: string) => {
    if (id === 'craft') return '#ebe4d6'
    if (id === 'culture') return '#e4ded0'
    if (id === 'sound') return '#ddd5c4'
    return '#f0ebe0'
  }

  return (
    <section
      id="topics"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f6f0e4] px-6 py-32 transition-colors duration-500 md:px-12 md:py-40 lg:px-20"
      style={{ backgroundColor: bg }}
    >
      <div className="mb-10 flex flex-col gap-3 md:mb-16 md:flex-row md:items-end md:justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
          {label}
        </span>
        <p className="max-w-sm text-sm text-bronze-muted">
          Hover a topic to preview. Click to open that slice of the episode archive.
        </p>
      </div>

      <ul className="relative z-10 mx-auto max-w-5xl space-y-2">
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link
              to={`/episodes?topic=${cat.id}`}
              className="group relative block w-full overflow-hidden text-left"
              data-cursor="view"
              data-cursor-label={`Browse ${cat.label}`}
              onClick={(e) => onMorphNavigate(e, 'link')}
              onMouseEnter={() => {
                setActive(cat.id)
                setBg(tint(cat.id))
                play('paper')
              }}
              onMouseLeave={() => {
                setActive(null)
                setBg('#f6f0e4')
              }}
              onMouseMove={(e) => {
                previewX.set(e.clientX + 24)
                previewY.set(e.clientY - 72)
              }}
              onFocus={() => {
                setActive(cat.id)
                setBg(tint(cat.id))
              }}
              onBlur={() => {
                setActive(null)
                setBg('#f6f0e4')
              }}
            >
              <span
                className={cn(
                  'inline-block font-hand text-5xl font-semibold tracking-tight text-bronze transition-transform duration-500 md:text-7xl lg:text-8xl',
                  !reduced && 'group-hover:scale-x-[1.04] group-hover:rotate-[-1deg]',
                  active && active !== cat.id && 'opacity-30',
                )}
              >
                {cat.label}
              </span>
              <span
                className={cn(
                  'mt-2 block h-px origin-center scale-x-0 bg-bronze transition-transform duration-500',
                  'group-hover:scale-x-100 group-focus-visible:scale-x-100',
                )}
              />
            </Link>
          </li>
        ))}
      </ul>

      {/* Portal escapes page morph transforms that break position:fixed */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {!reduced && activeItem && (
              <motion.div
                key={activeItem.id}
                className="pointer-events-none fixed z-[80] hidden h-44 w-36 overflow-hidden border border-bronze/10 bg-cream-dark shadow-2xl md:block"
                style={{ left: sx, top: sy }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={activeItem.preview}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  )
}
