import { Link } from 'react-router-dom'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { PACKS, QUARTIERS, fcfa } from '@/data/site'
import { waLink, orderMessage } from '@/lib/whatsapp'
import './order.css'

export default function Order() {
  return (
    <section className="order section section--dark" id="commander">
      <div className="container">
        <div className="order__head">
          <div>
            <Reveal>
              <p className="section__eyebrow">Commander</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="section__title">
                Choisis ton pack,{' '}
                <span className="text-muted">on livre à Abidjan.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link to="/commander" className="order__full-link">
              Formulaire complet →
            </Link>
          </Reveal>
        </div>

        <div className="order__grid">
          {PACKS.map((pack, i) => (
            <Reveal as="div" key={pack.id} delay={0.06 * i} className="order__card-wrap">
              <article className={`order__card ${pack.popular ? 'is-popular' : ''}`}>
                {pack.popular && <span className="order__tag">Le plus choisi</span>}
                <h3 className="order__pack-name">{pack.name}</h3>
                <p className="order__pack-units">
                  {pack.units} canette{pack.units > 1 ? 's' : ''} · 330 ml
                </p>
                <p className="order__price">{fcfa(pack.price)}</p>
                <p className="order__target">{pack.target}</p>
                <Button
                  href={waLink(orderMessage(pack))}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  className="order__wa"
                >
                  Commander sur WhatsApp
                </Button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="order__zones">
            <h3 className="order__zones-title">Zones de livraison couvertes</h3>
            <ul className="order__zones-list">
              {QUARTIERS.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
            <p className="order__zones-note">
              Ton quartier n’est pas listé ? Écris-nous sur WhatsApp, on trouve une solution.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
