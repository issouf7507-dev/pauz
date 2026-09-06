import { useEffect, useRef, useState } from 'react'
import SplitReveal from './SplitReveal'
import { banners, shots } from '../assets/media'
import { useOrder } from '../lib/order'

/**
 * "From the tree to the can" — the five beats that used to be a scroll-scrubbed
 * video flight. Same story, no video pipeline: one sticky frame cross-fades
 * between five photos while the copy scrolls past it.
 *
 * The active step is measured straight from the scroll event, deliberately NOT
 * from ScrollTrigger or an IntersectionObserver. Both of those only deliver when
 * the browser runs its rendering step — ScrollTrigger through the GSAP ticker
 * that Lenis drives (see useLenis), IntersectionObserver through the same frame
 * loop — and when that stalls the section freezes on step 1 while the copy keeps
 * scrolling past it, which is exactly the bug this replaced. Reading rects inside
 * the scroll handler is synchronous, so the frame can never fall behind.
 *
 * "Nearest to the viewport centre" also beats band-crossing: it always resolves
 * to exactly one step, including on fast jumps and at both ends of the section.
 *
 * Nothing is pinned, so the section scrolls at native speed and degrades to a
 * plain stacked list when the viewport is too short to sticky usefully.
 */

const steps = [
  {
    id: 'tree',
    img: shots.coconuts,
    alt: 'Canette PAUZ entourée de noix de coco vertes fraîches',
    eyebrow: 'Le point de départ',
    title: 'Tout commence sur l’arbre.',
    body: 'Des noix de coco vertes, cueillies jeunes pour l’eau qu’elles contiennent — pas pour ce qu’on aurait pu y ajouter ensuite.',
    tags: ['Noix de coco jeunes', 'Cueillies pour leur eau'],
  },
  {
    id: 'open',
    img: banners.beach,
    alt: 'Noix de coco ouvertes et canette PAUZ sur le sable',
    eyebrow: 'Rien à ajouter',
    title: 'Ouverte, et c’est tout.',
    body: 'L’eau passe directement de la noix à la canette. Sans concentré, sans sucre ajouté, sans colorant.',
    tags: ['Sans concentré', 'Sans sucre ajouté'],
  },
  {
    id: 'cold',
    img: shots.fridge,
    alt: 'Canettes PAUZ alignées dans un réfrigérateur',
    eyebrow: 'Mise en canette à froid',
    title: 'Froide dès la première seconde.',
    body: 'Remplie et réfrigérée le jour même : ce que tu ouvres a le goût de ce qu’on a versé.',
    tags: ['Canette slim 330 ml', 'Réfrigérée'],
  },
  {
    id: 'pause',
    img: shots.knit,
    alt: 'Canette PAUZ tenue contre un pull en maille écrue',
    eyebrow: 'La pause de midi',
    title: 'Quatre minutes pour toi.',
    body: 'L’intervalle entre deux réunions, le retour du déjeuner — une canette, et le reste de la journée repart de plus haut.',
    tags: ['Électrolytes naturels', 'Naturellement isotonique'],
  },
  {
    id: 'can',
    img: shots.handGreen,
    alt: 'Main tenant une canette PAUZ sur fond vert profond',
    eyebrow: 'PAUZ Eau de coco',
    title: 'Une canette. Rien à ajouter.',
    body: '100 % eau de coco, 330 ml, naturellement isotonique. Voilà toute la liste.',
    tags: ['100 % eau de coco', '330 ml', 'Sans sucre ajouté'],
    cta: true,
  },
]

