import Reveal from '@/components/ui/Reveal'
import PixelGlyph from '@/components/ui/PixelGlyph'
import './approach.css'

const VALUES = [
  '100% naturel',
  'Sans sucre ajouté',
  'Électrolytes',
  'Livré en 24 h',
  'Scanne & gagne',
  'WhatsApp',
]

export default function Approach() {
  return (
    <section className="approach section" id="approche">
      <div className="container">
        <div className="approach__head">
          <p className="section__eyebrow">Notre approche &amp; valeurs</p>
          <Reveal>
            <h2 className="approach__title">
              On fait simple : de l’eau de coco 100% pure, livrée fraîche{' '}
              <span className="text-muted">
                — et une expérience de jeu à chaque canette scannée.
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="approach__glyphs">
          {VALUES.map((label, i) => (
            <Reveal as="div" key={label} delay={0.05 * i} className="approach__glyph">
              <PixelGlyph seed={i * 7 + 1} size={44} />
              <span className="approach__glyph-label">{label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
