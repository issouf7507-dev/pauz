import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { SCAN_STEPS } from '@/data/site'
import './scanwin.css'

/** QR stylisé (motif décoratif, pas un vrai QR) avec halo pulsant. */
function QrGlyph() {
  const cells = [
    '1110111', '1010101', '1110111', '0001000',
    '1101011', '0101110', '1011101',
  ]
  return (
    <div className="scan__qr" aria-hidden="true">
      <div className="scan__qr-halo" />
      <div className="scan__qr-grid">
        {cells.flatMap((row, y) =>
          row.split('').map((c, x) => (
            <span key={`${x}-${y}`} data-on={c === '1'} />
          )),
        )}
      </div>
      <span className="scan__qr-corner scan__qr-corner--tl" />
      <span className="scan__qr-corner scan__qr-corner--tr" />
      <span className="scan__qr-corner scan__qr-corner--bl" />
    </div>
  )
}

export default function ScanWin() {
  return (
    <section className="scan section section--dark section--center" id="scanner">
      <div className="container">
        <Reveal>
          <p className="section__eyebrow">Comment ça marche</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section__title">
            Scanne, joue,{' '}
            <span className="text-muted">gagne.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scan__qr-wrap">
            <QrGlyph />
          </div>
        </Reveal>

        <div className="scan__steps">
          {SCAN_STEPS.map((step, i) => (
            <Reveal
              as="div"
              key={step.n}
              delay={0.12 + i * 0.12}
              className={`scan__step ${i === SCAN_STEPS.length - 1 ? 'is-gold' : ''}`}
            >
              <span className="scan__step-num">{String(step.n).padStart(2, '0')}</span>
              <h3 className="scan__step-title">{step.title}</h3>
              <p className="scan__step-text">{step.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="scan__cta">
            <Button href="/scan/DEMO" variant="primary">
              Scanner mon code
            </Button>
            <p className="scan__hint">
              Ouvre l’appareil photo de ton téléphone et vise le QR code sur ta canette.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
