import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation, type Location } from 'react-router-dom'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useLenis, refreshAllScroll } from '@/motion/SmoothScrollProvider'
import { consumeMorphOrigin } from '@/motion/morphNavigation'
import { Home } from '@/pages/Home'
import { EpisodePage } from '@/pages/EpisodePage'
import { EpisodesPage } from '@/pages/EpisodesPage'
import { AboutPage } from '@/pages/AboutPage'
import { TeamPage } from '@/pages/TeamPage'
import { ContactPage } from '@/pages/ContactPage'
import { ListenPage } from '@/pages/ListenPage'

const ROUTES = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/episodes" element={<EpisodesPage />} />
    <Route path="/episode/:id" element={<EpisodePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/team" element={<TeamPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/listen" element={<ListenPage />} />
  </>
)

/**
 * Dual-layer cinematic route morph — outgoing and incoming pages coexist.
 * Old page dissolves while new page emerges underneath (radical.face style).
 */
export function PageMorphTransition() {
  const location = useLocation()
  const reduced = useReducedMotion()
  const lenis = useLenis()
  const incomingRef = useRef<HTMLDivElement>(null)
  const outgoingRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const busy = useRef(false)
  const prevLocationRef = useRef(location)

  const [outgoingLocation, setOutgoingLocation] = useState<Location | null>(null)

  useEffect(() => {
    if (reduced) {
      prevLocationRef.current = location
      setOutgoingLocation(null)
      return
    }

    if (prevLocationRef.current.pathname === location.pathname) return
    if (busy.current) return

    const previous = prevLocationRef.current
    setOutgoingLocation(previous)

    const isEpisode = location.pathname.startsWith('/episode')
    const wasEpisode = previous.pathname.startsWith('/episode')

    let tl: gsap.core.Timeline | null = null
    let raf = 0

    raf = requestAnimationFrame(() => {
      const incoming = incomingRef.current
      const outgoing = outgoingRef.current
      const backdrop = backdropRef.current
      const ghost = ghostRef.current
      if (!incoming) return

      busy.current = true
      const origin = consumeMorphOrigin()

      document.documentElement.classList.add('morph-transition')
      lenis?.stop()

      if (wasEpisode || isEpisode) {
        lenis?.scrollTo(0, { immediate: true })
      }

      gsap.set(incoming, {
        y: isEpisode ? 72 : 48,
        scale: 1.04,
        filter: 'blur(14px)',
        opacity: 0,
      })

      tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => {
          busy.current = false
          prevLocationRef.current = location
          setOutgoingLocation(null)
          document.documentElement.classList.remove('morph-transition')
          gsap.set([incoming, outgoing, ghost, backdrop], { clearProps: 'all' })
          if (ghost) ghost.style.display = 'none'
          lenis?.start()
          refreshAllScroll()
          lenis?.resize()
        },
      })

      if (backdrop) {
        gsap.set(backdrop, { opacity: 1 })
        tl.fromTo(
          backdrop,
          { backgroundColor: wasEpisode ? '#f6f0e4' : '#ebe3d2' },
          {
            backgroundColor: isEpisode ? '#ebe3d2' : '#f6f0e4',
            duration: 1,
            ease: 'power2.inOut',
          },
          0,
        )
        tl.to(backdrop, { opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
      }

      if (ghost && origin?.imageUrl) {
        const vw = window.innerWidth
        const vh = window.innerHeight
        const targetW = Math.min(vw * 0.92, 960)
        const targetH = targetW * 0.5625

        gsap.set(ghost, {
          display: 'block',
          position: 'fixed',
          left: origin.x,
          top: origin.y,
          xPercent: -50,
          yPercent: -50,
          width: origin.width,
          height: origin.height,
          zIndex: 60,
          borderRadius: 0,
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(44, 33, 24, 0.25)',
          transformOrigin: '50% 50%',
        })

        const img = ghost.querySelector('img')
        if (img) img.src = origin.imageUrl

        tl.to(
          ghost,
          {
            width: targetW,
            height: targetH,
            left: vw / 2,
            top: vh * 0.42,
            rotate: isEpisode ? 0 : -2,
            duration: 0.9,
            ease: 'power4.inOut',
          },
          0.05,
        )
        tl.to(ghost, { opacity: 0, scale: 1.04, duration: 0.45, ease: 'power2.in' }, '-=0.15')
      }

      if (outgoing) {
        tl.to(
          outgoing,
          {
            y: -40,
            scale: 0.96,
            rotateX: 4,
            filter: 'blur(12px)',
            opacity: 0,
            duration: 0.65,
            transformPerspective: 1200,
            transformOrigin: '50% 20%',
          },
          0,
        )
      }

      tl.fromTo(
        incoming,
        {
          y: isEpisode ? 72 : 48,
          scale: 1.04,
          filter: 'blur(14px)',
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          opacity: 1,
          duration: 0.95,
          ease: 'power4.out',
        },
        outgoing ? '-=0.35' : 0,
      )

      const headings = incoming.querySelectorAll('h1, h2')
      if (headings.length) {
        tl.fromTo(
          headings,
          { y: 28, filter: 'blur(8px)', opacity: 0.4 },
          {
            y: 0,
            filter: 'blur(0px)',
            opacity: 1,
            duration: 0.8,
            stagger: 0.06,
            ease: 'power3.out',
          },
          '-=0.7',
        )
      }
    })

    return () => {
      cancelAnimationFrame(raf)
      tl?.kill()
      busy.current = false
      document.documentElement.classList.remove('morph-transition')
      lenis?.start()
    }
  }, [location, reduced, lenis])

  return (
    <div className="relative min-h-screen">
      <div
        ref={backdropRef}
        className="pointer-events-none fixed inset-0 z-40 opacity-0"
        aria-hidden
      />
      <div
        ref={ghostRef}
        className="pointer-events-none fixed z-[60] hidden"
        aria-hidden
      >
        <img alt="" className="h-full w-full object-cover" />
      </div>

      {outgoingLocation && !reduced && (
        <div
          ref={outgoingRef}
          data-outgoing-page
          className="pointer-events-none absolute inset-0 z-30 min-h-screen will-change-transform"
          aria-hidden
        >
          <Routes location={outgoingLocation}>{ROUTES}</Routes>
        </div>
      )}

      <div ref={incomingRef} className="relative z-10 min-h-screen will-change-transform">
        <Routes location={location} key={location.pathname}>
          {ROUTES}
        </Routes>
      </div>
    </div>
  )
}
