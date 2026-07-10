import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { BRAND, NEWS } from '@/data/site'
import './news.css'

export default function News() {
  return (
    <section className="news section section--dark" id="actus">
      <div className="container">
        <p className="section__eyebrow news__eyebrow">Actus &amp; famille PAUZ</p>

        <div className="news__grid">
          {NEWS.map((item, i) => (
            <Reveal
              as="div"
              key={item.title}
              delay={0.05 + i * 0.08}
              className={`news__card news__card--${i + 1}`}
            >
              <div className="news__body">
                <h3 className="news__title">{item.title}</h3>
                <span className="news__date">{item.date}</span>
              </div>
              <div className="news__media">
                <img src={item.image} alt="" loading="lazy" />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="news__foot">
          <Button href={BRAND.socials.whatsapp} target="_blank" rel="noopener noreferrer" variant="primary">
            Rejoindre sur WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
