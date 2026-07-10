import { useLayoutEffect, useRef } from 'react'
import type { DependencyList, RefObject } from 'react'
import { gsap } from './gsap'

/**
 * Runs a GSAP setup callback inside a `gsap.context()` scoped to `scope`,
 * so every tween / ScrollTrigger created inside is automatically reverted
 * on unmount (and re-created when deps change). Respects reduced-motion:
 * the callback still runs, but you can read `ctx.reducedMotion` to bail out
 * of heavy animations.
 */
export function useGsap<T extends HTMLElement = HTMLDivElement>(
  setup: (self: gsap.Context, scope: T) => void,
  deps: DependencyList = [],
): RefObject<T> {
  const scope = useRef<T>(null)

  useLayoutEffect(() => {
    if (!scope.current) return
    const el = scope.current
    const ctx = gsap.context((self) => setup(self, el), scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scope
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
