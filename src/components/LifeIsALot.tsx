import { motion } from "framer-motion";
import { useReveal } from "../hooks/useReveal";
import SplitReveal from "./SplitReveal";
import { moments } from "../data/products";

export default function LifeIsALot() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.12, start: "top 78%" });
  return (
    <section className="life" ref={ref}>
      <div className="life__bg" />
      <div className="life__scrim" />
      <div className="container life__inner">
        <SplitReveal as="h2" className="life__title display">
          Life is a Lot.
          <br /> Joy Should Be Too.
        </SplitReveal>

        <div className="life__cards">
          {moments.map((m, i) => (
            <motion.div
              key={m.title}
              className="mcard reveal"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
            >
              <span className="mcard__num">0{i + 1}</span>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .life {
          position: relative;
          padding: clamp(70px, 10vw, 140px) 0 clamp(50px, 7vw, 90px);
          overflow: hidden;
          color: var(--cream);
        }
        .life__bg {
          position: absolute; inset: 0;
          background:#2e7d32;
        }
        .life__scrim {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(20,30,50,.35), rgba(20,30,50,.15));
        }
        .life__inner { position: relative; z-index: 2; }
        .life__title {
          text-align: center;
          font-size: clamp(2rem, 5.5vw, 4.4rem);
          margin: 0 auto clamp(36px, 5vw, 60px);
          transform: scaleX(.92);
          text-shadow: 0 2px 24px rgba(0,0,0,.2);
        }
        .life__cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(12px, 1.6vw, 20px);
        }
        @media (max-width: 900px) { .life__cards { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .life__cards { grid-template-columns: 1fr; } }
        .mcard {
          background: var(--cream);
          color: var(--ink);
          border-radius: var(--radius);
          padding: 22px 20px 24px;
          border: 2px solid var(--orange);
          min-height: 210px;
        }
        .mcard__num {
          font-family: var(--font-mono);
          font-size: .7rem;
          color: var(--orange);
          letter-spacing: .1em;
        }
        .mcard h3 {
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          font-size: 1.15rem;
          color: var(--maroon);
          margin: .5rem 0 .7rem;
          line-height: 1;
        }
        .mcard p { font-size: .8rem; line-height: 1.5; opacity: .82; }
      `}</style>
    </section>
  );
}
