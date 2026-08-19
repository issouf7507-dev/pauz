import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wordmark } from "./Visuals";
import { banners } from "../assets/media";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(bgRef.current, {
        yPercent: -4,
        scale: 1.05,
      }, {
        yPercent: 4,
        scale: 1.05,
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
      <div
        className="hero__bg"
        ref={bgRef}
        style={{ backgroundImage: `url(${banners.cheers})` }}
        role="img"
        aria-label="Quatre amies trinquent avec des canettes PAUZ sous un ciel bleu"
      />
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
          Eau de coco · Rien d’ajouté · Une canette
        </motion.p>

        <h1 className="hero__title display">
          <motion.span
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
          >
            Eau de coco
          </motion.span>
          <motion.span
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
          >
            100 % naturelle
          </motion.span>
        </h1>

        <motion.p
          className="hero__sub"
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
        >
          Mise en canette à froid, directement issue de la noix. Sans sucre
          ajouté, sans concentré, sans colorant — juste l’hydratation qui
          manquait à ta journée.
        </motion.p>

        <motion.div custom={4} variants={fade} initial="hidden" animate="show">
          <a href="#drinks" className="btn btn--sun hero__cta">
            Commander
          </a>
        </motion.div>
      </div>

      <div className="hero__badge">
        <Wordmark size={34} variant="white" />
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
          inset: -9% 0 -9% 0;
          background-color: #123018;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 50% 42%;
          will-change: transform;
        }
        .hero__grain {
          position: absolute;
          inset: 0;
          opacity: .10;
          mix-blend-mode: overlay;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .hero__scrim {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(10,32,16,.55) 0%, rgba(10,32,16,.18) 24%, rgba(10,32,16,.34) 58%, rgba(10,32,16,.82) 100%),
            radial-gradient(58% 46% at 50% 50%, rgba(10,32,16,.62), rgba(10,32,16,.18) 62%, transparent 80%);
        }
        .hero__content {
          position: relative;
          z-index: 2;
          text-align: center;
          margin: 0 auto;
          max-width: var(--container);
          width: 100%;
          text-shadow: 0 2px 26px rgba(10,30,14,.55);
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
          font-size: clamp(2.4rem, 6.4vw, 5.6rem);
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

        @media (max-width: 860px) {
          .hero { min-height: 88vh; }
          .hero__bg { background-position: 56% 40%; }
          .hero__scrim {
            background: linear-gradient(180deg, rgba(18,48,24,.6) 0%, rgba(18,48,24,.32) 22%, rgba(18,48,24,.5) 55%, rgba(18,48,24,.9) 100%);
          }
          .hero__badge { bottom: 2%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero__bg { transform: none !important; }
        }
      `}</style>
    </section>
  );
}
