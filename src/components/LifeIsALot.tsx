import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import SplitReveal from "./SplitReveal";
import { moments } from "../data/products";
import { banners } from "../assets/media";

/** Residual tilt each card keeps once it lands, so the row reads as dealt. */
const LAND_ROTATION = [-2.2, 1.5, -1.1, 2];

export default function LifeIsALot() {
  const ref = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = ref.current;
    const deck = deckRef.current;
    if (!section || !deck) return;

    const slots = gsap.utils.toArray<HTMLElement>(".mcard-slot", deck);
    if (!slots.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(slots, { opacity: 1 });
      return;
    }

    gsap.set(slots, { opacity: 0 });

    // Fired off an IntersectionObserver rather than a ScrollTrigger: a trigger
    // that never fires would leave the cards stuck at opacity 0, and this page's
    // ScrollTriggers depend on the Lenis-driven GSAP ticker still running.
    // The deal itself is measured on enter, so the deck origin is right whatever
    // column count this width ends up with.
    const deal = () => {
      const r = deck.getBoundingClientRect();
      const originX = r.left + r.width / 2;
      const originY = r.top + r.height / 2;

      gsap.fromTo(
        slots,
        {
          opacity: 0,
          scale: 0.78,
          rotation: -18,
          // Every card starts on the same spot — the deck in hand.
          x: (_i: number, el: HTMLElement) => {
            const b = el.getBoundingClientRect();
            return originX - (b.left + b.width / 2);
          },
          y: (_i: number, el: HTMLElement) => {
            const b = el.getBoundingClientRect();
            return originY - (b.top + b.height / 2) - 40;
          },
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotation: (i: number) => LAND_ROTATION[i % LAND_ROTATION.length],
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.11,
        },
      );
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        deal();
      },
      { rootMargin: "0px 0px -22% 0px" },
    );
    io.observe(deck);

    return () => io.disconnect();
  }, []);

  return (
    <section className="life" ref={ref}>
      <div
        className="life__bg"
        style={{ backgroundImage: `url(${banners.crew})` }}
        role="img"
        aria-label="Quatre amies en contre-plongée sous un ciel bleu"
      />
      <div className="life__scrim" />
      <div className="container life__inner">
        <SplitReveal as="h2" className="life__title display">
          La vie, ça fait beaucoup.
          <br /> Prends une PAUZ.
        </SplitReveal>

        <div className="life__cards" ref={deckRef}>
          {moments.map((m, i) => (
            // The slot carries the deal (GSAP transform), the card carries the
            // hover (Framer transform). On one element the two libraries would
            // overwrite each other's transform.
            <div className="mcard-slot" key={m.title}>
              <motion.div
                className="mcard"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
              >
                <span className="mcard__num">0{i + 1}</span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </motion.div>
            </div>
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
          background-color: #2e7d32;
          background-size: cover;
          background-position: 50% 28%;
        }
        .life__scrim {
          position: absolute; inset: 0;
          background:
            linear-gradient(180deg, rgba(10,32,16,.72) 0%, rgba(10,32,16,.42) 38%, rgba(10,32,16,.78) 100%);
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
        .mcard-slot { will-change: transform; height: 100%; }
        .mcard {
          background: var(--cream);
          color: var(--ink);
          border-radius: var(--radius);
          padding: 22px 20px 24px;
          min-height: 210px;
          height: 100%;
          /* No border any more, so the shadow is what lifts the card off the
             photo — and what sells the "just landed" read. */
          box-shadow: 0 18px 34px rgba(9, 26, 13, .3);
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

        @media (prefers-reduced-motion: reduce) {
          .mcard-slot { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}
