import { motion } from "framer-motion";
import { useReveal } from "../hooks/useReveal";
import SplitReveal from "./SplitReveal";
import { cans } from "../assets/media";
import { useOrder } from "../lib/order";

const perks = [
  "15 % de remise sur le pack de 12",
  "Livraison offerte dès 75 $",
  "Annulation ou report à tout moment",
  "Livrée prête à rafraîchir",
];

export default function BundleSave() {
  const { openOrder } = useOrder();
  const ref = useReveal<HTMLDivElement>({ stagger: 0.1 });
  return (
    <section className="bundle" id="packs" ref={ref}>
      <div className="container bundle__inner">
        <div className="bundle__left">
          <SplitReveal as="h2" className="display" style={{ color: "#fff" }}>
            Remplis le frigo
          </SplitReveal>
          <p
            className="bundle__lead reveal"
            style={{
              color: "#fefefe",
            }}
          >
            Il n’y a rien à choisir — juste combien. Prends le pack de 12 et
            garde-en une au frais pour chaque après-midi de la semaine.
          </p>
          <div className="bundle__cans reveal">
            <img
              src={cans.trio}
              alt="Trois canettes PAUZ eau de coco 330 ml"
              className="bundle__pack"
            />
          </div>
        </div>

        <div className="bundle__right">
          <SplitReveal as="h3" className="display" style={{ color: "#fff" }}>
            Commande plus.
            <br /> Économise plus.
            <br /> Sois moins à sec.
          </SplitReveal>
          <ul className="bundle__perks">
            {perks.map((p, i) => (
              <li
                style={{
                  color: "#fff",
                }}
                className="reveal"
                key={i}
              >
                <span className="dot" /> {p}
              </li>
            ))}
          </ul>
          <motion.button
            type="button"
            onClick={() => openOrder(12)}
            className="btn reveal"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Prendre le pack de 12
          </motion.button>
        </div>
      </div>

      <style>{`
        .bundle {
          background: #2e7d32;
          padding: clamp(60px, 8vw, 110px) 0;
        }
        .bundle__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(30px, 5vw, 70px);
          align-items: center;
        }
        @media (max-width: 820px) { .bundle__inner { grid-template-columns: 1fr; } }
        .bundle h2.display { font-size: clamp(2.4rem, 6vw, 4.6rem); margin-bottom: 1rem; }
        .bundle__lead { max-width: 360px; line-height: 1.55; opacity: .92; margin-bottom: 2rem; font-size: .95rem; }
        .bundle__cans { display: flex; align-items: flex-end; justify-content: flex-start; gap: 4px; }
        .bundle__cans img { height: auto; filter: drop-shadow(0 20px 26px rgba(9,26,13,.35)); }
        .bundle__pack { width: min(360px, 100%); }
        .bundle__right h3.display { font-size: clamp(1.6rem, 3.6vw, 2.8rem); margin-bottom: 1.4rem; }
        .bundle__perks { display: flex; flex-direction: column; gap: .7rem; margin-bottom: 1.8rem; }
        .bundle__perks li {
          display: flex; align-items: center; gap: .7rem;
          font-family: var(--font-mono); font-size: .74rem; letter-spacing: .05em; text-transform: uppercase;
        }
        .bundle__perks .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--yellow); }
        .bundle .btn { background: var(--cream); color: var(--maroon); border-color: var(--cream); }
        .bundle .btn:hover { background: var(--yellow); border-color: var(--yellow); }
      `}</style>
    </section>
  );
}
