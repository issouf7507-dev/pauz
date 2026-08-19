import { createElement, useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

type Props = {
  as?: keyof JSX.IntrinsicElements
  className?: string
  children: ReactNode
  style?: CSSProperties
  /** stagger between lines */
  stagger?: number
}

/**
 * Scroll-driven, line-masked text reveal (GSAP SplitText).
 * Each line slides up from behind a mask, scrubbed as the element
 * travels through the viewport center.
 */
export default function SplitReveal({ as = 'h2', className, children, style, stagger = 0.1 }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced-motion: keep text fully visible, no split.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { opacity: 1 })
      return
    }

    let split: SplitText | null = null
    const ctx = gsap.context(() => {
      document.fonts.ready.then(() => {
        gsap.set(el, { opacity: 1 })
        split = SplitText.create(el, {
          type: 'words,lines',
          mask: 'lines',
          linesClass: 'line',
          autoSplit: true,
          onSplit: (instance: SplitText) =>
            gsap.from(instance.lines, {
              yPercent: 120,
              stagger,
              scrollTrigger: {
                trigger: el,
                scrub: true,
                start: 'clamp(top center)',
                end: 'clamp(bottom center)',
              },
            }),
        })
      })
    }, el)

    return () => {
      split?.revert()
      ctx.revert()
    }
  }, [stagger])

  return createElement(as, { ref, className, style: { opacity: 0, ...style } }, children)
}
