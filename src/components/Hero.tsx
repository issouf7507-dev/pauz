import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wordmark } from "./Visuals";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const fade = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 + i * 0.12,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <section className="hero" ref={ref} id="top">
      <div className="hero__bg" ref={bgRef} />
      <div className="hero__grain" />
      <div className="hero__scrim" />

      <div className="hero__content container">
        <motion.p
          className="hero__eyebrow"
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
        >
          Sparkling · Functional · Feel-Good
        </motion.p>

        <h1 className="hero__title display">
          <motion.span
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
          >
            THC-Infused Sparkling
          </motion.span>
          <motion.span
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
          >
            Juices &amp; Gummies
          </motion.span>
        </h1>

        <motion.p
          className="hero__sub"
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
        >
          Crafted for the mind that pulls and unfair advantage — always
          balanced, never over the top. Lifestyle choices.
        </motion.p>

        <motion.div custom={4} variants={fade} initial="hidden" animate="show">
          <a href="#drinks" className="btn btn--sun hero__cta">
            Shop Now
          </a>
        </motion.div>
      </div>

      <div className="hero__badge">
        <Wordmark size={40} color="#f4e3c8" />
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          color: var(--cream);
          margin-top: -66px;
          padding-top: 66px;
        }
        .hero__bg {
          position: absolute;
          inset: -8% 0 0 0;
          background:
            radial-gradient(120% 90% at 70% 10%, rgba(197,221,127,.5), transparent 55%),
            radial-gradient(90% 80% at 15% 80%, rgba(74,154,78,.55), transparent 60%),
            radial-gradient(120% 120% at 50% 120%, rgba(18,48,24,.92), transparent 72%),
            linear-gradient(160deg, #2e7d32 0%, #1b5e20 50%, #123018 100%);
          will-change: transform;
        }
        .hero__grain {
          position: absolute;
          inset: 0;
          opacity: .16;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .hero__scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(18,48,24,.5) 0%, transparent 30%, rgba(18,48,24,.4) 100%);
        }
        .hero__content {
          position: relative;
          z-index: 2;
          text-align: center;
          margin: 0 auto;
          max-width: 1800px;
          width: 100%;
        }
        .hero__eyebrow {
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: .22em;
          font-size: .72rem;
          margin-bottom: 1.1rem;
          opacity: .9;
        }
        .hero__title {
          font-size: clamp(2.6rem, 8vw, 6.4rem);
          transform: scaleX(.92);
          transform-origin: center;
          margin: 0 auto .1rem;
        }
        .hero__title span { display: block; }
        .hero__sub {
          max-width: 460px;
          margin: 1.4rem auto 2rem;
          font-size: .95rem;
          line-height: 1.5;
          opacity: .92;
        }
        .hero__cta {
          background: var(--cream);
          color: var(--maroon);
          border-color: var(--cream);
          font-size: .8rem;
          padding: 1em 1.9em;
        }
        .hero__cta:hover { background: var(--yellow); border-color: var(--yellow); color: var(--maroon-deep); }
        .hero__badge {
          position: absolute;
          left: 50%;
          bottom: 4%;
          transform: translateX(-50%) rotate(-6deg);
          z-index: 2;
          opacity: .95;
        }
      `}</style>
    </section>
  );
}
