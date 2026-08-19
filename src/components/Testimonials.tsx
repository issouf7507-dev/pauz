import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import SplitReveal from './SplitReveal'
import { testimonials } from '../data/products'
import { Stars } from './Visuals'

export default function Testimonials() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.12 })
  return (
    <section className="tst" ref={ref}>
      <div className="container">
        <SplitReveal as="h2" className="section-title" style={{ textAlign: 'center' }}>
          Ne nous crois pas
          <br /> sur parole
        </SplitReveal>

        <div className="tst__arrows reveal">
          <button className="arrow-btn" aria-label="précédent">
            ‹
          </button>
          <button className="arrow-btn" aria-label="suivant">
            ›
          </button>
        </div>

        <div className="tst__grid">
          {testimonials.map((t) => (
            <motion.blockquote
              key={t.author}
              className="tcard reveal"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 240, damping: 18 }}
            >
              <Stars n={t.rating} />
              <h3>{t.title}</h3>
              <p>{t.body}</p>
              <footer>{t.author}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>

      <style>{`
        .tst { padding: clamp(50px, 7vw, 100px) 0; text-align: center; }
        .tst__arrows { display: flex; justify-content: center; gap: .6rem; margin: 1.8rem 0 2.6rem; }
        .tst__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(14px, 2vw, 24px);
          text-align: left;
        }
        @media (max-width: 820px) { .tst__grid { grid-template-columns: 1fr; } }
        .tcard {
          border-radius: var(--radius);
          padding: 26px 24px;
          /* Paper on cream is nearly the same value, so with the border gone the
             shadow is the only thing separating the card from the page. */
          background: var(--paper);
          box-shadow: 0 14px 30px rgba(9, 26, 13, .09);
        }
        .tcard h3 {
          font-family: var(--font-display);
          font-weight: 700;
          text-transform: uppercase;
          font-size: 1.05rem;
          color: var(--maroon);
          margin: .9rem 0 .7rem;
        }
        .tcard p { font-size: .85rem; line-height: 1.55; opacity: .82; margin-bottom: 1.4rem; }
        .tcard footer {
          font-family: var(--font-mono);
          font-size: .68rem;
          letter-spacing: .08em;
          text-transform: uppercase;
          opacity: .7;
        }
      `}</style>
    </section>
  )
}
