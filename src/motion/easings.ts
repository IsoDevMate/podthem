/** Shared premium easings — use across GSAP timelines */
export const EASE = {
  expo: 'expo.out',
  power4: 'power4.out',
  power3: 'power3.out',
  cinematic: 'power3.inOut',
  soft: 'power2.out',
  /** Matches Framer cubic [0.16, 1, 0.3, 1] */
  outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const

export const SPRING = {
  soft: { stiffness: 80, damping: 22, mass: 0.8 },
  snappy: { stiffness: 280, damping: 28, mass: 0.6 },
  magnetic: { stiffness: 180, damping: 20, mass: 0.5 },
} as const
