import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { WORK_STEPS } from '@/data/site'
import './work.css'

/**
 * Section « Latest Work » (lessestudio) : 3 grandes lignes image + texte + méta.
 * Remplie avec les 3 étapes du parcours Scanne & Gagne.
 */
export default function Work() {
  return (
    <section className="work section section--dark" id="scanner">
      <div className="container">
        <p className="section__eyebrow work__eyebrow">Comment ça marche</p>

        <div className="work__rows">
          {WORK_STEPS.map((step, i) => (
            <Reveal as="div" key={step.n} delay={0.05 + i * 0.05} className="work__row">
              <div className="work__media">
                <img src={step.image} alt="" loading="lazy" />
                <span className="work__badge">{step.n}</span>
              </div>
              <div className="work__body">
                <h3 className="work__title">{step.title}</h3>
                <p className="work__text">{step.text}</p>
                <div className="work__meta">
                  <div>
                    <span className="work__meta-k">{step.metaK}</span>
                    <span className="work__meta-v">{step.metaV}</span>
                  </div>
                  <div>
                    <span className="work__meta-k">Canette</span>
                    <span className="work__meta-v">330 ML</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="work__foot">
          <Button href="/scan/DEMO" variant="whatsapp">
            Essayer la démo de scan
          </Button>
        </div>
      </div>
    </section>
  )
}