export default function Story() {
  const { openOrder } = useOrder()
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const nodes = Array.from(el.querySelectorAll<HTMLElement>('.story__step'))
    if (!nodes.length) return

    const pick = () => {
      const line = window.innerHeight / 2
      let best = 0
      let bestDist = Infinity
      nodes.forEach((n, i) => {
        const r = n.getBoundingClientRect()
        const dist = Math.abs((r.top + r.bottom) / 2 - line)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      // React bails out on an unchanged value, so this stays cheap per event.
      setActive(best)
    }

    pick()
    window.addEventListener('scroll', pick, { passive: true })
    window.addEventListener('resize', pick)

    return () => {
      window.removeEventListener('scroll', pick)
      window.removeEventListener('resize', pick)
    }
  }, [])

  return (
    <section className="story" id="learn" ref={ref}>
      <div className="container story__head">
        <p className="story__kicker">La version courte</p>
        <SplitReveal as="h2" className="section-title">
          De l’arbre
          <br /> à la canette
        </SplitReveal>
      </div>

      <div className="container story__grid">
        <div className="story__sticky">
          <div className="story__frame">
            {steps.map((s, i) => (
              <img
                key={s.id}
                src={s.img}
                alt={i === active ? s.alt : ''}
                className={`story__img${i === active ? ' is-active' : ''}`}
                aria-hidden={i !== active}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ))}
            <span className="story__count">
              {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
            </span>
          </div>

          <ol className="story__rail" aria-hidden>
            {steps.map((s, i) => (
              <li key={s.id} className={i === active ? 'is-active' : ''}>
                <span className="story__tick" />
                {s.eyebrow}
              </li>
            ))}
          </ol>
        </div>

        <ol className="story__steps">
          {steps.map((s, i) => (
            <li className="story__step" key={s.id}>
              <img src={s.img} alt={s.alt} className="story__inline" loading="lazy" />
              <p className="story__eyebrow">
                <span className="story__num">{String(i + 1).padStart(2, '0')}</span>
                {s.eyebrow}
              </p>
              <h3>{s.title}</h3>
              <p className="story__body">{s.body}</p>
              <ul className="story__tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              {s.cta && (
                <div className="story__cta">
                  <button type="button" className="btn" onClick={() => openOrder(1)}>
                    Commander
                  </button>
                  <a href="#drinks" className="btn btn--ghost">
                    Voir ce qu’il y a dedans
                  </a>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        .story {
          background: var(--maroon-deep);
          color: var(--cream);
          padding: clamp(60px, 9vw, 120px) 0 clamp(50px, 7vw, 90px);
        }
        .story__head { text-align: center; margin-bottom: clamp(36px, 6vw, 80px); }
        .story__kicker {
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: .22em;
          font-size: .66rem;
          opacity: .6;
          margin-bottom: 1rem;
        }
        .story .section-title { color: var(--cream); }

        .story__grid { display: grid; gap: clamp(28px, 5vw, 80px); }
        @media (min-width: 900px) {
          .story__grid { grid-template-columns: 1fr 1fr; align-items: start; }
        }

        /* ---------- sticky visual ---------- */
        .story__sticky { display: none; }
        @media (min-width: 900px) {
          .story__sticky {
            display: block;
            position: sticky;
            top: max(90px, calc(50vh - 320px));
          }
        }
        .story__frame {
          position: relative;
          aspect-ratio: 1;
          border-radius: var(--radius);
          overflow: hidden;
          background: var(--green-dark);
          box-shadow: 0 30px 60px rgba(9,26,13,.45);
        }
        .story__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transform: scale(1.04);
          transition: opacity .45s ease, transform .9s cubic-bezier(.22,1,.36,1);
        }
        .story__img.is-active { opacity: 1; transform: scale(1); }
        .story__count {
          position: absolute;
          left: 16px;
          bottom: 14px;
          font-family: var(--font-mono);
          font-size: .64rem;
          letter-spacing: .14em;
          color: var(--cream);
          text-shadow: 0 1px 10px rgba(0,0,0,.6);
        }

        .story__rail {
          display: flex;
          flex-direction: column;
          gap: .55rem;
          margin-top: 1.4rem;
          list-style: none;
        }
        .story__rail li {
          display: flex;
          align-items: center;
          gap: .7rem;
          font-family: var(--font-mono);
          text-transform: uppercase;
          font-size: .6rem;
          letter-spacing: .12em;
          opacity: .38;
          transition: opacity .35s ease;
        }
        .story__rail li.is-active { opacity: 1; }
        .story__tick {
          width: 22px;
          height: 2px;
          background: currentColor;
          transition: width .35s ease, background .35s ease;
        }
        .story__rail li.is-active .story__tick { width: 40px; background: var(--yellow); }

        /* ---------- steps ---------- */
        .story__steps { list-style: none; }
        .story__step {
          padding: clamp(28px, 5vw, 40px) 0;
          border-bottom: 1px solid rgba(251,246,237,.14);
        }
        .story__step:last-child { border-bottom: 0; }
        @media (min-width: 900px) {
          /* Tall enough that one step owns the viewport centre at a time. */
          .story__step { min-height: 64vh; display: flex; flex-direction: column; justify-content: center; }
        }

        /* Below the sticky breakpoint each step carries its own photo. */
        .story__inline {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          border-radius: var(--radius);
          margin-bottom: 1.4rem;
          display: block;
        }
        @media (min-width: 900px) { .story__inline { display: none; } }

        .story__eyebrow {
          display: flex;
          align-items: center;
          gap: .8rem;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: .18em;
          font-size: .64rem;
          opacity: .7;
          margin-bottom: 1rem;
        }
        .story__num { color: var(--yellow); opacity: 1; }
        .story__step h3 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(1.6rem, 3.4vw, 2.7rem);
          line-height: 1.05;
          margin-bottom: 1rem;
        }
        .story__body { max-width: 42ch; line-height: 1.6; font-size: .95rem; opacity: .82; }
        .story__tags {
          display: flex;
          flex-wrap: wrap;
          gap: .5rem;
          margin-top: 1.4rem;
          list-style: none;
        }
        .story__tags li {
          border: 1px solid rgba(251,246,237,.28);
          border-radius: 40px;
          padding: .45em 1em;
          font-family: var(--font-mono);
          text-transform: uppercase;
          font-size: .58rem;
          letter-spacing: .1em;
          opacity: .85;
        }
        .story__cta { display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 1.8rem; }
        .story__cta .btn { background: var(--cream); color: var(--maroon); border-color: var(--cream); }
        .story__cta .btn:hover { background: var(--yellow); border-color: var(--yellow); }
        .story__cta .btn--ghost { background: transparent; color: var(--cream); border-color: rgba(251,246,237,.5); }
        .story__cta .btn--ghost:hover { background: rgba(251,246,237,.12); color: var(--cream); }

        @media (prefers-reduced-motion: reduce) {
          .story__img { transition: none; }
        }
      `}</style>
    </section>
  )
}
