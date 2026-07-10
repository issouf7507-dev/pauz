import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import PixelGlyph from '@/components/ui/PixelGlyph'
import { PRIZES } from '@/data/site'
import './lots.css'

/**
 * Grille de cartes 4×2 façon « OUR SERVICES » (lessestudio),
 * remplie avec les 8 lots à gagner PAUZ.
 */
export default function Lots() {
  return (
    <section className="lots section" id="lots">
      <div className="container">
        <p className="section__eyebrow lots__eyebrow">Ce que tu peux gagner</p>

        <div className="lots__grid">
          {PRIZES.map((prize, i) => (
            <Reveal as="div" key={prize.name} delay={0.04 * i} className="lots__card">
              <div className="lots__card-head">
                <h3 className="lots__card-title">{prize.name}</h3>
                <span className="lots__card-count">/ lot {String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="lots__card-media" aria-hidden="true">
                <span className="lots__emoji">{prize.icon}</span>
              </div>
              <PixelGlyph seed={i + 3} size={22} className="lots__glyph" />
            </Reveal>
          ))}
        </div>

        <div className="lots__foot">
          <Button href="/scan/DEMO" variant="primary">
            Scanner ma canette
          </Button>
        </div>
      </div>
    </section>
  )
}
