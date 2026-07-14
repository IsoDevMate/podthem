import { useState, type ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const FALLBACK =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect fill="#e8e1d3" width="800" height="600"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#8b7355" font-family="Georgia,serif" font-size="28">Podthem</text></svg>`,
  )

export interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
}

export function OptimizedImage({
  className,
  src,
  fallbackSrc = FALLBACK,
  alt = '',
  onError,
  ...props
}: OptimizedImageProps) {
  const [current, setCurrent] = useState(src ?? fallbackSrc)

  return (
    <img
      {...props}
      src={current}
      alt={alt}
      className={cn(className)}
      onError={(e) => {
        if (current !== fallbackSrc) setCurrent(fallbackSrc)
        onError?.(e)
      }}
    />
  )
}
