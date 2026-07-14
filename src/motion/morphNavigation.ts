import type { MouseEvent } from 'react'

export interface MorphOrigin {
  x: number
  y: number
  width: number
  height: number
  imageUrl?: string
  kind: 'card' | 'nav' | 'link'
}

let pendingOrigin: MorphOrigin | null = null

export function captureMorphOrigin(
  el: HTMLElement,
  kind: MorphOrigin['kind'],
  imageUrl?: string,
) {
  const rect = el.getBoundingClientRect()
  pendingOrigin = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
    width: rect.width,
    height: rect.height,
    imageUrl,
    kind,
  }
}

export function consumeMorphOrigin(): MorphOrigin | null {
  const origin = pendingOrigin
  pendingOrigin = null
  return origin
}

export function onMorphNavigate(
  event: MouseEvent<HTMLElement>,
  kind: MorphOrigin['kind'] = 'link',
  imageUrl?: string,
) {
  captureMorphOrigin(event.currentTarget, kind, imageUrl)
}
