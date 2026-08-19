import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '../hooks/useReveal'
import SplitReveal from './SplitReveal'
import QuickAdd from './QuickAdd'
import { Sun } from './Visuals'
import { product } from '../data/products'
import { cans } from '../assets/media'

gsap.registerPlugin(ScrollTrigger)

/** Single-product section — PAUZ only sells the coconut water can for now. */
export default function ProductShowcase() {
  const reveal = useReveal<HTMLElement>({ stagger: 0.12 })
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pshow__can',
        { yPercent: 5 },
        {
          yPercent: -5,
          ease: 'none',
          scrollTrigger: { trigger: stageRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, stageRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="pshow" id="drinks" ref={reveal}>
      <div className="container pshow__grid">
        <div className="pshow__stage" ref={stageRef}>
          <span className="pshow__halo" aria-hidden />
          <motion.img
            src={cans.front}
            alt={`Canette ${product.name}, ${product.size}`}
            className="pshow__can"
            whileHover={{ scale: 1.05, rotate: -1.5 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          />
        </div>

        <div className="pshow__info">
          <p className="pshow__eyebrow reveal">
            <Sun size={12} color="var(--maroon)" />
            L’unique
          </p>

          <SplitReveal as="h2" className="section-title pshow__title">
            {product.tagline}
          </SplitReveal>

          <p className="pshow__flavor reveal">{product.flavor}</p>
          <p className="pshow__body reveal">{product.body}</p>

          <dl className="pshow__specs reveal">
            {product.specs.map((s) => (
              <div className="pshow__spec" key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="pshow__buy reveal">
            <span className="pshow__price">
              {product.price}
              <em>/ {product.size}</em>
            </span>
            <QuickAdd label="Ajouter au panier" />
          </div>
        </div>
      </div>

      <style>{`
        .pshow { padding: clamp(56px, 8vw, 112px) 0 clamp(32px, 5vw, 64px); }
        .pshow__grid {
          display: grid;
          gap: clamp(24px, 5vw, 72px);
          align-items: center;
        }
        @media (min-width: 900px) {
          .pshow__grid { grid-template-columns: 1fr 1fr; }
        }

        /* ---------- product stage ---------- */
        .pshow__stage {
          position: relative;
          aspect-ratio: 1 / 1.02;
          border-radius: var(--radius);
          background:
            radial-gradient(80% 70% at 50% 30%, rgba(197,221,127,.45), transparent 70%),
            linear-gradient(165deg, #2e7d32 0%, #1b5e20 55%, #123018 100%);
          display: grid;
          place-items: center;
          overflow: hidden;
          isolation: isolate;
        }
        .pshow__halo {
          position: absolute;
          width: 62%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(251,246,237,.28), transparent 65%);
          filter: blur(6px);
        }
        /* Sized by width: a percentage height would resolve against the grid row,
           not the aspect-ratio'd stage, and overflow the frame. */
        .pshow__can {
          position: relative;
          width: 42%;
          height: auto;
          z-index: 2;
          will-change: transform;
          filter: drop-shadow(0 26px 38px rgba(9,26,13,.5));
        }

        /* ---------- info column ---------- */
        .pshow__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: .5em;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: .18em;
          font-size: .66rem;
          color: var(--maroon);
          margin-bottom: 1rem;
        }
        .pshow .pshow__title {
          text-align: left;
          transform: scaleX(.92);
          transform-origin: left;
          margin-bottom: 1.1rem;
        }
        .pshow__flavor {
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: .1em;
          font-size: .7rem;
          opacity: .7;
          margin-bottom: 1rem;
        }
        .pshow__body {
          max-width: 46ch;
          line-height: 1.6;
          font-size: .98rem;
          opacity: .88;
        }

        .pshow__specs {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          overflow: hidden;
          margin: 2rem 0;
        }
        .pshow__spec {
          background: var(--cream);
          padding: 1rem 1.1rem;
        }
        .pshow__spec dt {
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: .1em;
          font-size: .6rem;
          opacity: .6;
          margin-bottom: .35rem;
        }
        .pshow__spec dd {
          font-size: .88rem;
          font-weight: 500;
          color: var(--maroon);
        }

        .pshow__buy {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.2rem;
        }
        .pshow__price {
          font-family: var(--font-display);
          font-size: 1.9rem;
          font-weight: 700;
          color: var(--maroon);
          line-height: 1;
        }
        .pshow__price em {
          font-family: var(--font-mono);
          font-style: normal;
          font-size: .68rem;
          letter-spacing: .08em;
          text-transform: uppercase;
          opacity: .6;
          margin-left: .5em;
        }

        @media (max-width: 560px) {
          .pshow__specs { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
