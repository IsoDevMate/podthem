import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SPRING } from '@/motion/easings'
import { cn } from '@/lib/utils'

export interface CategoryItem {
  id: string
  label: string
  preview: string
}

export interface CategoriesSectionProps {
  categories: CategoryItem[]
  label?: string
}

export function CategoriesSection({
  categories,
  label = 'Topics',
}: CategoriesSectionProps) {
  const [active, setActive] = useState<string | null>(null)
  const [bg, setBg] = useState('var(--color-cream)')
  const reduced = useReducedMotion()
  const previewX = useMotionValue(0)
  const previewY = useMotionValue(0)
  const sx = useSpring(previewX, SPRING.magnetic)
  const sy = useSpring(previewY, SPRING.magnetic)
  const sectionRef = useRef<HTMLElement>(null)

  const activeItem = categories.find((c) => c.id === active)

  return (
    <section
      id="topics"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-32 transition-colors duration-700 md:px-12 md:py-40 lg:px-20"
      style={{ backgroundColor: bg }}
    >
      <span className="mb-16 block font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
        {label}
      </span>

      <ul className="relative z-10 mx-auto max-w-5xl space-y-2">
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              type="button"
              className="group relative block w-full overflow-hidden text-left"
              data-cursor="view"
              onMouseEnter={() => {
                setActive(cat.id)
                setBg(
                  cat.id === 'craft'
                    ? '#ebe4d6'
                    : cat.id === 'culture'
                      ? '#e4ded0'
                      : cat.id === 'sound'
                        ? '#ddd5c4'
                        : '#f0ebe0',
                )
              }}
              onMouseLeave={() => {
                setActive(null)
                setBg('var(--color-cream)')
              }}
              onMouseMove={(e) => {
                previewX.set(e.clientX + 28)
                previewY.set(e.clientY - 80)
              }}
            >
              <span
                className={cn(
                  'inline-block font-serif text-5xl text-bronze transition-transform duration-500 md:text-7xl lg:text-8xl',
                  !reduced && 'group-hover:scale-x-[1.04] group-hover:rotate-[-1deg]',
                  active && active !== cat.id && 'opacity-30',
                )}
              >
                {cat.label}
              </span>
              <span
                className={cn(
                  'mt-2 block h-px origin-center scale-x-0 bg-bronze transition-transform duration-500',
                  'group-hover:scale-x-100',
                )}
              />
            </button>
          </li>
        ))}
      </ul>

      {!reduced && activeItem && (
        <motion.div
          className="pointer-events-none fixed z-40 hidden h-40 w-32 overflow-hidden shadow-2xl md:block"
          style={{ left: sx, top: sy }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={activeItem.preview}
            alt=""
            className="h-full w-full object-cover"
          />
        </motion.div>
      )}
    </section>
  )
}
