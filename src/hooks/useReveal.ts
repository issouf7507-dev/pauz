import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Staggered reveal of any `.reveal` children within the returned ref.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  opts: { y?: number; stagger?: number; start?: string } = {},
) {
  const ref = useRef<T>(null)
  const { y = 28, stagger = 0.1, start = 'top 82%' } = opts

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll('.reveal')
    if (!targets.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger,
        scrollTrigger: { trigger: el, start },
      })
      gsap.set(targets, { y })
    }, el)

    return () => ctx.revert()
  }, [y, stagger, start])

  return ref
}
