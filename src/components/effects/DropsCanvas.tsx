import { useEffect, useRef } from 'react'

/**
 * Fond de particules « gouttes d'eau » léger en Canvas.
 * - devicePixelRatio-aware, se redimensionne, se met en pause hors écran / onglet caché.
 * - Respecte prefers-reduced-motion (rendu statique, pas d'animation).
 */
export default function DropsCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    interface Drop {
      x: number
      y: number
      r: number
      speed: number
      drift: number
      alpha: number
    }
    let drops: Drop[] = []

    const spawn = (count: number) => {
      drops = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 2.2,
        speed: 6 + Math.random() * 26,
        drift: (Math.random() - 0.5) * 8,
        alpha: 0.15 + Math.random() * 0.4,
      }))
    }

    const resize = () => {
      const parent = canvas.parentElement
      width = parent?.clientWidth ?? window.innerWidth
      height = parent?.clientHeight ?? window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const density = Math.round((width * height) / 14000)
      spawn(Math.max(30, Math.min(density, 140)))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const d of drops) {
        const grd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 3)
        grd.addColorStop(0, `rgba(190, 245, 195, ${d.alpha})`)
        grd.addColorStop(1, 'rgba(120, 220, 130, 0)')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r * 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let last = performance.now()
    let raf = 0
    let running = true

    const tick = (now: number) => {
      if (!running) return
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      for (const d of drops) {
        d.y += d.speed * dt
        d.x += d.drift * dt
        if (d.y - d.r * 3 > height) {
          d.y = -d.r * 3
          d.x = Math.random() * width
        }
      }
      draw()
      raf = requestAnimationFrame(tick)
    }

    resize()

    if (reduced) {
      draw() // rendu statique unique
    } else {
      raf = requestAnimationFrame(tick)
    }

    const onResize = () => resize()
    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!reduced && !running) {
        running = true
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    }

    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
