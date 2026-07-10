import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BRAND, WHEEL_SEGMENTS, type WheelSegment } from '@/data/site'
import { waLink } from '@/lib/whatsapp'
import { prefersReducedMotion } from '@/lib/useGsap'
import './scan-page.css'

const SEG = 360 / WHEEL_SEGMENTS.length // angle par secteur (45°)
const R = 92
const CX = 100
const CY = 100

const TONE_FILL: Record<WheelSegment['tone'], string> = {
  green: '#4CAF50',
  dark: '#1B5E20',
  gold: '#FFD700',
}
const TONE_TEXT: Record<WheelSegment['tone'], string> = {
  green: '#0D2B0F',
  dark: '#ffffff',
  gold: '#0D2B0F',
}

/** Point sur le cercle pour un angle en degrés mesuré depuis le haut, sens horaire. */
function point(deg: number, radius: number) {
  const rad = ((deg - 90) * Math.PI) / 180
  return [CX + radius * Math.cos(rad), CY + radius * Math.sin(rad)] as const
}

export default function ScanPage() {
  const { code } = useParams()
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<WheelSegment | null>(null)
  const targetRef = useRef<WheelSegment | null>(null)

  const spin = () => {
    if (spinning || result) return
    const k = Math.floor(Math.random() * WHEEL_SEGMENTS.length)
    targetRef.current = WHEEL_SEGMENTS[k]
    // Rotation absolue voulue (mod 360) pour amener le secteur k sous le pointeur (haut).
    const desired = (360 - (k * SEG + SEG / 2)) % 360
    const delta = ((desired - (rotation % 360)) + 360) % 360
    const next = rotation + 360 * 5 + delta
    if (prefersReducedMotion()) {
      setRotation(next)
      setResult(WHEEL_SEGMENTS[k])
      return
    }
    setSpinning(true)
    // rAF pour garantir l'application de la transition
    requestAnimationFrame(() => setRotation(next))
  }

  const onSpinEnd = () => {
    if (spinning && targetRef.current) {
      setSpinning(false)
      setResult(targetRef.current)
    }
  }

  const segments = useMemo(
    () =>
      WHEEL_SEGMENTS.map((s, i) => {
        const [x0, y0] = point(i * SEG, R)
        const [x1, y1] = point((i + 1) * SEG, R)
        const [tx, ty] = point(i * SEG + SEG / 2, R * 0.62)
        return { s, i, d: `M${CX} ${CY} L${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1} Z`, tx, ty }
      }),
    [],
  )

  const claimMessage = result
    ? `Bonjour ${BRAND.name} 🥥 ! J'ai scanné ma canette (${code ?? 'code'}) et gagné : ${result.label}. Comment récupérer mon gain ?`
    : ''

  return (
    <main className="scanp">
      <div className="scanp__card">
        <div className="scanp__glow" aria-hidden="true" />

        <div className="scanp__head">
          <Link to="/" className="scanp__logo">PAUZ</Link>
          <span className="scanp__code">{code ?? 'B2026-07-00142'}</span>
        </div>

        <div className="scanp__badge">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <span>Canette vérifiée — à toi de jouer !</span>
        </div>

        <h1 className="scanp__title">
          Tourne la roue,
          <br />
          gagne direct.
        </h1>

        <div className="scanp__wheel-wrap">
          <div
            className="scanp__wheel"
            style={{ transform: `rotate(${rotation}deg)` }}
            onTransitionEnd={onSpinEnd}
          >
            <svg viewBox="0 0 200 200" width="300" height="300" aria-hidden="true">
              {segments.map(({ s, i, d, tx, ty }) => (
                <g key={i}>
                  <path d={d} fill={TONE_FILL[s.tone]} stroke="rgba(255,255,255,.15)" strokeWidth="1" />
                  <text
                    x={tx}
                    y={ty}
                    transform={`rotate(${i * SEG + SEG / 2} ${tx} ${ty})`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="9"
                    fontWeight="700"
                    fontFamily="Manrope, sans-serif"
                    fill={TONE_TEXT[s.tone]}
                  >
                    {s.label}
                  </text>
                </g>
              ))}
              <circle cx={CX} cy={CY} r="26" fill="#0D2B0F" stroke="#4CAF50" strokeWidth="2" />
              <text x={CX} y={CY + 4} textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="'Space Grotesk', sans-serif" fill="#fff">PAUZ</text>
            </svg>
          </div>
          <span className="scanp__pointer" aria-hidden="true" />
        </div>

        {result ? (
          <div className="scanp__result" role="status">
            <p className="scanp__result-kicker">{result.win ? '🎉 Tu as gagné' : '😅 Presque !'}</p>
            <p className="scanp__result-prize">{result.label}</p>
            {result.win ? (
              <a className="scanp__cta" href={waLink(claimMessage)} target="_blank" rel="noopener noreferrer">
                Réclamer sur WhatsApp
              </a>
            ) : (
              <p className="scanp__hint">Ce tour ne gagne pas — retente avec ta prochaine canette !</p>
            )}
          </div>
        ) : (
          <div className="scanp__actions">
            <button className="scanp__cta" type="button" onClick={spin} disabled={spinning}>
              {spinning ? 'La roue tourne…' : 'TOURNER LA ROUE'}
            </button>
            <p className="scanp__hint">1 canette = 1 tour. Gain envoyé sur WhatsApp.</p>
          </div>
        )}
      </div>
    </main>
  )
}
