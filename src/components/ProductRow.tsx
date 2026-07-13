import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import SplitReveal from './SplitReveal'
import QuickAdd from './QuickAdd'
import { Can, Pouch } from './Visuals'
import { drinks, gummies, type Drink, type Gummy } from '../data/products'

type Props = { variant: 'drinks' | 'gummies' }

export default function ProductRow({ variant }: Props) {
  const isDrinks = variant === 'drinks'
  const items = isDrinks ? drinks : gummies
  const reveal = useReveal<HTMLDivElement>({ stagger: 0.09 })
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <section className="prow" id={isDrinks ? 'drinks' : 'gummies'} ref={reveal}>
      <div className="container">
        <div className="prow__head">
          <SplitReveal as="h2" className="section-title">
            {isDrinks ? (
              <>
                Drinks as Delicious
                <br /> as They Are Delightful
              </>
            ) : (
              <>
                Blends Built
                <br /> to Match Moods
              </>
            )}
          </SplitReveal>
          <div className="prow__arrows reveal">
            <button className="arrow-btn" aria-label="précédent" onClick={() => scrollBy(-1)}>
              ‹
            </button>
            <button className="arrow-btn" aria-label="suivant" onClick={() => scrollBy(1)}>
              ›
            </button>
          </div>
        </div>

        <div className="prow__track" ref={trackRef}>
          {items.map((p) => (
            <motion.article
              key={p.id}
              className="pcard reveal"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div
                className="pcard__vis"
                style={{
                  background: p.tileBg,
                  color: p.tileText,
                  borderColor: p.tileBg === '#fbf6ed' ? 'var(--maroon)' : p.tileBg,
                }}
              >
                <span className="pcard__tag">{p.price}</span>
                <motion.div
                  className="pcard__product"
                  whileHover={{ scale: 1.06, rotate: isDrinks ? -2 : 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  {isDrinks ? (
                    <Can body={(p as Drink).body} cap={(p as Drink).cap} />
                  ) : (
                    <Pouch body={(p as Gummy).body} accent={(p as Gummy).accent} />
                  )}
                </motion.div>
              </div>

              <div className="pcard__meta">
                <h3 className="pcard__name">{p.name}</h3>
                <p className="pcard__flavor">
                  {isDrinks ? (p as Drink).flavor : (p as Gummy).mood} · {p.price}
                </p>
                <QuickAdd />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .prow { padding: clamp(48px, 7vw, 96px) 0 clamp(20px, 4vw, 48px); }
        .prow__head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 2.4rem;
        }
        .prow .section-title { text-align: left; transform: scaleX(.9); transform-origin: left; }
        .prow__arrows { display: flex; gap: .6rem; }
        .prow__track {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: minmax(240px, 1fr);
          gap: clamp(14px, 2vw, 26px);
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding-bottom: 8px;
          scrollbar-width: none;
        }
        .prow__track::-webkit-scrollbar { display: none; }
        @media (min-width: 900px) {
          .prow__track { grid-auto-columns: 1fr; }
        }
        .pcard {
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
        }
        .pcard__vis {
          position: relative;
          border-radius: var(--radius);
          padding: 30px 24px 24px;
          aspect-ratio: 1 / 1.05;
          display: grid;
          place-items: center;
          border: 2px solid;
          overflow: hidden;
        }
        .pcard__tag {
          position: absolute;
          top: 12px;
          left: 12px;
          font-family: var(--font-mono);
          font-size: .62rem;
          font-weight: 600;
          letter-spacing: .04em;
          padding: 4px 9px;
          border-radius: 999px;
          border: 1.5px solid currentColor;
        }
        .pcard__product { width: 60%; filter: drop-shadow(0 12px 24px rgba(0,0,0,.22)); }
        .pcard__meta { padding: 16px 4px 0; text-align: center; }
        .pcard__name {
          font-family: var(--font-display);
          font-weight: 700;
          text-transform: uppercase;
          font-size: 1rem;
          letter-spacing: .01em;
          color: var(--maroon);
        }
        .pcard__flavor {
          font-family: var(--font-mono);
          font-size: .66rem;
          letter-spacing: .06em;
          opacity: .7;
          margin: .35rem 0 .9rem;
          text-transform: uppercase;
        }
      `}</style>
    </section>
  )
}
