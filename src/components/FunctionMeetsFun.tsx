import { useReveal } from '../hooks/useReveal'
import SplitReveal from './SplitReveal'
import { cans } from '../assets/media'
import { product } from '../data/products'

/**
 * "Read the label. It's short." — so the section shows the label instead of
 * describing it: the ingredient line, then everything the can leaves out.
 *
 * Every claim here is one the can itself already carries (see the packshots) or
 * that `product` already states. Nothing numeric is asserted — no calories, no
 * mg of potassium — because those are regulated figures we do not have.
 */

/** Left out on purpose. The point of the section is how long this list is. */
const leftOut = [
  'Sucre ajouté',
  'Édulcorants',
  'Concentré',
  'Colorants',
  'Conservateurs',
  'Quoi que ce soit d’autre',
]

const badges = ['330 ml', 'Naturellement isotonique', 'Électrolytes naturels']

export default function FunctionMeetsFun() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.07 })

  return (
    <section className="fmf" id="label" ref={ref}>
      <div className="container">
        <div className="fmf__head">
          <SplitReveal as="h2" className="section-title">
            Lis l’étiquette.
            <br /> Elle est courte.
          </SplitReveal>
          <p className="fmf__intro reveal">
            Un seul ingrédient dans la canette. Tout le reste, c’est ce qu’on a laissé de côté.
          </p>
        </div>

        <div className="fmf__grid">
          <div className="fmf__stage reveal">
            <span className="fmf__glow" aria-hidden />
            <img className="fmf__can" src={cans.studio} alt={`Canette ${product.name}, ${product.size}`} />
          </div>

          <div className="fmf__panel">
            <div className="fmf__block reveal">
              <p className="fmf__kicker">Ingrédients</p>
              <p className="fmf__hero">Eau de coco.</p>
              <p className="fmf__note">C’est toute la liste.</p>
            </div>

            <div className="fmf__block reveal">
              <p className="fmf__kicker">Pas dans cette canette</p>
              <ul className="fmf__out">
                {leftOut.map((item) => (
                  <li key={item}>
                    <svg viewBox="0 0 14 14" aria-hidden focusable="false">
                      <path d="M3 3 L11 11 M11 3 L3 11" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="fmf__block fmf__block--last reveal">
              <ul className="fmf__badges">
                {badges.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <a href="#learn" className="btn btn--ghost fmf__cta">
                En savoir plus
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .fmf { padding: clamp(60px, 8vw, 110px) 0; }
        .fmf__head { max-width: 620px; margin: 0 auto clamp(36px, 5vw, 64px); text-align: center; }
        .fmf__intro {
          font-size: .9rem;
          opacity: .75;
          max-width: 380px;
          line-height: 1.5;
          margin: 1.2rem auto 0;
        }

        .fmf__grid {
          display: grid;
          gap: clamp(28px, 5vw, 72px);
          align-items: center;
        }
        @media (min-width: 900px) {
          .fmf__grid { grid-template-columns: .85fr 1.15fr; }
        }

        /* ---------- the can ---------- */
        .fmf__stage {
          position: relative;
          display: grid;
          place-items: center;
          padding: clamp(20px, 4vw, 44px) 0;
          isolation: isolate;
        }
        .fmf__glow {
          position: absolute;
          z-index: -1;
          width: min(108%, 500px);
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(197,221,127,.85), rgba(197,221,127,.28) 46%, rgba(197,221,127,0) 70%);
        }
        .fmf__can {
          width: clamp(180px, 25vw, 310px);
          height: auto;
          filter: drop-shadow(0 26px 34px rgba(9,26,13,.22));
          animation: fmf-float 7s ease-in-out infinite;
        }
        @keyframes fmf-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        /* ---------- the label panel ---------- */
        /* Rules instead of a boxed card: it reads as a printed panel and keeps
           the section from turning into yet another bordered box. */
        .fmf__block { padding: clamp(18px, 2.4vw, 26px) 0; border-top: 1.5px solid var(--line); }
        .fmf__block:first-child { border-top: 0; padding-top: 0; }
        .fmf__block--last {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.2rem;
        }
        .fmf__kicker {
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: .2em;
          font-size: .62rem;
          opacity: .6;
          margin-bottom: .9rem;
        }
        .fmf__hero {
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -.01em;
          line-height: 1;
          color: var(--maroon);
          font-size: clamp(1.9rem, 4.6vw, 3.2rem);
        }
        .fmf__note { margin-top: .7rem; font-size: .92rem; opacity: .7; }

        .fmf__out {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: .7rem 1.4rem;
        }
        @media (max-width: 420px) { .fmf__out { grid-template-columns: 1fr; } }
        .fmf__out li {
          display: flex;
          align-items: center;
          gap: .65rem;
          font-size: .88rem;
          color: var(--ink);
          opacity: .72;
        }
        .fmf__out svg {
          flex: 0 0 auto;
          width: 15px;
          height: 15px;
          stroke: var(--maroon);
          stroke-width: 2;
          stroke-linecap: round;
          fill: none;
          opacity: .8;
        }

        .fmf__badges { display: flex; flex-wrap: wrap; gap: .5rem; }
        .fmf__badges li {
          border: 1.5px solid var(--line);
          border-radius: 40px;
          padding: .5em 1em;
          font-family: var(--font-mono);
          text-transform: uppercase;
          font-size: .58rem;
          letter-spacing: .1em;
          color: var(--maroon-deep);
        }
        .fmf__cta { flex: 0 0 auto; }

        @media (prefers-reduced-motion: reduce) {
          .fmf__can { animation: none; }
        }
      `}</style>
    </section>
  )
}
