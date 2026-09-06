import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  ApiError,
  fetchCampaign,
  formatPrice,
  playCode,
  type ApiCampaign,
  type ApiPrize,
  type ScanResult,
} from '../lib/api'
import { whatsappUrl } from '../data/contact'
import { cans } from '../assets/media'

/**
 * Le jeu à gratter : le client arrive ici en scannant le QR de sa canette,
 * l'URL portant déjà son code. Il saisit son numéro, le serveur tire au sort.
 */

/** Les codes sont imprimés en majuscules, groupés par quatre : ABCD-EFGH. */
function normalizeCode(input: string) {
  const clean = input.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)
  return clean.length > 4 ? `${clean.slice(0, 4)}-${clean.slice(4)}` : clean
}

/** Message d'erreur adapté au cas, plutôt que le message brut de l'API. */
function errorFor(err: unknown) {
  if (!(err instanceof ApiError)) return { title: 'Ça n’a pas marché', text: 'Réessaie dans un instant.' }
  switch (err.code) {
    case 'NOT_FOUND':
      return { title: 'Code inconnu', text: 'Vérifie les huit caractères — le zéro et la lettre O ne sont jamais utilisés, ni le 1 et le I.' }
    case 'CODE_ALREADY_USED':
      return { title: 'Code déjà joué', text: 'Chaque canette ne donne droit qu’à une participation. Prends-en une autre !' }
    case 'CODE_DISABLED':
      return { title: 'Code désactivé', text: 'Ce code n’est plus valable. Écris-nous si tu penses que c’est une erreur.' }
    case 'CAMPAIGN_INACTIVE':
    case 'CAMPAIGN_NOT_STARTED':
      return { title: 'Le jeu n’est pas ouvert', text: 'Reviens un peu plus tard, ça arrive.' }
    case 'CAMPAIGN_ENDED':
      return { title: 'Le jeu est terminé', text: 'Merci d’avoir joué — le prochain arrive bientôt.' }
    case 'DAILY_LIMIT_REACHED':
      return { title: 'Assez pour aujourd’hui', text: 'Tu as atteint le nombre de participations autorisées par jour. Reviens demain.' }
    case 'CAMPAIGN_LIMIT_REACHED':
      return { title: 'Limite atteinte', text: 'Tu as utilisé toutes tes participations pour ce jeu.' }
    case 'CUSTOMER_BLOCKED':
      return { title: 'Participation impossible', text: 'Ce numéro ne peut pas participer. Contacte-nous pour en savoir plus.' }
    case 'INVALID_PHONE':
      return { title: 'Numéro invalide', text: 'Écris-le comme ceci : 07 07 12 34 56.' }
    default:
      return { title: 'Ça n’a pas marché', text: err.message }
  }
}

function prizeValue(prize: ApiPrize) {
  if (prize.type === 'DISCOUNT' && prize.value) return `${prize.value} % de remise`
  if (prize.value) return formatPrice(prize.value)
  return null
}

