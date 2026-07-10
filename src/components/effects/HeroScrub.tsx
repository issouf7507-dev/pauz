import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import './heroscrub.css'

const PIN_VH_MULTIPLE = 3.2
const IMMERSE_OVERFILL = 1.04
const ENTRY_DELAY = 0.2
const CARD_START_SCALE_DESKTOP = 0.6
const CARD_START_SCALE_MOBILE = 0.82

export type HeroScrubProps = {
  frameCount: number
  frameUrl: (index: number) => string
  titleTop: string
  titleBottom: string
  /** Classe(s) supplémentaire(s) appliquée(s) à la section (fond, etc.). */
  className?: string
  accentHex?: string
  defaultAspect?: number
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])
  return reduced
}

/**
 * Hero cinématique piloté au scroll : une séquence d'images est décodée puis
 * « scrubbée » sur un <canvas> pendant que la carte zoome jusqu'à l'immersion
 * plein écran, avant de revenir. Layout sticky (pas de pin ScrollTrigger).
 */
export default function HeroScrub({
  frameCount,
  frameUrl,
  titleTop,
  titleBottom,
  className = '',
  accentHex = '#3a9b8a',
  defaultAspect = 16 / 9,
}: HeroScrubProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const lastDrawnRef = useRef<number>(-1)
  const bgRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const titleTopRef = useRef<HTMLHeadingElement>(null)
  const titleBottomRef = useRef<HTMLHeadingElement>(null)

  const [ready, setReady] = useState(false)
  const [framesOk, setFramesOk] = useState(true)
  const [aspect, setAspect] = useState<number>(defaultAspect)
  const reduced = usePrefersReducedMotion()

  // Préchargement / décodage progressif de la séquence d'images
  useEffect(() => {
    if (reduced) return
    let cancelled = false
    let errored = 0
    const images: HTMLImageElement[] = new Array(frameCount)
    imagesRef.current = images

    const onFirstReady = (img: HTMLImageElement) => {
      if (cancelled) return
      const canvas = canvasRef.current
      if (canvas && img.naturalWidth && img.naturalHeight) {
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0)
        lastDrawnRef.current = 0
        setAspect(img.naturalWidth / img.naturalHeight)
      }
      setReady(true)
    }

    const onErr = () => {
      errored++
      if (!cancelled && errored >= 5) setFramesOk(false)
    }

    const loadOne = (i: number) => {
      const img = new window.Image()
      img.decoding = 'async'
      if (i < 4)
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = 'high'
      img.onerror = onErr
      if (i === 0) img.onload = () => onFirstReady(img)
      img.src = frameUrl(i)
      images[i] = img
    }

    const INITIAL = Math.min(20, frameCount)
    for (let i = 0; i < INITIAL; i++) loadOne(i)

    const BATCH = 20
    let cursor = INITIAL
    let timer: ReturnType<typeof setTimeout> | null = null
    const loadNext = () => {
      if (cancelled) return
      const end = Math.min(frameCount, cursor + BATCH)
      for (let i = cursor; i < end; i++) loadOne(i)
      cursor = end
      if (cursor < frameCount) timer = setTimeout(loadNext, 80)
    }
    timer = setTimeout(loadNext, 200)

    const fallbackTimer = window.setTimeout(() => {
      if (!cancelled && !images[0]?.complete) setFramesOk(false)
    }, 4500)

    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
      window.clearTimeout(fallbackTimer)
    }
  }, [reduced, frameCount, frameUrl])

  // Animation d'entrée
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: ENTRY_DELAY })
      tl.from(bgRef.current, { opacity: 0, duration: 1.4, ease: 'power2.out' })
      tl.from(cardRef.current, { opacity: 0, duration: 1.1, ease: 'power3.out' }, 0.35)
      tl.from(titleTopRef.current, { opacity: 0, y: 30, duration: 1, ease: 'expo.out' }, 0.5)
      tl.from(titleBottomRef.current, { opacity: 0, y: -30, duration: 1, ease: 'expo.out' }, 0.62)
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  // Chorégraphie pilotée au scroll — layout sticky au lieu d'un pin ScrollTrigger
  useEffect(() => {
    if (reduced || !ready || !framesOk) return
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const startScale = () =>
        window.innerWidth < 768 ? CARD_START_SCALE_MOBILE : CARD_START_SCALE_DESKTOP

      const immerseScale = () => {
        const vw = window.innerWidth
        const vh = window.innerHeight
        const baseW = Math.min(vw * 0.96, vh * 0.72 * aspect)
        const baseH = Math.min(vh * 0.72, (vw * 0.96) / aspect)
        if (baseW <= 0 || baseH <= 0) return 1.5
        return Math.max(vw / baseW, vh / baseH) * IMMERSE_OVERFILL
      }

      const isLoaded = (i: number) => {
        const img = imagesRef.current[i]
        return !!img && img.complete && img.naturalWidth > 0
      }

      const drawFrame = (index: number) => {
        const canvas = canvasRef.current
        if (!canvas) return
        let useIdx = index
        if (!isLoaded(useIdx)) {
          let found = -1
          for (let d = 1; d < frameCount; d++) {
            if (useIdx - d >= 0 && isLoaded(useIdx - d)) {
              found = useIdx - d
              break
            }
            if (useIdx + d < frameCount && isLoaded(useIdx + d)) {
              found = useIdx + d
              break
            }
          }
          if (found === -1) return
          useIdx = found
        }
        if (lastDrawnRef.current === useIdx) return
        const img = imagesRef.current[useIdx]
        const ctx2 = canvas.getContext('2d')
        if (!ctx2 || !img) return
        ctx2.drawImage(img, 0, 0, canvas.width, canvas.height)
        lastDrawnRef.current = useIdx
      }

      gsap.set(cardRef.current, { scale: startScale(), transformOrigin: '50% 50%' })

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress
            const mapped = gsap.utils.clamp(0, 1, (p - 0.15) / 0.63)
            const frameIdx = Math.min(frameCount - 1, Math.floor(mapped * frameCount))
            drawFrame(frameIdx)
          },
        },
      })

      master.to(cardRef.current, { scale: 1, ease: 'power2.out', duration: 0.15 }, 0)
      master.to(
        titleTopRef.current,
        {
          x: () => (window.innerWidth < 768 ? '-70vw' : '-60vw'),
          letterSpacing: '0.02em',
          ease: 'power2.inOut',
          duration: 0.15,
        },
        0,
      )
      master.to(
        titleBottomRef.current,
        {
          x: () => (window.innerWidth < 768 ? '70vw' : '60vw'),
          letterSpacing: '0.02em',
          ease: 'power2.inOut',
          duration: 0.15,
        },
        0,
      )

      master.to(cardRef.current, { scale: immerseScale(), ease: 'power2.in', duration: 0.63 }, 0.15)
      master.to(titleTopRef.current, { opacity: 0, ease: 'power1.in', duration: 0.22 }, 0.15)
      master.to(titleBottomRef.current, { opacity: 0, ease: 'power1.in', duration: 0.22 }, 0.15)

      master.to(cardRef.current, { scale: startScale(), ease: 'power3.inOut', duration: 0.22 }, 0.78)
      master.to(
        titleTopRef.current,
        { x: 0, opacity: 1, letterSpacing: '-0.04em', ease: 'power2.inOut', duration: 0.22 },
        0.78,
      )
      master.to(
        titleBottomRef.current,
        { x: 0, opacity: 1, letterSpacing: '-0.04em', ease: 'power2.inOut', duration: 0.22 },
        0.78,
      )

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [ready, framesOk, reduced, aspect, frameCount])

  // Section haute + div sticky interne = même rendu qu'un pin, sans pin
  const tallHeight = `${(PIN_VH_MULTIPLE + 1) * 100}vh`

  return (
    <section
      ref={sectionRef}
      className={`heroscrub ${className}`.trim()}
      style={{ height: tallHeight }}
      aria-label="Hero cinématique piloté au scroll"
    >
      <div ref={stickyRef} className="heroscrub__sticky">
        <div
          ref={bgRef}
          aria-hidden
          className="heroscrub__bg"
          style={{ backgroundColor: accentHex }}
        />
        <div aria-hidden className="heroscrub__overlay" />
        <div aria-hidden className="heroscrub__glow" />
        <div aria-hidden className="heroscrub__vignette" />

        <div className="heroscrub__content">
          <h2 ref={titleTopRef} aria-hidden className="heroscrub__title">
            {titleTop}
          </h2>

          <div
            ref={cardRef}
            className="heroscrub__card"
            style={{
              width: `min(96vw, calc(72svh * ${aspect}))`,
              height: `min(72svh, 96vw / ${aspect})`,
              aspectRatio: aspect,
            }}
          >
            <div aria-hidden className="heroscrub__card-shade" />
            {framesOk && (
              <canvas ref={canvasRef} aria-hidden className="heroscrub__canvas" />
            )}
          </div>

          <h2 ref={titleBottomRef} aria-hidden className="heroscrub__title">
            {titleBottom}
          </h2>
        </div>
      </div>
    </section>
  )
}
