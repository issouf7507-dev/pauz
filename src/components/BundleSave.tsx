import { motion } from "framer-motion";
import { useReveal } from "../hooks/useReveal";
import SplitReveal from "./SplitReveal";
import { Can, Pouch } from "./Visuals";

const perks = [
  "15% off every bundle",
  "Free shipping over $75",
  "Cancel or skip anytime",
  "Members-only drops",
];

export default function BundleSave() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.1 });
  return (
    <section className="bundle" ref={ref}>
      <div className="container bundle__inner">
        <div className="bundle__left">
          <SplitReveal as="h2" className="display" style={{ color: "#fff" }}>
            Bundle &amp; Save
          </SplitReveal>
          <p
            className="bundle__lead reveal"
            style={{
              color: "#fefefe",
            }}
          >
            Why pick one? Curate your evening with a variety pack of our
            signature blends — a little something for every feeling.
          </p>
          <div className="bundle__cans reveal">
            <div style={{ width: 120 }}>
              <Can body="#fbf6ed" cap="#dcd3bd" />
            </div>
            <div style={{ width: 120, marginTop: 24 }}>
              <Can body="#c5dd7f" cap="#9ec27a" />
            </div>
            <div style={{ width: 120 }}>
              <Can body="#1b5e20" cap="#123018" />
            </div>
          </div>
        </div>

        <div className="bundle__right">
          <SplitReveal as="h3" className="display" style={{ color: "#fff" }}>
            Order More.
            <br /> Save More.
            <br /> Joy More.
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
          <div className="bundle__pouches reveal">
            <div style={{ width: 130 }}>
              <Pouch body="#c5dd7f" accent="#1b5e20" />
            </div>
            <div style={{ width: 130, marginTop: 20 }}>
              <Pouch body="#fbf6ed" accent="#2e7d32" />
            </div>
          </div>
          <motion.a
            href="#drinks"
            className="btn reveal"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Build Your Bundle
          </motion.a>
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
        .bundle__cans, .bundle__pouches { display: flex; align-items: flex-end; gap: 8px; }
        .bundle__right h3.display { font-size: clamp(1.6rem, 3.6vw, 2.8rem); margin-bottom: 1.4rem; }
        .bundle__perks { display: flex; flex-direction: column; gap: .7rem; margin-bottom: 1.8rem; }
        .bundle__perks li {
          display: flex; align-items: center; gap: .7rem;
          font-family: var(--font-mono); font-size: .74rem; letter-spacing: .05em; text-transform: uppercase;
        }
        .bundle__perks .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--yellow); }
        .bundle__pouches { margin: 0 0 2rem; }
        .bundle .btn { background: var(--cream); color: var(--maroon); border-color: var(--cream); }
        .bundle .btn:hover { background: var(--yellow); border-color: var(--yellow); }
      `}</style>
    </section>
  );
}
