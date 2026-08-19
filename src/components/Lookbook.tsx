import { useReveal } from '../hooks/useReveal'
import SplitReveal from './SplitReveal'
import { lookbook } from '../assets/media'

/**
 * Auto-scrolling photo strip. The track holds two copies of the shoot so the
 * translate(-50%) loop lands exactly on the seam, and it stops on hover /
 * reduced-motion so people can actually look at a frame.
 */
export default function Lookbook() {
  const ref = useReveal<HTMLElement>({ stagger: 0.1 })
  const frames = [...lookbook, ...lookbook]

  return (
    <section className="look" ref={ref} id="lookbook">
      <div className="container look__head">
        <SplitReveal as="h2" className="section-title">
          Une canette, partout
        </SplitReveal>
        <p className="look__intro reveal">
          La plage, la banquette arrière, le salon par terre. Partout où la journée monte en
          volume, la pause voyage bien.
        </p>
      </div>

      <div className="look__viewport">
        <div className="look__track">
          {frames.map((f, i) => (
            <figure className="look__frame" key={i} aria-hidden={i >= lookbook.length}>
              <img src={f.src} alt={i < lookbook.length ? f.alt : ''} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>

      <style>{`
        .look { padding: clamp(50px, 7vw, 100px) 0; overflow: hidden; }
        .look__head {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          text-align: center;
          margin-bottom: clamp(28px, 4vw, 48px);
        }
        .look__intro { max-width: 420px; font-size: .9rem; line-height: 1.55; opacity: .75; }

        .look__viewport { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); }
        .look__track {
          display: flex;
          gap: clamp(10px, 1.4vw, 18px);
          width: max-content;
          animation: look-scroll 46s linear infinite;
        }
        .look__viewport:hover .look__track { animation-play-state: paused; }

        .look__frame {
          position: relative;
          flex: 0 0 auto;
          width: clamp(190px, 22vw, 300px);
          aspect-ratio: 4 / 5;
          border-radius: var(--radius);
          overflow: hidden;
          background: var(--maroon-deep);
        }
        .look__frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .5s cubic-bezier(.22,1,.36,1);
        }
        .look__frame:hover img { transform: scale(1.05); }
        /* Every other frame drops a touch to break the strict rail. */
        .look__frame:nth-child(even) { align-self: flex-end; transform: translateY(clamp(10px, 1.6vw, 26px)); }

        @keyframes look-scroll {
          to { transform: translateX(calc(-50% - clamp(5px, .7vw, 9px))); }
        }

        @media (prefers-reduced-motion: reduce) {
          .look__track { animation: none; }
          .look__viewport { overflow-x: auto; }
        }
      `}</style>
    </section>
  )
}