const dateFr = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export default function PlayPage({ code: codeFromUrl }: { code?: string }) {
  const [campaign, setCampaign] = useState<ApiCampaign | null>(null)
  const [loading, setLoading] = useState(true)

  const [code, setCode] = useState(codeFromUrl ? normalizeCode(codeFromUrl) : '')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<{ title: string; text: string } | null>(null)
  const [result, setResult] = useState<ScanResult | null>(null)

  useEffect(() => {
    fetchCampaign()
      .then(setCampaign)
      .catch(() => setCampaign(null))
      .finally(() => setLoading(false))
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const scan = await playCode({
        code: code.trim(),
        phone: phone.trim(),
        ...(name.trim() ? { name: name.trim() } : {}),
      })
      setResult(scan)
    } catch (err) {
      setError(errorFor(err))
    } finally {
      setBusy(false)
    }
  }

  // --- résultat -----------------------------------------------------------

  if (result?.result === 'WIN' && result.prize) {
    return (
      <Frame>
        <motion.div
          className="play__win"
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="play__eyebrow">Gagné</p>
          <h1 className="play__title">{result.prize.name}</h1>
          {result.prize.description && <p className="play__lead">{result.prize.description}</p>}
          {prizeValue(result.prize) && <p className="play__value">{prizeValue(result.prize)}</p>}

          <div className="play__claim">
            <span>Ton code de retrait</span>
            <b>{result.claimCode}</b>
            {result.claimExpiresAt && <em>À récupérer avant le {dateFr(result.claimExpiresAt)}</em>}
          </div>

          <p className="play__lead">
            Présente ce code à un point de vente PAUZ, ou envoie-le nous sur WhatsApp : on
            s’occupe du reste.
          </p>
          <a className="btn play__cta" href={whatsappUrl(`Bonjour PAUZ, j'ai gagné ! Mon code de retrait : ${result.claimCode}`)}>
            Envoyer sur WhatsApp
          </a>
        </motion.div>
      </Frame>
    )
  }

  if (result?.result === 'LOSE') {
    return (
      <Frame>
        <p className="play__eyebrow">Perdu</p>
        <h1 className="play__title">Pas cette fois.</h1>
        <p className="play__lead">
          Ce code ne gagne rien, mais la prochaine canette a exactement les mêmes chances. Bonne
          nouvelle : elle est fraîche.
        </p>
        <a className="btn play__cta" href="/#drinks">
          Commander une canette
        </a>
      </Frame>
    )
  }

  // --- formulaire ---------------------------------------------------------

  if (loading) {
    return (
      <Frame>
        <p className="play__lead">Un instant…</p>
      </Frame>
    )
  }

  if (!campaign) {
    return (
      <Frame>
        <p className="play__eyebrow">Jeu PAUZ</p>
        <h1 className="play__title">Aucun jeu en cours.</h1>
        <p className="play__lead">
          Il n’y a pas de tirage ouvert en ce moment. Garde ta canette et son code : on annonce le
          prochain sur nos réseaux.
        </p>
        <a className="btn play__cta" href="/#drinks">
          Voir le produit
        </a>
      </Frame>
    )
  }

  return (
    <Frame>
      <p className="play__eyebrow">{campaign.name}</p>
      <h1 className="play__title">Tente ta chance.</h1>
      <p className="play__lead">
        {campaign.description ??
          'Entre le code imprimé sur ta canette et ton numéro : le tirage est immédiat.'}
      </p>

      {campaign.prizes.length > 0 && (
        <ul className="play__prizes">
          {campaign.prizes.map((prize) => (
            <li key={prize.name}>
              <b>{prize.name}</b>
              {prizeValue(prize) && <span>{prizeValue(prize)}</span>}
            </li>
          ))}
        </ul>
      )}

      <form className="play__form" onSubmit={onSubmit}>
        <label className="play__field">
          <span>Code de la canette</span>
          <input
            value={code}
            onChange={(e) => setCode(normalizeCode(e.target.value))}
            placeholder="ABCD-EFGH"
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            required
          />
        </label>

        <label className="play__field">
          <span>Ton numéro</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="07 07 12 34 56"
            inputMode="tel"
            autoComplete="tel"
            required
          />
        </label>

        <label className="play__field">
          <span>Ton prénom <i>(facultatif)</i></span>
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />
        </label>

        {error && (
          <div className="play__error">
            <b>{error.title}</b>
            <span>{error.text}</span>
          </div>
        )}

        <button className="btn play__cta" disabled={busy}>
          {busy ? 'Tirage…' : 'Jouer'}
        </button>

        <p className="play__rules">
          Une participation par canette, {campaign.maxScansPerPhonePerDay} par jour et par numéro.
          Jeu ouvert jusqu’au {dateFr(campaign.endsAt)}.
        </p>
      </form>
    </Frame>
  )
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <section className="play">
      <div className="container play__inner">
        <img src={cans.front} alt="" className="play__can" />
        <div className="play__body">{children}</div>
      </div>

      <style>{`
        .play { padding: clamp(30px, 6vw, 70px) 0 clamp(50px, 8vw, 100px); }
        .play__inner {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: clamp(24px, 5vw, 60px);
          align-items: center;
          max-width: 900px;
        }
        @media (max-width: 760px) {
          .play__inner { grid-template-columns: 1fr; text-align: center; }
          .play__can { max-width: 150px; margin: 0 auto; }
          .play__prizes li { justify-content: center; }
        }
        .play__can { width: 100%; height: auto; filter: drop-shadow(0 20px 30px rgba(9,26,13,.18)); }

        .play__eyebrow {
          font-family: var(--font-mono);
          font-size: .68rem;
          font-weight: 600;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--maroon);
        }
        .play__title {
          font-family: var(--font-display);
          font-size: clamp(1.9rem, 5vw, 3rem);
          font-weight: 600;
          letter-spacing: -.03em;
          margin: .4rem 0 .7rem;
        }
        .play__lead { font-size: .95rem; line-height: 1.6; opacity: .78; margin-bottom: 1.2rem; }
        .play__value {
          font-family: var(--font-mono);
          font-size: .8rem;
          letter-spacing: .08em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .play__prizes { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 1.6rem; }
        .play__prizes li {
          display: inline-flex;
          align-items: baseline;
          gap: 8px;
          padding: 7px 13px;
          border: 1.5px solid var(--line);
          border-radius: 999px;
          font-size: .82rem;
        }
        .play__prizes span { font-size: .74rem; opacity: .65; }

        .play__form { display: flex; flex-direction: column; gap: 12px; text-align: left; }
        .play__field { display: flex; flex-direction: column; gap: 5px; }
        .play__field > span {
          font-family: var(--font-mono);
          font-size: .68rem;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          opacity: .72;
        }
        .play__field i { font-style: normal; opacity: .6; text-transform: none; letter-spacing: 0; }
        .play__field input {
          font: inherit;
          color: inherit;
          padding: 13px 15px;
          border: 1.5px solid var(--line);
          border-radius: 10px;
          background: #fff;
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        .play__field:first-child input {
          font-family: var(--font-mono);
          font-size: 1.15rem;
          letter-spacing: .12em;
          text-align: center;
        }
        .play__field input:focus {
          outline: none;
          border-color: var(--maroon);
          box-shadow: 0 0 0 3px rgba(46,125,50,.15);
        }

        .play__error {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 12px 14px;
          border-radius: 10px;
          background: #fdecea;
          color: #b3261e;
        }
        .play__error b { font-size: .9rem; }
        .play__error span { font-size: .84rem; opacity: .9; }

        .play__cta { align-self: flex-start; margin-top: 6px; }
        @media (max-width: 760px) { .play__cta { align-self: stretch; justify-content: center; } }

        .play__rules { font-size: .74rem; opacity: .6; line-height: 1.5; margin-top: 4px; }

        /* ---------- gagné ---------- */
        .play__claim {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 18px 20px;
          margin: 0 0 1.2rem;
          border: 1.5px solid var(--maroon);
          border-radius: var(--radius);
          background: rgba(46,125,50,.07);
        }
        .play__claim span {
          font-family: var(--font-mono);
          font-size: .66rem;
          letter-spacing: .12em;
          text-transform: uppercase;
          opacity: .7;
        }
        .play__claim b {
          font-family: var(--font-mono);
          font-size: 1.8rem;
          letter-spacing: .06em;
        }
        .play__claim em { font-style: normal; font-size: .76rem; opacity: .7; }
      `}</style>
    </section>
  )
}
