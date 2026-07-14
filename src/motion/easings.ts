/** Single motion language — every interaction should speak this dialect */

export const EASE = {
  expo: 'expo.out',
  power4: 'power4.out',
  power3: 'power3.out',
  cinematic: 'power3.inOut',
  soft: 'power2.out',
  /** Overshoot settle — mass / inertia */
  weight: 'back.out(1.4)',
  elastic: 'elastic.out(1, 0.45)',
  outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  /** Framer cubic for overshoot-ish settle */
  settle: [0.22, 1.2, 0.36, 1] as const,
} as const

export const SPRING = {
  /** Heavy card — overshoot then rest */
  heavy: { stiffness: 90, damping: 14, mass: 1.35 },
  soft: { stiffness: 80, damping: 22, mass: 0.8 },
  snappy: { stiffness: 280, damping: 28, mass: 0.6 },
  magnetic: { stiffness: 160, damping: 18, mass: 0.55 },
  button: { stiffness: 420, damping: 22, mass: 0.7 },
} as const

/** Color story — KEEP LIGHT for content sections. Dark lives only on Host/Footer. */
export const COLOR_STORY = [
  { id: 'dawn', color: '#f6f0e4' },
  { id: 'warm', color: '#f1ebdf' },
  { id: 'amber', color: '#ebe4d6' },
] as const
