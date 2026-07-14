import { useScrollReady } from '@/motion/SmoothScrollProvider'
import { useLayoutReady } from '@/motion/AppReadyProvider'

/** True when Lenis is ready AND preloader has finished */
export function usePinReady() {
  const scrollReady = useScrollReady()
  const layoutReady = useLayoutReady()
  return scrollReady && layoutReady
}
