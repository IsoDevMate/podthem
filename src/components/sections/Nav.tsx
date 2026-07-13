import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export interface NavLink {
  label: string
  href: string
}

export interface NavProps {
  logo: ReactNode
  links: NavLink[]
  /** Transparent over hero video until scroll threshold; cream text → bronze */
  overlay?: boolean
}

function isHashLink(href: string) {
  return href.startsWith('#')
}

function isExternal(href: string) {
  return href.startsWith('http')
}

export function Nav({ logo, links, overlay = true }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeHash, setActiveHash] = useState<string | null>(null)
  const [hidden, setHidden] = useState(false)
  const [navReady, setNavReady] = useState(!overlay)
  const location = useLocation()
  const reducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const lastY = useRef(0)

  const showSolid = !overlay

  const bgOpacity = useTransform(
    scrollY,
    [0, 80],
    showSolid ? [0.92, 0.92] : [0, 0.92],
  )
  const borderOpacity = useTransform(
    scrollY,
    [40, 80],
    showSolid ? [1, 1] : [0, 1],
  )
  const blurPx = useTransform(scrollY, [0, 80], showSolid ? [12, 12] : [0, 12])

  const backgroundColor = useMotionTemplate`rgba(246, 240, 228, ${bgOpacity})`
  const backdropFilter = useMotionTemplate`blur(${blurPx}px)`
  const borderColor = useMotionTemplate`rgba(44, 33, 24, ${borderOpacity})`

  const linkMuted = useTransform(
    scrollY,
    [0, 80],
    showSolid
      ? ['rgba(44, 33, 24, 0.65)', 'rgba(44, 33, 24, 0.65)']
      : ['rgba(246, 240, 228, 0.65)', 'rgba(44, 33, 24, 0.65)'],
  )
  const linkActive = useTransform(
    scrollY,
    [0, 80],
    showSolid
      ? ['rgba(44, 33, 24, 1)', 'rgba(44, 33, 24, 1)']
      : ['rgba(246, 240, 228, 1)', 'rgba(44, 33, 24, 1)'],
  )
  const logoColor = useTransform(
    scrollY,
    [0, 80],
    showSolid
      ? ['rgba(44, 33, 24, 1)', 'rgba(44, 33, 24, 1)']
      : ['rgba(246, 240, 228, 1)', 'rgba(44, 33, 24, 1)'],
  )

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (overlay && y > 40) setNavReady(true)

    const delta = y - lastY.current
    if (y < 80) {
      setHidden(false)
    } else if (delta > 6 && !mobileOpen) {
      setHidden(true)
    } else if (delta < -6) {
      setHidden(false)
    }
    lastY.current = y
  })

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const hashLinks = links.filter((l) => isHashLink(l.href))
    if (!hashLinks.length) return

    const sections = hashLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[]

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveHash(`#${visible[0].target.id}`)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [links, location.pathname])

  function isLinkActive(href: string) {
    if (isHashLink(href)) return activeHash === href
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  function renderLink(link: NavLink, mobile = false) {
    const active = isLinkActive(link.href)
    const baseClass = cn(
      'relative text-xs uppercase tracking-[0.2em] transition-colors',
      mobile && 'block py-3 text-sm tracking-[0.18em]',
    )

    const content = (
      <>
        <motion.span style={{ color: active ? linkActive : linkMuted }}>
          {link.label}
        </motion.span>
        {active && (
          <motion.span
            layoutId={mobile ? 'nav-underline-mobile' : 'nav-underline'}
            className="absolute -bottom-1 left-0 h-px w-full bg-current opacity-60"
            style={{ color: linkActive }}
          />
        )}
      </>
    )

    if (isExternal(link.href)) {
      return (
        <a
          key={link.href + link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
        >
          {content}
        </a>
      )
    }

    if (isHashLink(link.href)) {
      return (
        <a key={link.href + link.label} href={link.href} className={baseClass}>
          {content}
        </a>
      )
    }

    return (
      <Link key={link.href + link.label} to={link.href} className={baseClass}>
        {content}
      </Link>
    )
  }

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={false}
      animate={{
        y: hidden ? -110 : 0,
        opacity: navReady || mobileOpen || !overlay ? 1 : 0,
      }}
      transition={{
        duration: reducedMotion ? 0.15 : 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        backgroundColor,
        backdropFilter,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: borderColor,
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-[4.5rem] md:px-12 lg:px-20">
        <Link
          to="/"
          className="relative z-10 font-serif text-2xl tracking-tight md:text-[1.65rem]"
        >
          <motion.span style={{ color: logoColor }}>{logo}</motion.span>
        </Link>

        <nav
          className="hidden items-center gap-6 md:flex lg:gap-8"
          aria-label="Primary"
        >
          {links.map((link) => renderLink(link))}
        </nav>

        <button
          type="button"
          className="relative z-10 flex h-10 w-10 items-center justify-center md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <motion.span style={{ color: logoColor }}>
            {mobileOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </motion.span>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={
              reducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }
            }
            exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0.15 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden border-t border-bronze/10 bg-cream/95 md:hidden"
          >
            <nav
              className="flex flex-col px-6 pb-6 pt-2"
              aria-label="Mobile primary"
            >
              {links.map((link) => renderLink(link, true))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
