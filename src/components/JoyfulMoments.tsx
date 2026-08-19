import { useReveal } from '../hooks/useReveal'
import SplitReveal from './SplitReveal'
import { Stars } from './Visuals'
import { shots } from '../assets/media'

export default function JoyfulMoments() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.12 })
  return (
    <section className="joy" ref={ref}>
      <div className="container">
        <SplitReveal as="h2" className="joy__title">
          Une canette. Nette, simple, honnête.
          <br />
          L’eau de coco faite pour tes
          <br />
          <span className="joy__ghost">Instants joyeux</span>
        </SplitReveal>

        <div className="joy__grid">
          <div className="joy__blobs reveal">
            <div
              className="blob blob--a"
              style={{ backgroundImage: `url(${shots.sipScarf})` }}
              role="img"
              aria-label="Femme buvant une canette PAUZ à la paille"
            />
            <div
              className="blob blob--b"
              style={{ backgroundImage: `url(${shots.handGreen})` }}
              role="img"
              aria-label="Main tenant une canette PAUZ sur fond vert profond"
            />
            <div
              className="blob blob--c"
              style={{ backgroundImage: `url(${shots.beachSmile})` }}
              role="img"
              aria-label="Femme souriante à la plage avec une canette PAUZ"
            />
          </div>

          <div className="joy__text reveal">
            <p>
              PAUZ, ce n’est pas une gamme de dix produits entre lesquels choisir. C’est une
              canette d’eau de coco pure, bien faite — pour la pause au milieu de ta journée.
            </p>
            <div className="joy__actions">
              <a href="#learn" className="btn btn--ghost">
                À propos
              </a>
              <span className="joy__rating">
                <Stars n={4} />
                <em>170 avis</em>
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .joy { padding: clamp(60px, 9vw, 130px) 0; text-align: center; }
        .joy__title {
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          color: var(--maroon);
          line-height: .98;
          letter-spacing: -.01em;
          transform: scaleX(.9);
          font-size: clamp(1.5rem, 4.2vw, 3.2rem);
          margin-bottom: clamp(40px, 6vw, 72px);
        }
        .joy__ghost { color: transparent; -webkit-text-stroke: 1px rgba(27,94,32,.4); }
        .joy__grid {
          display: grid;
          grid-template-columns: 1.18fr .82fr;
          align-items: center;
          gap: clamp(24px, 5vw, 70px);
          text-align: left;
        }
        /* Sized in % of the column so the trio keeps its composition at every
           width instead of shrinking into a corner on narrow screens. */
        .joy__blobs { position: relative; height: clamp(340px, 34vw, 540px); }
        /* After the base rule on purpose: same specificity, so source order wins. */
        @media (max-width: 820px) {
          .joy__grid { grid-template-columns: 1fr; }
          .joy__blobs { height: clamp(300px, 78vw, 420px); }
        }
        .blob {
          position: absolute;
          border-radius: 46% 54% 60% 40% / 52% 44% 56% 48%;
          box-shadow: 0 0 0 clamp(7px, .85vw, 13px) var(--orange), 0 24px 44px rgba(9, 26, 13, .28);
          background-color: #1b5e20;
          background-size: cover;
          background-position: center;
          animation: blobfloat 9s ease-in-out infinite;
        }
        .blob--a {
          width: 58%; aspect-ratio: 4 / 3; left: 0; top: 26%;
          background-position: 50% 38%;
        }
        .blob--b {
          width: 36%; aspect-ratio: 5 / 4; right: 16%; top: -8%;
          background-position: 50% 46%;
          box-shadow: 0 0 0 8px var(--maroon-deep);
          animation-delay: -3s;
        }
        .blob--c {
          width: 46%; aspect-ratio: 1; right: 0; bottom: -7%;
          background-position: 55% 40%;
          border-radius: 60% 40% 45% 55% / 55% 50% 50% 45%;
          animation-delay: -5s;
        }
        @keyframes blobfloat {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(2deg); }
        }
        .joy__text p {
          font-family: var(--font-display);
          font-size: clamp(1.3rem, 2.6vw, 2rem);
          line-height: 1.2;
          color: var(--maroon-deep);
          margin-bottom: 1.8rem;
        }
        .joy__actions { display: flex; align-items: center; gap: 1.4rem; flex-wrap: wrap; }
        .joy__rating { display: inline-flex; align-items: center; gap: .5rem; }
        .joy__rating em {
          font-family: var(--font-mono);
          font-style: normal;
          font-size: .66rem;
          letter-spacing: .08em;
          text-transform: uppercase;
          opacity: .7;
        }
      `}</style>
    </section>
  )
}
