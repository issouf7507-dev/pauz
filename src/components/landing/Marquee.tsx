import { MARQUEE_ITEMS } from '@/data/site'
import './marquee.css'

/** Bandeau vert défilant sous le hero (maquette). Deux copies pour une boucle continue. */
export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <div className="marquee__group" key={copy}>
            {items.map((item, i) => (
              <span className="marquee__item" key={`${copy}-${i}`}>
                {item}
                <span className="marquee__dot">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
