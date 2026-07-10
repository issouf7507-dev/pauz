import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { BRAND, TESTIMONIALS } from '@/data/site'
import { waLink } from '@/lib/whatsapp'
import './testimonials.css'

export default function Testimonials() {
  const [main, second] = TESTIMONIALS
  return (
    <section className="tm section section--dark" id="temoignages">
      <div className="container">
        <div className="tm__card">
          <div className="tm__left">
            <span className="tm__badge">Témoignages</span>
            <h2 className="tm__title">
              Ce que disent{' '}
              <span className="text-muted">nos clients à Abidjan.</span>
            </h2>
            <Button
              href={waLink(`Bonjour ${BRAND.name} ! Je souhaite commander.`)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              className="tm__cta"
            >
              Commander sur WhatsApp ↗
            </Button>
          </div>

          <div className="tm__right">
            <Reveal className="tm__quote tm__quote--main">
              <p>{main.quote}</p>
              <div className="tm__author">
                <span className="tm__avatar" aria-hidden="true">
                  {main.name.charAt(0)}
                </span>
                <div>
                  <span className="tm__author-name">{main.name}</span>
                  <span className="tm__author-role">{main.role}</span>
                </div>
              </div>
            </Reveal>

            {second && (
              <div className="tm__quote tm__quote--muted">
                <p>{second.quote}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
