// import { useEffect, useRef } from 'react'
// import { useReducedMotion } from '@/hooks/useReducedMotion'

// interface Particle {
//   x: number
//   y: number
//   z: number
//   r: number
//   vx: number
//   vy: number
//   life: number
// }

// /** Depth dust / fiber particles — three planes move at different speeds */
// export function AmbientParticles() {
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const reduced = useReducedMotion()

//   useEffect(() => {
//     if (reduced) return
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const ctx = canvas.getContext('2d')
//     if (!ctx) return

//     let raf = 0
//     let w = 0
//     let h = 0
//     const particles: Particle[] = []
//     const mouse = { x: 0.5, y: 0.5 }

//     const resize = () => {
//       w = canvas.width = window.innerWidth
//       h = canvas.height = window.innerHeight
//     }

//     const spawn = (n: number) => {
//       for (let i = 0; i < n; i++) {
//         particles.push({
//           x: Math.random() * w,
//           y: Math.random() * h,
//           z: Math.random(),
//           r: 0.4 + Math.random() * 1.4,
//           vx: (Math.random() - 0.5) * 0.15,
//           vy: -0.05 - Math.random() * 0.2,
//           life: Math.random(),
//         })
//       }
//     }

//     resize()
//     spawn(70)

//     const onMove = (e: MouseEvent) => {
//       mouse.x = e.clientX / w
//       mouse.y = e.clientY / h
//     }

//     const tick = () => {
//       ctx.clearRect(0, 0, w, h)
//       const mx = (mouse.x - 0.5) * 18
//       const my = (mouse.y - 0.5) * 12

//       for (const p of particles) {
//         const depth = 0.35 + p.z * 0.65
//         p.x += p.vx * depth + mx * 0.002 * p.z
//         p.y += p.vy * depth + my * 0.001 * p.z
//         p.life += 0.002
//         if (p.y < -10) p.y = h + 10
//         if (p.x < -10) p.x = w + 10
//         if (p.x > w + 10) p.x = -10

//         const alpha = 0.08 + p.z * 0.22
//         ctx.beginPath()
//         ctx.fillStyle = `rgba(255, 248, 235, ${alpha})`
//         ctx.arc(p.x, p.y, p.r * depth, 0, Math.PI * 2)
//         ctx.fill()
//       }
//       raf = requestAnimationFrame(tick)
//     }

//     window.addEventListener('resize', resize)
//     window.addEventListener('mousemove', onMove)
//     raf = requestAnimationFrame(tick)

//     return () => {
//       cancelAnimationFrame(raf)
//       window.removeEventListener('resize', resize)
//       window.removeEventListener('mousemove', onMove)
//     }
//   }, [reduced])

//   if (reduced) return null

//   return (
//     <canvas
//       ref={canvasRef}
//       aria-hidden
//       className="pointer-events-none fixed inset-0 z-[5] mix-blend-screen opacity-70"
//     />
//   )
// }
