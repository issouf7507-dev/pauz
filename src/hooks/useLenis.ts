import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Smooth-scroll via Lenis, synced with GSAP ScrollTrigger.
 * Lenis drives the single rAF loop through GSAP's ticker so that
 * scrubbed animations (SplitText line reveals, hero parallax) stay
 * frame-perfect with the smoothed scroll position.
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Keep ScrollTrigger in lock-step with Lenis' smoothed position.
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // In-page anchor links scroll through Lenis (smooth), not native jumps.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!link) return
      const hash = link.getAttribute('href')
      if (!hash || hash === '#') return
      const target = document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -66 }) // offset for sticky header
    }
    document.addEventListener('click', onClick)

    // Recompute trigger positions once fonts/layout settle.
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
}
