import { useReveal } from '../hooks/useReveal'
import SplitReveal from './SplitReveal'
import { Stars } from './Visuals'

export default function JoyfulMoments() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.12 })
  return (
    <section className="joy" ref={ref}>
      <div className="container">
        <SplitReveal as="h2" className="joy__title">
          Clean, Functional, Feel Good
          <br />
          Drinks and Gummies that Enhance
          <br />
          <span className="joy__ghost">Joyful Moments</span>
        </SplitReveal>

        <div className="joy__grid">
          <div className="joy__blobs reveal">
            <div className="blob blob--a" />
            <div className="blob blob--b" />
            <div className="blob blob--c" />
          </div>

          <div className="joy__text reveal">
            <p>
              PAUZ isn’t just another thc brand. It’s a cultural shift in how we socialize, unwind,
              and celebrate.
            </p>
            <div className="joy__actions">
              <a href="#learn" className="btn btn--ghost">
                About Us
              </a>
              <span className="joy__rating">
                <Stars n={4} />
                <em>170 reviews</em>
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
          grid-template-columns: 1.1fr .9fr;
          align-items: center;
          gap: clamp(24px, 5vw, 70px);
          text-align: left;
        }
        @media (max-width: 820px) { .joy__grid { grid-template-columns: 1fr; } }
        .joy__blobs { position: relative; height: 340px; }
        .blob {
          position: absolute;
          border-radius: 46% 54% 60% 40% / 52% 44% 56% 48%;
          box-shadow: 0 0 0 8px var(--orange);
          background-size: cover;
          background-position: center;
          animation: blobfloat 9s ease-in-out infinite;
        }
        .blob--a {
          width: 300px; height: 220px; left: 4%; top: 60px;
          background-image: linear-gradient(120deg, #4a9a4e, #1b5e20);
        }
        .blob--b {
          width: 180px; height: 150px; right: 16%; top: 0;
          background-image: linear-gradient(120deg, #c5dd7f, #6b9c4f);
          box-shadow: 0 0 0 8px var(--maroon-deep);
          animation-delay: -3s;
        }
        .blob--c {
          width: 250px; height: 250px; right: 2%; bottom: -30px;
          background-image: linear-gradient(140deg, #2e7d32, #123018);
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
